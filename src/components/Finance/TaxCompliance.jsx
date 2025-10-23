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
  RefreshCw,
  X,
  Save,
  Eye,
  Edit3,
  Trash2,
  Plus,
  Moon,
  Sun
} from 'lucide-react';
import useSettingsStore from '../../store/settingsStore'; // Import the same settings store

const TaxCompliance = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [gstReturnStatus, setGstReturnStatus] = useState({});
  const [complianceChecklist, setComplianceChecklist] = useState([]);
  const [showFileReturnModal, setShowFileReturnModal] = useState(false);
  const [showDownloadReportsModal, setShowDownloadReportsModal] = useState(false);
  const [editingComplianceItem, setEditingComplianceItem] = useState(null);
  const [selectedReturn, setSelectedReturn] = useState(null);
  const [returnFormData, setReturnFormData] = useState({
    amount: '',
    paymentMethod: 'online',
    transactionId: '',
    remarks: ''
  });

  // Use the same theme store as main dashboard
  const { theme, toggleTheme } = useSettingsStore();

  // Theme utility functions
  const getThemeClass = (lightClass, darkClass) => {
    return theme === 'dark' ? darkClass : lightClass;
  };

  const getCardClass = () => {
    return getThemeClass('bg-white', 'bg-gray-800');
  };

  const getTextClass = (type = 'primary') => {
    const textColors = {
      primary: getThemeClass('text-gray-900', 'text-gray-100'),
      secondary: getThemeClass('text-gray-600', 'text-gray-400'),
      muted: getThemeClass('text-gray-500', 'text-gray-500')
    };
    return textColors[type];
  };

  const getBorderClass = () => {
    return getThemeClass('border-gray-200', 'border-gray-700');
  };

  const getInputClass = () => {
    return getThemeClass(
      'bg-white border-gray-300 text-gray-900 placeholder-gray-500',
      'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
    );
  };

  const getTableHeaderClass = () => {
    return getThemeClass('bg-gray-50 text-gray-700', 'bg-gray-700 text-gray-300');
  };

  const getTableRowClass = () => {
    return getThemeClass('hover:bg-gray-50', 'hover:bg-gray-700');
  };

  const getTableDivideClass = () => {
    return getThemeClass('divide-gray-200', 'divide-gray-700');
  };

  const getStatusBadge = (status) => {
    const baseClasses = "inline-flex px-2 py-1 text-xs font-semibold rounded-full";
    switch (status) {
      case 'filed':
      case 'completed':
        return getThemeClass(
          `${baseClasses} bg-green-100 text-green-800`,
          `${baseClasses} bg-green-900/20 text-green-300`
        );
      case 'pending':
        return getThemeClass(
          `${baseClasses} bg-orange-100 text-orange-800`,
          `${baseClasses} bg-orange-900/20 text-orange-300`
        );
      case 'in-progress':
        return getThemeClass(
          `${baseClasses} bg-blue-100 text-blue-800`,
          `${baseClasses} bg-blue-900/20 text-blue-300`
        );
      case 'upcoming':
        return getThemeClass(
          `${baseClasses} bg-gray-100 text-gray-800`,
          `${baseClasses} bg-gray-700 text-gray-300`
        );
      default:
        return getThemeClass(
          `${baseClasses} bg-red-100 text-red-800`,
          `${baseClasses} bg-red-900/20 text-red-300`
        );
    }
  };

  const getPriorityBadge = (priority) => {
    const baseClasses = "inline-flex px-2 py-1 text-xs font-semibold rounded-full";
    switch (priority) {
      case 'high':
        return getThemeClass(
          `${baseClasses} bg-red-100 text-red-800`,
          `${baseClasses} bg-red-900/20 text-red-300`
        );
      case 'medium':
        return getThemeClass(
          `${baseClasses} bg-yellow-100 text-yellow-800`,
          `${baseClasses} bg-yellow-900/20 text-yellow-300`
        );
      case 'low':
        return getThemeClass(
          `${baseClasses} bg-green-100 text-green-800`,
          `${baseClasses} bg-green-900/20 text-green-300`
        );
      default:
        return getThemeClass(
          `${baseClasses} bg-gray-100 text-gray-800`,
          `${baseClasses} bg-gray-700 text-gray-300`
        );
    }
  };

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

  const [gstReturns, setGstReturns] = useState([
    {
      id: 1,
      type: 'GSTR-1',
      period: 'October 2024',
      dueDate: '2024-11-11',
      status: 'pending',
      filed: false,
      amount: 45000,
      description: 'Outward supplies of taxable goods and services'
    },
    {
      id: 2,
      type: 'GSTR-3B',
      period: 'October 2024',
      dueDate: '2024-11-20',
      status: 'pending',
      filed: false,
      amount: 38000,
      description: 'Summary return and payment of tax'
    },
    {
      id: 3,
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
      id: 4,
      type: 'GSTR-3B',
      period: 'September 2024',
      dueDate: '2024-10-20',
      status: 'filed',
      filed: true,
      filedDate: '2024-10-18',
      amount: 35000,
      description: 'Summary return and payment of tax'
    }
  ]);

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

  // Handle return form input changes
  const handleReturnFormChange = (e) => {
    const { name, value } = e.target;
    setReturnFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // File GST return
  const handleFileReturn = () => {
    if (!returnFormData.amount || !returnFormData.transactionId) {
      alert('Please fill in all required fields');
      return;
    }

    const updatedReturns = gstReturns.map(ret => 
      ret.id === selectedReturn.id 
        ? {
            ...ret,
            status: 'filed',
            filed: true,
            filedDate: new Date().toISOString().split('T')[0],
            amount: parseInt(returnFormData.amount),
            paymentMethod: returnFormData.paymentMethod,
            transactionId: returnFormData.transactionId
          }
        : ret
    );

    setGstReturns(updatedReturns);
    setShowFileReturnModal(false);
    setSelectedReturn(null);
    setReturnFormData({
      amount: '',
      paymentMethod: 'online',
      transactionId: '',
      remarks: ''
    });

    // Update compliance checklist
    const taskToUpdate = selectedReturn.type === 'GSTR-1' 
      ? 'GSTR-1 Filing (October)'
      : 'GSTR-3B Filing (October)';
    
    setComplianceChecklist(prev => 
      prev.map(item => 
        item.task === taskToUpdate 
          ? { ...item, status: 'completed' }
          : item
      )
    );
  };

  // Download return document
  const handleDownloadReturn = (returnItem) => {
    const data = {
      return: returnItem,
      businessInfo,
      downloadDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${returnItem.type}-${returnItem.period.replace(' ', '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Download reports
  const handleDownloadReports = (reportType) => {
    let data = {};
    let filename = '';

    switch (reportType) {
      case 'compliance':
        data = {
          complianceChecklist,
          complianceScore: calculateComplianceScore(),
          businessInfo,
          reportDate: new Date().toISOString()
        };
        filename = 'compliance-report.json';
        break;
      case 'tax-summary':
        data = {
          taxCalculations,
          gstReturns,
          businessInfo,
          reportDate: new Date().toISOString()
        };
        filename = 'tax-summary-report.json';
        break;
      case 'all':
        data = {
          businessInfo,
          gstReturns,
          taxCalculations,
          complianceChecklist,
          reportDate: new Date().toISOString()
        };
        filename = 'complete-tax-report.json';
        break;
      default:
        return;
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setShowDownloadReportsModal(false);
  };

  // Update compliance item status
  const handleUpdateComplianceStatus = (itemId, newStatus) => {
    setComplianceChecklist(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, status: newStatus } : item
      )
    );
  };

  // Edit compliance item
  const handleEditComplianceItem = (item) => {
    setEditingComplianceItem(item);
  };

  // Update compliance item
  const handleUpdateComplianceItem = () => {
    if (!editingComplianceItem.task || !editingComplianceItem.description) {
      alert('Please fill in all required fields');
      return;
    }

    setComplianceChecklist(prev =>
      prev.map(item =>
        item.id === editingComplianceItem.id ? editingComplianceItem : item
      )
    );
    setEditingComplianceItem(null);
  };

  // Add new compliance item
  const handleAddComplianceItem = () => {
    const newItem = {
      id: Math.max(...complianceChecklist.map(item => item.id)) + 1,
      task: 'New Compliance Task',
      status: 'pending',
      priority: 'medium',
      dueDate: null,
      description: 'Task description'
    };
    setEditingComplianceItem(newItem);
  };

  // Delete compliance item
  const handleDeleteComplianceItem = (itemId) => {
    setComplianceChecklist(prev => prev.filter(item => item.id !== itemId));
  };

  // Prepare for filing return
  const handlePrepareFileReturn = (returnItem) => {
    setSelectedReturn(returnItem);
    setReturnFormData({
      amount: returnItem.amount.toString(),
      paymentMethod: 'online',
      transactionId: '',
      remarks: ''
    });
    setShowFileReturnModal(true);
  };

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

  const calculateComplianceScore = () => {
    const completed = complianceChecklist.filter(item => item.status === 'completed').length;
    return Math.round((completed / complianceChecklist.length) * 100);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Business Information */}
      <div className={`rounded-lg shadow p-6 ${getCardClass()} ${getBorderClass()}`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-xl font-semibold ${getTextClass('primary')}`}>Business Information</h2>
          <Shield className="w-6 h-6 text-blue-600" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center">
              <Building className="w-4 h-4 text-gray-500 mr-3" />
              <div>
                <p className={`text-sm ${getTextClass('secondary')}`}>Business Name</p>
                <p className={`font-medium ${getTextClass('primary')}`}>{businessInfo.businessName}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Receipt className="w-4 h-4 text-gray-500 mr-3" />
              <div>
                <p className={`text-sm ${getTextClass('secondary')}`}>GSTIN</p>
                <p className={`font-medium ${getTextClass('primary')}`}>{businessInfo.gstin}</p>
              </div>
            </div>
            <div className="flex items-center">
              <FileText className="w-4 h-4 text-gray-500 mr-3" />
              <div>
                <p className={`text-sm ${getTextClass('secondary')}`}>PAN Number</p>
                <p className={`font-medium ${getTextClass('primary')}`}>{businessInfo.panNumber}</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 text-gray-500 mr-3" />
              <div>
                <p className={`text-sm ${getTextClass('secondary')}`}>Address</p>
                <p className={`font-medium ${getTextClass('primary')}`}>{businessInfo.address}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Phone className="w-4 h-4 text-gray-500 mr-3" />
              <div>
                <p className={`text-sm ${getTextClass('secondary')}`}>Phone</p>
                <p className={`font-medium ${getTextClass('primary')}`}>{businessInfo.phone}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 text-gray-500 mr-3" />
              <div>
                <p className={`text-sm ${getTextClass('secondary')}`}>Email</p>
                <p className={`font-medium ${getTextClass('primary')}`}>{businessInfo.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Score */}
      <div className={`rounded-lg shadow p-6 ${getCardClass()} ${getBorderClass()}`}>
        <h2 className={`text-xl font-semibold mb-4 ${getTextClass('primary')}`}>Compliance Score</h2>
        <div className="flex items-center">
          <div className="flex-1">
            <div className="flex justify-between mb-2">
              <span className={`text-sm ${getTextClass('secondary')}`}>Overall Compliance</span>
              <span className={`text-sm font-medium ${getTextClass('primary')}`}>{calculateComplianceScore()}%</span>
            </div>
            <div className={`w-full rounded-full h-3 ${
              getThemeClass('bg-gray-200', 'bg-gray-700')
            }`}>
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${calculateComplianceScore()}%` }}
              ></div>
            </div>
          </div>
          <div className="ml-6 text-center">
            <div className="text-3xl font-bold text-blue-600">{calculateComplianceScore()}%</div>
            <div className={`text-sm ${getTextClass('secondary')}`}>Complete</div>
          </div>
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div className={`rounded-lg shadow p-6 ${getCardClass()} ${getBorderClass()}`}>
        <h2 className={`text-xl font-semibold mb-4 ${getTextClass('primary')}`}>Upcoming Deadlines</h2>
        <div className="space-y-3">
          {gstReturns.filter(ret => !ret.filed).map((item, index) => (
            <div key={index} className={`flex items-center justify-between p-3 rounded-lg border ${
              getThemeClass('bg-orange-50 border-orange-200', 'bg-orange-900/20 border-orange-800')
            }`}>
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-orange-600 mr-3" />
                <div>
                  <p className={`font-medium ${getTextClass('primary')}`}>{item.type} - {item.period}</p>
                  <p className={`text-sm ${getTextClass('secondary')}`}>{item.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-orange-600">Due: {formatDate(item.dueDate)}</p>
                <p className={`text-sm ${getTextClass('secondary')}`}>{formatCurrency(item.amount)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderGSTReturns = () => (
    <div className="space-y-6">
      <div className={`rounded-lg shadow overflow-hidden ${getCardClass()} ${getBorderClass()}`}>
        <div className={`px-6 py-4 border-b ${getBorderClass()}`}>
          <h2 className={`text-lg font-semibold ${getTextClass('primary')}`}>GST Returns</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className={getTableHeaderClass()}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Return Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${getTableDivideClass()} ${getCardClass()}`}>
              {gstReturns.map((item, index) => (
                <tr key={index} className={getTableRowClass()}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-blue-600 mr-3" />
                      <div>
                        <div className={`text-sm font-medium ${getTextClass('primary')}`}>{item.type}</div>
                        <div className={`text-sm ${getTextClass('secondary')}`}>{item.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${getTextClass('primary')}`}>
                    {item.period}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${getTextClass('primary')}`}>
                    {formatDate(item.dueDate)}
                    {item.filedDate && (
                      <div className="text-xs text-green-600">Filed: {formatDate(item.filedDate)}</div>
                    )}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${getTextClass('primary')}`}>
                    {formatCurrency(item.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadge(item.status)}>
                      {item.status === 'filed' ? 'Filed' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {item.filed ? (
                      <button 
                        onClick={() => handleDownloadReturn(item)}
                        className={getThemeClass(
                          'text-blue-600 hover:text-blue-900',
                          'text-blue-400 hover:text-blue-300'
                        )}
                      >
                        <Download size={16} className="mr-1" />
                        Download
                      </button>
                    ) : (
                      <button 
                        onClick={() => handlePrepareFileReturn(item)}
                        className={getThemeClass(
                          'text-green-600 hover:text-green-900',
                          'text-green-400 hover:text-green-300'
                        )}
                      >
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
        <div className={`rounded-lg shadow p-6 ${getCardClass()} ${getBorderClass()}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${getTextClass('secondary')}`}>Total Sales</p>
              <p className={`text-2xl font-bold ${getTextClass('primary')}`}>{formatCurrency(taxCalculations.totalSales)}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className={`rounded-lg shadow p-6 ${getCardClass()} ${getBorderClass()}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${getTextClass('secondary')}`}>GST Collected</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(taxCalculations.totalGstCollected)}</p>
            </div>
            <Receipt className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className={`rounded-lg shadow p-6 ${getCardClass()} ${getBorderClass()}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${getTextClass('secondary')}`}>Net GST Payable</p>
              <p className="text-2xl font-bold text-red-600">{formatCurrency(taxCalculations.netGstPayable)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* GST Rate Breakdown */}
      <div className={`rounded-lg shadow p-6 ${getCardClass()} ${getBorderClass()}`}>
        <h2 className={`text-xl font-semibold mb-4 ${getTextClass('primary')}`}>GST Rate Breakdown</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className={getTableHeaderClass()}>
              <tr>
                <th className="text-left py-3 px-4 font-medium">GST Rate</th>
                <th className="text-right py-3 px-4 font-medium">Sales Amount</th>
                <th className="text-right py-3 px-4 font-medium">GST Amount</th>
                <th className="text-right py-3 px-4 font-medium">Percentage</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${getTableDivideClass()}`}>
              {Object.entries(taxCalculations.gstRates).map(([rate, data]) => (
                <tr key={rate} className={getTableRowClass()}>
                  <td className={`py-3 px-4 flex items-center ${getTextClass('primary')}`}>
                    <Percent className="w-4 h-4 text-gray-500 mr-2" />
                    {rate}
                  </td>
                  <td className={`py-3 px-4 text-right font-medium ${getTextClass('primary')}`}>{formatCurrency(data.sales)}</td>
                  <td className="py-3 px-4 text-right font-medium text-green-600">{formatCurrency(data.tax)}</td>
                  <td className={`py-3 px-4 text-right ${getTextClass('secondary')}`}>
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
      <div className={`rounded-lg shadow p-6 ${getCardClass()} ${getBorderClass()}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-xl font-semibold ${getTextClass('primary')}`}>Compliance Checklist</h2>
          <button
            onClick={handleAddComplianceItem}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus size={16} />
            <span>Add Task</span>
          </button>
        </div>
        <div className="space-y-4">
          {complianceChecklist.map((item) => (
            <div key={item.id} className={`flex items-center justify-between p-4 rounded-lg border ${
              getCardClass()} ${getBorderClass()}`}>
              <div className="flex items-center flex-1">
                {getStatusIcon(item.status)}
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-medium ${getTextClass('primary')}`}>{item.task}</h3>
                    <div className="flex space-x-2">
                      <span className={getPriorityBadge(item.priority)}>
                        {item.priority}
                      </span>
                      <span className={getStatusBadge(item.status)}>
                        {item.status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                  <p className={`text-sm mt-1 ${getTextClass('secondary')}`}>{item.description}</p>
                  {item.dueDate && (
                    <p className="text-sm text-orange-600 mt-1">Due: {formatDate(item.dueDate)}</p>
                  )}
                </div>
              </div>
              <div className="flex space-x-2 ml-4">
                <select
                  value={item.status}
                  onChange={(e) => handleUpdateComplianceStatus(item.id, e.target.value)}
                  className={`border rounded px-2 py-1 text-sm ${
                    getThemeClass('border-gray-300', 'border-gray-600 bg-gray-700 text-white')
                  }`}
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="upcoming">Upcoming</option>
                </select>
                <button
                  onClick={() => handleEditComplianceItem(item)}
                  className={getThemeClass(
                    'text-green-600 hover:text-green-800',
                    'text-green-400 hover:text-green-300'
                  )}
                >
                  <Edit3 size={16} />
                </button>
                <button
                  onClick={() => handleDeleteComplianceItem(item.id)}
                  className={getThemeClass(
                    'text-red-600 hover:text-red-800',
                    'text-red-400 hover:text-red-300'
                  )}
                >
                  <Trash2 size={16} />
                </button>
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
    <div className={`min-h-screen ${getThemeClass('bg-gray-50', 'bg-gray-900')}`}>
      {/* Header */}
      <div className={`shadow-sm border-b ${getThemeClass('bg-white border-gray-200', 'bg-gray-800 border-gray-700')}`}>
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className={`text-2xl font-bold ${getTextClass('primary')}`}>Tax & Compliance</h1>
              <p className={getTextClass('secondary')}>GST compliance and tax management for Indian retail businesses</p>
            </div>
            <div className="flex space-x-3">
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
              <button 
                onClick={() => setShowDownloadReportsModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Download size={16} />
                <span>Download Reports</span>
              </button>
              <button 
                onClick={() => {
                  const pendingReturn = gstReturns.find(ret => !ret.filed);
                  if (pendingReturn) {
                    handlePrepareFileReturn(pendingReturn);
                  } else {
                    alert('All returns have been filed!');
                  }
                }}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
              >
                <FileText size={16} />
                <span>File Return</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className={`shadow-sm ${getThemeClass('bg-white', 'bg-gray-800')}`}>
        <div className="px-6 py-4">
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors border ${
                  activeTab === tab.id
                    ? getThemeClass(
                        'bg-blue-100 text-blue-700 border-blue-200',
                        'bg-blue-900/50 text-blue-300 border-blue-700'
                      )
                    : getThemeClass(
                        'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200',
                        'bg-gray-700 text-gray-300 hover:bg-gray-600 border-gray-600'
                      )
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

      {/* File Return Modal */}
      {showFileReturnModal && selectedReturn && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className={`relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md ${
            getCardClass()} ${getBorderClass()}`}>
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-medium ${getTextClass('primary')}`}>
                  File {selectedReturn.type} - {selectedReturn.period}
                </h3>
                <button
                  onClick={() => setShowFileReturnModal(false)}
                  className={getThemeClass(
                    'text-gray-400 hover:text-gray-600',
                    'text-gray-400 hover:text-gray-300'
                  )}
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${getTextClass('primary')}`}>
                    Amount (₹)
                  </label>
                  <input
                    type="number"
                    name="amount"
                    value={returnFormData.amount}
                    onChange={handleReturnFormChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      getInputClass()
                    }`}
                    placeholder="Enter amount"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${getTextClass('primary')}`}>
                    Payment Method
                  </label>
                  <select
                    name="paymentMethod"
                    value={returnFormData.paymentMethod}
                    onChange={handleReturnFormChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      getInputClass()
                    }`}
                  >
                    <option value="online">Online Payment</option>
                    <option value="challan">Challan Payment</option>
                    <option value="itc">Input Tax Credit</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${getTextClass('primary')}`}>
                    Transaction ID
                  </label>
                  <input
                    type="text"
                    name="transactionId"
                    value={returnFormData.transactionId}
                    onChange={handleReturnFormChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      getInputClass()
                    }`}
                    placeholder="Enter transaction ID"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${getTextClass('primary')}`}>
                    Remarks
                  </label>
                  <textarea
                    name="remarks"
                    value={returnFormData.remarks}
                    onChange={handleReturnFormChange}
                    rows={3}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      getInputClass()
                    }`}
                    placeholder="Enter remarks"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowFileReturnModal(false)}
                  className={getThemeClass(
                    'bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50',
                    'bg-gray-700 border-gray-600 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-600'
                  )}
                >
                  Cancel
                </button>
                <button
                  onClick={handleFileReturn}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
                >
                  <Upload size={16} />
                  <span>File Return</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Download Reports Modal */}
      {showDownloadReportsModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className={`relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md ${
            getCardClass()} ${getBorderClass()}`}>
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-medium ${getTextClass('primary')}`}>Download Reports</h3>
                <button
                  onClick={() => setShowDownloadReportsModal(false)}
                  className={getThemeClass(
                    'text-gray-400 hover:text-gray-600',
                    'text-gray-400 hover:text-gray-300'
                  )}
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={() => handleDownloadReports('compliance')}
                  className={`w-full border px-4 py-3 rounded-lg flex items-center justify-between ${
                    getThemeClass(
                      'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100',
                      'bg-blue-900/20 border-blue-800 text-blue-300 hover:bg-blue-900/30'
                    )
                  }`}
                >
                  <span>Compliance Report</span>
                  <Download size={16} />
                </button>
                
                <button
                  onClick={() => handleDownloadReports('tax-summary')}
                  className={`w-full border px-4 py-3 rounded-lg flex items-center justify-between ${
                    getThemeClass(
                      'bg-green-50 border-green-200 text-green-700 hover:bg-green-100',
                      'bg-green-900/20 border-green-800 text-green-300 hover:bg-green-900/30'
                    )
                  }`}
                >
                  <span>Tax Summary Report</span>
                  <Download size={16} />
                </button>
                
                <button
                  onClick={() => handleDownloadReports('all')}
                  className={`w-full border px-4 py-3 rounded-lg flex items-center justify-between ${
                    getThemeClass(
                      'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100',
                      'bg-purple-900/20 border-purple-800 text-purple-300 hover:bg-purple-900/30'
                    )
                  }`}
                >
                  <span>Complete Tax Report</span>
                  <Download size={16} />
                </button>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowDownloadReportsModal(false)}
                  className={getThemeClass(
                    'bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700',
                    'bg-gray-700 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-600'
                  )}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Compliance Item Modal */}
      {editingComplianceItem && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className={`relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md ${
            getCardClass()} ${getBorderClass()}`}>
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-medium ${getTextClass('primary')}`}>
                  {editingComplianceItem.id > complianceChecklist.length ? 'Add Task' : 'Edit Task'}
                </h3>
                <button
                  onClick={() => setEditingComplianceItem(null)}
                  className={getThemeClass(
                    'text-gray-400 hover:text-gray-600',
                    'text-gray-400 hover:text-gray-300'
                  )}
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${getTextClass('primary')}`}>
                    Task Name
                  </label>
                  <input
                    type="text"
                    value={editingComplianceItem.task}
                    onChange={(e) => setEditingComplianceItem(prev => ({
                      ...prev,
                      task: e.target.value
                    }))}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      getInputClass()
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${getTextClass('primary')}`}>
                    Description
                  </label>
                  <textarea
                    value={editingComplianceItem.description}
                    onChange={(e) => setEditingComplianceItem(prev => ({
                      ...prev,
                      description: e.target.value
                    }))}
                    rows={3}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      getInputClass()
                    }`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${getTextClass('primary')}`}>
                      Priority
                    </label>
                    <select
                      value={editingComplianceItem.priority}
                      onChange={(e) => setEditingComplianceItem(prev => ({
                        ...prev,
                        priority: e.target.value
                      }))}
                      className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        getInputClass()
                      }`}
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-1 ${getTextClass('primary')}`}>
                      Status
                    </label>
                    <select
                      value={editingComplianceItem.status}
                      onChange={(e) => setEditingComplianceItem(prev => ({
                        ...prev,
                        status: e.target.value
                      }))}
                      className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        getInputClass()
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="upcoming">Upcoming</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${getTextClass('primary')}`}>
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={editingComplianceItem.dueDate || ''}
                    onChange={(e) => setEditingComplianceItem(prev => ({
                      ...prev,
                      dueDate: e.target.value
                    }))}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      getInputClass()
                    }`}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setEditingComplianceItem(null)}
                  className={getThemeClass(
                    'bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50',
                    'bg-gray-700 border-gray-600 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-600'
                  )}
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateComplianceItem}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                >
                  <Save size={16} />
                  <span>Save</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaxCompliance;