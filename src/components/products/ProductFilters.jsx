
    import React from 'react';
     import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
     import { Separator } from '@/components/ui/separator';
     import { Button } from '@/components/ui/button';
     import CategoryFilter from '@/components/CategoryFilter';
     import PriceFilter from '@/components/PriceFilter';
     import RatingFilter from '@/components/RatingFilter';
     import { SlidersHorizontal } from 'lucide-react';
     import { motion } from 'framer-motion';
     
     const ProductFilters = ({ 
       categories, 
       selectedCategories, 
       onCategoryChange, 
       priceRange, 
       setPriceRange, 
       maxPrice, 
       selectedRating, 
       onRatingChange, 
       onClearFilters 
     }) => {
       const activeFilterCount = 
         selectedCategories.length + 
         (priceRange[0] !== 0 || priceRange[1] !== maxPrice ? 1 : 0) +
         (selectedRating > 0 ? 1 : 0);

       return (
         <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="space-y-6"
         >
           <Card className="border-border/70 shadow-sm rounded-lg">
             <CardHeader className="p-4 border-b border-border/70">
               <div className="flex justify-between items-center">
                  <CardTitle className="text-base font-semibold flex items-center">
                     <SlidersHorizontal className="h-4 w-4 mr-2 text-primary"/>
                     Filters
                  </CardTitle>
                  {activeFilterCount > 0 && (
                    <Button 
                       variant="link" 
                       size="sm" 
                       className="text-xs h-auto p-0 text-primary hover:text-primary/80"
                       onClick={onClearFilters}
                     >
                       Clear All ({activeFilterCount})
                     </Button>
                  )}
               </div>
             </CardHeader>
             <CardContent className="p-4 space-y-5">
               <div>
                 <h3 className="text-sm font-medium mb-2.5 text-foreground/90">Categories</h3>
                 <CategoryFilter 
                   categories={categories}
                   selectedCategories={selectedCategories}
                   onCategoryChange={onCategoryChange}
                 />
               </div>
               <Separator className="my-3 bg-border/50"/>
               <div>
                 <h3 className="text-sm font-medium mb-2.5 text-foreground/90">Price Range</h3>
                 <PriceFilter 
                   priceRange={priceRange}
                   setPriceRange={setPriceRange}
                   maxPrice={maxPrice}
                 />
               </div>
               <Separator className="my-3 bg-border/50"/>
               <div>
                 <h3 className="text-sm font-medium mb-2.5 text-foreground/90">Rating</h3>
                 <RatingFilter 
                   selectedRating={selectedRating}
                   onRatingChange={onRatingChange}
                 />
               </div>
             </CardContent>
           </Card>
         </motion.div>
       );
     };
     
     export default ProductFilters;
  