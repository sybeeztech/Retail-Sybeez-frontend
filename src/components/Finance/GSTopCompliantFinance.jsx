import React, { useState } from 'react';
import { 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  FileText,
  Download,
  Filter,
  Search,
  Eye,
  Edit,
  Trash2,
  Plus,
  IndianRupee,
  Smartphone,
  Banknote,
  CreditCard,
  Building,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Package
} from 'lucide-react';

const GSTopCompliantFinance = () => {
  const [activeTab, setActiveTab] = useState('gst-dashboard');
  const [selectedPeriod, setSelectedPeriod] = useState('current-month');
  const [showGSTForm, setShowGSTForm] = useState(false);
  const [gstTransactionType, setGstTransactionType] = useState('sale');

  // GST Registration Details
  const gstDetails = {
    gstNumber: '29ABCDE1234F1Z5',
    businessName: 'ABC Retail Store',
    registrationDate: '2023-04-15',
    businessType: 'Regular',
    turnoverLimit: 4000000,
    currentTurnover: 2850000,
    complianceStatus: 'Compliant',
    nextFilingDate: '2024-11-20',
    lastFiledReturn: 'GSTR-1 (October 2024)'
  };

  // Monthly GST Summary
  const monthlySummary = {
    totalSales: 385000,
    totalPurchases: 245000,
    outputGST: {
      cgst: 19250,
      sgst: 19250,
      igst: 0,
      total: 38500
    },
    inputGST: {
      cgst: 12250,
      sgst: 12250,
      igst: 0,
      total: 24500
    },
    netGSTPayable: 14000,
    exemptSales: 15000,
    nilRatedSales: 8000
  };

  // GST Rate-wise Breakdown
  const gstRateBreakdown = [
    {
      rate: 0,
      description: 'Exempted Items',
      sales: 15000,
      purchases: 8000,
      gstAmount: 0
    },
    {
      rate: 5,
      description: 'Essential Items (Rice, Wheat, etc.)',
      sales: 85000,
      purchases: 55000,
      gstAmount: 4250
    },
    {
      rate: 12,
      description: 'Processed Foods',
      sales: 125000,
      purchases: 78000,
      gstAmount: 15000
    },
    {
      rate: 18,
      description: 'General Items',
      sales: 145000,
      purchases: 89000,
      gstAmount: 26100
    },
    {
      rate: 28,
      description: 'Luxury Items',
      sales: 25000,
      purchases: 15000,
      gstAmount: 7000
    }
  ];

  // Recent GST Transactions
  const gstTransactions = [
    {
      id: 1,
      date: '2024-10-25',
      type: 'Sale',
      invoiceNumber: 'INV-2024-001',
      customerGST: '29FGHIJ5678K1L2',
      customerName: 'XYZ Enterprises',
      taxableValue: 25000,
      gstRate: 18,
      cgst: 2250,
      sgst: 2250,
      igst: 0,
      totalAmount: 29500,
      paymentMethod: 'UPI'
    },
    {
      id: 2,
      date: '2024-10-25',
      type: 'Purchase',
      invoiceNumber: 'PINV-2024-089',
      vendorGST: '29MNOPQ9012R3S4',
      vendorName: 'Global Suppliers Ltd',
      taxableValue: 45000,
      gstRate: 12,
      cgst: 2700,
      sgst: 2700,
      igst: 0,
      totalAmount: 50400,
      paymentMethod: 'Bank Transfer'
    },
    {
      id: 3,
      date: '2024-10-24',
      type: 'Sale',
      invoiceNumber: 'INV-2024-002',
      customerGST: '',
      customerName: 'Walk-in Customer',
      taxableValue: 1200,
      gstRate: 5,
      cgst: 30,
      sgst: 30,
      igst: 0,
      totalAmount: 1260,
      paymentMethod: 'Cash'
    }
  ];

  // Compliance Checklist
  const complianceItems = [
    {
      task: 'GSTR-1 Filing',
      dueDate: '2024-11-11',
      status: 'pending',
      description: 'Monthly outward supply details'
    },
    {
      task: 'GSTR-3B Filing',
      dueDate: '2024-11-20',
      status: 'pending',
      description: 'Monthly return with tax payment'
    },
    {
      task: 'TDS Return',
      dueDate: '2024-11-07',
      status: 'completed',
      description: 'Tax deducted at source return'
    },
    {
      task: 'Annual Return (GSTR-9)',
      dueDate: '2024-12-31',
      status: 'upcoming',
      description: 'Annual consolidated return'
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getComplianceIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'overdue': return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'upcoming': return <Calendar className="h-4 w-4 text-blue-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">GST Compliant Finance Module</h1>
            <p className="text-gray-600">Complete GST management for Indian retail businesses</p>
          </div>
          <div className="flex space-x-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="current-month">Current Month</option>
              <option value="last-month">Last Month</option>
              <option value="current-quarter">Current Quarter</option>
              <option value="current-year">Current Financial Year</option>
            </select>
            <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
              <Download size={16} />
              <span>Export GST Data</span>
            </button>
            <button
              onClick={() => setShowGSTForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Add GST Transaction</span>
            </button>
          </div>
        </div>

        {/* GST Registration Summary */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">GST Registration Details</h3>
              <p className="text-sm text-gray-600">Registration and compliance information</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              gstDetails.complianceStatus === 'Compliant' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {gstDetails.complianceStatus}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-gray-600">GST Number</p>
              <p className="font-mono text-lg font-semibold">{gstDetails.gstNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Business Name</p>
              <p className="font-medium">{gstDetails.businessName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Registration Type</p>
              <p className="font-medium">{gstDetails.businessType}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Turnover Progress</p>
              <p className="font-medium">{formatCurrency(gstDetails.currentTurnover)} / {formatCurrency(gstDetails.turnoverLimit)}</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${(gstDetails.currentTurnover / gstDetails.turnoverLimit) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly GST Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Sales (Taxable)</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(monthlySummary.totalSales)}</p>
                <p className="text-sm text-gray-500 mt-1">Output GST: {formatCurrency(monthlySummary.outputGST.total)}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Purchases</p>
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(monthlySummary.totalPurchases)}</p>
                <p className="text-sm text-gray-500 mt-1">Input GST: {formatCurrency(monthlySummary.inputGST.total)}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <TrendingDown className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Net GST Payable</p>
                <p className="text-2xl font-bold text-orange-600">{formatCurrency(monthlySummary.netGSTPayable)}</p>
                <p className="text-sm text-gray-500 mt-1">Due: {gstDetails.nextFilingDate}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <IndianRupee className="h-5 w-5 text-orange-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Exempted Sales</p>
                <p className="text-2xl font-bold text-purple-600">{formatCurrency(monthlySummary.exemptSales)}</p>
                <p className="text-sm text-gray-500 mt-1">Nil Rated: {formatCurrency(monthlySummary.nilRatedSales)}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Package className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {[
              { id: 'gst-dashboard', name: 'GST Dashboard' },
              { id: 'transactions', name: 'GST Transactions' },
              { id: 'compliance', name: 'Compliance' },
              { id: 'reports', name: 'GST Reports' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'gst-dashboard' && (
            <div className="space-y-6">
              {/* GST Rate-wise Breakdown */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">GST Rate-wise Breakdown</h3>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <table className="min-w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">GST Rate</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Description</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">Sales</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">Purchases</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">GST Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {gstRateBreakdown.map((item, index) => (
                        <tr key={index} className="hover:bg-white">
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                              {item.rate}%
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">{item.description}</td>
                          <td className="px-4 py-3 text-sm text-right text-gray-900">{formatCurrency(item.sales)}</td>
                          <td className="px-4 py-3 text-sm text-right text-gray-900">{formatCurrency(item.purchases)}</td>
                          <td className="px-4 py-3 text-sm text-right font-medium text-gray-900">{formatCurrency(item.gstAmount)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* GST Summary Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-3">Output GST (Collected)</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">CGST:</span>
                      <span className="font-medium">{formatCurrency(monthlySummary.outputGST.cgst)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">SGST:</span>
                      <span className="font-medium">{formatCurrency(monthlySummary.outputGST.sgst)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">IGST:</span>
                      <span className="font-medium">{formatCurrency(monthlySummary.outputGST.igst)}</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-900">Total Output GST:</span>
                        <span className="font-bold text-green-600">{formatCurrency(monthlySummary.outputGST.total)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-3">Input GST (Paid)</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">CGST:</span>
                      <span className="font-medium">{formatCurrency(monthlySummary.inputGST.cgst)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">SGST:</span>
                      <span className="font-medium">{formatCurrency(monthlySummary.inputGST.sgst)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">IGST:</span>
                      <span className="font-medium">{formatCurrency(monthlySummary.inputGST.igst)}</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-900">Total Input GST:</span>
                        <span className="font-bold text-blue-600">{formatCurrency(monthlySummary.inputGST.total)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="text"
                      placeholder="Search transactions..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="all">All Types</option>
                    <option value="sale">Sales Only</option>
                    <option value="purchase">Purchases Only</option>
                  </select>
                </div>
              </div>

              {/* Transactions Table */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Type</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Invoice No.</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Party</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">Taxable Value</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">GST Rate</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">GST Amount</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">Total</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {gstTransactions.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {new Date(transaction.date).toLocaleDateString('en-IN')}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            transaction.type === 'Sale' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {transaction.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm font-mono text-gray-900">{transaction.invoiceNumber}</td>
                        <td className="px-4 py-3">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{transaction.customerName || transaction.vendorName}</p>
                            {(transaction.customerGST || transaction.vendorGST) && (
                              <p className="text-xs text-gray-500 font-mono">{transaction.customerGST || transaction.vendorGST}</p>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-right text-gray-900">{formatCurrency(transaction.taxableValue)}</td>
                        <td className="px-4 py-3 text-sm text-right text-gray-900">{transaction.gstRate}%</td>
                        <td className="px-4 py-3 text-sm text-right text-gray-900">
                          {formatCurrency(transaction.cgst + transaction.sgst + transaction.igst)}
                        </td>
                        <td className="px-4 py-3 text-sm text-right font-medium text-gray-900">
                          {formatCurrency(transaction.totalAmount)}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <button className="text-blue-600 hover:text-blue-800">
                              <Eye size={16} />
                            </button>
                            <button className="text-gray-600 hover:text-gray-800">
                              <Edit size={16} />
                            </button>
                            <button className="text-red-600 hover:text-red-800">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'compliance' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">GST Compliance Checklist</h3>
              
              <div className="space-y-4">
                {complianceItems.map((item, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {getComplianceIcon(item.status)}
                        <div>
                          <h4 className="font-medium text-gray-900">{item.task}</h4>
                          <p className="text-sm text-gray-600">{item.description}</p>
                          <p className="text-sm text-gray-500 mt-1">Due: {item.dueDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                        {item.status === 'pending' && (
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
                            File Now
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">GST Reports</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center space-x-3 mb-3">
                    <FileText className="h-8 w-8 text-blue-600" />
                    <h4 className="font-medium text-gray-900">GSTR-1 Report</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Outward supplies report for GST filing</p>
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                    Generate Report
                  </button>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center space-x-3 mb-3">
                    <FileText className="h-8 w-8 text-green-600" />
                    <h4 className="font-medium text-gray-900">GSTR-3B Report</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Monthly return summary report</p>
                  <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                    Generate Report
                  </button>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center space-x-3 mb-3">
                    <FileText className="h-8 w-8 text-orange-600" />
                    <h4 className="font-medium text-gray-900">Tax Liability Report</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Detailed tax liability analysis</p>
                  <button className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700">
                    Generate Report
                  </button>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center space-x-3 mb-3">
                    <FileText className="h-8 w-8 text-purple-600" />
                    <h4 className="font-medium text-gray-900">Input Tax Credit Report</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">ITC availment and utilization</p>
                  <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
                    Generate Report
                  </button>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center space-x-3 mb-3">
                    <FileText className="h-8 w-8 text-red-600" />
                    <h4 className="font-medium text-gray-900">HSN Summary</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">HSN-wise summary of supplies</p>
                  <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">
                    Generate Report
                  </button>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center space-x-3 mb-3">
                    <FileText className="h-8 w-8 text-indigo-600" />
                    <h4 className="font-medium text-gray-900">Reconciliation Report</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Books vs GSTR data reconciliation</p>
                  <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
                    Generate Report
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add GST Transaction Modal */}
      {showGSTForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-4/5 max-w-4xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Add GST Transaction</h3>
                <button
                  onClick={() => setShowGSTForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              {/* Transaction Type Toggle */}
              <div className="mb-6">
                <div className="flex rounded-lg border border-gray-300 p-1">
                  <button
                    onClick={() => setGstTransactionType('sale')}
                    className={`flex-1 py-2 px-3 rounded-md text-sm font-medium ${
                      gstTransactionType === 'sale'
                        ? 'bg-green-100 text-green-700'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Sale (Outward Supply)
                  </button>
                  <button
                    onClick={() => setGstTransactionType('purchase')}
                    className={`flex-1 py-2 px-3 rounded-md text-sm font-medium ${
                      gstTransactionType === 'purchase'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Purchase (Inward Supply)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Invoice Number
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter invoice number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {gstTransactionType === 'sale' ? 'Customer Name' : 'Vendor Name'}
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={`Enter ${gstTransactionType === 'sale' ? 'customer' : 'vendor'} name`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {gstTransactionType === 'sale' ? 'Customer' : 'Vendor'} GST Number (Optional)
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="29ABCDE1234F1Z5"
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Taxable Amount (₹)
                    </label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter taxable amount"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      GST Rate (%)
                    </label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="0">0% (Exempted)</option>
                      <option value="5">5%</option>
                      <option value="12">12%</option>
                      <option value="18">18%</option>
                      <option value="28">28%</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Payment Method
                    </label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="cash">Cash</option>
                      <option value="upi">UPI</option>
                      <option value="bank_transfer">Bank Transfer</option>
                      <option value="card">Card</option>
                      <option value="cheque">Cheque</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows="3"
                      placeholder="Enter item description"
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowGSTForm(false)}
                  className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowGSTForm(false)}
                  className={`px-4 py-2 rounded-lg text-white ${
                    gstTransactionType === 'sale' 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  Add {gstTransactionType === 'sale' ? 'Sale' : 'Purchase'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GSTopCompliantFinance;