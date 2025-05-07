
    import React from "react";
    import { motion } from "framer-motion";
    import { useNavigate } from "react-router-dom";
    import { Tag, ShoppingBasket } from "lucide-react";

    const container = {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.07,
          delayChildren: 0.1
        }
      }
    };

    const item = {
      hidden: { opacity: 0, y: 20, scale: 0.95 },
      show: { opacity: 1, y: 0, scale: 1 }
    };

    const FeaturedCategories = ({ categories }) => {
      const navigate = useNavigate();
      
      if (!categories || categories.length === 0) {
        return (
          <section className="py-12 bg-background">
            <div className="container mx-auto px-4 text-center">
              <ShoppingBasket className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-2xl font-semibold text-foreground mb-2">No Categories Available</h2>
              <p className="text-muted-foreground">Please check back later for our featured categories.</p>
            </div>
          </section>
        );
      }

      return (
        <section className="py-10 md:py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: -15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8 md:mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Explore Our Categories
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
                Discover a wide range of products curated just for you.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              {categories.map((category) => (
                <motion.div
                  key={category.id}
                  variants={item}
                  whileHover={{ y: -6, boxShadow: "0px 10px 20px -5px rgba(0,0,0,0.1)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="bg-card rounded-lg p-3 md:p-4 text-center cursor-pointer shadow-sm border border-border/70 hover:border-primary/50"
                  onClick={() => navigate(`/products?category=${category.name}`)}
                >
                  <div className="bg-primary/10 rounded-full p-3 w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 flex items-center justify-center">
                    <Tag className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <h3 className="font-medium text-foreground text-xs md:text-sm truncate w-full">{category.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{category.count} items</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      );
    };

    export default FeaturedCategories;
  