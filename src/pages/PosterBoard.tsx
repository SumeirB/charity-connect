import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Users, Clock, ArrowLeft, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { supabase } from "../lib/supabaseClient";
import { useSession } from "@supabase/auth-helpers-react";


const PosterBoard = () => {
  const session = useSession();
  const userId = session?.user?.id;
  
  const [events, setEvents] = useState<any[]>([]);
  const [signedUpEventIds, setSignedUpEventIds] = useState<number[]>([]);

  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<Date | undefined>();
  const [locationFilter, setLocationFilter] = useState<string>("");

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from("volunteer_events")
        .select("*, charities(name, id)")
        .order("date", { ascending: true });
      if (error) console.error("Error fetching events:", error);
      else setEvents(data || []);
    };

    const fetchSignups = async () => {
      if (!userId) return;

      const { data, error } = await supabase
        .from("volunteer_signups")
        .select("event_id")
        .eq("student_id", userId);

      if (!error && data) {
        const ids = data.map(signup => signup.event_id);
        setSignedUpEventIds(ids);
      }
    };

    fetchEvents();
    fetchSignups();
  }, [userId]);


  const filteredEvents = events.filter(event => {
    const matchesCategory = !categoryFilter || categoryFilter === "all" || event.category === categoryFilter;
    const matchesDate = !dateFilter || event.date === format(dateFilter, "yyyy-MM-dd");
    const matchesLocation = !locationFilter || event.location.toLowerCase().includes(locationFilter.toLowerCase());
    return matchesCategory && matchesDate && matchesLocation;
  });

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Environmental: "bg-primary/10 text-primary border-primary/20",
      Food: "bg-accent/10 text-accent-foreground border-accent/20",
      Education: "bg-secondary/30 text-secondary-foreground border-secondary/40",
      Animals: "bg-muted text-muted-foreground border-border"
    };
    return colors[category] || "bg-muted text-muted-foreground border-border";
  };

  const getBadgeColor = (badge: string) => {
    const colors: { [key: string]: string } = {
      New: "bg-blue-500 text-white",
      Featured: "bg-yellow-500 text-yellow-900",
      Urgent: "bg-red-500 text-white"
    };
    return colors[badge] || "bg-muted text-muted-foreground";
  };

  const getSpotsLeft = (event: any) => {
    return event.max_volunteers - (event.volunteers?.length || 0);
  };

  const handleRSVP = async (eventId: number) => {
    if (!userId) {
      alert("Please log in to RSVP.");
      return;
    }

    const { error } = await supabase.from("volunteer_signups").insert({
      student_id: userId,
      event_id: eventId,
    });

    if (error) {
      console.error("RSVP failed:", error);
      alert("You may have already RSVP’d or an error occurred.");
    } else {
      setSignedUpEventIds([...signedUpEventIds, eventId]);
    }
  };


  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
              </Button>
            </Link>
            <h1 className="text-3xl font-heading font-bold text-foreground">PosterBoard</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
            Find Your Next Volunteer Opportunity
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover meaningful events and activities posted by local charities. Join others in making a positive impact in your community.
          </p>
        </div>

        <div className="mb-8 p-6 bg-card rounded-lg border border-border warm-shadow">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-heading font-semibold text-foreground">Filter Events</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label htmlFor="category-filter" className="text-sm font-medium text-foreground">Category</label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger id="category-filter" aria-label="Filter by category">
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  <SelectItem value="Environmental">Environmental</SelectItem>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Animals">Animals</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Event Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <Calendar className="mr-2 h-4 w-4" /> {dateFilter ? format(dateFilter, "PPP") : "Any date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent mode="single" selected={dateFilter} onSelect={setDateFilter} initialFocus className="p-3 pointer-events-auto" />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <label htmlFor="location-filter" className="text-sm font-medium text-foreground">Location</label>
              <Input id="location-filter" placeholder="Search by location..." value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} aria-label="Filter by location" />
            </div>
          </div>
          {(categoryFilter !== "all" || dateFilter || locationFilter) && (
            <div className="mt-4 pt-4 border-t border-border">
              <Button variant="outline" onClick={() => {
                setCategoryFilter("all");
                setDateFilter(undefined);
                setLocationFilter("");
              }} size="sm">Clear all filters</Button>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {filteredEvents.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-lg mb-4">No events found matching your filters.</p>
              <Button variant="outline" onClick={() => {
                setCategoryFilter("all");
                setDateFilter(undefined);
                setLocationFilter("");
              }}>Clear filters</Button>
            </div>
          ) : (
            filteredEvents.map((event) => (
              <Card key={event.id} className="hover:organic-shadow smooth-transition organic-border">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline" className={getCategoryColor(event.category)}>{event.category}</Badge>
                      {(event.badges || []).map((badge: string) => (
                        <Badge key={badge} className={`${getBadgeColor(badge)} text-xs`}>{badge}</Badge>
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {(event.volunteers?.length || 0)}/{event.max_volunteers} volunteers
                    </div>
                  </div>
                  <CardTitle className="text-xl mb-2 font-heading">{event.title}</CardTitle>
                  <CardDescription className="text-primary font-medium">
                    <Link to={`/charity/${event.charity_id}/microsite`} className="hover:underline">
                      {event.charities?.name || "Charity"}
                    </Link>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground mb-4">{event.description}</p>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(event.date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2" /> {event.time}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" /> {event.location}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-2" /> {getSpotsLeft(event)} spots available
                    </div>
                  </div>
                  <div className="flex space-x-3">
                      {signedUpEventIds.includes(event.id) ? (
                        <Button className="flex-1" disabled variant="outline">
                          Signed Up!
                        </Button>
                      ) : (
                        <Button
                          className="flex-1"
                          disabled={getSpotsLeft(event) === 0}
                          onClick={() => handleRSVP(event.id)}
                        >
                          {getSpotsLeft(event) === 0 ? "Full" : `RSVP (${getSpotsLeft(event)} spots left)`}
                        </Button>
                      )}

                    {event.external_link && (
                      <a href={event.external_link} target="_blank" rel="noopener noreferrer" className="flex-1">
                        <Button variant="outline" className="w-full">Learn More</Button>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <div className="text-center mt-12 bg-card rounded-lg p-8 warm-shadow border border-border">
          <h3 className="text-2xl font-heading font-bold text-foreground mb-4">Don't See What You're Looking For?</h3>
          <p className="text-muted-foreground mb-6">New volunteer opportunities are posted regularly. Check back often or follow your favorite charities.</p>
          <Button size="lg" variant="outline">Browse All Charities</Button>
        </div>
      </div>
    </div>
  );
};

export default PosterBoard;
