// modules/leave/HolidayCalendar.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useLeaveStore } from '../../store/leaveStore';
import { useAuthStore } from '../../store/authStore';
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Filter, 
  Download,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  Users,
  Building
} from 'lucide-react';

const HolidayCalendar = () => {
  const { user } = useAuthStore();
  const { holidays, getHolidays, loading } = useLeaveStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month'); // 'month', 'week', 'year'
  const [filters, setFilters] = useState({
    location: 'all',
    type: 'all',
    year: new Date().getFullYear().toString()
  });
  const [selectedHoliday, setSelectedHoliday] = useState(null);

  // Check user permissions
  const isAdmin = ['super_admin', 'admin'].includes(user?.employee?.role);
  const isManager = user?.employee?.role === 'manager';

  // Available locations based on user's location and permissions
  const availableLocations = useMemo(() => {
    const baseLocations = [
      { value: 'all', label: 'All Locations' },
      { value: 'mumbai', label: 'Mumbai' },
      { value: 'delhi', label: 'Delhi' },
      { value: 'bangalore', label: 'Bangalore' },
      { value: 'pune', label: 'Pune' },
      { value: 'hyderabad', label: 'Hyderabad' }
    ];

    // If user has specific location, show it first
    // const userLocation = user?.employee?.location?.toLowerCase();
    // if (userLocation && userLocation !== 'all') {
    //   const userLocOption = baseLocations.find(loc => loc.value === userLocation);
    //   if (userLocOption) {
    //     return [
    //       userLocOption,
    //       ...baseLocations.filter(loc => loc.value !== userLocation && loc.value !== 'all')
    //     ];
    //   }
    // }

    return baseLocations;
  }, [user]);

  // Navigation functions
  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    if (view === 'month') {
      newDate.setMonth(newDate.getMonth() + direction);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() + (direction * 7));
    } else {
      newDate.setFullYear(newDate.getFullYear() + direction);
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
    } else if (view === 'week') {
      const start = new Date(currentDate);
      start.setDate(start.getDate() - start.getDay());
      const end = new Date(start);
      end.setDate(end.getDate() + 6);
      return { start, end };
    } else {
      const start = new Date(currentDate.getFullYear(), 0, 1);
      const end = new Date(currentDate.getFullYear(), 11, 31);
      return { start, end };
    }
  };

  // Filter holidays based on current filters
  const filteredHolidays = useMemo(() => {
    if (!holidays) return [];

    return holidays.filter(holiday => {
      // Year filter
      if (filters.year && !holiday.date.startsWith(filters.year)) return false;

      // Type filter
      if (filters.type !== 'all' && holiday.type !== filters.type) return false;

      // Location filter
      if (filters.location !== 'all') {
        if (!holiday.applicableLocations.includes('all') && 
            !holiday.applicableLocations.includes(filters.location)) {
          return false;
        }
      }

      return true;
    });
  }, [holidays, filters]);

  // Group holidays by month for year view
  const holidaysByMonth = useMemo(() => {
    if (view !== 'year') return {};

    return filteredHolidays.reduce((acc, holiday) => {
      const month = new Date(holiday.date).getMonth();
      if (!acc[month]) acc[month] = [];
      acc[month].push(holiday);
      return acc;
    }, {});
  }, [filteredHolidays, view]);

  // Generate calendar days for month/week view
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

  // Get holidays for a specific date
  const getHolidaysForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return filteredHolidays.filter(holiday => holiday.date === dateStr);
  };

  // Export functionality
  const exportHolidays = () => {
    const csvContent = [
      ['Date', 'Holiday Name', 'Type', 'Locations', 'Day'],
      ...filteredHolidays.map(holiday => [
        holiday.date,
        holiday.name,
        holiday.type,
        holiday.applicableLocations.join('; '),
        new Date(holiday.date).toLocaleDateString('en-US', { weekday: 'long' })
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `holiday-calendar-${filters.year}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Get holiday type color
  const getHolidayTypeColor = (type) => {
    switch (type) {
      case 'national': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'regional': return 'bg-green-100 text-green-800 border-green-200';
      case 'state': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'optional': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Month names for year view
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    getHolidays(filters.year);
  }, [filters.year]);

  const calendarDays = view !== 'year' ? generateCalendarDays() : [];
  const { start: rangeStart, end: rangeEnd } = getDateRange();

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Holiday Calendar</h1>
            <p className="text-gray-600">View company holidays and plan your schedule</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={exportHolidays}
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
                ? currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                : view === 'week'
                ? `Week of ${rangeStart.toLocaleDateString()} - ${rangeEnd.toLocaleDateString()}`
                : currentDate.getFullYear()
              }
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            {/* View Selector */}
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
              <button
                onClick={() => setView('year')}
                className={`px-3 py-1 rounded ${view === 'year' ? 'bg-white shadow' : ''}`}
              >
                Year
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
              onClick={() => setFilters({ location: 'all', type: 'all', year: new Date().getFullYear().toString() })}
              className="text-sm text-blue-500 hover:text-blue-700"
            >
              Clear All
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <select
                value={filters.year}
                onChange={(e) => setFilters(prev => ({ ...prev, year: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                {[2023, 2024, 2025, 2026, 2027].map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <select
                value={filters.location}
                onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                {availableLocations.map(location => (
                  <option key={location.value} value={location.value}>
                    {location.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Holiday Type</label>
              <select
                value={filters.type}
                onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="all">All Types</option>
                <option value="national">National</option>
                <option value="regional">Regional</option>
                <option value="state">State</option>
                <option value="optional">Optional</option>
              </select>
            </div>
          </div>
        </div>

        {/* Calendar View */}
        {loading ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="text-gray-500">Loading holiday calendar...</div>
          </div>
        ) : (
          <>
            {/* Month/Week View */}
            {view !== 'year' && (
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
                    const isCurrentMonth = view === 'month' ? 
                      day.getMonth() === currentDate.getMonth() : true;
                    const dayHolidays = getHolidaysForDate(day);
                    
                    return (
                      <div
                        key={day.toISOString()}
                        className={`min-h-[120px] border-r border-b border-gray-200 p-2 ${
                          !isCurrentMonth ? 'bg-gray-50' : ''
                        } ${isToday ? 'bg-blue-50' : ''}`}
                        onClick={() => dayHolidays.length > 0 && setSelectedHoliday({
                          date: day,
                          holidays: dayHolidays
                        })}
                      >
                        <div className={`flex justify-between items-center mb-1 ${
                          isToday ? 'font-semibold text-blue-600' : ''
                        }`}>
                          <span className={`text-sm ${
                            isToday ? 'bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center' : ''
                          }`}>
                            {day.getDate()}
                          </span>
                          {dayHolidays.length > 0 && (
                            <span className="text-xs bg-gray-100 rounded-full px-2 py-1">
                              {dayHolidays.length}
                            </span>
                          )}
                        </div>
                        
                        <div className="space-y-1">
                          {dayHolidays.slice(0, 2).map(holiday => (
                            <div
                              key={holiday.id}
                              className={`text-xs p-1 rounded border-l-2 ${getHolidayTypeColor(holiday.type)} cursor-pointer hover:opacity-80`}
                              title={`${holiday.name} (${holiday.type})`}
                            >
                              <div className="font-medium truncate">{holiday.name}</div>
                              <div className="truncate flex items-center">
                                <MapPin className="w-3 h-3 mr-1" />
                                {holiday.applicableLocations.includes('all') 
                                  ? 'All' 
                                  : holiday.applicableLocations.length
                                }
                              </div>
                            </div>
                          ))}
                          {dayHolidays.length > 2 && (
                            <div className="text-xs text-gray-500 text-center">
                              +{dayHolidays.length - 2} more
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Year View */}
            {view === 'year' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {monthNames.map((monthName, monthIndex) => {
                    const monthHolidays = holidaysByMonth[monthIndex] || [];
                    const monthDate = new Date(currentDate.getFullYear(), monthIndex, 1);
                    
                    return (
                      <div key={monthName} className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold text-lg mb-3">{monthName}</h3>
                        
                        {monthHolidays.length === 0 ? (
                          <p className="text-sm text-gray-500 text-center py-4">No holidays</p>
                        ) : (
                          <div className="space-y-2">
                            {monthHolidays.map(holiday => (
                              <div
                                key={holiday.id}
                                className={`text-sm p-2 rounded border-l-2 ${getHolidayTypeColor(holiday.type)} cursor-pointer hover:opacity-80`}
                                onClick={() => setSelectedHoliday({
                                  date: new Date(holiday.date),
                                  holidays: [holiday]
                                })}
                              >
                                <div className="font-medium">{holiday.name}</div>
                                <div className="flex justify-between items-center text-xs mt-1">
                                  <span>
                                    {new Date(holiday.date).getDate()} {monthName.slice(0, 3)}
                                  </span>
                                  <span className="flex items-center">
                                    <MapPin className="w-3 h-3 mr-1" />
                                    {holiday.applicableLocations.includes('all') ? 'All' : holiday.applicableLocations.length}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}

        {/* Holiday Details Modal */}
        {selectedHoliday && (
          <div className="fixed inset-0 bg-gray-900/75 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold">
                    {selectedHoliday.date.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </h3>
                  <button
                    onClick={() => setSelectedHoliday(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {selectedHoliday.holidays.map(holiday => (
                    <div key={holiday.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-lg">{holiday.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getHolidayTypeColor(holiday.type)}`}>
                          {holiday.type}
                        </span>
                      </div>
                      
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>
                            Applicable to: {holiday.applicableLocations.includes('all') 
                              ? 'All Locations' 
                              : holiday.applicableLocations.join(', ')
                            }
                          </span>
                        </div>
                        
                        {holiday.description && (
                          <p className="mt-2">{holiday.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="mt-6 bg-white rounded-lg shadow-sm p-4">
          {/* <h4 className="font-semibold mb-3">Legend</h4> */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
              <span className="text-sm">National Holiday</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
              <span className="text-sm">Regional Holiday</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
              <span className="text-sm">State Holiday</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
              <span className="text-sm">Optional Holiday</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
              <span className="text-sm">Today</span>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-blue-500 mr-3" />
              <div>
                <p className="text-2xl font-bold">{filteredHolidays.length}</p>
                <p className="text-sm text-gray-600">Total Holidays</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center">
              <Building className="w-8 h-8 text-green-500 mr-3" />
              <div>
                <p className="text-2xl font-bold">
                  {filteredHolidays.filter(h => h.type === 'national').length}
                </p>
                <p className="text-sm text-gray-600">National Holidays</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center">
              <MapPin className="w-8 h-8 text-purple-500 mr-3" />
              <div>
                <p className="text-2xl font-bold">
                  {filteredHolidays.filter(h => h.type === 'regional').length}
                </p>
                <p className="text-sm text-gray-600">Regional Holidays</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-yellow-500 mr-3" />
              <div>
                <p className="text-2xl font-bold">
                  {filteredHolidays.filter(h => h.type === 'optional').length}
                </p>
                <p className="text-sm text-gray-600">Optional Holidays</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HolidayCalendar;