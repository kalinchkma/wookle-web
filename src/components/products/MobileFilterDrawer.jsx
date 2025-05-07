
      import React from 'react';
      import { X } from 'lucide-react';
      import { Button } from '@/components/ui/button';
      import { 
         Dialog, 
         DialogContent, 
         DialogHeader, 
         DialogTitle, 
         DialogClose 
      } from "@/components/ui/dialog";
      import ProductFilters from './ProductFilters'; // Reuse the filters component
      
      const MobileFilterDrawer = ({ 
         isOpen, 
         onClose,
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
        
        return (
          <Dialog open={isOpen} onOpenChange={onClose}>
             <DialogContent className="sm:max-w-[425px] p-0 fixed bottom-0 left-0 right-0 top-auto h-[85vh] translate-y-0 data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom rounded-t-lg">
               <DialogHeader className="p-4 border-b">
                 <DialogTitle className="text-lg">Filters</DialogTitle>
                  <DialogClose asChild>
                     <Button variant="ghost" size="icon" className="absolute right-4 top-3 h-7 w-7">
                       <X className="h-4 w-4" />
                       <span className="sr-only">Close</span>
                     </Button>
                   </DialogClose>
               </DialogHeader>
               
               <div className="p-4 overflow-y-auto flex-grow h-[calc(85vh-130px)]"> 
                  <ProductFilters 
                     categories={categories}
                     selectedCategories={selectedCategories}
                     onCategoryChange={onCategoryChange}
                     priceRange={priceRange}
                     setPriceRange={setPriceRange}
                     maxPrice={maxPrice}
                     selectedRating={selectedRating}
                     onRatingChange={onRatingChange}
                     onClearFilters={onClearFilters}
                  />
               </div>
               
               <div className="p-4 border-t sticky bottom-0 bg-background">
                 <Button 
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={onClose}
                 >
                    Apply Filters ({/* Optionally add count of active filters */})
                 </Button>
               </div>
             </DialogContent>
           </Dialog>
        );
      };
      
      export default MobileFilterDrawer;
   