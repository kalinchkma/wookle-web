
    import React from 'react';
    import { useNavigate } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Card, CardContent, CardFooter } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { Badge } from '@/components/ui/badge';
    import { Edit, Trash2, MoreVertical, DollarSign, PackageCheck, Layers } from 'lucide-react';
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
    import { cn } from '@/lib/utils';

    const SellerProductCard = ({ product, onDeleteProduct }) => {
      const navigate = useNavigate();

      const getStatusColor = (status) => {
        if (status === 'Active') return 'bg-green-500';
        if (status === 'Draft') return 'bg-yellow-500';
        if (status === 'Archived') return 'bg-red-500';
        return 'bg-gray-500';
      };

      return (
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <Card className="overflow-hidden h-full flex flex-col group">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img 
                alt={product.name}
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
               src="https://images.unsplash.com/photo-1697256200022-f61abccad430" />
              <div className="absolute top-2 right-2">
                <Badge variant="secondary" className={cn("text-xs px-1.5 py-0.5 font-medium", getStatusColor(product.status || 'Active'), 'text-white')}>
                  {product.status || 'Active'}
                </Badge>
              </div>
            </div>

            <CardContent className="p-3 flex-grow space-y-1.5">
              <h3 className="font-semibold text-sm text-foreground line-clamp-2">{product.name}</h3>
              <p className="text-xs text-muted-foreground line-clamp-1">{product.category}</p>
              
              <div className="flex items-center justify-between text-xs pt-1">
                  <div className="flex items-center text-foreground">
                    <DollarSign className="h-3.5 w-3.5 mr-0.5 text-primary" /> 
                    <span className="font-medium">{product.price.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                     <PackageCheck className="h-3.5 w-3.5 mr-0.5" /> 
                     Stock: <span className={cn("font-medium ml-0.5", product.stock === 0 ? "text-destructive" : product.stock < 10 ? "text-amber-600" : "text-foreground")}>{product.stock}</span>
                  </div>
              </div>
               <p className="text-xs text-muted-foreground">SKU: {product.sku || 'N/A'}</p>
            </CardContent>

            <CardFooter className="p-2 border-t">
              <div className="flex w-full justify-between items-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs px-2 flex-grow mr-1"
                  onClick={() => navigate(`/seller/products/${product.id}`)}
                >
                  <Edit className="h-3 w-3 mr-1" /> Edit
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7 flex-shrink-0">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">More actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => navigate(`/product/${product.id}`)}>
                      <Layers className="mr-2 h-3.5 w-3.5" /> View Publicly
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                          <Trash2 className="mr-2 h-3.5 w-3.5" /> Delete Product
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{product.name}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-destructive hover:bg-destructive/90"
                            onClick={() => onDeleteProduct(product.id, product.name)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      );
    };

    export default SellerProductCard;
  