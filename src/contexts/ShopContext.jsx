
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
          const storedShop = localStorage.getItem(`shop_${user.id}`);
          if (storedShop) {
            const parsedShop = JSON.parse(storedShop);
            setShop(parsedShop);
            setSellerCategories(parsedShop.categories || []);
          } else {
            setShop(null); 
            setSellerCategories([]);
          }
        } else {
          setShop(null); 
          setSellerCategories([]);
        }
        setLoading(false);
      }, [user]);

      const createShop = (shopData) => {
        if (!user || user.role !== 'seller') return;
        const newShop = { 
            ...shopData, 
            id: `shop_${user.id}_${Date.now()}`, 
            sellerId: user.id,
            createdAt: new Date().toISOString(),
            categories: [],
            bannerUrl: shopData.bannerUrl || null,
            profileUrl: shopData.profileUrl || null,
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
        if(updatedData.categories) {
          setSellerCategories(updatedData.categories);
        }
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
      
      const getShopById = (shopId) => {
        setLoading(true);
        // In a real app, this would be an API call.
        // For localStorage, we need to find the user who owns this shop.
        // This is a simplified approach; a real backend would handle this better.
        let foundShop = null;
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key.startsWith('shop_')) {
            const potentialShop = JSON.parse(localStorage.getItem(key));
            if (potentialShop.id === shopId) {
              foundShop = potentialShop;
              break;
            }
          }
        }
        setLoading(false);
        return foundShop;
      };


      const value = {
        shop,
        loading,
        createShop,
        updateShop,
        sellerCategories,
        addSellerCategory,
        removeSellerCategory,
        getShopById,
        hasShop: !!shop
      };

      return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
    };
  