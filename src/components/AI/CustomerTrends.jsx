import React, { useState } from 'react';
import { 
  Users, 
  Target,
  Heart,
  ShoppingBag,
  TrendingUp,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  Calendar,
  Clock,
  MapPin,
  Star,
  Gift,
  IndianRupee,
  Smartphone,
  UserCheck,
  UserX
} from 'lucide-react';

const CustomerTrends = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [segmentFilter, setSegmentFilter] = useState('all');

  // Mock customer data for Indian retail
  const customerData = {
    totalCustomers: 15420,
    newCustomers: 1250,
    returningCustomers: 8940,
    churnRate: 12.5,
    avgLifetimeValue: 18500,
    avgOrderValue: 2340
  };

  const segmentData = [
    { 
      name: 'Premium Customers', 
      count: 2850, 
      percentage: 18.5, 
      avgSpend: 4500, 
      growth: 15.2,
      color: 'bg-purple-500',
      description: 'High-value customers with 5+ orders'
    },
    { 
      name: 'Regular Customers', 
      count: 7890, 
      percentage: 51.2, 
      avgSpend: 2100, 
      growth: 8.7,
      color: 'bg-blue-500',
      description: 'Consistent shoppers with 2-4 orders'
    },
    { 
      name: 'Occasional Buyers', 
      count: 3680, 
      percentage: 23.9, 
      avgSpend: 1200, 
      growth: -3.2,
      color: 'bg-green-500',
      description: 'Single or rare purchase customers'
    },
    { 
      name: 'New Customers', 
      count: 1000, 
      percentage: 6.4, 
      avgSpend: 1850, 
      growth: 22.1,
      color: 'bg-orange-500',
      description: 'First-time buyers in last 30 days'
    }
  ];

  const behaviorInsights = [
    {
      title: 'Peak Shopping Hours',
      value: '6:00 PM - 9:00 PM',
      trend: '+23%',
      icon: Clock,
      color: 'text-indigo-600',
      description: 'Evening hours show highest customer activity'
    },
    {
      title: 'Preferred Payment',
      value: 'UPI (67%)',
      trend: '+12%',
      icon: Smartphone,
      color: 'text-green-600',
      description: 'Digital payments dominate customer preference'
    },
    {
      title: 'Avg Session Duration',
      value: '12.5 minutes',
      trend: '+8%',
      icon: Target,
      color: 'text-purple-600',
      description: 'Customers spend more time browsing'
    },
    {
      title: 'Mobile Users',
      value: '78%',
      trend: '+15%',
      icon: Smartphone,
      color: 'text-blue-600',
      description: 'Mobile-first shopping behavior'
    }
  ];

  const demographicData = [
    { age: '18-25', percentage: 24, count: 3700, color: 'bg-pink-500' },
    { age: '26-35', percentage: 35, count: 5400, color: 'bg-blue-500' },
    { age: '36-45', percentage: 28, count: 4320, color: 'bg-green-500' },
    { age: '46+', percentage: 13, count: 2000, color: 'bg-orange-500' }
  ];

  const loyaltyMetrics = [
    { metric: 'Repeat Purchase Rate', value: '68%', change: '+5.2%', isPositive: true },
    { metric: 'Customer Retention', value: '72%', change: '+3.8%', isPositive: true },
    { metric: 'Churn Risk (High)', value: '15%', change: '-2.1%', isPositive: true },
    { metric: 'Satisfaction Score', value: '4.6/5', change: '+0.3', isPositive: true }
  ];

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
            <Users className="mr-3 h-6 w-6 text-indigo-600" />
            Customer Trends Analysis
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            AI-powered customer behavior insights and segmentation analysis
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
            value={segmentFilter}
            onChange={(e) => setSegmentFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Segments</option>
            <option value="premium">Premium</option>
            <option value="regular">Regular</option>
            <option value="new">New Customers</option>
          </select>
        </div>
      </div>

      {/* Key Customer Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Customers</p>
              <p className="text-2xl font-bold text-gray-900">
                {customerData.totalCustomers.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <ArrowUp className="h-4 w-4 text-green-600 mr-1" />
            <span className="text-sm font-medium text-green-600">8.5%</span>
            <span className="text-sm text-gray-500 ml-1">growth</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">New Customers</p>
              <p className="text-2xl font-bold text-gray-900">
                {customerData.newCustomers.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <UserCheck className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <ArrowUp className="h-4 w-4 text-green-600 mr-1" />
            <span className="text-sm font-medium text-green-600">12.3%</span>
            <span className="text-sm text-gray-500 ml-1">this month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Returning</p>
              <p className="text-2xl font-bold text-gray-900">
                {customerData.returningCustomers.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Heart className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <ArrowUp className="h-4 w-4 text-green-600 mr-1" />
            <span className="text-sm font-medium text-green-600">15.2%</span>
            <span className="text-sm text-gray-500 ml-1">loyalty</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Churn Rate</p>
              <p className="text-2xl font-bold text-gray-900">{customerData.churnRate}%</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <UserX className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <ArrowDown className="h-4 w-4 text-green-600 mr-1" />
            <span className="text-sm font-medium text-green-600">2.1%</span>
            <span className="text-sm text-gray-500 ml-1">improved</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Lifetime Value</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(customerData.avgLifetimeValue)}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <ArrowUp className="h-4 w-4 text-green-600 mr-1" />
            <span className="text-sm font-medium text-green-600">18.7%</span>
            <span className="text-sm text-gray-500 ml-1">growth</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Order</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(customerData.avgOrderValue)}
              </p>
            </div>
            <div className="p-3 bg-indigo-100 rounded-full">
              <ShoppingBag className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <ArrowUp className="h-4 w-4 text-green-600 mr-1" />
            <span className="text-sm font-medium text-green-600">5.8%</span>
            <span className="text-sm text-gray-500 ml-1">increase</span>
          </div>
        </div>
      </div>

      {/* Customer Segments */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Customer Segmentation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {segmentData.map((segment, index) => (
            <div key={segment.name} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-4 h-4 ${segment.color} rounded`}></div>
                <div className="flex items-center">
                  {segment.growth > 0 ? (
                    <ArrowUp className="h-3 w-3 text-green-600 mr-1" />
                  ) : (
                    <ArrowDown className="h-3 w-3 text-red-600 mr-1" />
                  )}
                  <span className={`text-xs font-medium ${
                    segment.growth > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {Math.abs(segment.growth)}%
                  </span>
                </div>
              </div>
              <h3 className="font-medium text-gray-900 mb-1">{segment.name}</h3>
              <p className="text-2xl font-bold text-gray-900 mb-1">
                {segment.count.toLocaleString('en-IN')}
              </p>
              <p className="text-sm text-gray-600 mb-2">{segment.percentage}% of total</p>
              <p className="text-sm font-medium text-gray-900">
                Avg: {formatCurrency(segment.avgSpend)}
              </p>
              <p className="text-xs text-gray-500 mt-2">{segment.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Behavior Insights */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Behavior Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {behaviorInsights.map((insight, index) => (
            <div key={insight.title} className="text-center">
              <div className="flex justify-center mb-3">
                <div className="p-3 bg-gray-100 rounded-full">
                  <insight.icon className={`h-6 w-6 ${insight.color}`} />
                </div>
              </div>
              <h3 className="font-medium text-gray-900 mb-1">{insight.title}</h3>
              <p className="text-xl font-bold text-gray-900 mb-1">{insight.value}</p>
              <div className="flex items-center justify-center mb-2">
                <ArrowUp className="h-3 w-3 text-green-600 mr-1" />
                <span className="text-sm font-medium text-green-600">{insight.trend}</span>
              </div>
              <p className="text-xs text-gray-500">{insight.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Age Demographics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Age Demographics</h2>
          <div className="space-y-4">
            {demographicData.map((demo, index) => (
              <div key={demo.age} className="flex items-center space-x-4">
                <div className={`w-4 h-4 ${demo.color} rounded`}></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{demo.age} years</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">
                        {demo.count.toLocaleString('en-IN')}
                      </span>
                      <span className="text-sm text-gray-600">({demo.percentage}%)</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${demo.color} h-2 rounded-full`}
                      style={{ width: `${demo.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Loyalty Metrics</h2>
          <div className="space-y-4">
            {loyaltyMetrics.map((metric, index) => (
              <div key={metric.metric} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">{metric.metric}</p>
                  <p className="text-lg font-bold text-gray-900">{metric.value}</p>
                </div>
                <div className="flex items-center">
                  {metric.isPositive ? (
                    <ArrowUp className="h-4 w-4 text-green-600 mr-1" />
                  ) : (
                    <ArrowDown className="h-4 w-4 text-red-600 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${
                    metric.isPositive ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Customer Insights */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Target className="h-5 w-5 text-indigo-600 mr-2" />
          AI Customer Insights & Recommendations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">High-Risk Churn Customers</h3>
            <p className="text-2xl font-bold text-red-600 mb-1">340 customers</p>
            <p className="text-sm text-gray-600">Send personalized offers to retain</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Upsell Opportunity</h3>
            <p className="text-2xl font-bold text-green-600 mb-1">1,250 customers</p>
            <p className="text-sm text-gray-600">Ready for premium product recommendations</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Best Time to Engage</h3>
            <p className="text-2xl font-bold text-purple-600 mb-1">6-8 PM</p>
            <p className="text-sm text-gray-600">Highest email open rates and responses</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerTrends;