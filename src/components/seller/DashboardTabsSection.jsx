
      import React from 'react';
      import { useNavigate } from 'react-router-dom';
      import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
      import { Button } from '@/components/ui/button';
      import SellerProductTable from '@/components/seller/SellerProductTable';
      import SellerOrderTable from '@/components/seller/SellerOrderTable';

      const DashboardTabsSection = ({ products, orders, onDeleteProduct }) => {
           const navigate = useNavigate();

           // Get recent orders (e.g., last 5)
           const recentOrders = orders.slice(0, 5); 
           // Get recent products (e.g., last 5 added/updated - assuming createdAt exists)
           const recentProducts = products
               .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
               .slice(0, 5);

           return (
              <Tabs defaultValue="products">
                <TabsList className="w-full border-b justify-start rounded-none bg-transparent space-x-6 px-0 mb-4">
                  <TabsTrigger value="products" className="text-sm data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent px-1 pb-2">
                    Recent Products
                  </TabsTrigger>
                  <TabsTrigger value="orders" className="text-sm data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent px-1 pb-2">
                    Recent Orders
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="products">
                  <SellerProductTable products={recentProducts} onDeleteProduct={onDeleteProduct} />
                  <div className="mt-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full text-xs h-8 border-input hover:border-primary hover:text-primary"
                      onClick={() => navigate('/seller/products')}
                    >
                      View All Products
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="orders">
                   <SellerOrderTable orders={recentOrders} />
                   <div className="mt-4">
                    <Button 
                      variant="outline" 
                       size="sm"
                      className="w-full text-xs h-8 border-input hover:border-primary hover:text-primary"
                      onClick={() => navigate('/seller/orders')}
                    >
                      View All Orders
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
           );
      }

      export default DashboardTabsSection;
    