
    import React from 'react';
    import { motion } from 'framer-motion';

    const TshirtPreview = ({ color, design }) => {
      // Basic SVG representation of a T-shirt
      const TshirtSvg = ({ fillColor }) => (
        <svg viewBox="0 0 100 100" className="w-full h-auto max-w-md drop-shadow-md">
          <path 
            d="M 20 10 L 80 10 L 95 25 L 85 30 L 85 90 L 15 90 L 15 30 L 5 25 Z" 
            fill={fillColor} 
            stroke="#e2e8f0" 
            strokeWidth="0.5" 
          />
          <path 
            d="M 35 10 Q 50 20 65 10" 
            fill="none" 
            stroke="#e2e8f0" 
            strokeWidth="0.5"
          />
        </svg>
      );

      return (
        <div className="relative w-full max-w-md aspect-square flex justify-center items-center">
           <TshirtSvg fillColor={color} />
           
           {/* Design Overlay Area */}
           <div className="absolute top-[25%] left-[25%] w-[50%] h-[40%] overflow-hidden pointer-events-none">
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
                    key={design.text + design.textColor + design.fontFamily}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute inset-0 flex items-center justify-center p-2 text-center break-words"
                    style={{
                       color: design.textColor,
                       fontFamily: design.fontFamily,
                       fontSize: '1rem', // Adjust based on container size / needs
                       lineHeight: '1.2'
                    }}
                 >
                    {design.text}
                 </motion.div>
              )}
           </div>
        </div>
      );
    };

    export default TshirtPreview;
  