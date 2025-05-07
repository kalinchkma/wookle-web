
    import React, { useEffect, useState } from 'react';
    import { useParams, Link } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { useShop } from '@/contexts/ShopContext';
    import { useProducts } from '@/contexts/ProductContext';
    import ProductCard from '@/components/ProductCard';
    import { Card, CardContent } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { Store, MapPin, Info, ShoppingBag, Loader2 } from 'lucide-react';

    const PublicShopPage = () => {
      const { shopId } = useParams();
      const { getShopById, loading: shopLoading } = useShop();
      const { getShopProducts, loading: productsLoading } = useProducts();

      const [shopDetails, setShopDetails] = useState(null);
      const [shopProducts, setShopProducts] = useState([]);

      useEffect(() => {
        const fetchedShop = getShopById(shopId);
        setShopDetails(fetchedShop);
        if (fetchedShop) {
          const products = getShopProducts(fetchedShop.id);
          setShopProducts(products);
        }
      }, [shopId, getShopById, getShopProducts]);

      const isLoading = shopLoading || productsLoading;

      if (isLoading) {
        return (
          <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        );
      }

      if (!shopDetails) {
        return (
          <div className="container mx-auto px-4 py-12 text-center">
            <Store className="h-20 w-20 mx-auto text-muted-foreground mb-6" />
            <h1 className="text-3xl font-bold text-foreground mb-3">Shop Not Found</h1>
            <p className="text-muted-foreground mb-6">Sorry, we couldn't find the shop you're looking for.</p>
            <Link to="/products">
              <Button className="bg-primary hover:bg-primary/90">Browse All Products</Button>
            </Link>
          </div>
        );
      }

      return (
        <div className="bg-secondary/30">
          {/* Shop Header */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative h-48 md:h-64 bg-muted overflow-hidden"
          >
            {shopDetails.bannerUrl ? (
              <img 
                alt={`${shopDetails.name} banner`}
                class="w-full h-full object-cover"
               src="https://images.unsplash.com/photo-1622322958347-72fc1db9d764" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/30 to-primary/60 flex items-center justify-center">
                 <Store className="h-16 w-16 text-primary-foreground/50" />
              </div>
            )}
            <div className="absolute inset-0 bg-black/30"></div>
          </motion.div>

          <div className="container mx-auto px-4 -mt-16 md:-mt-20 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="overflow-hidden shadow-xl mb-8">
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
                    <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-full border-4 border-background shadow-md overflow-hidden flex-shrink-0 bg-muted">
                       {shopDetails.profileUrl ? (
                         <img 
                           alt={`${shopDetails.name} profile`}
                           class="w-full h-full object-cover"
                          src="https://images.unsplash.com/photo-1652841190565-b96e0acbae17" />
                       ) : (
                         <Store className="h-12 w-12 text-muted-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                       )}
                    </div>
                    <div className="text-center sm:text-left">
                      <h1 className="text-2xl md:text-3xl font-bold text-foreground">{shopDetails.name}</h1>
                      {shopDetails.location && (
                        <p className="text-sm text-muted-foreground flex items-center justify-center sm:justify-start mt-1">
                          <MapPin className="h-3.5 w-3.5 mr-1.5" /> {shopDetails.location}
                        </p>
                      )}
                      {/* Add more shop info like ratings, member since etc. later */}
                    </div>
                  </div>
                  {shopDetails.description && (
                    <div className="mt-4 md:mt-6 pt-4 border-t">
                      <h2 className="text-sm font-semibold text-foreground mb-1.5 flex items-center">
                        <Info className="h-4 w-4 mr-2 text-primary" /> About This Shop
                      </h2>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 md:line-clamp-none">
                        {shopDetails.description}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Shop Products */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="pb-12"
            >
              <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3 md:mb-5 flex items-center">
                <ShoppingBag className="h-5 w-5 mr-2.5 text-primary" /> Products from {shopDetails.name}
              </h2>
              {shopProducts.length > 0 ? (
                <div className="product-grid">
                  {shopProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-card border rounded-lg">
                  <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground">This shop hasn't added any products yet.</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      );
    };

    export default PublicShopPage;
  