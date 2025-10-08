// departmentStore.js
import { create } from 'zustand';

// Mock API calls for Mirage.js
const api = {
  getDepartments: () => fetch('/api/departments').then(res => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  }),
  getDepartment: (id) => fetch(`/api/departments/${id}`).then(res => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  }),
  getEmployeesByDepartment: (departmentId) => fetch(`/api/departments/${departmentId}/employees`).then(res => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  }),
  addDepartment: (department) => fetch('/api/departments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(department)
  }).then(res => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  }),
  updateDepartment: (id, department) => fetch(`/api/departments/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(department)
  }).then(res => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  }),
  deleteDepartment: (id) => fetch(`/api/departments/${id}`, {
    method: 'DELETE'
  }).then(res => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    // Check if response has content before parsing as JSON
    if (res.status === 204 || res.headers.get('content-length') === '0') {
      return null; // No content to parse
    }
    return res.json();
  })
};

export const useDepartmentStore = create((set, get) => ({
  departments: [],
  departmentEmployees: {}, // Store employees by department ID
  departmentDetails: {}, // Store individual department details
  loading: false,
  error: null,
  
  fetchDepartments: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.getDepartments();
      // Extract the departments array from the response
      const departments = response.departments || response || [];
      
      // For employees, we already get limited data from the API
      // For managers/admins, we may need to enrich with additional data
      const enrichedDepartments = await Promise.all(
        departments.map(async dept => {
          // If the API already provides employeeCount (for employees), use it
          if (dept.employeeCount !== undefined) {
            return dept;
          }
          
          // For managers/admins, fetch additional data if needed
          try {
            const employeesResponse = await api.getEmployeesByDepartment(dept.id);
            const employees = employeesResponse.employees || employeesResponse || [];
            return {
              ...dept,
              employeeCount: employees.length,
              recentHires: dept.recentHires || [] // Use API-provided recentHires or empty array
            };
          } catch (error) {
            console.error(`Failed to fetch employees for department ${dept.id}:`, error);
            return {
              ...dept,
              employeeCount: 0,
              recentHires: []
            };
          }
        })
      );
      
      set({ departments: enrichedDepartments, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  
  fetchDepartment: async (departmentId) => {
    set({ loading: true, error: null });
    try {
      const response = await api.getDepartment(departmentId);
      const department = response.department || response;
      
      set(state => ({
        departmentDetails: {
          ...state.departmentDetails,
          [departmentId]: department
        },
        loading: false
      }));
      
      return department;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  
  fetchEmployeesByDepartment: async (departmentId) => {
    try {
      const response = await api.getEmployeesByDepartment(departmentId);
      const employees = response.employees || response || [];
      
      set(state => ({
        departmentEmployees: {
          ...state.departmentEmployees,
          [departmentId]: employees
        }
      }));
      
      return employees;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },
  
  addDepartment: async (departmentData) => {
    set({ loading: true, error: null });
    try {
      const response = await api.addDepartment(departmentData);
      // Extract the department from the response if needed
      const newDepartment = response.department || response;
      
      set(state => ({ 
        departments: [...state.departments, newDepartment],
        loading: false
      }));
      
      return newDepartment;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  
  updateDepartment: async (id, departmentData) => {
    set({ loading: true, error: null });
    try {
      const response = await api.updateDepartment(id, departmentData);
      // Extract the department from the response if needed
      const updatedDepartment = response.department || response;
      
      set(state => ({
        departments: state.departments.map(dept => 
          dept.id === id ? updatedDepartment : dept
        ),
        departmentDetails: {
          ...state.departmentDetails,
          [id]: updatedDepartment
        },
        loading: false
      }));
      
      return updatedDepartment;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  
  deleteDepartment: async (id) => {
    set({ loading: true, error: null });
    try {
      await api.deleteDepartment(id);
      set(state => ({
        departments: state.departments.filter(dept => dept.id !== id),
        departmentEmployees: Object.fromEntries(
          Object.entries(state.departmentEmployees).filter(([deptId]) => deptId !== id)
        ),
        departmentDetails: Object.fromEntries(
          Object.entries(state.departmentDetails).filter(([deptId]) => deptId !== id)
        ),
        loading: false
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  
  // Helper method to clear errors
  clearError: () => set({ error: null }),
  
  // Helper method to reset the store
  reset: () => set({ 
    departments: [], 
    departmentEmployees: {}, 
    departmentDetails: {},
    loading: false, 
    error: null 
  })
}));