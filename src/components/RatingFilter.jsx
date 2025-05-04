
import React from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const RatingFilter = ({ selectedRating, onRatingChange }) => {
  const ratings = [5, 4, 3, 2, 1];

  return (
    <div className="space-y-2">
      <h3 className="font-medium text-lg mb-3">Rating</h3>
      
      {ratings.map((rating) => (
        <motion.div
          key={rating}
          whileHover={{ x: 5 }}
          className="flex items-center space-x-2 cursor-pointer py-1"
          onClick={() => onRatingChange(rating)}
        >
          <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
            selectedRating === rating 
              ? 'bg-shopzone border-shopzone' 
              : 'border-gray-300'
          }`}>
            {selectedRating === rating && (
              <div className="w-3 h-3 rounded-full bg-white" />
            )}
          </div>
          
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < rating ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'
                }`}
              />
            ))}
            <span className="text-gray-700 ml-2">& Up</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default RatingFilter;
