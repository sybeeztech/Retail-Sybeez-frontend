import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  AlertTriangle, 
  Package, 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  RefreshCw,
  Download,
  Upload,
  CheckCircle,
  Clock,
  X,
  Calendar,
  DollarSign,
  Percent,
  Hash,
  Tag,
  MapPin,
  Building,
  Star
} from 'lucide-react';
import useSettingsStore from '../../store/settingsStore';

const InventoryManagement = () => {
  const { theme } = useSettingsStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showStockModal, setShowStockModal] = useState(false);

  // Sample inventory data
  const inventoryItems = [
    {
      id: 1,
      sku: 'ELEC-001',
      name: 'Wireless Bluetooth Headphones',
      category: 'Electronics',
      brand: 'TechSound',
      description: 'Premium wireless headphones with noise cancellation',
      currentStock: 45,
      reorderPoint: 20,
      maxStock: 100,
      unitCost: 75.00,
      unitPrice: 149.99,
      supplier: 'TechCorp Ltd.',
      location: 'Warehouse A - Section B2',
      status: 'in_stock',
      lastRestocked: '2024-09-15',
      monthlyMovement: 23,
      trend: 'up',
      image: null,
      barcode: '1234567890123',
      weight: 0.3,
      dimensions: '20x15x8 cm',
      warrantyPeriod: '2 years',
      tags: ['Premium', 'Wireless', 'Audio'],
      stockMovements: [
        { date: '2024-10-01', type: 'sale', quantity: -5, reason: 'Customer order #1234' },
        { date: '2024-09-28', type: 'purchase', quantity: 25, reason: 'Regular restock' },
        { date: '2024-09-25', type: 'sale', quantity: -8, reason: 'Bulk order #1220' }
      ]
    },
    {
      id: 2,
      sku: 'FURN-002',
      name: 'Ergonomic Office Chair',
      category: 'Furniture',
      brand: 'ComfortSeating',
      description: 'Adjustable ergonomic chair with lumbar support',
      currentStock: 8,
      reorderPoint: 15,
      maxStock: 50,
      unitCost: 120.00,
      unitPrice: 299.99,
      supplier: 'Office Solutions Inc.',
      location: 'Warehouse B - Section A1',
      status: 'low_stock',
      lastRestocked: '2024-08-20',
      monthlyMovement: 12,
      trend: 'down',
      image: null,
      barcode: '2345678901234',
      weight: 18.5,
      dimensions: '65x65x120 cm',
      warrantyPeriod: '5 years',
      tags: ['Ergonomic', 'Office', 'Adjustable'],
      stockMovements: [
        { date: '2024-09-30', type: 'sale', quantity: -3, reason: 'Office setup order' },
        { date: '2024-09-22', type: 'sale', quantity: -4, reason: 'Corporate purchase' },
        { date: '2024-09-15', type: 'adjustment', quantity: -1, reason: 'Damaged item' }
      ]
    },
    {
      id: 3,
      sku: 'CLTH-003',
      name: 'Premium Cotton T-Shirt',
      category: 'Clothing',
      brand: 'StyleCraft',
      description: '100% organic cotton t-shirt in various colors',
      currentStock: 0,
      reorderPoint: 25,
      maxStock: 200,
      unitCost: 8.50,
      unitPrice: 24.99,
      supplier: 'Fashion Distributors LLC',
      location: 'Warehouse A - Section C3',
      status: 'out_of_stock',
      lastRestocked: '2024-07-10',
      monthlyMovement: 45,
      trend: 'up',
      image: null,
      barcode: '3456789012345',
      weight: 0.2,
      dimensions: 'Various sizes',
      warrantyPeriod: 'N/A',
      tags: ['Organic', 'Cotton', 'Casual'],
      stockMovements: [
        { date: '2024-09-28', type: 'sale', quantity: -15, reason: 'Seasonal promotion' },
        { date: '2024-09-25', type: 'sale', quantity: -10, reason: 'Regular sales' },
        { date: '2024-09-20', type: 'sale', quantity: -8, reason: 'Online orders' }
      ]
    },
    {
      id: 4,
      sku: 'BOOK-004',
      name: 'Business Strategy Handbook',
      category: 'Books',
      brand: 'Knowledge Press',
      description: 'Comprehensive guide to modern business strategies',
      currentStock: 67,
      reorderPoint: 30,
      maxStock: 100,
      unitCost: 15.00,
      unitPrice: 39.99,
      supplier: 'Academic Publishers',
      location: 'Warehouse A - Section D1',
      status: 'in_stock',
      lastRestocked: '2024-09-01',
      monthlyMovement: 18,
      trend: 'stable',
      image: null,
      barcode: '4567890123456',
      weight: 0.8,
      dimensions: '23x15x3 cm',
      warrantyPeriod: 'N/A',
      tags: ['Business', 'Education', 'Strategy'],
      stockMovements: [
        { date: '2024-09-29', type: 'sale', quantity: -6, reason: 'Educational bulk order' },
        { date: '2024-09-20', type: 'sale', quantity: -4, reason: 'Individual purchases' },
        { date: '2024-09-15', type: 'return', quantity: 2, reason: 'Customer return' }
      ]
    },
    {
      id: 5,
      sku: 'SPRT-005',
      name: 'Professional Tennis Racket',
      category: 'Sports',
      brand: 'ProSport',
      description: 'Carbon fiber tennis racket for professional players',
      currentStock: 12,
      reorderPoint: 10,
      maxStock: 40,
      unitCost: 95.00,
      unitPrice: 229.99,
      supplier: 'Sports Equipment Co.',
      location: 'Warehouse B - Section B3',
      status: 'adequate',
      lastRestocked: '2024-08-30',
      monthlyMovement: 8,
      trend: 'up',
      image: null,
      barcode: '5678901234567',
      weight: 0.3,
      dimensions: '68x27x2 cm',
      warrantyPeriod: '1 year',
      tags: ['Professional', 'Carbon Fiber', 'Tennis'],
      stockMovements: [
        { date: '2024-09-25', type: 'sale', quantity: -2, reason: 'Sports club order' },
        { date: '2024-09-18', type: 'sale', quantity: -3, reason: 'Individual sales' },
        { date: '2024-09-10', type: 'adjustment', quantity: 1, reason: 'Inventory correction' }
      ]
    }
  ];

  const categories = ['All', 'Electronics', 'Furniture', 'Clothing', 'Books', 'Sports'];
  const statuses = ['All', 'In Stock', 'Low Stock', 'Out of Stock', 'Adequate'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'in_stock': return 'bg-green-100 text-green-800';
      case 'low_stock': return 'bg-yellow-100 text-yellow-800';
      case 'out_of_stock': return 'bg-red-100 text-red-800';
      case 'adequate': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'in_stock': return <CheckCircle size={16} className="text-green-600" />;
      case 'low_stock': return <AlertTriangle size={16} className="text-yellow-600" />;
      case 'out_of_stock': return <X size={16} className="text-red-600" />;
      case 'adequate': return <Package size={16} className="text-blue-600" />;
      default: return <Clock size={16} className="text-gray-600" />;
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <TrendingUp size={16} className="text-green-600" />;
      case 'down': return <TrendingDown size={16} className="text-red-600" />;
      default: return <BarChart3 size={16} className="text-gray-600" />;
    }
  };

  const getStockLevel = (current, reorder, max) => {
    const percentage = (current / max) * 100;
    if (current === 0) return 'out_of_stock';
    if (current <= reorder) return 'low_stock';
    if (percentage >= 80) return 'in_stock';
    return 'adequate';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    
    const matchesStatus = statusFilter === 'All' || 
      getStatusColor(getStockLevel(item.currentStock, item.reorderPoint, item.maxStock)).includes(statusFilter.toLowerCase().replace(' ', '_'));
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Summary statistics
  const totalItems = inventoryItems.length;
  const totalValue = inventoryItems.reduce((sum, item) => sum + (item.currentStock * item.unitCost), 0);
  const lowStockItems = inventoryItems.filter(item => getStockLevel(item.currentStock, item.reorderPoint, item.maxStock) === 'low_stock').length;
  const outOfStockItems = inventoryItems.filter(item => getStockLevel(item.currentStock, item.reorderPoint, item.maxStock) === 'out_of_stock').length;

  return (
    <div className={`p-6 min-h-screen ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className={`text-2xl font-semibold ${
              theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
            }`}>Inventory Management</h1>
            <p className={`${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>Track and manage your product inventory</p>
          </div>
          <div className="flex space-x-3">
            <button className={`border px-3 py-2 rounded-lg flex items-center space-x-2 ${
              theme === 'dark' 
                ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600' 
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}>
              <RefreshCw size={16} />
              <span>Refresh</span>
            </button>
            <button className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2">
              <Upload size={16} />
              <span>Import</span>
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Add Item</span>
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className={`rounded-lg shadow p-6 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-blue-600">{totalItems}</p>
                <p className="text-sm text-gray-500 mt-1">Active products</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Package className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(totalValue)}</p>
                <p className="text-sm text-gray-500 mt-1">Current inventory</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Low Stock</p>
                <p className="text-2xl font-bold text-yellow-600">{lowStockItems}</p>
                <p className="text-sm text-gray-500 mt-1">Need reordering</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Out of Stock</p>
                <p className="text-2xl font-bold text-red-600">{outOfStockItems}</p>
                <p className="text-sm text-gray-500 mt-1">Urgent attention</p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <X className="h-5 w-5 text-red-600" />
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
                  placeholder="Search items by name, SKU, or brand..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex space-x-3">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
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

        {/* Inventory Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pricing
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
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
              {filteredItems.map((item) => {
                const stockStatus = getStockLevel(item.currentStock, item.reorderPoint, item.maxStock);
                const stockPercentage = (item.currentStock / item.maxStock) * 100;
                
                return (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          <div className="h-12 w-12 bg-gray-200 rounded-lg flex items-center justify-center">
                            <Package className="h-6 w-6 text-gray-400" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-500">SKU: {item.sku}</div>
                          <div className="text-sm text-gray-500">{item.brand}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium">{item.currentStock}</span>
                          <span className="text-gray-500">/ {item.maxStock}</span>
                          {getTrendIcon(item.trend)}
                        </div>
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              stockPercentage <= 20 ? 'bg-red-500' :
                              stockPercentage <= 40 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${Math.min(stockPercentage, 100)}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Reorder at: {item.reorderPoint}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div>Cost: {formatCurrency(item.unitCost)}</div>
                        <div>Price: {formatCurrency(item.unitPrice)}</div>
                        <div className="text-xs text-gray-500">
                          Margin: {(((item.unitPrice - item.unitCost) / item.unitPrice) * 100).toFixed(1)}%
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.location}</div>
                      <div className="text-sm text-gray-500">{item.supplier}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(stockStatus)}`}>
                        {getStatusIcon(stockStatus)}
                        <span className="ml-1">
                          {stockStatus.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          className="text-blue-600 hover:text-blue-900"
                          onClick={() => setSelectedItem(item)}
                        >
                          <Eye size={16} />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Edit size={16} />
                        </button>
                        <button 
                          className="text-green-600 hover:text-green-900"
                          onClick={() => setShowStockModal(item)}
                        >
                          <RefreshCw size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <Package className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No items found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || categoryFilter !== 'All' || statusFilter !== 'All'
                  ? 'Try adjusting your search or filters'
                  : 'Get started by adding your first inventory item'
                }
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Create Item Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Add New Item</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Item Name
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter item name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SKU
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., ELEC-001"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Select category</option>
                    {categories.slice(1).map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Brand
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter brand name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Unit Cost
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Unit Price
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Initial Stock
                    </label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Reorder Point
                    </label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Max Stock
                    </label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Supplier
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter supplier name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Warehouse A - Section B2"
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
                  Add Item
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Item Details Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-4/5 max-w-4xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-medium text-gray-900">Item Details - {selectedItem.name}</h3>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Basic Information */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">SKU</span>
                      <span className="text-gray-900 font-medium">{selectedItem.sku}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Category</span>
                      <span className="text-gray-900 font-medium">{selectedItem.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Brand</span>
                      <span className="text-gray-900 font-medium">{selectedItem.brand}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Barcode</span>
                      <span className="text-gray-900 font-medium">{selectedItem.barcode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Weight</span>
                      <span className="text-gray-900 font-medium">{selectedItem.weight} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Dimensions</span>
                      <span className="text-gray-900 font-medium">{selectedItem.dimensions}</span>
                    </div>
                  </div>
                </div>

                {/* Stock Information */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Stock Information</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Current Stock</span>
                      <span className="text-gray-900 font-medium">{selectedItem.currentStock}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Reorder Point</span>
                      <span className="text-gray-900 font-medium">{selectedItem.reorderPoint}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Max Stock</span>
                      <span className="text-gray-900 font-medium">{selectedItem.maxStock}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Location</span>
                      <span className="text-gray-900 font-medium">{selectedItem.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Last Restocked</span>
                      <span className="text-gray-900 font-medium">{new Date(selectedItem.lastRestocked).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Monthly Movement</span>
                      <span className="text-gray-900 font-medium">{selectedItem.monthlyMovement}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Stock Movements */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Recent Stock Movements</h4>
                <div className="space-y-3">
                  {selectedItem.stockMovements.map((movement, index) => (
                    <div key={index} className="flex items-center justify-between bg-white rounded p-3">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${
                          movement.type === 'sale' ? 'bg-red-100' :
                          movement.type === 'purchase' ? 'bg-green-100' :
                          movement.type === 'return' ? 'bg-blue-100' : 'bg-yellow-100'
                        }`}>
                          {movement.type === 'sale' ? <TrendingDown size={16} className="text-red-600" /> :
                           movement.type === 'purchase' ? <TrendingUp size={16} className="text-green-600" /> :
                           movement.type === 'return' ? <RefreshCw size={16} className="text-blue-600" /> :
                           <Edit size={16} className="text-yellow-600" />}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {movement.type.charAt(0).toUpperCase() + movement.type.slice(1)}
                          </p>
                          <p className="text-xs text-gray-500">{movement.reason}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium ${movement.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {movement.quantity > 0 ? '+' : ''}{movement.quantity}
                        </p>
                        <p className="text-xs text-gray-500">{new Date(movement.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Edit Item
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                  Update Stock
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stock Update Modal */}
      {showStockModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Update Stock - {showStockModal.name}</h3>
                <button
                  onClick={() => setShowStockModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded p-3">
                  <p className="text-sm text-gray-600">Current Stock: <span className="font-medium">{showStockModal.currentStock}</span></p>
                  <p className="text-sm text-gray-600">SKU: <span className="font-medium">{showStockModal.sku}</span></p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Movement Type
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="purchase">Purchase/Restock</option>
                    <option value="sale">Sale</option>
                    <option value="return">Return</option>
                    <option value="adjustment">Adjustment</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter quantity"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reason
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter reason for stock movement"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowStockModal(false)}
                  className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowStockModal(false)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Update Stock
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryManagement;