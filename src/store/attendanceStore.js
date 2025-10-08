// attendanceStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Helper function to get user info from localStorage
const getUserInfoFromStorage = () => {
  try {
    const authStorage = localStorage.getItem('auth-storage');
    if (!authStorage) return null;
    
    const authState = JSON.parse(authStorage).state;
    if (!authState || !authState.user) return null;
    
    return {
      employeeId: authState.user.employeeId || '',
      role: authState.user.employee?.role || 'employee',
      department: authState.user.employee?.department || '',
      userId: authState.user.id // if needed
    };
  } catch (error) {
    console.error('Error reading auth storage:', error);
    return null;
  }
};

// Mock API calls for Mirage.js
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

export const useAttendanceStore = create(
  persist(
    (set, get) => ({
      attendance: [],
      loading: false,
      error: null,
      selectedDate: new Date().toISOString().split('T')[0],
      attendanceByDate: {},
      
      // Helper function to get current user's role and department from localStorage
      getCurrentUserInfo: () => {
        const userInfo = getUserInfoFromStorage();
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
          let dataSource = 'server'; // Track where data came from
          
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
            
            // Step 2: Then try to fetch from server in background to update data
            // commented for now in frontend
            // need to turn it on when backend is ready
            // try {
            //   const response = await api.getAttendance(params);
              
            //   // Only update if server data is different from local data
            //   if (JSON.stringify(response) !== JSON.stringify(localAttendance)) {
            //     set({ 
            //       attendance: response,
            //       selectedDate: targetDate
            //     });
                
            //     // Update localStorage with fresh server data
            //     const allAttendance = get().allAttendance || {};
            //     allAttendance[targetDate] = response;
            //     set({ allAttendance });
                
            //     dataSource = 'server'; // Data was updated from server
            //     console.log('Data updated from server');
            //   }
              
            // } catch (serverError) {
            //   // Server request failed, but we already have local data
            //   console.log('Server sync failed, but local data is available:', serverError.message);
            //   // No need to show error since we have local data
            // }
            
          } else {
            // Step 3: No local data available, try server
            console.log('No local data, fetching from server...');
            
            try {
              const response = await api.getAttendance(params);
              
              set({ 
                attendance: response,
                selectedDate: targetDate,
                loading: false 
              });
              
              // Update localStorage with fresh server data
              const allAttendance = get().allAttendance || {};
              allAttendance[targetDate] = response;
              set({ allAttendance });
              
              finalAttendanceData = response;
              dataSource = 'server';
              
            } catch (serverError) {
              // Both localStorage and server failed
              throw new Error(`No local data available and server unavailable: ${serverError.message}`);
            }
          }
          
          // Log the data source for debugging
          console.log(`Attendance data loaded from: ${dataSource}`);
          
        } catch (error) {
          // Final fallback - if both localStorage and server fail
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
          // Create new record with department info for local filtering
          recordToSave = {
            id: `att-${Date.now()}`,
            employeeId,
            date: selectedDate,
            status: 'present',
            checkIn,
            checkOut: null,
            department: userInfo.department, // Store department for local filtering
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
        
        // Also try to save to server
        try {
          if (existingIndex >= 0) {
            await api.updateAttendance(recordToSave.id, recordToSave);
          } else {
            await api.markAttendance(recordToSave);
          }
        } catch (error) {
          console.error('Failed to save to server:', error);
          // Even if server save fails, we keep the local data
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
          recordToSave = {
            id: `att-${Date.now()}`,
            employeeId,
            date: selectedDate,
            status: 'absent',
            checkIn: null,
            checkOut: null,
            department: userInfo.department,
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
        
        // Also try to save to server
        try {
          if (existingIndex >= 0) {
            await api.updateAttendance(recordToSave.id, recordToSave);
          } else {
            await api.markAttendance(recordToSave);
          }
        } catch (error) {
          console.error('Failed to save to server:', error);
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
          recordToSave = {
            id: `att-${Date.now()}`,
            employeeId,
            date: selectedDate,
            status: 'late',
            checkIn,
            checkOut: null,
            department: userInfo.department,
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
        
        try {
          if (existingIndex >= 0) {
            await api.updateAttendance(recordToSave.id, recordToSave);
          } else {
            await api.markAttendance(recordToSave);
          }
        } catch (error) {
          console.error('Failed to save to server:', error);
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
        
        try {
          await api.updateAttendance(attendanceId, { checkOut });
        } catch (error) {
          console.error('Failed to save to server:', error);
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
          
          const params = { startDate, endDate };
          if (department) params.department = department;
          if (employeeId) params.employeeId = employeeId;
          
          const response = await api.getAttendanceReport(params);
          let report = response.attendances || response.attendance || response;
          
          if (Array.isArray(report)) {
            report = report.filter(item => item !== null && item !== undefined);
          }
          
          set({ loading: false });
          return report;
        } catch (error) {
          // If server fails, try to generate report from local data with RBAC
          try {
            const userInfo = get().getCurrentUserInfo();
            const { role, employeeId: userId, department: userDepartment } = userInfo;
            const allAttendance = get().allAttendance || {};
            const report = [];
            
            const start = new Date(startDate);
            const end = new Date(endDate);
            
            for (let date in allAttendance) {
              const currentDate = new Date(date);
              if (currentDate >= start && currentDate <= end) {
                let dayAttendance = allAttendance[date];
                
                // Apply RBAC filters to local data
                if (role === 'employee') {
                  dayAttendance = dayAttendance.filter(record => record.employeeId === userId);
                } else if (role === 'manager') {
                  dayAttendance = dayAttendance.filter(record => record.department === userDepartment);
                }
                
                // Apply additional filters
                if (department) {
                  dayAttendance = dayAttendance.filter(record => record.department === department);
                }
                if (employeeId) {
                  dayAttendance = dayAttendance.filter(record => record.employeeId === employeeId);
                }
                
                report.push(...dayAttendance);
              }
            }
            
            set({ loading: false });
            return report;
          } catch (localError) {
            set({ error: error.message, loading: false });
            throw error;
          }
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