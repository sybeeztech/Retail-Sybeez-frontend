import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  CreditCard, 
  Receipt, 
  PieChart, 
  BarChart3,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Download,
  Plus,
  Filter
} from 'lucide-react';

const FinanceDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');

  // Sample financial data
  const financialMetrics = {
    totalRevenue: 1250000,
    totalExpenses: 850000,
    netProfit: 400000,
    grossMargin: 68.5,
    cashFlow: 320000,
    accountsReceivable: 180000,
    accountsPayable: 95000,
    currentRatio: 2.3
  };

  const recentTransactions = [
    {
      id: 1,
      date: '2024-10-07',
      description: 'Software License Payment',
      category: 'Technology',
      amount: -15000,
      type: 'expense',
      status: 'completed',
      reference: 'TXN001'
    },
    {
      id: 2,
      date: '2024-10-07',
      description: 'Client Payment - Tech Solutions',
      category: 'Revenue',
      amount: 75000,
      type: 'income',
      status: 'completed',
      reference: 'INV-2024-001'
    },
    {
      id: 3,
      date: '2024-10-06',
      description: 'Office Rent',
      category: 'Facilities',
      amount: -8500,
      type: 'expense',
      status: 'completed',
      reference: 'RENT-OCT'
    },
    {
      id: 4,
      date: '2024-10-06',
      description: 'Marketing Campaign',
      category: 'Marketing',
      amount: -12000,
      type: 'expense',
      status: 'pending',
      reference: 'MKT-Q4-01'
    },
    {
      id: 5,
      date: '2024-10-05',
      description: 'Consulting Services',
      category: 'Revenue',
      amount: 25000,
      type: 'income',
      status: 'completed',
      reference: 'INV-2024-002'
    }
  ];

  const monthlyData = [
    { month: 'Jan', revenue: 85000, expenses: 65000, profit: 20000 },
    { month: 'Feb', revenue: 92000, expenses: 68000, profit: 24000 },
    { month: 'Mar', revenue: 78000, expenses: 62000, profit: 16000 },
    { month: 'Apr', revenue: 105000, expenses: 75000, profit: 30000 },
    { month: 'May', revenue: 98000, expenses: 72000, profit: 26000 },
    { month: 'Jun', revenue: 115000, expenses: 82000, profit: 33000 },
    { month: 'Jul', revenue: 125000, expenses: 88000, profit: 37000 },
    { month: 'Aug', revenue: 110000, expenses: 78000, profit: 32000 },
    { month: 'Sep', revenue: 135000, expenses: 95000, profit: 40000 },
    { month: 'Oct', revenue: 145000, expenses: 98000, profit: 47000 }
  ];

  const expenseCategories = [
    { category: 'Technology', amount: 125000, percentage: 14.7, color: 'bg-blue-500' },
    { category: 'Facilities', amount: 102000, percentage: 12.0, color: 'bg-green-500' },
    { category: 'Marketing', amount: 95000, percentage: 11.2, color: 'bg-purple-500' },
    { category: 'Salaries', amount: 385000, percentage: 45.3, color: 'bg-orange-500' },
    { category: 'Operations', amount: 78000, percentage: 9.2, color: 'bg-yellow-500' },
    { category: 'Other', amount: 65000, percentage: 7.6, color: 'bg-gray-500' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Finance Dashboard</h1>
            <p className="text-gray-600">Overview of your financial performance and metrics</p>
          </div>
          <div className="flex space-x-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="This Week">This Week</option>
              <option value="This Month">This Month</option>
              <option value="This Quarter">This Quarter</option>
              <option value="This Year">This Year</option>
            </select>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
              <Download size={16} />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Key Financial Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-3xl font-bold text-green-600">{formatCurrency(financialMetrics.totalRevenue)}</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight size={16} className="text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+12.5% from last month</span>
                </div>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                <p className="text-3xl font-bold text-red-600">{formatCurrency(financialMetrics.totalExpenses)}</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight size={16} className="text-red-500 mr-1" />
                  <span className="text-sm text-red-600">+8.2% from last month</span>
                </div>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <TrendingDown className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Net Profit</p>
                <p className="text-3xl font-bold text-blue-600">{formatCurrency(financialMetrics.netProfit)}</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight size={16} className="text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+18.7% from last month</span>
                </div>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cash Flow</p>
                <p className="text-3xl font-bold text-purple-600">{formatCurrency(financialMetrics.cashFlow)}</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight size={16} className="text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+15.3% from last month</span>
                </div>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Gross Margin</p>
                <p className="text-2xl font-bold text-gray-900">{financialMetrics.grossMargin}%</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <PieChart className="h-5 w-5 text-orange-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Accounts Receivable</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(financialMetrics.accountsReceivable)}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Receipt className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Accounts Payable</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(financialMetrics.accountsPayable)}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <CreditCard className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current Ratio</p>
                <p className="text-2xl font-bold text-gray-900">{financialMetrics.currentRatio}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue vs Expenses Chart */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Revenue vs Expenses</h2>
            <p className="text-gray-600">Monthly comparison of income and expenses</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {monthlyData.slice(-6).map((data, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 w-12">{data.month}</span>
                  <div className="flex-1 mx-4">
                    <div className="flex space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-4 relative">
                        <div 
                          className="bg-green-500 h-4 rounded-full" 
                          style={{ width: `${(data.revenue / 150000) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex-1 bg-gray-200 rounded-full h-4 relative">
                        <div 
                          className="bg-red-500 h-4 rounded-full" 
                          style={{ width: `${(data.expenses / 150000) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-green-600">{formatCurrency(data.revenue)}</div>
                    <div className="text-sm text-red-600">{formatCurrency(data.expenses)}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-center space-x-6">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                <span className="text-sm text-gray-600">Revenue</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                <span className="text-sm text-gray-600">Expenses</span>
              </div>
            </div>
          </div>
        </div>

        {/* Expense Categories */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Expense Categories</h2>
            <p className="text-gray-600">Breakdown of expenses by category</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {expenseCategories.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    <div className={`w-4 h-4 ${category.color} rounded mr-3`}></div>
                    <span className="text-sm font-medium text-gray-700">{category.category}</span>
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div 
                        className={`${category.color} h-2 rounded-full`}
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{formatCurrency(category.amount)}</div>
                    <div className="text-xs text-gray-500">{category.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
              <p className="text-gray-600">Latest financial transactions and activities</p>
            </div>
            <div className="flex space-x-2">
              <button className="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
                <Filter size={16} />
                <span>Filter</span>
              </button>
              <button className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                <Plus size={16} />
                <span>Add Transaction</span>
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reference
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      <Calendar size={12} className="mr-2 text-gray-400" />
                      {new Date(transaction.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{transaction.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {transaction.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.reference}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <Eye size={16} />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Download size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FinanceDashboard;