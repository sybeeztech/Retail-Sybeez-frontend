import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Download, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  IndianRupee,
  Eye,
  Edit,
  Trash2,
  X,
  MoreVertical,
  Star,
  UserPlus,
  FileText,
  Activity,
  ShoppingCart,
  Package,
  Truck,
  CreditCard,
  Smartphone,
  Store,
  Home,
  Building2,
  TrendingUp,
  Target,
  Gift,
  Percent,
  Clock,
  AlertCircle,
  CheckCircle,
  MessageSquare,
  Bell,
  PenSquare,
  Trash,
  Heart,
  Globe,
  Briefcase,
  IdCard
} from 'lucide-react';

const IndianRetailCRM = () => {

 // Use ref for search term to avoid re-renders
  const searchTermRef = useRef('');
  const [searchTrigger, setSearchTrigger] = useState(0); // Force updates when needed


  const [activeTab, setActiveTab] = useState('dashboard');
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@gmail.com',
      phone: '+91 98765 43210',
      whatsapp: '+91 98765 43210',
      company: 'Kumar General Store',
      location: 'Connaught Place, New Delhi',
      address: 'Shop No. 45, Block A, Connaught Place, New Delhi - 110001',
      pincode: '110001',
      state: 'Delhi',
      gst: 'GSTIN07ABCDE1234F1Z5',
      businessType: 'General Store',
      value: 285000,
      lastPurchase: 125000,
      totalOrders: 24,
      status: 'VIP Customer',
      lastContact: '2024-10-07',
      joiningDate: '2023-05-15',
      source: 'Walk-in',
      tags: ['VIP', 'High Value', 'Regular'],
      paymentMethods: ['Cash', 'UPI', 'Card'],
      preferredPayment: 'UPI',
      creditLimit: 50000,
      outstandingAmount: 15000,
      loyaltyPoints: 2850,
      segment: 'Premium',
      language: 'Hindi',
      avatar: null,
      birthday: '1975-08-20',
      anniversary: '2000-12-10',
      family: {
        spouse: 'Sunita Kumar',
        children: 2
      },
      preferences: {
        categories: ['Groceries', 'Home Care', 'Personal Care'],
        brands: ['Patanjali', 'ITC', 'Hindustan Unilever'],
        offers: 'Festival Discounts'
      }
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya.sharma@hotmail.com',
      phone: '+91 87654 32109',
      whatsapp: '+91 87654 32109',
      company: 'Sharma Kirana Store',
      location: 'Lajpat Nagar, New Delhi',
      address: 'Shop No. 12, Main Market, Lajpat Nagar IV, New Delhi - 110024',
      pincode: '110024',
      state: 'Delhi',
      gst: 'GSTIN07FGHIJ5678K2L6',
      businessType: 'Kirana Store',
      value: 150000,
      lastPurchase: 45000,
      totalOrders: 18,
      status: 'Regular Customer',
      lastContact: '2024-10-06',
      joiningDate: '2023-08-22',
      source: 'Referral',
      tags: ['Regular', 'Local'],
      paymentMethods: ['Cash', 'UPI'],
      preferredPayment: 'Cash',
      creditLimit: 25000,
      outstandingAmount: 8000,
      loyaltyPoints: 1500,
      segment: 'Standard',
      language: 'English',
      avatar: null,
      birthday: '1982-03-15',
      preferences: {
        categories: ['Groceries', 'Snacks', 'Beverages'],
        brands: ['Amul', 'Britannia', 'Parle'],
        offers: 'Bulk Discounts'
      }
    },
    {
      id: 3,
      name: 'Mohammed Ali',
      email: 'mohammed.ali@yahoo.com',
      phone: '+91 76543 21098',
      whatsapp: '+91 76543 21098',
      company: 'Ali Super Market',
      location: 'Chandni Chowk, Delhi',
      address: '23, Chandni Chowk, Old Delhi - 110006',
      pincode: '110006',
      state: 'Delhi',
      gst: 'GSTIN07KLMNO9012P3Q7',
      businessType: 'Super Market',
      value: 425000,
      lastPurchase: 185000,
      totalOrders: 32,
      status: 'Premium Customer',
      lastContact: '2024-10-08',
      joiningDate: '2022-12-10',
      source: 'Direct',
      tags: ['Premium', 'Bulk Buyer', 'Long-term'],
      paymentMethods: ['Cash', 'UPI', 'Card', 'Credit'],
      preferredPayment: 'UPI',
      creditLimit: 100000,
      outstandingAmount: 25000,
      loyaltyPoints: 4250,
      segment: 'Premium',
      language: 'Hindi',
      avatar: null,
      birthday: '1970-11-05',
      preferences: {
        categories: ['Groceries', 'Electronics', 'Clothing'],
        brands: ['Samsung', 'LG', 'Sony'],
        offers: 'Volume Discounts'
      }
    }
  ]);

  //const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterSegment, setFilterSegment] = useState('All');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showAddCustomer, setShowAddCustomer] = useState(false);

  const [showOptions, setShowOptions] = useState(null); // which customer's options menu is open
  const [editingCustomer, setEditingCustomer] = useState(null); // for edit mode

  const [errors, setErrors] = useState({});

  const [activeFormSection, setActiveFormSection] = useState('personal');

const [formData, setFormData] = useState({
  // Personal Information
  firstName: '',
  lastName: '',
  displayName: '',
  email: '',
  phone: '',
  mobile: '',
  whatsapp: '',
  alternatePhone: '',
  birthday: '',
  anniversary: '',
  preferredLanguage: 'Hindi',
  family: {
    spouse: '',
    children: '',
    spousePhone: ''
  },
  
  // Business Information
  company: '',
  title: '',
  department: '',
  businessType: '',
  gstNumber: '',
  panNumber: '',
  aadharNumber: '',
  businessLicense: '',
  businessDetails: {
    establishedYear: '',
    employeeCount: '',
    monthlyTurnover: '',
    mainProducts: [],
    suppliers: [],
    competitors: []
  },
  
  // Address Information
  address: '',
  area: '',
  city: '',
  state: '',
  pincode: '',
  country: 'India',
  
  // Contact & Social
  preferredContact: 'Phone',
  socialProfiles: {
    whatsapp: '',
    facebook: '',
    instagram: ''
  },
  
  // Financial Information
  status: 'Active',
  customerSegment: 'Standard',
  creditLimit: '',
  outstandingAmount: '',
  paymentTerms: '30 days',
  preferredPaymentMode: 'UPI',
  loyaltyMember: false,
  loyaltyPoints: '',
  totalPurchases: '',
  averageOrderValue: '',
  lastOrderAmount: '',
  totalOrders: '',
  paymentMethods: [],
  
  // Preferences & Additional Info
  source: 'Walk-in',
  referredBy: '',
  tags: [],
  notes: '',
  lastContact: '',
  lastPurchase: '',
  nextFollowUp: '',
  joiningDate: '',
  preferences: {
    categories: [],
    brands: [],
    offerTypes: [],
    communicationTime: 'Morning',
    visitingDays: []
  }
});

 
  const handleInputChange = (e) => {
  const { name, value, type, checked } = e.target;
  
  // Handle nested objects (e.g., family.spouse, businessDetails.establishedYear)
  if (name.includes('.')) {
    const [parent, child] = name.split('.');
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [child]: type === 'checkbox' ? checked : value
      }
    }));
  } else {
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }
  
  // Clear error for this field if it exists
  if (errors[name]) {
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  }
};
  const handlePaymentMethodChange = (method) => {
    setFormData(prev => ({
      ...prev,
      paymentMethods: prev.paymentMethods.includes(method)
        ? prev.paymentMethods.filter(m => m !== method)
        : [...prev.paymentMethods, method]
    }));
  };

  const validateForm = () => {
  const newErrors = {};
  
  // Required fields from new form structure
  if (!formData.firstName?.trim()) newErrors.firstName = 'First name is required';
  if (!formData.lastName?.trim()) newErrors.lastName = 'Last name is required';
  if (!formData.email?.trim()) newErrors.email = 'Email is required';
  if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
  if (!formData.phone?.trim()) newErrors.phone = 'Phone is required';
  if (!formData.mobile?.trim()) newErrors.mobile = 'Mobile is required';
  if (!formData.company?.trim()) newErrors.company = 'Company is required';
  if (!formData.businessType?.trim()) newErrors.businessType = 'Business type is required';
  if (!formData.address?.trim()) newErrors.address = 'Address is required';
  if (!formData.city?.trim()) newErrors.city = 'City is required';
  if (!formData.state?.trim()) newErrors.state = 'State is required';
  if (!formData.pincode?.trim()) newErrors.pincode = 'Pincode is required';
  if (formData.paymentMethods?.length === 0) newErrors.paymentMethods = 'Select at least one payment method';
  
  return newErrors;
};


  const handleAddCustomer = () => {
  const newErrors = validateForm();
  
  if (Object.keys(newErrors).length === 0) {
    // Create a customer object that matches your existing data structure
    const newCustomer = {
      id: Math.max(...customers.map(c => c.id), 0) + 1,
      // Use the existing field names from your sample data
      name: formData.displayName || `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      whatsapp: formData.whatsapp || formData.phone,
      company: formData.company,
      location: `${formData.area}, ${formData.city}`,
      address: formData.address,
      pincode: formData.pincode,
      state: formData.state,
      gst: formData.gstNumber || 'GST6452013F1Z5',
      businessType: formData.businessType,
      value: parseInt(formData.totalPurchases) || 0,
      lastPurchase: parseInt(formData.lastOrderAmount) || 0,
      totalOrders: parseInt(formData.totalOrders) || 0,
      status: formData.status,
      lastContact: new Date().toISOString().split('T')[0],
      joiningDate: formData.joiningDate || new Date().toISOString().split('T')[0],
      source: formData.source,
      tags: formData.tags || [],
      paymentMethods: formData.paymentMethods || [],
      preferredPayment: formData.preferredPaymentMode || 'UPI',
      creditLimit: parseInt(formData.creditLimit) || 0,
      outstandingAmount: parseInt(formData.outstandingAmount) || 0,
      loyaltyPoints: parseInt(formData.loyaltyPoints) || 0,
      segment: formData.customerSegment,
      language: formData.preferredLanguage,
      avatar: null,
      birthday: formData.birthday,
      anniversary: formData.anniversary,
      family: formData.family || {},
      preferences: formData.preferences || {
        categories: [],
        brands: [],
        offers: ''
      }
    };
    
    console.log('Adding new customer:', newCustomer); // Debug log
    
    setCustomers(prev => [newCustomer, ...prev]);

    // RESET FILTERS AFTER ADDING CUSTOMER
    setFilterStatus('All');
    setFilterSegment('All');

    setShowAddCustomer(false);
    setActiveFormSection('personal');
    
    // Reset form data
    setFormData({
      firstName: '',
      lastName: '',
      displayName: '',
      email: '',
      phone: '',
      mobile: '',
      whatsapp: '',
      alternatePhone: '',
      birthday: '',
      anniversary: '',
      preferredLanguage: 'Hindi',
      family: {
        spouse: '',
        children: '',
        spousePhone: ''
      },
      company: '',
      title: '',
      department: '',
      businessType: '',
      gstNumber: '',
      panNumber: '',
      aadharNumber: '',
      businessLicense: '',
      businessDetails: {
        establishedYear: '',
        employeeCount: '',
        monthlyTurnover: '',
        mainProducts: [],
        suppliers: [],
        competitors: []
      },
      address: '',
      area: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India',
      preferredContact: 'Phone',
      socialProfiles: {
        whatsapp: '',
        facebook: '',
        instagram: ''
      },
      status: 'Active',
      customerSegment: 'Standard',
      creditLimit: '',
      outstandingAmount: '',
      paymentTerms: '30 days',
      preferredPaymentMode: 'UPI',
      loyaltyMember: false,
      loyaltyPoints: '',
      totalPurchases: '',
      averageOrderValue: '',
      lastOrderAmount: '',
      totalOrders: '',
      paymentMethods: [],
      source: 'Walk-in',
      referredBy: '',
      tags: [],
      notes: '',
      lastContact: '',
      lastPurchase: '',
      nextFollowUp: '',
      joiningDate: '',
      preferences: {
        categories: [],
        brands: [],
        offerTypes: [],
        communicationTime: 'Morning',
        visitingDays: []
      }
    });
  } else {
    setErrors(newErrors);
    console.log('Form errors:', newErrors); // Debug log
  }
};

  // Export to Excel functionality
  const exportToExcelAdvanced = async () => {
  try {
    // Dynamically import xlsx library
    const XLSX = await import('xlsx');
    const { utils, writeFile } = XLSX;
    
    // Create workbook
    const wb = utils.book_new();

    // ==================== DASHBOARD DATA WITH STATISTICAL ANALYSIS ====================
    
    // Enhanced Dashboard Metrics with Statistical Analysis
    const dashboardData = [
      ['INDIAN RETAIL CRM - DASHBOARD REPORT', '', '', '', ''],
      ['Generated On', new Date().toLocaleDateString('en-IN'), '', '', ''],
      ['', '', '', '', ''],
      ['KEY PERFORMANCE INDICATORS (KPIs)', '', '', 'STATISTICAL ANALYSIS', ''],
      ['Metric', 'Value', 'Trend', 'Benchmark', 'Performance'],
      
      // Financial Metrics
      ['Total Revenue', `₹${crmMetrics.totalRevenue.toLocaleString('en-IN')}`, 
        crmMetrics.totalRevenue > 1000000 ? '📈 High' : '📊 Average', 
        '₹1,000,000', 
        crmMetrics.totalRevenue > 1000000 ? '✅ Exceeding' : '🟡 Meeting'],
      
      ['Average Order Value', `₹${Math.round(crmMetrics.averageOrderValue).toLocaleString('en-IN')}`, 
        crmMetrics.averageOrderValue > 10000 ? '📈 High' : '📊 Average',
        '₹10,000',
        crmMetrics.averageOrderValue > 10000 ? '✅ Exceeding' : '🟡 Meeting'],
      
      ['Total Outstanding', `₹${crmMetrics.totalOutstanding.toLocaleString('en-IN')}`, 
        crmMetrics.totalOutstanding < 50000 ? '📉 Low Risk' : '⚠️ Monitor',
        '₹50,000',
        crmMetrics.totalOutstanding < 50000 ? '✅ Good' : '🟡 Watch'],
      
      // Customer Metrics
      ['Total Customers', crmMetrics.totalCustomers,
        crmMetrics.totalCustomers > 100 ? '📈 Growing' : '📊 Stable',
        '100+',
        crmMetrics.totalCustomers > 100 ? '✅ Good' : '🟡 Average'],
      
      ['Active Customers', crmMetrics.activeCustomers,
        `${Math.round((crmMetrics.activeCustomers / crmMetrics.totalCustomers) * 100)}% Active Rate`,
        '80%',
        (crmMetrics.activeCustomers / crmMetrics.totalCustomers) > 0.8 ? '✅ Healthy' : '🟡 Needs Attention'],
      
      ['Premium Customers', crmMetrics.premiumCustomers,
        `${Math.round((crmMetrics.premiumCustomers / crmMetrics.totalCustomers) * 100)}% of Total`,
        '20%',
        (crmMetrics.premiumCustomers / crmMetrics.totalCustomers) > 0.2 ? '✅ Excellent' : '🟡 Can Improve'],
      
      // Engagement Metrics
      ['Loyalty Members', crmMetrics.loyaltyMembers,
        `${Math.round((crmMetrics.loyaltyMembers / crmMetrics.totalCustomers) * 100)}% Penetration`,
        '60%',
        (crmMetrics.loyaltyMembers / crmMetrics.totalCustomers) > 0.6 ? '✅ Strong' : '🟡 Moderate'],
      
      ['UPI Users', crmMetrics.upiUsers,
        `${Math.round((crmMetrics.upiUsers / crmMetrics.totalCustomers) * 100)}% Adoption`,
        '70%',
        (crmMetrics.upiUsers / crmMetrics.totalCustomers) > 0.7 ? '✅ High' : '🟡 Medium'],
      
      ['Credit Customers', crmMetrics.creditCustomers,
        `${Math.round((crmMetrics.creditCustomers / crmMetrics.totalCustomers) * 100)}% of Base`,
        '30%',
        (crmMetrics.creditCustomers / crmMetrics.totalCustomers) < 0.3 ? '✅ Controlled' : '⚠️ High'],
      
      ['Total Orders', crmMetrics.totalOrders,
        `Avg ${Math.round(crmMetrics.totalOrders / crmMetrics.totalCustomers)} per customer`,
        '15+',
        (crmMetrics.totalOrders / crmMetrics.totalCustomers) > 15 ? '✅ Active' : '🟡 Normal'],
      
      ['Growth Rate', '+23.5%', 'QoQ Growth', '15%', '✅ Exceeding'],
      
      ['', '', '', '', ''],
      ['BUSINESS INTELLIGENCE INSIGHTS', '', '', '', ''],
      ['Customer Lifetime Value', `₹${Math.round(crmMetrics.totalRevenue / crmMetrics.totalCustomers).toLocaleString('en-IN')}`, 'Per Customer', 'Industry Avg: ₹15,000', '✅ Above Avg'],
      ['Order Frequency', `${Math.round(crmMetrics.totalOrders / crmMetrics.totalCustomers)}`, 'Orders/Customer', 'Target: 12', '✅ Good'],
      ['Collection Efficiency', `${Math.round((1 - crmMetrics.totalOutstanding / crmMetrics.totalRevenue) * 100)}%`, 'Collection Rate', 'Target: 85%', '🟡 Improving'],
      ['Premium Customer Ratio', `${Math.round((crmMetrics.premiumCustomers / crmMetrics.totalCustomers) * 100)}%`, 'Premium %', 'Target: 25%', '✅ Achieved'],
    ];

    // ==================== CUSTOMERS DATA WITH COMPLETE INFORMATION ====================
    
    const customersData = customers.map(customer => ({
      // Identification
      'Customer ID': customer.id,
      'Full Name': customer.displayName || customer.name,
      'Company Name': customer.company,
      
      // Contact Information
      'Primary Phone': customer.phone,
      'Mobile': customer.mobile,
      'WhatsApp': customer.whatsapp,
      'Alternate Phone': customer.alternatePhone,
      'Email Address': customer.email,
      
      // Business Details
      'Business Type': customer.businessType,
      'Title/Position': customer.title,
      'Department': customer.department,
      'GST Number': customer.gstNumber,
      'PAN Number': customer.panNumber,
      'Business License': customer.businessLicense,
      
      // Address Information
      'Complete Address': customer.address,
      'Area/Locality': customer.area,
      'City': customer.city,
      'State': customer.state,
      'PIN Code': customer.pincode,
      'Country': customer.country,
      
      // Financial Information
      'Customer Status': customer.status,
      'Customer Segment': customer.customerSegment,
      'Total Purchase Value (₹)': customer.value,
      'Total Orders': customer.totalOrders,
      'Average Order Value (₹)': customer.averageOrderValue,
      'Last Order Amount (₹)': customer.lastOrderAmount,
      'Credit Limit (₹)': customer.creditLimit,
      'Outstanding Amount (₹)': customer.outstandingAmount,
      'Payment Terms': customer.paymentTerms,
      'Preferred Payment Mode': customer.preferredPaymentMode,
      'Payment Methods': Array.isArray(customer.paymentMethods) ? customer.paymentMethods.join(', ') : customer.paymentMethods,
      
      // Loyalty & Engagement
      'Loyalty Member': customer.loyaltyMember ? 'Yes' : 'No',
      'Loyalty Points': customer.loyaltyPoints,
      'Preferred Contact Method': customer.preferredContact,
      'Preferred Language': customer.preferredLanguage,
      
      // Dates
      'Joining Date': customer.joiningDate,
      'Last Contact Date': customer.lastContact,
      'Last Purchase Date': customer.lastPurchase,
      'Next Follow-up Date': customer.nextFollowUp,
      'Birthday': customer.birthday,
      'Anniversary': customer.anniversary,
      
      // Business Intelligence
      'Business Age (Years)': customer.businessDetails ? new Date().getFullYear() - customer.businessDetails.establishedYear : 'N/A',
      'Employee Count': customer.businessDetails?.employeeCount,
      'Monthly Turnover (₹)': customer.businessDetails?.monthlyTurnover,
      'Main Products': customer.businessDetails?.mainProducts?.join('; '),
      'Key Suppliers': customer.businessDetails?.suppliers?.join('; '),
      'Competitors': customer.businessDetails?.competitors?.join('; '),
      
      // Customer Preferences
      'Preferred Categories': customer.preferences?.categories?.join('; '),
      'Preferred Brands': customer.preferences?.brands?.join('; '),
      'Preferred Offer Types': customer.preferences?.offerTypes?.join('; '),
      'Best Communication Time': customer.preferences?.communicationTime,
      'Preferred Visiting Days': customer.preferences?.visitingDays?.join('; '),
      
      // Family Information
      'Spouse Name': customer.family?.spouse,
      'Number of Children': customer.family?.children,
      'Spouse Contact': customer.family?.spousePhone,
      
      // Source & Tags
      'Customer Source': customer.source,
      'Referred By': customer.referredBy,
      'Customer Tags': Array.isArray(customer.tags) ? customer.tags.join('; ') : customer.tags,
      'Notes': customer.notes,
      
      // Performance Indicators
      'Days Since Last Contact': customer.lastContact ? Math.floor((new Date() - new Date(customer.lastContact)) / (1000 * 60 * 60 * 24)) : 'N/A',
      'Order Frequency (Days)': customer.totalOrders > 1 ? Math.floor((new Date() - new Date(customer.joiningDate)) / (1000 * 60 * 60 * 24 * customer.totalOrders)) : 'N/A',
      'Customer Value Tier': customer.value > 300000 ? 'Platinum' : customer.value > 150000 ? 'Gold' : customer.value > 50000 ? 'Silver' : 'Bronze',
      'Payment Risk Level': customer.outstandingAmount > customer.creditLimit * 0.8 ? 'High' : customer.outstandingAmount > customer.creditLimit * 0.5 ? 'Medium' : 'Low'
    }));

    // ==================== STATISTICAL SUMMARY SHEET ====================
    
    // Calculate statistical insights
    const customerValues = customers.map(c => c.value);
    const outstandingAmounts = customers.map(c => c.outstandingAmount);
    const orderCounts = customers.map(c => c.totalOrders);
    
    const statisticalSummary = [
      ['STATISTICAL ANALYSIS REPORT', '', '', ''],
      ['Generated On', new Date().toLocaleDateString('en-IN'), '', ''],
      ['', '', '', ''],
      ['CUSTOMER VALUE ANALYSIS', '', '', ''],
      ['Metric', 'Value', 'Insight', 'Recommendation'],
      
      ['Total Customer Base', crmMetrics.totalCustomers, 'Base Size', 'Focus on retention'],
      ['Average Customer Value', `₹${Math.round(crmMetrics.totalRevenue / crmMetrics.totalCustomers).toLocaleString('en-IN')}`, 'Per Customer Revenue', 'Increase cross-selling'],
      ['Top 20% Customer Value', `₹${Math.round(Math.max(...customerValues)).toLocaleString('en-IN')}`, 'VIP Potential', 'Personalized service'],
      ['Revenue Concentration', `${Math.round((customerValues.sort((a,b) => b-a).slice(0,3).reduce((a,b) => a+b, 0) / crmMetrics.totalRevenue) * 100)}%`, 'Top 3 customers', 'Diversify revenue'],
      
      ['', '', '', ''],
      ['FINANCIAL HEALTH METRICS', '', '', ''],
      ['Total Outstanding', `₹${crmMetrics.totalOutstanding.toLocaleString('en-IN')}`, 'Credit Exposure', 'Monitor collections'],
      ['Avg Outstanding/Customer', `₹${Math.round(crmMetrics.totalOutstanding / crmMetrics.totalCustomers).toLocaleString('en-IN')}`, 'Per Customer Risk', 'Review credit limits'],
      ['Collection Efficiency', `${Math.round((1 - crmMetrics.totalOutstanding / crmMetrics.totalRevenue) * 100)}%`, 'Collection Rate', 'Improve to 90%+'],
      ['Credit Utilization', `${Math.round((outstandingAmounts.reduce((a,b) => a+b, 0) / customers.reduce((a,b) => a+b.creditLimit, 0)) * 100)}%`, 'Limit Usage', 'Optimize limits'],
      
      ['', '', '', ''],
      ['CUSTOMER ENGAGEMENT INSIGHTS', '', '', ''],
      ['Average Orders/Customer', Math.round(crmMetrics.totalOrders / crmMetrics.totalCustomers), 'Engagement Level', 'Increase frequency'],
      ['Order Value Range', `₹${Math.min(...customerValues).toLocaleString('en-IN')} - ₹${Math.max(...customerValues).toLocaleString('en-IN')}`, 'Value Spread', 'Segment marketing'],
      ['Premium Customer %', `${Math.round((crmMetrics.premiumCustomers / crmMetrics.totalCustomers) * 100)}%`, 'Premium Ratio', 'Increase to 30%'],
      ['Loyalty Program Penetration', `${Math.round((crmMetrics.loyaltyMembers / crmMetrics.totalCustomers) * 100)}%`, 'Loyalty Reach', 'Promote benefits'],
      
      ['', '', '', ''],
      ['BUSINESS GROWTH INDICATORS', '', '', ''],
      ['Customer Growth Rate', '+23.5%', 'Quarterly Growth', 'Maintain momentum'],
      ['Revenue Growth Trend', '↑ Increasing', 'Revenue Trend', 'Sustain growth'],
      ['Order Volume Trend', `${orderCounts.reduce((a,b) => a+b, 0) > 100 ? '↑ Strong' : '→ Stable'}`, 'Volume Health', 'Boost volume'],
      ['Market Penetration', `${Math.round((crmMetrics.totalCustomers / 500) * 100)}%`, 'Local Market Share', 'Expand reach'],
    ];

    // ==================== CREATE WORKSHEETS WITH ENHANCED FORMATTING ====================
    
    // Dashboard Sheet
    const dashboardWs = utils.aoa_to_sheet(dashboardData);
    
    // Customers Sheet
    const customersWs = utils.json_to_sheet(customersData);
    
    // Statistical Summary Sheet
    const statsWs = utils.aoa_to_sheet(statisticalSummary);

    // ==================== ADD WORKSHEETS TO WORKBOOK ====================
    
    utils.book_append_sheet(wb, dashboardWs, '📊 Dashboard Analytics');
    utils.book_append_sheet(wb, customersWs, '👥 Customers Master');
    utils.book_append_sheet(wb, statsWs, '📈 Statistical Insights');

    // ==================== ENHANCED FILE NAME WITH TIMESTAMP ====================
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
    const fileName = `Retail_CRM_Comprehensive_Report_${timestamp}.xlsx`;

    // ==================== EXPORT WITH SUCCESS MESSAGE ====================
    
    writeFile(wb, fileName);
    
    // Show detailed success message
    setTimeout(() => {
      alert(`✅ CRM Report Exported Successfully!

📊 Dashboard Analytics: Key metrics with trends
👥 Customers Master: Complete customer database (${customers.length} records)
📈 Statistical Insights: Business intelligence & recommendations

File: ${fileName}
Size: ~${Math.round((customers.length * 2) / 1024)} KB
Generated: ${new Date().toLocaleString('en-IN')}`);
    }, 500);
    
  } catch (error) {
    console.error('Error exporting to Excel:', error);
    
    // Enhanced error handling with fallback
    const fallbackConfirmed = window.confirm(
      `❌ Excel Export Failed: ${error.message}\n\n` +
      'Would you like to try CSV export instead?'
    );
    
    if (fallbackConfirmed) {
      exportToExcel();
    }
  }
};

// Enhanced CSV Export with better formatting
const exportToExcel = () => {
  try {
    const timestamp = new Date().toISOString().split('T')[0];
    
    // Enhanced Dashboard Data
    const dashboardData = [
      ['INDIAN RETAIL CRM - DASHBOARD SUMMARY'],
      [`Generated: ${new Date().toLocaleString('en-IN')}`],
      [''],
      ['METRIC', 'VALUE', 'STATUS', 'TREND'],
      ['Total Customers', crmMetrics.totalCustomers, 'Base', '📊'],
      ['Active Customers', crmMetrics.activeCustomers, `${Math.round((crmMetrics.activeCustomers/crmMetrics.totalCustomers)*100)}% Active`, '✅'],
      ['Total Revenue', `₹${crmMetrics.totalRevenue.toLocaleString('en-IN')}`, 'Revenue', '💰'],
      ['Average Order Value', `₹${Math.round(crmMetrics.averageOrderValue).toLocaleString('en-IN')}`, 'AOV', '📈'],
      ['Total Orders', crmMetrics.totalOrders, 'Volume', '🛒'],
      ['Premium Customers', crmMetrics.premiumCustomers, `${Math.round((crmMetrics.premiumCustomers/crmMetrics.totalCustomers)*100)}% Premium`, '⭐'],
      ['Loyalty Members', crmMetrics.loyaltyMembers, `${Math.round((crmMetrics.loyaltyMembers/crmMetrics.totalCustomers)*100)}% Loyalty`, '🎁'],
      ['UPI Users', crmMetrics.upiUsers, `${Math.round((crmMetrics.upiUsers/crmMetrics.totalCustomers)*100)}% Digital`, '📱'],
      ['Outstanding Amount', `₹${crmMetrics.totalOutstanding.toLocaleString('en-IN')}`, 'Credit', '⚠️'],
      ['Growth Rate', '+23.5%', 'Growth', '🚀'],
    ];

    // Enhanced Customers Data
    const customersHeader = [
      'ID', 'Name', 'Company', 'Phone', 'Email', 'Business Type', 
      'Status', 'Segment', 'Total Value (₹)', 'Total Orders', 
      'Outstanding (₹)', 'Loyalty Points', 'City', 'Joining Date'
    ];

    const customersData = [
      customersHeader,
      ...customers.map(customer => [
        customer.id,
        customer.displayName || customer.name,
        customer.company,
        customer.phone,
        customer.email,
        customer.businessType,
        customer.status,
        customer.customerSegment,
        customer.value,
        customer.totalOrders,
        customer.outstandingAmount,
        customer.loyaltyPoints,
        customer.city,
        customer.joiningDate
      ])
    ];

    // Download function with enhanced formatting
    const downloadCSV = (data, filename) => {
      const csvContent = data.map(row => 
        row.map(field => `"${field}"`).join(',')
      ).join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    // Download both files with confirmation
    downloadCSV(dashboardData, `CRM_Dashboard_Summary_${timestamp}.csv`);
    
    setTimeout(() => {
      downloadCSV(customersData, `CRM_Customers_Database_${timestamp}.csv`);
      setTimeout(() => {
        alert(`📊 CSV Reports Exported!\n\nDashboard Summary & Customers Database (${customers.length} records)`);
      }, 200);
    }, 100);

  } catch (error) {
    console.error('CSV export error:', error);
    alert('❌ Export failed. Please try again.');
  }
};


  // CRM Analytics Data
  const crmMetrics = {
    totalCustomers: customers.length,
    activeCustomers: customers.filter(c => c.status !== 'Inactive').length,
    totalRevenue: customers.reduce((sum, c) => sum + c.value, 0),
    averageOrderValue: customers.reduce((sum, c) => sum + c.lastPurchase, 0) / customers.length,
    totalOrders: customers.reduce((sum, c) => sum + c.totalOrders, 0),
    loyaltyMembers: customers.filter(c => c.loyaltyPoints > 0).length,
    creditCustomers: customers.filter(c => c.outstandingAmount > 0).length,
    totalOutstanding: customers.reduce((sum, c) => sum + c.outstandingAmount, 0),
    upiUsers: customers.filter(c => c.paymentMethods.includes('UPI')).length,
    premiumCustomers: customers.filter(c => c.segment === 'Premium').length
  };

  const recentActivities = [
    {
      id: 1,
      type: 'purchase',
      customer: 'Rajesh Kumar',
      action: 'Made a purchase of ₹12,500',
      time: '2 hours ago',
      icon: ShoppingCart,
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'payment',
      customer: 'Mohammed Ali',
      action: 'Payment received ₹25,000 via UPI',
      time: '4 hours ago',
      icon: CreditCard,
      color: 'text-blue-600'
    },
    {
      id: 3,
      type: 'contact',
      customer: 'Priya Sharma',
      action: 'WhatsApp inquiry about new products',
      time: '6 hours ago',
      icon: MessageSquare,
      color: 'text-purple-600'
    },
    {
      id: 4,
      type: 'loyalty',
      customer: 'Rajesh Kumar',
      action: 'Redeemed 500 loyalty points',
      time: '1 day ago',
      icon: Gift,
      color: 'text-orange-600'
    }
  ];

  const filteredCustomers = customers.filter(customer => {
     const searchTerm = searchTermRef.current.toLowerCase();
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm) ||
                         customer.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'All' || customer.status === filterStatus;
    const matchesSegment = filterSegment === 'All' || customer.segment === filterSegment;

    return matchesSearch && matchesStatus && matchesSegment;
  });


  // Search input handler - NO STATE UPDATE during typing
  const handleSearchChange = (e) => {
    const value = e.target.value;
    searchTermRef.current = value;
    
    // Only trigger a re-render after a short delay (debounce)
    // This prevents re-renders while typing
    setTimeout(() => {
      setSearchTrigger(prev => prev + 1);
    }, 50);
  };

  // Force search when filters change
  useEffect(() => {
    setSearchTrigger(prev => prev + 1);
  }, [filterStatus, filterSegment]);

  const formatIndianCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status) => {
    const colors = {
      'VIP Customer': 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white',
      'Premium Customer': 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
      'Regular Customer': 'bg-blue-100 text-blue-800',
      'New Customer': 'bg-green-100 text-green-800',
      'Inactive': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getSegmentColor = (segment) => {
    const colors = {
      'Premium': 'bg-purple-100 text-purple-800',
      'Standard': 'bg-blue-100 text-blue-800',
      'Basic': 'bg-gray-100 text-gray-800'
    };
    return colors[segment] || 'bg-gray-100 text-gray-800';
  };

  // Update customer
const handleUpdateCustomer = () => {
  const newErrors = validateForm();
  
  if (Object.keys(newErrors).length === 0) {
    const updatedCustomer = {
      // Keep all existing fields and update with new data
      ...editingCustomer,
      // Update with form data using existing field names
      name: formData.displayName || `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      whatsapp: formData.whatsapp || formData.phone,
      company: formData.company,
      location: `${formData.area}, ${formData.city}`,
      address: formData.address,
      pincode: formData.pincode,
      state: formData.state,
      gst: formData.gstNumber || editingCustomer.gst,
      businessType: formData.businessType,
      value: parseInt(formData.totalPurchases) || editingCustomer.value,
      lastPurchase: parseInt(formData.lastOrderAmount) || editingCustomer.lastPurchase,
      totalOrders: parseInt(formData.totalOrders) || editingCustomer.totalOrders,
      status: formData.status,
      source: formData.source,
      paymentMethods: formData.paymentMethods || editingCustomer.paymentMethods,
      preferredPayment: formData.preferredPaymentMode || editingCustomer.preferredPayment,
      creditLimit: parseInt(formData.creditLimit) || editingCustomer.creditLimit,
      outstandingAmount: parseInt(formData.outstandingAmount) || editingCustomer.outstandingAmount,
      loyaltyPoints: parseInt(formData.loyaltyPoints) || editingCustomer.loyaltyPoints,
      segment: formData.customerSegment,
      language: formData.preferredLanguage,
      birthday: formData.birthday,
      anniversary: formData.anniversary,
      family: formData.family || editingCustomer.family,
      preferences: formData.preferences || editingCustomer.preferences
    };
    
    console.log('Updating customer:', updatedCustomer); // Debug log
    
    setCustomers(prev =>
      prev.map(c => (c.id === editingCustomer.id ? updatedCustomer : c))
    );

// RESET FILTERS AFTER UPDATING CUSTOMER
    setFilterStatus('All');
    setFilterSegment('All');

    setEditingCustomer(null);
    setShowAddCustomer(false);
    setActiveFormSection('personal');
  } else {
    setErrors(newErrors);
    console.log('Form errors:', newErrors); // Debug log
  }
};

// Delete customer
const handleDeleteCustomer = (id) => {
  if (window.confirm("Are you sure you want to delete this customer?")) {
    setCustomers(prev => prev.filter(c => c.id !== id));
  }
};

const mapCustomerToFormData = (customer) => {
  return {
    // Personal Information
    firstName: customer.name?.split(' ')[0] || '',
    lastName: customer.name?.split(' ').slice(1).join(' ') || '',
    displayName: customer.name || '',
    email: customer.email || '',
    phone: customer.phone || '',
    mobile: customer.phone || '',
    whatsapp: customer.whatsapp || customer.phone || '',
    alternatePhone: customer.alternatePhone || '',
    birthday: customer.birthday || '',
    anniversary: customer.anniversary || '',
    preferredLanguage: customer.language || 'Hindi',
    family: customer.family || { spouse: '', children: '', spousePhone: '' },
    
    // Business Information
    company: customer.company || '',
    title: customer.title || '',
    department: customer.department || '',
    businessType: customer.businessType || '',
    gstNumber: customer.gst || '',
    panNumber: customer.panNumber || '',
    aadharNumber: customer.aadharNumber || '',
    businessLicense: customer.businessLicense || '',
    businessDetails: customer.businessDetails || {
      establishedYear: '', employeeCount: '', monthlyTurnover: '', 
      mainProducts: [], suppliers: [], competitors: []
    },
    
    // Address Information
    address: customer.address || '',
    area: customer.location?.split(',')[0]?.trim() || '',
    city: customer.location?.split(',')[1]?.trim() || customer.location || '',
    state: customer.state || '',
    pincode: customer.pincode || '',
    country: customer.country || 'India',
    
    // Contact & Social
    preferredContact: customer.preferredContact || 'Phone',
    socialProfiles: customer.socialProfiles || { whatsapp: '', facebook: '', instagram: '' },
    
    // Financial Information
    status: customer.status || 'Active',
    customerSegment: customer.segment || 'Standard',
    creditLimit: customer.creditLimit?.toString() || '',
    outstandingAmount: customer.outstandingAmount?.toString() || '',
    paymentTerms: customer.paymentTerms || '30 days',
    preferredPaymentMode: customer.preferredPayment || 'UPI',
    loyaltyMember: customer.loyaltyMember || false,
    loyaltyPoints: customer.loyaltyPoints?.toString() || '',
    totalPurchases: customer.value?.toString() || '',
    averageOrderValue: customer.averageOrderValue?.toString() || '',
    lastOrderAmount: customer.lastPurchase?.toString() || '',
    totalOrders: customer.totalOrders?.toString() || '',
    paymentMethods: customer.paymentMethods || [],
    
    // Preferences & Additional Info
    source: customer.source || 'Walk-in',
    referredBy: customer.referredBy || '',
    tags: customer.tags || [],
    notes: customer.notes || '',
    lastContact: customer.lastContact || '',
    lastPurchase: customer.lastPurchase?.toString() || '',
    nextFollowUp: customer.nextFollowUp || '',
    joiningDate: customer.joiningDate || '',
    preferences: customer.preferences || {
      categories: [], brands: [], offerTypes: [], 
      communicationTime: 'Morning', visitingDays: []
    }
  };
};

  // const CustomerDashboard = () => (
  //   <div className="space-y-6">
  //     {/* CRM Metrics Overview */}
  //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  //       <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white">
  //         <div className="flex items-center justify-between">
  //           <div>
  //             <p className="text-blue-100 text-sm">Total Customers</p>
  //             <p className="text-2xl font-bold">{crmMetrics.totalCustomers}</p>
  //             <p className="text-blue-100 text-xs mt-1">Active: {crmMetrics.activeCustomers}</p>
  //           </div>
  //           <Users className="h-8 w-8 text-blue-200" />
  //         </div>
  //       </div>

  //       <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white">
  //         <div className="flex items-center justify-between">
  //           <div>
  //             <p className="text-green-100 text-sm">Total Revenue</p>
  //             <p className="text-2xl font-bold">{formatIndianCurrency(crmMetrics.totalRevenue)}</p>
  //             <p className="text-green-100 text-xs mt-1">Avg: {formatIndianCurrency(crmMetrics.averageOrderValue)}</p>
  //           </div>
  //           <IndianRupee className="h-8 w-8 text-green-200" />
  //         </div>
  //       </div>

  //       <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white">
  //         <div className="flex items-center justify-between">
  //           <div>
  //             <p className="text-purple-100 text-sm">Total Orders</p>
  //             <p className="text-2xl font-bold">{crmMetrics.totalOrders}</p>
  //             <p className="text-purple-100 text-xs mt-1">Premium: {crmMetrics.premiumCustomers}</p>
  //           </div>
  //           <ShoppingCart className="h-8 w-8 text-purple-200" />
  //         </div>
  //       </div>

  //       <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-xl text-white">
  //         <div className="flex items-center justify-between">
  //           <div>
  //             <p className="text-orange-100 text-sm">Outstanding</p>
  //             <p className="text-2xl font-bold">{formatIndianCurrency(crmMetrics.totalOutstanding)}</p>
  //             <p className="text-orange-100 text-xs mt-1">From: {crmMetrics.creditCustomers} customers</p>
  //           </div>
  //           <AlertCircle className="h-8 w-8 text-orange-200" />
  //         </div>
  //       </div>
  //     </div>

  //     {/* Quick Stats */}
  //     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  //       <div className="bg-white p-4 border border-gray-200 rounded-lg">
  //         <div className="flex items-center space-x-3">
  //           <div className="p-2 bg-blue-100 rounded-lg">
  //             <Smartphone className="h-5 w-5 text-blue-600" />
  //           </div>
  //           <div>
  //             <p className="text-sm text-gray-600">UPI Users</p>
  //             <p className="text-lg font-semibold">{crmMetrics.upiUsers}</p>
  //           </div>
  //         </div>
  //       </div>

  //       <div className="bg-white p-4 border border-gray-200 rounded-lg">
  //         <div className="flex items-center space-x-3">
  //           <div className="p-2 bg-yellow-100 rounded-lg">
  //             <Gift className="h-5 w-5 text-yellow-600" />
  //           </div>
  //           <div>
  //             <p className="text-sm text-gray-600">Loyalty Members</p>
  //             <p className="text-lg font-semibold">{crmMetrics.loyaltyMembers}</p>
  //           </div>
  //         </div>
  //       </div>

  //       <div className="bg-white p-4 border border-gray-200 rounded-lg">
  //         <div className="flex items-center space-x-3">
  //           <div className="p-2 bg-green-100 rounded-lg">
  //             <TrendingUp className="h-5 w-5 text-green-600" />
  //           </div>
  //           <div>
  //             <p className="text-sm text-gray-600">Growth Rate</p>
  //             <p className="text-lg font-semibold">+23.5%</p>
  //           </div>
  //         </div>
  //       </div>
  //     </div>

  //     {/* Recent Activities */}
  //     <div className="bg-white rounded-lg border border-gray-200">
  //       <div className="p-6 border-b border-gray-200">
  //         <h3 className="text-lg font-semibold text-gray-900 flex items-center">
  //           <Activity className="h-5 w-5 mr-2 text-blue-600" />
  //           Recent Activities
  //         </h3>
  //       </div>
  //       <div className="p-6">
  //         <div className="space-y-4">
  //           {recentActivities.map((activity) => (
  //             <div key={activity.id} className="flex items-center space-x-3">
  //               <div className={`p-2 rounded-full bg-gray-100`}>
  //                 <activity.icon className={`h-4 w-4 ${activity.color}`} />
  //               </div>
  //               <div className="flex-1">
  //                 <p className="text-sm font-medium text-gray-900">{activity.customer}</p>
  //                 <p className="text-sm text-gray-500">{activity.action}</p>
  //               </div>
  //               <div className="text-xs text-gray-500">{activity.time}</div>
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

//   const CustomerList = () => (
//     <div className="space-y-6">
//       {/* Search and Filters */}
//       <div className="bg-white p-6 rounded-lg border border-gray-200">
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="flex-1">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search customers by name, company, phone, or location..."
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//           </div>
          
//           <div className="flex gap-2">
//             <select
//               className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//             >
//               <option value="All">All Status</option>
//               <option value="VIP Customer">VIP Customer</option>
//               <option value="Premium Customer">Premium Customer</option>
//               <option value="Regular Customer">Regular Customer</option>
//               <option value="New Customer">New Customer</option>
//               <option value="Inactive">Inactive</option>
//             </select>

//             <select
//               className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               value={filterSegment}
//               onChange={(e) => setFilterSegment(e.target.value)}
//             >
//               <option value="All">All Segments</option>
//               <option value="Premium">Premium</option>
//               <option value="Standard">Standard</option>
//               <option value="Basic">Basic</option>
//             </select>

//             <button
//              onClick={() => {
//     // reset form for new customer
//     setFormData({
//       name: '',
//       company: '',
//       status: 'Active',
//       segment: 'Standard',
//       phone: '',
//       email: '',
//       location: '',
//       value: '',
//       totalOrders: '',
//       outstandingAmount: '',
//       loyaltyPoints: '',
//       paymentMethods: [],
//       address: '',
//       birthday: '',
//       businessType: ''
//     });
//     setEditingCustomer(null); // clear edit mode
//     setShowAddCustomer(true); // open modal
//   }}
//               className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
//             >
//               <Plus className="h-4 w-4" />
//               <span>Add Customer</span>
//             </button>
//           </div>
//         </div> 
//       </div>
      
//       {/* Customer Cards */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//         {filteredCustomers.map((customer) => (
//           <div key={customer.id} className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
//             <div className="p-6">
//               <div className="flex items-start justify-between mb-4">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
//                     {customer.name.split(' ').map(n => n[0]).join('')}
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-gray-900">{customer.name}</h3>
//                     <p className="text-sm text-gray-500">{customer.company}</p>
//                   </div>
//                 </div>
//                 <div className="relative">
//   <button
//     onClick={() => setShowOptions(showOptions === customer.id ? null : customer.id)}
//     className="p-1 text-gray-400 hover:text-gray-600"
//   >
//     <MoreVertical className="h-4 w-4" />
//   </button>

//   {showOptions === customer.id && (
//     <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded-lg shadow-md z-10">
//       <button
//         onClick={() => {
//           setEditingCustomer(customer);
//           setFormData(customer); // prefill form
//           setShowAddCustomer(true); // open modal
//           setShowOptions(null);
//         }}
//         className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//       >
//         <PenSquare className="h-4 w-4 inline-block mr-2" />
//        <span>Edit</span> 
//       </button>
//       <button
//         onClick={() => handleDeleteCustomer(customer.id)}
//         className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
//       >
//         <Trash className="h-4 w-4 inline-block mr-2" />
//        <span>Delete</span> 
//       </button>
//     </div>
//   )}
// </div>

//               </div>

//               {/* Status and Segment */}
//               <div className="flex flex-wrap gap-2 mb-4">
//                 <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
//                   {customer.status}
//                 </span>
//                 <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSegmentColor(customer.segment)}`}>
//                   {customer.segment}
//                 </span>
//               </div>

//               {/* Contact Info */}
//               <div className="space-y-2 mb-4">
//                 <div className="flex items-center text-sm text-gray-600">
//                   <Phone className="h-4 w-4 mr-2" />
//                   {customer.phone}
//                 </div>
//                 <div className="flex items-center text-sm text-gray-600">
//                   <Mail className="h-4 w-4 mr-2" />
//                   {customer.email}
//                 </div>
//                 <div className="flex items-center text-sm text-gray-600">
//                   <MapPin className="h-4 w-4 mr-2" />
//                   {customer.location}
//                 </div>
//               </div>

//               {/* Key Metrics */}
//               <div className="grid grid-cols-2 gap-4 mb-4">
//                 <div>
//                   <p className="text-xs text-gray-500">Total Value</p>
//                   <p className="font-semibold text-green-600">{formatIndianCurrency(customer.value)}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Orders</p>
//                   <p className="font-semibold text-blue-600">{customer.totalOrders}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Outstanding</p>
//                   <p className="font-semibold text-red-600">{formatIndianCurrency(customer.outstandingAmount)}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Loyalty Points</p>
//                   <p className="font-semibold text-yellow-600">{customer.loyaltyPoints}</p>
//                 </div>
//               </div>

//               {/* Payment Methods */}
//               <div className="mb-4">
//                 <p className="text-xs text-gray-500 mb-2">Payment Methods</p>
//                 <div className="flex flex-wrap gap-1">
//                   {customer.paymentMethods.map((method, index) => (
//                     <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
//                       {method}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex space-x-2">
//                 <button
//                   onClick={() => setSelectedCustomer(customer)}
//                   className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm font-medium"
//                 >
//                   View Details
//                 </button>
//                 <button className="px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100">
//                   <Phone className="h-4 w-4" />
//                 </button>
//                 <button className="px-3 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100">
//                   <MessageSquare className="h-4 w-4" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Indian Retail CRM</h1>
              <p className="text-gray-600">Manage customers from small shops to supermarkets</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="h-5 w-5" />
              </button>
               <button 
                onClick={exportToExcelAdvanced}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Export Data</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'dashboard' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('customers')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'customers' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Customers
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* CRM Metrics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Total Customers</p>
                    <p className="text-2xl font-bold">{crmMetrics.totalCustomers}</p>
                    <p className="text-blue-100 text-xs mt-1">Active: {crmMetrics.activeCustomers}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-200" />
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Total Revenue</p>
                    <p className="text-2xl font-bold">{formatIndianCurrency(crmMetrics.totalRevenue)}</p>
                    <p className="text-green-100 text-xs mt-1">Avg: {formatIndianCurrency(crmMetrics.averageOrderValue)}</p>
                  </div>
                  <IndianRupee className="h-8 w-8 text-green-200" />
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Total Orders</p>
                    <p className="text-2xl font-bold">{crmMetrics.totalOrders}</p>
                    <p className="text-purple-100 text-xs mt-1">Premium: {crmMetrics.premiumCustomers}</p>
                  </div>
                  <ShoppingCart className="h-8 w-8 text-purple-200" />
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-xl text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm">Outstanding</p>
                    <p className="text-2xl font-bold">{formatIndianCurrency(crmMetrics.totalOutstanding)}</p>
                    <p className="text-orange-100 text-xs mt-1">From: {crmMetrics.creditCustomers} customers</p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-orange-200" />
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Smartphone className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">UPI Users</p>
                    <p className="text-lg font-semibold">{crmMetrics.upiUsers}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Gift className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Loyalty Members</p>
                    <p className="text-lg font-semibold">{crmMetrics.loyaltyMembers}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Growth Rate</p>
                    <p className="text-lg font-semibold">+23.5%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-blue-600" />
                  Recent Activities
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full bg-gray-100`}>
                        <activity.icon className={`h-4 w-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.customer}</p>
                        <p className="text-sm text-gray-500">{activity.action}</p>
                      </div>
                      <div className="text-xs text-gray-500">{activity.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'customers' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search customers by name, company, phone, or location..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      defaultValue={searchTermRef.current}
                      onChange={handleSearchChange}
                      key="search-input" // Stable key to prevent recreation
                    />
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <select
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="All">All Status</option>
                    <option value="VIP Customer">VIP Customer</option>
                    <option value="Premium Customer">Premium Customer</option>
                    <option value="Regular Customer">Regular Customer</option>
                    <option value="New Customer">New Customer</option>
                    <option value="Inactive">Inactive</option>
                  </select>

                  <select
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={filterSegment}
                    onChange={(e) => setFilterSegment(e.target.value)}
                  >
                    <option value="All">All Segments</option>
                    <option value="Premium">Premium</option>
                    <option value="Standard">Standard</option>
                    <option value="Basic">Basic</option>
                  </select>

                  <button
                    onClick={() => {
                      // Reset form with new structure
                      setFormData({
                        firstName: '',
                        lastName: '',
                        displayName: '',
                        email: '',
                        phone: '',
                        mobile: '',
                        whatsapp: '',
                        alternatePhone: '',
                        birthday: '',
                        anniversary: '',
                        preferredLanguage: 'Hindi',
                        family: {
                          spouse: '',
                          children: '',
                          spousePhone: ''
                        },
                        company: '',
                        title: '',
                        department: '',
                        businessType: '',
                        gstNumber: '',
                        panNumber: '',
                        aadharNumber: '',
                        businessLicense: '',
                        businessDetails: {
                          establishedYear: '',
                          employeeCount: '',
                          monthlyTurnover: '',
                          mainProducts: [],
                          suppliers: [],
                          competitors: []
                        },
                        address: '',
                        area: '',
                        city: '',
                        state: '',
                        pincode: '',
                        country: 'India',
                        preferredContact: 'Phone',
                        socialProfiles: {
                          whatsapp: '',
                          facebook: '',
                          instagram: ''
                        },
                        status: 'Active',
                        customerSegment: 'Standard',
                        creditLimit: '',
                        outstandingAmount: '',
                        paymentTerms: '30 days',
                        preferredPaymentMode: 'UPI',
                        loyaltyMember: false,
                        loyaltyPoints: '',
                        totalPurchases: '',
                        averageOrderValue: '',
                        lastOrderAmount: '',
                        totalOrders: '',
                        paymentMethods: [],
                        source: 'Walk-in',
                        referredBy: '',
                        tags: [],
                        notes: '',
                        lastContact: '',
                        lastPurchase: '',
                        nextFollowUp: '',
                        joiningDate: '',
                        preferences: {
                          categories: [],
                          brands: [],
                          offerTypes: [],
                          communicationTime: 'Morning',
                          visitingDays: []
                        }
                      });
                      setEditingCustomer(null);
                      setShowAddCustomer(true);
                      setActiveFormSection('personal');
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Customer</span>
                  </button>
                </div>
              </div> 
            </div>
            
            {/* Customer Cards */}
             <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCustomers.map((customer) => (
                <div key={customer.id} className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{customer.displayName || customer.name}</h3>
                          <p className="text-sm text-gray-500">{customer.company}</p>
                        </div>
                      </div>
                      <div className="relative">
                        <button
                          onClick={() => setShowOptions(showOptions === customer.id ? null : customer.id)}
                          className="p-1 text-gray-400 hover:text-gray-600"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>

                        {showOptions === customer.id && (
                          <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded-lg shadow-md z-10">
                            <button
                              onClick={() => {
                                const formDataFromCustomer = mapCustomerToFormData(customer);
                                setEditingCustomer(customer);
                                 setFormData(formDataFromCustomer);
                                setShowAddCustomer(true);
                                setShowOptions(null);
                              }}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <PenSquare className="h-4 w-4 inline-block mr-2" />
                              <span>Edit</span> 
                            </button>
                            <button
                              onClick={() => handleDeleteCustomer(customer.id)}
                              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                              <Trash className="h-4 w-4 inline-block mr-2" />
                              <span>Delete</span> 
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                        {customer.status}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSegmentColor(customer.segment)}`}>
                        {customer.segment}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-4 w-4 mr-2" />
                        {customer.phone}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="h-4 w-4 mr-2" />
                        {customer.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        {customer.location}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500">Total Value</p>
                        <p className="font-semibold text-green-600">{formatIndianCurrency(customer.value)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Orders</p>
                        <p className="font-semibold text-blue-600">{customer.totalOrders}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Outstanding</p>
                        <p className="font-semibold text-red-600">{formatIndianCurrency(customer.outstandingAmount)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Loyalty Points</p>
                        <p className="font-semibold text-yellow-600">{customer.loyaltyPoints}</p>
                      </div>
                    </div>

                    {/* Payment Methods */}
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-2">Payment Methods</p>
                      <div className="flex flex-wrap gap-1">
                        {customer.paymentMethods.map((method, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            {method}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedCustomer(customer)}
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
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>


      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Customer Details</h3>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <p className="text-sm text-gray-900">{selectedCustomer.displayName || selectedCustomer.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <p className="text-sm text-gray-900">{selectedCustomer.company}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <p className="text-sm text-gray-900">{selectedCustomer.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <p className="text-sm text-gray-900">{selectedCustomer.email}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <p className="text-sm text-gray-900">{selectedCustomer.address}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">GST Number</label>
                  <p className="text-sm text-gray-900">{selectedCustomer.gst}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
                  <p className="text-sm text-gray-900">{selectedCustomer.businessType}</p>
                </div>
              </div>

              {/* Financial Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">Total Value</p>
                  <p className="text-lg font-semibold text-green-600">{formatIndianCurrency(selectedCustomer.value)}</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-lg font-semibold text-blue-600">{selectedCustomer.totalOrders}</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-gray-600">Loyalty Points</p>
                  <p className="text-lg font-semibold text-yellow-600">{selectedCustomer.loyaltyPoints}</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <p className="text-sm text-gray-600">Outstanding</p>
                  <p className="text-lg font-semibold text-red-600">{formatIndianCurrency(selectedCustomer.outstandingAmount)}</p>
                </div>
              </div>

              {/* Preferences */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Customer Preferences</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Categories</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedCustomer.preferences.categories.map((category, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Brands</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedCustomer.preferences.brands.map((brand, index) => (
                        <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                          {brand}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Customer Modal */}
      {showAddCustomer && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
      <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-white sticky top-0 z-10">
        <h2 className="text-xl font-bold text-gray-900">
          {editingCustomer ? "Edit Customer" : "Add New Customer"}
        </h2>
        <button
          onClick={() => {
            setShowAddCustomer(false);
            setEditingCustomer(null);
            setActiveFormSection('personal');
          }}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Form Navigation - Simplified without icons */}
      <div className="border-b border-gray-200 bg-gray-50">
        <nav className="flex overflow-x-auto px-6">
          {['personal', 'contact', 'business', 'address', 'financial', 'preferences'].map((section) => (
            <button
              key={section}
              onClick={() => setActiveFormSection(section)}
              className={`px-4 py-3 border-b-2 font-medium text-sm whitespace-nowrap capitalize ${
                activeFormSection === section
                  ? 'border-blue-500 text-blue-600 bg-white'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {section}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6 space-y-6 overflow-y-auto flex-1">
        {/* Personal Information Section */}
        {activeFormSection === 'personal' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter first name"
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter last name"
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                <input
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Display name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Birthday</label>
                <input
                  type="date"
                  name="birthday"
                  value={formData.birthday}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Anniversary</label>
                <input
                  type="date"
                  name="anniversary"
                  value={formData.anniversary}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Language</label>
                <select
                  name="preferredLanguage"
                  value={formData.preferredLanguage}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Hindi">Hindi</option>
                  <option value="English">English</option>
                  <option value="Regional">Regional</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Contact Information Section */}
        {activeFormSection === 'contact' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Primary Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+91 98765 43210"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile *</label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+91 98765 43210"
                />
                {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alternate Phone</label>
                <input
                  type="tel"
                  name="alternatePhone"
                  value={formData.alternatePhone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+91 11 9876 5432"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+91 98765 43210"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="customer@email.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Contact Method</label>
              <select
                name="preferredContact"
                value={formData.preferredContact}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Phone">Phone</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Email">Email</option>
                <option value="In-Person">In-Person</option>
              </select>
            </div>
          </div>
        )}

        {/* Business Information Section */}
        {activeFormSection === 'business' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Business Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Company name"
                />
                {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title/Position</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Managing Director, Owner, etc."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Type *</label>
                <select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Business Type</option>
                  <option value="General Store">General Store</option>
                  <option value="Kirana Store">Kirana Store</option>
                  <option value="Super Market">Super Market</option>
                  <option value="Electronics Shop">Electronics Shop</option>
                  <option value="Clothing Store">Clothing Store</option>
                  <option value="Pharmacy">Pharmacy</option>
                  <option value="Restaurant">Restaurant</option>
                </select>
                {errors.businessType && <p className="text-red-500 text-xs mt-1">{errors.businessType}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">GST Number</label>
                <input
                  type="text"
                  name="gstNumber"
                  value={formData.gstNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="GSTIN07ABCDE1234F1Z5"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label>
                <input
                  type="text"
                  name="panNumber"
                  value={formData.panNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="ABCDE1234F"
                />
              </div>
            </div>
          </div>
        )}

        {/* Address Information Section */}
        {activeFormSection === 'address' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Address Information</h3>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Address *</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Shop No. 45, Block A, Connaught Place, New Delhi - 110001"
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Area/Locality</label>
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Connaught Place"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="New Delhi"
                />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
<input
  type="text"
  name="state"
  value={formData.state}
  onChange={handleInputChange}
  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  placeholder="state"
/>
{errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pincode *</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="110001"
                />
                {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Financial Information Section */}
        {activeFormSection === 'financial' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Financial Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="VIP Customer">VIP Customer</option>
                  <option value="Premium Customer">Premium Customer</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Segment</label>
                <select
                  name="customerSegment"
                  value={formData.customerSegment}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Basic">Basic</option>
                  <option value="Standard">Standard</option>
                  <option value="Premium">Premium</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Credit Limit (₹)</label>
                <input
                  type="number"
                  name="creditLimit"
                  value={formData.creditLimit}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="50000"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Purchases (₹)</label>
                <input
                  type="number"
                  name="totalPurchases"
                  value={formData.totalPurchases}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="285000"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Orders</label>
                <input
                  type="number"
                  name="totalOrders"
                  value={formData.totalOrders}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="24"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Outstanding Amount (₹)</label>
                <input
                  type="number"
                  name="outstandingAmount"
                  value={formData.outstandingAmount}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="15000"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Loyalty Points</label>
                <input
                  type="number"
                  name="loyaltyPoints"
                  value={formData.loyaltyPoints}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="2850"
                />
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Payment Methods *</label>
              <div className="flex flex-wrap gap-4">
                {['UPI', 'Card', 'Cash', 'Cheque', 'Bank Transfer'].map(method => (
                  <label key={method} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.paymentMethods.includes(method)}
                      onChange={() => handlePaymentMethodChange(method)}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">{method}</span>
                  </label>
                ))}
              </div>
              {errors.paymentMethods && <p className="text-red-500 text-xs mt-1">{errors.paymentMethods}</p>}
            </div>
          </div>
        )}

        {/* Preferences Section */}
        {/* Preferences Section */}
{activeFormSection === 'preferences' && (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold text-gray-900">Customer Preferences</h3>
    
    {/* Preferred Categories */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">Preferred Categories</label>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {[
          'Groceries', 'Electronics', 'Clothing', 'Home Appliances', 
          'Personal Care', 'Snacks', 'Beverages', 'Home Care',
          'Furniture', 'Footwear', 'Jewelry', 'Books',
          'Sports', 'Toys', 'Automotive', 'Beauty'
        ].map(category => (
          <label key={category} className="flex items-center space-x-2 p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <input
              type="checkbox"
              checked={formData.preferences?.categories?.includes(category)}
              onChange={(e) => {
                const categories = formData.preferences?.categories || [];
                const updatedCategories = e.target.checked
                  ? [...categories, category]
                  : categories.filter(c => c !== category);
                setFormData(prev => ({
                  ...prev,
                  preferences: { ...prev.preferences, categories: updatedCategories }
                }));
              }}
              className="h-4 w-4 text-blue-600 rounded border-gray-300"
            />
            <span className="text-sm text-gray-700">{category}</span>
          </label>
        ))}
      </div>
    </div>

    {/* Preferred Brands */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">Preferred Brands</label>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {[
          'Patanjali', 'ITC', 'Hindustan Unilever', 'Amul', 'Britannia', 
          'Parle', 'Samsung', 'LG', 'Sony', 'Reliance', 'Nestle',
          'Cadbury', 'Pepsi', 'Coca-Cola', 'Dabur', 'Marico',
          'Godrej', 'Tata', 'Adidas', 'Nike', 'Puma', 'Reebok',
          'Apple', 'OnePlus', 'Xiaomi', 'Micromax', 'Whirlpool',
          'Voltas', 'Blue Star', 'Philips', 'Havells'
        ].map(brand => (
          <label key={brand} className="flex items-center space-x-2 p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <input
              type="checkbox"
              checked={formData.preferences?.brands?.includes(brand)}
              onChange={(e) => {
                const brands = formData.preferences?.brands || [];
                const updatedBrands = e.target.checked
                  ? [...brands, brand]
                  : brands.filter(b => b !== brand);
                setFormData(prev => ({
                  ...prev,
                  preferences: { ...prev.preferences, brands: updatedBrands }
                }));
              }}
              className="h-4 w-4 text-blue-600 rounded border-gray-300"
            />
            <span className="text-sm text-gray-700">{brand}</span>
          </label>
        ))}
      </div>
    </div>

    {/* Offer Types */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Offer Types</label>
      <div className="flex flex-wrap gap-3">
        {['Volume Discounts', 'Seasonal Offers', 'Festival Discounts', 'Bulk Discounts', 'Cashback Offers', 'Loyalty Rewards'].map(offer => (
          <label key={offer} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.preferences?.offerTypes?.includes(offer)}
              onChange={(e) => {
                const offerTypes = formData.preferences?.offerTypes || [];
                const updatedOfferTypes = e.target.checked
                  ? [...offerTypes, offer]
                  : offerTypes.filter(o => o !== offer);
                setFormData(prev => ({
                  ...prev,
                  preferences: { ...prev.preferences, offerTypes: updatedOfferTypes }
                }));
              }}
              className="h-4 w-4 text-blue-600 rounded border-gray-300"
            />
            <span className="text-sm text-gray-700">{offer}</span>
          </label>
        ))}
      </div>
    </div>

    {/* Visiting Days */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Visiting Days</label>
      <div className="flex flex-wrap gap-3">
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
          <label key={day} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.preferences?.visitingDays?.includes(day)}
              onChange={(e) => {
                const visitingDays = formData.preferences?.visitingDays || [];
                const updatedVisitingDays = e.target.checked
                  ? [...visitingDays, day]
                  : visitingDays.filter(d => d !== day);
                setFormData(prev => ({
                  ...prev,
                  preferences: { ...prev.preferences, visitingDays: updatedVisitingDays }
                }));
              }}
              className="h-4 w-4 text-blue-600 rounded border-gray-300"
            />
            <span className="text-sm text-gray-700">{day}</span>
          </label>
        ))}
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Communication Time</label>
        <select
          name="preferences.communicationTime"
          value={formData.preferences?.communicationTime || ''}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            preferences: { ...prev.preferences, communicationTime: e.target.value }
          }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="Morning">Morning (9 AM - 12 PM)</option>
          <option value="Afternoon">Afternoon (12 PM - 4 PM)</option>
          <option value="Evening">Evening (4 PM - 7 PM)</option>
          <option value="Any time">Any time</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Customer Source</label>
        <select
          name="source"
          value={formData.source}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="Walk-in">Walk-in</option>
          <option value="Referral">Referral</option>
          <option value="Direct">Direct</option>
          <option value="Online">Online</option>
          <option value="Exhibition">Exhibition</option>
          <option value="Cold Call">Cold Call</option>
        </select>
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
      <textarea
        name="notes"
        value={formData.notes}
        onChange={handleInputChange}
        rows="3"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Additional notes about the customer..."
      />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Joining Date</label>
        <input
          type="date"
          name="joiningDate"
          value={formData.joiningDate}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Next Follow-up Date</label>
        <input
          type="date"
          name="nextFollowUp"
          value={formData.nextFollowUp}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  </div>
)}
      </div>

      {/* Form Actions */}
      <div className="p-6 border-t border-gray-200 bg-gray-50 sticky bottom-0">
        <div className="flex justify-between items-center">
          <div className="flex space-x-3">
            <button
              onClick={() => {
                const sections = ['personal', 'contact', 'business', 'address', 'financial', 'preferences'];
                const currentIndex = sections.indexOf(activeFormSection);
                if (currentIndex > 0) {
                  setActiveFormSection(sections[currentIndex - 1]);
                }
              }}
              disabled={activeFormSection === 'personal'}
              className={`px-4 py-2 border border-gray-300 rounded-lg font-medium ${
                activeFormSection === 'personal'
                  ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Previous
            </button>
            
            <button
              onClick={() => {
                const sections = ['personal', 'contact', 'business', 'address', 'financial', 'preferences'];
                const currentIndex = sections.indexOf(activeFormSection);
                if (currentIndex < sections.length - 1) {
                  setActiveFormSection(sections[currentIndex + 1]);
                }
              }}
              disabled={activeFormSection === 'preferences'}
              className={`px-4 py-2 border border-gray-300 rounded-lg font-medium ${
                activeFormSection === 'preferences'
                  ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Next
            </button>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={() => {
                setShowAddCustomer(false);
                setEditingCustomer(null);
                setActiveFormSection('personal');
              }}
              className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={editingCustomer ? handleUpdateCustomer : handleAddCustomer}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>{editingCustomer ? "Update Customer" : "Add Customer"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default IndianRetailCRM;