
    import React from "react";
    import SellerDashboard from "@/components/seller/SellerDashboard"; 
    import { useProducts } from "@/contexts/ProductContext";
    import { useShop } from "@/contexts/ShopContext"; // Import useShop
    import { sampleOrders, sampleSellerStats } from "@/data/sampleData"; // Using sample data for now
    import { useNavigate } from "react-router-dom";

    const SellerDashboardPage = () => {
      const navigate = useNavigate();
      const { getShopProducts, loading: productsLoading } = useProducts(); 
      const { shop, loading: shopLoading } = useShop(); // Get shop context
      
      // Get products for the current seller's shop
      const shopProducts = React.useMemo(() => {
        if (shop && !productsLoading) {
          return getShopProducts(shop.id);
        }
        return [];
      }, [shop, productsLoading, getShopProducts]);
      
      // Use sample orders and stats for now - replace with real data later
      const sellerOrders = sampleOrders; // TODO: Fetch orders for this shop
      const sellerStats = sampleSellerStats; // TODO: Calculate stats for this shop

      const isLoading = productsLoading || shopLoading;

      // Redirect to create shop if seller doesn't have one
      React.useEffect(() => {
         if (!isLoading && !shop) {
           navigate('/seller/create-shop');
         }
      }, [isLoading, shop, navigate]);

       if (isLoading || !shop) {
          return <div className="container mx-auto px-4 py-8 text-center">Loading Dashboard...</div>; // Or a spinner
       }


      return (
        <SellerDashboard 
          shop={shop} // Pass shop info down
          products={shopProducts} 
          orders={sellerOrders} 
          stats={sellerStats} 
        />
      );
    };

    export default SellerDashboardPage;
  