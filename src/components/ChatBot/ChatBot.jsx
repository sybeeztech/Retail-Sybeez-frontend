import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Minimize2,
  Maximize2,
  Settings,
  RefreshCw,
  ExternalLink,
  Zap
} from 'lucide-react';
import chatBotService from '../../services/chatBotService';
import chatBotConfig from '../../config/chatBotConfig';

const ChatBot = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: chatBotConfig.messages.welcome,
      timestamp: new Date(),
      responseType: 'welcome'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);

    try {
      // Use the chatbot service for intelligent responses
      const response = await chatBotService.sendToAIAgent(message, {
        userId: 'current_user', // This will be from auth store
        userRole: 'admin',
        currentModule: window.location.pathname
      });

      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: response.content,
        timestamp: new Date(),
        responseType: response.type,
        actions: response.actions || []
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      const errorResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: 'I apologize, but I encountered an error. Please try again or contact support if the issue persists.',
        timestamp: new Date(),
        responseType: 'error'
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleActionClick = (action) => {
    if (action.action === 'navigate') {
      navigate(action.target);
      // Add a confirmation message
      const confirmMessage = {
        id: messages.length + 1,
        type: 'bot',
        content: `Navigating to ${action.label}...`,
        timestamp: new Date(),
        responseType: 'navigation'
      };
      setMessages(prev => [...prev, confirmMessage]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 group"
        >
          <MessageCircle className="w-6 h-6" />
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            1
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={`bg-white rounded-lg shadow-2xl border border-gray-200 transition-all duration-300 ${
        isMinimized ? 'w-80 h-16' : 'w-80 h-96'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">AI Business Assistant</h3>
              <p className="text-xs text-blue-100">Online • Ready to help</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 p-4 h-64 overflow-y-auto bg-gray-50">
              {/* Quick Actions - shown when no messages */}
              {messages.length === 1 && (
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-3">Quick Actions:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {chatBotConfig.quickActions.slice(0, 4).map((action, index) => (
                      <button 
                        key={index}
                        onClick={() => setMessage(action.query)}
                        className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 text-xs text-left transition-colors"
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-2 max-w-[75%] ${
                      msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        msg.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                      }`}>
                        {msg.type === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                      </div>
                      <div>
                        <div className={`rounded-lg px-3 py-2 text-sm ${
                          msg.type === 'user' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-white text-gray-800 border border-gray-200'
                        }`}>
                          <p className="whitespace-pre-wrap">{msg.content}</p>
                          
                          {/* Action buttons for bot responses */}
                          {msg.type === 'bot' && msg.actions && msg.actions.length > 0 && (
                            <div className="mt-3 space-y-2">
                              {msg.actions.map((action, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleActionClick(action)}
                                  className="w-full text-left px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md transition-colors flex items-center justify-between group"
                                >
                                  <span className="text-sm font-medium">{action.label}</span>
                                  <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1 px-1">
                          {formatTime(msg.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-2">
                      <div className="w-6 h-6 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center">
                        <Bot className="w-3 h-3" />
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg px-3 py-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
              <div className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about your business..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    rows="1"
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg p-2 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-gray-500">
                  Press Enter to send, Shift+Enter for new line
                </p>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-500">AI Ready</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatBot;