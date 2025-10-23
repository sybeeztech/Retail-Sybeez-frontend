import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, User, Mail, Phone, Calendar, Package, ShoppingCart } from 'lucide-react';

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]); // Products from inventory
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [availableProducts, setAvailableProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    loyaltyPoints: 0
  });

  useEffect(() => {
    loadCustomers();
    loadProducts();
  }, []);

  const loadCustomers = () => {
    const stored = localStorage.getItem('customers');
    if (stored) {
      setCustomers(JSON.parse(stored));
    }
    setLoading(false);
  };

  const loadProducts = () => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
      setAvailableProducts(JSON.parse(storedProducts));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const customerData = {
      ...formData,
      id: editingCustomer ? editingCustomer.id : `C${Date.now()}`,
      loyaltyPoints: parseInt(formData.loyaltyPoints),
      totalSpent: editingCustomer ? editingCustomer.totalSpent : 0,
      ordersCount: editingCustomer ? editingCustomer.ordersCount : 0,
      createdAt: editingCustomer ? editingCustomer.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      recentProducts: editingCustomer ? editingCustomer.recentProducts : []
    };

    let updatedCustomers;
    if (editingCustomer) {
      updatedCustomers = customers.map(c => c.id === editingCustomer.id ? customerData : c);
    } else {
      updatedCustomers = [...customers, customerData];
    }

    setCustomers(updatedCustomers);
    localStorage.setItem('customers', JSON.stringify(updatedCustomers));
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      loyaltyPoints: 0
    });
    setEditingCustomer(null);
    setShowForm(false);
  };

  const handleEdit = (customer) => {
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      city: customer.city,
      state: customer.state,
      pincode: customer.pincode,
      loyaltyPoints: customer.loyaltyPoints
    });
    setEditingCustomer(customer);
    setShowForm(true);
  };

  const handleDelete = (customerId) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      const updatedCustomers = customers.filter(c => c.id !== customerId);
      setCustomers(updatedCustomers);
      localStorage.setItem('customers', JSON.stringify(updatedCustomers));
    }
  };

  const handleAddProducts = (customer) => {
    setSelectedCustomer(customer);
    setSelectedProducts(customer.recentProducts || []);
    setShowProductModal(true);
  };

  const handleProductSelection = (product) => {
    setSelectedProducts(prev => {
      const isSelected = prev.find(p => p.id === product.id);
      if (isSelected) {
        return prev.filter(p => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const saveCustomerProducts = () => {
    const updatedCustomers = customers.map(c => 
      c.id === selectedCustomer.id 
        ? { ...c, recentProducts: selectedProducts }
        : c
    );
    
    setCustomers(updatedCustomers);
    localStorage.setItem('customers', JSON.stringify(updatedCustomers));
    setShowProductModal(false);
    setSelectedCustomer(null);
    setSelectedProducts([]);
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  if (loading) return <div className="flex justify-center items-center h-64">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Customer Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
        >
          <Plus size={20} />
          <span>Add Customer</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Customers</p>
              <p className="text-2xl font-bold">{customers.length}</p>
            </div>
            <User className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active This Month</p>
              <p className="text-2xl font-bold">
                {customers.filter(c => {
                  const monthAgo = new Date();
                  monthAgo.setMonth(monthAgo.getMonth() - 1);
                  return new Date(c.updatedAt) > monthAgo;
                }).length}
              </p>
            </div>
            <Calendar className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Products</p>
              <p className="text-2xl font-bold">{products.length}</p>
            </div>
            <Package className="h-8 w-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Low Stock Items</p>
              <p className="text-2xl font-bold">
                {products.filter(p => p.stock.available <= p.stock.reorderLevel).length}
              </p>
            </div>
            <ShoppingCart className="h-8 w-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-lg shadow border mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search customers by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Customer Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">
                {editingCustomer ? 'Edit Customer' : 'Add New Customer'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      rows="2"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pincode
                    </label>
                    <input
                      type="text"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Loyalty Points
                    </label>
                    <input
                      type="number"
                      value={formData.loyaltyPoints}
                      onChange={(e) => setFormData({ ...formData, loyaltyPoints: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {editingCustomer ? 'Update Customer' : 'Add Customer'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Product Selection Modal */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">
                Add Products for {selectedCustomer?.name}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Available Products */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Available Products</h3>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {availableProducts.map(product => (
                      <div
                        key={product.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedProducts.find(p => p.id === product.id)
                            ? 'bg-blue-50 border-blue-300'
                            : 'bg-white border-gray-200 hover:bg-gray-50'
                        }`}
                        onClick={() => handleProductSelection(product)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-gray-600">SKU: {product.sku}</p>
                            <p className="text-sm text-gray-600">Stock: {product.stock.available}</p>
                          </div>
                          <p className="font-semibold">₹{product.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Selected Products */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Selected Products ({selectedProducts.length})
                  </h3>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {selectedProducts.map(product => (
                      <div
                        key={product.id}
                        className="p-3 border border-blue-300 bg-blue-50 rounded-lg"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-gray-600">SKU: {product.sku}</p>
                          </div>
                          <button
                            onClick={() => handleProductSelection(product)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                    {selectedProducts.length === 0 && (
                      <p className="text-gray-500 text-center py-8">No products selected</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowProductModal(false);
                    setSelectedCustomer(null);
                    setSelectedProducts([]);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={saveCustomerProducts}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Products
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Customers Grid */}
      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recent Products
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Loyalty Points
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                        <div className="text-sm text-gray-500">ID: {customer.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center space-x-1">
                      <Mail size={14} />
                      <span>{customer.email}</span>
                    </div>
                    <div className="text-sm text-gray-500 flex items-center space-x-1">
                      <Phone size={14} />
                      <span>{customer.phone}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {(customer.recentProducts || []).slice(0, 3).map(product => (
                        <span
                          key={product.id}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                        >
                          <Package size={12} className="mr-1" />
                          {product.name}
                        </span>
                      ))}
                      {(customer.recentProducts || []).length > 3 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                          +{(customer.recentProducts || []).length - 3} more
                        </span>
                      )}
                      {(customer.recentProducts || []).length === 0 && (
                        <span className="text-sm text-gray-500">No products</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {customer.ordersCount || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold bg-purple-100 text-purple-800 rounded-full">
                      {customer.loyaltyPoints} pts
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAddProducts(customer)}
                        className="text-green-600 hover:text-green-900"
                        title="Add Products"
                      >
                        <ShoppingCart size={16} />
                      </button>
                      <button
                        onClick={() => handleEdit(customer)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(customer.id)}
                        className="text-red-600 hover:text-red-900"
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
        {filteredCustomers.length === 0 && (
          <div className="text-center py-8">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No customers found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Customer;