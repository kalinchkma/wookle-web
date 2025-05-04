
    import React, { useState, useEffect } from 'react';
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
    import { Store, X, Plus } from 'lucide-react';

    const SellerShopSettingsPage = () => {
      const navigate = useNavigate();
      const { shop, updateShop, loading: shopLoading, sellerCategories, addSellerCategory, removeSellerCategory } = useShop();
      const { user } = useAuth();
      const { toast } = useToast();
      
      const [shopName, setShopName] = useState('');
      const [description, setDescription] = useState('');
      const [location, setLocation] = useState('');
      const [newCategoryName, setNewCategoryName] = useState('');
      const [isSaving, setIsSaving] = useState(false);
      const [isAddingCategory, setIsAddingCategory] = useState(false);

      useEffect(() => {
        if (shop) {
          setShopName(shop.name || '');
          setDescription(shop.description || '');
          setLocation(shop.location || '');
        }
      }, [shop]);

      const handleSaveChanges = (e) => {
        e.preventDefault();
        if (!user || !shop || shop.sellerId !== user.id) {
          toast({ title: "Unauthorized", variant: "destructive" });
          return;
        }
        
        setIsSaving(true);
        try {
          updateShop({ name: shopName, description, location });
          toast({ title: "Shop Updated!", description: "Your shop details have been saved." });
        } catch (error) {
          toast({ title: "Error updating shop", description: error.message, variant: "destructive" });
        } finally {
          setIsSaving(false);
        }
      };

      const handleAddCategory = async () => {
         if (!newCategoryName.trim()) return;
         setIsAddingCategory(true);
         try {
           await addSellerCategory(newCategoryName.trim());
           toast({ title: "Category Added", description: `"${newCategoryName}" added to your shop categories.` });
           setNewCategoryName('');
         } catch (error) {
           toast({ title: "Error adding category", description: error.message, variant: "destructive" });
         } finally {
           setIsAddingCategory(false);
         }
       };

      const handleRemoveCategory = async (categoryId, categoryName) => {
         try {
           await removeSellerCategory(categoryId);
           toast({ title: "Category Removed", description: `"${categoryName}" removed.` });
         } catch (error) {
           toast({ title: "Error removing category", description: error.message, variant: "destructive" });
         }
       };

      if (shopLoading) return <div>Loading shop settings...</div>;
      if (!shop) return <div>Shop not found. <button onClick={() => navigate('/seller/create-shop')}>Create one?</button></div>;

      return (
        <div className="container mx-auto px-4 py-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-foreground mb-6"
          >
            Shop Settings
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Shop Details Form */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:col-span-2"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2"><Store className="h-5 w-5 text-primary" /> Shop Details</CardTitle>
                  <CardDescription>Update your shop's public information.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveChanges} className="space-y-4">
                    <div>
                      <Label htmlFor="shopName">Shop Name</Label>
                      <Input id="shopName" value={shopName} onChange={(e) => setShopName(e.target.value)} required className="compact-input" />
                    </div>
                    <div>
                      <Label htmlFor="description">Shop Description</Label>
                      <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required rows={4} />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="compact-input" />
                    </div>
                    {/* Add logo etc. here */}
                    <Button type="submit" className="bg-primary hover:bg-primary/90 compact-button" disabled={isSaving}>
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Shop Categories */}
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
             >
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Shop Categories</CardTitle>
                  <CardDescription>Manage categories specific to your shop.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="space-y-2">
                      {sellerCategories.length > 0 ? (
                        sellerCategories.map(cat => (
                          <div key={cat.id} className="flex items-center justify-between bg-secondary p-2 rounded-md text-sm">
                            <span>{cat.name}</span>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6 text-muted-foreground hover:text-destructive"
                              onClick={() => handleRemoveCategory(cat.id, cat.name)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground text-center py-2">No categories added yet.</p>
                      )}
                   </div>

                   <div className="flex gap-2 pt-2 border-t">
                      <Input 
                        placeholder="New category name"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        className="compact-input flex-grow"
                      />
                       <Button 
                         size="icon" 
                         className="h-9 w-9 bg-primary hover:bg-primary/90 flex-shrink-0"
                         onClick={handleAddCategory}
                         disabled={isAddingCategory || !newCategoryName.trim()}
                       >
                         <Plus className="h-4 w-4" />
                       </Button>
                   </div>
                 </CardContent>
              </Card>
             </motion.div>
          </div>
        </div>
      );
    };

    export default SellerShopSettingsPage;
  