// payrollStore.js
import { create } from 'zustand';

export const usePayrollStore = create((set, get) => ({
  payrollData: {
    processed: false,
    payrollPeriod: {},
    results: []
  },
  
  // Check user permissions based on role 
  checkPayrollPermission: (action = 'view') => {
    // This would typically come from your auth store
    const userRole = JSON.parse(localStorage.getItem('auth-storage')).state.user.employee.role || 'employee';
    const userDepartment = JSON.parse(localStorage.getItem('auth-storage')).state.user.employee.department || '';
    const userEmployeeId = JSON.parse(localStorage.getItem('auth-storage')).state.user.employeeId || '';
    
    if (['super_admin', 'admin'].includes(userRole)) return true;
    if (userRole === 'manager' && action === 'view') return true;
    if (userRole === 'employee' && action === 'view_self') return true;
    
    return false;
  },

  processPayroll: async (payPeriod) => {
    // Check permission
    if (!get().checkPayrollPermission('process')) {
      alert('Forbidden: You do not have permission to process payroll.');
      return null;
    }

    try {
      const response = await fetch('/api/payroll/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payPeriod }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to process payroll');
      }
      
      const data = await response.json();
      const results = data.attrs?.results || data.results || [];
      const payrollPeriod = data.attrs?.payrollPeriod || data.payrollPeriod || payPeriod;
      
      set({
        payrollData: {
          processed: data.processed || true,
          payrollPeriod,
          results
        }
      });
      
      return data;
    } catch (error) {
      console.error('Error processing payroll:', error);
      alert('Error processing payroll. Please check the console for details.');
      return null;
    }
  },

  runPayroll: async () => {
    // Check permission - only admin/super_admin can run payroll
    if (!get().checkPayrollPermission('process')) {
      alert('Forbidden: You do not have permission to run payroll.');
      return null;
    }

    try {
      const response = await fetch('/api/payroll/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to run payroll');
      }
      
      const data = await response.json();
      alert(data.message || 'Payroll processed successfully! Direct deposits initiated.');
      
      return data;
    } catch (error) {
      console.error('Error running payroll:', error);
      alert('Error running payroll. Please check the console for details.');
      return null;
    }
  },

  generateTaxForms: async () => {
    if (!get().checkPayrollPermission('view')) {
      alert('Forbidden: You do not have permission to generate tax forms.');
      return null;
    }

    try {
      const response = await fetch('/api/payroll/tax-forms');
      
      if (!response.ok) {
        throw new Error('Failed to generate tax forms');
      }
      
      const data = await response.json();
      return data.forms;
    } catch (error) {
      console.error('Error generating tax forms:', error);
      alert('Error generating tax forms. Please check the console for details.');
      return null;
    }
  },

  generateComplianceReport: async () => {
    if (!get().checkPayrollPermission('view')) {
      alert('Forbidden: You do not have permission to generate compliance reports.');
      return null;
    }

    try {
      const response = await fetch('/api/payroll/compliance-reports');
      
      if (!response.ok) {
        throw new Error('Failed to generate compliance report');
      }
      
      const data = await response.json();
      return data.report;
    } catch (error) {
      console.error('Error generating compliance report:', error);
      alert('Error generating compliance report. Please check the console for details.');
      return null;
    }
  },

  getEmployeeSalarySlip: async (employeeId) => {
    const userEmployeeId = JSON.parse(localStorage.getItem('auth-storage')).state.user.employeeId || '';
    const userRole = JSON.parse(localStorage.getItem('auth-storage')).state.user.employee.role || 'employee';
    const userDepartment = JSON.parse(localStorage.getItem('auth-storage')).state.user.employee.role.department || '';
    
    // Employees can only view their own salary slip
    if (userRole === 'employee' && employeeId !== userEmployeeId) {
      alert('Forbidden: You can only view your own salary slip.');
      return null;
    }

    try {
      const response = await fetch(`/api/payroll/employee/${employeeId}/salary-slip`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch salary slip');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching salary slip:', error);
      alert('Error fetching salary slip. Please check the console for details.');
      return null;
    }
  },

  getPayrollHistory: async () => {
    if (!get().checkPayrollPermission('view')) {
      alert('Forbidden: You do not have permission to view payroll history.');
      return null;
    }

    try {
      const response = await fetch('/api/payroll/history');
      
      if (!response.ok) {
        throw new Error('Failed to fetch payroll history');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching payroll history:', error);
      alert('Error fetching payroll history. Please check the console for details.');
      return null;
    }
  },

  // Helper to get current user info
  getCurrentUserInfo: () => {
    return {
      role: JSON.parse(localStorage.getItem('auth-storage')).state.user.employee.role || 'employee',
      department: JSON.parse(localStorage.getItem('auth-storage')).state.user.employee.department || '',
      employeeId: JSON.parse(localStorage.getItem('auth-storage')).state.user.employeeId || ''
    };
  }
}));