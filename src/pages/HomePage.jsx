
import React from "react";
import { motion } from "framer-motion";
import HomeHero from "@/components/HomeHero";
import FeaturedCategories from "@/components/FeaturedCategories";
import FeaturedProducts from "@/components/FeaturedProducts";
import SellerCTA from "@/components/SellerCTA";
import Testimonials from "@/components/Testimonials";
import { useProducts } from "@/contexts/ProductContext";
import { sampleCategories, sampleTestimonials } from "@/data/sampleData";

const HomePage = () => {
  const { getFeaturedProducts, loading } = useProducts();
  
  const featuredProducts = getFeaturedProducts(8);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-shopzone border-t-transparent rounded-full"
        />
      </div>
    );
  }
  
  return (
    <div>
      <HomeHero />
      <FeaturedCategories categories={sampleCategories} />
      <FeaturedProducts products={featuredProducts} />
      <SellerCTA />
      <Testimonials testimonials={sampleTestimonials} />
    </div>
  );
};

export default HomePage;
