import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  Target,
  AlertTriangle,
  CheckCircle,
  Calendar,
  PieChart,
  BarChart3,
  Download,
  Upload,
  Percent,
  Calculator
} from 'lucide-react';

const BudgetManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('2024');
  const [activeTab, setActiveTab] = useState('overview');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Sample budget data
  const budgetCategories = [
    {
      id: 1,
      category: 'Technology',
      budgeted: 150000,
      spent: 125000,
      remaining: 25000,
      percentage: 83.3,
      variance: -25000,
      status: 'warning',
      lastUpdated: '2024-10-07',
      subcategories: [
        { name: 'Software Licenses', budgeted: 80000, spent: 72000 },
        { name: 'Hardware', budgeted: 50000, spent: 38000 },
        { name: 'Cloud Services', budgeted: 20000, spent: 15000 }
      ]
    },
    {
      id: 2,
      category: 'Marketing',
      budgeted: 120000,
      spent: 95000,
      remaining: 25000,
      percentage: 79.2,
      variance: 25000,
      status: 'good',
      lastUpdated: '2024-10-06',
      subcategories: [
        { name: 'Digital Advertising', budgeted: 70000, spent: 58000 },
        { name: 'Content Creation', budgeted: 30000, spent: 22000 },
        { name: 'Events', budgeted: 20000, spent: 15000 }
      ]
    },
    {
      id: 3,
      category: 'Operations',
      budgeted: 200000,
      spent: 180000,
      remaining: 20000,
      percentage: 90.0,
      variance: 20000,
      status: 'warning',
      lastUpdated: '2024-10-05',
      subcategories: [
        { name: 'Office Rent', budgeted: 120000, spent: 108000 },
        { name: 'Utilities', budgeted: 30000, spent: 28000 },
        { name: 'Supplies', budgeted: 50000, spent: 44000 }
      ]
    },
    {
      id: 4,
      category: 'Human Resources',
      budgeted: 800000,
      spent: 820000,
      remaining: -20000,
      percentage: 102.5,
      variance: -20000,
      status: 'critical',
      lastUpdated: '2024-10-07',
      subcategories: [
        { name: 'Salaries', budgeted: 650000, spent: 665000 },
        { name: 'Benefits', budgeted: 100000, spent: 105000 },
        { name: 'Training', budgeted: 50000, spent: 50000 }
      ]
    },
    {
      id: 5,
      category: 'Research & Development',
      budgeted: 180000,
      spent: 120000,
      remaining: 60000,
      percentage: 66.7,
      variance: 60000,
      status: 'good',
      lastUpdated: '2024-10-04',
      subcategories: [
        { name: 'Product Development', budgeted: 120000, spent: 85000 },
        { name: 'Innovation Labs', budgeted: 40000, spent: 25000 },
        { name: 'Patents', budgeted: 20000, spent: 10000 }
      ]
    }
  ];

  const quarterlyData = [
    { quarter: 'Q1 2024', budgeted: 350000, actual: 325000, variance: 25000 },
    { quarter: 'Q2 2024', budgeted: 380000, actual: 395000, variance: -15000 },
    { quarter: 'Q3 2024', budgeted: 420000, actual: 410000, variance: 10000 },
    { quarter: 'Q4 2024', budgeted: 450000, actual: 0, variance: 0 }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'good': return <CheckCircle size={16} className="text-green-600" />;
      case 'warning': return <AlertTriangle size={16} className="text-yellow-600" />;
      case 'critical': return <AlertTriangle size={16} className="text-red-600" />;
      default: return <Target size={16} className="text-gray-600" />;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getVarianceColor = (variance) => {
    if (variance > 0) return 'text-green-600';
    if (variance < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const filteredCategories = budgetCategories.filter(category =>
    category.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate totals
  const totalBudgeted = budgetCategories.reduce((sum, cat) => sum + cat.budgeted, 0);
  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0);
  const totalRemaining = budgetCategories.reduce((sum, cat) => sum + cat.remaining, 0);
  const totalVariance = budgetCategories.reduce((sum, cat) => sum + cat.variance, 0);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Budget Management</h1>
            <p className="text-gray-600">Plan, track, and analyze your budget performance</p>
          </div>
          <div className="flex space-x-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="Q4 2024">Q4 2024</option>
              <option value="Q3 2024">Q3 2024</option>
            </select>
            <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
              <Download size={16} />
              <span>Export</span>
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Create Budget</span>
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Budgeted</p>
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(totalBudgeted)}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Target className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-red-600">{formatCurrency(totalSpent)}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {((totalSpent / totalBudgeted) * 100).toFixed(1)}% of budget
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <DollarSign className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Remaining</p>
                <p className={`text-2xl font-bold ${totalRemaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(totalRemaining)}
                </p>
              </div>
              <div className={`p-3 rounded-full ${totalRemaining >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                <Calculator className={`h-5 w-5 ${totalRemaining >= 0 ? 'text-green-600' : 'text-red-600'}`} />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Variance</p>
                <p className={`text-2xl font-bold ${getVarianceColor(totalVariance)}`}>
                  {totalVariance > 0 ? '+' : ''}{formatCurrency(totalVariance)}
                </p>
                <div className="flex items-center mt-1">
                  {totalVariance >= 0 ? 
                    <TrendingUp size={16} className="text-green-500 mr-1" /> : 
                    <TrendingDown size={16} className="text-red-500 mr-1" />
                  }
                  <span className={`text-sm ${getVarianceColor(totalVariance)}`}>
                    {totalVariance >= 0 ? 'Under' : 'Over'} budget
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-full ${totalVariance >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                <Percent className={`h-5 w-5 ${totalVariance >= 0 ? 'text-green-600' : 'text-red-600'}`} />
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
              { id: 'overview', name: 'Overview', icon: BarChart3 },
              { id: 'categories', name: 'Categories', icon: PieChart },
              { id: 'quarterly', name: 'Quarterly', icon: Calendar }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
              >
                <tab.icon size={16} />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Search */}
              <div className="flex justify-between items-center">
                <div className="flex-1 max-w-lg">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search budget categories..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <button className="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
                  <Filter size={16} />
                  <span>Filter</span>
                </button>
              </div>

              {/* Budget Categories Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Budgeted
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Spent
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Remaining
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Usage
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredCategories.map((category) => (
                      <tr key={category.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="bg-blue-100 p-2 rounded-full mr-3">
                              <PieChart size={16} className="text-blue-600" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{category.category}</div>
                              <div className="text-sm text-gray-500">
                                Last updated: {new Date(category.lastUpdated).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{formatCurrency(category.budgeted)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{formatCurrency(category.spent)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm font-medium ${getVarianceColor(category.remaining)}`}>
                            {formatCurrency(category.remaining)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3" style={{ minWidth: '80px' }}>
                              <div 
                                className={`h-2 rounded-full ${
                                  category.percentage > 100 ? 'bg-red-500' :
                                  category.percentage > 80 ? 'bg-yellow-500' : 'bg-green-500'
                                }`}
                                style={{ width: `${Math.min(category.percentage, 100)}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-900">{category.percentage.toFixed(1)}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(category.status)}`}>
                            {getStatusIcon(category.status)}
                            <span className="ml-1 capitalize">{category.status}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900" title="Edit">
                              <Edit size={16} />
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
            </div>
          )}

          {activeTab === 'categories' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredCategories.map((category) => (
                <div key={category.id} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">{category.category}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(category.status)}`}>
                      {getStatusIcon(category.status)}
                      <span className="ml-1 capitalize">{category.status}</span>
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    {category.subcategories.map((sub, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{sub.name}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${sub.budgeted ? (sub.spent / sub.budgeted) * 100 : 0}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {formatCurrency(sub.spent)} / {formatCurrency(sub.budgeted)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-900">Total Usage:</span>
                      <span className={`font-medium ${getVarianceColor(category.remaining)}`}>
                        {category.percentage.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'quarterly' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Quarterly Budget Performance</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {quarterlyData.map((quarter, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">{quarter.quarter}</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Budgeted:</span>
                        <span className="text-sm font-medium text-gray-900">{formatCurrency(quarter.budgeted)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Actual:</span>
                        <span className="text-sm font-medium text-gray-900">
                          {quarter.actual > 0 ? formatCurrency(quarter.actual) : 'TBD'}
                        </span>
                      </div>
                      {quarter.variance !== 0 && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Variance:</span>
                          <span className={`text-sm font-medium ${getVarianceColor(quarter.variance)}`}>
                            {quarter.variance > 0 ? '+' : ''}{formatCurrency(quarter.variance)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Budget Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Create New Budget Category</h3>
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
                    Category Name
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter category name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Budget Amount
                  </label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter budget amount"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Period
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="annual">Annual</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="monthly">Monthly</option>
                  </select>
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
                  Create Budget
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetManagement;