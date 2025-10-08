import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { X, Menu } from 'lucide-react';

const MobileNav = ({ isOpen, onClose, children }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Mobile sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-blue-700 text-white z-50 transform transition-transform duration-300 ease-in-out md:hidden
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between p-4 border-b border-blue-600">
          <h1 className="text-xl font-bold">Business Manager</h1>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-blue-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  );
};

export default MobileNav;