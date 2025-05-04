
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import CartItem from "@/components/CartItem";
import CartSummary from "@/components/CartSummary";
import { useCart } from "@/contexts/CartContext";

const CartPage = () => {
  const { cart } = useCart();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
      
      {cart.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="flex justify-center mb-4">
            <ShoppingCart className="h-16 w-16 text-gray-300" />
          </div>
          <h2 className="text-2xl font-medium text-gray-700 mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added any products to your cart yet.</p>
          <Link to="/products">
            <Button className="bg-shopzone hover:bg-shopzone-dark">
              Continue Shopping
            </Button>
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-xl font-medium text-gray-900">
                  Cart Items ({cart.reduce((total, item) => total + item.quantity, 0)})
                </h2>
              </div>
              
              <div className="divide-y">
                {cart.map((item) => (
                  <div key={item.id} className="p-6">
                    <CartItem item={item} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <CartSummary />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
