import React, { useState } from 'react';
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
  Edit,
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
  Upload
} from 'lucide-react';

const IndianRetailLeadsManagement = () => {
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
    },
    {
      id: 3,
      name: 'Mohammed Yusuf',
      email: 'yusuf.mohammed@hotmail.com',
      phone: '+91 76543 21098',
      whatsapp: '+91 76543 21098',
      company: 'Yusuf Mini Mart',
      businessType: 'Mini Mart',
      source: 'Facebook Lead',
      score: 90,
      estimatedValue: 300000,
      stage: 'Proposal Sent',
      assignedTo: 'Arjun Patel',
      createdDate: '2024-09-28',
      lastActivity: '2024-10-07',
      nextFollowUp: '2024-10-11',
      priority: 'High',
      address: 'Old City, Jamia Nagar, New Delhi',
      area: 'Jamia Nagar',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110025',
      gstNumber: 'GSTIN07CDEF3456G7H8',
      businessYears: 8,
      monthlyTurnover: 400000,
      currentSuppliers: ['Various Distributors', 'Wholesale Markets'],
      painPoints: ['Multiple supplier management', 'Inventory tracking'],
      requirements: ['Single supplier solution', 'Inventory management system'],
      products: ['Groceries', 'Electronics', 'Clothing', 'Cosmetics'],
      preferredBrands: ['Samsung', 'LG', 'Lakme', 'Fair & Lovely'],
      paymentPreference: 'UPI',
      creditRequirement: 75000,
      notes: 'Established business looking to streamline operations. Has 2 stores and planning expansion.',
      interactions: [
        {
          date: '2024-10-07',
          type: 'Business Meeting',
          agent: 'Arjun Patel',
          summary: 'Presented comprehensive proposal. Positive response.',
          nextAction: 'Follow up on decision timeline'
        },
        {
          date: '2024-10-02',
          type: 'Store Audit',
          agent: 'Arjun Patel',
          summary: 'Conducted detailed store audit and needs assessment',
          nextAction: 'Prepare detailed proposal'
        }
      ],
      status: 'Hot Lead',
      segment: 'Growing SMB',
      language: 'Hindi',
      referredBy: 'Ali Super Market',
      competitorAnalysis: {
        currentSupplier: 'Multiple Suppliers',
        pricingGap: '15%',
        serviceGaps: ['No integrated solution', 'Complex billing']
      }
    },
    {
      id: 4,
      name: 'Deepika Kumari',
      email: 'deepika.k@gmail.com',
      phone: '+91 65432 10987',
      whatsapp: '+91 65432 10987',
      company: 'Kumari General Store',
      businessType: 'General Store',
      source: 'Google Search',
      score: 45,
      estimatedValue: 60000,
      stage: 'New',
      assignedTo: 'Neha Gupta',
      createdDate: '2024-10-05',
      lastActivity: '2024-10-05',
      nextFollowUp: '2024-10-08',
      priority: 'Low',
      address: 'Village Badarpur, South Delhi',
      area: 'Badarpur',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110044',
      gstNumber: '',
      businessYears: 1,
      monthlyTurnover: 50000,
      currentSuppliers: ['Local Wholesale Market'],
      painPoints: ['Transportation costs', 'Limited product variety'],
      requirements: ['Home delivery', 'Small order quantities'],
      products: ['Basic Groceries', 'Daily Essentials'],
      preferredBrands: ['Local Brands', 'Economical Options'],
      paymentPreference: 'Cash',
      creditRequirement: 10000,
      notes: 'New business in rural area. Price sensitive. Needs basic support.',
      interactions: [
        {
          date: '2024-10-05',
          type: 'WhatsApp Inquiry',
          agent: 'Neha Gupta',
          summary: 'Initial inquiry received via WhatsApp',
          nextAction: 'Schedule introductory call'
        }
      ],
      status: 'Cold Lead',
      segment: 'Rural',
      language: 'Hindi',
      referredBy: '',
      competitorAnalysis: {
        currentSupplier: 'Local Wholesale',
        pricingGap: '5%',
        serviceGaps: ['No delivery', 'Limited payment options']
      }
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStage, setFilterStage] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterBusinessType, setFilterBusinessType] = useState('All');
  const [selectedLead, setSelectedLead] = useState(null);
  const [showAddLead, setShowAddLead] = useState(false);

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
          <button className="p-1 text-gray-400 hover:text-gray-600">
            <MoreVertical className="h-4 w-4" />
          </button>
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
          <p className="text-xs text-gray-500">Monthly Turnover</p>
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
  const avgScore = Math.round(leads.reduce((sum, l) => sum + l.score, 0) / leads.length);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Indian Retail Leads Management</h1>
              <p className="text-gray-600">Convert prospects into customers for Indian retail businesses</p>
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
                onClick={() => setShowAddLead(true)}
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    <p className="text-sm text-gray-900">{selectedLead.paymentPreference}</p>
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
    </div>
  );
};

export default IndianRetailLeadsManagement;