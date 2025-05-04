
    import React from "react";
    import { motion } from "framer-motion";
    import { CreditCard, MapPin, User } from "lucide-react";
    import { Button } from "@/components/ui/button";
    import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
    import { Input } from "@/components/ui/input";
    import { Label } from "@/components/ui/label";
    import { useCart } from "@/contexts/CartContext";
    import { useNavigate } from "react-router-dom";
    import { useToast } from "@/components/ui/use-toast";

    const CheckoutPage = () => {
      const { cart, getCartTotal, clearCart } = useCart();
      const navigate = useNavigate();
      const { toast } = useToast();
      
      const subtotal = getCartTotal();
      const shipping = subtotal > 100 ? 0 : 10;
      const tax = subtotal * 0.07; // 7% tax
      const total = subtotal + shipping + tax;

      const handlePlaceOrder = () => {
        // Simulate order placement
        // In a real app, this would involve backend processing and payment gateway integration (e.g., Stripe)
        toast({
          title: "Order Placed!",
          description: "Thank you for your purchase. Your order is being processed.",
        });
        clearCart();
        navigate("/orders"); // Redirect to orders page after successful order
      };
      
      if (cart.length === 0) {
        return (
          <div className="container mx-auto px-4 py-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Checkout</h1>
            <p className="text-gray-600 mb-8">Your cart is empty. Add some products before checking out.</p>
            <Button onClick={() => navigate('/products')} className="bg-shopzone hover:bg-shopzone-dark">
              Continue Shopping
            </Button>
          </div>
        );
      }

      return (
        <div className="container mx-auto px-4 py-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900 mb-8"
          >
            Checkout
          </motion.h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Shipping & Payment Forms */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center"><MapPin className="mr-2 h-5 w-5 text-shopzone"/> Shipping Address</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Placeholder form fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" placeholder="123 Market St" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="San Francisco" />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input id="state" placeholder="CA" />
                      </div>
                      <div>
                        <Label htmlFor="zip">Zip Code</Label>
                        <Input id="zip" placeholder="94103" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center"><CreditCard className="mr-2 h-5 w-5 text-shopzone"/> Payment Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Placeholder - In real app, use Stripe Elements */}
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="•••• •••• •••• ••••" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input id="expiryDate" placeholder="MM / YY" />
                      </div>
                      <div>
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="•••" />
                      </div>
                      <div>
                        <Label htmlFor="billingZip">Billing Zip</Label>
                        <Input id="billingZip" placeholder="94103" />
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      Payment processing will be handled securely. (This is a placeholder UI)
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between items-center text-sm">
                        <span className="flex-1 truncate mr-2">{item.name} (x{item.quantity})</span>
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2 border-t pt-4">
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
                      <div className="flex justify-between font-bold text-gray-900 text-lg">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-6 bg-shopzone hover:bg-shopzone-dark" 
                    onClick={handlePlaceOrder}
                  >
                    Place Order
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      );
    };

    export default CheckoutPage;
  