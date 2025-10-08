import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Download, 
  Send, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  DollarSign,
  Calendar,
  User,
  Building,
  FileText,
  Copy,
  Trash2,
  Mail
} from 'lucide-react';

const InvoiceManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Sample invoice data
  const invoices = [
    {
      id: 1,
      invoiceNumber: 'INV-2024-001',
      clientName: 'Tech Solutions Inc.',
      clientEmail: 'contact@techsolutions.com',
      amount: 75000,
      tax: 7500,
      total: 82500,
      status: 'paid',
      issueDate: '2024-09-15',
      dueDate: '2024-10-15',
      paidDate: '2024-10-07',
      description: 'Software Development Services - Q3 2024',
      items: [
        { description: 'Frontend Development', quantity: 80, rate: 750, amount: 60000 },
        { description: 'Backend Development', quantity: 20, rate: 750, amount: 15000 }
      ]
    },
    {
      id: 2,
      invoiceNumber: 'INV-2024-002',
      clientName: 'Global Marketing Agency',
      clientEmail: 'billing@globalmarketing.com',
      amount: 45000,
      tax: 4500,
      total: 49500,
      status: 'pending',
      issueDate: '2024-10-01',
      dueDate: '2024-10-31',
      paidDate: null,
      description: 'Digital Marketing Campaign Management',
      items: [
        { description: 'Campaign Strategy', quantity: 40, rate: 750, amount: 30000 },
        { description: 'Analytics & Reporting', quantity: 20, rate: 750, amount: 15000 }
      ]
    },
    {
      id: 3,
      invoiceNumber: 'INV-2024-003',
      clientName: 'Enterprise Corp',
      clientEmail: 'finance@enterprise.com',
      amount: 120000,
      tax: 12000,
      total: 132000,
      status: 'overdue',
      issueDate: '2024-08-15',
      dueDate: '2024-09-15',
      paidDate: null,
      description: 'Enterprise System Integration',
      items: [
        { description: 'System Analysis', quantity: 60, rate: 1000, amount: 60000 },
        { description: 'Integration Development', quantity: 60, rate: 1000, amount: 60000 }
      ]
    },
    {
      id: 4,
      invoiceNumber: 'INV-2024-004',
      clientName: 'StartupHub',
      clientEmail: 'accounts@startuphub.com',
      amount: 25000,
      tax: 2500,
      total: 27500,
      status: 'draft',
      issueDate: '2024-10-08',
      dueDate: '2024-11-08',
      paidDate: null,
      description: 'MVP Development Services',
      items: [
        { description: 'Mobile App Development', quantity: 30, rate: 750, amount: 22500 },
        { description: 'Testing & QA', quantity: 5, rate: 500, amount: 2500 }
      ]
    },
    {
      id: 5,
      invoiceNumber: 'INV-2024-005',
      clientName: 'Retail Solutions Ltd',
      clientEmail: 'payments@retail-solutions.com',
      amount: 35000,
      tax: 3500,
      total: 38500,
      status: 'sent',
      issueDate: '2024-10-05',
      dueDate: '2024-11-05',
      paidDate: null,
      description: 'E-commerce Platform Development',
      items: [
        { description: 'Platform Development', quantity: 40, rate: 750, amount: 30000 },
        { description: 'Payment Integration', quantity: 10, rate: 500, amount: 5000 }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid': return <CheckCircle size={16} className="text-green-600" />;
      case 'pending': return <Clock size={16} className="text-yellow-600" />;
      case 'sent': return <Mail size={16} className="text-blue-600" />;
      case 'overdue': return <AlertTriangle size={16} className="text-red-600" />;
      case 'draft': return <FileText size={16} className="text-gray-600" />;
      default: return <FileText size={16} className="text-gray-600" />;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = 
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || invoice.status === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  // Summary statistics
  const totalInvoiced = invoices.reduce((sum, inv) => sum + inv.total, 0);
  const totalPaid = invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.total, 0);
  const totalPending = invoices.filter(inv => inv.status === 'pending' || inv.status === 'sent').reduce((sum, inv) => sum + inv.total, 0);
  const totalOverdue = invoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.total, 0);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Invoice Management</h1>
            <p className="text-gray-600">Create, manage, and track your invoices</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus size={16} />
            <span>Create Invoice</span>
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Invoiced</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalInvoiced)}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Paid</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(totalPaid)}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{formatCurrency(totalPending)}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-red-600">{formatCurrency(totalOverdue)}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <AlertTriangle className="h-5 w-5 text-red-600" />
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
                  placeholder="Search invoices..."
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
                <option value="Draft">Draft</option>
                <option value="Sent">Sent</option>
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Overdue">Overdue</option>
              </select>
              <button className="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
                <Filter size={16} />
                <span>More Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Invoice Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issue Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{invoice.invoiceNumber}</div>
                      <div className="text-sm text-gray-500">{invoice.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-gray-100 p-2 rounded-full mr-3">
                        <Building size={16} className="text-gray-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{invoice.clientName}</div>
                        <div className="text-sm text-gray-500">{invoice.clientEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{formatCurrency(invoice.total)}</div>
                    <div className="text-sm text-gray-500">Tax: {formatCurrency(invoice.tax)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                      {getStatusIcon(invoice.status)}
                      <span className="ml-1 capitalize">{invoice.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      <Calendar size={12} className="mr-2 text-gray-400" />
                      {new Date(invoice.issueDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm flex items-center ${
                      invoice.status === 'overdue' ? 'text-red-600' : 'text-gray-900'
                    }`}>
                      <Calendar size={12} className="mr-2 text-gray-400" />
                      {new Date(invoice.dueDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900" title="View">
                        <Eye size={16} />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900" title="Edit">
                        <Edit size={16} />
                      </button>
                      <button className="text-green-600 hover:text-green-900" title="Download">
                        <Download size={16} />
                      </button>
                      <button className="text-purple-600 hover:text-purple-900" title="Send">
                        <Send size={16} />
                      </button>
                      <button className="text-orange-600 hover:text-orange-900" title="Duplicate">
                        <Copy size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredInvoices.length === 0 && (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No invoices found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || statusFilter !== 'All' 
                ? 'Try adjusting your search or filters'
                : 'Get started by creating your first invoice'
              }
            </p>
          </div>
        )}
      </div>

      {/* Create Invoice Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Create New Invoice</h3>
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
                    Client Name
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter client name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Client Email
                  </label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter client email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount
                  </label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter amount"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter description"
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
                  Create Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceManagement;