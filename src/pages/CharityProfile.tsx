import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  Heart,
  Users,
  Calendar,
  BarChart3,
  PlusCircle,
  Settings,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Volunteers from "./Volunteers";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import VolunteerSummary from "./VolunteerSummary";


const CharityProfile = () => {
  const [charity, setCharity] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile, error } = await supabase
        .from("charities")
        .select("id, name, instagram_url, website, bio, location, created_at")
        .eq("auth_id", user.id)
        .single();

      if (error) {
        console.error("Failed to load charity:", error);
      } else {
        setCharity(profile);
      }
    })();
  }, []);

  if (!charity) {
    return <div className="p-8 text-center">Loading your organization…</div>;
  }

  // Dummy stats – replace with real DB fields when available
  const stats = {
    volunteers: 248,
    totalRaised: 125000,
    activePrograms: 6,
  };

  // Sample dummy data for the rest of the UI
  const campaigns = [
    {
      id: 1,
      title: "Urban Tree Planting Initiative",
      goal: 15000,
      raised: 8750,
      donors: 156,
      endDate: "2024-08-15",
      status: "active",
    },
    {
      id: 2,
      title: "Community Solar Garden",
      goal: 25000,
      raised: 18200,
      donors: 89,
      endDate: "2024-09-30",
      status: "active",
    },
    {
      id: 3,
      title: "Environmental Education Workshops",
      goal: 5000,
      raised: 5000,
      donors: 67,
      endDate: "2024-07-01",
      status: "completed",
    },
  ];

  const recentActivity = [
    {
      type: "volunteer",
      title: "New volunteer signup",
      volunteer: "Sarah Chen",
      date: "2024-06-28",
      hours: 0,
    },
    {
      type: "donation",
      title: "Monthly donation received",
      donor: "Anonymous",
      date: "2024-06-27",
      amount: 50,
    },
    {
      type: "event",
      title: "Community Garden Cleanup completed",
      participants: 12,
      date: "2024-06-25",
      hours: 36,
    },
    {
      type: "campaign",
      title: "Campaign milestone reached",
      campaign: "Urban Tree Planting",
      date: "2024-06-22",
      amount: 7500,
    },
  ];

  const upcomingEvents = [
    {
      title: "Beach Cleanup Drive",
      date: "2024-07-05",
      volunteers: 8,
      maxVolunteers: 15,
    },
    {
      title: "Solar Panel Workshop",
      date: "2024-07-12",
      volunteers: 12,
      maxVolunteers: 20,
    },
    {
      title: "Community Garden Maintenance",
      date: "2024-07-19",
      volunteers: 6,
      maxVolunteers: 10,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
            <h1 className="text-3xl font-heading font-bold text-foreground">
              Organization Dashboard
            </h1>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Organization Header */}
        <Card className="mb-8 organic-shadow">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-6">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                <Building2 className="h-12 w-12 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
                  {charity.name}
                </h2>
                <div className="flex items-center space-x-4 text-muted-foreground mb-3">
                  <Badge variant="outline" className="capitalize">
                    Nonprofit Organization
                  </Badge>
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Founded {new Date(charity.created_at).getFullYear()}
                  </span>
                  {charity.location && (
                    <span>Location: {charity.location}</span>
                  )}
                </div>
                <p className="text-foreground/80 mb-4 max-w-3xl">
                  {charity.bio}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {stats.volunteers}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Active Volunteers
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">
                      ${stats.totalRaised.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Total Raised
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary-foreground">
                      {stats.activePrograms}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Active Programs
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Link to="/manage-events">
            <Card className="cursor-pointer hover:shadow-md smooth-transition">
              <CardContent className="p-6 text-center">
                <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-medium">Manage Events</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Post and manage volunteer opportunities
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link to="/marketplace">
            <Card className="cursor-pointer hover:shadow-md smooth-transition">
              <CardContent className="p-6 text-center">
                <Heart className="h-8 w-8 text-accent mx-auto mb-2" />
                <h3 className="font-medium">Shop for Good</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Submit products and manage listings
                </p>
              </CardContent>
            </Card>
          </Link>
          <Card className="cursor-pointer hover:shadow-md smooth-transition">
            <CardContent className="p-6 text-center">
              <PlusCircle className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-medium">New Campaign</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Launch a new campaign
              </p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-md smooth-transition">
            <CardContent className="p-6 text-center">
              <MessageSquare className="h-8 w-8 text-accent mx-auto mb-2" />
              <h3 className="font-medium">Messages</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Communicate with volunteers
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="campaigns" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="campaigns">Active Campaigns</TabsTrigger>
            <TabsTrigger value="volunteers">Volunteer Management</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Campaigns */}
          <TabsContent value="campaigns" className="space-y-6">
            <div className="grid gap-6">
              {campaigns.map((campaign) => (
                <Card key={campaign.id} className="organic-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="font-heading">
                          {campaign.title}
                        </CardTitle>
                        <CardDescription>
                          {campaign.donors} donors • Ends{" "}
                          {new Date(campaign.endDate).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <Badge
                        variant={
                          campaign.status === "completed" ? "default" : "secondary"
                        }
                      >
                        {campaign.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>
                          ${campaign.raised.toLocaleString()} / $
                          {campaign.goal.toLocaleString()}
                        </span>
                      </div>
                      <Progress
                        value={(campaign.raised / campaign.goal) * 100}
                        className="h-3"
                      />
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          {Math.round((campaign.raised / campaign.goal) * 100)}%
                          of goal reached
                        </span>
                        <Button variant="outline" size="sm">
                          Manage Campaign
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Volunteers */}
          <TabsContent value="volunteers" className="space-y-6">
            <VolunteerSummary />
          </TabsContent>


          {/* Activity */}
          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest volunteer activities, donations, and organizational updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg"
                    >
                      <div className="flex-shrink-0">
                        {activity.type === "volunteer" && (
                          <Users className="h-5 w-5 text-primary" />
                        )}
                        {activity.type === "donation" && (
                          <Heart className="h-5 w-5 text-accent" />
                        )}
                        {activity.type === "event" && (
                          <Calendar className="h-5 w-5 text-secondary-foreground" />
                        )}
                        {activity.type === "campaign" && (
                          <BarChart3 className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{activity.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {activity.volunteer && `Volunteer: ${activity.volunteer}`}
                          {activity.donor && `Donor: ${activity.donor}`}
                          {activity.participants &&
                            `${activity.participants} participants`}
                          {activity.campaign && `Campaign: ${activity.campaign}`}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {activity.date}
                        </div>
                      </div>
                      <div className="text-right">
                        {activity.hours && (
                          <div className="text-sm font-medium text-primary">
                            {activity.hours} total hours
                          </div>
                        )}
                        {activity.amount && (
                          <div className="text-sm font-medium text-accent">
                            ${activity.amount}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Volunteer Hours</span>
                      <span className="font-bold text-primary">486</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Events Hosted</span>
                      <span className="font-bold">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Funds Raised</span>
                      <span className="font-bold text-accent">$3,240</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* <!-- other analytics cards… --> */}

            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CharityProfile;
