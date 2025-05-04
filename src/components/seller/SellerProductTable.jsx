
    import React from "react";
    import { useNavigate } from "react-router-dom";
    import { Button } from "@/components/ui/button";
    import { Badge as DefaultBadge } from "@/components/ui/badge"; // Keep the original import
    import { Edit, Trash2, Package } from "lucide-react";
    import { Card } from "@/components/ui/card"; // Added Card import
    import {
      AlertDialog,
      AlertDialogAction,
      AlertDialogCancel,
      AlertDialogContent,
      AlertDialogDescription,
      AlertDialogFooter,
      AlertDialogHeader,
      AlertDialogTitle,
      AlertDialogTrigger,
    } from "@/components/ui/alert-dialog";

    // Renamed custom badge component
    const StatusBadge = ({ variant, className, ...props }) => {
       const successClass = variant === 'success' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-700/50' : '';
       const outlineClass = variant === 'outline' ? 'border-dashed text-muted-foreground' : '';
       return <DefaultBadge 
                variant={variant === 'success' ? 'outline' : 'outline'} // Use outline base for border
                className={`${successClass} ${outlineClass} ${className}`} 
                {...props} 
              />;
    };


    const SellerProductTable = ({ products, onDeleteProduct }) => {
      const navigate = useNavigate();

      return (
        <Card className="overflow-hidden border shadow-subtle"> {/* Applied card styles */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary border-b">
                  <th className="px-4 py-2 text-left font-medium text-muted-foreground">Product</th>
                  <th className="px-4 py-2 text-left font-medium text-muted-foreground">Price</th>
                  <th className="px-4 py-2 text-left font-medium text-muted-foreground">Stock</th>
                  <th className="px-4 py-2 text-left font-medium text-muted-foreground">Sales</th>
                  <th className="px-4 py-2 text-left font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-2 text-right font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border"> {/* Use divide-border */}
                {(products && products.length > 0) ? products.map((product) => (
                  <tr key={product.id} className="hover:bg-secondary/50">
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 flex-shrink-0 rounded border overflow-hidden bg-secondary"> {/* Added bg */}
                          <img 
                            alt={product.name}
                            className="h-full w-full object-cover"
                           src={product.images?.[0] || "https://images.unsplash.com/photo-1695561115539-e32081cef7a6"} /> {/* Use first image or placeholder */}
                        </div>
                        <div>
                          <div className="font-medium text-foreground line-clamp-1">{product.name}</div>
                          <div className="text-xs text-muted-foreground">{product.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="text-foreground">${product.price.toFixed(2)}</div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className={`text-foreground ${product.stock < 10 ? 'text-destructive font-medium' : ''}`}>{product.stock}</div> {/* Made low stock more prominent */}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="text-foreground">{product.sales || 0}</div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                       {/* Use the renamed StatusBadge component */}
                       <StatusBadge 
                         variant={product.status === 'Active' ? 'success' : 'outline'}
                         className="text-xs"
                        >
                         {product.status || 'Active'}
                       </StatusBadge>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-right">
                      <div className="flex justify-end gap-1">
                         <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-secondary" /* Consistent hover */
                          onClick={() => navigate(`/seller/products/${product.id}`)}
                          aria-label="Edit Product"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        
                         <AlertDialog>
                          <AlertDialogTrigger asChild>
                             <Button 
                              variant="ghost" 
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10" /* Destructive hover */
                              aria-label="Delete Product"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the product "{product.name}".
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                onClick={() => onDeleteProduct(product.id, product.name)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-10 text-center">
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                         <Package className="h-8 w-8" />
                         <p>No products found.</p>
                         <Button size="sm" className="text-xs h-8 mt-2 bg-primary hover:bg-primary/90" onClick={() => navigate('/seller/products/new')}>Add Your First Product</Button> {/* Styled button */}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      );
    };

    export default SellerProductTable;
  