
import React from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

const PriceFilter = ({ priceRange, setPriceRange, maxPrice }) => {
  const handleSliderChange = (value) => {
    setPriceRange(value);
  };

  const handleMinChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setPriceRange([value, priceRange[1]]);
  };

  const handleMaxChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setPriceRange([priceRange[0], value]);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg mb-3">Price Range</h3>
      
      <Slider
        defaultValue={priceRange}
        value={priceRange}
        max={maxPrice}
        step={5}
        onValueChange={handleSliderChange}
        className="my-6"
      />
      
      <div className="flex items-center space-x-2">
        <div className="flex-1">
          <label className="text-sm text-gray-500 mb-1 block">Min</label>
          <Input
            type="number"
            min={0}
            max={priceRange[1]}
            value={priceRange[0]}
            onChange={handleMinChange}
            className="h-9"
          />
        </div>
        <div className="flex-1">
          <label className="text-sm text-gray-500 mb-1 block">Max</label>
          <Input
            type="number"
            min={priceRange[0]}
            max={maxPrice}
            value={priceRange[1]}
            onChange={handleMaxChange}
            className="h-9"
          />
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;
