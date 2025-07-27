import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const Volunteers = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRSVPs = async () => {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      // Get charity ID
      const { data: charity } = await supabase
        .from("charities")
        .select("id")
        .eq("email", user.email)
        .single();

      if (!charity) return;

      // Get all events created by this charity
      const { data: eventsData } = await supabase
        .from("volunteer_events")
        .select("id, title, duration, date")
        .eq("charity_id", charity.id);

      const eventsWithRSVPs = [];

      for (const event of eventsData || []) {
        // Get all volunteer signups for this event
        const { data: signups } = await supabase
          .from("volunteer_signups")
          .select("id, student_id, hours_confirmed")
          .eq("event_id", event.id);

        // Get student info
        const studentIds = signups.map((s) => s.student_id);
        const { data: studentsData } = await supabase
          .from("students")
          .select("id, name, email")
          .in("id", studentIds);

        // Combine data
        const rsvps = signups.map((signup) => {
          const student = studentsData.find((s) => s.id === signup.student_id);
          return {
            signupId: signup.id,
            studentId: signup.student_id,
            studentName: student?.name || "Unknown",
            studentEmail: student?.email || "",
            confirmed: signup.hours_confirmed > 0,
          };
        });

        eventsWithRSVPs.push({
          ...event,
          rsvps,
        });
      }

      setEvents(eventsWithRSVPs);
      setLoading(false);
    };

    fetchRSVPs();
  }, []);

  const handleConfirmAttendance = async (signupId: string, studentId: string, eventDuration: number) => {
    // 1. Update signup row
    await supabase
      .from("volunteer_signups")
      .update({ hours_confirmed: eventDuration })
      .eq("id", signupId);

    // 2. Update student total_hours
    const { data: student } = await supabase
      .from("students")
      .select("total_hours")
      .eq("id", studentId)
      .single();

    const newTotal = (student?.total_hours || 0) + eventDuration;

    await supabase
      .from("students")
      .update({ total_hours: newTotal })
      .eq("id", studentId);

    // Optional: refresh state
    window.location.reload();
  };

  if (loading) return <div>Loading volunteers...</div>;

  return (
    <div className="space-y-6">
      {events.map((event) => (
        <Card key={event.id}>
          <CardHeader>
            <CardTitle>{event.title} — {new Date(event.date).toLocaleDateString()}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {event.rsvps.length === 0 ? (
              <p className="text-sm text-muted-foreground">No students signed up for this event.</p>
            ) : (
              event.rsvps.map((rsvp) => (
                <div key={rsvp.signupId} className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <div className="font-medium">{rsvp.studentName}</div>
                    <div className="text-sm text-muted-foreground">{rsvp.studentEmail}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor={`confirm-${rsvp.signupId}`}>Attended</Label>
                    <Checkbox
                      id={`confirm-${rsvp.signupId}`}
                      checked={rsvp.confirmed}
                      onCheckedChange={() =>
                        handleConfirmAttendance(rsvp.signupId, rsvp.studentId, event.duration)
                      }
                      disabled={rsvp.confirmed}
                    />
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Volunteers;
