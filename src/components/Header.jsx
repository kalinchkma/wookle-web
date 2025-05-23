
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
      }, [location.pathname]);

      return (
        <header className="sticky top-0 z-40 w-full bg-background border-b shadow-sm">
          <div className="container mx-auto px-4 py-2"> 
            <div className="flex items-center justify-between gap-4">
              <Logo />
              
              <SearchBar 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearch={handleSearch}
                className="hidden md:flex flex-1 max-w-xl mx-auto" 
              />
              
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
            
            <SearchBar 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearch={handleSearch}
              className="mt-2 md:hidden" 
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
  