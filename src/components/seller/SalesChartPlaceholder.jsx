
    import React from "react";
    import { motion } from "framer-motion";
    import { BarChart3, TrendingUp } from "lucide-react";
    import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

    const SalesChartPlaceholder = ({ dateRange }) => {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-shopzone" />
                Sales Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 text-shopzone mx-auto mb-4" />
                  <p className="text-gray-500">Sales chart visualization would appear here</p>
                  <p className="text-sm text-gray-400">Showing data for the last {dateRange}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      );
    };

    export default SalesChartPlaceholder;
  