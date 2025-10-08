import React, { useState } from 'react';
import { 
  Truck, 
  Package, 
  Building, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  TrendingDown,
  Eye,
  RefreshCw,
  Filter,
  Download,
  Search,
  BarChart3,
  PieChart,
  Calendar,
  Users,
  DollarSign,
  Target,
  Activity,
  Globe,
  ArrowUpRight,
  ArrowDownRight,
  Zap
} from 'lucide-react';

const SupplyChainDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');
  const [activeTab, setActiveTab] = useState('overview');

  // Sample supply chain data
  const supplyChainMetrics = {
    totalOrders: 1245,
    inTransit: 320,
    delivered: 890,
    delayed: 35,
    suppliers: 45,
    warehouses: 8,
    averageLeadTime: 12.5,
    onTimeDelivery: 94.2,
    fillRate: 97.8,
    inventoryTurnover: 8.5,
    totalSpend: 2850000,
    costSavings: 185000
  };

  const recentShipments = [
    {
      id: 1,
      orderNumber: 'ORD-2024-001',
      supplier: 'Global Electronics Ltd',
      destination: 'Warehouse A - Los Angeles',
      status: 'in-transit',
      items: 150,
      value: 45000,
      estimatedDelivery: '2024-10-10',
      trackingNumber: 'TRK-001234567',
      carrier: 'FedEx',
      lastUpdate: '2024-10-08 14:30'
    },
    {
      id: 2,
      orderNumber: 'ORD-2024-002',
      supplier: 'Tech Components Inc',
      destination: 'Warehouse B - Chicago',
      status: 'delivered',
      items: 280,
      value: 78000,
      estimatedDelivery: '2024-10-07',
      trackingNumber: 'TRK-001234568',
      carrier: 'UPS',
      lastUpdate: '2024-10-07 16:45'
    },
    {
      id: 3,
      orderNumber: 'ORD-2024-003',
      supplier: 'Manufacturing Solutions',
      destination: 'Warehouse C - Miami',
      status: 'delayed',
      items: 95,
      value: 32000,
      estimatedDelivery: '2024-10-09',
      trackingNumber: 'TRK-001234569',
      carrier: 'DHL',
      lastUpdate: '2024-10-08 09:15'
    },
    {
      id: 4,
      orderNumber: 'ORD-2024-004',
      supplier: 'Quality Parts Co',
      destination: 'Warehouse A - Los Angeles',
      status: 'processing',
      items: 200,
      value: 55000,
      estimatedDelivery: '2024-10-12',
      trackingNumber: 'TRK-001234570',
      carrier: 'FedEx',
      lastUpdate: '2024-10-08 11:20'
    },
    {
      id: 5,
      orderNumber: 'ORD-2024-005',
      supplier: 'Industrial Supplies LLC',
      destination: 'Warehouse D - Dallas',
      status: 'in-transit',
      items: 120,
      value: 28000,
      estimatedDelivery: '2024-10-11',
      trackingNumber: 'TRK-001234571',
      carrier: 'UPS',
      lastUpdate: '2024-10-08 08:45'
    }
  ];

  const supplierPerformance = [
    {
      id: 1,
      name: 'Global Electronics Ltd',
      onTimeDelivery: 96.5,
      qualityRating: 4.8,
      totalOrders: 145,
      totalValue: 1250000,
      lastDelivery: '2024-10-07',
      status: 'excellent'
    },
    {
      id: 2,
      name: 'Tech Components Inc',
      onTimeDelivery: 92.1,
      qualityRating: 4.6,
      totalOrders: 98,
      totalValue: 890000,
      lastDelivery: '2024-10-06',
      status: 'good'
    },
    {
      id: 3,
      name: 'Manufacturing Solutions',
      onTimeDelivery: 88.7,
      qualityRating: 4.2,
      totalOrders: 76,
      totalValue: 650000,
      lastDelivery: '2024-10-05',
      status: 'warning'
    },
    {
      id: 4,
      name: 'Quality Parts Co',
      onTimeDelivery: 94.8,
      qualityRating: 4.7,
      totalOrders: 112,
      totalValue: 980000,
      lastDelivery: '2024-10-08',
      status: 'good'
    }
  ];

  const inventoryLevels = [
    { category: 'Electronics', current: 2450, optimal: 2800, status: 'low' },
    { category: 'Components', current: 3200, optimal: 3000, status: 'good' },
    { category: 'Raw Materials', current: 1800, optimal: 2200, status: 'critical' },
    { category: 'Finished Goods', current: 4500, optimal: 4200, status: 'high' },
    { category: 'Packaging', current: 1200, optimal: 1500, status: 'low' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'in-transit': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'delayed': return 'bg-red-100 text-red-800';
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-purple-100 text-purple-800';
      case 'low': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return <CheckCircle size={16} className="text-green-600" />;
      case 'in-transit': return <Truck size={16} className="text-blue-600" />;
      case 'processing': return <Clock size={16} className="text-yellow-600" />;
      case 'delayed': return <AlertTriangle size={16} className="text-red-600" />;
      case 'excellent': return <CheckCircle size={16} className="text-green-600" />;
      case 'good': return <CheckCircle size={16} className="text-blue-600" />;
      case 'warning': return <AlertTriangle size={16} className="text-yellow-600" />;
      case 'critical': return <AlertTriangle size={16} className="text-red-600" />;
      default: return <Activity size={16} className="text-gray-600" />;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getInventoryStatusColor = (status) => {
    switch (status) {
      case 'good': return 'text-green-600';
      case 'low': return 'text-orange-600';
      case 'critical': return 'text-red-600';
      case 'high': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Supply Chain Dashboard</h1>
            <p className="text-gray-600">Monitor and manage your entire supply chain operations</p>
          </div>
          <div className="flex space-x-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Today">Today</option>
              <option value="This Week">This Week</option>
              <option value="This Month">This Month</option>
              <option value="This Quarter">This Quarter</option>
            </select>
            <button className="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
              <RefreshCw size={16} />
              <span>Refresh</span>
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
              <Download size={16} />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-3xl font-bold text-blue-600">{supplyChainMetrics.totalOrders.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight size={16} className="text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+8.2% from last month</span>
                </div>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Transit</p>
                <p className="text-3xl font-bold text-orange-600">{supplyChainMetrics.inTransit}</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight size={16} className="text-blue-500 mr-1" />
                  <span className="text-sm text-blue-600">+5.1% active shipments</span>
                </div>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <Truck className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">On-Time Delivery</p>
                <p className="text-3xl font-bold text-green-600">{supplyChainMetrics.onTimeDelivery}%</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight size={16} className="text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+2.1% improvement</span>
                </div>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Target className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Spend</p>
                <p className="text-3xl font-bold text-purple-600">{formatCurrency(supplyChainMetrics.totalSpend)}</p>
                <div className="flex items-center mt-2">
                  <ArrowDownRight size={16} className="text-green-500 mr-1" />
                  <span className="text-sm text-green-600">-3.8% cost optimization</span>
                </div>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Suppliers</p>
                <p className="text-2xl font-bold text-gray-900">{supplyChainMetrics.suppliers}</p>
              </div>
              <div className="bg-gray-100 p-3 rounded-full">
                <Building className="h-5 w-5 text-gray-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Lead Time</p>
                <p className="text-2xl font-bold text-gray-900">{supplyChainMetrics.averageLeadTime} days</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Fill Rate</p>
                <p className="text-2xl font-bold text-gray-900">{supplyChainMetrics.fillRate}%</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <BarChart3 className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Inventory Turnover</p>
                <p className="text-2xl font-bold text-gray-900">{supplyChainMetrics.inventoryTurnover}x</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Zap className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Recent Shipments */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Recent Shipments</h2>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View All</button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentShipments.slice(0, 5).map((shipment) => (
                <div key={shipment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gray-100 p-2 rounded-full">
                      {getStatusIcon(shipment.status)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{shipment.orderNumber}</p>
                      <p className="text-sm text-gray-500">{shipment.supplier}</p>
                      <p className="text-xs text-gray-400">{shipment.items} items • {formatCurrency(shipment.value)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(shipment.status)}`}>
                      {shipment.status.charAt(0).toUpperCase() + shipment.status.slice(1).replace('-', ' ')}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">ETA: {new Date(shipment.estimatedDelivery).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Supplier Performance */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Top Suppliers</h2>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View All</button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {supplierPerformance.map((supplier) => (
                <div key={supplier.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gray-100 p-2 rounded-full">
                      <Building size={16} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{supplier.name}</p>
                      <p className="text-sm text-gray-500">{supplier.totalOrders} orders • {formatCurrency(supplier.totalValue)}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-xs text-gray-500">OTD: {supplier.onTimeDelivery}%</span>
                        <span className="text-xs text-gray-500">Quality: {supplier.qualityRating}/5</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(supplier.status)}`}>
                      {supplier.status.charAt(0).toUpperCase() + supplier.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Levels */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Inventory Levels</h2>
            <div className="flex space-x-2">
              <button className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 flex items-center space-x-2">
                <Filter size={16} />
                <span>Filter</span>
              </button>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View Details</button>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {inventoryLevels.map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">{item.category}</h3>
                  <div className="relative">
                    <div className="bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className={`h-2 rounded-full ${
                          item.status === 'good' ? 'bg-green-500' :
                          item.status === 'low' ? 'bg-orange-500' :
                          item.status === 'critical' ? 'bg-red-500' : 'bg-purple-500'
                        }`}
                        style={{ width: `${(item.current / item.optimal) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{item.current.toLocaleString()}</span>
                      <span>{item.optimal.toLocaleString()}</span>
                    </div>
                    <p className={`text-sm font-medium mt-2 ${getInventoryStatusColor(item.status)}`}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplyChainDashboard;