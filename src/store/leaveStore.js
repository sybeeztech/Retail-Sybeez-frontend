// store/leaveStore.js
import { useMemo } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Helper function to get auth data from localStorage
const getAuthData = () => {
  try {
    const authStorage = localStorage.getItem('auth-storage');
    if (authStorage) {
      const authState = JSON.parse(authStorage);
      return {
        employeeId: authState?.state?.user?.employeeId,
        role: authState?.state?.user?.employee.role,
        token: authState?.state?.token
      };
    }
  } catch (error) {
    console.error('Error reading auth data from localStorage:', error);
  }
  return { employeeId: null, token: null };
};

export const useLeaveStore = create(
  persist(
    (set, get) => ({
      // State
      leaveBalances: {},
      leaveApplications: [],
      leavePolicies: [],
      // holidays: [],
      teamCalendar: [],
      loading: false,
      error: null,
      filters: {
        status: '',
        employeeId: '',
        startDate: '',
        endDate: ''
      },
      holidayManagement: {
        holidays: [],
        loading: false,
        error: null,
        filters: {
          year: new Date().getFullYear().toString(),
          type: 'all',
          location: 'all'
        }
      },

      // Actions

      // Get leave balance for current user (automatically gets employeeId from localStorage)
      getLeaveBalance: async (employeeId = null) => {
        set({ loading: true, error: null });
        
        try {
          // Get employeeId from parameter or from localStorage
          const targetEmployeeId = employeeId || getAuthData().employeeId;
          
          const queryParams = new URLSearchParams();
          if (targetEmployeeId) queryParams.append('employeeId', targetEmployeeId);
          
          // Only add query string if there are parameters
          const queryString = queryParams.toString();
          const url = queryString ? `/api/leave/balance?${queryString}` : '/api/leave/balance';
          
          const response = await fetch(url, {
            headers: {
              'Authorization': `Bearer ${getAuthData().token}`,
            },
          });

          if (!response.ok) {
            throw new Error(`Failed to fetch leave balance: ${response.statusText}`);
          }

          const responseData = await response.json();
          // Extract the balance data from the nested structure
        const balanceData = responseData.leaveBalance || responseData;
          
          set(state => ({
            leaveBalances: {
              ...state.leaveBalances,
              [targetEmployeeId || 'current']: balanceData
            },
            loading: false
          }));

          return balanceData;
        } catch (error) {
          set({ error: error.message, loading: false });
          throw error;
        }
      },

      // Get leave applications for current user (automatically filters by employeeId from localStorage)
      getLeaveApplications: async (filters = {}) => {
        set({ loading: true, error: null });
        
        try {
          // Always include current user's employeeId unless specifically overridden
          const currentEmployeeId = getAuthData().employeeId;
          const userRole = getAuthData().role; // Assuming role is available in auth data

        // Start with provided filters
        const finalFilters = { ...filters };

        // Only filter by employeeId if the user has an "employee" role
        // You might want to adjust the role check based on your actual role values
        if (userRole === 'employee' ) {
        finalFilters.employeeId = currentEmployeeId;
        } 
        // else if (userRole !== 'employee') { // also if role is admin or manager, get his own applications
        //   finalFilters.employeeId = currentEmployeeId;
        //   }
        // For managers/admins, don't add employeeId filter (will get all applications)

          const queryParams = new URLSearchParams();
          Object.entries(finalFilters).forEach(([key, value]) => {
            if (value !== null && value !== undefined && value !== '') {
              queryParams.append(key, value.toString());
            }
          });

          const queryString = queryParams.toString();
          const url = `/api/leave/applications${queryString ? `?${queryString}` : ''}`;

          const response = await fetch(url, {
            headers: {
              'Authorization': `Bearer ${getAuthData().token}`,
            },
          });

          if (!response.ok) {
            throw new Error(`Failed to fetch leave applications: ${response.statusText}`);
          }

          const applications = await response.json();
          
          set({ 
            leaveApplications: applications,
            filters: { ...get().filters, ...filters },
            loading: false 
          });

          return applications;
        } catch (error) {
          set({ error: error.message, loading: false });
          throw error;
        }
      },

      // Apply for leave - automatically uses current user's employeeId
      applyForLeave: async (leaveData) => {
        set({ loading: true, error: null });
        
        try {
          // Add current employeeId to leave data
          const currentEmployeeId = getAuthData().employeeId;
          const leaveDataWithEmployee = {
            ...leaveData,
            employeeId: currentEmployeeId
          };

          const response = await fetch('/api/leave/apply', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${getAuthData().token}`,
            },
            body: JSON.stringify(leaveDataWithEmployee),
          });

          if (!response.ok) {
            throw new Error(`Failed to apply for leave: ${response.statusText}`);
          }

          const newApplication = await response.json();
          
          set(state => ({
            leaveApplications: [newApplication, ...state.leaveApplications],
            loading: false
          }));

          // Refresh leave balance
          get().getLeaveBalance();

          return newApplication;
        } catch (error) {
          set({ error: error.message, loading: false });
          throw error;
        }
      },

      // Approve or reject leave application
      processLeaveApplication: async (applicationId, action, comments = '') => {
        set({ loading: true, error: null });
        
        try {
          const response = await fetch(`/api/leave/application/${applicationId}/action`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${getAuthData().token}`,
            },
            body: JSON.stringify({ action, comments }),
          });

          if (!response.ok) {
            throw new Error(`Failed to ${action} leave: ${response.statusText}`);
          }

          const updatedApplication = await response.json();
          
          set(state => ({
            leaveApplications: state.leaveApplications.map(app =>
              app.id === applicationId ? updatedApplication : app
            ),
            loading: false
          }));

          return updatedApplication;
        } catch (error) {
          set({ error: error.message, loading: false });
          throw error;
        }
      },

      // Get leave policies
      getLeavePolicies: async () => {
        set({ loading: true, error: null });
        
        try {
          const response = await fetch('/api/leave/policy', {
            headers: {
              'Authorization': `Bearer ${getAuthData().token}`,
            },
          });

          if (!response.ok) {
            throw new Error(`Failed to fetch leave policies: ${response.statusText}`);
          }

          const responseData = await response.json();
    
        // Handle both response structures
        const policies = responseData.leavePolicies || responseData;
          
          set({ 
            leavePolicies: policies,
            loading: false 
          });

          return policies;
        } catch (error) {
          set({ error: error.message, loading: false });
          throw error;
        }
      },

      // Add to leaveStore actions
      createLeavePolicy: async (policyData) => {
        set({ loading: true, error: null });
        
        try {
          const response = await fetch('/api/leave/policies', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${getAuthData().token}`,
            },
            body: JSON.stringify(policyData),
          });

          if (!response.ok) {
            throw new Error(`Failed to create policy: ${response.statusText}`);
          }

          const newPolicy = await response.json();
          
          set(state => ({
            leavePolicies: [...state.leavePolicies, newPolicy],
            loading: false
          }));

          return newPolicy;
        } catch (error) {
          set({ error: error.message, loading: false });
          throw error;
        }
      },

      updateLeavePolicy: async (policyId, policyData) => {
        set({ loading: true, error: null });
        
        try {
          const response = await fetch(`/api/leave/policies/${policyId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${getAuthData().token}`,
            },
            body: JSON.stringify(policyData),
          });

          if (!response.ok) {
            throw new Error(`Failed to update policy: ${response.statusText}`);
          }

          const updatedPolicy = await response.json();
          
          set(state => ({
            leavePolicies: state.leavePolicies.map(policy =>
              policy.id === policyId ? updatedPolicy : policy
            ),
            loading: false
          }));

          return updatedPolicy;
        } catch (error) {
          set({ error: error.message, loading: false });
          throw error;
        }
      },

      deleteLeavePolicy: async (policyId) => {
        set({ loading: true, error: null });
        
        try {
          const response = await fetch(`/api/leave/policies/${policyId}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${getAuthData().token}`,
            },
          });

          if (!response.ok) {
            throw new Error(`Failed to delete policy: ${response.statusText}`);
          }

          set(state => ({
            leavePolicies: state.leavePolicies.filter(policy => policy.id !== policyId),
            loading: false
          }));

          return true;
        } catch (error) {
          set({ error: error.message, loading: false });
          throw error;
        }
      },

      // Get holidays
      getHolidays: async (year = null) => {
        set({ loading: true, error: null });
        
        try {
          const queryParams = new URLSearchParams();
          if (year) queryParams.append('year', year);

          const queryString = queryParams.toString();
          const url = `/api/leave/holidays${queryString ? `?${queryString}` : ''}`;

          const response = await fetch(url, {
            headers: {
              'Authorization': `Bearer ${getAuthData().token}`,
            },
          });

          if (!response.ok) {
            throw new Error(`Failed to fetch holidays: ${response.statusText}`);
          }

          const responseData = await response.json();
    
        // Handle both response structures
        const holidays = responseData.holidays || responseData;
          
          // const holidays = await response.json();
          
          set({ 
            holidays: holidays,
            loading: false 
          });

          return holidays;
        } catch (error) {
          set({ error: error.message, loading: false });
          throw error;
        }
      },

      // Get team calendar (for managers) - uses current user as manager
      getTeamCalendar: async (startDate = '', endDate = '') => {
        set({ loading: true, error: null });
        
        try {
          const queryParams = new URLSearchParams();
          if (startDate) queryParams.append('startDate', startDate);
          if (endDate) queryParams.append('endDate', endDate);

          const queryString = queryParams.toString();
          const url = `/api/leave/team-calendar${queryString ? `?${queryString}` : ''}`;

          const response = await fetch(url, {
            headers: {
              'Authorization': `Bearer ${getAuthData().token}`,
            },
          });

          if (!response.ok) {
            // If user doesn't have permission, return empty array
            if (response.status === 403) {
              set({ teamCalendar: [], loading: false });
              return [];
            }
            throw new Error(`Failed to fetch team calendar: ${response.statusText}`);
          }

        //   const responseData = await response.json();
    
        // // Handle both response structures
        // const calendar = responseData.calendar || responseData;

          const calendar = await response.json();
          
          set({ 
            teamCalendar: calendar,
            loading: false 
          });

          return calendar;
        } catch (error) {
          set({ error: error.message, loading: false });
          throw error;
        }
      },

      // Cancel own leave application
      cancelLeaveApplication: async (applicationId) => {
        set({ loading: true, error: null });
        
        try {
          const response = await fetch(`/api/leave/application/${applicationId}/action`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${getAuthData().token}`,
            },
            body: JSON.stringify({ action: 'cancel' }),
          });

          if (!response.ok) {
            throw new Error(`Failed to cancel leave: ${response.statusText}`);
          }

          const updatedApplication = await response.json();
          
          set(state => ({
            leaveApplications: state.leaveApplications.map(app =>
              app.id === applicationId ? updatedApplication : app
            ),
            loading: false
          }));

          // Refresh leave balance
          get().getLeaveBalance();

          return updatedApplication;
        } catch (error) {
          set({ error: error.message, loading: false });
          throw error;
        }
      },

      // Utility functions
      getApplicationById: (id) => {
        return get().leaveApplications.find(app => app.id === id);
      },

      getApplicationsByStatus: (status) => {
        return get().leaveApplications.filter(app => app.status === status);
      },

      getPendingApplications: () => {
        return get().leaveApplications.filter(app => app.status === 'pending');
      },

      getUpcomingLeaves: (days = 30) => {
        const today = new Date();
        const futureDate = new Date();
        futureDate.setDate(today.getDate() + days);
        
        return get().leaveApplications.filter(app => 
          app.status === 'approved' && 
          new Date(app.startDate) >= today &&
          new Date(app.startDate) <= futureDate
        );
      },

      // Calculate available leave days for a specific type
      getAvailableLeave: (leaveType, employeeId = null) => {
        const targetEmployeeId = employeeId || getAuthData().employeeId;
        const balance = get().leaveBalances[targetEmployeeId];
        if (!balance || !balance.balances[leaveType]) return 0;
        return balance.balances[leaveType].available || 0;
      },

      // Check if date range overlaps with existing approved leaves
      checkLeaveOverlap: (employeeId = null, startDate, endDate, excludeApplicationId = null) => {
        const targetEmployeeId = employeeId || getAuthData().employeeId;
        const approvedLeaves = get().leaveApplications.filter(app =>
          app.employeeId === targetEmployeeId &&
          app.status === 'approved' &&
          app.id !== excludeApplicationId
        );

        const newStart = new Date(startDate);
        const newEnd = new Date(endDate);

        return approvedLeaves.some(app => {
          const appStart = new Date(app.startDate);
          const appEnd = new Date(app.endDate);
          return (newStart <= appEnd && newEnd >= appStart);
        });
      },


    // Add to actions

    // Holiday Management Actions (Admin only)
    getHolidaysForManagement: async (filters = {}) => {
      set({ loading: true, error: null });
      
      try {
        const queryParams = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          if (value && value !== 'all') {
            queryParams.append(key, value.toString());
          }
        });

        const queryString = queryParams.toString();
        const url = `/api/holidays${queryString ? `?${queryString}` : ''}`;

        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${getAuthData().token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 403) {
            throw new Error('Access denied: Admin privileges required');
          }
          throw new Error(`Failed to fetch holidays: ${response.statusText}`);
        }

        // const holidays = await response.json();

          const responseData = await response.json();
    
        // Handle both response structures
        const holidays = responseData.holidays || responseData;
        
        set(state => ({
          holidayManagement: {
            ...state.holidayManagement,
            holidays: holidays,
            filters: { ...state.holidayManagement.filters, ...filters },
            loading: false
          }
        }));

        return holidays;
      } catch (error) {
        set(state => ({
          holidayManagement: {
            ...state.holidayManagement,
            error: error.message,
            loading: false
          }
        }));
        throw error;
      }
    },

    createHoliday: async (holidayData) => {
      set(state => ({
        holidayManagement: {
          ...state.holidayManagement,
          loading: true,
          error: null
        }
      }));
      
      try {
        const response = await fetch('/api/holidays', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAuthData().token}`,
          },
          body: JSON.stringify(holidayData),
        });

        if (!response.ok) {
          if (response.status === 403) {
            throw new Error('Access denied: Admin privileges required');
          }
          throw new Error(`Failed to create holiday: ${response.statusText}`);
        }

        const newHoliday = await response.json();
        
        set(state => ({
          holidayManagement: {
            ...state.holidayManagement,
            holidays: [newHoliday, ...state.holidayManagement.holidays],
            loading: false
          }
        }));

        return newHoliday;
      } catch (error) {
        set(state => ({
          holidayManagement: {
            ...state.holidayManagement,
            error: error.message,
            loading: false
          }
        }));
        throw error;
      }
    },

    updateHoliday: async (holidayId, holidayData) => {
      set(state => ({
        holidayManagement: {
          ...state.holidayManagement,
          loading: true,
          error: null
        }
      }));
      
      try {
        const response = await fetch(`/api/holidays/${holidayId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAuthData().token}`,
          },
          body: JSON.stringify(holidayData),
        });

        if (!response.ok) {
          if (response.status === 403) {
            throw new Error('Access denied: Admin privileges required');
          }
          throw new Error(`Failed to update holiday: ${response.statusText}`);
        }

        const updatedHoliday = await response.json();
        
        set(state => ({
          holidayManagement: {
            ...state.holidayManagement,
            holidays: state.holidayManagement.holidays.map(holiday =>
              holiday.id === holidayId ? updatedHoliday : holiday
            ),
            loading: false
          }
        }));

        return updatedHoliday;
      } catch (error) {
        set(state => ({
          holidayManagement: {
            ...state.holidayManagement,
            error: error.message,
            loading: false
          }
        }));
        throw error;
      }
    },

    deleteHoliday: async (holidayId) => {
      set(state => ({
        holidayManagement: {
          ...state.holidayManagement,
          loading: true,
          error: null
        }
      }));
      
      try {
        const response = await fetch(`/api/holidays/${holidayId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${getAuthData().token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 403) {
            throw new Error('Access denied: Admin privileges required');
          }
          throw new Error(`Failed to delete holiday: ${response.statusText}`);
        }

        set(state => ({
          holidayManagement: {
            ...state.holidayManagement,
            holidays: state.holidayManagement.holidays.filter(holiday => holiday.id !== holidayId),
            loading: false
          }
        }));

        return true;
      } catch (error) {
        set(state => ({
          holidayManagement: {
            ...state.holidayManagement,
            error: error.message,
            loading: false
          }
        }));
        throw error;
      }
    },

    bulkImportHolidays: async (holidayData, year = null) => {
      set(state => ({
        holidayManagement: {
          ...state.holidayManagement,
          loading: true,
          error: null
        }
      }));
      
      try {
        const response = await fetch('/api/holidays/bulk-import', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAuthData().token}`,
          },
          body: JSON.stringify({ holidays: holidayData, year }),
        });

        if (!response.ok) {
          if (response.status === 403) {
            throw new Error('Access denied: Admin privileges required');
          }
          throw new Error(`Failed to import holidays: ${response.statusText}`);
        }

        const results = await response.json();
        
        // Refresh holidays list
        get().getHolidaysForManagement(get().holidayManagement.filters);
        
        return results;
      } catch (error) {
        set(state => ({
          holidayManagement: {
            ...state.holidayManagement,
            error: error.message,
            loading: false
          }
        }));
        throw error;
      }
    },

    // Add utility functions for holiday management
    getHolidayById: (id) => {
      return get().holidayManagement.holidays.find(holiday => holiday.id === id);
    },

    getHolidaysByYear: (year) => {
      return get().holidayManagement.holidays.filter(holiday => 
        holiday.date.startsWith(year.toString())
      );
    },

      // Clear filters
      clearFilters: () => {
        set({ filters: { status: '', employeeId: '', startDate: '', endDate: '' } });
      },

      // Clear error
      clearError: () => {
        set({ error: null });
      },

      // Reset store
      reset: () => {
        set({
          leaveBalances: {},
          leaveApplications: [],
          leavePolicies: [],
          holidays: [],
          teamCalendar: [],
          loading: false,
          error: null,
          filters: { status: '', employeeId: '', startDate: '', endDate: '' }
        });
      }
    }),
    {
      name: 'leave-storage',
      partialize: (state) => ({ 
        leavePolicies: state.leavePolicies,
        holidays: state.holidays
      })
    }
  )
);

// Custom hooks for common patterns
export const useLeaveBalance = (employeeId = null) => {
  const { leaveBalances, getLeaveBalance } = useLeaveStore();
  const targetEmployeeId = employeeId || getAuthData().employeeId;
  const balanceData = leaveBalances[targetEmployeeId] || {};

  // Handle different response structures
  const balances = balanceData.balances || balanceData.leaveBalance?.balances || balanceData;

  return {
    balance: {
        balances: balanceData.balances || {},
        year: balanceData.year || new Date().getFullYear(),
        id: balanceData.id
      },
      refresh: () => getLeaveBalance(employeeId)
  };
};

export const useLeaveApplications = (filters = {}) => {
  const { leaveApplications, getLeaveApplications, loading } = useLeaveStore();
  
  return {
    applications: leaveApplications,
    loading,
    refresh: () => getLeaveApplications(filters)
  };
};

export const useTeamCalendar = () => {
  const { teamCalendar, getTeamCalendar, loading } = useLeaveStore();
  
  return {
    calendar: teamCalendar,
    loading,
    refresh: (startDate, endDate) => getTeamCalendar(startDate, endDate)
  };
};

// Add custom hook for holiday management
export const useHolidayManagement = () => {
  const { 
    holidayManagement, 
    getHolidaysForManagement, 
    createHoliday, 
    updateHoliday, 
    deleteHoliday,
    bulkImportHolidays 
  } = useLeaveStore();
  
  // Memoize the returned object to prevent unnecessary re-renders
  return useMemo(() => ({
    holidays: holidayManagement.holidays,
    loading: holidayManagement.loading,
    error: holidayManagement.error,
    filters: holidayManagement.filters,
    getHolidays: getHolidaysForManagement,
    createHoliday,
    updateHoliday,
    deleteHoliday,
    bulkImportHolidays
  }), [
    holidayManagement.holidays, 
    holidayManagement.loading, 
    holidayManagement.error, 
    holidayManagement.filters,
    getHolidaysForManagement, 
    createHoliday, 
    updateHoliday, 
    deleteHoliday,
    bulkImportHolidays
  ]);
};