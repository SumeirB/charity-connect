import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, User, Building2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { signUp } from "@/lib/auth";
import { supabase } from "@/lib/supabaseClient";


const Login = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [userType, setUserType] = useState<string>("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error || !data.user) {
        alert(`Login failed: ${error?.message}`);
        return setIsLoading(false);
      }

      // ❓ fetch to see if this user is in charities
      const { data: charityProfile } = await supabase
        .from("charities")
        .select("id")
        .eq("auth_id", data.user.id)
        .single();

      if (charityProfile) {
        navigate("/charity-profile");
      } else {
        navigate("/profile");
      }
    } catch (err) {
      alert("Unexpected error, check console.");
    } finally {
      setIsLoading(false);
    }
  };



  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1) Sign up in Supabase Auth
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (signUpError || !data.user) {
        console.error("Supabase sign-up error:", signUpError);
        alert(`Sign-up failed: ${signUpError?.message}`);
        return setIsLoading(false);
      }

      // 2) Build the row to insert
      const table = userType === "charity" ? "charities" : "students";
      const row: any = { email, name };
          // <-- ADD THIS LINE: -->
      row.auth_id = data.user.id;
      if (userType === "student") {
        row.total_hours = 0;
      }

      // 3) Insert into your custom table
      const { error: insertError } = await supabase.from(table).insert([row]);
      // …inside handleSignUp, after calling supabase.from(table).insert…
      if (insertError) {
        console.error("Insert into", table, "failed:", insertError);
        alert(`Could not create profile: ${insertError.message}`);
        setIsLoading(false);
        return;
      }


      // 4) Redirect
      navigate(userType === "charity" ? "/charity-profile" : "/profile");

    } catch (error) {
      console.error("Unexpected error in sign-up:", error);
      alert("An unexpected error occurred. Check console.");
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-gradient-warm flex items-center justify-center px-4">
      {/* Header */}
      <div className="absolute top-4 left-4">
        <Link to="/">
          <Button variant="ghost" size="sm" className="text-foreground/70 hover:text-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>

      <div className="w-full max-w-md">
        <Card className="organic-shadow">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl font-heading">Welcome Back</CardTitle>
              <CardDescription className="text-muted-foreground">
                Sign in to your CharityConnect account
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={mode === "login" ? handleLogin : handleSignUp} className="space-y-6">
              {/* User Type Selection */}
              <div className="space-y-2">
                <Label htmlFor="userType" className="text-sm font-medium">
                  Account Type
                </Label>
                <Select value={userType} onValueChange={setUserType}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>Student/Volunteer</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="charity">
                      <div className="flex items-center space-x-2">
                        <Building2 className="h-4 w-4" />
                        <span>Charity Organization</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/*Name - only for sign up*/}
              {mode === "signup" && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={mode === "signup"}
                    className="w-full"
                  />
                </div>
              )}


              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || !email || !password}
              >
                {isLoading
                  ? mode === "login"
                    ? "Signing In..."
                    : "Creating Account..."
                  : mode === "login"
                  ? "Sign In"
                  : "Sign Up"}
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">New to CharityConnect?</span>
                </div>
              </div>

              {/* Sign Up Link */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                  <Button
                    variant="link"
                    className="p-0 h-auto font-medium text-primary"
                    onClick={() => setMode(mode === "login" ? "signup" : "login")}
                    type="button"
                  >
                    {mode === "login" ? "Create Account" : "Sign In"}
                  </Button>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            Ready for Supabase integration - modular authentication system
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
