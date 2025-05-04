
      import React from 'react';
      import SalesChartPlaceholder from '@/components/seller/SalesChartPlaceholder';
      import { Button } from '@/components/ui/button';

      const DashboardChartSection = ({ dateRange, setDateRange }) => {
          return (
              <div className="mb-6">
                 <div className="flex justify-end mb-4">
                    <div className="inline-flex rounded-md border border-input bg-background p-0.5">
                       {["week", "month", "year"].map((range) => (
                         <Button
                           key={range}
                           variant={dateRange === range ? "secondary" : "ghost"}
                           size="sm"
                           className={`h-7 px-2.5 text-xs rounded-sm ${dateRange === range ? 'shadow-sm' : ''}`}
                           onClick={() => setDateRange(range)}
                         >
                           {range.charAt(0).toUpperCase() + range.slice(1)}
                         </Button>
                       ))}
                    </div>
                 </div>
                 <SalesChartPlaceholder dateRange={dateRange} />
              </div>
          );
      }

      export default DashboardChartSection;
    