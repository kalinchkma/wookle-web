
    import React, { createContext, useContext, useState, useEffect } from "react";
    import { sampleProducts } from "@/data/sampleData";
    import { useShop } from "./ShopContext"; // Import useShop

    const ProductContext = createContext();

    export const useProducts = () => useContext(ProductContext);

    export const ProductProvider = ({ children }) => {
      const [products, setProducts] = useState([]);
      const [categories, setCategories] = useState([]); // Global categories
      const [loading, setLoading] = useState(true);
      const { shop } = useShop(); // Get shop context

      useEffect(() => {
        setLoading(true);
        // Load products from localStorage or use sample data
        const storedProducts = localStorage.getItem('products');
        const initialProducts = storedProducts ? JSON.parse(storedProducts) : sampleProducts;
        setProducts(initialProducts);
        
        // Extract global categories
        const uniqueCategories = [...new Set(initialProducts.map(p => p.category))];
        const categoryObjects = uniqueCategories.map((name, index) => ({
          id: `global_cat_${index + 1}`,
          name,
          count: initialProducts.filter(p => p.category === name).length
        }));
        setCategories(categoryObjects);
        
        setLoading(false);
      }, []);

      // Persist products to localStorage whenever they change
      useEffect(() => {
        if (!loading) {
          localStorage.setItem('products', JSON.stringify(products));
        }
      }, [products, loading]);


      const getProductById = (id) => {
        return products.find(product => product.id === id) || null;
      };
      
      // --- Shop-Specific Product Functions ---
      const getShopProducts = (shopId) => {
         if (!shopId) return [];
         return products.filter(product => product.shopId === shopId);
      };

      const addProduct = (productData) => {
        if (!shop) throw new Error("Seller must have a shop to add products.");
        
        const newProduct = {
          ...productData,
          id: `product_${Date.now()}`,
          shopId: shop.id, // Link product to the current seller's shop
          seller: shop.name, // Use shop name as seller name
          createdAt: new Date().toISOString(),
          sales: 0, // Initialize sales
          status: 'Active', // Default status
        };
        
        setProducts(prevProducts => [...prevProducts, newProduct]);
        return newProduct;
      };

      const updateProduct = (id, updatedData) => {
         if (!shop) throw new Error("Seller must have a shop to update products.");
         
         setProducts(prevProducts => 
           prevProducts.map(product => 
             (product.id === id && product.shopId === shop.id) 
               ? { ...product, ...updatedData } 
               : product
           )
         );
      };
      
      const deleteProduct = (id) => {
          if (!shop) throw new Error("Seller must have a shop to delete products.");
          setProducts(prevProducts => prevProducts.filter(product => 
              !(product.id === id && product.shopId === shop.id)
          ));
      };
      // --- End Shop-Specific ---


      const searchProducts = (query) => {
        const searchTerm = query.toLowerCase();
        return products.filter(product => 
          product.name.toLowerCase().includes(searchTerm) || 
          product.description.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm) || // Global category search
          (product.seller && product.seller.toLowerCase().includes(searchTerm)) // Seller/Shop name search
        );
      };

      const getFeaturedProducts = (limit = 8) => {
        return products
          .filter(product => product.featured)
          .slice(0, limit);
      };

      const value = {
        products, // All products (for global views like search, homepage)
        categories, // Global categories
        loading,
        getProductById,
        searchProducts,
        getFeaturedProducts,
        
        // Shop-specific methods (primarily for seller context)
        getShopProducts,
        addProduct,
        updateProduct,
        deleteProduct,
      };

      return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
    };
  