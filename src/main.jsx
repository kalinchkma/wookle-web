
    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import { BrowserRouter } from 'react-router-dom';
    import App from '@/App.jsx';
    import '@/index.css';
    import { AuthProvider } from '@/contexts/AuthContext';
    import { ProductProvider } from '@/contexts/ProductContext';
    import { CartProvider } from '@/contexts/CartContext';
    import { WishlistProvider } from '@/contexts/WishlistContext';
    import { ShopProvider } from '@/contexts/ShopContext'; 
    import { Toaster } from "@/components/ui/toaster";

    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <BrowserRouter>
          <AuthProvider>
            <ShopProvider> {/* Added ShopProvider */}
              <ProductProvider>
                <CartProvider>
                  <WishlistProvider>
                    <App />
                    <Toaster />
                  </WishlistProvider>
                </CartProvider>
              </ProductProvider>
            </ShopProvider>
          </AuthProvider>
        </BrowserRouter>
      </React.StrictMode>
    );
  