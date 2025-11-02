// attendanceStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Importing Mock HRM data and helper functions
// import { HRMData, HRMHelpers } from '../data/HRMData';

// Uncomment below lines if mock data is not used
const HRMData = { attendance: [], employees: [] };
const HRMHelpers = {};

// Explicit user objects for authentication (same as payrollStore)
const mockAuthUsers = {
  super_admin: {
    role: 'super_admin',
    department: 'Human Resources',
    employeeId: '5',
    employee_info: {
      role: 'super_admin',
      department: 'Human Resources',
      id: 5
    }
  },
  admin: {
    role: 'admin',
    department: 'Engineering',
    employeeId: '2',
    employee_info: {
      role: 'admin',
      department: 'Engineering',
      id: 2
    }
  },
  manager: {
    role: 'manager',
    department: 'Design',
    employeeId: '3',
    employee_info: {
      role: 'manager',
      department: 'Design',
      id: 3
    }
  },
  employee: {
    role: 'employee',
    department: 'Engineering',
    employeeId: '1',
    employee_info: {
      role: 'employee',
      department: 'Engineering',
      id: 1
    }
  }
};

// Current user - change this to test different roles
let CURRENT_USER = mockAuthUsers.super_admin; // Change to admin, manager, or employee

// Helper function to get user info from mock auth system
const getUserInfoFromAuth = () => {
  try {
    return {
      employeeId: CURRENT_USER.employeeId || '',
      role: CURRENT_USER.role || 'employee',
      department: CURRENT_USER.department || '',
      userId: CURRENT_USER.employeeId // if needed
    };
  } catch (error) {
    console.error('Error reading auth info:', error);
    return null;
  }
};

// Mock API calls (commented for future use)
/*
const api = {
  getAttendance: (params) => {
    const queryString = new URLSearchParams(params).toString();
    return fetch(`/api/attendance?${queryString}`).then(res => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    });
  },
  
  markAttendance: (data) => fetch('/api/attendance', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => {
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  }),
  
  updateAttendance: (id, data) => fetch(`/api/attendance/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => {
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  }),
  
  getAttendanceReport: (params) => {
    const queryString = new URLSearchParams(params).toString();
    return fetch(`/api/attendance/report?${queryString}`).then(res => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    });
  }
};
*/

export const useAttendanceStore = create(
  persist(
    (set, get) => ({
      attendance: [],
      loading: false,
      error: null,
      selectedDate: new Date().toISOString().split('T')[0],
      attendanceByDate: {},
      
      // Helper function to get current user's role and department from mock auth
      getCurrentUserInfo: () => {
        const userInfo = getUserInfoFromAuth();
        if (!userInfo) {
          throw new Error('User not authenticated');
        }
        return userInfo;
      },
      
      // Helper to check if user can view attendance
      canViewAttendance: (targetEmployeeId = null, targetDepartment = null) => {
        try {
          const userInfo = get().getCurrentUserInfo();
          const { role, employeeId: userId, department: userDepartment } = userInfo;
          
          if (['super_admin', 'admin'].includes(role)) {
            return true;
          }
          
          if (role === 'manager') {
            if (targetEmployeeId) {
              // For managers, we'll rely on server-side validation for specific employees
              return true;
            }
            if (targetDepartment) {
              return targetDepartment === userDepartment;
            }
            return true; // Manager viewing their department's overall attendance
          }
          
          if (role === 'employee') {
            if (targetEmployeeId) {
              return targetEmployeeId === userId;
            }
            return false; // Employee cannot view department-wide attendance
          }
          
          return false;
        } catch (error) {
          return false;
        }
      },
      
      // Helper to check if user can modify attendance
      canModifyAttendance: (targetEmployeeId = null) => {
        try {
          const userInfo = get().getCurrentUserInfo();
          const { role, employeeId: userId, department: userDepartment } = userInfo;
          
          if (['super_admin', 'admin'].includes(role)) {
            return true;
          }
          
          if (role === 'manager') {
            if (targetEmployeeId) {
              // For managers modifying specific employees, rely on server validation
              return true;
            }
            return true; // Manager can modify attendance for their department
          }
          
          if (role === 'employee') {
            return targetEmployeeId === userId;
          }
          
          return false;
        } catch (error) {
          return false;
        }
      },
      
      // Helper to build query params based on user role
      buildQueryParams: (date, employeeId = null, department = null) => {
        const userInfo = get().getCurrentUserInfo();
        const { role, employeeId: userId, department: userDepartment } = userInfo;
        
        const params = { date };
        
        // Apply RBAC rules for query parameters
        if (employeeId) {
          // Check if user has permission to view this employee's attendance
          if (!get().canViewAttendance(employeeId)) {
            throw new Error('You do not have permission to view this employee\'s attendance');
          }
          params.employeeId = employeeId;
        } else if (department) {
          // Check if user has permission to view this department's attendance
          if (!get().canViewAttendance(null, department)) {
            throw new Error('You do not have permission to view this department\'s attendance');
          }
          params.department = department;
        } else {
          // Apply default filters based on role
          if (role === 'employee') {
            params.employeeId = userId;
          } else if (role === 'manager') {
            params.department = userDepartment;
          }
          // admin/super_admin can see everything without filters
        }
        
        return params;
      },

      // Get employees from HRMData with fallback
      getEmployeesFromHRMData: () => {
        try {
          if (HRMData?.employees && HRMData.employees.length > 0) {
            // console.log('Using HRMData employees:', HRMData.employees.length);
            return HRMData.employees;
          }
          
          // Fallback to empty array if no HRMData
          // console.log('No HRMData employees found, using empty array');
          return [];
        } catch (error) {
          console.warn('Error accessing HRMData employees:', error);
          return [];
        }
      },

      // Get attendance from HRMData with fallback
      getAttendanceFromHRMData: () => {
        try {
          if (HRMData?.attendance && HRMData.attendance.length > 0) {
            // console.log('Using HRMData attendance:', HRMData.attendance.length);
            return HRMData.attendance;
          }
          
          // Fallback to empty array if no HRMData
          // console.log('No HRMData attendance found, using empty array');
          return [];
        } catch (error) {
          console.warn('Error accessing HRMData attendance:', error);
          return [];
        }
      },

      // Find employee by ID with better matching
      findEmployeeById: (employeeId) => {
        const employees = get().getEmployeesFromHRMData();
        // console.log('All employees for search:', employees);
        
        if (employees.length === 0) {
          console.warn('No employees available for search');
          return null;
        }
        
        // Try different ways to match the employee ID
        const employee = employees.find(emp => {
          // Exact match
          if (emp.id === parseInt(employeeId)) return true;
          if (emp.id === employeeId) return true;
          
          // String comparison
          if (emp.id.toString() === employeeId.toString()) return true;
          
          // For string IDs
          if (typeof emp.id === 'string' && emp.id === employeeId) return true;
          
          return false;
        });
        
        if (!employee) {
          console.warn('Employee not found with ID:', employeeId, 'Available employees:', employees.map(e => ({ id: e.id, name: `${e.firstName} ${e.lastName}` })));
        }
        
        return employee;
      },
      
      fetchAttendance: async (date = null, employeeId = null, department = null) => {
        const targetDate = date || get().selectedDate;
        set({ loading: true, error: null, selectedDate: targetDate });
        
        try {
          // Check authentication first
          const userInfo = get().getCurrentUserInfo();
          if (!userInfo) {
            throw new Error('User not authenticated');
          }
          
          const params = get().buildQueryParams(targetDate, employeeId, department);
          
          // First, check if we have local data for this date
          const localAttendance = get().attendanceForDate(targetDate);
          const hasLocalData = localAttendance && localAttendance.length > 0;
          
          let finalAttendanceData = null;
          let dataSource = 'HRMData'; // Track where data came from
          
          // Step 1: Try localStorage first
          if (hasLocalData) {
            console.log('Loading from localStorage...');
            
            // Filter local data based on RBAC permissions and parameters
            let filteredLocalData = localAttendance;
            const { role, employeeId: userId, department: userDepartment } = userInfo;
            
            if (role === 'employee') {
              // Employee can only see their own data
              filteredLocalData = localAttendance.filter(record => record.employeeId === userId);
            } else if (role === 'manager') {
              // Manager can only see their department's data
              filteredLocalData = localAttendance.filter(record => record.department === userDepartment);
            }
            // Admin can see all local data (no filtering needed)
            
            // Apply additional filters from parameters
            if (employeeId) {
              filteredLocalData = filteredLocalData.filter(record => record.employeeId === employeeId);
            }
            if (department) {
              filteredLocalData = filteredLocalData.filter(record => record.department === department);
            }
            
            finalAttendanceData = filteredLocalData;
            dataSource = 'localStorage';
            
            // Set the data immediately from localStorage for fast UI response
            set({ 
              attendance: finalAttendanceData,
              selectedDate: targetDate,
              loading: false // Set loading false here for immediate display
            });
            
          } else {
            // Step 2: No local data available, try HRMData
            console.log('No local data, fetching from HRMData...');
            
            try {
              // Get attendance data from HRMData
              const hrmAttendance = get().getAttendanceFromHRMData();
              
              // Filter HRMData based on RBAC and parameters
              let filteredAttendance = hrmAttendance.filter(record => record.date === targetDate);
              
              const { role, employeeId: userId, department: userDepartment } = userInfo;
              
              if (role === 'employee') {
                filteredAttendance = filteredAttendance.filter(record => record.employeeId === userId);
              } else if (role === 'manager') {
                // For managers, we need to get employee department info
                const departmentEmployees = get().getEmployeesFromHRMData()
                  .filter(emp => emp.department === userDepartment)
                  .map(emp => emp.id.toString());
                
                filteredAttendance = filteredAttendance.filter(record => 
                  departmentEmployees.includes(record.employeeId)
                );
              }
              
              // Apply additional filters from parameters
              if (employeeId) {
                filteredAttendance = filteredAttendance.filter(record => record.employeeId === employeeId);
              }
              if (department) {
                const departmentEmployees = get().getEmployeesFromHRMData()
                  .filter(emp => emp.department === department)
                  .map(emp => emp.id.toString());
                
                filteredAttendance = filteredAttendance.filter(record => 
                  departmentEmployees.includes(record.employeeId)
                );
              }
              
              // Add department info to attendance records for local filtering
              const attendanceWithDepartment = filteredAttendance.map(record => {
                const employee = get().findEmployeeById(record.employeeId);
                return {
                  ...record,
                  department: employee?.department || 'Unknown'
                };
              });
              
              set({ 
                attendance: attendanceWithDepartment,
                selectedDate: targetDate,
                loading: false 
              });
              
              // Update localStorage with HRMData
              const allAttendance = get().allAttendance || {};
              allAttendance[targetDate] = attendanceWithDepartment;
              set({ allAttendance });
              
              finalAttendanceData = attendanceWithDepartment;
              dataSource = 'HRMData';
              
            } catch (hrmError) {
              // Both localStorage and HRMData failed
              throw new Error(`No local data available and HRMData unavailable: ${hrmError.message}`);
            }
          }
          
          // Log the data source for debugging
          // console.log(`Attendance data loaded from: ${dataSource}`);
          
        } catch (error) {
          // Final fallback - if both localStorage and HRMData fail
          set({ 
            attendance: [],
            selectedDate: targetDate,
            loading: false,
            error: error.message 
          });
        }
      },

      // Helper to get attendance for a specific date from stored data
      attendanceForDate: (date) => {
        const allAttendance = get().allAttendance || {};
        return allAttendance[date] || [];
      },
      
      // Mark attendance actions with RBAC
      markPresent: async (employeeId, checkInTime = null) => {
        const { selectedDate, attendance } = get();
        const userInfo = get().getCurrentUserInfo();
        
        // RBAC validation
        if (!get().canModifyAttendance(employeeId)) {
          throw new Error('You do not have permission to mark attendance for this employee');
        }
        
        const checkIn = checkInTime || new Date().toISOString();
        
        // Check if attendance already exists for this employee on this date
        const existingIndex = attendance.findIndex(
          record => record.employeeId === employeeId && 
                   record.date === selectedDate
        );
        
        let updatedAttendance;
        let recordToSave;
        
        if (existingIndex >= 0) {
          // Update existing record
          updatedAttendance = [...attendance];
          recordToSave = {
            ...updatedAttendance[existingIndex],
            status: 'present',
            checkIn,
            updatedAt: new Date().toISOString()
          };
          updatedAttendance[existingIndex] = recordToSave;
        } else {
          // Get employee info for department
          const employee = get().findEmployeeById(employeeId);
          
          // Create new record with department info for local filtering
          recordToSave = {
            id: `att-${Date.now()}`,
            employeeId,
            date: selectedDate,
            status: 'present',
            checkIn,
            checkOut: null,
            department: employee?.department || userInfo.department, // Store department for local filtering
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          updatedAttendance = [...attendance, recordToSave];
        }
        
        // Update state
        set({ attendance: updatedAttendance });
        
        // Save to localStorage with proper filtering based on role
        const allAttendance = get().allAttendance || {};
        const { role, employeeId: userId } = userInfo;
        
        if (role === 'employee') {
          // Employees can only store their own data
          const filteredAttendance = updatedAttendance.filter(
            record => record.employeeId === userId
          );
          allAttendance[selectedDate] = filteredAttendance;
        } else if (role === 'manager') {
          // Managers can only store their department's data
          const filteredAttendance = updatedAttendance.filter(
            record => record.department === userInfo.department
          );
          allAttendance[selectedDate] = filteredAttendance;
        } else {
          // Admins can store all data
          allAttendance[selectedDate] = updatedAttendance;
        }
        
        set({ allAttendance });
        
        // Also update HRMData if available
        try {
          if (HRMData?.attendance) {
            const existingIndexHRM = HRMData.attendance.findIndex(
              record => record.employeeId === employeeId && record.date === selectedDate
            );
            
            if (existingIndexHRM >= 0) {
              HRMData.attendance[existingIndexHRM] = recordToSave;
            } else {
              HRMData.attendance.push(recordToSave);
            }
            console.log('Updated HRMData attendance');
          }
        } catch (error) {
          console.error('Failed to update HRMData:', error);
        }
        
        return recordToSave;
      },
      
      markAbsent: async (employeeId) => {
        const { selectedDate, attendance } = get();
        const userInfo = get().getCurrentUserInfo();
        
        // RBAC validation
        if (!get().canModifyAttendance(employeeId)) {
          throw new Error('You do not have permission to mark attendance for this employee');
        }
        
        // Check if attendance already exists for this employee on this date
        const existingIndex = attendance.findIndex(
          record => record.employeeId === employeeId && 
                   record.date === selectedDate
        );
        
        let updatedAttendance;
        let recordToSave;
        
        if (existingIndex >= 0) {
          updatedAttendance = [...attendance];
          recordToSave = {
            ...updatedAttendance[existingIndex],
            status: 'absent',
            checkIn: null,
            checkOut: null,
            updatedAt: new Date().toISOString()
          };
          updatedAttendance[existingIndex] = recordToSave;
        } else {
          // Get employee info for department
          const employee = get().findEmployeeById(employeeId);
          
          recordToSave = {
            id: `att-${Date.now()}`,
            employeeId,
            date: selectedDate,
            status: 'absent',
            checkIn: null,
            checkOut: null,
            department: employee?.department || userInfo.department,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          updatedAttendance = [...attendance, recordToSave];
        }
        
        // Update state
        set({ attendance: updatedAttendance });
        
        // Save to localStorage with role-based filtering
        const allAttendance = get().allAttendance || {};
        const { role, employeeId: userId } = userInfo;
        
        if (role === 'employee') {
          const filteredAttendance = updatedAttendance.filter(
            record => record.employeeId === userId
          );
          allAttendance[selectedDate] = filteredAttendance;
        } else if (role === 'manager') {
          const filteredAttendance = updatedAttendance.filter(
            record => record.department === userInfo.department
          );
          allAttendance[selectedDate] = filteredAttendance;
        } else {
          allAttendance[selectedDate] = updatedAttendance;
        }
        
        set({ allAttendance });
        
        // Also update HRMData if available
        try {
          if (HRMData?.attendance) {
            const existingIndexHRM = HRMData.attendance.findIndex(
              record => record.employeeId === employeeId && record.date === selectedDate
            );
            
            if (existingIndexHRM >= 0) {
              HRMData.attendance[existingIndexHRM] = recordToSave;
            } else {
              HRMData.attendance.push(recordToSave);
            }
            console.log('Updated HRMData attendance');
          }
        } catch (error) {
          console.error('Failed to update HRMData:', error);
        }
        
        return recordToSave;
      },
      
      markLate: async (employeeId, checkInTime = null) => {
        const { selectedDate, attendance } = get();
        const userInfo = get().getCurrentUserInfo();
        
        // RBAC validation
        if (!get().canModifyAttendance(employeeId)) {
          throw new Error('You do not have permission to mark attendance for this employee');
        }
        
        const checkIn = checkInTime || new Date().toISOString();
        
        const existingIndex = attendance.findIndex(
          record => record.employeeId === employeeId && 
                   record.date === selectedDate
        );
        
        let updatedAttendance;
        let recordToSave;
        
        if (existingIndex >= 0) {
          updatedAttendance = [...attendance];
          recordToSave = {
            ...updatedAttendance[existingIndex],
            status: 'late',
            checkIn,
            updatedAt: new Date().toISOString()
          };
          updatedAttendance[existingIndex] = recordToSave;
        } else {
          // Get employee info for department
          const employee = get().findEmployeeById(employeeId);
          
          recordToSave = {
            id: `att-${Date.now()}`,
            employeeId,
            date: selectedDate,
            status: 'late',
            checkIn,
            checkOut: null,
            department: employee?.department || userInfo.department,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          updatedAttendance = [...attendance, recordToSave];
        }
        
        set({ attendance: updatedAttendance });
        
        const allAttendance = get().allAttendance || {};
        const { role, employeeId: userId } = userInfo;
        
        if (role === 'employee') {
          const filteredAttendance = updatedAttendance.filter(
            record => record.employeeId === userId
          );
          allAttendance[selectedDate] = filteredAttendance;
        } else if (role === 'manager') {
          const filteredAttendance = updatedAttendance.filter(
            record => record.department === userInfo.department
          );
          allAttendance[selectedDate] = filteredAttendance;
        } else {
          allAttendance[selectedDate] = updatedAttendance;
        }
        
        set({ allAttendance });
        
        // Also update HRMData if available
        try {
          if (HRMData?.attendance) {
            const existingIndexHRM = HRMData.attendance.findIndex(
              record => record.employeeId === employeeId && record.date === selectedDate
            );
            
            if (existingIndexHRM >= 0) {
              HRMData.attendance[existingIndexHRM] = recordToSave;
            } else {
              HRMData.attendance.push(recordToSave);
            }
            console.log('Updated HRMData attendance');
          }
        } catch (error) {
          console.error('Failed to update HRMData:', error);
        }
        
        return recordToSave;
      },
      
      checkOut: async (attendanceId, checkOutTime = null) => {
        const { selectedDate, attendance } = get();
        const userInfo = get().getCurrentUserInfo();
        const checkOut = checkOutTime || new Date().toISOString();
        
        // Find the record to update
        const recordIndex = attendance.findIndex(record => record.id === attendanceId);
        
        if (recordIndex === -1) {
          throw new Error('Attendance record not found');
        }
        
        const record = attendance[recordIndex];
        
        // RBAC validation - users can only check out their own attendance
        if (!get().canModifyAttendance(record.employeeId)) {
          throw new Error('You do not have permission to check out this attendance');
        }
        
        const updatedAttendance = [...attendance];
        const recordToSave = {
          ...updatedAttendance[recordIndex],
          checkOut,
          updatedAt: new Date().toISOString()
        };
        updatedAttendance[recordIndex] = recordToSave;
        
        set({ attendance: updatedAttendance });
        
        const allAttendance = get().allAttendance || {};
        allAttendance[selectedDate] = updatedAttendance;
        set({ allAttendance });
        
        // Also update HRMData if available
        try {
          if (HRMData?.attendance) {
            const existingIndexHRM = HRMData.attendance.findIndex(
              record => record.id === attendanceId
            );
            
            if (existingIndexHRM >= 0) {
              HRMData.attendance[existingIndexHRM] = recordToSave;
            }
            console.log('Updated HRMData attendance');
          }
        } catch (error) {
          console.error('Failed to update HRMData:', error);
        }
        
        return recordToSave;
      },
      
      cleanAttendanceData: () => {
        set(state => ({
          attendance: state.attendance.filter(record => 
            record !== null && record !== undefined && typeof record === 'object'
          )
        }));
      },
      
      // Enhanced report fetching with RBAC
      fetchAttendanceReport: async (startDate, endDate, department = null, employeeId = null) => {
        set({ loading: true, error: null });
        
        try {
          const userInfo = get().getCurrentUserInfo();
          const { role, employeeId: userId, department: userDepartment } = userInfo;
          
          // RBAC validation for report parameters
          if (role === 'employee') {
            if (department || (employeeId && employeeId !== userId)) {
              throw new Error('You can only view your own attendance report');
            }
            employeeId = userId; // Force employee to view only their data
          }
          
          if (role === 'manager' && department && department !== userDepartment) {
            throw new Error('You can only view reports for your own department');
          }
          
          // Try to generate report from HRMData with RBAC
          try {
            const userInfo = get().getCurrentUserInfo();
            const { role, employeeId: userId, department: userDepartment } = userInfo;
            const hrmAttendance = get().getAttendanceFromHRMData();
            const report = [];
            
            const start = new Date(startDate);
            const end = new Date(endDate);
            
            // Filter HRMData attendance by date range
            const dateFilteredAttendance = hrmAttendance.filter(record => {
              const recordDate = new Date(record.date);
              return recordDate >= start && recordDate <= end;
            });
            
            // Apply RBAC filters to HRM data
            let filteredAttendance = dateFilteredAttendance;
            
            if (role === 'employee') {
              filteredAttendance = dateFilteredAttendance.filter(record => record.employeeId === userId);
            } else if (role === 'manager') {
              // For managers, filter by department employees
              const departmentEmployees = get().getEmployeesFromHRMData()
                .filter(emp => emp.department === userDepartment)
                .map(emp => emp.id.toString());
              
              filteredAttendance = dateFilteredAttendance.filter(record => 
                departmentEmployees.includes(record.employeeId)
              );
            }
            
            // Apply additional filters
            if (department) {
              const departmentEmployees = get().getEmployeesFromHRMData()
                .filter(emp => emp.department === department)
                .map(emp => emp.id.toString());
              
              filteredAttendance = filteredAttendance.filter(record => 
                departmentEmployees.includes(record.employeeId)
              );
            }
            if (employeeId) {
              filteredAttendance = filteredAttendance.filter(record => record.employeeId === employeeId);
            }
            
            // Add department info to records
            const reportWithDepartment = filteredAttendance.map(record => {
              const employee = get().findEmployeeById(record.employeeId);
              return {
                ...record,
                department: employee?.department || 'Unknown'
              };
            });
            
            set({ loading: false });
            return reportWithDepartment;
          } catch (hrmError) {
            throw new Error(`HRMData unavailable: ${hrmError.message}`);
          }
          
        } catch (error) {
          set({ error: error.message, loading: false });
          throw error;
        }
      },
      
      // Get attendance statistics for dashboard
      getAttendanceStats: (date = null) => {
        const targetDate = date || get().selectedDate;
        const attendance = get().attendanceForDate(targetDate);
        const userInfo = get().getCurrentUserInfo();
        
        if (!userInfo) return null;
        
        const { role, employeeId: userId, department: userDepartment } = userInfo;
        
        // Filter attendance based on user role
        let filteredAttendance = attendance;
        if (role === 'employee') {
          filteredAttendance = attendance.filter(record => record.employeeId === userId);
        } else if (role === 'manager') {
          filteredAttendance = attendance.filter(record => record.department === userDepartment);
        }
        
        const stats = {
          total: filteredAttendance.length,
          present: filteredAttendance.filter(record => record.status === 'present').length,
          absent: filteredAttendance.filter(record => record.status === 'absent').length,
          late: filteredAttendance.filter(record => record.status === 'late').length,
          checkedIn: filteredAttendance.filter(record => record.checkIn && !record.checkOut).length,
        };
        
        return stats;
      },

      // Change current user role for testing (same as payrollStore)
      setCurrentUser: (userRole) => {
        if (mockAuthUsers[userRole]) {
          CURRENT_USER = mockAuthUsers[userRole];
          console.log('User changed to:', CURRENT_USER);
          return true;
        }
        console.warn('Invalid user role:', userRole);
        return false;
      },

      // Get current user role for UI display
      getCurrentUserRole: () => {
        return CURRENT_USER.role;
      },

      // Reset attendance data (useful for testing)
      resetAttendanceData: () => {
        set({
          attendance: [],
          selectedDate: new Date().toISOString().split('T')[0],
          allAttendance: {}
        });
      }
    }),
    {
      name: 'attendance-storage',
      partialize: (state) => ({ 
        allAttendance: state.allAttendance || {} 
      }),
    }
  )
);