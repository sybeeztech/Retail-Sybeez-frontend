import React, { useState, useEffect, useMemo, useCallback, memo, Suspense, lazy } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  Users,
  Package,
  Target,
  Calendar,
  Eye,
  Download,
  Filter,
  RefreshCw,
  Brain,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  Award,
  Activity,
  IndianRupee,
  Gift,
  Clock
} from 'lucide-react';

// Import custom hooks
import { 
  useAnalyticsData, 
  useUserPreferences, 
  usePerformanceMonitor,
  formatCurrency,
  formatNumber,
  formatPercentage,
  getTimeAgo,
  exportAnalyticsData
} from '../../hooks/useAnalytics';

// Lazy load heavy components
const AdvancedCharts = lazy(() => import('./AdvancedCharts'));
const AIInsightsPanel = lazy(() => import('./AIInsightsPanel'));

// Memoized components for better performance
const MetricCard = memo(({ title, value, change, trend, icon: Icon, color, onClick }) => (
  <div 
    className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200 cursor-pointer ${onClick ? 'hover:scale-105' : ''}`}
    onClick={onClick}
  >
    <div className="flex items-start justify-between">
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-600 truncate">{title}</p>
          <p className="text-2xl font-bold text-gray-900 truncate">{value}</p>
        </div>
      </div>
      <div className={`text-right flex-shrink-0 ml-2 ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
        <div className="flex items-center space-x-1">
          {trend === 'up' ? (
            <TrendingUp className="w-4 h-4 flex-shrink-0" />
          ) : trend === 'down' ? (
            <TrendingDown className="w-4 h-4 flex-shrink-0" />
          ) : null}
          <span className="text-sm font-medium whitespace-nowrap">{change}</span>
        </div>
      </div>
    </div>
  </div>
));

const QuickStat = memo(({ label, value, color = 'text-gray-900' }) => (
  <div className="flex justify-between items-center py-2">
    <span className="text-sm text-gray-600">{label}</span>
    <span className={`text-sm font-semibold ${color}`}>{value}</span>
  </div>
));

const RecommendationCard = memo(({ recommendation }) => {
  const { type, title, description, impact, effort } = recommendation;
  
  const getTypeConfig = (type) => {
    switch (type) {
      case 'urgent':
        return { bg: 'bg-red-50', border: 'border-red-200', icon: AlertTriangle, iconColor: 'text-red-600', textColor: 'text-red-800' };
      case 'opportunity':
        return { bg: 'bg-green-50', border: 'border-green-200', icon: Gift, iconColor: 'text-green-600', textColor: 'text-green-800' };
      default:
        return { bg: 'bg-blue-50', border: 'border-blue-200', icon: Lightbulb, iconColor: 'text-blue-600', textColor: 'text-blue-800' };
    }
  };

  const config = getTypeConfig(type);
  const IconComponent = config.icon;

  return (
    <div className={`p-4 rounded-lg border ${config.bg} ${config.border} hover:shadow-sm transition-shadow`}>
      <div className="flex items-start space-x-3">
        <IconComponent className={`w-5 h-5 mt-0.5 ${config.iconColor}`} />
        <div className="flex-1">
          <h4 className={`font-semibold ${config.textColor}`}>{title}</h4>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
          <div className="flex space-x-4 mt-2">
            <span className="text-xs font-medium text-gray-500">Impact: {impact}</span>
            <span className="text-xs font-medium text-gray-500">Effort: {effort}</span>
          </div>
        </div>
      </div>
    </div>
  );
});

const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
  </div>
);

const ErrorMessage = ({ message, onRetry }) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
    <div className="flex items-center space-x-2">
      <AlertTriangle className="w-5 h-5 text-red-600" />
      <p className="text-red-800 font-medium">Error</p>
    </div>
    <p className="text-red-600 text-sm mt-1">{message}</p>
    {onRetry && (
      <button 
        onClick={onRetry}
        className="mt-2 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
      >
        Retry
      </button>
    )}
  </div>
);

const BusinessAnalyticsOptimized = () => {
  const { preferences, updatePreference } = useUserPreferences();
  const performanceMetrics = usePerformanceMonitor();
  
  const [selectedMetric, setSelectedMetric] = useState('overview');
  
  const { 
    data: analyticsData, 
    loading, 
    error, 
    lastUpdated,
    computedMetrics,
    refetch 
  } = useAnalyticsData(preferences.dateRange, preferences.refreshInterval);

  // Memoized calculations
  const keyMetrics = useMemo(() => {
    if (!analyticsData) return [];
    
    return [
      {
        title: 'Total Revenue',
        value: formatCurrency(analyticsData.financial.totalRevenue),
        change: `+${(analyticsData.financial.revenueGrowth || 0).toFixed(1)}%`,
        trend: 'up',
        icon: DollarSign,
        color: 'bg-green-500'
      },
      {
        title: 'Active Customers',
        value: formatNumber(analyticsData.customers.activeCustomers),
        change: `+${analyticsData.customers.newCustomers} new`,
        trend: 'up',
        icon: Users,
        color: 'bg-blue-500'
      },
      {
        title: 'Inventory Value',
        value: formatCurrency(analyticsData.inventory.totalInventoryValue),
        change: `${analyticsData.inventory.lowStockItems} low stock`,
        trend: analyticsData.inventory.lowStockItems > 30 ? 'down' : 'up',
        icon: Package,
        color: 'bg-orange-500'
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
  }, [analyticsData]);

  const handleRefresh = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const handleExport = useCallback(() => {
    if (analyticsData) {
      exportAnalyticsData(analyticsData, 'json');
    }
  }, [analyticsData]);

  const handleDateRangeChange = useCallback((newRange) => {
    updatePreference('dateRange', newRange);
  }, [updatePreference]);

  const toggleAdvancedView = useCallback(() => {
    updatePreference('showAdvancedView', !preferences.showAdvancedView);
  }, [preferences.showAdvancedView, updatePreference]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <ErrorMessage message={error} onRetry={handleRefresh} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Brain className="mr-3 h-8 w-8 text-purple-600" />
                Business Analytics
                <div className="ml-3 flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-600 font-medium">LIVE</span>
                </div>
              </h1>
              <p className="text-gray-600 mt-1">Real-time AI-powered insights and comprehensive business intelligence</p>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={preferences.dateRange}
                onChange={(e) => handleDateRangeChange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
              <select
                value={preferences.refreshInterval}
                onChange={(e) => updatePreference('refreshInterval', parseInt(e.target.value))}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              >
                <option value={10000}>Real-time (10s)</option>
                <option value={30000}>Fast (30s)</option>
                <option value={60000}>Normal (1m)</option>
                <option value={300000}>Slow (5m)</option>
              </select>
              <div className="text-xs text-gray-500 flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>{lastUpdated && `${getTimeAgo(lastUpdated)}`}</span>
              </div>
              <button 
                onClick={handleRefresh}
                disabled={loading}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
              <button 
                onClick={handleExport}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {keyMetrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Financial Overview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <DollarSign className="mr-2 h-5 w-5 text-green-600" />
                Financial Performance
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <QuickStat label="Net Profit" value={formatCurrency(analyticsData.financial.netProfit)} color="text-green-600" />
                  <QuickStat label="Profit Margin" value={formatPercentage(analyticsData.financial.profitMargin)} />
                  <QuickStat label="Cash Flow" value={formatCurrency(analyticsData.financial.cashFlow)} color="text-blue-600" />
                </div>
                <div>
                  <QuickStat label="Total Expenses" value={formatCurrency(analyticsData.financial.expenses)} color="text-red-600" />
                  <QuickStat label="Monthly Recurring" value={formatCurrency(analyticsData.financial.monthlyRecurringRevenue)} color="text-purple-600" />
                </div>
              </div>
            </div>

            {/* Advanced Charts - Always Visible */}
            <Suspense fallback={<LoadingSpinner />}>
              <AdvancedCharts data={analyticsData} />
            </Suspense>
          </div>

          {/* AI Insights Sidebar */}
          <div className="space-y-6">
            {/* Performance Monitor (Development only) */}
            {process.env.NODE_ENV === 'development' && (
              <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-600">
                <div>Load: {performanceMetrics.loadTime.toFixed(1)}ms</div>
                <div>Render: {performanceMetrics.renderTime.toFixed(1)}ms</div>
                {performanceMetrics.memoryUsage > 0 && (
                  <div>Memory: {performanceMetrics.memoryUsage.toFixed(1)}MB</div>
                )}
              </div>
            )}
            {/* Health Score */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Activity className="mr-2 h-5 w-5 text-purple-600" />
                Business Health
              </h3>
              <div className="text-center">
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <svg className="w-20 h-20 transform -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-gray-200"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${(analyticsData.aiInsights.businessHealthScore / 100) * 226.19} 226.19`}
                      className="text-purple-600"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-purple-600">
                      {analyticsData.aiInsights.businessHealthScore}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Excellent Performance</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <QuickStat label="Employees Present" value={`${analyticsData.hr.presentToday}/${analyticsData.hr.totalEmployees}`} />
                <QuickStat label="Pipeline Value" value={formatCurrency(analyticsData.sales.pipelineValue)} color="text-blue-600" />
                <QuickStat label="Customer Satisfaction" value={`${analyticsData.customers.customerSatisfaction}/5.0`} color="text-green-600" />
                <QuickStat label="Conversion Rate" value={formatPercentage(analyticsData.sales.conversionRate)} />
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Lightbulb className="mr-2 h-5 w-5 text-yellow-600" />
                AI Recommendations
              </h3>
              <div className="space-y-3">
                {analyticsData.aiInsights.recommendations.map((rec, index) => (
                  <RecommendationCard key={index} recommendation={rec} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Status Indicator */}
        <div className="mt-8 flex justify-center">
          <div className="flex items-center space-x-4 bg-white rounded-lg shadow-sm border px-6 py-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">Real-time Analytics Active</span>
            </div>
            <div className="text-xs text-gray-500">
              {lastUpdated && `Last updated: ${getTimeAgo(lastUpdated)}`}
            </div>
            <div className="text-xs text-gray-500">
              Updates every 30 seconds
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessAnalyticsOptimized;