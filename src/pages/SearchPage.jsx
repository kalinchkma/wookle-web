
    import React, { useState, useEffect } from "react";
    import { useSearchParams } from "react-router-dom";
    import { motion } from "framer-motion";
    import ProductGrid from "@/components/ProductGrid";
    import { useProducts } from "@/contexts/ProductContext";
    import { Input } from "@/components/ui/input";
    import { Button } from "@/components/ui/button";
    import { Search as SearchIcon } from "lucide-react";

    const SearchPage = () => {
      const [searchParams, setSearchParams] = useSearchParams();
      const { searchProducts, loading } = useProducts();
      
      const initialQuery = searchParams.get("q") || "";
      const [query, setQuery] = useState(initialQuery);
      const [searchResults, setSearchResults] = useState([]);

      useEffect(() => {
        if (!loading) {
          setSearchResults(searchProducts(initialQuery));
        }
      }, [initialQuery, searchProducts, loading]);
      
      const handleSearch = (e) => {
        e.preventDefault();
        setSearchParams({ q: query });
      };

      return (
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Search Results</h1>
            <form onSubmit={handleSearch} className="flex gap-2 max-w-lg">
              <Input
                type="search"
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-grow border-shopzone focus:ring-shopzone"
              />
              <Button type="submit" className="bg-shopzone hover:bg-shopzone-dark">
                <SearchIcon className="h-4 w-4 mr-2" /> Search
              </Button>
            </form>
          </motion.div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-shopzone border-t-transparent rounded-full"
              />
            </div>
          ) : (
            <>
              <p className="text-gray-600 mb-6">
                Found {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} for "{initialQuery}"
              </p>
              {searchResults.length > 0 ? (
                <ProductGrid products={searchResults} />
              ) : (
                <div className="text-center py-16">
                  <h2 className="text-2xl font-medium text-gray-700 mb-4">No products found</h2>
                  <p className="text-gray-500">Try searching for something else.</p>
                </div>
              )}
            </>
          )}
        </div>
      );
    };

    export default SearchPage;
  