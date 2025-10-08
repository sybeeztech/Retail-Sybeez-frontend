import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  X, 
  AlertTriangle, 
  Users, 
  Search, 
  Filter, 
  Download, 
  Plus,
  Eye,
  Edit,
  Mail,
  Phone,
  MapPin,
  FileText,
  CalendarDays,
  UserCheck,
  Ban
} from 'lucide-react';

const LeaveManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Sample leave requests data
  const leaveRequests = [
    {
      id: 1,
      employeeId: 'EMP001',
      name: 'John Smith',
      department: 'Engineering',
      position: 'Software Developer',
      leaveType: 'Annual Leave',
      startDate: '2024-10-15',
      endDate: '2024-10-18',
      days: 4,
      reason: 'Family vacation',
      status: 'pending',
      appliedOn: '2024-10-01',
      approver: 'Sarah Johnson',
      emergencyContact: '+1 (555) 123-4567',
      notes: 'Pre-approved by team lead'
    },
    {
      id: 2,
      employeeId: 'EMP002',
      name: 'Sarah Johnson',
      department: 'Marketing',
      position: 'Marketing Manager',
      leaveType: 'Sick Leave',
      startDate: '2024-10-08',
      endDate: '2024-10-09',
      days: 2,
      reason: 'Medical appointment and recovery',
      status: 'approved',
      appliedOn: '2024-10-07',
      approver: 'Mike Chen',
      emergencyContact: '+1 (555) 234-5678',
      notes: 'Medical certificate provided'
    },
    {
      id: 3,
      employeeId: 'EMP003',
      name: 'Mike Chen',
      department: 'Sales',
      position: 'Sales Manager',
      leaveType: 'Personal Leave',
      startDate: '2024-10-20',
      endDate: '2024-10-22',
      days: 3,
      reason: 'Personal matters',
      status: 'approved',
      appliedOn: '2024-09-28',
      approver: 'Lisa Rodriguez',
      emergencyContact: '+1 (555) 345-6789',
      notes: ''
    },
    {
      id: 4,
      employeeId: 'EMP004',
      name: 'Lisa Rodriguez',
      department: 'HR',
      position: 'HR Manager',
      leaveType: 'Maternity Leave',
      startDate: '2024-11-01',
      endDate: '2024-12-31',
      days: 61,
      reason: 'Maternity leave',
      status: 'pending',
      appliedOn: '2024-09-15',
      approver: 'David Wilson',
      emergencyContact: '+1 (555) 456-7890',
      notes: 'Extended leave request'
    },
    {
      id: 5,
      employeeId: 'EMP005',
      name: 'David Wilson',
      department: 'Finance',
      position: 'Finance Director',
      leaveType: 'Annual Leave',
      startDate: '2024-10-25',
      endDate: '2024-10-30',
      days: 6,
      reason: 'Conference and training',
      status: 'rejected',
      appliedOn: '2024-10-02',
      approver: 'Emma Davis',
      emergencyContact: '+1 (555) 567-8901',
      notes: 'Conflict with quarterly review period'
    },
    {
      id: 6,
      employeeId: 'EMP006',
      name: 'Emma Davis',
      department: 'Engineering',
      position: 'UI/UX Designer',
      leaveType: 'Compensatory Leave',
      startDate: '2024-10-12',
      endDate: '2024-10-12',
      days: 1,
      reason: 'Compensation for weekend work',
      status: 'approved',
      appliedOn: '2024-10-05',
      approver: 'John Smith',
      emergencyContact: '+1 (555) 678-9012',
      notes: 'Worked on weekend deployment'
    }
  ];

  const leaveTypes = ['All', 'Annual Leave', 'Sick Leave', 'Personal Leave', 'Maternity Leave', 'Compensatory Leave'];
  const statuses = ['All', 'Pending', 'Approved', 'Rejected'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <CheckCircle size={16} className="text-green-600" />;
      case 'pending': return <Clock size={16} className="text-yellow-600" />;
      case 'rejected': return <X size={16} className="text-red-600" />;
      default: return <Clock size={16} className="text-gray-600" />;
    }
  };

  const getLeaveTypeColor = (type) => {
    switch (type) {
      case 'Annual Leave': return 'bg-blue-100 text-blue-800';
      case 'Sick Leave': return 'bg-red-100 text-red-800';
      case 'Personal Leave': return 'bg-purple-100 text-purple-800';
      case 'Maternity Leave': return 'bg-pink-100 text-pink-800';
      case 'Compensatory Leave': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRequests = leaveRequests.filter(request => {
    const matchesSearch = 
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || request.status === statusFilter.toLowerCase();
    const matchesType = typeFilter === 'All' || request.leaveType === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Summary statistics
  const totalRequests = leaveRequests.length;
  const pendingRequests = leaveRequests.filter(req => req.status === 'pending').length;
  const approvedRequests = leaveRequests.filter(req => req.status === 'approved').length;
  const rejectedRequests = leaveRequests.filter(req => req.status === 'rejected').length;

  const handleApproval = (requestId, action) => {
    console.log(`${action} request ${requestId}`);
    setSelectedRequest(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateDaysRemaining = (startDate) => {
    const start = new Date(startDate);
    const today = new Date();
    const diffTime = start - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Leave Management</h1>
            <p className="text-gray-600">Manage employee leave requests and approvals</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
              <Download size={16} />
              <span>Export</span>
            </button>
            <button
              onClick={() => setShowRequestModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>New Request</span>
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Requests</p>
                <p className="text-2xl font-bold text-blue-600">{totalRequests}</p>
                <p className="text-sm text-gray-500 mt-1">This month</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingRequests}</p>
                <p className="text-sm text-gray-500 mt-1">Awaiting approval</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">{approvedRequests}</p>
                <p className="text-sm text-gray-500 mt-1">This month</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{rejectedRequests}</p>
                <p className="text-sm text-gray-500 mt-1">This month</p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <Ban className="h-5 w-5 text-red-600" />
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
                  placeholder="Search leave requests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex space-x-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {leaveTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <button className="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
                <Filter size={16} />
                <span>More Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Leave Requests Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Leave Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applied On
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequests.map((request) => {
                const daysRemaining = calculateDaysRemaining(request.startDate);
                
                return (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-700">
                              {request.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{request.name}</div>
                          <div className="text-sm text-gray-500">{request.employeeId} • {request.department}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getLeaveTypeColor(request.leaveType)}`}>
                        {request.leaveType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">{request.days} day{request.days > 1 ? 's' : ''}</div>
                      {daysRemaining > 0 && request.status === 'approved' && (
                        <div className="text-xs text-blue-600">Starts in {daysRemaining} days</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDate(request.startDate)}
                        {request.startDate !== request.endDate && (
                          <> - {formatDate(request.endDate)}</>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                        {getStatusIcon(request.status)}
                        <span className="ml-1">
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(request.appliedOn)}</div>
                      <div className="text-sm text-gray-500">By {request.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          className="text-blue-600 hover:text-blue-900"
                          onClick={() => setSelectedRequest(request)}
                        >
                          <Eye size={16} />
                        </button>
                        {request.status === 'pending' && (
                          <>
                            <button 
                              className="text-green-600 hover:text-green-900"
                              onClick={() => handleApproval(request.id, 'approve')}
                            >
                              <CheckCircle size={16} />
                            </button>
                            <button 
                              className="text-red-600 hover:text-red-900"
                              onClick={() => handleApproval(request.id, 'reject')}
                            >
                              <X size={16} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredRequests.length === 0 && (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No leave requests found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Request Details Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-4/5 max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-medium text-gray-900">Leave Request Details</h3>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Employee Information */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Employee Information</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Name</span>
                      <span className="text-gray-900 font-medium">{selectedRequest.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Employee ID</span>
                      <span className="text-gray-900 font-medium">{selectedRequest.employeeId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Department</span>
                      <span className="text-gray-900 font-medium">{selectedRequest.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Position</span>
                      <span className="text-gray-900 font-medium">{selectedRequest.position}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Emergency Contact</span>
                      <span className="text-gray-900 font-medium">{selectedRequest.emergencyContact}</span>
                    </div>
                  </div>
                </div>

                {/* Leave Details */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Leave Details</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Leave Type</span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getLeaveTypeColor(selectedRequest.leaveType)}`}>
                        {selectedRequest.leaveType}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Start Date</span>
                      <span className="text-gray-900 font-medium">{formatDate(selectedRequest.startDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">End Date</span>
                      <span className="text-gray-900 font-medium">{formatDate(selectedRequest.endDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Duration</span>
                      <span className="text-gray-900 font-medium">{selectedRequest.days} day{selectedRequest.days > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Status</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedRequest.status)}`}>
                        {getStatusIcon(selectedRequest.status)}
                        <span className="ml-1">
                          {selectedRequest.status.charAt(0).toUpperCase() + selectedRequest.status.slice(1)}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reason and Notes */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Reason & Notes</h4>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Reason for Leave:</span>
                    <p className="text-gray-900 mt-1">{selectedRequest.reason}</p>
                  </div>
                  {selectedRequest.notes && (
                    <div>
                      <span className="text-sm font-medium text-gray-600">Additional Notes:</span>
                      <p className="text-gray-900 mt-1">{selectedRequest.notes}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-sm font-medium text-gray-600">Applied On:</span>
                    <p className="text-gray-900 mt-1">{formatDate(selectedRequest.appliedOn)}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Approver:</span>
                    <p className="text-gray-900 mt-1">{selectedRequest.approver}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
                {selectedRequest.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleApproval(selectedRequest.id, 'reject')}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleApproval(selectedRequest.id, 'approve')}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                      Approve
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-4/5 max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">New Leave Request</h3>
                <button
                  onClick={() => setShowRequestModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Employee
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Select employee</option>
                    {leaveRequests.map(emp => (
                      <option key={emp.id} value={emp.employeeId}>
                        {emp.name} ({emp.employeeId})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Leave Type
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Select leave type</option>
                    {leaveTypes.slice(1).map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reason for Leave
                  </label>
                  <textarea
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter reason for leave request"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Emergency Contact
                  </label>
                  <input
                    type="tel"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Emergency contact number"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowRequestModal(false)}
                  className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowRequestModal(false)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveManagement;