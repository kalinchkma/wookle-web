
    import React from 'react';
    import { useParams, Link } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { Badge } from '@/components/ui/badge';
    import { Button } from '@/components/ui/button';
    import { ArrowLeft, Package, User, MapPin, DollarSign } from 'lucide-react';
    import { sampleOrders } from '@/data/sampleData'; // Using sample data

    const SellerOrderDetailPage = () => {
      const { orderId } = useParams();
      
      // Fetch order details based on orderId (using sample data for now)
      const order = sampleOrders.find(o => o.id === orderId); // Adjust find logic if ID format differs

      if (!order) {
        return (
          <div className="container mx-auto px-4 py-8 text-center">
            <h1 className="text-xl text-destructive">Order not found.</h1>
            <Link to="/seller/orders">
              <Button variant="link" className="mt-4">Back to Orders</Button>
            </Link>
          </div>
        );
      }

      // Sample product details for the order
      const orderItems = [
         { id: 'p1', name: 'Wireless Headphones', quantity: 1, price: 99.99, image: 'https://images.unsplash.com/photo-1603724983917-9ddef25e06b1' },
         { id: 'p2', name: 'Bluetooth Speaker', quantity: 1, price: 49.99, image: 'https://images.unsplash.com/photo-1595872018818-97555653a011' },
      ];
      const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const shipping = 5.00; // Example
      const tax = subtotal * 0.07; // Example
      const total = subtotal + shipping + tax;


      const getStatusBadgeVariant = (status) => {
         switch (status) {
            case 'Completed': return 'success';
            case 'Shipped': return 'secondary';
            case 'Processing': return 'default';
            case 'Cancelled': return 'destructive';
            default: return 'outline';
         }
      }

      return (
        <div className="container mx-auto px-4 py-8">
           <motion.div 
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             className="mb-6"
            >
             <Link to="/seller/orders">
               <Button variant="outline" size="sm" className="text-xs h-8 mb-4">
                 <ArrowLeft className="h-4 w-4 mr-1" /> Back to Orders
               </Button>
             </Link>
             <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
               <h1 className="text-2xl font-bold text-foreground">Order #{order.id}</h1>
                <Badge variant={getStatusBadgeVariant(order.status)} className="text-sm">{order.status}</Badge>
             </div>
             <p className="text-sm text-muted-foreground mt-1">Placed on: {order.date}</p>
           </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
             {/* Order Items */}
             <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="lg:col-span-2"
              >
               <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2"><Package className="h-5 w-5 text-primary"/> Items Ordered</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {orderItems.map(item => (
                      <div key={item.id} className="flex items-center gap-4 border-b pb-4 last:border-b-0 last:pb-0">
                         <img src={item.image} alt={item.name} className="h-16 w-16 rounded object-cover border"/>
                         <div className="flex-grow">
                            <p className="font-medium text-foreground">{item.name}</p>
                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                         </div>
                         <p className="text-sm font-medium text-foreground">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </CardContent>
               </Card>
             </motion.div>

             {/* Order Summary & Customer */}
             <motion.div 
               initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
               className="space-y-6"
              >
                <Card>
                   <CardHeader>
                     <CardTitle className="text-lg flex items-center gap-2"><DollarSign className="h-5 w-5 text-primary"/> Order Summary</CardTitle>
                   </CardHeader>
                   <CardContent className="space-y-2 text-sm">
                     <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                     <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>${shipping.toFixed(2)}</span></div>
                     <div className="flex justify-between"><span className="text-muted-foreground">Tax</span><span>${tax.toFixed(2)}</span></div>
                     <div className="border-t mt-2 pt-2 flex justify-between font-semibold text-base"><span className="text-foreground">Total</span><span>${total.toFixed(2)}</span></div>
                   </CardContent>
                </Card>

                <Card>
                   <CardHeader>
                     <CardTitle className="text-lg flex items-center gap-2"><User className="h-5 w-5 text-primary"/> Customer</CardTitle>
                   </CardHeader>
                   <CardContent className="space-y-1 text-sm">
                      <p className="font-medium text-foreground">{order.customer}</p>
                      <p className="text-muted-foreground">{order.email}</p>
                      {/* Add phone number if available */}
                   </CardContent>
                </Card>

                <Card>
                   <CardHeader>
                     <CardTitle className="text-lg flex items-center gap-2"><MapPin className="h-5 w-5 text-primary"/> Shipping Address</CardTitle>
                   </CardHeader>
                   <CardContent className="text-sm text-muted-foreground leading-relaxed">
                      {/* Placeholder Address */}
                      {order.customer}<br/>
                      123 Shipping Lane<br/>
                      Cityville, ST 54321<br/>
                      Country
                   </CardContent>
                </Card>

                 {/* Add Actions like "Mark as Shipped", "Print Invoice" later */}
             </motion.div>
          </div>
        </div>
      );
    };

    export default SellerOrderDetailPage;
  