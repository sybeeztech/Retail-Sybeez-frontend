import React, { useState } from 'react';
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
  Calculator
} from 'lucide-react';

const FinancialReports = () => {
  const [selectedReport, setSelectedReport] = useState('profit-loss');
  const [selectedPeriod, setSelectedPeriod] = useState('This Quarter');
  const [comparisonPeriod, setComparisonPeriod] = useState('Previous Quarter');

  // Sample financial data
  const profitLossData = {
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
    netIncome: -65000
  };

  const balanceSheetData = {
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
  };

  const cashFlowData = {
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
  };

  const keyMetrics = [
    {
      name: 'Gross Profit Margin',
      value: '64.5%',
      change: '+2.1%',
      trend: 'up',
      description: 'Revenue minus cost of goods sold'
    },
    {
      name: 'Net Profit Margin',
      value: '-5.5%',
      change: '-8.2%',
      trend: 'down',
      description: 'Net income as percentage of revenue'
    },
    {
      name: 'Current Ratio',
      value: '4.17',
      change: '+0.3',
      trend: 'up',
      description: 'Current assets divided by current liabilities'
    },
    {
      name: 'Debt-to-Equity',
      value: '0.56',
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
      value: '$570K',
      change: '+$45K',
      trend: 'up',
      description: 'Current assets minus current liabilities'
    }
  ];

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

  const reportTypes = [
    { id: 'profit-loss', name: 'Profit & Loss', icon: TrendingUp },
    { id: 'balance-sheet', name: 'Balance Sheet', icon: Building },
    { id: 'cash-flow', name: 'Cash Flow', icon: CreditCard },
    { id: 'key-metrics', name: 'Key Metrics', icon: Calculator }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Financial Reports</h1>
            <p className="text-gray-600">Comprehensive financial statements and analysis</p>
          </div>
          <div className="flex space-x-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="This Month">This Month</option>
              <option value="This Quarter">This Quarter</option>
              <option value="This Year">This Year</option>
              <option value="Last Month">Last Month</option>
              <option value="Last Quarter">Last Quarter</option>
              <option value="Last Year">Last Year</option>
            </select>
            <button className="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
              <RefreshCw size={16} />
              <span>Refresh</span>
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
              <Download size={16} />
              <span>Export All</span>
            </button>
          </div>
        </div>

        {/* Report Type Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {reportTypes.map((report) => (
                <button
                  key={report.id}
                  onClick={() => setSelectedReport(report.id)}
                  className={`${
                    selectedReport === report.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
                >
                  <report.icon size={16} />
                  <span>{report.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          {/* Profit & Loss Statement */}
          {selectedReport === 'profit-loss' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Profit & Loss Statement</h2>
                <div className="flex space-x-2">
                  <button className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 flex items-center space-x-2">
                    <Eye size={16} />
                    <span>Preview</span>
                  </button>
                  <button className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                    <Download size={16} />
                    <span>Export PDF</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Revenue Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">Revenue</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Product Sales</span>
                      <span className="font-medium">{formatCurrency(profitLossData.revenue.productSales)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service Sales</span>
                      <span className="font-medium">{formatCurrency(profitLossData.revenue.serviceSales)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Other Income</span>
                      <span className="font-medium">{formatCurrency(profitLossData.revenue.otherIncome)}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-2">
                      <span className="font-semibold text-gray-900">Total Revenue</span>
                      <span className="font-semibold text-green-600">{formatCurrency(profitLossData.revenue.total)}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2 mt-6">Cost of Goods Sold</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Direct Materials & Labor</span>
                      <span className="font-medium text-red-600">{formatCurrency(profitLossData.expenses.costOfGoodsSold)}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-2">
                      <span className="font-semibold text-gray-900">Gross Profit</span>
                      <span className="font-semibold text-blue-600">{formatCurrency(profitLossData.grossProfit)}</span>
                    </div>
                  </div>
                </div>

                {/* Expenses Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">Operating Expenses</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Salaries & Benefits</span>
                      <span className="font-medium text-red-600">{formatCurrency(profitLossData.expenses.salariesAndBenefits)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Technology</span>
                      <span className="font-medium text-red-600">{formatCurrency(profitLossData.expenses.technology)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Facilities</span>
                      <span className="font-medium text-red-600">{formatCurrency(profitLossData.expenses.facilities)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Marketing & Advertising</span>
                      <span className="font-medium text-red-600">{formatCurrency(profitLossData.expenses.marketingAndAdvertising)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Operations</span>
                      <span className="font-medium text-red-600">{formatCurrency(profitLossData.expenses.operations)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Other Expenses</span>
                      <span className="font-medium text-red-600">{formatCurrency(profitLossData.expenses.other)}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-2">
                      <span className="font-semibold text-gray-900">Total Operating Expenses</span>
                      <span className="font-semibold text-red-600">{formatCurrency(profitLossData.expenses.total - profitLossData.expenses.costOfGoodsSold)}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-2">
                      <span className="font-bold text-gray-900">Net Income</span>
                      <span className={`font-bold ${profitLossData.netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(profitLossData.netIncome)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Balance Sheet */}
          {selectedReport === 'balance-sheet' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Balance Sheet</h2>
                <div className="flex space-x-2">
                  <button className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 flex items-center space-x-2">
                    <Eye size={16} />
                    <span>Preview</span>
                  </button>
                  <button className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                    <Download size={16} />
                    <span>Export PDF</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Assets */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">Assets</h3>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-700">Current Assets</h4>
                    <div className="ml-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Cash & Cash Equivalents</span>
                        <span className="font-medium">{formatCurrency(balanceSheetData.assets.currentAssets.cash)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Accounts Receivable</span>
                        <span className="font-medium">{formatCurrency(balanceSheetData.assets.currentAssets.accountsReceivable)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Inventory</span>
                        <span className="font-medium">{formatCurrency(balanceSheetData.assets.currentAssets.inventory)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Prepaid Expenses</span>
                        <span className="font-medium">{formatCurrency(balanceSheetData.assets.currentAssets.prepaidExpenses)}</span>
                      </div>
                      <div className="flex justify-between border-t border-gray-200 pt-2">
                        <span className="font-medium text-gray-700">Total Current Assets</span>
                        <span className="font-medium">{formatCurrency(balanceSheetData.assets.currentAssets.total)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-700">Fixed Assets</h4>
                    <div className="ml-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Equipment</span>
                        <span className="font-medium">{formatCurrency(balanceSheetData.assets.fixedAssets.equipment)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Furniture & Fixtures</span>
                        <span className="font-medium">{formatCurrency(balanceSheetData.assets.fixedAssets.furniture)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Intangible Assets</span>
                        <span className="font-medium">{formatCurrency(balanceSheetData.assets.fixedAssets.intangibleAssets)}</span>
                      </div>
                      <div className="flex justify-between border-t border-gray-200 pt-2">
                        <span className="font-medium text-gray-700">Total Fixed Assets</span>
                        <span className="font-medium">{formatCurrency(balanceSheetData.assets.fixedAssets.total)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between border-t border-gray-200 pt-2">
                    <span className="font-bold text-gray-900">Total Assets</span>
                    <span className="font-bold text-blue-600">{formatCurrency(balanceSheetData.assets.totalAssets)}</span>
                  </div>
                </div>

                {/* Liabilities & Equity */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">Liabilities & Equity</h3>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-700">Current Liabilities</h4>
                    <div className="ml-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Accounts Payable</span>
                        <span className="font-medium">{formatCurrency(balanceSheetData.liabilities.currentLiabilities.accountsPayable)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Accruals</span>
                        <span className="font-medium">{formatCurrency(balanceSheetData.liabilities.currentLiabilities.accruals)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Short-term Debt</span>
                        <span className="font-medium">{formatCurrency(balanceSheetData.liabilities.currentLiabilities.shortTermDebt)}</span>
                      </div>
                      <div className="flex justify-between border-t border-gray-200 pt-2">
                        <span className="font-medium text-gray-700">Total Current Liabilities</span>
                        <span className="font-medium">{formatCurrency(balanceSheetData.liabilities.currentLiabilities.total)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-700">Long-term Liabilities</h4>
                    <div className="ml-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Long-term Debt</span>
                        <span className="font-medium">{formatCurrency(balanceSheetData.liabilities.longTermLiabilities.longTermDebt)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Deferred Tax</span>
                        <span className="font-medium">{formatCurrency(balanceSheetData.liabilities.longTermLiabilities.deferredTax)}</span>
                      </div>
                      <div className="flex justify-between border-t border-gray-200 pt-2">
                        <span className="font-medium text-gray-700">Total Long-term Liabilities</span>
                        <span className="font-medium">{formatCurrency(balanceSheetData.liabilities.longTermLiabilities.total)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between border-t border-gray-200 pt-2">
                    <span className="font-medium text-gray-700">Total Liabilities</span>
                    <span className="font-medium text-red-600">{formatCurrency(balanceSheetData.liabilities.totalLiabilities)}</span>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-700">Equity</h4>
                    <div className="ml-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Retained Earnings</span>
                        <span className="font-medium">{formatCurrency(balanceSheetData.equity.retainedEarnings)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Additional Paid-in Capital</span>
                        <span className="font-medium">{formatCurrency(balanceSheetData.equity.additionalPaidIn)}</span>
                      </div>
                      <div className="flex justify-between border-t border-gray-200 pt-2">
                        <span className="font-medium text-gray-700">Total Equity</span>
                        <span className="font-medium text-green-600">{formatCurrency(balanceSheetData.equity.total)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between border-t border-gray-200 pt-2">
                    <span className="font-bold text-gray-900">Total Liabilities & Equity</span>
                    <span className="font-bold text-blue-600">
                      {formatCurrency(balanceSheetData.liabilities.totalLiabilities + balanceSheetData.equity.total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Cash Flow Statement */}
          {selectedReport === 'cash-flow' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Cash Flow Statement</h2>
                <div className="flex space-x-2">
                  <button className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 flex items-center space-x-2">
                    <Eye size={16} />
                    <span>Preview</span>
                  </button>
                  <button className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                    <Download size={16} />
                    <span>Export PDF</span>
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {/* Operating Activities */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Cash Flow from Operating Activities</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Net Income</span>
                      <span className={`font-medium ${cashFlowData.operating.netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(cashFlowData.operating.netIncome)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Depreciation & Amortization</span>
                      <span className="font-medium text-green-600">{formatCurrency(cashFlowData.operating.depreciation)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Change in Accounts Receivable</span>
                      <span className={`font-medium ${cashFlowData.operating.accountsReceivableChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(cashFlowData.operating.accountsReceivableChange)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Change in Accounts Payable</span>
                      <span className={`font-medium ${cashFlowData.operating.accountsPayableChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(cashFlowData.operating.accountsPayableChange)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Change in Inventory</span>
                      <span className={`font-medium ${cashFlowData.operating.inventoryChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(cashFlowData.operating.inventoryChange)}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-2">
                      <span className="font-bold text-gray-900">Net Cash from Operating Activities</span>
                      <span className={`font-bold ${cashFlowData.operating.total >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(cashFlowData.operating.total)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Investing Activities */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Cash Flow from Investing Activities</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Equipment Purchases</span>
                      <span className="font-medium text-red-600">{formatCurrency(cashFlowData.investing.equipmentPurchases)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Asset Sales</span>
                      <span className="font-medium text-green-600">{formatCurrency(cashFlowData.investing.assetSales)}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-2">
                      <span className="font-bold text-gray-900">Net Cash from Investing Activities</span>
                      <span className={`font-bold ${cashFlowData.investing.total >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(cashFlowData.investing.total)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Financing Activities */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Cash Flow from Financing Activities</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Debt Proceeds</span>
                      <span className="font-medium text-green-600">{formatCurrency(cashFlowData.financing.debtProceeds)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Debt Payments</span>
                      <span className="font-medium text-red-600">{formatCurrency(cashFlowData.financing.debtPayments)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Dividends Paid</span>
                      <span className="font-medium text-gray-600">{formatCurrency(cashFlowData.financing.dividends)}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-2">
                      <span className="font-bold text-gray-900">Net Cash from Financing Activities</span>
                      <span className={`font-bold ${cashFlowData.financing.total >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(cashFlowData.financing.total)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Net Cash Flow Summary */}
                <div className="bg-blue-50 rounded-lg p-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-bold text-gray-900">Net Change in Cash</span>
                      <span className={`font-bold ${cashFlowData.netCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(cashFlowData.netCashFlow)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Beginning Cash Balance</span>
                      <span className="font-medium">{formatCurrency(cashFlowData.beginningCash)}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-2">
                      <span className="font-bold text-gray-900">Ending Cash Balance</span>
                      <span className="font-bold text-blue-600">{formatCurrency(cashFlowData.endingCash)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Key Metrics */}
          {selectedReport === 'key-metrics' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Key Financial Metrics</h2>
                <div className="flex space-x-2">
                  <button className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 flex items-center space-x-2">
                    <Eye size={16} />
                    <span>Preview</span>
                  </button>
                  <button className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                    <Download size={16} />
                    <span>Export PDF</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {keyMetrics.map((metric, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-medium text-gray-900">{metric.name}</h3>
                      {getTrendIcon(metric.trend)}
                    </div>
                    <div className="space-y-2">
                      <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-medium ${getTrendColor(metric.trend)}`}>
                          {metric.change}
                        </span>
                        <span className="text-sm text-gray-500">vs previous period</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{metric.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Analysis */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Financial Health Analysis</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="text-green-500 mt-1" size={20} />
                      <div>
                        <p className="font-medium text-gray-900">Strong Liquidity Position</p>
                        <p className="text-sm text-gray-600">Current ratio of 4.17 indicates excellent short-term financial health</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="text-green-500 mt-1" size={20} />
                      <div>
                        <p className="font-medium text-gray-900">Healthy Gross Margins</p>
                        <p className="text-sm text-gray-600">64.5% gross profit margin shows strong pricing power</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="text-yellow-500 mt-1" size={20} />
                      <div>
                        <p className="font-medium text-gray-900">Negative Net Income</p>
                        <p className="text-sm text-gray-600">Operating expenses need optimization to achieve profitability</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="text-yellow-500 mt-1" size={20} />
                      <div>
                        <p className="font-medium text-gray-900">Negative Operating Cash Flow</p>
                        <p className="text-sm text-gray-600">Focus needed on working capital management</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinancialReports;