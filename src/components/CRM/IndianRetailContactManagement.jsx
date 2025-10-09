import React, { useState, useEffect } from 'react';
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
  ShoppingCart
} from 'lucide-react';

const IndianRetailContactManagement = () => {
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
      preferredLanguage: 'Hindi',
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
      preferredLanguage: 'Hindi',
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
          <button className="p-1 text-gray-400 hover:text-gray-600">
            <MoreVertical className="h-4 w-4" />
          </button>
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
                    <button className="text-gray-600 hover:text-gray-900">
                      <MoreVertical className="h-4 w-4" />
                    </button>
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
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Indian Retail Contact Management</h1>
              <p className="text-gray-600">Manage retail contacts from small shops to supermarkets</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2">
                <Upload className="h-4 w-4" />
                <span>Import</span>
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
              <button
                onClick={() => setShowAddContact(true)}
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
    </div>
  );
};

export default IndianRetailContactManagement;