
import { Link } from "react-router-dom";
import { ArrowLeft, Award, Calendar, Heart, ShoppingBag, Star, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Profile = () => {
  // Sample user data - in a real app this would come from authentication/database
  const user = {
    name: "Alex Johnson",
    type: "volunteer", // or "charity"
    joinDate: "January 2024",
    totalHours: 18,
    avatar: "/placeholder.svg",
    bio: "Passionate about making a difference in my community through volunteer work and supporting local causes.",
    location: "San Francisco, CA"
  };

  const badges = [
    { name: "Helping Hand", description: "Completed 1 hour of volunteering", earned: true, icon: "🖐", category: "milestone" },
    { name: "Community Builder", description: "Completed 5 hours of volunteering", earned: true, icon: "🌱", category: "milestone" },
    { name: "Changemaker", description: "Completed 15 hours of volunteering", earned: true, icon: "💫", category: "milestone" },
    { name: "Impact Leader", description: "Completed 30 hours of volunteering", earned: false, icon: "🌟", category: "milestone" },
    { name: "Green Guardian", description: "Volunteered in environmental projects", earned: true, icon: "🌿", category: "cause" },
    { name: "Food Friend", description: "Helped with food distribution", earned: true, icon: "🥫", category: "cause" },
    { name: "Youth Mentor", description: "Supported children or youth", earned: false, icon: "🎓", category: "cause" },
    { name: "First Step", description: "Your first volunteer activity", earned: true, icon: "🌟", category: "special" },
    { name: "Marketplace Explorer", description: "Bought your first charity product", earned: true, icon: "🛒", category: "marketplace" },
    { name: "Weekend Warrior", description: "Volunteered 3 weekends in a row", earned: false, icon: "📆", category: "consistency" }
  ];

  const recentActivity = [
    { type: "volunteer", title: "Community Garden Cleanup", charity: "Green Future Foundation", date: "2024-06-28", hours: 3 },
    { type: "donation", title: "Monthly Donation", charity: "Helping Hands Food Bank", date: "2024-06-25", amount: 25 },
    { type: "purchase", title: "Eco-Friendly Tote Bag", charity: "Green Future Foundation", date: "2024-06-20", amount: 25 },
    { type: "volunteer", title: "Food Bank Distribution", charity: "Helping Hands Food Bank", date: "2024-06-15", hours: 4 }
  ];

  const earnedBadges = badges.filter(badge => badge.earned);
  const nextBadges = badges.filter(badge => !badge.earned).slice(0, 3);

  const getProgressToNext = () => {
    const milestones = [1, 5, 15, 30, 50];
    const nextMilestone = milestones.find(m => m > user.totalHours) || 50;
    const prevMilestone = milestones.filter(m => m <= user.totalHours).pop() || 0;
    return {
      current: user.totalHours - prevMilestone,
      total: nextMilestone - prevMilestone,
      next: nextMilestone
    };
  };

  const progress = getProgressToNext();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
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
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-6">
              <img 
                src={user.avatar} 
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h2>
                <div className="flex items-center space-x-4 text-gray-600 mb-3">
                  <Badge variant="outline" className="capitalize">
                    {user.type} Member
                  </Badge>
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Joined {user.joinDate}
                  </span>
                  <span>{user.location}</span>
                </div>
                <p className="text-gray-700 mb-4">{user.bio}</p>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{user.totalHours}</div>
                    <div className="text-sm text-gray-600">Hours Volunteered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{earnedBadges.length}</div>
                    <div className="text-sm text-gray-600">Badges Earned</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">6</div>
                    <div className="text-sm text-gray-600">Charities Supported</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress to Next Badge */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="h-5 w-5 mr-2" />
              Progress to Next Milestone
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Progress to {progress.next} hours</span>
                <span>{progress.current} / {progress.total} hours</span>
              </div>
              <Progress value={(progress.current / progress.total) * 100} className="h-3" />
              <p className="text-sm text-gray-600">
                You need {progress.total - progress.current} more volunteer hours to earn your next milestone badge!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="badges" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="badges">Badges & Achievements</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            <TabsTrigger value="impact">My Impact</TabsTrigger>
          </TabsList>

          <TabsContent value="badges" className="space-y-6">
            {/* Earned Badges */}
            <Card>
              <CardHeader>
                <CardTitle>Earned Badges ({earnedBadges.length})</CardTitle>
                <CardDescription>
                  Celebrate your achievements and contributions to the community!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {earnedBadges.map((badge, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="text-2xl">{badge.icon}</div>
                      <div>
                        <div className="font-medium text-green-800">{badge.name}</div>
                        <div className="text-sm text-green-600">{badge.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Next Badges to Earn */}
            <Card>
              <CardHeader>
                <CardTitle>Next Badges to Earn</CardTitle>
                <CardDescription>
                  Keep volunteering and engaging to unlock these achievements!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {nextBadges.map((badge, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="text-2xl opacity-50">{badge.icon}</div>
                      <div>
                        <div className="font-medium text-gray-600">{badge.name}</div>
                        <div className="text-sm text-gray-500">{badge.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your latest volunteer work, donations, and marketplace purchases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">
                        {activity.type === 'volunteer' && <Clock className="h-5 w-5 text-blue-600" />}
                        {activity.type === 'donation' && <Heart className="h-5 w-5 text-red-600" />}
                        {activity.type === 'purchase' && <ShoppingBag className="h-5 w-5 text-purple-600" />}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{activity.title}</div>
                        <div className="text-sm text-gray-600">{activity.charity}</div>
                        <div className="text-sm text-gray-500">{activity.date}</div>
                      </div>
                      <div className="text-right">
                        {activity.hours && (
                          <div className="text-sm font-medium text-blue-600">
                            {activity.hours} hours
                          </div>
                        )}
                        {activity.amount && (
                          <div className="text-sm font-medium text-green-600">
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

          <TabsContent value="impact" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Volunteer Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total Hours</span>
                      <span className="font-bold text-blue-600">{user.totalHours}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Events Attended</span>
                      <span className="font-bold">7</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Charities Helped</span>
                      <span className="font-bold">4</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Financial Contributions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total Donated</span>
                      <span className="font-bold text-green-600">$150</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Marketplace Purchases</span>
                      <span className="font-bold text-purple-600">$75</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Combined Impact</span>
                      <span className="font-bold">$225</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Community Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-blue-600 mb-2">4</div>
                    <div className="text-sm text-gray-600">Different Causes Supported</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600 mb-2">2</div>
                    <div className="text-sm text-gray-600">Friends Referred</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange-600 mb-2">3</div>
                    <div className="text-sm text-gray-600">Month Streak</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="text-center mt-12 bg-white rounded-lg p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready for Your Next Adventure?
          </h3>
          <p className="text-gray-600 mb-6">
            Discover new volunteer opportunities and continue making a positive impact in your community.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/posterboard">
              <Button size="lg">
                <Calendar className="h-4 w-4 mr-2" />
                Find Events
              </Button>
            </Link>
            <Link to="/marketplace">
              <Button size="lg" variant="outline">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Shop for Causes
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
