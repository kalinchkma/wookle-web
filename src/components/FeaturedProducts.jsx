
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductGrid from "@/components/ProductGrid";
import { useNavigate } from "react-router-dom";

const FeaturedProducts = ({ products }) => {
  const navigate = useNavigate();
  
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
            <p className="text-gray-600">
              Discover our handpicked selection of top products
            </p>
          </div>
          <Button 
            variant="outline" 
            className="mt-4 md:mt-0 border-shopzone text-shopzone hover:bg-shopzone hover:text-white"
            onClick={() => navigate('/products')}
          >
            View All Products
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <ProductGrid products={products} />
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
