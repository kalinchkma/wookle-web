
    import React from "react";
    import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
    import { Button } from "@/components/ui/button";
    import { Check, Info, Star } from "lucide-react";

    const ProductTabs = ({ product }) => {
      return (
        <div className="mt-10">
          <Tabs defaultValue="description">
            <TabsList className="w-full border-b justify-start rounded-none bg-transparent space-x-6 px-0">
              <TabsTrigger value="description" className="text-sm data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent px-1 pb-2">Description</TabsTrigger>
              <TabsTrigger value="specifications" className="text-sm data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent px-1 pb-2">Specifications</TabsTrigger>
              <TabsTrigger value="reviews" className="text-sm data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent px-1 pb-2">Reviews ({product.reviews})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="pt-5 text-sm text-foreground/80 space-y-4">
              <p>{product.fullDescription || product.description}</p>
              
              <h3 className="text-md font-medium text-foreground pt-2">Features</h3>
              <ul className="space-y-1.5 list-none pl-0">
                {product.features?.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                )) || (
                  <>
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" /><span>Premium quality materials</span></li>
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" /><span>Durable and long-lasting</span></li>
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" /><span>Easy to use and maintain</span></li>
                  </>
                )}
              </ul>
            </TabsContent>
            
            <TabsContent value="specifications" className="pt-5">
              <div className="bg-secondary/50 p-4 rounded-md text-sm space-y-3">
                {product.specifications?.map((spec, index) => (
                  <div key={index} className="flex">
                    <div className="w-1/3 font-medium text-foreground/90">{spec.name}</div>
                    <div className="w-2/3 text-foreground/80">{spec.value}</div>
                  </div>
                )) || (
                  <>
                    <div className="flex"><div className="w-1/3 font-medium text-foreground/90">Brand</div><div className="w-2/3 text-foreground/80">{product.brand || 'N/A'}</div></div>
                    <div className="flex"><div className="w-1/3 font-medium text-foreground/90">Weight</div><div className="w-2/3 text-foreground/80">{product.weight || 'N/A'}</div></div>
                    <div className="flex"><div className="w-1/3 font-medium text-foreground/90">Dimensions</div><div className="w-2/3 text-foreground/80">{product.dimensions || 'N/A'}</div></div>
                  </>
                )}
                <div className="mt-4 flex items-start bg-blue-50 dark:bg-blue-900/30 p-3 rounded-md border border-blue-200 dark:border-blue-800/50">
                  <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-blue-700 dark:text-blue-300">Specifications are approximate and may vary slightly.</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="pt-5 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-md font-medium text-foreground">Customer Reviews</h3>
                <Button size="sm" className="text-xs h-8 bg-primary hover:bg-primary/90">Write a Review</Button>
              </div>
              {/* Placeholder for review summary */}
              <div className="bg-secondary/50 p-4 rounded-md"> Review Summary Placeholder </div>
              {/* Placeholder for reviews list */}
              {[...Array(3)].map((_, index) => (
                <div key={index} className="border-b pb-4 last:border-b-0">
                  <div className="flex items-center mb-1.5">
                    <div className="flex items-center text-amber-500 mr-2">
                      {[...Array(5)].map((_, i) => <Star key={i} className={`h-3.5 w-3.5 ${i < 4 + (index % 2) ? 'fill-amber-500' : 'fill-muted text-muted'}`} />)}
                    </div>
                    <span className="font-medium text-sm text-foreground">Review Title {index+1}</span>
                  </div>
                  <p className="text-sm text-foreground/80 mb-2">Review content placeholder...</p>
                  <div className="flex items-center text-xs text-muted-foreground gap-1">
                    <span>User {index+1}</span> • <span>Verified Buyer</span> • <span>{index+1} week(s) ago</span>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full text-xs h-8 border-input hover:border-primary hover:text-primary">Load More Reviews</Button>
            </TabsContent>
          </Tabs>
        </div>
      );
    };

    export default ProductTabs;
  