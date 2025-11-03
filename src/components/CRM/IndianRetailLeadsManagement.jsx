import React, { useState, useEffect, useRef } from 'react';
import * as XLSX from 'xlsx';
import { 
  UserPlus, 
  Phone, 
  Mail, 
  Calendar, 
  IndianRupee, 
  TrendingUp,
  Filter,
  Search,
  MoreVertical,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  Tag,
  MapPin,
  Building,
  Store,
  Smartphone,
  MessageSquare,
  FileText,
  Target,
  Users,
  AlertCircle,
  Truck,
  Package,
  CreditCard,
  Gift,
  Home,
  Building2,
  ShoppingCart,
  Percent,
  Activity,
  Calendar as CalendarIcon,
  PlusCircle,
  Download,
  Upload,
  X,
  PenSquare,
  Trash
} from 'lucide-react';

const IndianRetailLeadsManagement = () => {
  const fileInputRef = useRef(null);

  const [leads, setLeads] = useState([
    {
      id: 1,
      name: 'Suresh Gupta',
      email: 'suresh.gupta@gmail.com',
      phone: '+91 98765 43210',
      whatsapp: '+91 98765 43210',
      company: 'Gupta Provision Store',
      businessType: 'General Store',
      source: 'WhatsApp Inquiry',
      score: 85,
      estimatedValue: 150000,
      stage: 'Qualified',
      assignedTo: 'Rahul Sharma',
      createdDate: '2024-10-01',
      lastActivity: '2024-10-07',
      nextFollowUp: '2024-10-10',
      priority: 'High',
      address: 'Main Market, Karol Bagh, New Delhi',
      area: 'Karol Bagh',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110005',
      gstNumber: 'GSTIN07PQRST1234U5V6',
      businessYears: 5,
      monthlyTurnover: 200000,
      currentSuppliers: ['Local Distributors', 'Cash & Carry'],
      painPoints: ['Irregular supply', 'High prices', 'No credit terms'],
      requirements: ['Regular supply', 'Competitive prices', 'Credit facility'],
      products: ['Groceries', 'Personal Care', 'Home Care'],
      preferredBrands: ['Patanjali', 'ITC', 'Dabur'],
      paymentPreference: 'UPI',
      creditRequirement: 50000,
      notes: 'Very interested in bulk ordering. Wants to expand product range. Good payment history with current suppliers.',
      interactions: [
        {
          date: '2024-10-07',
          type: 'WhatsApp Call',
          agent: 'Rahul Sharma',
          summary: 'Discussed product portfolio and pricing. Very interested.',
          nextAction: 'Send product catalog and pricing'
        },
        {
          date: '2024-10-05',
          type: 'Shop Visit',
          agent: 'Rahul Sharma',
          summary: 'Visited store, assessed space and current inventory',
          nextAction: 'Prepare customized proposal'
        }
      ],
      status: 'Hot Lead',
      segment: 'SMB',
      language: 'Hindi',
      referredBy: 'Rajesh Kumar',
      competitorAnalysis: {
        currentSupplier: 'Local Distributor',
        pricingGap: '12%',
        serviceGaps: ['No home delivery', 'Limited product range']
      }
    },
    {
      id: 2,
      name: 'Anita Rani',
      email: 'anita.rani@yahoo.com',
      phone: '+91 87654 32109',
      whatsapp: '+91 87654 32109',
      company: 'Rani Kirana Store',
      businessType: 'Kirana Store',
      source: 'Direct Walk-in',
      score: 65,
      estimatedValue: 80000,
      stage: 'Contacted',
      assignedTo: 'Priya Singh',
      createdDate: '2024-10-03',
      lastActivity: '2024-10-06',
      nextFollowUp: '2024-10-09',
      priority: 'Medium',
      address: 'Sector 15, Rohini, New Delhi',
      area: 'Rohini',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110085',
      gstNumber: 'GSTIN07WXYZ7890A1B2',
      businessYears: 2,
      monthlyTurnover: 100000,
      currentSuppliers: ['Metro Cash & Carry', 'Local Suppliers'],
      painPoints: ['Limited storage space', 'Cash flow issues'],
      requirements: ['Small quantity orders', 'Flexible payment terms'],
      products: ['Groceries', 'Snacks', 'Beverages'],
      preferredBrands: ['Britannia', 'Parle', 'Amul'],
      paymentPreference: 'Cash',
      creditRequirement: 20000,
      notes: 'New business owner, needs guidance. Interested in POS system integration.',
      interactions: [
        {
          date: '2024-10-06',
          type: 'Phone Call',
          agent: 'Priya Singh',
          summary: 'Initial discussion about products and services',
          nextAction: 'Schedule store visit'
        }
      ],
      status: 'Warm Lead',
      segment: 'Micro',
      language: 'English',
      referredBy: '',
      competitorAnalysis: {
        currentSupplier: 'Metro Cash & Carry',
        pricingGap: '8%',
        serviceGaps: ['No credit facility', 'Bulk purchase requirement']
      }
    }
  ]);

  // Load leads from localStorage on mount
  useEffect(() => {
    const storedLeads = localStorage.getItem('retailLeads');
    if (storedLeads) {
      setLeads(JSON.parse(storedLeads));
    }
  }, []);

  // Save leads to localStorage whenever they change
  useEffect(() => {
    if (leads.length > 0) {
      localStorage.setItem('retailLeads', JSON.stringify(leads));
    }
  }, [leads]);

  useEffect(() => {
    const handleClickOutside = () => {
      setShowOptions(null);
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClickInside = (e) => {
  e.preventDefault();
  e.stopPropagation();
};

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStage, setFilterStage] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterBusinessType, setFilterBusinessType] = useState('All');
  const [selectedLead, setSelectedLead] = useState(null);
  const [showAddLead, setShowAddLead] = useState(false);
  const [showOptions, setShowOptions] = useState(null);
  const [editingLead, setEditingLead] = useState(null);
  const [activeFormTab, setActiveFormTab] = useState('basic');

  const stages = ['All', 'New', 'Contacted', 'Qualified', 'Proposal Sent', 'Negotiation', 'Won', 'Lost'];
  const priorities = ['All', 'High', 'Medium', 'Low'];
  const businessTypes = ['All', 'General Store', 'Kirana Store', 'Mini Mart', 'Super Market', 'Wholesale'];

  const stageColors = {
    'New': 'bg-gray-100 text-gray-800',
    'Contacted': 'bg-blue-100 text-blue-800',
    'Qualified': 'bg-yellow-100 text-yellow-800',
    'Proposal Sent': 'bg-purple-100 text-purple-800',
    'Negotiation': 'bg-orange-100 text-orange-800',
    'Won': 'bg-green-100 text-green-800',
    'Lost': 'bg-red-100 text-red-800'
  };

  const priorityColors = {
    'High': 'bg-red-100 text-red-800',
    'Medium': 'bg-yellow-100 text-yellow-800',
    'Low': 'bg-green-100 text-green-800'
  };

  const statusColors = {
    'Hot Lead': 'bg-gradient-to-r from-red-500 to-pink-500 text-white',
    'Warm Lead': 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white',
    'Cold Lead': 'bg-gray-100 text-gray-800'
  };


  // Add this to your constants section
const indianLanguages = [
  'Hindi', 'English', 'Tamil', 'Telugu', 'Kannada', 'Malayalam', 
  'Marathi', 'Gujarati', 'Bengali', 'Punjabi', 'Odia', 'Urdu',
  'Sanskrit', 'Assamese', 'Maithili', 'Kashmiri', 'Sindhi', 'Nepali',
  'Konkani', 'Bodo', 'Dogri', 'Manipuri', 'Santali'
];

const paymentPreferences = ['UPI', 'Card', 'Cash', 'Cheque', 'Bank Transfer'];

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    company: '',
    businessType: '',
    source: '',
    score: 0,
    estimatedValue: '',
    stage: 'New',
    assignedTo: '',
    priority: 'Medium',
    address: '',
    area: '',
    city: '',
    state: '',
    pincode: '',
    gstNumber: '',
    businessYears: '',
    monthlyTurnover: '',
    currentSuppliers: '',
    painPoints: '',
    requirements: '',
    products: '',
    preferredBrands: '',
    paymentPreference: [],
    creditRequirement: '',
    notes: '',
    status: 'Warm Lead',
    segment: 'SMB',
    language: 'English',
    referredBy: ''
  });

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      lead.area.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStage = filterStage === 'All' || lead.stage === filterStage;
    const matchesPriority = filterPriority === 'All' || lead.priority === filterPriority;
    const matchesBusinessType = filterBusinessType === 'All' || lead.businessType === filterBusinessType;

    return matchesSearch && matchesStage && matchesPriority && matchesBusinessType;
  });

  const formatIndianCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const calculateDaysInStage = (lastActivity) => {
    const today = new Date();
    const lastDate = new Date(lastActivity);
    const diffTime = Math.abs(today - lastDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  // Add this useEffect with your other useEffect hooks
useEffect(() => {
  const handleClickOutside = () => {
    setShowOptions(null);
  };

  document.addEventListener('click', handleClickOutside);
  return () => {
    document.removeEventListener('click', handleClickOutside);
  };
}, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetFormData = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      whatsapp: '',
      company: '',
      businessType: '',
      source: '',
      score: 0,
      estimatedValue: '',
      stage: 'New',
      assignedTo: '',
      priority: 'Medium',
      address: '',
      area: '',
      city: '',
      state: '',
      pincode: '',
      gstNumber: '',
      businessYears: '',
      monthlyTurnover: '',
      currentSuppliers: '',
      painPoints: '',
      requirements: '',
      products: '',
      preferredBrands: '',
      paymentPreference: [],
      creditRequirement: '',
      notes: '',
      status: 'Warm Lead',
      segment: 'SMB',
      language: 'Hindi',
      referredBy: ''
    });
  };

  const handleEditLead = (lead) => {
    setEditingLead(lead);
    
    setFormData({
      name: lead.name || '',
      email: lead.email || '',
      phone: lead.phone || '',
      whatsapp: lead.whatsapp || '',
      company: lead.company || '',
      businessType: lead.businessType || '',
      source: lead.source || '',
      score: lead.score || 0,
      estimatedValue: lead.estimatedValue || '',
      stage: lead.stage || 'New',
      assignedTo: lead.assignedTo || '',
      priority: lead.priority || 'Medium',
      address: lead.address || '',
      area: lead.area || '',
      city: lead.city || '',
      state: lead.state || '',
      pincode: lead.pincode || '',
      gstNumber: lead.gstNumber || '',
      businessYears: lead.businessYears || '',
      monthlyTurnover: lead.monthlyTurnover || '',
      currentSuppliers: lead.currentSuppliers?.join(', ') || '',
      painPoints: lead.painPoints?.join(', ') || '',
      requirements: lead.requirements?.join(', ') || '',
      products: lead.products?.join(', ') || '',
      preferredBrands: lead.preferredBrands?.join(', ') || '',
      paymentPreference: Array.isArray(lead.paymentPreference) ? lead.paymentPreference : [],
      creditRequirement: lead.creditRequirement || '',
      notes: lead.notes || '',
      status: lead.status || 'Warm Lead',
      segment: lead.segment || 'SMB',
      language: lead.language || 'Hindi',
      referredBy: lead.referredBy || ''
    });
    
    setShowAddLead(true);
    setShowOptions(null);
  };

  const handleDeleteLead = (leadId) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      setLeads(prev => prev.filter(lead => lead.id !== leadId));
      setShowOptions(null);
    }
  };

  const handleSubmit = () => {
    
  //   if (formData.paymentPreference.length === 0) {
  //   const shouldContinue = window.confirm('No payment preference selected. Continue without payment preference?');
  //   if (!shouldContinue) {
  //     return;
  //   }
  // }

    const leadData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      whatsapp: formData.whatsapp || formData.phone,
      company: formData.company,
      businessType: formData.businessType,
      source: formData.source,
      score: parseInt(formData.score) || 0,
      estimatedValue: parseFloat(formData.estimatedValue) || 0,
      stage: formData.stage,
      assignedTo: formData.assignedTo,
      createdDate: new Date().toISOString().split('T')[0],
      lastActivity: new Date().toISOString().split('T')[0],
      nextFollowUp: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      priority: formData.priority,
      address: formData.address,
      area: formData.area,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      gstNumber: formData.gstNumber,
      businessYears: parseInt(formData.businessYears) || 0,
      monthlyTurnover: parseFloat(formData.monthlyTurnover) || 0,
      currentSuppliers: formData.currentSuppliers ? formData.currentSuppliers.split(',').map(s => s.trim()) : [],
      painPoints: formData.painPoints ? formData.painPoints.split(',').map(p => p.trim()) : [],
      requirements: formData.requirements ? formData.requirements.split(',').map(r => r.trim()) : [],
      products: formData.products ? formData.products.split(',').map(p => p.trim()) : [],
      preferredBrands: formData.preferredBrands ? formData.preferredBrands.split(',').map(b => b.trim()) : [],
      paymentPreference: formData.paymentPreference,
      creditRequirement: parseFloat(formData.creditRequirement) || 0,
      notes: formData.notes,
      interactions: [],
      status: formData.status,
      segment: formData.segment,
      language: formData.language,
      referredBy: formData.referredBy,
      competitorAnalysis: {
        currentSupplier: '',
        pricingGap: '',
        serviceGaps: []
      }
    };

    if (editingLead) {
      const updatedLead = {
        ...editingLead,
        ...leadData,
        id: editingLead.id
      };

      setLeads(prev => prev.map(lead => 
        lead.id === editingLead.id ? updatedLead : lead
      ));
      setEditingLead(null);
    } else {
      const newLead = {
        ...leadData,
        id: leads.length > 0 ? Math.max(...leads.map(l => l.id)) + 1 : 1
      };

      setLeads(prev => [...prev, newLead]);
    }

    resetFormData();
    setShowAddLead(false);
    setActiveFormTab('basic');
  };

  const handlePaymentPreferenceChange = (paymentMethod) => {
  setFormData(prev => {
    const currentPreferences = prev.paymentPreference || [];
    if (currentPreferences.includes(paymentMethod)) {
      return {
        ...prev,
        paymentPreference: currentPreferences.filter(method => method !== paymentMethod)
      };
    } else {
      return {
        ...prev,
        paymentPreference: [...currentPreferences, paymentMethod]
      };
    }
  });
};

  // Export Function
  const handleExport = () => {
  try {
    // Export data for leads
    const exportData = leads.map(lead => ({
      'Name': lead.name || '',
      'Email': lead.email || '',
      'Phone': lead.phone || '',
      'WhatsApp': lead.whatsapp || '',
      'Company': lead.company || '',
      'Business Type': lead.businessType || '',
      'Source': lead.source || '',
      'Lead Score': lead.score || 0,
      'Estimated Value': lead.estimatedValue || 0,
      'Stage': lead.stage || '',
      'Assigned To': lead.assignedTo || '',
      'Priority': lead.priority || '',
      'Address': lead.address || '',
      'Area': lead.area || '',
      'City': lead.city || '',
      'State': lead.state || '',
      'PIN Code': lead.pincode || '',
      'GST Number': lead.gstNumber || '',
      'Business Years': lead.businessYears || 0,
      'Monthly Turnover': lead.monthlyTurnover || 0,
      'Current Suppliers': lead.currentSuppliers?.join(', ') || '',
      'Pain Points': lead.painPoints?.join(', ') || '',
      'Requirements': lead.requirements?.join(', ') || '',
      'Products': lead.products?.join(', ') || '',
      'Preferred Brands': lead.preferredBrands?.join(', ') || '',
      'Payment Preference': Array.isArray(lead.paymentPreference) ? lead.paymentPreference.join(', ') : lead.paymentPreference,
      'Credit Requirement': lead.creditRequirement || 0,
      'Notes': lead.notes || '',
      'Status': lead.status || '',
      'Segment': lead.segment || '',
      'Language': lead.language || '',
      'Referred By': lead.referredBy || '',
      'Created Date': lead.createdDate || '',
      'Last Activity': lead.lastActivity || '',
      'Next Follow Up': lead.nextFollowUp || ''
    }));

    // Calculate summary statistics (same as your dashboard)
    const totalLeads = leads.length;
    const hotLeads = leads.filter(l => l.status === 'Hot Lead').length;
    const totalValue = leads.reduce((sum, l) => sum + l.estimatedValue, 0);
    const avgScore = leads.length > 0 ? Math.round(leads.reduce((sum, l) => sum + l.score, 0) / leads.length) : 0;
    
    // Calculate leads by stage for conversion insights
    const leadsByStage = leads.reduce((acc, lead) => {
      acc[lead.stage] = (acc[lead.stage] || 0) + 1;
      return acc;
    }, {});

    const wonLeads = leadsByStage['Won'] || 0;
    const conversionRate = totalLeads > 0 ? ((wonLeads / totalLeads) * 100).toFixed(1) : 0;

    // Summary data for separate sheet
    const summaryData = [
      { 'Metric': 'Total Leads', 'Value': totalLeads },
      { 'Metric': 'Hot Leads', 'Value': hotLeads },
      { 'Metric': 'Warm Leads', 'Value': leads.filter(l => l.status === 'Warm Lead').length },
      { 'Metric': 'Cold Leads', 'Value': leads.filter(l => l.status === 'Cold Lead').length },
      { 'Metric': 'Total Pipeline Value (₹)', 'Value': totalValue },
      { 'Metric': 'Average Lead Score', 'Value': `${avgScore}/100` },
      { 'Metric': 'Conversion Rate', 'Value': `${conversionRate}%` },
      { 'Metric': 'Won Leads', 'Value': wonLeads },
      { 'Metric': '', 'Value': '' }, // Empty row for spacing
      { 'Metric': 'Leads by Stage:', 'Value': '' },
      { 'Metric': 'New', 'Value': leadsByStage['New'] || 0 },
      { 'Metric': 'Contacted', 'Value': leadsByStage['Contacted'] || 0 },
      { 'Metric': 'Qualified', 'Value': leadsByStage['Qualified'] || 0 },
      { 'Metric': 'Proposal Sent', 'Value': leadsByStage['Proposal Sent'] || 0 },
      { 'Metric': 'Negotiation', 'Value': leadsByStage['Negotiation'] || 0 },
      { 'Metric': 'Won', 'Value': leadsByStage['Won'] || 0 },
      { 'Metric': 'Lost', 'Value': leadsByStage['Lost'] || 0 },
      { 'Metric': '', 'Value': '' }, // Empty row for spacing
      { 'Metric': 'Leads by Priority:', 'Value': '' },
      { 'Metric': 'High', 'Value': leads.filter(l => l.priority === 'High').length },
      { 'Metric': 'Medium', 'Value': leads.filter(l => l.priority === 'Medium').length },
      { 'Metric': 'Low', 'Value': leads.filter(l => l.priority === 'Low').length },
      { 'Metric': '', 'Value': '' }, // Empty row for spacing
      { 'Metric': 'Export Date', 'Value': new Date().toLocaleDateString('en-IN') },
      { 'Metric': 'Total Records', 'Value': leads.length }
    ];

    // Create workbook with multiple sheets
    const wb = XLSX.utils.book_new();
    
    // Add leads data sheet
    const wsLeads = XLSX.utils.json_to_sheet(exportData);
    XLSX.utils.book_append_sheet(wb, wsLeads, 'Leads Data');
    
    // Add summary statistics sheet
    const wsSummary = XLSX.utils.json_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, wsSummary, 'Summary Dashboard');

    // Set column widths for better readability in summary sheet
    if (!wsSummary['!cols']) wsSummary['!cols'] = [];
    wsSummary['!cols'][0] = { width: 25 }; // Metric column
    wsSummary['!cols'][1] = { width: 15 }; // Value column

    const fileName = `retail_leads_export_${new Date().toISOString().split('T')[0]}.xlsx`;
    
    XLSX.writeFile(wb, fileName);
    
    alert(`✅ Exported ${leads.length} leads successfully!\n📊 Includes detailed summary dashboard.`);
    
  } catch (error) {
    console.error('Export error:', error);
    alert('❌ Error exporting leads. Please try again.');
  }
};

  // Import Function
  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.name.match(/\.(xlsx|xls|csv)$/)) {
      alert('❌ Please select an Excel file (.xlsx, .xls) or CSV file (.csv)');
      return;
    }

    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        if (jsonData.length === 0) {
          alert('❌ The file is empty or has no valid data.');
          return;
        }

        const isDuplicateLead = (newLead, existingLeads) => {
          return existingLeads.some(existingLead => 
            (newLead.phone && existingLead.phone === newLead.phone) ||
            (newLead.email && existingLead.email === newLead.email) ||
            (newLead.name === existingLead.name && 
             newLead.company === existingLead.company)
          );
        };

        const importedLeads = jsonData.map((row, index) => {
          const leadId = leads.length > 0 ? Math.max(...leads.map(l => l.id)) + index + 1 : index + 1;
          
          return {
            id: leadId,
            name: row['Name'] || '',
            email: row['Email'] || '',
            phone: row['Phone'] || '',
            whatsapp: row['WhatsApp'] || row['Phone'] || '',
            company: row['Company'] || '',
            businessType: row['Business Type'] || 'General Store',
            source: row['Source'] || 'Import',
            score: parseInt(row['Lead Score']) || 0,
            estimatedValue: parseFloat(row['Estimated Value']) || 0,
            stage: row['Stage'] || 'New',
            assignedTo: row['Assigned To'] || '',
            createdDate: row['Created Date'] || new Date().toISOString().split('T')[0],
            lastActivity: row['Last Activity'] || new Date().toISOString().split('T')[0],
            nextFollowUp: row['Next Follow Up'] || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            priority: row['Priority'] || 'Medium',
            address: row['Address'] || '',
            area: row['Area'] || '',
            city: row['City'] || '',
            state: row['State'] || '',
            pincode: row['PIN Code'] || '',
            gstNumber: row['GST Number'] || '',
            businessYears: parseInt(row['Business Years']) || 0,
            monthlyTurnover: parseFloat(row['Monthly Turnover']) || 0,
            currentSuppliers: row['Current Suppliers'] ? row['Current Suppliers'].split(',').map(s => s.trim()) : [],
            painPoints: row['Pain Points'] ? row['Pain Points'].split(',').map(p => p.trim()) : [],
            requirements: row['Requirements'] ? row['Requirements'].split(',').map(r => r.trim()) : [],
            products: row['Products'] ? row['Products'].split(',').map(p => p.trim()) : [],
            preferredBrands: row['Preferred Brands'] ? row['Preferred Brands'].split(',').map(b => b.trim()) : [],
            paymentPreference: row['Payment Preference'] ? row['Payment Preference'].split(',').map(p => p.trim()) : [],
            creditRequirement: parseFloat(row['Credit Requirement']) || 0,
            notes: row['Notes'] || '',
            interactions: [],
            status: row['Status'] || 'Warm Lead',
            segment: row['Segment'] || 'SMB',
            language: row['Language'] || 'Hindi',
            referredBy: row['Referred By'] || '',
            competitorAnalysis: {
              currentSupplier: '',
              pricingGap: '',
              serviceGaps: []
            }
          };
        });

        const validLeads = importedLeads.filter(lead => 
          lead.company && (lead.phone || lead.email || lead.name)
        );

        const newLeads = validLeads.filter(lead => 
          !isDuplicateLead(lead, leads)
        );

        if (newLeads.length === 0) {
          const duplicateCount = validLeads.length - newLeads.length;
          alert(`❌ All ${duplicateCount} leads in the file already exist. No new leads were added.`);
          event.target.value = '';
          return;
        }

        const duplicateCount = validLeads.length - newLeads.length;
        const previewText = newLeads.slice(0, 3).map(lead => 
          `• ${lead.name} - ${lead.company}`
        ).join('');

        const extraCount = newLeads.length > 3 ? `
... and ${newLeads.length - 3} more` : '';
        const duplicateMessage = duplicateCount > 0 ? `

⚠️ ${duplicateCount} duplicate leads will be skipped` : '';

        const dialogMessage = 
          `📊 Found ${validLeads.length} leads in the file.
` +
          `✅ ${newLeads.length} new leads will be added.${duplicateMessage}

` +
          'New leads' +
          previewText +
          extraCount;

        const userConfirmed = window.confirm(dialogMessage);
        
        if (!userConfirmed) {
          alert('❌ Import cancelled. No leads were added.');
          event.target.value = '';
          return;
        }

        setLeads(prev => [...prev, ...newLeads]);
        alert(`✅ Successfully imported ${newLeads.length} leads!${duplicateCount > 0 ? ` ${duplicateCount} duplicates skipped.` : ''}`);
        event.target.value = '';

      } catch (error) {
        console.error('Import error:', error);
        alert(`❌ Error importing file: ${error.message}

Please check the file format and try again.`);
        event.target.value = '';
      }
    };

    reader.onerror = () => {
      alert('❌ Error reading file. Please try again.');
      event.target.value = '';
    };

    reader.readAsArrayBuffer(file);
  };

  const LeadCard = ({ lead }) => (
    <div className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
            {lead.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{lead.name}</h3>
            <p className="text-sm text-gray-500">{lead.company}</p>
            <p className="text-xs text-gray-400">{lead.businessType}</p>
          </div>
        </div>
        
<div className="relative">
  <button
    onClick={(e) => {
      handleClickInside(e);
      setShowOptions(showOptions === lead.id ? null : lead.id);
    }}
    className="p-1 text-gray-400 hover:text-gray-600"
  >
    <MoreVertical className="h-4 w-4" />
  </button>

  {showOptions === lead.id && (
    <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded-lg shadow-md z-10">
      <button
        onClick={(e) => {
          handleClickInside(e);
          handleEditLead(lead);
          setShowOptions(null);
        }}
        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        <PenSquare className="h-4 w-4 inline-block mr-2" />
        <span>Edit</span> 
      </button>
      <button
        onClick={(e) => {
          handleClickInside(e);
          handleDeleteLead(lead.id);
        }}
        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
      >
        <Trash className="h-4 w-4 inline-block mr-2" />
        <span>Delete</span> 
      </button>
    </div>
  )}
</div>
      </div>

      {/* Lead Score */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Lead Score</span>
          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getScoreColor(lead.score)}`}>
            {lead.score}/100
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${
              lead.score >= 80 ? 'bg-green-500' : 
              lead.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{width: `${lead.score}%`}}
          ></div>
        </div>
      </div>

      {/* Status, Stage, Priority */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[lead.status] || 'bg-gray-100 text-gray-800'}`}>
          {lead.status}
        </span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${stageColors[lead.stage]}`}>
          {lead.stage}
        </span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[lead.priority]}`}>
          {lead.priority}
        </span>
      </div>

      {/* Contact Info */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <Phone className="h-4 w-4 mr-2 text-blue-500" />
          {lead.phone}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <MessageSquare className="h-4 w-4 mr-2 text-green-500" />
          WhatsApp: {lead.whatsapp}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Mail className="h-4 w-4 mr-2 text-purple-500" />
          {lead.email}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="h-4 w-4 mr-2 text-red-500" />
          {lead.area}, {lead.city}
        </div>
      </div>

      {/* Business Info */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500">Estimated Value</p>
          <p className="font-semibold text-green-600">{formatIndianCurrency(lead.estimatedValue)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500\">Monthly Turnover</p>
          <p className="font-semibold text-blue-600">{formatIndianCurrency(lead.monthlyTurnover)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Business Years</p>
          <p className="font-semibold text-purple-600">{lead.businessYears} years</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Credit Need</p>
          <p className="font-semibold text-orange-600">{formatIndianCurrency(lead.creditRequirement)}</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Last Activity:</span>
          <span className="font-medium">{new Date(lead.lastActivity).toLocaleDateString('en-IN')}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Next Follow-up:</span>
          <span className="font-medium text-blue-600">{new Date(lead.nextFollowUp).toLocaleDateString('en-IN')}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Days in Stage:</span>
          <span className="font-medium">{calculateDaysInStage(lead.lastActivity)} days</span>
        </div>
      </div>

      {/* Source and Assigned */}
      <div className="text-sm text-gray-600 mb-4">
        <div className="flex items-center justify-between mb-1">
          <span>Source:</span>
          <span className="font-medium">{lead.source}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Assigned to:</span>
          <span className="font-medium">{lead.assignedTo}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={() => setSelectedLead(lead)}
          className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm font-medium"
        >
          View Details
        </button>
        <button className="px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100">
          <Phone className="h-4 w-4" />
        </button>
        <button className="px-3 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100">
          <MessageSquare className="h-4 w-4" />
        </button>
        <button className="px-3 py-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100">
          <Calendar className="h-4 w-4" />
        </button>
      </div>
    </div>
  );

  // Summary Cards
  const totalLeads = leads.length;
  const hotLeads = leads.filter(l => l.status === 'Hot Lead').length;
  const totalValue = leads.reduce((sum, l) => sum + l.estimatedValue, 0);
  const avgScore = leads.length > 0 ? Math.round(leads.reduce((sum, l) => sum + l.score, 0) / leads.length) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hidden file input for import */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".xlsx, .xls, .csv"
        style={{ display: 'none' }}
      />

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Indian Retail Leads Management</h1>
              <p className="text-gray-600">Convert prospects into customers for Indian retail businesses</p>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleImport}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2"
              >
                <Upload className="h-4 w-4" />
                <span>Import</span>
              </button>
              <button 
                onClick={handleExport}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
              <button
                onClick={() => {
                  resetFormData();
                  setActiveFormTab('basic');
                  setShowAddLead(true);
                }}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-2"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Add Lead</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Leads</p>
                <p className="text-2xl font-bold">{totalLeads}</p>
                <p className="text-blue-100 text-xs mt-1">Hot: {hotLeads}</p>
              </div>
              <Users className="h-8 w-8 text-blue-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Pipeline Value</p>
                <p className="text-2xl font-bold">{formatIndianCurrency(totalValue)}</p>
                <p className="text-green-100 text-xs mt-1">Potential Revenue</p>
              </div>
              <IndianRupee className="h-8 w-8 text-green-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 rounded-xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm">Avg Lead Score</p>
                <p className="text-2xl font-bold">{avgScore}/100</p>
                <p className="text-yellow-100 text-xs mt-1">Quality Rating</p>
              </div>
              <Target className="h-8 w-8 text-yellow-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Conversion Rate</p>
                <p className="text-2xl font-bold">23.5%</p>
                <p className="text-purple-100 text-xs mt-1">This Month</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-200" />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search leads by name, company, phone, or location..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filterStage}
                onChange={(e) => setFilterStage(e.target.value)}
              >
                {stages.map(stage => (
                  <option key={stage} value={stage}>{stage}</option>
                ))}
              </select>

              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
              >
                {priorities.map(priority => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>

              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filterBusinessType}
                onChange={(e) => setFilterBusinessType(e.target.value)}
              >
                {businessTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-600">
              Showing {filteredLeads.length} of {leads.length} leads
            </p>
          </div>
        </div>

        {/* Leads Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredLeads.map((lead) => (
            <LeadCard key={lead.id} lead={lead} />
          ))}
        </div>
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-semibold">Lead Details - {selectedLead.name}</h3>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-8">
              {/* Lead Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Lead Score</p>
                  <p className="text-2xl font-bold text-blue-600">{selectedLead.score}/100</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">Estimated Value</p>
                  <p className="text-2xl font-bold text-green-600">{formatIndianCurrency(selectedLead.estimatedValue)}</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-gray-600">Days in Pipeline</p>
                  <p className="text-2xl font-bold text-purple-600">{calculateDaysInStage(selectedLead.createdDate)}</p>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <p className="text-sm text-gray-900">{selectedLead.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <p className="text-sm text-gray-900">{selectedLead.company}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <p className="text-sm text-gray-900">{selectedLead.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1\">Email</label>
                    <p className="text-sm text-gray-900">{selectedLead.email}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <p className="text-sm text-gray-900">{selectedLead.address}</p>
                  </div>
                </div>
              </div>

              {/* Business Information */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Business Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4\">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
                    <p className="text-sm text-gray-900">{selectedLead.businessType}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Years</label>
                    <p className="text-sm text-gray-900">{selectedLead.businessYears} years</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Turnover</label>
                    <p className="text-sm text-gray-900">{formatIndianCurrency(selectedLead.monthlyTurnover)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">GST Number</label>
                    <p className="text-sm text-gray-900">{selectedLead.gstNumber || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Credit Requirement</label>
                    <p className="text-sm text-gray-900">{formatIndianCurrency(selectedLead.creditRequirement)}</p>
                  </div>
                  <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Preference</label>
  <div className="flex flex-wrap gap-2">
    {Array.isArray(selectedLead.paymentPreference) ? (
      selectedLead.paymentPreference.map((method, index) => (
        <span key={index} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
          {method}
        </span>
      ))
    ) : (
      <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
        {selectedLead.paymentPreference}
      </span>
    )}
  </div>
</div>
                </div>
              </div>

              {/* Requirements & Pain Points */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Pain Points</h4>
                  <div className="space-y-2">
                    {selectedLead.painPoints.map((point, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <AlertCircle className="h-4 w-4 text-red-500" />
                        <span className="text-sm text-gray-900">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Requirements</h4>
                  <div className="space-y-2">
                    {selectedLead.requirements.map((req, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-900">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Products & Brands */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Product Interests</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Categories</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedLead.products.map((product, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Brands</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedLead.preferredBrands.map((brand, index) => (
                        <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                          {brand}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactions Timeline */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Interaction History</h4>
                <div className="space-y-4">
                  {selectedLead.interactions.map((interaction, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-gray-900">{interaction.type}</h5>
                        <span className="text-sm text-gray-500">{new Date(interaction.date).toLocaleDateString('en-IN')}</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-1">{interaction.summary}</p>
                      <p className="text-sm font-medium text-blue-600">Next: {interaction.nextAction}</p>
                      <p className="text-xs text-gray-500">By: {interaction.agent}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Notes</h4>
                <p className="text-sm text-gray-900 bg-gray-50 p-4 rounded-lg">{selectedLead.notes}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Lead Modal */}
      {showAddLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-6 border-b border-gray-200 flex items-center justify-between z-10">
              <h3 className="text-xl font-semibold">
                {editingLead ? `Edit Lead - ${editingLead.name}` : 'Add New Lead'}
              </h3>
              <button
                onClick={() => {
                  setShowAddLead(false);
                  setActiveFormTab('basic');
                  setEditingLead(null);
                  resetFormData();
                }}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Form Tabs */}
            <div className="sticky top-[73px] bg-white border-b border-gray-200 px-6 z-10">
              <div className="flex space-x-1 overflow-x-auto">
                <button
                  onClick={() => setActiveFormTab('basic')}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeFormTab === 'basic'
                      ? 'border-purple-600 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Basic Info
                </button>
                <button
                  onClick={() => setActiveFormTab('business')}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeFormTab === 'business'
                      ? 'border-purple-600 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Business Details
                </button>
                <button
                  onClick={() => setActiveFormTab('requirements')}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeFormTab === 'requirements'
                      ? 'border-purple-600 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Requirements
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Basic Information Tab */}
              {activeFormTab === 'basic' && (
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        required
                        placeholder="+91 98765 43210"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
                      <input
                        type="tel"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleFormChange}
                        placeholder="+91 98765 43210"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleFormChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
                      <select
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="\">Select Type</option>
                        <option value="General Store">General Store</option>
                        <option value="Kirana Store">Kirana Store</option>
                        <option value="Mini Mart">Mini Mart</option>
                        <option value="Super Market">Super Market</option>
                        <option value="Wholesale">Wholesale</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                      <input
                        type="text"
                        name="source"
                        value={formData.source}
                        onChange={handleFormChange}
                        placeholder="e.g. WhatsApp, Walk-in, Referral"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Lead Score (0-100)</label>
                      <input
                        type="number"
                        name="score"
                        value={formData.score}
                        onChange={handleFormChange}
                        min="0"
                        max="100"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Value (₹)</label>
                      <input
                        type="number"
                        name="estimatedValue"
                        value={formData.estimatedValue}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Stage</label>
                      <select
                        name="stage"
                        value={formData.stage}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Qualified">Qualified</option>
                        <option value="Proposal Sent">Proposal Sent</option>
                        <option value="Negotiation">Negotiation</option>
                        <option value="Won">Won</option>
                        <option value="Lost">Lost</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                      <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                      <input
                        type="text"
                        name="assignedTo"
                        value={formData.assignedTo}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="Hot Lead">Hot Lead</option>
                        <option value="Warm Lead">Warm Lead</option>
                        <option value="Cold Lead">Cold Lead</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Segment</label>
                      <input
                        type="text"
                        name="segment"
                        value={formData.segment}
                        onChange={handleFormChange}
                        placeholder="e.g. SMB, Enterprise"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Language</label>
  <select
    name="language"
    value={formData.language}
    onChange={handleFormChange}
    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
  >
    {indianLanguages.map(lang => (
      <option key={lang} value={lang}>{lang}</option>
    ))}
  </select>
</div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Referred By</label>
                      <input
                        type="text"
                        name="referredBy"
                        value={formData.referredBy}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
                      <input
                        type="text"
                        name="area"
                        value={formData.area}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">PIN Code</label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Business Details Tab */}
              {activeFormTab === 'business' && (
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Business Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">GST Number</label>
                      <input
                        type="text"
                        name="gstNumber"
                        value={formData.gstNumber}
                        onChange={handleFormChange}
                        placeholder="GSTIN07ABCDE1234F1Z5"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Business Years</label>
                      <input
                        type="number"
                        name="businessYears"
                        value={formData.businessYears}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1\">Monthly Turnover</label>
                      <input
                        type="number"
                        name="monthlyTurnover"
                        value={formData.monthlyTurnover}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div className="md:col-span-2">
  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Preference</label>
  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
    {paymentPreferences.map(method => (
      <label key={method} className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={formData.paymentPreference.includes(method)}
          onChange={() => handlePaymentPreferenceChange(method)}
          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
        />
        <span className="text-sm text-gray-700">{method}</span>
      </label>
    ))}
  </div>
  {formData.paymentPreference.length === 0 && (
    <p className="text-xs text-red-500 mt-1">Please select at least one payment preference</p>
  )}
</div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1\">Credit Requirement</label>
                      <input
                        type="number"
                        name="creditRequirement"
                        value={formData.creditRequirement}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1\">Current Suppliers</label>
                    <input
                      type="text"
                      name="currentSuppliers"
                      value={formData.currentSuppliers}
                      onChange={handleFormChange}
                      placeholder="Supplier 1, Supplier 2, Supplier 3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1\">Products</label>
                    <input
                      type="text"
                      name="products"
                      value={formData.products}
                      onChange={handleFormChange}
                      placeholder="Groceries, Electronics, Clothing"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1\">Preferred Brands</label>
                    <input
                      type="text"
                      name="preferredBrands"
                      value={formData.preferredBrands}
                      onChange={handleFormChange}
                      placeholder="Brand 1, Brand 2, Brand 3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              {/* Requirements Tab */}
              {activeFormTab === 'requirements' && (
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Requirements & Pain Points</h4>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pain Points</label>
                    <textarea
                      name="painPoints"
                      value={formData.painPoints}
                      onChange={handleFormChange}
                      rows={3}
                      placeholder="Pain point 1, Pain point 2, Pain poin"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Requirements </label>
                    <textarea
                      name="requirements"
                      value={formData.requirements}
                      onChange={handleFormChange}
                      rows={3}
                      placeholder="Requirement 1, Requirement 2, Requirement 3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleFormChange}
                      rows={5}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              {/* Form Actions */}
              <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddLead(false);
                    setActiveFormTab('basic');
                    setEditingLead(null);
                    resetFormData();
                  }}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-2"
                >
                <PlusCircle className="h-4 w-4" />
                <span>{editingLead ? 'Update Lead' : 'Add Lead'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndianRetailLeadsManagement;
