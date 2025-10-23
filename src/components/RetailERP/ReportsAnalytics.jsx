import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, DollarSign, ShoppingCart, Users, Package, AlertTriangle, Calendar } from 'lucide-react';
import useSettingsStore from '../../store/settingsStore';

const Reports = () => {
  const { theme } = useSettingsStore();
  const [salesData, setSalesData] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [timeRange, setTimeRange] = useState('week');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    try {
      const sales = JSON.parse(localStorage.getItem('sales') || '[]');
      const productsData = JSON.parse(localStorage.getItem('products') || '[]');
      const customersData = JSON.parse(localStorage.getItem('customers') || '[]');
      
      setSalesData(sales);
      setProducts(productsData);
      setCustomers(customersData);
      setLoading(false);
    } catch (error) {
      console.error('Error loading report data:', error);
      setLoading(false);
    }
  };

  // Calculate metrics based on your data structure
  const totalRevenue = salesData.reduce((sum, sale) => sum + (sale.total || 0), 0);
  const totalSales = salesData.length;
  const averageOrderValue = totalSales > 0 ? totalRevenue / totalSales : 0;
  const totalCustomers = customers.length;
  const totalProducts = products.length;

  // Calculate inventory value and low stock items based on your product structure
  const totalInventoryValue = products.reduce((sum, product) => 
    sum + ((product.stock?.total || 0) * (product.costPrice || 0)), 0
  );

  const lowStockProducts = products.filter(product => 
    (product.stock?.available || 0) <= (product.stock?.reorderLevel || 0) && 
    (product.stock?.available || 0) > 0
  );

  const outOfStockProducts = products.filter(product => 
    (product.stock?.available || 0) === 0
  );

  // Top selling products - updated to match your product structure
  const topProducts = products
    .map(product => {
      const productSales = salesData.flatMap(sale => 
        (sale.items || []).filter(item => item.id === product.id || item.productId === product.id)
      );
      const quantitySold = productSales.reduce((sum, item) => sum + (item.quantity || 0), 0);
      const revenue = productSales.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 0)), 0);
      
      return {
        id: product.id,
        name: product.name,
        sku: product.sku,
        category: product.category,
        quantitySold,
        revenue,
        stock: product.stock?.available || 0,
        reorderLevel: product.stock?.reorderLevel || 0
      };
    })
    .filter(product => product.quantitySold > 0)
    .sort((a, b) => b.quantitySold - a.quantitySold)
    .slice(0, 5);

  // Top products by revenue
  const topProductsByRevenue = [...products]
    .map(product => {
      const productSales = salesData.flatMap(sale => 
        (sale.items || []).filter(item => item.id === product.id || item.productId === product.id)
      );
      const revenue = productSales.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 0)), 0);
      
      return {
        ...product,
        revenue
      };
    })
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  // Sales by time period
  const getSalesByPeriod = () => {
    const now = new Date();
    let periodData = [];

    if (timeRange === 'week') {
      for (let i = 6; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        const daySales = salesData.filter(sale => {
          const saleDate = sale.date ? sale.date.split('T')[0] : '';
          return saleDate === dateStr;
        });
        periodData.push({
          label: date.toLocaleDateString('en-US', { weekday: 'short' }),
          date: dateStr,
          sales: daySales.reduce((sum, sale) => sum + (sale.total || 0), 0),
          count: daySales.length
        });
      }
    } else if (timeRange === 'month') {
      for (let i = 29; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        const daySales = salesData.filter(sale => {
          const saleDate = sale.date ? sale.date.split('T')[0] : '';
          return saleDate === dateStr;
        });
        periodData.push({
          label: date.getDate().toString(),
          date: dateStr,
          sales: daySales.reduce((sum, sale) => sum + (sale.total || 0), 0),
          count: daySales.length
        });
      }
    }

    return periodData;
  };

  const salesByPeriod = getSalesByPeriod();

  // Customer analytics
  const activeCustomers = customers.filter(customer => {
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    return new Date(customer.updatedAt || customer.createdAt) > monthAgo;
  });

  const topLoyaltyCustomers = [...customers]
    .sort((a, b) => (b.loyaltyPoints || 0) - (a.loyaltyPoints || 0))
    .slice(0, 5);

  // Category-wise sales
  const categorySales = products.reduce((acc, product) => {
    const category = product.category || 'Uncategorized';
    const productSales = salesData.flatMap(sale => 
      (sale.items || []).filter(item => item.id === product.id || item.productId === product.id)
    );
    const revenue = productSales.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 0)), 0);
    
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += revenue;
    return acc;
  }, {});

  const topCategories = Object.entries(categorySales)
    .map(([category, revenue]) => ({ category, revenue }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  if (loading) {
    return (
      <div className={`flex justify-center items-center h-64 ${
        theme === 'dark' ? 'bg-gray-900 text-gray-400' : 'bg-gray-50 text-gray-500'
      }`}>
        Loading...
      </div>
    );
  }

  return (
    <div className={`p-6 min-h-screen ${
      theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'
    }`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-2xl font-bold ${
          theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
        }`}>
          Reports & Analytics
        </h1>
        <div className="flex space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === 'dark' 
                ? 'bg-gray-800 border-gray-700 text-gray-100' 
                : 'bg-white border-gray-300 text-gray-800'
            }`}
          >
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
          </select>
          <button
            onClick={loadData}
            className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Refresh Data
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className={`p-6 rounded-lg shadow border ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Total Revenue
              </p>
              <p className="text-2xl font-bold text-green-600">₹{totalRevenue.toLocaleString()}</p>
              <p className={`text-xs mt-1 ${
                theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
              }`}>
                {totalSales} transactions
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className={`p-6 rounded-lg shadow border ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Inventory Value
              </p>
              <p className="text-2xl font-bold text-blue-600">₹{totalInventoryValue.toLocaleString()}</p>
              <p className={`text-xs mt-1 ${
                theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
              }`}>
                {totalProducts} products
              </p>
            </div>
            <Package className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className={`p-6 rounded-lg shadow border ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Average Order
              </p>
              <p className="text-2xl font-bold text-purple-600">₹{averageOrderValue.toFixed(2)}</p>
              <p className={`text-xs mt-1 ${
                theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
              }`}>
                Per transaction
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-500" />
          </div>
        </div>

        <div className={`p-6 rounded-lg shadow border ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Active Customers
              </p>
              <p className="text-2xl font-bold text-orange-600">{activeCustomers.length}</p>
              <p className={`text-xs mt-1 ${
                theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
              }`}>
                Last 30 days
              </p>
            </div>
            <Users className="h-8 w-8 text-orange-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Sales Chart */}
        <div className={`rounded-lg shadow p-6 ${
          theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 flex items-center ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
          }`}>
            <BarChart3 className="h-5 w-5 mr-2" />
            Sales Trend - {timeRange === 'week' ? 'Last 7 Days' : 'Last 30 Days'}
          </h3>
          <div className="space-y-3">
            {salesByPeriod.map((period, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className={`text-sm w-12 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {period.label}
                </span>
                <div className="flex-1 mx-4">
                  <div className={`rounded-full h-2 ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                  }`}>
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{
                        width: `${Math.max(2, (period.sales / Math.max(1, ...salesByPeriod.map(p => p.sales))) * 100)}%`
                      }}
                    ></div>
                  </div>
                </div>
                <div className="text-right w-24">
                  <div className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                  }`}>
                    ₹{period.sales.toFixed(2)}
                  </div>
                  <div className={`text-xs ${
                    theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    {period.count} orders
                  </div>
                </div>
              </div>
            ))}
          </div>
          {salesByPeriod.every(p => p.sales === 0) && (
            <div className={`text-center py-4 ${
              theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
            }`}>
              <p>No sales data for the selected period</p>
            </div>
          )}
        </div>

        {/* Top Products by Quantity */}
        <div className={`rounded-lg shadow p-6 ${
          theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 flex items-center ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
          }`}>
            <Package className="h-5 w-5 mr-2" />
            Top Selling Products (Quantity)
          </h3>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.id} className={`p-3 rounded-lg ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded flex items-center justify-center ${
                      index === 0 ? 'bg-yellow-100 text-yellow-800' : 
                      index === 1 ? 'bg-gray-100 text-gray-800' : 
                      index === 2 ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      <span className="text-sm font-bold">#{index + 1}</span>
                    </div>
                    <div>
                      <div className={`text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      }`}>
                        {product.name}
                      </div>
                      <div className={`text-xs ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        SKU: {product.sku} | Stock: {product.stock}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-green-600">
                      {product.quantitySold} sold
                    </div>
                    <div className={`text-xs ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      ₹{product.revenue.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {topProducts.length === 0 && (
              <div className={`text-center py-4 ${
                theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
              }`}>
                <p>No product sales data available</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inventory Status */}
        <div className={`rounded-lg shadow p-6 ${
          theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 flex items-center ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
          }`}>
            <AlertTriangle className="h-5 w-5 mr-2" />
            Inventory Status
          </h3>
          <div className="space-y-4">
            <div className={`flex justify-between items-center p-3 rounded ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <span className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Total Products
              </span>
              <span className={`font-medium ${
                theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
              }`}>
                {totalProducts}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 rounded border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800">
              <span className="text-sm text-red-600 dark:text-red-400">Out of Stock</span>
              <span className="font-medium text-red-600 dark:text-red-400">
                {outOfStockProducts.length}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 rounded border border-orange-200 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-800">
              <span className="text-sm text-orange-600 dark:text-orange-400">Low Stock</span>
              <span className="font-medium text-orange-600 dark:text-orange-400">
                {lowStockProducts.length}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 rounded border border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800">
              <span className="text-sm text-green-600 dark:text-green-400">In Stock</span>
              <span className="font-medium text-green-600 dark:text-green-400">
                {totalProducts - outOfStockProducts.length - lowStockProducts.length}
              </span>
            </div>
          </div>
        </div>

        {/* Top Categories */}
        <div className={`rounded-lg shadow p-6 ${
          theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
          }`}>
            Top Categories by Revenue
          </h3>
          <div className="space-y-3">
            {topCategories.map((category, index) => (
              <div key={category.category} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-800">{index + 1}</span>
                  </div>
                  <span className={`text-sm ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {category.category}
                  </span>
                </div>
                <span className="text-sm font-medium text-green-600">
                  ₹{category.revenue.toFixed(2)}
                </span>
              </div>
            ))}
            {topCategories.length === 0 && (
              <div className={`text-center py-4 ${
                theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
              }`}>
                <p>No category data available</p>
              </div>
            )}
          </div>
        </div>

        {/* Customer Insights */}
        <div className={`rounded-lg shadow p-6 ${
          theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 flex items-center ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
          }`}>
            <Users className="h-5 w-5 mr-2" />
            Customer Insights
          </h3>
          <div className="space-y-4">
            <div className={`flex justify-between items-center p-3 rounded ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <span className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Total Customers
              </span>
              <span className={`font-medium ${
                theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
              }`}>
                {totalCustomers}
              </span>
            </div>
            <div className={`flex justify-between items-center p-3 rounded ${
              theme === 'dark' ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50'
            }`}>
              <span className={`text-sm ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
              }`}>
                Active This Month
              </span>
              <span className={`font-medium ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
              }`}>
                {activeCustomers.length}
              </span>
            </div>
            <div className={`flex justify-between items-center p-3 rounded ${
              theme === 'dark' ? 'bg-purple-900/20 border border-purple-800' : 'bg-purple-50'
            }`}>
              <span className={`text-sm ${
                theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
              }`}>
                Avg Loyalty Points
              </span>
              <span className={`font-medium ${
                theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
              }`}>
                {customers.length > 0 
                  ? Math.round(customers.reduce((sum, c) => sum + (c.loyaltyPoints || 0), 0) / customers.length)
                  : 0
                }
              </span>
            </div>
          </div>
          
          <h4 className={`text-md font-semibold mt-6 mb-3 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Top Loyalty Customers
          </h4>
          <div className="space-y-2">
            {topLoyaltyCustomers.slice(0, 3).map((customer, index) => (
              <div key={customer.id} className={`flex justify-between items-center p-2 rounded ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <span className={`text-sm truncate flex-1 mr-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {customer.name}
                </span>
                <span className="text-sm font-medium text-purple-600">
                  {customer.loyaltyPoints || 0} pts
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products by Revenue */}
      <div className={`rounded-lg shadow p-6 mt-6 ${
        theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      }`}>
        <h3 className={`text-lg font-semibold mb-4 ${
          theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
        }`}>
          Top Products by Revenue
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {topProductsByRevenue.slice(0, 5).map((product, index) => (
            <div key={product.id} className={`text-center p-4 rounded-lg ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2 ${
                index === 0 ? 'bg-yellow-100 text-yellow-800' : 
                index === 1 ? 'bg-gray-100 text-gray-800' : 
                index === 2 ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'
              }`}>
                <span className="font-bold">#{index + 1}</span>
              </div>
              <div className={`text-sm font-medium truncate ${
                theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
              }`} title={product.name}>
                {product.name}
              </div>
              <div className={`text-xs mb-1 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {product.category}
              </div>
              <div className="text-lg font-bold text-green-600">
                ₹{product.revenue.toFixed(2)}
              </div>
              <div className={`text-xs ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Stock: {product.stock?.available || 0}
              </div>
            </div>
          ))}
          {topProductsByRevenue.length === 0 && (
            <div className={`col-span-5 text-center py-8 ${
              theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
            }`}>
              <p>No revenue data available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;