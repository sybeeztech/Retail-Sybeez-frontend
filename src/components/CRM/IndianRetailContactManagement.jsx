import React, { useState, useEffect,useRef } from 'react';
import * as XLSX from 'xlsx';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Calendar,
  Search,
  Filter,
  Plus,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  MessageSquare,
  Video,
  UserCheck,
  Tag,
  Star,
  IndianRupee,
  Smartphone,
  CreditCard,
  Store,
  Package,
  Gift,
  Clock,
  AlertCircle,
  CheckCircle,
  FileText,
  Users,
  TrendingUp,
  Target,
  Home,
  Building2,
  Truck,
  ShoppingCart,
  X,
  PenSquare,
  Trash
} from 'lucide-react';

const IndianRetailContactManagement = () => {

  const fileInputRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(null); // Track which contact's menu is open


  const [contacts, setContacts] = useState([
    {
      id: 1,
      firstName: 'Rajesh',
      lastName: 'Kumar',
      displayName: 'Rajesh Kumar',
      email: 'rajesh.kumar@gmail.com',
      phone: '+91 98765 43210',
      mobile: '+91 98765 43210',
      whatsapp: '+91 98765 43210',
      alternatePhone: '+91 11 2345 6789',
      company: 'Kumar General Store',
      title: 'Owner',
      department: 'Management',
      businessType: 'General Store',
      address: 'Shop No. 45, Block A, Connaught Place',
      area: 'Connaught Place',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110001',
      country: 'India',
      gstNumber: 'GSTIN07ABCDE1234F1Z5',
      panNumber: 'ABCDE1234F',
      aadharNumber: '1234 5678 9012',
      businessLicense: 'DL/BL/2020/12345',
      birthday: '1975-08-20',
      anniversary: '2000-12-10',
      joiningDate: '2023-05-15',
      source: 'Walk-in',
      referredBy: '',
      tags: ['VIP', 'High Value', 'Regular Customer', 'Local'],
      notes: 'Loyal customer since 2023. Prefers bulk orders during festivals. Family business.',
      lastContact: '2024-10-07',
      lastPurchase: '2024-10-05',
      nextFollowUp: '2024-10-15',
      preferredContact: 'WhatsApp',
      preferredLanguage: 'English',
      socialProfiles: {
        whatsapp: '+91 98765 43210',
        facebook: '',
        instagram: ''
      },
      status: 'Active',
      customerSegment: 'Premium',
      creditLimit: 50000,
      outstandingAmount: 15000,
      paymentTerms: '30 days',
      preferredPaymentMode: 'UPI',
      loyaltyMember: true,
      loyaltyPoints: 2850,
      totalPurchases: 285000,
      averageOrderValue: 12500,
      lastOrderAmount: 18500,
      totalOrders: 24,
      family: {
        spouse: 'Sunita Kumar',
        children: 2,
        spousePhone: '+91 98765 43211'
      },
      businessDetails: {
        establishedYear: 2015,
        employeeCount: 3,
        monthlyTurnover: 500000,
        mainProducts: ['Groceries', 'Home Care', 'Personal Care'],
        suppliers: ['ITC', 'HUL', 'Patanjali'],
        competitors: ['Reliance Fresh', 'Big Bazaar']
      },
      preferences: {
        categories: ['Groceries', 'Home Care', 'Personal Care'],
        brands: ['Patanjali', 'ITC', 'Hindustan Unilever'],
        offerTypes: ['Festival Discounts', 'Bulk Discounts'],
        communicationTime: 'Morning',
        visitingDays: ['Monday', 'Wednesday', 'Friday']
      }
    },
    {
      id: 2,
      firstName: 'Priya',
      lastName: 'Sharma',
      displayName: 'Priya Sharma',
      email: 'priya.sharma@hotmail.com',
      phone: '+91 87654 32109',
      mobile: '+91 87654 32109',
      whatsapp: '+91 87654 32109',
      alternatePhone: '',
      company: 'Sharma Kirana Store',
      title: 'Owner',
      department: 'Management',
      businessType: 'Kirana Store',
      address: 'Shop No. 12, Main Market, Lajpat Nagar IV',
      area: 'Lajpat Nagar',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110024',
      country: 'India',
      gstNumber: 'GSTIN07FGHIJ5678K2L6',
      panNumber: 'FGHIJ5678K',
      aadharNumber: '5678 9012 3456',
      businessLicense: 'DL/BL/2023/67890',
      birthday: '1982-03-15',
      anniversary: '',
      joiningDate: '2023-08-22',
      source: 'Referral',
      referredBy: 'Rajesh Kumar',
      tags: ['Regular', 'Local', 'Growing Business'],
      notes: 'New customer, expanding business. Interested in credit facilities.',
      lastContact: '2024-10-06',
      lastPurchase: '2024-10-04',
      nextFollowUp: '2024-10-12',
      preferredContact: 'Phone',
      preferredLanguage: 'English',
      socialProfiles: {
        whatsapp: '+91 87654 32109',
        facebook: '',
        instagram: ''
      },
      status: 'Active',
      customerSegment: 'Standard',
      creditLimit: 25000,
      outstandingAmount: 8000,
      paymentTerms: '15 days',
      preferredPaymentMode: 'Cash',
      loyaltyMember: true,
      loyaltyPoints: 1500,
      totalPurchases: 150000,
      averageOrderValue: 8500,
      lastOrderAmount: 12000,
      totalOrders: 18,
      family: {
        spouse: '',
        children: 1,
        spousePhone: ''
      },
      businessDetails: {
        establishedYear: 2023,
        employeeCount: 2,
        monthlyTurnover: 200000,
        mainProducts: ['Groceries', 'Snacks', 'Beverages'],
        suppliers: ['Amul', 'Britannia', 'Parle'],
        competitors: ['Local Kirana Stores']
      },
      preferences: {
        categories: ['Groceries', 'Snacks', 'Beverages'],
        brands: ['Amul', 'Britannia', 'Parle'],
        offerTypes: ['Volume Discounts', 'Early Payment Discounts'],
        communicationTime: 'Evening',
        visitingDays: ['Tuesday', 'Thursday', 'Saturday']
      }
    },
    {
      id: 3,
      firstName: 'Mohammed',
      lastName: 'Ali',
      displayName: 'Mohammed Ali',
      email: 'mohammed.ali@yahoo.com',
      phone: '+91 76543 21098',
      mobile: '+91 76543 21098',
      whatsapp: '+91 76543 21098',
      alternatePhone: '+91 11 9876 5432',
      company: 'Ali Super Market',
      title: 'Managing Director',
      department: 'Management',
      businessType: 'Super Market',
      address: '23, Chandni Chowk, Old Delhi',
      area: 'Chandni Chowk',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110006',
      country: 'India',
      gstNumber: 'GSTIN07KLMNO9012P3Q7',
      panNumber: 'KLMNO9012P',
      aadharNumber: '9012 3456 7890',
      businessLicense: 'DL/BL/2022/54321',
      birthday: '1970-11-05',
      anniversary: '1995-04-20',
      joiningDate: '2022-12-10',
      source: 'Direct',
      referredBy: '',
      tags: ['Premium', 'Bulk Buyer', 'Long-term', 'Multi-location'],
      notes: 'Established business with multiple locations. Volume buyer with excellent payment history.',
      lastContact: '2024-10-08',
      lastPurchase: '2024-10-07',
      nextFollowUp: '2024-10-20',
      preferredContact: 'In-Person',
      preferredLanguage: 'English',
      socialProfiles: {
        whatsapp: '+91 76543 21098',
        facebook: 'facebook.com/alisupermarket',
        instagram: '@alisupermarket'
      },
      status: 'Active',
      customerSegment: 'Premium',
      creditLimit: 100000,
      outstandingAmount: 25000,
      paymentTerms: '45 days',
      preferredPaymentMode: 'UPI',
      loyaltyMember: true,
      loyaltyPoints: 4250,
      totalPurchases: 425000,
      averageOrderValue: 15500,
      lastOrderAmount: 32000,
      totalOrders: 32,
      family: {
        spouse: 'Fatima Ali',
        children: 3,
        spousePhone: '+91 76543 21099'
      },
      businessDetails: {
        establishedYear: 2010,
        employeeCount: 15,
        monthlyTurnover: 1200000,
        mainProducts: ['Groceries', 'Electronics', 'Clothing', 'Home Appliances'],
        suppliers: ['Samsung', 'LG', 'Sony', 'Reliance', 'ITC'],
        competitors: ['Big Bazaar', 'More Supermarket', 'Spencer\'s']
      },
      preferences: {
        categories: ['Electronics', 'Groceries', 'Clothing'],
        brands: ['Samsung', 'LG', 'Sony', 'ITC', 'HUL'],
        offerTypes: ['Volume Discounts', 'Seasonal Offers'],
        communicationTime: 'Afternoon',
        visitingDays: ['Monday', 'Wednesday', 'Friday']
      }
    }
  ]);




  const [searchTerm, setSearchTerm] = useState('');
  const [filterBusinessType, setFilterBusinessType] = useState('All');
  const [filterSegment, setFilterSegment] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedContact, setSelectedContact] = useState(null);
  const [showAddContact, setShowAddContact] = useState(false);
  const [activeView, setActiveView] = useState('cards');

  const businessTypes = ['All', 'General Store', 'Kirana Store', 'Super Market', 'Grocery Store', 'Wholesale', 'Distributor'];
  const segments = ['All', 'Premium', 'Standard', 'Basic'];
  const statuses = ['All', 'Active', 'Inactive', 'Lead', 'Prospect'];

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.includes(searchTerm) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesBusinessType = filterBusinessType === 'All' || contact.businessType === filterBusinessType;
    const matchesSegment = filterSegment === 'All' || contact.customerSegment === filterSegment;
    const matchesStatus = filterStatus === 'All' || contact.status === filterStatus;

    return matchesSearch && matchesBusinessType && matchesSegment && matchesStatus;
  });

  const formatIndianCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getSegmentColor = (segment) => {
    const colors = {
      'Premium': 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
      'Standard': 'bg-blue-100 text-blue-800',
      'Basic': 'bg-gray-100 text-gray-800'
    };
    return colors[segment] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'Inactive': 'bg-gray-100 text-gray-800',
      'Lead': 'bg-yellow-100 text-yellow-800',
      'Prospect': 'bg-blue-100 text-blue-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

   const [activeFormTab, setActiveFormTab] = useState('personal');
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    displayName: '',
    email: '',
    phone: '',
    mobile: '',
    whatsapp: '',
    alternatePhone: '',
    company: '',
    title: '',
    department: '',
    businessType: '',
    address: '',
    state: '',
    pincode: '',
    country: 'India',
    gstNumber: '',
    panNumber: '',
    aadharNumber: '',
    businessLicense: '',
    birthday: '',
    anniversary: '',
    joiningDate: '',
    source: '',
    referredBy: '',
    tags: [],
    notes: '',
    lastContact: '',
    lastPurchase: '',
    nextFollowUp: '',
    preferredContact: 'WhatsApp',
    preferredLanguage: 'English',
    whatsappProfile: '',
    facebook: '',
    instagram: '',
    status: 'Active',
    customerSegment: 'Standard',
    creditLimit: '',
    outstandingAmount: '',
    paymentTerms: [],
    preferredPaymentMode: [],
    loyaltyMember: false,
    loyaltyPoints: 0,
    totalPurchases: 0,
    averageOrderValue: 0,
    lastOrderAmount: 0,
    totalOrders: 0,
    spouse: '',
    children: '',
    spousePhone: '',
    establishedYear: '',
    employeeCount: '',
    monthlyTurnover: '',
    mainProducts: '',
    suppliers: '',
    competitors: '',
    categories: '',
    brands: '',
    offerTypes: '',
    communicationTime: '',
    visitingDays: ''
  });

  // Available options for checkboxes
  const tagOptions = ['VIP', 'High Value', 'Regular Customer', 'Local', 'Wholesale', 'Retail', 'Premium', 'New'];
  const paymentTermsOptions = ['15 days', '30 days', '45 days', '60 days', '90 days', 'Immediate'];
  const paymentModeOptions = ['UPI', 'Cash', 'Card', 'Net Banking', 'Credit', 'Cheque'];

  // Handle Edit Contact
  const handleEdit = (contact) => {
    // Populate form with contact data
    setFormData({
      firstName: contact.firstName,
      lastName: contact.lastName,
      displayName: contact.displayName,
      email: contact.email,
      phone: contact.phone,
      mobile: contact.mobile,
      whatsapp: contact.whatsapp,
      alternatePhone: contact.alternatePhone,
      company: contact.company,
      title: contact.title,
      department: contact.department,
      businessType: contact.businessType,
      address: contact.address,
      state: contact.state,
      pincode: contact.pincode,
      country: contact.country,
      gstNumber: contact.gstNumber,
      panNumber: contact.panNumber,
      aadharNumber: contact.aadharNumber,
      businessLicense: contact.businessLicense,
      birthday: contact.birthday,
      anniversary: contact.anniversary,
      joiningDate: contact.joiningDate,
      source: contact.source,
      referredBy: contact.referredBy,
      tags: contact.tags,
      notes: contact.notes,
      lastContact: contact.lastContact,
      lastPurchase: contact.lastPurchase,
      nextFollowUp: contact.nextFollowUp,
      preferredContact: contact.preferredContact,
      preferredLanguage: contact.preferredLanguage,
      whatsappProfile: contact.socialProfiles?.whatsapp || '',
      facebook: contact.socialProfiles?.facebook || '',
      instagram: contact.socialProfiles?.instagram || '',
      status: contact.status,
      customerSegment: contact.customerSegment,
      creditLimit: contact.creditLimit,
      outstandingAmount: contact.outstandingAmount,
      paymentTerms: [contact.paymentTerms],
      preferredPaymentMode: [contact.preferredPaymentMode],
      loyaltyMember: contact.loyaltyMember,
      loyaltyPoints: contact.loyaltyPoints,
      totalPurchases: contact.totalPurchases,
      averageOrderValue: contact.averageOrderValue,
      lastOrderAmount: contact.lastOrderAmount,
      totalOrders: contact.totalOrders,
      spouse: contact.family?.spouse || '',
      children: contact.family?.children || '',
      spousePhone: contact.family?.spousePhone || '',
      establishedYear: contact.businessDetails?.establishedYear || '',
      employeeCount: contact.businessDetails?.employeeCount || '',
      monthlyTurnover: contact.businessDetails?.monthlyTurnover || '',
      mainProducts: contact.businessDetails?.mainProducts?.join(', ') || '',
      suppliers: contact.businessDetails?.suppliers?.join(', ') || '',
      competitors: contact.businessDetails?.competitors?.join(', ') || '',
      categories: contact.preferences?.categories?.join(', ') || '',
      brands: contact.preferences?.brands?.join(', ') || '',
      offerTypes: contact.preferences?.offerTypes?.join(', ') || '',
      communicationTime: contact.preferences?.communicationTime || '',
      visitingDays: contact.preferences?.visitingDays?.join(', ') || ''
    });

    setShowAddContact(true);
    setActiveFormTab('personal');
    setMenuOpen(null); // Close menu
  };

  // Handle Delete Contact
  const handleDelete = (contactId) => {
    if (window.confirm('Are you sure you want to delete this contact? This action cannot be undone.')) {
      setContacts(prev => prev.filter(contact => contact.id !== contactId));
      setMenuOpen(null); // Close menu
      alert('Contact deleted successfully!');
    }
  };

  // Close menu when clicking outside
useEffect(() => {
  const handleClickOutside = (event) => {
    if (menuOpen && !event.target.closest('.contact-menu')) {
      setMenuOpen(null);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  document.addEventListener('scroll', () => setMenuOpen(null)); // Close on scroll
  
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
    document.removeEventListener('scroll', () => setMenuOpen(null));
  };
}, [menuOpen]);


  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCheckboxArrayChange = (name, value) => {
    setFormData(prev => {
      const currentArray = prev[name];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      return {
        ...prev,
        [name]: newArray
      };
    });
  };

const handleSubmit = (e) => {
  e.preventDefault();
  
  // Generate display name if not provided
  const displayName = formData.displayName || `${formData.firstName} ${formData.lastName}`.trim();
  
  // Process comma-separated fields into arrays
  const processCommaSeparated = (value) => {
    if (!value) return [];
    return value.split(',').map(item => item.trim()).filter(item => item !== '');
  };

  // Create new contact object
  const newContact = {
    id: contacts.length > 0 ? Math.max(...contacts.map(c => c.id)) + 1 : 1,
    
    // Personal Information
    firstName: formData.firstName,
    lastName: formData.lastName,
    displayName: displayName,
    email: formData.email,
    phone: formData.phone,
    mobile: formData.mobile,
    whatsapp: formData.whatsapp,
    alternatePhone: formData.alternatePhone,
    
    // Business Information
    company: formData.company,
    title: formData.title,
    department: formData.department,
    businessType: formData.businessType,
    
    // Address Information
    address: formData.address,
    area: '', // You might want to add this field to your form
    city: '', // You might want to add this field to your form
    state: formData.state,
    pincode: formData.pincode,
    country: formData.country,
    
    // Legal Documents
    gstNumber: formData.gstNumber,
    panNumber: formData.panNumber,
    aadharNumber: formData.aadharNumber,
    businessLicense: formData.businessLicense,
    
    // Dates
    birthday: formData.birthday,
    anniversary: formData.anniversary,
    joiningDate: formData.joiningDate || new Date().toISOString().split('T')[0],
    
    // Source and Referral
    source: formData.source,
    referredBy: formData.referredBy,
    
    // Tags and Notes
    tags: formData.tags,
    notes: formData.notes,
    
    // Contact History
    lastContact: formData.lastContact,
    lastPurchase: formData.lastPurchase,
    nextFollowUp: formData.nextFollowUp,
    
    // Preferences
    preferredContact: formData.preferredContact,
    preferredLanguage: formData.preferredLanguage,
    
    // Social Profiles
    socialProfiles: {
      whatsapp: formData.whatsappProfile,
      facebook: formData.facebook,
      instagram: formData.instagram
    },
    
    // Status and Segment
    status: formData.status,
    customerSegment: formData.customerSegment,
    
    // Financial Information
    creditLimit: parseFloat(formData.creditLimit) || 0,
    outstandingAmount: parseFloat(formData.outstandingAmount) || 0,
    paymentTerms: formData.paymentTerms.length > 0 ? formData.paymentTerms[0] : '30 days', // Take first selected
    preferredPaymentMode: formData.preferredPaymentMode.length > 0 ? formData.preferredPaymentMode[0] : 'UPI', // Take first selected
    loyaltyMember: formData.loyaltyMember,
    loyaltyPoints: parseInt(formData.loyaltyPoints) || 0,
    totalPurchases: parseFloat(formData.totalPurchases) || 0,
    averageOrderValue: parseFloat(formData.averageOrderValue) || 0,
    lastOrderAmount: parseFloat(formData.lastOrderAmount) || 0,
    totalOrders: parseInt(formData.totalOrders) || 0,
    
    // Family Information
    family: {
      spouse: formData.spouse,
      children: parseInt(formData.children) || 0,
      spousePhone: formData.spousePhone
    },
    
    // Business Details
    businessDetails: {
      establishedYear: parseInt(formData.establishedYear) || new Date().getFullYear(),
      employeeCount: parseInt(formData.employeeCount) || 0,
      monthlyTurnover: parseFloat(formData.monthlyTurnover) || 0,
      mainProducts: processCommaSeparated(formData.mainProducts),
      suppliers: processCommaSeparated(formData.suppliers),
      competitors: processCommaSeparated(formData.competitors)
    },
    
    // Customer Preferences
    preferences: {
      categories: processCommaSeparated(formData.categories),
      brands: processCommaSeparated(formData.brands),
      offerTypes: processCommaSeparated(formData.offerTypes),
      communicationTime: formData.communicationTime,
      visitingDays: processCommaSeparated(formData.visitingDays)
    }
  };

  // Add the new contact to the contacts array
  setContacts(prev => [...prev, newContact]);
  
  // Reset form and close modal
  resetFormData();
  setShowAddContact(false);
  setActiveFormTab('personal');
  
  // Show success message
  alert(`✅ Contact "${displayName}" added successfully!`);
};

// Updated resetFormData function with proper field reset
const resetFormData = () => {
  setFormData({
    firstName: '',
    lastName: '',
    displayName: '',
    email: '',
    phone: '',
    mobile: '',
    whatsapp: '',
    alternatePhone: '',
    company: '',
    title: '',
    department: '',
    businessType: '',
    address: '',
    state: '',
    pincode: '',
    country: 'India',
    gstNumber: '',
    panNumber: '',
    aadharNumber: '',
    businessLicense: '',
    birthday: '',
    anniversary: '',
    joiningDate: '',
    source: '',
    referredBy: '',
    tags: [],
    notes: '',
    lastContact: '',
    lastPurchase: '',
    nextFollowUp: '',
    preferredContact: 'WhatsApp',
    preferredLanguage: 'English',
    whatsappProfile: '',
    facebook: '',
    instagram: '',
    status: 'Active',
    customerSegment: 'Standard',
    creditLimit: '',
    outstandingAmount: '',
    paymentTerms: [],
    preferredPaymentMode: [],
    loyaltyMember: false,
    loyaltyPoints: 0,
    totalPurchases: 0,
    averageOrderValue: 0,
    lastOrderAmount: 0,
    totalOrders: 0,
    spouse: '',
    children: '',
    spousePhone: '',
    establishedYear: '',
    employeeCount: '',
    monthlyTurnover: '',
    mainProducts: '',
    suppliers: '',
    competitors: '',
    categories: '',
    brands: '',
    offerTypes: '',
    communicationTime: '',
    visitingDays: ''
  });
};
  
// Export Function - Place this with your other functions
const handleExport = () => {
  try {
    // Export all contact fields
    const exportData = contacts.map(contact => ({
      // Personal Information
      'First Name': contact.firstName || '',
      'Last Name': contact.lastName || '',
      'Display Name': contact.displayName || '',
      'Email': contact.email || '',
      'Phone': contact.phone || '',
      'Mobile': contact.mobile || '',
      'WhatsApp': contact.whatsapp || '',
      'Alternate Phone': contact.alternatePhone || '',
      
      // Business Information
      'Company': contact.company || '',
      'Title': contact.title || '',
      'Department': contact.department || '',
      'Business Type': contact.businessType || '',
      
      // Address Information
      'Address': contact.address || '',
      'Area': contact.area || '',
      'City': contact.city || '',
      'State': contact.state || '',
      'PIN Code': contact.pincode || '',
      'Country': contact.country || '',
      
      // Legal Documents
      'GST Number': contact.gstNumber || '',
      'PAN Number': contact.panNumber || '',
      'Aadhar Number': contact.aadharNumber || '',
      'Business License': contact.businessLicense || '',
      
      // Dates
      'Birthday': contact.birthday || '',
      'Anniversary': contact.anniversary || '',
      'Joining Date': contact.joiningDate || '',
      
      // Source and Referral
      'Source': contact.source || '',
      'Referred By': contact.referredBy || '',
      
      // Tags and Notes
      'Tags': contact.tags?.join(', ') || '',
      'Notes': contact.notes || '',
      
      // Contact History
      'Last Contact': contact.lastContact || '',
      'Last Purchase': contact.lastPurchase || '',
      'Next Follow Up': contact.nextFollowUp || '',
      
      // Preferences
      'Preferred Contact': contact.preferredContact || '',
      'Preferred Language': contact.preferredLanguage || '',
      
      // Social Profiles
      'WhatsApp Profile': contact.socialProfiles?.whatsapp || '',
      'Facebook': contact.socialProfiles?.facebook || '',
      'Instagram': contact.socialProfiles?.instagram || '',
      
      // Status and Segment
      'Status': contact.status || '',
      'Customer Segment': contact.customerSegment || '',
      
      // Financial Information
      'Credit Limit': contact.creditLimit || 0,
      'Outstanding Amount': contact.outstandingAmount || 0,
      'Payment Terms': contact.paymentTerms || '',
      'Preferred Payment Mode': contact.preferredPaymentMode || '',
      'Loyalty Member': contact.loyaltyMember ? 'Yes' : 'No',
      'Loyalty Points': contact.loyaltyPoints || 0,
      'Total Purchases': contact.totalPurchases || 0,
      'Average Order Value': contact.averageOrderValue || 0,
      'Last Order Amount': contact.lastOrderAmount || 0,
      'Total Orders': contact.totalOrders || 0,
      
      // Family Information
      'Spouse Name': contact.family?.spouse || '',
      'Children': contact.family?.children || 0,
      'Spouse Phone': contact.family?.spousePhone || '',
      
      // Business Details
      'Established Year': contact.businessDetails?.establishedYear || '',
      'Employee Count': contact.businessDetails?.employeeCount || 0,
      'Monthly Turnover': contact.businessDetails?.monthlyTurnover || 0,
      'Main Products': contact.businessDetails?.mainProducts?.join(', ') || '',
      'Suppliers': contact.businessDetails?.suppliers?.join(', ') || '',
      'Competitors': contact.businessDetails?.competitors?.join(', ') || '',
      
      // Customer Preferences
      'Preferred Categories': contact.preferences?.categories?.join(', ') || '',
      'Preferred Brands': contact.preferences?.brands?.join(', ') || '',
      'Preferred Offer Types': contact.preferences?.offerTypes?.join(', ') || '',
      'Communication Time': contact.preferences?.communicationTime || '',
      'Visiting Days': contact.preferences?.visitingDays?.join(', ') || ''
    }));

    // Create Excel workbook
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(exportData);
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Retail Contacts');
    
    // Generate filename with current date
    const fileName = `retail_contacts_complete_${new Date().toISOString().split('T')[0]}.xlsx`;
    
    // Download the file
    XLSX.writeFile(wb, fileName);
    
    // Show success message
    alert(`✅ Exported ${contacts.length} contacts with all data fields successfully!`);
    
  } catch (error) {
    console.error('Export error:', error);
    alert('❌ Error exporting contacts. Please try again.');
  }
};

// Import Function - Place this with your other functions
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

      // Duplicate check function
      const isDuplicateContact = (newContact, existingContacts) => {
        return existingContacts.some(existingContact => 
          (newContact.phone && existingContact.phone === newContact.phone) ||
          (newContact.email && existingContact.email === newContact.email) ||
          (newContact.displayName === existingContact.displayName && 
           newContact.company === existingContact.company)
        );
      };

      // Map imported data with ALL fields
      const importedContacts = jsonData.map((row, index) => {
        const contactId = contacts.length > 0 ? Math.max(...contacts.map(c => c.id)) + index + 1 : index + 1;
        
        const ownerName = row['Owner Name'] || row['Owner'] || row['Contact Name'] || row['Name'] || row['Display Name'] || '';
        let firstName = row['First Name'] || '';
        let lastName = row['Last Name'] || '';
        
        if (ownerName && !firstName) {
          const nameParts = ownerName.split(' ');
          firstName = nameParts[0] || '';
          lastName = nameParts.slice(1).join(' ') || '';
        }

        const displayName = row['Display Name'] || ownerName || `${firstName} ${lastName}`.trim();

        return {
          id: contactId,
          // Personal Information
          firstName: firstName,
          lastName: lastName,
          displayName: displayName,
          email: row['Email'] || '',
          phone: row['Phone'] || row['phone'] || row['Contact'] || row['Mobile'] || '',
          mobile: row['Mobile'] || row['mobile'] || row['Phone'] || '',
          whatsapp: row['WhatsApp'] || row['whatsapp'] || row['Phone'] || '',
          alternatePhone: row['Alternate Phone'] || '',
          
          // Business Information
          company: row['Company'] || row['Shop Name'] || row['Business'] || row['Store'] || '',
          title: row['Title'] || '',
          department: row['Department'] || '',
          businessType: row['Business Type'] || row['Type'] || row['Category'] || 'General Store',
          
          // Address Information
          address: row['Address'] || row['address'] || row['Location'] || '',
          area: row['Area'] || row['area'] || row['Locality'] || '',
          city: row['City'] || row['city'] || '',
          state: row['State'] || row['state'] || '',
          pincode: row['PIN Code'] || row['Pincode'] || row['Zip Code'] || '',
          country: row['Country'] || 'India',
          
          // Legal Documents
          gstNumber: row['GST Number'] || row['GST'] || row['GSTIN'] || '',
          panNumber: row['PAN Number'] || row['PAN'] || '',
          aadharNumber: row['Aadhar Number'] || row['Aadhar'] || '',
          businessLicense: row['Business License'] || row['License'] || '',
          
          // Dates
          birthday: row['Birthday'] || row['Date of Birth'] || '',
          anniversary: row['Anniversary'] || row['Marriage Anniversary'] || '',
          joiningDate: row['Joining Date'] || row['Created Date'] || new Date().toISOString().split('T')[0],
          
          // Source and Referral
          source: row['Source'] || row['Lead Source'] || 'Import',
          referredBy: row['Referred By'] || row['Reference'] || '',
          
          // Tags and Notes
          tags: row['Tags'] ? row['Tags'].split(',').map(tag => tag.trim()) : [],
          notes: row['Notes'] || row['Remarks'] || '',
          
          // Contact History
          lastContact: row['Last Contact'] || row['Last Contact Date'] || '',
          lastPurchase: row['Last Purchase'] || row['Last Order Date'] || '',
          nextFollowUp: row['Next Follow Up'] || row['Next Contact'] || '',
          
          // Preferences
          preferredContact: row['Preferred Contact'] || row['Contact Method'] || 'WhatsApp',
          preferredLanguage: row['Preferred Language'] || row['Language'] || 'Hindi',
          
          // Social Profiles
          socialProfiles: {
            whatsapp: row['WhatsApp Profile'] || row['WhatsApp'] || row['whatsapp'] || row['Phone'] || '',
            facebook: row['Facebook'] || row['facebook'] || '',
            instagram: row['Instagram'] || row['instagram'] || ''
          },
          
          // Status and Segment
          status: row['Status'] || row['Customer Status'] || 'Active',
          customerSegment: row['Customer Segment'] || row['Segment'] || 'Standard',
          
          // Financial Information
          creditLimit: parseFloat(row['Credit Limit']) || 0,
          outstandingAmount: parseFloat(row['Outstanding Amount']) || 0,
          paymentTerms: row['Payment Terms'] || row['Terms'] || '30 days',
          preferredPaymentMode: row['Preferred Payment Mode'] || row['Payment Method'] || 'UPI',
          loyaltyMember: row['Loyalty Member'] === 'Yes',
          loyaltyPoints: parseInt(row['Loyalty Points']) || 0,
          totalPurchases: parseFloat(row['Total Purchases']) || 0,
          averageOrderValue: parseFloat(row['Average Order Value']) || 0,
          lastOrderAmount: parseFloat(row['Last Order Amount']) || 0,
          totalOrders: parseInt(row['Total Orders']) || 0,
          
          // Family Information
          family: {
            spouse: row['Spouse Name'] || row['Spouse'] || '',
            children: parseInt(row['Children']) || 0,
            spousePhone: row['Spouse Phone'] || row['Spouse Contact'] || ''
          },
          
          // Business Details
          businessDetails: {
            establishedYear: parseInt(row['Established Year']) || new Date().getFullYear(),
            employeeCount: parseInt(row['Employee Count']) || 0,
            monthlyTurnover: parseFloat(row['Monthly Turnover']) || 0,
            mainProducts: row['Main Products'] ? row['Main Products'].split(',').map(p => p.trim()) : [],
            suppliers: row['Suppliers'] ? row['Suppliers'].split(',').map(s => s.trim()) : [],
            competitors: row['Competitors'] ? row['Competitors'].split(',').map(c => c.trim()) : []
          },
          
          // Customer Preferences
          preferences: {
            categories: row['Preferred Categories'] ? row['Preferred Categories'].split(',').map(c => c.trim()) : [],
            brands: row['Preferred Brands'] ? row['Preferred Brands'].split(',').map(b => b.trim()) : [],
            offerTypes: row['Preferred Offer Types'] ? row['Preferred Offer Types'].split(',').map(o => o.trim()) : [],
            communicationTime: row['Communication Time'] || '',
            visitingDays: row['Visiting Days'] ? row['Visiting Days'].split(',').map(d => d.trim()) : []
          }
        };
      });

      // Filter valid contacts
      const validContacts = importedContacts.filter(contact => 
        contact.company && (contact.phone || contact.email || contact.displayName)
      );

      // Remove duplicates
      const newContacts = validContacts.filter(contact => 
        !isDuplicateContact(contact, contacts)
      );

      if (newContacts.length === 0) {
        const duplicateCount = validContacts.length - newContacts.length;
        alert(`❌ All ${duplicateCount} contacts in the file already exist. No new contacts were added.`);
        event.target.value = '';
        return;
      }

      // Show confirmation dialog
      const duplicateCount = validContacts.length - newContacts.length;
      const previewText = newContacts.slice(0, 3).map(contact => 
        `• ${contact.displayName} - ${contact.company}`
      ).join('\n');

      const extraCount = newContacts.length > 3 ? `\n... and ${newContacts.length - 3} more` : '';
      const duplicateMessage = duplicateCount > 0 ? `\n\n⚠️ ${duplicateCount} duplicate contacts will be skipped` : '';

      const dialogMessage = 
        `📊 Found ${validContacts.length} contacts in the file.\n` +
        `✅ ${newContacts.length} new contacts will be added.${duplicateMessage}\n\n` +
        'New contacts:\n' +
        previewText +
        extraCount;

      const userConfirmed = window.confirm(dialogMessage);
      
      if (!userConfirmed) {
        alert('❌ Import cancelled. No contacts were added.');
        event.target.value = '';
        return;
      }

      // Add new contacts
      setContacts(prev => [...prev, ...newContacts]);
      alert(`✅ Successfully imported ${newContacts.length} contacts with complete data!${duplicateCount > 0 ? ` ${duplicateCount} duplicates skipped.` : ''}`);
      event.target.value = '';

    } catch (error) {
      console.error('Import error:', error);
      alert(`❌ Error importing file: ${error.message}\n\nPlease check the file format and try again.`);
      event.target.value = '';
    }
  };

  reader.onerror = () => {
    alert('❌ Error reading file. Please try again.');
    event.target.value = '';
  };

  reader.readAsArrayBuffer(file);
};

  const ContactCard = ({ contact }) => (
    <div className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
            {contact.firstName[0]}{contact.lastName[0]}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{contact.displayName}</h3>
            <p className="text-sm text-gray-500">{contact.title} • {contact.company}</p>
            <p className="text-xs text-gray-400">{contact.businessType}</p>
          </div>
        </div>
         <div className="relative">
        <button 
          type="button"
          className="p-1 text-gray-400 hover:text-gray-600"
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(menuOpen === contact.id ? null : contact.id);
          }}
        >
          <MoreVertical className="h-4 w-4" />
        </button>
        
        {menuOpen === contact.id && (
          <div className="absolute right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 min-w-[120px]">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEdit(contact);
              }}
              className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
            >
              <Edit className="h-4 w-4" />
              <span>Edit</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(contact.id);
              }}
              className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </button>
          </div>
        )}
      </div>
      </div>

      {/* Status and Segment */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contact.status)}`}>
          {contact.status}
        </span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSegmentColor(contact.customerSegment)}`}>
          {contact.customerSegment}
        </span>
        {contact.loyaltyMember && (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Gift className="h-3 w-3 inline mr-1" />
            Loyalty Member
          </span>
        )}
      </div>

      {/* Contact Information */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <Phone className="h-4 w-4 mr-2 text-blue-500" />
          {contact.phone}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <MessageSquare className="h-4 w-4 mr-2 text-green-500" />
          WhatsApp: {contact.whatsapp}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Mail className="h-4 w-4 mr-2 text-purple-500" />
          {contact.email}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="h-4 w-4 mr-2 text-red-500" />
          {contact.area}, {contact.city}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <FileText className="h-4 w-4 mr-2 text-orange-500" />
          GST: {contact.gstNumber}
        </div>
      </div>

      {/* Business Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500">Total Purchases</p>
          <p className="font-semibold text-green-600">{formatIndianCurrency(contact.totalPurchases)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Orders</p>
          <p className="font-semibold text-blue-600">{contact.totalOrders}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Outstanding</p>
          <p className="font-semibold text-red-600">{formatIndianCurrency(contact.outstandingAmount)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Loyalty Points</p>
          <p className="font-semibold text-yellow-600">{contact.loyaltyPoints}</p>
        </div>
      </div>

      {/* Business Details */}
      <div className="mb-4">
        <div className="flex items-center text-xs text-gray-500 mb-2">
          <Store className="h-3 w-3 mr-1" />
          Est. {contact.businessDetails.establishedYear} • {contact.businessDetails.employeeCount} employees
        </div>
        <div className="flex items-center text-xs text-gray-500">
          <TrendingUp className="h-3 w-3 mr-1" />
          Monthly Turnover: {formatIndianCurrency(contact.businessDetails.monthlyTurnover)}
        </div>
      </div>

      {/* Tags */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-1">
          {contact.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
              {tag}
            </span>
          ))}
          {contact.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
              +{contact.tags.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Last Activity */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Last Contact:</span>
          <span className="font-medium">{new Date(contact.lastContact).toLocaleDateString('en-IN')}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Next Follow-up:</span>
          <span className="font-medium text-blue-600">{new Date(contact.nextFollowUp).toLocaleDateString('en-IN')}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={() => setSelectedContact(contact)}
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
          <Mail className="h-4 w-4" />
        </button>
      </div>
    </div>
  );

  const ContactTable = () => (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchases</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Outstanding</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredContacts.map((contact) => (
              <tr key={contact.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {contact.firstName[0]}{contact.lastName[0]}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{contact.displayName}</div>
                      <div className="text-sm text-gray-500">{contact.phone}</div>
                      <div className="text-sm text-gray-500">{contact.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{contact.company}</div>
                  <div className="text-sm text-gray-500">{contact.businessType}</div>
                  <div className="text-sm text-gray-500">GST: {contact.gstNumber}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{contact.area}</div>
                  <div className="text-sm text-gray-500">{contact.city}, {contact.state}</div>
                  <div className="text-sm text-gray-500">{contact.pincode}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{formatIndianCurrency(contact.totalPurchases)}</div>
                  <div className="text-sm text-gray-500">{contact.totalOrders} orders</div>
                  <div className="text-sm text-gray-500">Avg: {formatIndianCurrency(contact.averageOrderValue)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-red-600">{formatIndianCurrency(contact.outstandingAmount)}</div>
                  <div className="text-sm text-gray-500">Limit: {formatIndianCurrency(contact.creditLimit)}</div>
                  <div className="text-sm text-gray-500">{contact.paymentTerms}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col space-y-1">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(contact.status)}`}>
                      {contact.status}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getSegmentColor(contact.customerSegment)}`}>
                      {contact.customerSegment}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedContact(contact)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-900">
                      <Phone className="h-4 w-4" />
                    </button>
                    <button className="text-purple-600 hover:text-purple-900">
                      <MessageSquare className="h-4 w-4" />
                    </button>
                    <div className="relative">
                    <button
                      className="text-gray-600 hover:text-gray-900"
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpen(menuOpen === contact.id ? null : contact.id);
                      }}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>
                    
                    {menuOpen === contact.id && (
                     <div className="absolute right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 min-w-[120px]">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(contact);
                          }}
                          className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                        >
                          <Edit className="h-4 w-4" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(contact.id);
                          }}
                          className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span>Delete</span>
                        </button>
                      </div>
                    )}
                  </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

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
              <h1 className="text-2xl font-bold text-gray-900">Indian Retail Contact Management</h1>
              <p className="text-gray-600">Manage retail contacts from small shops to supermarkets</p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Import Button */}
            <button 
              onClick={handleImport}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2 transition-colors shadow-sm"
              type="button"
            >
              <Upload className="h-4 w-4" />
              <span>Import</span>
            </button>
            
            {/* Export Button */}
            <button 
              onClick={handleExport}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors shadow-sm"
              type="button"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
              <button
                onClick={() => {
                  resetFormData();
                  setActiveFormTab('personal');
                  setShowAddContact(true)
                }}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add Contact</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="p-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search contacts by name, company, phone, email, or location..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filterBusinessType}
                onChange={(e) => setFilterBusinessType(e.target.value)}
              >
                {businessTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filterSegment}
                onChange={(e) => setFilterSegment(e.target.value)}
              >
                {segments.map(segment => (
                  <option key={segment} value={segment}>{segment}</option>
                ))}
              </select>

              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-600">
              Showing {filteredContacts.length} of {contacts.length} contacts
            </p>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveView('cards')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  activeView === 'cards' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Cards
              </button>
              <button
                onClick={() => setActiveView('table')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  activeView === 'table' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Table
              </button>
            </div>
          </div>
        </div>

        {/* Contacts Display */}
        {activeView === 'cards' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredContacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))}
          </div>
        ) : (
          <ContactTable />
        )}
      </div>
      

      {/* Contact Detail Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-semibold">Contact Details - {selectedContact.displayName}</h3>
              <button
                onClick={() => setSelectedContact(null)}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-8">
              {/* Personal Information */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2 text-blue-600" />
                  Personal Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <p className="text-sm text-gray-900">{selectedContact.displayName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <p className="text-sm text-gray-900">{selectedContact.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
                    <p className="text-sm text-gray-900">{selectedContact.whatsapp}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-sm text-gray-900">{selectedContact.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Birthday</label>
                    <p className="text-sm text-gray-900">{new Date(selectedContact.birthday).toLocaleDateString('en-IN')}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Language</label>
                    <p className="text-sm text-gray-900">{selectedContact.preferredLanguage}</p>
                  </div>
                </div>
              </div>

              {/* Business Information */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Building className="h-5 w-5 mr-2 text-purple-600" />
                  Business Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <p className="text-sm text-gray-900">{selectedContact.company}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
                    <p className="text-sm text-gray-900">{selectedContact.businessType}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">GST Number</label>
                    <p className="text-sm text-gray-900">{selectedContact.gstNumber}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label>
                    <p className="text-sm text-gray-900">{selectedContact.panNumber}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Established</label>
                    <p className="text-sm text-gray-900">{selectedContact.businessDetails.establishedYear}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Employees</label>
                    <p className="text-sm text-gray-900">{selectedContact.businessDetails.employeeCount}</p>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-red-600" />
                  Address Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <p className="text-sm text-gray-900">{selectedContact.address}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
                    <p className="text-sm text-gray-900">{selectedContact.area}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <p className="text-sm text-gray-900">{selectedContact.city}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <p className="text-sm text-gray-900">{selectedContact.state}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">PIN Code</label>
                    <p className="text-sm text-gray-900">{selectedContact.pincode}</p>
                  </div>
                </div>
              </div>

              {/* Financial Information */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <IndianRupee className="h-5 w-5 mr-2 text-green-600" />
                  Financial Information
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-600">Total Purchases</p>
                    <p className="text-lg font-semibold text-green-600">{formatIndianCurrency(selectedContact.totalPurchases)}</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">Total Orders</p>
                    <p className="text-lg font-semibold text-blue-600">{selectedContact.totalOrders}</p>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <p className="text-sm text-gray-600">Outstanding</p>
                    <p className="text-lg font-semibold text-red-600">{formatIndianCurrency(selectedContact.outstandingAmount)}</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-gray-600">Loyalty Points</p>
                    <p className="text-lg font-semibold text-yellow-600">{selectedContact.loyaltyPoints}</p>
                  </div>
                </div>
              </div>

              {/* Business Details */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Store className="h-5 w-5 mr-2 text-orange-600" />
                  Business Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Main Products</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedContact.businessDetails.mainProducts.map((product, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Key Suppliers</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedContact.businessDetails.suppliers.map((supplier, index) => (
                        <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                          {supplier}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Preferences */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Target className="h-5 w-5 mr-2 text-indigo-600" />
                  Customer Preferences
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Categories</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedContact.preferences.categories.map((category, index) => (
                        <span key={index} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Brands</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedContact.preferences.brands.map((brand, index) => (
                        <span key={index} className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                          {brand}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags and Notes */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Tag className="h-5 w-5 mr-2 text-pink-600" />
                  Tags & Notes
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedContact.tags.map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedContact.notes}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Contact Modal */}
      {showAddContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-6 border-b border-gray-200 flex items-center justify-between z-10">
              <h3 className="text-xl font-semibold">
                 Add New Contact
              </h3>
              <button
                onClick={() => {
                  setShowAddContact(false);
                  setActiveFormTab('personal');
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
                  onClick={() => setActiveFormTab('personal')}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeFormTab === 'personal'
                      ? 'border-purple-600 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Personal Info
                </button>
                <button
                  onClick={() => setActiveFormTab('business')}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeFormTab === 'business'
                      ? 'border-purple-600 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Business Info
                </button>
                <button
                  onClick={() => setActiveFormTab('address')}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeFormTab === 'address'
                      ? 'border-purple-600 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Address
                </button>
                <button
                  onClick={() => setActiveFormTab('financial')}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeFormTab === 'financial'
                      ? 'border-purple-600 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Financial
                </button>
                <button
                  onClick={() => setActiveFormTab('family')}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeFormTab === 'family'
                      ? 'border-purple-600 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Family
                </button>
                <button
                  onClick={() => setActiveFormTab('preferences')}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeFormTab === 'preferences'
                      ? 'border-purple-600 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Preferences
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              {/* Personal Information Tab */}
              {activeFormTab === 'personal' && (
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <User className="h-5 w-5 mr-2 text-blue-600" />
                    Personal Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleFormChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleFormChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                      <input
                        type="text"
                        name="displayName"
                        value={formData.displayName}
                        onChange={handleFormChange}
                        placeholder="Auto-generated if empty"
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleFormChange}
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">Alternate Phone</label>
                      <input
                        type="tel"
                        name="alternatePhone"
                        value={formData.alternatePhone}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Birthday</label>
                      <input
                        type="date"
                        name="birthday"
                        value={formData.birthday}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Anniversary</label>
                      <input
                        type="date"
                        name="anniversary"
                        value={formData.anniversary}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Contact Method</label>
                      <select
                        name="preferredContact"
                        value={formData.preferredContact}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="WhatsApp">WhatsApp</option>
                        <option value="Phone">Phone</option>
                        <option value="Email">Email</option>
                        <option value="In-Person">In-Person</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Language</label>
                      <select
                        name="preferredLanguage"
                        value={formData.preferredLanguage}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="English">English</option>
                        <option value="Tamil">Tamil</option>
                        <option value="Malayalam">Malayalam</option>
                        <option value="Telugu">Telugu</option>
                        <option value="Kannada">Kannada</option>
                        <option value="Hindi">Hindi</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Profile</label>
                      <input
                        type="text"
                        name="whatsappProfile"
                        value={formData.whatsappProfile}
                        onChange={handleFormChange}
                        placeholder="+91 98765 43210"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
                      <input
                        type="text"
                        name="facebook"
                        value={formData.facebook}
                        onChange={handleFormChange}
                        placeholder="facebook.com/username"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
                      <input
                        type="text"
                        name="instagram"
                        value={formData.instagram}
                        onChange={handleFormChange}
                        placeholder="@username"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Lead">Lead</option>
                        <option value="Prospect">Prospect</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Customer Segment</label>
                      <select
                        name="customerSegment"
                        value={formData.customerSegment}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="Premium">Premium</option>
                        <option value="Standard">Standard</option>
                        <option value="Basic">Basic</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Contact</label>
                      <input
                        type="date"
                        name="lastContact"
                        value={formData.lastContact}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Purchase</label>
                      <input
                        type="date"
                        name="lastPurchase"
                        value={formData.lastPurchase}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Next Follow-up</label>
                      <input
                        type="date"
                        name="nextFollowUp"
                        value={formData.nextFollowUp}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 border border-gray-300 rounded-lg">
                      {tagOptions.map((tag) => (
                        <label key={tag} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.tags.includes(tag)}
                            onChange={() => handleCheckboxArrayChange('tags', tag)}
                            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                          />
                          <span className="text-sm text-gray-700">{tag}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleFormChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              {/* Business Information Tab */}
              {activeFormTab === 'business' && (
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <Building className="h-5 w-5 mr-2 text-purple-600" />
                    Business Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Business Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleFormChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="">Select Business Type</option>
                        <option value="General Store">General Store</option>
                        <option value="Kirana Store">Kirana Store</option>
                        <option value="Super Market">Super Market</option>
                        <option value="Grocery Store">Grocery Store</option>
                        <option value="Wholesale">Wholesale</option>
                        <option value="Distributor">Distributor</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleFormChange}
                        placeholder="Owner, Manager, etc."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                      <input
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label>
                      <input
                        type="text"
                        name="panNumber"
                        value={formData.panNumber}
                        onChange={handleFormChange}
                        placeholder="ABCDE1234F"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Aadhar Number</label>
                      <input
                        type="text"
                        name="aadharNumber"
                        value={formData.aadharNumber}
                        onChange={handleFormChange}
                        placeholder="1234 5678 9012"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Business License</label>
                      <input
                        type="text"
                        name="businessLicense"
                        value={formData.businessLicense}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Joining Date</label>
                      <input
                        type="date"
                        name="joiningDate"
                        value={formData.joiningDate}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                      <input
                        type="text"
                        name="source"
                        value={formData.source}
                        onChange={handleFormChange}
                        placeholder="Walk-in, Referral, Direct, etc."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
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
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Established Year</label>
                      <input
                        type="number"
                        name="establishedYear"
                        value={formData.establishedYear}
                        onChange={handleFormChange}
                        placeholder="2020"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Employee Count</label>
                      <input
                        type="number"
                        name="employeeCount"
                        value={formData.employeeCount}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Turnover (₹)</label>
                      <input
                        type="number"
                        name="monthlyTurnover"
                        value={formData.monthlyTurnover}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Main Products (comma-separated)</label>
                    <input
                      type="text"
                      name="mainProducts"
                      value={formData.mainProducts}
                      onChange={handleFormChange}
                      placeholder="Groceries, Home Care, Personal Care"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Suppliers (comma-separated)</label>
                    <input
                      type="text"
                      name="suppliers"
                      value={formData.suppliers}
                      onChange={handleFormChange}
                      placeholder="ITC, HUL, Patanjali"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Competitors (comma-separated)</label>
                    <input
                      type="text"
                      name="competitors"
                      value={formData.competitors}
                      onChange={handleFormChange}
                      placeholder="Reliance Fresh, Big Bazaar"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              {/* Address Information Tab */}
              {activeFormTab === 'address' && (
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-red-600" />
                    Address Information
                  </h4>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleFormChange}
                      required
                      placeholder="Shop No. 45, Block A, Connaught Place"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                        placeholder="110001"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Financial Information Tab */}
              {activeFormTab === 'financial' && (
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <IndianRupee className="h-5 w-5 mr-2 text-green-600" />
                    Financial Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Credit Limit (₹)</label>
                      <input
                        type="number"
                        name="creditLimit"
                        value={formData.creditLimit}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Outstanding Amount (₹)</label>
                      <input
                        type="number"
                        name="outstandingAmount"
                        value={formData.outstandingAmount}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Payment Terms</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 border border-gray-300 rounded-lg">
                      {paymentTermsOptions.map((term) => (
                        <label key={term} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.paymentTerms.includes(term)}
                            onChange={() => handleCheckboxArrayChange('paymentTerms', term)}
                            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                          />
                          <span className="text-sm text-gray-700">{term}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Payment Mode</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 border border-gray-300 rounded-lg">
                      {paymentModeOptions.map((mode) => (
                        <label key={mode} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.preferredPaymentMode.includes(mode)}
                            onChange={() => handleCheckboxArrayChange('preferredPaymentMode', mode)}
                            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                          />
                          <span className="text-sm text-gray-700">{mode}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Total Purchases (₹)</label>
                      <input
                        type="number"
                        name="totalPurchases"
                        value={formData.totalPurchases}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Average Order Value (₹)</label>
                      <input
                        type="number"
                        name="averageOrderValue"
                        value={formData.averageOrderValue}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Order Amount (₹)</label>
                      <input
                        type="number"
                        name="lastOrderAmount"
                        value={formData.lastOrderAmount}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Total Orders</label>
                      <input
                        type="number"
                        name="totalOrders"
                        value={formData.totalOrders}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="loyaltyMember"
                          checked={formData.loyaltyMember}
                          onChange={handleFormChange}
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <span className="text-sm font-medium text-gray-700">Loyalty Member</span>
                      </label>
                    </div>
                    {formData.loyaltyMember && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Loyalty Points</label>
                        <input
                          type="number"
                          name="loyaltyPoints"
                          value={formData.loyaltyPoints}
                          onChange={handleFormChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Family Information Tab */}
              {activeFormTab === 'family' && (
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <Users className="h-5 w-5 mr-2 text-pink-600" />
                    Family Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Spouse Name</label>
                      <input
                        type="text"
                        name="spouse"
                        value={formData.spouse}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Spouse Phone</label>
                      <input
                        type="tel"
                        name="spousePhone"
                        value={formData.spousePhone}
                        onChange={handleFormChange}
                        placeholder="+91 98765 43210"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Number of Children</label>
                      <input
                        type="number"
                        name="children"
                        value={formData.children}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Preferences Tab */}
              {activeFormTab === 'preferences' && (
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <Target className="h-5 w-5 mr-2 text-indigo-600" />
                    Customer Preferences
                  </h4>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Categories (comma-separated)</label>
                    <input
                      type="text"
                      name="categories"
                      value={formData.categories}
                      onChange={handleFormChange}
                      placeholder="Groceries, Home Care, Personal Care"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Brands (comma-separated)</label>
                    <input
                      type="text"
                      name="brands"
                      value={formData.brands}
                      onChange={handleFormChange}
                      placeholder="Patanjali, ITC, HUL"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Offer Types (comma-separated)</label>
                    <input
                      type="text"
                      name="offerTypes"
                      value={formData.offerTypes}
                      onChange={handleFormChange}
                      placeholder="Festival Discounts, Bulk Discounts"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Communication Time</label>
                      <select
                        name="communicationTime"
                        value={formData.communicationTime}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="">Select Time</option>
                        <option value="Morning">Morning</option>
                        <option value="Afternoon">Afternoon</option>
                        <option value="Evening">Evening</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Visiting Days (comma-separated)</label>
                      <input
                        type="text"
                        name="visitingDays"
                        value={formData.visitingDays}
                        onChange={handleFormChange}
                        placeholder="Monday, Wednesday, Friday"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Form Actions */}
              <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
              {/* Update the cancel button handler*/}
             <button
                type="button"
                onClick={() => {
                setShowAddContact(false);
                setActiveFormTab('personal');
                resetFormData();
                }}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
              Cancel
            </button>
                {activeFormTab === 'preferences' && (
            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-2"
            >
            <Plus className="h-4 w-4" />
            <span>Add Contact</span>
            </button>
)}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndianRetailContactManagement;