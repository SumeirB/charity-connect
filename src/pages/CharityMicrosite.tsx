import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { format } from "date-fns";

const CharityMicrosite = () => {
  const { id } = useParams(); // charity_id
  const [charity, setCharity] = useState<any>(null);
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [pastEvents, setPastEvents] = useState<any[]>([]);
  const [volunteerCount, setVolunteerCount] = useState(0);

  useEffect(() => {
    const fetchCharity = async () => {
      const { data, error } = await supabase.from("charities").select("*").eq("id", id).single();
      if (data) setCharity(data);
    };

    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from("volunteer_events")
        .select("*")
        .eq("charity_id", id);

      if (data) {
        const today = new Date();
        const upcoming = data.filter(e => new Date(e.date) >= today);
        const past = data.filter(e => new Date(e.date) < today);
        setUpcomingEvents(upcoming);
        setPastEvents(past);
      }
    };

   const fetchVolunteers = async () => {
    const { data: events, error: eventsError } = await supabase
        .from("volunteer_events")
        .select("id")
        .eq("charity_id", id);

    if (eventsError || !events) return;

    const eventIds = events.map(e => e.id);

    if (eventIds.length === 0) {
        setVolunteerCount(0);
        return;
    }

    const { data: signups, error: signupsError } = await supabase
        .from("volunteer_signups")
        .select("student_id, event_id");

    const filteredSignups = signups?.filter(s => eventIds.includes(s.event_id)) || [];

    setVolunteerCount(filteredSignups.length);
};


    fetchCharity();
    fetchEvents();
    fetchVolunteers();
  }, [id]);

  if (!charity) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Top Card */}
      <Card>
        <CardHeader>
          <CardTitle>{charity.name}</CardTitle>
          <CardDescription>{charity.bio}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <p><strong>Location:</strong> {charity.location}</p>
          <p><strong>Volunteers:</strong> {volunteerCount}</p>
          <p><strong>Active Events:</strong> {upcomingEvents.length}</p>
        </CardContent>
      </Card>

      {/* Instagram Section */}
      <Card>
        <CardHeader>
          <CardTitle>Latest from Instagram</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4 overflow-x-auto">
          {[charity.instagram_post_1, charity.instagram_post_2, charity.instagram_post_3].map((url, index) => (
            url && (
              <iframe
                key={index}
                src={url}
                className="w-[300px] h-[400px] rounded-md shadow"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              />
            )
          ))}
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingEvents.map(event => (
            <Card key={event.id}>
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
                <CardDescription>{format(new Date(event.date), "PPP")} — {event.time}</CardDescription>
              </CardHeader>
              <CardContent>{event.description}</CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Past Events */}
      <Card>
        <CardHeader>
          <CardTitle>Past Events</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pastEvents.map(event => (
            <Card key={event.id}>
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
                <CardDescription>{format(new Date(event.date), "PPP")}</CardDescription>
              </CardHeader>
              <CardContent>{event.description}</CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default CharityMicrosite;
