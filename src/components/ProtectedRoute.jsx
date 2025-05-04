
    import React from "react";
    import { Navigate, Outlet, useLocation } from "react-router-dom";
    import { useAuth } from "@/contexts/AuthContext";
    import { useShop } from "@/contexts/ShopContext"; 
    import { motion } from "framer-motion";

    const ProtectedRoute = ({ requiredRole, requireShop = false }) => {
      const { user, loading: authLoading } = useAuth();
      const { hasShop, loading: shopLoading } = useShop(); 
      const location = useLocation();

      const isLoading = authLoading || (requiredRole === 'seller' && shopLoading);

      if (isLoading) {
        return (
          <div className="flex items-center justify-center min-h-[70vh]">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full"
            />
          </div>
        );
      }

      if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
      }

      if (requiredRole && user.role !== requiredRole) {
         // Redirect if role doesn't match
         return <Navigate to={user.role === 'seller' ? "/seller/dashboard" : "/"} replace />;
      }
      
      // Check if seller needs a shop for this route
      if (requiredRole === 'seller' && requireShop && !hasShop) {
          // Seller needs a shop but doesn't have one, redirect to create shop page
          return <Navigate to="/seller/create-shop" state={{ from: location }} replace />;
      }

      return <Outlet />;
    };

    export default ProtectedRoute;
  