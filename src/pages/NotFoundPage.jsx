
    import React from "react";
    import { motion } from "framer-motion";
    import { Link } from "react-router-dom";
    import { AlertTriangle } from "lucide-react";
    import { Button } from "@/components/ui/button";

    const NotFoundPage = () => {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <div className="flex items-center justify-center">
              <AlertTriangle className="h-24 w-24 text-shopzone mb-6" />
            </div>
            <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <h2 className="text-3xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
            <p className="text-lg text-gray-500 mb-8 max-w-md mx-auto">
              Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link to="/">
              <Button className="bg-shopzone hover:bg-shopzone-dark" size="lg">
                Go Back Home
              </Button>
            </Link>
          </motion.div>
        </div>
      );
    };

    export default NotFoundPage;
  