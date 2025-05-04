
    import React from "react";
    import { Truck, Shield, RotateCcw } from "lucide-react";

    const ProductBenefits = ({ freeShipping }) => {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-muted-foreground border-t pt-4">
          <div className="flex items-center gap-1.5">
            <Truck className="h-4 w-4 text-primary" />
            <span>{freeShipping ? 'Free Shipping' : 'Fast Delivery'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Shield className="h-4 w-4 text-primary" />
            <span>Secure Payment</span>
          </div>
          <div className="flex items-center gap-1.5">
            <RotateCcw className="h-4 w-4 text-primary" />
            <span>Easy Returns</span>
          </div>
        </div>
      );
    };

    export default ProductBenefits;
  