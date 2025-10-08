import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Target, 
  Award, 
  Star, 
  Users, 
  Search, 
  Filter, 
  Download, 
  Plus,
  Eye,
  Edit,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Clock,
  FileText,
  MessageSquare,
  ArrowUp,
  ArrowDown,
  Zap
} from 'lucide-react';

const PerformanceManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [periodFilter, setPeriodFilter] = useState('2024');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Sample performance data
  const performanceData = [
    {
      id: 1,
      employeeId: 'EMP001',
      name: 'John Smith',
      department: 'Engineering',
      position: 'Senior Developer',
      manager: 'Sarah Johnson',
      overallRating: 4.5,
      quarter: 'Q3 2024',
      goals: [
        { name: 'Complete Project Alpha', status: 'completed', weight: 30 },
        { name: 'Improve Code Quality', status: 'in-progress', weight: 25 },
        { name: 'Mentor Junior Developers', status: 'completed', weight: 20 },
        { name: 'Learn New Technology Stack', status: 'completed', weight: 25 }
      ],
      metrics: {
        productivity: 4.6,
        quality: 4.4,
        collaboration: 4.7,
        innovation: 4.2,
        leadership: 4.0
      },
      feedback: {
        strengths: 'Excellent technical skills, great mentor, proactive problem solver',
        improvements: 'Could improve documentation practices',
        managerNotes: 'Top performer, ready for promotion consideration'
      },
      reviewDate: '2024-09-30',
      nextReviewDate: '2024-12-31',
      developmentPlan: [
        'Advanced Architecture Training',
        'Leadership Skills Workshop',
        'Technical Writing Course'
      ]
    },
    {
      id: 2,
      employeeId: 'EMP002',
      name: 'Sarah Johnson',
      department: 'Marketing',
      position: 'Marketing Manager',
      manager: 'Mike Chen',
      overallRating: 4.2,
      quarter: 'Q3 2024',
      goals: [
        { name: 'Increase Brand Awareness', status: 'completed', weight: 35 },
        { name: 'Launch Product Campaign', status: 'completed', weight: 30 },
        { name: 'Improve Lead Generation', status: 'in-progress', weight: 20 },
        { name: 'Team Development', status: 'completed', weight: 15 }
      ],
      metrics: {
        productivity: 4.3,
        quality: 4.2,
        collaboration: 4.5,
        innovation: 3.8,
        leadership: 4.4
      },
      feedback: {
        strengths: 'Strategic thinking, excellent team leadership, creative campaigns',
        improvements: 'Could enhance data analysis skills',
        managerNotes: 'Consistent high performer, excellent leadership potential'
      },
      reviewDate: '2024-09-28',
      nextReviewDate: '2024-12-28',
      developmentPlan: [
        'Digital Marketing Analytics',
        'Advanced Leadership Program',
        'Data Visualization Training'
      ]
    },
    {
      id: 3,
      employeeId: 'EMP003',
      name: 'Mike Chen',
      department: 'Sales',
      position: 'Sales Director',
      manager: 'Lisa Rodriguez',
      overallRating: 4.7,
      quarter: 'Q3 2024',
      goals: [
        { name: 'Exceed Sales Targets', status: 'completed', weight: 40 },
        { name: 'Expand Customer Base', status: 'completed', weight: 25 },
        { name: 'Team Training Program', status: 'completed', weight: 20 },
        { name: 'Process Optimization', status: 'in-progress', weight: 15 }
      ],
      metrics: {
        productivity: 4.8,
        quality: 4.6,
        collaboration: 4.7,
        innovation: 4.5,
        leadership: 4.9
      },
      feedback: {
        strengths: 'Outstanding sales performance, exceptional leadership, strategic vision',
        improvements: 'Continue developing international market knowledge',
        managerNotes: 'Exceptional performer, key contributor to company growth'
      },
      reviewDate: '2024-09-25',
      nextReviewDate: '2024-12-25',
      developmentPlan: [
        'International Business Development',
        'Executive Leadership Program',
        'Advanced Negotiation Skills'
      ]
    },
    {
      id: 4,
      employeeId: 'EMP004',
      name: 'Lisa Rodriguez',
      department: 'HR',
      position: 'HR Manager',
      manager: 'David Wilson',
      overallRating: 4.1,
      quarter: 'Q3 2024',
      goals: [
        { name: 'Improve Employee Satisfaction', status: 'in-progress', weight: 30 },
        { name: 'Streamline Hiring Process', status: 'completed', weight: 25 },
        { name: 'Implement Training Programs', status: 'completed', weight: 25 },
        { name: 'Policy Updates', status: 'in-progress', weight: 20 }
      ],
      metrics: {
        productivity: 4.0,
        quality: 4.3,
        collaboration: 4.2,
        innovation: 3.8,
        leadership: 4.1
      },
      feedback: {
        strengths: 'Excellent people skills, thorough in compliance, good communicator',
        improvements: 'Could be more proactive in strategic initiatives',
        managerNotes: 'Solid performer, good potential for growth'
      },
      reviewDate: '2024-09-20',
      nextReviewDate: '2024-12-20',
      developmentPlan: [
        'Strategic HR Management',
        'Employee Engagement Strategies',
        'Change Management Certification'
      ]
    },
    {
      id: 5,
      employeeId: 'EMP005',
      name: 'David Wilson',
      department: 'Finance',
      position: 'Finance Director',
      manager: 'Emma Davis',
      overallRating: 4.4,
      quarter: 'Q3 2024',
      goals: [
        { name: 'Financial Planning Accuracy', status: 'completed', weight: 35 },
        { name: 'Cost Optimization', status: 'completed', weight: 30 },
        { name: 'Team Development', status: 'in-progress', weight: 20 },
        { name: 'System Implementation', status: 'completed', weight: 15 }
      ],
      metrics: {
        productivity: 4.5,
        quality: 4.6,
        collaboration: 4.2,
        innovation: 4.1,
        leadership: 4.3
      },
      feedback: {
        strengths: 'Strong analytical skills, attention to detail, reliable execution',
        improvements: 'Could improve presentation skills for board meetings',
        managerNotes: 'Reliable and thorough, key financial strategist'
      },
      reviewDate: '2024-09-15',
      nextReviewDate: '2024-12-15',
      developmentPlan: [
        'Executive Presentation Skills',
        'Advanced Financial Modeling',
        'Board Communication Training'
      ]
    }
  ];

  const departments = ['All', 'Engineering', 'Marketing', 'Sales', 'HR', 'Finance'];
  const periods = ['2024', '2023', '2022'];

  const filteredData = performanceData.filter(emp => {
    const matchesSearch = 
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = departmentFilter === 'All' || emp.department === departmentFilter;
    
    return matchesSearch && matchesDepartment;
  });

  // Calculate summary statistics
  const avgRating = (filteredData.reduce((sum, emp) => sum + emp.overallRating, 0) / filteredData.length).toFixed(1);
  const topPerformers = filteredData.filter(emp => emp.overallRating >= 4.5).length;
  const needsImprovement = filteredData.filter(emp => emp.overallRating < 3.5).length;
  const completedGoals = filteredData.reduce((sum, emp) => 
    sum + emp.goals.filter(goal => goal.status === 'completed').length, 0
  );

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-blue-600';
    if (rating >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRatingBg = (rating) => {
    if (rating >= 4.5) return 'bg-green-100';
    if (rating >= 4.0) return 'bg-blue-100';
    if (rating >= 3.5) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getGoalStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'not-started': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateGoalCompletion = (goals) => {
    const completed = goals.filter(goal => goal.status === 'completed').length;
    return Math.round((completed / goals.length) * 100);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Performance Management</h1>
            <p className="text-gray-600">Track and manage employee performance reviews and goals</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
              <Download size={16} />
              <span>Export Report</span>
            </button>
            <button
              onClick={() => setShowReviewModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>New Review</span>
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold text-blue-600">{avgRating}</p>
                <p className="text-sm text-gray-500 mt-1">Out of 5.0</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Star className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Top Performers</p>
                <p className="text-2xl font-bold text-green-600">{topPerformers}</p>
                <p className="text-sm text-gray-500 mt-1">Rating ≥ 4.5</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Goals Completed</p>
                <p className="text-2xl font-bold text-purple-600">{completedGoals}</p>
                <p className="text-sm text-gray-500 mt-1">This quarter</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Target className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Need Attention</p>
                <p className="text-2xl font-bold text-red-600">{needsImprovement}</p>
                <p className="text-sm text-gray-500 mt-1">Rating &lt; 3.5</p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex space-x-3">
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              <select
                value={periodFilter}
                onChange={(e) => setPeriodFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {periods.map(period => (
                  <option key={period} value={period}>{period}</option>
                ))}
              </select>
              <button className="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
                <Filter size={16} />
                <span>More Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Performance Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredData.map((employee) => {
              const goalCompletion = calculateGoalCompletion(employee.goals);
              
              return (
                <div key={employee.id} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                  {/* Employee Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-lg font-medium text-gray-700">
                          {employee.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{employee.name}</h3>
                        <p className="text-sm text-gray-500">{employee.position}</p>
                        <p className="text-xs text-gray-400">{employee.employeeId} • {employee.department}</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-lg font-bold ${getRatingBg(employee.overallRating)} ${getRatingColor(employee.overallRating)}`}>
                      {employee.overallRating}
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-600">Performance Metrics</span>
                      <span className="text-xs text-gray-500">{employee.quarter}</span>
                    </div>
                    <div className="space-y-2">
                      {Object.entries(employee.metrics).map(([metric, value]) => (
                        <div key={metric} className="flex items-center justify-between">
                          <span className="text-xs text-gray-600 capitalize">{metric}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-gray-200 rounded-full h-1.5">
                              <div 
                                className="bg-blue-600 h-1.5 rounded-full" 
                                style={{ width: `${(value / 5) * 100}%` }}
                              />
                            </div>
                            <span className="text-xs font-medium text-gray-700 w-6">{value}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Goals Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-600">Goals Progress</span>
                      <span className="text-sm font-bold text-green-600">{goalCompletion}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${goalCompletion}%` }}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {employee.goals.slice(0, 4).map((goal, index) => (
                        <div key={index} className="flex items-center space-x-1">
                          <div className={`w-2 h-2 rounded-full ${
                            goal.status === 'completed' ? 'bg-green-500' : 
                            goal.status === 'in-progress' ? 'bg-yellow-500' : 'bg-gray-300'
                          }`} />
                          <span className="text-xs text-gray-600 truncate">{goal.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setSelectedEmployee(employee)}
                      className="flex-1 bg-blue-600 text-white text-sm py-2 px-3 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-1"
                    >
                      <Eye size={14} />
                      <span>View Details</span>
                    </button>
                    <button className="bg-white border border-gray-300 text-gray-700 text-sm py-2 px-3 rounded-lg hover:bg-gray-50 flex items-center justify-center">
                      <Edit size={14} />
                    </button>
                  </div>

                  {/* Next Review */}
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Next Review:</span>
                      <span className="font-medium">{formatDate(employee.nextReviewDate)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-12">
              <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No performance data found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Employee Details Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-xl font-medium text-gray-700">
                      {selectedEmployee.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium text-gray-900">{selectedEmployee.name}</h3>
                    <p className="text-gray-600">{selectedEmployee.position} • {selectedEmployee.department}</p>
                    <p className="text-sm text-gray-500">Manager: {selectedEmployee.manager}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedEmployee(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Performance Metrics */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center space-x-2">
                    <BarChart3 size={20} />
                    <span>Performance Metrics</span>
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-medium text-gray-600">Overall Rating</span>
                      <div className={`px-4 py-2 rounded-full text-2xl font-bold ${getRatingBg(selectedEmployee.overallRating)} ${getRatingColor(selectedEmployee.overallRating)}`}>
                        {selectedEmployee.overallRating}
                      </div>
                    </div>
                    {Object.entries(selectedEmployee.metrics).map(([metric, value]) => (
                      <div key={metric} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-600 capitalize">{metric}</span>
                          <span className="text-sm font-bold text-gray-900">{value}/5.0</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(value / 5) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Goals and Objectives */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center space-x-2">
                    <Target size={20} />
                    <span>Goals & Objectives</span>
                  </h4>
                  <div className="space-y-3">
                    {selectedEmployee.goals.map((goal, index) => (
                      <div key={index} className="bg-white rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-gray-900">{goal.name}</h5>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getGoalStatusColor(goal.status)}`}>
                            {goal.status.replace('-', ' ').toUpperCase()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Weight: {goal.weight}%</span>
                          <div className="flex items-center space-x-1">
                            {goal.status === 'completed' && <CheckCircle size={16} className="text-green-600" />}
                            {goal.status === 'in-progress' && <Clock size={16} className="text-yellow-600" />}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Feedback and Development */}
                <div className="bg-gray-50 rounded-lg p-6 lg:col-span-2">
                  <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center space-x-2">
                    <MessageSquare size={20} />
                    <span>Feedback & Development</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Strengths</h5>
                      <p className="text-gray-700 text-sm bg-green-50 p-3 rounded-lg">
                        {selectedEmployee.feedback.strengths}
                      </p>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Areas for Improvement</h5>
                      <p className="text-gray-700 text-sm bg-yellow-50 p-3 rounded-lg">
                        {selectedEmployee.feedback.improvements}
                      </p>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Manager Notes</h5>
                      <p className="text-gray-700 text-sm bg-blue-50 p-3 rounded-lg">
                        {selectedEmployee.feedback.managerNotes}
                      </p>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Development Plan</h5>
                      <ul className="text-sm text-gray-700 space-y-1">
                        {selectedEmployee.developmentPlan.map((plan, index) => (
                          <li key={index} className="flex items-center space-x-2 bg-purple-50 p-2 rounded">
                            <Zap size={14} className="text-purple-600" />
                            <span>{plan}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setSelectedEmployee(null)}
                  className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Edit Review
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                  Schedule 1:1
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-4/5 max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">New Performance Review</h3>
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Employee
                    </label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Select employee</option>
                      {performanceData.map(emp => (
                        <option key={emp.id} value={emp.employeeId}>
                          {emp.name} ({emp.employeeId})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Review Period
                    </label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Select period</option>
                      <option value="Q1 2024">Q1 2024</option>
                      <option value="Q2 2024">Q2 2024</option>
                      <option value="Q3 2024">Q3 2024</option>
                      <option value="Q4 2024">Q4 2024</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Overall Rating
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Select rating</option>
                    <option value="5">5 - Outstanding</option>
                    <option value="4">4 - Exceeds Expectations</option>
                    <option value="3">3 - Meets Expectations</option>
                    <option value="2">2 - Below Expectations</option>
                    <option value="1">1 - Unsatisfactory</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Key Strengths
                  </label>
                  <textarea
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe the employee's key strengths and achievements"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Areas for Development
                  </label>
                  <textarea
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Identify areas where the employee can improve"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Goals for Next Period
                  </label>
                  <textarea
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Set specific, measurable goals for the next review period"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Save Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceManagement;