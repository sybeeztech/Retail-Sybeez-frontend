import React, { useState } from 'react';
import { 
  AlertTriangle, 
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  TrendingDown,
  TrendingUp,
  Package,
  DollarSign,
  Users,
  Zap,
  Bell,
  Filter,
  Search,
  Eye,
  Settings,
  IndianRupee,
  ShoppingCart,
  BarChart3
} from 'lucide-react';

const Alerts = () => {
  const [filterType, setFilterType] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock alerts data for Indian retail
  const alertsData = [
    {
      id: 1,
      type: 'inventory',
      priority: 'critical',
      title: 'Low Stock Alert: Basmati Rice 5kg',
      description: 'Only 12 units remaining. Expected to run out in 2 days based on current sales velocity.',
      timestamp: '2024-10-09T14:30:00Z',
      isRead: false,
      metrics: { current: 12, threshold: 50, impact: 'High' },
      recommendation: 'Reorder 200 units immediately to avoid stockout'
    },
    {
      id: 2,
      type: 'sales',
      priority: 'high',
      title: 'Sales Drop: Electronics Category',
      description: 'Electronics sales down 23% compared to last week. Possible impact from competitor promotion.',
      timestamp: '2024-10-09T12:15:00Z',
      isRead: false,
      metrics: { current: '₹45,000', previous: '₹58,500', change: '-23%' },
      recommendation: 'Launch counter-promotion or adjust pricing strategy'
    },
    {
      id: 3,
      type: 'customer',
      priority: 'medium',
      title: 'Customer Churn Risk Increase',
      description: '45 premium customers showing churn indicators based on reduced purchase frequency.',
      timestamp: '2024-10-09T10:45:00Z',
      isRead: true,
      metrics: { affected: 45, segment: 'Premium', riskLevel: '68%' },
      recommendation: 'Send personalized retention offers within 24 hours'
    },
    {
      id: 4,
      type: 'financial',
      priority: 'high',
      title: 'Payment Failure Rate Spike',
      description: 'UPI payment failures increased to 8.5% from usual 2.3%. System integration issue detected.',
      timestamp: '2024-10-09T09:20:00Z',
      isRead: false,
      metrics: { current: '8.5%', normal: '2.3%', transactions: 127 },
      recommendation: 'Contact payment gateway provider and offer alternative payment methods'
    },
    {
      id: 5,
      type: 'operational',
      priority: 'medium',
      title: 'Delivery Delay: Mumbai Zone',
      description: 'Average delivery time increased to 4.2 days due to monsoon-related logistics issues.',
      timestamp: '2024-10-09T08:10:00Z',
      isRead: true,
      metrics: { current: '4.2 days', target: '2.5 days', affected: '125 orders' },
      recommendation: 'Communicate proactively with customers and offer compensation'
    },
    {
      id: 6,
      type: 'performance',
      priority: 'low',
      title: 'Website Speed Decrease',
      description: 'Page load time increased to 3.8 seconds, may impact customer experience.',
      timestamp: '2024-10-08T18:30:00Z',
      isRead: true,
      metrics: { current: '3.8s', target: '2.0s', pages: 'Product listing' },
      recommendation: 'Optimize images and enable CDN for better performance'
    },
    {
      id: 7,
      type: 'opportunity',
      priority: 'medium',
      title: 'Festival Season Demand Surge',
      description: 'Diwali-related products showing 340% increase in search queries.',
      timestamp: '2024-10-08T16:45:00Z',
      isRead: false,
      metrics: { increase: '340%', category: 'Decorations & Lights', potential: '₹2.5L' },
      recommendation: 'Increase inventory and launch targeted marketing campaign'
    },
    {
      id: 8,
      type: 'inventory',
      priority: 'critical',
      title: 'Overstock Alert: Winter Clothing',
      description: 'Winter clothing inventory 85% above optimal levels with slow movement.',
      timestamp: '2024-10-08T14:20:00Z',
      isRead: true,
      metrics: { excess: '85%', value: '₹1.2L', category: 'Winter Wear' },
      recommendation: 'Launch clearance sale or bundle offers to reduce inventory'
    }
  ];

  const priorityConfig = {
    critical: { 
      color: 'text-red-600', 
      bgColor: 'bg-red-50', 
      borderColor: 'border-red-200',
      icon: XCircle,
      badge: 'bg-red-100 text-red-800'
    },
    high: { 
      color: 'text-orange-600', 
      bgColor: 'bg-orange-50', 
      borderColor: 'border-orange-200',
      icon: AlertTriangle,
      badge: 'bg-orange-100 text-orange-800'
    },
    medium: { 
      color: 'text-yellow-600', 
      bgColor: 'bg-yellow-50', 
      borderColor: 'border-yellow-200',
      icon: AlertCircle,
      badge: 'bg-yellow-100 text-yellow-800'
    },
    low: { 
      color: 'text-blue-600', 
      bgColor: 'bg-blue-50', 
      borderColor: 'border-blue-200',
      icon: CheckCircle,
      badge: 'bg-blue-100 text-blue-800'
    }
  };

  const typeConfig = {
    inventory: { icon: Package, color: 'text-green-600', label: 'Inventory' },
    sales: { icon: TrendingDown, color: 'text-red-600', label: 'Sales' },
    customer: { icon: Users, color: 'text-purple-600', label: 'Customer' },
    financial: { icon: DollarSign, color: 'text-indigo-600', label: 'Financial' },
    operational: { icon: Clock, color: 'text-orange-600', label: 'Operations' },
    performance: { icon: BarChart3, color: 'text-blue-600', label: 'Performance' },
    opportunity: { icon: TrendingUp, color: 'text-green-600', label: 'Opportunity' }
  };

  // Filter alerts
  const filteredAlerts = alertsData.filter(alert => {
    const typeMatch = filterType === 'all' || alert.type === filterType;
    const priorityMatch = filterPriority === 'all' || alert.priority === filterPriority;
    const searchMatch = searchTerm === '' || 
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return typeMatch && priorityMatch && searchMatch;
  });

  // Alert statistics
  const alertStats = {
    total: alertsData.length,
    unread: alertsData.filter(a => !a.isRead).length,
    critical: alertsData.filter(a => a.priority === 'critical').length,
    high: alertsData.filter(a => a.priority === 'high').length
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString('en-IN');
  };

  const markAsRead = (alertId) => {
    // In a real app, this would update the backend
    console.log(`Marking alert ${alertId} as read`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <AlertTriangle className="mr-3 h-6 w-6 text-orange-600" />
            AI Alerts & Notifications
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Real-time intelligent alerts for proactive business management
          </p>
        </div>
        
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center">
            <Settings className="h-4 w-4 mr-2" />
            Alert Settings
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center">
            <Bell className="h-4 w-4 mr-2" />
            Mark All Read
          </button>
        </div>
      </div>

      {/* Alert Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Alerts</p>
              <p className="text-2xl font-bold text-gray-900">{alertStats.total}</p>
            </div>
            <div className="p-3 bg-gray-100 rounded-full">
              <Bell className="h-6 w-6 text-gray-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Unread</p>
              <p className="text-2xl font-bold text-blue-600">{alertStats.unread}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Eye className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Critical</p>
              <p className="text-2xl font-bold text-red-600">{alertStats.critical}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">High Priority</p>
              <p className="text-2xl font-bold text-orange-600">{alertStats.high}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-600" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Types</option>
                <option value="inventory">Inventory</option>
                <option value="sales">Sales</option>
                <option value="customer">Customer</option>
                <option value="financial">Financial</option>
                <option value="operational">Operations</option>
                <option value="performance">Performance</option>
                <option value="opportunity">Opportunity</option>
              </select>
            </div>
            
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Priorities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search alerts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-64"
            />
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Alerts Found</h3>
            <p className="text-gray-500">No alerts match your current filters.</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const priorityStyle = priorityConfig[alert.priority];
            const typeStyle = typeConfig[alert.type];
            const PriorityIcon = priorityStyle.icon;
            const TypeIcon = typeStyle.icon;

            return (
              <div
                key={alert.id}
                className={`bg-white rounded-lg shadow border-l-4 ${priorityStyle.borderColor} ${
                  !alert.isRead ? 'ring-2 ring-blue-100' : ''
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className={`p-2 rounded-full ${priorityStyle.bgColor}`}>
                        <PriorityIcon className={`h-5 w-5 ${priorityStyle.color}`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${priorityStyle.badge}`}>
                            {alert.priority.charAt(0).toUpperCase() + alert.priority.slice(1)}
                          </span>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800`}>
                            <TypeIcon className={`h-3 w-3 mr-1 ${typeStyle.color}`} />
                            {typeStyle.label}
                          </span>
                          {!alert.isRead && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              New
                            </span>
                          )}
                        </div>
                        
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {alert.title}
                        </h3>
                        <p className="text-gray-600 mb-4">{alert.description}</p>
                        
                        {/* Metrics */}
                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Key Metrics</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {Object.entries(alert.metrics).map(([key, value]) => (
                              <div key={key} className="text-center">
                                <p className="text-xs text-gray-500 capitalize">{key}</p>
                                <p className="text-sm font-medium text-gray-900">{value}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Recommendation */}
                        <div className="bg-indigo-50 rounded-lg p-4">
                          <h4 className="text-sm font-medium text-indigo-900 mb-1 flex items-center">
                            <Zap className="h-4 w-4 mr-1" />
                            AI Recommendation
                          </h4>
                          <p className="text-sm text-indigo-800">{alert.recommendation}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end space-y-2 ml-4">
                      <span className="text-xs text-gray-500">{formatTimestamp(alert.timestamp)}</span>
                      {!alert.isRead && (
                        <button
                          onClick={() => markAsRead(alert.id)}
                          className="text-xs text-indigo-600 hover:text-indigo-800"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Zap className="h-5 w-5 text-indigo-600 mr-2" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-white rounded-lg p-4 text-left hover:shadow-md transition-shadow">
            <Package className="h-6 w-6 text-green-600 mb-2" />
            <h3 className="font-medium text-gray-900 mb-1">Inventory Management</h3>
            <p className="text-sm text-gray-600">Review and update stock levels</p>
          </button>
          <button className="bg-white rounded-lg p-4 text-left hover:shadow-md transition-shadow">
            <Users className="h-6 w-6 text-purple-600 mb-2" />
            <h3 className="font-medium text-gray-900 mb-1">Customer Retention</h3>
            <p className="text-sm text-gray-600">Launch retention campaigns</p>
          </button>
          <button className="bg-white rounded-lg p-4 text-left hover:shadow-md transition-shadow">
            <BarChart3 className="h-6 w-6 text-blue-600 mb-2" />
            <h3 className="font-medium text-gray-900 mb-1">Performance Analysis</h3>
            <p className="text-sm text-gray-600">Deep dive into metrics</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alerts;