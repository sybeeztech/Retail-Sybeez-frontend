import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Truck, 
  Package, 
  MapPin, 
  Building, 
  BarChart3,
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Users,
  Thermometer,
  Zap,
  Shield,
  Calendar,
  RefreshCw,
  Download,
  Upload,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Warehouse
} from 'lucide-react';

const WarehouseManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);

  // Sample warehouse data
  const warehouses = [
    {
      id: 1,
      name: 'Warehouse A - Los Angeles',
      code: 'WH-LA-001',
      address: '1234 Industrial Blvd, Los Angeles, CA 90021',
      manager: 'John Martinez',
      phone: '+1 (555) 123-4567',
      email: 'john.martinez@company.com',
      status: 'active',
      type: 'Distribution Center',
      capacity: 50000,
      currentUtilization: 42500,
      utilizationRate: 85.0,
      totalItems: 15420,
      inboundToday: 145,
      outboundToday: 198,
      staffCount: 45,
      temperature: 22,
      humidity: 45,
      securityLevel: 'high',
      lastInspection: '2024-10-01',
      operatingHours: '24/7',
      cost: 125000,
      revenue: 285000,
      efficiency: 94.2,
      accuracy: 99.1,
      zones: [
        { name: 'Receiving', utilization: 78, capacity: 5000, current: 3900 },
        { name: 'Storage', utilization: 87, capacity: 35000, current: 30450 },
        { name: 'Picking', utilization: 82, capacity: 8000, current: 6560 },
        { name: 'Shipping', utilization: 91, capacity: 2000, current: 1820 }
      ]
    },
    {
      id: 2,
      name: 'Warehouse B - Chicago',
      code: 'WH-CHI-002',
      address: '5678 Logistics Ave, Chicago, IL 60632',
      manager: 'Sarah Thompson',
      phone: '+1 (555) 234-5678',
      email: 'sarah.thompson@company.com',
      status: 'active',
      type: 'Fulfillment Center',
      capacity: 35000,
      currentUtilization: 28700,
      utilizationRate: 82.0,
      totalItems: 12800,
      inboundToday: 89,
      outboundToday: 156,
      staffCount: 32,
      temperature: 20,
      humidity: 42,
      securityLevel: 'medium',
      lastInspection: '2024-09-28',
      operatingHours: '06:00 - 22:00',
      cost: 95000,
      revenue: 210000,
      efficiency: 91.8,
      accuracy: 98.7,
      zones: [
        { name: 'Receiving', utilization: 72, capacity: 3500, current: 2520 },
        { name: 'Storage', utilization: 85, capacity: 25000, current: 21250 },
        { name: 'Picking', utilization: 79, capacity: 5500, current: 4345 },
        { name: 'Shipping', utilization: 88, capacity: 1000, current: 880 }
      ]
    },
    {
      id: 3,
      name: 'Warehouse C - Miami',
      code: 'WH-MIA-003',
      address: '9012 Port Road, Miami, FL 33166',
      manager: 'Carlos Rodriguez',
      phone: '+1 (555) 345-6789',
      email: 'carlos.rodriguez@company.com',
      status: 'active',
      type: 'Cold Storage',
      capacity: 25000,
      currentUtilization: 18750,
      utilizationRate: 75.0,
      totalItems: 8950,
      inboundToday: 67,
      outboundToday: 89,
      staffCount: 28,
      temperature: 2,
      humidity: 85,
      securityLevel: 'high',
      lastInspection: '2024-10-05',
      operatingHours: '24/7',
      cost: 145000,
      revenue: 195000,
      efficiency: 88.5,
      accuracy: 99.5,
      zones: [
        { name: 'Receiving', utilization: 68, capacity: 2500, current: 1700 },
        { name: 'Cold Storage', utilization: 78, capacity: 20000, current: 15600 },
        { name: 'Picking', utilization: 72, capacity: 2000, current: 1440 },
        { name: 'Shipping', utilization: 85, capacity: 500, current: 425 }
      ]
    },
    {
      id: 4,
      name: 'Warehouse D - Dallas',
      code: 'WH-DAL-004',
      address: '3456 Supply Chain Dr, Dallas, TX 75247',
      manager: 'Jennifer Lee',
      phone: '+1 (555) 456-7890',
      email: 'jennifer.lee@company.com',
      status: 'maintenance',
      type: 'Regional Hub',
      capacity: 40000,
      currentUtilization: 32000,
      utilizationRate: 80.0,
      totalItems: 11200,
      inboundToday: 45,
      outboundToday: 78,
      staffCount: 38,
      temperature: 24,
      humidity: 38,
      securityLevel: 'medium',
      lastInspection: '2024-09-20',
      operatingHours: '05:00 - 23:00',
      cost: 110000,
      revenue: 245000,
      efficiency: 89.2,
      accuracy: 98.3,
      zones: [
        { name: 'Receiving', utilization: 75, capacity: 4000, current: 3000 },
        { name: 'Storage', utilization: 82, capacity: 30000, current: 24600 },
        { name: 'Picking', utilization: 78, capacity: 5000, current: 3900 },
        { name: 'Shipping', utilization: 90, capacity: 1000, current: 900 }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSecurityColor = (level) => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUtilizationColor = (rate) => {
    if (rate >= 90) return 'text-red-600';
    if (rate >= 80) return 'text-yellow-600';
    if (rate >= 60) return 'text-green-600';
    return 'text-blue-600';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const filteredWarehouses = warehouses.filter(warehouse => {
    const matchesSearch = 
      warehouse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      warehouse.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      warehouse.manager.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || warehouse.status === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  // Summary statistics
  const totalWarehouses = warehouses.length;
  const activeWarehouses = warehouses.filter(w => w.status === 'active').length;
  const totalCapacity = warehouses.reduce((sum, w) => sum + w.capacity, 0);
  const totalUtilization = warehouses.reduce((sum, w) => sum + w.currentUtilization, 0);
  const avgUtilization = (totalUtilization / totalCapacity) * 100;
  const totalStaff = warehouses.reduce((sum, w) => sum + w.staffCount, 0);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Warehouse Management</h1>
            <p className="text-gray-600">Monitor and manage your warehouse operations</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
              <RefreshCw size={16} />
              <span>Refresh</span>
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Add Warehouse</span>
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Warehouses</p>
                <p className="text-2xl font-bold text-blue-600">{totalWarehouses}</p>
                <p className="text-sm text-gray-500 mt-1">{activeWarehouses} active</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Warehouse className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Capacity</p>
                <p className="text-2xl font-bold text-green-600">{totalCapacity.toLocaleString()} sq ft</p>
                <p className="text-sm text-gray-500 mt-1">{totalUtilization.toLocaleString()} utilized</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Building className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Utilization</p>
                <p className={`text-2xl font-bold ${getUtilizationColor(avgUtilization)}`}>{avgUtilization.toFixed(1)}%</p>
                <div className="flex items-center mt-1">
                  <TrendingUp size={16} className="text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+2.1% this month</span>
                </div>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <BarChart3 className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Staff</p>
                <p className="text-2xl font-bold text-orange-600">{totalStaff}</p>
                <p className="text-sm text-gray-500 mt-1">Across all facilities</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <Users className="h-5 w-5 text-orange-600" />
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
                  placeholder="Search warehouses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex space-x-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Inactive">Inactive</option>
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

        {/* Warehouse Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredWarehouses.map((warehouse) => (
              <div key={warehouse.id} className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{warehouse.name}</h3>
                    <p className="text-sm text-gray-500">{warehouse.code}</p>
                    <p className="text-sm text-gray-500 flex items-center mt-1">
                      <MapPin size={12} className="mr-1" />
                      {warehouse.address}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(warehouse.status)}`}>
                      {warehouse.status.charAt(0).toUpperCase() + warehouse.status.slice(1)}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSecurityColor(warehouse.securityLevel)}`}>
                      {warehouse.securityLevel.charAt(0).toUpperCase() + warehouse.securityLevel.slice(1)} Security
                    </span>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Utilization</p>
                    <p className={`text-lg font-bold ${getUtilizationColor(warehouse.utilizationRate)}`}>
                      {warehouse.utilizationRate}%
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Items</p>
                    <p className="text-lg font-bold text-gray-900">{warehouse.totalItems.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Staff</p>
                    <p className="text-lg font-bold text-gray-900">{warehouse.staffCount}</p>
                  </div>
                </div>

                {/* Utilization Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Space Utilization</span>
                    <span>{warehouse.currentUtilization.toLocaleString()} / {warehouse.capacity.toLocaleString()} sq ft</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        warehouse.utilizationRate >= 90 ? 'bg-red-500' :
                        warehouse.utilizationRate >= 80 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${warehouse.utilizationRate}%` }}
                    ></div>
                  </div>
                </div>

                {/* Today's Activity */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-white rounded p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-600">Inbound Today</p>
                        <p className="text-lg font-bold text-green-600">{warehouse.inboundToday}</p>
                      </div>
                      <ArrowDownRight className="text-green-500" size={20} />
                    </div>
                  </div>
                  <div className="bg-white rounded p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-600">Outbound Today</p>
                        <p className="text-lg font-bold text-blue-600">{warehouse.outboundToday}</p>
                      </div>
                      <ArrowUpRight className="text-blue-500" size={20} />
                    </div>
                  </div>
                </div>

                {/* Environmental Conditions */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Thermometer size={16} className="text-red-500" />
                    <span className="text-sm text-gray-600">Temperature: {warehouse.temperature}°C</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Activity size={16} className="text-blue-500" />
                    <span className="text-sm text-gray-600">Humidity: {warehouse.humidity}%</span>
                  </div>
                </div>

                {/* Manager Info */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{warehouse.manager}</p>
                      <p className="text-xs text-gray-500">Warehouse Manager</p>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        className="text-blue-600 hover:text-blue-900" 
                        title="View Details"
                        onClick={() => setSelectedWarehouse(warehouse)}
                      >
                        <Eye size={16} />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900" title="Edit">
                        <Edit size={16} />
                      </button>
                      <button className="text-green-600 hover:text-green-900" title="Generate Report">
                        <Download size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredWarehouses.length === 0 && (
            <div className="text-center py-12">
              <Warehouse className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No warehouses found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || statusFilter !== 'All' 
                  ? 'Try adjusting your search or filters'
                  : 'Get started by adding your first warehouse'
                }
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Create Warehouse Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Add New Warehouse</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Warehouse Name
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter warehouse name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Warehouse Code
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., WH-NYC-001"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Select type</option>
                    <option value="Distribution Center">Distribution Center</option>
                    <option value="Fulfillment Center">Fulfillment Center</option>
                    <option value="Cold Storage">Cold Storage</option>
                    <option value="Regional Hub">Regional Hub</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Manager
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter manager name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Capacity (sq ft)
                  </label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter capacity"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <textarea
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter full address"
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
                  Add Warehouse
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Warehouse Details Modal */}
      {selectedWarehouse && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-4/5 max-w-6xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-medium text-gray-900">Warehouse Details - {selectedWarehouse.name}</h3>
                <button
                  onClick={() => setSelectedWarehouse(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Performance Metrics */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Performance</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Efficiency</span>
                      <span className="text-gray-900 font-medium">{selectedWarehouse.efficiency}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Accuracy</span>
                      <span className="text-gray-900 font-medium">{selectedWarehouse.accuracy}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Operating Hours</span>
                      <span className="text-gray-900 font-medium">{selectedWarehouse.operatingHours}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Last Inspection</span>
                      <span className="text-gray-900 font-medium">{new Date(selectedWarehouse.lastInspection).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Financial Information */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Financial</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Monthly Cost</span>
                      <span className="text-gray-900 font-medium">{formatCurrency(selectedWarehouse.cost)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Monthly Revenue</span>
                      <span className="text-gray-900 font-medium">{formatCurrency(selectedWarehouse.revenue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Profit Margin</span>
                      <span className="text-gray-900 font-medium">
                        {(((selectedWarehouse.revenue - selectedWarehouse.cost) / selectedWarehouse.revenue) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Environmental Conditions */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Environment</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Temperature</span>
                      <span className="text-gray-900 font-medium flex items-center">
                        <Thermometer size={16} className="mr-1 text-red-500" />
                        {selectedWarehouse.temperature}°C
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Humidity</span>
                      <span className="text-gray-900 font-medium flex items-center">
                        <Activity size={16} className="mr-1 text-blue-500" />
                        {selectedWarehouse.humidity}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Security Level</span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getSecurityColor(selectedWarehouse.securityLevel)}`}>
                        {selectedWarehouse.securityLevel.charAt(0).toUpperCase() + selectedWarehouse.securityLevel.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Zone Breakdown */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Zone Utilization</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {selectedWarehouse.zones.map((zone, index) => (
                    <div key={index} className="bg-white rounded-lg p-4">
                      <h5 className="font-medium text-gray-900 mb-2">{zone.name}</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Utilization</span>
                          <span className={`font-medium ${getUtilizationColor(zone.utilization)}`}>
                            {zone.utilization}%
                          </span>
                        </div>
                        <div className="bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              zone.utilization >= 90 ? 'bg-red-500' :
                              zone.utilization >= 80 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${zone.utilization}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500">
                          {zone.current.toLocaleString()} / {zone.capacity.toLocaleString()} sq ft
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setSelectedWarehouse(null)}
                  className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Edit Warehouse
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WarehouseManagement;