
import React from "react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

const CategoryFilter = ({ categories, selectedCategories, onCategoryChange }) => {
  return (
    <div className="space-y-2">
      <h3 className="font-medium text-lg mb-3">Categories</h3>
      {categories.map((category) => (
        <motion.div 
          key={category.id}
          whileHover={{ x: 5 }}
          className="flex items-center space-x-2 cursor-pointer py-1"
          onClick={() => onCategoryChange(category.id)}
        >
          <div className={`w-5 h-5 rounded border flex items-center justify-center ${
            selectedCategories.includes(category.id) 
              ? 'bg-shopzone border-shopzone' 
              : 'border-gray-300'
          }`}>
            {selectedCategories.includes(category.id) && (
              <Check className="h-3.5 w-3.5 text-white" />
            )}
          </div>
          <span className="text-gray-700">{category.name}</span>
          <span className="text-gray-400 text-sm">({category.count})</span>
        </motion.div>
      ))}
    </div>
  );
};

export default CategoryFilter;
