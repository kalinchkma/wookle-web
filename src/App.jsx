
    import React from "react";
    import { Routes, Route } from "react-router-dom";
    import { AnimatePresence } from "framer-motion";
    import Header from "@/components/Header";
    import Footer from "@/components/Footer";
    import HomePage from "@/pages/HomePage";
    import ProductsPage from "@/pages/ProductsPage";
    import ProductDetailPage from "@/pages/ProductDetailPage";
    import CartPage from "@/pages/CartPage";
    import LoginPage from "@/pages/LoginPage";
    import RegisterPage from "@/pages/RegisterPage";
    import ProfilePage from "@/pages/ProfilePage";
    import OrdersPage from "@/pages/OrdersPage";
    import WishlistPage from "@/pages/WishlistPage";
    import BecomeSellerPage from "@/pages/BecomeSellerPage";
    import CreateShopPage from "@/pages/CreateShopPage"; 
    import SellerShopSettingsPage from "@/pages/SellerShopSettingsPage"; 
    import CheckoutPage from "@/pages/CheckoutPage";
    import SearchPage from "@/pages/SearchPage";
    import SellerDashboardPage from "@/pages/SellerDashboardPage";
    import SellerProductsPage from "@/pages/SellerProductsPage";
    import SellerOrdersPage from "@/pages/SellerOrdersPage";
    import SellerOrderDetailPage from "@/pages/SellerOrderDetailPage"; 
    import SellerProductEditPage from "@/pages/SellerProductEditPage";
    import CustomTshirtPage from "@/pages/CustomTshirtPage"; // New Customization Page
    import NotFoundPage from "@/pages/NotFoundPage";
    import ProtectedRoute from "@/components/ProtectedRoute";

    const App = () => {
      return (
        <div className="flex flex-col min-h-screen bg-background"> 
          <Header />
          <main className="flex-grow">
            <AnimatePresence mode="wait">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/customize-tshirt" element={<CustomTshirtPage />} /> {/* Added Route */}
                {/* Add public shop view route later if needed: <Route path="/shop/:shopId" element={<PublicShopPage />} /> */}

                {/* Buyer Protected Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/orders" element={<OrdersPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/become-seller" element={<BecomeSellerPage />} />
                </Route>

                {/* Seller Protected Routes */}
                 <Route element={<ProtectedRoute requiredRole="seller" />}>
                    {/* Route for sellers *without* a shop yet */}
                    <Route path="/seller/create-shop" element={<CreateShopPage />} /> 
                    
                    {/* Routes requiring a shop */}
                    <Route element={<ProtectedRoute requiredRole="seller" requireShop={true} />}>
                      <Route path="/seller/dashboard" element={<SellerDashboardPage />} />
                      <Route path="/seller/products" element={<SellerProductsPage />} />
                      <Route path="/seller/products/new" element={<SellerProductEditPage />} />
                      <Route path="/seller/products/:id" element={<SellerProductEditPage />} />
                      <Route path="/seller/orders" element={<SellerOrdersPage />} />
                      <Route path="/seller/orders/:orderId" element={<SellerOrderDetailPage />} /> 
                      <Route path="/seller/shop-settings" element={<SellerShopSettingsPage />} />
                    </Route>
                 </Route>
                
                {/* Catch-all route */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      );
    };

    export default App;
  