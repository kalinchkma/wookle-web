
    import React from "react";
    import { Routes, Route, useLocation } from "react-router-dom";
    import { AnimatePresence } from "framer-motion";
    import Header from "@/components/header/Header";
    import Footer from "@/components/Footer";
    import CategoryNavBar from "@/components/header/CategoryNavBar";
    import BottomNavigation from "@/components/navigation/BottomNavigation"; 
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
    import CustomTshirtPage from "@/pages/CustomTshirtPage"; 
    import PublicShopPage from "@/pages/PublicShopPage";
    import NotFoundPage from "@/pages/NotFoundPage";
    import ProtectedRoute from "@/components/ProtectedRoute";

    const App = () => {
      const location = useLocation();
      const showCategoryNav = !['/login', '/register', '/seller/create-shop'].includes(location.pathname) && !location.pathname.startsWith('/seller/');
      
      const showBottomNav = !['/login', '/register'].includes(location.pathname);

      return (
        <div className="flex flex-col min-h-screen bg-background"> 
          <Header />
          {showCategoryNav && <CategoryNavBar />} 
          <main className="flex-grow pb-16 md:pb-0"> 
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/customize-tshirt" element={<CustomTshirtPage />} /> 
                <Route path="/shop/:shopId" element={<PublicShopPage />} />

                <Route element={<ProtectedRoute />}>
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/orders" element={<OrdersPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/become-seller" element={<BecomeSellerPage />} />
                </Route>

                 <Route element={<ProtectedRoute requiredRole="seller" />}>
                    <Route path="/seller/create-shop" element={<CreateShopPage />} /> 
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
                
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </AnimatePresence>
          </main>
          {showBottomNav && <BottomNavigation />} 
          <Footer /> 
        </div>
      );
    };

    export default App;
  