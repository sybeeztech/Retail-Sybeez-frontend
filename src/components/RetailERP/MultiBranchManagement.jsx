import React, { useState, useEffect } from 'react';
import useSettingsStore from '../../store/settingsStore';
import {
  Building2,
  MapPin,
  Users,
  DollarSign,
  Package,
  TrendingUp,
  Phone,
  Mail,
  Clock,
  BarChart3,
  Plus,
  Edit,
  Eye,
  X,
  Store,
  Save,
  Trash2
} from 'lucide-react';

const MultiBranchManagement = () => {
  const { theme } = useSettingsStore();
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [branches, setBranches] = useState([]);

  // Form state for new branch
  const [branchForm, setBranchForm] = useState({
    name: '',
    code: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: '',
    manager: '',
    managerPhone: '',
    openingHours: '9:00 AM - 9:00 PM',
    status: 'active'
  });

  // Format currency in INR
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Load branches from localStorage on component mount
  useEffect(() => {
    const savedBranches = localStorage.getItem('branches');
    if (savedBranches) {
      setBranches(JSON.parse(savedBranches));
    }
  }, []);

  // Save branches to localStorage whenever branches change
  useEffect(() => {
    localStorage.setItem('branches', JSON.stringify(branches));
  }, [branches]);

  const totalStats = {
    totalBranches: branches.length,
    activeBranches: branches.filter(b => b.status === 'active').length,
    totalEmployees: branches.reduce((sum, b) => sum + b.totalEmployees, 0),
    totalSales: branches.reduce((sum, b) => sum + b.monthlySales, 0),
    totalInventoryValue: branches.reduce((sum, b) => sum + b.inventoryValue, 0),
    avgSalesGrowth: branches.length > 0 ?
      branches.reduce((sum, b) => sum + b.performance.salesGrowth, 0) / branches.length : 0
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'closed': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getPerformanceColor = (value, type) => {
    if (type === 'growth') {
      return value > 0 ? 'text-green-600' : 'text-red-600';
    }
    if (type === 'satisfaction') {
      return value >= 4.5 ? 'text-green-600' : value >= 4.0 ? 'text-yellow-600' : 'text-red-600';
    }
    if (type === 'inventory') {
      return value >= 90 ? 'text-green-600' : value >= 80 ? 'text-yellow-600' : 'text-red-600';
    }
    return 'text-gray-600';
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBranchForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle add new branch
  const handleAddBranch = (e) => {
    e.preventDefault();

    if (!branchForm.name.trim() || !branchForm.code.trim()) {
      alert('Branch name and code are required');
      return;
    }

    const newBranch = {
      id: `BR${Date.now()}`,
      ...branchForm,
      totalEmployees: 0,
      monthlySales: 0,
      monthlyTarget: 50000,
      inventoryValue: 0,
      customerCount: 0,
      performance: {
        salesGrowth: 0,
        customerSatisfaction: 0,
        inventory: 0
      },
      recentActivity: []
    };

    setBranches([...branches, newBranch]);
    setShowAddModal(false);
    resetBranchForm();
  };

  // Handle edit branch
  const handleEditBranch = (e) => {
    e.preventDefault();

    const updatedBranches = branches.map(branch =>
      branch.id === editingBranch.id
        ? { ...branch, ...branchForm }
        : branch
    );

    setBranches(updatedBranches);
    setEditingBranch(null);
    resetBranchForm();
  };

  // Handle delete branch
  const handleDeleteBranch = (branchId) => {
    if (window.confirm('Are you sure you want to delete this branch?')) {
      setBranches(branches.filter(branch => branch.id !== branchId));
      if (selectedBranch?.id === branchId) {
        setSelectedBranch(null);
      }
    }
  };

  // Reset form
  const resetBranchForm = () => {
    setBranchForm({
      name: '',
      code: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      phone: '',
      email: '',
      manager: '',
      managerPhone: '',
      openingHours: '9:00 AM - 9:00 PM',
      status: 'active'
    });
  };

  // Open edit modal
  const openEditModal = (branch) => {
    setEditingBranch(branch);
    setBranchForm({
      name: branch.name,
      code: branch.code,
      address: branch.address,
      city: branch.city,
      state: branch.state,
      zipCode: branch.zipCode,
      phone: branch.phone,
      email: branch.email,
      manager: branch.manager,
      managerPhone: branch.managerPhone,
      openingHours: branch.openingHours,
      status: branch.status
    });
  };

  return (
    <div className={`p-6 min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className={`text-2xl font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>Multi-Branch Management</h1>
          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Monitor and manage all retail branches</p>
        </div>
        <div className="flex space-x-3">
          <div className={`flex rounded-lg p-1 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 rounded text-sm ${viewMode === 'grid'
                  ? 'bg-blue-600 text-white'
                  : theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 rounded text-sm ${viewMode === 'list'
                  ? 'bg-blue-600 text-white'
                  : theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}
            >
              List
            </button>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus size={16} />
            <span>Add Branch</span>
          </button>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
        <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Total Branches</p>
              <p className="text-2xl font-bold text-blue-600">{totalStats.totalBranches}</p>
            </div>
            <Building2 className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Active Branches</p>
              <p className="text-2xl font-bold text-green-600">{totalStats.activeBranches}</p>
            </div>
            <Store className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Total Employees</p>
              <p className="text-2xl font-bold text-purple-600">{totalStats.totalEmployees}</p>
            </div>
            <Users className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Combined Sales</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(totalStats.totalSales)}</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Inventory Value</p>
              <p className="text-2xl font-bold text-orange-600">{formatCurrency(totalStats.totalInventoryValue)}</p>
            </div>
            <Package className="h-8 w-8 text-orange-600" />
          </div>
        </div>

        <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Avg Growth</p>
              <p className={`text-2xl font-bold ${getPerformanceColor(totalStats.avgSalesGrowth, 'growth')}`}>
                {totalStats.avgSalesGrowth.toFixed(1)}%
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Branches Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {branches.map((branch) => (
            <div key={branch.id} className={`rounded-lg shadow hover:shadow-md transition-shadow ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              }`}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      }`}>{branch.name}</h3>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>{branch.code}</p>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(branch.status)}`}>
                    {branch.status}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <div className={`flex items-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{branch.city}, {branch.state}</span>
                  </div>
                  <div className={`flex items-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                    <Users className="h-4 w-4 mr-2" />
                    <span>{branch.totalEmployees} employees</span>
                  </div>
                  <div className={`flex items-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{branch.openingHours}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>Monthly Sales</p>
                    <p className="text-lg font-semibold text-green-600">{formatCurrency(branch.monthlySales)}</p>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>Target: {formatCurrency(branch.monthlyTarget)}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>Growth</p>
                    <p className={`text-lg font-semibold ${getPerformanceColor(branch.performance.salesGrowth, 'growth')}`}>
                      {branch.performance.salesGrowth > 0 ? '+' : ''}{branch.performance.salesGrowth}%
                    </p>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>vs last month</p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedBranch(branch)}
                    className="flex-1 bg-blue-600 text-white text-sm py-2 px-3 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-1"
                  >
                    <Eye size={14} />
                    <span>Details</span>
                  </button>
                  <button
                    onClick={() => openEditModal(branch)}
                    className={`text-sm py-2 px-3 rounded-lg ${theme === 'dark'
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={() => handleDeleteBranch(branch.id)}
                    className={`text-sm py-2 px-3 rounded-lg ${theme === 'dark'
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={`rounded-lg shadow overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
          <div className="overflow-x-auto">
            <table className={`min-w-full divide-y ${theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'
              }`}>
              <thead className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                <tr>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                    }`}>Branch</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                    }`}>Location</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                    }`}>Manager</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                    }`}>Sales</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                    }`}>Growth</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                    }`}>Status</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                    }`}>Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${theme === 'dark' ? 'bg-gray-800 divide-gray-700' : 'bg-white divide-gray-200'
                }`}>
                {branches.map((branch) => (
                  <tr key={branch.id} className={`${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                    }`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                          }`}>{branch.name}</div>
                        <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                          }`}>{branch.code}</div>
                      </div>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      }`}>
                      {branch.city}, {branch.state}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                        }`}>{branch.manager}</div>
                      <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}>{branch.totalEmployees} employees</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                        }`}>{formatCurrency(branch.monthlySales)}</div>
                      <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}>Target: {formatCurrency(branch.monthlyTarget)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${getPerformanceColor(branch.performance.salesGrowth, 'growth')}`}>
                        {branch.performance.salesGrowth > 0 ? '+' : ''}{branch.performance.salesGrowth}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(branch.status)}`}>
                        {branch.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedBranch(branch)}
                          className={`hover:opacity-80 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                            }`}
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => openEditModal(branch)}
                          className={`hover:opacity-80 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'
                            }`}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteBranch(branch.id)}
                          className={`hover:opacity-80 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'
                            }`}
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

          {/* Empty State */}
          {branches.length === 0 && (
            <div className="text-center py-12">
              <Building2 className={`mx-auto h-12 w-12 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                }`} />
              <h3 className={`mt-2 text-sm font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                }`}>No branches found</h3>
              <p className={`mt-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                Get started by adding your first branch
              </p>
              <button
                onClick={() => setShowAddModal(true)}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 mx-auto"
              >
                <Plus size={16} />
                <span>Add Your First Branch</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Branch Details Modal */}
      {selectedBranch && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className={`relative top-10 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                }`}>{selectedBranch.name} - Details</h3>
              <button
                onClick={() => setSelectedBranch(null)}
                className={`${theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'
                  }`}
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Branch Information */}
              <div>
                <h4 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                  }`}>Branch Information</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Code:</span>
                    <span className={theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}>{selectedBranch.code}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Address:</span>
                    <span className={`text-right ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>{selectedBranch.address}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Phone:</span>
                    <span className={theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}>{selectedBranch.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Email:</span>
                    <span className={theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}>{selectedBranch.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Manager:</span>
                    <span className={theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}>{selectedBranch.manager}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Hours:</span>
                    <span className={theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}>{selectedBranch.openingHours}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Status:</span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedBranch.status)}`}>
                      {selectedBranch.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div>
                <h4 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                  }`}>Performance Metrics</h4>
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                    }`}>
                    <div className="flex justify-between items-center">
                      <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Sales Growth:</span>
                      <span className={`font-bold ${getPerformanceColor(selectedBranch.performance.salesGrowth, 'growth')}`}>
                        {selectedBranch.performance.salesGrowth > 0 ? '+' : ''}{selectedBranch.performance.salesGrowth}%
                      </span>
                    </div>
                  </div>
                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                    }`}>
                    <div className="flex justify-between items-center">
                      <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Customer Satisfaction:</span>
                      <span className={`font-bold ${getPerformanceColor(selectedBranch.performance.customerSatisfaction, 'satisfaction')}`}>
                        {selectedBranch.performance.customerSatisfaction}/5.0
                      </span>
                    </div>
                  </div>
                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                    }`}>
                    <div className="flex justify-between items-center">
                      <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Inventory Level:</span>
                      <span className={`font-bold ${getPerformanceColor(selectedBranch.performance.inventory, 'inventory')}`}>
                        {selectedBranch.performance.inventory}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="mt-6">
              <h4 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                }`}>Recent Activity</h4>
              <div className="space-y-3">
                {selectedBranch.recentActivity && selectedBranch.recentActivity.length > 0 ? (
                  selectedBranch.recentActivity.map((activity, index) => (
                    <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                      }`}>
                      <div>
                        <p className={`font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                          } capitalize`}>{activity.type.replace('_', ' ')}</p>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                          {activity.amount && `${formatCurrency(activity.amount)}`}
                          {activity.items && `${activity.items} items`}
                          {activity.employee && activity.employee}
                          {activity.discount && `${activity.discount} discount`}
                          {activity.issue && activity.issue}
                          {activity.status && `Status: ${activity.status}`}
                          {activity.topic && activity.topic}
                          {activity.product && activity.product}
                        </p>
                      </div>
                      <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}>{activity.time}</span>
                    </div>
                  ))
                ) : (
                  <p className={`text-center py-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>No recent activity</p>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setSelectedBranch(null)}
                className={`border px-4 py-2 rounded-lg ${theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
              >
                Close
              </button>
              <button
                onClick={() => openEditModal(selectedBranch)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Edit Branch
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Branch Modal */}
      {(showAddModal || editingBranch) && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className={`relative top-10 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                }`}>
                {editingBranch ? 'Edit Branch' : 'Add New Branch'}
              </h3>
              <button onClick={() => {
                setShowAddModal(false);
                setEditingBranch(null);
                resetBranchForm();
              }}>
                <X size={20} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
              </button>
            </div>

            <form onSubmit={editingBranch ? handleEditBranch : handleAddBranch}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>Branch Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={branchForm.name}
                    onChange={handleInputChange}
                    className={`w-full border rounded-lg px-3 py-2 ${theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-gray-100'
                        : 'bg-white border-gray-300 text-gray-900'
                      }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>Branch Code *</label>
                  <input
                    type="text"
                    name="code"
                    required
                    value={branchForm.code}
                    onChange={handleInputChange}
                    className={`w-full border rounded-lg px-3 py-2 ${theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-gray-100'
                        : 'bg-white border-gray-300 text-gray-900'
                      }`}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={branchForm.address}
                    onChange={handleInputChange}
                    className={`w-full border rounded-lg px-3 py-2 ${theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-gray-100'
                        : 'bg-white border-gray-300 text-gray-900'
                      }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>City</label>
                  <input
                    type="text"
                    name="city"
                    value={branchForm.city}
                    onChange={handleInputChange}
                    className={`w-full border rounded-lg px-3 py-2 ${theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-gray-100'
                        : 'bg-white border-gray-300 text-gray-900'
                      }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>State</label>
                  <input
                    type="text"
                    name="state"
                    value={branchForm.state}
                    onChange={handleInputChange}
                    className={`w-full border rounded-lg px-3 py-2 ${theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-gray-100'
                        : 'bg-white border-gray-300 text-gray-900'
                      }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>ZIP Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={branchForm.zipCode}
                    onChange={handleInputChange}
                    className={`w-full border rounded-lg px-3 py-2 ${theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-gray-100'
                        : 'bg-white border-gray-300 text-gray-900'
                      }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={branchForm.phone}
                    onChange={handleInputChange}
                    className={`w-full border rounded-lg px-3 py-2 ${theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-gray-100'
                        : 'bg-white border-gray-300 text-gray-900'
                      }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={branchForm.email}
                    onChange={handleInputChange}
                    className={`w-full border rounded-lg px-3 py-2 ${theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-gray-100'
                        : 'bg-white border-gray-300 text-gray-900'
                      }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>Manager</label>
                  <input
                    type="text"
                    name="manager"
                    value={branchForm.manager}
                    onChange={handleInputChange}
                    className={`w-full border rounded-lg px-3 py-2 ${theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-gray-100'
                        : 'bg-white border-gray-300 text-gray-900'
                      }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>Manager Phone</label>
                  <input
                    type="tel"
                    name="managerPhone"
                    value={branchForm.managerPhone}
                    onChange={handleInputChange}
                    className={`w-full border rounded-lg px-3 py-2 ${theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-gray-100'
                        : 'bg-white border-gray-300 text-gray-900'
                      }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>Opening Hours</label>
                  <input
                    type="text"
                    name="openingHours"
                    value={branchForm.openingHours}
                    onChange={handleInputChange}
                    className={`w-full border rounded-lg px-3 py-2 ${theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-gray-100'
                        : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    placeholder="e.g., 9:00 AM - 9:00 PM"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>Status</label>
                  <select
                    name="status"
                    value={branchForm.status}
                    onChange={handleInputChange}
                    className={`w-full border rounded-lg px-3 py-2 ${theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-gray-100'
                        : 'bg-white border-gray-300 text-gray-900'
                      }`}
                  >
                    <option value="active">Active</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingBranch(null);
                    resetBranchForm();
                  }}
                  className={`border px-4 py-2 rounded-lg ${theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                >
                  <Save size={16} />
                  <span>{editingBranch ? 'Update Branch' : 'Add Branch'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiBranchManagement;