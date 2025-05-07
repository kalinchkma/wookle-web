
    import React from "react";
    import { Slider } from "@/components/ui/slider";
    import { Input } from "@/components/ui/input";
    import { Label } from "@/components/ui/label";
    import { motion } from "framer-motion";

    const PriceFilter = ({ priceRange, setPriceRange, maxPrice }) => {
      const handleSliderChange = (value) => {
        setPriceRange(value);
      };

      const handleMinChange = (e) => {
        let value = parseInt(e.target.value) || 0;
        value = Math.max(0, Math.min(value, priceRange[1])); 
        setPriceRange([value, priceRange[1]]);
      };

      const handleMaxChange = (e) => {
        let value = parseInt(e.target.value) || 0;
        value = Math.max(priceRange[0], Math.min(value, maxPrice)); 
        setPriceRange([priceRange[0], value]);
      };

      return (
        <motion.div 
            className="space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.1 }}
        >
          <Slider
            value={priceRange}
            max={maxPrice}
            min={0}
            step={5}
            onValueChange={handleSliderChange}
            className="my-2"
            aria-label="Price range slider"
          />
          
          <div className="flex items-center space-x-2.5">
            <div className="flex-1 space-y-0.5">
              <Label htmlFor="minPrice" className="text-xs text-muted-foreground">Min</Label>
              <Input
                id="minPrice"
                type="number"
                min={0}
                max={priceRange[1]}
                value={priceRange[0]}
                onChange={handleMinChange}
                className="h-8 compact-input text-xs modern-search-input"
                aria-label="Minimum price"
              />
            </div>
             <span className="text-muted-foreground pt-4 text-sm"> – </span>
            <div className="flex-1 space-y-0.5">
              <Label htmlFor="maxPrice" className="text-xs text-muted-foreground">Max</Label>
              <Input
                id="maxPrice"
                type="number"
                min={priceRange[0]}
                max={maxPrice}
                value={priceRange[1]}
                onChange={handleMaxChange}
                className="h-8 compact-input text-xs modern-search-input"
                aria-label="Maximum price"
              />
            </div>
          </div>
        </motion.div>
      );
    };

    export default PriceFilter;
  