
    import React from "react";
    import ProductCard from "@/components/ProductCard";
    import { motion } from "framer-motion";
    import { ShoppingBag } from "lucide-react";

    const container = {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.05 // Slightly faster stagger
        }
      }
    };

    const item = {
      hidden: { opacity: 0, y: 15 },
      show: { opacity: 1, y: 0 }
    };

    const ProductGrid = ({ products }) => {
      if (!products || products.length === 0) {
        return (
          <div className="text-center py-16 text-muted-foreground">
            <ShoppingBag className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium text-foreground mb-2">No products found</h3>
            <p className="text-sm">Try adjusting your search or filter criteria.</p>
          </div>
        );
      }

      return (
        <motion.div 
          className="product-grid" // Ensure this class handles grid layout and alignment
          variants={container}
          initial="hidden"
          animate="show"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={item}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      );
    };

    export default ProductGrid;
  