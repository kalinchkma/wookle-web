
    import React from "react";
    import { motion } from "framer-motion";
    import HomeHero from "@/components/HomeHero";
    import FeaturedCategories from "@/components/FeaturedCategories";
    import FeaturedProducts from "@/components/FeaturedProducts";
    import SellerCTA from "@/components/SellerCTA";
    import Testimonials from "@/components/Testimonials";
    import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
    import { Button } from "@/components/ui/button";
    import { Link } from "react-router-dom";
    import { Store } from "lucide-react";
    import { useProducts } from "@/contexts/ProductContext";
    import { testimonialsData } from "@/data/testimonials";

    const SellerSpotlightPlaceholder = () => {
      return (
        <Card className="bg-gradient-to-br from-primary/10 via-background to-background shadow-lg border-primary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-primary">
              <Store className="h-5 w-5" />
              Seller Spotlight
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="h-20 w-20 rounded-full bg-muted mx-auto mb-3 flex items-center justify-center">
              <Store className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground">Featured Seller Name</h3>
            <p className="text-sm text-muted-foreground mb-3">"Amazing handcrafted goods!"</p>
            <Link to="/products">
              <Button variant="outline" size="sm" className="text-xs h-8 border-primary text-primary hover:bg-primary/10">
                Visit Shop (Placeholder)
              </Button>
            </Link>
          </CardContent>
        </Card>
      );
    };


    const HomePage = () => {
      const { categories, loading: productsLoading } = useProducts();

      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-12 md:space-y-16 lg:space-y-20 pb-12"
        >
          <HomeHero />
          {!productsLoading && <FeaturedCategories categories={categories} /> }
          <FeaturedProducts />
          
          <div className="container mx-auto px-4">
            <SellerSpotlightPlaceholder />
          </div>

          <SellerCTA />
          <Testimonials testimonials={testimonialsData} />
        </motion.div>
      );
    };

    export default HomePage;
  