// hooks/useLeaveManagement.js
import { useEffect } from 'react';
import { useLeaveStore } from '../store/leaveStore';

export const useLeaveManagement = (autoFetch = true) => {
  const {
    leaveBalances,
    leaveApplications,
    leavePolicies,
    holidays,
    teamCalendar,
    loading,
    error,
    filters,
    getLeaveBalance,
    getLeaveApplications,
    getLeavePolicies,
    getHolidays,
    getTeamCalendar,
    clearError
  } = useLeaveStore();

  useEffect(() => {
    if (autoFetch) {
      // Load initial data
      getLeaveBalance();
      getLeaveApplications();
      getLeavePolicies();
      getHolidays();
      
      // Try to load team calendar (will fail silently if no permission)
      getTeamCalendar().catch(() => {}); 
    }
  }, [autoFetch, getLeaveBalance, getLeaveApplications, getLeavePolicies, getHolidays, getTeamCalendar]);

  return {
    // State
    leaveBalances,
    leaveApplications,
    leavePolicies,
    holidays,
    teamCalendar,
    loading,
    error,
    filters,

    // Actions
    getLeaveBalance,
    getLeaveApplications,
    getLeavePolicies,
    getHolidays,
    getTeamCalendar,
    applyForLeave: useLeaveStore(state => state.applyForLeave),
    processLeaveApplication: useLeaveStore(state => state.processLeaveApplication),
    cancelLeaveApplication: useLeaveStore(state => state.cancelLeaveApplication),
    clearError,

    // Utility functions
    getApplicationById: useLeaveStore(state => state.getApplicationById),
    getPendingApplications: useLeaveStore(state => state.getPendingApplications),
    getAvailableLeave: useLeaveStore(state => state.getAvailableLeave),
    checkLeaveOverlap: useLeaveStore(state => state.checkLeaveOverlap)
  };
};