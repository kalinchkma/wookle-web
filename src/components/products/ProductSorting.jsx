
    import React from 'react';
    import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
    
    const ProductSorting = ({ sortBy, setSortBy }) => {
      return (
         <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-[200px] h-9 text-sm">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured" className="text-sm">Featured</SelectItem>
              <SelectItem value="price-low" className="text-sm">Price: Low to High</SelectItem>
              <SelectItem value="price-high" className="text-sm">Price: High to Low</SelectItem>
              <SelectItem value="newest" className="text-sm">Newest Arrivals</SelectItem>
              <SelectItem value="rating" className="text-sm">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
      );
    };
    
    export default ProductSorting;
  