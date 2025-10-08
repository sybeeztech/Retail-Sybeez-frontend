import { create } from 'zustand';

// Mock API calls for Mirage.js
const api = {
  getEmployeeProfile: (id) => fetch(`/api/employees/${id}/profile`).then(res => res.json()),
  getEmployeeDocuments: (id) => fetch(`/api/employees/${id}/documents`).then(res => res.json()),
  getEmployeeTimeOff: (id) => fetch(`/api/employees/${id}/timeoff`).then(res => res.json()),
  getEmployeePerformance: (id) => fetch(`/api/employees/${id}/performance`).then(res => res.json()),
  downloadDocument: (id) => fetch(`/api/documents/${id}/download`).then(res => res.blob()),
  updateTimeOffRequest: (id, action) => fetch(`/api/timeoff/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action })
  }).then(res => res.json()),
  uploadDocument: (employeeId, file) => fetch(`/api/employees/${employeeId}/documents`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(file)
  }).then(res => res.json())
};

export const useEmployeeProfileStore = create((set, get) => ({
  employee: null,
  documents: [],
  timeOffRequests: [],
  performanceReviews: [],
  loading: false,
  error: null,
  
  fetchEmployeeProfile: async (employeeId) => {
    set({ loading: true, error: null });
    try {
      const [profile, documents, timeOff, performance] = await Promise.all([
        api.getEmployeeProfile(employeeId),
        api.getEmployeeDocuments(employeeId),
        api.getEmployeeTimeOff(employeeId),
        api.getEmployeePerformance(employeeId)
      ]);
      
      set({ 
        employee: profile,
        documents,
        timeOffRequests: timeOff,
        performanceReviews: performance,
        loading: false 
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  
  downloadDocument: async (documentId) => {
    try {
      const blob = await api.downloadDocument(documentId);
      // Create a download link and trigger download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `document-${documentId}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },
  
  updateTimeOffRequest: async (requestId, action) => {
    try {
      const updatedRequest = await api.updateTimeOffRequest(requestId, action);
      set(state => ({
        timeOffRequests: state.timeOffRequests.map(request => 
          request.id === requestId ? updatedRequest : request
        )
      }));
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },
  
  uploadDocument: async (employeeId, file) => {
    try {
      const newDocument = await api.uploadDocument(employeeId, file);
      set(state => ({
        documents: [...state.documents, newDocument]
      }));
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },
  
  clearProfile: () => {
    set({
      employee: null,
      documents: [],
      timeOffRequests: [],
      performanceReviews: [],
      error: null
    });
  }
}));