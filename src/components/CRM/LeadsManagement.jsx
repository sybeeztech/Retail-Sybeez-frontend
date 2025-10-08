import React, { useState } from 'react';
import { 
  UserPlus, 
  Phone, 
  Mail, 
  Calendar, 
  DollarSign, 
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
  Tag
} from 'lucide-react';

const LeadsManagement = () => {
  const [leads, setLeads] = useState([
    {
      id: 1,
      name: 'Alex Rodriguez',
      email: 'alex@techstartup.com',
      phone: '+1 (555) 789-0123',
      company: 'Tech Startup Inc.',
      source: 'Website Form',
      score: 85,
      value: 75000,
      stage: 'Qualified',
      assignedTo: 'John Smith',
      createdDate: '2024-10-01',
      lastActivity: '2024-10-07',
      notes: 'Very interested in enterprise package',
      priority: 'High'
    },
    {
      id: 2,
      name: 'Maria Garcia',
      email: 'maria@retailcompany.com',
      phone: '+1 (555) 456-7891',
      company: 'Retail Company Ltd.',
      source: 'Cold Call',
      score: 65,
      value: 45000,
      stage: 'Contacted',
      assignedTo: 'Sarah Johnson',
      createdDate: '2024-10-03',
      lastActivity: '2024-10-06',
      notes: 'Needs more information about pricing',
      priority: 'Medium'
    },
    {
      id: 3,
      name: 'David Kim',
      email: 'dkim@manufacturing.com',
      phone: '+1 (555) 234-5678',
      company: 'Manufacturing Corp',
      source: 'Referral',
      score: 90,
      value: 120000,
      stage: 'Proposal',
      assignedTo: 'Michael Chen',
      createdDate: '2024-09-28',
      lastActivity: '2024-10-07',
      notes: 'Ready to sign, waiting for final approval',
      priority: 'High'
    },
    {
      id: 4,
      name: 'Lisa Thompson',
      email: 'lisa@consultingfirm.com',
      phone: '+1 (555) 345-6789',
      company: 'Consulting Firm LLC',
      source: 'LinkedIn',
      score: 45,
      value: 30000,
      stage: 'New',
      assignedTo: 'Emily Davis',
      createdDate: '2024-10-05',
      lastActivity: '2024-10-05',
      notes: 'Initial contact made',
      priority: 'Low'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStage, setFilterStage] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');

  const stageColors = {
    'New': 'bg-gray-100 text-gray-800',
    'Contacted': 'bg-blue-100 text-blue-800',
    'Qualified': 'bg-yellow-100 text-yellow-800',
    'Proposal': 'bg-purple-100 text-purple-800',
    'Won': 'bg-green-100 text-green-800',
    'Lost': 'bg-red-100 text-red-800'
  };

  const priorityColors = {
    'High': 'bg-red-100 text-red-800',
    'Medium': 'bg-yellow-100 text-yellow-800',
    'Low': 'bg-green-100 text-green-800'
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = filterStage === 'All' || lead.stage === filterStage;
    const matchesPriority = filterPriority === 'All' || lead.priority === filterPriority;
    return matchesSearch && matchesStage && matchesPriority;
  });

  const totalLeads = leads.length;
  const qualifiedLeads = leads.filter(l => l.stage === 'Qualified' || l.stage === 'Proposal').length;
  const totalValue = leads.reduce((sum, lead) => sum + lead.value, 0);
  const avgScore = Math.round(leads.reduce((sum, lead) => sum + lead.score, 0) / leads.length);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Leads Management</h1>
            <p className="text-gray-600">Track and manage your sales leads pipeline</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
              <Filter size={16} />
              <span>Advanced Filter</span>
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
              <UserPlus size={16} />
              <span>Add Lead</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Leads</p>
                <p className="text-3xl font-bold text-gray-900">{totalLeads}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <UserPlus className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Qualified Leads</p>
                <p className="text-3xl font-bold text-green-600">{qualifiedLeads}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pipeline Value</p>
                <p className="text-3xl font-bold text-blue-600">${totalValue.toLocaleString()}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Score</p>
                <p className="text-3xl font-bold text-purple-600">{avgScore}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search leads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <select
                value={filterStage}
                onChange={(e) => setFilterStage(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All Stages</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal">Proposal</option>
                <option value="Won">Won</option>
                <option value="Lost">Lost</option>
              </select>

              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All Priorities</option>
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>
          </div>
        </div>

        {/* Leads Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lead
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company & Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stage & Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score & Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                          {lead.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                        <div className="text-sm text-gray-500">Lead #{lead.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      <Mail size={12} className="mr-2 text-gray-400" />
                      {lead.email}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Phone size={12} className="mr-2 text-gray-400" />
                      {lead.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{lead.company}</div>
                    <div className="text-sm text-gray-500">Source: {lead.source}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${stageColors[lead.stage]}`}>
                      {lead.stage}
                    </span>
                    <div className="mt-1">
                      <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded ${priorityColors[lead.priority]}`}>
                        {lead.priority}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium text-gray-900">{lead.score}</span>
                    </div>
                    <div className="text-sm text-gray-500">${lead.value.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {lead.assignedTo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      <Calendar size={12} className="mr-2 text-gray-400" />
                      {new Date(lead.lastActivity).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900" title="View Details">
                        <Eye size={16} />
                      </button>
                      <button className="text-green-600 hover:text-green-900" title="Edit Lead">
                        <Edit size={16} />
                      </button>
                      <button className="text-purple-600 hover:text-purple-900" title="Convert to Customer">
                        <CheckCircle size={16} />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600" title="More Actions">
                        <MoreVertical size={16} />
                      </button>
                    </div>
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

export default LeadsManagement;