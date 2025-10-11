import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Minimize2 } from 'lucide-react';
import useSettingsStore from '../store/settingsStore';

const SimpleChatbot = () => {
  const { theme } = useSettingsStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your Business Assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const predefinedResponses = {
    'hello': "Hello! I'm here to help you with your business operations. What would you like to know?",
    'hi': "Hi there! How can I assist you today?",
    'help': "I can help you with:\n• Dashboard overview\n• Order management\n• Customer information\n• Inventory tracking\n• Financial management\n• HR operations\n• CRM & Sales\n• Supply Chain operations\n\nWhat specific area would you like assistance with?",
    'dashboard': "The dashboard shows your key business metrics including total sales, orders, customers, and revenue. You can view real-time data and trends here.",
    'orders': "In the Orders section, you can view, create, and manage customer orders. Track order status, shipping information, and payment details.",
    'customers': "The Customer module helps you manage customer information, view purchase history, and track customer interactions.",
    'inventory': "Inventory management allows you to track stock levels, manage products, set reorder points, and view stock movements.",
    'finance': "The Finance module provides comprehensive financial management including:\n• Finance Dashboard - Overview of financial performance\n• Invoice Management - Create and track invoices\n• Budget Management - Plan and monitor budgets\n• Financial Reports - P&L, Balance Sheet, Cash Flow statements",
    'financial': "Our financial tools include dashboard analytics, invoice management, budget tracking, and comprehensive reporting for complete financial oversight.",
    'invoices': "Invoice Management allows you to create professional invoices, track payments, manage client billing, and monitor outstanding amounts.",
    'budget': "Budget Management helps you plan budgets by category, track spending vs. budgeted amounts, and analyze budget variances with detailed reporting.",
    'reports': "Financial Reports include Profit & Loss statements, Balance Sheets, Cash Flow statements, and key financial metrics with professional formatting.",
    'hr': "HR operations include employee management, payroll processing, attendance tracking, and performance evaluations.",
    'hrm': "HR operations include employee management, payroll processing, attendance tracking, and performance evaluations.",
    'analytics': "Analytics provides detailed insights into your business performance with charts, reports, and trend analysis.",
    'settings': "In Settings, you can configure your account preferences, system settings, and user permissions.",
    'crm': "CRM (Customer Relationship Management) helps you manage customer relationships, track leads, and monitor your sales pipeline for better business growth.",
    'leads': "Leads Management allows you to track potential customers, score leads, manage follow-ups, and convert prospects into customers.",
    'pipeline': "Sales Pipeline shows your deals in different stages, helps forecast revenue, and tracks conversion rates from leads to closed deals.",
    'contacts': "Contact Management centralizes all your business contacts with detailed information, communication history, and relationship tracking.",
    'sales': "Our sales tools include pipeline management, lead tracking, contact management, and revenue forecasting to boost your sales performance.",
    'supply chain': "Supply Chain Management provides comprehensive tools for managing your entire supply chain including:\n• Supply Chain Dashboard - Key metrics and performance indicators\n• Supplier Management - Vendor relationships and performance tracking\n• Inventory Management - Stock control and optimization\n• Warehouse Management - Facility operations and space utilization",
    'supplier': "Supplier Management helps you manage vendor relationships, track performance metrics, handle contracts, and maintain supplier scorecards for better procurement decisions.",
    'suppliers': "Supplier Management helps you manage vendor relationships, track performance metrics, handle contracts, and maintain supplier scorecards for better procurement decisions.",
    'warehouse': "Warehouse Management allows you to monitor facility operations, track space utilization, manage staff, and optimize warehouse efficiency across all locations.",
    'warehouses': "Warehouse Management allows you to monitor facility operations, track space utilization, manage staff, and optimize warehouse efficiency across all locations.",
    'procurement': "Our procurement tools help you manage supplier relationships, track purchase orders, negotiate contracts, and optimize your supply chain operations.",
    'logistics': "Logistics management includes shipment tracking, delivery optimization, carrier management, and transportation cost control for efficient supply chain operations.",
    'default': "I understand you're asking about business operations. Could you be more specific? I can help with dashboard, orders, customers, inventory, finance, HR, CRM, supply chain, analytics, or settings."
  };

  const getResponse = (message) => {
    const lowerMessage = message.toLowerCase().trim();
    
    // Check for exact matches first
    if (predefinedResponses[lowerMessage]) {
      return predefinedResponses[lowerMessage];
    }
    
    // Check for partial matches
    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (lowerMessage.includes(key) && key !== 'default') {
        return response;
      }
    }
    
    return predefinedResponses.default;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-6 right-6 rounded-lg shadow-2xl border z-50 transition-all duration-300 ${
          isMinimized ? 'w-80 h-16' : 'w-80 h-96'
        } ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          {/* Chat Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot size={20} />
              <div>
                <h3 className="font-semibold text-sm">Business Assistant</h3>
                <p className="text-xs text-blue-100">Online</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-blue-700 p-1 rounded"
              >
                <Minimize2 size={16} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-blue-700 p-1 rounded"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Chat Messages */}
              <div className={`h-64 overflow-y-auto p-4 space-y-3 ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              }`}>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-2 max-w-xs ${
                      message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.sender === 'bot' 
                          ? theme === 'dark' 
                            ? 'bg-blue-900 text-blue-300' 
                            : 'bg-blue-100 text-blue-600'
                          : theme === 'dark' 
                            ? 'bg-gray-700 text-gray-300' 
                            : 'bg-gray-100 text-gray-600'
                      }`}>
                        {message.sender === 'bot' ? <Bot size={16} /> : <User size={16} />}
                      </div>
                      <div className={`rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : theme === 'dark'
                            ? 'bg-gray-700 text-gray-100'
                            : 'bg-gray-100 text-gray-900'
                      }`}>
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'user' 
                            ? 'text-blue-100' 
                            : theme === 'dark' 
                              ? 'text-gray-400' 
                              : 'text-gray-500'
                        }`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-2 max-w-xs">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        theme === 'dark' 
                          ? 'bg-blue-900 text-blue-300' 
                          : 'bg-blue-100 text-blue-600'
                      }`}>
                        <Bot size={16} />
                      </div>
                      <div className={`rounded-lg p-3 ${
                        theme === 'dark' 
                          ? 'bg-gray-700 text-gray-100' 
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <div className={`border-t p-4 ${
                theme === 'dark' 
                  ? 'border-gray-700 bg-gray-800' 
                  : 'border-gray-200 bg-white'
              }`}>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className={`flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      theme === 'dark'
                        ? 'border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400'
                        : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                    }`}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default SimpleChatbot;