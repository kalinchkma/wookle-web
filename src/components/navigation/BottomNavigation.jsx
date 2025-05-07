
    import React from 'react';
    import { NavLink, useLocation } from 'react-router-dom';
    import { Home, Search, ShoppingCart, User, Brush, LogIn } from 'lucide-react';
    import { useAuth } from '@/contexts/AuthContext';
    import { useCart } from '@/contexts/CartContext';
    import { Badge } from '@/components/ui/badge'; // Use Badge for count
    import { cn } from '@/lib/utils';

    const BottomNavigation = () => {
      const { user } = useAuth();
      const { cartItems, loading: cartLoading } = useCart();
      const location = useLocation();

      const cartItemCount = !cartLoading && Array.isArray(cartItems) 
        ? cartItems.reduce((total, item) => total + item.quantity, 0) 
        : 0;

      const navItems = [
        { path: '/', icon: Home, label: 'Home' },
        { path: '/search', icon: Search, label: 'Search' },
        { path: '/customize-tshirt', icon: Brush, label: 'Customize' },
        { path: '/cart', icon: ShoppingCart, label: 'Cart', count: cartItemCount },
        user 
          ? { path: '/profile', icon: User, label: 'Profile' }
          : { path: '/login', icon: LogIn, label: 'Sign In' }
      ];

      const isActive = (path) => location.pathname === path;

      return (
        <nav className="fixed bottom-0 left-0 right-0 h-16 bg-background border-t border-border shadow-md z-50 md:hidden">
          <ul className="flex justify-around items-center h-full px-2">
            {navItems.map((item) => (
              <li key={item.path} className="flex-1">
                <NavLink
                  to={item.path}
                  className={({ isActive: routerIsActive }) => cn(
                    "flex flex-col items-center justify-center text-center text-xs px-1 py-1 rounded-md transition-colors duration-200 relative",
                    routerIsActive || (item.path === '/' && location.pathname === '/') 
                      ? "text-primary font-medium" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5 mb-0.5" />
                  <span className="truncate w-full">{item.label}</span>
                  {item.count > 0 && (
                    <Badge 
                       variant="destructive" // Or use 'default' with primary color
                       className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 h-4 px-1.5 text-[10px] rounded-full"
                     >
                       {item.count > 9 ? '9+' : item.count}
                     </Badge>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      );
    };

    export default BottomNavigation;
  