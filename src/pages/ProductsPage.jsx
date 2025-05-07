
    import React, { useState, useEffect, useMemo } from "react";
    import { motion, AnimatePresence } from "framer-motion";
    import { useLocation, useNavigate } from "react-router-dom";
    import { Filter, Search as SearchIcon, X } from "lucide-react";
    import { Button } from "@/components/ui/button";
    import { Input } from "@/components/ui/input";
    import ProductGrid from "@/components/ProductGrid";
    import ProductFilters from "@/components/products/ProductFilters";
    import ProductSorting from "@/components/products/ProductSorting";
    import MobileFilterDrawer from "@/components/products/MobileFilterDrawer";
    import { useProducts } from "@/contexts/ProductContext";
    import { Loader2 } from "lucide-react";
    import { cn } from "@/lib/utils";

    const MAX_PRICE = 1000; 

    const ProductsPage = () => {
      const location = useLocation();
      const navigate = useNavigate();
      const { products, categories: globalCategories, loading } = useProducts(); 
      
      const [filteredProducts, setFilteredProducts] = useState([]);
      const [searchQuery, setSearchQuery] = useState("");
      const [localSearchQuery, setLocalSearchQuery] = useState("");
      const [isSearchFocused, setIsSearchFocused] = useState(false);

      const [selectedCategories, setSelectedCategories] = useState([]);
      const [priceRange, setPriceRange] = useState([0, MAX_PRICE]);
      const [selectedRating, setSelectedRating] = useState(0);
      const [sortBy, setSortBy] = useState("featured");
      const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
      
       const categoriesWithCounts = useMemo(() => {
         if (loading || !Array.isArray(products)) return [];
         const counts = products.reduce((acc, product) => {
           acc[product.category] = (acc[product.category] || 0) + 1;
           return acc;
         }, {});
         return globalCategories.map(cat => ({
           ...cat,
           count: counts[cat.name] || 0
         })).filter(cat => cat.count > 0); 
       }, [products, globalCategories, loading]);

      useEffect(() => {
        const params = new URLSearchParams(location.search);
        const categoryParam = params.get("category");
        const queryParam = params.get("q");

        if (categoryParam) {
           setSelectedCategories(prev => prev.includes(categoryParam) ? prev : [...prev, categoryParam]);
         }
        if (queryParam) {
          setSearchQuery(queryParam);
          setLocalSearchQuery(queryParam);
        } else {
          setSearchQuery("");
          setLocalSearchQuery("");
        }
      }, [location.search]); 
      
      useEffect(() => {
        if (loading) return;
        
        let result = [...products];
        
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          result = result.filter(product => 
            product.name.toLowerCase().includes(query) || 
            (product.description && product.description.toLowerCase().includes(query)) ||
             (product.category && product.category.toLowerCase().includes(query)) ||
             (product.seller && product.seller.toLowerCase().includes(query))
          );
        }
        
         if (selectedCategories.length > 0) {
           const selectedCategoryNames = globalCategories
             .filter(cat => selectedCategories.includes(cat.id))
             .map(cat => cat.name);
           
           if (selectedCategoryNames.length > 0) {
             result = result.filter(product => selectedCategoryNames.includes(product.category));
           }
         }
        
        result = result.filter(product => 
          product.price >= priceRange[0] && product.price <= priceRange[1]
        );
        
        if (selectedRating > 0) {
          result = result.filter(product => product.rating >= selectedRating);
        }
        
        switch (sortBy) {
          case "price-low":
            result.sort((a, b) => a.price - b.price);
            break;
          case "price-high":
            result.sort((a, b) => b.price - a.price);
            break;
          case "newest":
             result.sort((a, b) => {
                 const dateA = a.createdAt ? new Date(a.createdAt) : 0;
                 const dateB = b.createdAt ? new Date(b.createdAt) : 0;
                 return dateB - dateA;
             });
            break;
          case "rating":
            result.sort((a, b) => b.rating - a.rating);
            break;
          case "featured":
          default:
            result.sort((a, b) => {
              if (a.featured && !b.featured) return -1;
              if (!a.featured && b.featured) return 1;
              return b.rating - a.rating;
            });
            break;
        }
        
        setFilteredProducts(result);
      }, [products, globalCategories, loading, searchQuery, selectedCategories, priceRange, selectedRating, sortBy]);
      
      const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSearchQuery(localSearchQuery);
        const params = new URLSearchParams(location.search);
        if (localSearchQuery.trim()) {
          params.set('q', localSearchQuery.trim());
        } else {
          params.delete('q');
        }
        navigate(`${location.pathname}?${params.toString()}`, { replace: true });
      };

      const handleCategoryChange = (categoryId) => {
        setSelectedCategories(prev => {
          const newCategories = prev.includes(categoryId) 
            ? prev.filter(id => id !== categoryId)
            : [...prev, categoryId];
          
          const params = new URLSearchParams(location.search);
          if (newCategories.length > 0) {
            // For simplicity, handling single category in URL. Multi-select URL update can be complex.
            // This example will set the last selected category or clear if none.
            // For multi-category in URL, you'd join IDs: params.set('category', newCategories.join(','));
            params.set('category', newCategories[newCategories.length - 1]); 
          } else {
            params.delete('category');
          }
          navigate(`${location.pathname}?${params.toString()}`, { replace: true });
          return newCategories;
        });
      };
      
      const handleRatingChange = (rating) => {
        setSelectedRating(prev => prev === rating ? 0 : rating);
      };
      
      const handleClearFilters = () => {
        setLocalSearchQuery("");
        setSearchQuery("");
        setSelectedCategories([]);
        setPriceRange([0, MAX_PRICE]);
        setSelectedRating(0);
        setSortBy("featured");
        navigate(location.pathname, { replace: true }); // Clears all query params
      };
      
      if (loading) {
        return (
          <div className="flex items-center justify-center min-h-[60vh]">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        );
      }
      
      return (
        <motion.div 
          className="container mx-auto px-4 py-6 md:py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center mb-4 md:hidden">
            <h1 className="text-xl font-semibold text-foreground">Products</h1>
            <Button 
              variant="outline" 
              size="sm"
              className="border-primary text-primary h-9"
              onClick={() => setIsMobileFilterOpen(true)}
            >
              <Filter className="h-4 w-4 mr-1.5" />
              Filters
            </Button>
          </div>

           <div className="hidden md:flex justify-between items-center mb-6">
             <h1 className="text-2xl font-bold text-foreground">Explore Products</h1>
              <div className="flex items-center gap-4">
                <form onSubmit={handleSearchSubmit} className="relative w-72 group">
                  <motion.div 
                    className="absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors"
                    initial={{ left: '0.75rem' }}
                    animate={{ left: isSearchFocused ? '0.75rem' : '0.75rem' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <SearchIcon className="h-full w-full" />
                  </motion.div>
                  <Input
                    type="search"
                    placeholder={isSearchFocused ? "Find your next favorite..." : "Search products..."}
                    value={localSearchQuery}
                    onChange={(e) => setLocalSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className={cn(
                      "w-full h-9 pl-10 pr-8 text-sm rounded-full modern-search-input focus:ring-primary focus:border-primary",
                      isSearchFocused && "bg-background shadow-md border-primary ring-1 ring-primary"
                    )}
                  />
                  {localSearchQuery && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-1/2 -translate-y-1/2 right-1.5 h-6 w-6 text-muted-foreground hover:text-foreground"
                      onClick={() => {
                        setLocalSearchQuery('');
                        if (!searchQuery) handleSearchSubmit({ preventDefault: () => {} }); // Submit empty search if main query is also empty
                        else setSearchQuery(''); // only clear visual if there was a global search
                      }}
                    >
                      <X className="h-3.5 w-3.5" />
                      <span className="sr-only">Clear search</span>
                    </Button>
                  )}
                </form>
                 <ProductSorting sortBy={sortBy} setSortBy={setSortBy} />
              </div>
           </div>
          
          <div className="flex flex-col md:flex-row gap-6 lg:gap-8">
            <aside className="hidden md:block w-60 lg:w-64 flex-shrink-0">
              <div className="sticky top-24 space-y-6"> 
                 <ProductFilters 
                   categories={categoriesWithCounts}
                   selectedCategories={selectedCategories}
                   onCategoryChange={handleCategoryChange}
                   priceRange={priceRange}
                   setPriceRange={setPriceRange}
                   maxPrice={MAX_PRICE}
                   selectedRating={selectedRating}
                   onRatingChange={handleRatingChange}
                   onClearFilters={handleClearFilters}
                 />
              </div>
            </aside>
            
            <MobileFilterDrawer
              isOpen={isMobileFilterOpen}
              onClose={() => setIsMobileFilterOpen(false)}
              categories={categoriesWithCounts}
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              maxPrice={MAX_PRICE}
              selectedRating={selectedRating}
              onRatingChange={handleRatingChange}
              onClearFilters={handleClearFilters}
            />
            
            <section className="flex-1 min-w-0"> 
               <div className="flex flex-col sm:flex-row gap-3 mb-4 md:hidden">
                 <form onSubmit={handleSearchSubmit} className="relative flex-grow group">
                    <motion.div 
                      className="absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors"
                      initial={{ left: '0.75rem' }}
                      animate={{ left: isSearchFocused ? '0.75rem' : '0.75rem' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      <SearchIcon className="h-full w-full" />
                    </motion.div>
                    <Input
                      type="search"
                      placeholder={isSearchFocused ? "Find your next favorite..." : "Search products..."}
                      value={localSearchQuery}
                      onChange={(e) => setLocalSearchQuery(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setIsSearchFocused(false)}
                      className={cn(
                        "w-full h-9 pl-10 pr-8 text-sm rounded-full modern-search-input focus:ring-primary focus:border-primary",
                        isSearchFocused && "bg-background shadow-md border-primary ring-1 ring-primary"
                      )}
                    />
                    {localSearchQuery && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-1/2 -translate-y-1/2 right-1.5 h-6 w-6 text-muted-foreground hover:text-foreground"
                        onClick={() => {
                          setLocalSearchQuery('');
                           if (!searchQuery) handleSearchSubmit({ preventDefault: () => {} });
                           else setSearchQuery('');
                        }}
                      >
                        <X className="h-3.5 w-3.5" />
                        <span className="sr-only">Clear search</span>
                      </Button>
                    )}
                  </form>
                 <ProductSorting sortBy={sortBy} setSortBy={setSortBy} />
              </div>
             
              <div className="mb-4 text-sm text-muted-foreground">
                 Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                 {searchQuery && <span className="italic"> for "{searchQuery}"</span>}
              </div>
              
              <ProductGrid products={filteredProducts} />
              
            </section>
          </div>
        </motion.div>
      );
    };

    export default ProductsPage;
  