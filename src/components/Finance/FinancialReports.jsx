import React, { useState, useEffect, useMemo } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Download, 
  Calendar, 
  Filter,
  BarChart3,
  PieChart,
  FileText,
  DollarSign,
  Eye,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Building,
  CreditCard,
  Calculator,
  Moon,
  Sun,
  Printer,
  Share2,
  ZoomIn,
  ZoomOut,
  Search
} from 'lucide-react';
import useSettingsStore from '../../store/settingsStore';

const FinancialReports = () => {
  const [selectedReport, setSelectedReport] = useState('profit-loss');
  const [selectedPeriod, setSelectedPeriod] = useState('This Quarter');
  const [comparisonPeriod, setComparisonPeriod] = useState('Previous Quarter');
  const [reportData, setReportData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [searchTerm, setSearchTerm] = useState('');
  const [exportFormat, setExportFormat] = useState('pdf');
  const { theme, toggleTheme } = useSettingsStore();

  // Enhanced financial data with comparison periods
  const financialData = {
    'This Month': {
      profitLoss: {
        revenue: {
          productSales: 285000,
          serviceSales: 120000,
          otherIncome: 5000,
          total: 410000
        },
        expenses: {
          costOfGoodsSold: 145000,
          salariesAndBenefits: 125000,
          marketingAndAdvertising: 35000,
          technology: 45000,
          facilities: 34000,
          operations: 28000,
          other: 15000,
          total: 427000
        },
        grossProfit: 265000,
        netIncome: -17000,
        previousPeriod: {
          revenue: 395000,
          expenses: 410000,
          netIncome: -15000
        }
      },
      balanceSheet: {
        assets: {
          currentAssets: {
            cash: 450000,
            accountsReceivable: 180000,
            inventory: 95000,
            prepaidExpenses: 25000,
            total: 750000
          },
          fixedAssets: {
            equipment: 320000,
            furniture: 45000,
            intangibleAssets: 125000,
            total: 490000
          },
          totalAssets: 1240000
        },
        liabilities: {
          currentLiabilities: {
            accountsPayable: 95000,
            accruals: 35000,
            shortTermDebt: 50000,
            total: 180000
          },
          longTermLiabilities: {
            longTermDebt: 250000,
            deferredTax: 15000,
            total: 265000
          },
          totalLiabilities: 445000
        },
        equity: {
          retainedEarnings: 595000,
          additionalPaidIn: 200000,
          total: 795000
        }
      },
      cashFlow: {
        operating: {
          netIncome: -17000,
          depreciation: 15000,
          accountsReceivableChange: -15000,
          accountsPayableChange: 8000,
          inventoryChange: -5000,
          total: -14000
        },
        investing: {
          equipmentPurchases: -25000,
          assetSales: 5000,
          total: -20000
        },
        financing: {
          debtProceeds: 30000,
          debtPayments: -10000,
          dividends: 0,
          total: 20000
        },
        netCashFlow: -14000,
        beginningCash: 464000,
        endingCash: 450000
      }
    },
    'This Quarter': {
      profitLoss: {
        revenue: {
          productSales: 850000,
          serviceSales: 320000,
          otherIncome: 15000,
          total: 1185000
        },
        expenses: {
          costOfGoodsSold: 420000,
          salariesAndBenefits: 385000,
          marketingAndAdvertising: 95000,
          technology: 125000,
          facilities: 102000,
          operations: 78000,
          other: 45000,
          total: 1250000
        },
        grossProfit: 765000,
        netIncome: -65000,
        previousPeriod: {
          revenue: 1120000,
          expenses: 1180000,
          netIncome: -60000
        }
      },
      balanceSheet: {
        assets: {
          currentAssets: {
            cash: 450000,
            accountsReceivable: 180000,
            inventory: 95000,
            prepaidExpenses: 25000,
            total: 750000
          },
          fixedAssets: {
            equipment: 320000,
            furniture: 45000,
            intangibleAssets: 125000,
            total: 490000
          },
          totalAssets: 1240000
        },
        liabilities: {
          currentLiabilities: {
            accountsPayable: 95000,
            accruals: 35000,
            shortTermDebt: 50000,
            total: 180000
          },
          longTermLiabilities: {
            longTermDebt: 250000,
            deferredTax: 15000,
            total: 265000
          },
          totalLiabilities: 445000
        },
        equity: {
          retainedEarnings: 595000,
          additionalPaidIn: 200000,
          total: 795000
        }
      },
      cashFlow: {
        operating: {
          netIncome: -65000,
          depreciation: 45000,
          accountsReceivableChange: -25000,
          accountsPayableChange: 15000,
          inventoryChange: -10000,
          total: -40000
        },
        investing: {
          equipmentPurchases: -85000,
          assetSales: 15000,
          total: -70000
        },
        financing: {
          debtProceeds: 100000,
          debtPayments: -25000,
          dividends: 0,
          total: 75000
        },
        netCashFlow: -35000,
        beginningCash: 485000,
        endingCash: 450000
      }
    },
    'This Year': {
      profitLoss: {
        revenue: {
          productSales: 3200000,
          serviceSales: 1250000,
          otherIncome: 50000,
          total: 4500000
        },
        expenses: {
          costOfGoodsSold: 1650000,
          salariesAndBenefits: 1450000,
          marketingAndAdvertising: 350000,
          technology: 450000,
          facilities: 380000,
          operations: 280000,
          other: 150000,
          total: 4610000
        },
        grossProfit: 2850000,
        netIncome: -110000,
        previousPeriod: {
          revenue: 4300000,
          expenses: 4400000,
          netIncome: -100000
        }
      },
      balanceSheet: {
        assets: {
          currentAssets: {
            cash: 450000,
            accountsReceivable: 180000,
            inventory: 95000,
            prepaidExpenses: 25000,
            total: 750000
          },
          fixedAssets: {
            equipment: 320000,
            furniture: 45000,
            intangibleAssets: 125000,
            total: 490000
          },
          totalAssets: 1240000
        },
        liabilities: {
          currentLiabilities: {
            accountsPayable: 95000,
            accruals: 35000,
            shortTermDebt: 50000,
            total: 180000
          },
          longTermLiabilities: {
            longTermDebt: 250000,
            deferredTax: 15000,
            total: 265000
          },
          totalLiabilities: 445000
        },
        equity: {
          retainedEarnings: 595000,
          additionalPaidIn: 200000,
          total: 795000
        }
      },
      cashFlow: {
        operating: {
          netIncome: -110000,
          depreciation: 180000,
          accountsReceivableChange: -75000,
          accountsPayableChange: 45000,
          inventoryChange: -25000,
          total: -45000
        },
        investing: {
          equipmentPurchases: -320000,
          assetSales: 45000,
          total: -275000
        },
        financing: {
          debtProceeds: 300000,
          debtPayments: -80000,
          dividends: 0,
          total: 220000
        },
        netCashFlow: -100000,
        beginningCash: 550000,
        endingCash: 450000
      }
    }
  };

  const reportTypes = [
    { id: 'profit-loss', name: 'Profit & Loss', icon: TrendingUp, color: 'blue' },
    { id: 'balance-sheet', name: 'Balance Sheet', icon: Building, color: 'green' },
    { id: 'cash-flow', name: 'Cash Flow', icon: CreditCard, color: 'purple' },
    { id: 'key-metrics', name: 'Key Metrics', icon: Calculator, color: 'orange' }
  ];

  // Load report data when period changes
  useEffect(() => {
    loadReportData();
  }, [selectedPeriod, selectedReport]);

  const loadReportData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setReportData(financialData[selectedPeriod] || financialData['This Quarter']);
      setIsLoading(false);
    }, 500);
  };

  const handleRefresh = () => {
    loadReportData();
  };

  const handlePreview = () => {
    setPreviewMode(!previewMode);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (value) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  const getTrendIcon = (trend) => {
    return trend === 'up' ? 
      <TrendingUp size={16} className="text-green-500" /> : 
      <TrendingDown size={16} className="text-red-500" />;
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? 'text-green-600' : 'text-red-600';
  };

  // Enhanced export functionality
  const handleExport = (format = exportFormat) => {
    setIsLoading(true);
    
    setTimeout(() => {
      let content = '';
      let filename = '';
      let mimeType = '';
      
      switch (format) {
        case 'pdf':
          content = `PDF Export - ${selectedReport} - ${selectedPeriod}`;
          filename = `financial-report-${selectedReport}-${selectedPeriod.toLowerCase().replace(' ', '-')}-${Date.now()}.pdf`;
          mimeType = 'application/pdf';
          break;
        case 'excel':
          content = `Excel Export - ${selectedReport} - ${selectedPeriod}`;
          filename = `financial-report-${selectedReport}-${selectedPeriod.toLowerCase().replace(' ', '-')}-${Date.now()}.xlsx`;
          mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
          break;
        case 'csv':
          content = `CSV Export - ${selectedReport} - ${selectedPeriod}`;
          filename = `financial-report-${selectedReport}-${selectedPeriod.toLowerCase().replace(' ', '-')}-${Date.now()}.csv`;
          mimeType = 'text/csv';
          break;
        default:
          content = `All Reports Export - ${selectedPeriod}`;
          filename = `financial-reports-${selectedPeriod.toLowerCase().replace(' ', '-')}-${Date.now()}.txt`;
          mimeType = 'text/plain';
      }
      
      const blob = new Blob([content], { type: mimeType });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      setIsLoading(false);
    }, 1000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Financial Report - ${selectedReport}`,
        text: `Check out this ${selectedReport} report for ${selectedPeriod}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Report link copied to clipboard!');
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 50));
  };

  const handleZoomReset = () => {
    setZoomLevel(100);
  };

  // Calculate key metrics based on current data
  const calculateMetrics = useMemo(() => {
    const data = reportData.profitLoss;
    if (!data) return [];

    const grossProfitMargin = data.revenue?.total ? ((data.grossProfit / data.revenue.total) * 100).toFixed(1) : '0.0';
    const netProfitMargin = data.revenue?.total ? ((data.netIncome / data.revenue.total) * 100).toFixed(1) : '0.0';
    
    const currentRatio = reportData.balanceSheet ? 
      (reportData.balanceSheet.assets.currentAssets.total / reportData.balanceSheet.liabilities.currentLiabilities.total).toFixed(2) : '0.00';
    
    const debtToEquity = reportData.balanceSheet ? 
      (reportData.balanceSheet.liabilities.totalLiabilities / reportData.balanceSheet.equity.total).toFixed(2) : '0.00';
    
    const workingCapital = reportData.balanceSheet ? 
      reportData.balanceSheet.assets.currentAssets.total - reportData.balanceSheet.liabilities.currentLiabilities.total : 0;

    return [
      {
        name: 'Gross Profit Margin',
        value: `${grossProfitMargin}%`,
        change: '+2.1%',
        trend: 'up',
        description: 'Revenue minus cost of goods sold'
      },
      {
        name: 'Net Profit Margin',
        value: `${netProfitMargin}%`,
        change: '-8.2%',
        trend: 'down',
        description: 'Net income as percentage of revenue'
      },
      {
        name: 'Current Ratio',
        value: currentRatio,
        change: '+0.3',
        trend: 'up',
        description: 'Current assets divided by current liabilities'
      },
      {
        name: 'Debt-to-Equity',
        value: debtToEquity,
        change: '-0.1',
        trend: 'up',
        description: 'Total debt divided by total equity'
      },
      {
        name: 'ROA',
        value: '-5.2%',
        change: '-3.1%',
        trend: 'down',
        description: 'Return on assets'
      },
      {
        name: 'Working Capital',
        value: formatCurrency(workingCapital),
        change: '+$45K',
        trend: 'up',
        description: 'Current assets minus current liabilities'
      }
    ];
  }, [reportData]);

  const currentData = reportData;

  // Helper function to format keys for display
  const formatKey = (key) => {
    return key.split(/(?=[A-Z])/).join(' ');
  };

  // Get color class based on report type
  const getColorClass = (color, type = 'text') => {
    const colorMap = {
      blue: type === 'text' ? 'text-blue-600 dark:text-blue-400' : 'border-blue-500',
      green: type === 'text' ? 'text-green-600 dark:text-green-400' : 'border-green-500',
      purple: type === 'text' ? 'text-purple-600 dark:text-purple-400' : 'border-purple-500',
      orange: type === 'text' ? 'text-orange-600 dark:text-orange-400' : 'border-orange-500'
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className={`p-6 space-y-6 min-h-screen ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className={`text-2xl font-semibold ${
              theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Financial Reports
            </h1>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Comprehensive financial statements and analysis
            </p>
          </div>
          <div className="flex items-center space-x-3">
            {/* Search */}
            <div className={`relative ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            } rounded-lg border ${
              theme === 'dark' ? 'border-gray-700' : 'border-gray-300'
            }`}>
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 pr-4 py-2 bg-transparent border-none focus:outline-none focus:ring-0 w-64 ${
                  theme === 'dark' ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                theme === 'dark' 
                  ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className={`border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="This Month">This Month</option>
              <option value="This Quarter">This Quarter</option>
              <option value="This Year">This Year</option>
              <option value="Last Month">Last Month</option>
              <option value="Last Quarter">Last Quarter</option>
              <option value="Last Year">Last Year</option>
            </select>
            
            <button 
              onClick={handleRefresh}
              disabled={isLoading}
              className={`border rounded-lg px-3 py-2 flex items-center space-x-2 transition-colors ${
                theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600' 
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              } disabled:opacity-50`}
            >
              <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
              <span>{isLoading ? 'Loading...' : 'Refresh'}</span>
            </button>
          </div>
        </div>

        {/* Report Type Tabs */}
        <div className={`rounded-lg shadow ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className={`border-b ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {reportTypes.map((report) => (
                <button
                  key={report.id}
                  onClick={() => setSelectedReport(report.id)}
                  disabled={isLoading}
                  className={`${
                    selectedReport === report.id
                      ? `${getColorClass(report.color, 'border')} ${getColorClass(report.color)}`
                      : `border-transparent ${
                          theme === 'dark' 
                            ? 'text-gray-400 hover:text-gray-300 hover:border-gray-600' 
                            : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`
                  } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 disabled:opacity-50 transition-colors`}
                >
                  <report.icon size={16} />
                  <span>{report.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className={`flex justify-between items-center p-4 rounded-lg shadow ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="flex items-center space-x-4">
          <span className={`text-sm font-medium ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            View Controls:
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleZoomOut}
              disabled={zoomLevel <= 50}
              className={`p-2 rounded ${
                theme === 'dark' 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } disabled:opacity-50`}
            >
              <ZoomOut size={16} />
            </button>
            <span className={`text-sm font-medium w-12 text-center ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {zoomLevel}%
            </span>
            <button
              onClick={handleZoomIn}
              disabled={zoomLevel >= 200}
              className={`p-2 rounded ${
                theme === 'dark' 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } disabled:opacity-50`}
            >
              <ZoomIn size={16} />
            </button>
            <button
              onClick={handleZoomReset}
              className={`p-2 rounded ${
                theme === 'dark' 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Reset
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <select
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value)}
            className={`border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              theme === 'dark' 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="pdf">PDF</option>
            <option value="excel">Excel</option>
            <option value="csv">CSV</option>
          </select>

          <button 
            onClick={handlePreview}
            className={`border rounded-lg px-3 py-2 flex items-center space-x-2 transition-colors ${
              theme === 'dark' 
                ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600' 
                : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Eye size={16} />
            <span>{previewMode ? 'Exit Preview' : 'Preview'}</span>
          </button>

          <button 
            onClick={handlePrint}
            className={`border rounded-lg px-3 py-2 flex items-center space-x-2 transition-colors ${
              theme === 'dark' 
                ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600' 
                : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Printer size={16} />
            <span>Print</span>
          </button>

          <button 
            onClick={handleShare}
            className={`border rounded-lg px-3 py-2 flex items-center space-x-2 transition-colors ${
              theme === 'dark' 
                ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600' 
                : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Share2 size={16} />
            <span>Share</span>
          </button>

          <button 
            onClick={() => handleExport()}
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 disabled:opacity-50"
          >
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Report Content */}
      <div 
        className={`rounded-lg shadow transition-all duration-200 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
        style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
      >
        <div className="p-6">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <RefreshCw size={32} className="animate-spin text-blue-500" />
              <span className={`ml-3 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Loading report data...
              </span>
            </div>
          ) : (
            <>
              {/* Profit & Loss Statement */}
              {selectedReport === 'profit-loss' && currentData.profitLoss && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className={`text-xl font-semibold ${
                        theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      }`}>
                        Profit & Loss Statement
                      </h2>
                      <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                        For the period ending {new Date().toLocaleDateString()}
                      </p>
                    </div>
                    <div className={`px-4 py-2 rounded-lg ${
                      currentData.profitLoss.netIncome >= 0 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                    }`}>
                      <span className="font-semibold">
                        Net Income: {formatCurrency(currentData.profitLoss.netIncome)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Revenue Section */}
                    <div className="space-y-4">
                      <h3 className={`text-lg font-medium border-b pb-2 ${
                        theme === 'dark' ? 'text-gray-100 border-gray-700' : 'text-gray-900 border-gray-200'
                      }`}>
                        Revenue
                      </h3>
                      <div className="space-y-3">
                        {Object.entries(currentData.profitLoss.revenue).map(([key, value]) => (
                          key !== 'total' && (
                            <div key={key} className="flex justify-between">
                              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                                {formatKey(key)}
                              </span>
                              <span className={`font-medium ${
                                theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                              }`}>
                                {formatCurrency(value)}
                              </span>
                            </div>
                          )
                        ))}
                        <div className={`flex justify-between border-t pt-2 ${
                          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                        }`}>
                          <span className={`font-semibold ${
                            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                          }`}>
                            Total Revenue
                          </span>
                          <span className="font-semibold text-green-600">
                            {formatCurrency(currentData.profitLoss.revenue.total)}
                          </span>
                        </div>
                      </div>

                      <h3 className={`text-lg font-medium border-b pb-2 mt-6 ${
                        theme === 'dark' ? 'text-gray-100 border-gray-700' : 'text-gray-900 border-gray-200'
                      }`}>
                        Cost of Goods Sold
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Direct Materials & Labor</span>
                          <span className="font-medium text-red-600">
                            {formatCurrency(currentData.profitLoss.expenses.costOfGoodsSold)}
                          </span>
                        </div>
                        <div className={`flex justify-between border-t pt-2 ${
                          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                        }`}>
                          <span className={`font-semibold ${
                            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                          }`}>
                            Gross Profit
                          </span>
                          <span className="font-semibold text-blue-600">
                            {formatCurrency(currentData.profitLoss.grossProfit)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Expenses Section */}
                    <div className="space-y-4">
                      <h3 className={`text-lg font-medium border-b pb-2 ${
                        theme === 'dark' ? 'text-gray-100 border-gray-700' : 'text-gray-900 border-gray-200'
                      }`}>
                        Operating Expenses
                      </h3>
                      <div className="space-y-3">
                        {Object.entries(currentData.profitLoss.expenses).map(([key, value]) => (
                          key !== 'total' && key !== 'costOfGoodsSold' && (
                            <div key={key} className="flex justify-between">
                              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                                {formatKey(key)}
                              </span>
                              <span className="font-medium text-red-600">
                                {formatCurrency(value)}
                              </span>
                            </div>
                          )
                        ))}
                        <div className={`flex justify-between border-t pt-2 ${
                          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                        }`}>
                          <span className={`font-semibold ${
                            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                          }`}>
                            Total Operating Expenses
                          </span>
                          <span className="font-semibold text-red-600">
                            {formatCurrency(currentData.profitLoss.expenses.total - currentData.profitLoss.expenses.costOfGoodsSold)}
                          </span>
                        </div>
                        <div className={`flex justify-between border-t pt-2 ${
                          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                        }`}>
                          <span className={`font-bold ${
                            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                          }`}>
                            Net Income
                          </span>
                          <span className={`font-bold ${
                            currentData.profitLoss.netIncome >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {formatCurrency(currentData.profitLoss.netIncome)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Balance Sheet */}
              {selectedReport === 'balance-sheet' && currentData.balanceSheet && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className={`text-xl font-semibold ${
                        theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      }`}>
                        Balance Sheet
                      </h2>
                      <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                        As of {new Date().toLocaleDateString()}
                      </p>
                    </div>
                    <div className={`px-4 py-2 rounded-lg bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300`}>
                      <span className="font-semibold">
                        Total Assets: {formatCurrency(currentData.balanceSheet.assets.totalAssets)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Assets */}
                    <div className="space-y-4">
                      <h3 className={`text-lg font-medium border-b pb-2 ${
                        theme === 'dark' ? 'text-gray-100 border-gray-700' : 'text-gray-900 border-gray-200'
                      }`}>
                        Assets
                      </h3>
                      
                      {/* Current Assets */}
                      <div className="space-y-3">
                        <h4 className={`font-medium ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Current Assets
                        </h4>
                        <div className="ml-4 space-y-2">
                          {Object.entries(currentData.balanceSheet.assets.currentAssets).map(([key, value]) => (
                            key !== 'total' && (
                              <div key={key} className="flex justify-between">
                                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                                  {formatKey(key)}
                                </span>
                                <span className={`font-medium ${
                                  theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                                }`}>
                                  {formatCurrency(value)}
                                </span>
                              </div>
                            )
                          ))}
                          <div className={`flex justify-between border-t pt-2 ${
                            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                          }`}>
                            <span className={`font-medium ${
                              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              Total Current Assets
                            </span>
                            <span className={`font-medium ${
                              theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                            }`}>
                              {formatCurrency(currentData.balanceSheet.assets.currentAssets.total)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Fixed Assets */}
                      <div className="space-y-3">
                        <h4 className={`font-medium ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Fixed Assets
                        </h4>
                        <div className="ml-4 space-y-2">
                          {Object.entries(currentData.balanceSheet.assets.fixedAssets).map(([key, value]) => (
                            key !== 'total' && (
                              <div key={key} className="flex justify-between">
                                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                                  {formatKey(key)}
                                </span>
                                <span className={`font-medium ${
                                  theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                                }`}>
                                  {formatCurrency(value)}
                                </span>
                              </div>
                            )
                          ))}
                          <div className={`flex justify-between border-t pt-2 ${
                            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                          }`}>
                            <span className={`font-medium ${
                              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              Total Fixed Assets
                            </span>
                            <span className={`font-medium ${
                              theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                            }`}>
                              {formatCurrency(currentData.balanceSheet.assets.fixedAssets.total)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className={`flex justify-between border-t pt-2 ${
                        theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                      }`}>
                        <span className={`font-bold ${
                          theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                        }`}>
                          Total Assets
                        </span>
                        <span className="font-bold text-blue-600">
                          {formatCurrency(currentData.balanceSheet.assets.totalAssets)}
                        </span>
                      </div>
                    </div>

                    {/* Liabilities & Equity */}
                    <div className="space-y-4">
                      <h3 className={`text-lg font-medium border-b pb-2 ${
                        theme === 'dark' ? 'text-gray-100 border-gray-700' : 'text-gray-900 border-gray-200'
                      }`}>
                        Liabilities & Equity
                      </h3>
                      
                      {/* Current Liabilities */}
                      <div className="space-y-3">
                        <h4 className={`font-medium ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Current Liabilities
                        </h4>
                        <div className="ml-4 space-y-2">
                          {Object.entries(currentData.balanceSheet.liabilities.currentLiabilities).map(([key, value]) => (
                            key !== 'total' && (
                              <div key={key} className="flex justify-between">
                                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                                  {formatKey(key)}
                                </span>
                                <span className={`font-medium ${
                                  theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                                }`}>
                                  {formatCurrency(value)}
                                </span>
                              </div>
                            )
                          ))}
                          <div className={`flex justify-between border-t pt-2 ${
                            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                          }`}>
                            <span className={`font-medium ${
                              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              Total Current Liabilities
                            </span>
                            <span className={`font-medium ${
                              theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                            }`}>
                              {formatCurrency(currentData.balanceSheet.liabilities.currentLiabilities.total)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Long-term Liabilities */}
                      <div className="space-y-3">
                        <h4 className={`font-medium ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Long-term Liabilities
                        </h4>
                        <div className="ml-4 space-y-2">
                          {Object.entries(currentData.balanceSheet.liabilities.longTermLiabilities).map(([key, value]) => (
                            key !== 'total' && (
                              <div key={key} className="flex justify-between">
                                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                                  {formatKey(key)}
                                </span>
                                <span className={`font-medium ${
                                  theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                                }`}>
                                  {formatCurrency(value)}
                                </span>
                              </div>
                            )
                          ))}
                          <div className={`flex justify-between border-t pt-2 ${
                            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                          }`}>
                            <span className={`font-medium ${
                              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              Total Long-term Liabilities
                            </span>
                            <span className={`font-medium ${
                              theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                            }`}>
                              {formatCurrency(currentData.balanceSheet.liabilities.longTermLiabilities.total)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className={`flex justify-between border-t pt-2 ${
                        theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                      }`}>
                        <span className={`font-medium ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Total Liabilities
                        </span>
                        <span className="font-medium text-red-600">
                          {formatCurrency(currentData.balanceSheet.liabilities.totalLiabilities)}
                        </span>
                      </div>

                      {/* Equity */}
                      <div className="space-y-3">
                        <h4 className={`font-medium ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Equity
                        </h4>
                        <div className="ml-4 space-y-2">
                          {Object.entries(currentData.balanceSheet.equity).map(([key, value]) => (
                            key !== 'total' && (
                              <div key={key} className="flex justify-between">
                                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                                  {formatKey(key)}
                                </span>
                                <span className={`font-medium ${
                                  theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                                }`}>
                                  {formatCurrency(value)}
                                </span>
                              </div>
                            )
                          ))}
                          <div className={`flex justify-between border-t pt-2 ${
                            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                          }`}>
                            <span className={`font-medium ${
                              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              Total Equity
                            </span>
                            <span className="font-medium text-green-600">
                              {formatCurrency(currentData.balanceSheet.equity.total)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className={`flex justify-between border-t pt-2 ${
                        theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                      }`}>
                        <span className={`font-bold ${
                          theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                        }`}>
                          Total Liabilities & Equity
                        </span>
                        <span className="font-bold text-blue-600">
                          {formatCurrency(currentData.balanceSheet.liabilities.totalLiabilities + currentData.balanceSheet.equity.total)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Cash Flow Statement */}
              {selectedReport === 'cash-flow' && currentData.cashFlow && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className={`text-xl font-semibold ${
                        theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      }`}>
                        Cash Flow Statement
                      </h2>
                      <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                        For the period ending {new Date().toLocaleDateString()}
                      </p>
                    </div>
                    <div className={`px-4 py-2 rounded-lg ${
                      currentData.cashFlow.netCashFlow >= 0 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                    }`}>
                      <span className="font-semibold">
                        Net Cash Flow: {formatCurrency(currentData.cashFlow.netCashFlow)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Operating Activities */}
                    <div className={`rounded-lg p-6 ${
                      theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                    }`}>
                      <h3 className={`text-lg font-medium mb-4 ${
                        theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      }`}>
                        Cash Flow from Operating Activities
                      </h3>
                      <div className="space-y-3">
                        {Object.entries(currentData.cashFlow.operating).map(([key, value]) => (
                          key !== 'total' && (
                            <div key={key} className="flex justify-between">
                              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                                {formatKey(key)}
                              </span>
                              <span className={`font-medium ${
                                value >= 0 ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {formatCurrency(value)}
                              </span>
                            </div>
                          )
                        ))}
                        <div className={`flex justify-between border-t pt-2 ${
                          theme === 'dark' ? 'border-gray-600' : 'border-gray-200'
                        }`}>
                          <span className={`font-bold ${
                            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                          }`}>
                            Net Cash from Operating Activities
                          </span>
                          <span className={`font-bold ${
                            currentData.cashFlow.operating.total >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {formatCurrency(currentData.cashFlow.operating.total)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Investing Activities */}
                    <div className={`rounded-lg p-6 ${
                      theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                    }`}>
                      <h3 className={`text-lg font-medium mb-4 ${
                        theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      }`}>
                        Cash Flow from Investing Activities
                      </h3>
                      <div className="space-y-3">
                        {Object.entries(currentData.cashFlow.investing).map(([key, value]) => (
                          key !== 'total' && (
                            <div key={key} className="flex justify-between">
                              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                                {formatKey(key)}
                              </span>
                              <span className={`font-medium ${
                                value >= 0 ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {formatCurrency(value)}
                              </span>
                            </div>
                          )
                        ))}
                        <div className={`flex justify-between border-t pt-2 ${
                          theme === 'dark' ? 'border-gray-600' : 'border-gray-200'
                        }`}>
                          <span className={`font-bold ${
                            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                          }`}>
                            Net Cash from Investing Activities
                          </span>
                          <span className={`font-bold ${
                            currentData.cashFlow.investing.total >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {formatCurrency(currentData.cashFlow.investing.total)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Financing Activities */}
                    <div className={`rounded-lg p-6 ${
                      theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                    }`}>
                      <h3 className={`text-lg font-medium mb-4 ${
                        theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      }`}>
                        Cash Flow from Financing Activities
                      </h3>
                      <div className="space-y-3">
                        {Object.entries(currentData.cashFlow.financing).map(([key, value]) => (
                          key !== 'total' && (
                            <div key={key} className="flex justify-between">
                              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                                {formatKey(key)}
                              </span>
                              <span className={`font-medium ${
                                value >= 0 ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {formatCurrency(value)}
                              </span>
                            </div>
                          )
                        ))}
                        <div className={`flex justify-between border-t pt-2 ${
                          theme === 'dark' ? 'border-gray-600' : 'border-gray-200'
                        }`}>
                          <span className={`font-bold ${
                            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                          }`}>
                            Net Cash from Financing Activities
                          </span>
                          <span className={`font-bold ${
                            currentData.cashFlow.financing.total >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {formatCurrency(currentData.cashFlow.financing.total)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Net Cash Flow Summary */}
                    <div className={`rounded-lg p-6 ${
                      theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'
                    }`}>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className={`font-bold ${
                            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                          }`}>
                            Net Change in Cash
                          </span>
                          <span className={`font-bold ${
                            currentData.cashFlow.netCashFlow >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {formatCurrency(currentData.cashFlow.netCashFlow)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Beginning Cash Balance</span>
                          <span className={`font-medium ${
                            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                          }`}>
                            {formatCurrency(currentData.cashFlow.beginningCash)}
                          </span>
                        </div>
                        <div className={`flex justify-between border-t pt-2 ${
                          theme === 'dark' ? 'border-gray-600' : 'border-gray-200'
                        }`}>
                          <span className={`font-bold ${
                            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                          }`}>
                            Ending Cash Balance
                          </span>
                          <span className="font-bold text-blue-600">
                            {formatCurrency(currentData.cashFlow.endingCash)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Key Metrics */}
              {selectedReport === 'key-metrics' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className={`text-xl font-semibold ${
                        theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      }`}>
                        Key Financial Metrics
                      </h2>
                      <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                        Performance indicators and financial health analysis
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {calculateMetrics.map((metric, index) => (
                      <div key={index} className={`rounded-lg p-6 ${
                        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                      }`}>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className={`text-lg font-medium ${
                            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                          }`}>
                            {metric.name}
                          </h3>
                          {getTrendIcon(metric.trend)}
                        </div>
                        <div className="space-y-2">
                          <p className={`text-3xl font-bold ${
                            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                          }`}>
                            {metric.value}
                          </p>
                          <div className="flex items-center space-x-2">
                            <span className={`text-sm font-medium ${getTrendColor(metric.trend)}`}>
                              {metric.change}
                            </span>
                            <span className={`text-sm ${
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                              vs previous period
                            </span>
                          </div>
                          <p className={`text-sm mt-2 ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {metric.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Additional Analysis */}
                  <div className={`rounded-lg p-6 ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                    <h3 className={`text-lg font-medium mb-4 ${
                      theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    }`}>
                      Financial Health Analysis
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="text-green-500 mt-1" size={20} />
                          <div>
                            <p className={`font-medium ${
                              theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                            }`}>
                              Strong Liquidity Position
                            </p>
                            <p className={`text-sm ${
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              Current ratio indicates excellent short-term financial health
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="text-green-500 mt-1" size={20} />
                          <div>
                            <p className={`font-medium ${
                              theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                            }`}>
                              Healthy Gross Margins
                            </p>
                            <p className={`text-sm ${
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              Gross profit margin shows strong pricing power
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <AlertCircle className="text-yellow-500 mt-1" size={20} />
                          <div>
                            <p className={`font-medium ${
                              theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                            }`}>
                              Negative Net Income
                            </p>
                            <p className={`text-sm ${
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              Operating expenses need optimization to achieve profitability
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <AlertCircle className="text-yellow-500 mt-1" size={20} />
                          <div>
                            <p className={`font-medium ${
                              theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                            }`}>
                              Negative Operating Cash Flow
                            </p>
                            <p className={`text-sm ${
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              Focus needed on working capital management
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinancialReports;