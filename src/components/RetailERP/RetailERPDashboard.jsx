import React, { useState } from 'react';
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
  Plus
} from 'lucide-react';
import WelcomePopup from '../WelcomePopup';

const RetailERPDashboard = () => {
  const [selectedBranch, setSelectedBranch] = useState('All Branches');
  const { showWelcome, dismissWelcome, setupData } = useSetupStore();
  const { theme } = useSettingsStore();
  const businessName = setupData?.step3?.businessName || 'Sybeez';
  const businessLogo = setupData?.step3?.logoPreview;

  const handleCloseWelcome = () => {
    dismissWelcome();
  };

  // Mock data for retail metrics
  const retailMetrics = {
    totalSales: 142750,
    dailySales: 8420,
    totalProducts: 2847,
    lowStockItems: 23,
    pendingOrders: 15,
    activeCustomers: 1250,
    branches: 8,
    totalInventoryValue: 485000
  };

  const branches = [
    { id: 1, name: 'Downtown Store', sales: 45250, status: 'active' },
    { id: 2, name: 'Mall Branch', sales: 38750, status: 'active' },
    { id: 3, name: 'Airport Store', sales: 28450, status: 'active' },
    { id: 4, name: 'Suburban Branch', sales: 30300, status: 'active' }
  ];

  const recentTransactions = [
    { id: 1, type: 'Sale', amount: 245.50, branch: 'Downtown Store', time: '2 mins ago' },
    { id: 2, type: 'Purchase', amount: 1250.00, branch: 'Mall Branch', time: '15 mins ago' },
    { id: 3, type: 'Sale', amount: 89.90, branch: 'Airport Store', time: '23 mins ago' },
    { id: 4, type: 'Return', amount: -45.00, branch: 'Downtown Store', time: '1 hour ago' }
  ];

  const topProducts = [
    { id: 1, name: 'Wireless Headphones', sold: 156, revenue: 23400 },
    { id: 2, name: 'Smart Watch', sold: 89, revenue: 26700 },
    { id: 3, name: 'Phone Case', sold: 234, revenue: 4680 },
    { id: 4, name: 'Bluetooth Speaker', sold: 67, revenue: 8040 }
  ];

  return (
    <div className={`p-6 min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center shadow-sm border ${
            theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
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
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className={`border rounded-lg px-4 py-2 ${
              theme === 'dark' 
                ? 'border-gray-600 bg-gray-700 text-gray-100' 
                : 'border-gray-300 bg-white text-gray-900'
            }`}
          >
            <option value="All Branches">All Branches</option>
            {branches.map(branch => (
              <option key={branch.id} value={branch.name}>{branch.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className={`rounded-lg shadow p-6 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>Total Sales (Monthly)</p>
              <p className="text-2xl font-bold text-green-600">${retailMetrics.totalSales.toLocaleString()}</p>
              <p className="text-sm text-green-500">+12.5% from last month</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className={`rounded-lg shadow p-6 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>Daily Sales</p>
              <p className="text-2xl font-bold text-blue-600">${retailMetrics.dailySales.toLocaleString()}</p>
              <p className="text-sm text-blue-500">Today's performance</p>
            </div>
            <ShoppingCart className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className={`rounded-lg shadow p-6 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>Total Products</p>
              <p className="text-2xl font-bold text-purple-600">{retailMetrics.totalProducts.toLocaleString()}</p>
              <p className="text-sm text-red-500">{retailMetrics.lowStockItems} low stock</p>
            </div>
            <Package className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className={`rounded-lg shadow p-6 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>Active Branches</p>
              <p className="text-2xl font-bold text-orange-600">{retailMetrics.branches}</p>
              <p className="text-sm text-orange-500">All operational</p>
            </div>
            <Building2 className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className={`rounded-lg shadow p-6 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${
              theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
            }`}>Inventory Status</h3>
            <Package className={`h-5 w-5 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`} />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className={`${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>Total Value:</span>
              <span className={`font-medium ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-900'
              }`}>${retailMetrics.totalInventoryValue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className={`${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>Low Stock Items:</span>
              <span className="font-medium text-red-600">{retailMetrics.lowStockItems}</span>
            </div>
            <div className="flex justify-between">
              <span className={`${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>Pending Orders:</span>
              <span className="font-medium text-orange-600">{retailMetrics.pendingOrders}</span>
            </div>
          </div>
        </div>

        <div className={`rounded-lg shadow p-6 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${
              theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
            }`}>Customer Metrics</h3>
            <Users className={`h-5 w-5 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`} />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className={`${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>Active Customers:</span>
              <span className={`font-medium ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-900'
              }`}>{retailMetrics.activeCustomers.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className={`${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>New This Month:</span>
              <span className="font-medium text-green-600">89</span>
            </div>
            <div className="flex justify-between">
              <span className={`${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>Loyalty Members:</span>
              <span className="font-medium text-blue-600">867</span>
            </div>
          </div>
        </div>

        <div className={`rounded-lg shadow p-6 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${
              theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
            }`}>Quick Actions</h3>
            <Plus className={`h-5 w-5 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`} />
          </div>
          <div className="space-y-2">
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
              New Sale
            </button>
            <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm">
              Add Product
            </button>
            <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 text-sm">
              Stock Reorder
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Branch Performance */}
        <div className={`rounded-lg shadow p-6 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${
              theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
            }`}>Branch Performance</h3>
            <Eye className={`h-5 w-5 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`} />
          </div>
          <div className="space-y-4">
            {branches.map((branch) => (
              <div key={branch.id} className={`flex items-center justify-between p-3 rounded-lg ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <div>
                  <h4 className={`font-medium ${
                    theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                  }`}>{branch.name}</h4>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>Monthly Sales</p>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                  }`}>${branch.sales.toLocaleString()}</p>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                    {branch.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className={`rounded-lg shadow p-6 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${
              theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
            }`}>Recent Transactions</h3>
            <TrendingUp className={`h-5 w-5 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`} />
          </div>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className={`flex items-center justify-between p-3 border-l-4 border-blue-400 ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <div>
                  <p className={`font-medium ${
                    theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                  }`}>{transaction.type}</p>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>{transaction.branch}</p>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                    ${Math.abs(transaction.amount).toFixed(2)}
                  </p>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                  }`}>{transaction.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className={`mt-6 rounded-lg shadow p-6 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-lg font-semibold ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
          }`}>Top Selling Products</h3>
          <BarChart3 className={`h-5 w-5 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {topProducts.map((product) => (
            <div key={product.id} className={`p-4 border rounded-lg ${
              theme === 'dark' 
                ? 'border-gray-600 bg-gray-700' 
                : 'border-gray-200 bg-white'
            }`}>
              <h4 className={`font-medium mb-2 ${
                theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
              }`}>{product.name}</h4>
              <div className="space-y-1">
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>Units Sold: <span className={`font-medium ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-900'
                }`}>{product.sold}</span></p>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>Revenue: <span className="font-medium text-green-600">${product.revenue.toLocaleString()}</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Welcome Popup */}
      <WelcomePopup isOpen={showWelcome} onClose={handleCloseWelcome} />
    </div>
  );
};

export default RetailERPDashboard;