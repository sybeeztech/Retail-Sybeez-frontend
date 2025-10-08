import React, { useState } from 'react';
import { Bell, User, LogOut, Settings, Menu, Search, ChevronDown, UserCircle } from 'lucide-react';

function TopBar({ onMobileMenuClick }) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock user data for the integrated app
  const user = {
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'admin'
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    setShowUserMenu(false);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 z-40">
      <div className="flex items-center justify-between px-4 lg:px-6 py-3">
        {/* Left side - Mobile menu and search */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={onMobileMenuClick}
            className="md:hidden p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          {/* Professional Search Bar */}
          <div className="hidden sm:flex items-center">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search across modules..."
                className="block w-64 lg:w-80 pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>
          
          {/* Desktop Greeting */}
          <div className="hidden lg:block">
            <h2 className="text-lg font-medium text-gray-900">
              {getGreeting()}, {user?.employee?.first_name || 'User'}!
            </h2>
            <p className="text-sm text-gray-500">Ready to manage your business</p>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center space-x-2">
          {/* Quick Settings - Desktop Only */}
          <button className="hidden lg:flex p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
            <Settings className="w-4 h-4" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="font-medium text-gray-900">Notifications</h3>
                  <p className="text-sm text-gray-500">You have 3 unread notifications</p>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <div className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">New leave request</p>
                        <p className="text-sm text-gray-600">John Doe submitted a leave request</p>
                        <p className="text-xs text-gray-400 mt-1">2 minutes ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Payroll processed</p>
                        <p className="text-sm text-gray-600">Monthly payroll has been completed</p>
                        <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">New order received</p>
                        <p className="text-sm text-gray-600">Order #ORD001 needs attention</p>
                        <p className="text-xs text-gray-400 mt-1">3 hours ago</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-3 border-t border-gray-100">
                  <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    {(user?.employee?.first_name || 'A').charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.employee?.first_name} {user?.employee?.last_name}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {user?.employee?.role || 'Employee'}
                  </p>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <div className="px-3 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.employee?.first_name} {user?.employee?.last_name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user?.employee?.email || 'employee@company.com'}
                  </p>
                </div>
                
                <button
                  onClick={() => setShowUserMenu(false)}
                  className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <UserCircle className="w-4 h-4 mr-2" />
                  Profile Settings
                </button>
                
                <button
                  onClick={() => setShowUserMenu(false)}
                  className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Preferences
                </button>
                
                <div className="border-t border-gray-100 my-1"></div>
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default TopBar;