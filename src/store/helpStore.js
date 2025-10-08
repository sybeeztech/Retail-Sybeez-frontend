// store/helpStore.js
import { create } from 'zustand';

export const useHelpStore = create((set) => ({
  loading: false,
  error: null,
  success: null,
  
  submitHelpdeskTicket: async (ticketData) => {
    set({ loading: true, error: null, success: null });
    
    try {
      // Make API call to MirageJS server for helpdesk tickets
      const response = await fetch('/api/helpdesk-tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...ticketData,
          type: 'helpdesk',
          status: 'open',
          createdAt: new Date().toISOString(),
          ticketNumber: `HRM-${Math.floor(100000 + Math.random() * 900000)}`
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit helpdesk ticket');
      }
      
      const data = await response.json();
      set({ loading: false, success: data });
      
      // Reset success message after 8 seconds
      setTimeout(() => set({ success: null }), 8000);
    } catch (error) {
      set({ loading: false, error: 'Failed to submit helpdesk ticket. Please try again.' });
    }
  },
  
  submitExternalTicket: async (ticketData) => {
    set({ loading: true, error: null, success: null });
    
    try {
      // Make API call to MirageJS server for external tickets
      const response = await fetch('/api/external-tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...ticketData,
          type: 'external',
          status: 'submitted',
          createdAt: new Date().toISOString(),
          ticketNumber: `EXT-${Math.floor(100000 + Math.random() * 900000)}`,
          company: 'Your Company Name'
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit vendor ticket');
      }
      
      const data = await response.json();
      set({ loading: false, success: data });
      
      // Reset success message after 8 seconds
      setTimeout(() => set({ success: null }), 8000);
    } catch (error) {
      set({ loading: false, error: 'Failed to submit vendor ticket. Please try again.' });
    }
  },
  
  clearError: () => set({ error: null }),
  clearSuccess: () => set({ success: null }),
}));