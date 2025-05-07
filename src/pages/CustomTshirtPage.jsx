
    import React, { useState } from 'react';
    import { motion } from 'framer-motion';
    import { Palette, Upload, Type, ShoppingCart } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { useToast } from '@/components/ui/use-toast';
    import { useCart } from '@/contexts/CartContext';
    import TshirtPreview from '@/components/customizer/TshirtPreview';
    import DesignControls from '@/components/customizer/DesignControls';
    import { Card, CardContent } from '@/components/ui/card';

    const CustomTshirtPage = () => {
      const { toast } = useToast();
      const { addToCart } = useCart();
      const [tshirtColor, setTshirtColor] = useState('#ffffff'); // Default white
      const [design, setDesign] = useState({
        imageUrl: null,
        text: '',
        textColor: '#000000',
        fontFamily: 'Arial',
        fontSize: 16, 
        textAlign: 'center', // Added text align state
      });

      const handleDesignChange = (newDesignPart) => {
        setDesign(prev => ({ ...prev, ...newDesignPart }));
      };

      const handleAddToCart = () => {
         if (!design.imageUrl && !design.text) {
            toast({ title: "Design Empty", description: "Please add an image or text to your t-shirt.", variant: "destructive" });
            return;
         }
        
         const customItem = {
           id: `custom_tshirt_${Date.now()}`, 
           name: `Custom T-Shirt (${tshirtColor})`,
           price: 24.99, 
           quantity: 1,
           type: 'custom_tshirt', 
           color: tshirtColor,
           design: design, // Includes fontSize and textAlign now
           image: design.imageUrl || '/placeholder-tshirt-icon.svg',
           cartItemId: `custom_tshirt_${Date.now()}_${Math.random().toString(16).slice(2)}` // More unique ID for cart
         };
         
         addToCart(customItem);
         toast({ title: "Added to Cart", description: "Your custom t-shirt has been added." });
         
         // Optionally reset design after adding
         // setTshirtColor('#ffffff');
         // setDesign({ imageUrl: null, text: '', textColor: '#000000', fontFamily: 'Arial', fontSize: 16, textAlign: 'center' });
      };

      return (
        <div className="container mx-auto px-4 py-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-foreground mb-6 text-center"
          >
            Design Your Own T-Shirt
          </motion.h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Preview Area */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2 flex justify-center items-start lg:sticky lg:top-24" // Sticky preview on larger screens
            >
               <TshirtPreview color={tshirtColor} design={design} />
            </motion.div>

            {/* Controls Area */}
            <motion.div
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.2 }}
               className="space-y-6"
            >
               <Card>
                  <CardContent className="pt-6">
                     <DesignControls 
                        tshirtColor={tshirtColor}
                        setTshirtColor={setTshirtColor}
                        design={design}
                        onDesignChange={handleDesignChange}
                     />
                  </CardContent>
               </Card>
               
               <Card>
                  <CardContent className="pt-6">
                     <div className="space-y-3">
                        <div className="flex justify-between items-center">
                           <span className="text-lg font-semibold text-foreground">Total:</span>
                           <span className="text-xl font-bold text-primary">$24.99</span> 
                        </div>
                        <Button 
                           size="lg" 
                           className="w-full bg-primary hover:bg-primary/90"
                           onClick={handleAddToCart}
                         >
                           <ShoppingCart className="mr-2 h-5 w-5" />
                           Add to Cart
                         </Button>
                     </div>
                  </CardContent>
               </Card>
            </motion.div>
          </div>
        </div>
      );
    };

    export default CustomTshirtPage;
  