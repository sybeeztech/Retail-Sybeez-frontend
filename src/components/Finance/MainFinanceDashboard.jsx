import React, { useState, useEffect } from 'react';
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
  Download,
  Moon,
  Sun
} from 'lucide-react';

// Import the specialized finance modules
import CashFlowManager from './CashFlowManager';
import RetailFinanceDashboard from './RetailFinanceDashboard';
import GSTopCompliantFinance from './GSTopCompliantFinance';
import useSettingsStore from '../../store/settingsStore'; // Import the settings store

const MainFinanceDashboard = () => {
  const [activeModule, setActiveModule] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');
  const { theme, toggleTheme } = useSettingsStore(); // Use the store

  // Sample financial data for Indian retail - now mutable
  const [financialData, setFinancialData] = useState({
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
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Handle period change
  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    
    // Simulate data change based on period
    const multipliers = {
      'This Week': 0.25,
      'This Month': 1,
      'This Quarter': 3,
      'This Year': 12
    };
    
    const multiplier = multipliers[period] || 1;
    
    setFinancialData(prev => ({
      totalRevenue: Math.round(485000 * multiplier),
      totalExpenses: Math.round(320000 * multiplier),
      netProfit: Math.round(165000 * multiplier),
      cashOnHand: Math.round(125000 * (multiplier > 1 ? multiplier * 0.8 : multiplier)),
      upiRevenue: Math.round(285000 * multiplier),
      cashRevenue: Math.round(200000 * multiplier),
      monthlyGrowth: 12.5,
      expenseRatio: 66,
      gstPayable: Math.round(45000 * multiplier),
      outstandingInvoices: Math.round(85000 * multiplier)
    }));
  };

  // Export report functionality
  const handleExportReport = () => {
    const reportData = {
      financialData,
      selectedPeriod,
      exportDate: new Date().toISOString(),
      modules: {
        active: activeModule,
        available: modules.map(m => m.id)
      }
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `finance-report-${selectedPeriod.toLowerCase().replace(' ', '-')}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Add sample income
  const handleAddSampleIncome = () => {
    const newIncome = 50000;
    setFinancialData(prev => ({
      ...prev,
      totalRevenue: prev.totalRevenue + newIncome,
      upiRevenue: prev.upiRevenue + newIncome,
      netProfit: prev.netProfit + newIncome,
      cashOnHand: prev.cashOnHand + newIncome,
      monthlyGrowth: prev.monthlyGrowth + 2.5
    }));
    alert(`Added sample income of ${formatCurrency(newIncome)}`);
  };

  // Add sample expense
  const handleAddSampleExpense = () => {
    const newExpense = 25000;
    setFinancialData(prev => ({
      ...prev,
      totalExpenses: prev.totalExpenses + newExpense,
      netProfit: prev.netProfit - newExpense,
      cashOnHand: prev.cashOnHand - newExpense,
      expenseRatio: Math.round(((prev.totalExpenses + newExpense) / prev.totalRevenue) * 100)
    }));
    alert(`Added sample expense of ${formatCurrency(newExpense)}`);
  };

  // Clear outstanding invoices
  const handleClearInvoices = () => {
    setFinancialData(prev => ({
      ...prev,
      outstandingInvoices: 0,
      cashOnHand: prev.cashOnHand + prev.outstandingInvoices
    }));
    alert('Outstanding invoices cleared!');
  };

  // Pay GST
  const handlePayGST = () => {
    setFinancialData(prev => ({
      ...prev,
      gstPayable: 0,
      cashOnHand: prev.cashOnHand - prev.gstPayable,
      totalExpenses: prev.totalExpenses + prev.gstPayable,
      netProfit: prev.netProfit - prev.gstPayable
    }));
    alert('GST payment processed successfully!');
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
          <div key={index} className={`rounded-lg shadow p-6 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.color} mr-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stat.title}
                </p>
                <p className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  {stat.value}
                </p>
                <p className={`text-sm ${
                  stat.changeType === 'positive' ? 'text-green-600' : 
                  stat.changeType === 'negative' ? 'text-red-600' : 
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
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
        <div className={`rounded-lg shadow p-6 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h2 className={`text-xl font-semibold mb-4 ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
          }`}>
            Revenue by Payment Method
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CreditCard className="w-5 h-5 text-blue-500 mr-3" />
                <span className={`font-medium ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-900'
                }`}>
                  UPI Payments
                </span>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {formatCurrency(financialData.upiRevenue)}
                </p>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {((financialData.upiRevenue / financialData.totalRevenue) * 100).toFixed(1)}% of total
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Wallet className="w-5 h-5 text-green-500 mr-3" />
                <span className={`font-medium ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-900'
                }`}>
                  Cash Payments
                </span>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {formatCurrency(financialData.cashRevenue)}
                </p>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {((financialData.cashRevenue / financialData.totalRevenue) * 100).toFixed(1)}% of total
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={`rounded-lg shadow p-6 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h2 className={`text-xl font-semibold mb-4 ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
          }`}>
            Financial Health
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Profit Margin
              </span>
              <span className="font-semibold text-green-600">
                {((financialData.netProfit / financialData.totalRevenue) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Expense Ratio
              </span>
              <span className="font-semibold text-orange-600">
                {((financialData.totalExpenses / financialData.totalRevenue) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Cash Flow Status
              </span>
              <span className="flex items-center font-semibold text-green-600">
                <CheckCircle className="w-4 h-4 mr-1" />
                Healthy
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className={`rounded-lg shadow p-6 mb-6 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h2 className={`text-xl font-semibold mb-4 ${
          theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
        }`}>
          Monthly Trends
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <ArrowUpRight className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-green-600">+{financialData.monthlyGrowth}%</p>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Revenue Growth</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <ArrowDownRight className="w-8 h-8 text-red-500" />
            </div>
            <p className="text-2xl font-bold text-red-600">
              +{((financialData.totalExpenses / 320000 - 1) * 100).toFixed(1)}%
            </p>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Expense Growth</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-8 h-8 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-blue-600">
              +{((financialData.netProfit / 165000 - 1) * 100).toFixed(1)}%
            </p>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Profit Growth</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={`rounded-lg shadow p-6 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h2 className={`text-xl font-semibold mb-4 ${
          theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
        }`}>
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-4 border rounded-lg transition-colors ${
            theme === 'dark' 
              ? 'border-gray-700 hover:border-purple-500' 
              : 'border-gray-200 hover:border-purple-300'
          }`}>
            <h3 className={`font-medium mb-2 ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-900'
            }`}>
              Record Income
            </h3>
            <p className={`text-sm mb-3 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Add UPI or cash income
            </p>
            <button 
              onClick={handleAddSampleIncome}
              className="text-purple-600 text-sm hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
            >
              Add Income →
            </button>
          </div>
          <div className={`p-4 border rounded-lg transition-colors ${
            theme === 'dark' 
              ? 'border-gray-700 hover:border-purple-500' 
              : 'border-gray-200 hover:border-purple-300'
          }`}>
            <h3 className={`font-medium mb-2 ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-900'
            }`}>
              Track Expense
            </h3>
            <p className={`text-sm mb-3 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Record business expenses
            </p>
            <button 
              onClick={handleAddSampleExpense}
              className="text-purple-600 text-sm hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
            >
              Add Expense →
            </button>
          </div>
          <div className={`p-4 border rounded-lg transition-colors ${
            theme === 'dark' 
              ? 'border-gray-700 hover:border-purple-500' 
              : 'border-gray-200 hover:border-purple-300'
          }`}>
            <h3 className={`font-medium mb-2 ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-900'
            }`}>
              GST Filing
            </h3>
            <p className={`text-sm mb-3 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Manage GST compliance
            </p>
            <button 
              onClick={() => setActiveModule('gst')}
              className="text-purple-600 text-sm hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
            >
              File GST →
            </button>
          </div>
        </div>
      </div>

      {/* Alerts & Notifications */}
      <div className={`rounded-lg shadow p-6 mt-6 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h2 className={`text-xl font-semibold mb-4 ${
          theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
        }`}>
          Alerts & Notifications
        </h2>
        <div className="space-y-3">
          {financialData.gstPayable > 0 && (
            <div className={`flex items-center justify-between p-3 rounded-lg border ${
              theme === 'dark' 
                ? 'bg-yellow-900/20 border-yellow-800' 
                : 'bg-yellow-50 border-yellow-200'
            }`}>
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-yellow-600 mr-3" />
                <div>
                  <p className={`font-medium ${
                    theme === 'dark' ? 'text-yellow-400' : 'text-yellow-800'
                  }`}>
                    GST Filing Due
                  </p>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-yellow-500' : 'text-yellow-600'
                  }`}>
                    Monthly GST return is due on 15th November
                  </p>
                </div>
              </div>
              <button
                onClick={handlePayGST}
                className="bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700"
              >
                Pay Now
              </button>
            </div>
          )}
          {financialData.outstandingInvoices > 0 && (
            <div className={`flex items-center justify-between p-3 rounded-lg border ${
              theme === 'dark' 
                ? 'bg-blue-900/20 border-blue-800' 
                : 'bg-blue-50 border-blue-200'
            }`}>
              <div className="flex items-center">
                <Info className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <p className={`font-medium ${
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-800'
                  }`}>
                    Outstanding Invoices
                  </p>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-blue-500' : 'text-blue-600'
                  }`}>
                    3 invoices totaling {formatCurrency(financialData.outstandingInvoices)} are pending
                  </p>
                </div>
              </div>
              <button
                onClick={handleClearInvoices}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
              >
                Clear All
              </button>
            </div>
          )}
          {financialData.cashOnHand < 50000 && (
            <div className={`flex items-center p-3 rounded-lg border ${
              theme === 'dark' 
                ? 'bg-red-900/20 border-red-800' 
                : 'bg-red-50 border-red-200'
            }`}>
              <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
              <div>
                <p className={`font-medium ${
                  theme === 'dark' ? 'text-red-400' : 'text-red-800'
                }`}>
                  Low Cash Balance
                </p>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-red-500' : 'text-red-600'
                }`}>
                  Consider transferring funds to maintain operations
                </p>
              </div>
            </div>
          )}
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
    <div className={`p-6 space-y-6 ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <div className={`shadow-sm border-b ${
        theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Finance Dashboard
              </h1>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Complete financial management for Indian retail businesses
              </p>
            </div>
            <div className="flex items-center space-x-3">
              {/* Dark Mode Toggle */}
              {/* <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'dark' 
                    ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button> */}
              
              <select
                value={selectedPeriod}
                onChange={(e) => handlePeriodChange(e.target.value)}
                className={`border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="This Week">This Week</option>
                <option value="This Month">This Month</option>
                <option value="This Quarter">This Quarter</option>
                <option value="This Year">This Year</option>
              </select>
              <button 
                onClick={handleExportReport}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Download size={16} />
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Module Navigation */}
      <div className={`shadow-sm ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="px-6 py-4">
          <div className="flex flex-wrap gap-2">
            {modules.map((module) => (
              <button
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors border ${
                  activeModule === module.id
                    ? theme === 'dark'
                      ? 'bg-purple-900/50 text-purple-300 border-purple-700'
                      : 'bg-purple-100 text-purple-700 border-purple-200'
                    : theme === 'dark'
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 border-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200'
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