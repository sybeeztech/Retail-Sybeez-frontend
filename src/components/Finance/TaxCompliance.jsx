import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Calendar, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Download, 
  Upload, 
  Calculator,
  Receipt,
  TrendingUp,
  Building,
  User,
  Phone,
  Mail,
  MapPin,
  Shield,
  AlertCircle,
  Info,
  DollarSign,
  Percent,
  FileCheck,
  Archive,
  RefreshCw
} from 'lucide-react';

const TaxCompliance = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [gstReturnStatus, setGstReturnStatus] = useState({});
  const [complianceChecklist, setComplianceChecklist] = useState([]);

  // Sample GST data for Indian retail business
  const businessInfo = {
    gstin: '27AABCU9603R1ZM',
    businessName: 'Retail Paradise Store',
    address: 'Shop No. 15, Commercial Complex, Mumbai - 400001',
    phone: '+91 98765 43210',
    email: 'retailparadise@gmail.com',
    gstRegistrationDate: '2020-04-01',
    panNumber: 'AABCU9603R',
    taxPeriod: 'October 2024'
  };

  const gstReturns = [
    {
      type: 'GSTR-1',
      period: 'October 2024',
      dueDate: '2024-11-11',
      status: 'pending',
      filed: false,
      amount: 45000,
      description: 'Outward supplies of taxable goods and services'
    },
    {
      type: 'GSTR-3B',
      period: 'October 2024',
      dueDate: '2024-11-20',
      status: 'pending',
      filed: false,
      amount: 38000,
      description: 'Summary return and payment of tax'
    },
    {
      type: 'GSTR-1',
      period: 'September 2024',
      dueDate: '2024-10-11',
      status: 'filed',
      filed: true,
      filedDate: '2024-10-10',
      amount: 42000,
      description: 'Outward supplies of taxable goods and services'
    },
    {
      type: 'GSTR-3B',
      period: 'September 2024',
      dueDate: '2024-10-20',
      status: 'filed',
      filed: true,
      filedDate: '2024-10-18',
      amount: 35000,
      description: 'Summary return and payment of tax'
    }
  ];

  const taxCalculations = {
    totalSales: 850000,
    exemptSales: 50000,
    taxableSales: 800000,
    gstRates: {
      '0%': { sales: 50000, tax: 0 },
      '5%': { sales: 200000, tax: 10000 },
      '12%': { sales: 300000, tax: 36000 },
      '18%': { sales: 250000, tax: 45000 },
      '28%': { sales: 0, tax: 0 }
    },
    totalGstCollected: 91000,
    inputTaxCredit: 15000,
    netGstPayable: 76000
  };

  const complianceItems = [
    {
      id: 1,
      task: 'GST Registration Certificate',
      status: 'completed',
      priority: 'high',
      dueDate: null,
      description: 'Valid GST registration certificate'
    },
    {
      id: 2,
      task: 'GSTR-1 Filing (October)',
      status: 'pending',
      priority: 'high',
      dueDate: '2024-11-11',
      description: 'File outward supplies return'
    },
    {
      id: 3,
      task: 'GSTR-3B Filing (October)',
      status: 'pending',
      priority: 'high',
      dueDate: '2024-11-20',
      description: 'File summary return and pay tax'
    },
    {
      id: 4,
      task: 'Tax Invoice Management',
      status: 'completed',
      priority: 'medium',
      dueDate: null,
      description: 'Proper GST invoice format compliance'
    },
    {
      id: 5,
      task: 'Input Tax Credit Reconciliation',
      status: 'in-progress',
      priority: 'medium',
      dueDate: '2024-10-25',
      description: 'Reconcile purchase invoices for ITC'
    },
    {
      id: 6,
      task: 'Annual Return (GSTR-9)',
      status: 'upcoming',
      priority: 'low',
      dueDate: '2024-12-31',
      description: 'Annual GST return for FY 2023-24'
    }
  ];

  useEffect(() => {
    setComplianceChecklist(complianceItems);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'filed':
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-orange-600" />;
      case 'in-progress':
        return <RefreshCw className="w-5 h-5 text-blue-600" />;
      case 'upcoming':
        return <Calendar className="w-5 h-5 text-gray-600" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "inline-flex px-2 py-1 text-xs font-semibold rounded-full";
    switch (status) {
      case 'filed':
      case 'completed':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'pending':
        return `${baseClasses} bg-orange-100 text-orange-800`;
      case 'in-progress':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'upcoming':
        return `${baseClasses} bg-gray-100 text-gray-800`;
      default:
        return `${baseClasses} bg-red-100 text-red-800`;
    }
  };

  const getPriorityBadge = (priority) => {
    const baseClasses = "inline-flex px-2 py-1 text-xs font-semibold rounded-full";
    switch (priority) {
      case 'high':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'medium':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'low':
        return `${baseClasses} bg-green-100 text-green-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const calculateComplianceScore = () => {
    const completed = complianceChecklist.filter(item => item.status === 'completed').length;
    return Math.round((completed / complianceChecklist.length) * 100);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Business Information */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Business Information</h2>
          <Shield className="w-6 h-6 text-blue-600" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center">
              <Building className="w-4 h-4 text-gray-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Business Name</p>
                <p className="font-medium">{businessInfo.businessName}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Receipt className="w-4 h-4 text-gray-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">GSTIN</p>
                <p className="font-medium">{businessInfo.gstin}</p>
              </div>
            </div>
            <div className="flex items-center">
              <FileText className="w-4 h-4 text-gray-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">PAN Number</p>
                <p className="font-medium">{businessInfo.panNumber}</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 text-gray-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Address</p>
                <p className="font-medium">{businessInfo.address}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Phone className="w-4 h-4 text-gray-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium">{businessInfo.phone}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 text-gray-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{businessInfo.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Score */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Compliance Score</h2>
        <div className="flex items-center">
          <div className="flex-1">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Overall Compliance</span>
              <span className="text-sm font-medium">{calculateComplianceScore()}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${calculateComplianceScore()}%` }}
              ></div>
            </div>
          </div>
          <div className="ml-6 text-center">
            <div className="text-3xl font-bold text-blue-600">{calculateComplianceScore()}%</div>
            <div className="text-sm text-gray-600">Complete</div>
          </div>
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Deadlines</h2>
        <div className="space-y-3">
          {gstReturns.filter(ret => !ret.filed).map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-orange-600 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">{item.type} - {item.period}</p>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-orange-600">Due: {formatDate(item.dueDate)}</p>
                <p className="text-sm text-gray-600">{formatCurrency(item.amount)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderGSTReturns = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">GST Returns</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Return Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {gstReturns.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-blue-600 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{item.type}</div>
                        <div className="text-sm text-gray-500">{item.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.period}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(item.dueDate)}
                    {item.filedDate && (
                      <div className="text-xs text-green-600">Filed: {formatDate(item.filedDate)}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatCurrency(item.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadge(item.status)}>
                      {item.status === 'filed' ? 'Filed' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {item.filed ? (
                      <button className="text-blue-600 hover:text-blue-900 flex items-center">
                        <Download size={16} className="mr-1" />
                        Download
                      </button>
                    ) : (
                      <button className="text-green-600 hover:text-green-900 flex items-center">
                        <Upload size={16} className="mr-1" />
                        File Return
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderTaxCalculations = () => (
    <div className="space-y-6">
      {/* Tax Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Sales</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(taxCalculations.totalSales)}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">GST Collected</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(taxCalculations.totalGstCollected)}</p>
            </div>
            <Receipt className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Net GST Payable</p>
              <p className="text-2xl font-bold text-red-600">{formatCurrency(taxCalculations.netGstPayable)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* GST Rate Breakdown */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">GST Rate Breakdown</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">GST Rate</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900">Sales Amount</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900">GST Amount</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900">Percentage</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(taxCalculations.gstRates).map(([rate, data]) => (
                <tr key={rate} className="border-b border-gray-100">
                  <td className="py-3 px-4 flex items-center">
                    <Percent className="w-4 h-4 text-gray-500 mr-2" />
                    {rate}
                  </td>
                  <td className="py-3 px-4 text-right font-medium">{formatCurrency(data.sales)}</td>
                  <td className="py-3 px-4 text-right font-medium text-green-600">{formatCurrency(data.tax)}</td>
                  <td className="py-3 px-4 text-right text-gray-600">
                    {((data.sales / taxCalculations.totalSales) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCompliance = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Compliance Checklist</h2>
        <div className="space-y-4">
          {complianceChecklist.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center flex-1">
                {getStatusIcon(item.status)}
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">{item.task}</h3>
                    <div className="flex space-x-2">
                      <span className={getPriorityBadge(item.priority)}>
                        {item.priority}
                      </span>
                      <span className={getStatusBadge(item.status)}>
                        {item.status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  {item.dueDate && (
                    <p className="text-sm text-orange-600 mt-1">Due: {formatDate(item.dueDate)}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', name: 'Overview', icon: FileCheck },
    { id: 'returns', name: 'GST Returns', icon: FileText },
    { id: 'calculations', name: 'Tax Calculations', icon: Calculator },
    { id: 'compliance', name: 'Compliance', icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tax & Compliance</h1>
              <p className="text-gray-600">GST compliance and tax management for Indian retail businesses</p>
            </div>
            <div className="flex space-x-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                <Download size={16} />
                <span>Download Reports</span>
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2">
                <FileText size={16} />
                <span>File Return</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white shadow-sm">
        <div className="px-6 py-4">
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'returns' && renderGSTReturns()}
        {activeTab === 'calculations' && renderTaxCalculations()}
        {activeTab === 'compliance' && renderCompliance()}
      </div>
    </div>
  );
};

export default TaxCompliance;