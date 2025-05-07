
    import React from "react";
    import ProductImageGallery from "@/components/product_detail/ProductImageGallery";
    import ProductInfo from "@/components/product_detail/ProductInfo";
    import ProductSellerInfo from "@/components/product_detail/ProductSellerInfo";
    import ProductBenefits from "@/components/product_detail/ProductBenefits";
    import ProductTabs from "@/components/product_detail/ProductTabs";
    import MessageSellerDialog from "@/components/product_detail/MessageSellerDialog";
    import ShopTheLook from "@/components/product_detail/ShopTheLook";
    import { useProducts } from "@/contexts/ProductContext";

    const ProductDetail = ({ product }) => {
      const { getShopProducts } = useProducts();

      if (!product) {
        return <div>Product not found.</div>; 
      }

      const sellerProducts = product.sellerId ? getShopProducts(product.sellerId).filter(p => p.id !== product.id).slice(0, 3) : [];

      return (
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
            <div>
              <ProductImageGallery 
                images={product.images} 
                productName={product.name} 
              />
            </div>
            
            <div className="space-y-5">
              <ProductInfo product={product} />
              <ProductSellerInfo 
                sellerName={product.seller} 
                sellerId={product.sellerId}
                sellerRating={product.sellerRating} 
                sellerSales={product.sellerSales} 
              />
              <MessageSellerDialog sellerName={product.seller} sellerId={product.sellerId} productName={product.name} />
              <ProductBenefits freeShipping={product.freeShipping} />
            </div>
          </div>
          
          {sellerProducts.length > 0 && (
            <div className="mt-8 lg:mt-12">
              <ShopTheLook products={sellerProducts} sellerName={product.seller} />
            </div>
          )}

          <div className="mt-8 lg:mt-12">
            <ProductTabs product={product} />
          </div>
        </div>
      );
    };

    export default ProductDetail;
  