
    import React, { useState } from "react";
    import { motion } from "framer-motion";
    import { Link, useNavigate } from "react-router-dom";
    import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
    import { Button } from "@/components/ui/button";
    import { Input } from "@/components/ui/input";
    import { Label } from "@/components/ui/label";
    import { Checkbox } from "@/components/ui/checkbox";
    import { useToast } from "@/components/ui/use-toast";
    import { useAuth } from "@/contexts/AuthContext";
    import Logo from "@/components/Logo";

    const RegisterPage = () => {
      const [name, setName] = useState("");
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [confirmPassword, setConfirmPassword] = useState("");
      const [showPassword, setShowPassword] = useState(false);
      const [agreeTerms, setAgreeTerms] = useState(false);
      const [isLoading, setIsLoading] = useState(false);
      
      const { register } = useAuth();
      const { toast } = useToast();
      const navigate = useNavigate();
      
      const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!agreeTerms) {
          toast({
            title: "Terms required",
            description: "You must agree to the terms and conditions to register.",
            variant: "destructive",
          });
          return;
        }
        
        if (password !== confirmPassword) {
          toast({
            title: "Passwords don't match",
            description: "Please make sure your passwords match.",
            variant: "destructive",
          });
          return;
        }
        
        setIsLoading(true);
        
        // Simulate API call
        setTimeout(() => {
          try {
            // In a real app, this would register with a backend
            if (name && email && password) {
              register({ name, email });
              
              toast({
                title: "Registration successful",
                description: "Welcome to ShopZone! Your account has been created.",
              });
              
              navigate("/");
            } else {
              toast({
                title: "Registration failed",
                description: "Please fill in all required fields.",
                variant: "destructive",
              });
            }
          } catch (error) {
            toast({
              title: "Registration failed",
              description: error.message || "An error occurred during registration.",
              variant: "destructive",
            });
          } finally {
            setIsLoading(false);
          }
        }, 1000);
      };
      
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md"
          >
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <Logo />
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900">Create your account</h2>
              <p className="mt-2 text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-shopzone hover:text-shopzone-dark">
                  Sign in
                </Link>
              </p>
            </div>
            
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      className="pl-10"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email address</Label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="pl-10"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      className="pl-10 pr-10"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="confirm-password"
                      name="confirm-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      className="pl-10"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Checkbox
                    id="agree-terms"
                    checked={agreeTerms}
                    onCheckedChange={setAgreeTerms}
                  />
                  <Label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-600">
                    I agree to the{" "}
                    <Link to="/terms" className="font-medium text-shopzone hover:text-shopzone-dark">
                      Terms and Conditions
                    </Link>
                  </Label>
                </div>
              </div>
              
              <div>
                <Button
                  type="submit"
                  className="w-full bg-shopzone hover:bg-shopzone-dark"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                      Registering...
                    </div>
                  ) : (
                    "Register"
                  )}
                </Button>
              </div>
              
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      toast({
                        title: "Social login",
                        description: "Social login is not implemented in this demo.",
                      });
                    }}
                  >
                    <svg className="h-5 w-5 mr-2" fill="#4285F4" viewBox="0 0 24 24">
                      <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" />
                    </svg>
                    Google
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      toast({
                        title: "Social login",
                        description: "Social login is not implemented in this demo.",
                      });
                    }}
                  >
                    <svg className="h-5 w-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </Button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      );
    };

    export default RegisterPage;
  