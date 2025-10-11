import React, { useState, useEffect, useRef } from 'react';
import { BarChart3, LineChart, PieChart, TrendingUp, Activity, Zap } from 'lucide-react';

const RealTimeChart = ({ data, title, color, type = 'line' }) => {
  const canvasRef = useRef(null);
  const [animationId, setAnimationId] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !data || data.length === 0) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Set up gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, color + '40');
    gradient.addColorStop(1, color + '10');

    // Draw grid
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
      const y = (height / 10) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    if (data.length < 2) return;

    // Calculate min/max for scaling
    const values = data.map(d => d.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const range = maxValue - minValue || 1;

    // Draw area fill
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(0, height);
    
    data.forEach((point, index) => {
      const x = (width / (data.length - 1)) * index;
      const y = height - ((point.value - minValue) / range) * height;
      if (index === 0) {
        ctx.lineTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fill();

    // Draw line
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    data.forEach((point, index) => {
      const x = (width / (data.length - 1)) * index;
      const y = height - ((point.value - minValue) / range) * height;
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.stroke();

    // Draw data points
    ctx.fillStyle = color;
    data.forEach((point, index) => {
      const x = (width / (data.length - 1)) * index;
      const y = height - ((point.value - minValue) / range) * height;
      
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();
      
      // Highlight latest point
      if (index === data.length - 1) {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    });

  }, [data, color]);

  return (
    <div className="relative">
      <h4 className="text-sm font-medium mb-2 text-gray-700">{title}</h4>
      <div className="relative bg-white rounded-lg border p-3">
        <canvas 
          ref={canvasRef} 
          width={280} 
          height={120} 
          className="w-full"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
        <div className="absolute top-2 right-2">
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <Activity className="w-3 h-3" />
            <span>Live</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdvancedCharts = ({ data }) => {
  const [realtimeData, setRealtimeData] = useState({
    revenue: [],
    customers: [],
    orders: [],
    performance: []
  });

  // Generate real-time data points
  useEffect(() => {
    const generateDataPoint = () => {
      const now = Date.now();
      const baseValues = {
        revenue: 2850000,
        customers: 1623,
        orders: 156,
        performance: 87
      };

      return {
        revenue: {
          timestamp: now,
          value: baseValues.revenue + (Math.random() - 0.5) * 200000
        },
        customers: {
          timestamp: now,
          value: baseValues.customers + Math.floor((Math.random() - 0.5) * 40)
        },
        orders: {
          timestamp: now,
          value: baseValues.orders + Math.floor((Math.random() - 0.5) * 20)
        },
        performance: {
          timestamp: now,
          value: Math.max(0, Math.min(100, baseValues.performance + (Math.random() - 0.5) * 20))
        }
      };
    };

    // Initialize with some data points
    const initialData = Array.from({ length: 20 }, (_, index) => {
      const timestamp = Date.now() - (19 - index) * 30000; // 30 seconds apart
      return {
        revenue: { timestamp, value: 2850000 + (Math.random() - 0.5) * 200000 },
        customers: { timestamp, value: 1623 + Math.floor((Math.random() - 0.5) * 40) },
        orders: { timestamp, value: 156 + Math.floor((Math.random() - 0.5) * 20) },
        performance: { timestamp, value: 87 + (Math.random() - 0.5) * 20 }
      };
    });

    setRealtimeData({
      revenue: initialData.map(d => d.revenue),
      customers: initialData.map(d => d.customers),
      orders: initialData.map(d => d.orders),
      performance: initialData.map(d => d.performance)
    });

    // Update every 3 seconds for demo
    const interval = setInterval(() => {
      const newPoint = generateDataPoint();
      
      setRealtimeData(prev => ({
        revenue: [...prev.revenue.slice(-19), newPoint.revenue],
        customers: [...prev.customers.slice(-19), newPoint.customers],
        orders: [...prev.orders.slice(-19), newPoint.orders],
        performance: [...prev.performance.slice(-19), newPoint.performance]
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formatValue = (value, type) => {
    switch (type) {
      case 'revenue':
        return `₹${(value / 100000).toFixed(1)}L`;
      case 'customers':
        return value.toFixed(0);
      case 'orders':
        return value.toFixed(0);
      case 'performance':
        return `${value.toFixed(1)}%`;
      default:
        return value.toFixed(0);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center">
          <Activity className="mr-2 h-5 w-5 text-blue-600" />
          Real-Time Analytics
        </h2>
        <div className="flex items-center space-x-2 text-sm text-green-600">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Live Data</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Real-time Revenue */}
        <div className="space-y-4">
          <RealTimeChart 
            data={realtimeData.revenue}
            title="Revenue Trend (Live)"
            color="#10b981"
          />
          {realtimeData.revenue.length > 0 && (
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {formatValue(realtimeData.revenue[realtimeData.revenue.length - 1]?.value, 'revenue')}
              </div>
              <div className="text-sm text-gray-500">Current Revenue</div>
            </div>
          )}
        </div>

        {/* Real-time Customer Count */}
        <div className="space-y-4">
          <RealTimeChart 
            data={realtimeData.customers}
            title="Active Customers (Live)"
            color="#3b82f6"
          />
          {realtimeData.customers.length > 0 && (
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {formatValue(realtimeData.customers[realtimeData.customers.length - 1]?.value, 'customers')}
              </div>
              <div className="text-sm text-gray-500">Active Now</div>
            </div>
          )}
        </div>

        {/* Real-time Orders */}
        <div className="space-y-4">
          <RealTimeChart 
            data={realtimeData.orders}
            title="Orders Pipeline (Live)"
            color="#f59e0b"
          />
          {realtimeData.orders.length > 0 && (
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {formatValue(realtimeData.orders[realtimeData.orders.length - 1]?.value, 'orders')}
              </div>
              <div className="text-sm text-gray-500">Active Orders</div>
            </div>
          )}
        </div>

        {/* Real-time Performance */}
        <div className="space-y-4">
          <RealTimeChart 
            data={realtimeData.performance}
            title="Business Performance (Live)"
            color="#8b5cf6"
          />
          {realtimeData.performance.length > 0 && (
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {formatValue(realtimeData.performance[realtimeData.performance.length - 1]?.value, 'performance')}
              </div>
              <div className="text-sm text-gray-500">Health Score</div>
            </div>
          )}
        </div>
      </div>

      {/* Live Data Statistics */}
      <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-green-600 font-medium">Revenue Velocity</div>
              <div className="text-lg font-bold text-green-700">+₹2.3L/hr</div>
            </div>
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-blue-600 font-medium">Customer Flow</div>
              <div className="text-lg font-bold text-blue-700">+12 /min</div>
            </div>
            <Activity className="w-6 h-6 text-blue-600" />
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-yellow-600 font-medium">Order Rate</div>
              <div className="text-lg font-bold text-yellow-700">8.2 /hr</div>
            </div>
            <BarChart3 className="w-6 h-6 text-yellow-600" />
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-purple-600 font-medium">Efficiency</div>
              <div className="text-lg font-bold text-purple-700">94.2%</div>
            </div>
            <Zap className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedCharts;