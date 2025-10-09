import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Download, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  IndianRupee,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  Star,
  UserPlus,
  FileText,
  Activity,
  ShoppingCart,
  Package,
  Truck,
  CreditCard,
  Smartphone,
  Store,
  Home,
  Building2,
  TrendingUp,
  Target,
  Gift,
  Percent,
  Clock,
  AlertCircle,
  CheckCircle,
  MessageSquare,
  Bell
} from 'lucide-react';

const IndianRetailCRM = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@gmail.com',
      phone: '+91 98765 43210',
      whatsapp: '+91 98765 43210',
      company: 'Kumar General Store',
      location: 'Connaught Place, New Delhi',
      address: 'Shop No. 45, Block A, Connaught Place, New Delhi - 110001',
      pincode: '110001',
      state: 'Delhi',
      gst: 'GSTIN07ABCDE1234F1Z5',
      businessType: 'General Store',
      value: 285000,
      lastPurchase: 125000,
      totalOrders: 24,
      status: 'VIP Customer',
      lastContact: '2024-10-07',
      joiningDate: '2023-05-15',
      source: 'Walk-in',
      tags: ['VIP', 'High Value', 'Regular'],
      paymentMethods: ['Cash', 'UPI', 'Card'],
      preferredPayment: 'UPI',
      creditLimit: 50000,
      outstandingAmount: 15000,
      loyaltyPoints: 2850,
      segment: 'Premium',
      language: 'Hindi',
      avatar: null,
      birthday: '1975-08-20',
      anniversary: '2000-12-10',
      family: {
        spouse: 'Sunita Kumar',
        children: 2
      },
      preferences: {
        categories: ['Groceries', 'Home Care', 'Personal Care'],
        brands: ['Patanjali', 'ITC', 'Hindustan Unilever'],
        offers: 'Festival Discounts'
      }
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya.sharma@hotmail.com',
      phone: '+91 87654 32109',
      whatsapp: '+91 87654 32109',
      company: 'Sharma Kirana Store',
      location: 'Lajpat Nagar, New Delhi',
      address: 'Shop No. 12, Main Market, Lajpat Nagar IV, New Delhi - 110024',
      pincode: '110024',
      state: 'Delhi',
      gst: 'GSTIN07FGHIJ5678K2L6',
      businessType: 'Kirana Store',
      value: 150000,
      lastPurchase: 45000,
      totalOrders: 18,
      status: 'Regular Customer',
      lastContact: '2024-10-06',
      joiningDate: '2023-08-22',
      source: 'Referral',
      tags: ['Regular', 'Local'],
      paymentMethods: ['Cash', 'UPI'],
      preferredPayment: 'Cash',
      creditLimit: 25000,
      outstandingAmount: 8000,
      loyaltyPoints: 1500,
      segment: 'Standard',
      language: 'English',
      avatar: null,
      birthday: '1982-03-15',
      preferences: {
        categories: ['Groceries', 'Snacks', 'Beverages'],
        brands: ['Amul', 'Britannia', 'Parle'],
        offers: 'Bulk Discounts'
      }
    },
    {
      id: 3,
      name: 'Mohammed Ali',
      email: 'mohammed.ali@yahoo.com',
      phone: '+91 76543 21098',
      whatsapp: '+91 76543 21098',
      company: 'Ali Super Market',
      location: 'Chandni Chowk, Delhi',
      address: '23, Chandni Chowk, Old Delhi - 110006',
      pincode: '110006',
      state: 'Delhi',
      gst: 'GSTIN07KLMNO9012P3Q7',
      businessType: 'Super Market',
      value: 425000,
      lastPurchase: 185000,
      totalOrders: 32,
      status: 'Premium Customer',
      lastContact: '2024-10-08',
      joiningDate: '2022-12-10',
      source: 'Direct',
      tags: ['Premium', 'Bulk Buyer', 'Long-term'],
      paymentMethods: ['Cash', 'UPI', 'Card', 'Credit'],
      preferredPayment: 'UPI',
      creditLimit: 100000,
      outstandingAmount: 25000,
      loyaltyPoints: 4250,
      segment: 'Premium',
      language: 'Hindi',
      avatar: null,
      birthday: '1970-11-05',
      preferences: {
        categories: ['Groceries', 'Electronics', 'Clothing'],
        brands: ['Samsung', 'LG', 'Sony'],
        offers: 'Volume Discounts'
      }
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterSegment, setFilterSegment] = useState('All');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showAddCustomer, setShowAddCustomer] = useState(false);

  // CRM Analytics Data
  const crmMetrics = {
    totalCustomers: customers.length,
    activeCustomers: customers.filter(c => c.status !== 'Inactive').length,
    totalRevenue: customers.reduce((sum, c) => sum + c.value, 0),
    averageOrderValue: customers.reduce((sum, c) => sum + c.lastPurchase, 0) / customers.length,
    totalOrders: customers.reduce((sum, c) => sum + c.totalOrders, 0),
    loyaltyMembers: customers.filter(c => c.loyaltyPoints > 0).length,
    creditCustomers: customers.filter(c => c.outstandingAmount > 0).length,
    totalOutstanding: customers.reduce((sum, c) => sum + c.outstandingAmount, 0),
    upiUsers: customers.filter(c => c.paymentMethods.includes('UPI')).length,
    premiumCustomers: customers.filter(c => c.segment === 'Premium').length
  };

  const recentActivities = [
    {
      id: 1,
      type: 'purchase',
      customer: 'Rajesh Kumar',
      action: 'Made a purchase of ₹12,500',
      time: '2 hours ago',
      icon: ShoppingCart,
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'payment',
      customer: 'Mohammed Ali',
      action: 'Payment received ₹25,000 via UPI',
      time: '4 hours ago',
      icon: CreditCard,
      color: 'text-blue-600'
    },
    {
      id: 3,
      type: 'contact',
      customer: 'Priya Sharma',
      action: 'WhatsApp inquiry about new products',
      time: '6 hours ago',
      icon: MessageSquare,
      color: 'text-purple-600'
    },
    {
      id: 4,
      type: 'loyalty',
      customer: 'Rajesh Kumar',
      action: 'Redeemed 500 loyalty points',
      time: '1 day ago',
      icon: Gift,
      color: 'text-orange-600'
    }
  ];

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm) ||
                         customer.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'All' || customer.status === filterStatus;
    const matchesSegment = filterSegment === 'All' || customer.segment === filterSegment;

    return matchesSearch && matchesStatus && matchesSegment;
  });

  const formatIndianCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status) => {
    const colors = {
      'VIP Customer': 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white',
      'Premium Customer': 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
      'Regular Customer': 'bg-blue-100 text-blue-800',
      'New Customer': 'bg-green-100 text-green-800',
      'Inactive': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getSegmentColor = (segment) => {
    const colors = {
      'Premium': 'bg-purple-100 text-purple-800',
      'Standard': 'bg-blue-100 text-blue-800',
      'Basic': 'bg-gray-100 text-gray-800'
    };
    return colors[segment] || 'bg-gray-100 text-gray-800';
  };

  const CustomerDashboard = () => (
    <div className="space-y-6">
      {/* CRM Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Customers</p>
              <p className="text-2xl font-bold">{crmMetrics.totalCustomers}</p>
              <p className="text-blue-100 text-xs mt-1">Active: {crmMetrics.activeCustomers}</p>
            </div>
            <Users className="h-8 w-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Total Revenue</p>
              <p className="text-2xl font-bold">{formatIndianCurrency(crmMetrics.totalRevenue)}</p>
              <p className="text-green-100 text-xs mt-1">Avg: {formatIndianCurrency(crmMetrics.averageOrderValue)}</p>
            </div>
            <IndianRupee className="h-8 w-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Total Orders</p>
              <p className="text-2xl font-bold">{crmMetrics.totalOrders}</p>
              <p className="text-purple-100 text-xs mt-1">Premium: {crmMetrics.premiumCustomers}</p>
            </div>
            <ShoppingCart className="h-8 w-8 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Outstanding</p>
              <p className="text-2xl font-bold">{formatIndianCurrency(crmMetrics.totalOutstanding)}</p>
              <p className="text-orange-100 text-xs mt-1">From: {crmMetrics.creditCustomers} customers</p>
            </div>
            <AlertCircle className="h-8 w-8 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Smartphone className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">UPI Users</p>
              <p className="text-lg font-semibold">{crmMetrics.upiUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Gift className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Loyalty Members</p>
              <p className="text-lg font-semibold">{crmMetrics.loyaltyMembers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Growth Rate</p>
              <p className="text-lg font-semibold">+23.5%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Activity className="h-5 w-5 mr-2 text-blue-600" />
            Recent Activities
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3">
                <div className={`p-2 rounded-full bg-gray-100`}>
                  <activity.icon className={`h-4 w-4 ${activity.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.customer}</p>
                  <p className="text-sm text-gray-500">{activity.action}</p>
                </div>
                <div className="text-xs text-gray-500">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const CustomerList = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search customers by name, company, phone, or location..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="VIP Customer">VIP Customer</option>
              <option value="Premium Customer">Premium Customer</option>
              <option value="Regular Customer">Regular Customer</option>
              <option value="New Customer">New Customer</option>
              <option value="Inactive">Inactive</option>
            </select>

            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filterSegment}
              onChange={(e) => setFilterSegment(e.target.value)}
            >
              <option value="All">All Segments</option>
              <option value="Premium">Premium</option>
              <option value="Standard">Standard</option>
              <option value="Basic">Basic</option>
            </select>

            <button
              onClick={() => setShowAddCustomer(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Customer</span>
            </button>
          </div>
        </div>
      </div>

      {/* Customer Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => (
          <div key={customer.id} className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {customer.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{customer.name}</h3>
                    <p className="text-sm text-gray-500">{customer.company}</p>
                  </div>
                </div>
                <div className="relative">
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Status and Segment */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                  {customer.status}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSegmentColor(customer.segment)}`}>
                  {customer.segment}
                </span>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  {customer.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  {customer.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {customer.location}
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500">Total Value</p>
                  <p className="font-semibold text-green-600">{formatIndianCurrency(customer.value)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Orders</p>
                  <p className="font-semibold text-blue-600">{customer.totalOrders}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Outstanding</p>
                  <p className="font-semibold text-red-600">{formatIndianCurrency(customer.outstandingAmount)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Loyalty Points</p>
                  <p className="font-semibold text-yellow-600">{customer.loyaltyPoints}</p>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Payment Methods</p>
                <div className="flex flex-wrap gap-1">
                  {customer.paymentMethods.map((method, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {method}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedCustomer(customer)}
                  className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm font-medium"
                >
                  View Details
                </button>
                <button className="px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100">
                  <Phone className="h-4 w-4" />
                </button>
                <button className="px-3 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100">
                  <MessageSquare className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Indian Retail CRM</h1>
              <p className="text-gray-600">Manage customers from small shops to supermarkets</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="h-5 w-5" />
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Export Data
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'dashboard' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('customers')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'customers' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Customers
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {activeTab === 'dashboard' && <CustomerDashboard />}
        {activeTab === 'customers' && <CustomerList />}
      </div>

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Customer Details</h3>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <p className="text-sm text-gray-900">{selectedCustomer.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <p className="text-sm text-gray-900">{selectedCustomer.company}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <p className="text-sm text-gray-900">{selectedCustomer.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <p className="text-sm text-gray-900">{selectedCustomer.email}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <p className="text-sm text-gray-900">{selectedCustomer.address}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">GST Number</label>
                  <p className="text-sm text-gray-900">{selectedCustomer.gst}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
                  <p className="text-sm text-gray-900">{selectedCustomer.businessType}</p>
                </div>
              </div>

              {/* Financial Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">Total Value</p>
                  <p className="text-lg font-semibold text-green-600">{formatIndianCurrency(selectedCustomer.value)}</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-lg font-semibold text-blue-600">{selectedCustomer.totalOrders}</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-gray-600">Loyalty Points</p>
                  <p className="text-lg font-semibold text-yellow-600">{selectedCustomer.loyaltyPoints}</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <p className="text-sm text-gray-600">Outstanding</p>
                  <p className="text-lg font-semibold text-red-600">{formatIndianCurrency(selectedCustomer.outstandingAmount)}</p>
                </div>
              </div>

              {/* Preferences */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Customer Preferences</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Categories</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedCustomer.preferences.categories.map((category, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Brands</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedCustomer.preferences.brands.map((brand, index) => (
                        <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                          {brand}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndianRetailCRM;