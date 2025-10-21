import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  X, 
  AlertTriangle, 
  Users, 
  Search, 
  Filter, 
  Download, 
  BarChart3, 
  Eye,
  Edit,
  Plus,
  Minus,
  TrendingUp,
  TrendingDown,
  MapPin
} from 'lucide-react';
import useSettingsStore from '../../store/settingsStore';

const AttendanceManagement = () => {
  const { theme } = useSettingsStore();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showMarkModal, setShowMarkModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [markAttendanceData, setMarkAttendanceData] = useState({
    employeeId: '',
    status: 'present',
    checkIn: '09:00',
    checkOut: '18:00',
    notes: '',
    location: 'Office'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [dateRange, setDateRange] = useState({
    start: new Date().toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });

  // Initialize sample data
  useEffect(() => {
    const sampleEmployees = [
      {
        id: 1,
        employeeId: 'EMP001',
        name: 'John Smith',
        department: 'Engineering',
        position: 'Software Developer',
        email: 'john.smith@company.com',
        phone: '+1-555-0101'
      },
      {
        id: 2,
        employeeId: 'EMP002',
        name: 'Sarah Johnson',
        department: 'Marketing',
        position: 'Marketing Manager',
        email: 'sarah.johnson@company.com',
        phone: '+1-555-0102'
      },
      {
        id: 3,
        employeeId: 'EMP003',
        name: 'Mike Chen',
        department: 'Sales',
        position: 'Sales Representative',
        email: 'mike.chen@company.com',
        phone: '+1-555-0103'
      },
      {
        id: 4,
        employeeId: 'EMP004',
        name: 'Lisa Rodriguez',
        department: 'HR',
        position: 'HR Specialist',
        email: 'lisa.rodriguez@company.com',
        phone: '+1-555-0104'
      },
      {
        id: 5,
        employeeId: 'EMP005',
        name: 'David Wilson',
        department: 'Finance',
        position: 'Financial Analyst',
        email: 'david.wilson@company.com',
        phone: '+1-555-0105'
      },
      {
        id: 6,
        employeeId: 'EMP006',
        name: 'Emma Davis',
        department: 'Engineering',
        position: 'UI/UX Designer',
        email: 'emma.davis@company.com',
        phone: '+1-555-0106'
      }
    ];

    const sampleAttendance = [
      {
        id: 1,
        employeeId: 'EMP001',
        date: new Date().toISOString().split('T')[0],
        checkIn: '09:15',
        checkOut: '18:30',
        workHours: '9h 15m',
        status: 'present',
        overtime: '0h 30m',
        location: 'Office',
        notes: ''
      },
      {
        id: 2,
        employeeId: 'EMP002',
        date: new Date().toISOString().split('T')[0],
        checkIn: '08:45',
        checkOut: '17:45',
        workHours: '9h 00m',
        status: 'present',
        overtime: '0h 00m',
        location: 'Office',
        notes: ''
      },
      {
        id: 3,
        employeeId: 'EMP003',
        date: new Date().toISOString().split('T')[0],
        checkIn: '09:30',
        checkOut: '',
        workHours: '-- --',
        status: 'present',
        overtime: '-- --',
        location: 'Remote',
        notes: 'Working from home'
      },
      {
        id: 4,
        employeeId: 'EMP004',
        date: new Date().toISOString().split('T')[0],
        checkIn: '',
        checkOut: '',
        workHours: '-- --',
        status: 'absent',
        overtime: '-- --',
        location: '',
        notes: 'Sick leave'
      },
      {
        id: 5,
        employeeId: 'EMP005',
        date: new Date().toISOString().split('T')[0],
        checkIn: '08:30',
        checkOut: '',
        workHours: '-- --',
        status: 'present',
        overtime: '-- --',
        location: 'Office',
        notes: ''
      },
      {
        id: 6,
        employeeId: 'EMP006',
        date: new Date().toISOString().split('T')[0],
        checkIn: '10:00',
        checkOut: '19:15',
        workHours: '9h 15m',
        status: 'late',
        overtime: '1h 15m',
        location: 'Office',
        notes: 'Late arrival - traffic'
      }
    ];

    setEmployees(sampleEmployees);
    setAttendanceData(sampleAttendance);
  }, []);

  // Calculate work hours and overtime
  const calculateWorkHours = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return { workHours: '-- --', overtime: '-- --' };

    const [inHour, inMin] = checkIn.split(':').map(Number);
    const [outHour, outMin] = checkOut.split(':').map(Number);

    const totalMinutes = (outHour * 60 + outMin) - (inHour * 60 + inMin);
    const workHours = Math.floor(totalMinutes / 60);
    const workMinutes = totalMinutes % 60;

    const overtimeMinutes = Math.max(0, totalMinutes - (9 * 60)); // 9 hours standard
    const overtimeHours = Math.floor(overtimeMinutes / 60);
    const overtimeMins = overtimeMinutes % 60;

    return {
      workHours: `${workHours}h ${workMinutes}m`,
      overtime: overtimeMinutes > 0 ? `${overtimeHours}h ${overtimeMins}m` : '0h 00m'
    };
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'present': 
        return theme === 'dark' ? 'bg-green-900/50 text-green-400' : 'bg-green-100 text-green-800';
      case 'absent': 
        return theme === 'dark' ? 'bg-red-900/50 text-red-400' : 'bg-red-100 text-red-800';
      case 'late': 
        return theme === 'dark' ? 'bg-yellow-900/50 text-yellow-400' : 'bg-yellow-100 text-yellow-800';
      case 'partial': 
        return theme === 'dark' ? 'bg-orange-900/50 text-orange-400' : 'bg-orange-100 text-orange-800';
      default: 
        return theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present': return <CheckCircle size={16} className={theme === 'dark' ? 'text-green-400' : 'text-green-600'} />;
      case 'absent': return <X size={16} className={theme === 'dark' ? 'text-red-400' : 'text-red-600'} />;
      case 'late': return <AlertTriangle size={16} className={theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'} />;
      case 'partial': return <Clock size={16} className={theme === 'dark' ? 'text-orange-400' : 'text-orange-600'} />;
      default: return <Clock size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />;
    }
  };

  // Filter data based on search, status, and department
  const filteredData = attendanceData.filter(record => {
    const employee = employees.find(emp => emp.employeeId === record.employeeId);
    if (!employee) return false;

    const matchesSearch = 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || record.status === statusFilter.toLowerCase();
    const matchesDepartment = departmentFilter === 'All' || employee.department === departmentFilter;
    const matchesDate = record.date === selectedDate;

    return matchesSearch && matchesStatus && matchesDepartment && matchesDate;
  });

  // Get unique departments for filter
  const departments = ['All', ...new Set(employees.map(emp => emp.department))];

  // Summary statistics
  const todaysAttendance = attendanceData.filter(record => record.date === selectedDate);
  const totalEmployees = employees.length;
  const presentEmployees = todaysAttendance.filter(emp => emp.status === 'present' || emp.status === 'late').length;
  const absentEmployees = todaysAttendance.filter(emp => emp.status === 'absent').length;
  const lateEmployees = todaysAttendance.filter(emp => emp.status === 'late').length;
  const attendanceRate = totalEmployees > 0 ? ((presentEmployees / totalEmployees) * 100).toFixed(1) : '0.0';

  // Mark attendance function
  const markAttendance = () => {
    if (!markAttendanceData.employeeId) {
      alert('Please select an employee');
      return;
    }

    const employee = employees.find(emp => emp.id === parseInt(markAttendanceData.employeeId));
    if (!employee) return;

    const { workHours, overtime } = calculateWorkHours(
      markAttendanceData.checkIn, 
      markAttendanceData.checkOut
    );

    const newAttendance = {
      id: Date.now(),
      employeeId: employee.employeeId,
      date: selectedDate,
      checkIn: markAttendanceData.status === 'absent' ? '' : markAttendanceData.checkIn,
      checkOut: markAttendanceData.status === 'absent' ? '' : markAttendanceData.checkOut,
      workHours: markAttendanceData.status === 'absent' ? '-- --' : workHours,
      status: markAttendanceData.status,
      overtime: markAttendanceData.status === 'absent' ? '-- --' : overtime,
      location: markAttendanceData.location,
      notes: markAttendanceData.notes
    };

    // Update or add attendance record
    const existingIndex = attendanceData.findIndex(
      record => record.employeeId === employee.employeeId && record.date === selectedDate
    );

    if (existingIndex >= 0) {
      const updatedData = [...attendanceData];
      updatedData[existingIndex] = newAttendance;
      setAttendanceData(updatedData);
    } else {
      setAttendanceData(prev => [...prev, newAttendance]);
    }

    setShowMarkModal(false);
    resetMarkAttendanceForm();
  };

  const resetMarkAttendanceForm = () => {
    setMarkAttendanceData({
      employeeId: '',
      status: 'present',
      checkIn: '09:00',
      checkOut: '18:00',
      notes: '',
      location: 'Office'
    });
  };

  // Edit attendance function
  const editAttendance = (employeeId) => {
    const record = attendanceData.find(
      record => record.employeeId === employeeId && record.date === selectedDate
    );
    
    if (record) {
      const employee = employees.find(emp => emp.employeeId === employeeId);
      setMarkAttendanceData({
        employeeId: employee.id.toString(),
        status: record.status,
        checkIn: record.checkIn || '09:00',
        checkOut: record.checkOut || '18:00',
        notes: record.notes,
        location: record.location || 'Office'
      });
      setShowMarkModal(true);
    }
  };

  // Export to CSV function
  const exportToCSV = () => {
    const headers = ['Employee ID', 'Name', 'Department', 'Date', 'Check In', 'Check Out', 'Work Hours', 'Status', 'Overtime', 'Location', 'Notes'];
    
    const csvData = filteredData.map(record => {
      const employee = employees.find(emp => emp.employeeId === record.employeeId);
      return [
        record.employeeId,
        employee?.name || '',
        employee?.department || '',
        record.date,
        record.checkIn || '--:--',
        record.checkOut || '--:--',
        record.workHours,
        record.status,
        record.overtime,
        record.location || '',
        record.notes || ''
      ];
    });

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(field => `"${field}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `attendance-${selectedDate}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  // Get employee details for a record
  const getEmployeeDetails = (employeeId) => {
    return employees.find(emp => emp.employeeId === employeeId) || {};
  };

  return (
    <div className={`p-6 min-h-screen ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className={`text-2xl font-semibold ${
              theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Attendance Management
            </h1>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Track and manage employee attendance
            </p>
          </div>
          <div className="flex space-x-3">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className={`border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-gray-100' 
                  : 'border-gray-300 text-gray-900'
              }`}
            />
            <button
              onClick={() => {
                resetMarkAttendanceForm();
                setShowMarkModal(true);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Mark Attendance</span>
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
          <div className={`rounded-lg shadow p-6 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Total Employees
                </p>
                <p className="text-2xl font-bold text-blue-600">{totalEmployees}</p>
              </div>
              <div className={`p-3 rounded-full ${
                theme === 'dark' ? 'bg-blue-900/50' : 'bg-blue-100'
              }`}>
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className={`rounded-lg shadow p-6 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Present Today
                </p>
                <p className="text-2xl font-bold text-green-600">{presentEmployees}</p>
              </div>
              <div className={`p-3 rounded-full ${
                theme === 'dark' ? 'bg-green-900/50' : 'bg-green-100'
              }`}>
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className={`rounded-lg shadow p-6 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Absent Today
                </p>
                <p className="text-2xl font-bold text-red-600">{absentEmployees}</p>
              </div>
              <div className={`p-3 rounded-full ${
                theme === 'dark' ? 'bg-red-900/50' : 'bg-red-100'
              }`}>
                <X className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </div>
          
          <div className={`rounded-lg shadow p-6 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Late Arrivals
                </p>
                <p className="text-2xl font-bold text-yellow-600">{lateEmployees}</p>
              </div>
              <div className={`p-3 rounded-full ${
                theme === 'dark' ? 'bg-yellow-900/50' : 'bg-yellow-100'
              }`}>
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className={`rounded-lg shadow p-6 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Attendance Rate
                </p>
                <p className="text-2xl font-bold text-purple-600">{attendanceRate}%</p>
              </div>
              <div className={`p-3 rounded-full ${
                theme === 'dark' ? 'bg-purple-900/50' : 'bg-purple-100'
              }`}>
                <BarChart3 className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className={`rounded-lg shadow mb-6 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className={`p-6 border-b ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-400'
                }`} size={20} />
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' 
                      : 'border-gray-300 text-gray-900'
                  }`}
                />
              </div>
            </div>
            <div className="flex space-x-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={`border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-gray-100' 
                    : 'border-gray-300 text-gray-900'
                }`}
              >
                <option value="All">All Status</option>
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="Late">Late</option>
                <option value="Partial">Partial</option>
              </select>
              
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className={`border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-gray-100' 
                    : 'border-gray-300 text-gray-900'
                }`}
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>

              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`border px-3 py-2 rounded-lg flex items-center space-x-2 ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600' 
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Filter size={16} />
                <span>More Filters</span>
              </button>
              
              <button 
                onClick={exportToCSV}
                className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
              >
                <Download size={16} />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className={`mt-4 p-4 rounded-lg ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Date Range
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="date"
                      value={dateRange.start}
                      onChange={(e) => setDateRange(prev => ({...prev, start: e.target.value}))}
                      className={`flex-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        theme === 'dark' 
                          ? 'bg-gray-600 border-gray-500 text-gray-100' 
                          : 'border-gray-300 text-gray-900'
                      }`}
                    />
                    <input
                      type="date"
                      value={dateRange.end}
                      onChange={(e) => setDateRange(prev => ({...prev, end: e.target.value}))}
                      className={`flex-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        theme === 'dark' 
                          ? 'bg-gray-600 border-gray-500 text-gray-100' 
                          : 'border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Location
                  </label>
                  <select className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    theme === 'dark' 
                      ? 'bg-gray-600 border-gray-500 text-gray-100' 
                      : 'border-gray-300 text-gray-900'
                  }`}>
                    <option value="All">All Locations</option>
                    <option value="Office">Office</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Overtime
                  </label>
                  <select className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    theme === 'dark' 
                      ? 'bg-gray-600 border-gray-500 text-gray-100' 
                      : 'border-gray-300 text-gray-900'
                  }`}>
                    <option value="All">All</option>
                    <option value="With Overtime">With Overtime</option>
                    <option value="Without Overtime">Without Overtime</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Attendance Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Employee
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Department
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Check In
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Check Out
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Work Hours
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Status
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Location
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${
              theme === 'dark' ? 'divide-gray-600 bg-gray-800' : 'divide-gray-200 bg-white'
            }`}>
              {filteredData.map((record) => {
                const employee = getEmployeeDetails(record.employeeId);
                return (
                  <tr key={record.id} className={theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'
                          }`}>
                            <span className={`text-sm font-medium ${
                              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              {employee.name?.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className={`text-sm font-medium ${
                            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                          }`}>
                            {employee.name}
                          </div>
                          <div className={`text-sm ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {record.employeeId}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm ${
                        theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      }`}>
                        {employee.department}
                      </div>
                      <div className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {employee.position}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm flex items-center ${
                        theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      }`}>
                        {record.checkIn ? (
                          <>
                            <Clock size={16} className={`mr-2 ${
                              theme === 'dark' ? 'text-green-400' : 'text-green-500'
                            }`} />
                            {record.checkIn}
                          </>
                        ) : (
                          <span className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}>
                            -- : --
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm flex items-center ${
                        theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      }`}>
                        {record.checkOut ? (
                          <>
                            <Clock size={16} className={`mr-2 ${
                              theme === 'dark' ? 'text-red-400' : 'text-red-500'
                            }`} />
                            {record.checkOut}
                          </>
                        ) : (
                          <span className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}>
                            -- : --
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm ${
                        theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      }`}>
                        {record.workHours}
                      </div>
                      {record.overtime !== '-- --' && record.overtime !== '0h 00m' && (
                        <div className={`text-xs ${
                          theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
                        }`}>
                          OT: {record.overtime}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                        {getStatusIcon(record.status)}
                        <span className="ml-1">
                          {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                        </span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`flex items-center text-sm ${
                        theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      }`}>
                        <MapPin size={16} className={`mr-1 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-400'
                        }`} />
                        {record.location || 'N/A'}
                      </div>
                      {record.notes && (
                        <div className={`text-xs ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {record.notes}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => editAttendance(record.employeeId)}
                          className={theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-900'}
                        >
                          <Edit size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredData.length === 0 && (
            <div className="text-center py-12">
              <Users className={`mx-auto h-12 w-12 ${
                theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
              }`} />
              <h3 className={`mt-2 text-sm font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-900'
              }`}>
                No attendance records found
              </h3>
              <p className={`mt-1 text-sm ${
                theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
              }`}>
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Mark Attendance Modal */}
      {showMarkModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className={`relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md ${
            theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-medium ${
                  theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  Mark Attendance
                </h3>
                <button
                  onClick={() => setShowMarkModal(false)}
                  className={theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'}
                >
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Employee
                  </label>
                  <select 
                    value={markAttendanceData.employeeId}
                    onChange={(e) => setMarkAttendanceData(prev => ({...prev, employeeId: e.target.value}))}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-gray-100' 
                        : 'border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="">Select employee</option>
                    {employees.map(emp => (
                      <option key={emp.id} value={emp.id}>
                        {emp.name} ({emp.employeeId})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Status
                  </label>
                  <select 
                    value={markAttendanceData.status}
                    onChange={(e) => setMarkAttendanceData(prev => ({...prev, status: e.target.value}))}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-gray-100' 
                        : 'border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                    <option value="late">Late</option>
                    <option value="partial">Partial Day</option>
                  </select>
                </div>
                
                {markAttendanceData.status !== 'absent' && (
                  <>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Check In Time
                      </label>
                      <input
                        type="time"
                        value={markAttendanceData.checkIn}
                        onChange={(e) => setMarkAttendanceData(prev => ({...prev, checkIn: e.target.value}))}
                        className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          theme === 'dark' 
                            ? 'bg-gray-700 border-gray-600 text-gray-100' 
                            : 'border-gray-300 text-gray-900'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Check Out Time
                      </label>
                      <input
                        type="time"
                        value={markAttendanceData.checkOut}
                        onChange={(e) => setMarkAttendanceData(prev => ({...prev, checkOut: e.target.value}))}
                        className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          theme === 'dark' 
                            ? 'bg-gray-700 border-gray-600 text-gray-100' 
                            : 'border-gray-300 text-gray-900'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Location
                      </label>
                      <select 
                        value={markAttendanceData.location}
                        onChange={(e) => setMarkAttendanceData(prev => ({...prev, location: e.target.value}))}
                        className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          theme === 'dark' 
                            ? 'bg-gray-700 border-gray-600 text-gray-100' 
                            : 'border-gray-300 text-gray-900'
                        }`}
                      >
                        <option value="Office">Office</option>
                        <option value="Remote">Remote</option>
                        <option value="Client Site">Client Site</option>
                      </select>
                    </div>
                  </>
                )}
                
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Notes (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={markAttendanceData.notes}
                    onChange={(e) => setMarkAttendanceData(prev => ({...prev, notes: e.target.value}))}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' 
                        : 'border-gray-300 text-gray-900'
                    }`}
                    placeholder="Add any notes or remarks"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowMarkModal(false)}
                  className={`border px-4 py-2 rounded-lg ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600' 
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={markAttendance}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  {markAttendanceData.employeeId ? 'Update' : 'Mark'} Attendance
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceManagement;