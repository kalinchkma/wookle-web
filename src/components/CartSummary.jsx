
    import React from "react";
    import { motion } from "framer-motion";
    import { Button } from "@/components/ui/button";
    import { useNavigate } from "react-router-dom";
    import { useCart } from "@/contexts/CartContext";
    import { Loader2 } from "lucide-react";

    const CartSummary = () => {
      const navigate = useNavigate();
      const { cartItems, loading } = useCart(); 
      
      const safeCartItems = Array.isArray(cartItems) ? cartItems : [];
      
      const subtotal = safeCartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
      const shipping = subtotal > 100 ? 0 : 10; // Example shipping logic
      const taxRate = 0.07; // Example tax rate (7%)
      const tax = subtotal * taxRate; 
      const total = subtotal + shipping + tax;
      const hasItems = safeCartItems.length > 0;
      
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-lg border p-5 sticky top-24 shadow-sm" 
        >
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Order Summary</h3>
          
           {loading ? (
              <div className="flex justify-center items-center h-32">
                 <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
           ) : (
              <>
                 <div className="space-y-2.5 mb-5">
                   <div className="flex justify-between text-sm text-muted-foreground">
                     <span>Subtotal</span>
                     <span className="font-medium text-foreground">${subtotal.toFixed(2)}</span>
                   </div>
                   <div className="flex justify-between text-sm text-muted-foreground">
                     <span>Shipping</span>
                     <span className="font-medium text-foreground">{shipping === 0 && hasItems ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                   </div>
                   <div className="flex justify-between text-sm text-muted-foreground">
                     <span>Tax ({ (taxRate * 100).toFixed(0) }%)</span>
                     <span className="font-medium text-foreground">${tax.toFixed(2)}</span>
                   </div>
                   <div className="border-t border-border pt-3 mt-3">
                     <div className="flex justify-between font-semibold text-lg text-foreground">
                       <span>Total</span>
                       <span>${total.toFixed(2)}</span>
                     </div>
                   </div>
                 </div>
                 
                 {shipping === 0 && hasItems && (
                   <div className="bg-primary/10 text-primary text-xs p-2.5 rounded-md mb-5 text-center">
                     You've qualified for free shipping!
                   </div>
                 )}
                 
                 <Button 
                   size="lg"
                   className="w-full bg-primary hover:bg-primary/90"
                   onClick={() => navigate('/checkout')}
                   disabled={!hasItems}
                 >
                   Proceed to Checkout
                 </Button>
                 
                 <div className="mt-3">
                   <Button 
                     variant="outline" 
                     className="w-full"
                     onClick={() => navigate('/products')}
                   >
                     Continue Shopping
                   </Button>
                 </div>
              </>
           )}
        </motion.div>
      );
    };

    export default CartSummary;
  