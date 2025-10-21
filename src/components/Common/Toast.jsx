import React, { useState, useEffect } from 'react';
import { Check, X, AlertCircle, Info } from 'lucide-react';
import useSettingsStore from '../../store/settingsStore';

const Toast = ({ message, type = 'success', isVisible, onClose }) => {
  const { theme } = useSettingsStore();

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return theme === 'dark' 
          ? 'bg-green-800 border-green-700 text-green-100' 
          : 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return theme === 'dark' 
          ? 'bg-red-800 border-red-700 text-red-100' 
          : 'bg-red-50 border-red-200 text-red-800';
      case 'info':
        return theme === 'dark' 
          ? 'bg-blue-800 border-blue-700 text-blue-100' 
          : 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return theme === 'dark' 
          ? 'bg-gray-800 border-gray-700 text-gray-100' 
          : 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <Check className="w-5 h-5" />;
      case 'error':
        return <AlertCircle className="w-5 h-5" />;
      case 'info':
        return <Info className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-sm w-full transition-all duration-300 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
    }`}>
      <div className={`rounded-lg border p-4 shadow-lg ${getTypeStyles()}`}>
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {getIcon()}
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium">{message}</p>
          </div>
          <div className="ml-4 flex-shrink-0">
            <button
              onClick={onClose}
              className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                theme === 'dark' 
                  ? 'text-gray-400 hover:text-gray-200 focus:ring-gray-600' 
                  : 'text-gray-400 hover:text-gray-500 focus:ring-gray-500'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toast;