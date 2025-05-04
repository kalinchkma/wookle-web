
    import React from "react";
    import { Link } from "react-router-dom";
    import { motion } from "framer-motion";
    import { Heart, ShoppingCart, Star } from "lucide-react";
    import { Button } from "@/components/ui/button";
    import { Badge } from "@/components/ui/badge";
    import { useToast } from "@/components/ui/use-toast";
    import { useCart } from "@/contexts/CartContext";
    import { useWishlist } from "@/contexts/WishlistContext";

    const ProductCard = ({ product }) => {
      const { toast } = useToast();
      const { addToCart } = useCart();
      const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
      
      const isWishlisted = isInWishlist(product.id);
      
      const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        addToCart(product);
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
          className="product-card"
        >
          <Link to={`/product/${product.id}`} className="block">
            <div className="relative aspect-square overflow-hidden">
              <img 
                alt={product.name}
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
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
                className="absolute top-1.5 right-1.5 h-8 w-8 bg-background/70 hover:bg-background text-foreground/70 hover:text-shopzone rounded-full backdrop-blur-sm"
                onClick={handleWishlistToggle}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart 
                  className={`h-4 w-4 transition-colors duration-200 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-inherit'}`} 
                />
              </Button>
            </div>
            
            <div className="p-3 space-y-1.5"> 
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{product.category}</span>
                <div className="flex items-center">
                  <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400 mr-0.5" />
                  <span>{product.rating}</span>
                  <span className="ml-0.5">({product.reviews})</span>
                </div>
              </div>
              
              <h3 className="font-medium text-sm text-foreground mb-1 line-clamp-1">{product.name}</h3>
                          
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-semibold text-base text-shopzone">${product.price.toFixed(2)}</span>
                  {product.discount > 0 && (
                    <span className="text-muted-foreground text-xs line-through">
                      ${(product.price / (1 - product.discount / 100)).toFixed(2)}
                    </span>
                  )}
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-shopzone hover:text-primary-foreground hover:bg-shopzone"
                  onClick={handleAddToCart}
                  aria-label="Add to cart"
                >
                  <ShoppingCart className="h-4 w-4" />
                </Button>
              </div>
              
              {product.freeShipping && (
                <Badge variant="outline" className="mt-1 text-xs px-1.5 py-0.5 border-green-300 text-green-700 bg-green-50">
                  Free Shipping
                </Badge>
              )}
            </div>
          </Link>
        </motion.div>
      );
    };

    export default ProductCard;
  