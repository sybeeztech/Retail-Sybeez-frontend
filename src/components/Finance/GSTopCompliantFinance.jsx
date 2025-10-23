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
  Package,
  X,
  Save,
  FileDown,
  Moon,
  Sun
} from 'lucide-react';

// Import the settings store to use the same theme as main dashboard
import useSettingsStore from '../../store/settingsStore';

const GSTopCompliantFinance = () => {
  const [activeTab, setActiveTab] = useState('gst-dashboard');
  const [selectedPeriod, setSelectedPeriod] = useState('current-month');
  const [showGSTForm, setShowGSTForm] = useState(false);
  const [gstTransactionType, setGstTransactionType] = useState('sale');
  const [searchTerm, setSearchTerm] = useState('');
  const [transactionFilter, setTransactionFilter] = useState('all');
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [viewingTransaction, setViewingTransaction] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  
  // Use the same theme store as main dashboard
  const { theme, toggleTheme } = useSettingsStore();

  // Form state for GST transaction
  const [formData, setFormData] = useState({
    invoiceNumber: '',
    date: new Date().toISOString().split('T')[0],
    partyName: '',
    partyGST: '',
    taxableValue: '',
    gstRate: '18',
    paymentMethod: 'cash',
    description: '',
    items: [{
      description: '',
      quantity: 1,
      rate: '',
      amount: ''
    }]
  });

  // GST Registration Details
  const [gstDetails, setGstDetails] = useState({
    gstNumber: '29ABCDE1234F1Z5',
    businessName: 'ABC Retail Store',
    registrationDate: '2023-04-15',
    businessType: 'Regular',
    turnoverLimit: 4000000,
    currentTurnover: 2850000,
    complianceStatus: 'Compliant',
    nextFilingDate: '2024-11-20',
    lastFiledReturn: 'GSTR-1 (October 2024)'
  });

  // Monthly GST Summary
  const [monthlySummary, setMonthlySummary] = useState({
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
  });

  // GST Rate-wise Breakdown
  const [gstRateBreakdown, setGstRateBreakdown] = useState([
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
  ]);

  // Recent GST Transactions
  const [gstTransactions, setGstTransactions] = useState([
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
      paymentMethod: 'UPI',
      description: 'Electronics goods sale'
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
      paymentMethod: 'Bank Transfer',
      description: 'Raw materials purchase'
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
      paymentMethod: 'Cash',
      description: 'Grocery items'
    }
  ]);

  // Compliance Checklist
  const [complianceItems, setComplianceItems] = useState([
    {
      id: 1,
      task: 'GSTR-1 Filing',
      dueDate: '2024-11-11',
      status: 'pending',
      description: 'Monthly outward supply details'
    },
    {
      id: 2,
      task: 'GSTR-3B Filing',
      dueDate: '2024-11-20',
      status: 'pending',
      description: 'Monthly return with tax payment'
    },
    {
      id: 3,
      task: 'TDS Return',
      dueDate: '2024-11-07',
      status: 'completed',
      description: 'Tax deducted at source return'
    },
    {
      id: 4,
      task: 'Annual Return (GSTR-9)',
      dueDate: '2024-12-31',
      status: 'upcoming',
      description: 'Annual consolidated return'
    }
  ]);

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

  // Handle form input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Auto-calculate GST when taxable value or rate changes
    if ((name === 'taxableValue' || name === 'gstRate') && formData.taxableValue && formData.gstRate) {
      const taxableValue = name === 'taxableValue' ? parseFloat(value) : parseFloat(formData.taxableValue);
      const gstRate = name === 'gstRate' ? parseFloat(value) : parseFloat(formData.gstRate);
      
      if (!isNaN(taxableValue) && !isNaN(gstRate)) {
        const gstAmount = (taxableValue * gstRate) / 100;
        const totalAmount = taxableValue + gstAmount;
        
        // Update summary when adding transactions
        if (!editingTransaction) {
          updateMonthlySummary(gstTransactionType, taxableValue, gstAmount);
        }
      }
    }
  };

  // Update monthly summary when adding transactions
  const updateMonthlySummary = (type, taxableValue, gstAmount) => {
    setMonthlySummary(prev => {
      if (type === 'sale') {
        return {
          ...prev,
          totalSales: prev.totalSales + taxableValue,
          outputGST: {
            ...prev.outputGST,
            total: prev.outputGST.total + gstAmount,
            cgst: prev.outputGST.cgst + (gstAmount / 2),
            sgst: prev.outputGST.sgst + (gstAmount / 2)
          },
          netGSTPayable: prev.netGSTPayable + gstAmount
        };
      } else {
        return {
          ...prev,
          totalPurchases: prev.totalPurchases + taxableValue,
          inputGST: {
            ...prev.inputGST,
            total: prev.inputGST.total + gstAmount,
            cgst: prev.inputGST.cgst + (gstAmount / 2),
            sgst: prev.inputGST.sgst + (gstAmount / 2)
          },
          netGSTPayable: prev.netGSTPayable - gstAmount
        };
      }
    });
  };

  // Generate invoice number
  const generateInvoiceNumber = () => {
    const prefix = gstTransactionType === 'sale' ? 'INV' : 'PINV';
    const year = new Date().getFullYear();
    const lastNumber = gstTransactions
      .filter(t => t.type === (gstTransactionType === 'sale' ? 'Sale' : 'Purchase'))
      .reduce((max, t) => {
        const num = parseInt(t.invoiceNumber.split('-').pop());
        return num > max ? num : max;
      }, 0);
    
    return `${prefix}-${year}-${String(lastNumber + 1).padStart(3, '0')}`;
  };

  // Add new GST transaction
  const handleAddTransaction = () => {
    if (!formData.invoiceNumber || !formData.partyName || !formData.taxableValue) {
      alert('Please fill in all required fields');
      return;
    }

    const taxableValue = parseFloat(formData.taxableValue);
    const gstRate = parseFloat(formData.gstRate);
    const gstAmount = (taxableValue * gstRate) / 100;
    const cgst = gstAmount / 2;
    const sgst = gstAmount / 2;
    const totalAmount = taxableValue + gstAmount;

    const newTransaction = {
      id: Math.max(...gstTransactions.map(t => t.id)) + 1,
      date: formData.date,
      type: gstTransactionType === 'sale' ? 'Sale' : 'Purchase',
      invoiceNumber: formData.invoiceNumber,
      customerGST: gstTransactionType === 'sale' ? formData.partyGST : '',
      vendorGST: gstTransactionType === 'purchase' ? formData.partyGST : '',
      customerName: gstTransactionType === 'sale' ? formData.partyName : '',
      vendorName: gstTransactionType === 'purchase' ? formData.partyName : '',
      taxableValue: taxableValue,
      gstRate: gstRate,
      cgst: cgst,
      sgst: sgst,
      igst: 0,
      totalAmount: totalAmount,
      paymentMethod: formData.paymentMethod,
      description: formData.description
    };

    setGstTransactions(prev => [newTransaction, ...prev]);
    setShowGSTForm(false);
    resetForm();
  };

  // Edit transaction
  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setGstTransactionType(transaction.type.toLowerCase());
    setFormData({
      invoiceNumber: transaction.invoiceNumber,
      date: transaction.date,
      partyName: transaction.customerName || transaction.vendorName,
      partyGST: transaction.customerGST || transaction.vendorGST,
      taxableValue: transaction.taxableValue.toString(),
      gstRate: transaction.gstRate.toString(),
      paymentMethod: transaction.paymentMethod,
      description: transaction.description,
      items: [{
        description: transaction.description,
        quantity: 1,
        rate: transaction.taxableValue.toString(),
        amount: transaction.taxableValue.toString()
      }]
    });
    setShowGSTForm(true);
  };

  // Update transaction
  const handleUpdateTransaction = () => {
    if (!formData.invoiceNumber || !formData.partyName || !formData.taxableValue) {
      alert('Please fill in all required fields');
      return;
    }

    const taxableValue = parseFloat(formData.taxableValue);
    const gstRate = parseFloat(formData.gstRate);
    const gstAmount = (taxableValue * gstRate) / 100;
    const cgst = gstAmount / 2;
    const sgst = gstAmount / 2;
    const totalAmount = taxableValue + gstAmount;

    const updatedTransaction = {
      ...editingTransaction,
      date: formData.date,
      invoiceNumber: formData.invoiceNumber,
      customerGST: gstTransactionType === 'sale' ? formData.partyGST : '',
      vendorGST: gstTransactionType === 'purchase' ? formData.partyGST : '',
      customerName: gstTransactionType === 'sale' ? formData.partyName : '',
      vendorName: gstTransactionType === 'purchase' ? formData.partyName : '',
      taxableValue: taxableValue,
      gstRate: gstRate,
      cgst: cgst,
      sgst: sgst,
      totalAmount: totalAmount,
      paymentMethod: formData.paymentMethod,
      description: formData.description
    };

    setGstTransactions(prev => 
      prev.map(t => t.id === editingTransaction.id ? updatedTransaction : t)
    );

    setShowGSTForm(false);
    setEditingTransaction(null);
    resetForm();
  };

  // Delete transaction
  const handleDeleteTransaction = (id) => {
    setGstTransactions(prev => prev.filter(t => t.id !== id));
    setDeleteConfirm(null);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      invoiceNumber: generateInvoiceNumber(),
      date: new Date().toISOString().split('T')[0],
      partyName: '',
      partyGST: '',
      taxableValue: '',
      gstRate: '18',
      paymentMethod: 'cash',
      description: '',
      items: [{
        description: '',
        quantity: 1,
        rate: '',
        amount: ''
      }]
    });
    setEditingTransaction(null);
  };

  // Handle transaction type change
  const handleTransactionTypeChange = (type) => {
    setGstTransactionType(type);
    setFormData(prev => ({
      ...prev,
      invoiceNumber: generateInvoiceNumber()
    }));
  };

  // Export GST data
  const handleExportGSTData = () => {
    const data = {
      gstDetails,
      monthlySummary,
      gstRateBreakdown,
      gstTransactions: filteredTransactions,
      complianceItems,
      exportDate: new Date().toISOString(),
      period: selectedPeriod
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gst-data-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Generate GST report
  const handleGenerateReport = (reportType) => {
    let reportData = {};
    let filename = '';

    switch (reportType) {
      case 'gstr1':
        reportData = {
          reportType: 'GSTR-1',
          period: selectedPeriod,
          transactions: gstTransactions.filter(t => t.type === 'Sale'),
          summary: monthlySummary,
          generatedDate: new Date().toISOString()
        };
        filename = 'gstr1-report.json';
        break;
      case 'gstr3b':
        reportData = {
          reportType: 'GSTR-3B',
          period: selectedPeriod,
          summary: monthlySummary,
          netGSTPayable: monthlySummary.netGSTPayable,
          generatedDate: new Date().toISOString()
        };
        filename = 'gstr3b-report.json';
        break;
      case 'tax-liability':
        reportData = {
          reportType: 'Tax Liability',
          period: selectedPeriod,
          outputGST: monthlySummary.outputGST,
          inputGST: monthlySummary.inputGST,
          netPayable: monthlySummary.netGSTPayable,
          generatedDate: new Date().toISOString()
        };
        filename = 'tax-liability-report.json';
        break;
      case 'itc':
        reportData = {
          reportType: 'Input Tax Credit',
          period: selectedPeriod,
          inputGST: monthlySummary.inputGST,
          eligibleITC: monthlySummary.inputGST.total,
          utilizedITC: monthlySummary.inputGST.total,
          generatedDate: new Date().toISOString()
        };
        filename = 'itc-report.json';
        break;
      case 'hsn':
        reportData = {
          reportType: 'HSN Summary',
          period: selectedPeriod,
          gstRateBreakdown,
          generatedDate: new Date().toISOString()
        };
        filename = 'hsn-summary-report.json';
        break;
      case 'reconciliation':
        reportData = {
          reportType: 'Reconciliation',
          period: selectedPeriod,
          totalSales: monthlySummary.totalSales,
          totalPurchases: monthlySummary.totalPurchases,
          gstTransactions: gstTransactions.length,
          generatedDate: new Date().toISOString()
        };
        filename = 'reconciliation-report.json';
        break;
      default:
        return;
    }

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // File compliance return
  const handleFileCompliance = (itemId) => {
    setComplianceItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, status: 'completed' }
          : item
      )
    );
    alert('Return filed successfully!');
  };

  // Filter transactions based on search and filter
  const filteredTransactions = gstTransactions.filter(transaction => {
    const matchesSearch = 
      transaction.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (transaction.customerName || transaction.vendorName).toLowerCase().includes(searchTerm.toLowerCase()) ||
      (transaction.customerGST || transaction.vendorGST).toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      transactionFilter === 'all' || 
      (transactionFilter === 'sale' && transaction.type === 'Sale') ||
      (transactionFilter === 'purchase' && transaction.type === 'Purchase');
    
    return matchesSearch && matchesFilter;
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status) => {
    const baseColors = {
      completed: getThemeClass('bg-green-100 text-green-800', 'bg-green-900/20 text-green-300'),
      pending: getThemeClass('bg-yellow-100 text-yellow-800', 'bg-yellow-900/20 text-yellow-300'),
      overdue: getThemeClass('bg-red-100 text-red-800', 'bg-red-900/20 text-red-300'),
      upcoming: getThemeClass('bg-blue-100 text-blue-800', 'bg-blue-900/20 text-blue-300')
    };
    return baseColors[status] || baseColors.pending;
  };

  const getComplianceIcon = (status) => {
    const iconColors = {
      completed: getThemeClass('text-green-600', 'text-green-400'),
      pending: getThemeClass('text-yellow-600', 'text-yellow-400'),
      overdue: getThemeClass('text-red-600', 'text-red-400'),
      upcoming: getThemeClass('text-blue-600', 'text-blue-400')
    };
    
    switch (status) {
      case 'completed': return <CheckCircle className={`h-4 w-4 ${iconColors.completed}`} />;
      case 'pending': return <Clock className={`h-4 w-4 ${iconColors.pending}`} />;
      case 'overdue': return <AlertCircle className={`h-4 w-4 ${iconColors.overdue}`} />;
      case 'upcoming': return <Calendar className={`h-4 w-4 ${iconColors.upcoming}`} />;
      default: return <Clock className={`h-4 w-4 ${getTextClass('muted')}`} />;
    }
  };

  return (
    <div className={`p-6 min-h-screen ${getThemeClass('bg-gray-50', 'bg-gray-900')}`}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className={`text-2xl font-semibold ${getTextClass('primary')}`}>
              GST Compliant Finance Module
            </h1>
            <p className={getTextClass('secondary')}>
              Complete GST management for Indian retail businesses
            </p>
          </div>
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
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
                getInputClass()
              }`}
            >
              <option value="current-month">Current Month</option>
              <option value="last-month">Last Month</option>
              <option value="current-quarter">Current Quarter</option>
              <option value="current-year">Current Financial Year</option>
            </select>
            <button 
              onClick={handleExportGSTData}
              className={`border rounded-lg px-4 py-2 flex items-center space-x-2 transition-colors ${
                getThemeClass(
                  'bg-white border-gray-300 text-gray-700 hover:bg-gray-50',
                  'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                )
              }`}
            >
              <Download size={16} />
              <span>Export GST Data</span>
            </button>
            <button
              onClick={() => {
                resetForm();
                setShowGSTForm(true);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Add GST Transaction</span>
            </button>
          </div>
        </div>

        {/* GST Registration Summary */}
        <div className={`rounded-lg shadow p-6 mb-6 ${getCardClass()} ${getBorderClass()}`}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className={`text-lg font-medium ${getTextClass('primary')}`}>
                GST Registration Details
              </h3>
              <p className={getTextClass('secondary')}>
                Registration and compliance information
              </p>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              gstDetails.complianceStatus === 'Compliant' 
                ? getThemeClass('bg-green-100 text-green-800', 'bg-green-900/20 text-green-300')
                : getThemeClass('bg-red-100 text-red-800', 'bg-red-900/20 text-red-300')
            }`}>
              {gstDetails.complianceStatus}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <p className={`text-sm ${getTextClass('secondary')}`}>GST Number</p>
              <p className={`font-mono text-lg font-semibold ${getTextClass('primary')}`}>
                {gstDetails.gstNumber}
              </p>
            </div>
            <div>
              <p className={`text-sm ${getTextClass('secondary')}`}>Business Name</p>
              <p className={`font-medium ${getTextClass('primary')}`}>{gstDetails.businessName}</p>
            </div>
            <div>
              <p className={`text-sm ${getTextClass('secondary')}`}>Registration Type</p>
              <p className={`font-medium ${getTextClass('primary')}`}>{gstDetails.businessType}</p>
            </div>
            <div>
              <p className={`text-sm ${getTextClass('secondary')}`}>Turnover Progress</p>
              <p className={`font-medium ${getTextClass('primary')}`}>
                {formatCurrency(gstDetails.currentTurnover)} / {formatCurrency(gstDetails.turnoverLimit)}
              </p>
              <div className={`w-full rounded-full h-2 mt-1 ${
                getThemeClass('bg-gray-200', 'bg-gray-700')
              }`}>
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
          {[
            {
              title: 'Total Sales (Taxable)',
              value: monthlySummary.totalSales,
              subText: `Output GST: ${formatCurrency(monthlySummary.outputGST.total)}`,
              color: 'green',
              icon: TrendingUp
            },
            {
              title: 'Total Purchases',
              value: monthlySummary.totalPurchases,
              subText: `Input GST: ${formatCurrency(monthlySummary.inputGST.total)}`,
              color: 'blue',
              icon: TrendingDown
            },
            {
              title: 'Net GST Payable',
              value: monthlySummary.netGSTPayable,
              subText: `Due: ${gstDetails.nextFilingDate}`,
              color: 'orange',
              icon: IndianRupee
            },
            {
              title: 'Exempted Sales',
              value: monthlySummary.exemptSales,
              subText: `Nil Rated: ${formatCurrency(monthlySummary.nilRatedSales)}`,
              color: 'purple',
              icon: Package
            }
          ].map((card, index) => (
            <div key={index} className={`rounded-lg shadow p-6 ${getCardClass()} ${getBorderClass()}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${getTextClass('secondary')}`}>
                    {card.title}
                  </p>
                  <p className={`text-2xl font-bold text-${card.color}-600`}>
                    {formatCurrency(card.value)}
                  </p>
                  <p className={`text-sm mt-1 ${getTextClass('muted')}`}>
                    {card.subText}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${
                  getThemeClass(
                    `bg-${card.color}-100`,
                    `bg-${card.color}-900/20`
                  )
                }`}>
                  <card.icon className={`h-5 w-5 text-${card.color}-600`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className={`rounded-lg shadow mb-6 ${getCardClass()} ${getBorderClass()}`}>
        <div className={`border-b ${getBorderClass()}`}>
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
                    : `border-transparent ${
                        getThemeClass(
                          'text-gray-500 hover:text-gray-700 hover:border-gray-300',
                          'text-gray-400 hover:text-gray-300 hover:border-gray-600'
                        )
                      }`
                } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors`}
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
                <h3 className={`text-lg font-medium ${getTextClass('primary')} mb-4`}>
                  GST Rate-wise Breakdown
                </h3>
                <div className={`border rounded-lg overflow-hidden ${getBorderClass()} ${getCardClass()}`}>
                  <table className="min-w-full">
                    <thead className={getTableHeaderClass()}>
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium">GST Rate</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Description</th>
                        <th className="px-4 py-3 text-right text-sm font-medium">Sales</th>
                        <th className="px-4 py-3 text-right text-sm font-medium">Purchases</th>
                        <th className="px-4 py-3 text-right text-sm font-medium">GST Amount</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${getTableDivideClass()}`}>
                      {gstRateBreakdown.map((item, index) => (
                        <tr key={index} className={getTableRowClass()}>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${
                              getThemeClass('bg-blue-100 text-blue-800', 'bg-blue-900/20 text-blue-300')
                            }`}>
                              {item.rate}%
                            </span>
                          </td>
                          <td className={`px-4 py-3 text-sm ${getTextClass('primary')}`}>
                            {item.description}
                          </td>
                          <td className={`px-4 py-3 text-sm text-right ${getTextClass('primary')}`}>
                            {formatCurrency(item.sales)}
                          </td>
                          <td className={`px-4 py-3 text-sm text-right ${getTextClass('primary')}`}>
                            {formatCurrency(item.purchases)}
                          </td>
                          <td className={`px-4 py-3 text-sm text-right font-medium ${getTextClass('primary')}`}>
                            {formatCurrency(item.gstAmount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* GST Summary Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`rounded-lg p-6 ${
                  getThemeClass('bg-green-50', 'bg-green-900/20')
                }`}>
                  <h4 className={`font-medium ${getTextClass('primary')} mb-3`}>
                    Output GST (Collected)
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className={getTextClass('secondary')}>CGST:</span>
                      <span className={`font-medium ${getTextClass('primary')}`}>
                        {formatCurrency(monthlySummary.outputGST.cgst)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={getTextClass('secondary')}>SGST:</span>
                      <span className={`font-medium ${getTextClass('primary')}`}>
                        {formatCurrency(monthlySummary.outputGST.sgst)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={getTextClass('secondary')}>IGST:</span>
                      <span className={`font-medium ${getTextClass('primary')}`}>
                        {formatCurrency(monthlySummary.outputGST.igst)}
                      </span>
                    </div>
                    <div className={`border-t pt-2 ${getBorderClass()}`}>
                      <div className="flex justify-between">
                        <span className={`font-medium ${getTextClass('primary')}`}>
                          Total Output GST:
                        </span>
                        <span className="font-bold text-green-600">
                          {formatCurrency(monthlySummary.outputGST.total)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`rounded-lg p-6 ${
                  getThemeClass('bg-blue-50', 'bg-blue-900/20')
                }`}>
                  <h4 className={`font-medium ${getTextClass('primary')} mb-3`}>
                    Input GST (Paid)
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className={getTextClass('secondary')}>CGST:</span>
                      <span className={`font-medium ${getTextClass('primary')}`}>
                        {formatCurrency(monthlySummary.inputGST.cgst)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={getTextClass('secondary')}>SGST:</span>
                      <span className={`font-medium ${getTextClass('primary')}`}>
                        {formatCurrency(monthlySummary.inputGST.sgst)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={getTextClass('secondary')}>IGST:</span>
                      <span className={`font-medium ${getTextClass('primary')}`}>
                        {formatCurrency(monthlySummary.inputGST.igst)}
                      </span>
                    </div>
                    <div className={`border-t pt-2 ${getBorderClass()}`}>
                      <div className="flex justify-between">
                        <span className={`font-medium ${getTextClass('primary')}`}>
                          Total Input GST:
                        </span>
                        <span className="font-bold text-blue-600">
                          {formatCurrency(monthlySummary.inputGST.total)}
                        </span>
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
                    <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                      getTextClass('muted')
                    }`} size={16} />
                    <input
                      type="text"
                      placeholder="Search transactions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        getInputClass()
                      }`}
                    />
                  </div>
                  <select 
                    value={transactionFilter}
                    onChange={(e) => setTransactionFilter(e.target.value)}
                    className={`border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      getInputClass()
                    }`}
                  >
                    <option value="all">All Types</option>
                    <option value="sale">Sales Only</option>
                    <option value="purchase">Purchases Only</option>
                  </select>
                </div>
              </div>

              {/* Transactions Table */}
              <div className={`border rounded-lg overflow-hidden ${getBorderClass()} ${getCardClass()}`}>
                <table className="min-w-full">
                  <thead className={getTableHeaderClass()}>
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Invoice No.</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Party</th>
                      <th className="px-4 py-3 text-right text-sm font-medium">Taxable Value</th>
                      <th className="px-4 py-3 text-right text-sm font-medium">GST Rate</th>
                      <th className="px-4 py-3 text-right text-sm font-medium">GST Amount</th>
                      <th className="px-4 py-3 text-right text-sm font-medium">Total</th>
                      <th className="px-4 py-3 text-center text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${getTableDivideClass()}`}>
                    {filteredTransactions.map((transaction) => (
                      <tr key={transaction.id} className={getTableRowClass()}>
                        <td className={`px-4 py-3 text-sm ${getTextClass('primary')}`}>
                          {new Date(transaction.date).toLocaleDateString('en-IN')}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            transaction.type === 'Sale' 
                              ? getThemeClass('bg-green-100 text-green-800', 'bg-green-900/20 text-green-300')
                              : getThemeClass('bg-blue-100 text-blue-800', 'bg-blue-900/20 text-blue-300')
                          }`}>
                            {transaction.type}
                          </span>
                        </td>
                        <td className={`px-4 py-3 text-sm font-mono ${getTextClass('primary')}`}>
                          {transaction.invoiceNumber}
                        </td>
                        <td className="px-4 py-3">
                          <div>
                            <p className={`text-sm font-medium ${getTextClass('primary')}`}>
                              {transaction.customerName || transaction.vendorName}
                            </p>
                            {(transaction.customerGST || transaction.vendorGST) && (
                              <p className={`text-xs font-mono ${getTextClass('muted')}`}>
                                {transaction.customerGST || transaction.vendorGST}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className={`px-4 py-3 text-sm text-right ${getTextClass('primary')}`}>
                          {formatCurrency(transaction.taxableValue)}
                        </td>
                        <td className={`px-4 py-3 text-sm text-right ${getTextClass('primary')}`}>
                          {transaction.gstRate}%
                        </td>
                        <td className={`px-4 py-3 text-sm text-right ${getTextClass('primary')}`}>
                          {formatCurrency(transaction.cgst + transaction.sgst + transaction.igst)}
                        </td>
                        <td className={`px-4 py-3 text-sm text-right font-medium ${getTextClass('primary')}`}>
                          {formatCurrency(transaction.totalAmount)}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <button 
                              onClick={() => setViewingTransaction(transaction)}
                              className={getThemeClass(
                                'text-blue-600 hover:text-blue-800',
                                'text-blue-400 hover:text-blue-300'
                              )}
                            >
                              <Eye size={16} />
                            </button>
                            <button 
                              onClick={() => handleEditTransaction(transaction)}
                              className={getThemeClass(
                                'text-gray-600 hover:text-gray-800',
                                'text-gray-400 hover:text-gray-300'
                              )}
                            >
                              <Edit size={16} />
                            </button>
                            <button 
                              onClick={() => setDeleteConfirm(transaction.id)}
                              className={getThemeClass(
                                'text-red-600 hover:text-red-800',
                                'text-red-400 hover:text-red-300'
                              )}
                            >
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
              <h3 className={`text-lg font-medium ${getTextClass('primary')}`}>
                GST Compliance Checklist
              </h3>
              
              <div className="space-y-4">
                {complianceItems.map((item, index) => (
                  <div key={index} className={`border rounded-lg p-6 ${getCardClass()} ${getBorderClass()}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {getComplianceIcon(item.status)}
                        <div>
                          <h4 className={`font-medium ${getTextClass('primary')}`}>
                            {item.task}
                          </h4>
                          <p className={`text-sm ${getTextClass('secondary')}`}>
                            {item.description}
                          </p>
                          <p className={`text-sm mt-1 ${getTextClass('muted')}`}>
                            Due: {item.dueDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                        {item.status === 'pending' && (
                          <button 
                            onClick={() => handleFileCompliance(item.id)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
                          >
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
              <h3 className={`text-lg font-medium ${getTextClass('primary')}`}>
                GST Reports
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { type: 'gstr1', name: 'GSTR-1 Report', description: 'Outward supplies report for GST filing', color: 'blue' },
                  { type: 'gstr3b', name: 'GSTR-3B Report', description: 'Monthly return summary report', color: 'green' },
                  { type: 'tax-liability', name: 'Tax Liability Report', description: 'Detailed tax liability analysis', color: 'orange' },
                  { type: 'itc', name: 'Input Tax Credit Report', description: 'ITC availment and utilization', color: 'purple' },
                  { type: 'hsn', name: 'HSN Summary', description: 'HSN-wise summary of supplies', color: 'red' },
                  { type: 'reconciliation', name: 'Reconciliation Report', description: 'Books vs GSTR data reconciliation', color: 'indigo' }
                ].map((report, index) => (
                  <div key={index} className={`border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer ${
                    getCardClass()} ${getBorderClass()}`}>
                    <div className="flex items-center space-x-3 mb-3">
                      <FileText className={`h-8 w-8 text-${report.color}-600`} />
                      <h4 className={`font-medium ${getTextClass('primary')}`}>
                        {report.name}
                      </h4>
                    </div>
                    <p className={`text-sm mb-4 ${getTextClass('secondary')}`}>
                      {report.description}
                    </p>
                    <button 
                      onClick={() => handleGenerateReport(report.type)}
                      className={`w-full bg-${report.color}-600 text-white py-2 rounded-lg hover:bg-${report.color}-700`}
                    >
                      Generate Report
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit GST Transaction Modal */}
      {showGSTForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className={`relative top-20 mx-auto p-5 border w-4/5 max-w-4xl shadow-lg rounded-md ${
            getThemeClass('bg-white border-gray-200', 'bg-gray-800 border-gray-700')
          }`}>
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-medium ${getTextClass('primary')}`}>
                  {editingTransaction ? 'Edit GST Transaction' : 'Add GST Transaction'}
                </h3>
                <button
                  onClick={() => {
                    setShowGSTForm(false);
                    resetForm();
                  }}
                  className={getThemeClass(
                    'text-gray-400 hover:text-gray-600',
                    'text-gray-400 hover:text-gray-300'
                  )}
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Transaction Type Toggle */}
              <div className="mb-6">
                <div className={`flex rounded-lg border p-1 ${
                  getThemeClass('border-gray-300', 'border-gray-600')
                }`}>
                  <button
                    onClick={() => handleTransactionTypeChange('sale')}
                    className={`flex-1 py-2 px-3 rounded-md text-sm font-medium ${
                      gstTransactionType === 'sale'
                        ? getThemeClass('bg-green-100 text-green-700', 'bg-green-900/20 text-green-300')
                        : getThemeClass('text-gray-500 hover:text-gray-700', 'text-gray-400 hover:text-gray-300')
                    }`}
                  >
                    Sale (Outward Supply)
                  </button>
                  <button
                    onClick={() => handleTransactionTypeChange('purchase')}
                    className={`flex-1 py-2 px-3 rounded-md text-sm font-medium ${
                      gstTransactionType === 'purchase'
                        ? getThemeClass('bg-blue-100 text-blue-700', 'bg-blue-900/20 text-blue-300')
                        : getThemeClass('text-gray-500 hover:text-gray-700', 'text-gray-400 hover:text-gray-300')
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
                    <label className={`block text-sm font-medium ${getTextClass('primary')} mb-1`}>
                      Invoice Number
                    </label>
                    <input
                      type="text"
                      name="invoiceNumber"
                      value={formData.invoiceNumber}
                      onChange={handleFormChange}
                      className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        getInputClass()
                      }`}
                      placeholder="Enter invoice number"
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium ${getTextClass('primary')} mb-1`}>
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleFormChange}
                      className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        getInputClass()
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${getTextClass('primary')} mb-1`}>
                      {gstTransactionType === 'sale' ? 'Customer Name' : 'Vendor Name'}
                    </label>
                    <input
                      type="text"
                      name="partyName"
                      value={formData.partyName}
                      onChange={handleFormChange}
                      className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        getInputClass()
                      }`}
                      placeholder={`Enter ${gstTransactionType === 'sale' ? 'customer' : 'vendor'} name`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${getTextClass('primary')} mb-1`}>
                      {gstTransactionType === 'sale' ? 'Customer' : 'Vendor'} GST Number (Optional)
                    </label>
                    <input
                      type="text"
                      name="partyGST"
                      value={formData.partyGST}
                      onChange={handleFormChange}
                      className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        getInputClass()
                      }`}
                      placeholder="29ABCDE1234F1Z5"
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium ${getTextClass('primary')} mb-1`}>
                      Taxable Amount (₹)
                    </label>
                    <input
                      type="number"
                      name="taxableValue"
                      value={formData.taxableValue}
                      onChange={handleFormChange}
                      className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        getInputClass()
                      }`}
                      placeholder="Enter taxable amount"
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium ${getTextClass('primary')} mb-1`}>
                      GST Rate (%)
                    </label>
                    <select 
                      name="gstRate"
                      value={formData.gstRate}
                      onChange={handleFormChange}
                      className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        getInputClass()
                      }`}
                    >
                      <option value="0">0% (Exempted)</option>
                      <option value="5">5%</option>
                      <option value="12">12%</option>
                      <option value="18">18%</option>
                      <option value="28">28%</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${getTextClass('primary')} mb-1`}>
                      Payment Method
                    </label>
                    <select 
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleFormChange}
                      className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        getInputClass()
                      }`}
                    >
                      <option value="cash">Cash</option>
                      <option value="upi">UPI</option>
                      <option value="bank_transfer">Bank Transfer</option>
                      <option value="card">Card</option>
                      <option value="cheque">Cheque</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${getTextClass('primary')} mb-1`}>
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleFormChange}
                      className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        getInputClass()
                      }`}
                      rows="3"
                      placeholder="Enter item description"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* GST Calculation Preview */}
              {formData.taxableValue && formData.gstRate && (
                <div className={`mt-6 p-4 rounded-lg ${
                  getThemeClass('bg-gray-50', 'bg-gray-700')
                }`}>
                  <h4 className={`font-medium ${getTextClass('primary')} mb-2`}>GST Calculation Preview</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className={getTextClass('secondary')}>Taxable Value:</span>
                      <p className={`font-medium ${getTextClass('primary')}`}>
                        {formatCurrency(parseFloat(formData.taxableValue))}
                      </p>
                    </div>
                    <div>
                      <span className={getTextClass('secondary')}>GST ({formData.gstRate}%):</span>
                      <p className={`font-medium ${getTextClass('primary')}`}>
                        {formatCurrency((parseFloat(formData.taxableValue) * parseFloat(formData.gstRate)) / 100)}
                      </p>
                    </div>
                    <div>
                      <span className={getTextClass('secondary')}>Total Amount:</span>
                      <p className="font-medium text-green-600">
                        {formatCurrency(
                          parseFloat(formData.taxableValue) + 
                          (parseFloat(formData.taxableValue) * parseFloat(formData.gstRate)) / 100
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowGSTForm(false);
                    resetForm();
                  }}
                  className={getThemeClass(
                    'bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50',
                    'bg-gray-700 border-gray-600 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-600'
                  )}
                >
                  Cancel
                </button>
                <button
                  onClick={editingTransaction ? handleUpdateTransaction : handleAddTransaction}
                  className={`px-4 py-2 rounded-lg text-white flex items-center space-x-2 ${
                    gstTransactionType === 'sale' 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  <Save size={16} />
                  <span>{editingTransaction ? 'Update' : 'Add'} {gstTransactionType === 'sale' ? 'Sale' : 'Purchase'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Transaction Modal */}
      {viewingTransaction && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className={`relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md ${
            getThemeClass('bg-white border-gray-200', 'bg-gray-800 border-gray-700')
          }`}>
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-medium ${getTextClass('primary')}`}>Transaction Details</h3>
                <button
                  onClick={() => setViewingTransaction(null)}
                  className={getThemeClass(
                    'text-gray-400 hover:text-gray-600',
                    'text-gray-400 hover:text-gray-300'
                  )}
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className={getTextClass('secondary')}>Invoice Number:</span>
                  <span className={`text-sm font-medium font-mono ${getTextClass('primary')}`}>
                    {viewingTransaction.invoiceNumber}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={getTextClass('secondary')}>Date:</span>
                  <span className={`text-sm font-medium ${getTextClass('primary')}`}>
                    {new Date(viewingTransaction.date).toLocaleDateString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={getTextClass('secondary')}>Type:</span>
                  <span className={`text-sm font-medium ${
                    viewingTransaction.type === 'Sale' ? 'text-green-600' : 'text-blue-600'
                  }`}>
                    {viewingTransaction.type}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={getTextClass('secondary')}>
                    {viewingTransaction.type === 'Sale' ? 'Customer' : 'Vendor'}:
                  </span>
                  <span className={`text-sm font-medium ${getTextClass('primary')}`}>
                    {viewingTransaction.customerName || viewingTransaction.vendorName}
                  </span>
                </div>
                {(viewingTransaction.customerGST || viewingTransaction.vendorGST) && (
                  <div className="flex justify-between">
                    <span className={getTextClass('secondary')}>GST Number:</span>
                    <span className={`text-sm font-medium font-mono ${getTextClass('primary')}`}>
                      {viewingTransaction.customerGST || viewingTransaction.vendorGST}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className={getTextClass('secondary')}>Taxable Value:</span>
                  <span className={`text-sm font-medium ${getTextClass('primary')}`}>
                    {formatCurrency(viewingTransaction.taxableValue)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={getTextClass('secondary')}>GST Rate:</span>
                  <span className={`text-sm font-medium ${getTextClass('primary')}`}>
                    {viewingTransaction.gstRate}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={getTextClass('secondary')}>CGST:</span>
                  <span className={`text-sm font-medium ${getTextClass('primary')}`}>
                    {formatCurrency(viewingTransaction.cgst)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={getTextClass('secondary')}>SGST:</span>
                  <span className={`text-sm font-medium ${getTextClass('primary')}`}>
                    {formatCurrency(viewingTransaction.sgst)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={getTextClass('secondary')}>Total GST:</span>
                  <span className={`text-sm font-medium ${getTextClass('primary')}`}>
                    {formatCurrency(viewingTransaction.cgst + viewingTransaction.sgst)}
                  </span>
                </div>
                <div className={`flex justify-between border-t pt-2 ${getBorderClass()}`}>
                  <span className={`text-sm font-medium ${getTextClass('primary')}`}>Total Amount:</span>
                  <span className="text-sm font-bold text-green-600">
                    {formatCurrency(viewingTransaction.totalAmount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={getTextClass('secondary')}>Payment Method:</span>
                  <span className={`text-sm font-medium ${getTextClass('primary')} capitalize`}>
                    {viewingTransaction.paymentMethod}
                  </span>
                </div>
                {viewingTransaction.description && (
                  <div>
                    <span className={getTextClass('secondary')}>Description:</span>
                    <p className={`text-sm font-medium mt-1 ${getTextClass('primary')}`}>
                      {viewingTransaction.description}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setViewingTransaction(null)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className={`relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md ${
            getThemeClass('bg-white border-gray-200', 'bg-gray-800 border-gray-700')
          }`}>
            <div className="mt-3 text-center">
              <Trash2 className="mx-auto text-red-600 mb-4" size={48} />
              <h3 className={`text-lg font-medium ${getTextClass('primary')} mb-2`}>Delete Transaction</h3>
              <p className={`text-sm ${getTextClass('secondary')} mb-4`}>
                Are you sure you want to delete this transaction? This action cannot be undone.
              </p>
              <div className="flex justify-center space-x-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className={getThemeClass(
                    'bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50',
                    'bg-gray-700 border-gray-600 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-600'
                  )}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteTransaction(deleteConfirm)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Delete
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