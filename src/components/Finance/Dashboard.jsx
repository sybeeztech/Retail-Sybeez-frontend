import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, CreditCard } from 'lucide-react';

function FinanceDashboard() {
  const stats = [
    {
      title: 'Monthly Revenue',
      value: '$125k',
      change: '+12% from last month',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'bg-green-500'
    },
    {
      title: 'Monthly Expenses',
      value: '$45k',
      change: '-5% from last month',
      changeType: 'positive',
      icon: TrendingDown,
      color: 'bg-red-500'
    },
    {
      title: 'Net Profit',
      value: '$80k',
      change: '+18% from last month',
      changeType: 'positive',
      icon: DollarSign,
      color: 'bg-blue-500'
    },
    {
      title: 'Outstanding Invoices',
      value: '$25k',
      change: '12 pending invoices',
      changeType: 'neutral',
      icon: CreditCard,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Finance Dashboard</h1>
        <p className="text-gray-600 mt-2">Monitor your financial performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.color} mr-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className={`text-sm ${
                  stat.changeType === 'positive' ? 'text-green-600' : 
                  stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {stat.change}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Financial Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-medium mb-2">Income Tracking</h3>
            <p className="text-sm text-gray-600 mb-3">Record and categorize income sources</p>
            <button className="text-purple-600 text-sm hover:text-purple-800">Add Income →</button>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-medium mb-2">Expense Management</h3>
            <p className="text-sm text-gray-600 mb-3">Track and manage business expenses</p>
            <button className="text-purple-600 text-sm hover:text-purple-800">Add Expense →</button>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-medium mb-2">Invoice Generation</h3>
            <p className="text-sm text-gray-600 mb-3">Create and send professional invoices</p>
            <button className="text-purple-600 text-sm hover:text-purple-800">Create Invoice →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinanceDashboard;