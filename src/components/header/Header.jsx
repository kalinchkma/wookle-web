
    import React, { useState, useEffect } from "react";
    import { useLocation, useNavigate } from "react-router-dom";
    import { AnimatePresence, motion } from "framer-motion";
    import { useToast } from "@/components/ui/use-toast";
    import Logo from "@/components/Logo";
    import { useAuth } from "@/contexts/AuthContext";
    import { useCart } from "@/contexts/CartContext";
    import DesktopNav from "@/components/header/DesktopNav";
    import MobileNav from "@/components/header/MobileNav";
    import MobileMenu from "@/components/header/MobileMenu";
    import SearchBar from "@/components/header/SearchBar";

    const Header = () => {
      const [isMenuOpen, setIsMenuOpen] = useState(false);
      const [searchQuery, setSearchQuery] = useState("");
      const [isHeaderSearchFocused, setIsHeaderSearchFocused] = useState(false);
      const location = useLocation();
      const navigate = useNavigate();
      const { toast } = useToast();
      const { user, logout } = useAuth();
      const { cartItems, loading: cartLoading } = useCart(); 
      
      const cartItemCount = !cartLoading && Array.isArray(cartItems) 
        ? cartItems.reduce((total, item) => total + item.quantity, 0) 
        : 0;

      const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
          navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
          setSearchQuery("");
          setIsMenuOpen(false); 
          setIsHeaderSearchFocused(false);
        }
      };

      const handleLogout = () => {
        logout();
        toast({
          title: "Logged out successfully",
          description: "You have been logged out of your account.",
        });
        navigate("/");
      };

      useEffect(() => {
        setIsMenuOpen(false); 
        setIsHeaderSearchFocused(false);
      }, [location.pathname]);

      return (
        <header className="sticky top-0 z-40 w-full bg-background/95 border-b backdrop-blur-sm shadow-sm">
          <div className="container mx-auto px-4"> 
            <div className="flex items-center justify-between h-16 gap-4">
              <Logo />
              
              <motion.div 
                className="hidden md:flex flex-1 max-w-xl mx-auto"
                layout // Animate layout changes for focus
              >
                 <SearchBar 
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    handleSearch={handleSearch}
                    isHeaderSearch={true}
                    onFocus={() => setIsHeaderSearchFocused(true)}
                    onBlur={() => setIsHeaderSearchFocused(false)}
                    isFocused={isHeaderSearchFocused}
                 />
              </motion.div>
              
              <div className="flex items-center shrink-0">
                <DesktopNav 
                  user={user} 
                  handleLogout={handleLogout} 
                  cartItemCount={cartItemCount} 
                />
                
                <MobileNav 
                  isMenuOpen={isMenuOpen} 
                  setIsMenuOpen={setIsMenuOpen} 
                  cartItemCount={cartItemCount} 
                />
              </div>
            </div>
            
            <div className="py-2 md:hidden">
               <SearchBar 
                 searchQuery={searchQuery}
                 setSearchQuery={setSearchQuery}
                 handleSearch={handleSearch}
                 isHeaderSearch={true} 
                 onFocus={() => setIsHeaderSearchFocused(true)}
                 onBlur={() => setIsHeaderSearchFocused(false)}
                 isFocused={isHeaderSearchFocused}
               />
            </div>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <MobileMenu user={user} handleLogout={handleLogout} />
            )}
          </AnimatePresence>
        </header>
      );
    };

    export default Header;
  