
    import React, { useState, useEffect } from "react";
    import { motion } from "framer-motion";
    import { Plus, Package, Search as SearchIcon, X, Filter, ChevronDown, List, LayoutGrid } from "lucide-react";
    import { Button } from "@/components/ui/button";
    import { Input } from "@/components/ui/input";
    import { useNavigate } from "react-router-dom";
    import SellerProductTable from "@/components/seller/SellerProductTable";
    import SellerProductGrid from "@/components/seller/SellerProductGrid";
    import { useProducts } from "@/contexts/ProductContext";
    import { useShop } from "@/contexts/ShopContext";
    import { useToast } from "@/components/ui/use-toast";
    import {
      DropdownMenu,
      DropdownMenuContent,
      DropdownMenuCheckboxItem,
      DropdownMenuLabel,
      DropdownMenuSeparator,
      DropdownMenuTrigger,
    } from "@/components/ui/dropdown-menu";
    import { Loader2 } from "lucide-react";

    const SellerProductsPage = () => {
      const navigate = useNavigate();
      const { getShopProducts, deleteProduct, loading: productsLoading } = useProducts();
      const { shop, sellerCategories, loading: shopLoading } = useShop();
      const { toast } = useToast();
      
      const [allShopProducts, setAllShopProducts] = useState([]);
      const [searchTerm, setSearchTerm] = useState("");
      const [filteredProducts, setFilteredProducts] = useState([]);
      const [selectedCategoryFilters, setSelectedCategoryFilters] = useState([]);
      const [selectedStatusFilters, setSelectedStatusFilters] = useState([]);
      const [viewMode, setViewMode] = useState("grid"); // 'table' or 'grid'

      const productStatuses = ["Active", "Draft", "Archived"]; // Example statuses

      useEffect(() => {
        if (shop && !productsLoading) {
          const products = getShopProducts(shop.id);
          setAllShopProducts(products);
        }
      }, [shop, productsLoading, getShopProducts]);

      useEffect(() => {
        let tempProducts = [...allShopProducts];
        const lowerCaseTerm = searchTerm.toLowerCase();

        if (lowerCaseTerm) {
          tempProducts = tempProducts.filter(product => 
            product.name.toLowerCase().includes(lowerCaseTerm) ||
            (product.sku && product.sku.toLowerCase().includes(lowerCaseTerm)) 
          );
        }

        if (selectedCategoryFilters.length > 0) {
          tempProducts = tempProducts.filter(product => selectedCategoryFilters.includes(product.category));
        }

        if (selectedStatusFilters.length > 0) {
          tempProducts = tempProducts.filter(product => selectedStatusFilters.includes(product.status || 'Active'));
        }
        
        setFilteredProducts(tempProducts);
      }, [searchTerm, allShopProducts, selectedCategoryFilters, selectedStatusFilters]);

      const handleDeleteProduct = async (productId, productName) => {
        try {
          await deleteProduct(productId);
          const updatedProducts = allShopProducts.filter(p => p.id !== productId);
          setAllShopProducts(updatedProducts);
          toast({ title: "Product Deleted", description: `"${productName}" removed.` });
        } catch (error) {
          toast({ title: "Error deleting product", description: error.message, variant: "destructive" });
        }
      };
      
      const isLoading = productsLoading || shopLoading;

      const handleCategoryFilterChange = (categoryName) => {
        setSelectedCategoryFilters(prev => 
          prev.includes(categoryName) 
            ? prev.filter(c => c !== categoryName) 
            : [...prev, categoryName]
        );
      };

      const handleStatusFilterChange = (statusName) => {
        setSelectedStatusFilters(prev => 
          prev.includes(statusName) 
            ? prev.filter(s => s !== statusName) 
            : [...prev, statusName]
        );
      };
      
      const clearAllFilters = () => {
        setSearchTerm("");
        setSelectedCategoryFilters([]);
        setSelectedStatusFilters([]);
      };

      const activeFilterCount = (selectedCategoryFilters.length > 0 ? 1 : 0) + (selectedStatusFilters.length > 0 ? 1 : 0);


      return (
        <div className="container mx-auto px-4 py-6 md:py-8">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-5"
          >
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2.5">
              <Package className="h-6 w-6 text-primary" /> 
              My Products 
              {!isLoading && <span className="text-base font-normal text-muted-foreground">({filteredProducts.length})</span>}
            </h1>
            <Button 
              onClick={() => navigate('/seller/products/new')}
              className="bg-primary hover:bg-primary/90 compact-button w-full md:w-auto order-first md:order-last"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New Product
            </Button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-card border rounded-lg p-3 md:p-4 mb-6 shadow-sm"
          >
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3">
               <div className="relative flex-grow w-full md:w-auto">
                 <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted-foreground pointer-events-none" />
                 <Input 
                   placeholder="Search by name or SKU..."
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   className="pl-10 compact-input text-sm h-9 w-full"
                 />
                  {searchTerm && (
                     <Button variant="ghost" size="icon" className="absolute right-1.5 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-foreground" onClick={() => setSearchTerm('')}>
                         <X className="h-4 w-4" />
                     </Button>
                  )}
               </div>
               
               <div className="flex items-center gap-2 w-full md:w-auto">
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="compact-button text-xs h-9 w-full md:w-auto justify-between">
                         <Filter className="mr-2 h-3.5 w-3.5" />
                         Filters
                         {activeFilterCount > 0 && (
                           <span className="ml-1.5 bg-primary text-primary-foreground h-4 w-4 text-[10px] rounded-full flex items-center justify-center">{activeFilterCount}</span>
                         )}
                         <ChevronDown className="ml-auto h-3.5 w-3.5 opacity-70" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {sellerCategories.map(category => (
                        <DropdownMenuCheckboxItem
                          key={category.id}
                          checked={selectedCategoryFilters.includes(category.name)}
                          onCheckedChange={() => handleCategoryFilterChange(category.name)}
                        >
                          {category.name}
                        </DropdownMenuCheckboxItem>
                      ))}
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {productStatuses.map(status => (
                        <DropdownMenuCheckboxItem
                          key={status}
                          checked={selectedStatusFilters.includes(status)}
                          onCheckedChange={() => handleStatusFilterChange(status)}
                        >
                          {status}
                        </DropdownMenuCheckboxItem>
                      ))}
                      {(selectedCategoryFilters.length > 0 || selectedStatusFilters.length > 0) && (
                        <>
                          <DropdownMenuSeparator />
                          <Button variant="ghost" size="sm" className="w-full text-xs justify-start text-destructive hover:text-destructive" onClick={clearAllFilters}>Clear All Filters</Button>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <div className="flex items-center border rounded-md h-9 p-0.5 bg-background">
                      <Button 
                          variant={viewMode === 'grid' ? 'secondary' : 'ghost'} 
                          size="icon" 
                          className="h-full w-9" 
                          onClick={() => setViewMode('grid')}
                          aria-label="Grid view"
                      >
                          <LayoutGrid className="h-4 w-4"/>
                      </Button>
                      <Button 
                          variant={viewMode === 'table' ? 'secondary' : 'ghost'} 
                          size="icon" 
                          className="h-full w-9" 
                          onClick={() => setViewMode('table')}
                          aria-label="Table view"
                      >
                          <List className="h-4 w-4"/>
                      </Button>
                  </div>
               </div>
            </div>
          </motion.div>
          
           {isLoading ? (
              <div className="flex justify-center items-center py-16">
                 <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
           ) : viewMode === 'table' ? (
             <SellerProductTable 
               products={filteredProducts} 
               onDeleteProduct={handleDeleteProduct} 
             />
           ) : (
             <SellerProductGrid
                products={filteredProducts}
                onDeleteProduct={handleDeleteProduct}
             />
           )}
          
        </div>
      );
    };

    export default SellerProductsPage;
  