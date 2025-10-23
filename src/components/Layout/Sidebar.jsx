import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSetupStore } from '../../store/setupStore';
import useSettingsStore from '../../store/settingsStore';
import iconLogo from '../../assets/icon.png';
import {
  LayoutDashboard,
  Users,
  User,
  Building,
  HandCoins,
  Calendar,
  CalendarCheck2,
  CalendarDays,
  ChartNoAxesColumn,
  FileChartColumnIncreasing,
  FileUser,
  ScrollText,
  TreePalm,
  // Retail ERP Icons
  Package,
  ShoppingCart,
  Store,
  Truck,
  Building2,
  BarChart3,
  Zap,
  Target,
  Warehouse,
  // Finance Icons
  DollarSign,
  Calculator,
  TrendingUp,
  PieChart,
  CreditCard,
  Receipt,
  Banknote,
  PiggyBank,
  TrendingDown,
  // CRM Icons
  UserCheck,
  Phone,
  MessageSquare,
  Heart,
  Gift,
  Mail,
  UserPlus,
  // AI & Analytics Icons
  Brain,
  LineChart,
  AlertTriangle,
  Shield,
  Eye,
  ChevronDown,
  ChevronRight,
  Settings,
  HelpCircle
} from 'lucide-react';

function Sidebar() {
  const { setupData } = useSetupStore();
  const { theme } = useSettingsStore();
  const navigate = useNavigate();
  const [lastActivity, setLastActivity] = useState(new Date());
  const userMenuRef = useRef(null);

  const businessName = setupData?.step3?.businessName || 'Sybeez';

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        // Handle any future dropdown if needed
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update timestamp periodically
  useEffect(() => {
    const interval = setInterval(() => {
      // In a real app, you would sync with your backend
      setLastActivity(new Date());

      // Simulate random notifications
      if (Math.random() > 0.7) {
        setHasNotifications(true);
      }
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Mock user data - in a real app, this would come from your auth system
  const currentUser = {
    name: 'Help & Support',
    email: 'support@sybeez.com',
    role: 'Support Center',
    avatar: null,
    lastSeen: new Date()
  };
  const businessLogo = setupData?.step3?.logoPreview;

  const [expandedSections, setExpandedSections] = useState({
    retailERP: true,
    hrm: true,
    finance: true,
    crm: true,
    aiInsights: true,
    reportsAnalytics: true,
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Helper function for consistent NavLink styling
  const getNavLinkClass = (isActive, isSubItem = false) => {
    const baseClasses = `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${isSubItem ? 'ml-6' : ''
      }`;

    if (isActive) {
      return `${baseClasses} ${theme === 'dark'
        ? 'bg-blue-900 text-blue-200 border-r-2 border-blue-400'
        : 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
        }`;
    }

    return `${baseClasses} ${theme === 'dark'
      ? 'text-gray-300 hover:bg-gray-700 hover:text-gray-100'
      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
      }`;
  };

  return (
    <div className={`w-64 border-r flex flex-col h-full ${theme === 'dark'
      ? 'bg-gray-800 border-gray-700'
      : 'bg-white border-gray-200'
      }`}>
      {/* Header */}
      <div className={`flex-shrink-0 px-6 py-4 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'
        }`}>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center overflow-hidden">
            {businessLogo ? (
              <img
                src={businessLogo}
                alt={`${businessName} Logo`}
                className="w-9 h-9 object-cover rounded-lg"
              />
            ) : (
              <img
                src={iconLogo}
                alt="Default Logo"
                className="w-8 h-8 object-contain"
              />
            )}
          </div>
          <div>
            <h1 className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>{businessName}</h1>
            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Retail ERP</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-3 space-y-1">
          {/* Main Dashboard */}
          <NavLink
            to="/retail-erp/dashboard"
            className={({ isActive }) => getNavLinkClass(isActive)}
          >
            <LayoutDashboard className="mr-3 h-5 w-5" />
            Dashboard
          </NavLink>

          {/* Retail ERP Section */}
          <div className="mt-6">
            <button
              onClick={() => toggleSection('retailERP')}
              className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md transition-colors ${theme === 'dark'
                ? 'text-gray-100 hover:bg-gray-700'
                : 'text-gray-900 hover:bg-gray-50'
                }`}
            >
              <Store className="mr-3 h-5 w-5 text-blue-600" />
              Retail ERP
              {expandedSections.retailERP ? (
                <ChevronDown className="ml-auto h-4 w-4" />
              ) : (
                <ChevronRight className="ml-auto h-4 w-4" />
              )}
            </button>

            {expandedSections.retailERP && (
              <div className="ml-6 mt-1 space-y-1">
                <NavLink
                  to="/retail-erp/inventory"
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${isActive
                      ? theme === 'dark'
                        ? 'bg-blue-900 text-blue-200'
                        : 'bg-blue-50 text-blue-700'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <Package className="mr-3 h-4 w-4" />
                  Inventory
                </NavLink>

                <NavLink
                  to="/retail-erp/sales-pos"
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${isActive
                      ? theme === 'dark'
                        ? 'bg-blue-900 text-blue-200'
                        : 'bg-blue-50 text-blue-700'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <ShoppingCart className="mr-3 h-4 w-4" />
                  Sales POS
                </NavLink>
                <NavLink
                  to="/retail-erp/Customer"
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${isActive
                      ? 'bg-orange-50 text-orange-700'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <Heart className="mr-3 h-4 w-4" />
                  Customers
                </NavLink>


                <NavLink
                  to="/supply-chain/suppliers"
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${isActive
                      ? theme === 'dark'
                        ? 'bg-blue-900 text-blue-200'
                        : 'bg-blue-50 text-blue-700'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <Truck className="mr-3 h-4 w-4" />
                  Suppliers
                </NavLink>


                <NavLink
                  to="/retail-erp/branches"
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${isActive
                      ? theme === 'dark'
                        ? 'bg-blue-900 text-blue-200'
                        : 'bg-blue-50 text-blue-700'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <Building2 className="mr-3 h-4 w-4" />
                  Branches
                </NavLink>
                <NavLink
                  to="/reports-analytics"
                  className={({ isActive }) =>
                    `flex items-center w-full px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive
                      ? theme === 'dark'
                        ? 'bg-blue-900 text-blue-200'
                        : 'bg-blue-50 text-blue-700'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <FileChartColumnIncreasing className="mr-3 h-5 w-5 text-purple-600" />
                  Reports & Analytics
                </NavLink>
              </div>
            )}
          </div>

          {/* HRM + Payroll Section */}
          <div className="mt-6">
            <button
              onClick={() => toggleSection('hrm')}
              className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md transition-colors ${theme === 'dark'
                ? 'text-gray-100 hover:bg-gray-700'
                : 'text-gray-900 hover:bg-gray-50'
                }`}
            >
              <Users className="mr-3 h-5 w-5 text-green-600" />
              HRM + Payroll
              {expandedSections.hrm ? (
                <ChevronDown className="ml-auto h-4 w-4" />
              ) : (
                <ChevronRight className="ml-auto h-4 w-4" />
              )}
            </button>

            {expandedSections.hrm && (
              <div className="ml-6 mt-1 space-y-1">
                <NavLink
                  to="/hrm/dashboard"
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${isActive
                      ? 'bg-green-50 text-green-700'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <LayoutDashboard className="mr-3 h-4 w-4" />
                  HRM Dashboard
                </NavLink>

                <NavLink
                  to="/hrm/employees"
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${isActive
                      ? 'bg-green-50 text-green-700'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <User className="mr-3 h-4 w-4" />
                  Employees
                </NavLink>

                <NavLink
                  to="/hrm/attendance"
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${isActive
                      ? 'bg-green-50 text-green-700'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <Calendar className="mr-3 h-4 w-4" />
                  Attendance
                </NavLink>

                <NavLink
                  to="/hrm/payroll"
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${isActive
                      ? 'bg-green-50 text-green-700'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <HandCoins className="mr-3 h-4 w-4" />
                  Payroll
                </NavLink>
              </div>
            )}
          </div>

          {/* Finance Section */}
          <div className="mt-6">
            <button
              onClick={() => toggleSection('finance')}
              className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md transition-colors ${theme === 'dark'
                ? 'text-gray-100 hover:bg-gray-700'
                : 'text-gray-900 hover:bg-gray-50'
                }`}
            >
              <DollarSign className="mr-3 h-5 w-5 text-purple-600" />
              Finance
              {expandedSections.finance ? (
                <ChevronDown className="ml-auto h-4 w-4" />
              ) : (
                <ChevronRight className="ml-auto h-4 w-4" />
              )}
            </button>

            {expandedSections.finance && (
              <div className="ml-6 mt-1 space-y-1">
                <NavLink
                  to="/finance/dashboard"
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${isActive
                      ? 'bg-purple-50 text-purple-700'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <LayoutDashboard className="mr-3 h-4 w-4" />
                  Dashboard
                </NavLink>

                <NavLink
                  to="/finance/transactions"
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${isActive
                      ? 'bg-purple-50 text-purple-700'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <CreditCard className="mr-3 h-4 w-4" />
                  Transactions
                </NavLink>

                <NavLink
                  to="/finance/reports"
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${isActive
                      ? 'bg-purple-50 text-purple-700'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <FileChartColumnIncreasing className="mr-3 h-4 w-4" />
                  Reports (P&L/Balance/Cash Flow)
                </NavLink>

                <NavLink
                  to="/finance/tax-compliance"
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${isActive
                      ? 'bg-purple-50 text-purple-700'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <Calculator className="mr-3 h-4 w-4" />
                  Tax & Compliance
                </NavLink>
              </div>
            )}
          </div>

          {/* CRM Section */}
          <div className="mt-6">
            <button
              onClick={() => toggleSection('crm')}
              className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md transition-colors ${theme === 'dark'
                ? 'text-gray-100 hover:bg-gray-700'
                : 'text-gray-900 hover:bg-gray-50'
                }`}
            >
              <UserCheck className="mr-3 h-5 w-5 text-orange-600" />
              CRM
              {expandedSections.crm ? (
                <ChevronDown className="ml-auto h-4 w-4" />
              ) : (
                <ChevronRight className="ml-auto h-4 w-4" />
              )}
            </button>

            {expandedSections.crm && (
              <div className="ml-6 mt-1 space-y-1">
                <NavLink
                  to="/crm/customers"
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${isActive
                      ? 'bg-orange-50 text-orange-700'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <LayoutDashboard className="mr-3 h-4 w-4" />
                  Customer Dashboard
                </NavLink>

                <NavLink
                  to="/crm/contacts"
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${isActive
                      ? 'bg-orange-50 text-orange-700'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <UserPlus className="mr-3 h-4 w-4" />
                  Contact Management
                </NavLink>

                <NavLink
                  to="/crm/leads"
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${isActive
                      ? 'bg-orange-50 text-orange-700'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <Target className="mr-3 h-4 w-4" />
                  Leads Management
                </NavLink>

                <NavLink
                  to="/crm/pipeline"
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${isActive
                      ? 'bg-orange-50 text-orange-700'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <TrendingUp className="mr-3 h-4 w-4" />
                  Sales Pipeline
                </NavLink>

                <NavLink
                  to="/crm/loyalty"
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${isActive
                      ? 'bg-orange-50 text-orange-700'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <Heart className="mr-3 h-4 w-4" />
                  Loyalty Program
                </NavLink>

                <NavLink
                  to="/crm/campaigns"
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${isActive
                      ? 'bg-orange-50 text-orange-700'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <Mail className="mr-3 h-4 w-4" />
                  Marketing Campaigns
                </NavLink>
              </div>
            )}
          </div>




          {/* Business Analytics Section */}
          <div className="mt-6">
            <NavLink
              to="/analytics"
              className={({ isActive }) =>
                `flex items-center w-full px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive
                  ? 'bg-purple-50 text-purple-700'
                  : theme === 'dark'
                    ? 'text-gray-100 hover:bg-gray-700'
                    : 'text-gray-900 hover:bg-gray-50'
                }`
              }
            >
              <BarChart3 className="mr-3 h-5 w-5 text-purple-600" />
              Business Analytics
            </NavLink>
          </div>

          {/* AI Insights Section */}
          <div className="mt-6">
            <button
              onClick={() => toggleSection('aiInsights')}
              className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md transition-colors ${theme === 'dark'
                ? 'text-gray-100 hover:bg-gray-700'
                : 'text-gray-900 hover:bg-gray-50'
                }`}
            >
              <Brain className="mr-3 h-5 w-5 text-indigo-600" />
              AI Insights
              {expandedSections.aiInsights ? (
                <ChevronDown className="ml-auto h-4 w-4" />
              ) : (
                <ChevronRight className="ml-auto h-4 w-4" />
              )}
            </button>

            {expandedSections.aiInsights && (
              <div className="ml-6 mt-1 space-y-1">
                <NavLink
                  to="/ai/sales-trends"
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${isActive
                      ? 'bg-indigo-50 text-indigo-700'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <LineChart className="mr-3 h-4 w-4" />
                  Sales Trends
                </NavLink>

                <NavLink
                  to="/ai/customer-trends"
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${isActive
                      ? 'bg-indigo-50 text-indigo-700'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <Target className="mr-3 h-4 w-4" />
                  Customer Trends
                </NavLink>

                <NavLink
                  to="/ai/alerts"
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${isActive
                      ? 'bg-indigo-50 text-indigo-700'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <AlertTriangle className="mr-3 h-4 w-4" />
                  Alerts
                </NavLink>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Footer - Help & Support Section */}
      <div className={`flex-shrink-0 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'
        }`}>
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => navigate('/help')}
            className={`w-full p-3 flex items-center space-x-3 transition-colors ${theme === 'dark'
              ? 'hover:bg-gray-700 text-gray-100'
              : 'hover:bg-gray-50 text-gray-900'
              }`}
          >
            <div className="relative">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-white' : 'bg-white'
                }`}>
                <HelpCircle className={`h-4 w-4 ${theme === 'dark' ? 'text-gray-800' : 'text-gray-600'
                  }`} />
              </div>
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className={`text-sm font-medium truncate ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                }`}>Help & Support</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;