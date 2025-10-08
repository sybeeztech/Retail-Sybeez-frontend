// EmployeeAttendance.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAttendanceStore } from '../../store/attendanceStore';
import { useEmployeeStore } from '../../store/employeeStore';
import { useDepartmentStore } from '../../store/departmentStore';
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

const EmployeeAttendance = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const employee = employees.find(emp => emp.id === id);

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
      attendanceData = attendanceData.filter(record => record.employeeId === id);
      
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
      present: 'bg-green-100 text-green-800',
      absent: 'bg-red-100 text-red-800',
      late: 'bg-yellow-100 text-yellow-800'
    };
    
    return (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>
        {status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Not Marked'}
      </span>
    );
  };

  const renderChart = () => {
    if (!filteredAttendance.length) {
      return (
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <p className="text-gray-500">No data available for chart</p>
        </div>
      );
    }

    if (chartType === 'weekly') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="present" stackId="a" fill="#4ade80" name="Present" />
            <Bar dataKey="late" stackId="a" fill="#fde047" name="Late" />
            <Bar dataKey="absent" stackId="a" fill="#f87171" name="Absent" />
          </BarChart>
        </ResponsiveContainer>
      );
    } else if (chartType === 'status') {
      const COLORS = ['#4ade80', '#f87171', '#fde047'];
      
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
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      );
    } else if (chartType === 'hours') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="hours" stroke="#3b82f6" fill="#93c5fd" name="Hours Worked" />
          </AreaChart>
        </ResponsiveContainer>
      );
    } else if (chartType === 'daily') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="present" stroke="#4ade80" name="Present" strokeWidth={2} />
            <Line type="monotone" dataKey="absent" stroke="#f87171" name="Absent" strokeWidth={2} />
            <Line type="monotone" dataKey="late" stroke="#fde047" name="Late" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      );
    }
  };

  if (!employee) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="text-gray-500">Employee not found</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="text-gray-500">Loading attendance data...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate(-1)} // Go to back page
          className="mr-4 p-2 rounded-full hover:bg-gray-100 cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold">Employee Attendance</h2>
      </div>

      {/* Employee Card */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center">
          <img 
            onClick={() => navigate(`/employees/${employee.id}`)}
            className="h-16 w-16 rounded-full object-cover cursor-pointer" 
            src={employee.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'} 
            alt={employee.firstName} 
          />
          <div className="ml-4">
            <h3 
            onClick={() => navigate(`/employees/${employee.id}`)}
            className="text-lg font-semibold hover:text-blue-800 cursor-pointer">{employee.firstName} {employee.lastName}</h3>
            <p className="text-gray-600">{employee.position}</p>
            <p className="text-gray-600">{employee.department}</p>
          </div>
        </div>
      </div>

      {/* Date Range Filter */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h3 className="text-lg font-medium mb-4">Filter by Date Range</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm font-medium text-gray-500">Total Days</div>
          <div className="text-2xl font-bold">{stats.totalDays}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm font-medium text-gray-500">Present</div>
          <div className="text-2xl font-bold text-green-600">{stats.present}</div>
          <div className="text-sm text-gray-500">
            {stats.totalDays ? ((stats.present / stats.totalDays) * 100).toFixed(1) + '%' : '0%'}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm font-medium text-gray-500">Absent</div>
          <div className="text-2xl font-bold text-red-600">{stats.absent}</div>
          <div className="text-sm text-gray-500">
            {stats.totalDays ? ((stats.absent / stats.totalDays) * 100).toFixed(1) + '%' : '0%'}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm font-medium text-gray-500">Late</div>
          <div className="text-2xl font-bold text-yellow-600">{stats.late}</div>
          <div className="text-sm text-gray-500">
            {stats.totalDays ? ((stats.late / stats.totalDays) * 100).toFixed(1) + '%' : '0%'}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm font-medium text-gray-500">Avg. Hours</div>
          <div className="text-2xl font-bold text-blue-600">{stats.averageHours}h</div>
        </div>
      </div>

      {/* Attendance Chart */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
          <h3 className="text-lg font-medium">Attendance Visualization</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setChartType('weekly')}
              className={`px-3 py-1 rounded-lg text-sm ${
                chartType === 'weekly' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setChartType('status')}
              className={`px-3 py-1 rounded-lg text-sm ${
                chartType === 'status' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Status
            </button>
            <button
              onClick={() => setChartType('hours')}
              className={`px-3 py-1 rounded-lg text-sm ${
                chartType === 'hours' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Hours
            </button>
            <button
              onClick={() => setChartType('daily')}
              className={`px-3 py-1 rounded-lg text-sm ${
                chartType === 'daily' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Daily Trend
            </button>
          </div>
        </div>
        {renderChart()}
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-In</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-Out</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAttendance.length > 0 ? (
                filteredAttendance.map(record => (
                  <tr key={record.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(record.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(record.date).toLocaleDateString('en-GB', { weekday: 'long' })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(record.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatTime(record.checkIn)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatTime(record.checkOut)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {calculateHours(record.checkIn, record.checkOut)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                    No attendance records found for the selected date range.
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