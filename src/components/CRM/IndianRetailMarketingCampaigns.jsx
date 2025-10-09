import React, { useState } from 'react';
import { 
  Mail, 
  MessageSquare, 
  Phone, 
  Users, 
  Calendar,
  IndianRupee,
  TrendingUp,
  Target,
  Eye,
  Send,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  MoreVertical,
  Star,
  Gift,
  Percent,
  Clock,
  CheckCircle,
  AlertCircle,
  Activity,
  Smartphone,
  Speaker,
  Megaphone,
  MapPin,
  Store,
  Package,
  Tag,
  Heart,
  Zap,
  BarChart3,
  PieChart,
  LineChart,
  FileText,
  Image,
  Video,
  Mic,
  Building,
  Home,
  ShoppingCart,
  Truck,
  CreditCard
} from 'lucide-react';

const IndianRetailMarketingCampaigns = () => {
  const [activeTab, setActiveTab] = useState('campaigns');
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);

  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: 'Diwali Festival Mega Sale 2024',
      type: 'Festival Campaign',
      status: 'Active',
      channel: 'Multi-Channel',
      startDate: '2024-10-15',
      endDate: '2024-11-05',
      budget: 50000,
      spent: 32000,
      targetAudience: 'All Customers',
      reach: 15420,
      engagement: 2840,
      conversions: 485,
      revenue: 285000,
      roi: 462,
      description: 'Complete Diwali festival marketing campaign with special discounts, gift offers, and bulk purchase deals',
      channels: [
        {
          name: 'WhatsApp Business',
          reach: 8500,
          engagement: 1200,
          conversions: 285,
          cost: 5000
        },
        {
          name: 'SMS Marketing',
          reach: 4200,
          engagement: 680,
          conversions: 125,
          cost: 8000
        },
        {
          name: 'Local Radio Ads',
          reach: 2500,
          engagement: 420,
          conversions: 45,
          cost: 15000
        },
        {
          name: 'Print Flyers',
          reach: 220,
          engagement: 540,
          conversions: 30,
          cost: 4000
        }
      ],
      offers: [
        'Up to 40% off on Electronics',
        'Buy 2 Get 1 Free on Groceries',
        'Free Home Delivery above ₹2000',
        'Special Gift Hampers'
      ],
      targetSegments: ['Premium Customers', 'Regular Customers', 'Festival Shoppers'],
      regions: ['Delhi NCR', 'Local Area'],
      languages: ['Hindi', 'English'],
      createdBy: 'Priya Sharma',
      lastModified: '2024-10-07'
    },
    {
      id: 2,
      name: 'Back to School Campaign',
      type: 'Seasonal Campaign',
      status: 'Completed',
      channel: 'Digital + Local',
      startDate: '2024-06-01',
      endDate: '2024-07-15',
      budget: 25000,
      spent: 24500,
      targetAudience: 'Families with School Kids',
      reach: 8500,
      engagement: 1200,
      conversions: 285,
      revenue: 185000,
      roi: 655,
      description: 'School supplies and stationery promotion targeting families with school-going children',
      channels: [
        {
          name: 'WhatsApp Groups',
          reach: 3500,
          engagement: 650,
          conversions: 165,
          cost: 3000
        },
        {
          name: 'School Notice Boards',
          reach: 2800,
          engagement: 420,
          conversions: 85,
          cost: 8000
        },
        {
          name: 'Local Newspaper',
          reach: 2200,
          engagement: 130,
          conversions: 35,
          cost: 13500
        }
      ],
      offers: [
        '25% off on Stationery Items',
        'Free School Bag with purchase above ₹1500',
        'Combo Deals on Books & Notebooks'
      ],
      targetSegments: ['Families', 'Students'],
      regions: ['Local Schools Area'],
      languages: ['Hindi', 'English'],
      createdBy: 'Rahul Kumar',
      lastModified: '2024-07-15'
    },
    {
      id: 3,
      name: 'New Store Launch Promotion',
      type: 'Launch Campaign',
      status: 'Scheduled',
      channel: 'Local Marketing',
      startDate: '2024-11-01',
      endDate: '2024-11-15',
      budget: 35000,
      spent: 0,
      targetAudience: 'Local Residents',
      reach: 0,
      engagement: 0,
      conversions: 0,
      revenue: 0,
      roi: 0,
      description: 'Grand opening campaign for new branch with special inaugural offers and community engagement',
      channels: [
        {
          name: 'Door-to-Door Flyers',
          reach: 0,
          engagement: 0,
          conversions: 0,
          cost: 8000
        },
        {
          name: 'Local FM Radio',
          reach: 0,
          engagement: 0,
          conversions: 0,
          cost: 12000
        },
        {
          name: 'WhatsApp Marketing',
          reach: 0,
          engagement: 0,
          conversions: 0,
          cost: 5000
        },
        {
          name: 'Inauguration Event',
          reach: 0,
          engagement: 0,
          conversions: 0,
          cost: 10000
        }
      ],
      offers: [
        '50% off on First Purchase',
        'Free Home Delivery for 1 Month',
        'Lucky Draw with Gold Coin Prize',
        'Special Credit Terms'
      ],
      targetSegments: ['New Customers', 'Local Residents'],
      regions: ['New Store Catchment Area'],
      languages: ['Hindi'],
      createdBy: 'Arjun Patel',
      lastModified: '2024-10-05'
    },
    {
      id: 4,
      name: 'Loyalty Customer Appreciation',
      type: 'Retention Campaign',
      status: 'Active',
      channel: 'WhatsApp + SMS',
      startDate: '2024-10-01',
      endDate: '2024-10-31',
      budget: 15000,
      spent: 8500,
      targetAudience: 'VIP & Premium Customers',
      reach: 2850,
      engagement: 1420,
      conversions: 485,
      revenue: 125000,
      roi: 735,
      description: 'Special appreciation campaign for loyal customers with exclusive offers and personalized services',
      channels: [
        {
          name: 'WhatsApp Personal Messages',
          reach: 1850,
          engagement: 980,
          conversions: 385,
          cost: 3500
        },
        {
          name: 'SMS with Coupons',
          reach: 1000,
          engagement: 440,
          conversions: 100,
          cost: 5000
        }
      ],
      offers: [
        'Exclusive 30% VIP Discount',
        'Free Premium Delivery',
        'Birthday & Anniversary Specials',
        'Early Access to Sales'
      ],
      targetSegments: ['VIP Customers', 'Premium Customers'],
      regions: ['All Locations'],
      languages: ['Hindi', 'English'],
      createdBy: 'Neha Gupta',
      lastModified: '2024-10-08'
    }
  ]);

  const campaignTemplates = [
    {
      id: 1,
      name: 'Festival Sale Template',
      category: 'Festival',
      description: 'Ready-to-use template for Indian festivals like Diwali, Holi, Dussehra',
      channels: ['WhatsApp', 'SMS', 'Local Radio'],
      estimatedBudget: '₹25,000 - ₹75,000',
      duration: '15-20 days',
      targetROI: '400-600%'
    },
    {
      id: 2,
      name: 'Monsoon Special',
      category: 'Seasonal',
      description: 'Monsoon-specific products and rainy season essentials',
      channels: ['WhatsApp', 'Local Newspaper'],
      estimatedBudget: '₹15,000 - ₹35,000',
      duration: '45-60 days',
      targetROI: '300-450%'
    },
    {
      id: 3,
      name: 'Customer Win-back',
      category: 'Retention',
      description: 'Re-engage inactive customers with special comeback offers',
      channels: ['WhatsApp', 'SMS', 'Phone Calls'],
      estimatedBudget: '₹10,000 - ₹25,000',
      duration: '7-14 days',
      targetROI: '500-800%'
    },
    {
      id: 4,
      name: 'New Product Launch',
      category: 'Product Launch',
      description: 'Introduce new products to existing customers',
      channels: ['WhatsApp', 'In-store Display', 'SMS'],
      estimatedBudget: '₹20,000 - ₹40,000',
      duration: '10-15 days',
      targetROI: '350-500%'
    }
  ];

  const marketingChannels = [
    {
      name: 'WhatsApp Business',
      icon: MessageSquare,
      reach: 'High',
      cost: 'Low',
      engagement: 'Very High',
      roi: 'Excellent',
      description: 'Direct messaging with multimedia support',
      bestFor: 'Personal communication, offers, customer service',
      averageCost: '₹0.50 per message',
      features: ['Multimedia Support', 'Delivery Status', 'Group Broadcasting', 'Catalog Sharing']
    },
    {
      name: 'SMS Marketing',
      icon: Smartphone,
      reach: 'Very High',
      cost: 'Low',
      engagement: 'Medium',
      roi: 'Good',
      description: 'Text message campaigns with high delivery rates',
      bestFor: 'Announcements, reminders, promotions',
      averageCost: '₹0.25 per SMS',
      features: ['High Delivery Rate', 'Instant Delivery', 'Bulk Sending', 'Scheduled Messages']
    },
    {
      name: 'Local Radio Ads',
      icon: Speaker,
      reach: 'Medium',
      cost: 'Medium',
      engagement: 'Medium',
      roi: 'Good',
      description: 'Regional radio advertising in local languages',
      bestFor: 'Brand awareness, local events, seasonal promotions',
      averageCost: '₹500-2000 per spot',
      features: ['Local Language Support', 'Peak Time Slots', 'Repeat Broadcasting', 'Regional Focus']
    },
    {
      name: 'Print Flyers',
      icon: FileText,
      reach: 'Low',
      cost: 'Low',
      engagement: 'Medium',
      roi: 'Fair',
      description: 'Printed promotional materials for local distribution',
      bestFor: 'Local area marketing, grand openings, special events',
      averageCost: '₹2-5 per flyer',
      features: ['Tangible Material', 'Local Distribution', 'Visual Appeal', 'Long Retention']
    },
    {
      name: 'Social Media Posts',
      icon: Heart,
      reach: 'Medium',
      cost: 'Low',
      engagement: 'High',
      roi: 'Good',
      description: 'Facebook, Instagram, and local social groups',
      bestFor: 'Brand building, customer engagement, viral content',
      averageCost: '₹100-500 per post',
      features: ['Visual Content', 'Viral Potential', 'Community Building', 'Real-time Feedback']
    },
    {
      name: 'Local Newspaper',
      icon: FileText,
      reach: 'Medium',
      cost: 'Medium',
      engagement: 'Low',
      roi: 'Fair',
      description: 'Regional newspaper advertisements',
      bestFor: 'Brand credibility, older demographics, formal announcements',
      averageCost: '₹1000-5000 per ad',
      features: ['High Credibility', 'Older Audience', 'Local Focus', 'Permanent Record']
    }
  ];

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
      'Active': 'bg-green-100 text-green-800',
      'Scheduled': 'bg-blue-100 text-blue-800',
      'Completed': 'bg-gray-100 text-gray-800',
      'Paused': 'bg-yellow-100 text-yellow-800',
      'Draft': 'bg-purple-100 text-purple-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getROIColor = (roi) => {
    if (roi >= 500) return 'text-green-600';
    if (roi >= 300) return 'text-blue-600';
    if (roi >= 200) return 'text-yellow-600';
    return 'text-red-600';
  };

  const calculateProgress = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();
    
    if (now < start) return 0;
    if (now > end) return 100;
    
    const total = end - start;
    const elapsed = now - start;
    return Math.round((elapsed / total) * 100);
  };

  const CampaignOverview = () => {
    const totalBudget = campaigns.reduce((sum, campaign) => sum + campaign.budget, 0);
    const totalSpent = campaigns.reduce((sum, campaign) => sum + campaign.spent, 0);
    const totalRevenue = campaigns.reduce((sum, campaign) => sum + campaign.revenue, 0);
    const activeCampaigns = campaigns.filter(c => c.status === 'Active').length;
    const avgROI = campaigns.length > 0 ? 
      campaigns.reduce((sum, campaign) => sum + campaign.roi, 0) / campaigns.length : 0;

    return (
      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Budget</p>
                <p className="text-2xl font-bold">{formatIndianCurrency(totalBudget)}</p>
                <p className="text-blue-100 text-xs mt-1">Spent: {formatIndianCurrency(totalSpent)}</p>
              </div>
              <IndianRupee className="h-8 w-8 text-blue-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Campaign Revenue</p>
                <p className="text-2xl font-bold">{formatIndianCurrency(totalRevenue)}</p>
                <p className="text-green-100 text-xs mt-1">Generated Revenue</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Active Campaigns</p>
                <p className="text-2xl font-bold">{activeCampaigns}</p>
                <p className="text-purple-100 text-xs mt-1">Running Now</p>
              </div>
              <Activity className="h-8 w-8 text-purple-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Average ROI</p>
                <p className="text-2xl font-bold">{Math.round(avgROI)}%</p>
                <p className="text-orange-100 text-xs mt-1">Return on Investment</p>
              </div>
              <Target className="h-8 w-8 text-orange-200" />
            </div>
          </div>
        </div>

        {/* Campaign Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{campaign.name}</h3>
                    <p className="text-sm text-gray-500">{campaign.type}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                      {campaign.status}
                    </span>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Campaign Progress */}
                {campaign.status === 'Active' && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">Campaign Progress</span>
                      <span className="font-medium">{calculateProgress(campaign.startDate, campaign.endDate)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all"
                        style={{width: `${calculateProgress(campaign.startDate, campaign.endDate)}%`}}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Budget</p>
                    <p className="font-semibold text-gray-900">{formatIndianCurrency(campaign.budget)}</p>
                    <p className="text-xs text-gray-500">Spent: {formatIndianCurrency(campaign.spent)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Revenue</p>
                    <p className="font-semibold text-green-600">{formatIndianCurrency(campaign.revenue)}</p>
                    <p className={`text-xs font-medium ${getROIColor(campaign.roi)}`}>ROI: {campaign.roi}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Reach</p>
                    <p className="font-semibold text-blue-600">{campaign.reach.toLocaleString('en-IN')}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Conversions</p>
                    <p className="font-semibold text-purple-600">{campaign.conversions}</p>
                  </div>
                </div>

                {/* Channels */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">Channels Used</p>
                  <div className="flex flex-wrap gap-2">
                    {campaign.channels.slice(0, 3).map((channel, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {channel.name}
                      </span>
                    ))}
                    {campaign.channels.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        +{campaign.channels.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Duration */}
                <div className="mb-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1 mb-1">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(campaign.startDate).toLocaleDateString('en-IN')} - {new Date(campaign.endDate).toLocaleDateString('en-IN')}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-3 w-3" />
                    <span>{campaign.targetAudience}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedCampaign(campaign)}
                    className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm font-medium"
                  >
                    View Details
                  </button>
                  <button className="px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="px-3 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100">
                    <BarChart3 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const CampaignTemplates = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ready-to-Use Campaign Templates</h3>
        <p className="text-gray-600 mb-6">Choose from pre-built templates designed for Indian retail businesses</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {campaignTemplates.map((template) => (
            <div key={template.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{template.name}</h4>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">{template.category}</span>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                  Use Template
                </button>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">{template.description}</p>
              
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-medium text-gray-700 mb-1">Recommended Channels</p>
                  <div className="flex flex-wrap gap-1">
                    {template.channels.map((channel, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {channel}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-gray-500">Budget Range</p>
                    <p className="font-medium">{template.estimatedBudget}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Duration</p>
                    <p className="font-medium">{template.duration}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500">Expected ROI</p>
                  <p className="font-medium text-green-600">{template.targetROI}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const MarketingChannels = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Marketing Channels for Indian Retail</h3>
        <p className="text-gray-600 mb-6">Choose the best channels for your target audience and budget</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {marketingChannels.map((channel, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <channel.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2">{channel.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{channel.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-500">Reach</p>
                      <p className="font-medium">{channel.reach}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Cost</p>
                      <p className="font-medium">{channel.cost}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Engagement</p>
                      <p className="font-medium">{channel.engagement}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">ROI</p>
                      <p className="font-medium text-green-600">{channel.roi}</p>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-xs font-medium text-gray-700 mb-1">Best For</p>
                    <p className="text-xs text-gray-600">{channel.bestFor}</p>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-xs font-medium text-gray-700 mb-1">Average Cost</p>
                    <p className="text-xs text-blue-600">{channel.averageCost}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs font-medium text-gray-700 mb-2">Key Features</p>
                    <div className="flex flex-wrap gap-1">
                      {channel.features.map((feature, featureIndex) => (
                        <span key={featureIndex} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
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
              <h1 className="text-2xl font-bold text-gray-900">Marketing Campaigns</h1>
              <p className="text-gray-600">Create and manage marketing campaigns for Indian retail businesses</p>
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
                onClick={() => setShowCreateCampaign(true)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Create Campaign</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('campaigns')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'campaigns' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Active Campaigns
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'templates' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Campaign Templates
            </button>
            <button
              onClick={() => setActiveTab('channels')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'channels' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Marketing Channels
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {activeTab === 'campaigns' && <CampaignOverview />}
        {activeTab === 'templates' && <CampaignTemplates />}
        {activeTab === 'channels' && <MarketingChannels />}
      </div>

      {/* Campaign Detail Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-semibold">Campaign Details - {selectedCampaign.name}</h3>
              <button
                onClick={() => setSelectedCampaign(null)}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Campaign Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Total Reach</p>
                  <p className="text-2xl font-bold text-blue-600">{selectedCampaign.reach.toLocaleString('en-IN')}</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">Conversions</p>
                  <p className="text-2xl font-bold text-green-600">{selectedCampaign.conversions}</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-gray-600">ROI</p>
                  <p className="text-2xl font-bold text-purple-600">{selectedCampaign.roi}%</p>
                </div>
              </div>

              {/* Channel Performance */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Channel Performance</h4>
                <div className="space-y-4">
                  {selectedCampaign.channels.map((channel, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="font-medium text-gray-900">{channel.name}</h5>
                        <span className="text-sm font-medium text-green-600">{formatIndianCurrency(channel.cost)}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-gray-500">Reach</p>
                          <p className="font-medium">{channel.reach.toLocaleString('en-IN')}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Engagement</p>
                          <p className="font-medium">{channel.engagement}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Conversions</p>
                          <p className="font-medium text-purple-600">{channel.conversions}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Campaign Offers */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Campaign Offers</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedCampaign.offers.map((offer, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <Gift className="h-5 w-5 text-green-600" />
                      <span className="text-sm text-gray-900">{offer}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Target Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-3">Target Segments</h4>
                  <div className="space-y-2">
                    {selectedCampaign.targetSegments.map((segment, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Target className="h-4 w-4 text-blue-500" />
                        <span className="text-sm text-gray-900">{segment}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-3">Target Regions</h4>
                  <div className="space-y-2">
                    {selectedCampaign.regions.map((region, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-red-500" />
                        <span className="text-sm text-gray-900">{region}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Campaign Description */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-3">Campaign Description</h4>
                <p className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedCampaign.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndianRetailMarketingCampaigns;