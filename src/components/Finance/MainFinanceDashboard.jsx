import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  PieChart, 
  BarChart3, 
  Calculator,
  CreditCard,
  Receipt,
  Wallet,
  AlertCircle,
  CheckCircle,
  Info,
  Target,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Download
} from 'lucide-react';

// Import the specialized finance modules
import CashFlowManager from './CashFlowManager';
import RetailFinanceDashboard from './RetailFinanceDashboard';
import GSTopCompliantFinance from './GSTopCompliantFinance';

const MainFinanceDashboard = () => {
  const [activeModule, setActiveModule] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');

  // Sample financial data for Indian retail
  const financialData = {
    totalRevenue: 485000,
    totalExpenses: 320000,
    netProfit: 165000,
    cashOnHand: 125000,
    upiRevenue: 285000,
    cashRevenue: 200000,
    monthlyGrowth: 12.5,
    expenseRatio: 66,
    gstPayable: 45000,
    outstandingInvoices: 85000
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const modules = [
    {
      id: 'overview',
      name: 'Overview',
      icon: BarChart3,
      description: 'Financial overview and key metrics'
    },
    {
      id: 'cashflow',
      name: 'Cash Flow',
      icon: Wallet,
      description: 'Money in/out tracking with UPI/Cash separation'
    },
    {
      id: 'retail',
      name: 'Retail Dashboard',
      icon: Target,
      description: 'Retail-specific financial insights'
    },
    {
      id: 'gst',
      name: 'GST Compliance',
      icon: Receipt,
      description: 'GST filing and compliance management'
    }
  ];

  const keyMetrics = [
    {
      title: 'Total Revenue',
      value: formatCurrency(financialData.totalRevenue),
      change: '+12.5%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      title: 'Net Profit',
      value: formatCurrency(financialData.netProfit),
      change: '+8.2%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'bg-blue-500'
    },
    {
      title: 'Cash on Hand',
      value: formatCurrency(financialData.cashOnHand),
      change: '-2.1%',
      changeType: 'negative',
      icon: Wallet,
      color: 'bg-purple-500'
    },
    {
      title: 'GST Payable',
      value: formatCurrency(financialData.gstPayable),
      change: 'Due 15th',
      changeType: 'neutral',
      icon: Receipt,
      color: 'bg-orange-500'
    }
  ];

  const renderOverview = () => (
    <div>
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {keyMetrics.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.color} mr-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className={`text-sm ${
                  stat.changeType === 'positive' ? 'text-green-600' : 
                  stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {stat.change}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Revenue by Payment Method</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CreditCard className="w-5 h-5 text-blue-500 mr-3" />
                <span className="font-medium">UPI Payments</span>
              </div>
              <div className="text-right">
                <p className="font-semibold">{formatCurrency(financialData.upiRevenue)}</p>
                <p className="text-sm text-gray-600">58.8% of total</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Wallet className="w-5 h-5 text-green-500 mr-3" />
                <span className="font-medium">Cash Payments</span>
              </div>
              <div className="text-right">
                <p className="font-semibold">{formatCurrency(financialData.cashRevenue)}</p>
                <p className="text-sm text-gray-600">41.2% of total</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Financial Health</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Profit Margin</span>
              <span className="font-semibold text-green-600">34%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Expense Ratio</span>
              <span className="font-semibold text-orange-600">66%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Cash Flow Status</span>
              <span className="flex items-center font-semibold text-green-600">
                <CheckCircle className="w-4 h-4 mr-1" />
                Healthy
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Monthly Trends</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <ArrowUpRight className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-green-600">+12.5%</p>
            <p className="text-gray-600">Revenue Growth</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <ArrowDownRight className="w-8 h-8 text-red-500" />
            </div>
            <p className="text-2xl font-bold text-red-600">+8.3%</p>
            <p className="text-gray-600">Expense Growth</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-8 h-8 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-blue-600">+18.2%</p>
            <p className="text-gray-600">Profit Growth</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors">
            <h3 className="font-medium mb-2">Record Income</h3>
            <p className="text-sm text-gray-600 mb-3">Add UPI or cash income</p>
            <button 
              onClick={() => setActiveModule('cashflow')}
              className="text-purple-600 text-sm hover:text-purple-800"
            >
              Add Income →
            </button>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors">
            <h3 className="font-medium mb-2">Track Expense</h3>
            <p className="text-sm text-gray-600 mb-3">Record business expenses</p>
            <button 
              onClick={() => setActiveModule('cashflow')}
              className="text-purple-600 text-sm hover:text-purple-800"
            >
              Add Expense →
            </button>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors">
            <h3 className="font-medium mb-2">GST Filing</h3>
            <p className="text-sm text-gray-600 mb-3">Manage GST compliance</p>
            <button 
              onClick={() => setActiveModule('gst')}
              className="text-purple-600 text-sm hover:text-purple-800"
            >
              File GST →
            </button>
          </div>
        </div>
      </div>

      {/* Alerts & Notifications */}
      <div className="bg-white rounded-lg shadow p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">Alerts & Notifications</h2>
        <div className="space-y-3">
          <div className="flex items-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-yellow-600 mr-3" />
            <div>
              <p className="font-medium text-yellow-800">GST Filing Due</p>
              <p className="text-sm text-yellow-600">Monthly GST return is due on 15th November</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <Info className="w-5 h-5 text-blue-600 mr-3" />
            <div>
              <p className="font-medium text-blue-800">Outstanding Invoices</p>
              <p className="text-sm text-blue-600">3 invoices totaling {formatCurrency(financialData.outstandingInvoices)} are pending</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderModule = () => {
    switch (activeModule) {
      case 'overview':
        return renderOverview();
      case 'cashflow':
        return <CashFlowManager />;
      case 'retail':
        return <RetailFinanceDashboard />;
      case 'gst':
        return <GSTopCompliantFinance />;
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Finance Dashboard</h1>
              <p className="text-gray-600">Complete financial management for Indian retail businesses</p>
            </div>
            <div className="flex space-x-3">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="This Week">This Week</option>
                <option value="This Month">This Month</option>
                <option value="This Quarter">This Quarter</option>
                <option value="This Year">This Year</option>
              </select>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                <Download size={16} />
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Module Navigation */}
      <div className="bg-white shadow-sm">
        <div className="px-6 py-4">
          <div className="flex flex-wrap gap-2">
            {modules.map((module) => (
              <button
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  activeModule === module.id
                    ? 'bg-purple-100 text-purple-700 border border-purple-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                }`}
              >
                <module.icon className="w-4 h-4 mr-2" />
                {module.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {renderModule()}
      </div>
    </div>
  );
};

export default MainFinanceDashboard;