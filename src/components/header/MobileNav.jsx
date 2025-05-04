
    import React from "react";
    import { Link } from "react-router-dom";
    import { ShoppingCart, Menu, X } from "lucide-react";
    import { Button } from "@/components/ui/button";

    const MobileNav = ({ isMenuOpen, setIsMenuOpen, cartItemCount }) => {
      return (
        <div className="flex items-center md:hidden">
          <Link to="/cart" className="relative mr-2">
            <Button variant="ghost" size="icon" className="text-gray-600">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )}
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-600"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      );
    };

    export default MobileNav;
  