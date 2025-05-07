
    import React from "react";
    import { Star, MessageSquare } from "lucide-react";
    import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
    import { Link } from "react-router-dom";
    import { Button } from "@/components/ui/button";

    const ProductSellerInfo = ({ sellerName, sellerId, sellerRating, sellerSales }) => {
      const getInitials = (name) => {
        if (!name) return "?";
        const names = name.split(' ');
        return names.length > 1 
          ? `${names[0][0]}${names[names.length - 1][0]}` 
          : name[0];
      }
      
      return (
        <div className="bg-secondary p-3 rounded-md">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={`https://avatar.vercel.sh/${sellerId || sellerName}.png`} alt={sellerName} />
                <AvatarFallback>{getInitials(sellerName)}</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <span className="text-muted-foreground">Sold by: </span>
                <Link to={`/shop/${sellerId || sellerName}`} className="font-medium text-foreground hover:text-primary transition-colors">
                  {sellerName}
                </Link>
                <div className="flex items-center text-xs text-muted-foreground gap-2 mt-0.5">
                  <span className="flex items-center">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400 mr-0.5" />
                    {sellerRating.toFixed(1)}
                  </span>
                  <span>{sellerSales}+ sales</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };

    export default ProductSellerInfo;
  