// payrollStore.js
import { create } from 'zustand';

// Importing Mock HRM data and helper functions
import { HRMData, HRMHelpers } from '../data/HRMData';

// Uncomment below lines if mock data is not used
// const HRMData = { payroll: [] };
// const HRMHelpers = {};

// Explicit user objects for authentication (instead of localStorage)
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

export const usePayrollStore = create((set, get) => ({
  payrollData: {
    processed: false,
    payrollPeriod: {},
    results: []
  },
  payrollHistory: [],
  // Store reference to employeeStore
  employeeStoreRef: null,
  
  // Check user permissions based on role 
  checkPayrollPermission: (action = 'view') => {
    try {
      // Using explicit user object
      const userRole = CURRENT_USER.role || 'employee';
      
      if (['super_admin', 'admin'].includes(userRole)) return true;
      if (userRole === 'manager' && action === 'view') return true;
      if (userRole === 'employee' && action === 'view_self') return true;
      
      return false;
    } catch (error) {
      console.warn('Error checking permissions, defaulting to limited access:', error);
      return action === 'view_self';
    }
  },

  // Set employee store reference
  setEmployeeStore: (employeeStore) => {
    set({ employeeStoreRef: employeeStore });
    console.log('Employee store reference set in payroll store');
  },

  // Get employees from employeeStore (to be called from component)
  getEmployeesFromStore: async () => {
    try {
      const state = get();
      
      // If we have a direct reference to employeeStore, use it
      if (state.employeeStoreRef && state.employeeStoreRef.getState) {
        const employeeState = state.employeeStoreRef.getState();
        // console.log('Employee store state:', employeeState);
        
        // If employees are already loaded, return them
        if (employeeState.employees && employeeState.employees.length > 0) {
          // console.log('Retrieved employees from employeeStore:', employeeState.employees.length);
          return employeeState.employees;
        }
        
        // If not loaded, try to fetch them
        if (employeeState.fetchEmployees) {
          console.log('Fetching employees from employeeStore...');
          await employeeState.fetchEmployees();
          const updatedState = state.employeeStoreRef.getState();
          return updatedState.employees || [];
        }
      }
      
      // Fallback: try global reference
      if (window.__EMPLOYEE_STORE__ && window.__EMPLOYEE_STORE__.getState) {
        const employeeState = window.__EMPLOYEE_STORE__.getState();
        if (employeeState.employees && employeeState.employees.length > 0) {
          // console.log('Retrieved employees from global employeeStore:', employeeState.employees.length);
          return employeeState.employees;
        }
      }
    } catch (error) {
      console.warn('Could not access employeeStore, using fallback data:', error);
    }
    
    // Final fallback - return empty array
    console.log('No employees found in employeeStore');
    return [];
  },

  // Helper to find employee by ID with better matching
  findEmployeeById: async (employeeId) => {
    const employees = await get().getEmployeesFromStore();
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

  // Calculate payroll for a single employee
  calculateEmployeePayroll: (employee) => {
    if (!employee) {
      console.error('No employee data provided for payroll calculation');
      return null;
    }

    try {
      const monthlySalary = employee.ctc / 12;
      const basicSalary = monthlySalary * 0.5;
      const hra = monthlySalary * 0.2;
      const specialAllowance = monthlySalary * 0.3; // Remaining after basic and HRA
      
      // Simplified tax calculation based on income slabs
      let incomeTax = 0;
      if (monthlySalary > 100000) {
        incomeTax = monthlySalary * 0.2; // 20% for high earners
      } else if (monthlySalary > 50000) {
        incomeTax = monthlySalary * 0.1; // 10% for medium earners
      } else {
        incomeTax = monthlySalary * 0.05; // 5% for lower earners
      }
      
      const professionalTax = 200;
      const pfContribution = basicSalary * 0.12; // Employee PF contribution
      
      const grossEarnings = monthlySalary;
      const totalDeductions = incomeTax + professionalTax + pfContribution;
      const netPay = grossEarnings - totalDeductions;
      
      return {
        employeeId: employee.id,
        employeeName: `${employee.firstName} ${employee.lastName}`,
        department: employee.department,
        designation: employee.designation,
        basicSalary: Math.round(basicSalary),
        hra: Math.round(hra),
        specialAllowance: Math.round(specialAllowance),
        grossEarnings: Math.round(grossEarnings),
        deductions: {
          incomeTax: Math.round(incomeTax),
          professionalTax: Math.round(professionalTax),
          pfContribution: Math.round(pfContribution)
        },
        totalDeductions: Math.round(totalDeductions),
        netPay: Math.round(netPay)
      };
    } catch (error) {
      console.error('Error calculating payroll for employee:', employee.id, error);
      return null;
    }
  },

  processPayroll: async (payPeriod) => {
    // Check permission
    if (!get().checkPayrollPermission('process')) {
      alert('Forbidden: You do not have permission to process payroll.');
      return null;
    }

    try {
      // Using employeeStore data instead of HRMData
      console.log('Processing payroll for period:', payPeriod);
      
      // Get current employees from employeeStore
      const employees = await get().getEmployeesFromStore();
      const activeEmployees = employees.filter(emp => emp.active !== false); // Include employees without active flag
      
      console.log('Processing payroll for employees:', activeEmployees.map(e => ({ 
        id: e.id, 
        name: `${e.firstName} ${e.lastName}`,
        ctc: e.ctc,
        active: e.active 
      })));
      
      if (activeEmployees.length === 0) {
        alert('No active employees found to process payroll.');
        return null;
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Calculate payroll for all active employees
      const results = activeEmployees.map(employee => {
        return get().calculateEmployeePayroll(employee);
      }).filter(result => result !== null); // Filter out failed calculations
      
      if (results.length === 0) {
        alert('Failed to calculate payroll for any employees.');
        return null;
      }

      const payrollData = {
        id: Date.now(),
        payrollPeriod: payPeriod || {
          startDate: new Date().toISOString().split('T')[0],
          endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0]
        },
        processed: true,
        processedDate: new Date().toISOString(),
        results,
        summary: {
          totalEmployees: results.length,
          totalGross: results.reduce((sum, result) => sum + result.grossEarnings, 0),
          totalDeductions: results.reduce((sum, result) => sum + result.totalDeductions, 0),
          totalNetPay: results.reduce((sum, result) => sum + result.netPay, 0)
        }
      };
      
      // Update both current payroll and add to history
      set(state => ({
        payrollData,
        payrollHistory: [payrollData, ...state.payrollHistory]
      }));
      
      console.log('Payroll processed successfully for', results.length, 'employees:', payrollData);
      alert(`Payroll processed successfully for ${results.length} employees!`);
      return payrollData;

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
      // Using employeeStore data
      console.log('Running payroll...');
      
      // Get current employees count for reporting
      const employees = await get().getEmployeesFromStore();
      const activeEmployees = employees.filter(emp => emp.active !== false);
      
      // Process payroll if not already processed
      const currentPayroll = get().payrollData;
      let payrollResult;
      
      if (!currentPayroll.processed) {
        payrollResult = await get().processPayroll();
      } else {
        payrollResult = currentPayroll;
      }
      
      if (!payrollResult) {
        throw new Error('Failed to process payroll');
      }

      // Simulate API delay for direct deposits
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const message = `Payroll processed successfully for ${activeEmployees.length} employees! Direct deposits initiated. Total payout: ₹${payrollResult.summary.totalNetPay.toLocaleString()}`;
      console.log('Payroll run completed. Direct deposits initiated.');
      alert(message);
      
      return {
        success: true,
        message,
        timestamp: new Date().toISOString(),
        employeesProcessed: activeEmployees.length,
        totalPayout: payrollResult.summary.totalNetPay
      };

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
      // Using employeeStore data
      console.log('Generating tax forms...');
      
      // Get current employees
      const employees = await get().getEmployeesFromStore();
      const payrollData = get().payrollData;
      
      if (!payrollData.processed) {
        alert('No processed payroll data found. Please process payroll first.');
        return null;
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const forms = employees.map(employee => {
        const payrollResult = payrollData.results?.find(r => r.employeeId === employee.id);
        
        if (!payrollResult) {
          console.warn('No payroll result found for employee:', employee.id);
          return null;
        }
        
        return {
          employeeId: employee.id,
          employeeName: `${employee.firstName} ${employee.lastName}`,
          panNumber: employee.panNumber || employee.pan || 'NOT_PROVIDED',
          financialYear: new Date().getFullYear() + '-' + (new Date().getFullYear() + 1),
          totalEarnings: payrollResult.grossEarnings,
          totalDeductions: payrollResult.totalDeductions,
          netIncome: payrollResult.netPay,
          formType: 'Form 16',
          generatedDate: new Date().toISOString(),
          tdsDeducted: payrollResult.deductions.incomeTax
        };
      }).filter(form => form !== null && form.totalEarnings > 0); // Only include employees with earnings

      console.log('Tax forms generated for', forms.length, 'employees:', forms);
      alert(`Generated ${forms.length} tax forms successfully!`);
      return forms.length > 0 ? forms : []; 

    } catch (error) {
      console.error('Error generating tax forms:', error);
      alert('Error generating tax forms. Please check the console for details.');
      return [];
    }
  },

  generateComplianceReport: async () => {
    if (!get().checkPayrollPermission('view')) {
      alert('Forbidden: You do not have permission to generate compliance reports.');
      return null;
    }

    try {
      // Using employeeStore data
      console.log('Generating compliance report...');
      
      // Get current employees
      const employees = await get().getEmployeesFromStore();
      const activeEmployees = employees.filter(emp => emp.active !== false);
      const payrollData = get().payrollData;
      
      if (!payrollData.processed) {
        alert('No processed payroll data found. Please process payroll first.');
        return null;
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const report = {
        generatedDate: new Date().toISOString(),
        period: payrollData.payrollPeriod || {},
        summary: {
          totalEmployees: activeEmployees.length,
          totalProcessed: payrollData.results?.length || 0,
          totalPayout: payrollData.summary?.totalNetPay || 0,
          totalTaxDeductions: payrollData.results?.reduce((sum, result) => 
            sum + (result.deductions?.incomeTax || 0), 0) || 0,
          totalPFContributions: payrollData.results?.reduce((sum, result) => 
            sum + (result.deductions?.pfContribution || 0), 0) || 0
        },
        complianceStatus: 'COMPLIANT',
        pendingActions: [],
        recommendations: [
          'Ensure all employee PAN details are updated',
          'Verify bank account details for new employees',
          'Submit quarterly TDS returns by due date'
        ]
      };

      console.log('Compliance report generated for', activeEmployees.length, 'employees:', report);
      alert(`Compliance report generated successfully for ${activeEmployees.length} employees!`);
      return report;

    } catch (error) {
      console.error('Error generating compliance report:', error);
      alert('Error generating compliance report. Please check the console for details.');
      return null;
    }
  },

  getEmployeeSalarySlip: async (employeeId) => {
    const userInfo = get().getCurrentUserInfo();
    
    // Employees can only view their own salary slip
    if (userInfo.role === 'employee' && employeeId.toString() !== userInfo.employeeId.toString()) {
      alert('Forbidden: You can only view your own salary slip.');
      return null;
    }

    try {
      // Using employeeStore data
      console.log('Fetching salary slip for employee ID:', employeeId);
      console.log('Current user employee ID:', userInfo.employeeId);
      
      // Get employee from employeeStore with better matching
      const employee = await get().findEmployeeById(employeeId);
      
      if (!employee) {
        throw new Error(`Employee not found with ID: ${employeeId}. Available employees: ${(await get().getEmployeesFromStore()).map(e => e.id).join(', ')}`);
      }

      console.log('Found employee:', employee);
      
      const payrollData = get().payrollData;
      let payrollResult;
      
      if (payrollData.processed) {
        payrollResult = payrollData.results?.find(r => {
          return r.employeeId.toString() === employee.id.toString();
        });
      }
      
      console.log('Payroll result for employee:', payrollResult);
      
      // Calculate payroll if not found in results
      if (!payrollResult) {
        console.log('No payroll result found, calculating manually...');
        payrollResult = get().calculateEmployeePayroll(employee);
      }
      
      if (!payrollResult) {
        throw new Error('Failed to calculate payroll for employee');
      }
      
      const salarySlip = {
        employeeId: employee.id,
        employeeName: `${employee.firstName} ${employee.lastName}`,
        designation: employee.designation || employee.position,
        department: employee.department,
        period: payrollData.payrollPeriod || {
          startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
          endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().split('T')[0]
        },
        earnings: {
          basicSalary: payrollResult.basicSalary,
          hra: payrollResult.hra,
          specialAllowance: payrollResult.specialAllowance
        },
        deductions: payrollResult.deductions,
        grossEarnings: payrollResult.grossEarnings,
        totalDeductions: payrollResult.totalDeductions,
        netPay: payrollResult.netPay,
        generatedDate: new Date().toISOString()
      };

      console.log('Salary slip generated:', salarySlip);
      return salarySlip;

    } catch (error) {
      console.error('Error fetching salary slip:', error);
      alert('Error fetching salary slip: ' + error.message);
      return null;
    }
  },

  getPayrollHistory: async () => {
    if (!get().checkPayrollPermission('view')) {
      alert('Forbidden: You do not have permission to view payroll history.');
      return null;
    }

    try {
      // Using employeeStore data for context
      const employees = await get().getEmployeesFromStore();
      console.log('Fetching payroll history for', employees.length, 'employees...');
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 700));
      
      // Return stored payroll history
      const history = get().payrollHistory;
      
      // If no history, check if current payroll is processed
      if (history.length === 0) {
        const currentPayroll = get().payrollData;
        if (currentPayroll.processed) {
          return [currentPayroll];
        }
      }
      
      console.log('Payroll history:', history);
      return history.length > 0 ? history : [];

    } catch (error) {
      console.error('Error fetching payroll history:', error);
      alert('Error fetching payroll history. Please check the console for details.');
      return [];
    }
  },

  // Helper to get current user info
  getCurrentUserInfo: () => {
    try {
      // Using explicit user object
      return {
        role: CURRENT_USER.role || 'employee',
        department: CURRENT_USER.department || '',
        employeeId: CURRENT_USER.employeeId || '1'
      };
      
    } catch (error) {
      console.warn('Error accessing user info, using defaults:', error);
      return {
        role: 'employee',
        department: '',
        employeeId: '1'
      };
    }
  },

  // Change current user role for testing
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

  // Reset payroll data (useful for testing)
  resetPayrollData: () => {
    set({
      payrollData: {
        processed: false,
        payrollPeriod: {},
        results: []
      },
      payrollHistory: []
    });
  },

  // Load payroll data from external source (for migration)
  loadPayrollData: (payrollData) => {
    if (payrollData && payrollData.results && Array.isArray(payrollData.results)) {
      set({
        payrollData: {
          ...payrollData,
          processed: true
        }
      });
      console.log('Payroll data loaded successfully');
      return true;
    }
    console.warn('Invalid payroll data format');
    return false;
  }
}));