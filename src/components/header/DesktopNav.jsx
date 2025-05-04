
    import React from "react";
    import { Link, useLocation, useNavigate } from "react-router-dom";
    import { ShoppingCart, User, Package, Store, Heart, LogOut, Settings, Brush } from "lucide-react"; // Added Brush
    import { Button } from "@/components/ui/button";
    import { 
      DropdownMenu,
      DropdownMenuContent,
      DropdownMenuItem,
      DropdownMenuLabel,
      DropdownMenuSeparator,
      DropdownMenuTrigger,
    } from "@/components/ui/dropdown-menu";
     import { useShop } from "@/contexts/ShopContext"; // Import useShop

    const DesktopNav = ({ user, handleLogout, cartItemCount }) => {
      const location = useLocation();
      const navigate = useNavigate();
      const { hasShop } = useShop(); // Check if seller has a shop

      return (
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-5"> 
          <Link 
            to="/" 
            className={`nav-link text-sm font-medium ${location.pathname === '/' ? 'text-primary active' : 'text-foreground/70 hover:text-primary'}`}
          >
            Home
          </Link>
          <Link 
            to="/products" 
            className={`nav-link text-sm font-medium ${location.pathname.startsWith('/products') ? 'text-primary active' : 'text-foreground/70 hover:text-primary'}`}
          >
            Products
          </Link>
          <Link 
            to="/customize-tshirt" 
            className={`nav-link text-sm font-medium ${location.pathname === '/customize-tshirt' ? 'text-primary active' : 'text-foreground/70 hover:text-primary'}`}
          >
             Customize
          </Link>
          {user?.role === 'seller' && hasShop && ( // Only show if seller HAS a shop
            <Link 
              to="/seller/dashboard" 
              className={`nav-link text-sm font-medium ${location.pathname.startsWith('/seller') ? 'text-primary active' : 'text-foreground/70 hover:text-primary'}`}
            >
              Seller Dashboard
            </Link>
          )}
           {user?.role === 'seller' && !hasShop && ( // Show create shop if seller DOESN'T have one
            <Link 
              to="/seller/create-shop" 
              className={`nav-link text-sm font-medium ${location.pathname.startsWith('/seller/create-shop') ? 'text-primary active' : 'text-foreground/70 hover:text-primary'}`}
            >
              Create Shop
            </Link>
          )}
          
          <div className="flex items-center gap-1">
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="h-9 w-9 text-foreground/70 hover:text-primary hover:bg-secondary">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="cart-badge">{cartItemCount}</span>
                )}
                 <span className="sr-only">Cart</span>
              </Button>
            </Link>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9 text-foreground/70 hover:text-primary hover:bg-secondary rounded-full">
                    <User className="h-5 w-5" />
                     <span className="sr-only">User Menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Hi, {user.name}!</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                   {user.role === 'seller' && hasShop && (
                     <>
                       <DropdownMenuItem onClick={() => navigate('/seller/dashboard')}>
                         <Store className="mr-2 h-4 w-4" />
                         <span>Seller Dashboard</span>
                       </DropdownMenuItem>
                       <DropdownMenuItem onClick={() => navigate('/seller/shop-settings')}>
                         <Settings className="mr-2 h-4 w-4" />
                         <span>Shop Settings</span>
                       </DropdownMenuItem>
                     </>
                   )}
                    {user.role === 'seller' && !hasShop && (
                       <DropdownMenuItem onClick={() => navigate('/seller/create-shop')}>
                         <Store className="mr-2 h-4 w-4" />
                         <span>Create Your Shop</span>
                       </DropdownMenuItem>
                    )}
                   {user.role === 'buyer' && (
                     <>
                       <DropdownMenuItem onClick={() => navigate('/orders')}>
                         <Package className="mr-2 h-4 w-4" />
                         <span>My Orders</span>
                       </DropdownMenuItem>
                       <DropdownMenuItem onClick={() => navigate('/wishlist')}>
                         <Heart className="mr-2 h-4 w-4" />
                         <span>My Wishlist</span>
                       </DropdownMenuItem>
                        <DropdownMenuSeparator />
                       <DropdownMenuItem onClick={() => navigate('/become-seller')}>
                         <Store className="mr-2 h-4 w-4" />
                         <span>Become a Seller</span>
                       </DropdownMenuItem>
                     </>
                   )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="default" 
                size="sm"
                className="bg-primary hover:bg-primary/90 h-9 text-sm"
                onClick={() => navigate('/login')}
              >
                Sign In
              </Button>
            )}
          </div>
        </nav>
      );
    };

    export default DesktopNav;
  