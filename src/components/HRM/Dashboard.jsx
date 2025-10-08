import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

const HRMDashboard = () => {
  const [userRole, setUserRole] = useState('admin');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock data for now
  const [stats, setStats] = useState({
    totalEmployees: 125,
    totalDepartments: 8,
    attendanceRate: '94%',
    newHires: 12,
    pendingTickets: 5,
    recentAttendance: 15
  });

  const [recentActivities, setRecentActivities] = useState([
    {
      type: 'hire',
      message: 'New employee John Doe joined the Engineering team',
      timestamp: '2 hours ago'
    },
    {
      type: 'attendance',
      message: 'Weekly attendance report generated',
      timestamp: '4 hours ago'
    },
    {
      type: 'leave',
      message: 'Leave request approved for Sarah Wilson',
      timestamp: '1 day ago'
    }
  ]);

  const [monthlyEmployeeData, setMonthlyEmployeeData] = useState([
    { month: 'Jan', count: 110, fullMonth: 'January 2025' },
    { month: 'Feb', count: 115, fullMonth: 'February 2025' },
    { month: 'Mar', count: 118, fullMonth: 'March 2025' },
    { month: 'Apr', count: 122, fullMonth: 'April 2025' },
    { month: 'May', count: 125, fullMonth: 'May 2025' }
  ]);

  const [newHires, setNewHires] = useState([
    {
      id: 1,
      name: 'John Doe',
      designation: 'Software Engineer',
      department: 'Engineering',
      email: 'john.doe@company.com',
      phone: '+1 (555) 123-4567',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      designation: 'Marketing Specialist',
      department: 'Marketing',
      email: 'sarah.wilson@company.com',
      phone: '+1 (555) 987-6543',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    }
  ]);

  const [departmentOverview, setDepartmentOverview] = useState([
    { id: 1, name: 'Engineering', employeeCount: 25, manager: 'Alex Johnson' },
    { id: 2, name: 'Marketing', employeeCount: 15, manager: 'Lisa Chen' },
    { id: 3, name: 'Sales', employeeCount: 20, manager: 'Mike Rodriguez' },
    { id: 4, name: 'HR', employeeCount: 8, manager: 'Emma Davis' },
    { id: 5, name: 'Finance', employeeCount: 12, manager: 'David Kim' }
  ]);

  const navigate = useNavigate();

  // Helper function to get time-based greeting
  const getGreetingData = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return {
        greeting: 'Good Morning',
        message: 'Have a productive day!',
        icon: '🌅',
        bgColor: 'bg-gradient-to-r from-blue-50 to-cyan-50',
        textColor: 'text-blue-800'
      };
    } else if (hour < 18) {
      return {
        greeting: 'Good Afternoon',
        message: 'Keep up the great work!',
        icon: '☀️',
        bgColor: 'bg-gradient-to-r from-amber-50 to-orange-50',
        textColor: 'text-amber-800'
      };
    } else {
      return {
        greeting: 'Good Evening',
        message: 'Time to wrap up and relax!',
        icon: '🌙',
        bgColor: 'bg-gradient-to-r from-indigo-50 to-purple-50',
        textColor: 'text-indigo-800'
      };
    }
  };

  const greetingData = getGreetingData();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const fullMonth = payload[0]?.payload?.fullMonth || label;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded shadow-md">
          <p className="font-medium text-gray-800">{fullMonth}</p>
          <p className="text-sm text-blue-600">
            {payload[0].value} employees
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="text-gray-500">Loading dashboard data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Greeting Card */}
      <div className={`${greetingData.bgColor} rounded-xl shadow-sm border border-gray-100 p-6`}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-2">{greetingData.greeting}, Admin</h1>
            <p className="text-gray-600">{greetingData.message}</p>
          </div>
          <div className="text-4xl">{greetingData.icon}</div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        {/* Total Employees Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Total Employees</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.totalEmployees || 0}</h3>
              <div className="flex items-center mt-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-xs text-gray-500">Active workforce</span>
              </div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Departments Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Departments</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.totalDepartments || 0}</h3>
              <div className="flex items-center mt-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-xs text-gray-500">Organized teams</span>
              </div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Attendance Rate Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Weekly Attendance</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.attendanceRate || '0%'}</h3>
              <div className="flex items-center mt-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                <span className="text-xs text-gray-500">This week</span>
              </div>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>

        {/* New Hires Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">New Hires (90d)</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.newHires || 0}</h3>
              <div className="flex items-center mt-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                <span className="text-xs text-gray-500">Recent additions</span>
              </div>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg">
              <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Employee Count Chart */}
        {monthlyEmployeeData.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Employee Head Count</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyEmployeeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 12, fill: '#374151' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: '#374151' }}
                    allowDecimals={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="linear" 
                    dataKey="count" 
                    stroke="#5389b0" 
                    strokeWidth={2}
                    dot={{ fill: '#5389b0', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: '#2563eb' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
          <ul className="space-y-4">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity, index) => (
                <li key={index} className="flex items-center">
                  <div className={`p-2 rounded-full ${
                    activity.type === 'hire' ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    <svg className={`h-5 w-5 ${
                      activity.type === 'hire' ? 'text-green-600' : 'text-blue-600'
                    }`} fill="currentColor" viewBox="0 0 20 20">
                      {activity.type === 'hire' ? (
                        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"/>
                      ) : (
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                      )}
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.timestamp}</p>
                  </div>
                </li>
              ))
            ) : (
              <li className="text-center text-gray-500 py-4">No recent activities</li>
            )}
          </ul>
        </div>

        {/* New Hires Section */}
        {newHires.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">New Hires</h3>
            <div className="max-h-72 overflow-y-auto pr-2">
              <div className="grid grid-cols-1 gap-4">
                {newHires.map(hire => (
                  <div key={hire.id} className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-3">
                      <div>
                        <img  
                          src={hire.avatar} 
                          alt={hire.name}
                          onClick={() => navigate(`/hrm/employees/${hire.id}`)}
                          className="w-12 h-12 cursor-pointer rounded-full object-cover border-2 border-gray-200"
                        />
                      </div>
                      <div className="flex w-full items-start justify-between">
                        <div className="flex flex-col items-start">
                          <h4 
                            onClick={() => navigate(`/hrm/employees/${hire.id}`)}
                            className="font-semibold text-gray-900 truncate cursor-pointer hover:text-blue-700"
                          >
                            {hire.name}
                          </h4>
                          <p className="text-sm text-gray-500 truncate">{hire.designation}</p>
                        </div>
                        <div className='flex items-end text-wrap'>
                          <p className="text-sm text-gray-500 font-semibold truncate">{hire.department}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                        </svg>
                        <a href={`mailto:${hire.email}`} className="truncate">{hire.email}</a>
                      </div>
                      {hire.phone && (
                        <div className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                          </svg>
                          <a href={`tel:${hire.phone}`}>{hire.phone}</a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Department Overview */}
        {departmentOverview.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Department Overview</h3>
            <div className="max-h-72 overflow-y-auto pr-2"> 
              <div className="space-y-4">
                {departmentOverview.map(dept => (
                  <div key={dept.id} className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{dept.name}</h4>
                      <p className="text-sm text-gray-500">{dept.employeeCount} employees</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Manager</p>
                      <p className="font-medium">{dept.manager}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HRMDashboard;