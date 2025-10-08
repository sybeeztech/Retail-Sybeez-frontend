import React, { useState, useEffect } from 'react';
import { useAttendanceStore } from '../../store/attendanceStore';
import { useEmployeeStore } from '../../store/employeeStore';
import { useDepartmentStore } from '../../store/departmentStore';
import { useNavigate } from 'react-router-dom';

const DailyAttendance = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [manualCheckInTime, setManualCheckInTime] = useState('');
  const [manualCheckOutTime, setManualCheckOutTime] = useState('');
  const [showManualTimeModal, setShowManualTimeModal] = useState(false);
  const [currentAction, setCurrentAction] = useState({ type: '', employeeId: '', attendanceId: '' });

  const { 
    attendance, 
    loading, 
    error, 
    selectedDate,
    fetchAttendance, 
    markPresent, 
    markAbsent, 
    markLate, 
    checkOut,
    canViewAttendance,
    canModifyAttendance,
    getCurrentUserInfo
  } = useAttendanceStore();

  const { employees, fetchEmployees } = useEmployeeStore();
  const { departments, fetchDepartments } = useDepartmentStore();
  const navigate = useNavigate();

  // Get current user info for RBAC
  const [userInfo, setUserInfo] = useState(null);
  const [userPermissions, setUserPermissions] = useState({
    canViewAll: false,
    canModifyAll: false,
    canViewDepartment: false,
    canModifyDepartment: false,
    canViewOwn: false,
    canModifyOwn: false
  });

  useEffect(() => {
    const initializeUser = async () => {
    // Initialize user info and permissions
    try {
      const currentUserInfo = getCurrentUserInfo();
      // setUserInfo(currentUserInfo);

      // Only update state if user info has changed
      if (JSON.stringify(currentUserInfo) !== JSON.stringify(userInfo)) {
        setUserInfo(currentUserInfo);
      
      const permissions = {
        canViewAll: ['super_admin', 'admin'].includes(currentUserInfo.role),
        canModifyAll: ['super_admin', 'admin'].includes(currentUserInfo.role),
        canViewDepartment: currentUserInfo.role === 'manager',
        canModifyDepartment: currentUserInfo.role === 'manager',
        canViewOwn: currentUserInfo.role === 'employee',
        canModifyOwn: currentUserInfo.role === 'employee'
      };
      setUserPermissions(permissions);
    }
    } catch (error) {
      console.error('Error getting user info:', error);
      navigate('/login'); // Redirect to login if not authenticated
      return;
    }
  };

    initializeUser();
    fetchEmployees();
    fetchDepartments();
    
    // Fetch attendance based on user role
    if (userPermissions.canViewAll) {
      fetchAttendance(selectedDate);
    } else if (userPermissions.canViewDepartment && userInfo) {
      fetchAttendance(selectedDate, null, userInfo.department);
    } else if (userPermissions.canViewOwn && userInfo) {
      fetchAttendance(selectedDate, userInfo.employeeId);
    }
  }, [fetchEmployees, fetchDepartments, fetchAttendance, selectedDate, userInfo, userPermissions, navigate, getCurrentUserInfo]);

  // Filter employees based on user permissions
  const getFilteredEmployees = () => {
    if (!userInfo) return [];
    
    if (userPermissions.canViewAll) {
      return employees;
    } else if (userPermissions.canViewDepartment) {
      return employees.filter(emp => emp.department === userInfo.department);
    } else if (userPermissions.canViewOwn) {
      return employees.filter(emp => emp.id === userInfo.employeeId);
    }
    return [];
  };

  const filteredEmployees = getFilteredEmployees();

  // Combine employee data with attendance records
  const attendanceWithEmployeeData = attendance.map(record => {
    const employee = filteredEmployees.find(emp => emp.id === record.employeeId);
    return {
      ...record,
      employee: employee || {}
    };
  }).filter(record => record.employee.id); // Remove records without employee data

  // Get employees who haven't been marked for attendance today (based on permissions)
  const unmarkedEmployees = filteredEmployees.filter(employee => 
    !attendance.some(record => record.employeeId === employee.id)
  );

  // Filter based on search term, department, and status
  const filteredAttendance = attendanceWithEmployeeData.filter(item => {
    const matchesSearch = 
      `${item.employee.firstName || ''} ${item.employee.lastName || ''}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (item.employee.position || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = 
      !selectedDepartment || item.employee.department === selectedDepartment;
    
    const matchesStatus = 
      !selectedStatus || 
      (selectedStatus === 'notmarked' ? !item.status : item.status === selectedStatus);
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const handleDateChange = (newDate) => {
    if (userPermissions.canViewAll) {
      fetchAttendance(newDate);
    } else if (userPermissions.canViewDepartment && userInfo) {
      fetchAttendance(newDate, null, userInfo.department);
    } else if (userPermissions.canViewOwn && userInfo) {
      fetchAttendance(newDate, userInfo.employeeId);
    }
  };

  const handleMarkPresent = async (employeeId, isManual = false) => {
    if (!canModifyAttendance(employeeId)) {
      alert('You do not have permission to mark attendance for this employee');
      return;
    }

    if (isManual) {
      setCurrentAction({ type: 'present', employeeId });
      setShowManualTimeModal(true);
    } else {
      await markPresent(employeeId);
    }
  };

  const handleMarkLate = async (employeeId, isManual = false) => {
    if (!canModifyAttendance(employeeId)) {
      alert('You do not have permission to mark attendance for this employee');
      return;
    }

    if (isManual) {
      setCurrentAction({ type: 'late', employeeId });
      setShowManualTimeModal(true);
    } else {
      await markLate(employeeId);
    }
  };

  const handleMarkAbsent = async (employeeId) => {
    if (!canModifyAttendance(employeeId)) {
      alert('You do not have permission to mark attendance for this employee');
      return;
    }
    await markAbsent(employeeId);
  };

  const handleCheckOut = async (attendanceId, isManual = false) => {
    const attendanceRecord = attendance.find(record => record.id === attendanceId);
    if (!attendanceRecord) return;

    if (!canModifyAttendance(attendanceRecord.employeeId)) {
      alert('You do not have permission to check out this employee');
      return;
    }

    if (isManual) {
      setCurrentAction({ type: 'checkout', attendanceId });
      setShowManualTimeModal(true);
    } else {
      await checkOut(attendanceId);
    }
  };

  const handleManualTimeSubmit = async () => {
    const { type, employeeId, attendanceId } = currentAction;
    const timeValue = type === 'checkout' ? manualCheckOutTime : manualCheckInTime;
    
    if (!timeValue) {
      alert('Please select a time');
      return;
    }

    try {
      if (type === 'present') {
        await markPresent(employeeId, `${selectedDate}T${timeValue}`);
      } else if (type === 'late') {
        await markLate(employeeId, `${selectedDate}T${timeValue}`);
      } else if (type === 'checkout') {
        await checkOut(attendanceId, `${selectedDate}T${timeValue}`);
      }
      
      setShowManualTimeModal(false);
      setManualCheckInTime('');
      setManualCheckOutTime('');
    } catch (error) {
      console.error('Failed to update attendance:', error);
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      present: 'bg-green-100 text-green-800',
      absent: 'bg-red-100 text-red-800',
      late: 'bg-yellow-100 text-yellow-800',
      halfday: 'bg-blue-100 text-blue-800'
    };
    
    return (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>
        {status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Not Marked'}
      </span>
    );
  };

  const formatTime = (timeString) => {
    if (!timeString) return '-';
    const time = new Date(timeString);
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Enhanced action buttons with RBAC
  const ActionButtons = ({ record, isUnmarked = false }) => {
    const canModifyThisRecord = canModifyAttendance(record.employeeId || record.id);

    if (!canModifyThisRecord) {
      return (
        <span className="text-xs text-gray-500">No permission</span>
      );
    }

    if (isUnmarked) {
      return (
        <div className="flex flex-wrap gap-1">
          <button
            onClick={() => handleMarkPresent(record.id)}
            className="text-green-600 hover:text-green-900 text-xs px-2 py-1 border border-green-200 rounded"
            title="Mark Present"
          >
            Present
          </button>
          <button
            onClick={() => handleMarkPresent(record.id, true)}
            className="text-gray-600 hover:text-gray-900 text-xs px-1"
            title="Manual Check-In"
          >
            (Manual)
          </button>
          <button
            onClick={() => handleMarkLate(record.id)}
            className="text-yellow-600 hover:text-yellow-900 text-xs px-2 py-1 border border-yellow-200 rounded"
            title="Mark Late"
          >
            Late
          </button>
          <button
            onClick={() => handleMarkAbsent(record.id)}
            className="text-red-600 hover:text-red-900 text-xs px-2 py-1 border border-red-200 rounded"
            title="Mark Absent"
          >
            Absent
          </button>
        </div>
      );
    }

    if (!record.checkOut && record.status !== 'absent') {
      return (
        <div className="flex flex-wrap gap-1">
          <button
            onClick={() => handleCheckOut(record.id)}
            className="text-blue-600 hover:text-blue-900 text-xs px-2 py-1 border border-blue-200 rounded"
            title="Check Out"
          >
            Check-Out
          </button>
          <button
            onClick={() => handleCheckOut(record.id, true)}
            className="text-gray-600 hover:text-gray-900 text-xs px-1"
            title="Manual Check-Out"
          >
            (Manual)
          </button>
        </div>
      );
    }

    if (record.status === 'absent') {
      return (
        <button
          onClick={() => handleMarkPresent(record.employeeId)}
          className="text-green-600 hover:text-green-900 text-xs px-2 py-1 border border-green-200 rounded"
          title="Mark Present"
        >
          Mark Present
        </button>
      );
    }

    return null;
  };

  // Department filter options based on permissions
  const getDepartmentOptions = () => {
    if (userPermissions.canViewAll) {
      return departments;
    } else if (userPermissions.canViewDepartment && userInfo) {
      return departments.filter(dept => dept.name === userInfo.department);
    }
    return [];
  };

  const departmentOptions = getDepartmentOptions();

  if (!userInfo) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="text-gray-500">Loading user information...</div>
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

  if (error) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Daily Attendance</h2>
          <p className="text-sm text-gray-600 mt-1">
            {userPermissions.canViewAll && 'Viewing all employees'}
            {userPermissions.canViewDepartment && `Viewing ${userInfo.department} department`}
            {userPermissions.canViewOwn && 'Viewing your attendance'}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => handleDateChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Role-based information banner */}
      {userPermissions.canViewOwn && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                You can only view and modify your own attendance records.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Filters - Only show if user has appropriate permissions */}
      {(userPermissions.canViewAll || userPermissions.canViewDepartment) && (
        <div className="bg-white rounded-lg shadow mb-6 p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input 
                type="text" 
                placeholder="Search by name or position..." 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={departmentOptions.length <= 1}
              >
                <option value="">All Departments</option>
                {departmentOptions.map(dept => (
                  <option key={dept.id} value={dept.name}>{dept.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Status</option>
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="late">Late</option>
                <option value="notmarked">Not Marked</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedDepartment('');
                  setSelectedStatus('');
                }}
                className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Statistics Summary */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm font-medium text-gray-500">Total Employees</div>
          <div className="text-2xl font-bold">{filteredEmployees.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm font-medium text-gray-500">Present</div>
          <div className="text-2xl font-bold text-green-600">
            {attendance.filter(a => a.status === 'present').length}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm font-medium text-gray-500">Absent</div>
          <div className="text-2xl font-bold text-red-600">
            {attendance.filter(a => a.status === 'absent').length}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm font-medium text-gray-500">Late</div>
          <div className="text-2xl font-bold text-yellow-600">
            {attendance.filter(a => a.status === 'late').length}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm font-medium text-gray-500">Not Marked</div>
          <div className="text-2xl font-bold text-gray-600">
            {unmarkedEmployees.length}
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="mt-6 bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                {(userPermissions.canViewAll || userPermissions.canViewDepartment) && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                )}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-In</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-Out</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAttendance.map(record => (
                <tr key={record.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img 
                          onClick={() => navigate(`/employees/${record.employee.id}/attendance`)}
                          className="h-10 w-10 rounded-full object-cover cursor-pointer" 
                          src={record.employee.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'} 
                          alt="" 
                        />
                      </div>
                      <div className="ml-4">
                        <div 
                          onClick={() => navigate(`/employees/${record.employee.id}/attendance`)}
                          className="text-sm font-medium text-gray-900 hover:text-blue-800 cursor-pointer"
                        >
                          {record.employee.firstName} {record.employee.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{record.employee.position}</div>
                      </div>
                    </div>
                  </td>
                  {(userPermissions.canViewAll || userPermissions.canViewDepartment) && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.employee.department}
                    </td>
                  )}
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
                    {record.checkIn && record.checkOut ? (
                      ((new Date(record.checkOut) - new Date(record.checkIn)) / (1000 * 60 * 60)).toFixed(1) + 'h'
                    ) : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <ActionButtons record={record} />
                  </td>
                </tr>
              ))}
              
              {/* Employees not yet marked - only show when user has appropriate permissions */}
              {(selectedStatus === '' || selectedStatus === 'notmarked') && 
                unmarkedEmployees
                  .filter(employee => {
                    const matchesSearch = 
                      `${employee.firstName || ''} ${employee.lastName || ''}`
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      (employee.position || '').toLowerCase().includes(searchTerm.toLowerCase());
                    
                    const matchesDepartment = 
                      !selectedDepartment || employee.department === selectedDepartment;
                    
                    return matchesSearch && matchesDepartment;
                  })
                  .map(employee => (
                    <tr key={employee.id} className="bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img 
                              onClick={() => navigate(`/employees/${employee.id}/attendance`)}
                              className="h-10 w-10 rounded-full object-cover cursor-pointer" 
                              src={employee.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'} 
                              alt="" 
                            />
                          </div>
                          <div className="ml-4">
                            <div 
                              onClick={() => navigate(`/employees/${employee.id}/attendance`)}
                              className="text-sm font-medium text-gray-900 hover:text-blue-800 cursor-pointer"
                            >
                              {employee.firstName} {employee.lastName}
                            </div>
                            <div className="text-sm text-gray-500">{employee.position}</div>
                          </div>
                        </div>
                      </td>
                      {(userPermissions.canViewAll || userPermissions.canViewDepartment) && (
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {employee.department}
                        </td>
                      )}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(null)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <ActionButtons record={employee} isUnmarked={true} />
                      </td>
                    </tr>
                  ))
              }
            </tbody>
          </table>
          
          {filteredAttendance.length === 0 && 
           (selectedStatus !== 'notmarked' || unmarkedEmployees.filter(employee => {
            const matchesSearch = 
              `${employee.firstName || ''} ${employee.lastName || ''}`
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            
            const matchesDepartment = 
              !selectedDepartment || employee.department === selectedDepartment;
            
            return matchesSearch && matchesDepartment;
          }).length === 0) && (
            <div className="text-center py-8">
              <p className="text-gray-500">
                {searchTerm || selectedDepartment || selectedStatus 
                  ? 'No employees match your filters' 
                  : 'No employees found'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Manual Time Modal */} 
      {showManualTimeModal && (
        <div className="fixed inset-0 bg-gray-900/75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Enter Manual Time</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentAction.type === 'checkout' ? 'Check-Out Time' : 'Check-In Time'}
              </label>
              <input
                type="time"
                value={currentAction.type === 'checkout' ? manualCheckOutTime : manualCheckInTime}
                onChange={(e) => {
                  if (currentAction.type === 'checkout') {
                    setManualCheckOutTime(e.target.value);
                  } else {
                    setManualCheckInTime(e.target.value);
                  }
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowManualTimeModal(false);
                  setManualCheckInTime('');
                  setManualCheckOutTime('');
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleManualTimeSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyAttendance;