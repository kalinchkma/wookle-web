
     import React from "react";
     import { Link } from "react-router-dom";
     import { motion } from "framer-motion";
     import { useShop } from "@/contexts/ShopContext"; // Import useShop
     import { Home, ShoppingBag, User, Package, Heart, Store, LogOut, Settings, Brush } from "lucide-react"; // Added Brush

     const MobileMenu = ({ user, handleLogout }) => {
       const { hasShop } = useShop();

       const linkClass = "flex items-center gap-3 py-3 px-2 text-foreground/80 hover:text-primary border-b";
       const iconClass = "h-5 w-5";

       return (
         <motion.div
           initial={{ height: 0, opacity: 0 }}
           animate={{ height: "auto", opacity: 1 }}
           exit={{ height: 0, opacity: 0 }}
           transition={{ duration: 0.2 }}
           className="md:hidden overflow-hidden bg-background border-t"
         >
           <nav className="flex flex-col px-4 py-2">
             <Link to="/" className={linkClass}> <Home className={iconClass}/> Home </Link>
             <Link to="/products" className={linkClass}> <ShoppingBag className={iconClass}/> Products </Link>
             <Link to="/customize-tshirt" className={linkClass}> <Brush className={iconClass}/> Customize </Link> 
             
             {user ? (
               <>
                 <Link to="/profile" className={linkClass}> <User className={iconClass}/> Profile </Link>
                 
                 {user.role === 'seller' && hasShop && (
                   <>
                     <Link to="/seller/dashboard" className={linkClass}> <Store className={iconClass}/> Seller Dashboard </Link>
                      <Link to="/seller/shop-settings" className={linkClass}> <Settings className={iconClass}/> Shop Settings </Link>
                   </>
                 )}
                 {user.role === 'seller' && !hasShop && (
                    <Link to="/seller/create-shop" className={linkClass}> <Store className={iconClass}/> Create Your Shop </Link>
                 )}

                 {user.role === 'buyer' && (
                    <>
                       <Link to="/orders" className={linkClass}> <Package className={iconClass}/> My Orders </Link>
                       <Link to="/wishlist" className={linkClass}> <Heart className={iconClass}/> My Wishlist </Link>
                       <Link to="/become-seller" className={linkClass}> <Store className={iconClass}/> Become a Seller </Link>
                    </>
                 )}

                 <button onClick={handleLogout} className={`${linkClass} text-destructive hover:text-destructive border-0`}> 
                   <LogOut className={iconClass}/> Log out 
                 </button>
               </>
             ) : (
               <Link to="/login" className={`${linkClass} text-primary font-medium border-0`}> 
                 <User className={iconClass}/> Sign In 
               </Link>
             )}
           </nav>
         </motion.div>
       );
     };

     export default MobileMenu;
   