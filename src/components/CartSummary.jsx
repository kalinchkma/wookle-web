
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

const CartSummary = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.07; // 7% tax
  const total = subtotal + shipping + tax;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg border p-6"
    >
      <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Tax (7%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="border-t pt-3 mt-3">
          <div className="flex justify-between font-medium text-gray-900">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      {shipping === 0 && (
        <div className="bg-green-50 text-green-700 text-sm p-3 rounded-md mb-6">
          You've qualified for free shipping!
        </div>
      )}
      
      <Button 
        className="w-full bg-shopzone hover:bg-shopzone-dark"
        onClick={() => navigate('/checkout')}
        disabled={cart.length === 0}
      >
        Proceed to Checkout
      </Button>
      
      <div className="mt-4">
        <Button 
          variant="outline" 
          className="w-full border-shopzone text-shopzone hover:bg-shopzone hover:text-white"
          onClick={() => navigate('/products')}
        >
          Continue Shopping
        </Button>
      </div>
    </motion.div>
  );
};

export default CartSummary;
