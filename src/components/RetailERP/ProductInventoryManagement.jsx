import React, { useState, useEffect } from 'react';
import useSettingsStore from '../../store/settingsStore';
import {
  Package,
  Search,
  Plus,
  Edit,
  Eye,
  AlertTriangle,
  BarChart3,
  QrCode,
  Download,
  Upload,
  X,
  Building2,
  Save,
  Trash2,
  Image as ImageIcon
} from 'lucide-react';

// Mock API service (replace with actual API calls)
const productAPI = {
  getProducts: async () => {
    const storedProducts = localStorage.getItem('products');
    const products = storedProducts ? JSON.parse(storedProducts) : [
      {
        id: 'PRD001',
        name: 'Wireless Bluetooth Headphones',
        sku: 'WBH-001',
        barcode: '1234567890123',
        category: 'Electronics',
        brand: 'TechBrand',
        price: 89.99,
        costPrice: 65.00,
        stock: {
          total: 45,
          available: 42,
          reserved: 3,
          reorderLevel: 10
        },
        branches: {
          'Downtown Store': 15,
          'Mall Branch': 18,
          'Airport Store': 9,
          'Suburban Branch': 3
        },
        status: 'active',
        lastUpdated: new Date().toISOString().split('T')[0],
        supplier: 'Tech Supplies Inc',
        image: ''
      }
    ];
    return products;
  },

  saveProducts: async (products) => {
    localStorage.setItem('products', JSON.stringify(products));
    return Promise.resolve();
  },

  getCategories: async () => {
    const storedCategories = localStorage.getItem('categories');
    const categories = storedCategories ? JSON.parse(storedCategories) : [
      'Electronics', 'Food & Beverages', 'Clothing', 'Home & Garden', 'Sports'
    ];
    return categories;
  },

  saveCategories: async (categories) => {
    localStorage.setItem('categories', JSON.stringify(categories));
    return Promise.resolve();
  }
};

const ProductInventoryManagement = () => {
  const { theme } = useSettingsStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBranch, setSelectedBranch] = useState('All Branches');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [imageErrors, setImageErrors] = useState({});

  // Form state for new product
  const [productForm, setProductForm] = useState({
    name: '',
    sku: '',
    barcode: '',
    category: '',
    brand: '',
    price: '',
    costPrice: '',
    stock: '',
    reorderLevel: '',
    supplier: '',
    image: ''
  });

  const [imagePreview, setImagePreview] = useState('');

  const branches = ['All Branches', 'Downtown Store', 'Mall Branch', 'Airport Store', 'Suburban Branch'];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [productsData, categoriesData] = await Promise.all([
        productAPI.getProducts(),
        productAPI.getCategories()
      ]);
      setProducts(productsData);
      setCategories(['All', ...categoriesData]);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const saveProducts = async (updatedProducts) => {
    try {
      await productAPI.saveProducts(updatedProducts);
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error saving products:', error);
    }
  };

  const saveCategories = async (updatedCategories) => {
    try {
      await productAPI.saveCategories(updatedCategories.filter(cat => cat !== 'All'));
      setCategories(['All', ...updatedCategories.filter(cat => cat !== 'All')]);
    } catch (error) {
      console.error('Error saving categories:', error);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.barcode.includes(searchTerm);
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'low_stock': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'out_of_stock': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getStockStatus = (product) => {
    if (product.stock.available === 0) return 'out_of_stock';
    if (product.stock.available <= product.stock.reorderLevel) return 'low_stock';
    return 'active';
  };

  const handleImageError = (productId) => {
    setImageErrors(prev => ({
      ...prev,
      [productId]: true
    }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const newProduct = {
      id: `PRD${Date.now()}`,
      name: productForm.name,
      sku: productForm.sku,
      barcode: productForm.barcode,
      category: productForm.category,
      brand: productForm.brand,
      price: parseFloat(productForm.price),
      costPrice: parseFloat(productForm.costPrice),
      stock: {
        total: parseInt(productForm.stock),
        available: parseInt(productForm.stock),
        reserved: 0,
        reorderLevel: parseInt(productForm.reorderLevel)
      },
      branches: {
        'Downtown Store': Math.floor(parseInt(productForm.stock) / 4),
        'Mall Branch': Math.floor(parseInt(productForm.stock) / 4),
        'Airport Store': Math.floor(parseInt(productForm.stock) / 4),
        'Suburban Branch': parseInt(productForm.stock) - (Math.floor(parseInt(productForm.stock) / 4) * 3)
      },
      status: 'active',
      lastUpdated: new Date().toISOString().split('T')[0],
      supplier: productForm.supplier,
      image: productForm.image || ''
    };

    const updatedProducts = [...products, newProduct];
    await saveProducts(updatedProducts);
    setShowAddModal(false);
    resetProductForm();
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    const updatedProducts = products.map(product =>
      product.id === editingProduct.id
        ? {
          ...product,
          name: productForm.name,
          sku: productForm.sku,
          barcode: productForm.barcode,
          category: productForm.category,
          brand: productForm.brand,
          price: parseFloat(productForm.price),
          costPrice: parseFloat(productForm.costPrice),
          stock: {
            ...product.stock,
            reorderLevel: parseInt(productForm.reorderLevel)
          },
          supplier: productForm.supplier,
          image: productForm.image || '',
          lastUpdated: new Date().toISOString().split('T')[0]
        }
        : product
    );

    await saveProducts(updatedProducts);
    setEditingProduct(null);
    resetProductForm();
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = products.filter(product => product.id !== productId);
      await saveProducts(updatedProducts);
      if (selectedProduct?.id === productId) {
        setSelectedProduct(null);
      }
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      const updatedCategories = [...categories.filter(cat => cat !== 'All'), newCategory.trim()];
      await saveCategories(updatedCategories);
      setNewCategory('');
      setShowCategoryModal(false);
    }
  };

  const handleDeleteCategory = async (categoryToDelete) => {
    if (categoryToDelete === 'All') return;

    // Check if any products use this category
    const productsUsingCategory = products.filter(product => product.category === categoryToDelete);
    if (productsUsingCategory.length > 0) {
      alert(`Cannot delete category "${categoryToDelete}" because ${productsUsingCategory.length} product(s) are using it.`);
      return;
    }

    if (window.confirm(`Are you sure you want to delete the category "${categoryToDelete}"?`)) {
      const updatedCategories = categories.filter(cat => cat !== categoryToDelete);
      await saveCategories(updatedCategories);
      if (selectedCategory === categoryToDelete) {
        setSelectedCategory('All');
      }
    }
  };

  const resetProductForm = () => {
    setProductForm({
      name: '',
      sku: '',
      barcode: '',
      category: '',
      brand: '',
      price: '',
      costPrice: '',
      stock: '',
      reorderLevel: '',
      supplier: '',
      image: ''
    });
    setImagePreview('');
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      sku: product.sku,
      barcode: product.barcode,
      category: product.category,
      brand: product.brand,
      price: product.price.toString(),
      costPrice: product.costPrice.toString(),
      stock: product.stock.total.toString(),
      reorderLevel: product.stock.reorderLevel.toString(),
      supplier: product.supplier,
      image: product.image || ''
    });
    setImagePreview(product.image || '');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setProductForm({ ...productForm, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setProductForm({ ...productForm, image: url });
    setImagePreview(url);
  };

  return (
    <div className={`p-6 min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className={`text-2xl font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
            }`}>Product & Inventory Management</h1>
          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>Manage products, track inventory, and monitor stock levels</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowCategoryModal(true)}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${theme === 'dark'
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
          >
            <Plus size={16} />
            <span>Manage Categories</span>
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2">
            <QrCode size={16} />
            <span>Scan Barcode</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus size={16} />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Inventory Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>Total Products</p>
              <p className="text-2xl font-bold text-blue-600">{products.length}</p>
            </div>
            <Package className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>Low Stock Items</p>
              <p className="text-2xl font-bold text-red-600">
                {products.filter(p => getStockStatus(p) === 'low_stock').length}
              </p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
        </div>

        <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>Total Stock Value</p>
              <p className="text-2xl font-bold text-green-600">
                ₹{products.reduce((sum, p) => sum + (p.stock.total * p.costPrice), 0).toLocaleString()}
              </p>
            </div>
            <BarChart3 className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>Categories</p>
              <p className="text-2xl font-bold text-purple-600">{categories.length - 1}</p>
            </div>
            <Building2 className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className={`rounded-lg shadow p-6 mb-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'
                }`} size={20} />
              <input
                type="text"
                placeholder="Search by product name, SKU, or barcode..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900'
                  }`}
              />
            </div>
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={`border rounded-lg px-4 py-2 ${theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-gray-100'
                : 'bg-white border-gray-300 text-gray-900'
              }`}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className={`border rounded-lg px-4 py-2 ${theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-gray-100'
                : 'bg-white border-gray-300 text-gray-900'
              }`}
          >
            {branches.map(branch => (
              <option key={branch} value={branch}>{branch}</option>
            ))}
          </select>

          <div className="flex space-x-2">
            <button className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${theme === 'dark'
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}>
              <Download size={16} />
              <span>Export</span>
            </button>
            <button className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${theme === 'dark'
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}>
              <Upload size={16} />
              <span>Import</span>
            </button>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className={`rounded-lg shadow overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                  }`}>Product</th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                  }`}>SKU/Barcode</th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                  }`}>Category</th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                  }`}>Price</th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                  }`}>Stock</th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                  }`}>Status</th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                  }`}>Actions</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${theme === 'dark'
                ? 'bg-gray-800 divide-gray-700'
                : 'bg-white divide-gray-200'
              }`}>
              {filteredProducts.map((product) => (
                <tr key={product.id} className={`${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  }`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 h-10 w-10">
                        {product.image && !imageErrors[product.id] ? (
                          <img
                            className="h-10 w-10 rounded-lg object-cover"
                            src={product.image}
                            alt={product.name}
                            onError={() => handleImageError(product.id)}
                          />
                        ) : (
                          <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                            }`}>
                            <Package className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'
                              }`} />
                          </div>
                        )}
                      </div>
                      <div>
                        <div className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                          }`}>{product.name}</div>
                        <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                          }`}>{product.brand}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      }`}>{product.sku}</div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>{product.barcode}</div>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    }`}>{product.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      }`}>₹{product.price}</div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>Cost: ₹{product.costPrice}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      }`}>{product.stock.available}/{product.stock.total}</div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>Reorder: {product.stock.reorderLevel}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(getStockStatus(product))}`}>
                      {getStockStatus(product).replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className={`${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-900'}`}
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => openEditModal(product)}
                        className={`${theme === 'dark' ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-900'}`}
                      >
                        <Edit size={16} />
                      </button>
                      <button className={`${theme === 'dark' ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-900'}`}>
                        <QrCode size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className={`${theme === 'dark' ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-900'}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredProducts.length === 0 && (
            <div className="text-center py-8">
              <Package className="mx-auto h-12 w-12 text-gray-400" />
              <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                No products found. {searchTerm && 'Try adjusting your search criteria.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className={`relative top-10 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md ${theme === 'dark'
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
            }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                }`}>Product Details</h3>
              <button
                onClick={() => setSelectedProduct(null)}
                className={`${theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'
                  }`}
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <div className={`rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                  {selectedProduct.image && !imageErrors[`detail-${selectedProduct.id}`] ? (
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-full h-64 object-cover"
                      onError={() => handleImageError(`detail-${selectedProduct.id}`)}
                    />
                  ) : (
                    <div className="w-full h-64 flex items-center justify-center">
                      <Package className={`h-16 w-16 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                        }`} />
                    </div>
                  )}
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      }`}>{selectedProduct.name}</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>SKU:</span>
                        <span className={theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}>{selectedProduct.sku}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Barcode:</span>
                        <span className={theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}>{selectedProduct.barcode}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Category:</span>
                        <span className={theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}>{selectedProduct.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Brand:</span>
                        <span className={theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}>{selectedProduct.brand}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Selling Price:</span>
                        <span className={theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}>₹{selectedProduct.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Cost Price:</span>
                        <span className={theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}>₹{selectedProduct.costPrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Supplier:</span>
                        <span className={theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}>{selectedProduct.supplier}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      }`}>Stock Information</h4>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Total Stock:</span>
                        <span className={theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}>{selectedProduct.stock.total}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Available:</span>
                        <span className={theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}>{selectedProduct.stock.available}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Reserved:</span>
                        <span className={theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}>{selectedProduct.stock.reserved}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Reorder Level:</span>
                        <span className={theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}>{selectedProduct.stock.reorderLevel}</span>
                      </div>
                    </div>

                    <h4 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      }`}>Branch-wise Stock</h4>
                    <div className="space-y-2">
                      {Object.entries(selectedProduct.branches).map(([branch, stock]) => (
                        <div key={branch} className={`flex justify-between p-2 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                          }`}>
                          <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>{branch}:</span>
                          <span className={theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}>{stock} units</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setSelectedProduct(null)}
                className={`border px-4 py-2 rounded-lg ${theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
              >
                Close
              </button>
              <button
                onClick={() => openEditModal(selectedProduct)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Edit Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Product Modal */}
      {(showAddModal || editingProduct) && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className={`relative top-10 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                }`}>
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button onClick={() => {
                setShowAddModal(false);
                setEditingProduct(null);
                resetProductForm();
              }}>
                <X size={20} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
              </button>
            </div>

            <form onSubmit={editingProduct ? handleEditProduct : handleAddProduct}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Image Section */}
                <div className="md:col-span-1">
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>Product Image</label>
                  <div className={`border-2 border-dashed rounded-lg p-4 text-center ${theme === 'dark' ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50'
                    }`}>
                    {imagePreview ? (
                      <div className="mb-4">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg mx-auto"
                          onError={() => setImagePreview('')}
                        />
                      </div>
                    ) : (
                      <div className="py-8">
                        <ImageIcon className={`mx-auto h-12 w-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-300'
                          }`} />
                        <p className={`mt-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                          Upload product image
                        </p>
                      </div>
                    )}

                    <div className="space-y-2">
                      <div>
                        <label className={`block text-xs mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                          }`}>Upload from computer</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                      </div>
                      <div className="text-xs text-gray-500">OR</div>
                      <div>
                        <label className={`block text-xs mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                          }`}>Image URL</label>
                        <input
                          type="url"
                          placeholder="https://example.com/image.jpg"
                          value={productForm.image}
                          onChange={handleImageUrlChange}
                          className={`w-full border rounded px-3 py-2 text-sm ${theme === 'dark'
                              ? 'bg-gray-600 border-gray-500 text-gray-100'
                              : 'bg-white border-gray-300 text-gray-900'
                            }`}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Details */}
                <div className="md:col-span-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>Product Name</label>
                      <input
                        type="text"
                        required
                        value={productForm.name}
                        onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                        className={`w-full border rounded-lg px-3 py-2 ${theme === 'dark'
                            ? 'bg-gray-700 border-gray-600 text-gray-100'
                            : 'bg-white border-gray-300 text-gray-900'
                          }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>SKU</label>
                      <input
                        type="text"
                        required
                        value={productForm.sku}
                        onChange={(e) => setProductForm({ ...productForm, sku: e.target.value })}
                        className={`w-full border rounded-lg px-3 py-2 ${theme === 'dark'
                            ? 'bg-gray-700 border-gray-600 text-gray-100'
                            : 'bg-white border-gray-300 text-gray-900'
                          }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>Barcode</label>
                      <input
                        type="text"
                        required
                        value={productForm.barcode}
                        onChange={(e) => setProductForm({ ...productForm, barcode: e.target.value })}
                        className={`w-full border rounded-lg px-3 py-2 ${theme === 'dark'
                            ? 'bg-gray-700 border-gray-600 text-gray-100'
                            : 'bg-white border-gray-300 text-gray-900'
                          }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>Category</label>
                      <select
                        required
                        value={productForm.category}
                        onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                        className={`w-full border rounded-lg px-3 py-2 ${theme === 'dark'
                            ? 'bg-gray-700 border-gray-600 text-gray-100'
                            : 'bg-white border-gray-300 text-gray-900'
                          }`}
                      >
                        <option value="">Select Category</option>
                        {categories.filter(cat => cat !== 'All').map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>Brand</label>
                      <input
                        type="text"
                        required
                        value={productForm.brand}
                        onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                        className={`w-full border rounded-lg px-3 py-2 ${theme === 'dark'
                            ? 'bg-gray-700 border-gray-600 text-gray-100'
                            : 'bg-white border-gray-300 text-gray-900'
                          }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>Supplier</label>
                      <input
                        type="text"
                        required
                        value={productForm.supplier}
                        onChange={(e) => setProductForm({ ...productForm, supplier: e.target.value })}
                        className={`w-full border rounded-lg px-3 py-2 ${theme === 'dark'
                            ? 'bg-gray-700 border-gray-600 text-gray-100'
                            : 'bg-white border-gray-300 text-gray-900'
                          }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>Cost Price (₹)</label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={productForm.costPrice}
                        onChange={(e) => setProductForm({ ...productForm, costPrice: e.target.value })}
                        className={`w-full border rounded-lg px-3 py-2 ${theme === 'dark'
                            ? 'bg-gray-700 border-gray-600 text-gray-100'
                            : 'bg-white border-gray-300 text-gray-900'
                          }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>Selling Price (₹)</label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={productForm.price}
                        onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                        className={`w-full border rounded-lg px-3 py-2 ${theme === 'dark'
                            ? 'bg-gray-700 border-gray-600 text-gray-100'
                            : 'bg-white border-gray-300 text-gray-900'
                          }`}
                      />
                    </div>
                    {!editingProduct && (
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>Initial Stock</label>
                        <input
                          type="number"
                          required
                          value={productForm.stock}
                          onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                          className={`w-full border rounded-lg px-3 py-2 ${theme === 'dark'
                              ? 'bg-gray-700 border-gray-600 text-gray-100'
                              : 'bg-white border-gray-300 text-gray-900'
                            }`}
                        />
                      </div>
                    )}
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>Reorder Level</label>
                      <input
                        type="number"
                        required
                        value={productForm.reorderLevel}
                        onChange={(e) => setProductForm({ ...productForm, reorderLevel: e.target.value })}
                        className={`w-full border rounded-lg px-3 py-2 ${theme === 'dark'
                            ? 'bg-gray-700 border-gray-600 text-gray-100'
                            : 'bg-white border-gray-300 text-gray-900'
                          }`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingProduct(null);
                    resetProductForm();
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
                  <span>{editingProduct ? 'Update Product' : 'Add Product'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Manage Categories Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className={`relative top-10 mx-auto p-5 border w-11/12 max-w-md shadow-lg rounded-md ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                }`}>Manage Categories</h3>
              <button onClick={() => setShowCategoryModal(false)}>
                <X size={20} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
              </button>
            </div>

            <form onSubmit={handleAddCategory} className="mb-6">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Enter new category"
                  className={`flex-1 border rounded-lg px-3 py-2 ${theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900'
                    }`}
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                >
                  <Plus size={16} />
                  <span>Add</span>
                </button>
              </div>
            </form>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {categories.filter(cat => cat !== 'All').map((category) => (
                <div
                  key={category}
                  className={`flex justify-between items-center p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                    }`}
                >
                  <span className={theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}>
                    {category}
                  </span>
                  <button
                    onClick={() => handleDeleteCategory(category)}
                    className={`p-1 rounded ${theme === 'dark'
                        ? 'text-red-400 hover:bg-red-900 hover:text-red-300'
                        : 'text-red-600 hover:bg-red-100 hover:text-red-800'
                      }`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowCategoryModal(false)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProductInventoryManagement;