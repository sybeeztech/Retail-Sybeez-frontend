import { useState, useEffect, useCallback, useMemo } from 'react';

// Custom hook for analytics data management with real-time updates
export const useAnalyticsData = (dateRange, refreshInterval = 30000) => { // 30 seconds for real-time
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [realtimeData, setRealtimeData] = useState([]);

  // Generate real-time data points for graphs
  const generateRealtimePoint = useCallback(() => {
    const now = new Date();
    const baseRevenue = 2850000;
    const variation = (Math.random() - 0.5) * 100000; // ±50K variation
    
    return {
      timestamp: now.toISOString(),
      revenue: baseRevenue + variation,
      customers: 1623 + Math.floor((Math.random() - 0.5) * 20),
      orders: 156 + Math.floor((Math.random() - 0.5) * 10),
      inventory: 4580000 + Math.floor((Math.random() - 0.5) * 200000),
      performance: 87 + Math.floor((Math.random() - 0.5) * 10)
    };
  }, []);

  // Memoized data fetching function
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call with realistic delay
      await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
      
      // Generate dynamic data based on date range
      const multiplier = dateRange === 'year' ? 12 : dateRange === 'quarter' ? 3 : dateRange === 'week' ? 0.25 : 1;
      
      const analyticsData = {
        timestamp: Date.now(),
        dateRange,
        
        // Financial Analytics
        financial: {
          totalRevenue: Math.round(2850000 * multiplier),
          revenueGrowth: Math.round((18.5 + (Math.random() - 0.5) * 5) * 10) / 10, // Round to 1 decimal
          netProfit: Math.round(485000 * multiplier),
          profitMargin: Math.round((17.02 + (Math.random() - 0.5) * 2) * 10) / 10, // Round to 1 decimal
          expenses: Math.round(2365000 * multiplier),
          cashFlow: Math.round(125000 * multiplier),
          monthlyRecurringRevenue: Math.round(95000 * multiplier)
        },
        
        // HR Analytics
        hr: {
          totalEmployees: 47,
          activeEmployees: 45,
          presentToday: Math.floor(Math.random() * 5) + 40,
          onLeave: Math.floor(Math.random() * 5) + 1,
          attritionRate: Math.round((6.4 + (Math.random() - 0.5) * 2) * 10) / 10,
          performanceScore: Math.round((4.2 + (Math.random() - 0.5) * 0.5) * 10) / 10,
          pendingLeaves: Math.floor(Math.random() * 10) + 5,
          departments: {
            'Sales': 12,
            'Operations': 15,
            'Finance': 8,
            'HR': 5,
            'IT': 7
          }
        },
        
        // Sales & CRM Analytics
        sales: {
          totalLeads: Math.round(1250 * multiplier),
          convertedLeads: Math.round(287 * multiplier),
          conversionRate: Math.round((22.96 + (Math.random() - 0.5) * 3) * 10) / 10,
          avgDealSize: Math.round(9930 * (1 + (Math.random() - 0.5) * 0.2)),
          activePipeline: Math.round(156 * multiplier),
          pipelineValue: Math.round(1548680 * multiplier),
          monthlyTargets: Math.round(2500000 * multiplier),
          achievedTargets: Math.round(2850000 * multiplier),
          winRate: Math.round((65.2 + (Math.random() - 0.5) * 5) * 10) / 10
        },
        
        // Customer Analytics
        customers: {
          totalCustomers: Math.round(1847 * multiplier),
          activeCustomers: Math.round(1623 * multiplier),
          newCustomers: Math.round(156 * multiplier),
          churnRate: Math.round((3.2 + (Math.random() - 0.5) * 1) * 10) / 10,
          customerSatisfaction: Math.round((4.3 + (Math.random() - 0.5) * 0.3) * 10) / 10,
          supportTickets: Math.round(89 * multiplier),
          resolvedTickets: Math.round(76 * multiplier),
          responseTime: Math.round((2.4 + (Math.random() - 0.5) * 0.5) * 10) / 10
        },
        
        // Inventory Analytics
        inventory: {
          totalProducts: 2547,
          lowStockItems: Math.floor(Math.random() * 20) + 30,
          outOfStock: Math.floor(Math.random() * 10) + 5,
          totalInventoryValue: Math.round(4580000 * (1 + (Math.random() - 0.5) * 0.1)),
          avgTurnoverRate: 8.5 + (Math.random() - 0.5) * 1,
          warehouseUtilization: 78.5 + (Math.random() - 0.5) * 5,
          returnRate: 2.1 + (Math.random() - 0.5) * 0.5
        },
        
        // AI Insights
        aiInsights: {
          businessHealthScore: Math.floor(Math.random() * 15) + 80,
          businessHealthTrend: Math.random() > 0.3 ? 'up' : 'down',
          salesPrediction: {
            nextWeek: Math.round(185000 * (1 + (Math.random() - 0.5) * 0.2)),
            nextMonth: Math.round(725000 * (1 + (Math.random() - 0.5) * 0.2)),
            confidence: Math.floor(Math.random() * 20) + 80
          },
          recommendations: [
            {
              type: 'opportunity',
              title: 'Inventory Optimization',
              description: `Reduce overstock by ${Math.floor(Math.random() * 10) + 20}% to free up ₹${(Math.random() * 2 + 2).toFixed(1)}L capital`,
              impact: 'High',
              effort: 'Medium'
            },
            {
              type: 'urgent',
              title: 'Low Stock Alert',
              description: `${Math.floor(Math.random() * 20) + 30} items below reorder point`,
              impact: 'High',
              effort: 'Low'
            },
            {
              type: 'insight',
              title: 'Sales Trend',
              description: `Q4 sales trending ${(Math.random() * 10 + 15).toFixed(1)}% above target`,
              impact: 'Medium',
              effort: 'Low'
            }
          ]
        }
      };
      
      setData(analyticsData);
      setLastUpdated(new Date());
    } catch (err) {
      setError('Failed to load analytics data. Please try again.');
      console.error('Analytics data fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [dateRange]);

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh functionality
  useEffect(() => {
    if (refreshInterval > 0) {
      const interval = setInterval(fetchData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchData, refreshInterval]);

  // Memoized computed values
  const computedMetrics = useMemo(() => {
    if (!data) return null;
    
    return {
      totalRevenue: data.financial.totalRevenue,
      profitMargin: (data.financial.netProfit / data.financial.totalRevenue) * 100,
      employeeUtilization: (data.hr.presentToday / data.hr.totalEmployees) * 100,
      customerGrowthRate: (data.customers.newCustomers / data.customers.totalCustomers) * 100,
      inventoryHealth: 100 - (data.inventory.lowStockItems / data.inventory.totalProducts) * 100
    };
  }, [data]);

  return { 
    data, 
    loading, 
    error, 
    lastUpdated,
    computedMetrics,
    refetch: fetchData 
  };
};

// Performance monitoring hook
export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    renderTime: 0,
    memoryUsage: 0
  });

  useEffect(() => {
    const startTime = performance.now();
    
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'measure') {
          setMetrics(prev => ({
            ...prev,
            renderTime: entry.duration
          }));
        }
      });
    });

    observer.observe({ entryTypes: ['measure'] });

    // Memory usage (if available)
    if ('memory' in performance) {
      setMetrics(prev => ({
        ...prev,
        memoryUsage: performance.memory.usedJSHeapSize / 1024 / 1024 // MB
      }));
    }

    return () => {
      observer.disconnect();
      const endTime = performance.now();
      setMetrics(prev => ({
        ...prev,
        loadTime: endTime - startTime
      }));
    };
  }, []);

  return metrics;
};

// Local storage hook for user preferences
export const useUserPreferences = () => {
  const [preferences, setPreferences] = useState(() => {
    try {
      const saved = localStorage.getItem('analyticsPreferences');
      return saved ? JSON.parse(saved) : {
        dateRange: 'month',
        refreshInterval: 30000, // 30 seconds for real-time updates
        showAdvancedView: true,  // Always show advanced view
        theme: 'light'
      };
    } catch {
      return {
        dateRange: 'month',
        refreshInterval: 300000,
        showAdvancedView: false,
        theme: 'light'
      };
    }
  });

  const updatePreference = useCallback((key, value) => {
    setPreferences(prev => {
      const updated = { ...prev, [key]: value };
      try {
        localStorage.setItem('analyticsPreferences', JSON.stringify(updated));
      } catch (error) {
        console.warn('Failed to save preferences:', error);
      }
      return updated;
    });
  }, []);

  return { preferences, updatePreference };
};

// Utility functions
export const formatCurrency = (amount) => {
  if (!amount || isNaN(amount)) return '₹0';
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`;
  return `₹${amount.toLocaleString()}`;
};

export const formatNumber = (num) => {
  if (!num || isNaN(num)) return '0';
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toLocaleString();
};

export const formatPercentage = (value) => {
  if (typeof value !== 'number' || isNaN(value)) return '0.0%';
  return `${Math.round(value * 10) / 10}%`;
};

export const getTimeAgo = (date) => {
  const now = new Date();
  const diff = now - date;
  const minutes = Math.floor(diff / 60000);
  
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`;
  return `${Math.floor(minutes / 1440)}d ago`;
};

// Export analytics data
export const exportAnalyticsData = (data, format = 'json') => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `analytics-${timestamp}.${format}`;
  
  let content, mimeType;
  
  if (format === 'csv') {
    // Convert to CSV format
    const rows = [];
    rows.push(['Metric', 'Value', 'Category']);
    
    Object.entries(data).forEach(([category, metrics]) => {
      if (typeof metrics === 'object' && metrics !== null) {
        Object.entries(metrics).forEach(([key, value]) => {
          rows.push([key, value, category]);
        });
      }
    });
    
    content = rows.map(row => row.join(',')).join('\n');
    mimeType = 'text/csv';
  } else {
    content = JSON.stringify(data, null, 2);
    mimeType = 'application/json';
  }
  
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};