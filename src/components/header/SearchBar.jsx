
    import React from 'react';
    import { Search as SearchIcon, X } from 'lucide-react';
    import { Input } from '@/components/ui/input';
    import { Button } from '@/components/ui/button';
    import { cn } from '@/lib/utils';
    import { motion } from 'framer-motion';

    const SearchBar = ({ searchQuery, setSearchQuery, handleSearch, className, isHeaderSearch = false, onFocus, onBlur, isFocused }) => {
      return (
        <motion.form 
          onSubmit={handleSearch} 
          className={cn("relative w-full group", className)}
          layout // Animate layout changes
        >
          <motion.div 
            className="absolute top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors"
            initial={{ left: isHeaderSearch ? '0.75rem' : '0.875rem' }} // 12px or 14px
            animate={{ left: isFocused && isHeaderSearch ? '0.75rem' : (isHeaderSearch ? '0.75rem' : '0.875rem') }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <SearchIcon className="h-full w-full" />
          </motion.div>
          <Input
            type="search"
            placeholder={isFocused && isHeaderSearch ? "Search anything..." : "Search products..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
            className={cn(
              "w-full border-border modern-search-input",
              isHeaderSearch ? "pl-10 pr-8 h-9 text-sm rounded-full focus:shadow-md" : "pl-10 pr-10 h-10 rounded-lg",
              isFocused && isHeaderSearch && "bg-background shadow-lg border-primary ring-1 ring-primary"
            )}
          />
          {searchQuery && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className={cn(
                "absolute top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-foreground",
                isHeaderSearch ? "right-1.5" : "right-2"
              )}
              onClick={() => setSearchQuery('')}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
        </motion.form>
      );
    };

    export default SearchBar;
  