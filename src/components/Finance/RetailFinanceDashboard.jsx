import React, { useState, useEffect } from 'react';
import { 
  Wallet,
  CreditCard,
  PieChart,
  BarChart3,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Clock,
  IndianRupee,
  Building,
  Store,
  Users,
  Package,
  Calculator,
  FileText,
  Download,
  RefreshCw,
  Calendar,
  Filter,
  Moon,
  Sun
} from 'lucide-react';
import useSettingsStore from '../../store/settingsStore'; // Import the same settings store

const RetailFinanceDashboard = () => {
  const [businessType, setBusinessType] = useState('small'); // small, medium, large
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [activeMetric, setActiveMetric] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState({});
  const [lastUpdated, setLastUpdated] = useState(new Date());
  
  // Use the same theme store as main dashboard
  const { theme, toggleTheme } = useSettingsStore();

  // Business-specific data based on size
  const businessProfiles = {
    small: {
      name: 'Small Shop',
      monthlyRevenue: 250000,
      dailyTransactions: 45,
      avgBillValue: 185,
      employeeCount: 2,
      categories: ['Grocery', 'Daily Needs', 'Snacks', 'Beverages']
    },
    medium: {
      name: 'Medium Store',
      monthlyRevenue: 1250000,
      dailyTransactions: 180,
      avgBillValue: 425,
      employeeCount: 8,
      categories: ['Grocery', 'Electronics', 'Clothing', 'Home Appliances', 'Personal Care']
    },
    large: {
      name: 'Large Retail Chain',
      monthlyRevenue: 5500000,
      dailyTransactions: 850,
      avgBillValue: 650,
      employeeCount: 35,
      categories: ['All Categories', 'Multiple Brands', 'Private Labels']
    }
  };

  // Theme utility functions
  const getThemeClass = (lightClass, darkClass) => {
    return theme === 'dark' ? darkClass : lightClass;
  };

  const getCardClass = () => {
    return getThemeClass('bg-white', 'bg-gray-800');
  };

  const getTextClass = (type = 'primary') => {
    const textColors = {
      primary: getThemeClass('text-gray-900', 'text-gray-100'),
      secondary: getThemeClass('text-gray-600', 'text-gray-400'),
      muted: getThemeClass('text-gray-500', 'text-gray-500')
    };
    return textColors[type];
  };

  const getBorderClass = () => {
    return getThemeClass('border-gray-200', 'border-gray-700');
  };

  const getInputClass = () => {
    return getThemeClass(
      'bg-white border-gray-300 text-gray-900 placeholder-gray-500',
      'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': 
        return getThemeClass('text-green-600 bg-green-100', 'text-green-300 bg-green-900/20');
      case 'good': 
        return getThemeClass('text-blue-600 bg-blue-100', 'text-blue-300 bg-blue-900/20');
      case 'average': 
        return getThemeClass('text-yellow-600 bg-yellow-100', 'text-yellow-300 bg-yellow-900/20');
      case 'poor': 
        return getThemeClass('text-red-600 bg-red-100', 'text-red-300 bg-red-900/20');
      default: 
        return getThemeClass('text-gray-600 bg-gray-100', 'text-gray-300 bg-gray-700');
    }
  };

  // Generate dynamic data based on business type and period
  const generateDashboardData = (type, period) => {
    const baseProfile = businessProfiles[type];
    const now = new Date();
    
    // Calculate dynamic values based on period
    let revenueMultiplier = 1;
    let transactionMultiplier = 1;
    
    switch (period) {
      case 'today':
        revenueMultiplier = 1;
        transactionMultiplier = 1;
        break;
      case 'week':
        revenueMultiplier = 7;
        transactionMultiplier = 6.5;
        break;
      case 'month':
        revenueMultiplier = 30;
        transactionMultiplier = 26;
        break;
      case 'quarter':
        revenueMultiplier = 90;
        transactionMultiplier = 78;
        break;
      default:
        revenueMultiplier = 1;
    }

    const totalRevenue = Math.round((baseProfile.monthlyRevenue / 30) * revenueMultiplier);
    const totalExpenses = Math.round(totalRevenue * (type === 'small' ? 0.38 : type === 'medium' ? 0.44 : 0.48));
    const netProfit = totalRevenue - totalExpenses;
    const transactionCount = Math.round(baseProfile.dailyTransactions * transactionMultiplier);

    return {
      todayMetrics: {
        totalRevenue: totalRevenue,
        totalExpenses: totalExpenses,
        netProfit: netProfit,
        cashOnHand: type === 'small' ? 15600 : type === 'medium' ? 65000 : 320000,
        upiBalance: type === 'small' ? 24800 : type === 'medium' ? 145000 : 580000,
        bankBalance: type === 'small' ? 85000 : type === 'medium' ? 425000 : 2100000,
        pendingPayments: type === 'small' ? 2400 : type === 'medium' ? 15600 : 65000
      },
      paymentBreakdown: {
        cash: type === 'small' ? 45 : type === 'medium' ? 35 : 25,
        upi: type === 'small' ? 50 : type === 'medium' ? 55 : 60,
        card: type === 'small' ? 5 : type === 'medium' ? 10 : 15
      },
      gstInfo: {
        monthlyGSTCollected: Math.round(totalRevenue * 0.05), // 5% GST
        monthlyGSTPaid: Math.round(totalExpenses * 0.05),
        nextFilingDate: '2024-11-20',
        gstNumber: type === 'small' ? '29ABCDE1234F1Z5' : type === 'medium' ? '29ABCDE5678F1Z5' : '29ABCDE9012F1Z5'
      },
      kpis: [
        {
          title: 'Daily Revenue Target',
          current: totalRevenue,
          target: baseProfile.monthlyRevenue,
          unit: '₹',
          trend: 'up',
          percentage: 12.5
        },
        {
          title: 'Transaction Count',
          current: transactionCount,
          target: baseProfile.dailyTransactions * (period === 'today' ? 1 : period === 'week' ? 7 : period === 'month' ? 30 : 90),
          unit: '',
          trend: transactionCount >= baseProfile.dailyTransactions ? 'up' : 'down',
          percentage: Math.round(((transactionCount - baseProfile.dailyTransactions) / baseProfile.dailyTransactions) * 100)
        },
        {
          title: 'Average Bill Value',
          current: type === 'small' ? 198 : type === 'medium' ? 455 : 685,
          target: baseProfile.avgBillValue,
          unit: '₹',
          trend: 'up',
          percentage: 5.2
        },
        {
          title: 'Cash Flow Ratio',
          current: 2.6,
          target: 2.0,
          unit: ':1',
          trend: 'up',
          percentage: 15.8
        }
      ],
      recentTransactions: [
        {
          id: 1,
          time: '14:30',
          type: 'sale',
          amount: type === 'small' ? 1250 : type === 'medium' ? 3500 : 12500,
          method: 'upi',
          customer: 'Rajesh Enterprises',
          items: type === 'small' ? 'Bulk grocery purchase' : type === 'medium' ? 'Electronics & accessories' : 'Wholesale order - Multiple items'
        },
        {
          id: 2,
          time: '13:15',
          type: 'expense',
          amount: type === 'small' ? 850 : type === 'medium' ? 4200 : 25000,
          method: 'bank',
          vendor: 'Supplier Payment',
          items: 'Inventory restocking'
        },
        {
          id: 3,
          time: '11:45',
          type: 'sale',
          amount: type === 'small' ? 650 : type === 'medium' ? 1800 : 8500,
          method: 'cash',
          customer: 'Walk-in Customer',
          items: type === 'small' ? 'Daily essentials' : type === 'medium' ? 'Home appliances' : 'Premium product purchase'
        }
      ],
      healthIndicators: [
        {
          metric: 'Liquidity Ratio',
          value: 3.2,
          status: 'excellent',
          description: 'Ability to meet short-term obligations'
        },
        {
          metric: 'Profit Margin',
          value: Math.round((netProfit / totalRevenue) * 100),
          status: (netProfit / totalRevenue) > 0.2 ? 'excellent' : (netProfit / totalRevenue) > 0.15 ? 'good' : 'average',
          description: 'Net profit as percentage of revenue'
        },
        {
          metric: 'Inventory Turnover',
          value: type === 'small' ? 8.2 : type === 'medium' ? 6.8 : 5.4,
          status: type === 'small' ? 'excellent' : 'good',
          description: 'How quickly inventory is sold'
        },
        {
          metric: 'Cash Conversion Cycle',
          value: type === 'small' ? 12 : type === 'medium' ? 18 : 25,
          status: type === 'small' ? 'excellent' : type === 'medium' ? 'good' : 'average',
          description: 'Days to convert inventory to cash'
        }
      ]
    };
  };

  // Load dashboard data
  useEffect(() => {
    loadDashboardData();
  }, [businessType, selectedPeriod]);

  const loadDashboardData = () => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      const data = generateDashboardData(businessType, selectedPeriod);
      setDashboardData(data);
      setLastUpdated(new Date());
      setIsLoading(false);
    }, 800);
  };

  const currentProfile = businessProfiles[businessType];
  const { 
    todayMetrics, 
    paymentBreakdown, 
    gstInfo, 
    kpis, 
    recentTransactions, 
    healthIndicators 
  } = dashboardData;

  const formatCurrency = (amount) => {
    if (!amount) return '₹0';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Handle export report
  const handleExportReport = () => {
    setIsLoading(true);
    
    // Simulate export process
    setTimeout(() => {
      const reportData = `
RETAIL FINANCE DASHBOARD REPORT
Generated: ${lastUpdated.toLocaleString()}
Business Type: ${currentProfile.name}
Period: ${selectedPeriod}

FINANCIAL SUMMARY:
Total Revenue: ${formatCurrency(todayMetrics?.totalRevenue)}
Total Expenses: ${formatCurrency(todayMetrics?.totalExpenses)}
Net Profit: ${formatCurrency(todayMetrics?.netProfit)}
Cash on Hand: ${formatCurrency(todayMetrics?.cashOnHand)}
UPI Balance: ${formatCurrency(todayMetrics?.upiBalance)}
Bank Balance: ${formatCurrency(todayMetrics?.bankBalance)}

PAYMENT METHODS:
Cash: ${paymentBreakdown?.cash}%
UPI: ${paymentBreakdown?.upi}%
Card: ${paymentBreakdown?.card}%

GST SUMMARY:
GST Collected: ${formatCurrency(gstInfo?.monthlyGSTCollected)}
GST Paid: ${formatCurrency(gstInfo?.monthlyGSTPaid)}
Net GST: ${formatCurrency((gstInfo?.monthlyGSTCollected || 0) - (gstInfo?.monthlyGSTPaid || 0))}

BUSINESS METRICS:
Daily Transactions: ${currentProfile.dailyTransactions}
Average Bill Value: ${formatCurrency(currentProfile.avgBillValue)}
Monthly Revenue: ${formatCurrency(currentProfile.monthlyRevenue)}
      `;
      
      const blob = new Blob([reportData], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `retail-dashboard-${businessType}-${selectedPeriod}-${Date.now()}.txt`;
      a.click();
      window.URL.revokeObjectURL(url);
      
      setIsLoading(false);
      alert('Report exported successfully!');
    }, 1500);
  };

  // Handle refresh data
  const handleRefreshData = () => {
    loadDashboardData();
    alert('Dashboard data refreshed!');
  };

  // Handle view all transactions
  const handleViewAllTransactions = () => {
    alert(`Showing all transactions for ${currentProfile.name} (${selectedPeriod})`);
    // In a real app, this would navigate to transactions page or show modal
  };

  // Handle business type change
  const handleBusinessTypeChange = (type) => {
    setBusinessType(type);
    // Data will automatically reload due to useEffect
  };

  // Handle period change
  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    // Data will automatically reload due to useEffect
  };

  // Handle KPI click for detailed view
  const handleKPIClick = (kpi) => {
    alert(`Detailed view for: ${kpi.title}\nCurrent: ${kpi.current}${kpi.unit}\nTarget: ${kpi.target}${kpi.unit}\nPerformance: ${kpi.percentage}% ${kpi.trend}`);
  };

  // Handle health indicator click
  const handleHealthIndicatorClick = (indicator) => {
    alert(`Health Indicator: ${indicator.metric}\nValue: ${indicator.value}\nStatus: ${indicator.status}\nDescription: ${indicator.description}`);
  };

  // Handle transaction click
  const handleTransactionClick = (transaction) => {
    alert(`Transaction Details:\nTime: ${transaction.time}\nType: ${transaction.type}\nAmount: ${formatCurrency(transaction.amount)}\nMethod: ${transaction.method}\n${transaction.customer ? 'Customer: ' + transaction.customer : 'Vendor: ' + transaction.vendor}\nItems: ${transaction.items}`);
  };

  // Handle GST summary click
  const handleGSTSummaryClick = () => {
    alert(`GST Filing Information:\nNext Filing Date: ${gstInfo?.nextFilingDate}\nGST Number: ${gstInfo?.gstNumber}\n\nNeed to file by ${gstInfo?.nextFilingDate}. Make sure all invoices are properly recorded.`);
  };

  if (!todayMetrics) {
    return (
      <div className={`p-6 min-h-screen flex items-center justify-center ${getThemeClass('bg-gray-50', 'bg-gray-900')}`}>
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-4" />
          <p className={getTextClass('secondary')}>Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-6 min-h-screen ${getThemeClass('bg-gray-50', 'bg-gray-900')}`}>
      {/* Header with Business Type Selector */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className={`text-2xl font-semibold ${getTextClass('primary')}`}>Retail Finance Dashboard</h1>
            <p className={getTextClass('secondary')}>Complete financial overview for {currentProfile.name}</p>
            <p className={`text-xs mt-1 ${getTextClass('muted')}`}>
              Last updated: {lastUpdated.toLocaleTimeString()} • 
              Period: {selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                theme === 'dark' 
                  ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Business Type Selector */}
            <select
              value={businessType}
              onChange={(e) => handleBusinessTypeChange(e.target.value)}
              disabled={isLoading}
              className={`border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 ${
                getInputClass()
              }`}
            >
              <option value="small">Small Shop (₹2.5L/month)</option>
              <option value="medium">Medium Store (₹12.5L/month)</option>
              <option value="large">Large Retail (₹55L/month)</option>
            </select>
            
            <select
              value={selectedPeriod}
              onChange={(e) => handlePeriodChange(e.target.value)}
              disabled={isLoading}
              className={`border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 ${
                getInputClass()
              }`}
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>

            <button 
              onClick={handleRefreshData}
              disabled={isLoading}
              className={`border px-3 py-2 rounded-lg flex items-center space-x-2 disabled:opacity-50 ${
                getThemeClass(
                  'bg-white border-gray-300 text-gray-700 hover:bg-gray-50',
                  'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600'
                )
              }`}
            >
              <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>
            
            <button 
              onClick={handleExportReport}
              disabled={isLoading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 disabled:opacity-50"
            >
              <Download size={16} />
              <span>{isLoading ? 'Exporting...' : 'Export Report'}</span>
            </button>
          </div>
        </div>

        {/* Business Profile Summary */}
        <div className={`rounded-lg shadow p-6 mb-6 ${getCardClass()} ${getBorderClass()}`}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-full ${
                getThemeClass('bg-blue-100', 'bg-blue-900/20')
              }`}>
                <Store className={`h-6 w-6 text-blue-600`} />
              </div>
              <div>
                <p className={`text-sm ${getTextClass('secondary')}`}>Business Type</p>
                <p className={`font-semibold ${getTextClass('primary')}`}>{currentProfile.name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-full ${
                getThemeClass('bg-green-100', 'bg-green-900/20')
              }`}>
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className={`text-sm ${getTextClass('secondary')}`}>Monthly Revenue</p>
                <p className={`font-semibold ${getTextClass('primary')}`}>{formatCurrency(currentProfile.monthlyRevenue)}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-full ${
                getThemeClass('bg-purple-100', 'bg-purple-900/20')
              }`}>
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className={`text-sm ${getTextClass('secondary')}`}>Daily Transactions</p>
                <p className={`font-semibold ${getTextClass('primary')}`}>{currentProfile.dailyTransactions}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-full ${
                getThemeClass('bg-orange-100', 'bg-orange-900/20')
              }`}>
                <Package className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className={`text-sm ${getTextClass('secondary')}`}>Avg Bill Value</p>
                <p className={`font-semibold ${getTextClass('primary')}`}>{formatCurrency(currentProfile.avgBillValue)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Financial Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className={`rounded-lg shadow p-6 ${getCardClass()} ${getBorderClass()}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${getTextClass('secondary')}`}>Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(todayMetrics.totalRevenue)}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+12.5% from yesterday</span>
                </div>
              </div>
              <div className={`p-3 rounded-full ${
                getThemeClass('bg-green-100', 'bg-green-900/20')
              }`}>
                <IndianRupee className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className={`rounded-lg shadow p-6 ${getCardClass()} ${getBorderClass()}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${getTextClass('secondary')}`}>Net Profit</p>
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(todayMetrics.netProfit)}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-blue-500 mr-1" />
                  <span className="text-sm text-blue-600">+8.3% margin</span>
                </div>
              </div>
              <div className={`p-3 rounded-full ${
                getThemeClass('bg-blue-100', 'bg-blue-900/20')
              }`}>
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className={`rounded-lg shadow p-6 ${getCardClass()} ${getBorderClass()}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${getTextClass('secondary')}`}>Cash + UPI</p>
                <p className="text-2xl font-bold text-purple-600">{formatCurrency(todayMetrics.cashOnHand + todayMetrics.upiBalance)}</p>
                <div className="flex items-center mt-2">
                  <Wallet className="h-4 w-4 text-purple-500 mr-1" />
                  <span className="text-sm text-purple-600">Liquid funds</span>
                </div>
              </div>
              <div className={`p-3 rounded-full ${
                getThemeClass('bg-purple-100', 'bg-purple-900/20')
              }`}>
                <Wallet className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className={`rounded-lg shadow p-6 ${getCardClass()} ${getBorderClass()}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${getTextClass('secondary')}`}>Bank Balance</p>
                <p className="text-2xl font-bold text-orange-600">{formatCurrency(todayMetrics.bankBalance)}</p>
                <div className="flex items-center mt-2">
                  <Building className="h-4 w-4 text-orange-500 mr-1" />
                  <span className="text-sm text-orange-600">Available balance</span>
                </div>
              </div>
              <div className={`p-3 rounded-full ${
                getThemeClass('bg-orange-100', 'bg-orange-900/20')
              }`}>
                <Building className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className={`lg:col-span-2 rounded-lg shadow p-6 ${getCardClass()} ${getBorderClass()}`}>
          <h3 className={`text-lg font-medium mb-4 ${getTextClass('primary')}`}>Payment Method Distribution</h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <Wallet className="h-5 w-5 text-green-500 mr-2" />
                  <span className={`text-sm font-medium ${getTextClass('primary')}`}>Cash</span>
                </div>
                <span className={`text-sm font-medium ${getTextClass('primary')}`}>{paymentBreakdown.cash}%</span>
              </div>
              <div className={`w-full rounded-full h-3 ${
                getThemeClass('bg-gray-200', 'bg-gray-700')
              }`}>
                <div className="bg-green-500 h-3 rounded-full" style={{ width: `${paymentBreakdown.cash}%` }}></div>
              </div>
              <p className={`text-xs mt-1 ${getTextClass('secondary')}`}>{formatCurrency(todayMetrics.cashOnHand)} collected today</p>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 text-blue-500 mr-2" />
                  <span className={`text-sm font-medium ${getTextClass('primary')}`}>UPI</span>
                </div>
                <span className={`text-sm font-medium ${getTextClass('primary')}`}>{paymentBreakdown.upi}%</span>
              </div>
              <div className={`w-full rounded-full h-3 ${
                getThemeClass('bg-gray-200', 'bg-gray-700')
              }`}>
                <div className="bg-blue-500 h-3 rounded-full" style={{ width: `${paymentBreakdown.upi}%` }}></div>
              </div>
              <p className={`text-xs mt-1 ${getTextClass('secondary')}`}>{formatCurrency(todayMetrics.upiBalance)} collected today</p>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 text-purple-500 mr-2" />
                  <span className={`text-sm font-medium ${getTextClass('primary')}`}>Card</span>
                </div>
                <span className={`text-sm font-medium ${getTextClass('primary')}`}>{paymentBreakdown.card}%</span>
              </div>
              <div className={`w-full rounded-full h-3 ${
                getThemeClass('bg-gray-200', 'bg-gray-700')
              }`}>
                <div className="bg-purple-500 h-3 rounded-full" style={{ width: `${paymentBreakdown.card}%` }}></div>
              </div>
              <p className={`text-xs mt-1 ${getTextClass('secondary')}`}>{formatCurrency((todayMetrics.totalRevenue * paymentBreakdown.card) / 100)} collected today</p>
            </div>
          </div>
        </div>

        {/* GST Summary */}
        <div className={`rounded-lg shadow p-6 ${getCardClass()} ${getBorderClass()}`}>
          <h3 className={`text-lg font-medium mb-4 ${getTextClass('primary')}`}>GST Summary</h3>
          
          <div className="space-y-4">
            <div 
              className={`rounded-lg p-4 cursor-pointer transition-colors ${
                getThemeClass('bg-green-50 hover:bg-green-100', 'bg-green-900/20 hover:bg-green-900/30')
              }`}
              onClick={handleGSTSummaryClick}
            >
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${getTextClass('primary')}`}>GST Collected</span>
                <span className="text-lg font-bold text-green-600">{formatCurrency(gstInfo.monthlyGSTCollected)}</span>
              </div>
              <p className={`text-xs mt-1 ${getTextClass('secondary')}`}>This month</p>
            </div>
            
            <div className={`rounded-lg p-4 ${
              getThemeClass('bg-red-50', 'bg-red-900/20')
            }`}>
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${getTextClass('primary')}`}>GST Paid</span>
                <span className="text-lg font-bold text-red-600">{formatCurrency(gstInfo.monthlyGSTPaid)}</span>
              </div>
              <p className={`text-xs mt-1 ${getTextClass('secondary')}`}>This month</p>
            </div>
            
            <div className={`rounded-lg p-4 ${
              getThemeClass('bg-blue-50', 'bg-blue-900/20')
            }`}>
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${getTextClass('primary')}`}>Net GST</span>
                <span className="text-lg font-bold text-blue-600">{formatCurrency(gstInfo.monthlyGSTCollected - gstInfo.monthlyGSTPaid)}</span>
              </div>
              <p className={`text-xs mt-1 ${getTextClass('secondary')}`}>To be filed</p>
            </div>
            
            <div className={`border-t pt-4 ${getBorderClass()}`}>
              <div className="flex items-center justify-between text-sm">
                <span className={getTextClass('secondary')}>GST Number:</span>
                <span className={`font-mono text-xs ${getTextClass('primary')}`}>{gstInfo.gstNumber}</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className={getTextClass('secondary')}>Next Filing:</span>
                <span className="font-medium text-orange-600">{gstInfo.nextFilingDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KPIs and Health Indicators */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* KPIs */}
        <div className={`rounded-lg shadow p-6 ${getCardClass()} ${getBorderClass()}`}>
          <h3 className={`text-lg font-medium mb-4 ${getTextClass('primary')}`}>Key Performance Indicators</h3>
          
          <div className="space-y-4">
            {kpis.map((kpi, index) => (
              <div 
                key={index} 
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                  getThemeClass('hover:bg-gray-50', 'hover:bg-gray-700')
                }`}
                onClick={() => handleKPIClick(kpi)}
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${getTextClass('primary')}`}>{kpi.title}</span>
                    <div className="flex items-center space-x-2">
                      {kpi.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                      <span className={`text-sm ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {kpi.percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`text-lg font-bold ${getTextClass('primary')}`}>{kpi.unit === '₹' ? formatCurrency(kpi.current) : `${kpi.current}${kpi.unit}`}</span>
                    <span className={`text-sm ${getTextClass('secondary')}`}>/ {kpi.unit === '₹' ? formatCurrency(kpi.target) : `${kpi.target}${kpi.unit}`}</span>
                  </div>
                  <div className={`w-full rounded-full h-2 mt-2 ${
                    getThemeClass('bg-gray-200', 'bg-gray-700')
                  }`}>
                    <div 
                      className={`h-2 rounded-full ${kpi.current >= kpi.target ? 'bg-green-500' : 'bg-blue-500'}`}
                      style={{ width: `${Math.min((kpi.current / kpi.target) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Health Indicators */}
        <div className={`rounded-lg shadow p-6 ${getCardClass()} ${getBorderClass()}`}>
          <h3 className={`text-lg font-medium mb-4 ${getTextClass('primary')}`}>Financial Health</h3>
          
          <div className="space-y-4">
            {healthIndicators.map((indicator, index) => (
              <div 
                key={index} 
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                  getThemeClass('hover:bg-gray-50', 'hover:bg-gray-700')
                }`}
                onClick={() => handleHealthIndicatorClick(indicator)}
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${getTextClass('primary')}`}>{indicator.metric}</span>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(indicator.status)}`}>
                      {indicator.status}
                    </div>
                  </div>
                  <p className={`text-lg font-bold mt-1 ${getTextClass('primary')}`}>{indicator.value}{indicator.metric.includes('Ratio') ? ':1' : indicator.metric.includes('Margin') ? '%' : indicator.metric.includes('Cycle') ? ' days' : ''}</p>
                  <p className={`text-xs ${getTextClass('secondary')}`}>{indicator.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className={`rounded-lg shadow p-6 ${getCardClass()} ${getBorderClass()}`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className={`text-lg font-medium ${getTextClass('primary')}`}>Recent High-Value Transactions</h3>
          <button 
            onClick={handleViewAllTransactions}
            className={getThemeClass(
              'text-blue-600 hover:text-blue-800',
              'text-blue-400 hover:text-blue-300'
            )}
          >
            View All
          </button>
        </div>
        
        <div className="space-y-3">
          {recentTransactions.map((transaction) => (
            <div 
              key={transaction.id} 
              className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors ${
                getThemeClass('bg-gray-50 hover:bg-gray-100', 'bg-gray-700 hover:bg-gray-600')
              }`}
              onClick={() => handleTransactionClick(transaction)}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${
                  transaction.type === 'sale' 
                    ? getThemeClass('bg-green-100', 'bg-green-900/20')
                    : getThemeClass('bg-red-100', 'bg-red-900/20')
                }`}>
                  {transaction.type === 'sale' ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  )}
                </div>
                <div>
                  <p className={`font-medium ${getTextClass('primary')}`}>{transaction.customer || transaction.vendor}</p>
                  <p className={`text-sm ${getTextClass('secondary')}`}>{transaction.items}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`text-xs ${getTextClass('muted')}`}>{transaction.time}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      getThemeClass('bg-gray-200 text-gray-700', 'bg-gray-600 text-gray-300')
                    }`}>
                      {transaction.method.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-lg font-bold ${transaction.type === 'sale' ? 'text-green-600' : 'text-red-600'}`}>
                  {transaction.type === 'sale' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RetailFinanceDashboard;