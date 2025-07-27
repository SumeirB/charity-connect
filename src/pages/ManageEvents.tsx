import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { supabase } from "../lib/supabaseClient";

const categories = ["Environmental", "Food", "Education", "Animals"];
const allBadges = ["New", "Featured", "Urgent"];

export default function ManageEvents() {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>();
  const [form, setForm] = useState({
    title: "",
    description: "",
    time: "",
    location: "",
    max_volunteers: 1,
    category: "Environmental",
    badges: [] as string[],
    external_link: "",
    duration: 1,
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBadgeToggle = (badge: string) => {
    setForm((prev) => ({
      ...prev,
      badges: prev.badges.includes(badge)
        ? prev.badges.filter((b) => b !== badge)
        : [...prev.badges, badge],
    }));
  };

  const handleSubmit = async () => {
    if (!date) return alert("Please select a date");
    setSubmitting(true);
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      alert("Not authenticated");
      setSubmitting(false);
      return;
    }
    const { data: profile } = await supabase.from("charities").select("id").eq("email", user.email).single();
    if (!profile) {
      alert("Charity profile not found");
      setSubmitting(false);
      return;
    }
    const { error } = await supabase.from("volunteer_events").insert({
      ...form,
      date: format(date, "yyyy-MM-dd"),
      charity_id: profile.id,
    });
    setSubmitting(false);
    if (error) return alert("Error submitting form");
    navigate("/posterboard");
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <Card className="organic-border">
        <CardHeader>
          <CardTitle className="text-2xl font-heading text-foreground">Create a Volunteer Event</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Event Title</Label>
            <Input id="title" name="title" value={form.title} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" value={form.description} onChange={handleChange} required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full text-left">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label htmlFor="time">Time</Label>
              <Input id="time" name="time" value={form.time} onChange={handleChange} placeholder="e.g. 9:00 AM - 12:00 PM" />
            </div>
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input id="location" name="location" value={form.location} onChange={handleChange} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="max_volunteers">Max Volunteers</Label>
              <Input
                id="max_volunteers"
                name="max_volunteers"
                type="number"
                min={1}
                value={form.max_volunteers}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="duration">Duration (in hours)</Label>
              <Input
                id="duration"
                name="duration"
                type="number"
                min={1}
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: parseInt(e.target.value) || 1 })}
              />
            </div>
            <div>
              <Label>Category</Label>
              <Select value={form.category} onValueChange={(value) => setForm({ ...form, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label>Badges (optional)</Label>
            <div className="flex flex-wrap gap-2 mt-1">
              {allBadges.map((badge) => (
                <Button
                  key={badge}
                  variant={form.badges.includes(badge) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleBadgeToggle(badge)}
                >
                  {badge}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="external_link">External Link (optional)</Label>
            <Input id="external_link" name="external_link" value={form.external_link} onChange={handleChange} placeholder="e.g. Instagram, website" />
          </div>
          <Button onClick={handleSubmit} disabled={submitting} className="w-full mt-4">
            {submitting ? "Submitting..." : "Create Event"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
