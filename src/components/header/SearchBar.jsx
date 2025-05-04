
    import React from "react";
    import { Search } from "lucide-react";
    import { Button } from "@/components/ui/button";
    import { Input } from "@/components/ui/input";

    const SearchBar = ({ searchQuery, setSearchQuery, handleSearch, className }) => {
      return (
        <form onSubmit={handleSearch} className={className}>
          <div className="relative w-full">
            <Input
              type="search"
              placeholder="Search products..."
              className="pr-10 border-shopzone focus:ring-shopzone"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button 
              type="submit" 
              size="icon" 
              className="absolute right-0 top-0 bg-shopzone hover:bg-shopzone-dark"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </form>
      );
    };

    export default SearchBar;
  