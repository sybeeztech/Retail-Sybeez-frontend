// ChatBot Service - Future AI Agent Integration
import { useAuthStore } from '../store/authStore';

class ChatBotService {
  constructor() {
    this.apiEndpoint = process.env.REACT_APP_AI_ENDPOINT || '';
    this.isAIEnabled = !!this.apiEndpoint;
  }

  // Future AI Agent Integration Point
  async sendToAIAgent(message, context = {}) {
    if (!this.isAIEnabled) {
      return this.getLocalResponse(message);
    }

    try {
      // Future implementation for actual AI agent
      const response = await fetch(`${this.apiEndpoint}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${context.userToken}`
        },
        body: JSON.stringify({
          message,
          context: {
            userId: context.userId,
            userRole: context.userRole,
            currentModule: context.currentModule,
            dashboardData: context.dashboardData
          }
        })
      });

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('AI Agent Error:', error);
      return this.getLocalResponse(message);
    }
  }

  // Enhanced local responses with business logic
  getLocalResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Employee Management
    if (lowerMessage.includes('employee') || lowerMessage.includes('staff') || lowerMessage.includes('hr')) {
      return {
        type: 'action_response',
        content: "I can help you with employee management tasks:",
        actions: [
          { label: "View Employee Directory", action: "navigate", target: "/hrm/employees" },
          { label: "Check Attendance", action: "navigate", target: "/hrm/attendance/daily" },
          { label: "Payroll Dashboard", action: "navigate", target: "/hrm/payroll" },
          { label: "Leave Management", action: "navigate", target: "/hrm/leave/dashboard" }
        ]
      };
    }

    // Order and Inventory Management
    if (lowerMessage.includes('order') || lowerMessage.includes('inventory') || lowerMessage.includes('stock')) {
      return {
        type: 'action_response',
        content: "Here are the available ERP operations:",
        actions: [
          { label: "View Orders", action: "navigate", target: "/erp/orders" },
          { label: "Inventory Management", action: "navigate", target: "/erp/inventory" },
          { label: "Customer Management", action: "navigate", target: "/erp/customers" },
          { label: "Supplier Management", action: "navigate", target: "/erp/suppliers" }
        ]
      };
    }

    // Financial Management
    if (lowerMessage.includes('finance') || lowerMessage.includes('revenue') || lowerMessage.includes('expense') || lowerMessage.includes('money')) {
      return {
        type: 'action_response',
        content: "I can assist with financial management:",
        actions: [
          { label: "Finance Dashboard", action: "navigate", target: "/finance/dashboard" },
          { label: "Income Tracking", action: "navigate", target: "/finance/income" },
          { label: "Expense Management", action: "navigate", target: "/finance/expense" },
          { label: "Budget Planning", action: "navigate", target: "/finance/budget" }
        ]
      };
    }

    // Dashboard and Analytics
    if (lowerMessage.includes('dashboard') || lowerMessage.includes('report') || lowerMessage.includes('analytics')) {
      return {
        type: 'info_response',
        content: "Dashboard Analytics Available:\n\n• Employee Metrics: 245 total employees, 22 present today\n• Orders: 150 total orders, 12 pending\n• Revenue: $125K monthly revenue (↑8.5%)\n• Inventory: 1,234 items (23 low stock alerts)\n\nWhich area would you like to explore in detail?"
      };
    }

    // Help and General Queries
    if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
      return {
        type: 'help_response',
        content: "I'm your AI Business Assistant! I can help you with:\n\n🏢 **Human Resources**\n   • Employee directory & profiles\n   • Attendance tracking\n   • Leave management\n   • Payroll operations\n\n📦 **Enterprise Resource Planning**\n   • Order management\n   • Inventory tracking\n   • Customer & supplier management\n   • Delivery tracking\n\n💰 **Finance Management**\n   • Income & expense tracking\n   • Budget planning\n   • Financial reporting\n   • Invoice management\n\n📊 **Analytics & Insights**\n   • Real-time dashboards\n   • Performance metrics\n   • Business intelligence\n\nJust ask me about any of these areas!"
      };
    }

    // Default response
    return {
      type: 'default_response',
      content: "I'm here to help you manage your business efficiently! Try asking me about:\n\n• \"Show me employee data\"\n• \"Check inventory status\"\n• \"Financial reports\"\n• \"Dashboard analytics\"\n• \"Help with orders\"\n\nWhat would you like to know?"
    };
  }

  // Future: Real-time dashboard data integration
  getDashboardContext() {
    // This will integrate with your actual dashboard data
    return {
      employees: { total: 245, present: 22, onLeave: 2 },
      orders: { total: 150, pending: 12, completed: 138 },
      revenue: { monthly: 125000, growth: 8.5 },
      inventory: { total: 1234, lowStock: 23 }
    };
  }

  // Future: User context for personalized responses
  getUserContext() {
    const { user } = useAuthStore.getState();
    return {
      userId: user?.id,
      userRole: user?.role,
      userName: user?.employee?.first_name,
      permissions: user?.permissions || []
    };
  }
}

export default new ChatBotService();