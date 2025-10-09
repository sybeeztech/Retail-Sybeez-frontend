import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Filter, 
  Search, 
  Download, 
  Calendar,
  DollarSign,
  CreditCard,
  Wallet,
  Receipt,
  TrendingUp,
  TrendingDown,
  Eye,
  Edit3,
  Trash2,
  ArrowUpCircle,
  ArrowDownCircle
} from 'lucide-react';

const TransactionManagement = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterPaymentMethod, setFilterPaymentMethod] = useState('all');
  const [dateRange, setDateRange] = useState('today');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  // Sample transaction data for Indian retail
  const sampleTransactions = [
    {
      id: 'TXN001',
      date: '2024-10-08',
      time: '09:15 AM',
      type: 'income',
      amount: 2500,
      paymentMethod: 'upi',
      description: 'Product Sale - Electronics',
      category: 'Sales',
      customerName: 'Rajesh Kumar',
      gstAmount: 450,
      status: 'completed'
    },
    {
      id: 'TXN002',
      date: '2024-10-08',
      time: '10:30 AM',
      type: 'expense',
      amount: 1200,
      paymentMethod: 'cash',
      description: 'Inventory Purchase - Stationery',
      category: 'Inventory',
      vendorName: 'ABC Suppliers',
      gstAmount: 216,
      status: 'completed'
    },
    {
      id: 'TXN003',
      date: '2024-10-08',
      time: '11:45 AM',
      type: 'income',
      amount: 850,
      paymentMethod: 'cash',
      description: 'Product Sale - Groceries',
      category: 'Sales',
      customerName: 'Priya Sharma',
      gstAmount: 153,
      status: 'completed'
    },
    {
      id: 'TXN004',
      date: '2024-10-08',
      time: '02:20 PM',
      type: 'income',
      amount: 3200,
      paymentMethod: 'upi',
      description: 'Bulk Order - Clothing',
      category: 'Sales',
      customerName: 'Fashion Store Ltd',
      gstAmount: 576,
      status: 'completed'
    },
    {
      id: 'TXN005',
      date: '2024-10-08',
      time: '03:15 PM',
      type: 'expense',
      amount: 800,
      paymentMethod: 'upi',
      description: 'Utility Bill - Electricity',
      category: 'Utilities',
      vendorName: 'State Electricity Board',
      gstAmount: 144,
      status: 'completed'
    },
    {
      id: 'TXN006',
      date: '2024-10-07',
      time: '04:30 PM',
      type: 'income',
      amount: 1500,
      paymentMethod: 'cash',
      description: 'Product Sale - Home Appliances',
      category: 'Sales',
      customerName: 'Amit Patel',
      gstAmount: 270,
      status: 'completed'
    }
  ];

  useEffect(() => {
    setTransactions(sampleTransactions);
    setFilteredTransactions(sampleTransactions);
  }, []);

  useEffect(() => {
    let filtered = transactions;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(txn => 
        txn.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.vendorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(txn => txn.type === filterType);
    }

    // Payment method filter
    if (filterPaymentMethod !== 'all') {
      filtered = filtered.filter(txn => txn.paymentMethod === filterPaymentMethod);
    }

    // Date filter
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    switch (dateRange) {
      case 'today':
        filtered = filtered.filter(txn => txn.date === today);
        break;
      case 'yesterday':
        filtered = filtered.filter(txn => txn.date === yesterday);
        break;
      case 'week':
        filtered = filtered.filter(txn => txn.date >= weekAgo);
        break;
      case 'month':
        const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        filtered = filtered.filter(txn => txn.date >= monthAgo);
        break;
      default:
        break;
    }

    setFilteredTransactions(filtered);
  }, [transactions, searchTerm, filterType, filterPaymentMethod, dateRange]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case 'upi':
        return <CreditCard className="w-4 h-4 text-blue-600" />;
      case 'cash':
        return <Wallet className="w-4 h-4 text-green-600" />;
      case 'card':
        return <CreditCard className="w-4 h-4 text-purple-600" />;
      default:
        return <DollarSign className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTransactionIcon = (type) => {
    return type === 'income' ? (
      <ArrowUpCircle className="w-5 h-5 text-green-600" />
    ) : (
      <ArrowDownCircle className="w-5 h-5 text-red-600" />
    );
  };

  const getTotalsByPaymentMethod = () => {
    const totals = {
      upi: { income: 0, expense: 0 },
      cash: { income: 0, expense: 0 },
      total: { income: 0, expense: 0 }
    };

    filteredTransactions.forEach(txn => {
      const method = txn.paymentMethod;
      const type = txn.type;
      const amount = txn.amount;

      if (totals[method]) {
        totals[method][type] += amount;
      }
      totals.total[type] += amount;
    });

    return totals;
  };

  const totals = getTotalsByPaymentMethod();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Transaction Management</h1>
              <p className="text-gray-600">Track all your money in and money out with UPI/Cash separation</p>
            </div>
            <div className="flex space-x-3">
              <button 
                onClick={() => setShowAddModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Plus size={16} />
                <span>Add Transaction</span>
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2">
                <Download size={16} />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Income</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(totals.total.income)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Expenses</p>
                <p className="text-2xl font-bold text-red-600">{formatCurrency(totals.total.expense)}</p>
              </div>
              <TrendingDown className="w-8 h-8 text-red-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">UPI Income</p>
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(totals.upi.income)}</p>
              </div>
              <CreditCard className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Cash Income</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(totals.cash.income)}</p>
              </div>
              <Wallet className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
              <select
                value={filterPaymentMethod}
                onChange={(e) => setFilterPaymentMethod(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Methods</option>
                <option value="upi">UPI</option>
                <option value="cash">Cash</option>
                <option value="card">Card</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterType('all');
                  setFilterPaymentMethod('all');
                  setDateRange('all');
                }}
                className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center justify-center space-x-2"
              >
                <Filter size={16} />
                <span>Clear Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Transactions ({filteredTransactions.length})
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getTransactionIcon(transaction.type)}
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {transaction.description}
                          </div>
                          <div className="text-sm text-gray-500">
                            {transaction.customerName || transaction.vendorName} • {transaction.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        transaction.type === 'income' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {transaction.type === 'income' ? 'Income' : 'Expense'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {formatCurrency(transaction.amount)}
                      </div>
                      <div className="text-sm text-gray-500">
                        GST: {formatCurrency(transaction.gstAmount)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getPaymentMethodIcon(transaction.paymentMethod)}
                        <span className="ml-2 text-sm text-gray-900 capitalize">
                          {transaction.paymentMethod}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>{formatDate(transaction.date)}</div>
                      <div className="text-gray-500">{transaction.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={() => setEditingTransaction(transaction)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredTransactions.length === 0 && (
            <div className="px-6 py-8 text-center">
              <Receipt className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No transactions found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your filters or add a new transaction.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionManagement;