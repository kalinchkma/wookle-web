
    import React from "react";
    import { motion } from "framer-motion";
    import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
    import { ArrowUpRight, ArrowDownRight } from "lucide-react";

    const StatsCard = ({ title, value, trend, icon: Icon, dateRange, delay }) => {
      const isPositive = trend > 0;
      const trendValue = Math.abs(trend);

      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
              {Icon && <Icon className="h-4 w-4 text-gray-500" />}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{value}</div>
              {trend !== undefined && (
                <div className="flex items-center text-sm mt-1">
                  <span className={`flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {isPositive ? (
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 mr-1" />
                    )}
                    {trendValue}%
                  </span>
                  <span className="text-gray-500 ml-1">vs last {dateRange}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      );
    };

    export default StatsCard;
  