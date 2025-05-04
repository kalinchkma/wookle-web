
import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, DollarSign, Users, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const SellerCTA = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-16 bg-gradient-to-r from-purple-100 to-indigo-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Start Selling on <span className="text-shopzone">ShopZone</span> Today
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Join thousands of successful sellers on our platform. Reach millions of customers and grow your business with our powerful selling tools.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-4 rounded-lg shadow-sm"
              >
                <div className="bg-shopzone/10 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-3">
                  <TrendingUp className="h-5 w-5 text-shopzone" />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">Grow Your Business</h3>
                <p className="text-sm text-gray-600">Reach millions of potential customers</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-4 rounded-lg shadow-sm"
              >
                <div className="bg-shopzone/10 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-3">
                  <DollarSign className="h-5 w-5 text-shopzone" />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">Competitive Fees</h3>
                <p className="text-sm text-gray-600">Low commission rates on sales</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-4 rounded-lg shadow-sm"
              >
                <div className="bg-shopzone/10 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-3">
                  <Users className="h-5 w-5 text-shopzone" />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">Seller Support</h3>
                <p className="text-sm text-gray-600">Dedicated support for sellers</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-4 rounded-lg shadow-sm"
              >
                <div className="bg-shopzone/10 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-3">
                  <BarChart className="h-5 w-5 text-shopzone" />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">Analytics</h3>
                <p className="text-sm text-gray-600">Detailed insights and reports</p>
              </motion.div>
            </div>
            
            <Button 
              className="bg-shopzone hover:bg-shopzone-dark text-white px-6"
              onClick={() => navigate('/become-seller')}
            >
              Become a Seller
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img  
                alt="Seller dashboard and analytics" 
                className="w-full h-auto rounded-lg"
               src="https://images.unsplash.com/photo-1686061594225-3e92c0cd51b0" />
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg"
              >
                <div className="flex items-center">
                  <div className="bg-shopzone p-2 rounded-full mr-3">
                    <DollarSign className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Join 50,000+ sellers</h3>
                    <p className="text-sm text-gray-600">Who trust ShopZone for their business</p>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-shopzone/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-shopzone/10 rounded-full blur-xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SellerCTA;
