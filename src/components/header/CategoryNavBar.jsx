
    import React from 'react';
    import { Link, useLocation } from 'react-router-dom';
    import { useProducts } from '@/contexts/ProductContext';
    import { motion } from 'framer-motion';
    import { ChevronDown } from 'lucide-react';
    import {
      DropdownMenu,
      DropdownMenuContent,
      DropdownMenuItem,
      DropdownMenuTrigger,
    } from "@/components/ui/dropdown-menu";
    import { Button } from '@/components/ui/button';

    const CategoryNavBar = () => {
      const { categories, loading } = useProducts();
      const location = useLocation();
      const MAX_VISIBLE_CATEGORIES = 7; // Adjust as needed

      if (loading || !categories || categories.length === 0) {
        // Optional: Show skeleton loaders
        return <div className="h-10 bg-secondary animate-pulse"></div>; 
      }

      const visibleCategories = categories.slice(0, MAX_VISIBLE_CATEGORIES);
      const moreCategories = categories.slice(MAX_VISIBLE_CATEGORIES);

      const isActive = (categoryId) => {
         const searchParams = new URLSearchParams(location.search);
         return location.pathname === '/products' && searchParams.get('category') === categoryId;
      }

      return (
        <nav className="bg-secondary border-b border-border shadow-sm sticky top-[65px] z-30"> 
          <div className="container mx-auto px-4 h-10 flex items-center justify-between overflow-x-auto whitespace-nowrap no-scrollbar">
            <div className="flex items-center space-x-4 lg:space-x-6">
              {visibleCategories.map((category) => (
                <Link
                  key={category.id}
                  to={`/products?category=${category.id}`}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(category.id) ? 'text-primary font-semibold' : 'text-foreground/80'
                  }`}
                >
                  {category.name}
                </Link>
              ))}
            </div>

            {moreCategories.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-sm h-8 px-2 text-foreground/80 hover:text-primary hover:bg-accent">
                    More <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="max-h-60 overflow-y-auto">
                  {moreCategories.map((category) => (
                    <DropdownMenuItem key={category.id} asChild className={isActive(category.id) ? 'bg-accent' : ''}>
                      <Link to={`/products?category=${category.id}`}>
                        {category.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </nav>
      );
    };

    export default CategoryNavBar;
  