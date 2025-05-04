
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import ProductGrid from "@/components/ProductGrid";
import CategoryFilter from "@/components/CategoryFilter";
import PriceFilter from "@/components/PriceFilter";
import RatingFilter from "@/components/RatingFilter";
import { useProducts } from "@/contexts/ProductContext";
import { sampleCategories } from "@/data/sampleData";

const ProductsPage = () => {
  const location = useLocation();
  const { products, loading } = useProducts();
  
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortBy, setSortBy] = useState("featured");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  const maxPrice = 200; // Set a reasonable max price for the slider
  
  // Parse query parameters on initial load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    
    const category = params.get("category");
    if (category) {
      setSelectedCategories([parseInt(category)]);
    }
    
    const query = params.get("q");
    if (query) {
      setSearchQuery(query);
    }
  }, [location.search]);
  
  // Apply filters whenever filter state changes
  useEffect(() => {
    if (loading) return;
    
    let result = [...products];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      const categoryNames = selectedCategories.map(id => {
        const category = sampleCategories.find(c => c.id === id);
        return category ? category.name : null;
      }).filter(Boolean);
      
      if (categoryNames.length > 0) {
        result = result.filter(product => categoryNames.includes(product.category));
      }
    }
    
    // Apply price filter
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply rating filter
    if (selectedRating > 0) {
      result = result.filter(product => product.rating >= selectedRating);
    }
    
    // Apply sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "featured":
      default:
        // Featured products first, then sort by rating
        result.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.rating - a.rating;
        });
        break;
    }
    
    setFilteredProducts(result);
  }, [products, loading, searchQuery, selectedCategories, priceRange, selectedRating, sortBy]);
  
  const handleCategoryChange = (categoryId) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };
  
  const handleRatingChange = (rating) => {
    setSelectedRating(prev => prev === rating ? 0 : rating);
  };
  
  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setPriceRange([0, maxPrice]);
    setSelectedRating(0);
    setSortBy("featured");
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-shopzone border-t-transparent rounded-full"
        />
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
        
        <Button 
          variant="outline" 
          className="md:hidden border-shopzone text-shopzone"
          onClick={() => setIsMobileFilterOpen(true)}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters - Desktop */}
        <div className="hidden md:block w-64 space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            <Button 
              variant="outline" 
              className="w-full border-shopzone text-shopzone"
              onClick={handleClearFilters}
            >
              Clear All Filters
            </Button>
          </div>
          
          <CategoryFilter 
            categories={sampleCategories}
            selectedCategories={selectedCategories}
            onCategoryChange={handleCategoryChange}
          />
          
          <PriceFilter 
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            maxPrice={maxPrice}
          />
          
          <RatingFilter 
            selectedRating={selectedRating}
            onRatingChange={handleRatingChange}
          />
        </div>
        
        {/* Filters - Mobile */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Filters</h2>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsMobileFilterOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="space-y-8">
                <Button 
                  variant="outline" 
                  className="w-full border-shopzone text-shopzone"
                  onClick={handleClearFilters}
                >
                  Clear All Filters
                </Button>
                
                <CategoryFilter 
                  categories={sampleCategories}
                  selectedCategories={selectedCategories}
                  onCategoryChange={handleCategoryChange}
                />
                
                <PriceFilter 
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  maxPrice={maxPrice}
                />
                
                <RatingFilter 
                  selectedRating={selectedRating}
                  onRatingChange={handleRatingChange}
                />
                
                <div className="pt-4 border-t">
                  <Button 
                    className="w-full bg-shopzone hover:bg-shopzone-dark"
                    onClick={() => setIsMobileFilterOpen(false)}
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
        
        {/* Products */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="w-full sm:w-auto">
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-shopzone focus:ring-shopzone"
              />
            </div>
            
            <div className="w-full sm:w-auto">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mb-4">
            <p className="text-gray-600">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </p>
          </div>
          
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
