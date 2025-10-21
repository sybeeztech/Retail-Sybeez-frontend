import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar';
import TopBar from './components/Layout/TopBar';
import SimpleChatbot from './components/SimpleChatbot';
import LoginPage from './components/Auth/LoginPage';

// Login Component
import LoginPage from './Login/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';

// Setup Components
import SetupWrapper from './components/retailSetup/SetupWrapper';

// Retail ERP Components
import RetailERPDashboard from './components/RetailERP/RetailERPDashboard';
import ProductInventoryManagement from './components/RetailERP/ProductInventoryManagement';
import POSSystem from './components/RetailERP/POSSystem';
import MultiBranchManagement from './components/RetailERP/MultiBranchManagement';

import CRMDashboard from './components/CRM/CRMDashboard';
import LeadsManagement from './components/CRM/LeadsManagement';
import SalesPipeline from './components/CRM/SalesPipeline';
import ContactManagement from './components/CRM/ContactManagement';
import IndianRetailCRM from './components/CRM/IndianRetailCRM';
import IndianRetailContactManagement from './components/CRM/IndianRetailContactManagement';
import IndianRetailLeadsManagement from './components/CRM/IndianRetailLeadsManagement';
import IndianRetailSalesPipeline from './components/CRM/IndianRetailSalesPipeline';
import IndianRetailMarketingCampaigns from './components/CRM/IndianRetailMarketingCampaigns';
import MainFinanceDashboard from './components/Finance/MainFinanceDashboard';
import TransactionManagement from './components/Finance/TransactionManagement';
import TaxCompliance from './components/Finance/TaxCompliance';
import InvoiceManagement from './components/Finance/InvoiceManagement';
import BudgetManagement from './components/Finance/BudgetManagement';
import FinancialReports from './components/Finance/FinancialReports';
import BusinessAnalytics from './components/Analytics/BusinessAnalyticsOptimized';
import SalesTrends from './components/AI/SalesTrends';
import CustomerTrends from './components/AI/CustomerTrends';
import Alerts from './components/AI/Alerts';
import SupplyChainDashboard from './components/SupplyChain/SupplyChainDashboard';
import SupplierManagement from './components/SupplyChain/SupplierManagement';
import Settings from './components/Settings/Settings';
import ProfileSettings from './components/Profile/ProfileSettings';
import HelpPage from './pages/HelpPage';
import InventoryManagement from './components/SupplyChain/InventoryManagement';
import WarehouseManagement from './components/SupplyChain/WarehouseManagement';
import HRMDashboard from './components/HRM/Dashboard';
import EmployeeDirectory from './components/HRM/EmployeeDirectory';
import PayrollDashboard from './components/HRM/PayrollDashboard';
import DepartmentManagement from './components/HRM/DepartmentManagement';
// import EmployeeProfile from './components/HRM/EmployeeProfile';
import AttendanceManagement from './components/HRM/AttendanceManagement';
import LeaveManagement from './components/HRM/LeaveManagement';
import PerformanceManagement from './components/HRM/PerformanceManagement';
import { makeServer } from './mirage/server';


import SetupStep1 from './components/retailSetup/SetupStep1';
import SetupStep2 from './components/retailSetup/SetupStep2';
import SetupStep3 from './components/retailSetup/SetupStep3';
import SetupStep4 from './components/retailSetup/SetupStep4';
import SetupStep5 from './components/retailSetup/SetupStep5';
import SetupStep6 from './components/retailSetup/SetupStep6';
import SetupStep7 from './components/retailSetup/SetupStep7';
import SetupStep8 from './components/retailSetup/SetupStep8';
import SetupStep9 from './components/retailSetup/SetupStep9';
// import ChatBot from './components/ChatBot/ChatBot';

// Import the settings store
import useSettingsStore from './store/settingsStore';

// Component placeholders
const Dashboard = () => (
  <div className="p-6">
    <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900">Total Sales</h3>
        <p className="text-3xl font-bold text-blue-600 mt-2">$125,430</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900">Orders</h3>
        <p className="text-3xl font-bold text-green-600 mt-2">1,234</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900">Customers</h3>
        <p className="text-3xl font-bold text-purple-600 mt-2">5,678</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900">Revenue</h3>
        <p className="text-3xl font-bold text-orange-600 mt-2">$89,230</p>
      </div>
    </div>
  </div>
);

const Orders = () => (
  <div className="p-6">
    <h1 className="text-2xl font-semibold text-gray-900 mb-6">Orders</h1>
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <p>Orders management coming soon...</p>
      </div>
    </div>
  </div>
);

const Customers = () => (
  <div className="p-6">
    <h1 className="text-2xl font-semibold text-gray-900 mb-6">Customers</h1>
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <p>Customer management coming soon...</p>
      </div>
    </div>
  </div>
);

const Inventory = () => (
  <div className="p-6">
    <h1 className="text-2xl font-semibold text-gray-900 mb-6">Inventory</h1>
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <p>Inventory management coming soon...</p>
      </div>
    </div>
  </div>
);

const Finance = () => (
  <div className="p-6">
    <h1 className="text-2xl font-semibold text-gray-900 mb-6">Finance</h1>
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <p>Please use the finance navigation menu to access specific finance modules.</p>
        <div className="mt-4 space-y-2">
          <p className="text-sm text-gray-600">Available modules:</p>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>Finance Dashboard - Overview of financial performance</li>
            <li>Invoice Management - Create and manage invoices</li>
            <li>Budget Management - Plan and track budgets</li>
            <li>Financial Reports - Comprehensive financial statements</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

const HRM = () => <HRMDashboard />;

const Analytics = () => <BusinessAnalytics />;

if (process.env.NODE_ENV === 'production') {
  // if (process.env.NODE_ENV === 'development') {
    makeServer({ environment: 'production' });
    // makeServer({ environment: 'development' });
  }

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme } = useSettingsStore();

  // Apply theme to document root
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Router>
      <Routes>
        {/* Root redirect to login */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Setup Routes */}
        <Route path="/retail/setup/*" element={<SetupWrapper />} />
        
        {/* Protected Main Application */}
        <Route path="/*" element={
          <ProtectedRoute>
            <div className={`flex h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
              <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
              
              <div className="flex-1 flex flex-col overflow-hidden">
                <TopBar setSidebarOpen={setSidebarOpen} />
                
                <main className={`flex-1 overflow-x-hidden overflow-y-auto ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
                  <Routes>
                    <Route path="/" element={<Navigate to="/retail-erp/dashboard" replace />} />
                    <Route path="/dashboard" element={<Navigate to="/retail-erp/dashboard" replace />} />
                    
                    {/* Retail ERP Routes */}
                    <Route path="/retail-erp" element={<RetailERPDashboard />} />
                    <Route path="/retail-erp/dashboard" element={<RetailERPDashboard />} />
                    <Route path="/retail-erp/inventory" element={<ProductInventoryManagement />} />
                    <Route path="/retail-erp/purchases" element={<SupplierManagement />} />
                    <Route path="/retail-erp/sales-pos" element={<POSSystem />} />
                    <Route path="/retail-erp/suppliers" element={<SupplierManagement />} />
                    <Route path="/retail-erp/branches" element={<MultiBranchManagement />} />
                    
                    {/* Legacy Routes for backward compatibility */}
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/customers" element={<Customers />} />
                    <Route path="/inventory" element={<ProductInventoryManagement />} />
                    <Route path="/finance" element={<Finance />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/profile" element={<ProfileSettings />} />
                    <Route path="/help" element={<HelpPage />} />
                    
                    {/* HRM Routes */}
                    <Route path="/hrm" element={<HRMDashboard />} />
                    <Route path="/hrm/dashboard" element={<HRMDashboard />} />
                    <Route path="/hrm/employees" element={<EmployeeDirectory />} />
                    <Route path="/hrm/attendance" element={<AttendanceManagement />} />
                    <Route path="/hrm/leave" element={<LeaveManagement />} />
                    <Route path="/hrm/payroll" element={<PayrollDashboard />} />
                    <Route path="/hrm/performance" element={<PerformanceManagement />} />
                    <Route path="/hrm/departments" element={<DepartmentManagement />} />
                    
                    {/* Finance Routes */}
                    <Route path="/finance/dashboard" element={<MainFinanceDashboard />} />
                    <Route path="/finance/invoices" element={<InvoiceManagement />} />
                    <Route path="/finance/budget" element={<BudgetManagement />} />
                    <Route path="/finance/reports" element={<FinancialReports />} />
                    <Route path="/finance/transactions" element={<TransactionManagement />} />
                    <Route path="/finance/pl-statement" element={<FinancialReports />} />
                    <Route path="/finance/balance-sheet" element={<FinancialReports />} />
                    <Route path="/finance/cash-flow" element={<FinancialReports />} />
                    <Route path="/finance/tax-compliance" element={<TaxCompliance />} />
                    
                    {/* CRM Routes */}
                    <Route path="/crm" element={<IndianRetailCRM />} />
                    <Route path="/crm/customers" element={<IndianRetailCRM />} />
                    <Route path="/crm/leads" element={<IndianRetailLeadsManagement />} />
                    <Route path="/crm/pipeline" element={<IndianRetailSalesPipeline />} />
                    <Route path="/crm/contacts" element={<IndianRetailContactManagement />} />
                    <Route path="/crm/loyalty" element={<IndianRetailCRM />} />
                    <Route path="/crm/campaigns" element={<IndianRetailMarketingCampaigns />} />
                    
                    {/* Legacy CRM Routes for backward compatibility */}
                    <Route path="/crm/legacy/dashboard" element={<CRMDashboard />} />
                    <Route path="/crm/legacy/leads" element={<LeadsManagement />} />
                    <Route path="/crm/legacy/pipeline" element={<SalesPipeline />} />
                    <Route path="/crm/legacy/contacts" element={<ContactManagement />} />
                    
                    {/* Business Analytics Routes */}
                    <Route path="/analytics" element={<BusinessAnalytics />} />
                    <Route path="/ai-insights" element={<BusinessAnalytics />} />
                    <Route path="/business-analytics" element={<BusinessAnalytics />} />
                    
                    {/* AI Insights Routes */}
                    <Route path="/ai/sales-trends" element={<SalesTrends />} />
                    <Route path="/ai/customer-trends" element={<CustomerTrends />} />
                    <Route path="/ai/alerts" element={<Alerts />} />
                    
                    {/* Supply Chain Routes */}
                    <Route path="/supply-chain" element={<SupplyChainDashboard />} />
                    <Route path="/supply-chain/dashboard" element={<SupplyChainDashboard />} />
                    <Route path="/supply-chain/suppliers" element={<SupplierManagement />} />
                    <Route path="/supply-chain/inventory" element={<InventoryManagement />} />
                    <Route path="/supply-chain/warehouse" element={<WarehouseManagement />} />
                  </Routes>
                </main>
              </div>
              
              {/* Simple Chatbot Component */}
              <SimpleChatbot />
            </div>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;