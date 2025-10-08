import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

const OrderForm = ({ onSubmit, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    customer_id: '',
    customer_name: '',
    items: [{ product_id: '', name: '', quantity: '1', price: '0' }],
    billing_state: 'Tamil Nadu',
  });

  const inventory = [
    { product_id: "BAT001", name: "Idly Batter", price: 50, unit: "liters" },
    { product_id: "BAT002", name: "Dosa Batter", price: 60, unit: "liters" },
    { product_id: "BAT003", name: "Whole Wheat Dosa Batter", price: 70, unit: "liters" },
  ];

  const customers = [
    { customer_id: "CUST001", name: "Suresh Foods" },
    { customer_id: "CUST002", name: "Meena Traders" },
  ];

  const states = ["Tamil Nadu", "Maharashtra", "Karnataka", "Delhi"];

  const handleProductSelect = (index, productId) => {
    const product = inventory.find(item => item.product_id === productId);
    if (!product) return;
    const updatedItems = [...formData.items];
    updatedItems[index] = {
      ...updatedItems[index],
      product_id: productId,
      name: product.name,
      price: product.price,
    };
    setFormData({ ...formData, items: updatedItems });
  };

  const handleQuantityChange = (index, value) => {
    const quantity = Math.max(1, parseInt(value) || 1);
    const updatedItems = [...formData.items];
    updatedItems[index] = { ...updatedItems[index], quantity: quantity.toString() };
    setFormData({ ...formData, items: updatedItems });
  };

  const handleCustomerChange = (customerId) => {
    const customer = customers.find(c => c.customer_id === customerId);
    setFormData({
      ...formData,
      customer_id: customerId,
      customer_name: customer?.name || '',
    });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { product_id: '', name: '', quantity: '1', price: '0' }],
    });
  };

  const removeItem = (index) => {
    if (formData.items.length === 1) return;
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: updatedItems });
  };

  const calculateSubtotal = () => {
    return formData.items.reduce((sum, item) => sum + (parseFloat(item.price) * parseInt(item.quantity || '0')), 0).toFixed(2);
  };

  const calculateGST = () => {
    const subtotal = parseFloat(calculateSubtotal());
    const isSameState = formData.billing_state === 'Tamil Nadu';
    const gstRate = 0.18; // 18% GST for food products
    const gstAmount = subtotal * gstRate;
    return {
      cgst: isSameState ? (gstAmount / 2).toFixed(2) : 0,
      sgst: isSameState ? (gstAmount / 2).toFixed(2) : 0,
      igst: isSameState ? 0 : gstAmount.toFixed(2),
      totalGST: gstAmount.toFixed(2),
    };
  };

  const calculateTotal = () => {
    const subtotal = parseFloat(calculateSubtotal());
    const gst = parseFloat(calculateGST().totalGST);
    return (subtotal + gst).toFixed(2);
  };

  const validateForm = () => {
    if (!formData.customer_id) throw new Error('Please select a customer');
    if (!formData.items.length) throw new Error('Please add at least one item');
    if (formData.items.some(item => !item.product_id)) throw new Error('Please select products for all items');
    if (formData.items.some(item => parseInt(item.quantity) < 1)) throw new Error('Quantity must be at least 1');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    try {
      setLoading(true);
      setError('');
      validateForm();
      const selectedCustomer = customers.find(c => c.customer_id === formData.customer_id);
      const gst = calculateGST();
      const orderData = {
        customer_id: selectedCustomer.customer_id,
        customer_name: selectedCustomer.name,
        items: formData.items.map(item => ({
          product_id: item.product_id,
          name: item.name,
          quantity: parseInt(item.quantity),
          price: parseFloat(item.price),
        })),
        subtotal: calculateSubtotal(),
        cgst: gst.cgst,
        sgst: gst.sgst,
        igst: gst.igst,
        total_amount: calculateTotal(),
        billing_state: formData.billing_state,
      };
      await onSubmit(orderData);
    } catch (err) {
      setError(err.message || 'Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">{error}</div>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Customer</label>
        <select
          value={formData.customer_id}
          onChange={(e) => handleCustomerChange(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
          required
          disabled={loading}
        >
          <option value="">Select Customer</option>
          {customers.map((customer) => (
            <option key={customer.customer_id} value={customer.customer_id}>
              {customer.name} ({customer.customer_id})
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Billing State</label>
        <select
          value={formData.billing_state}
          onChange={(e) => setFormData({ ...formData, billing_state: e.target.value })}
          className="w-full border rounded-lg px-3 py-2"
          required
          disabled={loading}
        >
          {states.map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Order Items</h3>
          <button
            type="button"
            onClick={addItem}
            disabled={loading}
            className="px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 flex items-center gap-1"
          >
            <Plus size={16} /> Add Item
          </button>
        </div>
        {formData.items.map((item, index) => (
          <div key={index} className="flex gap-4 items-start p-4 border rounded-lg">
            <div className="flex-grow">
              <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
              <select
                value={item.product_id}
                onChange={(e) => handleProductSelect(index, e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
                required
                disabled={loading}
              >
                <option value="">Select Product</option>
                {inventory.map((product) => (
                  <option key={product.product_id} value={product.product_id}>
                    {product.name} (₹{product.price.toFixed(2)}/liter)
                  </option>
                ))}
              </select>
            </div>
            <div className="w-32">
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity (liters)</label>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(index, e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
                required
                disabled={loading}
              />
            </div>
            <div className="w-32">
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
              <div className="text-gray-900 py-2">₹{parseFloat(item.price).toFixed(2)}</div>
            </div>
            <div className="w-32">
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtotal (₹)</label>
              <div className="text-gray-900 py-2">₹{(parseFloat(item.price) * parseInt(item.quantity || 0)).toFixed(2)}</div>
            </div>
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="mt-7 p-1 text-red-600 hover:bg-red-50 rounded"
              disabled={formData.items.length === 1 || loading}
            >
              <X size={20} />
            </button>
          </div>
        ))}
      </div>
      <div className="border-t pt-4 flex justify-between items-center">
        <div className="space-y-2">
          <div>Subtotal: ₹{calculateSubtotal()}</div>
          <div>CGST (9%): ₹{calculateGST().cgst}</div>
          <div>SGST (9%): ₹{calculateGST().sgst}</div>
          <div>IGST (18%): ₹{calculateGST().igst}</div>
          <div className="text-lg font-bold">Total: ₹{calculateTotal()}</div>
        </div>
        <div className="space-x-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Order'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;