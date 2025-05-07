
    import React from "react";
    import { Link } from "react-router-dom";
    import { motion } from "framer-motion";
    import { Heart, ShoppingCart, Star } from "lucide-react";
    import { Button } from "@/components/ui/button";
    import { Badge } from "@/components/ui/badge";
    import { useToast } from "@/components/ui/use-toast";
    import { useCart } from "@/contexts/CartContext";
    import { useWishlist } from "@/contexts/WishlistContext";
    import { cn } from "@/lib/utils";

    const ProductCard = ({ product }) => {
      const { toast } = useToast();
      const { addToCart } = useCart();
      const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
      
      const isWishlisted = isInWishlist(product.id);
      
      const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const itemToAdd = {
          ...product,
          quantity: 1, // Ensure quantity is added
        };
        addToCart(itemToAdd);
        toast({
          title: "Added to cart",
          description: `${product.name} added.`,
          variant: 'default',
          duration: 2000,
        });
      };
      
      const handleWishlistToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (isWishlisted) {
          removeFromWishlist(product.id);
          toast({
            title: "Wishlist updated",
            description: `${product.name} removed.`,
            variant: 'default',
            duration: 2000,
          });
        } else {
          addToWishlist(product);
          toast({
            title: "Wishlist updated",
            description: `${product.name} added.`,
            variant: 'default',
            duration: 2000,
          });
        }
      };
      
      return (
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className="product-card group" // Add 'group' class for hover effects
        >
          <Link to={`/product/${product.id}`} className="flex flex-col h-full">
            <div className="relative aspect-square overflow-hidden">
              <img 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
               src="https://images.unsplash.com/photo-1495224814653-94f36c0a31ea" />
              
              {product.discount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute top-2 left-2 text-xs px-1.5 py-0.5"
                >
                  {product.discount}% OFF
                </Badge>
              )}
              
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1.5 right-1.5 h-8 w-8 bg-background/70 hover:bg-background text-foreground/70 hover:text-primary rounded-full backdrop-blur-sm"
                onClick={handleWishlistToggle}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart 
                  className={cn(
                    'h-4 w-4 transition-colors duration-200', 
                    isWishlisted ? 'fill-red-500 text-red-500' : 'text-inherit'
                  )} 
                />
              </Button>
            </div>
            
            {/* Content area - allow it to grow */}
            <div className="p-3 flex flex-col flex-grow space-y-2"> 
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{product.category}</span>
                <div className="flex items-center">
                  <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400 mr-0.5" />
                  <span className="font-medium">{product.rating}</span>
                  <span className="ml-0.5">({product.reviews})</span>
                </div>
              </div>
              
              {/* Make title take available space */}
              <h3 className="font-medium text-sm text-foreground line-clamp-2 flex-grow">{product.name}</h3>
                          
              {/* Price and Add to cart button at the bottom */}
              <div className="mt-auto pt-2"> 
                 {product.freeShipping && (
                   <Badge variant="outline" className="mb-2 text-xs px-1.5 py-0.5 border-green-300 text-green-700 bg-green-50">
                     Free Shipping
                   </Badge>
                 )}
                 <div className="flex items-end justify-between">
                   <div className="flex items-baseline gap-1.5">
                     <span className="font-semibold text-base text-primary">${product.price.toFixed(2)}</span>
                     {product.discount > 0 && (
                       <span className="text-muted-foreground text-xs line-through">
                         ${(product.price / (1 - product.discount / 100)).toFixed(2)}
                       </span>
                     )}
                   </div>
                   
                   <Button
                     variant="ghost"
                     size="icon"
                     className="h-8 w-8 text-primary hover:text-primary-foreground hover:bg-primary"
                     onClick={handleAddToCart}
                     aria-label="Add to cart"
                   >
                     <ShoppingCart className="h-4 w-4" />
                   </Button>
                 </div>
              </div>
            </div>
          </Link>
        </motion.div>
      );
    };

    export default ProductCard;
  