import React from 'react';
import { Brain, Zap, Target, TrendingUp, AlertTriangle } from 'lucide-react';

const AIInsightsPanel = ({ data }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        <Brain className="mr-2 h-5 w-5 text-purple-600" />
        AI Insights & Predictions
      </h2>
      
      <div className="space-y-6">
        {/* Sales Prediction */}
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-medium mb-2 flex items-center text-blue-800">
            <TrendingUp className="mr-2 h-4 w-4" />
            Sales Forecast
          </h3>
          <p className="text-sm text-blue-700">
            Predicted revenue for next month: ₹{(data?.aiInsights?.salesPrediction?.nextMonth / 100000).toFixed(1)}L
          </p>
          <p className="text-xs text-blue-600 mt-1">
            Confidence: {data?.aiInsights?.salesPrediction?.confidence}%
          </p>
        </div>

        {/* Performance Insights */}
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <h3 className="font-medium mb-2 flex items-center text-green-800">
            <Target className="mr-2 h-4 w-4" />
            Performance Highlights
          </h3>
          <p className="text-sm text-green-700">
            Sales team exceeded monthly targets by 14%
          </p>
          <p className="text-xs text-green-600 mt-1">
            Top performer: Rajesh Kumar
          </p>
        </div>

        {/* Risk Alerts */}
        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <h3 className="font-medium mb-2 flex items-center text-yellow-800">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Risk Assessment
          </h3>
          <p className="text-sm text-yellow-700">
            Customer churn risk: {data?.customers?.churnRate}%
          </p>
          <p className="text-xs text-yellow-600 mt-1">
            Recommended: Implement retention program
          </p>
        </div>

        {/* AI Optimization */}
        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
          <h3 className="font-medium mb-2 flex items-center text-purple-800">
            <Zap className="mr-2 h-4 w-4" />
            AI Optimization
          </h3>
          <p className="text-sm text-purple-700">
            Inventory optimization can save ₹2.5L
          </p>
          <p className="text-xs text-purple-600 mt-1">
            Suggested: Automated reorder points
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIInsightsPanel;