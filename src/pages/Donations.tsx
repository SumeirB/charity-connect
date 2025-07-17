
import { Link } from "react-router-dom";
import { Heart, ArrowLeft, Star, Users, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const Donations = () => {
  const [donations, setDonations] = useState<any[]>([]);
const [loading, setLoading] = useState(true);
useEffect(() => {
  const fetchDonations = async () => {
    const { data, error } = await supabase
      .from('donations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setDonations(data);
    }
    setLoading(false);
  };

  fetchDonations();
}, []);

  const charities = [
    {
      id: 1,
      name: "Green Future Foundation",
      description: "Dedicated to environmental conservation and sustainable community development.",
      category: "Environmental",
      logo: "/placeholder.svg",
      rating: 4.8,
      volunteers: 156,
      currentGoal: 50000,
      raised: 32500,
      supporters: 245,
      impact: "Planted 1,200 trees this year"
    },
    {
      id: 2,
      name: "Helping Hands Food Bank",
      description: "Fighting hunger in our community by providing nutritious meals to families in need.",
      category: "Food Security",
      logo: "/placeholder.svg",
      rating: 4.9,
      volunteers: 89,
      currentGoal: 25000,
      raised: 18750,
      supporters: 189,
      impact: "Fed 500 families last month"
    },
    {
      id: 3,
      name: "Literacy First",
      description: "Promoting literacy and education for children and adults in underserved communities.",
      category: "Education",
      logo: "/placeholder.svg",
      rating: 4.7,
      volunteers: 67,
      currentGoal: 15000,
      raised: 12000,
      supporters: 134,
      impact: "Helped 200 people learn to read"
    },
    {
      id: 4,
      name: "Paws & Hearts Shelter",
      description: "Rescuing, rehabilitating, and rehoming abandoned and abused animals.",
      category: "Animal Welfare",
      logo: "/placeholder.svg",
      rating: 4.9,
      volunteers: 112,
      currentGoal: 30000,
      raised: 22500,
      supporters: 298,
      impact: "Rescued 150 animals this year"
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Environmental: "bg-green-100 text-green-800",
      "Food Security": "bg-orange-100 text-orange-800",
      Education: "bg-blue-100 text-blue-800",
      "Animal Welfare": "bg-purple-100 text-purple-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

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
            <h1 className="text-3xl font-bold text-gray-900">Donations</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Support Local Charities
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Make a direct impact with secure, easy donations. Every contribution helps 
            these amazing organizations continue their vital work in our community.
          </p>
        </div>
{/* Live Donations from Supabase */}
<div className="mb-8">
  <h2 className="text-2xl font-bold mb-4">Latest Donations</h2>
  {loading ? (
    <p>Loading donations...</p>
  ) : donations.length === 0 ? (
    <p>No donations yet.</p>
  ) : (
    <ul className="space-y-2">
      {donations.map((d) => (
        <li key={d.id} className="border p-2 rounded bg-white">
          <strong>{d.donor_name}</strong> donated ${d.amount}
        </li>
      ))}
    </ul>
  )}
</div>

        {/* Charities Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {charities.map((charity) => (
            <Card key={charity.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge className={getCategoryColor(charity.category)}>
                    {charity.category}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    {charity.rating}
                  </div>
                </div>
                <CardTitle className="text-xl mb-2">{charity.name}</CardTitle>
                <CardDescription>{charity.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                {/* Impact Statement */}
                <div className="bg-blue-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-blue-800 font-medium">
                    Recent Impact: {charity.impact}
                  </p>
                </div>

                {/* Funding Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Current Campaign</span>
                    <span>${charity.raised.toLocaleString()} / ${charity.currentGoal.toLocaleString()}</span>
                  </div>
                  <Progress 
                    value={(charity.raised / charity.currentGoal) * 100} 
                    className="h-2"
                  />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    {charity.volunteers} volunteers
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Heart className="h-4 w-4 mr-2" />
                    {charity.supporters} supporters
                  </div>
                </div>

                {/* Donation Buttons */}
                <div className="space-y-3">
                  <div className="grid grid-cols-4 gap-2">
                    <Button variant="outline" size="sm">$10</Button>
                    <Button variant="outline" size="sm">$25</Button>
                    <Button variant="outline" size="sm">$50</Button>
                    <Button variant="outline" size="sm">$100</Button>
                  </div>
                  <div className="flex space-x-2">
                    <Button className="flex-1 bg-green-600 hover:bg-green-700">
                      <Heart className="h-4 w-4 mr-2" />
                      Donate Now
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Learn More
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Impact Summary */}
        <div className="mt-12 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg p-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4">Your Donations Make a Real Difference</h3>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div>
                <div className="text-3xl font-bold mb-2">$125,750</div>
                <div className="text-green-100">Total Donated This Month</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">1,850</div>
                <div className="text-green-100">Lives Directly Impacted</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">22</div>
                <div className="text-green-100">Active Campaigns</div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 bg-white rounded-lg p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Want to Do More Than Donate?
          </h3>
          <p className="text-gray-600 mb-6">
            Consider volunteering your time and skills. Many of these charities have ongoing volunteer opportunities.
          </p>
          <Link to="/posterboard">
            <Button size="lg" variant="outline">
              <Target className="h-4 w-4 mr-2" />
              Find Volunteer Opportunities
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Donations;
