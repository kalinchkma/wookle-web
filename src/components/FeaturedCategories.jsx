
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const FeaturedCategories = ({ categories }) => {
  const navigate = useNavigate();
  
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of product categories and find exactly what you're looking for.
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={item}
              whileHover={{ y: -5 }}
              className="bg-gray-50 rounded-lg p-4 text-center cursor-pointer transition-shadow hover:shadow-md"
              onClick={() => navigate(`/products?category=${category.id}`)}
            >
              <div className="bg-white rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-sm">
                <img  
                  alt={`${category.name} category icon`}
                  className="w-8 h-8"
                 src="https://images.unsplash.com/photo-1662057219054-ac91f1c562b5" />
              </div>
              <h3 className="font-medium text-gray-900">{category.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{category.count} Products</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
