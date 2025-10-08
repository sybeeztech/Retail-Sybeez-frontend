import { create } from 'zustand';

// Mock API calls for Mirage.js
const api = {
  getDashboardData: () => fetch('/api/dashboard').then(res => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  }),
};

export const useDashboardStore = create((set, get) => ({
  // State for different user roles
  userRole: null,
  stats: {
    totalEmployees: 0,
    totalDepartments: 0,
    attendanceRate: '0%',
    newHires: 0,
    pendingTickets: 0,
    recentAttendance: 0
  },
  recentActivities: [],
  departmentOverview: [],
  monthlyEmployeeData: [],
  employeeAttendance: [], // For employee view
  newHires: [],
  loading: false,
  error: null,
  
  fetchDashboardData: async () => {
    set({ loading: true, error: null });
    try {
      const dashboardData = await api.getDashboardData();
      
      // Handle different response structures based on user role
      if (dashboardData.userRole === 'employee') {
        set({ 
          userRole: 'employee',
          stats: dashboardData.stats,
          recentActivities: dashboardData.recentActivities,
          employeeAttendance: dashboardData.stats?.recentAttendance || 0,
          loading: false 
        });
      } else {
        set({ 
          userRole: dashboardData.userRole,
          stats: dashboardData.stats,
          recentActivities: dashboardData.recentActivities,
          departmentOverview: dashboardData.departmentOverview,
          monthlyEmployeeData: dashboardData.monthlyEmployeeData || [], 
          newHires: dashboardData.newHires || [], 
          loading: false 
        });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  }
}));