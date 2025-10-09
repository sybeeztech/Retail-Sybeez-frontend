import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  IndianRupee, 
  Target, 
  Calendar,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Store,
  Package,
  Truck,
  CreditCard,
  Smartphone,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Building,
  FileText,
  Star,
  Activity,
  Filter,
  Download,
  Eye,
  Edit,
  MoreVertical,
  Plus,
  Search,
  Gift,
  Percent,
  Home,
  Building2,
  ShoppingCart
} from 'lucide-react';

const IndianRetailSalesPipeline = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');
  const [selectedView, setSelectedView] = useState('pipeline');

  const pipelineStages = [
    {
      name: 'Prospecting',
      deals: 15,
      value: 485000,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      description: 'Identifying potential retail customers'
    },
    {
      name: 'Initial Contact',
      deals: 12,
      value: 380000,
      color: 'bg-indigo-500',
      textColor: 'text-indigo-600',
      description: 'First outreach and introduction'
    },
    {
      name: 'Needs Assessment',
      deals: 10,
      value: 325000,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600',
      description: 'Understanding business requirements'
    },
    {
      name: 'Proposal Sent',
      deals: 8,
      value: 285000,
      color: 'bg-purple-500',
      textColor: 'text-purple-600',
      description: 'Customized proposals submitted'
    },
    {
      name: 'Negotiation',
      deals: 5,
      value: 195000,
      color: 'bg-orange-500',
      textColor: 'text-orange-600',
      description: 'Price and terms discussion'
    },
    {
      name: 'Agreement',
      deals: 3,
      value: 125000,
      color: 'bg-green-500',
      textColor: 'text-green-600',
      description: 'Final agreement and onboarding'
    }
  ];

  const dealsByStage = {
    'Prospecting': [
      {
        id: 1,
        title: 'Kumar General Store Expansion',
        customer: 'Rajesh Kumar',
        company: 'Kumar General Store',
        businessType: 'General Store',
        value: 125000,
        probability: 25,
        closeDate: '2024-11-15',
        owner: 'Rahul Sharma',
        daysInStage: 5,
        status: 'On Track',
        location: 'Connaught Place, Delhi',
        products: ['Groceries', 'Personal Care', 'Home Care'],
        priority: 'High',
        source: 'Referral',
        lastActivity: '2024-10-07',
        nextAction: 'Schedule store visit',
        contactInfo: {
          phone: '+91 98765 43210',
          email: 'rajesh.kumar@gmail.com',
          whatsapp: '+91 98765 43210'
        }
      },
      {
        id: 2,
        title: 'Sharma Electronics New Range',
        customer: 'Priya Sharma',
        company: 'Sharma Electronics',
        businessType: 'Electronics Store',
        value: 180000,
        probability: 30,
        closeDate: '2024-11-20',
        owner: 'Arjun Patel',
        daysInStage: 8,
        status: 'On Track',
        location: 'Lajpat Nagar, Delhi',
        products: ['Mobile Phones', 'Accessories', 'Home Appliances'],
        priority: 'High',
        source: 'Cold Call',
        lastActivity: '2024-10-06',
        nextAction: 'Send product catalog',
        contactInfo: {
          phone: '+91 87654 32109',
          email: 'priya.sharma@gmail.com',
          whatsapp: '+91 87654 32109'
        }
      }
    ],
    'Initial Contact': [
      {
        id: 3,
        title: 'Ali Super Market Partnership',
        customer: 'Mohammed Ali',
        company: 'Ali Super Market',
        businessType: 'Super Market',
        value: 250000,
        probability: 40,
        closeDate: '2024-11-10',
        owner: 'Neha Gupta',
        daysInStage: 3,
        status: 'On Track',
        location: 'Chandni Chowk, Delhi',
        products: ['Groceries', 'FMCG', 'Frozen Foods'],
        priority: 'High',
        source: 'Walk-in',
        lastActivity: '2024-10-08',
        nextAction: 'Follow up on initial meeting',
        contactInfo: {
          phone: '+91 76543 21098',
          email: 'ali.mohammed@yahoo.com',
          whatsapp: '+91 76543 21098'
        }
      }
    ],
    'Needs Assessment': [
      {
        id: 4,
        title: 'Gupta Kirana Store Setup',
        customer: 'Suresh Gupta',
        company: 'Gupta Kirana Store',
        businessType: 'Kirana Store',
        value: 85000,
        probability: 60,
        closeDate: '2024-11-05',
        owner: 'Priya Singh',
        daysInStage: 12,
        status: 'At Risk',
        location: 'Karol Bagh, Delhi',
        products: ['Daily Essentials', 'Groceries', 'Personal Care'],
        priority: 'Medium',
        source: 'WhatsApp',
        lastActivity: '2024-10-05',
        nextAction: 'Complete needs assessment survey',
        contactInfo: {
          phone: '+91 98765 12345',
          email: 'suresh.gupta@gmail.com',
          whatsapp: '+91 98765 12345'
        }
      }
    ],
    'Proposal Sent': [
      {
        id: 5,
        title: 'Modern Retail Chain Expansion',
        customer: 'Ravi Agarwal',
        company: 'Modern Retail Chain',
        businessType: 'Retail Chain',
        value: 450000,
        probability: 75,
        closeDate: '2024-10-25',
        owner: 'Vikash Kumar',
        daysInStage: 6,
        status: 'Hot',
        location: 'South Delhi',
        products: ['Complete FMCG Range', 'Electronics', 'Apparel'],
        priority: 'High',
        source: 'Trade Show',
        lastActivity: '2024-10-07',
        nextAction: 'Present final proposal',
        contactInfo: {
          phone: '+91 98765 67890',
          email: 'ravi.agarwal@modernretail.com',
          whatsapp: '+91 98765 67890'
        }
      }
    ],
    'Negotiation': [
      {
        id: 6,
        title: 'Family Mart Franchise',
        customer: 'Deepak Patel',
        company: 'Family Mart',
        businessType: 'Convenience Store',
        value: 155000,
        probability: 85,
        closeDate: '2024-10-20',
        owner: 'Rahul Sharma',
        daysInStage: 10,
        status: 'Hot',
        location: 'Gurgaon',
        products: ['Convenience Items', 'Snacks', 'Beverages'],
        priority: 'High',
        source: 'Franchise Inquiry',
        lastActivity: '2024-10-08',
        nextAction: 'Finalize pricing terms',
        contactInfo: {
          phone: '+91 87654 98765',
          email: 'deepak.patel@familymart.in',
          whatsapp: '+91 87654 98765'
        }
      }
    ],
    'Agreement': [
      {
        id: 7,
        title: 'Local Bazaar Network',
        customer: 'Amit Singh',
        company: 'Local Bazaar Network',
        businessType: 'Multi-store Chain',
        value: 320000,
        probability: 95,
        closeDate: '2024-10-15',
        owner: 'Arjun Patel',
        daysInStage: 2,
        status: 'Closing',
        location: 'East Delhi',
        products: ['Complete Retail Solution', 'POS Systems', 'Inventory Management'],
        priority: 'High',
        source: 'Referral',
        lastActivity: '2024-10-08',
        nextAction: 'Complete legal documentation',
        contactInfo: {
          phone: '+91 76543 87654',
          email: 'amit.singh@localbazaar.com',
          whatsapp: '+91 76543 87654'
        }
      }
    ]
  };

  const getAllDeals = () => {
    return Object.values(dealsByStage).flat();
  };

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
      'On Track': 'bg-green-100 text-green-800',
      'At Risk': 'bg-yellow-100 text-yellow-800',
      'Hot': 'bg-red-100 text-red-800',
      'Closing': 'bg-purple-100 text-purple-800',
      'Delayed': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'High': 'bg-red-100 text-red-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'Low': 'bg-green-100 text-green-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  const calculateDaysOverdue = (closeDate) => {
    const today = new Date();
    const close = new Date(closeDate);
    const diffTime = today - close;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const PipelineView = () => (
    <div className="space-y-6">
      {/* Pipeline Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {pipelineStages.map((stage, index) => (
          <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
              <span className="text-sm font-medium text-gray-600">{stage.deals} deals</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{stage.name}</h3>
            <p className="text-xs text-gray-500 mb-3">{stage.description}</p>
            <div className="space-y-1">
              <p className={`text-lg font-bold ${stage.textColor}`}>
                {formatIndianCurrency(stage.value)}
              </p>
              <p className="text-xs text-gray-500">
                Avg: {formatIndianCurrency(stage.value / stage.deals)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pipeline Funnel */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Sales Funnel</h3>
        <div className="space-y-4">
          {pipelineStages.map((stage, index) => {
            const percentage = (stage.deals / pipelineStages[0].deals) * 100;
            return (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-32 text-sm font-medium text-gray-700">{stage.name}</div>
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-8 relative">
                    <div 
                      className={`h-8 rounded-full ${stage.color} flex items-center justify-center text-white text-sm font-medium transition-all`}
                      style={{width: `${percentage}%`}}
                    >
                      {stage.deals} deals
                    </div>
                  </div>
                </div>
                <div className="w-24 text-right">
                  <div className="text-sm font-semibold text-gray-900">{formatIndianCurrency(stage.value)}</div>
                  <div className="text-xs text-gray-500">{percentage.toFixed(1)}%</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Deals by Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {pipelineStages.map((stage, stageIndex) => (
          <div key={stageIndex} className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">{stage.name}</h3>
                <span className="text-sm text-gray-500">{dealsByStage[stage.name]?.length || 0} deals</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{formatIndianCurrency(stage.value)}</p>
            </div>
            <div className="p-4 space-y-4">
              {dealsByStage[stage.name]?.map((deal) => (
                <div key={deal.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">{deal.title}</h4>
                      <p className="text-xs text-gray-500">{deal.company} • {deal.businessType}</p>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(deal.status)}`}>
                      {deal.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(deal.priority)}`}>
                      {deal.priority}
                    </span>
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Value:</span>
                      <span className="font-semibold text-green-600">{formatIndianCurrency(deal.value)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Probability:</span>
                      <span className="font-semibold">{deal.probability}%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Close Date:</span>
                      <span className={`font-semibold ${
                        new Date(deal.closeDate) < new Date() ? 'text-red-600' : 'text-blue-600'
                      }`}>
                        {new Date(deal.closeDate).toLocaleDateString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 mb-3">
                    <div className="flex items-center space-x-1 mb-1">
                      <MapPin className="h-3 w-3" />
                      <span>{deal.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-3 w-3" />
                      <span>Owner: {deal.owner}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded text-xs font-medium hover:bg-blue-100">
                      View Details
                    </button>
                    <button className="px-2 py-2 bg-green-50 text-green-600 rounded hover:bg-green-100">
                      <Phone className="h-3 w-3" />
                    </button>
                    <button className="px-2 py-2 bg-purple-50 text-purple-600 rounded hover:bg-purple-100">
                      <MessageSquare className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              )) || (
                <div className="text-center py-8 text-gray-500">
                  <Package className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No deals in this stage</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const MetricsView = () => {
    const allDeals = getAllDeals();
    const totalPipelineValue = allDeals.reduce((sum, deal) => sum + deal.value, 0);
    const avgDealSize = totalPipelineValue / allDeals.length;
    const weightedPipelineValue = allDeals.reduce((sum, deal) => sum + (deal.value * deal.probability / 100), 0);
    const hotDeals = allDeals.filter(deal => deal.status === 'Hot').length;
    const atRiskDeals = allDeals.filter(deal => deal.status === 'At Risk').length;
    const overdueDeals = allDeals.filter(deal => new Date(deal.closeDate) < new Date()).length;

    return (
      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Pipeline</p>
                <p className="text-2xl font-bold">{formatIndianCurrency(totalPipelineValue)}</p>
                <p className="text-blue-100 text-xs mt-1">{allDeals.length} deals</p>
              </div>
              <IndianRupee className="h-8 w-8 text-blue-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Weighted Pipeline</p>
                <p className="text-2xl font-bold">{formatIndianCurrency(weightedPipelineValue)}</p>
                <p className="text-green-100 text-xs mt-1">Probability adjusted</p>
              </div>
              <Target className="h-8 w-8 text-green-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Avg Deal Size</p>
                <p className="text-2xl font-bold">{formatIndianCurrency(avgDealSize)}</p>
                <p className="text-purple-100 text-xs mt-1">Per opportunity</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Hot Deals</p>
                <p className="text-2xl font-bold">{hotDeals}</p>
                <p className="text-orange-100 text-xs mt-1">Closing soon</p>
              </div>
              <Activity className="h-8 w-8 text-orange-200" />
            </div>
          </div>
        </div>

        {/* Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Conversion Rate</h3>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Lead to Customer</span>
                <span className="font-semibold text-green-600">23.5%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Proposal to Close</span>
                <span className="font-semibold text-blue-600">45.2%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Overall Win Rate</span>
                <span className="font-semibold text-purple-600">18.7%</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Deal Health</h3>
              <AlertCircle className="h-5 w-5 text-yellow-500" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Hot Deals</span>
                <span className="font-semibold text-red-600">{hotDeals}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">At Risk</span>
                <span className="font-semibold text-yellow-600">{atRiskDeals}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Overdue</span>
                <span className="font-semibold text-red-600">{overdueDeals}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Pipeline Velocity</h3>
              <Clock className="h-5 w-5 text-blue-500" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Avg Sales Cycle</span>
                <span className="font-semibold text-blue-600">45 days</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Time in Stage</span>
                <span className="font-semibold text-purple-600">8.5 days</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Follow-up Rate</span>
                <span className="font-semibold text-green-600">92%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Business Type Analysis */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Pipeline by Business Type</h3>
          <div className="space-y-4">
            {['General Store', 'Super Market', 'Kirana Store', 'Electronics Store', 'Convenience Store'].map((type, index) => {
              const typeDeals = allDeals.filter(deal => deal.businessType === type);
              const typeValue = typeDeals.reduce((sum, deal) => sum + deal.value, 0);
              const percentage = allDeals.length > 0 ? (typeDeals.length / allDeals.length) * 100 : 0;
              
              return (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-32">
                    <div className="text-sm font-medium text-gray-700">{type}</div>
                    <div className="text-xs text-gray-500">{typeDeals.length} deals</div>
                  </div>
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-6 relative">
                      <div 
                        className="h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-medium"
                        style={{width: `${Math.max(percentage, 5)}%`}}
                      >
                        {percentage > 15 && `${percentage.toFixed(1)}%`}
                      </div>
                    </div>
                  </div>
                  <div className="w-32 text-right">
                    <div className="text-sm font-semibold text-gray-900">{formatIndianCurrency(typeValue)}</div>
                    <div className="text-xs text-gray-500">Avg: {formatIndianCurrency(typeValue / Math.max(typeDeals.length, 1))}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Indian Retail Sales Pipeline</h1>
              <p className="text-gray-600">Track deals from prospect to customer across Indian retail segments</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
              >
                <option value="This Week">This Week</option>
                <option value="This Month">This Month</option>
                <option value="This Quarter">This Quarter</option>
                <option value="This Year">This Year</option>
              </select>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setSelectedView('pipeline')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                selectedView === 'pipeline' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Pipeline View
            </button>
            <button
              onClick={() => setSelectedView('metrics')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                selectedView === 'metrics' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Metrics & Analytics
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {selectedView === 'pipeline' && <PipelineView />}
        {selectedView === 'metrics' && <MetricsView />}
      </div>
    </div>
  );
};

export default IndianRetailSalesPipeline;