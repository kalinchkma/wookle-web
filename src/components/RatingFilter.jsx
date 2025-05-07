
    import React from "react";
    import { Star } from "lucide-react";
    import { motion } from "framer-motion";
    import { Button } from "@/components/ui/button";
    import { cn } from "@/lib/utils";

    const RatingFilter = ({ selectedRating, onRatingChange }) => {
      const ratings = [5, 4, 3, 2, 1];

      return (
        <div className="space-y-1">
          {ratings.map((rating, index) => (
            <motion.div
              key={rating}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: index * 0.03 + 0.15 }}
            >
              <Button
                 variant="ghost"
                 className={cn(
                   "w-full justify-start h-8 px-2 space-x-1.5 rounded-md",
                   selectedRating === rating ? "bg-primary/10 text-primary font-medium" : "text-foreground/80 hover:bg-secondary/70"
                 )}
                 onClick={() => onRatingChange(rating)}
                 aria-pressed={selectedRating === rating}
                 aria-label={`Filter by ${rating} stars and up`}
              >
                 <span className="flex items-center">
                   {[...Array(5)].map((_, i) => (
                     <Star
                       key={i}
                       className={cn(
                         "h-3.5 w-3.5",
                         i < rating ? 'fill-amber-400 text-amber-400' : 'fill-muted text-muted-foreground/50'
                       )}
                     />
                   ))}
                 </span>
                 <span className="text-xs">& Up</span>
              </Button>
            </motion.div>
          ))}
          {selectedRating > 0 && (
             <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: ratings.length * 0.03 + 0.2 }}
             >
                <Button 
                  variant="link" 
                  size="sm" 
                  className="w-full text-xs h-7 text-muted-foreground hover:text-destructive mt-1.5 p-0 justify-start"
                  onClick={() => onRatingChange(0)} 
                >
                   Clear Rating
                </Button>
             </motion.div>
          )}
        </div>
      );
    };

    export default RatingFilter;
  