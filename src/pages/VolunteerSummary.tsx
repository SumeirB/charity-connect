import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const VolunteerSummary = () => {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const fetchSummary = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data: charity } = await supabase
        .from("charities")
        .select("id")
        .eq("email", user.email)
        .single();

      if (!charity) return;

      const { data: eventsData } = await supabase
        .from("volunteer_events")
        .select("id, title, date, max_volunteers")
        .eq("charity_id", charity.id);

      const eventStats = await Promise.all(
        (eventsData || []).map(async (event) => {
          const { count: signups } = await supabase
            .from("volunteer_signups")
            .select("*", { count: "exact", head: true })
            .eq("event_id", event.id);

          const dateObj = new Date(event.date);
          const today = new Date();
          const status = dateObj >= today ? "active" : "closed";

          return {
            ...event,
            signups,
            status,
            percent:
              event.max_volunteers > 0
                ? Math.round((signups / event.max_volunteers) * 100)
                : 0,
          };
        })
      );

      setEvents(eventStats);
    };

    fetchSummary();
  }, []);

  return (
    <div className="space-y-6 pt-4">
      {events.map((event) => (
        <Card key={event.id} className="p-6 organic-shadow">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="font-heading">{event.title}</CardTitle>
                <CardDescription className="text-sm">
                  {new Date(event.date).toLocaleDateString()}
                </CardDescription>
              </div>
              <Badge variant="secondary">
                {event.status === "active" ? "active" : "closed"}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-3 pt-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>
                {event.signups} / {event.max_volunteers} volunteers
              </span>
            </div>
            <Progress value={event.percent} className="h-3" />
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                {event.percent}% of goal reached
              </span>
              <Link to={`/attendance/${event.id}`}>
                <Button variant="outline" size="sm">
                  Manage Attendance
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default VolunteerSummary;
