import React, { useState, useEffect } from 'react';
import { useSetupStore } from '../../store/setupStore';
import useSettingsStore from '../../store/settingsStore';
import iconLogo from '../../assets/icon.png';
import {
  Package,
  ShoppingCart,
  TrendingUp,
  AlertTriangle,
  Users,
  DollarSign,
  BarChart3,
  Building2,
  Truck,
  Eye,
  Plus,
  Calendar,
  RefreshCw,
  Store,
  User,
  FileText
} from 'lucide-react';
import WelcomePopup from '../WelcomePopup';

const RetailERPDashboard = () => {
  const [selectedBranch, setSelectedBranch] = useState('All Branches');
  const [timeRange, setTimeRange] = useState('monthly');
  const [isLoading, setIsLoading] = useState(false);
  const { showWelcome, dismissWelcome, setupData } = useSetupStore();
  const { theme } = useSettingsStore();
  const businessName = setupData?.step3?.businessName || 'Sybeez';

  // Format currency in INR
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Format number with Indian locale
  const formatNumber = (number) => {
    return new Intl.NumberFormat('en-IN').format(number);
  };

  // State for all dashboard data
  const [dashboardData, setDashboardData] = useState({
    products: [],
    suppliers: [],
    branches: [],
    metrics: {
      totalSales: 0,
      dailySales: 0,
      totalProducts: 0,
      lowStockItems: 0,
      pendingOrders: 0,
      activeCustomers: 0,
      totalBranches: 0,
      totalInventoryValue: 0,
      salesGrowth: 0,
      customerGrowth: 0,
      totalSuppliers: 0,
      activeSuppliers: 0
    },
    branchPerformance: [],
    recentTransactions: [],
    topProducts: []
  });

  // Load all data from localStorage
  useEffect(() => {
    loadDashboardData();
  }, [timeRange, selectedBranch]);

  const loadDashboardData = () => {
    setIsLoading(true);

    try {
      // Get all data from localStorage
      const products = JSON.parse(localStorage.getItem('products') || '[]');
      const suppliers = JSON.parse(localStorage.getItem('suppliers') || '[]');
      const branches = JSON.parse(localStorage.getItem('branches') || '[]');

      // Calculate metrics based on actual data
      const totalProducts = products.length;

      // Calculate low stock items (available stock <= reorder level)
      const lowStockItems = products.filter(product => {
        const availableStock = product.stock?.available || 0;
        const reorderLevel = product.stock?.reorderLevel || 10;
        return availableStock <= reorderLevel;
      }).length;

      // Calculate total inventory value
      const totalInventoryValue = products.reduce((sum, product) => {
        const totalStock = product.stock?.total || 0;
        const costPrice = product.costPrice || 0;
        return sum + (totalStock * costPrice);
      }, 0);

      // Calculate total sales from products (simulated - in real app this would come from transactions)
      const totalSales = products.reduce((sum, product) => {
        const sold = product.stock?.sold || Math.floor(Math.random() * 100);
        const price = product.price || 0;
        return sum + (sold * price);
      }, 0);

      // Calculate daily sales (average)
      const dailySales = totalSales / (timeRange === 'daily' ? 1 : timeRange === 'weekly' ? 7 : timeRange === 'monthly' ? 30 : 90);

      // Calculate active suppliers
      const activeSuppliers = suppliers.filter(supplier => supplier.status === 'active').length;

      // Generate branch performance from actual branches
      const branchPerformance = branches.map(branch => ({
        id: branch.id,
        name: branch.name,
        sales: Math.round(totalSales / (branches.length || 1) * (0.7 + Math.random() * 0.6)), // Simulate variation
        status: branch.status || 'active'
      }));

      // Generate recent transactions (simulated from recent activity)
      const recentTransactions = generateRecentTransactions(branches);

      // Generate top products from actual products
      const topProducts = products
        .map(product => ({
          id: product.id,
          name: product.name,
          sold: product.stock?.sold || Math.floor(Math.random() * 100),
          revenue: (product.stock?.sold || 0) * (product.price || 0)
        }))
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 4);

      const metrics = {
        totalSales: Math.round(totalSales),
        dailySales: Math.round(dailySales),
        totalProducts,
        lowStockItems,
        pendingOrders: calculatePendingOrders(products),
        activeCustomers: calculateActiveCustomers(),
        totalBranches: branches.length,
        totalInventoryValue: Math.round(totalInventoryValue),
        salesGrowth: calculateGrowthRate(timeRange),
        customerGrowth: calculateCustomerGrowth(),
        totalSuppliers: suppliers.length,
        activeSuppliers
      };

      setDashboardData({
        products,
        suppliers,
        branches,
        metrics,
        branchPerformance,
        recentTransactions,
        topProducts
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper functions for calculations
  const calculatePendingOrders = (products) => {
    return products.filter(product => {
      const available = product.stock?.available || 0;
      const reorderLevel = product.stock?.reorderLevel || 10;
      return available < reorderLevel;
    }).length;
  };

  const calculateActiveCustomers = () => {
    // Simulate customer count based on sales data
    const baseCustomers = 1250;
    const growthFactor = dashboardData.metrics.totalSales / 100000;
    return Math.round(baseCustomers * Math.max(1, growthFactor));
  };

  const calculateGrowthRate = (period) => {
    // Simulate growth based on time period
    const growthRates = {
      daily: 5,
      weekly: 12,
      monthly: 18,
      quarterly: 25
    };
    return growthRates[period] || 15;
  };

  const calculateCustomerGrowth = () => {
    return Math.round(Math.random() * 15 + 5); // 5-20% growth
  };

  const generateRecentTransactions = (branches) => {
    const transactionTypes = ['Sale', 'Purchase', 'Return', 'Refund'];
    const branchesList = branches.length > 0 ? branches : [{ name: 'Main Store' }];

    return Array.from({ length: 4 }, (_, i) => ({
      id: i + 1,
      type: transactionTypes[i % transactionTypes.length],
      amount: [245.50, 1250.00, 89.90, -45.00][i],
      branch: branchesList[i % branchesList.length].name,
      time: ['2 mins ago', '15 mins ago', '23 mins ago', '1 hour ago'][i]
    }));
  };

  const handleCloseWelcome = () => {
    dismissWelcome();
  };

  const handleRefresh = () => {
    loadDashboardData();
  };

  const getTimeRangeText = () => {
    switch (timeRange) {
      case 'daily': return 'Today';
      case 'weekly': return 'This Week';
      case 'monthly': return 'This Month';
      case 'quarterly': return 'This Quarter';
      default: return 'This Month';
    }
  };

  const { metrics, branchPerformance, recentTransactions, topProducts, branches: allBranches } = dashboardData;

  return (
    <div className={`p-6 min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center shadow-sm border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
            <img
              src={iconLogo}
              alt="Business Logo"
              className="w-10 h-10 object-contain"
            />
          </div>
          <div>
            <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
              {businessName} Retail ERP
            </h1>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Comprehensive retail management dashboard
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className={`border rounded-lg px-4 py-2 ${theme === 'dark'
                ? 'border-gray-600 bg-gray-700 text-gray-100'
                : 'border-gray-300 bg-white text-gray-900'
              }`}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
          </select>

          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className={`border rounded-lg px-4 py-2 ${theme === 'dark'
                ? 'border-gray-600 bg-gray-700 text-gray-100'
                : 'border-gray-300 bg-white text-gray-900'
              }`}
          >
            <option value="All Branches">All Branches</option>
            {allBranches.map(branch => (
              <option key={branch.id} value={branch.name}>{branch.name}</option>
            ))}
          </select>

          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : theme === 'dark'
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-100'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
          >
            <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
            <span>{isLoading ? 'Loading...' : 'Refresh'}</span>
          </button>
        </div>
      </div>

      {/* Time Range Indicator */}
      <div className="mb-6">
        <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          } shadow`}>
          <Calendar size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
          <span className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Showing data for: {getTimeRangeText()}
          </span>
        </div>
      </div>

      {/* Main Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>Total Sales ({getTimeRangeText()})</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(metrics.totalSales)}
              </p>
              <p className={`text-sm ${metrics.salesGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {metrics.salesGrowth >= 0 ? '+' : ''}{metrics.salesGrowth}% from last period
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>Inventory Value</p>
              <p className="text-2xl font-bold text-blue-600">
                {formatCurrency(metrics.totalInventoryValue)}
              </p>
              <p className="text-sm text-blue-500">Total stock value</p>
            </div>
            <Package className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>Total Products</p>
              <p className="text-2xl font-bold text-purple-600">
                {formatNumber(metrics.totalProducts)}
              </p>
              <p className="text-sm text-red-500">
                {metrics.lowStockItems} low stock
              </p>
            </div>
            <ShoppingCart className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>Active Branches</p>
              <p className="text-2xl font-bold text-orange-600">
                {formatNumber(metrics.totalBranches)}
              </p>
              <p className="text-sm text-orange-500">All operational</p>
            </div>
            <Building2 className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
              }`}>Inventory Status</h3>
            <Package className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`} />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>Total Value:</span>
              <span className={`font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'
                }`}>{formatCurrency(metrics.totalInventoryValue)}</span>
            </div>
            <div className="flex justify-between">
              <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>Low Stock Items:</span>
              <span className="font-medium text-red-600">{formatNumber(metrics.lowStockItems)}</span>
            </div>
            <div className="flex justify-between">
              <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>Pending Orders:</span>
              <span className="font-medium text-orange-600">{formatNumber(metrics.pendingOrders)}</span>
            </div>
          </div>
        </div>

        <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
              }`}>Business Overview</h3>
            <Users className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`} />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>Active Customers:</span>
              <span className={`font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'
                }`}>{formatNumber(metrics.activeCustomers)}</span>
            </div>
            <div className="flex justify-between">
              <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>Total Suppliers:</span>
              <span className="font-medium text-green-600">{formatNumber(metrics.totalSuppliers)}</span>
            </div>
            <div className="flex justify-between">
              <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>Active Suppliers:</span>
              <span className="font-medium text-blue-600">{formatNumber(metrics.activeSuppliers)}</span>
            </div>
          </div>
        </div>

        <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
              }`}>Quick Actions</h3>
            <Plus className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`} />
          </div>
          <div className="space-y-2">
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm transition-colors">
              New Sale
            </button>
            <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm transition-colors">
              Add Product
            </button>
            <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 text-sm transition-colors">
              Manage Suppliers
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Branch Performance */}
        <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
              }`}>Branch Performance</h3>
            <Eye className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`} />
          </div>
          <div className="space-y-4">
            {branchPerformance.length > 0 ? (
              branchPerformance.map((branch) => (
                <div key={branch.id} className={`flex items-center justify-between p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                  <div>
                    <h4 className={`font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      }`}>{branch.name}</h4>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>{getTimeRangeText()} Sales</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      }`}>{formatCurrency(branch.sales)}</p>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${branch.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                      }`}>
                      {branch.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className={`text-center py-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                <Store className="mx-auto h-12 w-12 mb-2" />
                <p>No branches configured</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
              }`}>Recent Activity</h3>
            <TrendingUp className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`} />
          </div>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className={`flex items-center justify-between p-3 border-l-4 ${transaction.type === 'Sale' ? 'border-green-400' :
                  transaction.type === 'Purchase' ? 'border-blue-400' : 'border-red-400'
                } ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div>
                  <p className={`font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    }`}>{transaction.type}</p>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>{transaction.branch}</p>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {formatCurrency(Math.abs(transaction.amount))}
                  </p>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                    }`}>{transaction.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className={`mt-6 rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
            }`}>Top Performing Products</h3>
          <BarChart3 className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {topProducts.length > 0 ? (
            topProducts.map((product) => (
              <div key={product.id} className={`p-4 border rounded-lg ${theme === 'dark'
                  ? 'border-gray-600 bg-gray-700'
                  : 'border-gray-200 bg-white'
                }`}>
                <h4 className={`font-medium mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                  }`}>{product.name}</h4>
                <div className="space-y-1">
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>Units Sold: <span className={`font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'
                      }`}>{formatNumber(product.sold)}</span></p>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>Revenue: <span className="font-medium text-green-600">
                      {formatCurrency(product.revenue)}
                    </span></p>
                </div>
              </div>
            ))
          ) : (
            <div className={`col-span-4 text-center py-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
              <Package className="mx-auto h-12 w-12 mb-2" />
              <p>No products added yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Welcome Popup */}
      <WelcomePopup isOpen={showWelcome} onClose={handleCloseWelcome} />
    </div>
  );
};

export default RetailERPDashboard;