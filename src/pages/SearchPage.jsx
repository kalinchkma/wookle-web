
    import React, { useState, useEffect } from "react";
    import { useSearchParams, Link } from "react-router-dom";
    import { motion } from "framer-motion";
    import { useProducts } from "@/contexts/ProductContext";
    import { Input } from "@/components/ui/input";
    import { Button } from "@/components/ui/button";
    import { Card, CardContent } from "@/components/ui/card";
    import { Badge } from "@/components/ui/badge";
    import { Search as SearchIcon, Star, Store, List, Grid } from "lucide-react";
    import ProductGrid from "@/components/ProductGrid"; // Re-use grid for consistency

    // Simple component for list view item
    const SearchResultListItem = ({ product }) => (
      <Card className="mb-4 overflow-hidden transition-shadow hover:shadow-md">
        <CardContent className="p-3 flex flex-col sm:flex-row gap-4">
          <Link to={`/product/${product.id}`} className="block flex-shrink-0 sm:w-32 md:w-40 aspect-square rounded border bg-secondary overflow-hidden">
            <img  
              alt={product.name}
              class="w-full h-full object-cover"
             src="https://images.unsplash.com/photo-1495224814653-94f36c0a31ea" />
          </Link>
          <div className="flex-grow space-y-1">
             <div className="flex justify-between items-start gap-2">
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-semibold text-base text-foreground hover:text-primary line-clamp-2 leading-tight">{product.name}</h3>
                </Link>
                <span className="font-bold text-lg text-primary whitespace-nowrap">${product.price.toFixed(2)}</span>
             </div>
             <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>
             <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
                <Store className="h-3 w-3 text-primary"/> 
                <span>{product.seller || 'Unknown Seller'}</span> 
             </div>
             <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Star className="h-3 w-3 text-amber-400 fill-amber-400"/> 
                <span>{product.rating} ({product.reviews} reviews)</span>
             </div>
             <div className="flex flex-wrap gap-1 pt-2">
                 <Badge variant="outline" className="text-xs">{product.category}</Badge>
                 {product.freeShipping && (
                     <Badge variant="outline" className="text-xs border-green-300 text-green-700 bg-green-50">Free Shipping</Badge>
                 )}
                  {product.discount > 0 && (
                    <Badge variant="destructive" className="text-xs">{product.discount}% OFF</Badge>
                  )}
             </div>
          </div>
        </CardContent>
      </Card>
    );

    const SearchPage = () => {
      const [searchParams, setSearchParams] = useSearchParams();
      const { searchProducts, loading } = useProducts();
      
      const initialQuery = searchParams.get("q") || "";
      const [query, setQuery] = useState(initialQuery);
      const [searchResults, setSearchResults] = useState([]);
      const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

      useEffect(() => {
        if (!loading) {
          setSearchResults(searchProducts(initialQuery));
        }
      }, [initialQuery, searchProducts, loading]);
      
      const handleSearch = (e) => {
        e.preventDefault();
        setSearchParams({ q: query });
      };

      const containerVariants = {
         hidden: { opacity: 0 },
         show: {
           opacity: 1,
           transition: { staggerChildren: 0.05 }
         }
       };
       
      const itemVariants = {
         hidden: { opacity: 0, y: 10 },
         show: { opacity: 1, y: 0 }
       };

      return (
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <form onSubmit={handleSearch} className="flex gap-2 mb-4 max-w-2xl mx-auto">
              <Input
                type="search"
                placeholder="Search products, categories, sellers..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-grow border-primary focus:ring-primary compact-input"
              />
              <Button type="submit" className="bg-primary hover:bg-primary/90 compact-button">
                <SearchIcon className="h-4 w-4 mr-1.5" /> Search
              </Button>
            </form>
             <div className="flex justify-between items-center">
               <p className="text-sm text-muted-foreground">
                 {loading ? 'Searching...' : `Found ${searchResults.length} ${searchResults.length === 1 ? 'result' : 'results'} for "${initialQuery}"`}
               </p>
               <div className="flex items-center gap-1">
                  <Button 
                     variant={viewMode === 'grid' ? 'secondary' : 'ghost'} 
                     size="icon" 
                     className="h-8 w-8"
                     onClick={() => setViewMode('grid')}
                     aria-label="Grid view"
                   >
                     <Grid className="h-4 w-4" />
                   </Button>
                   <Button 
                     variant={viewMode === 'list' ? 'secondary' : 'ghost'} 
                     size="icon" 
                     className="h-8 w-8"
                     onClick={() => setViewMode('list')}
                     aria-label="List view"
                   >
                     <List className="h-4 w-4" />
                   </Button>
               </div>
             </div>
          </motion.div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full"
              />
            </div>
          ) : (
            <>
              {searchResults.length > 0 ? (
                viewMode === 'grid' ? (
                  <ProductGrid products={searchResults} />
                ) : (
                   <motion.div
                     variants={containerVariants}
                     initial="hidden"
                     animate="show"
                   >
                     {searchResults.map(product => (
                       <motion.div key={product.id} variants={itemVariants}>
                         <SearchResultListItem product={product} />
                       </motion.div>
                     ))}
                   </motion.div>
                )
              ) : (
                <div className="text-center py-16">
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
                     <SearchIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                     <h2 className="text-xl font-medium text-foreground mb-2">No products found</h2>
                     <p className="text-muted-foreground">Try searching for something else or check spelling.</p>
                  </motion.div>
                </div>
              )}
            </>
          )}
        </div>
      );
    };

    export default SearchPage;
  