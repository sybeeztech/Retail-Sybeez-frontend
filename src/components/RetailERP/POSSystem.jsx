import React, { useState, useEffect } from 'react';
import useSettingsStore from '../../store/settingsStore';
import {
  ShoppingCart,
  Search,
  Plus,
  Minus,
  X,
  CreditCard,
  Smartphone,
  DollarSign,
  Receipt,
  QrCode,
  Calculator,
  Users,
  Percent,
  Package
} from 'lucide-react';

// Use the same API service as inventory
const inventoryAPI = {
  getProducts: async () => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      return JSON.parse(storedProducts);
    }
    // If no products in localStorage, return empty array
    return [];
  },

  updateProduct: async (productId, updatedData) => {
    const products = await inventoryAPI.getProducts();
    const updatedProducts = products.map(product =>
      product.id === productId
        ? { ...product, ...updatedData }
        : product
    );
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    return Promise.resolve();
  },

  updateProductStock: async (productId, quantitySold) => {
    const products = await inventoryAPI.getProducts();
    const updatedProducts = products.map(product => {
      if (product.id === productId) {
        const newAvailable = product.stock.available - quantitySold;
        const newTotal = product.stock.total - quantitySold;
        return {
          ...product,
          stock: {
            ...product.stock,
            available: Math.max(0, newAvailable),
            total: Math.max(0, newTotal)
          },
          lastUpdated: new Date().toISOString().split('T')[0],
          status: newAvailable <= product.stock.reorderLevel ? 'low_stock' :
            newAvailable === 0 ? 'out_of_stock' : 'active'
        };
      }
      return product;
    });
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    return Promise.resolve();
  }
};

const POSSystem = () => {
  const { theme } = useSettingsStore();
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [customerPhone, setCustomerPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProductsFromInventory();
  }, []);

  const loadProductsFromInventory = async () => {
    try {
      setLoading(true);
      const inventoryProducts = await inventoryAPI.getProducts();
      setProducts(inventoryProducts);

      // Extract unique categories from inventory products
      const uniqueCategories = ['All', ...new Set(inventoryProducts.map(product => product.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error loading products from inventory:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.barcode && product.barcode.includes(searchTerm));
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const hasStock = product.stock.available > 0;
    return matchesSearch && matchesCategory && hasStock;
  });

  const addToCart = (product) => {
    if (product.stock.available <= 0) return;

    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      if (existingItem.quantity < product.stock.available) {
        setCart(cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
      }
    } else {
      setCart([...cart, {
        ...product,
        quantity: 1
      }]);
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    const product = products.find(p => p.id === productId);

    if (newQuantity === 0) {
      setCart(cart.filter(item => item.id !== productId));
    } else if (newQuantity <= product.stock.available) {
      setCart(cart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateDiscount = () => {
    return calculateSubtotal() * (discountPercent / 100);
  };

  const calculateTax = () => {
    return (calculateSubtotal() - calculateDiscount()) * 0.1; // 10% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount() + calculateTax();
  };

  const clearCart = () => {
    setCart([]);
    setCustomerPhone('');
    setDiscountPercent(0);
  };

  const processPayment = async () => {
    if (cart.length === 0) {
      alert('Cart is empty!');
      return;
    }

    try {
      // Update stock for each product in cart
      for (const item of cart) {
        await inventoryAPI.updateProductStock(item.id, item.quantity);
      }

      // Generate receipt data
      const receiptData = {
        transactionId: `TXN${Date.now()}`,
        customerPhone: customerPhone || 'Walk-in Customer',
        items: cart.map(item => ({
          name: item.name,
          sku: item.sku,
          quantity: item.quantity,
          price: item.price,
          total: item.price * item.quantity
        })),
        subtotal: calculateSubtotal(),
        discount: calculateDiscount(),
        tax: calculateTax(),
        total: calculateTotal(),
        paymentMethod: paymentMethod,
        date: new Date().toLocaleString(),
        discountPercent: discountPercent
      };

      // Show success message
      alert(`Payment of ₹${calculateTotal().toFixed(2)} processed successfully via ${paymentMethod}!\nTransaction ID: ${receiptData.transactionId}`);

      // Print receipt to console (in real app, this would connect to a receipt printer)
      console.log('=== RECEIPT ===');
      console.log('Transaction ID:', receiptData.transactionId);
      console.log('Date:', receiptData.date);
      console.log('Customer:', receiptData.customerPhone);
      console.log('Items:');
      receiptData.items.forEach(item => {
        console.log(`  ${item.name} (${item.sku}) - ${item.quantity} x ₹${item.price} = ₹${item.total}`);
      });
      console.log('Subtotal: ₹' + receiptData.subtotal.toFixed(2));
      console.log('Discount: ₹' + receiptData.discount.toFixed(2));
      console.log('Tax: ₹' + receiptData.tax.toFixed(2));
      console.log('Total: ₹' + receiptData.total.toFixed(2));
      console.log('Payment Method:', receiptData.paymentMethod.toUpperCase());
      console.log('================');

      // Reload products to reflect updated stock
      await loadProductsFromInventory();
      clearCart();
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Error processing payment. Please try again.');
    }
  };

  const getStockStatus = (product) => {
    if (product.stock.available === 0) return 'Out of Stock';
    if (product.stock.available <= product.stock.reorderLevel) return 'Low Stock';
    return 'In Stock';
  };

  const getStockStatusColor = (product) => {
    if (product.stock.available === 0) return 'text-red-600';
    if (product.stock.available <= product.stock.reorderLevel) return 'text-orange-600';
    return 'text-green-600';
  };

  if (loading) {
    return (
      <div className={`flex h-screen items-center justify-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
        }`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className={`mt-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Loading products from inventory...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* Left Side - Product Selection */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className={`shadow-sm p-4 border-b ${theme === 'dark'
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-200'
          }`}>
          <div className="flex items-center justify-between">
            <h1 className={`text-2xl font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
              }`}>🛍 POS System</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'
                  }`} size={20} />
                <input
                  type="text"
                  placeholder="Search products, SKU, or barcode..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-10 pr-4 py-2 w-80 border rounded-lg focus:ring-2 focus:ring-blue-500 ${theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900'
                    }`}
                />
              </div>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2">
                <QrCode size={16} />
                <span>Scan</span>
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className={`p-4 border-b ${theme === 'dark'
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-200'
          }`}>
          <div className="flex space-x-2 overflow-x-auto">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : theme === 'dark'
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                onClick={() => addToCart(product)}
                className={`rounded-lg shadow p-4 cursor-pointer hover:shadow-md transition-shadow border ${theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 hover:bg-gray-750'
                    : 'bg-white border-gray-200'
                  } ${product.stock.available === 0 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
              >
                <div className={`w-full h-20 rounded-lg mb-3 flex items-center justify-center overflow-hidden ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                  }`}>
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className={`w-full h-full flex items-center justify-center ${!product.image ? 'flex' : 'hidden'
                    }`}>
                    <Package className={`h-8 w-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'
                      }`} />
                  </div>
                </div>
                <h3 className={`font-medium text-sm mb-1 line-clamp-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                  }`}>{product.name}</h3>
                <p className={`text-xs mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>{product.sku}</p>
                <p className={`text-xs mb-2 ${getStockStatusColor(product)}`}>
                  {getStockStatus(product)} ({product.stock.available})
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-green-600">₹{product.price}</span>
                  {product.brand && (
                    <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                      {product.brand}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className={`text-center py-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
              <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No products available</p>
              <p className="text-sm">
                {products.length === 0
                  ? 'No products in inventory. Add products first.'
                  : 'Try adjusting your search or check if products are in stock'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Right Side - Cart & Checkout */}
      <div className={`w-96 shadow-lg flex flex-col ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
        {/* Cart Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
              }`}>Current Sale</h2>
            <div className="flex items-center space-x-2">
              <ShoppingCart className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
              <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                {cart.reduce((sum, item) => sum + item.quantity, 0)} items
              </span>
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-2">
            <Users className={`h-4 w-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`} />
            <input
              type="text"
              placeholder="Customer phone number"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className={`flex-1 border rounded px-3 py-1 text-sm ${theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900'
                }`}
            />
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className={`text-center mt-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
              <ShoppingCart className={`h-12 w-12 mx-auto mb-4 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-300'
                }`} />
              <p>Cart is empty</p>
              <p className="text-sm">Add products to start a sale</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map(item => (
                <div key={item.id} className={`flex items-center space-x-3 p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                  <div className="flex-shrink-0">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'
                      } ${!item.image ? 'flex' : 'hidden'}`}>
                      <Package className={`h-6 w-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'
                        }`} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-medium text-sm truncate ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      }`}>{item.name}</h4>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>{item.sku}</p>
                    <p className="text-sm font-semibold text-green-600">₹{item.price}</p>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                      Stock: {item.stock.available}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className={`w-6 h-6 rounded-full flex items-center justify-center hover:opacity-80 ${theme === 'dark' ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'
                        }`}
                    >
                      <Minus size={12} />
                    </button>
                    <span className={`w-8 text-center text-sm font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      }`}>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.stock.available}
                      className={`w-6 h-6 rounded-full flex items-center justify-center hover:opacity-80 ${item.quantity >= item.stock.available
                          ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                          : theme === 'dark'
                            ? 'bg-gray-600 text-gray-300'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                    >
                      <Plus size={12} />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className={`w-6 h-6 rounded-full flex items-center justify-center hover:opacity-80 ${theme === 'dark' ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-600'
                        }`}
                    >
                      <X size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Summary */}
        {cart.length > 0 && (
          <div className="border-t p-4">
            <div className="space-y-2 mb-4">
              <div className={`flex justify-between text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                <span>Subtotal:</span>
                <span>₹{calculateSubtotal().toFixed(2)}</span>
              </div>

              {/* Discount Input */}
              <div className="flex items-center space-x-2">
                <Percent className={`h-4 w-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                <input
                  type="number"
                  placeholder="0"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(Math.max(0, Math.min(100, parseFloat(e.target.value) || 0)))}
                  className={`w-16 border rounded px-2 py-1 text-sm text-center ${theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-gray-100'
                      : 'bg-white border-gray-300 text-gray-900'
                    }`}
                />
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>% discount</span>
                <span className="ml-auto text-sm text-red-600">-₹{calculateDiscount().toFixed(2)}</span>
              </div>

              <div className={`flex justify-between text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                <span>Tax (10%):</span>
                <span>₹{calculateTax().toFixed(2)}</span>
              </div>
              <div className={`flex justify-between text-lg font-bold border-t pt-2 ${theme === 'dark' ? 'text-gray-100 border-gray-600' : 'text-gray-900 border-gray-300'
                }`}>
                <span>Total:</span>
                <span>₹{calculateTotal().toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-4">
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>Payment Method</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-2 rounded-lg border text-xs flex flex-col items-center space-y-1 ${paymentMethod === 'cash'
                      ? theme === 'dark'
                        ? 'border-blue-500 bg-blue-900 text-blue-100'
                        : 'border-blue-500 bg-blue-50 text-blue-700'
                      : theme === 'dark'
                        ? 'border-gray-600 bg-gray-700 text-gray-300'
                        : 'border-gray-300 bg-gray-100 text-gray-700'
                    }`}
                >
                  <DollarSign size={16} />
                  <span>Cash</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2 rounded-lg border text-xs flex flex-col items-center space-y-1 ${paymentMethod === 'card'
                      ? theme === 'dark'
                        ? 'border-blue-500 bg-blue-900 text-blue-100'
                        : 'border-blue-500 bg-blue-50 text-blue-700'
                      : theme === 'dark'
                        ? 'border-gray-600 bg-gray-700 text-gray-300'
                        : 'border-gray-300 bg-gray-100 text-gray-700'
                    }`}
                >
                  <CreditCard size={16} />
                  <span>Card</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-2 rounded-lg border text-xs flex flex-col items-center space-y-1 ${paymentMethod === 'upi'
                      ? theme === 'dark'
                        ? 'border-blue-500 bg-blue-900 text-blue-100'
                        : 'border-blue-500 bg-blue-50 text-blue-700'
                      : theme === 'dark'
                        ? 'border-gray-600 bg-gray-700 text-gray-300'
                        : 'border-gray-300 bg-gray-100 text-gray-700'
                    }`}
                >
                  <Smartphone size={16} />
                  <span>UPI</span>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={processPayment}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-medium flex items-center justify-center space-x-2"
              >
                <Receipt size={16} />
                <span>Complete Sale</span>
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {/* Hold functionality */ }}
                  className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 text-sm flex items-center justify-center space-x-1"
                >
                  <Calculator size={14} />
                  <span>Hold</span>
                </button>
                <button
                  onClick={clearCart}
                  className="bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 text-sm flex items-center justify-center space-x-1"
                >
                  <X size={14} />
                  <span>Clear</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default POSSystem;