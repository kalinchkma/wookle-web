
    import React, { useState } from "react";
    import DashboardHeader from './DashboardHeader';
    import DashboardStatsGrid from './DashboardStatsGrid';
    import DashboardChartSection from './DashboardChartSection';
    import DashboardTabsSection from './DashboardTabsSection';
    import { useProducts } from '@/contexts/ProductContext'; // For delete action
    import { useToast } from '@/components/ui/use-toast'; // For delete feedback

    const SellerDashboard = ({ shop, products, orders, stats }) => {
      const [dateRange, setDateRange] = useState("week");
      const { deleteProduct } = useProducts();
      const { toast } = useToast();

       const handleDeleteProduct = async (productId, productName) => {
         // Note: This relies on the ProductContext's deleteProduct to update the state
         // which will flow back down as props. Consider optimistic UI later if needed.
         try {
           await deleteProduct(productId);
           toast({ title: "Product Deleted", description: `"${productName}" removed.` });
         } catch (error) {
           toast({ title: "Error deleting product", description: error.message, variant: "destructive" });
         }
       };

      return (
        <div className="container mx-auto px-4 py-6 md:py-8">
          <DashboardHeader shopName={shop?.name} />
          <DashboardStatsGrid stats={stats} dateRange={dateRange} />
          <DashboardChartSection dateRange={dateRange} setDateRange={setDateRange} />
          <DashboardTabsSection 
             products={products} 
             orders={orders} 
             onDeleteProduct={handleDeleteProduct} 
           />
        </div>
      );
    };

    export default SellerDashboard;
  