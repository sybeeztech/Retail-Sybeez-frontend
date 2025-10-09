import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
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
  const [expandedSections, setExpandedSections] = useState({
    retailERP: true,
    hrm: true,
    finance: true,
    crm: true,
    aiInsights: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="flex-shrink-0 px-6 py-4 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">🛍</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Sybeez</h1>
            <p className="text-xs text-gray-500">Retail ERP</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-3 space-y-1">
          {/* Main Dashboard */}
          <NavLink 
            to="/retail-erp/dashboard" 
            className={({ isActive }) => 
              `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive 
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <LayoutDashboard className="mr-3 h-5 w-5" />
            Dashboard
          </NavLink>

          {/* Retail ERP Section */}
          <div className="mt-6">
            <button
              onClick={() => toggleSection('retailERP')}
              className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-md"
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
                    `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                      isActive 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <Package className="mr-3 h-4 w-4" />
                  Inventory
                </NavLink>
                
                <NavLink 
                  to="/retail-erp/pos" 
                  className={({ isActive }) => 
                    `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                      isActive 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <ShoppingCart className="mr-3 h-4 w-4" />
                  Sales POS
                </NavLink>
                
                <NavLink 
                  to="/supply-chain/suppliers" 
                  className={({ isActive }) => 
                    `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                      isActive 
                        ? 'bg-blue-50 text-blue-700' 
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
                    `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                      isActive 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <Building2 className="mr-3 h-4 w-4" />
                  Branches
                </NavLink>
              </div>
            )}
          </div>

          {/* HRM + Payroll Section */}
          <div className="mt-6">
            <button
              onClick={() => toggleSection('hrm')}
              className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-md"
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
                    `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                      isActive 
                        ? 'bg-green-50 text-green-700' 
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
                    `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                      isActive 
                        ? 'bg-green-50 text-green-700' 
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
                    `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                      isActive 
                        ? 'bg-green-50 text-green-700' 
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
                    `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                      isActive 
                        ? 'bg-green-50 text-green-700' 
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
              className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-md"
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
                    `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                      isActive 
                        ? 'bg-purple-50 text-purple-700' 
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
                    `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                      isActive 
                        ? 'bg-purple-50 text-purple-700' 
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
                    `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                      isActive 
                        ? 'bg-purple-50 text-purple-700' 
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
                    `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                      isActive 
                        ? 'bg-purple-50 text-purple-700' 
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
              className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-md"
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
                    `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                      isActive 
                        ? 'bg-orange-50 text-orange-700' 
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
                    `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                      isActive 
                        ? 'bg-orange-50 text-orange-700' 
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
                    `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                      isActive 
                        ? 'bg-orange-50 text-orange-700' 
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
                    `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                      isActive 
                        ? 'bg-orange-50 text-orange-700' 
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
                    `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                      isActive 
                        ? 'bg-orange-50 text-orange-700' 
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
                    `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                      isActive 
                        ? 'bg-orange-50 text-orange-700' 
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

          {/* AI Insights Section */}
          <div className="mt-6">
            <button
              onClick={() => toggleSection('aiInsights')}
              className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-md"
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
                    `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                      isActive 
                        ? 'bg-indigo-50 text-indigo-700' 
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
                    `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                      isActive 
                        ? 'bg-indigo-50 text-indigo-700' 
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
                    `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                      isActive 
                        ? 'bg-indigo-50 text-indigo-700' 
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

      {/* Footer */}
      <div className="flex-shrink-0 border-t border-gray-100 p-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-gray-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
            <p className="text-xs text-gray-500 truncate">admin@sybeez.com</p>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;