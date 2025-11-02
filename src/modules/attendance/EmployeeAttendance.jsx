// EmployeeAttendance.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAttendanceStore } from '../../store/attendanceStore';
import { useEmployeeStore } from '../../store/employeeStore';
import { useDepartmentStore } from '../../store/departmentStore';
import useSettingsStore from '../../store/settingsStore';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { ArrowLeft, Users, Calendar, Download } from 'lucide-react';

const EmployeeAttendance = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useSettingsStore();
  
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [stats, setStats] = useState({
    present: 0,
    absent: 0,
    late: 0,
    totalDays: 0,
    averageHours: 0
  });
  const [chartType, setChartType] = useState('weekly');
  const [chartData, setChartData] = useState([]);

  const { allAttendance, fetchAttendanceReport, loading } = useAttendanceStore();
  const { employees, fetchEmployees } = useEmployeeStore();
  const { departments, fetchDepartments } = useDepartmentStore();

  const employee = employees.find(emp => emp.id == id);

  useEffect(() => {
    if (!employees.length) fetchEmployees();
    if (!departments.length) fetchDepartments();
  }, [fetchEmployees, fetchDepartments, employees.length, departments.length]);

  useEffect(() => {
    if (employee && allAttendance) {
      loadEmployeeAttendance();
    }
  }, [employee, dateRange, allAttendance]);

  useEffect(() => {
    if (filteredAttendance.length > 0) {
      prepareChartData();
    }
  }, [filteredAttendance, chartType]);

  const loadEmployeeAttendance = async () => {
    try {
      // Try to get data from server first
      let attendanceData = await fetchAttendanceReport(
        dateRange.startDate, 
        dateRange.endDate
      );
      
      // Filter for this specific employee
      attendanceData = attendanceData.filter(record => record.employeeId == id);
      
      // If no server data, check local storage
      if (!attendanceData.length && allAttendance) {
        attendanceData = [];
        // Convert dates to comparable format
        const start = new Date(dateRange.startDate);
        const end = new Date(dateRange.endDate);
        
        // Iterate through all dates in the range
        for (let date in allAttendance) {
          const currentDate = new Date(date);
          if (currentDate >= start && currentDate <= end) {
            const dayAttendance = allAttendance[date].filter(
              record => record.employeeId === id
            );
            attendanceData.push(...dayAttendance);
          }
        }
      }
      
      // Sort by date
      attendanceData.sort((a, b) => new Date(a.date) - new Date(b.date));
      setFilteredAttendance(attendanceData);
      calculateStats(attendanceData);
    } catch (error) {
      console.error('Error loading attendance:', error);
    }
  };

  const calculateStats = (attendanceData) => {
    const present = attendanceData.filter(a => a.status === 'present').length;
    const absent = attendanceData.filter(a => a.status === 'absent').length;
    const late = attendanceData.filter(a => a.status === 'late').length;
    const totalDays = attendanceData.length;
    
    // Calculate average hours
    const hoursData = attendanceData
      .filter(a => a.checkIn && a.checkOut)
      .map(a => (new Date(a.checkOut) - new Date(a.checkIn)) / (1000 * 60 * 60));
    
    const averageHours = hoursData.length > 0 
      ? hoursData.reduce((sum, hours) => sum + hours, 0) / hoursData.length 
      : 0;
    
    setStats({ 
      present, 
      absent, 
      late, 
      totalDays, 
      averageHours: parseFloat(averageHours.toFixed(1)) 
    });
  };

  const prepareChartData = () => {
    if (chartType === 'weekly') {
      prepareWeeklyChart();
    } else if (chartType === 'status') {
      prepareStatusChart();
    } else if (chartType === 'hours') {
      prepareHoursChart();
    } else if (chartType === 'daily') {
      prepareDailyTrendChart();
    }
  };

  const prepareWeeklyChart = () => {
    // Group by week
    const weeklyData = {};
    
    filteredAttendance.forEach(record => {
      const date = new Date(record.date);
      const weekNumber = getWeekNumber(date);
      const weekKey = `Week ${weekNumber}`;
      
      if (!weeklyData[weekKey]) {
        weeklyData[weekKey] = { present: 0, absent: 0, late: 0, week: weekKey };
      }
      
      weeklyData[weekKey][record.status]++;
    });
    
    const data = Object.values(weeklyData);
    setChartData(data);
  };

  const prepareStatusChart = () => {
    const data = [
      { name: 'Present', value: stats.present },
      { name: 'Absent', value: stats.absent },
      { name: 'Late', value: stats.late }
    ];
    setChartData(data);
  };

  const prepareHoursChart = () => {
    const data = filteredAttendance
      .filter(record => record.checkIn && record.checkOut)
      .map(record => {
        const date = new Date(record.date);
        const hours = (new Date(record.checkOut) - new Date(record.checkIn)) / (1000 * 60 * 60);
        return {
          date: date.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' }),
          hours: parseFloat(hours.toFixed(1)),
          status: record.status
        };
      });
    
    setChartData(data);
  };

  const prepareDailyTrendChart = () => {
    // Create data for each day in the range
    const start = new Date(dateRange.startDate);
    const end = new Date(dateRange.endDate);
    const data = [];
    
    // Initialize all days in the range
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      const record = filteredAttendance.find(a => a.date === dateStr);
      
      data.push({
        date: d.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' }),
        present: record && record.status === 'present' ? 1 : 0,
        absent: record && record.status === 'absent' ? 1 : 0,
        late: record && record.status === 'late' ? 1 : 0,
        status: record ? record.status : 'none'
      });
    }
    
    setChartData(data);
  };

  const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return '-';
    return new Date(timeString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateHours = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return '-';
    const hours = (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60);
    return hours.toFixed(1) + 'h';
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      present: theme === 'dark' ? 'bg-green-900/50 text-green-400' : 'bg-green-100 text-green-800',
      absent: theme === 'dark' ? 'bg-red-900/50 text-red-400' : 'bg-red-100 text-red-800',
      late: theme === 'dark' ? 'bg-yellow-900/50 text-yellow-400' : 'bg-yellow-100 text-yellow-800'
    };
    
    return (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[status] || (theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800')}`}>
        {status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Not Marked'}
      </span>
    );
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`;
  };

  const renderChart = () => {
    if (!filteredAttendance.length) {
      return (
        <div className={`h-64 flex items-center justify-center rounded-lg ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
        }`}>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
            No data available for chart
          </p>
        </div>
      );
    }

    // Chart colors for dark/light themes
    const chartColors = {
      present: theme === 'dark' ? '#4ade80' : '#4ade80',
      absent: theme === 'dark' ? '#f87171' : '#f87171',
      late: theme === 'dark' ? '#fde047' : '#fde047',
      hours: theme === 'dark' ? '#3b82f6' : '#3b82f6',
      hoursFill: theme === 'dark' ? '#1e40af' : '#93c5fd'
    };

    if (chartType === 'weekly') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
            <XAxis dataKey="week" stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
            <YAxis stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
            <Tooltip 
              contentStyle={{
                backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
                color: theme === 'dark' ? '#f9fafb' : '#111827'
              }}
            />
            <Legend />
            <Bar dataKey="present" stackId="a" fill={chartColors.present} name="Present" />
            <Bar dataKey="late" stackId="a" fill={chartColors.late} name="Late" />
            <Bar dataKey="absent" stackId="a" fill={chartColors.absent} name="Absent" />
          </BarChart>
        </ResponsiveContainer>
      );
    } else if (chartType === 'status') {
      const COLORS = [chartColors.present, chartColors.absent, chartColors.late];
      
      return (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
                color: theme === 'dark' ? '#f9fafb' : '#111827'
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      );
    } else if (chartType === 'hours') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
            <XAxis dataKey="date" stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
            <YAxis stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
            <Tooltip 
              contentStyle={{
                backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
                color: theme === 'dark' ? '#f9fafb' : '#111827'
              }}
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="hours" 
              stroke={chartColors.hours} 
              fill={chartColors.hoursFill} 
              name="Hours Worked" 
            />
          </AreaChart>
        </ResponsiveContainer>
      );
    } else if (chartType === 'daily') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
            <XAxis dataKey="date" stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
            <YAxis stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
            <Tooltip 
              contentStyle={{
                backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
                color: theme === 'dark' ? '#f9fafb' : '#111827'
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="present" stroke={chartColors.present} name="Present" strokeWidth={2} />
            <Line type="monotone" dataKey="absent" stroke={chartColors.absent} name="Absent" strokeWidth={2} />
            <Line type="monotone" dataKey="late" stroke={chartColors.late} name="Late" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      );
    }
  };

  if (!employee) {
    return (
      <div className={`p-6 flex justify-center items-center h-64 ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
          Employee not found
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={`p-6 flex justify-center items-center h-64 ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
          Loading attendance data...
        </div>
      </div>
    );
  }

  // Theme-based classes
  const bgColor = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50';
  const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-gray-100' : 'text-gray-900';
  const textColorSecondary = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const inputBg = theme === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-100' : 'bg-white border-gray-300 text-gray-900';
  const hoverBg = theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50';

  return (
    <div className={`p-6 min-h-screen ${bgColor}`}>
      {/* Header */}
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate(-1)}
          className={`mr-4 p-2 rounded-full ${hoverBg} cursor-pointer`}
        >
          <ArrowLeft className={`h-6 w-6 ${textColorSecondary}`} />
        </button>
        <h2 className={`text-2xl font-bold ${textColor}`}>
          Employee Attendance
        </h2>
      </div>

      {/* Employee Card */}
      <div className={`rounded-lg shadow p-6 mb-6 ${cardBg}`}>
        <div className="flex items-center">
          {employee.avatar ? (
            <img 
              onClick={() => navigate(`/hrm/employees/${employee.id}`)}
              className="h-16 w-16 rounded-full object-cover cursor-pointer" 
              src={employee.avatar} 
              alt={employee.firstName} 
            />
          ) : (
            <div 
              onClick={() => navigate(`/hrm/employees/${employee.id}`)}
              className={`h-16 w-16 rounded-full flex items-center justify-center cursor-pointer ${
                theme === 'dark' ? 'bg-blue-900/50' : 'bg-blue-100'
              }`}
            >
              <span className={`text-xl font-medium ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
              }`}>
                {getInitials(employee.firstName, employee.lastName)}
              </span>
            </div>
          )}
          <div className="ml-4">
            <h3 
              onClick={() => navigate(`/hrm/employees/${employee.id}`)}
              className={`text-lg font-semibold hover:text-blue-600 cursor-pointer ${textColor}`}
            >
              {employee.firstName} {employee.lastName}
            </h3>
            <p className={textColorSecondary}>{employee.position}</p>
            <p className={textColorSecondary}>{employee.department}</p>
          </div>
        </div>
      </div>

      {/* Date Range Filter */}
      <div className={`rounded-lg shadow p-4 mb-6 ${cardBg}`}>
        <h3 className={`text-lg font-medium mb-4 ${textColor}`}>
          Filter by Date Range
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${textColorSecondary}`}>
              Start Date
            </label>
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputBg}`}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${textColorSecondary}`}>
              End Date
            </label>
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputBg}`}
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={loadEmployeeAttendance}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Apply Filter
            </button>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className={`rounded-lg shadow p-4 ${cardBg}`}>
          <div className={`text-sm font-medium ${textColorSecondary}`}>Total Days</div>
          <div className={`text-2xl font-bold ${textColor}`}>{stats.totalDays}</div>
        </div>
        <div className={`rounded-lg shadow p-4 ${cardBg}`}>
          <div className={`text-sm font-medium ${textColorSecondary}`}>Present</div>
          <div className="text-2xl font-bold text-green-600">{stats.present}</div>
          <div className={textColorSecondary}>
            {stats.totalDays ? ((stats.present / stats.totalDays) * 100).toFixed(1) + '%' : '0%'}
          </div>
        </div>
        <div className={`rounded-lg shadow p-4 ${cardBg}`}>
          <div className={`text-sm font-medium ${textColorSecondary}`}>Absent</div>
          <div className="text-2xl font-bold text-red-600">{stats.absent}</div>
          <div className={textColorSecondary}>
            {stats.totalDays ? ((stats.absent / stats.totalDays) * 100).toFixed(1) + '%' : '0%'}
          </div>
        </div>
        <div className={`rounded-lg shadow p-4 ${cardBg}`}>
          <div className={`text-sm font-medium ${textColorSecondary}`}>Late</div>
          <div className="text-2xl font-bold text-yellow-600">{stats.late}</div>
          <div className={textColorSecondary}>
            {stats.totalDays ? ((stats.late / stats.totalDays) * 100).toFixed(1) + '%' : '0%'}
          </div>
        </div>
        <div className={`rounded-lg shadow p-4 ${cardBg}`}>
          <div className={`text-sm font-medium ${textColorSecondary}`}>Avg. Hours</div>
          <div className="text-2xl font-bold text-blue-600">{stats.averageHours}h</div>
        </div>
      </div>

      {/* Attendance Chart */}
      <div className={`rounded-lg shadow p-6 mb-6 ${cardBg}`}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
          <h3 className={`text-lg font-medium ${textColor}`}>Attendance Visualization</h3>
          <div className="flex flex-wrap gap-2">
            {['weekly', 'status', 'hours', 'daily'].map((type) => (
              <button
                key={type}
                onClick={() => setChartType(type)}
                className={`px-3 py-1 rounded-lg text-sm ${
                  chartType === type 
                    ? 'bg-blue-600 text-white' 
                    : theme === 'dark'
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
        {renderChart()}
      </div>

      {/* Attendance Table */}
      <div className={`rounded-lg shadow overflow-hidden ${cardBg}`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}>
              <tr>
                {['Date', 'Day', 'Status', 'Check-In', 'Check-Out', 'Hours'].map((header) => (
                  <th key={header} className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    <span className={textColorSecondary}>
                      {header}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {filteredAttendance.length > 0 ? (
                filteredAttendance.map(record => (
                  <tr key={record.id} className={hoverBg}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={textColorSecondary}>
                        {formatDate(record.date)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={textColorSecondary}>
                        {new Date(record.date).toLocaleDateString('en-GB', { weekday: 'long' })}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(record.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={textColorSecondary}>
                        {formatTime(record.checkIn)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={textColorSecondary}>
                        {formatTime(record.checkOut)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={textColorSecondary}>
                        {calculateHours(record.checkIn, record.checkOut)}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-sm">
                    <span className={textColorSecondary}>
                      No attendance records found for the selected date range.
                    </span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAttendance;