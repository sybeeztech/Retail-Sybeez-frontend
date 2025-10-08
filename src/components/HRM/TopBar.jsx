// TopBar.jsx
import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore'; // Update the import path
import { useNavigate } from 'react-router-dom';
 
const TopBar = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    // Optional: Redirect to login page after logout
    // window.location.href = '/login'; 
    navigate('/login');
  };

  return (
    <div className="fixed top-0 left-58 right-0 h-12 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-30">
      {/* Search Bar */}
      <div className="flex-1 max-w-md mx-4">
        {/* <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search employees, departments, reports..."
            className="block w-full pl-10 pr-3 py-1 border border-gray-300 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500 "
          />
        </div> */}
      </div>

      {/* Right Section with Notifications and User Menu */}
      <div className="flex items-center">
        {/* Notifications */}
        <div className="relative mr-4">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-1 rounded-full text-gray-600 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <svg className="h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-0 right-0 flex h-4 w-4 -mt-1 -mr-1">
              {/* <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span> */}
              <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-xs text-white items-center justify-center">3</span>
            </span>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-50">
              <div className="p-3 border-b border-gray-200">
                <h3 className="font-semibold text-gray-700">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                <div className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                  <p className="text-sm font-medium">New leave request from Sarah Johnson</p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
                <div className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                  <p className="text-sm font-medium">Payroll processing completed</p>
                  <p className="text-xs text-gray-500">1 hour ago</p>
                </div>
                <div className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                  <p className="text-sm font-medium">3 new employees added to Engineering</p>
                  <p className="text-xs text-gray-500">Yesterday</p>
                </div>
              </div>
              <div className="p-3 border-t border-gray-200 text-center">
                <button className="text-sm text-blue-600 font-medium hover:text-blue-800">
                  View All Notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Avatar and Menu */}
        <div className="relative">
          <button 
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center focus:outline-none"
          >
            {/* <svg xmlns="http://www.w3.org/2000/svg" className='text-gray-600' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <circle cx="12" cy="10" r="3"/>
              <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/>
            </svg> */}
            <img src={user?.employee.avatar} alt="User Avatar" className="h-8 w-8 rounded-full object-cover" />
            <span className="ml-2 text-gray-700 text-sm font-medium">
              {user?.employee.firstName || 'Admin'}
            </span>
            <svg className="ml-1 h-4 w-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>

          {/* User Menu Dropdown */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">
                  {user?.firstName} {user?.lastName}
                </p>
                {/* <p className="text-xs text-gray-500">{user?.email || 'admin@company.com'}</p> */}
                <p className="text-xs text-blue-600 font-medium capitalize">{user?.employee.role}</p>
              </div>
              {/* <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a> */}
              <div className="border-t border-gray-100"></div>
              <button 
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Click outside handlers */}
      {(showUserMenu || showNotifications) && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowUserMenu(false);
            setShowNotifications(false);
          }}
        ></div>
      )}
    </div>
  );
};

export default TopBar;