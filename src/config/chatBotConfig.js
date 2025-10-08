// ChatBot Configuration
export const chatBotConfig = {
  // UI Settings
  ui: {
    position: 'bottom-right', // bottom-right, bottom-left, top-right, top-left
    theme: {
      primary: '#2563eb', // blue-600
      secondary: '#f3f4f6', // gray-100
      success: '#10b981', // green-500
      error: '#ef4444', // red-500
    },
    dimensions: {
      width: '320px',
      height: '400px',
      minimizedHeight: '64px'
    }
  },

  // AI Agent Settings (for future integration)
  ai: {
    enabled: false, // Set to true when AI agent is available
    apiEndpoint: process.env.REACT_APP_AI_ENDPOINT || '',
    model: 'gpt-4', // Future AI model selection
    maxTokens: 150,
    temperature: 0.7,
    responseTimeout: 30000, // 30 seconds
  },

  // Feature Flags
  features: {
    voiceInput: false, // Future voice input feature
    fileUpload: false, // Future file upload feature
    screenShare: false, // Future screen sharing for support
    videoCall: false, // Future video call feature
    multiLanguage: false, // Future multi-language support
    analytics: true, // Track chatbot usage analytics
  },

  // Business Logic
  capabilities: {
    navigation: true,
    dataQueries: true,
    reportGeneration: false, // Future automated report generation
    taskAutomation: false, // Future task automation
    integrations: {
      calendar: false,
      email: false,
      notifications: true,
      alerts: true
    }
  },

  // Default Messages
  messages: {
    welcome: "Hello! I'm your AI Business Assistant. I can help you navigate your dashboard, analyze data, and manage business operations. Try asking me about employees, orders, finances, or analytics!",
    error: "I apologize, but I encountered an error. Please try again or contact support if the issue persists.",
    offline: "I'm currently offline. Please check your connection and try again.",
    typing: "AI is thinking...",
    noResults: "I couldn't find any relevant information. Could you try rephrasing your question?"
  },

  // Quick Actions
  quickActions: [
    { label: "👥 Employee Data", query: "Show me employee data" },
    { label: "📦 Inventory Status", query: "Check inventory status" },
    { label: "💰 Finance Reports", query: "Financial reports" },
    { label: "📊 Analytics", query: "Dashboard analytics" },
    { label: "📋 Recent Orders", query: "Show recent orders" },
    { label: "⚠️ Alerts", query: "Show me current alerts" }
  ],

  // Module Navigation Map
  navigationMap: {
    'hrm': {
      dashboard: '/hrm/dashboard',
      employees: '/hrm/employees',
      attendance: '/hrm/attendance/daily',
      leave: '/hrm/leave/dashboard',
      payroll: '/hrm/payroll',
      performance: '/hrm/performance/goals'
    },
    'erp': {
      dashboard: '/erp/dashboard',
      orders: '/erp/orders',
      inventory: '/erp/inventory',
      customers: '/erp/customers',
      suppliers: '/erp/suppliers',
      delivery: '/erp/delivery'
    },
    'finance': {
      dashboard: '/finance/dashboard',
      income: '/finance/income',
      expense: '/finance/expense',
      budget: '/finance/budget',
      invoicing: '/finance/invoicing',
      banking: '/finance/bank-accounts'
    }
  },

  // Analytics & Tracking
  analytics: {
    trackUserInteractions: true,
    trackNavigationClicks: true,
    trackQueryTypes: true,
    trackResponseTimes: true,
    trackUserSatisfaction: false // Future satisfaction rating
  }
};

export default chatBotConfig;