import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, User, LogOut, Settings, Menu, Search, ChevronDown, UserCircle } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
import useSettingsStore from '../../store/settingsStore';

function TopBar({ onMobileMenuClick }) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const { theme } = useSettingsStore();

  // Mock user data for the integrated app
  const user = {
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'admin',
    employee: {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@company.com',
      role: 'admin'
    }
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    setShowUserMenu(false);

    localStorage.removeItem('auth-storage');
    navigate('/login');
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    // Clear user session data
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    // You might also want to clear other stored data
    
    // Navigate to login page or reload to show login
    // For now, we'll just reload the page
    window.location.href = '/';
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: 'Good Morning', emoji: '☀️' };
    if (hour < 18) return { text: 'Good Afternoon', emoji: '🌞' };
    return { text: 'Good Evening', emoji: '🌙' };
  };

  return (
    <header className={`shadow-sm border-b z-40 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className="flex items-center justify-between px-4 lg:px-6 py-3">
        {/* Left side - Mobile menu and search */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={onMobileMenuClick}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              theme === 'dark' 
                ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Menu className="w-5 h-5" />
          </button>
          
          {/* Professional Search Bar */}
          <div className="hidden sm:flex items-center">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className={`h-4 w-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
              </div>
              <input
                type="text"
                placeholder="Search across modules..."
                className={`block w-64 lg:w-80 pl-9 pr-3 py-2 text-sm border rounded-lg transition-all focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                  theme === 'dark' 
                    ? 'border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:bg-gray-600 focus:border-blue-500' 
                    : 'border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-500 focus:bg-white focus:border-blue-500'
                }`}
              />
            </div>
          </div>
          
          {/* Desktop Greeting */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-2">
              <h2 className={`text-lg font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                {getGreeting().text}, {user?.employee?.first_name || 'User'}!
              </h2>
              <span className="text-xl">{getGreeting().emoji}</span>
            </div>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Ready to manage your business</p>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center space-x-2">
          {/* Quick Settings - Desktop Only */}
          <button 
            onClick={() => navigate('/settings')}
            className={`hidden lg:flex p-2 rounded-lg transition-colors ${
              theme === 'dark' 
                ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className={`relative p-2 rounded-lg transition-colors ${
                theme === 'dark' 
                  ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Bell className="w-5 h-5" />
              <span className={`absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ${
                theme === 'dark' ? 'ring-gray-800' : 'ring-white'
              }`}></span>
            </button>

            {showNotifications && (
              <div className={`absolute right-0 mt-2 w-80 rounded-lg shadow-lg border z-50 ${
                theme === 'dark' 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              }`}>
                <div className={`p-4 border-b ${
                  theme === 'dark' ? 'border-gray-700' : 'border-gray-100'
                }`}>
                  <h3 className={`font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>Notifications</h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>You have 3 unread notifications</p>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <div className={`p-4 transition-colors ${
                    theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  }`}>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>New leave request</p>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>John Doe submitted a leave request</p>
                        <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>2 minutes ago</p>
                      </div>
                    </div>
                  </div>
                  <div className={`p-4 transition-colors ${
                    theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  }`}>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>Payroll processed</p>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Monthly payroll has been completed</p>
                        <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>1 hour ago</p>
                      </div>
                    </div>
                  </div>
                  <div className={`p-4 transition-colors ${
                    theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  }`}>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>New order received</p>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Order #ORD001 needs attention</p>
                        <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>3 hours ago</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`p-3 border-t ${
                  theme === 'dark' ? 'border-gray-700' : 'border-gray-100'
                }`}>
                  <button className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
                  }`}>
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
              className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                theme === 'dark' 
                  ? 'text-gray-300 hover:bg-gray-700' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    {(user?.employee?.first_name || 'A').charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="hidden sm:block text-left">
                  <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                    {user?.employee?.first_name} {user?.employee?.last_name}
                  </p>
                  <p className={`text-xs capitalize ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {user?.employee?.role || 'Employee'}
                  </p>
                </div>
                <ChevronDown className={`h-4 w-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
              </div>
            </button>

            {showUserMenu && (
              <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg border py-1 z-50 ${
                theme === 'dark' 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              }`}>
                <div className={`px-3 py-2 border-b ${
                  theme === 'dark' ? 'border-gray-700' : 'border-gray-100'
                }`}>
                  <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                    {user?.employee?.first_name} {user?.employee?.last_name}
                  </p>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {user?.employee?.email || 'employee@company.com'}
                  </p>
                </div>
                
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    navigate('/profile');
                  }}
                  className={`w-full flex items-center px-3 py-2 text-sm transition-colors ${
                    theme === 'dark' 
                      ? 'text-gray-300 hover:bg-gray-700' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <UserCircle className="w-4 h-4 mr-2" />
                  Profile Settings
                </button>
                
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    navigate('/settings');
                  }}
                  className={`w-full flex items-center px-3 py-2 text-sm transition-colors ${
                    theme === 'dark' 
                      ? 'text-gray-300 hover:bg-gray-700' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Preferences
                </button>
                
                <div className={`border-t my-1 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'}`}></div>
                
                <button
                  onClick={handleLogout}
                  className={`w-full flex items-center px-3 py-2 text-sm text-red-600 transition-colors ${
                    theme === 'dark' ? 'hover:bg-red-900/20' : 'hover:bg-red-50'
                  }`}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
          <div className={`relative p-6 border w-96 shadow-lg rounded-lg ${
            theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
          }`}>
            <div className="mt-3 text-center">
              <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full ${
                theme === 'dark' ? 'bg-red-900/20' : 'bg-red-100'
              }`}>
                <LogOut className={`h-6 w-6 ${
                  theme === 'dark' ? 'text-red-400' : 'text-red-600'
                }`} />
              </div>
              <h3 className={`text-lg leading-6 font-medium mt-4 ${
                theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Confirm Sign Out
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Are you sure you want to sign out? You will need to sign in again to access your account.
                </p>
              </div>
              <div className="flex justify-center space-x-3 mt-4">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600' 
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default TopBar;