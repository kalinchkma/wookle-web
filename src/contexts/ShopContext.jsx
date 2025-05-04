
    import React, { createContext, useContext, useState, useEffect } from 'react';
    import { useAuth } from './AuthContext';

    const ShopContext = createContext();

    export const useShop = () => useContext(ShopContext);

    export const ShopProvider = ({ children }) => {
      const { user } = useAuth();
      const [shop, setShop] = useState(null);
      const [loading, setLoading] = useState(true);
      const [sellerCategories, setSellerCategories] = useState([]);

      useEffect(() => {
        setLoading(true);
        if (user && user.role === 'seller') {
          // Try to load shop data from localStorage
          const storedShop = localStorage.getItem(`shop_${user.id}`);
          if (storedShop) {
            const parsedShop = JSON.parse(storedShop);
            setShop(parsedShop);
            setSellerCategories(parsedShop.categories || []);
          } else {
            setShop(null); // No shop found for this seller
            setSellerCategories([]);
          }
        } else {
          setShop(null); // Not a seller or not logged in
          setSellerCategories([]);
        }
        setLoading(false);
      }, [user]);

      const createShop = (shopData) => {
        if (!user || user.role !== 'seller') return;
        const newShop = { 
            ...shopData, 
            id: `shop_${Date.now()}`, 
            sellerId: user.id,
            createdAt: new Date().toISOString(),
            categories: [] // Initialize with empty categories
        };
        localStorage.setItem(`shop_${user.id}`, JSON.stringify(newShop));
        setShop(newShop);
        setSellerCategories([]);
        return newShop;
      };

      const updateShop = (updatedData) => {
        if (!shop || !user || shop.sellerId !== user.id) return;
        const newShopData = { ...shop, ...updatedData };
        localStorage.setItem(`shop_${user.id}`, JSON.stringify(newShopData));
        setShop(newShopData);
      };
      
       const addSellerCategory = (categoryName) => {
         if (!shop) return;
         const newCategory = { id: `cat_${Date.now()}`, name: categoryName };
         const updatedCategories = [...sellerCategories, newCategory];
         const updatedShop = { ...shop, categories: updatedCategories };
         updateShop(updatedShop); 
         setSellerCategories(updatedCategories);
         return newCategory;
       };

       const removeSellerCategory = (categoryId) => {
         if (!shop) return;
         const updatedCategories = sellerCategories.filter(cat => cat.id !== categoryId);
         const updatedShop = { ...shop, categories: updatedCategories };
         updateShop(updatedShop);
         setSellerCategories(updatedCategories);
       };


      const value = {
        shop,
        loading,
        createShop,
        updateShop,
        sellerCategories,
        addSellerCategory,
        removeSellerCategory,
        hasShop: !!shop
      };

      return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
    };
  