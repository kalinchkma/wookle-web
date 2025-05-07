
    import React from "react";
    import { Menu, X } from "lucide-react";
    import { Button } from "@/components/ui/button";
    
    // Simplified MobileNav - Cart icon is now primarily in BottomNavigation
    const MobileNav = ({ isMenuOpen, setIsMenuOpen, cartItemCount }) => {
      return (
        <div className="flex items-center md:hidden">
          {/* Optional: Keep cart icon here as well, or rely solely on bottom nav */}
          {/* <Link to="/cart" className="relative mr-2"> ... </Link> */}
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-foreground/70 hover:text-foreground"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      );
    };
    
    export default MobileNav;
  