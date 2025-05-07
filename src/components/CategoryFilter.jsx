
    import React from "react";
    import { Checkbox } from "@/components/ui/checkbox";
    import { Label } from "@/components/ui/label";
    import { motion } from "framer-motion";
    import { cn } from "@/lib/utils";
    import { Tag } from "lucide-react";

    const CategoryFilter = ({ categories, selectedCategories, onCategoryChange }) => {
      return (
        <div className="space-y-2">
          {categories.map((category, index) => (
             <motion.div 
               key={category.id}
               initial={{ opacity: 0, x: -10 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.2, delay: index * 0.03 }}
               className="flex items-center space-x-2.5 p-1.5 rounded-md hover:bg-secondary/70 transition-colors"
             >
               <Checkbox
                 id={`category-${category.id}`}
                 checked={selectedCategories.includes(category.id)}
                 onCheckedChange={() => onCategoryChange(category.id)}
                 className="data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground h-4 w-4 rounded"
                 aria-label={`Filter by category ${category.name}`}
               />
               <Label 
                 htmlFor={`category-${category.id}`} 
                 className={cn(
                    "flex-grow text-xs cursor-pointer flex items-center",
                    selectedCategories.includes(category.id) ? "font-semibold text-primary" : "text-foreground/80"
                 )}
               >
                 <Tag className={cn("h-3.5 w-3.5 mr-1.5", selectedCategories.includes(category.id) ? "text-primary" : "text-muted-foreground/70")} />
                 {category.name}
               </Label>
               <span className="text-xs text-muted-foreground tabular-nums bg-muted px-1.5 py-0.5 rounded-sm">
                 {category.count}
               </span>
             </motion.div>
          ))}
        </div>
      );
    };

    export default CategoryFilter;
  