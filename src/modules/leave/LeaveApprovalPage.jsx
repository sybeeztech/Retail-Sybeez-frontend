import React, { useState, useEffect } from 'react';
import { useLeaveStore } from '../../store/leaveStore';
import { useAuthStore } from '../../store/authStore';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Calendar, 
  User, 
  Users, 
  Filter, 
  Search, 
  Download,
  Send,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Eye
} from 'lucide-react';

const LeaveApprovalPage = () => {
  const { user } = useAuthStore();
  const {
    leaveApplications,
    teamCalendar,
    loading,
    getLeaveApplications,
    processLeaveApplication,
    getTeamCalendar,
    filters,
    getPendingApplications
  } = useLeaveStore();

  const [selectedApplications, setSelectedApplications] = useState(new Set());
  const [bulkAction, setBulkAction] = useState('');
  const [bulkComments, setBulkComments] = useState('');
  const [expandedApplication, setExpandedApplication] = useState(null);
  const [viewFilters, setViewFilters] = useState({
    status: 'pending',
    department: '',
    dateRange: '',
    employee: ''
  });

  // Check if user has approval permissions
  const canApproveLeaves = ['manager', 'admin', 'super_admin'].includes(user?.employee.role);


  // Check if user has approval permissions for a specific application
const canApproveApplication = (application) => {
  const currentUserRole = user?.employee?.role;
  const applicationUserId = application.employee?.id;
  const currentUserId = user?.employee?.id;

  // If it's the user's own application, check role-based restrictions
  if (applicationUserId === currentUserId) {
    if (currentUserRole === 'manager') {
      // Manager's applications can only be approved by admin or super_admin
      return false;
    } else if (currentUserRole === 'admin') {
      // Admin's applications can only be approved by super_admin
      return false;
    }
  }
  
  // For other cases, use the original permission check
  return ['manager', 'admin', 'super_admin'].includes(currentUserRole);
};

  useEffect(() => {
    if (canApproveLeaves) {
      getLeaveApplications();
      getTeamCalendar();
    }
  }, [canApproveLeaves]);

  useEffect(() => {
    getLeaveApplications();
  }, [selectedApplications])

  if (!canApproveLeaves) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to approve leave applications.</p>
        </div>
      </div>
    );
  }

  // Filter applications based on current filters
  const filteredApplications = leaveApplications.filter(app => {
    if (viewFilters.status && app.status !== viewFilters.status) return false;
    if (viewFilters.department && app.employee?.department !== viewFilters.department) return false;
    if (viewFilters.employee && !app.employee?.name?.toLowerCase().includes(viewFilters.employee.toLowerCase())) return false;
    
    // Date range filter
    if (viewFilters.dateRange) {
      const appDate = new Date(app.startDate);
      const today = new Date();
      let startDate = new Date();
      
      switch (viewFilters.dateRange) {
        case 'today':
          return appDate.toDateString() === today.toDateString();
        case 'week':
          startDate.setDate(today.getDate() - 7);
          return appDate >= startDate;
        case 'month':
          startDate.setMonth(today.getMonth() - 1);
          return appDate >= startDate;
        default:
          return true;
      }
    }
    
    return true;
  });

  // Get unique departments for filter
  const departments = [...new Set(leaveApplications.map(app => app.employee?.department).filter(Boolean))];

  // Handle individual approval/rejection
  const handleApplicationAction = async (applicationId, action, comments = '') => {
    try {
      await processLeaveApplication(applicationId, action, comments);
      setSelectedApplications(prev => {
        const newSet = new Set(prev);
        newSet.delete(applicationId);
        return newSet;
      });
    } catch (error) {
      console.error('Error processing application:', error);
    }
  };

  // Handle bulk actions
  const handleBulkAction = async () => {
    if (!bulkAction || selectedApplications.size === 0) return;

    try {
      const promises = Array.from(selectedApplications).map(appId =>
        processLeaveApplication(appId, bulkAction, bulkComments)
      );
      
      await Promise.all(promises);
      setSelectedApplications(new Set());
      setBulkAction('');
      setBulkComments('');
    } catch (error) {
      console.error('Error processing bulk action:', error);
    }
  };

  // Check for leave conflicts
  const checkLeaveConflicts = (application) => {
    if (!teamCalendar || !application) return [];
    
    const appStart = new Date(application.startDate);
    const appEnd = new Date(application.endDate);
    
    return teamCalendar.filter(leave => {
      if (leave.id === application.id) return false;
      
      const leaveStart = new Date(leave.startDate);
      const leaveEnd = new Date(leave.endDate);
      
      return (
        leave.employee?.department === application.employee?.department &&
        leave.status === 'approved' &&
        ((appStart >= leaveStart && appStart <= leaveEnd) ||
         (appEnd >= leaveStart && appEnd <= leaveEnd) ||
         (appStart <= leaveStart && appEnd >= leaveEnd))
      );
    });
  };

  // Toggle application selection
  const toggleApplicationSelection = (applicationId) => {
    setSelectedApplications(prev => {
      const newSet = new Set(prev);
      if (newSet.has(applicationId)) {
        newSet.delete(applicationId);
      } else {
        newSet.add(applicationId);
      }
      return newSet;
    });
  };

  // Update the selectAllApplications function to only select approvable applications
const selectAllApplications = () => {
  const approvableApplications = filteredApplications.filter(app => canApproveApplication(app));
  
  if (selectedApplications.size === approvableApplications.length) {
    setSelectedApplications(new Set());
  } else {
    setSelectedApplications(new Set(approvableApplications.map(app => app.id)));
  }
};

  // Application card component
  const ApplicationCard = ({ application }) => {
    const conflicts = checkLeaveConflicts(application);
    const isExpanded = expandedApplication === application.id;
    const isSelected = selectedApplications.has(application.id);
    const canApproveThisApp = canApproveApplication(application);

    return (
      <div className={`bg-white border rounded-lg shadow-sm transition-all duration-200 ${
        isSelected ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-200'
      }`}>
        {/* Application Header */}
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Only show checkbox if user can approve this application */}
            {canApproveThisApp && (
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleApplicationSelection(application.id)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            )}
              
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900">{application.employee?.name}</h4>
                <p className="text-sm text-gray-500">{application.employee?.department}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                application.status === 'approved' ? 'bg-green-100 text-green-800' :
                'bg-red-100 text-red-800'
              }`}>
                {application?.status?.charAt(0).toUpperCase() + application?.status?.slice(1)}
              </span>
              
              <button
                onClick={() => setExpandedApplication(isExpanded ? null : application.id)}
                className="p-2 hover:bg-gray-100 rounded"
              >
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
            <div>
              <span className="text-gray-500">Leave Type:</span>
              <p className="font-medium">{application.leaveType}</p>
            </div>
            <div>
              <span className="text-gray-500">Duration:</span>
              <p className="font-medium">{application.duration} day(s)</p>
            </div>
            <div>
              <span className="text-gray-500">Start Date:</span>
              <p className="font-medium">{new Date(application.startDate).toLocaleDateString('en-GB')}</p>
            </div>
            <div>
              <span className="text-gray-500">End Date:</span>
              <p className="font-medium">{new Date(application.endDate).toLocaleDateString('en-GB')}</p>
            </div>
          </div>

          {conflicts.length > 0 && (
            <div className="mt-3 flex items-center space-x-2 text-amber-600 bg-amber-50 p-2 rounded">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">Potential scheduling conflict with {conflicts.length} team member(s)</span>
            </div>
          )}
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Application Details */}
              <div>
                <h5 className="font-semibold mb-3">Application Details</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Applied On:</span>
                    <span>{new Date(application.appliedDate).toLocaleDateString('en-GB')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Reason:</span>
                    <span className="text-right">{application.reason}</span>
                  </div>
                  {application.attachments && application.attachments.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Attachments:</span>
                      <span>{application.attachments.length} file(s)</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div>
                <h5 className="font-semibold mb-3">Take Action</h5>
                {canApproveThisApp ? (
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleApplicationAction(application.id, 'approve')}
                    className="flex-1 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Approve</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      const comments = prompt('Please provide reason for rejection:');
                      if (comments !== null) {
                        handleApplicationAction(application.id, 'reject', comments);
                      }
                    }}
                    className="flex-1 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Reject</span>
                  </button>
                  
                  {/* <button className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span>View</span>
                  </button> */}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  <XCircle className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p>You cannot approve or reject your own application</p>
                </div>
              )}
                
                {conflicts.length > 0 && (
                  <div className="mt-3 p-3 bg-white border border-amber-200 rounded">
                    <h6 className="font-semibold text-amber-800 mb-2">Scheduling Conflicts:</h6>
                    <div className="space-y-1 text-sm">
                      {conflicts.slice(0, 3).map(conflict => (
                        <div key={conflict.id} className="flex justify-between">
                          <span>{conflict.employee?.name}</span>
                          <span className="text-amber-600">
                            {new Date(conflict.startDate).toLocaleDateString('en-GB')} - {new Date(conflict.endDate).toLocaleDateString('en-GB')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Bulk Action Panel
  const BulkActionPanel = () => {
    if (selectedApplications.size === 0) return null;

    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="font-semibold text-blue-900">
              {selectedApplications.size} application(s) selected
            </span>
            
            <select
              value={bulkAction}
              onChange={(e) => setBulkAction(e.target.value)}
              className="border border-blue-300 rounded px-3 py-2 text-sm"
            >
              <option value="">Select action...</option>
              <option value="approve">Approve Selected</option>
              <option value="reject">Reject Selected</option>
            </select>
            
            {bulkAction === 'reject' && (
              <input
                type="text"
                value={bulkComments}
                onChange={(e) => setBulkComments(e.target.value)}
                placeholder="Reason for rejection..."
                className="border border-blue-300 rounded px-3 py-2 text-sm flex-1 min-w-0"
              />
            )}
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={handleBulkAction}
              disabled={!bulkAction}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Apply Action</span>
            </button>
            
            <button
              onClick={() => setSelectedApplications(new Set())}
              className="border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-50"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Statistics Panel
  const StatisticsPanel = () => {
    const stats = {
      pending: leaveApplications.filter(app => app.status === 'pending').length,
      approved: leaveApplications.filter(app => app.status === 'approved').length,
      rejected: leaveApplications.filter(app => app.status === 'rejected').length,
      total: leaveApplications.length
    };

    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Approved</p>
              <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Rejected</p>
              <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
            </div>
            <XCircle className="w-8 h-8 text-red-400" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
            </div>
            <Users className="w-8 h-8 text-blue-400" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Leave Approval Dashboard</h1>
        <p className="text-gray-600">Review and manage leave applications from your team</p>
      </div>

      {/* Statistics */}
      <StatisticsPanel />

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-wrap items-center gap-4">
            {/* Status Filter */}
            <select
              value={viewFilters.status}
              onChange={(e) => setViewFilters(prev => ({ ...prev, status: e.target.value }))}
              className="border border-gray-300 rounded px-3 py-2 text-sm"
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="">All Status</option>
            </select>

            {/* Department Filter */}
            <select
              value={viewFilters.department}
              onChange={(e) => setViewFilters(prev => ({ ...prev, department: e.target.value }))}
              className="border border-gray-300 rounded px-3 py-2 text-sm"
            >
              <option value="">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>

            {/* Date Range Filter */}
            <select
              value={viewFilters.dateRange}
              onChange={(e) => setViewFilters(prev => ({ ...prev, dateRange: e.target.value }))}
              className="border border-gray-300 rounded px-3 py-2 text-sm"
            >
              <option value="">Any Time</option>
              <option value="today">Today</option>
              <option value="week">Past Week</option>
              <option value="month">Past Month</option>
            </select>

            {/* Employee Search */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search employee..."
                value={viewFilters.employee}
                onChange={(e) => setViewFilters(prev => ({ ...prev, employee: e.target.value }))}
                className="border border-gray-300 rounded pl-10 pr-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            
            <button 
              onClick={() => setViewFilters({ status: 'pending', department: '', dateRange: '', employee: '' })}
              className="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Action Panel */}
      <BulkActionPanel />

      {/* Applications List */}
      <div className="space-y-4">
        {/* Header with select all */}
        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={selectedApplications.size === filteredApplications.length && filteredApplications.length > 0}
              onChange={selectAllApplications}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-600">
              {filteredApplications.length} application(s) found
            </span>
          </div>
          
          <div className="text-sm text-gray-500">
            {selectedApplications.size > 0 && `${selectedApplications.size} selected`}
          </div>
        </div>

        {/* Applications */}
        {loading ? (
          <div className="text-center py-8">
            <div className="text-gray-500">Loading applications...</div>
          </div>
        ) : filteredApplications.length > 0 ? (
          filteredApplications.map(application => (
            <ApplicationCard key={application.id} application={application} />
          ))
        ) : (
          <div className="text-center py-8 bg-white rounded-lg border border-gray-200">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No applications found</h3>
            <p className="text-gray-600">No leave applications match your current filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveApprovalPage;