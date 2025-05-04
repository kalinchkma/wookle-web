
    import React from "react";
    import { motion } from "framer-motion";
    import { useAuth } from "@/contexts/AuthContext";
    import { Button } from "@/components/ui/button";
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
    import { useToast } from "@/components/ui/use-toast";
    import { useNavigate } from "react-router-dom";
    import { Store, CheckCircle } from "lucide-react";

    const BecomeSellerPage = () => {
      const { user, updateUserRole } = useAuth();
      const { toast } = useToast();
      const navigate = useNavigate();

      const handleBecomeSeller = () => {
        // In a real app, this might involve backend validation, agreements, etc.
        updateUserRole('seller');
        toast({
          title: "Congratulations!",
          description: "You are now registered as a seller. Explore your Seller Dashboard.",
        });
        navigate("/seller/dashboard");
      };

      if (user?.role === 'seller') {
        return (
          <div className="container mx-auto px-4 py-8 flex flex-col items-center text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">You are already a Seller!</h1>
            <p className="text-gray-600 mb-8">Start managing your store and products.</p>
            <Button onClick={() => navigate('/seller/dashboard')} className="bg-shopzone hover:bg-shopzone-dark">
              Go to Seller Dashboard
            </Button>
          </div>
        );
      }

      return (
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Store className="h-12 w-12 text-shopzone" />
                </div>
                <CardTitle className="text-3xl">Become a ShopZone Seller</CardTitle>
                <CardDescription className="mt-2 text-lg">
                  Reach millions of customers and grow your business.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <p className="text-gray-600">
                  Join our community of sellers and start listing your products today. 
                  Benefit from our platform's reach, secure payments, and seller support.
                </p>
                
                <ul className="text-left space-y-2 list-disc list-inside">
                  <li>Access to a large customer base</li>
                  <li>Easy product listing and management</li>
                  <li>Secure and reliable payment processing</li>
                  <li>Seller analytics and insights</li>
                  <li>Dedicated seller support</li>
                </ul>
                
                <Button 
                  onClick={handleBecomeSeller} 
                  className="w-full bg-shopzone hover:bg-shopzone-dark"
                  size="lg"
                >
                  Register as a Seller
                </Button>
                
                <p className="text-xs text-gray-500">
                  By clicking "Register as a Seller", you agree to ShopZone's Seller Agreement and Privacy Policy.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      );
    };

    export default BecomeSellerPage;
  