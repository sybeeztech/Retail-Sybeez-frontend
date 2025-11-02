import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import useSettingsStore from '../../store/settingsStore';
import { useEmployeeStore } from '../../store/employeeStore';
import { useAttendanceStore } from '../../store/attendanceStore';

const HRMDashboard = () => {
  const { theme } = useSettingsStore();
  const { 
    employees, 
    fetchEmployees, 
    loading: employeesLoading, 
    getEmployeesByDepartment 
  } = useEmployeeStore();
  const { 
    getAttendanceStats, 
    fetchAttendanceReport,
    getCurrentUserRole 
  } = useAttendanceStore();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // State for dashboard data
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalDepartments: 0,
    attendanceRate: '0%',
    newHires: 0,
    pendingTickets: 0,
    recentAttendance: 0
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [monthlyEmployeeData, setMonthlyEmployeeData] = useState([]);
  const [newHires, setNewHires] = useState([]);
  const [departmentOverview, setDepartmentOverview] = useState([]);

  const navigate = useNavigate();

  // Calculate department count and overview
  const calculateDepartmentOverview = (employees) => {
    if (!employees || employees.length === 0) return [];
    
    const departmentMap = {};
    
    employees.forEach(employee => {
      if (!departmentMap[employee.department]) {
        departmentMap[employee.department] = {
          employeeCount: 0,
          managers: new Set()
        };
      }
      departmentMap[employee.department].employeeCount++;
      
      // Simple logic to identify managers - in real app, this would come from role data
      if (employee.position?.toLowerCase().includes('manager') || 
          employee.role === 'manager') {
        departmentMap[employee.department].managers.add(`${employee.firstName} ${employee.lastName}`);
      }
    });

    return Object.entries(departmentMap).map(([name, data], index) => ({
      id: index + 1,
      name,
      employeeCount: data.employeeCount,
      manager: Array.from(data.managers)[0] || 'Not assigned'
    }));
  };

  // Get recent hires (last 90 days)
  const getRecentHires = (employees) => {
    if (!employees || employees.length === 0) return [];
    
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
    
    return employees
      .filter(employee => {
        const hireDate = new Date(employee.startDate || employee.createdAt);
        return hireDate >= ninetyDaysAgo;
      })
      .slice(0, 5) // Limit to 5 most recent
      .map(employee => ({
        id: employee.id,
        name: `${employee.firstName} ${employee.lastName}`,
        designation: employee.designation || 'Employee',
        department: employee.department,
        email: employee.email,
        phone: employee.phone,
        avatar: employee.avatar 
      }));
  };

  // Generate monthly employee data for chart
  const generateMonthlyEmployeeData = (employees) => {
    if (!employees || employees.length === 0) return [];
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentDate = new Date();
    
    // Generate last 5 months
    const monthlyData = [];
    for (let i = 4; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const monthName = months[date.getMonth()];
      const year = date.getFullYear();
      const monthEnd = new Date(year, date.getMonth() + 1, 0);
      
      // Count all employees hired by the end of this month
      const employeeCount = employees.filter(employee => {
        const hireDate = employee.hireDate || employee.startDate;
        if (!hireDate) return false;
        return new Date(hireDate) <= monthEnd;
      }).length;
      
      monthlyData.push({
        month: monthName,
        count: employeeCount,
        fullMonth: `${monthName} ${year}`
      });
    }
    
    return monthlyData;
  };

  // Get recent activities
  const getRecentActivities = (attendanceStats, recentHires) => {
    const activities = [];
    
    // Add hire activities
    recentHires.slice(0, 2).forEach(hire => {
      activities.push({
        type: 'hire',
        message: `New employee ${hire.name} joined the ${hire.department} team`,
        timestamp: 'Recently'
      });
    });
    
    // Add attendance activity
    if (attendanceStats && attendanceStats.total > 0) {
      activities.push({
        type: 'attendance',
        message: `Weekly attendance recorded: ${attendanceStats.present || 0} present, ${attendanceStats.absent || 0} absent`,
        timestamp: 'Today'
      });
    }
    
    // Add sample leave activity
    // activities.push({
    //   type: 'leave',
    //   message: 'Leave request approved for team member',
    //   timestamp: '1 day ago'
    // });
    
    return activities.slice(0, 3); // Limit to 3 activities
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`;
  };

  // Calculate attendance rate
  const calculateAttendanceRate = (attendanceStats) => {
    if (!attendanceStats || attendanceStats.total === 0) return '0%';
    
    const presentCount = attendanceStats.present || 0;
    const rate = (presentCount / attendanceStats.total) * 100;
    return `${Math.round(rate)}%`;
  };

  // Load dashboard data
  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch employees data
        await fetchEmployees();
        
        // Get attendance stats for today
        const attendanceStats = getAttendanceStats();
        
        // Calculate dashboard statistics
        const departmentOverviewData = calculateDepartmentOverview(employees);
        const recentHiresData = getRecentHires(employees);
        const monthlyData = generateMonthlyEmployeeData(employees);
        const activitiesData = getRecentActivities(attendanceStats, recentHiresData);
        
        setStats({
          totalEmployees: employees?.length || 0,
          totalDepartments: departmentOverviewData.length,
          attendanceRate: calculateAttendanceRate(attendanceStats),
          newHires: recentHiresData.length,
          pendingTickets: 5, // This would come from a tickets store
          recentAttendance: attendanceStats?.present || 0
        });
        
        setRecentActivities(activitiesData);
        setMonthlyEmployeeData(monthlyData);
        setNewHires(recentHiresData);
        setDepartmentOverview(departmentOverviewData);
        
      } catch (err) {
        console.error('Error loading dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [employees.length]); // Re-run when employees data changes

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const fullMonth = payload[0]?.payload?.fullMonth || label;
      return (
        <div className={`p-3 border rounded shadow-md ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700 text-gray-100' 
            : 'bg-white border-gray-200 text-gray-800'
        }`}>
          <p className="font-medium">{fullMonth}</p>
          <p className={`text-sm ${
            theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
          }`}>
            {payload[0].value} employees
          </p>
        </div>
      );
    }
    return null;
  };

  // Empty state components
  const EmptyChartState = () => (
    <div className={`h-56 flex flex-col items-center justify-center border-2 border-dashed rounded-lg ${
      theme === 'dark' ? 'border-gray-700 text-gray-400' : 'border-gray-300 text-gray-500'
    }`}>
      <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
      <p className="text-sm font-medium mb-1">No Employee Data</p>
      <p className="text-xs text-center px-4">Employee headcount data will appear here once employees are added to the system.</p>
    </div>
  );

  const EmptyActivitiesState = () => (
    <div className={`flex flex-col items-center justify-center py-8 border-2 border-dashed rounded-lg ${
      theme === 'dark' ? 'border-gray-700 text-gray-400' : 'border-gray-300 text-gray-500'
    }`}>
      <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p className="text-sm font-medium mb-1">No Recent Activities</p>
      <p className="text-xs text-center px-4">Recent activities will appear here as employees join and system events occur.</p>
    </div>
  );

  const EmptyNewHiresState = () => (
    <div className={`flex flex-col items-center justify-center py-8 border-2 border-dashed rounded-lg ${
      theme === 'dark' ? 'border-gray-700 text-gray-400' : 'border-gray-300 text-gray-500'
    }`}>
      <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
      <p className="text-sm font-medium mb-1">No New Hires</p>
      <p className="text-xs text-center px-4">New employee hires from the last 90 days will appear here.</p>
    </div>
  );

  const EmptyDepartmentsState = () => (
    <div className={`flex flex-col items-center justify-center py-8 border-2 border-dashed rounded-lg ${
      theme === 'dark' ? 'border-gray-700 text-gray-400' : 'border-gray-300 text-gray-500'
    }`}>
      <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
      <p className="text-sm font-medium mb-1">No Departments</p>
      <p className="text-xs text-center px-4">Department overview will appear here once departments are created and employees are assigned.</p>
    </div>
  );

  if (loading || employeesLoading) {
    return (
      <div className={`p-6 flex justify-center items-center h-64 ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
          Loading dashboard data...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-6 flex justify-center items-center h-64 ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className={`p-6 space-y-6 ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        {/* Total Employees Card */}
        <div className={`rounded-xl shadow-sm border p-5 ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-100'
        }`}>
          <div className="flex justify-between items-start">
            <div>
              <p className={`text-sm font-medium mb-1 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>Total Employees</p>
              <h3 className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
              }`}>{stats.totalEmployees || 0}</h3>
              <div className="flex items-center mt-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                <span className={`text-xs ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>Active workforce</span>
              </div>
            </div>
            <div className={`p-3 rounded-lg ${
              theme === 'dark' ? 'bg-blue-900/50' : 'bg-blue-50'
            }`}>
              <svg className={`w-5 h-5 ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
              }`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Departments Card */}
        <div className={`rounded-xl shadow-sm border p-5 ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-100'
        }`}>
          <div className="flex justify-between items-start">
            <div>
              <p className={`text-sm font-medium mb-1 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>Departments</p>
              <h3 className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
              }`}>{stats.totalDepartments || 0}</h3>
              <div className="flex items-center mt-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className={`text-xs ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>Organized teams</span>
              </div>
            </div>
            <div className={`p-3 rounded-lg ${
              theme === 'dark' ? 'bg-green-900/50' : 'bg-green-50'
            }`}>
              <svg className={`w-5 h-5 ${
                theme === 'dark' ? 'text-green-400' : 'text-green-600'
              }`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Attendance Rate Card */}
        <div className={`rounded-xl shadow-sm border p-5 ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-100'
        }`}>
          <div className="flex justify-between items-start">
            <div>
              <p className={`text-sm font-medium mb-1 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>Weekly Attendance</p>
              <h3 className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
              }`}>{stats.attendanceRate || '0%'}</h3>
              <div className="flex items-center mt-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                <span className={`text-xs ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>This week</span>
              </div>
            </div>
            <div className={`p-3 rounded-lg ${
              theme === 'dark' ? 'bg-purple-900/50' : 'bg-purple-50'
            }`}>
              <svg className={`w-5 h-5 ${
                theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
              }`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>

        {/* New Hires Card */}
        <div className={`rounded-xl shadow-sm border p-5 ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-100'
        }`}>
          <div className="flex justify-between items-start">
            <div>
              <p className={`text-sm font-medium mb-1 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>New Hires (90d)</p>
              <h3 className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
              }`}>{stats.newHires || 0}</h3>
              <div className="flex items-center mt-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                <span className={`text-xs ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>Recent additions</span>
              </div>
            </div>
            <div className={`p-3 rounded-lg ${
              theme === 'dark' ? 'bg-yellow-900/50' : 'bg-yellow-50'
            }`}>
              <svg className={`w-5 h-5 ${
                theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'
              }`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Employee Count Chart */}
        <div className={`rounded-lg shadow p-6 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
          }`}>Employee Head Count</h3>
          {monthlyEmployeeData.length > 0 ? (
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyEmployeeData}>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} 
                  />
                  <XAxis 
                    dataKey="month" 
                    tick={{ 
                      fontSize: 12, 
                      fill: theme === 'dark' ? '#9CA3AF' : '#374151' 
                    }}
                    stroke={theme === 'dark' ? '#4B5563' : '#E5E7EB'}
                  />
                  <YAxis 
                    tick={{ 
                      fontSize: 12, 
                      fill: theme === 'dark' ? '#9CA3AF' : '#374151' 
                    }}
                    stroke={theme === 'dark' ? '#4B5563' : '#E5E7EB'}
                    allowDecimals={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="linear" 
                    dataKey="count" 
                    stroke={theme === 'dark' ? '#60A5FA' : '#5389b0'} 
                    strokeWidth={2}
                    dot={{ 
                      fill: theme === 'dark' ? '#60A5FA' : '#5389b0', 
                      strokeWidth: 2, 
                      r: 4 
                    }}
                    activeDot={{ 
                      r: 6, 
                      fill: theme === 'dark' ? '#3B82F6' : '#2563eb' 
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <EmptyChartState />
          )}
        </div>

        {/* Recent Activities */}
        <div className={`rounded-lg shadow p-6 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
          }`}>Recent Activities</h3>
          {recentActivities.length > 0 ? (
            <ul className="space-y-4">
              {recentActivities.map((activity, index) => (
                <li key={index} className="flex items-center">
                  <div className={`p-2 rounded-full ${
                    theme === 'dark' 
                      ? activity.type === 'hire' ? 'bg-green-900/50' : 'bg-blue-900/50'
                      : activity.type === 'hire' ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    <svg className={`h-5 w-5 ${
                      theme === 'dark'
                        ? activity.type === 'hire' ? 'text-green-400' : 'text-blue-400'
                        : activity.type === 'hire' ? 'text-green-600' : 'text-blue-600'
                    }`} fill="currentColor" viewBox="0 0 20 20">
                      {activity.type === 'hire' ? (
                        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"/>
                      ) : (
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                      )}
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    }`}>
                      {activity.message}
                    </p>
                    <p className={`text-xs ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {activity.timestamp}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyActivitiesState />
          )}
        </div>

        {/* New Hires Section */}
        <div className={`rounded-lg shadow p-6 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
          }`}>New Hires</h3>
          {newHires.length > 0 ? (
            <div className="max-h-72 overflow-y-auto pr-2">
              <div className="grid grid-cols-1 gap-4">
                {newHires.map(hire => (
                  <div key={hire.id} className={`border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow ${
                    theme === 'dark' 
                      ? 'border-gray-700 bg-gray-700/50 hover:bg-gray-700' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <div>
                        {hire.avatar ? (
                          <img  
                            src={hire.avatar} 
                            alt={hire.name}
                            onClick={() => navigate(`/hrm/employees/${hire.id}`)}
                            className="w-12 h-12 cursor-pointer rounded-full object-cover border-2 border-gray-200"
                          />
                        ) : (
                          <div 
                            className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer ${
                              theme === 'dark' ? 'bg-blue-900/50' : 'bg-blue-100'
                            }`}
                            onClick={() => navigate(`/hrm/employees/${hire.id}`)}
                          >
                            <span className={`text-lg font-medium ${
                              theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                            }`}>
                              {getInitials(hire.name.split(' ')[0], hire.name.split(' ')[1] || '')}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex w-full items-start justify-between">
                        <div className="flex flex-col items-start">
                          <h4 
                            onClick={() => navigate(`/hrm/employees/${hire.id}`)}
                            className={`font-semibold truncate cursor-pointer ${
                              theme === 'dark' 
                                ? 'text-gray-100 hover:text-blue-400' 
                                : 'text-gray-900 hover:text-blue-700'
                            }`}
                          >
                            {hire.name}
                          </h4>
                          <p className={`text-sm truncate ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {hire.designation}
                          </p>
                        </div>
                        <div className='flex items-end text-wrap'>
                          <p className={`text-sm font-semibold truncate ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                          }`}>
                            {hire.department}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 space-y-1">
                      <div className={`flex items-center text-sm ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                        </svg>
                        <a 
                          href={`mailto:${hire.email}`} 
                          className={`truncate hover:underline ${
                            theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                          }`}
                        >
                          {hire.email}
                        </a>
                      </div>
                      {hire.phone && (
                        <div className={`flex items-center text-sm ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                          </svg>
                          <a 
                            href={`tel:${hire.phone}`}
                            className={`hover:underline ${
                              theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                            }`}
                          >
                            {hire.phone}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <EmptyNewHiresState />
          )}
        </div>
        
        {/* Department Overview */}
        <div className={`rounded-lg shadow p-6 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
          }`}>Department Overview</h3>
          {departmentOverview.length > 0 ? (
            <div className="max-h-72 overflow-y-auto pr-2"> 
              <div className="space-y-4">
                {departmentOverview.map(dept => (
                  <div key={dept.id} className="flex justify-between items-center">
                    <div>
                      <h4 className={`font-medium ${
                        theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      }`}>
                        {dept.name}
                      </h4>
                      <p className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {dept.employeeCount} employees
                      </p>
                    </div>
                    {/* <div className="text-right">
                      <p className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        Manager
                      </p>
                      <p className={`font-medium ${
                        theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      }`}>
                        {dept.manager}
                      </p>
                    </div> */}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <EmptyDepartmentsState />
          )}
        </div>
      </div>
    </div>
  );
};

export default HRMDashboard;