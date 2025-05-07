
    import React from 'react';
    import { Link } from 'react-router-dom';
    import { Card, CardContent } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { ArrowRight, ShoppingBag } from 'lucide-react';

    const ShopTheLook = ({ products, sellerName }) => {
      if (!products || products.length === 0) {
        return null;
      }

      return (
        <div className="mt-8 lg:mt-12">
          <h2 className="text-xl font-semibold text-foreground mb-4">More from {sellerName}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
            {products.map(product => (
              <Link to={`/product/${product.id}`} key={product.id} className="group">
                <Card className="overflow-hidden transition-all duration-200 ease-in-out hover:shadow-lg h-full flex flex-col">
                  <div className="aspect-square overflow-hidden bg-muted">
                    <img 
                      class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      alt={product.name}
                     src="https://images.unsplash.com/photo-1646193186132-7976c1670e81" />
                  </div>
                  <CardContent className="p-2.5 text-center flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-xs sm:text-sm font-medium text-foreground line-clamp-2 mb-0.5">{product.name}</h3>
                      <p className="text-sm font-semibold text-primary">${product.price.toFixed(2)}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          {products[0]?.sellerId && (
             <div className="mt-4 text-center">
                <Link to={`/shop/${products[0].sellerId}`}>
                   <Button variant="outline" size="sm" className="text-xs h-8 border-input hover:border-primary hover:text-primary">
                      Visit {sellerName}'s Shop <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                   </Button>
                </Link>
             </div>
          )}
        </div>
      );
    };

    export default ShopTheLook;
  