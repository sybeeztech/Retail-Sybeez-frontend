import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Palette, 
  Monitor, 
  Moon, 
  Sun, 
  Bell, 
  Globe, 
  User,
  Shield,
  Database,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase
} from 'lucide-react';
import useSettingsStore from '../../store/settingsStore';

const Settings = () => {
  const {
    theme,
    notifications,
    autoSave,
    language,
    setTheme,
    setNotifications,
    setAutoSave,
    setLanguage
  } = useSettingsStore();

  const [activeTab, setActiveTab] = useState('appearance');

  // Mock account data - in a real app, this would come from your auth system
  const accountData = {
    personalInfo: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@company.com',
      phone: '+1 (555) 123-4567',
      position: 'Operations Manager',
      department: 'Retail Operations',
      joinDate: 'January 15, 2023',
      employeeId: 'EMP-001',
    },
    address: {
      street: '123 Business Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States'
    },
    preferences: {
      timezone: 'EST (UTC-5)',
      dateFormat: 'MM/DD/YYYY',
      currency: 'USD ($)'
    }
  };

  const tabs = [
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'preferences', name: 'Preferences', icon: SettingsIcon },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'account', name: 'Account', icon: User },
  ];

  const TabContent = () => {
    switch (activeTab) {
      case 'appearance':
        return (
          <div className="space-y-6">
            {/* Theme Selection */}
            <div>
              <h3 className={`text-lg font-medium mb-4 ${
                theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
              }`}>Theme</h3>
              <div className="grid grid-cols-2 gap-4">
                <div
                  onClick={() => setTheme('light')}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    theme === 'light'
                      ? 'border-blue-500 bg-blue-50'
                      : `border-gray-200 hover:border-gray-300 ${
                          theme === 'dark' ? 'border-gray-600 hover:border-gray-500' : ''
                        }`
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Sun className="w-6 h-6 text-yellow-500" />
                    <div>
                      <p className={`font-medium ${
                        theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      }`}>Light Mode</p>
                      <p className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>Classic bright interface</p>
                    </div>
                  </div>
                  <div className="mt-3 h-16 bg-white border rounded-md flex items-center justify-center">
                    <div className="text-xs text-gray-600">Light Preview</div>
                  </div>
                </div>

                <div
                  onClick={() => setTheme('dark')}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    theme === 'dark'
                      ? 'border-blue-500 bg-blue-50'
                      : `border-gray-200 hover:border-gray-300 ${
                          theme === 'dark' ? 'border-gray-600 hover:border-gray-500' : ''
                        }`
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Moon className="w-6 h-6 text-indigo-500" />
                    <div>
                      <p className={`font-medium ${
                        theme === 'dark' ? 'text-gray-900' : 'text-gray-900'
                      }`}>Dark Mode</p>
                      <p className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>Easy on the eyes</p>
                    </div>
                  </div>
                  <div className="mt-3 h-16 bg-gray-800 border rounded-md flex items-center justify-center">
                    <div className="text-xs text-gray-300">Dark Preview</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'preferences':
        return (
          <div className="space-y-6">
            <div>
              <h3 className={`text-lg font-medium mb-4 ${
                theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
              }`}>System Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-medium ${
                      theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    }`}>Auto Save</p>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>Automatically save changes</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoSave}
                      onChange={(e) => setAutoSave(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className={`w-11 h-6 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 ${
                      theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'
                    }`}></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-medium ${
                      theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    }`}>Language</p>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>Choose your preferred language</p>
                  </div>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-gray-100' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className={`text-lg font-medium mb-4 ${
                theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
              }`}>Notification Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-medium ${
                      theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    }`}>Push Notifications</p>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>Receive notifications for important updates</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications}
                      onChange={(e) => setNotifications(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className={`w-11 h-6 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 ${
                      theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'
                    }`}></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 'account':
        return (
          <div className="space-y-8">
            {/* Personal Information */}
            <div>
              <h3 className={`text-lg font-medium mb-4 flex items-center ${
                theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
              }`}>
                <User className="w-5 h-5 mr-2" />
                Personal Information
              </h3>
              <div className={`rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-6 ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
              }`}>
                <div className="space-y-4">
                  <div>
                    <label className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>Full Name</label>
                    <p className={`font-medium ${
                      theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    }`}>{accountData.personalInfo.firstName} {accountData.personalInfo.lastName}</p>
                  </div>
                  <div>
                    <label className={`text-sm font-medium flex items-center ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <Mail className="w-4 h-4 mr-1" />
                      Email Address
                    </label>
                    <p className={`${
                      theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    }`}>{accountData.personalInfo.email}</p>
                  </div>
                  <div>
                    <label className={`text-sm font-medium flex items-center ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <Phone className="w-4 h-4 mr-1" />
                      Phone Number
                    </label>
                    <p className={`${
                      theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    }`}>{accountData.personalInfo.phone}</p>
                  </div>
                  <div>
                    <label className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>Employee ID</label>
                    <p className={`font-mono ${
                      theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    }`}>{accountData.personalInfo.employeeId}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className={`text-sm font-medium flex items-center ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <Briefcase className="w-4 h-4 mr-1" />
                      Position
                    </label>
                    <p className={`${
                      theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    }`}>{accountData.personalInfo.position}</p>
                  </div>
                  <div>
                    <label className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>Department</label>
                    <p className={`${
                      theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    }`}>{accountData.personalInfo.department}</p>
                  </div>
                  <div>
                    <label className={`text-sm font-medium flex items-center ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <Calendar className="w-4 h-4 mr-1" />
                      Join Date
                    </label>
                    <p className={`${
                      theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    }`}>{accountData.personalInfo.joinDate}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div>
              <h3 className={`text-lg font-medium mb-4 flex items-center ${
                theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
              }`}>
                <MapPin className="w-5 h-5 mr-2" />
                Address Information
              </h3>
              <div className={`rounded-lg p-6 ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
              }`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className={`text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>Street Address</label>
                      <p className={`${
                        theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      }`}>{accountData.address.street}</p>
                    </div>
                    <div>
                      <label className={`text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>City</label>
                      <p className={`${
                        theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      }`}>{accountData.address.city}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className={`text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>State / ZIP</label>
                      <p className={`${
                        theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      }`}>{accountData.address.state} {accountData.address.zipCode}</p>
                    </div>
                    <div>
                      <label className={`text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>Country</label>
                      <p className={`${
                        theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      }`}>{accountData.address.country}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* System Preferences */}
            <div>
              <h3 className={`text-lg font-medium mb-4 flex items-center ${
                theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
              }`}>
                <Globe className="w-5 h-5 mr-2" />
                System Preferences
              </h3>
              <div className={`rounded-lg p-6 ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
              }`}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>Timezone</label>
                    <p className={`${
                      theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    }`}>{accountData.preferences.timezone}</p>
                  </div>
                  <div>
                    <label className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>Date Format</label>
                    <p className={`${
                      theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    }`}>{accountData.preferences.dateFormat}</p>
                  </div>
                  <div>
                    <label className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>Currency</label>
                    <p className={`${
                      theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    }`}>{accountData.preferences.currency}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Security */}
            <div>
              <h3 className={`text-lg font-medium mb-4 flex items-center ${
                theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
              }`}>
                <Shield className="w-5 h-5 mr-2" />
                Account Security
              </h3>
              <div className={`rounded-lg p-6 ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
              }`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>Last Login</label>
                    <p className={`${
                      theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    }`}>Today, 9:15 AM</p>
                  </div>
                  <div>
                    <label className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>Account Status</label>
                    <p className="text-green-600 font-medium">Active</p>
                  </div>
                  <div>
                    <label className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>Two-Factor Authentication</label>
                    <p className="text-green-600 font-medium">Enabled</p>
                  </div>
                  <div>
                    <label className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>Password Last Changed</label>
                    <p className={`${
                      theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    }`}>30 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`p-6 max-w-6xl mx-auto ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    } min-h-screen`}>
      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-2 ${
          theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
        }`}>Settings</h1>
        <p className={`${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>Customize your experience and manage your preferences</p>
      </div>

      <div className={`rounded-lg shadow-sm border ${
        theme === 'dark' 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className={`flex border-b ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        }`}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : `border-transparent transition-colors ${
                        theme === 'dark' 
                          ? 'text-gray-400 hover:text-gray-200 hover:border-gray-600' 
                          : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.name}
              </button>
            );
          })}
        </div>

        <div className="p-6">
          <TabContent />
        </div>
      </div>
    </div>
  );
};

export default Settings;