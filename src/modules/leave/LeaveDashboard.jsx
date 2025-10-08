import React, { useState, useEffect } from 'react';
import { useLeaveStore, useLeaveBalance, useLeaveApplications, useTeamCalendar } from '../../store/leaveStore';
import { useAuthStore } from '../../store/authStore';
import { Calendar, Clock, Users, CheckCircle, XCircle, AlertCircle, Plus, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';

const LeaveDashboard = () => {
  const { user } = useAuthStore();
  const {
    leaveBalances,
    leaveApplications,
    teamCalendar,
    loading,
    getLeaveBalance,
    getLeaveApplications,
    processLeaveApplication,
    getTeamCalendar,
    getPendingApplications,
    getUpcomingLeaves,
    getAvailableLeave
  } = useLeaveStore();

  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarView, setCalendarView] = useState('week'); // 'month' or 'week'

  const navigate = useNavigate();

  // Get current user's employeeId
  const currentEmployeeId = user?.employeeId || user?.employee?.id;

  useEffect(() => {
    // Load initial data
    getLeaveBalance(currentEmployeeId);
    getLeaveApplications();
    
    if (['manager', 'admin', 'super_admin'].includes(user?.employee.role)) {
      getTeamCalendar();
    }
  }, [currentEmployeeId, user?.employee.role]);

  // Navigation functions for calendar
  const navigateDate = (direction) => {
    const newDate = new Date(selectedDate);
    if (calendarView === 'month') {
      newDate.setMonth(newDate.getMonth() + direction);
    } else {
      newDate.setDate(newDate.getDate() + (direction * 7));
    }
    setSelectedDate(newDate);
  };

  const goToToday = () => {
    setSelectedDate(new Date());
  };

  // Get date range for current view
  const getDateRange = () => {
    if (calendarView === 'month') {
      const start = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
      const end = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
      return { start, end };
    } else {
      const start = new Date(selectedDate);
      start.setDate(start.getDate() - start.getDay());
      const end = new Date(start);
      end.setDate(end.getDate() + 6);
      return { start, end };
    }
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const { start, end } = getDateRange();
    const days = [];
    const currentDay = new Date(start);
    
    while (currentDay <= end) {
      days.push(new Date(currentDay));
      currentDay.setDate(currentDay.getDate() + 1);
    }
    
    return days;
  };

  // Get leaves for a specific date
  const getLeavesForDate = (date) => {
    if (!teamCalendar) return [];
    
    return teamCalendar.filter(leave => {
      const leaveStart = new Date(leave.startDate || leave.start);
      const leaveEnd = new Date(leave.endDate || leave.end);
      const currentDate = new Date(date);
      
      return currentDate >= leaveStart && currentDate <= leaveEnd;
    });
  };

  // Get current user's balance data
  const currentUserBalance = currentEmployeeId ? leaveBalances[currentEmployeeId] : null;

  // Quick stats for the dashboard
  const dashboardStats = {
    availableLeaves: Object.values(currentUserBalance?.balances || {}).reduce(
      (sum, balance) => sum + (balance.available || 0), 0
    ),
    pendingApplications: leaveApplications.filter(app => app.status === 'pending' && app.employeeId === user?.employeeId).length,
    pendingApprovals: ['manager', 'admin', 'super_admin'].includes(user?.employee.role) 
      ? getPendingApplications().filter(app => app.employeeId !== user?.employeeId).length 
      : 0,
    upcomingLeaves: getUpcomingLeaves(30).length
  };

  // Leave balance cards
  const LeaveBalanceCard = ({ leaveType, balance }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{leaveType} Leave</p>
          <h3 className="text-2xl font-bold text-gray-800">{balance?.available || 0}</h3>
          <div className="flex items-center mt-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-xs text-gray-500">
              {balance?.used || 0} used of {balance?.total || 0}
            </span>
          </div>
        </div>
        <div className={`p-3 rounded-lg ${
          leaveType === 'CL' ? 'bg-blue-50' :
          leaveType === 'SL' ? 'bg-green-50' :
          leaveType === 'PL' ? 'bg-purple-50' : 'bg-yellow-50'
        }`}>
          <Calendar className={`w-5 h-5 ${
            leaveType === 'CL' ? 'text-blue-600' :
            leaveType === 'SL' ? 'text-green-600' :
            leaveType === 'PL' ? 'text-purple-600' : 'text-yellow-600'
          }`} />
        </div>
      </div>
    </div>
  );

  // Application status badge
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      approved: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      rejected: { color: 'bg-red-100 text-red-800', icon: XCircle },
      cancelled: { color: 'bg-gray-100 text-gray-800', icon: XCircle }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    const IconComponent = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <IconComponent className="w-3 h-3 mr-1" />
        {status?.charAt(0).toUpperCase() + status?.slice(1)}
      </span>
    );
  };

  // Quick actions panel
  const QuickActionsPanel = () => (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button 
          onClick={() => navigate('/leave/apply')}
          className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2 text-blue-500" />
          <span className="text-blue-600 font-medium">Apply for Leave</span>
        </button>
        
        <button 
          onClick={() => navigate('/leave/holiday-calendar')}
          className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
        >
          <Calendar className="w-5 h-5 mr-2 text-green-500" />
          <span className="text-green-600 font-medium">View Holidays</span>
        </button>
        
        {['manager', 'admin', 'super_admin'].includes(user?.employee.role) &&
        (
          <button 
          onClick={() => setActiveTab('team-calendar')}
          className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors"
        >
          <Users className="w-5 h-5 mr-2 text-purple-500" />
          <span className="text-purple-600 font-medium">Team Availability</span>
        </button>
        )
       }
      </div>
    </div>
  );

  // Pending approvals section (for managers/admins)
  const PendingApprovalsSection = () => {
    if (!['manager', 'admin', 'super_admin'].includes(user?.employee.role)) return null;
    
    const pendingApps = getPendingApplications().filter(app => app.employeeId !== user?.employeeId);
    
    return (
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Pending Approvals</h3>
          <span className="bg-red-100 text-red-800 text-sm px-2.5 py-0.5 rounded-full">
            {pendingApps.length} pending
          </span>
        </div>
        
        {pendingApps.length > 0 ? (
          <div className="space-y-3">
            {pendingApps.slice(0, 5).map(app => (
              <div key={app.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{app.employee?.name}</p>
                    <p className="text-sm text-gray-500">
                      {app.leaveType} • {app.duration} day(s) • {new Date(app.startDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => navigate('/leave/approval')}
                  className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No pending approvals</p>
        )}
      </div>
    );
  };

  // Upcoming leaves section
  const UpcomingLeavesSection = () => {
    const upcomingLeaves = getUpcomingLeaves(30);
    
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Upcoming Leaves</h3>
        
        {upcomingLeaves.length > 0 ? (
          <div className="space-y-3">
            {upcomingLeaves.map(leave => (
              <div key={leave.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    leave.employeeId === user?.employeeId ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <Calendar className={`w-5 h-5 ${
                      leave.employeeId === user?.employeeId ? 'text-blue-600' : 'text-gray-600'
                    }`} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {leave.employeeId === user?.employeeId ? 'You' : leave.employee?.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {leave.leaveType} • {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                {console.log('leave status '+leave.status)}
                <StatusBadge status={leave.status} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No upcoming leaves in the next 30 days</p>
        )}
      </div>
    );
  };

  // Team availability calendar (for managers/admins)
  const TeamAvailabilityCalendar = () => {
    if (!['manager', 'admin', 'super_admin'].includes(user?.employee.role)) return null;
    
    const calendarDays = generateCalendarDays();
    const { start: rangeStart, end: rangeEnd } = getDateRange();

    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Team Availability</h3>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigateDate(-1)}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goToToday}
                className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
              >
                Today
              </button>
              <button
                onClick={() => navigateDate(1)}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            {/* <h4 className="text-md font-semibold mx-4">
              {calendarView === 'month' 
                ? selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                : `${rangeStart.toLocaleDateString()} - ${rangeEnd.toLocaleDateString()}`
              }
            </h4> */}
            
            <div className="flex bg-gray-100 rounded-lg p-1">
              {/* <button
                onClick={() => setCalendarView('month')}
                className={`px-3 py-1 rounded text-sm ${calendarView === 'month' ? 'bg-white shadow' : ''}`}
              >
                Month
              </button> */}
              <button
                onClick={() => setCalendarView('week')}
                className={`px-3 py-1 rounded text-sm ${calendarView === 'week' ? 'bg-white shadow' : ''}`}
              >
                Week
              </button>
            </div>
          </div>
        </div>
        
        {/* Calendar Grid */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 border-b border-gray-200">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-3 text-center font-semibold text-gray-700 bg-gray-50">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 auto-rows-min">
            {calendarDays.map((day, index) => {
              const isToday = day.toDateString() === new Date().toDateString();
              const isCurrentMonth = day.getMonth() === selectedDate.getMonth();
              const dayLeaves = getLeavesForDate(day);
              
              return (
                <div
                  key={day.toISOString()}
                  className={`min-h-[100px] border-r border-b border-gray-200 p-2 ${
                    !isCurrentMonth ? 'bg-gray-50' : ''
                  } ${isToday ? 'bg-blue-50' : ''}`}
                >
                  <div className={`flex justify-between items-center mb-1 ${
                    isToday ? 'font-semibold text-blue-600' : ''
                  }`}>
                    <span className={`text-sm ${
                      isToday ? 'bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center' : ''
                    }`}>
                      {day.getDate()}
                    </span>
                    {dayLeaves.length > 0 && (
                      <span className="text-xs bg-gray-100 rounded-full px-2 py-1">
                        {dayLeaves.length}
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    {dayLeaves.slice(0, 2).map(leave => (
                      <div
                        key={`${leave.id}-${day.toISOString()}`}
                        className={`text-xs p-1 rounded border-l-2 ${
                          leave.status === 'approved' 
                            ? 'bg-green-50 border-green-500 text-green-700'
                            : 'bg-yellow-50 border-yellow-500 text-yellow-700'
                        }`}
                        title={`${leave.employee?.name} - ${leave.leaveType} (${leave.status})`}
                      >
                        <div className="font-medium truncate">
                          {leave.employee?.name?.split(' ')[0] || 'Unknown'}
                        </div>
                        <div className="truncate">{leave.leaveType}</div>
                      </div>
                    ))}
                    {dayLeaves.length > 2 && (
                      <div className="text-xs text-gray-500 text-center">
                        +{dayLeaves.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
            <span>Approved Leave</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
            <span>Pending Approval</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
            <span>Today</span>
          </div>
        </div>
      </div>
    );
  };

  // Recent applications section
  const RecentApplicationsSection = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Applications</h3>
      
      {leaveApplications.length > 0 ? (
        <div className="space-y-3">
          {leaveApplications.slice(0, 5).map(app => (
            <div key={app.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  app.status === 'approved' ? 'bg-green-100' :
                  app.status === 'rejected' ? 'bg-red-100' : 'bg-yellow-100'
                }`}>
                  <Calendar className={`w-5 h-5 ${
                    app.status === 'approved' ? 'text-green-600' :
                    app.status === 'rejected' ? 'text-red-600' : 'text-yellow-600'
                  }`} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{app.leaveType} Leave</p>
                  <p className="text-sm text-gray-500">
                    {new Date(app.startDate).toLocaleDateString()} - {new Date(app.endDate).toLocaleDateString()} • {app.duration} day(s)
                  </p>
                </div>
              </div>
              {console.log('application status '+app.status)}
              <StatusBadge status={app.status} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-4">No leave applications yet</p>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="text-gray-500">Loading leave dashboard...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Leave Dashboard</h1>
        <p className="text-gray-600">Manage your leaves and track team availability</p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm p-1 mb-6">
        <div className="flex space-x-1">
          {/* <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'overview' 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Overview
          </button> */}
          {/* {['manager', 'admin', 'super_admin'].includes(user?.employee.role) && (
            <button
              onClick={() => setActiveTab('team-calendar')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'team-calendar' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Team Calendar
            </button>
          )} */}
        </div>
      </div>

      {activeTab === 'overview' ? (
        <>
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Available Leaves</p>
                  <h3 className="text-2xl font-bold text-gray-800">{dashboardStats.availableLeaves}</h3>
                  <div className="flex items-center mt-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-xs text-gray-500">Total balance</span>
                  </div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <Calendar className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Pending Applications</p>
                  <h3 className="text-2xl font-bold text-gray-800">{dashboardStats.pendingApplications}</h3>
                  <div className="flex items-center mt-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                    <span className="text-xs text-gray-500">Awaiting approval</span>
                  </div>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <Clock className="w-5 h-5 text-yellow-600" />
                </div>
              </div>
            </div>

            {['manager', 'admin', 'super_admin'].includes(user?.employee.role) && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Pending Approvals</p>
                    <h3 className="text-2xl font-bold text-gray-800">{dashboardStats.pendingApprovals}</h3>
                    <div className="flex items-center mt-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                      <span className="text-xs text-gray-500">Require action</span>
                    </div>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Upcoming Leaves</p>
                  <h3 className="text-2xl font-bold text-gray-800">{dashboardStats.upcomingLeaves}</h3>
                  <div className="flex items-center mt-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-xs text-gray-500">Next 30 days</span>
                  </div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Leave Balances */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Your Leave Balances</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {currentUserBalance?.balances ? (
                Object.entries(currentUserBalance.balances).map(([leaveType, balance]) => (
                  <LeaveBalanceCard key={leaveType} leaveType={leaveType} balance={balance} />
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500 py-4">
                  No leave balance data available
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <QuickActionsPanel />

          {/* Manager/Admin Sections */}
          {['manager', 'admin', 'super_admin'].includes(user?.employee.role) && (
            <>
              <PendingApprovalsSection />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <TeamAvailabilityCalendar />
                <UpcomingLeavesSection />
              </div>
            </>
          )}

          {/* Employee Sections */}
          {user?.employee.role === 'employee' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RecentApplicationsSection />
              <UpcomingLeavesSection />
            </div>
          )}
        </>
      ) : (
        /* Team Calendar Tab */
        <div className="space-y-6">
          <TeamAvailabilityCalendar />
          
          {/* Additional team calendar content can go here */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Team Leave Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {teamCalendar?.filter(leave => leave.status === 'approved').length || 0}
                </div>
                <div className="text-sm text-gray-600">Approved Leaves</div>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">
                  {teamCalendar?.filter(leave => leave.status === 'pending').length || 0}
                </div>
                <div className="text-sm text-gray-600">Pending Leaves</div>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {new Set(teamCalendar?.map(leave => leave.employeeId)).size || 0}
                </div>
                <div className="text-sm text-gray-600">Team Members</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveDashboard;