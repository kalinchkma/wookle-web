
    import React from "react";
    import { motion } from "framer-motion";
    import SellerOrderTable from "@/components/seller/SellerOrderTable"; // Import refactored component
    import { sampleOrders } from "@/data/sampleData"; // Using sample data

    const SellerOrdersPage = () => {
      // Fetch orders specific to the seller in a real app
      const sellerOrders = sampleOrders; 

      return (
        <div className="container mx-auto px-4 py-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900 mb-8"
          >
            Manage Orders
          </motion.h1>
          
          <SellerOrderTable orders={sellerOrders} />
          
        </div>
      );
    };

    export default SellerOrdersPage;
  