
    import React, { useState } from "react";
    import { ShoppingCart, Heart, Share2, Star } from "lucide-react";
    import { Button } from "@/components/ui/button";
    import { Badge } from "@/components/ui/badge";
    import { useToast } from "@/components/ui/use-toast";
    import { useCart } from "@/contexts/CartContext";
    import { useWishlist } from "@/contexts/WishlistContext";

    const ProductInfo = ({ product }) => {
      const [quantity, setQuantity] = useState(1);
      const [selectedOptions, setSelectedOptions] = useState({});
      
      const { toast } = useToast();
      const { addToCart } = useCart();
      const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
      
      const isWishlisted = isInWishlist(product.id);

      const handleAddToCart = () => {
        addToCart({ ...product, quantity, options: selectedOptions });
        toast({ title: "Added to cart", description: `${product.name} added.` });
      };
      
      const handleWishlistToggle = () => {
        if (isWishlisted) {
          removeFromWishlist(product.id);
          toast({ title: "Wishlist updated", description: `${product.name} removed.` });
        } else {
          addToWishlist(product);
          toast({ title: "Wishlist updated", description: `${product.name} added.` });
        }
      };
      
      const handleShare = () => {
         navigator.clipboard.writeText(window.location.href);
         toast({ title: "Link copied", description: "Product link copied." });
      };
      
      const handleOptionChange = (optionName, value) => {
        setSelectedOptions(prev => ({ ...prev, [optionName]: value }));
      };

      return (
        <div className="space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className="text-primary border-primary">
              {product.category}
            </Badge>
            {product.inStock ? (
              <Badge variant="outline" className="text-green-700 border-green-300 bg-green-50">In Stock</Badge>
            ) : (
              <Badge variant="destructive">Out of Stock</Badge>
            )}
             {product.featured && (
               <Badge variant="outline" className="text-amber-700 border-amber-300 bg-amber-50">Featured</Badge>
            )}
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">{product.name}</h1>
          
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-amber-500' : 'fill-muted text-muted'}`} />
              ))}
            </div>
            <span className="text-muted-foreground">({product.rating.toFixed(1)} rating / {product.reviews} reviews)</span>
          </div>
          
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</span>
            {product.discount > 0 && (
              <>
                <span className="text-lg text-muted-foreground line-through">
                  ${(product.price / (1 - product.discount / 100)).toFixed(2)}
                </span>
                <Badge variant="destructive" className="text-xs">{product.discount}% OFF</Badge>
              </>
            )}
          </div>
          
          <p className="text-foreground/80 text-sm leading-relaxed">{product.description}</p>
          
          {/* Product Options */}
          {product.options && Object.entries(product.options).map(([optionName, values]) => (
            <div key={optionName} className="space-y-1.5">
              <h3 className="font-medium text-sm text-foreground">{optionName}</h3>
              <div className="flex flex-wrap gap-2">
                {values.map((value) => (
                  <Button
                    key={value}
                    variant={selectedOptions[optionName] === value ? "default" : "outline"}
                    size="sm"
                    className={`text-xs h-8 ${selectedOptions[optionName] === value ? 'bg-primary hover:bg-primary/90' : 'border-input text-foreground/80 hover:border-primary hover:text-primary'}`}
                    onClick={() => handleOptionChange(optionName, value)}
                  >
                    {value}
                  </Button>
                ))}
              </div>
            </div>
          ))}
          
          {/* Quantity */}
          <div className="space-y-1.5">
            <h3 className="font-medium text-sm text-foreground">Quantity</h3>
            <div className="flex items-center">
              <Button variant="outline" size="icon" className="h-8 w-8 border-input" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</Button>
              <span className="w-10 text-center text-sm">{quantity}</span>
              <Button variant="outline" size="icon" className="h-8 w-8 border-input" onClick={() => setQuantity(quantity + 1)}>+</Button>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2">
            <Button 
              size="lg" 
              className="flex-1 bg-primary hover:bg-primary/90 h-10 text-sm"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                className={`h-10 w-10 border-input ${isWishlisted ? 'text-red-500 border-red-300 bg-red-50 hover:bg-red-100' : 'hover:border-primary hover:text-primary'}`}
                onClick={handleWishlistToggle}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-red-500' : ''}`} />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-10 w-10 border-input hover:border-primary hover:text-primary"
                onClick={handleShare}
                aria-label="Share product"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      );
    };

    export default ProductInfo;
  