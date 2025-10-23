import React, { useState, useEffect } from 'react';
import useSettingsStore from '../../store/settingsStore';
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
  Download,
  Package,
  ArrowRight
} from 'lucide-react';

const SupplierManagement = () => {
  const { theme } = useSettingsStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [showInventoryModal, setShowInventoryModal] = useState(false);
  const [selectedSupplierForInventory, setSelectedSupplierForInventory] = useState(null);

  // State for suppliers list and new supplier form
  const [suppliers, setSuppliers] = useState([]);
  const [newSupplier, setNewSupplier] = useState({
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    category: '',
    address: ''
  });

  // State for inventory form
  const [inventoryForm, setInventoryForm] = useState({
    productName: '',
    sku: '',
    barcode: '',
    category: '',
    brand: '',
    price: '',
    costPrice: '',
    initialStock: '',
    reorderLevel: '',
    description: ''
  });

  // State for dynamic categories from inventory
  const [availableCategories, setAvailableCategories] = useState([]);

  // Load suppliers from localStorage on component mount
  useEffect(() => {
    const savedSuppliers = localStorage.getItem('suppliers');
    if (savedSuppliers) {
      setSuppliers(JSON.parse(savedSuppliers));
    }
  }, []);

  // Save suppliers to localStorage whenever suppliers change
  useEffect(() => {
    localStorage.setItem('suppliers', JSON.stringify(suppliers));
  }, [suppliers]);

  // Load categories from inventory products
  useEffect(() => {
    loadCategoriesFromInventory();
  }, []);

  // Reload categories when inventory modal opens
  useEffect(() => {
    if (showInventoryModal) {
      loadCategoriesFromInventory();
    }
  }, [showInventoryModal]);

  const loadCategoriesFromInventory = () => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      const products = JSON.parse(savedProducts);
      // Extract unique categories from all products
      const categories = [...new Set(products.map(product => product.category).filter(Boolean))];
      setAvailableCategories(categories);
    }
  };

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
    if (score >= 4.5) return <CheckCircle className="text-green-500" size={16} />;
    if (score >= 4.0) return <CheckCircle className="text-green-500" size={16} />;
    if (score >= 3.5) return <AlertTriangle className="text-yellow-500" size={16} />;
    return <Clock className="text-red-500" size={16} />;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Handle adding new supplier
  const handleAddSupplier = () => {
    if (newSupplier.name.trim() === '') {
      alert('Supplier name is required');
      return;
    }

    const supplierToAdd = {
      id: Date.now().toString(),
      ...newSupplier,
      status: 'active',
      riskLevel: 'low',
      rating: 4.0,
      totalOrders: 0,
      totalSpend: 0,
      averageOrderValue: 0,
      onTimeDelivery: 0,
      qualityScore: '0.0',
      leadTime: 0,
      lastOrderDate: new Date().toISOString(),
      contractExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      certifications: [],
      country: 'India',
      paymentTerms: 'Net 30'
    };

    setSuppliers([...suppliers, supplierToAdd]);

    // Reset form
    setNewSupplier({
      name: '',
      contactPerson: '',
      email: '',
      phone: '',
      category: '',
      address: ''
    });

    setShowCreateModal(false);
  };

  // Handle form input changes for supplier
  const handleSupplierInputChange = (e) => {
    const { name, value } = e.target;
    setNewSupplier(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form input changes for inventory
  const handleInventoryInputChange = (e) => {
    const { name, value } = e.target;
    setInventoryForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle delete supplier
  const handleDeleteSupplier = (supplierId) => {
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      setSuppliers(suppliers.filter(supplier => supplier.id !== supplierId));
    }
  };

  // Handle add to inventory
  const handleAddToInventory = () => {
    if (!inventoryForm.productName.trim()) {
      alert('Product name is required');
      return;
    }

    // Get existing products or initialize empty array
    const existingProducts = JSON.parse(localStorage.getItem('products') || '[]');

    const newProduct = {
      id: `PRD${Date.now()}`,
      name: inventoryForm.productName,
      sku: inventoryForm.sku || `SKU-${Date.now()}`,
      barcode: inventoryForm.barcode || `BC-${Date.now()}`,
      category: inventoryForm.category || 'Uncategorized',
      brand: inventoryForm.brand || selectedSupplierForInventory.name,
      price: parseFloat(inventoryForm.price) || 0,
      costPrice: parseFloat(inventoryForm.costPrice) || 0,
      stock: {
        total: parseInt(inventoryForm.initialStock) || 0,
        available: parseInt(inventoryForm.initialStock) || 0,
        reserved: 0,
        reorderLevel: parseInt(inventoryForm.reorderLevel) || 10
      },
      branches: {
        'Main Store': parseInt(inventoryForm.initialStock) || 0
      },
      status: 'active',
      lastUpdated: new Date().toISOString().split('T')[0],
      supplier: selectedSupplierForInventory.name,
      supplierId: selectedSupplierForInventory.id,
      description: inventoryForm.description,
      image: ''
    };

    const updatedProducts = [...existingProducts, newProduct];
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    // Update categories if a new category was added
    if (inventoryForm.category && !availableCategories.includes(inventoryForm.category)) {
      setAvailableCategories(prev => [...prev, inventoryForm.category]);
    }

    // Reset form and close modal
    setInventoryForm({
      productName: '',
      sku: '',
      barcode: '',
      category: '',
      brand: '',
      price: '',
      costPrice: '',
      initialStock: '',
      reorderLevel: '',
      description: ''
    });

    setShowInventoryModal(false);
    setSelectedSupplierForInventory(null);

    alert('Product added to inventory successfully!');
  };

  // Open inventory modal for a specific supplier
  const openInventoryModal = (supplier) => {
    setSelectedSupplierForInventory(supplier);
    setInventoryForm(prev => ({
      ...prev,
      brand: supplier.name
    }));
    setShowInventoryModal(true);
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
  const averageRating = suppliers.length > 0 ? suppliers.reduce((sum, s) => sum + s.rating, 0) / suppliers.length : 0;

  return (
    <div className={`p-6 min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className={`text-2xl font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
              }`}>Supplier Management</h1>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>Manage your supplier relationships and performance</p>
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
          <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>Total Suppliers</p>
                <p className="text-2xl font-bold text-blue-600">{totalSuppliers}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Building className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>

          <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>Active Suppliers</p>
                <p className="text-2xl font-bold text-green-600">{activeSuppliers}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </div>

          <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>Total Spend</p>
                <p className="text-2xl font-bold text-purple-600">{formatCurrency(totalSpend)}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <span className="text-lg font-bold text-purple-600">₹</span>
              </div>
            </div>
          </div>

          <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>Avg Rating</p>
                <p className="text-2xl font-bold text-yellow-600">{averageRating.toFixed(1)}</p>
                <div className="flex items-center mt-1">
                  <Star className="text-yellow-400 fill-current" size={16} />
                  <span className={`text-sm ml-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>out of 5</span>
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
      <div className={`rounded-lg shadow mb-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className={`p-6 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
          }`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'
                  }`} size={20} />
                <input
                  type="text"
                  placeholder="Search suppliers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900'
                    }`}
                />
              </div>
            </div>
            <div className="flex space-x-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={`border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-gray-100'
                    : 'bg-white border-gray-300 text-gray-900'
                  }`}
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </select>
              <button className={`border px-3 py-2 rounded-lg flex items-center space-x-2 ${theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}>
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
            <thead className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                  Supplier
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                  Contact
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                  Performance
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                  Orders & Spend
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                  Status
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${theme === 'dark'
                ? 'bg-gray-800 divide-gray-700'
                : 'bg-white divide-gray-200'
              }`}>
              {filteredSuppliers.map((supplier) => (
                <tr key={supplier.id} className={`${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  }`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-full mr-3 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                        }`}>
                        <Building size={16} className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`} />
                      </div>
                      <div>
                        <div className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                          }`}>{supplier.name}</div>
                        <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                          }`}>{supplier.category}</div>
                        <div className={`text-xs flex items-center mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                          }`}>
                          <MapPin size={12} className="mr-1" />
                          {supplier.country}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                        }`}>{supplier.contactPerson}</div>
                      <div className={`text-sm flex items-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                        <Mail size={12} className="mr-1" />
                        {supplier.email}
                      </div>
                      <div className={`text-sm flex items-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                        <Phone size={12} className="mr-1" />
                        {supplier.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="flex items-center">
                        {getPerformanceIcon(parseFloat(supplier.rating))}
                        <span className={`text-sm font-medium ml-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                          }`}>{supplier.rating}/5</span>
                      </div>
                      <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}>OTD: {supplier.onTimeDelivery}%</div>
                      <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}>Quality: {supplier.qualityScore}/5</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                        }`}>{supplier.totalOrders} orders</div>
                      <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}>{formatCurrency(supplier.totalSpend)}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(supplier.status)}`}>
                      {supplier.status.charAt(0).toUpperCase() + supplier.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        className={`hover:opacity-80 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                          }`}
                        title="View Details"
                        onClick={() => setSelectedSupplier(supplier)}
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className={`hover:opacity-80 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'
                          }`}
                        title="Add to Inventory"
                        onClick={() => openInventoryModal(supplier)}
                      >
                        <Package size={16} />
                      </button>
                      <button
                        className={`hover:opacity-80 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'
                          }`}
                        title="Delete"
                        onClick={() => handleDeleteSupplier(supplier.id)}
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
        {filteredSuppliers.length === 0 && (
          <div className="text-center py-12">
            <Building className={`mx-auto h-12 w-12 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
              }`} />
            <h3 className={`mt-2 text-sm font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
              }`}>No suppliers found</h3>
            <p className={`mt-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
              {searchTerm || statusFilter !== 'All'
                ? 'Try adjusting your search or filters'
                : 'Get started by adding your first supplier using the "Add Supplier" button above'
              }
            </p>
          </div>
        )}
      </div>

      {/* Create Supplier Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className={`relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
            }`}>
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                  }`}>Add New Supplier</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className={`${theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'
                    }`}
                >
                  ×
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                    Supplier Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newSupplier.name}
                    onChange={handleSupplierInputChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    placeholder="Enter supplier name"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                    Contact Person
                  </label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={newSupplier.contactPerson}
                    onChange={handleSupplierInputChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    placeholder="Enter contact person name"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={newSupplier.email}
                    onChange={handleSupplierInputChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={newSupplier.phone}
                    onChange={handleSupplierInputChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                    Category
                  </label>
                  <select
                    name="category"
                    value={newSupplier.category}
                    onChange={handleSupplierInputChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-gray-100'
                        : 'bg-white border-gray-300 text-gray-900'
                      }`}
                  >
                    <option value="">Select category</option>
                    {availableCategories.map((category, index) => (
                      <option key={index} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                    Address
                  </label>
                  <textarea
                    rows={3}
                    name="address"
                    value={newSupplier.address}
                    onChange={handleSupplierInputChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    placeholder="Enter full address"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className={`border px-4 py-2 rounded-lg ${theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddSupplier}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Add Supplier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add to Inventory Modal */}
      {showInventoryModal && selectedSupplierForInventory && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className={`relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
            }`}>
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                  }`}>Add Product to Inventory</h3>
                <button
                  onClick={() => {
                    setShowInventoryModal(false);
                    setSelectedSupplierForInventory(null);
                  }}
                  className={`${theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'
                    }`}
                >
                  ×
                </button>
              </div>

              <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-blue-200' : 'text-blue-800'
                  }`}>
                  Supplier: {selectedSupplierForInventory.name}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="productName"
                    value={inventoryForm.productName}
                    onChange={handleInventoryInputChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    placeholder="Enter product name"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                    SKU
                  </label>
                  <input
                    type="text"
                    name="sku"
                    value={inventoryForm.sku}
                    onChange={handleInventoryInputChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    placeholder="Enter SKU"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                    Barcode
                  </label>
                  <input
                    type="text"
                    name="barcode"
                    value={inventoryForm.barcode}
                    onChange={handleInventoryInputChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    placeholder="Enter barcode"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                    Category
                  </label>
                  <select
                    name="category"
                    value={inventoryForm.category}
                    onChange={handleInventoryInputChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-gray-100'
                        : 'bg-white border-gray-300 text-gray-900'
                      }`}
                  >
                    <option value="">Select category</option>
                    {availableCategories.map((category, index) => (
                      <option key={index} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                    Brand
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={inventoryForm.brand}
                    onChange={handleInventoryInputChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    placeholder="Enter brand"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                    Cost Price (₹)
                  </label>
                  <input
                    type="number"
                    name="costPrice"
                    value={inventoryForm.costPrice}
                    onChange={handleInventoryInputChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    placeholder="Enter cost price"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                    Selling Price (₹)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={inventoryForm.price}
                    onChange={handleInventoryInputChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    placeholder="Enter selling price"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                    Initial Stock
                  </label>
                  <input
                    type="number"
                    name="initialStock"
                    value={inventoryForm.initialStock}
                    onChange={handleInventoryInputChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    placeholder="Enter initial stock quantity"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                    Reorder Level
                  </label>
                  <input
                    type="number"
                    name="reorderLevel"
                    value={inventoryForm.reorderLevel}
                    onChange={handleInventoryInputChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    placeholder="Enter reorder level"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                    Description
                  </label>
                  <textarea
                    rows={3}
                    name="description"
                    value={inventoryForm.description}
                    onChange={handleInventoryInputChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    placeholder="Enter product description"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowInventoryModal(false);
                    setSelectedSupplierForInventory(null);
                  }}
                  className={`border px-4 py-2 rounded-lg ${theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddToInventory}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
                >
                  <Package size={16} />
                  <span>Add to Inventory</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Supplier Details Modal */}
      {selectedSupplier && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className={`relative top-10 mx-auto p-5 border w-4/5 max-w-4xl shadow-lg rounded-md ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
            }`}>
            <div className="mt-3">
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                  }`}>Supplier Details - {selectedSupplier.name}</h3>
                <button
                  onClick={() => setSelectedSupplier(null)}
                  className={`${theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'
                    }`}
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className={`rounded-lg p-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                  <h4 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    }`}>Basic Information</h4>
                  <div className="space-y-3">
                    <div>
                      <label className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>Company Name</label>
                      <p className={`${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                        }`}>{selectedSupplier.name}</p>
                    </div>
                    <div>
                      <label className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>Contact Person</label>
                      <p className={`${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                        }`}>{selectedSupplier.contactPerson}</p>
                    </div>
                    <div>
                      <label className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>Category</label>
                      <p className={`${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                        }`}>{selectedSupplier.category}</p>
                    </div>
                    <div>
                      <label className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>Address</label>
                      <p className={`${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                        }`}>{selectedSupplier.address}</p>
                    </div>
                    <div>
                      <label className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>Payment Terms</label>
                      <p className={`${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                        }`}>{selectedSupplier.paymentTerms}</p>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className={`rounded-lg p-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                  <h4 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    }`}>Performance Metrics</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>Overall Rating</span>
                      <span className={`font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                        }`}>{selectedSupplier.rating}/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>On-Time Delivery</span>
                      <span className={`font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                        }`}>{selectedSupplier.onTimeDelivery}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>Quality Score</span>
                      <span className={`font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                        }`}>{selectedSupplier.qualityScore}/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>Total Orders</span>
                      <span className={`font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                        }`}>{selectedSupplier.totalOrders}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>Total Spend</span>
                      <span className={`font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                        }`}>{formatCurrency(selectedSupplier.totalSpend)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setSelectedSupplier(null)}
                  className={`border px-4 py-2 rounded-lg ${theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  Close
                </button>
                <button
                  onClick={() => openInventoryModal(selectedSupplier)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
                >
                  <Package size={16} />
                  <span>Add Product to Inventory</span>
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