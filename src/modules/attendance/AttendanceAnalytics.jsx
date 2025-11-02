import React, { useState, useEffect } from 'react';
import { useAttendanceStore } from '../../store/attendanceStore';
import { useEmployeeStore } from '../../store/employeeStore';
import { useDepartmentStore } from '../../store/departmentStore';
import { useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import useSettingsStore from '../../store/settingsStore';
import { RotateCw, Download } from 'lucide-react';

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
  const { departments, fetchDepartments } = useEmployeeStore();
  const { theme } = useSettingsStore();

  const navigate = useNavigate();

  // Colors for charts - adjusted for dark theme
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];
  const STATUS_COLORS = {
    present: '#10B981',
    absent: '#EF4444',
    late: '#F59E0B',
    halfday: '#3B82F6'
  };

  // Chart styling based on theme
  const chartTheme = {
    textColor: theme === 'dark' ? '#E5E7EB' : '#374151',
    gridColor: theme === 'dark' ? '#4B5563' : '#E5E7EB',
    tooltipBg: theme === 'dark' ? '#1F2937' : '#FFFFFF',
    tooltipBorder: theme === 'dark' ? '#374151' : '#E5E7EB',
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
      
      console.log('API Response:', data);
      
      const processedData = processAttendanceData(data);
      setReportData(processedData);
    } catch (error) {
      console.error('Error loading report data:', error);
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
    let dataArray = rawData;
    
    if (rawData && typeof rawData === 'object' && rawData.attendances) {
      dataArray = rawData.attendances;
    }
    
    dataArray = Array.isArray(dataArray) ? dataArray : [];
  
    if (dataArray.length === 0) {
      return {
        summary: { present: 0, absent: 0, late: 0, total: 0 },
        dailyData: [],
        departmentData: [],
        employeePerformance: [],
        timeData: []
      };
    }
  
    const summary = {
      present: dataArray.filter(item => item.status === 'present').length,
      absent: dataArray.filter(item => item.status === 'absent').length,
      late: dataArray.filter(item => item.status === 'late').length,
      total: dataArray.length
    };
  
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
  
    const deptMap = {};
    dataArray.forEach(item => {
      const employee = employees.find(emp => emp.id === item.employeeId);
      const dept = employee?.department || item.department || 'Unknown';
      if (!deptMap[dept]) {
        deptMap[dept] = { department: dept, present: 0, absent: 0, late: 0, total: 0 };
      }
      if (item.status) deptMap[dept][item.status]++;
      deptMap[dept].total++;
    });
    
    const departmentData = Object.values(deptMap);

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
          totalHours: 0,
          daysWorked: 0
        };
      }
      if (item.status) empMap[empId][item.status]++;
      empMap[empId].total++;

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
      const aProduct = a.avgDailyHours * a.attendanceRate;
      const bProduct = b.avgDailyHours * b.attendanceRate;
      return bProduct - aProduct;
    });
    
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
      employeePerformance: employeePerformance.slice(0, 10),
      timeData: timeData.sort((a, b) => new Date(a.date) - new Date(b.date))
    };
  };

  const renderSummaryCards = () => {
    if (!reportData) return null;
    
    const { summary } = reportData;
    const cards = [
      { 
        title: 'Present', 
        value: summary.present, 
        color: theme === 'dark' ? 'bg-green-900/50 text-green-400' : 'bg-green-100 text-green-800',
        percentage: ((summary.present / summary.total) * 100).toFixed(1) 
      },
      { 
        title: 'Absent', 
        value: summary.absent, 
        color: theme === 'dark' ? 'bg-red-900/50 text-red-400' : 'bg-red-100 text-red-800',
        percentage: ((summary.absent / summary.total) * 100).toFixed(1) 
      },
      { 
        title: 'Late', 
        value: summary.late, 
        color: theme === 'dark' ? 'bg-yellow-900/50 text-yellow-400' : 'bg-yellow-100 text-yellow-800',
        percentage: ((summary.late / summary.total) * 100).toFixed(1) 
      },
      { 
        title: 'Total Records', 
        value: summary.total, 
        color: theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-800',
        percentage: '100' 
      }
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {cards.map((card, index) => (
          <div key={index} className={`rounded-lg shadow p-4 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex justify-between items-center">
              <div>
                <p className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {card.title}
                </p>
                <p className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  {card.value}
                </p>
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

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-3 rounded-lg shadow-lg border ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <p className={`font-medium ${
            theme === 'dark' ? 'text-gray-200' : 'text-gray-900'
          }`}>
            {label}
          </p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderDailyAttendanceChart = () => {
    if (!reportData || reportData.dailyData.length === 0) {
      return (
        <div className={`text-center py-10 rounded-lg ${
          theme === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'
        }`}>
          No daily attendance data available
        </div>
      );
    }

    return (
      <div className={`rounded-lg shadow p-4 mb-6 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h3 className={`text-lg font-medium mb-4 ${
          theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
        }`}>
          Daily Attendance Trend
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={reportData.dailyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={chartTheme.gridColor}
              />
              <XAxis 
                dataKey="date" 
                tick={{ fill: chartTheme.textColor }}
                tickLine={{ stroke: chartTheme.gridColor }}
              />
              <YAxis 
                tick={{ fill: chartTheme.textColor }}
                tickLine={{ stroke: chartTheme.gridColor }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                formatter={(value) => (
                  <span style={{ color: chartTheme.textColor }}>{value}</span>
                )}
              />
              <Area 
                type="monotone" 
                dataKey="present" 
                stackId="1" 
                stroke="#1b8a07" 
                fill="#1b8a07" 
                strokeWidth={1.5} 
                name="Present"
              />
              <Area 
                type="monotone" 
                dataKey="absent" 
                stackId="1" 
                stroke="#a30714" 
                fill="#a30714" 
                strokeWidth={1.5} 
                name="Absent"
              />
              <Area 
                type="monotone" 
                dataKey="late" 
                stackId="1" 
                stroke="#f0880a" 
                fill="#f0880a" 
                strokeWidth={1.5} 
                name="Late"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  const renderDepartmentChart = () => {
    if (!reportData || reportData.departmentData.length === 0) {
      return (
        <div className={`text-center py-10 rounded-lg ${
          theme === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'
        }`}>
          No department data available
        </div>
      );
    }

    const maxValue = Math.max(
      ...reportData.departmentData.map(dept => 
        Math.max(dept.present || 0, dept.absent || 0, dept.late || 0)
      )
    );
    const niceMax = Math.ceil(maxValue / 5) * 5;

    return (
      <div className={`rounded-lg shadow p-4 mb-6 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h3 className={`text-lg font-medium mb-4 ${
          theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
        }`}>
          Attendance by Department
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={reportData.departmentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={chartTheme.gridColor}
              />
              <XAxis 
                dataKey="department" 
                tick={{ fill: chartTheme.textColor }}
                tickLine={{ stroke: chartTheme.gridColor }}
              />
              <YAxis 
                domain={[0, niceMax]}
                tickCount={6}
                allowDecimals={false}
                tick={{ fill: chartTheme.textColor }}
                tickLine={{ stroke: chartTheme.gridColor }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                formatter={(value) => (
                  <span style={{ color: chartTheme.textColor }}>{value}</span>
                )}
              />
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
      return (
        <div className={`text-center py-10 rounded-lg ${
          theme === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'
        }`}>
          No employee performance data available
        </div>
      );
    }

    const textColor = theme === 'dark' ? 'text-gray-100' : 'text-gray-900';
    const textColorSecondary = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';
    const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
    const headerBg = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50';
    const rowHover = theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50';

    return (
      <div className={`rounded-lg shadow p-4 mb-6 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h3 className={`text-lg font-medium mb-4 ${
          theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
        }`}>
          Top Performing Employees
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className={headerBg}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${textColorSecondary}`}>
                  Employee
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${textColorSecondary}`}>
                  Department
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${textColorSecondary}`}>
                  Present
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${textColorSecondary}`}>
                  Absent
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${textColorSecondary}`}>
                  Late
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${textColorSecondary}`}>
                  Avg Daily Hours
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${textColorSecondary}`}>
                  Attendance Rate
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${borderColor}`}>
              {reportData.employeePerformance.map((emp, index) => (
                <tr key={index} className={rowHover}>
                  <td 
                    onClick={() => navigate(`/employees/${emp.id}`)}
                    className={`px-6 py-4 whitespace-nowrap text-sm font-medium cursor-pointer ${
                      theme === 'dark' 
                        ? 'text-gray-100 hover:text-blue-400' 
                        : 'text-gray-900 hover:text-blue-800'
                    }`}
                  >
                    {emp.name}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${textColorSecondary}`}>
                    {emp.department}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${textColorSecondary}`}>
                    {emp.present}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${textColorSecondary}`}>
                    {emp.absent}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${textColorSecondary}`}>
                    {emp.late}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${textColorSecondary}`}>
                    {emp.avgDailyHours ? emp.avgDailyHours.toFixed(1) + ' hrs' : 'N/A'}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${textColorSecondary}`}>
                    <div className="flex items-center">
                      <div className={`w-full rounded-full h-2.5 mr-2 ${
                        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                      }`}>
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
      return (
        <div className={`text-center py-10 rounded-lg ${
          theme === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'
        }`}>
          No time analysis data available
        </div>
      );
    }

    const formatTime = (value) => {
      return `${Math.floor(value)}:${(value % 1 * 60).toString().padStart(2, '0')}`;
    };

    return (
      <div className={`rounded-lg shadow p-4 mb-6 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h3 className={`text-lg font-medium mb-4 ${
          theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
        }`}>
          Average Check-in Times
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={reportData.timeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={chartTheme.gridColor}
              />
              <XAxis 
                dataKey="date" 
                tick={{ fill: chartTheme.textColor }}
                tickLine={{ stroke: chartTheme.gridColor }}
              />
              <YAxis 
                domain={[8, 18]} 
                tickFormatter={formatTime}
                tick={{ fill: chartTheme.textColor }}
                tickLine={{ stroke: chartTheme.gridColor }}
              />
              <Tooltip 
                formatter={(value) => [formatTime(value), 'Time']}
                contentStyle={{
                  backgroundColor: chartTheme.tooltipBg,
                  borderColor: chartTheme.tooltipBorder,
                  color: chartTheme.textColor
                }}
              />
              <Legend 
                formatter={(value) => (
                  <span style={{ color: chartTheme.textColor }}>{value}</span>
                )}
              />
              <Line 
                type="monotone" 
                dataKey="avgCheckIn" 
                stroke="#8884d8" 
                name="Avg Check-in" 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="avgCheckOut" 
                stroke="#82ca9d" 
                name="Avg Check-out" 
                strokeWidth={2}
              />
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
      return (
        <div className={`text-center py-10 rounded-lg ${
          theme === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'
        }`}>
          No status distribution data available
        </div>
      );
    }

    return (
      <div className={`rounded-lg shadow p-4 mb-6 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h3 className={`text-lg font-medium mb-4 ${
          theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
        }`}>
          Attendance Distribution
        </h3>
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
              <Tooltip 
                contentStyle={{
                  backgroundColor: chartTheme.tooltipBg,
                  borderColor: chartTheme.tooltipBorder,
                  color: chartTheme.textColor
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  const handleExport = () => {
    if (!reportData) return;
    
    try {
      const exportData = {
        summary: reportData.summary,
        dateRange: dateRange,
        department: selectedDepartment || 'All Departments',
        generatedAt: new Date().toISOString()
      };
      
      const dataStr = JSON.stringify(exportData, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `attendance-analytics-${new Date().toISOString().split('T')[0]}.json`);
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      alert('Analytics data exported successfully!');
      
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    }
  };

  const bgColor = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50';
  const textColor = theme === 'dark' ? 'text-gray-100' : 'text-gray-900';
  const textColorSecondary = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const inputBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const inputBorder = theme === 'dark' ? 'border-gray-700' : 'border-gray-300';
  const inputText = theme === 'dark' ? 'text-gray-100' : 'text-gray-900';
  const placeholderColor = theme === 'dark' ? 'placeholder-gray-500' : 'placeholder-gray-400';

  return (
    <div className={`p-6 min-h-screen ${bgColor}`}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className={`text-2xl font-bold ${textColor}`}>
            Attendance Analytics
          </h2>
          <p className={textColorSecondary}>
            Comprehensive analysis of employee attendance patterns
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={handleExport}
            className={`border px-3 py-2 rounded-lg flex items-center space-x-2 ${
              theme === 'dark' 
                ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' 
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Download size={16} />
            <span>Export Data</span>
          </button>
          
          <button
            onClick={loadReportData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
            disabled={loading}
          >
            <RotateCw size={16} className="mr-2" />
            {loading ? 'Loading...' : 'Refresh Data'}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className={`rounded-lg shadow mb-6 p-4 ${cardBg}`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${textColorSecondary}`}>
              Start Date
            </label>
            <input 
              type="date" 
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputBg} ${inputBorder} ${inputText} ${placeholderColor}`}
              value={dateRange.startDate}
              onChange={e => setDateRange({...dateRange, startDate: e.target.value})}
            />
          </div>
          
          <div>
            <label className={`block text-sm font-medium mb-1 ${textColorSecondary}`}>
              End Date
            </label>
            <input 
              type="date" 
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputBg} ${inputBorder} ${inputText} ${placeholderColor}`}
              value={dateRange.endDate}
              onChange={e => setDateRange({...dateRange, endDate: e.target.value})}
            />
          </div>
          
          <div>
            <label className={`block text-sm font-medium mb-1 ${textColorSecondary}`}>
              Department
            </label>
            <select
              value={selectedDepartment}
              onChange={e => setSelectedDepartment(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputBg} ${inputBorder} ${inputText}`}
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
              className={`w-full px-4 py-2 rounded-lg ${
                theme === 'dark' 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className={`flex justify-center items-center h-64 rounded-lg ${cardBg}`}>
          <div className={textColorSecondary}>Loading analytics data...</div>
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