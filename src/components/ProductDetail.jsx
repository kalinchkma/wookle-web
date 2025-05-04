
    import React from "react";
    import ProductImageGallery from "@/components/product_detail/ProductImageGallery";
    import ProductInfo from "@/components/product_detail/ProductInfo";
    import ProductSellerInfo from "@/components/product_detail/ProductSellerInfo";
    import ProductBenefits from "@/components/product_detail/ProductBenefits";
    import ProductTabs from "@/components/product_detail/ProductTabs";

    const ProductDetail = ({ product }) => {
      if (!product) {
        return <div>Product not found.</div>; 
      }

      return (
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
            {/* Left Column: Image Gallery */}
            <div>
              <ProductImageGallery 
                images={product.images} 
                productName={product.name} 
              />
            </div>
            
            {/* Right Column: Product Info, Seller, Benefits */}
            <div className="space-y-5">
              <ProductInfo product={product} />
              <ProductSellerInfo 
                seller={product.seller} 
                sellerRating={product.sellerRating} 
                sellerSales={product.sellerSales} 
              />
              <ProductBenefits freeShipping={product.freeShipping} />
            </div>
          </div>
          
          {/* Full Width: Tabs */}
          <div className="mt-8 lg:mt-12">
            <ProductTabs product={product} />
          </div>
        </div>
      );
    };

    export default ProductDetail;
  