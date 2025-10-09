import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  Users,
  Package,
  ShoppingCart,
  Target,
  Calendar,
  Clock,
  Eye,
  Download,
  Filter,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
  Activity,
  Zap,
  Award,
  AlertTriangle,
  CheckCircle,
  Globe,
  Building,
  CreditCard,
  Wallet,
  Receipt,
  UserCheck,
  Package2,
  Truck,
  Star,
  Phone,
  Mail,
  MapPin,
  Calculator,
  FileText,
  Settings,
  Brain,
  Lightbulb,
  Bot,
  MessageSquare,
  Cloud,
  IndianRupee,
  Gift
} from 'lucide-react';

const BusinessAnalytics = () => {
  const [dateRange, setDateRange] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [refreshing, setRefreshing] = useState(false);

  // Comprehensive business data
  const [analyticsData, setAnalyticsData] = useState({
    // Financial Analytics
    financial: {
      totalRevenue: 2850000,
      revenueGrowth: 18.5,
      netProfit: 485000,
      profitMargin: 17.02,
      expenses: 2365000,
      expenseGrowth: 12.3,
      cashFlow: 125000,
      upiRevenue: 1710000, // 60%
      cashRevenue: 1140000, // 40%
      gstCollected: 456000,
      gstPaid: 378000,
      outstandingInvoices: 245000,
      monthlyRecurringRevenue: 95000
    },
    
    // HR Analytics
    hr: {
      totalEmployees: 47,
      activeEmployees: 45,
      newHires: 8,
      attritionRate: 6.4,
      presentToday: 42,
      onLeave: 3,
      avgSalary: 65000,
      totalPayroll: 2925000,
      trainingHours: 385,
      performanceScore: 4.2,
      satisfactionScore: 4.1,
      pendingLeaves: 12,
      overtimeHours: 156,
      departments: {
        'Sales': 12,
        'Operations': 15,
        'Finance': 8,
        'HR': 5,
        'IT': 7
      }
    },
    
    // Sales & CRM Analytics
    sales: {
      totalLeads: 1250,
      convertedLeads: 287,
      conversionRate: 22.96,
      avgDealSize: 9930,
      totalDeals: 287,
      activePipeline: 156,
      pipelineValue: 1548680,
      customerAcquisitionCost: 2500,
      customerLifetimeValue: 35000,
      salesCycleLength: 18, // days
      topSalesperson: 'Rajesh Kumar',
      monthlyTargets: 2500000,
      achievedTargets: 2850000,
      winRate: 65.2,
      lostDeals: 89
    },
    
    // Customer Analytics
    customers: {
      totalCustomers: 1847,
      activeCustomers: 1623,
      newCustomers: 156,
      churnRate: 3.2,
      repeatCustomers: 1245,
      avgOrderValue: 1543,
      customerSatisfaction: 4.3,
      supportTickets: 89,
      resolvedTickets: 76,
      responseTime: 2.4, // hours
      topCustomer: 'Tech Solutions Ltd',
      customerSegments: {
        'Enterprise': 23,
        'SMB': 456,
        'Individual': 1368
      }
    },
    
    // Inventory & Operations
    inventory: {
      totalProducts: 2547,
      lowStockItems: 45,
      outOfStock: 12,
      totalInventoryValue: 4580000,
      fastMovingItems: 234,
      slowMovingItems: 89,
      avgTurnoverRate: 8.5,
      warehouseUtilization: 78.5,
      supplierPerformance: 4.1,
      qualityScore: 96.2,
      returnRate: 2.1,
      categories: {
        'Electronics': 856,
        'Clothing': 634,
        'Home & Garden': 423,
        'Books': 345,
        'Sports': 289
      }
    },
    
    // Digital Analytics
    digital: {
      websiteVisitors: 15678,
      uniqueVisitors: 12456,
      bounceRate: 35.2,
      avgSessionDuration: 4.2, // minutes
      conversionRate: 3.8,
      mobileTraffic: 62.5,
      organicTraffic: 45.3,
      paidTraffic: 28.7,
      socialTraffic: 26.0,
      emailOpenRate: 24.5,
      emailClickRate: 3.8,
      socialMediaFollowers: 8456,
      engagementRate: 5.2
    },

    // AI Insights & Predictions
    aiInsights: {
      businessHealthScore: 87,
      businessHealthTrend: 'up',
      salesPrediction: {
        nextWeek: 185000,
        nextMonth: 725000,
        confidence: 89
      },
      customerInsights: {
        churnRisk: 15,
        loyaltyScore: 78,
        segmentGrowth: {
          'Premium': 31,
          'Regular': 15,
          'Occasional': 8
        }
      },
      inventoryOptimization: {
        overstockReduction: 25000,
        stockoutPrevention: 45000,
        optimalStockLevel: 92
      },
      marketingEfficiency: {
        bestChannel: 'WhatsApp Business',
        channelROI: 785,
        campaignSuccess: 89
      },
      recommendations: [
        {
          type: 'urgent',
          title: 'Stock Alert: LED Bulbs',
          description: 'Reorder LED Bulbs 9W - Only 3 days stock left',
          impact: 'High',
          action: 'Reorder immediately'
        },
        {
          type: 'opportunity',
          title: 'Festival Marketing',
          description: 'Diwali campaign can boost sales by 120%',
          impact: 'Very High',
          action: 'Launch campaign in 5 days'
        },
        {
          type: 'optimization',
          title: 'Price Adjustment',
          description: 'Increase Cooking Oil price by ₹4 - competitors pricing higher',
          impact: 'Medium',
          action: 'Implement pricing change'
        }
      ],
      weatherImpact: {
        forecast: 'Light rain expected',
        salesImpact: '+18%',
        recommendations: ['Stock umbrellas', 'Promote delivery']
      }
    }
  });

  // Performance metrics comparison
  const performanceMetrics = [
    {
      category: 'Revenue',
      current: analyticsData.financial.totalRevenue,
      target: 2500000,
      achievement: ((analyticsData.financial.totalRevenue / 2500000) * 100).toFixed(1),
      trend: 'up',
      change: analyticsData.financial.revenueGrowth
    },
    {
      category: 'Profit Margin',
      current: analyticsData.financial.profitMargin,
      target: 15.0,
      achievement: ((analyticsData.financial.profitMargin / 15.0) * 100).toFixed(1),
      trend: 'up',
      change: 2.8
    },
    {
      category: 'Customer Satisfaction',
      current: analyticsData.customers.customerSatisfaction,
      target: 4.0,
      achievement: ((analyticsData.customers.customerSatisfaction / 4.0) * 100).toFixed(1),
      trend: 'up',
      change: 5.2
    },
    {
      category: 'Sales Conversion',
      current: analyticsData.sales.conversionRate,
      target: 20.0,
      achievement: ((analyticsData.sales.conversionRate / 20.0) * 100).toFixed(1),
      trend: 'up',
      change: 4.3
    },
    {
      category: 'Employee Satisfaction',
      current: analyticsData.hr.satisfactionScore,
      target: 4.0,
      achievement: ((analyticsData.hr.satisfactionScore / 4.0) * 100).toFixed(1),
      trend: 'stable',
      change: 0.8
    },
    {
      category: 'Inventory Turnover',
      current: analyticsData.inventory.avgTurnoverRate,
      target: 8.0,
      achievement: ((analyticsData.inventory.avgTurnoverRate / 8.0) * 100).toFixed(1),
      trend: 'up',
      change: 6.2
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  const formatPercentage = (num) => {
    return `${num.toFixed(1)}%`;
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <ArrowUpRight className="w-4 h-4 text-green-600" />;
      case 'down':
        return <ArrowDownRight className="w-4 h-4 text-red-600" />;
      default:
        return <Activity className="w-4 h-4 text-blue-600" />;
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-blue-600';
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const keyMetrics = [
    {
      title: 'Total Revenue',
      value: formatCurrency(analyticsData.financial.totalRevenue),
      change: `+${analyticsData.financial.revenueGrowth}%`,
      trend: 'up',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      title: 'Active Customers',
      value: formatNumber(analyticsData.customers.activeCustomers),
      change: `+${((analyticsData.customers.newCustomers / analyticsData.customers.totalCustomers) * 100).toFixed(1)}%`,
      trend: 'up',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Employees',
      value: formatNumber(analyticsData.hr.totalEmployees),
      change: `+${((analyticsData.hr.newHires / analyticsData.hr.totalEmployees) * 100).toFixed(1)}%`,
      trend: 'up',
      icon: UserCheck,
      color: 'bg-purple-500'
    },
    {
      title: 'Inventory Value',
      value: formatCurrency(analyticsData.inventory.totalInventoryValue),
      change: '+12.5%',
      trend: 'up',
      icon: Package,
      color: 'bg-orange-500'
    },
    {
      title: 'Net Profit',
      value: formatCurrency(analyticsData.financial.netProfit),
      change: `+${((analyticsData.financial.netProfit / analyticsData.financial.totalRevenue) * 100).toFixed(1)}%`,
      trend: 'up',
      icon: TrendingUp,
      color: 'bg-emerald-500'
    },
    {
      title: 'AI Health Score',
      value: `${analyticsData.aiInsights.businessHealthScore}/100`,
      change: 'Excellent',
      trend: analyticsData.aiInsights.businessHealthTrend,
      icon: Brain,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Brain className="mr-3 h-8 w-8 text-purple-600" />
                AI Business Analytics
              </h1>
              <p className="text-gray-600">AI-powered insights and comprehensive analytics across all business operations</p>
            </div>
            <div className="flex space-x-3">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
              <button 
                onClick={handleRefresh}
                disabled={refreshing}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2">
                <Download size={16} />
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          {keyMetrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${metric.color} mr-4`}>
                  <metric.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{metric.title}</p>
                  <p className="text-xl font-bold text-gray-900">{metric.value}</p>
                  <p className={`text-sm flex items-center ${getTrendColor(metric.trend)}`}>
                    {getTrendIcon(metric.trend)}
                    <span className="ml-1">{metric.change}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Business Insights Section */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center">
                <Brain className="mr-3 h-8 w-8" />
                AI Business Health Score
              </h2>
              <div className="flex items-center space-x-4">
                <span className="text-5xl font-bold">{analyticsData.aiInsights.businessHealthScore}/100</span>
                <div className="flex items-center space-x-2">
                  {getTrendIcon(analyticsData.aiInsights.businessHealthTrend)}
                  <span className="text-purple-100">Excellent Performance</span>
                </div>
              </div>
              <p className="text-purple-100 mt-2">Your business is performing exceptionally well across all key metrics</p>
            </div>
            <div className="text-purple-200">
              <Bot className="h-20 w-20" />
            </div>
          </div>
        </div>

        {/* AI Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Sales Prediction */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">AI Sales Prediction</h3>
                <p className="text-sm text-gray-500">Next Week Forecast</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-2xl font-bold text-green-600">
                  ₹{analyticsData.aiInsights.salesPrediction.nextWeek.toLocaleString('en-IN')}
                </p>
                <p className="text-sm text-gray-600">
                  {analyticsData.aiInsights.salesPrediction.confidence}% confidence
                </p>
              </div>
              <div className="bg-green-50 rounded p-3">
                <p className="text-sm text-green-800">
                  <Lightbulb className="h-4 w-4 inline mr-1" />
                  Festival season driving 45% increase expected
                </p>
              </div>
            </div>
          </div>

          {/* Customer Intelligence */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Customer Intelligence</h3>
                <p className="text-sm text-gray-500">AI Analysis</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Churn Risk</span>
                <span className="text-lg font-bold text-red-600">{analyticsData.aiInsights.customerInsights.churnRisk}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Loyalty Score</span>
                <span className="text-lg font-bold text-green-600">{analyticsData.aiInsights.customerInsights.loyaltyScore}/100</span>
              </div>
              <div className="bg-blue-50 rounded p-3">
                <p className="text-sm text-blue-800">Premium segment growing at 31%</p>
              </div>
            </div>
          </div>

          {/* Weather Impact */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Cloud className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Weather Impact</h3>
                <p className="text-sm text-gray-500">{analyticsData.aiInsights.weatherImpact.forecast}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xl font-bold text-blue-600">
                  {analyticsData.aiInsights.weatherImpact.salesImpact} sales boost
                </p>
                <p className="text-sm text-gray-600">Expected impact on sales</p>
              </div>
              <div className="space-y-1">
                {analyticsData.aiInsights.weatherImpact.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Lightbulb className="h-3 w-3 text-yellow-500" />
                    <span className="text-xs text-gray-600">{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <Brain className="mr-3 h-6 w-6 text-purple-600" />
            AI Recommendations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {analyticsData.aiInsights.recommendations.map((rec, index) => (
              <div key={index} className={`border rounded-lg p-4 ${
                rec.type === 'urgent' ? 'border-red-200 bg-red-50' :
                rec.type === 'opportunity' ? 'border-green-200 bg-green-50' :
                'border-blue-200 bg-blue-50'
              }`}>
                <div className="flex items-center space-x-2 mb-2">
                  {rec.type === 'urgent' ? 
                    <AlertTriangle className="h-5 w-5 text-red-600" /> :
                    rec.type === 'opportunity' ?
                    <Gift className="h-5 w-5 text-green-600" /> :
                    <Lightbulb className="h-5 w-5 text-blue-600" />
                  }
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    rec.type === 'urgent' ? 'bg-red-100 text-red-800' :
                    rec.type === 'opportunity' ? 'bg-green-100 text-green-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {rec.type.toUpperCase()}
                  </span>
                </div>
                <h4 className="font-medium text-gray-900 mb-1">{rec.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Impact: {rec.impact}</span>
                  <button className={`px-3 py-1 rounded text-xs font-medium ${
                    rec.type === 'urgent' ? 'bg-red-600 text-white hover:bg-red-700' :
                    rec.type === 'opportunity' ? 'bg-green-600 text-white hover:bg-green-700' :
                    'bg-blue-600 text-white hover:bg-blue-700'
                  }`}>
                    {rec.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Performance Metrics */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Performance vs Targets</h2>
            <div className="space-y-4">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">{metric.category}</span>
                    <div className="flex items-center space-x-2">
                      {getTrendIcon(metric.trend)}
                      <span className={`text-sm font-medium ${getTrendColor(metric.trend)}`}>
                        {metric.achievement}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        parseFloat(metric.achievement) >= 100 ? 'bg-green-500' : 
                        parseFloat(metric.achievement) >= 80 ? 'bg-blue-500' : 
                        parseFloat(metric.achievement) >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min(parseFloat(metric.achievement), 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Current: {typeof metric.current === 'number' && metric.current > 1000 
                      ? formatCurrency(metric.current) 
                      : metric.current.toFixed(1)}</span>
                    <span>Target: {typeof metric.target === 'number' && metric.target > 1000 
                      ? formatCurrency(metric.target) 
                      : metric.target.toFixed(1)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Breakdown */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Revenue Analysis</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                <div className="flex items-center">
                  <CreditCard className="w-6 h-6 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">UPI Payments</p>
                    <p className="text-sm text-gray-600">60% of total revenue</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-green-600">
                    {formatCurrency(analyticsData.financial.upiRevenue)}
                  </p>
                  <p className="text-sm text-green-600">+22.3%</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                <div className="flex items-center">
                  <Wallet className="w-6 h-6 text-green-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Cash Payments</p>
                    <p className="text-sm text-gray-600">40% of total revenue</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-blue-600">
                    {formatCurrency(analyticsData.financial.cashRevenue)}
                  </p>
                  <p className="text-sm text-blue-600">+12.8%</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">{formatPercentage(analyticsData.financial.profitMargin)}</p>
                  <p className="text-sm text-gray-600">Profit Margin</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(analyticsData.financial.monthlyRecurringRevenue)}</p>
                  <p className="text-sm text-gray-600">Monthly Recurring</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Departmental Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* HR Analytics */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">HR Analytics</h2>
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Present Today</span>
                <span className="font-medium">{analyticsData.hr.presentToday}/{analyticsData.hr.totalEmployees}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Attrition Rate</span>
                <span className="font-medium text-green-600">{formatPercentage(analyticsData.hr.attritionRate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg Performance</span>
                <span className="font-medium">{analyticsData.hr.performanceScore}/5.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Training Hours</span>
                <span className="font-medium">{analyticsData.hr.trainingHours}h</span>
              </div>
              <div className="pt-2 border-t">
                <p className="text-sm text-gray-600 mb-2">Department Distribution</p>
                {Object.entries(analyticsData.hr.departments).map(([dept, count]) => (
                  <div key={dept} className="flex justify-between text-sm">
                    <span>{dept}</span>
                    <span>{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sales Analytics */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Sales Analytics</h2>
              <Target className="w-5 h-5 text-green-600" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Conversion Rate</span>
                <span className="font-medium text-green-600">{formatPercentage(analyticsData.sales.conversionRate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Win Rate</span>
                <span className="font-medium">{formatPercentage(analyticsData.sales.winRate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg Deal Size</span>
                <span className="font-medium">{formatCurrency(analyticsData.sales.avgDealSize)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pipeline Value</span>
                <span className="font-medium">{formatCurrency(analyticsData.sales.pipelineValue)}</span>
              </div>
              <div className="pt-2 border-t">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-lg font-bold text-green-600">
                    {formatPercentage((analyticsData.sales.achievedTargets / analyticsData.sales.monthlyTargets) * 100)}
                  </p>
                  <p className="text-sm text-gray-600">Target Achievement</p>
                </div>
              </div>
            </div>
          </div>

          {/* Inventory Analytics */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Inventory Analytics</h2>
              <Package className="w-5 h-5 text-orange-600" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Products</span>
                <span className="font-medium">{formatNumber(analyticsData.inventory.totalProducts)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Low Stock</span>
                <span className="font-medium text-orange-600">{analyticsData.inventory.lowStockItems}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Out of Stock</span>
                <span className="font-medium text-red-600">{analyticsData.inventory.outOfStock}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Turnover Rate</span>
                <span className="font-medium">{analyticsData.inventory.avgTurnoverRate}x</span>
              </div>
              <div className="pt-2 border-t">
                <p className="text-sm text-gray-600 mb-2">Top Categories</p>
                {Object.entries(analyticsData.inventory.categories).slice(0, 3).map(([category, count]) => (
                  <div key={category} className="flex justify-between text-sm">
                    <span>{category}</span>
                    <span>{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Customer & Digital Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Customer Analytics */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Customer Analytics</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{formatNumber(analyticsData.customers.totalCustomers)}</p>
                <p className="text-sm text-gray-600">Total Customers</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{formatPercentage(100 - analyticsData.customers.churnRate)}</p>
                <p className="text-sm text-gray-600">Retention Rate</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Average Order Value</span>
                <span className="font-medium">{formatCurrency(analyticsData.customers.avgOrderValue)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Customer Satisfaction</span>
                <span className="font-medium">{analyticsData.customers.customerSatisfaction}/5.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Support Response Time</span>
                <span className="font-medium">{analyticsData.customers.responseTime}h</span>
              </div>
              <div className="pt-2 border-t">
                <p className="text-sm text-gray-600 mb-2">Customer Segments</p>
                {Object.entries(analyticsData.customers.customerSegments).map(([segment, count]) => (
                  <div key={segment} className="flex justify-between text-sm">
                    <span>{segment}</span>
                    <span>{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Digital Analytics */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Digital Analytics</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">{formatNumber(analyticsData.digital.websiteVisitors)}</p>
                <p className="text-sm text-gray-600">Website Visitors</p>
              </div>
              <div className="text-center p-4 bg-cyan-50 rounded-lg">
                <p className="text-2xl font-bold text-cyan-600">{formatPercentage(analyticsData.digital.conversionRate)}</p>
                <p className="text-sm text-gray-600">Conversion Rate</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Bounce Rate</span>
                <span className="font-medium">{formatPercentage(analyticsData.digital.bounceRate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Mobile Traffic</span>
                <span className="font-medium">{formatPercentage(analyticsData.digital.mobileTraffic)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email Open Rate</span>
                <span className="font-medium">{formatPercentage(analyticsData.digital.emailOpenRate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Social Followers</span>
                <span className="font-medium">{formatNumber(analyticsData.digital.socialMediaFollowers)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Items & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Key Insights */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Key Insights</h2>
            <div className="space-y-4">
              <div className="flex items-start p-3 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-green-800">Revenue target exceeded</p>
                  <p className="text-sm text-green-600">Monthly revenue is 14% above target</p>
                </div>
              </div>
              <div className="flex items-start p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <TrendingUp className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-800">Customer satisfaction improving</p>
                  <p className="text-sm text-blue-600">Up by 5.2% compared to last month</p>
                </div>
              </div>
              <div className="flex items-start p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <Award className="w-5 h-5 text-purple-600 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-purple-800">Top performing department</p>
                  <p className="text-sm text-purple-600">Sales team exceeded targets by 114%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Items */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Action Items</h2>
            <div className="space-y-4">
              <div className="flex items-start p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-orange-600 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-orange-800">Inventory Alert</p>
                  <p className="text-sm text-orange-600">45 items are running low on stock</p>
                </div>
              </div>
              <div className="flex items-start p-3 bg-red-50 border border-red-200 rounded-lg">
                <Clock className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-red-800">Overdue Invoices</p>
                  <p className="text-sm text-red-600">{formatCurrency(analyticsData.financial.outstandingInvoices)} in outstanding payments</p>
                </div>
              </div>
              <div className="flex items-start p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <Users className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-yellow-800">HR Review Required</p>
                  <p className="text-sm text-yellow-600">{analyticsData.hr.pendingLeaves} leave requests pending approval</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessAnalytics;