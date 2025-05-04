
    import React from "react";
    import { motion } from "framer-motion";
    import { Heart } from "lucide-react";
    import { Button } from "@/components/ui/button";
    import ProductGrid from "@/components/ProductGrid";
    import { useWishlist } from "@/contexts/WishlistContext";
    import { Link } from "react-router-dom";

    const WishlistPage = () => {
      const { wishlist, clearWishlist } = useWishlist();

      return (
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0"
            >
              My Wishlist
            </motion.h1>
            {wishlist.length > 0 && (
              <Button variant="destructive" onClick={clearWishlist}>
                Clear Wishlist
              </Button>
            )}
          </div>
          
          {wishlist.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="flex justify-center mb-4">
                <Heart className="h-16 w-16 text-gray-300" />
              </div>
              <h2 className="text-2xl font-medium text-gray-700 mb-4">Your wishlist is empty</h2>
              <p className="text-gray-500 mb-8">Add items you love to your wishlist to save them for later.</p>
              <Link to="/products">
                <Button className="bg-shopzone hover:bg-shopzone-dark">
                  Explore Products
                </Button>
              </Link>
            </motion.div>
          ) : (
            <ProductGrid products={wishlist} />
          )}
        </div>
      );
    };

    export default WishlistPage;
  