
    import React, { useState } from "react";
    import { motion, AnimatePresence } from "framer-motion";
    import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
    import { Button } from "@/components/ui/button";
    import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

    const ProductImageGallery = ({ images, productName }) => {
      const [currentIndex, setCurrentIndex] = useState(0);
      const [direction, setDirection] = useState(0);
      const [isZooming, setIsZooming] = useState(false);
      const [zoomCoords, setZoomCoords] = useState({ x: 0, y: 0 });

       // Use placeholder images if none provided or if images array is invalid
      const displayImages = Array.isArray(images) && images.length > 0 ? images : [
        "https://images.unsplash.com/photo-1603724983917-9ddef25e06b1",
        "https://images.unsplash.com/photo-1595872018818-97555653a011",
        "https://images.unsplash.com/photo-1674027392838-d85710a5121d",
        "https://images.unsplash.com/photo-1582386182759-50622d9cca9c",
      ];

      const handleMouseMove = (e) => {
        if (!isZooming) return;
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setZoomCoords({ x, y });
      };

      const imageVariants = {
        enter: (direction) => ({
          x: direction > 0 ? 300 : -300,
          opacity: 0,
        }),
        center: {
          x: 0,
          opacity: 1,
          transition: { duration: 0.3 }
        },
        exit: (direction) => ({
          x: direction < 0 ? 300 : -300,
          opacity: 0,
          transition: { duration: 0.3 }
        }),
      };

      const paginate = (newDirection) => {
        setDirection(newDirection);
        setCurrentIndex((prevIndex) => {
          let nextIndex = prevIndex + newDirection;
          // Use displayImages.length for safe boundary checks
          if (nextIndex < 0) {
            return displayImages.length - 1;
          } else if (nextIndex >= displayImages.length) {
            return 0;
          }
          return nextIndex;
        });
      };


      return (
        <div className="space-y-3">
          <div 
            className="relative aspect-square bg-secondary rounded-md overflow-hidden group cursor-zoom-in"
            onMouseEnter={() => setIsZooming(true)}
            onMouseLeave={() => setIsZooming(false)}
            onMouseMove={handleMouseMove}
          >
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={currentIndex}
                src={displayImages[currentIndex]}
                alt={`${productName || 'Product'} image ${currentIndex + 1}`}
                className="absolute inset-0 w-full h-full object-contain"
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                custom={direction}
                style={{
                  transformOrigin: isZooming ? `${zoomCoords.x}% ${zoomCoords.y}%` : 'center center',
                  transform: isZooming ? 'scale(1.8)' : 'scale(1)',
                  transition: 'transform 0.1s linear',
                }}
              />
            </AnimatePresence>

            {displayImages.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-background/70 hover:bg-background text-foreground/70 hover:text-shopzone backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => { e.stopPropagation(); paginate(-1); }}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-background/70 hover:bg-background text-foreground/70 hover:text-shopzone backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => { e.stopPropagation(); paginate(1); }}
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </>
            )}
            
             <Dialog>
                <DialogTrigger asChild>
                   <Button
                      variant="ghost"
                      size="icon"
                      className="absolute bottom-2 right-2 h-8 w-8 rounded-full bg-background/70 hover:bg-background text-foreground/70 hover:text-shopzone backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                       aria-label="Zoom image"
                    >
                      <ZoomIn className="h-5 w-5" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl p-2">
                   <img
                    src={displayImages[currentIndex]}
                    alt={`${productName || 'Product'} image ${currentIndex + 1} zoomed`}
                    className="w-full h-auto rounded-md object-contain max-h-[80vh]"
                   />
                </DialogContent>
              </Dialog>

          </div>

          {displayImages.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {displayImages.map((img, index) => (
                <button
                  key={index}
                  className={`aspect-square rounded overflow-hidden border-2 transition-colors ${
                    currentIndex === index ? 'border-primary' : 'border-transparent hover:border-primary/50'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Select image ${index + 1}`}
                >
                  <img
                    src={img}
                    alt={`${productName || 'Product'} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      );
    };

    export default ProductImageGallery;
  