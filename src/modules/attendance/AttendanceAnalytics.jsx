import React, { useState, useEffect } from 'react';
import { useAttendanceStore } from '../../store/attendanceStore';
import { useEmployeeStore } from '../../store/employeeStore';
import { useDepartmentStore } from '../../store/departmentStore';
import { useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';

const AttendanceAnalytics = () => {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  const { fetchAttendanceReport, attendanceByDate } = useAttendanceStore();
  const { employees, fetchEmployees } = useEmployeeStore();
  const { departments, fetchDepartments } = useDepartmentStore();

  const navigate = useNavigate();

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];
  const STATUS_COLORS = {
    present: '#10B981',
    absent: '#EF4444',
    late: '#F59E0B',
    halfday: '#3B82F6'
  };

  useEffect(() => {
    loadReportData();
    if (employees.length === 0) {
      fetchEmployees();
    }
  }, [employees.length, fetchEmployees]);

  useEffect(() => {
    loadReportData();
    if (departments.length === 0) {
      fetchDepartments();
    }
  }, [departments.length, fetchDepartments]);

  useEffect(() => {
    loadReportData();
  }, [dateRange, selectedDepartment]);


  const loadReportData = async () => {
    setLoading(true);
    try {
      const data = await fetchAttendanceReport(
        dateRange.startDate, 
        dateRange.endDate, 
        selectedDepartment || null
      );
      
      // Log the data to see what's being returned
      console.log('API Response:', data);
      
      // Process data for charts
      const processedData = processAttendanceData(data);
      setReportData(processedData);
    } catch (error) {
      console.error('Error loading report data:', error);
      // Set empty data structure on error
      setReportData({
        summary: { present: 0, absent: 0, late: 0, total: 0 },
        dailyData: [],
        departmentData: [],
        employeePerformance: [],
        timeData: []
      });
    } finally {
      setLoading(false);
    }
  };

  const processAttendanceData = (rawData) => {
    // Handle the case where data might be nested under 'attendances' key
    let dataArray = rawData;
    
    // If rawData is an object with 'attendances' property, use that
    if (rawData && typeof rawData === 'object' && rawData.attendances) {
      dataArray = rawData.attendances;
    }
    
    // Ensure dataArray is always an array
    dataArray = Array.isArray(dataArray) ? dataArray : [];
  
    // If no data returned, create empty structure
    if (dataArray.length === 0) {
      return {
        summary: { present: 0, absent: 0, late: 0, total: 0 },
        dailyData: [],
        departmentData: [],
        employeePerformance: [],
        timeData: []
      };
    }
  
    // Process summary statistics
    const summary = {
      present: dataArray.filter(item => item.status === 'present').length,
      absent: dataArray.filter(item => item.status === 'absent').length,
      late: dataArray.filter(item => item.status === 'late').length,
      total: dataArray.length
    };
  
    // Process daily attendance data
    const dailyMap = {};
    dataArray.forEach(item => {
      if (!dailyMap[item.date]) {
        dailyMap[item.date] = { date: item.date, present: 0, absent: 0, late: 0 };
      }
      if (item.status) dailyMap[item.date][item.status]++;
    });
    
    const dailyData = Object.values(dailyMap).sort((a, b) => 
      new Date(a.date) - new Date(b.date)
    );
  
    // Process department data
    const deptMap = {};
    dataArray.forEach(item => {
      // For department analysis, we need employee data which might not be included
      // You might need to enhance your API to include employee details or fetch separately
      
      // Find the employee to get their department
      const employee = employees.find(emp => emp.id === item.employeeId);
      const dept = employee?.department || item.department || 'Unknown';
      // const dept = item.department || 'Unknown'; // Fallback if no department info
      if (!deptMap[dept]) {
        deptMap[dept] = { department: dept, present: 0, absent: 0, late: 0, total: 0 };
      }
      if (item.status) deptMap[dept][item.status]++;
      deptMap[dept].total++;
    });
    
    const departmentData = Object.values(deptMap);
  
    // Process employee performance
    const empMap = {};
  dataArray.forEach(item => {
    const empId = item.employeeId;
    const employee = employees.find(emp => emp.id === empId);
    const employeeName = employee ? `${employee.firstName} ${employee.lastName}` : `Employee ${empId}`;
    
    if (!empMap[empId]) {
      empMap[empId] = {
        id: empId,
        name: employeeName,
        department: employee?.department || item.department || 'Unknown',
        present: 0,
        absent: 0,
        late: 0,
        total: 0,
        attendanceRate: 0,
        totalHours: 0, // Add total hours counter
        daysWorked: 0  // Add days worked counter
      };
    }
    if (item.status) empMap[empId][item.status]++;
    empMap[empId].total++;

    // Calculate hours worked for this day if checkIn and checkOut exist
  if (item.checkIn && item.checkOut) {
    try {
      const checkInTime = new Date(item.checkIn);
      const checkOutTime = new Date(item.checkOut);
      
      if (!isNaN(checkInTime) && !isNaN(checkOutTime) && checkOutTime > checkInTime) {
        const timeDiff = checkOutTime - checkInTime;
        const hoursWorked = timeDiff / (1000 * 60 * 60);
        empMap[empId].totalHours += hoursWorked;
        empMap[empId].daysWorked++;
      }
    } catch (error) {
      console.warn('Error calculating hours for employee:', empId, error);
    }
  }
  });
    

    const employeePerformance = Object.values(empMap).map(emp => ({
      ...emp,
      attendanceRate: emp.total > 0 ? ((emp.present + emp.late * 0.5) / emp.total) * 100 : 0,
      avgDailyHours: emp.daysWorked > 0 ? emp.totalHours / emp.daysWorked : 0
    })).sort((a, b) => {
      // Calculate product of both metrics (employees good in both will rank higher)
      const aProduct = a.avgDailyHours * a.attendanceRate;
      const bProduct = b.avgDailyHours * b.attendanceRate;
      
      return bProduct - aProduct;
    });
    
  
    // Process average check-in/check-out times
    const timeData = [];
    dataArray.filter(item => item.checkIn).forEach(item => {
      const date = item.date;
      const checkInTime = new Date(item.checkIn);
      const checkOutTime = item.checkOut ? new Date(item.checkOut) : null;
      
      const hours = checkInTime.getHours() + (checkInTime.getMinutes() / 60);
      const existingEntry = timeData.find(d => d.date === date);
      
      if (existingEntry) {
        existingEntry.totalCheckIn += hours;
        existingEntry.count++;
        existingEntry.avgCheckIn = existingEntry.totalCheckIn / existingEntry.count;
        
        if (checkOutTime) {
          const outHours = checkOutTime.getHours() + (checkOutTime.getMinutes() / 60);
          existingEntry.totalCheckOut += outHours;
          existingEntry.outCount++;
          existingEntry.avgCheckOut = existingEntry.totalCheckOut / existingEntry.outCount;
          existingEntry.avgHours = (existingEntry.avgCheckOut - existingEntry.avgCheckIn);
        }
      } else {
        timeData.push({
          date,
          totalCheckIn: hours,
          count: 1,
          avgCheckIn: hours,
          totalCheckOut: checkOutTime ? (checkOutTime.getHours() + (checkOutTime.getMinutes() / 60)) : 0,
          outCount: checkOutTime ? 1 : 0,
          avgCheckOut: checkOutTime ? (checkOutTime.getHours() + (checkOutTime.getMinutes() / 60)) : null,
          avgHours: checkOutTime ? ((checkOutTime.getHours() + (checkOutTime.getMinutes() / 60)) - hours) : null
        });
      }
    });
  
    return {
      summary,
      dailyData,
      departmentData,
      employeePerformance: employeePerformance.slice(0, 10), // Top 10 only
      timeData: timeData.sort((a, b) => new Date(a.date) - new Date(b.date))
    };
  };

  const renderSummaryCards = () => {
    if (!reportData) return null;
    
    const { summary } = reportData;
    const cards = [
      { title: 'Present', value: summary.present, color: 'bg-green-100 text-green-800', percentage: ((summary.present / summary.total) * 100).toFixed(1) },
      { title: 'Absent', value: summary.absent, color: 'bg-red-100 text-red-800', percentage: ((summary.absent / summary.total) * 100).toFixed(1) },
      { title: 'Late', value: summary.late, color: 'bg-yellow-100 text-yellow-800', percentage: ((summary.late / summary.total) * 100).toFixed(1) },
      { title: 'Total Records', value: summary.total, color: 'bg-gray-100 text-gray-800', percentage: '100' }
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {cards.map((card, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">{card.title}</p>
                <p className="text-2xl font-bold">{card.value}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${card.color}`}>
                {card.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderDailyAttendanceChart = () => {
    if (!reportData || reportData.dailyData.length === 0) {
      return <div className="text-center py-10 text-gray-500">No daily attendance data available</div>;
    }

    return (
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Daily Attendance Trend</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={reportData.dailyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend formatter={(value, entry, index) => <span className="text-black">{value}</span>} />
              {/* <Area type="linear" dataKey="present" stackId="1" stroke={STATUS_COLORS.present} fill={STATUS_COLORS.present} />
              <Area type="linear" dataKey="absent" stackId="1" stroke={STATUS_COLORS.absent} fill={STATUS_COLORS.absent} />
              <Area type="linear" dataKey="late" stackId="1" stroke={STATUS_COLORS.late} fill={STATUS_COLORS.late} /> */}
              <Area type="monotone" dataKey="present" stackId="1" stroke="#1b8a07" fill="#1b8a07" strokeWidth={1.5} />
              <Area type="monotone" dataKey="absent" stackId="1" stroke="#a30714" fill="#a30714" strokeWidth={1.5} />
              <Area type="monotone" dataKey="late" stackId="1" stroke="#f0880a" fill="#f0880a" strokeWidth={1.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  const renderDepartmentChart = () => {
    if (!reportData || reportData.departmentData.length === 0) {
      return <div className="text-center py-10 text-gray-500">No department data available</div>;
    }

    // Calculate the maximum value across all departments for proper Y-axis scaling
  const maxValue = Math.max(
    ...reportData.departmentData.map(dept => 
      Math.max(dept.present || 0, dept.absent || 0, dept.late || 0)
    )
  );

  // Calculate a nice upper bound for the Y-axis
  const niceMax = Math.ceil(maxValue / 5) * 5; // Round up to nearest multiple of 5

    return (
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Attendance by Department</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={reportData.departmentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis 
              domain={[0, niceMax]} // Set proper domain to avoid duplicates
              tickCount={6} // Control number of ticks
              allowDecimals={false} // No decimal values
            />
              <Tooltip />
              <Legend />
              <Bar dataKey="present" fill={STATUS_COLORS.present} name="Present" />
              <Bar dataKey="absent" fill={STATUS_COLORS.absent} name="Absent" />
              <Bar dataKey="late" fill={STATUS_COLORS.late} name="Late" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };


  const renderEmployeePerformance = () => {
    if (!reportData || reportData.employeePerformance.length === 0) {
      return <div className="text-center py-10 text-gray-500">No employee performance data available</div>;
    }

    return (
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Top Performing Employees</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Present</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Absent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Late</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Daily Hours</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance Rate</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reportData.employeePerformance.map((emp, index) => (
                <tr key={index}>
                  <td 
                  onClick={() => navigate(`/employees/${emp.id}`)}
                  className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 hover:text-blue-800 cursor-pointer">{emp.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{emp.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{emp.present}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{emp.absent}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{emp.late}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {emp.avgDailyHours  ? emp.avgDailyHours.toFixed(1) + ' hrs' : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                        <div 
                          className="bg-green-600 h-2.5 rounded-full" 
                          style={{ width: `${emp.attendanceRate}%` }}
                        ></div>
                      </div>
                      <span>{emp.attendanceRate.toFixed(1)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderTimeAnalysis = () => {
    if (!reportData || reportData.timeData.length === 0) {
      return <div className="text-center py-10 text-gray-500">No time analysis data available</div>;
    }

    return (
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Average Check-in Times</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={reportData.timeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[8, 18]} tickFormatter={value => `${Math.floor(value)}:${(value % 1 * 60).toString().padStart(2, '0')}`} />
              <Tooltip formatter={value => [`${Math.floor(value)}:${(value % 1 * 60).toString().padStart(2, '0')}`, 'Time']} />
              <Legend />
              <Line type="monotone" dataKey="avgCheckIn" stroke="#8884d8" name="Avg Check-in" />
              <Line type="monotone" dataKey="avgCheckOut" stroke="#82ca9d" name="Avg Check-out" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  const renderStatusDistribution = () => {
    if (!reportData) return null;
    
    const { summary } = reportData;
    const data = [
      { name: 'Present', value: summary.present, color: STATUS_COLORS.present },
      { name: 'Absent', value: summary.absent, color: STATUS_COLORS.absent },
      { name: 'Late', value: summary.late, color: STATUS_COLORS.late },
    ].filter(item => item.value > 0);

    if (data.length === 0) {
      return <div className="text-center py-10 text-gray-500">No status distribution data available</div>;
    }

    return (
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Attendance Distribution</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Attendance Analytics</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={loadReportData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
            disabled={loading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-rotate-cw-icon lucide-rotate-cw h-4 w-4 mr-2"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
            {loading ? 'Loading...' : 'Refresh Data'}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow mb-6 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input 
              type="date" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={dateRange.startDate}
              onChange={e => setDateRange({...dateRange, startDate: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input 
              type="date" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={dateRange.endDate}
              onChange={e => setDateRange({...dateRange, endDate: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select
              value={selectedDepartment}
              onChange={e => setSelectedDepartment(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Departments</option>
              {departments.map(dept => (
                <option key={dept.id} value={dept.name}>{dept.name}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={() => {
                setDateRange({
                  startDate: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
                  endDate: new Date().toISOString().split('T')[0]
                });
                setSelectedDepartment('');
              }}
              className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Loading analytics data...</div>
        </div>
      ) : (
        <>
          {renderSummaryCards()}
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {renderDailyAttendanceChart()}
            {renderStatusDistribution()}
          </div>
          
          {renderDepartmentChart()}
          {renderTimeAnalysis()}
          {renderEmployeePerformance()}
        </>
      )}
    </div>
  );
};

export default AttendanceAnalytics;