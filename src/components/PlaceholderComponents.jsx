import React from 'react';

const PlaceholderComponent = ({ title, description }) => (
  <div className="space-y-6">
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      <p className="text-gray-600 mt-2">{description}</p>
    </div>
    
    <div className="bg-white rounded-lg shadow-sm p-6">
      <p className="text-gray-600">This {title.toLowerCase()} functionality will be implemented here.</p>
      <p className="text-sm text-gray-500 mt-2">
        Component placeholder for {title.toLowerCase()} features.
      </p>
    </div>
  </div>
);

// ERP Components
export const OrderList = () => <PlaceholderComponent title="Order Management" description="Manage customer orders" />;
export const OrderForm = () => <PlaceholderComponent title="Create Order" description="Create new orders" />;
export const InventoryList = () => <PlaceholderComponent title="Inventory Management" description="Manage inventory items" />;
export const CustomerList = () => <PlaceholderComponent title="Customer Management" description="Manage customer information" />;
export const SupplierList = () => <PlaceholderComponent title="Supplier Management" description="Manage supplier relationships" />;
export const DeliveryTracking = () => <PlaceholderComponent title="Delivery Tracking" description="Track order deliveries" />;
export const DetailedAnalytics = () => <PlaceholderComponent title="Supply Chain Analytics" description="Analyze supply chain metrics" />;

// Finance Components  
export const IncomeModule = () => <PlaceholderComponent title="Income Management" description="Track income sources" />;
export const ExpenseModule = () => <PlaceholderComponent title="Expense Management" description="Track business expenses" />;
export const BankAccountsModule = () => <PlaceholderComponent title="Bank Accounts" description="Manage bank accounts" />;
export const TaxModule = () => <PlaceholderComponent title="Tax Management" description="Handle tax calculations" />;
export const InvoicingModule = () => <PlaceholderComponent title="Invoicing" description="Create and manage invoices" />;
export const ItemModule = () => <PlaceholderComponent title="Item Management" description="Manage inventory items" />;
export const CustomerModule = () => <PlaceholderComponent title="Customer Management" description="Manage customer accounts" />;
export const Budget = () => <PlaceholderComponent title="Budget Planning" description="Plan and track budgets" />;