import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Minus,
  Search, 
  Filter, 
  Calendar,
  CreditCard,
  Banknote,
  Smartphone,
  TrendingUp,
  TrendingDown,
  Eye,
  Download,
  RefreshCw,
  ArrowUpRight,
  ArrowDownLeft,
  IndianRupee,
  Moon,
  Sun
} from 'lucide-react';
import useSettingsStore from '../../store/settingsStore'; // Import the settings store

const CashFlowManager = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [paymentFilter, setPaymentFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [transactionType, setTransactionType] = useState('in');
  const [searchQuery, setSearchQuery] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const { theme, toggleTheme } = useSettingsStore(); // Use the store
  
  // Form state for new transaction
  const [newTransaction, setNewTransaction] = useState({
    amount: '',
    paymentMethod: 'cash',
    category: 'sales',
    description: '',
    customerName: '',
    gstAmount: '',
    billNumber: '',
    upiId: '',
    vendorName: ''
  });

  // Sample initial cash flow data for Indian retail
  const initialTransactions = [
    {
      id: 1,
      time: '09:15 AM',
      type: 'in',
      category: 'Sales',
      description: 'Product Sale - Rice 25kg',
      amount: 1250,
      paymentMethod: 'cash',
      customerName: 'Rajesh Kumar',
      billNumber: 'BILL-001',
      gstAmount: 62.50,
      date: new Date().toISOString().split('T')[0]
    },
    {
      id: 2,
      time: '09:45 AM',
      type: 'in',
      category: 'Sales',
      description: 'Product Sale - Grocery Items',
      amount: 850,
      paymentMethod: 'upi',
      customerName: 'Priya Sharma',
      billNumber: 'BILL-002',
      upiId: 'priya@paytm',
      gstAmount: 42.50,
      date: new Date().toISOString().split('T')[0]
    },
    {
      id: 3,
      time: '10:30 AM',
      type: 'out',
      category: 'Purchase',
      description: 'Wholesale Purchase - Dal',
      amount: 5000,
      paymentMethod: 'bank_transfer',
      vendorName: 'Gupta Traders',
      billNumber: 'INV-W001',
      gstAmount: 900,
      date: new Date().toISOString().split('T')[0]
    },
    {
      id: 4,
      time: '11:15 AM',
      type: 'out',
      category: 'Expense',
      description: 'Monthly Shop Rent - October 2024',
      amount: 15000,
      paymentMethod: 'cash',
      date: new Date().toISOString().split('T')[0]
    },
    {
      id: 5,
      time: '02:30 PM',
      type: 'in',
      category: 'Sales',
      description: 'Product Sale - Household Items',
      amount: 320,
      paymentMethod: 'upi',
      customerName: 'Amit Singh',
      billNumber: 'BILL-003',
      upiId: 'amit@gpay',
      gstAmount: 16,
      date: new Date().toISOString().split('T')[0]
    },
    {
      id: 6,
      time: '03:45 PM',
      type: 'out',
      category: 'Expense',
      description: 'Electricity Bill',
      amount: 2800,
      paymentMethod: 'upi',
      upiId: 'shop@phonepe',
      date: new Date().toISOString().split('T')[0]
    }
  ];

  // Initialize transactions
  useEffect(() => {
    setTransactions(initialTransactions);
  }, []);

  // Filter transactions based on selected date, payment filter, and search query
  useEffect(() => {
    let filtered = transactions.filter(transaction => {
      // Date filter
      const matchesDate = transaction.date === selectedDate;
      
      // Payment method filter
      const matchesPayment = paymentFilter === 'All' || 
                           transaction.paymentMethod === paymentFilter.toLowerCase();
      
      // Search filter
      const matchesSearch = searchQuery === '' || 
                           transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           (transaction.customerName && transaction.customerName.toLowerCase().includes(searchQuery.toLowerCase())) ||
                           (transaction.vendorName && transaction.vendorName.toLowerCase().includes(searchQuery.toLowerCase())) ||
                           (transaction.billNumber && transaction.billNumber.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesDate && matchesPayment && matchesSearch;
    });
    
    setFilteredTransactions(filtered);
  }, [transactions, selectedDate, paymentFilter, searchQuery]);

  // Calculate daily summary from filtered transactions
  const calculateDailySummary = () => {
    const todayTransactions = transactions.filter(t => t.date === selectedDate);
    
    const totalInflow = todayTransactions
      .filter(t => t.type === 'in')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalOutflow = todayTransactions
      .filter(t => t.type === 'out')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const cashInflow = todayTransactions
      .filter(t => t.type === 'in' && t.paymentMethod === 'cash')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const upiInflow = todayTransactions
      .filter(t => t.type === 'in' && t.paymentMethod === 'upi')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const cashOutflow = todayTransactions
      .filter(t => t.type === 'out' && t.paymentMethod === 'cash')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const upiOutflow = todayTransactions
      .filter(t => t.type === 'out' && t.paymentMethod === 'upi')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const bankOutflow = todayTransactions
      .filter(t => t.type === 'out' && t.paymentMethod === 'bank_transfer')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const gstCollected = todayTransactions
      .filter(t => t.type === 'in')
      .reduce((sum, t) => sum + (t.gstAmount || 0), 0);
    
    const gstPaid = todayTransactions
      .filter(t => t.type === 'out')
      .reduce((sum, t) => sum + (t.gstAmount || 0), 0);

    return {
      totalInflow,
      totalOutflow,
      netCashFlow: totalInflow - totalOutflow,
      cashInflow,
      upiInflow,
      cashOutflow,
      upiOutflow,
      bankOutflow,
      gstCollected,
      gstPaid
    };
  };

  const dailySummary = calculateDailySummary();

  const weeklySummary = {
    totalSales: 185000,
    totalExpenses: 142000,
    netProfit: 43000,
    cashSales: 89000,
    upiSales: 96000,
    averageBillValue: 425,
    transactionCount: 435,
    topSellingCategory: 'Grocery & Food Items'
  };

  const paymentMethods = [
    { id: 'cash', name: 'Cash', icon: Banknote, color: 'green' },
    { id: 'upi', name: 'UPI', icon: Smartphone, color: 'blue' },
    { id: 'bank_transfer', name: 'Bank Transfer', icon: CreditCard, color: 'purple' },
    { id: 'card', name: 'Card', icon: CreditCard, color: 'orange' }
  ];

  const getPaymentMethodIcon = (method) => {
    const pm = paymentMethods.find(p => p.id === method);
    if (!pm) return <Banknote size={16} className="text-gray-500" />;
    const IconComponent = pm.icon;
    return <IconComponent size={16} className={`text-${pm.color}-500`} />;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add new transaction
  const handleAddTransaction = () => {
    if (!newTransaction.amount || !newTransaction.description) {
      alert('Please fill in required fields: Amount and Description');
      return;
    }

    const transaction = {
      id: transactions.length + 1,
      time: new Date().toLocaleTimeString('en-IN', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }),
      type: transactionType,
      category: newTransaction.category,
      description: newTransaction.description,
      amount: parseFloat(newTransaction.amount),
      paymentMethod: newTransaction.paymentMethod,
      customerName: newTransaction.customerName,
      vendorName: newTransaction.vendorName,
      billNumber: newTransaction.billNumber || `BILL-${Date.now()}`,
      upiId: newTransaction.upiId,
      gstAmount: newTransaction.gstAmount ? parseFloat(newTransaction.gstAmount) : 0,
      date: selectedDate
    };

    setTransactions(prev => [...prev, transaction]);
    setShowAddModal(false);
    resetForm();
  };

  // Reset form
  const resetForm = () => {
    setNewTransaction({
      amount: '',
      paymentMethod: 'cash',
      category: 'sales',
      description: '',
      customerName: '',
      gstAmount: '',
      billNumber: '',
      upiId: '',
      vendorName: ''
    });
  };

  // Export data as CSV
  const handleExport = () => {
    const todayTransactions = transactions.filter(t => t.date === selectedDate);
    const headers = ['Time', 'Type', 'Category', 'Description', 'Amount', 'Payment Method', 'Customer/Vendor', 'GST Amount'];
    
    const csvContent = [
      headers.join(','),
      ...todayTransactions.map(t => [
        t.time,
        t.type,
        t.category,
        `"${t.description}"`,
        t.amount,
        t.paymentMethod,
        `"${t.customerName || t.vendorName || ''}"`,
        t.gstAmount || 0
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cashflow-${selectedDate}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Refresh data
  const handleRefresh = () => {
    // In a real app, this would fetch fresh data from an API
    alert('Data refreshed!');
  };

  // Generate reports
  const generateReport = (reportType) => {
    switch(reportType) {
      case 'daily':
        alert('Generating Daily Cash Report...');
        break;
      case 'gst':
        alert('Generating GST Report...');
        break;
      case 'profit':
        alert('Generating Profit & Loss Report...');
        break;
      default:
        break;
    }
  };

  return (
    <div className={`p-6 space-y-6 ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className={`text-2xl font-semibold ${
              theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Cash Flow Manager
            </h1>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Track all money in and out with payment method separation
            </p>
          </div>
          <div className="flex items-center space-x-3">
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
            
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className={`border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
            <button 
              onClick={handleExport}
              className={`border rounded-lg px-4 py-2 flex items-center space-x-2 transition-colors ${
                theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600' 
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Download size={16} />
              <span>Export</span>
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors"
            >
              <Plus size={16} />
              <span>Add Transaction</span>
            </button>
          </div>
        </div>

        {/* Daily Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className={`rounded-lg shadow p-6 transition-colors ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Total Inflow
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(dailySummary.totalInflow)}
                </p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center">
                    <Banknote size={12} className="text-green-500 mr-1" />
                    <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {formatCurrency(dailySummary.cashInflow)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Smartphone size={12} className="text-blue-500 mr-1" />
                    <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {formatCurrency(dailySummary.upiInflow)}
                    </span>
                  </div>
                </div>
              </div>
              <div className={`p-3 rounded-full ${
                theme === 'dark' ? 'bg-green-900/50' : 'bg-green-100'
              }`}>
                <ArrowDownLeft className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className={`rounded-lg shadow p-6 transition-colors ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Total Outflow
                </p>
                <p className="text-2xl font-bold text-red-600">
                  {formatCurrency(dailySummary.totalOutflow)}
                </p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center">
                    <Banknote size={12} className="text-green-500 mr-1" />
                    <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {formatCurrency(dailySummary.cashOutflow)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Smartphone size={12} className="text-blue-500 mr-1" />
                    <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {formatCurrency(dailySummary.upiOutflow)}
                    </span>
                  </div>
                </div>
              </div>
              <div className={`p-3 rounded-full ${
                theme === 'dark' ? 'bg-red-900/50' : 'bg-red-100'
              }`}>
                <ArrowUpRight className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </div>
          
          <div className={`rounded-lg shadow p-6 transition-colors ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Net Cash Flow
                </p>
                <p className={`text-2xl font-bold ${
                  dailySummary.netCashFlow >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {formatCurrency(dailySummary.netCashFlow)}
                </p>
              </div>
              <div className={`p-3 rounded-full ${
                dailySummary.netCashFlow >= 0 
                  ? theme === 'dark' ? 'bg-green-900/50' : 'bg-green-100'
                  : theme === 'dark' ? 'bg-red-900/50' : 'bg-red-100'
              }`}>
                {dailySummary.netCashFlow >= 0 ? 
                  <TrendingUp className="h-5 w-5 text-green-600" /> : 
                  <TrendingDown className="h-5 w-5 text-red-600" />
                }
              </div>
            </div>
          </div>
          
          <div className={`rounded-lg shadow p-6 transition-colors ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  GST Summary
                </p>
                <div className="mt-1">
                  <div className="flex justify-between">
                    <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      Collected:
                    </span>
                    <span className="text-xs font-medium text-green-600">
                      {formatCurrency(dailySummary.gstCollected)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      Paid:
                    </span>
                    <span className="text-xs font-medium text-red-600">
                      {formatCurrency(dailySummary.gstPaid)}
                    </span>
                  </div>
                </div>
              </div>
              <div className={`p-3 rounded-full ${
                theme === 'dark' ? 'bg-yellow-900/50' : 'bg-yellow-100'
              }`}>
                <IndianRupee className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className={`rounded-lg shadow mb-6 transition-colors ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className={`border-b ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {[
              { id: 'overview', name: 'Today\'s Transactions' },
              { id: 'weekly', name: 'Weekly Summary' },
              { id: 'reports', name: 'Reports' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : `${
                        theme === 'dark' 
                          ? 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600' 
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-400'
                    }`} size={16} />
                    <input
                      type="text"
                      placeholder="Search transactions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`pl-10 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                    />
                  </div>
                  <select
                    value={paymentFilter}
                    onChange={(e) => setPaymentFilter(e.target.value)}
                    className={`border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="All">All Payment Methods</option>
                    <option value="cash">Cash Only</option>
                    <option value="upi">UPI Only</option>
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="card">Card</option>
                  </select>
                </div>
                <button 
                  onClick={handleRefresh}
                  className={`border rounded-lg px-3 py-2 flex items-center space-x-2 transition-colors ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600' 
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <RefreshCw size={16} />
                  <span>Refresh</span>
                </button>
              </div>

              {/* Transactions List */}
              <div className="space-y-3">
                {filteredTransactions.length === 0 ? (
                  <div className={`text-center py-8 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    No transactions found for the selected criteria.
                  </div>
                ) : (
                  filteredTransactions.map((transaction) => (
                    <div key={transaction.id} className={`rounded-lg p-4 transition-colors ${
                      theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`p-2 rounded-full ${
                            transaction.type === 'in' 
                              ? theme === 'dark' ? 'bg-green-900/50' : 'bg-green-100'
                              : theme === 'dark' ? 'bg-red-900/50' : 'bg-red-100'
                          }`}>
                            {transaction.type === 'in' ? 
                              <ArrowDownLeft className={`h-4 w-4 text-green-600`} /> : 
                              <ArrowUpRight className={`h-4 w-4 text-red-600`} />
                            }
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className={`font-medium ${
                                theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                              }`}>
                                {transaction.description}
                              </h3>
                              {getPaymentMethodIcon(transaction.paymentMethod)}
                            </div>
                            <p className={`text-sm ${
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {transaction.time} • {transaction.category}
                              {transaction.billNumber && ` • ${transaction.billNumber}`}
                            </p>
                            {transaction.customerName && (
                              <p className={`text-xs ${
                                theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                              }`}>
                                Customer: {transaction.customerName}
                              </p>
                            )}
                            {transaction.vendorName && (
                              <p className={`text-xs ${
                                theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                              }`}>
                                Vendor: {transaction.vendorName}
                              </p>
                            )}
                            {transaction.upiId && (
                              <p className="text-xs text-blue-600">UPI: {transaction.upiId}</p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-lg font-bold ${
                            transaction.type === 'in' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {transaction.type === 'in' ? '+' : '-'}{formatCurrency(transaction.amount)}
                          </p>
                          {transaction.gstAmount > 0 && (
                            <p className={`text-xs ${
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                              GST: {formatCurrency(transaction.gstAmount)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'weekly' && (
            <div className="space-y-6">
              <h3 className={`text-lg font-medium ${
                theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Weekly Business Summary
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={`rounded-lg p-6 transition-colors ${
                  theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'
                }`}>
                  <h4 className={`font-medium mb-3 ${
                    theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                  }`}>
                    Sales Performance
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Total Sales:
                      </span>
                      <span className="font-medium text-green-600">
                        {formatCurrency(weeklySummary.totalSales)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Cash Sales:
                      </span>
                      <span className={`font-medium ${
                        theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      }`}>
                        {formatCurrency(weeklySummary.cashSales)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        UPI Sales:
                      </span>
                      <span className={`font-medium ${
                        theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      }`}>
                        {formatCurrency(weeklySummary.upiSales)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Avg Bill Value:
                      </span>
                      <span className={`font-medium ${
                        theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      }`}>
                        {formatCurrency(weeklySummary.averageBillValue)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className={`rounded-lg p-6 transition-colors ${
                  theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'
                }`}>
                  <h4 className={`font-medium mb-3 ${
                    theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                  }`}>
                    Business Metrics
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Total Transactions:
                      </span>
                      <span className={`font-medium ${
                        theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      }`}>
                        {weeklySummary.transactionCount}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Net Profit:
                      </span>
                      <span className="font-medium text-blue-600">
                        {formatCurrency(weeklySummary.netProfit)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Top Category:
                      </span>
                      <span className={`font-medium text-sm ${
                        theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      }`}>
                        {weeklySummary.topSellingCategory}
                      </span>
                    </div>
                  </div>
                </div>

                <div className={`rounded-lg p-6 transition-colors ${
                  theme === 'dark' ? 'bg-yellow-900/20' : 'bg-yellow-50'
                }`}>
                  <h4 className={`font-medium mb-3 ${
                    theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                  }`}>
                    Payment Split
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className={`text-sm ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          Cash
                        </span>
                        <span className={`text-sm font-medium ${
                          theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                        }`}>
                          {((weeklySummary.cashSales / weeklySummary.totalSales) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className={`w-full rounded-full h-2 ${
                        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                      }`}>
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(weeklySummary.cashSales / weeklySummary.totalSales) * 100}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className={`text-sm ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          UPI
                        </span>
                        <span className={`text-sm font-medium ${
                          theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                        }`}>
                          {((weeklySummary.upiSales / weeklySummary.totalSales) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className={`w-full rounded-full h-2 ${
                        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                      }`}>
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(weeklySummary.upiSales / weeklySummary.totalSales) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-6">
              <h3 className={`text-lg font-medium ${
                theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Financial Reports
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button 
                  onClick={() => generateReport('daily')}
                  className={`p-4 text-left border rounded-lg transition-colors ${
                    theme === 'dark' 
                      ? 'border-gray-700 bg-gray-800 hover:bg-gray-700' 
                      : 'border-gray-200 bg-white hover:bg-gray-50'
                  }`}
                >
                  <h4 className={`font-medium mb-2 ${
                    theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                  }`}>
                    Daily Cash Report
                  </h4>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Cash in hand, transactions, reconciliation
                  </p>
                </button>
                <button 
                  onClick={() => generateReport('gst')}
                  className={`p-4 text-left border rounded-lg transition-colors ${
                    theme === 'dark' 
                      ? 'border-gray-700 bg-gray-800 hover:bg-gray-700' 
                      : 'border-gray-200 bg-white hover:bg-gray-50'
                  }`}
                >
                  <h4 className={`font-medium mb-2 ${
                    theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                  }`}>
                    GST Report
                  </h4>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    GST collected, paid, and filing ready report
                  </p>
                </button>
                <button 
                  onClick={() => generateReport('profit')}
                  className={`p-4 text-left border rounded-lg transition-colors ${
                    theme === 'dark' 
                      ? 'border-gray-700 bg-gray-800 hover:bg-gray-700' 
                      : 'border-gray-200 bg-white hover:bg-gray-50'
                  }`}
                >
                  <h4 className={`font-medium mb-2 ${
                    theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                  }`}>
                    Profit & Loss
                  </h4>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Revenue vs expenses analysis
                  </p>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Transaction Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className={`relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md transition-colors ${
            theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
          }`}>
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-medium ${
                  theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  Add Transaction
                </h3>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    resetForm();
                  }}
                  className={`text-2xl ${
                    theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  ×
                </button>
              </div>
              
              {/* Transaction Type Toggle */}
              <div className="mb-4">
                <div className={`flex rounded-lg border p-1 ${
                  theme === 'dark' ? 'border-gray-600' : 'border-gray-300'
                }`}>
                  <button
                    onClick={() => setTransactionType('in')}
                    className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                      transactionType === 'in'
                        ? theme === 'dark' 
                          ? 'bg-green-900 text-green-300' 
                          : 'bg-green-100 text-green-700'
                        : theme === 'dark'
                          ? 'text-gray-400 hover:text-gray-300'
                          : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Money In
                  </button>
                  <button
                    onClick={() => setTransactionType('out')}
                    className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                      transactionType === 'out'
                        ? theme === 'dark' 
                          ? 'bg-red-900 text-red-300' 
                          : 'bg-red-100 text-red-700'
                        : theme === 'dark'
                          ? 'text-gray-400 hover:text-gray-300'
                          : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Money Out
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Amount (₹) *
                  </label>
                  <input
                    type="number"
                    name="amount"
                    value={newTransaction.amount}
                    onChange={handleInputChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Enter amount"
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Payment Method
                  </label>
                  <select 
                    name="paymentMethod"
                    value={newTransaction.paymentMethod}
                    onChange={handleInputChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="cash">Cash</option>
                    <option value="upi">UPI</option>
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="card">Card</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Category
                  </label>
                  <select 
                    name="category"
                    value={newTransaction.category}
                    onChange={handleInputChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    {transactionType === 'in' ? (
                      <>
                        <option value="sales">Sales</option>
                        <option value="service">Service Income</option>
                        <option value="other">Other Income</option>
                      </>
                    ) : (
                      <>
                        <option value="purchase">Purchase</option>
                        <option value="expense">Operating Expense</option>
                        <option value="salary">Salary</option>
                        <option value="rent">Rent</option>
                        <option value="utility">Utilities</option>
                        <option value="other">Other Expense</option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Description *
                  </label>
                  <input
                    type="text"
                    name="description"
                    value={newTransaction.description}
                    onChange={handleInputChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Enter description"
                  />
                </div>

                {transactionType === 'in' ? (
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Customer Name (Optional)
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      value={newTransaction.customerName}
                      onChange={handleInputChange}
                      className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="Enter customer name"
                    />
                  </div>
                ) : (
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Vendor Name (Optional)
                    </label>
                    <input
                      type="text"
                      name="vendorName"
                      value={newTransaction.vendorName}
                      onChange={handleInputChange}
                      className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="Enter vendor name"
                    />
                  </div>
                )}

                {newTransaction.paymentMethod === 'upi' && (
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      UPI ID (Optional)
                    </label>
                    <input
                      type="text"
                      name="upiId"
                      value={newTransaction.upiId}
                      onChange={handleInputChange}
                      className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="Enter UPI ID"
                    />
                  </div>
                )}

                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Bill Number (Optional)
                  </label>
                  <input
                    type="text"
                    name="billNumber"
                    value={newTransaction.billNumber}
                    onChange={handleInputChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Enter bill number"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    GST Amount (₹) (Optional)
                  </label>
                  <input
                    type="number"
                    name="gstAmount"
                    value={newTransaction.gstAmount}
                    onChange={handleInputChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Enter GST amount if applicable"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    resetForm();
                  }}
                  className={`border rounded-lg px-4 py-2 transition-colors ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600' 
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddTransaction}
                  className={`px-4 py-2 rounded-lg text-white transition-colors ${
                    transactionType === 'in' 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  Add {transactionType === 'in' ? 'Income' : 'Expense'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CashFlowManager;