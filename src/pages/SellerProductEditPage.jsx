
    import React, { useState, useEffect } from "react";
    import { useParams, useNavigate } from "react-router-dom";
    import { motion } from "framer-motion";
    import { Button } from "@/components/ui/button";
    import { Input } from "@/components/ui/input";
    import { Label } from "@/components/ui/label";
    import { Textarea } from "@/components/ui/textarea";
    import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, SelectLabel } from "@/components/ui/select";
    import { Checkbox } from "@/components/ui/checkbox";
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
    import { useProducts } from "@/contexts/ProductContext";
    import { useShop } from "@/contexts/ShopContext"; 
    import { useToast } from "@/components/ui/use-toast";
    import { PackagePlus, Save } from "lucide-react";

    const SellerProductEditPage = () => {
      const { id } = useParams(); // Product ID from URL if editing
      const navigate = useNavigate();
      const { getProductById, addProduct, updateProduct, categories: globalCategories } = useProducts();
      const { shop, sellerCategories, loading: shopLoading } = useShop(); 
      const { toast } = useToast();

      const isEditing = Boolean(id);
      const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: "",
        category: "", // This will now store the selected category ID/name
        stock: "",
        discount: 0,
        featured: false,
        freeShipping: false,
        images: [], // Placeholder for image upload later
      });
      const [isLoading, setIsLoading] = useState(false);

      useEffect(() => {
        if (isEditing && !shopLoading && shop) {
          const existingProduct = getProductById(id);
          // Ensure the product belongs to the current seller's shop
          if (existingProduct && existingProduct.shopId === shop.id) {
            setProductData({
              name: existingProduct.name,
              description: existingProduct.description,
              price: existingProduct.price.toString(),
              category: existingProduct.category, // Assuming category is stored as name
              stock: existingProduct.stock?.toString() || "0",
              discount: existingProduct.discount || 0,
              featured: existingProduct.featured || false,
              freeShipping: existingProduct.freeShipping || false,
              images: existingProduct.images || [],
            });
          } else if (existingProduct) {
             toast({ title: "Unauthorized", description: "You can only edit your own products.", variant: "destructive" });
             navigate("/seller/products");
          } else {
            toast({ title: "Product not found", variant: "destructive" });
            navigate("/seller/products");
          }
        } else if (!isEditing && !shopLoading && !shop) {
           // Redirect if trying to add product without a shop
           navigate("/seller/create-shop");
        }
      }, [id, isEditing, getProductById, navigate, toast, shop, shopLoading]);

      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProductData(prev => ({
          ...prev,
          [name]: type === 'checkbox' ? checked : value,
        }));
      };
      
      const handleSelectChange = (value) => {
         setProductData(prev => ({ ...prev, category: value }));
      };

      const handleCheckboxChange = (name, checked) => {
         setProductData(prev => ({ ...prev, [name]: checked }));
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        if (!shop) return; // Should not happen due to useEffect check, but safety first
        
        setIsLoading(true);

        const dataToSave = {
          ...productData,
          price: parseFloat(productData.price) || 0,
          stock: parseInt(productData.stock) || 0,
          discount: parseFloat(productData.discount) || 0,
          // Images would be handled differently with uploads
        };

        // Simulate API call / context update
        setTimeout(() => {
          try {
            if (isEditing) {
              updateProduct(id, dataToSave);
              toast({ title: "Product Updated", description: `"${dataToSave.name}" saved.` });
            } else {
              addProduct(dataToSave);
              toast({ title: "Product Added", description: `"${dataToSave.name}" created.` });
            }
            navigate("/seller/products");
          } catch (error) {
            toast({ title: "Error saving product", description: error.message, variant: "destructive" });
          } finally {
            setIsLoading(false);
          }
        }, 500); // Reduced timeout for snappier feel
      };
      
      if (shopLoading) return <div>Loading...</div>;

      return (
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-6"
          >
             <PackagePlus className="h-6 w-6 text-primary" />
             <h1 className="text-2xl font-bold text-foreground">
                {isEditing ? "Edit Product" : "Add New Product"}
             </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="max-w-3xl mx-auto">
              <CardHeader>
                <CardTitle className="text-lg">Product Information</CardTitle>
                 <CardDescription>Fill in the details for your product.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <Label htmlFor="name">Product Name</Label>
                    <Input id="name" name="name" value={productData.name} onChange={handleChange} required className="compact-input"/>
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" name="description" value={productData.description} onChange={handleChange} required rows={4}/>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Price ($)</Label>
                      <Input id="price" name="price" type="number" step="0.01" min="0" value={productData.price} onChange={handleChange} required className="compact-input"/>
                    </div>
                     <div>
                       <Label htmlFor="category">Category</Label>
                        <Select value={productData.category} onValueChange={handleSelectChange}>
                         <SelectTrigger className="compact-input">
                           <SelectValue placeholder="Select a category" />
                         </SelectTrigger>
                         <SelectContent>
                           {sellerCategories.length > 0 && (
                              <SelectGroup>
                                <SelectLabel>Your Categories</SelectLabel>
                                {sellerCategories.map(cat => (
                                  <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                                ))}
                             </SelectGroup>
                           )}
                           {globalCategories.length > 0 && (
                              <SelectGroup>
                                <SelectLabel>Global Categories</SelectLabel>
                                {globalCategories.map(cat => (
                                  <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                                ))}
                             </SelectGroup>
                           )}
                         </SelectContent>
                       </Select>
                     </div>
                  </div>
                  
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="stock">Stock Quantity</Label>
                        <Input id="stock" name="stock" type="number" min="0" value={productData.stock} onChange={handleChange} required className="compact-input"/>
                      </div>
                       <div>
                        <Label htmlFor="discount">Discount (%)</Label>
                        <Input id="discount" name="discount" type="number" min="0" max="100" value={productData.discount} onChange={handleChange} className="compact-input"/>
                      </div>
                   </div>

                    {/* Image Upload Placeholder */}
                     <div>
                        <Label>Product Images</Label>
                         <div className="border border-dashed border-input rounded-md p-6 text-center text-sm text-muted-foreground">
                            Image upload functionality coming soon.
                         </div>
                     </div>


                    <div className="space-y-2 pt-2">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="featured" name="featured" checked={productData.featured} onCheckedChange={(checked) => handleCheckboxChange('featured', checked)} />
                            <Label htmlFor="featured" className="text-sm font-normal">Mark as Featured Product</Label>
                        </div>
                         <div className="flex items-center space-x-2">
                            <Checkbox id="freeShipping" name="freeShipping" checked={productData.freeShipping} onCheckedChange={(checked) => handleCheckboxChange('freeShipping', checked)} />
                            <Label htmlFor="freeShipping" className="text-sm font-normal">Offer Free Shipping</Label>
                        </div>
                    </div>


                  <div className="flex justify-end space-x-2 pt-4">
                    <Button type="button" variant="ghost" onClick={() => navigate("/seller/products")} className="compact-button">Cancel</Button>
                    <Button type="submit" className="bg-primary hover:bg-primary/90 compact-button" disabled={isLoading}>
                       <Save className="h-4 w-4 mr-2" />
                      {isLoading ? "Saving..." : (isEditing ? "Update Product" : "Add Product")}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      );
    };

    export default SellerProductEditPage;
  