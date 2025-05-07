
    import React from "react";
    import { motion } from "framer-motion";
    import { Link } from "react-router-dom";
    import { ShoppingCart } from "lucide-react";
    import { Button } from "@/components/ui/button";
    import CartItem from "@/components/CartItem";
    import CartSummary from "@/components/CartSummary";
    import { useCart } from "@/contexts/CartContext";

    const CartPage = () => {
      const { cartItems, loading } = useCart(); 
      
      const cartItemCount = !loading && Array.isArray(cartItems) 
          ? cartItems.reduce((total, item) => total + item.quantity, 0) 
          : 0;
          
      const hasItems = !loading && Array.isArray(cartItems) && cartItems.length > 0;

      return (
        <div className="container mx-auto px-4 py-8">
          <motion.h1 
             initial={{ opacity: 0, y: -10 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-3xl font-bold text-foreground mb-8"
          >
             Your Cart
          </motion.h1>
          
          {loading ? (
             <div className="flex justify-center items-center h-64">
                <motion.div
                   animate={{ rotate: 360 }}
                   transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                   className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full"
                 />
             </div>
          ) : !hasItems ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="flex justify-center mb-4">
                <ShoppingCart className="h-16 w-16 text-muted-foreground/50" />
              </div>
              <h2 className="text-2xl font-medium text-foreground mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">Looks like you haven't added any products to your cart yet.</p>
              <Link to="/products">
                <Button className="bg-primary hover:bg-primary/90">
                  Continue Shopping
                </Button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <motion.div 
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="lg:col-span-2"
              >
                <div className="bg-card rounded-lg border overflow-hidden shadow-sm">
                  <div className="p-5 border-b">
                    <h2 className="text-xl font-medium text-card-foreground">
                      Cart Items ({cartItemCount})
                    </h2>
                  </div>
                  
                  <div className="divide-y divide-border">
                    {cartItems.map((item) => (
                      <div key={item.cartItemId || item.id} className="p-4 md:p-5">
                        <CartItem item={item} />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
              >
                <CartSummary />
              </motion.div>
            </div>
          )}
        </div>
      );
    };

    export default CartPage;
  