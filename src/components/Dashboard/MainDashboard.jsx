import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Users, 
  Package, 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  ShoppingCart,
  UserCheck,
  PiggyBank,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  Activity,
  Briefcase,
  Globe
} from 'lucide-react';

function MainDashboard() {
  const [stats, setStats] = useState({
    totalEmployees: 25,
    presentToday: 22,
    onLeave: 2,
    pendingRequests: 5,
    totalOrders: 150,
    pendingOrders: 12,
    totalRevenue: 125000,
    monthlyExpenses: 45000,
  });

  useEffect(() => {
    // Simulate API call with actual data
    const fetchStats = async () => {
      try {
        // Using mock data for now
        setStats({
          totalEmployees: 25,
          presentToday: 22,
          onLeave: 2,
          pendingRequests: 5,
          totalOrders: 150,
          pendingOrders: 12,
          totalRevenue: 125000,
          monthlyExpenses: 45000,
        });
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      }
    };

    fetchStats();
  }, []);

  const moduleCards = [
    {
      title: 'Human Resources',
      description: 'Employee management, attendance, leave, and payroll',
      icon: Users,
      gradient: 'from-blue-500 to-blue-600',
      hoverGradient: 'from-blue-600 to-blue-700',
      link: '/hrm/dashboard',
      stats: [
        { label: 'Total Employees', value: stats.totalEmployees, trend: '+2.5%' },
        { label: 'Present Today', value: stats.presentToday, trend: '+5.2%' },
        { label: 'On Leave', value: stats.onLeave, trend: '-1.2%' },
      ]
    },
    {
      title: 'Supply Chain',
      description: 'Orders, inventory, suppliers, and delivery tracking',
      icon: Package,
      gradient: 'from-emerald-500 to-emerald-600',
      hoverGradient: 'from-emerald-600 to-emerald-700',
      link: '/erp/dashboard',
      stats: [
        { label: 'Total Orders', value: stats.totalOrders, trend: '+15.8%' },
        { label: 'Pending Orders', value: stats.pendingOrders, trend: '+8.3%' },
        { label: 'Active Suppliers', value: 15, trend: '+3.1%' },
      ]
    },
    {
      title: 'Finance',
      description: 'Income, expenses, invoicing, and financial reporting',
      icon: DollarSign,
      gradient: 'from-blue-600 to-indigo-600',
      hoverGradient: 'from-blue-700 to-indigo-700',
      link: '/finance/dashboard',
      stats: [
        { label: 'Monthly Revenue', value: `$${(stats.totalRevenue / 1000).toFixed(1)}k`, trend: '+12.5%' },
        { label: 'Monthly Expenses', value: `$${(stats.monthlyExpenses / 1000).toFixed(1)}k`, trend: '-3.2%' },
        { label: 'Profit Margin', value: '64%', trend: '+4.8%' },
      ]
    },
  ];

  const quickActions = [
    { 
      title: 'Apply for Leave', 
      icon: Calendar, 
      link: '/hrm/leave/apply', 
      color: 'from-blue-500 to-blue-600',
      description: 'Submit leave request'
    },
    { 
      title: 'Create Order', 
      icon: ShoppingCart, 
      link: '/erp/orders/new', 
      color: 'from-emerald-500 to-emerald-600',
      description: 'New purchase order'
    },
    { 
      title: 'Add Income', 
      icon: TrendingUp, 
      link: '/finance/income', 
      color: 'from-indigo-500 to-indigo-600',
      description: 'Record new income'
    },
    { 
      title: 'Check Attendance', 
      icon: Clock, 
      link: '/hrm/attendance/daily', 
      color: 'from-amber-500 to-amber-600',
      description: 'View attendance'
    },
  ];

  const recentActivities = [
    { 
      type: 'leave', 
      message: 'John Doe applied for sick leave', 
      time: '2 minutes ago',
      icon: Calendar,
      color: 'text-blue-500',
      bg: 'bg-blue-50'
    },
    { 
      type: 'order', 
      message: 'New order #ORD152 received from ABC Corp', 
      time: '15 minutes ago',
      icon: ShoppingCart,
      color: 'text-emerald-500',
      bg: 'bg-emerald-50'
    },
    { 
      type: 'finance', 
      message: 'Invoice #INV-001 has been paid', 
      time: '1 hour ago',
      icon: DollarSign,
      color: 'text-indigo-500',
      bg: 'bg-indigo-50'
    },
    { 
      type: 'attendance', 
      message: '23 employees marked present today', 
      time: '2 hours ago',
      icon: UserCheck,
      color: 'text-amber-500',
      bg: 'bg-amber-50'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="space-y-6 md:space-y-8">
        {/* Header */}
        <div className="relative overflow-hidden bg-white rounded-xl md:rounded-2xl shadow-xl border border-gray-100">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 opacity-90"></div>
          <div className="relative px-4 md:px-8 py-8 md:py-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-3">
                  Business Control Center
                </h1>
                <p className="text-blue-100 text-lg max-w-2xl">
                  Your comprehensive business management dashboard. Monitor performance, 
                  track metrics, and streamline operations across all departments.
                </p>
              </div>
              <div className="hidden lg:block">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Globe className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16"></div>
        </div>

        {/* Module Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {moduleCards.map((module, index) => (
            <div key={index} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl md:rounded-2xl blur-xl" 
                   style={{background: `linear-gradient(135deg, ${module.gradient.split(' ')[1]}, ${module.gradient.split(' ')[3]})`}}></div>
              <div className="relative bg-white rounded-xl md:rounded-2xl shadow-lg border border-gray-100 overflow-hidden group-hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1">
                {/* Header */}
                <div className={`bg-gradient-to-r ${module.gradient} p-6`}>
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                      <module.icon className="w-8 h-8 text-white" />
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-xl font-bold text-white">{module.title}</h3>
                    <p className="text-white/80 text-sm mt-1">{module.description}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="p-6 space-y-4">
                  {module.stats.map((stat, statIndex) => (
                    <div key={statIndex} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {stat.trend}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <div className="p-6 pt-0">
                  <NavLink
                    to={module.link}
                    className={`block w-full text-center py-3 px-6 bg-gradient-to-r ${module.gradient} text-white rounded-xl font-medium hover:${module.hoverGradient} transform transition-all duration-200 hover:scale-105 shadow-lg`}
                  >
                    Open {module.title}
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions & Recent Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-gray-100 p-4 md:p-6 lg:p-8">
            <div className="flex items-center mb-4 md:mb-6">
              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                <Activity className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
              </div>
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">Quick Actions</h2>
            </div>
            <div className="grid grid-cols-1 gap-3 md:gap-4">
              {quickActions.map((action, index) => (
                <NavLink
                  key={index}
                  to={action.link}
                  className="group relative overflow-hidden"
                >
                  <div className={`bg-gradient-to-br ${action.color} p-6 rounded-xl text-white transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-lg`}>
                    <div className="flex items-center justify-between mb-3">
                      <action.icon className="w-8 h-8" />
                      <ArrowUpRight className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h3 className="font-bold text-lg">{action.title}</h3>
                    <p className="text-white/80 text-sm mt-1">{action.description}</p>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg mr-3">
                  <Activity className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Recent Activities</h2>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start p-4 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className={`flex-shrink-0 p-2 ${activity.bg} rounded-lg mr-4`}>
                    <activity.icon className={`w-5 h-5 ${activity.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 font-medium">{activity.message}</p>
                    <p className="text-gray-500 text-sm mt-1">{activity.time}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System Status & Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* System Status */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="flex items-center mb-6">
              <div className="p-2 bg-green-100 rounded-lg mr-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">System Health</h2>
            </div>
            <div className="space-y-6">
              {[
                { name: 'HR Management System', status: 'Operational', uptime: '99.9%', color: 'green' },
                { name: 'Supply Chain System', status: 'Operational', uptime: '99.8%', color: 'green' },
                { name: 'Finance System', status: 'Operational', uptime: '99.7%', color: 'green' },
              ].map((system, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center">
                    <CheckCircle className={`w-5 h-5 text-${system.color}-500 mr-3`} />
                    <div>
                      <p className="font-medium text-gray-900">{system.name}</p>
                      <p className="text-sm text-gray-600">{system.status}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{system.uptime}</p>
                    <p className="text-sm text-gray-600">Uptime</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="flex items-center mb-6">
              <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                <BarChart3 className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Performance Overview</h2>
            </div>
            <div className="space-y-6">
              {[
                { metric: 'Employee Productivity', value: '94%', change: '+2.5%', trend: 'up' },
                { metric: 'Order Processing Speed', value: '2.3 min', change: '-15%', trend: 'up' },
                { metric: 'Customer Satisfaction', value: '4.8/5', change: '+0.2', trend: 'up' },
                { metric: 'System Response Time', value: '0.8s', change: '-20%', trend: 'up' },
              ].map((metric, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{metric.metric}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      {metric.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainDashboard;