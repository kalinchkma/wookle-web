
    import React from 'react';
    import { motion } from 'framer-motion';
    import SellerProductCard from './SellerProductCard';
    import { Package } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { useNavigate } from 'react-router-dom';

    const containerVariants = {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.07,
        },
      },
    };

    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0 },
    };

    const SellerProductGrid = ({ products, onDeleteProduct }) => {
      const navigate = useNavigate();

      if (!products || products.length === 0) {
        return (
          <div className="text-center py-16 text-muted-foreground">
            <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium text-foreground mb-2">No products found</h3>
            <p className="text-sm mb-4">Try adjusting your search or filter criteria, or add your first product!</p>
             <Button size="sm" className="text-xs h-8 bg-primary hover:bg-primary/90" onClick={() => navigate('/seller/products/new')}>Add New Product</Button> 
          </div>
        );
      }

      return (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <SellerProductCard product={product} onDeleteProduct={onDeleteProduct} />
            </motion.div>
          ))}
        </motion.div>
      );
    };

    export default SellerProductGrid;
  