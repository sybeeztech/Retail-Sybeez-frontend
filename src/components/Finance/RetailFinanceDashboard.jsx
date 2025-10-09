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
  Filter
} from 'lucide-react';

const RetailFinanceDashboard = () => {
  const [businessType, setBusinessType] = useState('small'); // small, medium, large
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [activeMetric, setActiveMetric] = useState('overview');

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

  const currentProfile = businessProfiles[businessType];

  // Real-time financial metrics
  const todayMetrics = {
    totalRevenue: businessType === 'small' ? 8320 : businessType === 'medium' ? 42150 : 185400,
    totalExpenses: businessType === 'small' ? 3200 : businessType === 'medium' ? 18500 : 89200,
    netProfit: businessType === 'small' ? 5120 : businessType === 'medium' ? 23650 : 96200,
    cashOnHand: businessType === 'small' ? 15600 : businessType === 'medium' ? 65000 : 320000,
    upiBalance: businessType === 'small' ? 24800 : businessType === 'medium' ? 145000 : 580000,
    bankBalance: businessType === 'small' ? 85000 : businessType === 'medium' ? 425000 : 2100000,
    pendingPayments: businessType === 'small' ? 2400 : businessType === 'medium' ? 15600 : 65000
  };

  // Payment method breakdown
  const paymentBreakdown = {
    cash: businessType === 'small' ? 45 : businessType === 'medium' ? 35 : 25,
    upi: businessType === 'small' ? 50 : businessType === 'medium' ? 55 : 60,
    card: businessType === 'small' ? 5 : businessType === 'medium' ? 10 : 15
  };

  // GST and Tax information
  const gstInfo = {
    monthlyGSTCollected: businessType === 'small' ? 12500 : businessType === 'medium' ? 62500 : 275000,
    monthlyGSTPaid: businessType === 'small' ? 8900 : businessType === 'medium' ? 45600 : 195000,
    nextFilingDate: '2024-11-20',
    gstNumber: businessType === 'small' ? '29ABCDE1234F1Z5' : businessType === 'medium' ? '29ABCDE5678F1Z5' : '29ABCDE9012F1Z5'
  };

  // Key Performance Indicators
  const kpis = [
    {
      title: 'Daily Revenue Target',
      current: todayMetrics.totalRevenue,
      target: currentProfile.monthlyRevenue / 30,
      unit: '₹',
      trend: 'up',
      percentage: 12.5
    },
    {
      title: 'Transaction Count',
      current: businessType === 'small' ? 42 : businessType === 'medium' ? 165 : 720,
      target: currentProfile.dailyTransactions,
      unit: '',
      trend: 'up',
      percentage: 8.3
    },
    {
      title: 'Average Bill Value',
      current: businessType === 'small' ? 198 : businessType === 'medium' ? 455 : 685,
      target: currentProfile.avgBillValue,
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
  ];

  // Recent high-value transactions
  const recentTransactions = [
    {
      id: 1,
      time: '14:30',
      type: 'sale',
      amount: businessType === 'small' ? 1250 : businessType === 'medium' ? 3500 : 12500,
      method: 'upi',
      customer: 'Rajesh Enterprises',
      items: businessType === 'small' ? 'Bulk grocery purchase' : businessType === 'medium' ? 'Electronics & accessories' : 'Wholesale order - Multiple items'
    },
    {
      id: 2,
      time: '13:15',
      type: 'expense',
      amount: businessType === 'small' ? 850 : businessType === 'medium' ? 4200 : 25000,
      method: 'bank',
      vendor: 'Supplier Payment',
      items: 'Inventory restocking'
    },
    {
      id: 3,
      time: '11:45',
      type: 'sale',
      amount: businessType === 'small' ? 650 : businessType === 'medium' ? 1800 : 8500,
      method: 'cash',
      customer: 'Walk-in Customer',
      items: businessType === 'small' ? 'Daily essentials' : businessType === 'medium' ? 'Home appliances' : 'Premium product purchase'
    }
  ];

  // Financial health indicators
  const healthIndicators = [
    {
      metric: 'Liquidity Ratio',
      value: 3.2,
      status: 'excellent',
      description: 'Ability to meet short-term obligations'
    },
    {
      metric: 'Profit Margin',
      value: businessType === 'small' ? 18.5 : businessType === 'medium' ? 22.3 : 25.8,
      status: 'good',
      description: 'Net profit as percentage of revenue'
    },
    {
      metric: 'Inventory Turnover',
      value: businessType === 'small' ? 8.2 : businessType === 'medium' ? 6.8 : 5.4,
      status: businessType === 'small' ? 'excellent' : 'good',
      description: 'How quickly inventory is sold'
    },
    {
      metric: 'Cash Conversion Cycle',
      value: businessType === 'small' ? 12 : businessType === 'medium' ? 18 : 25,
      status: businessType === 'small' ? 'excellent' : businessType === 'medium' ? 'good' : 'average',
      description: 'Days to convert inventory to cash'
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'average': return 'text-yellow-600 bg-yellow-100';
      case 'poor': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header with Business Type Selector */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Retail Finance Dashboard</h1>
            <p className="text-gray-600">Complete financial overview for {currentProfile.name}</p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Business Type Selector */}
            <select
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="small">Small Shop (₹2.5L/month)</option>
              <option value="medium">Medium Store (₹12.5L/month)</option>
              <option value="large">Large Retail (₹55L/month)</option>
            </select>
            
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>
            
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
              <Download size={16} />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Business Profile Summary */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-3 rounded-full">
                <Store className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Business Type</p>
                <p className="font-semibold">{currentProfile.name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Monthly Revenue</p>
                <p className="font-semibold">{formatCurrency(currentProfile.monthlyRevenue)}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Daily Transactions</p>
                <p className="font-semibold">{currentProfile.dailyTransactions}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="bg-orange-100 p-3 rounded-full">
                <Package className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg Bill Value</p>
                <p className="font-semibold">{formatCurrency(currentProfile.avgBillValue)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Financial Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(todayMetrics.totalRevenue)}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+12.5% from yesterday</span>
                </div>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <IndianRupee className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Net Profit</p>
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(todayMetrics.netProfit)}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-blue-500 mr-1" />
                  <span className="text-sm text-blue-600">+8.3% margin</span>
                </div>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cash + UPI</p>
                <p className="text-2xl font-bold text-purple-600">{formatCurrency(todayMetrics.cashOnHand + todayMetrics.upiBalance)}</p>
                <div className="flex items-center mt-2">
                  <Wallet className="h-4 w-4 text-purple-500 mr-1" />
                  <span className="text-sm text-purple-600">Liquid funds</span>
                </div>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Wallet className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Bank Balance</p>
                <p className="text-2xl font-bold text-orange-600">{formatCurrency(todayMetrics.bankBalance)}</p>
                <div className="flex items-center mt-2">
                  <Building className="h-4 w-4 text-orange-500 mr-1" />
                  <span className="text-sm text-orange-600">Available balance</span>
                </div>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <Building className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Method Distribution</h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <Wallet className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm font-medium">Cash</span>
                </div>
                <span className="text-sm font-medium">{paymentBreakdown.cash}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-green-500 h-3 rounded-full" style={{ width: `${paymentBreakdown.cash}%` }}></div>
              </div>
              <p className="text-xs text-gray-600 mt-1">{formatCurrency(todayMetrics.cashOnHand)} collected today</p>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-sm font-medium">UPI</span>
                </div>
                <span className="text-sm font-medium">{paymentBreakdown.upi}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-blue-500 h-3 rounded-full" style={{ width: `${paymentBreakdown.upi}%` }}></div>
              </div>
              <p className="text-xs text-gray-600 mt-1">{formatCurrency(todayMetrics.upiBalance)} collected today</p>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 text-purple-500 mr-2" />
                  <span className="text-sm font-medium">Card</span>
                </div>
                <span className="text-sm font-medium">{paymentBreakdown.card}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-purple-500 h-3 rounded-full" style={{ width: `${paymentBreakdown.card}%` }}></div>
              </div>
              <p className="text-xs text-gray-600 mt-1">{formatCurrency((todayMetrics.totalRevenue * paymentBreakdown.card) / 100)} collected today</p>
            </div>
          </div>
        </div>

        {/* GST Summary */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">GST Summary</h3>
          
          <div className="space-y-4">
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">GST Collected</span>
                <span className="text-lg font-bold text-green-600">{formatCurrency(gstInfo.monthlyGSTCollected)}</span>
              </div>
              <p className="text-xs text-gray-600 mt-1">This month</p>
            </div>
            
            <div className="bg-red-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">GST Paid</span>
                <span className="text-lg font-bold text-red-600">{formatCurrency(gstInfo.monthlyGSTPaid)}</span>
              </div>
              <p className="text-xs text-gray-600 mt-1">This month</p>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Net GST</span>
                <span className="text-lg font-bold text-blue-600">{formatCurrency(gstInfo.monthlyGSTCollected - gstInfo.monthlyGSTPaid)}</span>
              </div>
              <p className="text-xs text-gray-600 mt-1">To be filed</p>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">GST Number:</span>
                <span className="font-mono text-xs">{gstInfo.gstNumber}</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-gray-600">Next Filing:</span>
                <span className="font-medium text-orange-600">{gstInfo.nextFilingDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KPIs and Health Indicators */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* KPIs */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Key Performance Indicators</h3>
          
          <div className="space-y-4">
            {kpis.map((kpi, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{kpi.title}</span>
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
                    <span className="text-lg font-bold">{kpi.unit === '₹' ? formatCurrency(kpi.current) : `${kpi.current}${kpi.unit}`}</span>
                    <span className="text-sm text-gray-500">/ {kpi.unit === '₹' ? formatCurrency(kpi.target) : `${kpi.target}${kpi.unit}`}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
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
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Financial Health</h3>
          
          <div className="space-y-4">
            {healthIndicators.map((indicator, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{indicator.metric}</span>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(indicator.status)}`}>
                      {indicator.status}
                    </div>
                  </div>
                  <p className="text-lg font-bold mt-1">{indicator.value}{indicator.metric.includes('Ratio') ? ':1' : indicator.metric.includes('Margin') ? '%' : indicator.metric.includes('Cycle') ? ' days' : ''}</p>
                  <p className="text-xs text-gray-600">{indicator.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Recent High-Value Transactions</h3>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View All</button>
        </div>
        
        <div className="space-y-3">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${transaction.type === 'sale' ? 'bg-green-100' : 'bg-red-100'}`}>
                  {transaction.type === 'sale' ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{transaction.customer || transaction.vendor}</p>
                  <p className="text-sm text-gray-600">{transaction.items}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-gray-500">{transaction.time}</span>
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded">{transaction.method.toUpperCase()}</span>
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