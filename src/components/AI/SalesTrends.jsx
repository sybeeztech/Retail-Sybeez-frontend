import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  LineChart,
  DollarSign,
  Calendar,
  Target,
  ArrowUp,
  ArrowDown,
  IndianRupee,
  ShoppingCart,
  Users,
  Package
} from 'lucide-react';

const SalesTrends = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data for Indian retail
  const salesData = {
    '7d': {
      totalSales: 287500,
      growth: 15.3,
      transactions: 1247,
      avgOrderValue: 2340,
      trends: [
        { date: '2024-10-03', sales: 38500, orders: 167 },
        { date: '2024-10-04', sales: 42300, orders: 189 },
        { date: '2024-10-05', sales: 45100, orders: 203 },
        { date: '2024-10-06', sales: 39800, orders: 178 },
        { date: '2024-10-07', sales: 48200, orders: 215 },
        { date: '2024-10-08', sales: 44100, orders: 197 },
        { date: '2024-10-09', sales: 47500, orders: 209 }
      ]
    },
    '30d': {
      totalSales: 1250000,
      growth: 22.7,
      transactions: 5340,
      avgOrderValue: 2456,
      trends: []
    },
    '90d': {
      totalSales: 3750000,
      growth: 18.9,
      transactions: 15420,
      avgOrderValue: 2398,
      trends: []
    }
  };

  const categoryData = [
    { name: 'Groceries', sales: 125000, growth: 18.2, color: 'bg-green-500' },
    { name: 'Electronics', sales: 89000, growth: -5.1, color: 'bg-blue-500' },
    { name: 'Clothing', sales: 67500, growth: 12.4, color: 'bg-purple-500' },
    { name: 'Home & Kitchen', sales: 45000, growth: 25.8, color: 'bg-orange-500' },
    { name: 'Personal Care', sales: 32000, growth: 8.9, color: 'bg-pink-500' }
  ];

  const currentData = salesData[timeRange];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <LineChart className="mr-3 h-6 w-6 text-indigo-600" />
            Sales Trends Analysis
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            AI-powered sales analytics and trend predictions for Indian retail
          </p>
        </div>
        
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Categories</option>
            <option value="groceries">Groceries</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sales</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(currentData.totalSales)}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <IndianRupee className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {currentData.growth > 0 ? (
              <ArrowUp className="h-4 w-4 text-green-600 mr-1" />
            ) : (
              <ArrowDown className="h-4 w-4 text-red-600 mr-1" />
            )}
            <span className={`text-sm font-medium ${currentData.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {Math.abs(currentData.growth)}%
            </span>
            <span className="text-sm text-gray-500 ml-1">vs previous period</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Transactions</p>
              <p className="text-2xl font-bold text-gray-900">
                {currentData.transactions.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <ShoppingCart className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <ArrowUp className="h-4 w-4 text-green-600 mr-1" />
            <span className="text-sm font-medium text-green-600">12.5%</span>
            <span className="text-sm text-gray-500 ml-1">vs previous period</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(currentData.avgOrderValue)}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Target className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <ArrowUp className="h-4 w-4 text-green-600 mr-1" />
            <span className="text-sm font-medium text-green-600">8.3%</span>
            <span className="text-sm text-gray-500 ml-1">vs previous period</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900">3.8%</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <BarChart3 className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <ArrowUp className="h-4 w-4 text-green-600 mr-1" />
            <span className="text-sm font-medium text-green-600">2.1%</span>
            <span className="text-sm text-gray-500 ml-1">vs previous period</span>
          </div>
        </div>
      </div>

      {/* Sales Trend Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Daily Sales Trend</h2>
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Sales</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Orders</span>
            </div>
          </div>
        </div>
        
        {timeRange === '7d' && (
          <div className="space-y-4">
            {currentData.trends.map((day, index) => (
              <div key={day.date} className="flex items-center space-x-4">
                <div className="w-20 text-sm text-gray-600">
                  {new Date(day.date).toLocaleDateString('en-IN', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </div>
                <div className="flex-1 flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">
                        {formatCurrency(day.sales)}
                      </span>
                      <span className="text-sm text-gray-600">
                        {day.orders} orders
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-indigo-500 h-2 rounded-full" 
                        style={{ 
                          width: `${(day.sales / Math.max(...currentData.trends.map(d => d.sales))) * 100}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {timeRange !== '7d' && (
          <div className="flex items-center justify-center h-32 text-gray-500">
            <BarChart3 className="h-8 w-8 mr-2" />
            <span>Detailed chart view available for 7-day period</span>
          </div>
        )}
      </div>

      {/* Category Performance */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Category Performance</h2>
        <div className="space-y-4">
          {categoryData.map((category, index) => (
            <div key={category.name} className="flex items-center space-x-4">
              <div className={`w-4 h-4 ${category.color} rounded`}></div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">{category.name}</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-gray-900">
                      {formatCurrency(category.sales)}
                    </span>
                    <div className="flex items-center">
                      {category.growth > 0 ? (
                        <ArrowUp className="h-3 w-3 text-green-600 mr-1" />
                      ) : (
                        <ArrowDown className="h-3 w-3 text-red-600 mr-1" />
                      )}
                      <span className={`text-xs font-medium ${
                        category.growth > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {Math.abs(category.growth)}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`${category.color} h-2 rounded-full`}
                    style={{ 
                      width: `${(category.sales / Math.max(...categoryData.map(c => c.sales))) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <TrendingUp className="h-5 w-5 text-indigo-600 mr-2" />
          AI Sales Insights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Predicted Next Week</h3>
            <p className="text-2xl font-bold text-indigo-600 mb-1">₹3,15,000</p>
            <p className="text-sm text-gray-600">Based on current trends and festival season approach</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Best Performance Day</h3>
            <p className="text-2xl font-bold text-green-600 mb-1">Saturday</p>
            <p className="text-sm text-gray-600">23% higher sales compared to weekday average</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Peak Hours</h3>
            <p className="text-2xl font-bold text-orange-600 mb-1">6-9 PM</p>
            <p className="text-sm text-gray-600">45% of daily transactions occur during evening</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Growth Opportunity</h3>
            <p className="text-2xl font-bold text-purple-600 mb-1">Home & Kitchen</p>
            <p className="text-sm text-gray-600">25.8% growth rate, highest potential category</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesTrends;