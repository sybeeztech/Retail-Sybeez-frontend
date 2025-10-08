import React, { useState } from 'react';
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
  Printer,
  Percent
} from 'lucide-react';

const POSSystem = () => {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [customerPhone, setCustomerPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);

  // Mock products for POS
  const products = [
    {
      id: 'PRD001',
      name: 'Wireless Bluetooth Headphones',
      sku: 'WBH-001',
      price: 89.99,
      category: 'Electronics',
      stock: 42,
      image: '/api/placeholder/80/80'
    },
    {
      id: 'PRD002',
      name: 'Smart Fitness Watch',
      sku: 'SFW-002',
      price: 299.99,
      category: 'Electronics',
      stock: 6,
      image: '/api/placeholder/80/80'
    },
    {
      id: 'PRD003',
      name: 'Organic Green Tea',
      sku: 'OGT-003',
      price: 12.99,
      category: 'Food & Beverages',
      stock: 115,
      image: '/api/placeholder/80/80'
    },
    {
      id: 'PRD004',
      name: 'Cotton T-Shirt',
      sku: 'CTS-004',
      price: 24.99,
      category: 'Clothing',
      stock: 87,
      image: '/api/placeholder/80/80'
    },
    {
      id: 'PRD005',
      name: 'Phone Case',
      sku: 'PC-005',
      price: 19.99,
      category: 'Electronics',
      stock: 156,
      image: '/api/placeholder/80/80'
    },
    {
      id: 'PRD006',
      name: 'Bluetooth Speaker',
      sku: 'BS-006',
      price: 79.99,
      category: 'Electronics',
      stock: 23,
      image: '/api/placeholder/80/80'
    }
  ];

  const categories = ['All', 'Electronics', 'Food & Beverages', 'Clothing', 'Home & Garden'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      if (existingItem.quantity < product.stock) {
        setCart(cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
      }
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      setCart(cart.filter(item => item.id !== productId));
    } else {
      const product = products.find(p => p.id === productId);
      if (newQuantity <= product.stock) {
        setCart(cart.map(item =>
          item.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        ));
      }
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
    setShowCheckout(false);
  };

  const processPayment = () => {
    // Mock payment processing
    alert(`Payment of $${calculateTotal().toFixed(2)} processed successfully via ${paymentMethod}!`);
    clearCart();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Side - Product Selection */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-sm p-4 border-b">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">🛍 POS System</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search products or scan barcode..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
        <div className="bg-white p-4 border-b">
          <div className="flex space-x-2 overflow-x-auto">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
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
                className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-md transition-shadow border"
              >
                <div className="w-full h-20 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                  <Package className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">{product.name}</h3>
                <p className="text-xs text-gray-500 mb-2">{product.sku}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-green-600">${product.price}</span>
                  <span className="text-xs text-gray-500">Stock: {product.stock}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Cart & Checkout */}
      <div className="w-96 bg-white shadow-lg flex flex-col">
        {/* Cart Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Current Sale</h2>
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-500">{cart.length} items</span>
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Customer phone number"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="flex-1 border border-gray-300 rounded px-3 py-1 text-sm"
            />
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Cart is empty</p>
              <p className="text-sm">Add products to start a sale</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map(item => (
                <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm text-gray-900">{item.name}</h4>
                    <p className="text-xs text-gray-500">{item.sku}</p>
                    <p className="text-sm font-semibold text-green-600">${item.price}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                    >
                      <Plus size={12} />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200"
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
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>${calculateSubtotal().toFixed(2)}</span>
              </div>
              
              {/* Discount Input */}
              <div className="flex items-center space-x-2">
                <Percent className="h-4 w-4 text-gray-500" />
                <input
                  type="number"
                  placeholder="0"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(Math.max(0, Math.min(100, parseFloat(e.target.value) || 0)))}
                  className="w-16 border border-gray-300 rounded px-2 py-1 text-sm text-center"
                />
                <span className="text-sm text-gray-500">% discount</span>
                <span className="ml-auto text-sm text-red-600">-${calculateDiscount().toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span>Tax (10%):</span>
                <span>${calculateTax().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Total:</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-2 rounded-lg border text-xs flex flex-col items-center space-y-1 ${
                    paymentMethod === 'cash' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                >
                  <DollarSign size={16} />
                  <span>Cash</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2 rounded-lg border text-xs flex flex-col items-center space-y-1 ${
                    paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                >
                  <CreditCard size={16} />
                  <span>Card</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-2 rounded-lg border text-xs flex flex-col items-center space-y-1 ${
                    paymentMethod === 'upi' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
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
                  onClick={() => setShowCheckout(true)}
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