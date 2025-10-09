import React, { useState } from 'react';
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
  IndianRupee
} from 'lucide-react';

const CashFlowManager = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [paymentFilter, setPaymentFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [transactionType, setTransactionType] = useState('in');

  // Sample cash flow data for Indian retail
  const todaysTransactions = [
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
      gstAmount: 62.50
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
      gstAmount: 42.50
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
      gstAmount: 900
    },
    {
      id: 4,
      time: '11:15 AM',
      type: 'out',
      category: 'Expense',
      description: 'Shop Rent',
      amount: 15000,
      paymentMethod: 'cash',
      description: 'Monthly Shop Rent - October 2024'
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
      gstAmount: 16
    },
    {
      id: 6,
      time: '03:45 PM',
      type: 'out',
      category: 'Expense',
      description: 'Electricity Bill',
      amount: 2800,
      paymentMethod: 'upi',
      upiId: 'shop@phonepe'
    }
  ];

  const dailySummary = {
    totalInflow: 2420,
    totalOutflow: 22800,
    netCashFlow: -20380,
    cashInflow: 1250,
    upiInflow: 1170,
    cashOutflow: 15000,
    upiOutflow: 2800,
    bankOutflow: 5000,
    gstCollected: 121,
    gstPaid: 900
  };

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

  const formatTime = (timeStr) => {
    return timeStr;
  };

  const filteredTransactions = todaysTransactions.filter(transaction => {
    if (paymentFilter === 'All') return true;
    return transaction.paymentMethod === paymentFilter.toLowerCase();
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Cash Flow Manager</h1>
            <p className="text-gray-600">Track all money in and out with payment method separation</p>
          </div>
          <div className="flex space-x-3">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
              <Download size={16} />
              <span>Export</span>
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Add Transaction</span>
            </button>
          </div>
        </div>

        {/* Daily Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Inflow</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(dailySummary.totalInflow)}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center">
                    <Banknote size={12} className="text-green-500 mr-1" />
                    <span className="text-xs text-gray-600">{formatCurrency(dailySummary.cashInflow)}</span>
                  </div>
                  <div className="flex items-center">
                    <Smartphone size={12} className="text-blue-500 mr-1" />
                    <span className="text-xs text-gray-600">{formatCurrency(dailySummary.upiInflow)}</span>
                  </div>
                </div>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <ArrowDownLeft className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Outflow</p>
                <p className="text-2xl font-bold text-red-600">{formatCurrency(dailySummary.totalOutflow)}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center">
                    <Banknote size={12} className="text-green-500 mr-1" />
                    <span className="text-xs text-gray-600">{formatCurrency(dailySummary.cashOutflow)}</span>
                  </div>
                  <div className="flex items-center">
                    <Smartphone size={12} className="text-blue-500 mr-1" />
                    <span className="text-xs text-gray-600">{formatCurrency(dailySummary.upiOutflow)}</span>
                  </div>
                </div>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <ArrowUpRight className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Net Cash Flow</p>
                <p className={`text-2xl font-bold ${dailySummary.netCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(dailySummary.netCashFlow)}
                </p>
              </div>
              <div className={`p-3 rounded-full ${dailySummary.netCashFlow >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                {dailySummary.netCashFlow >= 0 ? 
                  <TrendingUp className="h-5 w-5 text-green-600" /> : 
                  <TrendingDown className="h-5 w-5 text-red-600" />
                }
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">GST Summary</p>
                <div className="mt-1">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Collected:</span>
                    <span className="text-xs font-medium text-green-600">{formatCurrency(dailySummary.gstCollected)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Paid:</span>
                    <span className="text-xs font-medium text-red-600">{formatCurrency(dailySummary.gstPaid)}</span>
                  </div>
                </div>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <IndianRupee className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {[
              { id: 'overview', name: 'Today\'s Transactions' },
              { id: 'weekly', name: 'Weekly Summary' },
              { id: 'reports', name: 'Reports' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}
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
                  <select
                    value={paymentFilter}
                    onChange={(e) => setPaymentFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="All">All Payment Methods</option>
                    <option value="cash">Cash Only</option>
                    <option value="upi">UPI Only</option>
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="card">Card</option>
                  </select>
                </div>
                <button className="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
                  <RefreshCw size={16} />
                  <span>Refresh</span>
                </button>
              </div>

              {/* Transactions List */}
              <div className="space-y-3">
                {filteredTransactions.map((transaction) => (
                  <div key={transaction.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-full ${transaction.type === 'in' ? 'bg-green-100' : 'bg-red-100'}`}>
                          {transaction.type === 'in' ? 
                            <ArrowDownLeft className={`h-4 w-4 text-green-600`} /> : 
                            <ArrowUpRight className={`h-4 w-4 text-red-600`} />
                          }
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium text-gray-900">{transaction.description}</h3>
                            {getPaymentMethodIcon(transaction.paymentMethod)}
                          </div>
                          <p className="text-sm text-gray-600">
                            {transaction.time} • {transaction.category}
                            {transaction.billNumber && ` • ${transaction.billNumber}`}
                          </p>
                          {transaction.customerName && (
                            <p className="text-xs text-gray-500">Customer: {transaction.customerName}</p>
                          )}
                          {transaction.vendorName && (
                            <p className="text-xs text-gray-500">Vendor: {transaction.vendorName}</p>
                          )}
                          {transaction.upiId && (
                            <p className="text-xs text-blue-600">UPI: {transaction.upiId}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-bold ${transaction.type === 'in' ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.type === 'in' ? '+' : '-'}{formatCurrency(transaction.amount)}
                        </p>
                        {transaction.gstAmount && (
                          <p className="text-xs text-gray-500">GST: {formatCurrency(transaction.gstAmount)}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'weekly' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Weekly Business Summary</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-green-50 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-3">Sales Performance</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Sales:</span>
                      <span className="font-medium text-green-600">{formatCurrency(weeklySummary.totalSales)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Cash Sales:</span>
                      <span className="font-medium">{formatCurrency(weeklySummary.cashSales)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">UPI Sales:</span>
                      <span className="font-medium">{formatCurrency(weeklySummary.upiSales)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Avg Bill Value:</span>
                      <span className="font-medium">{formatCurrency(weeklySummary.averageBillValue)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-3">Business Metrics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Transactions:</span>
                      <span className="font-medium">{weeklySummary.transactionCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Net Profit:</span>
                      <span className="font-medium text-blue-600">{formatCurrency(weeklySummary.netProfit)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Top Category:</span>
                      <span className="font-medium text-sm">{weeklySummary.topSellingCategory}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-3">Payment Split</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">Cash</span>
                        <span className="text-sm font-medium">{((weeklySummary.cashSales / weeklySummary.totalSales) * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(weeklySummary.cashSales / weeklySummary.totalSales) * 100}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">UPI</span>
                        <span className="text-sm font-medium">{((weeklySummary.upiSales / weeklySummary.totalSales) * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
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
              <h3 className="text-lg font-medium text-gray-900">Financial Reports</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50">
                  <h4 className="font-medium mb-2">Daily Cash Report</h4>
                  <p className="text-sm text-gray-600">Cash in hand, transactions, reconciliation</p>
                </button>
                <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50">
                  <h4 className="font-medium mb-2">GST Report</h4>
                  <p className="text-sm text-gray-600">GST collected, paid, and filing ready report</p>
                </button>
                <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50">
                  <h4 className="font-medium mb-2">Profit & Loss</h4>
                  <p className="text-sm text-gray-600">Revenue vs expenses analysis</p>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Transaction Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Add Transaction</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              {/* Transaction Type Toggle */}
              <div className="mb-4">
                <div className="flex rounded-lg border border-gray-300 p-1">
                  <button
                    onClick={() => setTransactionType('in')}
                    className={`flex-1 py-2 px-3 rounded-md text-sm font-medium ${
                      transactionType === 'in'
                        ? 'bg-green-100 text-green-700'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Money In
                  </button>
                  <button
                    onClick={() => setTransactionType('out')}
                    className={`flex-1 py-2 px-3 rounded-md text-sm font-medium ${
                      transactionType === 'out'
                        ? 'bg-red-100 text-red-700'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Money Out
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount (₹)
                  </label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter amount"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Method
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="cash">Cash</option>
                    <option value="upi">UPI</option>
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="card">Card</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter description"
                  />
                </div>

                {transactionType === 'in' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Customer Name (Optional)
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter customer name"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    GST Amount (₹)
                  </label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter GST amount if applicable"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className={`px-4 py-2 rounded-lg text-white ${
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