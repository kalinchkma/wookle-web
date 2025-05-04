
    import React, { useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { useShop } from '@/contexts/ShopContext';
    import { useAuth } from '@/contexts/AuthContext';
    import { useToast } from '@/components/ui/use-toast';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Textarea } from '@/components/ui/textarea';
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
    import { Store } from 'lucide-react';

    const CreateShopPage = () => {
      const navigate = useNavigate();
      const { createShop, loading: shopLoading } = useShop();
      const { user } = useAuth();
      const { toast } = useToast();
      
      const [shopName, setShopName] = useState('');
      const [description, setDescription] = useState('');
      const [location, setLocation] = useState('');
      const [isLoading, setIsLoading] = useState(false);

      const handleSubmit = (e) => {
        e.preventDefault();
        if (!user || user.role !== 'seller') {
          toast({ title: "Unauthorized", description: "You must be a seller to create a shop.", variant: "destructive" });
          return;
        }
        
        setIsLoading(true);
        try {
          createShop({ name: shopName, description, location });
          toast({ title: "Shop Created!", description: `Your shop "${shopName}" is ready.` });
          navigate('/seller/dashboard'); 
        } catch (error) {
          toast({ title: "Error creating shop", description: error.message, variant: "destructive" });
          setIsLoading(false);
        }
      };
      
      if (shopLoading) {
        return <div>Loading...</div>; // Add a proper loading state later
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
                <div className="flex justify-center mb-3">
                  <Store className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-2xl">Create Your Shop</CardTitle>
                <CardDescription>Set up your storefront on ShopZone.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="shopName">Shop Name</Label>
                    <Input 
                      id="shopName" 
                      value={shopName} 
                      onChange={(e) => setShopName(e.target.value)} 
                      required 
                      placeholder="e.g., Artisan Crafts Co."
                      className="compact-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Shop Description</Label>
                    <Textarea 
                      id="description" 
                      value={description} 
                      onChange={(e) => setDescription(e.target.value)} 
                      required 
                      placeholder="Describe what makes your shop unique"
                      rows={3}
                    />
                  </div>
                   <div>
                    <Label htmlFor="location">Location (City, Country)</Label>
                    <Input 
                      id="location" 
                      value={location} 
                      onChange={(e) => setLocation(e.target.value)} 
                      placeholder="e.g., London, UK"
                       className="compact-input"
                    />
                  </div>
                  {/* Add more fields like logo upload later */}
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 compact-button" 
                    disabled={isLoading || !shopName || !description}
                  >
                    {isLoading ? 'Creating Shop...' : 'Create Shop'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      );
    };

    export default CreateShopPage;
  