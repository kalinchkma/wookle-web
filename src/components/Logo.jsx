
import React from "react";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <motion.div
        initial={{ rotate: -10 }}
        animate={{ rotate: 0 }}
        whileHover={{ rotate: -10, scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="bg-shopzone p-1.5 rounded-md"
      >
        <ShoppingBag className="h-6 w-6 text-white" />
      </motion.div>
      <motion.span 
        initial={{ opacity: 0, x: -5 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="text-xl font-bold text-shopzone"
      >
        ShopZone
      </motion.span>
    </Link>
  );
};

export default Logo;
