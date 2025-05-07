
    import React from "react";
    import { useNavigate } from "react-router-dom";
    import { Button } from "@/components/ui/button";
    import { Badge as DefaultBadge } from "@/components/ui/badge"; 
    import { Edit, Trash2, Package, MoreVertical } from "lucide-react";
    import { Card } from "@/components/ui/card"; 
    import {
      DropdownMenu,
      DropdownMenuContent,
      DropdownMenuItem,
      DropdownMenuSeparator,
      DropdownMenuTrigger,
    } from "@/components/ui/dropdown-menu";
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

    const StatusBadge = ({ variant, className, ...props }) => {
       const successClass = variant === 'success' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700/50' : '';
       const warningClass = variant === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700/50' : '';
       const errorClass = variant === 'error' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-700/50' : '';
       const outlineClass = variant === 'outline' ? 'border-dashed text-muted-foreground' : '';
       let finalVariant = 'outline';
       if (variant === 'success' || variant === 'warning' || variant === 'error') finalVariant = 'outline';

       return <DefaultBadge 
                variant={finalVariant}
                className={`${successClass} ${warningClass} ${errorClass} ${outlineClass} ${className}`} 
                {...props} 
              />;
    };


    const SellerProductTable = ({ products, onDeleteProduct }) => {
      const navigate = useNavigate();

      const getStatusVariant = (status) => {
        if (status === 'Active') return 'success';
        if (status === 'Draft') return 'warning';
        if (status === 'Archived') return 'error';
        return 'outline';
      }

      return (
        <Card className="overflow-hidden border shadow-sm"> 
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr className="border-b">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Product</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground hidden md:table-cell">Category</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Price</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground hidden sm:table-cell">Stock</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground hidden md:table-cell">Sales</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border"> 
                {(products && products.length > 0) ? products.map((product) => (
                  <tr key={product.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 flex-shrink-0 rounded border overflow-hidden bg-secondary"> 
                          <img  
                            alt={product.name}
                            class="h-full w-full object-cover"
                            src="https://images.unsplash.com/photo-1649015931204-15a3c789e6ea" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground line-clamp-1">{product.name}</div>
                          <div className="text-xs text-muted-foreground md:hidden">{product.category}</div> {/* Category for mobile */}
                        </div>
                      </div>
                    </td>
                     <td className="px-4 py-3 whitespace-nowrap hidden md:table-cell">
                       <span className="text-xs text-muted-foreground">{product.category}</span>
                     </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-foreground">${product.price.toFixed(2)}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap hidden sm:table-cell">
                      <div className={`font-medium ${product.stock < 10 && product.stock > 0 ? 'text-amber-600' : product.stock === 0 ? 'text-destructive' :'text-foreground'}`}>
                        {product.stock}
                        {product.stock === 0 && <span className="text-xs ml-1">(Out)</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap hidden md:table-cell">
                      <div className="text-foreground">{product.sales || 0}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                       <StatusBadge 
                         variant={getStatusVariant(product.status || 'Active')}
                         className="text-xs px-1.5 py-0.5"
                        >
                         {product.status || 'Active'}
                       </StatusBadge>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Product Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => navigate(`/seller/products/${product.id}`)}>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => navigate(`/product/${product.id}`)} /* Assuming public view exists */>
                            <Package className="mr-2 h-4 w-4" /> View Publicly
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete "{product.name}".
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction 
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  onClick={() => onDeleteProduct(product.id, product.name)}
                                >
                                  Delete Product
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center"> {/* Updated colSpan */}
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                         <Package className="h-10 w-10 opacity-70" />
                         <p className="font-medium">No products match your filters.</p>
                         <p className="text-xs">Try adjusting your search or filter criteria, or add a new product.</p>
                         <Button size="sm" className="text-xs h-8 mt-3 bg-primary hover:bg-primary/90" onClick={() => navigate('/seller/products/new')}>Add New Product</Button> 
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
  