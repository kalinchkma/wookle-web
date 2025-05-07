
    import React from 'react';
    import { motion } from 'framer-motion';
    import { cn } from '@/lib/utils'; // Import cn utility

    const TshirtPreview = ({ color, design }) => {
      const TshirtSvg = ({ fillColor }) => (
        <svg viewBox="0 0 100 100" className="w-full h-auto max-w-md drop-shadow-md">
          <path 
            d="M 20 10 L 80 10 L 95 25 L 85 30 L 85 90 L 15 90 L 15 30 L 5 25 Z" 
            fill={fillColor} 
            stroke="hsl(var(--border))" 
            strokeWidth="0.5" 
          />
          <path 
            d="M 35 10 Q 50 20 65 10" 
            fill="none" 
            stroke="hsl(var(--border))" 
            strokeWidth="0.5"
          />
        </svg>
      );
      
      const calculateFontSize = (baseSize = 1, fontSizeSetting = 16) => {
         const minPx = 10;
         const maxPx = 30;
         const minRem = 0.7;
         const maxRem = 1.8;
         const clampedSize = Math.max(minPx, Math.min(maxPx, fontSizeSetting));
         const scale = (clampedSize - minPx) / (maxPx - minPx);
         return (minRem + scale * (maxRem - minRem)).toFixed(2) + 'rem';
      }
      
      // Map alignment setting to Tailwind classes
      const getAlignmentClass = (alignment) => {
         switch(alignment) {
           case 'left': return 'items-center justify-start text-left';
           case 'right': return 'items-center justify-end text-right';
           case 'center':
           default: return 'items-center justify-center text-center';
         }
      };

      return (
        <div className="relative w-full max-w-md aspect-square flex justify-center items-center bg-secondary/30 rounded-lg p-4">
           <TshirtSvg fillColor={color} />
           
           <div className="absolute top-[28%] left-[28%] w-[44%] h-[38%] overflow-hidden pointer-events-none">
              {design.imageUrl && (
                 <motion.img 
                    key={design.imageUrl} 
                    src={design.imageUrl} 
                    alt="User design" 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full h-full object-contain" 
                 />
              )}
              {design.text && (
                 <motion.div
                    key={design.text + design.textColor + design.fontFamily + design.fontSize + design.textAlign} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                        "absolute inset-0 flex p-1 break-words whitespace-pre-wrap",
                        getAlignmentClass(design.textAlign) // Apply alignment class
                    )}
                    style={{
                       color: design.textColor,
                       fontFamily: design.fontFamily,
                       fontSize: calculateFontSize(1, design.fontSize), 
                       lineHeight: '1.1'
                    }}
                 >
                    <span>{design.text}</span> 
                 </motion.div>
              )}
           </div>
        </div>
      );
    };

    export default TshirtPreview;
  