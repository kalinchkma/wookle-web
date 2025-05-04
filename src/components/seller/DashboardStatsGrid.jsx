
    import React from 'react';
    import StatsCard from '@/components/seller/StatsCard';
    import { Package, DollarSign, Users, ShoppingBag } from "lucide-react";

     const DashboardStatsGrid = ({ stats, dateRange }) => {
       const statCards = [
         { title: "Total Sales", value: `$${stats?.sales?.toFixed(2) || "0.00"}`, trend: stats?.salesTrend || 0, icon: DollarSign, delay: 0.1 },
         { title: "Orders", value: stats?.orders || "0", trend: stats?.ordersTrend || 0, icon: Package, delay: 0.2 },
         { title: "Products", value: stats?.products || "0", icon: ShoppingBag, delay: 0.3 }, // Trend removed for simplicity for now
         { title: "Customers", value: stats?.customers || "0", icon: Users, delay: 0.4 }, // Trend removed
       ];

       return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {statCards.map(card => (
              <StatsCard key={card.title} {...card} dateRange={dateRange} />
            ))}
          </div>
       );
     }

     export default DashboardStatsGrid;
   