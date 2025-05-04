
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Truck, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HomeHero = () => {
  const navigate = useNavigate();
  
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-purple-50 to-indigo-50">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Your One-Stop <span className="text-shopzone">Marketplace</span>
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Discover thousands of products from trusted sellers or start selling your own items today. 
              ShopZone connects buyers and sellers in one seamless platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                className="bg-shopzone hover:bg-shopzone-dark text-white px-6"
                onClick={() => navigate('/products')}
              >
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                className="border-shopzone text-shopzone hover:bg-shopzone hover:text-white"
                onClick={() => navigate('/become-seller')}
              >
                Become a Seller
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <motion.div 
                whileHover={{ y: -5 }}
                className="flex items-center"
              >
                <div className="bg-white p-2 rounded-full shadow-sm mr-3">
                  <Truck className="h-5 w-5 text-shopzone" />
                </div>
                <span className="text-sm font-medium">Free Shipping</span>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5 }}
                className="flex items-center"
              >
                <div className="bg-white p-2 rounded-full shadow-sm mr-3">
                  <Shield className="h-5 w-5 text-shopzone" />
                </div>
                <span className="text-sm font-medium">Secure Payment</span>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5 }}
                className="flex items-center"
              >
                <div className="bg-white p-2 rounded-full shadow-sm mr-3">
                  <Clock className="h-5 w-5 text-shopzone" />
                </div>
                <span className="text-sm font-medium">24/7 Support</span>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img  
                alt="ShopZone marketplace showcase" 
                className="w-full h-auto rounded-lg"
               src="https://images.unsplash.com/photo-1542744095-291d1f67b221" />
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg"
              >
                <div className="flex items-center">
                  <div className="bg-shopzone p-2 rounded-full mr-3">
                    <ShoppingBag className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Join thousands of happy customers</h3>
                    <p className="text-sm text-gray-600">Over 10,000+ products available</p>
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
      
      {/* Wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
          <path 
            fill="#ffffff" 
            fillOpacity="1" 
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default HomeHero;
