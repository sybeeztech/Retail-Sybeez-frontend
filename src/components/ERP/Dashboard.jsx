import React, { useState, useCallback, useEffect } from 'react';
import { Plus, Package, ShoppingCart, Users, TrendingUp, DollarSign, AlertCircle } from 'lucide-react';
import OrderList from './OrderList';
import OrderForm from './OrderForm';

const ERPDashboard = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orders, setOrders] = useState([
    {
      order_id: "ORD001",
      customer_id: "CUST001",
      customer_name: "Suresh Foods",
      items: [{ product_id: "BAT001", name: "Idly Batter", quantity: 50, price: 50 }],
      subtotal: 2500,
      cgst: 225,
      sgst: 225,
      igst: 0,
      total_amount: 2950,
      status: "PENDING",
      created_at: "2025-05-28T10:00:00Z",
      billing_state: "Tamil Nadu",
    },
    {
      order_id: "ORD002",
      customer_id: "CUST002", 
      customer_name: "Meena Traders",
      items: [{ product_id: "BAT002", name: "Dosa Batter", quantity: 30, price: 60 }],
      subtotal: 1800,
      cgst: 162,
      sgst: 162,
      igst: 0,
      total_amount: 2124,
      status: "COMPLETED",
      created_at: "2025-05-27T14:30:00Z",
      billing_state: "Tamil Nadu",
    }
  ]);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'info',
      message: 'New order ORD001 created successfully',
      timestamp: new Date().toISOString(),
      order_id: 'ORD001'
    }
  ]);

  const addNotification = useCallback((notification) => {
    const newNotification = {
      id: Date.now(),
      type: notification.type || 'info',
      message: notification.message,
      timestamp: new Date().toISOString(),
      ...notification
    };
    setNotifications(prev => [newNotification, ...prev.slice(0, 9)]);
  }, []);

  const createOrder = useCallback(async (orderData) => {
    try {
      const newOrder = {
        order_id: `ORD${String(orders.length + 1).padStart(3, '0')}`,
        ...orderData,
        status: 'PENDING',
        created_at: new Date().toISOString(),
      };
      
      setOrders(prev => [newOrder, ...prev]);
      addNotification({
        type: 'success',
        message: `Order ${newOrder.order_id} created successfully`,
        order_id: newOrder.order_id
      });
      setShowOrderForm(false);
    } catch (error) {
      addNotification({
        type: 'error',
        message: 'Failed to create order'
      });
      throw error;
    }
  }, [orders.length, addNotification]);

  const deleteOrder = useCallback(async (orderId) => {
    try {
      setOrders(prev => prev.filter(order => order.order_id !== orderId));
      addNotification({
        type: 'success',
        message: `Order ${orderId} deleted successfully`
      });
    } catch (error) {
      addNotification({
        type: 'error',
        message: 'Failed to delete order'
      });
      throw error;
    }
  }, [addNotification]);

  const updateOrderStatus = useCallback((orderId, newStatus) => {
    setOrders(prev => prev.map(order => 
      order.order_id === orderId 
        ? { ...order, status: newStatus }
        : order
    ));
    addNotification({
      type: 'info',
      message: `Order ${orderId} status updated to ${newStatus}`,
      order_id: orderId
    });
  }, [addNotification]);

  // Calculate dashboard stats
  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'PENDING').length,
    completedOrders: orders.filter(o => o.status === 'COMPLETED').length,
    totalRevenue: orders.reduce((sum, order) => sum + parseFloat(order.total_amount), 0),
    avgOrderValue: orders.length > 0 ? orders.reduce((sum, order) => sum + parseFloat(order.total_amount), 0) / orders.length : 0
  };

  const StatCard = ({ title, value, icon: Icon, color = "blue" }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-lg bg-${color}-100`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  const RecentOrdersWidget = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Recent Orders</h3>
        <button
          onClick={() => setActiveView('orders')}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          View All
        </button>
      </div>
      <div className="space-y-3">
        {orders.slice(0, 5).map((order) => (
          <div key={order.order_id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
            <div>
              <p className="font-medium">{order.order_id}</p>
              <p className="text-sm text-gray-600">{order.customer_name}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">₹{parseFloat(order.total_amount).toFixed(2)}</p>
              <span className={`text-xs px-2 py-1 rounded-full ${
                order.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const NotificationsWidget = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Notifications</h3>
      <div className="space-y-3">
        {notifications.slice(0, 5).map((notification) => (
          <div key={notification.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded">
            <AlertCircle className={`w-5 h-5 mt-0.5 ${
              notification.type === 'error' ? 'text-red-500' :
              notification.type === 'success' ? 'text-green-500' :
              'text-blue-500'
            }`} />
            <div className="flex-1">
              <p className="text-sm">{notification.message}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(notification.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const DashboardView = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">ERP Dashboard</h1>
        <button
          onClick={() => setShowOrderForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Order</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Orders" 
          value={stats.totalOrders} 
          icon={ShoppingCart} 
          color="blue" 
        />
        <StatCard 
          title="Pending Orders" 
          value={stats.pendingOrders} 
          icon={Package} 
          color="yellow" 
        />
        <StatCard 
          title="Completed Orders" 
          value={stats.completedOrders} 
          icon={Users} 
          color="green" 
        />
        <StatCard 
          title="Total Revenue" 
          value={`₹${stats.totalRevenue.toFixed(2)}`} 
          icon={DollarSign} 
          color="purple" 
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentOrdersWidget />
        <NotificationsWidget />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        {activeView === 'dashboard' && <DashboardView />}
        {activeView === 'orders' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
              <div className="space-x-3">
                <button
                  onClick={() => setActiveView('dashboard')}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Back to Dashboard
                </button>
                <button
                  onClick={() => setShowOrderForm(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Order</span>
                </button>
              </div>
            </div>
            <OrderList 
              orders={orders}
              onDelete={deleteOrder}
              onStatusChange={updateOrderStatus}
            />
          </div>
        )}
        
        {showOrderForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full m-4 max-h-[90vh] overflow-y-auto">
              <div className="p-4 border-b">
                <h2 className="text-xl font-bold">Create New Order</h2>
              </div>
              <div className="p-4">
                <OrderForm 
                  onSubmit={createOrder}
                  onCancel={() => setShowOrderForm(false)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ERPDashboard;