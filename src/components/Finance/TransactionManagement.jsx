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
  ArrowDownCircle,
  X,
  Save,
  Moon,
  Sun
} from 'lucide-react';
import useSettingsStore from '../../store/settingsStore'; // Import the same settings store

const TransactionManagement = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterPaymentMethod, setFilterPaymentMethod] = useState('all');
  const [dateRange, setDateRange] = useState('today');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [viewingTransaction, setViewingTransaction] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Use the same theme store as main dashboard
  const { theme, toggleTheme } = useSettingsStore();

  // Theme utility functions
  const getThemeClass = (lightClass, darkClass) => {
    return theme === 'dark' ? darkClass : lightClass;
  };

  const getCardClass = () => {
    return getThemeClass('bg-white', 'bg-gray-800');
  };

  const getTextClass = (type = 'primary') => {
    const textColors = {
      primary: getThemeClass('text-gray-900', 'text-gray-100'),
      secondary: getThemeClass('text-gray-600', 'text-gray-400'),
      muted: getThemeClass('text-gray-500', 'text-gray-500')
    };
    return textColors[type];
  };

  const getBorderClass = () => {
    return getThemeClass('border-gray-200', 'border-gray-700');
  };

  const getInputClass = () => {
    return getThemeClass(
      'bg-white border-gray-300 text-gray-900 placeholder-gray-500',
      'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
    );
  };

  const getTableHeaderClass = () => {
    return getThemeClass('bg-gray-50 text-gray-700', 'bg-gray-700 text-gray-300');
  };

  const getTableRowClass = () => {
    return getThemeClass('hover:bg-gray-50', 'hover:bg-gray-700');
  };

  const getTableDivideClass = () => {
    return getThemeClass('divide-gray-200', 'divide-gray-700');
  };

  // Form state for add/edit
  const [formData, setFormData] = useState({
    type: 'income',
    amount: '',
    paymentMethod: 'upi',
    description: '',
    category: 'Sales',
    customerName: '',
    vendorName: '',
    gstAmount: '',
    status: 'completed'
  });

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

  // Handle form input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Auto-calculate GST for income transactions (18% GST)
    if (name === 'amount' && value && formData.type === 'income') {
      const gstAmount = Math.round(parseInt(value) * 0.18);
      setFormData(prev => ({
        ...prev,
        gstAmount: gstAmount.toString()
      }));
    }
  };

  // Handle type change
  const handleTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      type,
      gstAmount: type === 'income' && prev.amount ? Math.round(parseInt(prev.amount) * 0.18).toString() : '0'
    }));
  };

  // Generate unique transaction ID
  const generateTransactionId = () => {
    const lastId = transactions.length > 0 
      ? Math.max(...transactions.map(t => parseInt(t.id.replace('TXN', ''))))
      : 0;
    return `TXN${String(lastId + 1).padStart(3, '0')}`;
  };

  // Get current date and time
  const getCurrentDateTime = () => {
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    return { date, time };
  };

  // Add new transaction
  const handleAddTransaction = () => {
    if (!formData.amount || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }

    const { date, time } = getCurrentDateTime();
    const newTransaction = {
      id: generateTransactionId(),
      date,
      time,
      ...formData,
      amount: parseInt(formData.amount),
      gstAmount: parseInt(formData.gstAmount) || 0
    };

    setTransactions(prev => [newTransaction, ...prev]);
    setShowAddModal(false);
    resetForm();
  };

  // Edit transaction
  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setFormData({
      type: transaction.type,
      amount: transaction.amount.toString(),
      paymentMethod: transaction.paymentMethod,
      description: transaction.description,
      category: transaction.category,
      customerName: transaction.customerName || '',
      vendorName: transaction.vendorName || '',
      gstAmount: transaction.gstAmount.toString(),
      status: transaction.status
    });
    setShowAddModal(true);
  };

  // Update transaction
  const handleUpdateTransaction = () => {
    if (!formData.amount || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }

    const { date, time } = getCurrentDateTime();
    const updatedTransaction = {
      ...editingTransaction,
      ...formData,
      amount: parseInt(formData.amount),
      gstAmount: parseInt(formData.gstAmount) || 0,
      date,
      time
    };

    setTransactions(prev => 
      prev.map(txn => 
        txn.id === editingTransaction.id ? updatedTransaction : txn
      )
    );

    setShowAddModal(false);
    setEditingTransaction(null);
    resetForm();
  };

  // Delete transaction
  const handleDeleteTransaction = (id) => {
    setTransactions(prev => prev.filter(txn => txn.id !== id));
    setDeleteConfirm(null);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      type: 'income',
      amount: '',
      paymentMethod: 'upi',
      description: '',
      category: 'Sales',
      customerName: '',
      vendorName: '',
      gstAmount: '',
      status: 'completed'
    });
    setEditingTransaction(null);
  };

  // Export transactions
  const handleExport = () => {
    const data = {
      transactions: filteredTransactions,
      totals: getTotalsByPaymentMethod(),
      exportDate: new Date().toISOString(),
      filters: {
        searchTerm,
        filterType,
        filterPaymentMethod,
        dateRange
      }
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSearchTerm('');
    setFilterType('all');
    setFilterPaymentMethod('all');
    setDateRange('all');
  };

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

  const getStatusBadge = (type) => {
    const baseClasses = "inline-flex px-2 py-1 text-xs font-semibold rounded-full";
    if (type === 'income') {
      return getThemeClass(
        `${baseClasses} bg-green-100 text-green-800`,
        `${baseClasses} bg-green-900/20 text-green-300`
      );
    } else {
      return getThemeClass(
        `${baseClasses} bg-red-100 text-red-800`,
        `${baseClasses} bg-red-900/20 text-red-300`
      );
    }
  };

  const getTotalsByPaymentMethod = () => {
    const totals = {
      upi: { income: 0, expense: 0 },
      cash: { income: 0, expense: 0 },
      card: { income: 0, expense: 0 },
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
    <div className={`min-h-screen ${getThemeClass('bg-gray-50', 'bg-gray-900')}`}>
      {/* Header */}
      <div className={`shadow-sm border-b ${getThemeClass('bg-white border-gray-200', 'bg-gray-800 border-gray-700')}`}>
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className={`text-2xl font-bold ${getTextClass('primary')}`}>Transaction Management</h1>
              <p className={getTextClass('secondary')}>Track all your money in and money out with UPI/Cash separation</p>
            </div>
            <div className="flex space-x-3">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'dark' 
                    ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button 
                onClick={() => {
                  resetForm();
                  setShowAddModal(true);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Plus size={16} />
                <span>Add Transaction</span>
              </button>
              <button 
                onClick={handleExport}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
              >
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
          <div className={`rounded-lg shadow p-6 ${getCardClass()}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${getTextClass('secondary')}`}>Total Income</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(totals.total.income)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className={`rounded-lg shadow p-6 ${getCardClass()}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${getTextClass('secondary')}`}>Total Expenses</p>
                <p className="text-2xl font-bold text-red-600">{formatCurrency(totals.total.expense)}</p>
              </div>
              <TrendingDown className="w-8 h-8 text-red-600" />
            </div>
          </div>
          <div className={`rounded-lg shadow p-6 ${getCardClass()}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${getTextClass('secondary')}`}>UPI Income</p>
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(totals.upi.income)}</p>
              </div>
              <CreditCard className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className={`rounded-lg shadow p-6 ${getCardClass()}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${getTextClass('secondary')}`}>Cash Income</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(totals.cash.income)}</p>
              </div>
              <Wallet className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className={`rounded-lg shadow p-6 mb-6 ${getCardClass()} ${getBorderClass()}`}>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${getTextClass('primary')}`}>Search</label>
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${getTextClass('muted')} w-4 h-4`} />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${getInputClass()}`}
                />
              </div>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${getTextClass('primary')}`}>Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${getInputClass()}`}
              >
                <option value="all">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${getTextClass('primary')}`}>Payment Method</label>
              <select
                value={filterPaymentMethod}
                onChange={(e) => setFilterPaymentMethod(e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${getInputClass()}`}
              >
                <option value="all">All Methods</option>
                <option value="upi">UPI</option>
                <option value="cash">Cash</option>
                <option value="card">Card</option>
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${getTextClass('primary')}`}>Date Range</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${getInputClass()}`}
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
                onClick={handleClearFilters}
                className={`w-full px-4 py-2 rounded-lg flex items-center justify-center space-x-2 ${
                  getThemeClass(
                    'bg-gray-100 text-gray-700 hover:bg-gray-200',
                    'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  )
                }`}
              >
                <Filter size={16} />
                <span>Clear Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className={`rounded-lg shadow overflow-hidden ${getCardClass()} ${getBorderClass()}`}>
          <div className={`px-6 py-4 border-b ${getBorderClass()}`}>
            <h2 className={`text-lg font-semibold ${getTextClass('primary')}`}>
              Recent Transactions ({filteredTransactions.length})
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y">
              <thead className={getTableHeaderClass()}>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Transaction
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Payment Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${getTableDivideClass()} ${getCardClass()}`}>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className={getTableRowClass()}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getTransactionIcon(transaction.type)}
                        <div className="ml-3">
                          <div className={`text-sm font-medium ${getTextClass('primary')}`}>
                            {transaction.description}
                          </div>
                          <div className={`text-sm ${getTextClass('secondary')}`}>
                            {transaction.customerName || transaction.vendorName} • {transaction.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getStatusBadge(transaction.type)}>
                        {transaction.type === 'income' ? 'Income' : 'Expense'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium ${getTextClass('primary')}`}>
                        {formatCurrency(transaction.amount)}
                      </div>
                      <div className={`text-sm ${getTextClass('secondary')}`}>
                        GST: {formatCurrency(transaction.gstAmount)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getPaymentMethodIcon(transaction.paymentMethod)}
                        <span className={`ml-2 text-sm capitalize ${getTextClass('primary')}`}>
                          {transaction.paymentMethod}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm ${getTextClass('primary')}`}>{formatDate(transaction.date)}</div>
                      <div className={`text-sm ${getTextClass('secondary')}`}>{transaction.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => setViewingTransaction(transaction)}
                          className={getThemeClass(
                            'text-blue-600 hover:text-blue-900',
                            'text-blue-400 hover:text-blue-300'
                          )}
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={() => handleEditTransaction(transaction)}
                          className={getThemeClass(
                            'text-green-600 hover:text-green-900',
                            'text-green-400 hover:text-green-300'
                          )}
                        >
                          <Edit3 size={16} />
                        </button>
                        <button 
                          onClick={() => setDeleteConfirm(transaction.id)}
                          className={getThemeClass(
                            'text-red-600 hover:text-red-900',
                            'text-red-400 hover:text-red-300'
                          )}
                        >
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
              <h3 className={`mt-2 text-sm font-medium ${getTextClass('primary')}`}>No transactions found</h3>
              <p className={`mt-1 text-sm ${getTextClass('secondary')}`}>
                Try adjusting your filters or add a new transaction.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Transaction Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className={`relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md ${getCardClass()} ${getBorderClass()}`}>
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-medium ${getTextClass('primary')}`}>
                  {editingTransaction ? 'Edit Transaction' : 'Add New Transaction'}
                </h3>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    resetForm();
                  }}
                  className={getThemeClass(
                    'text-gray-400 hover:text-gray-600',
                    'text-gray-400 hover:text-gray-300'
                  )}
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-4">
                {/* Type Selection */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${getTextClass('primary')}`}>Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleTypeChange('income')}
                      className={`p-3 rounded-lg border-2 text-center ${
                        formData.type === 'income'
                          ? getThemeClass(
                              'border-green-500 bg-green-50 text-green-700',
                              'border-green-600 bg-green-900/20 text-green-300'
                            )
                          : getThemeClass(
                              'border-gray-300 bg-white text-gray-700',
                              'border-gray-600 bg-gray-700 text-gray-300'
                            )
                      }`}
                    >
                      <ArrowUpCircle className="mx-auto mb-1" size={20} />
                      <span className="text-sm font-medium">Income</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTypeChange('expense')}
                      className={`p-3 rounded-lg border-2 text-center ${
                        formData.type === 'expense'
                          ? getThemeClass(
                              'border-red-500 bg-red-50 text-red-700',
                              'border-red-600 bg-red-900/20 text-red-300'
                            )
                          : getThemeClass(
                              'border-gray-300 bg-white text-gray-700',
                              'border-gray-600 bg-gray-700 text-gray-300'
                            )
                      }`}
                    >
                      <ArrowDownCircle className="mx-auto mb-1" size={20} />
                      <span className="text-sm font-medium">Expense</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${getTextClass('primary')}`}>
                    Amount (₹)
                  </label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleFormChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${getInputClass()}`}
                    placeholder="Enter amount"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${getTextClass('primary')}`}>
                    Payment Method
                  </label>
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleFormChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${getInputClass()}`}
                  >
                    <option value="upi">UPI</option>
                    <option value="cash">Cash</option>
                    <option value="card">Card</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${getTextClass('primary')}`}>
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${getInputClass()}`}
                    placeholder="Enter description"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${getTextClass('primary')}`}>
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${getInputClass()}`}
                  >
                    <option value="Sales">Sales</option>
                    <option value="Inventory">Inventory</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Services">Services</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {formData.type === 'income' ? (
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${getTextClass('primary')}`}>
                      Customer Name
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleFormChange}
                      className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${getInputClass()}`}
                      placeholder="Enter customer name"
                    />
                  </div>
                ) : (
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${getTextClass('primary')}`}>
                      Vendor Name
                    </label>
                    <input
                      type="text"
                      name="vendorName"
                      value={formData.vendorName}
                      onChange={handleFormChange}
                      className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${getInputClass()}`}
                      placeholder="Enter vendor name"
                    />
                  </div>
                )}

                <div>
                  <label className={`block text-sm font-medium mb-1 ${getTextClass('primary')}`}>
                    GST Amount (₹)
                  </label>
                  <input
                    type="number"
                    name="gstAmount"
                    value={formData.gstAmount}
                    onChange={handleFormChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${getInputClass()}`}
                    placeholder="Enter GST amount"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    resetForm();
                  }}
                  className={getThemeClass(
                    'bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50',
                    'bg-gray-700 border-gray-600 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-600'
                  )}
                >
                  Cancel
                </button>
                <button
                  onClick={editingTransaction ? handleUpdateTransaction : handleAddTransaction}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                >
                  <Save size={16} />
                  <span>{editingTransaction ? 'Update' : 'Save'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Transaction Modal */}
      {viewingTransaction && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className={`relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md ${getCardClass()} ${getBorderClass()}`}>
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-medium ${getTextClass('primary')}`}>Transaction Details</h3>
                <button
                  onClick={() => setViewingTransaction(null)}
                  className={getThemeClass(
                    'text-gray-400 hover:text-gray-600',
                    'text-gray-400 hover:text-gray-300'
                  )}
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className={`text-sm ${getTextClass('secondary')}`}>ID:</span>
                  <span className={`text-sm font-medium ${getTextClass('primary')}`}>{viewingTransaction.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-sm ${getTextClass('secondary')}`}>Description:</span>
                  <span className={`text-sm font-medium ${getTextClass('primary')}`}>{viewingTransaction.description}</span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-sm ${getTextClass('secondary')}`}>Type:</span>
                  <span className={`text-sm font-medium capitalize ${
                    viewingTransaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {viewingTransaction.type}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-sm ${getTextClass('secondary')}`}>Amount:</span>
                  <span className={`text-sm font-medium ${getTextClass('primary')}`}>{formatCurrency(viewingTransaction.amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-sm ${getTextClass('secondary')}`}>GST:</span>
                  <span className={`text-sm font-medium ${getTextClass('primary')}`}>{formatCurrency(viewingTransaction.gstAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-sm ${getTextClass('secondary')}`}>Payment Method:</span>
                  <span className={`text-sm font-medium capitalize ${getTextClass('primary')}`}>{viewingTransaction.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-sm ${getTextClass('secondary')}`}>Category:</span>
                  <span className={`text-sm font-medium ${getTextClass('primary')}`}>{viewingTransaction.category}</span>
                </div>
                {viewingTransaction.customerName && (
                  <div className="flex justify-between">
                    <span className={`text-sm ${getTextClass('secondary')}`}>Customer:</span>
                    <span className={`text-sm font-medium ${getTextClass('primary')}`}>{viewingTransaction.customerName}</span>
                  </div>
                )}
                {viewingTransaction.vendorName && (
                  <div className="flex justify-between">
                    <span className={`text-sm ${getTextClass('secondary')}`}>Vendor:</span>
                    <span className={`text-sm font-medium ${getTextClass('primary')}`}>{viewingTransaction.vendorName}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className={`text-sm ${getTextClass('secondary')}`}>Date:</span>
                  <span className={`text-sm font-medium ${getTextClass('primary')}`}>{formatDate(viewingTransaction.date)}</span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-sm ${getTextClass('secondary')}`}>Time:</span>
                  <span className={`text-sm font-medium ${getTextClass('primary')}`}>{viewingTransaction.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-sm ${getTextClass('secondary')}`}>Status:</span>
                  <span className="text-sm font-medium text-green-600 capitalize">{viewingTransaction.status}</span>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setViewingTransaction(null)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className={`relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md ${getCardClass()} ${getBorderClass()}`}>
            <div className="mt-3 text-center">
              <Trash2 className="mx-auto text-red-600 mb-4" size={48} />
              <h3 className={`text-lg font-medium mb-2 ${getTextClass('primary')}`}>Delete Transaction</h3>
              <p className={`text-sm mb-4 ${getTextClass('secondary')}`}>
                Are you sure you want to delete this transaction? This action cannot be undone.
              </p>
              <div className="flex justify-center space-x-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className={getThemeClass(
                    'bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50',
                    'bg-gray-700 border-gray-600 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-600'
                  )}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteTransaction(deleteConfirm)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionManagement;