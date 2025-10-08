import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar';
import TopBar from './components/Layout/TopBar';
import SimpleChatbot from './components/SimpleChatbot';

// Retail ERP Components
import RetailERPDashboard from './components/RetailERP/RetailERPDashboard';
import ProductInventoryManagement from './components/RetailERP/ProductInventoryManagement';
import POSSystem from './components/RetailERP/POSSystem';
import MultiBranchManagement from './components/RetailERP/MultiBranchManagement';

import CRMDashboard from './components/CRM/CRMDashboard';
import LeadsManagement from './components/CRM/LeadsManagement';
import SalesPipeline from './components/CRM/SalesPipeline';
import ContactManagement from './components/CRM/ContactManagement';
import FinanceDashboard from './components/Finance/FinanceDashboard';
import InvoiceManagement from './components/Finance/InvoiceManagement';
import BudgetManagement from './components/Finance/BudgetManagement';
import FinancialReports from './components/Finance/FinancialReports';
import SupplyChainDashboard from './components/SupplyChain/SupplyChainDashboard';
import SupplierManagement from './components/SupplyChain/SupplierManagement';
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
// import ChatBot from './components/ChatBot/ChatBot';

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

const Analytics = () => (
  <div className="p-6">
    <h1 className="text-2xl font-semibold text-gray-900 mb-6">Analytics</h1>
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <p>Analytics coming soon...</p>
      </div>
    </div>
  </div>
);

const Settings = () => (
  <div className="p-6">
    <h1 className="text-2xl font-semibold text-gray-900 mb-6">Settings</h1>
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <p>Settings coming soon...</p>
      </div>
    </div>
  </div>
);

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopBar setSidebarOpen={setSidebarOpen} />
          
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
            <Routes>
              <Route path="/" element={<Navigate to="/retail-erp/dashboard" />} />
              <Route path="/dashboard" element={<Navigate to="/retail-erp/dashboard" />} />
              
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
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
              
              {/* HRM Routes */}
              <Route path="/hrm" element={<HRMDashboard />} />
              <Route path="/hrm/dashboard" element={<HRMDashboard />} />
              <Route path="/hrm/employees" element={<EmployeeDirectory />} />
              <Route path="/hrm/attendance" element={<AttendanceManagement />} />
              <Route path="/hrm/leave" element={<LeaveManagement />} />
              <Route path="/hrm/payroll" element={<PayrollDashboard />} />
              <Route path="/hrm/performance" element={<PerformanceManagement />} />
              <Route path="/hrm/departments" element={<DepartmentManagement />} />
              {/* <Route path="/hrm/profile/:id" element={<EmployeeProfile />} /> */}
              
              {/* Finance Routes */}
              <Route path="/finance/dashboard" element={<FinanceDashboard />} />
              <Route path="/finance/invoices" element={<InvoiceManagement />} />
              <Route path="/finance/budget" element={<BudgetManagement />} />
              <Route path="/finance/reports" element={<FinancialReports />} />
              <Route path="/finance/transactions" element={<FinanceDashboard />} />
              <Route path="/finance/pl-statement" element={<FinancialReports />} />
              <Route path="/finance/balance-sheet" element={<FinancialReports />} />
              <Route path="/finance/cash-flow" element={<FinancialReports />} />
              <Route path="/finance/tax-compliance" element={<FinancialReports />} />
              
              {/* CRM Routes */}
              <Route path="/crm" element={<CRMDashboard />} />
              <Route path="/crm/customers" element={<CRMDashboard />} />
              <Route path="/crm/leads" element={<LeadsManagement />} />
              <Route path="/crm/pipeline" element={<SalesPipeline />} />
              <Route path="/crm/contacts" element={<ContactManagement />} />
              <Route path="/crm/loyalty" element={<CRMDashboard />} />
              <Route path="/crm/campaigns" element={<CRMDashboard />} />
              
              {/* AI Insights Routes */}
              <Route path="/ai-insights" element={<Analytics />} />
              <Route path="/ai-insights/sales-trends" element={<Analytics />} />
              <Route path="/ai-insights/customer-trends" element={<Analytics />} />
              <Route path="/ai-insights/alerts" element={<Analytics />} />
              
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
    </Router>
  );
}

export default App;