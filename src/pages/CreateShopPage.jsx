
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
    import { Store, Image as ImageIcon, Loader2 } from 'lucide-react';

    const CreateShopPage = () => {
      const navigate = useNavigate();
      const { createShop, loading: shopContextLoading } = useShop();
      const { user } = useAuth();
      const { toast } = useToast();
      
      const [shopName, setShopName] = useState('');
      const [description, setDescription] = useState('');
      const [location, setLocation] = useState('');
      const [bannerUrl, setBannerUrl] = useState('');
      const [profileUrl, setProfileUrl] = useState('');
      const [isLoading, setIsLoading] = useState(false);

      const handleImageUpload = (e, setImageFunc) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImageFunc(reader.result); 
          };
          reader.readAsDataURL(file);
        } else {
          toast({ title: "Invalid File", description: "Please select an image file.", variant: "destructive" });
        }
      };


      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user || user.role !== 'seller') {
          toast({ title: "Unauthorized", description: "You must be a seller to create a shop.", variant: "destructive" });
          return;
        }
        
        setIsLoading(true);
        try {
          await createShop({ 
            name: shopName, 
            description, 
            location,
            bannerUrl, 
            profileUrl 
          });
          toast({ title: "Shop Created!", description: `Your shop "${shopName}" is ready.` });
          navigate('/seller/dashboard'); 
        } catch (error) {
          toast({ title: "Error creating shop", description: error.message, variant: "destructive" });
        } finally {
          setIsLoading(false);
        }
      };
      
      if (shopContextLoading) {
        return <div className="flex justify-center items-center h-screen"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
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
                <CardDescription>Set up your storefront and start selling.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
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

                  <div>
                    <Label htmlFor="bannerImage">Shop Banner Image</Label>
                    <div className="flex items-center gap-2">
                       <Input 
                         id="bannerImage" 
                         type="file" 
                         accept="image/*"
                         onChange={(e) => handleImageUpload(e, setBannerUrl)} 
                         className="hidden"
                       />
                       <Button type="button" variant="outline" className="compact-button text-xs" onClick={() => document.getElementById('bannerImage').click()}>
                         <ImageIcon className="mr-2 h-3.5 w-3.5"/> Upload Banner
                       </Button>
                       {bannerUrl && <img  alt="Banner Preview" class="h-10 w-20 object-cover rounded border" src="https://images.unsplash.com/photo-1595872018818-97555653a011" />}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="profileImage">Shop Profile Picture</Label>
                     <div className="flex items-center gap-2">
                        <Input 
                          id="profileImage" 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, setProfileUrl)} 
                          className="hidden"
                        />
                        <Button type="button" variant="outline" className="compact-button text-xs" onClick={() => document.getElementById('profileImage').click()}>
                          <ImageIcon className="mr-2 h-3.5 w-3.5"/> Upload Profile Pic
                        </Button>
                        {profileUrl && <img  alt="Profile Preview" class="h-10 w-10 object-cover rounded-full border" src="https://images.unsplash.com/photo-1486007483341-86877662e5ac" />}
                     </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 compact-button mt-2" 
                    disabled={isLoading || !shopName || !description}
                  >
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
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
  