
import { Link } from "react-router-dom";
import { Calendar, Heart, ShoppingBag, User, Award, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import heroImage from "@/assets/hero-community.jpg";

const Index = () => {
  return (
    <div className="min-h-screen gradient-warm">
      {/* Navigation Header */}
      <nav className="bg-card/95 backdrop-blur-sm border-b border-border organic-shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-primary mr-2" />
              <span className="text-2xl font-heading font-bold text-foreground">CharityConnect</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/posterboard">
                <Button variant="ghost" className="flex items-center smooth-transition hover:text-primary">
                  <Calendar className="h-4 w-4 mr-2" />
                  Community Events
                </Button>
              </Link>
              <Link to="/donations">
                <Button variant="ghost" className="flex items-center smooth-transition hover:text-primary">
                  <Heart className="h-4 w-4 mr-2" />
                  Support Causes
                </Button>
              </Link>
              <Link to="/marketplace">
                <Button variant="ghost" className="flex items-center smooth-transition hover:text-primary">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Shop for Good
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="ghost" className="flex items-center smooth-transition hover:text-primary">
                  <User className="h-4 w-4 mr-2" />
                  Your Journey
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h1 className="text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6 leading-tight">
              Growing <span className="text-primary">community</span> through kindness
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed">
              Join a warm community where every act of service creates ripples of positive change. 
              Discover meaningful ways to contribute, connect with local causes, and celebrate your impact together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/posterboard">
                <Button size="lg" className="gradient-organic text-white hover:scale-105 smooth-transition organic-shadow">
                  Explore Opportunities
                </Button>
              </Link>
              <Link to="/profile">
                <Button size="lg" variant="outline" className="hover:bg-secondary smooth-transition">
                  Begin Your Journey
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="organic-border overflow-hidden organic-shadow">
              <img 
                src={heroImage} 
                alt="Diverse community of volunteers working together in various activities like planting trees and helping others"
                className="w-full h-96 lg:h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
            Four beautiful ways to create impact
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Each path offers unique opportunities to connect with your community and make a meaningful difference
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="border border-border hover:border-primary/50 smooth-transition cursor-pointer warm-shadow hover:organic-shadow group">
            <Link to="/posterboard">
              <CardHeader className="text-center">
                <Calendar className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 smooth-transition" />
                <CardTitle className="text-xl font-heading">Community Events</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  Find local volunteer opportunities and community gatherings where 
                  you can connect with neighbors and create positive change together.
                </CardDescription>
              </CardContent>
            </Link>
          </Card>

          <Card className="border border-border hover:border-primary/50 smooth-transition cursor-pointer warm-shadow hover:organic-shadow group">
            <Link to="/donations">
              <CardHeader className="text-center">
                <Heart className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 smooth-transition" />
                <CardTitle className="text-xl font-heading">Support Causes</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  Make secure, meaningful contributions to local charities and 
                  see the direct impact of your generosity in the community.
                </CardDescription>
              </CardContent>
            </Link>
          </Card>

          <Card className="border border-border hover:border-primary/50 smooth-transition cursor-pointer warm-shadow hover:organic-shadow group">
            <Link to="/marketplace">
              <CardHeader className="text-center">
                <ShoppingBag className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 smooth-transition" />
                <CardTitle className="text-xl font-heading">Shop for Good</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  Purchase handcrafted items and products from local charities, 
                  where every purchase directly supports their important missions.
                </CardDescription>
              </CardContent>
            </Link>
          </Card>

          <Card className="border border-border hover:border-primary/50 smooth-transition cursor-pointer warm-shadow hover:organic-shadow group">
            <Link to="/profile">
              <CardHeader className="text-center">
                <Award className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 smooth-transition" />
                <CardTitle className="text-xl font-heading">Celebrate Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  Track your volunteer journey and earn beautiful badges that 
                  celebrate your growing impact and dedication to community service.
                </CardDescription>
              </CardContent>
            </Link>
          </Card>
        </div>
      </div>

      {/* Stats Section */}
      <div className="gradient-organic text-white py-20 organic-border my-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-heading font-bold mb-4">Growing together, one act of kindness at a time</h3>
            <p className="text-lg opacity-90">Our community's collective impact continues to flourish</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="group">
              <div className="text-5xl font-heading font-bold mb-2 group-hover:scale-110 smooth-transition">1,200+</div>
              <div className="text-white/80 text-lg">Caring volunteers</div>
            </div>
            <div className="group">
              <div className="text-5xl font-heading font-bold mb-2 group-hover:scale-110 smooth-transition">340+</div>
              <div className="text-white/80 text-lg">Partner organizations</div>
            </div>
            <div className="group">
              <div className="text-5xl font-heading font-bold mb-2 group-hover:scale-110 smooth-transition">25,000+</div>
              <div className="text-white/80 text-lg">Hours of service</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="bg-card p-12 organic-border warm-shadow">
          <h2 className="text-4xl font-heading font-bold text-foreground mb-6">
            Your community awaits
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Take the first step towards meaningful connection and positive impact. 
            Every volunteer journey begins with a single moment of choosing to care.
          </p>
          <Link to="/profile">
            <Button size="lg" className="gradient-organic text-white hover:scale-105 smooth-transition organic-shadow px-8 py-4 text-lg">
              Start Your Journey Today
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
