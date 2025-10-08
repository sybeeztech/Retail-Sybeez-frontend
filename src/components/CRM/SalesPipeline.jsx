import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Target, 
  Calendar,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const SalesPipeline = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');

  const pipelineStages = [
    {
      name: 'Prospecting',
      deals: 12,
      value: 180000,
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      name: 'Qualification',
      deals: 8,
      value: 240000,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600'
    },
    {
      name: 'Proposal',
      deals: 5,
      value: 185000,
      color: 'bg-purple-500',
      textColor: 'text-purple-600'
    },
    {
      name: 'Negotiation',
      deals: 3,
      value: 125000,
      color: 'bg-orange-500',
      textColor: 'text-orange-600'
    },
    {
      name: 'Closed Won',
      deals: 2,
      value: 95000,
      color: 'bg-green-500',
      textColor: 'text-green-600'
    }
  ];

  const recentDeals = [
    {
      id: 1,
      title: 'Enterprise Software License',
      company: 'Tech Solutions Inc.',
      value: 125000,
      stage: 'Negotiation',
      probability: 85,
      closeDate: '2024-10-15',
      owner: 'John Smith',
      daysInStage: 5,
      status: 'On Track'
    },
    {
      id: 2,
      title: 'Marketing Automation Platform',
      company: 'Growth Marketing Ltd.',
      value: 75000,
      stage: 'Proposal',
      probability: 70,
      closeDate: '2024-10-20',
      owner: 'Sarah Johnson',
      daysInStage: 8,
      status: 'At Risk'
    },
    {
      id: 3,
      title: 'Cloud Infrastructure Setup',
      company: 'Startup Innovations',
      value: 45000,
      stage: 'Qualification',
      probability: 60,
      closeDate: '2024-10-25',
      owner: 'Michael Chen',
      daysInStage: 3,
      status: 'On Track'
    },
    {
      id: 4,
      title: 'CRM Implementation',
      company: 'Retail Chain Corp',
      value: 95000,
      stage: 'Proposal',
      probability: 75,
      closeDate: '2024-10-18',
      owner: 'Emily Davis',
      daysInStage: 12,
      status: 'Overdue'
    }
  ];

  const metrics = {
    totalPipelineValue: pipelineStages.reduce((sum, stage) => sum + stage.value, 0),
    totalDeals: pipelineStages.reduce((sum, stage) => sum + stage.deals, 0),
    avgDealSize: Math.round(pipelineStages.reduce((sum, stage) => sum + stage.value, 0) / pipelineStages.reduce((sum, stage) => sum + stage.deals, 0)),
    conversionRate: 68,
    avgSalesCycle: 45,
    forecastedRevenue: 520000
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'On Track': return 'bg-green-100 text-green-800';
      case 'At Risk': return 'bg-yellow-100 text-yellow-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'On Track': return <CheckCircle size={14} className="text-green-600" />;
      case 'At Risk': return <Clock size={14} className="text-yellow-600" />;
      case 'Overdue': return <AlertCircle size={14} className="text-red-600" />;
      default: return <Clock size={14} className="text-gray-600" />;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Sales Pipeline</h1>
            <p className="text-gray-600">Track your sales opportunities and forecast revenue</p>
          </div>
          <div className="flex space-x-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="This Week">This Week</option>
              <option value="This Month">This Month</option>
              <option value="This Quarter">This Quarter</option>
              <option value="This Year">This Year</option>
            </select>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
              <BarChart3 size={16} />
              <span>Generate Report</span>
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pipeline Value</p>
                <p className="text-2xl font-bold text-gray-900">${metrics.totalPipelineValue.toLocaleString()}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Deals</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.totalDeals}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Target className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Deal Size</p>
                <p className="text-2xl font-bold text-gray-900">${metrics.avgDealSize.toLocaleString()}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <BarChart3 className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.conversionRate}%</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Sales Cycle</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.avgSalesCycle} days</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Forecasted</p>
                <p className="text-2xl font-bold text-gray-900">${metrics.forecastedRevenue.toLocaleString()}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <ArrowUpRight className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pipeline Stages */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Pipeline Stages</h2>
          <p className="text-gray-600">Overview of deals in each stage</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {pipelineStages.map((stage, index) => (
              <div key={index} className="text-center">
                <div className="mb-4">
                  <div className={`w-full h-3 ${stage.color} rounded-full mb-2`}></div>
                  <h3 className="font-semibold text-gray-900">{stage.name}</h3>
                </div>
                <div className="space-y-2">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-2xl font-bold text-gray-900">{stage.deals}</p>
                    <p className="text-sm text-gray-600">Deals</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className={`text-xl font-bold ${stage.textColor}`}>
                      ${(stage.value / 1000).toFixed(0)}K
                    </p>
                    <p className="text-sm text-gray-600">Value</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Deals */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Active Deals</h2>
          <p className="text-gray-600">Track your most important opportunities</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Probability
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Close Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Owner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentDeals.map((deal) => (
                <tr key={deal.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{deal.title}</div>
                      <div className="text-sm text-gray-500">Deal #{deal.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {deal.company}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${deal.value.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {deal.stage}
                    </span>
                    <div className="text-xs text-gray-500 mt-1">{deal.daysInStage} days</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${deal.probability}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">{deal.probability}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      <Calendar size={12} className="mr-2 text-gray-400" />
                      {new Date(deal.closeDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {deal.owner}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(deal.status)}`}>
                      {getStatusIcon(deal.status)}
                      <span className="ml-1">{deal.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesPipeline;