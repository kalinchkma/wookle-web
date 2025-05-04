
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  Package, 
  DollarSign, 
  Users, 
  ShoppingBag, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

const SellerDashboard = ({ products, orders, stats }) => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState("week");
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Seller Dashboard</h1>
          <p className="text-gray-600">
            Manage your products, orders, and track your performance
          </p>
        </div>
        <Button 
          className="mt-4 md:mt-0 bg-shopzone hover:bg-shopzone-dark"
          onClick={() => navigate('/seller/products/new')}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Product
        </Button>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Sales</CardTitle>
              <DollarSign className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">${stats?.sales || "5,240.50"}</div>
              <div className="flex items-center text-sm mt-1">
                <span className={`flex items-center ${stats?.salesTrend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {stats?.salesTrend > 0 ? (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(stats?.salesTrend || 12.5)}%
                </span>
                <span className="text-gray-500 ml-1">vs last {dateRange}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Orders</CardTitle>
              <Package className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats?.orders || "128"}</div>
              <div className="flex items-center text-sm mt-1">
                <span className={`flex items-center ${stats?.ordersTrend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {stats?.ordersTrend > 0 ? (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(stats?.ordersTrend || 8.2)}%
                </span>
                <span className="text-gray-500 ml-1">vs last {dateRange}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Products</CardTitle>
              <ShoppingBag className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats?.products || "36"}</div>
              <div className="flex items-center text-sm mt-1">
                <span className={`flex items-center ${stats?.productsTrend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {stats?.productsTrend > 0 ? (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(stats?.productsTrend || 4.1)}%
                </span>
                <span className="text-gray-500 ml-1">vs last {dateRange}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Customers</CardTitle>
              <Users className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats?.customers || "95"}</div>
              <div className="flex items-center text-sm mt-1">
                <span className={`flex items-center ${stats?.customersTrend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {stats?.customersTrend > 0 ? (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(stats?.customersTrend || 15.3)}%
                </span>
                <span className="text-gray-500 ml-1">vs last {dateRange}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      {/* Date Range Selector */}
      <div className="flex justify-end mb-6">
        <div className="inline-flex rounded-md shadow-sm">
          <Button
            variant={dateRange === "week" ? "default" : "outline"}
            className={dateRange === "week" ? "bg-shopzone hover:bg-shopzone-dark" : ""}
            onClick={() => setDateRange("week")}
          >
            Week
          </Button>
          <Button
            variant={dateRange === "month" ? "default" : "outline"}
            className={`${dateRange === "month" ? "bg-shopzone hover:bg-shopzone-dark" : ""} -ml-px`}
            onClick={() => setDateRange("month")}
          >
            Month
          </Button>
          <Button
            variant={dateRange === "year" ? "default" : "outline"}
            className={`${dateRange === "year" ? "bg-shopzone hover:bg-shopzone-dark" : ""} -ml-px`}
            onClick={() => setDateRange("year")}
          >
            Year
          </Button>
        </div>
      </div>
      
      {/* Sales Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-8"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-shopzone" />
              Sales Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-shopzone mx-auto mb-4" />
                <p className="text-gray-500">Sales chart visualization would appear here</p>
                <p className="text-sm text-gray-400">Showing data for the last {dateRange}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Products and Orders Tabs */}
      <Tabs defaultValue="products">
        <TabsList className="w-full border-b justify-start rounded-none bg-transparent space-x-8 mb-6">
          <TabsTrigger 
            value="products"
            className="data-[state=active]:text-shopzone data-[state=active]:border-b-2 data-[state=active]:border-shopzone rounded-none bg-transparent"
          >
            Products
          </TabsTrigger>
          <TabsTrigger 
            value="orders"
            className="data-[state=active]:text-shopzone data-[state=active]:border-b-2 data-[state=active]:border-shopzone rounded-none bg-transparent"
          >
            Recent Orders
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="products">
          <div className="bg-white rounded-lg border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products?.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img  
                              alt={product.name}
                              className="h-10 w-10 rounded-md object-cover"
                             src="https://images.unsplash.com/photo-1635865165118-917ed9e20936" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-500">{product.category}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.stock}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.sales}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : product.status === 'Draft' 
                              ? 'bg-gray-100 text-gray-800'
                              : 'bg-red-100 text-red-800'
                        }`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button 
                          variant="ghost" 
                          className="text-shopzone hover:text-shopzone-dark"
                          onClick={() => navigate(`/seller/products/${product.id}`)}
                        >
                          Edit
                        </Button>
                      </td>
                    </tr>
                  )) || [...Array(5)].map((_, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <div className="h-10 w-10 rounded-md bg-gray-200"></div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">Product {index + 1}</div>
                            <div className="text-sm text-gray-500">Category {index % 3 + 1}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">${(19.99 + index * 10).toFixed(2)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{20 + index * 5}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{10 + index * 3}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          index % 3 === 0 
                            ? 'bg-green-100 text-green-800' 
                            : index % 3 === 1 
                              ? 'bg-gray-100 text-gray-800'
                              : 'bg-red-100 text-red-800'
                        }`}>
                          {index % 3 === 0 ? 'Active' : index % 3 === 1 ? 'Draft' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button 
                          variant="ghost" 
                          className="text-shopzone hover:text-shopzone-dark"
                        >
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t">
              <Button 
                variant="outline" 
                className="w-full border-shopzone text-shopzone hover:bg-shopzone hover:text-white"
                onClick={() => navigate('/seller/products')}
              >
                View All Products
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="orders">
          <div className="bg-white rounded-lg border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders?.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">#{order.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{order.customer}</div>
                        <div className="text-sm text-gray-500">{order.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{order.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">${order.amount.toFixed(2)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === 'Completed' 
                            ? 'bg-green-100 text-green-800' 
                            : order.status === 'Processing' 
                              ? 'bg-blue-100 text-blue-800'
                              : order.status === 'Shipped'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-red-100 text-red-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button 
                          variant="ghost" 
                          className="text-shopzone hover:text-shopzone-dark"
                          onClick={() => navigate(`/seller/orders/${order.id}`)}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  )) || [...Array(5)].map((_, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">#{10000 + index}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">Customer {index + 1}</div>
                        <div className="text-sm text-gray-500">customer{index + 1}@example.com</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(Date.now() - index * 86400000).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">${(49.99 + index * 20).toFixed(2)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          index % 4 === 0 
                            ? 'bg-green-100 text-green-800' 
                            : index % 4 === 1 
                              ? 'bg-blue-100 text-blue-800'
                              : index % 4 === 2
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-red-100 text-red-800'
                        }`}>
                          {index % 4 === 0 ? 'Completed' : index % 4 === 1 ? 'Processing' : index % 4 === 2 ? 'Shipped' : 'Cancelled'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button 
                          variant="ghost" 
                          className="text-shopzone hover:text-shopzone-dark"
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t">
              <Button 
                variant="outline" 
                className="w-full border-shopzone text-shopzone hover:bg-shopzone hover:text-white"
                onClick={() => navigate('/seller/orders')}
              >
                View All Orders
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SellerDashboard;
