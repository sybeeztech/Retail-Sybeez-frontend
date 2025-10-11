import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useSettingsStore = create(
  persist(
    (set, get) => ({
      // Theme settings
      theme: 'light', // 'light' or 'dark'
      
      // UI Preferences
      primaryColor: '#3b82f6', // blue-500
      dashboardLayout: 'modern',
      sidebarCollapsed: false,
      
      // System settings
      notifications: true,
      autoSave: true,
      language: 'en',
      
      // Actions
      setTheme: (theme) => set({ theme }),
      setPrimaryColor: (color) => set({ primaryColor: color }),
      setDashboardLayout: (layout) => set({ dashboardLayout: layout }),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
      setNotifications: (enabled) => set({ notifications: enabled }),
      setAutoSave: (enabled) => set({ autoSave: enabled }),
      setLanguage: (language) => set({ language }),
      
      // Bulk update settings
      updateSettings: (settings) => set(settings),
      
      // Reset to defaults
      resetSettings: () => set({
        theme: 'light',
        primaryColor: '#3b82f6',
        dashboardLayout: 'modern',
        sidebarCollapsed: false,
        notifications: true,
        autoSave: true,
        language: 'en',
      }),
    }),
    {
      name: 'settings-storage',
      version: 1,
    }
  )
);

export default useSettingsStore;