
    import React, { useState, useEffect } from "react";
    import { motion } from "framer-motion";
    import { Plus, Package, Search as SearchIcon, X } from "lucide-react";
    import { Button } from "@/components/ui/button";
    import { Input } from "@/components/ui/input";
    import { useNavigate } from "react-router-dom";
    import SellerProductTable from "@/components/seller/SellerProductTable";
    import { useProducts } from "@/contexts/ProductContext";
    import { useShop } from "@/contexts/ShopContext";
    import { useToast } from "@/components/ui/use-toast";

    const SellerProductsPage = () => {
      const navigate = useNavigate();
      const { getShopProducts, deleteProduct, loading: productsLoading } = useProducts();
      const { shop, loading: shopLoading } = useShop();
      const { toast } = useToast();
      
      const [shopProducts, setShopProducts] = useState([]);
      const [searchTerm, setSearchTerm] = useState("");
      const [filteredProducts, setFilteredProducts] = useState([]);

      useEffect(() => {
        if (shop && !productsLoading) {
          const products = getShopProducts(shop.id);
          setShopProducts(products);
          setFilteredProducts(products); 
        }
      }, [shop, productsLoading, getShopProducts]);

      useEffect(() => {
        const lowerCaseTerm = searchTerm.toLowerCase();
        const filtered = shopProducts.filter(product => 
            product.name.toLowerCase().includes(lowerCaseTerm) ||
            product.category.toLowerCase().includes(lowerCaseTerm)
        );
        setFilteredProducts(filtered);
      }, [searchTerm, shopProducts]);

      const handleDeleteProduct = async (productId, productName) => {
        try {
          await deleteProduct(productId);
          // Update local state immediately for responsiveness
          const updatedProducts = shopProducts.filter(p => p.id !== productId);
          setShopProducts(updatedProducts);
          setFilteredProducts(updatedProducts);
          toast({ title: "Product Deleted", description: `"${productName}" removed.` });
        } catch (error) {
          toast({ title: "Error deleting product", description: error.message, variant: "destructive" });
        }
      };
      
      const isLoading = productsLoading || shopLoading;

      return (
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-foreground flex items-center gap-2"
            >
              <Package className="h-6 w-6" /> My Products ({filteredProducts.length})
            </motion.h1>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
               <div className="relative flex-grow sm:w-64">
                 <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                 <Input 
                   placeholder="Search products..."
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   className="pl-8 compact-input"
                 />
                  {searchTerm && (
                     <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7" onClick={() => setSearchTerm('')}>
                         <X className="h-4 w-4" />
                     </Button>
                  )}
               </div>
               <Button 
                onClick={() => navigate('/seller/products/new')}
                className="bg-primary hover:bg-primary/90 compact-button"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </div>
          </div>
          
           {isLoading ? (
              <div className="text-center py-10">Loading products...</div>
           ) : (
             <SellerProductTable 
               products={filteredProducts} 
               onDeleteProduct={handleDeleteProduct} 
             />
           )}
          
        </div>
      );
    };

    export default SellerProductsPage;
  