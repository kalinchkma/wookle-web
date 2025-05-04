
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ProductDetail from "@/components/ProductDetail";
import ProductGrid from "@/components/ProductGrid";
import { useProducts } from "@/contexts/ProductContext";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, loading, products } = useProducts();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  useEffect(() => {
    if (!loading) {
      const foundProduct = getProductById(id);
      
      if (foundProduct) {
        setProduct(foundProduct);
        
        // Get related products from the same category
        const related = products
          .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
          .slice(0, 4);
        
        setRelatedProducts(related);
      } else {
        // Product not found, redirect to products page
        navigate("/products");
      }
    }
  }, [id, loading, getProductById, products, navigate]);
  
  if (loading || !product) {
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
      <ProductDetail product={product} />
      
      {relatedProducts.length > 0 && (
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          <ProductGrid products={relatedProducts} />
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
