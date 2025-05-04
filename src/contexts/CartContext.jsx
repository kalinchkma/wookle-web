
    import React, { createContext, useContext, useState, useEffect } from 'react';

    const CartContext = createContext();

    export const useCart = () => useContext(CartContext);

    export const CartProvider = ({ children }) => {
      const [cartItems, setCartItems] = useState([]);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        setLoading(true);
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
          setCartItems(JSON.parse(storedCart));
        }
        setLoading(false);
      }, []);

      useEffect(() => {
        if (!loading) {
          localStorage.setItem('cart', JSON.stringify(cartItems));
        }
      }, [cartItems, loading]);

      const addToCart = (item) => {
        setCartItems(prevItems => {
          const existingItemIndex = prevItems.findIndex(
            cartItem => cartItem.id === item.id && 
                       // Simple check for standard product vs custom (custom items won't have shopId)
                       (cartItem.shopId === item.shopId) && 
                       // Optional: Deep compare options if needed for standard products
                       JSON.stringify(cartItem.options || {}) === JSON.stringify(item.options || {})
          );

          if (existingItemIndex > -1) {
            const updatedItems = [...prevItems];
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              quantity: updatedItems[existingItemIndex].quantity + (item.quantity || 1),
            };
            return updatedItems;
          } else {
            // For custom items, generate a unique ID if one isn't provided
             const newItem = { ...item, cartItemId: item.cartItemId || `custom_${Date.now()}` };
             if (!newItem.quantity) newItem.quantity = 1; // Ensure quantity exists
             return [...prevItems, newItem];
          }
        });
      };

      const removeFromCart = (cartItemId) => {
        setCartItems(prevItems => prevItems.filter(item => (item.cartItemId || item.id) !== cartItemId));
      };

      const updateQuantity = (cartItemId, quantity) => {
        setCartItems(prevItems => 
          prevItems.map(item => 
            (item.cartItemId || item.id) === cartItemId ? { ...item, quantity: Math.max(1, quantity) } : item
          )
        );
      };

      const clearCart = () => {
        setCartItems([]);
      };

      const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
      const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

      const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        loading,
      };

      return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
    };
  