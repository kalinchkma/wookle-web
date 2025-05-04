
    import React from "react";
    import { motion } from "framer-motion";
    import { Package } from "lucide-react";
    import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
    import { Badge } from "@/components/ui/badge";
    import { sampleOrders } from "@/data/sampleData"; // Using sample data for now

    const OrdersPage = () => {
      // In a real app, fetch orders for the current user
      const orders = sampleOrders;

      return (
        <div className="container mx-auto px-4 py-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900 mb-8"
          >
            My Orders
          </motion.h1>
          
          {orders.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="flex justify-center mb-4">
                <Package className="h-16 w-16 text-gray-300" />
              </div>
              <h2 className="text-2xl font-medium text-gray-700 mb-4">No orders found</h2>
              <p className="text-gray-500">You haven't placed any orders yet.</p>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              {orders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center border-b pb-4">
                      <div>
                        <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                        <p className="text-sm text-gray-500">Placed on {order.date}</p>
                      </div>
                      <Badge 
                        variant={
                          order.status === 'Completed' ? 'success' :
                          order.status === 'Processing' ? 'default' :
                          order.status === 'Shipped' ? 'secondary' :
                          'destructive'
                        }
                        className="mt-2 sm:mt-0"
                      >
                        {order.status}
                      </Badge>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          {/* Display product images or names here */}
                          <p className="text-sm text-gray-600">Items ordered: {Math.floor(Math.random() * 5) + 1}</p>
                          {/* Placeholder for item details */}
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">Total: ${order.amount.toFixed(2)}</p>
                          {/* Add link to order details page */}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      );
    };

    export default OrdersPage;
  