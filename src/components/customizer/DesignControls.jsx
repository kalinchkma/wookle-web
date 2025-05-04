
    import React, { useState, useRef } from 'react';
    import { motion } from 'framer-motion'; // Added this import
    import { Palette, Upload, Type, Trash2 } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

    const colors = ['#ffffff', '#000000', '#ef4444', '#3b82f6', '#22c55e', '#f59e0b', '#6366f1'];
    const fonts = ['Arial', 'Verdana', 'Georgia', 'Times New Roman', 'Courier New'];

    const DesignControls = ({ tshirtColor, setTshirtColor, design, onDesignChange }) => {
      const [showTextOptions, setShowTextOptions] = useState(!!design.text); // Initialize based on existing text
      const fileInputRef = useRef(null);

      const handleColorClick = (color) => {
        setTshirtColor(color);
      };

      const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onloadend = () => {
            onDesignChange({ imageUrl: reader.result });
          };
          reader.readAsDataURL(file);
        }
         // Reset file input to allow uploading the same file again
         if (fileInputRef.current) {
             fileInputRef.current.value = "";
         }
      };
      
      const removeImage = () => {
         onDesignChange({ imageUrl: null });
      }
      
       const removeText = () => {
         onDesignChange({ text: '', textColor: '#000000', fontFamily: 'Arial' });
         setShowTextOptions(false);
      }

      return (
        <div className="space-y-5">
          {/* Color Selection */}
          <div>
            <Label className="flex items-center gap-2 text-sm font-medium mb-2">
               <Palette className="h-4 w-4"/> T-Shirt Color
            </Label>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorClick(color)}
                  className={`w-7 h-7 rounded-full border-2 ${tshirtColor === color ? 'border-primary ring-2 ring-primary ring-offset-2' : 'border-gray-300 dark:border-gray-600'}`}
                  style={{ backgroundColor: color }}
                  aria-label={`Select color ${color}`}
                />
              ))}
               {/* Color Picker Input */}
               <input 
                 type="color" 
                 value={tshirtColor} 
                 onChange={(e) => handleColorClick(e.target.value)}
                 className="w-7 h-7 rounded-full border border-gray-300 dark:border-gray-600 cursor-pointer p-0 overflow-hidden appearance-none bg-transparent"
                 aria-label="Choose custom color"
               />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <Label className="flex items-center gap-2 text-sm font-medium mb-2">
               <Upload className="h-4 w-4"/> Upload Design
            </Label>
            <div className="flex items-center gap-2">
               <Button variant="outline" size="sm" className="text-xs h-8 flex-grow border-input" onClick={() => fileInputRef.current?.click()}>
                  Choose Image...
               </Button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  accept="image/*" 
                  className="hidden" 
                />
               {design.imageUrl && (
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={removeImage} aria-label="Remove image">
                     <Trash2 className="h-4 w-4"/>
                  </Button>
               )}
            </div>
             {design.imageUrl && (
                 <div className="mt-2 p-2 border border-border rounded-md bg-secondary flex items-center gap-2">
                     <img src={design.imageUrl} alt="Preview" className="h-10 w-10 object-contain rounded"/>
                     <span className="text-xs text-muted-foreground truncate">Image uploaded</span>
                 </div>
              )}
          </div>

          {/* Text Tool */}
          <div>
             <div className="flex justify-between items-center mb-2">
               <Label className="flex items-center gap-2 text-sm font-medium">
                 <Type className="h-4 w-4"/> Add Text
               </Label>
               {!showTextOptions && design.text && (
                 <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive hover:bg-destructive/10" onClick={removeText} aria-label="Remove text">
                     <Trash2 className="h-3 w-3"/>
                 </Button>
               )}
             </div>

            <Input
              type="text"
              placeholder="Enter text here..."
              value={design.text}
              onChange={(e) => { onDesignChange({ text: e.target.value }); setShowTextOptions(e.target.value.length > 0); }}
              className="compact-input mb-2"
            />
            {showTextOptions && (
               <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }} 
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2 overflow-hidden bg-secondary p-3 rounded-md border border-border"
               >
                  <div className="flex items-center gap-2">
                     <Label htmlFor="textColorPicker" className="text-xs">Color:</Label>
                     <input 
                        id="textColorPicker"
                        type="color" 
                        value={design.textColor} 
                        onChange={(e) => onDesignChange({ textColor: e.target.value })}
                        className="w-6 h-6 rounded border border-gray-300 dark:border-gray-600 cursor-pointer p-0 overflow-hidden appearance-none bg-transparent"
                        aria-label="Choose text color"
                     />
                  </div>
                   <div className="flex items-center gap-2">
                      <Label htmlFor="fontSelector" className="text-xs">Font:</Label>
                      <Select value={design.fontFamily} onValueChange={(value) => onDesignChange({ fontFamily: value })}>
                         <SelectTrigger id="fontSelector" className="h-7 text-xs flex-grow compact-input border-input">
                           <SelectValue placeholder="Select font" />
                         </SelectTrigger>
                         <SelectContent>
                           {fonts.map(font => (
                             <SelectItem key={font} value={font} style={{ fontFamily: font }} className="text-xs">{font}</SelectItem>
                           ))}
                         </SelectContent>
                       </Select>
                   </div>
                    <Button variant="ghost" size="sm" className="w-full text-xs h-7 text-destructive hover:bg-destructive/10" onClick={removeText}>
                       Remove Text
                    </Button>
               </motion.div>
            )}
          </div>
          
        </div>
      );
    };

    export default DesignControls;
  