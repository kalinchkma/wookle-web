
    import React from "react";
    import { Link } from "react-router-dom";
    import { X, Plus, Minus } from "lucide-react";
    import { Button } from "@/components/ui/button";
    import { useCart } from "@/contexts/CartContext";
    import { useToast } from "@/components/ui/use-toast";

    const CartItem = ({ item }) => {
      const { removeFromCart, updateQuantity } = useCart();
      const { toast } = useToast();

      const handleRemove = () => {
        removeFromCart(item.cartItemId || item.id);
        toast({
          title: "Item removed",
          description: `${item.name} removed from cart.`,
          variant: "destructive",
          duration: 2000,
        });
      };

      const handleQuantityChange = (amount) => {
        const newQuantity = item.quantity + amount;
        if (newQuantity >= 1) {
          updateQuantity(item.cartItemId || item.id, newQuantity);
        }
      };
      
      // Determine if it's a standard product or a custom one
      const isCustom = item.type === 'custom_tshirt';
      const linkTarget = isCustom ? null : `/product/${item.id}`; // No link for custom items for now

      return (
        <div className="flex items-center gap-4 border-b py-4">
          {/* Image */}
          <div className="relative h-20 w-20 flex-shrink-0 rounded border overflow-hidden bg-secondary">
             {isCustom && item.color && (
                <div 
                   className="absolute inset-0" 
                   style={{ backgroundColor: item.color }}
                 />
             )}
            <img  
              alt={item.name} 
              class="absolute inset-0 h-full w-full object-contain p-1" 
             src="https://images.unsplash.com/photo-1578346021958-c58829af708b" />
             {isCustom && item.design?.imageUrl && (
                 <img src={item.design.imageUrl} alt="custom design" className="absolute inset-[25%] w-[50%] h-[40%] object-contain"/>
             )}
             {isCustom && item.design?.text && (
                 <div 
                    className="absolute inset-[25%] w-[50%] h-[40%] flex items-center justify-center text-center text-[8px] leading-tight p-0.5 break-words overflow-hidden"
                    style={{ color: item.design.textColor, fontFamily: item.design.fontFamily }}
                 >
                    {item.design.text}
                 </div>
             )}
          </div>

          {/* Details */}
          <div className="flex-grow space-y-1">
             {linkTarget ? (
                <Link to={linkTarget} className="font-medium text-foreground hover:text-primary text-sm line-clamp-1">
                   {item.name}
                </Link>
             ) : (
                 <span className="font-medium text-foreground text-sm line-clamp-1">{item.name}</span>
             )}
            {item.options && Object.entries(item.options).map(([key, value]) => (
              <p key={key} className="text-xs text-muted-foreground capitalize">{key}: {value}</p>
            ))}
             {isCustom && <p className="text-xs text-muted-foreground">Custom Design</p>}
            <div className="flex items-center pt-1">
              <Button variant="outline" size="icon" className="h-6 w-6 border-input" onClick={() => handleQuantityChange(-1)}>
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
              <Button variant="outline" size="icon" className="h-6 w-6 border-input" onClick={() => handleQuantityChange(1)}>
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Price & Remove */}
          <div className="flex flex-col items-end space-y-1">
            <span className="font-semibold text-foreground text-sm">${(item.price * item.quantity).toFixed(2)}</span>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive" onClick={handleRemove}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      );
    };

    export default CartItem;
  