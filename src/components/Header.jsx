
    import React, { useState, useEffect } from "react";
    import { useLocation, useNavigate } from "react-router-dom";
    import { AnimatePresence } from "framer-motion";
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
      const location = useLocation();
      const navigate = useNavigate();
      const { toast } = useToast();
      const { user, logout } = useAuth();
      const { cart } = useCart();
      
      const cartItemCount = cart && cart.reduce((total, item) => total + item.quantity, 0);

      const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
          navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
          setSearchQuery("");
          setIsMenuOpen(false); // Close menu after search on mobile
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
        setIsMenuOpen(false); // Close mobile menu on route change
      }, [location.pathname]);

      return (
        <header className="sticky top-0 z-40 w-full bg-white border-b shadow-sm">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <Logo />
              
              <SearchBar 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearch={handleSearch}
                className="hidden md:flex flex-1 max-w-md mx-4" 
              />
              
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
            
            <SearchBar 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearch={handleSearch}
              className="mt-3 md:hidden" 
            />
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
  