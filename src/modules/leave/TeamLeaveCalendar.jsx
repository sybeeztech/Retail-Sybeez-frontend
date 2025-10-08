import React, { useState, useEffect, useMemo } from 'react';
import { useLeaveStore, useTeamCalendar } from '../../store/leaveStore';
import { useAuthStore } from '../../store/authStore';
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Users, 
  Filter, 
  Download, 
  Eye, 
  EyeOff,
  CheckCircle,
  Clock,
  XCircle,
  MapPin
} from 'lucide-react';

const TeamLeaveCalendar = () => {
  const { user } = useAuthStore();
  const { teamCalendar, getTeamCalendar, loading } = useLeaveStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month'); // 'month' or 'week'
  const [filters, setFilters] = useState({
    department: '',
    leaveType: '',
    status: ''
  });

  // Check if user has permission to view team calendar
  const canViewTeamCalendar = ['manager', 'admin', 'super_admin'].includes(user?.employee?.role);

  // Navigation functions
  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    if (view === 'month') {
      newDate.setMonth(newDate.getMonth() + direction);
    } else {
      newDate.setDate(newDate.getDate() + (direction * 7));
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Get date range for current view
  const getDateRange = () => {
    if (view === 'month') {
      const start = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const end = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      return { start, end };
    } else {
      const start = new Date(currentDate);
      start.setDate(start.getDate() - start.getDay()); // Start of week (Sunday)
      const end = new Date(start);
      end.setDate(end.getDate() + 6); // End of week (Saturday)
      return { start, end };
    }
  };

  // Filter team calendar data
  const filteredCalendar = useMemo(() => {
    if (!teamCalendar) return [];
    
    return teamCalendar.filter(item => {
      if (filters.department && item.employee.department !== filters.department) return false;
      if (filters.leaveType && item.leaveType !== filters.leaveType) return false;
      if (filters.status && item.status !== filters.status) return false;
      return true;
    });
  }, [teamCalendar, filters]);

  // Get unique departments and leave types for filters
  const filterOptions = useMemo(() => {
    if (!teamCalendar) return { departments: [], leaveTypes: [] };
    
    const departments = [...new Set(teamCalendar.map(item => item.employee.department))];
    const leaveTypes = [...new Set(teamCalendar.map(item => item.leaveType))];
    
    return { departments, leaveTypes };
  }, [teamCalendar]);

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
    return filteredCalendar.filter(leave => {
      const leaveStart = new Date(leave.start);
      const leaveEnd = new Date(leave.end);
      const currentDate = new Date(date);
      
      return currentDate >= leaveStart && currentDate <= leaveEnd;
    });
  };

  // Export functionality
  const exportCalendar = () => {
    const csvContent = [
      ['Employee', 'Department', 'Leave Type', 'Start Date', 'End Date', 'Status', 'Duration'],
      ...filteredCalendar.map(leave => [
        leave.employee.name,
        leave.employee.department,
        leave.leaveType,
        leave.start,
        leave.end,
        leave.status,
        leave.duration || 'N/A'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `team-leave-calendar-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (canViewTeamCalendar) {
      const { start, end } = getDateRange();
      getTeamCalendar(
        start.toISOString().split('T')[0],
        end.toISOString().split('T')[0]
      );
    }
  }, [currentDate, view, canViewTeamCalendar]);

  // Redirect if no permission
  if (!canViewTeamCalendar) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="text-center">
          <EyeOff className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Access Denied</h3>
          <p className="text-gray-600">You don't have permission to view the team leave calendar.</p>
        </div>
      </div>
    );
  }

  const calendarDays = generateCalendarDays();
  const { start: rangeStart, end: rangeEnd } = getDateRange();

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Team Leave Calendar</h1>
            <p className="text-gray-600">Track team availability and leave schedules</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={exportCalendar}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <button
              onClick={goToToday}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Today
            </button>
          </div>
        </div>

        {/* Calendar Controls */}
        <div className="flex justify-between items-center mb-6 bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigateDate(-1)}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigateDate(1)}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            <h2 className="text-xl font-semibold">
              {view === 'month' 
                ? currentDate.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
                : `${rangeStart.toLocaleDateString('en-GB')} - ${rangeEnd.toLocaleDateString('en-GB')}`
              }
            </h2>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setView('month')}
                className={`px-3 py-1 rounded ${view === 'month' ? 'bg-white shadow' : ''}`}
              >
                Month
              </button>
              <button
                onClick={() => setView('week')}
                className={`px-3 py-1 rounded ${view === 'week' ? 'bg-white shadow' : ''}`}
              >
                Week
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </h3>
            <button
              onClick={() => setFilters({ department: '', leaveType: '', status: 'approved' })}
              className="text-sm text-blue-500 hover:text-blue-700"
            >
              Clear All
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select
                value={filters.department}
                onChange={(e) => setFilters(prev => ({ ...prev, department: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="">All Departments</option>
                {filterOptions.departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
              <select
                value={filters.leaveType}
                onChange={(e) => setFilters(prev => ({ ...prev, leaveType: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="">All Types</option>
                {filterOptions.leaveTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="">All Status</option>
              </select>
            </div>
          </div>
        </div>

        {/* Calendar View */}
        {loading ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="text-gray-500">Loading calendar data...</div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Weekday Headers */}
            <div className="grid grid-cols-7 border-b border-gray-200">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-4 text-center font-semibold text-gray-700 bg-gray-50">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className={`grid grid-cols-7 auto-rows-min`}>
              {calendarDays.map((day, index) => {
                const isToday = day.toDateString() === new Date().toDateString();
                const isCurrentMonth = day.getMonth() === currentDate.getMonth();
                const dayLeaves = getLeavesForDate(day);
                
                return (
                  <div
                    key={day.toISOString()}
                    className={`min-h-[120px] border-r border-b border-gray-200 p-2 ${
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
                      {dayLeaves.slice(0, 3).map(leave => (
                        <div
                          key={`${leave.id}-${day.toISOString()}`}
                          className={`text-xs p-1 rounded border-l-2 ${
                            leave.status === 'approved' 
                              ? 'bg-green-50 border-green-500 text-green-700'
                              : 'bg-yellow-50 border-yellow-500 text-yellow-700'
                          }`}
                          title={`${leave.employee.name} - ${leave.leaveType} (${leave.status})`}
                        >
                          <div className="font-medium truncate">{leave.employee.name.split(' ')[0]}</div>
                          <div className="truncate">{leave.leaveType}</div>
                        </div>
                      ))}
                      {dayLeaves.length > 3 && (
                        <div className="text-xs text-gray-500 text-center">
                          +{dayLeaves.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="mt-6 bg-white rounded-lg shadow-sm p-4">
          {/* <h4 className="font-semibold mb-3">Legend</h4> */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
              <span className="text-sm">Approved Leave</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
              <span className="text-sm">Pending Approval</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
              <span className="text-sm">Today</span>
            </div>
          </div>
        </div>

        {/* Leave List View */}
        <div className="mt-6 bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold">Leave Details ({filteredCalendar.length} entries)</h3>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredCalendar.length > 0 ? (
              filteredCalendar.map(leave => (
                <div key={leave.id} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        leave.status === 'approved' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}></div>
                      <div>
                        <div className="font-medium">{leave.employee.name}</div>
                        <div className="text-sm text-gray-500 flex items-center space-x-2">
                          <span>{leave.employee.department}</span>
                          <span>•</span>
                          <span>{leave.leaveType}</span>
                          <span>•</span>
                          <span>{leave.duration} day(s)</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-medium">
                        {new Date(leave.start).toLocaleDateString('en-GB')} - {new Date(leave.end).toLocaleDateString('en-GB')}
                      </div>
                      <div className={`text-sm ${
                        leave.status === 'approved' ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>No leave applications match the current filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamLeaveCalendar;