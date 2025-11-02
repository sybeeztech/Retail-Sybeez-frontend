import { create } from 'zustand';

// Importing Mock HRM data and helper functions
// import { HRMData, HRMHelpers } from '../data/HRMData';

// Uncomment below lines if mock data is not used
const HRMData = {}
const HRMHelpers = {};

export const useEmployeeStore = create((set, get) => ({
  employees: (HRMData?.employees || []).map(employee => ({
    ...employee,
    documents: HRMHelpers?.getDocumentsByEmployeeId?.(HRMData?.documents || [], employee.id.toString()) || []
  })),
  departments: [], // Initialize with empty array
  loading: false,
  error: null,
  currentEmployee: null,
  hasFetched: false,
  
  fetchEmployees: async (forceRefresh = false) => {
    const state = get();
    
    if (state.hasFetched && !forceRefresh) {
      // console.log('already fetched employees, returning existing data');
      return state.employees;
    }
    set({ loading: true, error: null });
    try {
      const employeesWithDocuments = (HRMData?.employees || []).map(employee => ({
        ...employee,
        documents: HRMHelpers?.getDocumentsByEmployeeId?.(HRMData?.documents || [], employee.id.toString()) || []
      }));
      
      set({ employees: employeesWithDocuments, loading: false, hasFetched: true });
      return employeesWithDocuments;
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Department management methods
  fetchDepartments: async () => {
    try {
      // Future API implementation
      /*
      const response = await fetch('/api/departments', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
        }
      });
      const departments = await response.json();
      set({ departments });
      return departments;
      */
      
      // For now, extract departments from existing employees and add common ones
      const state = get();
      const employeeDepartments = [...new Set(state.employees.map(emp => emp.department).filter(Boolean))];
      
      // Add common departments if they don't exist
      // const commonDepartments = ['Engineering', 'HR', 'Finance', 'Marketing', 'Sales', 'Operations'];
      const commonDepartments = []
      const allDepartments = [...new Set([...employeeDepartments, ...commonDepartments])];
      
      const departmentsWithIds = allDepartments.map((name, index) => ({
        id: index + 1,
        name,
        manager: '', // You can populate this from employee data if available
        employeeCount: state.employees.filter(emp => emp.department === name).length
      }));
      
      set({ departments: departmentsWithIds });
      return departmentsWithIds;
    } catch (error) {
      console.error('Error fetching departments:', error);
      set({ departments: [] });
      return [];
    }
  },

  addDepartment: async (departmentName) => {
    try {
      // Future API implementation
      /*
      const response = await fetch('/api/departments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
        },
        body: JSON.stringify({ name: departmentName })
      });
      const newDepartment = await response.json();
      */
      
      // Current implementation - add to local state
      const state = get();
      const existingDepartment = state.departments.find(dept => 
        dept.name.toLowerCase() === departmentName.toLowerCase()
      );
      
      if (existingDepartment) {
        return existingDepartment;
      }
      
      const newDepartment = {
        id: Math.max(0, ...state.departments.map(dept => dept.id)) + 1,
        name: departmentName,
        manager: '',
        employeeCount: 0
      };
      
      set(state => ({
        departments: [...state.departments, newDepartment]
      }));
      
      return newDepartment;
    } catch (error) {
      console.error('Error adding department:', error);
      throw error;
    }
  },

  updateDepartment: async (id, departmentData) => {
    try {
      set(state => ({
        departments: state.departments.map(dept =>
          dept.id === id ? { ...dept, ...departmentData } : dept
        )
      }));
    } catch (error) {
      console.error('Error updating department:', error);
      throw error;
    }
  },

  deleteDepartment: async (id) => {
    try {
      set(state => ({
        departments: state.departments.filter(dept => dept.id !== id)
      }));
    } catch (error) {
      console.error('Error deleting department:', error);
      throw error;
    }
  },

  fetchCurrentEmployee: async () => {
    try {
      const currentEmployee = (HRMData?.employees || [])[0];
      set({ currentEmployee });
      return currentEmployee;
    } catch (error) {
      console.error('Error fetching current employee:', error);
    }
  },
  
  addEmployee: async (employeeData) => {
    try {
      const currentEmployees = get().employees || [];
      const maxId = currentEmployees.length > 0 
        ? Math.max(...currentEmployees.map(emp => emp.id)) 
        : 0;
      
      const newEmployee = {
        ...employeeData,
        id: maxId + 1,
        documents: [],
        active: true
      };
      
      set(state => ({ 
        employees: [...(state.employees || []), newEmployee] 
      }));
      
      // Update department count
      if (employeeData.department) {
        set(state => ({
          departments: state.departments.map(dept =>
            dept.name === employeeData.department
              ? { ...dept, employeeCount: (dept.employeeCount || 0) + 1 }
              : dept
          )
        }));
      }
      
      return newEmployee;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },
  
  updateEmployee: async (id, employeeData) => {
    try {
      const state = get();
      const oldEmployee = state.employees.find(emp => emp.id === id);
      
      set(state => ({
        employees: (state.employees || []).map(emp => 
          emp.id === id ? { ...emp, ...employeeData } : emp
        )
      }));

      // Update department counts if department changed
      if (oldEmployee && oldEmployee.department !== employeeData.department) {
        // Decrement old department count
        if (oldEmployee.department) {
          set(state => ({
            departments: state.departments.map(dept =>
              dept.name === oldEmployee.department
                ? { ...dept, employeeCount: Math.max(0, (dept.employeeCount || 0) - 1) }
                : dept
            )
          }));
        }
        
        // Increment new department count
        if (employeeData.department) {
          set(state => ({
            departments: state.departments.map(dept =>
              dept.name === employeeData.department
                ? { ...dept, employeeCount: (dept.employeeCount || 0) + 1 }
                : dept
            )
          }));
        }
      }

      // Also update HRMData for persistence
      if (HRMData?.employees) {
        const index = HRMData.employees.findIndex(emp => emp.id === id);
        if (index !== -1) {
          HRMData.employees[index] = { ...HRMData.employees[index], ...employeeData };
        }
      }
      
      return { ...employeeData, id };
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },
  
  deleteEmployee: async (id) => {
    try {
      const state = get();
      const employeeToDelete = state.employees.find(emp => emp.id === id);
      
      set(state => ({
        employees: (state.employees || []).filter(emp => emp.id !== id)
      }));

      // Update department count
      if (employeeToDelete && employeeToDelete.department) {
        set(state => ({
          departments: state.departments.map(dept =>
            dept.name === employeeToDelete.department
              ? { ...dept, employeeCount: Math.max(0, (dept.employeeCount || 0) - 1) }
              : dept
          )
        }));
      }

      // Also update HRMData for persistence
      if (HRMData?.employees) {
        HRMData.employees = HRMData.employees.filter(emp => emp.id !== id);
      }
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  // ... rest of the methods (addEmployeeDocument, deleteEmployeeDocument, etc.) remain the same
  addEmployeeDocument: async (employeeId, documentData) => {
    // ... existing implementation
  },
  
  deleteEmployeeDocument: async (documentId) => {
    // ... existing implementation
  },

  getEmployeeById: (id) => {
    return HRMHelpers?.getEmployeeById?.(get().employees || [], id) || null;
  },

  getEmployeesByDepartment: (department) => {
    return HRMHelpers?.filterEmployeesByDepartment?.(get().employees || [], department) || [];
  },

  getEmployeeDocuments: (employeeId) => {
    return HRMHelpers?.getDocumentsByEmployeeId?.(HRMData?.documents || [], employeeId.toString()) || [];
  },

  getEmployeeAttendance: (employeeId) => {
    return HRMHelpers?.getAttendanceByEmployeeId?.(HRMData?.attendance || [], employeeId.toString()) || [];
  },

  calculateEmployeePayroll: (employeeId) => {
    const employee = HRMHelpers?.getEmployeeById?.(get().employees || [], employeeId);
    return employee ? HRMHelpers?.calculatePayroll?.(employee) || null : null;
  },

  refreshEmployees: async () => {
    return get().fetchEmployees(true);
  }
}));

// Make store available globally for payroll store access
if (typeof window !== 'undefined') {
  window.__EMPLOYEE_STORE__ = useEmployeeStore;
}