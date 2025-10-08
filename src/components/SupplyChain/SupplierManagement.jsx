import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Building, 
  Phone, 
  Mail, 
  MapPin, 
  Star,
  CheckCircle,
  AlertTriangle,
  Clock,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Truck,
  Calendar,
  FileText,
  Download,
  Upload,
  Target,
  Award,
  Users
} from 'lucide-react';

const SupplierManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  // Sample supplier data
  const suppliers = [
    {
      id: 1,
      name: 'Global Electronics Ltd',
      contactPerson: 'John Smith',
      email: 'john.smith@globalelectronics.com',
      phone: '+1 (555) 123-4567',
      address: '123 Tech Street, San Francisco, CA 94102',
      country: 'United States',
      category: 'Electronics',
      status: 'active',
      rating: 4.8,
      onTimeDelivery: 96.5,
      qualityScore: 4.9,
      totalOrders: 145,
      totalSpend: 1250000,
      averageOrderValue: 8620,
      leadTime: 8,
      lastOrderDate: '2024-10-07',
      contractExpiry: '2025-06-30',
      paymentTerms: 'Net 30',
      certifications: ['ISO 9001', 'ISO 14001', 'RoHS'],
      riskLevel: 'low'
    },
    {
      id: 2,
      name: 'Tech Components Inc',
      contactPerson: 'Sarah Johnson',
      email: 'sarah.johnson@techcomponents.com',
      phone: '+1 (555) 234-5678',
      address: '456 Component Ave, Austin, TX 78701',
      country: 'United States',
      category: 'Components',
      status: 'active',
      rating: 4.6,
      onTimeDelivery: 92.1,
      qualityScore: 4.7,
      totalOrders: 98,
      totalSpend: 890000,
      averageOrderValue: 9081,
      leadTime: 12,
      lastOrderDate: '2024-10-06',
      contractExpiry: '2025-03-15',
      paymentTerms: 'Net 45',
      certifications: ['ISO 9001', 'UL Listed'],
      riskLevel: 'low'
    },
    {
      id: 3,
      name: 'Manufacturing Solutions',
      contactPerson: 'Mike Chen',
      email: 'mike.chen@mfgsolutions.com',
      phone: '+1 (555) 345-6789',
      address: '789 Industrial Blvd, Detroit, MI 48201',
      country: 'United States',
      category: 'Manufacturing',
      status: 'active',
      rating: 4.2,
      onTimeDelivery: 88.7,
      qualityScore: 4.3,
      totalOrders: 76,
      totalSpend: 650000,
      averageOrderValue: 8553,
      leadTime: 15,
      lastOrderDate: '2024-10-05',
      contractExpiry: '2024-12-31',
      paymentTerms: 'Net 30',
      certifications: ['ISO 9001'],
      riskLevel: 'medium'
    },
    {
      id: 4,
      name: 'Quality Parts Co',
      contactPerson: 'Lisa Rodriguez',
      email: 'lisa.rodriguez@qualityparts.com',
      phone: '+1 (555) 456-7890',
      address: '321 Parts Plaza, Phoenix, AZ 85001',
      country: 'United States',
      category: 'Parts',
      status: 'active',
      rating: 4.7,
      onTimeDelivery: 94.8,
      qualityScore: 4.8,
      totalOrders: 112,
      totalSpend: 980000,
      averageOrderValue: 8750,
      leadTime: 10,
      lastOrderDate: '2024-10-08',
      contractExpiry: '2025-09-30',
      paymentTerms: 'Net 30',
      certifications: ['ISO 9001', 'ISO 14001', 'IATF 16949'],
      riskLevel: 'low'
    },
    {
      id: 5,
      name: 'Industrial Supplies LLC',
      contactPerson: 'David Wilson',
      email: 'david.wilson@industrialsupplies.com',
      phone: '+1 (555) 567-8901',
      address: '654 Supply Road, Houston, TX 77001',
      country: 'United States',
      category: 'Supplies',
      status: 'inactive',
      rating: 3.9,
      onTimeDelivery: 85.2,
      qualityScore: 4.1,
      totalOrders: 54,
      totalSpend: 320000,
      averageOrderValue: 5926,
      leadTime: 18,
      lastOrderDate: '2024-09-15',
      contractExpiry: '2024-11-15',
      paymentTerms: 'Net 60',
      certifications: ['ISO 9001'],
      riskLevel: 'high'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPerformanceIcon = (score) => {
    if (score >= 4.5) return <Award className="text-gold-500" size={16} />;
    if (score >= 4.0) return <CheckCircle className="text-green-500" size={16} />;
    if (score >= 3.5) return <AlertTriangle className="text-yellow-500" size={16} />;
    return <Clock className="text-red-500" size={16} />;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = 
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || supplier.status === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  // Summary statistics
  const totalSuppliers = suppliers.length;
  const activeSuppliers = suppliers.filter(s => s.status === 'active').length;
  const totalSpend = suppliers.reduce((sum, s) => sum + s.totalSpend, 0);
  const averageRating = suppliers.reduce((sum, s) => sum + s.rating, 0) / suppliers.length;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Supplier Management</h1>
            <p className="text-gray-600">Manage your supplier relationships and performance</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus size={16} />
            <span>Add Supplier</span>
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Suppliers</p>
                <p className="text-2xl font-bold text-blue-600">{totalSuppliers}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Building className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Suppliers</p>
                <p className="text-2xl font-bold text-green-600">{activeSuppliers}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Spend</p>
                <p className="text-2xl font-bold text-purple-600">{formatCurrency(totalSpend)}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <DollarSign className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-yellow-600">{averageRating.toFixed(1)}</p>
                <div className="flex items-center mt-1">
                  <Star className="text-yellow-400 fill-current" size={16} />
                  <span className="text-sm text-gray-500 ml-1">out of 5</span>
                </div>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Star className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search suppliers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex space-x-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </select>
              <button className="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
                <Filter size={16} />
                <span>More Filters</span>
              </button>
              <button className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2">
                <Download size={16} />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Supplier Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Supplier
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orders & Spend
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risk Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSuppliers.map((supplier) => (
                <tr key={supplier.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-gray-100 p-2 rounded-full mr-3">
                        <Building size={16} className="text-gray-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{supplier.name}</div>
                        <div className="text-sm text-gray-500">{supplier.category}</div>
                        <div className="text-xs text-gray-400 flex items-center mt-1">
                          <MapPin size={12} className="mr-1" />
                          {supplier.country}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{supplier.contactPerson}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Mail size={12} className="mr-1" />
                        {supplier.email}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Phone size={12} className="mr-1" />
                        {supplier.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="flex items-center">
                        {getPerformanceIcon(supplier.rating)}
                        <span className="text-sm font-medium text-gray-900 ml-2">{supplier.rating}/5</span>
                      </div>
                      <div className="text-xs text-gray-500">OTD: {supplier.onTimeDelivery}%</div>
                      <div className="text-xs text-gray-500">Quality: {supplier.qualityScore}/5</div>
                      <div className="text-xs text-gray-500">Lead Time: {supplier.leadTime} days</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{supplier.totalOrders} orders</div>
                      <div className="text-sm text-gray-500">{formatCurrency(supplier.totalSpend)}</div>
                      <div className="text-xs text-gray-400">Avg: {formatCurrency(supplier.averageOrderValue)}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(supplier.status)}`}>
                      {supplier.status.charAt(0).toUpperCase() + supplier.status.slice(1)}
                    </span>
                    <div className="text-xs text-gray-500 mt-1">
                      Last order: {new Date(supplier.lastOrderDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRiskColor(supplier.riskLevel)}`}>
                      {supplier.riskLevel.charAt(0).toUpperCase() + supplier.riskLevel.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        className="text-blue-600 hover:text-blue-900" 
                        title="View Details"
                        onClick={() => setSelectedSupplier(supplier)}
                      >
                        <Eye size={16} />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900" title="Edit">
                        <Edit size={16} />
                      </button>
                      <button className="text-green-600 hover:text-green-900" title="Download Report">
                        <Download size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-900" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredSuppliers.length === 0 && (
          <div className="text-center py-12">
            <Building className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No suppliers found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || statusFilter !== 'All' 
                ? 'Try adjusting your search or filters'
                : 'Get started by adding your first supplier'
              }
            </p>
          </div>
        )}
      </div>

      {/* Create Supplier Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Add New Supplier</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Supplier Name
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter supplier name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter contact person name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Select category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Components">Components</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Parts">Parts</option>
                    <option value="Supplies">Supplies</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <textarea
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter full address"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Add Supplier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Supplier Details Modal */}
      {selectedSupplier && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-4/5 max-w-4xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-medium text-gray-900">Supplier Details - {selectedSupplier.name}</h3>
                <button
                  onClick={() => setSelectedSupplier(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Company Name</label>
                      <p className="text-gray-900">{selectedSupplier.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Contact Person</label>
                      <p className="text-gray-900">{selectedSupplier.contactPerson}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Category</label>
                      <p className="text-gray-900">{selectedSupplier.category}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Address</label>
                      <p className="text-gray-900">{selectedSupplier.address}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Payment Terms</label>
                      <p className="text-gray-900">{selectedSupplier.paymentTerms}</p>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Performance Metrics</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Overall Rating</span>
                      <span className="text-gray-900 font-medium">{selectedSupplier.rating}/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">On-Time Delivery</span>
                      <span className="text-gray-900 font-medium">{selectedSupplier.onTimeDelivery}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Quality Score</span>
                      <span className="text-gray-900 font-medium">{selectedSupplier.qualityScore}/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Average Lead Time</span>
                      <span className="text-gray-900 font-medium">{selectedSupplier.leadTime} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Risk Level</span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getRiskColor(selectedSupplier.riskLevel)}`}>
                        {selectedSupplier.riskLevel.charAt(0).toUpperCase() + selectedSupplier.riskLevel.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Financial Information */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Financial Summary</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Total Orders</span>
                      <span className="text-gray-900 font-medium">{selectedSupplier.totalOrders}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Total Spend</span>
                      <span className="text-gray-900 font-medium">{formatCurrency(selectedSupplier.totalSpend)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Average Order Value</span>
                      <span className="text-gray-900 font-medium">{formatCurrency(selectedSupplier.averageOrderValue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Last Order Date</span>
                      <span className="text-gray-900 font-medium">{new Date(selectedSupplier.lastOrderDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Contract Expiry</span>
                      <span className="text-gray-900 font-medium">{new Date(selectedSupplier.contractExpiry).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Certifications */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Certifications</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSupplier.certifications.map((cert, index) => (
                      <span key={index} className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setSelectedSupplier(null)}
                  className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Edit Supplier
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                  Download Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierManagement;