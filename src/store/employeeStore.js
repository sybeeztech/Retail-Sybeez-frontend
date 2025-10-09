import { create } from 'zustand';

// API calls with authentication
const api = {
  getEmployees: () => fetch('/api/employees', {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
    }
  }).then(res => {
    if (!res.ok) throw new Error('Failed to fetch employees');
    return res.json();
  }),
  
  addEmployee: (employee) => fetch('/api/employees', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
    },
    body: JSON.stringify(employee)
  }).then(res => {
    if (!res.ok) throw new Error('Failed to add employee');
    return res.json();
  }),
  
  updateEmployee: (id, employee) => fetch(`/api/employees/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
    },
    body: JSON.stringify(employee)
  }).then(res => {
    if (!res.ok) throw new Error('Failed to update employee');
    return res.json();
  }),
  
  deleteEmployee: (id) => fetch(`/api/employees/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
    }
  }).then(res => {
    if (!res.ok) throw new Error('Failed to delete employee');
    return res.json();
  }),
  
  getEmployeeDocuments: (employeeId) => fetch(`/api/employees/${employeeId}/documents`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
    }
  }).then(res => {
    if (!res.ok) throw new Error('Failed to fetch documents');
    return res.json();
  }),
  
  addEmployeeDocument: (employeeId, documentData) => fetch(`/api/employees/${employeeId}/documents`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
    },
    body: JSON.stringify(documentData)
  }).then(res => {
    if (!res.ok) throw new Error('Failed to add document');
    return res.json();
  }),
  
  deleteEmployeeDocument: (documentId) => fetch(`/api/documents/${documentId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
    }
  }).then(res => {
    if (!res.ok) throw new Error('Failed to delete document');
    return res.json();
  })
};

export const useEmployeeStore = create((set, get) => ({
  employees: [],
  loading: false,
  error: null,
  currentEmployee: null,
  
  fetchEmployees: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.getEmployees();

      const employees = response.employees || response;
      console.log('Fetched employees:', employees);
      set({ employees, loading: false });
      
      // Fetch documents for each employee
      const employeesWithDocuments = await Promise.all(
        employees.map(async (employee) => {
          try {
            const documents = await api.getEmployeeDocuments(employee.id);
            return { ...employee, documents };
          } catch {
            return { ...employee, documents: [] };
          }
        })
      );
      
      set({ employees: employeesWithDocuments, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchCurrentEmployee: async () => {
    try {
      const response = await fetch('/api/me', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch current user');
      const data = await response.json();
      set({ currentEmployee: data.employee });
    } catch (error) {
      console.error('Error fetching current employee:', error);
    }
  },
  
  addEmployee: async (employeeData) => {
    try {
      const response = await api.addEmployee(employeeData);
      // Extract the employee from the response if needed
      const newEmployee = response.employee || response;
      set(state => ({ 
        employees: [...state.employees, newEmployee] 
      }));
      return newEmployee;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },
  
  updateEmployee: async (id, employeeData) => {
    try {
      const response = await api.updateEmployee(id, employeeData);
      // Extract the employee from the response if needed
      const updatedEmployee = response.employee || response;
      set(state => ({
        employees: state.employees.map(emp => 
          emp.id === id ? updatedEmployee : emp
        )
      }));
      return updatedEmployee;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },
  
  deleteEmployee: async (id) => {
    try {
      await api.deleteEmployee(id);
      set(state => ({
        employees: state.employees.filter(emp => emp.id !== id)
      }));
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  addEmployeeDocument: async (employeeId, documentData) => {
    try {
      const newDocument = await api.addEmployeeDocument(employeeId, documentData);
      
      set(state => ({
        employees: state.employees.map(emp =>
          emp.id === employeeId
            ? {
                ...emp,
                documents: [...(emp.documents || []), newDocument]
              }
            : emp
        )
      }));
      
      return newDocument;
    } catch (error) {
      console.error('Error adding document:', error);
      throw error;
    }
  },
  
  deleteEmployeeDocument: async (documentId) => {
    try {
      await api.deleteEmployeeDocument(documentId);
      
      // Update local state by removing the document from all employees
      set(state => ({
        employees: state.employees.map(emp => ({
          ...emp,
          documents: (emp.documents || []).filter(doc => doc.id !== documentId)
        }))
      }));
    } catch (error) {
      console.error('Error deleting document:', error);
      throw error;
    }
  }
}));