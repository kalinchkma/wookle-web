
    import React from 'react';
    import { useNavigate } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { Plus, Settings } from 'lucide-react';

    const DashboardHeader = ({ shopName }) => {
        const navigate = useNavigate();

        return (
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-foreground mb-1">Seller Dashboard</h1>
                    <p className="text-sm text-muted-foreground">
                        Welcome back to your shop, <span className="font-medium text-foreground">{shopName || 'Seller'}</span>!
                    </p>
                </div>
                <div className="flex gap-2">
                     <Button 
                        variant="outline"
                        className="compact-button"
                        onClick={() => navigate('/seller/shop-settings')}
                      >
                        <Settings className="mr-2 h-4 w-4" /> Shop Settings
                      </Button>
                    <Button 
                        className="bg-primary hover:bg-primary/90 compact-button"
                        onClick={() => navigate('/seller/products/new')}
                    >
                        <Plus className="mr-2 h-4 w-4" /> Add Product
                    </Button>
                </div>
            </div>
        );
    }

    export default DashboardHeader;
  