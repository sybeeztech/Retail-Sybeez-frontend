import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Download, 
  Send, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  DollarSign,
  Calendar,
  User,
  Building,
  FileText,
  Copy,
  Trash2,
  Mail,
  Moon,
  Sun
} from 'lucide-react';
import useSettingsStore from '../../store/settingsStore'; // Import the same settings store

const InvoiceManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Use the same theme store as main dashboard
  const { theme, toggleTheme } = useSettingsStore();

  // New invoice form state
  const [newInvoice, setNewInvoice] = useState({
    clientName: '',
    clientEmail: '',
    amount: '',
    tax: '',
    total: '',
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    description: '',
    items: [{ description: '', quantity: 1, rate: '', amount: '' }]
  });

  // Sample invoice data
  const initialInvoices = [
    {
      id: 1,
      invoiceNumber: 'INV-2024-001',
      clientName: 'Tech Solutions Inc.',
      clientEmail: 'contact@techsolutions.com',
      amount: 75000,
      tax: 7500,
      total: 82500,
      status: 'paid',
      issueDate: '2024-09-15',
      dueDate: '2024-10-15',
      paidDate: '2024-10-07',
      description: 'Software Development Services - Q3 2024',
      items: [
        { description: 'Frontend Development', quantity: 80, rate: 750, amount: 60000 },
        { description: 'Backend Development', quantity: 20, rate: 750, amount: 15000 }
      ]
    },
    {
      id: 2,
      invoiceNumber: 'INV-2024-002',
      clientName: 'Global Marketing Agency',
      clientEmail: 'billing@globalmarketing.com',
      amount: 45000,
      tax: 4500,
      total: 49500,
      status: 'pending',
      issueDate: '2024-10-01',
      dueDate: '2024-10-31',
      paidDate: null,
      description: 'Digital Marketing Campaign Management',
      items: [
        { description: 'Campaign Strategy', quantity: 40, rate: 750, amount: 30000 },
        { description: 'Analytics & Reporting', quantity: 20, rate: 750, amount: 15000 }
      ]
    },
    {
      id: 3,
      invoiceNumber: 'INV-2024-003',
      clientName: 'Enterprise Corp',
      clientEmail: 'finance@enterprise.com',
      amount: 120000,
      tax: 12000,
      total: 132000,
      status: 'overdue',
      issueDate: '2024-08-15',
      dueDate: '2024-09-15',
      paidDate: null,
      description: 'Enterprise System Integration',
      items: [
        { description: 'System Analysis', quantity: 60, rate: 1000, amount: 60000 },
        { description: 'Integration Development', quantity: 60, rate: 1000, amount: 60000 }
      ]
    },
    {
      id: 4,
      invoiceNumber: 'INV-2024-004',
      clientName: 'StartupHub',
      clientEmail: 'accounts@startuphub.com',
      amount: 25000,
      tax: 2500,
      total: 27500,
      status: 'draft',
      issueDate: '2024-10-08',
      dueDate: '2024-11-08',
      paidDate: null,
      description: 'MVP Development Services',
      items: [
        { description: 'Mobile App Development', quantity: 30, rate: 750, amount: 22500 },
        { description: 'Testing & QA', quantity: 5, rate: 500, amount: 2500 }
      ]
    },
    {
      id: 5,
      invoiceNumber: 'INV-2024-005',
      clientName: 'Retail Solutions Ltd',
      clientEmail: 'payments@retail-solutions.com',
      amount: 35000,
      tax: 3500,
      total: 38500,
      status: 'sent',
      issueDate: '2024-10-05',
      dueDate: '2024-11-05',
      paidDate: null,
      description: 'E-commerce Platform Development',
      items: [
        { description: 'Platform Development', quantity: 40, rate: 750, amount: 30000 },
        { description: 'Payment Integration', quantity: 10, rate: 500, amount: 5000 }
      ]
    }
  ];

  // Initialize invoices
  useEffect(() => {
    setInvoices(initialInvoices);
  }, []);

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': 
        return getThemeClass('bg-green-100 text-green-800', 'bg-green-900/20 text-green-300');
      case 'pending': 
        return getThemeClass('bg-yellow-100 text-yellow-800', 'bg-yellow-900/20 text-yellow-300');
      case 'sent': 
        return getThemeClass('bg-blue-100 text-blue-800', 'bg-blue-900/20 text-blue-300');
      case 'overdue': 
        return getThemeClass('bg-red-100 text-red-800', 'bg-red-900/20 text-red-300');
      case 'draft': 
        return getThemeClass('bg-gray-100 text-gray-800', 'bg-gray-700 text-gray-300');
      default: 
        return getThemeClass('bg-gray-100 text-gray-800', 'bg-gray-700 text-gray-300');
    }
  };

  const getStatusIcon = (status) => {
    const iconColors = {
      paid: getThemeClass('text-green-600', 'text-green-400'),
      pending: getThemeClass('text-yellow-600', 'text-yellow-400'),
      sent: getThemeClass('text-blue-600', 'text-blue-400'),
      overdue: getThemeClass('text-red-600', 'text-red-400'),
      draft: getThemeClass('text-gray-600', 'text-gray-400')
    };
    
    switch (status) {
      case 'paid': return <CheckCircle size={16} className={iconColors.paid} />;
      case 'pending': return <Clock size={16} className={iconColors.pending} />;
      case 'sent': return <Mail size={16} className={iconColors.sent} />;
      case 'overdue': return <AlertTriangle size={16} className={iconColors.overdue} />;
      case 'draft': return <FileText size={16} className={iconColors.draft} />;
      default: return <FileText size={16} className={iconColors.draft} />;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = 
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || invoice.status === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  // Summary statistics
  const totalInvoiced = invoices.reduce((sum, inv) => sum + inv.total, 0);
  const totalPaid = invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.total, 0);
  const totalPending = invoices.filter(inv => inv.status === 'pending' || inv.status === 'sent').reduce((sum, inv) => sum + inv.total, 0);
  const totalOverdue = invoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.total, 0);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInvoice(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle item changes
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...newInvoice.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value
    };
    
    // Calculate amount if quantity or rate changes
    if (field === 'quantity' || field === 'rate') {
      const quantity = field === 'quantity' ? value : updatedItems[index].quantity;
      const rate = field === 'rate' ? value : updatedItems[index].rate;
      updatedItems[index].amount = quantity * rate;
    }
    
    setNewInvoice(prev => ({
      ...prev,
      items: updatedItems
    }));
  };

  // Add new item row
  const addItem = () => {
    setNewInvoice(prev => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: 1, rate: '', amount: '' }]
    }));
  };

  // Remove item row
  const removeItem = (index) => {
    if (newInvoice.items.length > 1) {
      setNewInvoice(prev => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index)
      }));
    }
  };

  // Calculate totals
  const calculateTotals = () => {
    const subtotal = newInvoice.items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    const taxRate = 0.18; // 18% GST
    const tax = subtotal * taxRate;
    const total = subtotal + tax;
    
    setNewInvoice(prev => ({
      ...prev,
      amount: subtotal,
      tax: tax,
      total: total
    }));
  };

  // Create new invoice
  const handleCreateInvoice = () => {
    if (!newInvoice.clientName || !newInvoice.clientEmail || !newInvoice.description) {
      alert('Please fill in all required fields: Client Name, Client Email, and Description');
      return;
    }

    calculateTotals();

    const invoice = {
      id: invoices.length + 1,
      invoiceNumber: `INV-2024-${String(invoices.length + 1).padStart(3, '0')}`,
      clientName: newInvoice.clientName,
      clientEmail: newInvoice.clientEmail,
      amount: newInvoice.amount,
      tax: newInvoice.tax,
      total: newInvoice.total,
      status: 'draft',
      issueDate: newInvoice.issueDate,
      dueDate: newInvoice.dueDate,
      paidDate: null,
      description: newInvoice.description,
      items: newInvoice.items.filter(item => item.description && item.rate)
    };

    setInvoices(prev => [...prev, invoice]);
    setShowCreateModal(false);
    resetForm();
    alert('Invoice created successfully!');
  };

  // Reset form
  const resetForm = () => {
    setNewInvoice({
      clientName: '',
      clientEmail: '',
      amount: '',
      tax: '',
      total: '',
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: '',
      description: '',
      items: [{ description: '', quantity: 1, rate: '', amount: '' }]
    });
  };

  // View invoice details
  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    alert(`Viewing invoice: ${invoice.invoiceNumber}\nClient: ${invoice.clientName}\nAmount: ${formatCurrency(invoice.total)}`);
  };

  // Edit invoice
  const handleEditInvoice = (invoice) => {
    alert(`Editing invoice: ${invoice.invoiceNumber}`);
  };

  // Download invoice
  const handleDownloadInvoice = (invoice) => {
    setIsLoading(true);
    setTimeout(() => {
      const content = `
        INVOICE: ${invoice.invoiceNumber}
        Client: ${invoice.clientName}
        Email: ${invoice.clientEmail}
        Amount: ${formatCurrency(invoice.total)}
        Status: ${invoice.status}
        Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}
        
        Description: ${invoice.description}
        
        Items:
        ${invoice.items.map(item => 
          `${item.description} - ${item.quantity} x ${formatCurrency(item.rate)} = ${formatCurrency(item.amount)}`
        ).join('\n')}
      `;
      
      const blob = new Blob([content], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${invoice.invoiceNumber}.txt`;
      a.click();
      window.URL.revokeObjectURL(url);
      
      setIsLoading(false);
      alert(`Invoice ${invoice.invoiceNumber} downloaded successfully!`);
    }, 1000);
  };

  // Send invoice
  const handleSendInvoice = (invoice) => {
    setIsLoading(true);
    setTimeout(() => {
      setInvoices(prev => prev.map(inv => 
        inv.id === invoice.id ? { ...inv, status: 'sent' } : inv
      ));
      setIsLoading(false);
      alert(`Invoice ${invoice.invoiceNumber} sent to ${invoice.clientEmail}`);
    }, 1500);
  };

  // Duplicate invoice
  const handleDuplicateInvoice = (invoice) => {
    const duplicatedInvoice = {
      ...invoice,
      id: invoices.length + 1,
      invoiceNumber: `INV-2024-${String(invoices.length + 1).padStart(3, '0')}`,
      status: 'draft',
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };
    
    setInvoices(prev => [...prev, duplicatedInvoice]);
    alert(`Invoice ${invoice.invoiceNumber} duplicated successfully!`);
  };

  // Delete invoice
  const handleDeleteInvoice = (invoice) => {
    if (confirm(`Are you sure you want to delete invoice ${invoice.invoiceNumber}?`)) {
      setInvoices(prev => prev.filter(inv => inv.id !== invoice.id));
      alert(`Invoice ${invoice.invoiceNumber} deleted successfully!`);
    }
  };

  // Mark as paid
  const handleMarkAsPaid = (invoice) => {
    setInvoices(prev => prev.map(inv => 
      inv.id === invoice.id ? { 
        ...inv, 
        status: 'paid', 
        paidDate: new Date().toISOString().split('T')[0] 
      } : inv
    ));
    alert(`Invoice ${invoice.invoiceNumber} marked as paid!`);
  };

  // Apply more filters
  const handleMoreFilters = () => {
    const dateRange = prompt('Enter date range (e.g., "2024-10-01 to 2024-10-31"):');
    if (dateRange) {
      alert(`Filtering by date range: ${dateRange}`);
    }
  };

  return (
    <div className={`p-6 min-h-screen ${getThemeClass('bg-gray-50', 'bg-gray-900')}`}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className={`text-2xl font-semibold ${getTextClass('primary')}`}>
              Invoice Management
            </h1>
            <p className={getTextClass('secondary')}>
              Create, manage, and track your invoices
            </p>
          </div>
          <div className="flex items-center space-x-3">
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
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Create Invoice</span>
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className={`rounded-lg shadow p-6 ${getCardClass()} ${getBorderClass()}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${getTextClass('secondary')}`}>
                  Total Invoiced
                </p>
                <p className={`text-2xl font-bold ${getTextClass('primary')}`}>
                  {formatCurrency(totalInvoiced)}
                </p>
              </div>
              <div className={`p-3 rounded-full ${
                getThemeClass('bg-blue-100', 'bg-blue-900/20')
              }`}>
                <FileText className={`h-5 w-5 text-blue-600`} />
              </div>
            </div>
          </div>
          
          <div className={`rounded-lg shadow p-6 ${getCardClass()} ${getBorderClass()}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${getTextClass('secondary')}`}>
                  Total Paid
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(totalPaid)}
                </p>
              </div>
              <div className={`p-3 rounded-full ${
                getThemeClass('bg-green-100', 'bg-green-900/20')
              }`}>
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className={`rounded-lg shadow p-6 ${getCardClass()} ${getBorderClass()}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${getTextClass('secondary')}`}>
                  Pending
                </p>
                <p className="text-2xl font-bold text-yellow-600">
                  {formatCurrency(totalPending)}
                </p>
              </div>
              <div className={`p-3 rounded-full ${
                getThemeClass('bg-yellow-100', 'bg-yellow-900/20')
              }`}>
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className={`rounded-lg shadow p-6 ${getCardClass()} ${getBorderClass()}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${getTextClass('secondary')}`}>
                  Overdue
                </p>
                <p className="text-2xl font-bold text-red-600">
                  {formatCurrency(totalOverdue)}
                </p>
              </div>
              <div className={`p-3 rounded-full ${
                getThemeClass('bg-red-100', 'bg-red-900/20')
              }`}>
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className={`rounded-lg shadow mb-6 ${getCardClass()} ${getBorderClass()}`}>
        <div className={`p-6 border-b ${getBorderClass()}`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${getTextClass('muted')}`} size={20} />
                <input
                  type="text"
                  placeholder="Search invoices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    getInputClass()
                  }`}
                />
              </div>
            </div>
            <div className="flex space-x-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={`border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  getInputClass()
                }`}
              >
                <option value="All">All Status</option>
                <option value="Draft">Draft</option>
                <option value="Sent">Sent</option>
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Overdue">Overdue</option>
              </select>
              <button 
                onClick={handleMoreFilters}
                className={`border px-3 py-2 rounded-lg flex items-center space-x-2 ${
                  getThemeClass(
                    'bg-white border-gray-300 text-gray-700 hover:bg-gray-50',
                    'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600'
                  )
                }`}
              >
                <Filter size={16} />
                <span>More Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Invoice Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className={getTableHeaderClass()}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider`}>
                  Invoice
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider`}>
                  Client
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider`}>
                  Amount
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider`}>
                  Status
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider`}>
                  Issue Date
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider`}>
                  Due Date
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${getTableDivideClass()} ${getCardClass()}`}>
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className={getTableRowClass()}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className={`text-sm font-medium ${getTextClass('primary')}`}>
                        {invoice.invoiceNumber}
                      </div>
                      <div className={`text-sm ${getTextClass('secondary')}`}>
                        {invoice.description}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-full mr-3 ${
                        getThemeClass('bg-gray-100', 'bg-gray-700')
                      }`}>
                        <Building size={16} className={getTextClass('muted')} />
                      </div>
                      <div>
                        <div className={`text-sm font-medium ${getTextClass('primary')}`}>
                          {invoice.clientName}
                        </div>
                        <div className={`text-sm ${getTextClass('secondary')}`}>
                          {invoice.clientEmail}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${getTextClass('primary')}`}>
                      {formatCurrency(invoice.total)}
                    </div>
                    <div className={`text-sm ${getTextClass('secondary')}`}>
                      Tax: {formatCurrency(invoice.tax)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                      {getStatusIcon(invoice.status)}
                      <span className="ml-1 capitalize">{invoice.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm flex items-center ${getTextClass('primary')}`}>
                      <Calendar size={12} className={`mr-2 ${getTextClass('muted')}`} />
                      {new Date(invoice.issueDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm flex items-center ${
                      invoice.status === 'overdue' 
                        ? 'text-red-600' 
                        : getTextClass('primary')
                    }`}>
                      <Calendar size={12} className={`mr-2 ${getTextClass('muted')}`} />
                      {new Date(invoice.dueDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleViewInvoice(invoice)}
                        className={getThemeClass(
                          'text-blue-600 hover:text-blue-900',
                          'text-blue-400 hover:text-blue-300'
                        )} 
                        title="View"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handleEditInvoice(invoice)}
                        className={getThemeClass(
                          'text-gray-600 hover:text-gray-900',
                          'text-gray-400 hover:text-gray-300'
                        )}
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDownloadInvoice(invoice)}
                        disabled={isLoading}
                        className={getThemeClass(
                          'text-green-600 hover:text-green-900',
                          'text-green-400 hover:text-green-300'
                        )} 
                        title="Download"
                      >
                        <Download size={16} />
                      </button>
                      <button 
                        onClick={() => handleSendInvoice(invoice)}
                        disabled={isLoading || invoice.status === 'sent' || invoice.status === 'paid'}
                        className={getThemeClass(
                          'text-purple-600 hover:text-purple-900',
                          'text-purple-400 hover:text-purple-300'
                        )} 
                        title="Send"
                      >
                        <Send size={16} />
                      </button>
                      <button 
                        onClick={() => handleDuplicateInvoice(invoice)}
                        className={getThemeClass(
                          'text-orange-600 hover:text-orange-900',
                          'text-orange-400 hover:text-orange-300'
                        )} 
                        title="Duplicate"
                      >
                        <Copy size={16} />
                      </button>
                      {invoice.status !== 'paid' && (
                        <button 
                          onClick={() => handleMarkAsPaid(invoice)}
                          className={getThemeClass(
                            'text-green-600 hover:text-green-900',
                            'text-green-400 hover:text-green-300'
                          )} 
                          title="Mark as Paid"
                        >
                          <CheckCircle size={16} />
                        </button>
                      )}
                      <button 
                        onClick={() => handleDeleteInvoice(invoice)}
                        className={getThemeClass(
                          'text-red-600 hover:text-red-900',
                          'text-red-400 hover:text-red-300'
                        )} 
                        title="Delete"
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

        {filteredInvoices.length === 0 && (
          <div className="text-center py-12">
            <FileText className={`mx-auto h-12 w-12 ${getTextClass('muted')}`} />
            <h3 className={`mt-2 text-sm font-medium ${getTextClass('primary')}`}>
              No invoices found
            </h3>
            <p className={`mt-1 text-sm ${getTextClass('secondary')}`}>
              {searchTerm || statusFilter !== 'All' 
                ? 'Try adjusting your search or filters'
                : 'Get started by creating your first invoice'
              }
            </p>
          </div>
        )}
      </div>

      {/* Create Invoice Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className={`relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md ${
            getCardClass()} ${getBorderClass()}`}>
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-medium ${getTextClass('primary')}`}>
                  Create New Invoice
                </h3>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    resetForm();
                  }}
                  className={getThemeClass(
                    'text-gray-400 hover:text-gray-600',
                    'text-gray-400 hover:text-gray-300'
                  )}
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${getTextClass('primary')}`}>
                      Client Name *
                    </label>
                    <input
                      type="text"
                      name="clientName"
                      value={newInvoice.clientName}
                      onChange={handleInputChange}
                      className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        getInputClass()
                      }`}
                      placeholder="Enter client name"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${getTextClass('primary')}`}>
                      Client Email *
                    </label>
                    <input
                      type="email"
                      name="clientEmail"
                      value={newInvoice.clientEmail}
                      onChange={handleInputChange}
                      className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        getInputClass()
                      }`}
                      placeholder="Enter client email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${getTextClass('primary')}`}>
                      Issue Date
                    </label>
                    <input
                      type="date"
                      name="issueDate"
                      value={newInvoice.issueDate}
                      onChange={handleInputChange}
                      className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        getInputClass()
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${getTextClass('primary')}`}>
                      Due Date *
                    </label>
                    <input
                      type="date"
                      name="dueDate"
                      value={newInvoice.dueDate}
                      onChange={handleInputChange}
                      className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        getInputClass()
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${getTextClass('primary')}`}>
                    Description *
                  </label>
                  <textarea
                    rows={3}
                    name="description"
                    value={newInvoice.description}
                    onChange={handleInputChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      getInputClass()
                    }`}
                    placeholder="Enter description"
                  />
                </div>

                {/* Invoice Items */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className={`block text-sm font-medium ${getTextClass('primary')}`}>
                      Invoice Items
                    </label>
                    <button
                      type="button"
                      onClick={addItem}
                      className={getThemeClass(
                        'text-blue-600 hover:text-blue-700',
                        'text-blue-400 hover:text-blue-300'
                      )}
                    >
                      + Add Item
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {newInvoice.items.map((item, index) => (
                      <div key={index} className="grid grid-cols-12 gap-2 items-end">
                        <div className="col-span-5">
                          <input
                            type="text"
                            value={item.description}
                            onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                            className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              getInputClass()
                            }`}
                            placeholder="Item description"
                          />
                        </div>
                        <div className="col-span-2">
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 0)}
                            className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              getInputClass()
                            }`}
                            placeholder="Qty"
                            min="1"
                          />
                        </div>
                        <div className="col-span-3">
                          <input
                            type="number"
                            value={item.rate}
                            onChange={(e) => handleItemChange(index, 'rate', parseFloat(e.target.value) || 0)}
                            className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              getInputClass()
                            }`}
                            placeholder="Rate"
                            step="0.01"
                          />
                        </div>
                        <div className={`col-span-1 text-sm font-medium ${getTextClass('primary')}`}>
                          {formatCurrency(item.amount || 0)}
                        </div>
                        <div className="col-span-1">
                          {newInvoice.items.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeItem(index)}
                              className={getThemeClass(
                                'text-red-600 hover:text-red-700',
                                'text-red-400 hover:text-red-300'
                              )}
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Totals */}
                <div className={`border-t pt-4 ${getBorderClass()}`}>
                  <div className={`flex justify-between text-sm ${getTextClass('primary')}`}>
                    <span>Subtotal:</span>
                    <span>{formatCurrency(newInvoice.amount || 0)}</span>
                  </div>
                  <div className={`flex justify-between text-sm ${getTextClass('primary')}`}>
                    <span>GST (18%):</span>
                    <span>{formatCurrency(newInvoice.tax || 0)}</span>
                  </div>
                  <div className={`flex justify-between font-semibold text-lg border-t mt-2 pt-2 ${getTextClass('primary')}`}>
                    <span>Total:</span>
                    <span>{formatCurrency(newInvoice.total || 0)}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowCreateModal(false);
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
                  onClick={handleCreateInvoice}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Create Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceManagement;