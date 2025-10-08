import React, { useState, useEffect } from 'react';
import { useLeaveStore } from '../../store/leaveStore';
import { useAuthStore } from '../../store/authStore';
import { 
  Search, 
  Filter, 
  Calendar, 
  Download, 
  MoreVertical, 
  Eye, 
  Edit, 
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Building,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LeaveApplications = () => {
  const { user } = useAuthStore();
  const { 
    leaveApplications, 
    loading, 
    error,
    filters,
    getLeaveApplications,
    processLeaveApplication,
    cancelLeaveApplication,
    clearFilters,
    getApplicationById,
    getApplicationsByStatus
  } = useLeaveStore();

  const navigate = useNavigate();

  // State for UI controls
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedApplications, setSelectedApplications] = useState(new Set());
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'card'
  const [expandedApplication, setExpandedApplication] = useState(null);

  // Enhanced filters state
  const [localFilters, setLocalFilters] = useState({
    status: '',
    leaveType: '',
    startDate: '',
    endDate: '',
    department: '',
    employeeId: ''
  });

  useEffect(() => {
    // Load applications with current filters
    getLeaveApplications(filters);
  }, []);

  // Apply filters
  const applyFilters = () => {
    getLeaveApplications(localFilters);
    setShowFilters(false);
  };

  // Clear all filters
  const handleClearFilters = () => {
    setLocalFilters({
      status: '',
      leaveType: '',
      startDate: '',
      endDate: '',
      department: '',
      employeeId: ''
    });
    clearFilters();
    getLeaveApplications();
  };

  // Handle bulk actions
  const handleBulkAction = async (action) => {
    if (selectedApplications.size === 0) return;

    try {
      for (const appId of selectedApplications) {
        if (action === 'approve' || action === 'reject') {
          await processLeaveApplication(appId, action, 'Bulk action');
        }
      }
      setSelectedApplications(new Set());
      getLeaveApplications(filters); // Refresh list
    } catch (error) {
      console.error('Bulk action failed:', error);
    }
  };

  // Toggle application selection
  const toggleApplicationSelection = (appId) => {
    const newSelection = new Set(selectedApplications);
    if (newSelection.has(appId)) {
      newSelection.delete(appId);
    } else {
      newSelection.add(appId);
    }
    setSelectedApplications(newSelection);
  };

  // Select all applications on current page
  const toggleSelectAll = () => {
    if (selectedApplications.size === filteredApplications.length) {
      setSelectedApplications(new Set());
    } else {
      setSelectedApplications(new Set(filteredApplications.map(app => app.id)));
    }
  };

  
  // Action buttons based on user role and application status
  const getActionButtons = (application) => {
    const isOwnApplication = application.employeeId === user?.employeeId;
    const isManager = ['manager', 'admin', 'super_admin'].includes(user?.employee.role);
    const canApprove = isManager && application.status === 'pending' && !isOwnApplication;

    const actions = [];

    if (isOwnApplication) {
      if (application.status === 'pending') {
        actions.push({
          label: 'Cancel',
          action: () => cancelLeaveApplication(application.id),
          color: 'text-red-600 hover:text-red-800',
          icon: XCircle
        });
      }
      actions.push({
        label: 'View Details',
        action: () => navigate(`/leave/applications/${application.id}`),
        color: 'text-blue-600 hover:text-blue-800',
        icon: Eye
      });
    }

    // if (canApprove) {
    //   actions.push(
    //     {
    //       label: 'Approve',
    //       action: () => processLeaveApplication(application.id, 'approve', ''),
    //       color: 'text-green-600 hover:text-green-800',
    //       icon: CheckCircle
    //     },
    //     {
    //       label: 'Reject',
    //       action: () => processLeaveApplication(application.id, 'reject', ''),
    //       color: 'text-red-600 hover:text-red-800',
    //       icon: XCircle
    //     }
    //   );
    // }

    // if (isManager && !canApprove) {
    //   actions.push({
    //     label: 'View Details',
    //     action: () => navigate(`/leave/applications/${application.id}`),
    //     color: 'text-blue-600 hover:text-blue-800',
    //     icon: Eye
    //   });
    // }

    return actions;
  };

  // Filter applications based on search and filters
  const filteredApplications = leaveApplications.filter(app => {
    const matchesSearch = searchTerm === '' || 
      app.employee?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.leaveType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.reason?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = !localFilters.status || app.status === localFilters.status;
    const matchesLeaveType = !localFilters.leaveType || app.leaveType === localFilters.leaveType;
    const matchesDepartment = !localFilters.department || app.employee?.department === localFilters.department;

    return matchesSearch && matchesStatus && matchesLeaveType && matchesDepartment;
  });

  // Group applications by status for quick filtering
  const applicationsByStatus = {
    pending: getApplicationsByStatus('pending'),
    approved: getApplicationsByStatus('approved'),
    rejected: getApplicationsByStatus('rejected'),
    cancelled: getApplicationsByStatus('cancelled')
  };

  // Quick stats for the header
  const stats = {
    total: leaveApplications.length,
    pending: applicationsByStatus.pending.length,
    approved: applicationsByStatus.approved.length,
    rejected: applicationsByStatus.rejected.length
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Leave Applications</h1>
            <p className="text-gray-600">Manage and track all leave requests</p>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={() => navigate('/leave/apply')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Apply for Leave
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow border">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-500">Total Applications</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-gray-500">Pending</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border">
            <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
            <div className="text-sm text-gray-500">Approved</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border">
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            <div className="text-sm text-gray-500">Rejected</div>
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="bg-white rounded-lg shadow border p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
                {showFilters ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
              </button>

              {/* Filters Dropdown */}
              {showFilters && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-10 p-4">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        value={localFilters.status}
                        onChange={(e) => setLocalFilters(prev => ({ ...prev, status: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      >
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
                      <select
                        value={localFilters.leaveType}
                        onChange={(e) => setLocalFilters(prev => ({ ...prev, leaveType: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      >
                        <option value="">All Types</option>
                        <option value="CL">Casual Leave (CL)</option>
                        <option value="SL">Sick Leave (SL)</option>
                        <option value="PL">Privileged Leave (PL)</option>
                        <option value="Maternity">Maternity Leave</option>
                        <option value="Paternity">Paternity Leave</option>
                      </select>
                    </div>

                    {['manager', 'admin', 'super_admin'].includes(user?.employee.role) && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                        <select
                          value={localFilters.department}
                          onChange={(e) => setLocalFilters(prev => ({ ...prev, department: e.target.value }))}
                          className="w-full p-2 border border-gray-300 rounded-lg"
                        >
                          <option value="">All Departments</option>
                          <option value="Engineering">Engineering</option>
                          <option value="HR">HR</option>
                          <option value="Sales">Sales</option>
                          <option value="Marketing">Marketing</option>
                        </select>
                      </div>
                    )}

                    <div className="flex space-x-2">
                      <button
                        onClick={applyFilters}
                        className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                      >
                        Apply Filters
                      </button>
                      <button
                        onClick={handleClearFilters}
                        className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* View Controls and Bulk Actions */}
          <div className="flex items-center space-x-3 w-full lg:w-auto justify-between lg:justify-start">
            {/* Bulk Actions for Managers/Admins */}
            {['manager', 'admin', 'super_admin'].includes(user?.employee.role) && selectedApplications.size > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">{selectedApplications.size} selected</span>
                <select
                  onChange={(e) => handleBulkAction(e.target.value)}
                  className="text-sm border border-gray-300 rounded-lg p-2"
                  defaultValue=""
                >
                  <option value="" disabled>Bulk Actions</option>
                  <option value="approve">Approve Selected</option>
                  <option value="reject">Reject Selected</option>
                </select>
              </div>
            )}

            {/* View Mode Toggle */}
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'bg-white text-gray-600'}`}
              >
                List
              </button>
              <button
                onClick={() => setViewMode('card')}
                className={`px-3 py-2 ${viewMode === 'card' ? 'bg-blue-100 text-blue-600' : 'bg-white text-gray-600'}`}
              >
                Cards
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="bg-white rounded-lg shadow border overflow-hidden">
        {/* Table Header */}
        {viewMode === 'list' && (
          <div className="grid grid-cols-12 gap-4 p-4 border-b bg-gray-50 font-medium text-gray-700">
            {['manager', 'admin', 'super_admin'].includes(user?.employee.role) && (
              <div className="col-span-1 flex items-center">
                <input
                  type="checkbox"
                  checked={selectedApplications.size === filteredApplications.length && filteredApplications.length > 0}
                  onChange={toggleSelectAll}
                  className="rounded border-gray-300"
                />
              </div>
            )}
            <div className="col-span-3">Employee & Leave Type</div>
            <div className="col-span-2">Dates</div>
            <div className="col-span-1">Duration</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Applied On</div>
            <div className="col-span-1">Actions</div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="p-8 text-center text-gray-500">
            Loading applications...
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-8 text-center text-red-500">
            Error loading applications: {error}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredApplications.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p>No leave applications found</p>
            <p className="text-sm">Try adjusting your filters or search terms</p>
          </div>
        )}

        {/* Applications */}
        {!loading && filteredApplications.length > 0 && (
          <div className="divide-y divide-gray-200">
            {filteredApplications.map((application) => (
              <ApplicationRow
                key={application.id}
                application={application}
                viewMode={viewMode}
                isSelected={selectedApplications.has(application.id)}
                onSelect={() => toggleApplicationSelection(application.id)}
                isExpanded={expandedApplication === application.id}
                onExpand={() => setExpandedApplication(expandedApplication === application.id ? null : application.id)}
                actions={getActionButtons(application)}
                showCheckbox={['manager', 'admin', 'super_admin'].includes(user?.employee.role)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Individual Application Row/Card Component
const ApplicationRow = ({ 
  application, 
  viewMode, 
  isSelected, 
  onSelect, 
  isExpanded, 
  onExpand, 
  actions,
  showCheckbox 
}) => {
  const isManagerView = showCheckbox;

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Clock },
      approved: { color: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle },
      rejected: { color: 'bg-red-100 text-red-800 border-red-200', icon: XCircle },
      cancelled: { color: 'bg-gray-100 text-gray-800 border-gray-200', icon: XCircle }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    const IconComponent = config.icon;
    
    return (
      
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${config.color}`}>
        <IconComponent className="w-3 h-3 mr-1" />
        {status?.charAt(0).toUpperCase() + status?.slice(1)}
      </span>
    );
  };


  if (viewMode === 'card') {
    return (
      <div className="p-4 hover:bg-gray-50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            {showCheckbox && (
              <input
                type="checkbox"
                checked={isSelected}
                onChange={onSelect}
                className="rounded border-gray-300"
              />
            )}
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="font-medium text-gray-900">{application.employee?.name}</div>
              <div className="text-sm text-gray-500 flex items-center">
                <Building className="w-3 h-3 mr-1" />
                {application.employee?.department}
              </div>
            </div>
          </div>
          <StatusBadge status={application.status} />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-3">
          <div>
            <div className="text-sm text-gray-500">Leave Type</div>
            <div className="font-medium">{application.leaveType}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Duration</div>
            <div className="font-medium">{application.duration} days</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">From</div>
            <div className="font-medium">{new Date(application.startDate).toLocaleDateString('en-GB')}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">To</div>
            <div className="font-medium">{new Date(application.endDate).toLocaleDateString('en-GB')}</div>
          </div>
        </div>

        {application.reason && (
          <div className="mb-3">
            <div className="text-sm text-gray-500">Reason</div>
            <div className="text-sm">{application.reason}</div>
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Applied on {new Date(application.appliedDate).toLocaleDateString('en-GB')}
          </div>
          <div className="flex space-x-2">
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className={`text-sm px-3 py-1 rounded border ${action.color} border-current `}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // List View
  return (
    <div className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 items-center">
      {showCheckbox && (
        <div className="col-span-1 flex items-center">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onSelect}
            className="rounded border-gray-300"
          />
        </div>
      )}

      <div className="col-span-3">
        <div className="font-medium text-gray-900">{application.employee?.name}</div>
        <div className="text-sm text-gray-500 flex items-center">
          <Building className="w-3 h-3 mr-1" />
          {application.employee?.department} • {application.leaveType}
        </div>
      </div>

      <div className="col-span-2 text-sm">
        {new Date(application.startDate).toLocaleDateString('en-GB')} - {new Date(application.endDate).toLocaleDateString('en-GB')}
      </div>

      <div className="col-span-1 text-sm font-medium">
        {application.duration} days
      </div>

      <div className="col-span-2">
        <StatusBadge status={application.status} />
      </div>

      <div className="col-span-2 text-sm text-gray-500">
        {new Date(application.appliedDate).toLocaleDateString('en-GB')}
      </div>

      <div className="col-span-1">
        <div className="flex items-center space-x-2">
          {actions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <button
                key={index}
                onClick={action.action}
                className={`p-1 rounded hover:bg-gray-200 ${action.color}`}
                title={action.label}
              >
                <IconComponent className="w-4 h-4" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LeaveApplications;