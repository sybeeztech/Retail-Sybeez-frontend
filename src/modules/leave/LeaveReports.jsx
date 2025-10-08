import React, { useState, useEffect, useMemo } from 'react';
import { useLeaveStore } from '../../store/leaveStore';
import { useAuthStore } from '../../store/authStore';
import { 
  Download, 
  Filter, 
  Calendar, 
  Users, 
  BarChart3, 
  PieChart, 
  TrendingUp,
  FileText,
  Building,
  UserCheck,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const LeaveReports = () => {
  const { user } = useAuthStore();
  const { 
    leaveApplications, 
    leaveBalances, 
    teamCalendar,
    loading,
    getLeaveApplications,
    getTeamCalendar
  } = useLeaveStore();

  const [filters, setFilters] = useState({
    period: 'month',
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    department: 'all',
    leaveType: 'all',
    employeeId: ''
  });

  const [reportType, setReportType] = useState('summary');
  const [exportLoading, setExportLoading] = useState(false);

  // Check if user has permission to view reports
  const canViewReports = ['super_admin', 'admin', 'manager'].includes(user?.employee?.role);
  const isAdmin = ['super_admin', 'admin'].includes(user?.employee?.role);

  useEffect(() => {
    if (canViewReports) {
      // Load all leave applications for reporting
      getLeaveApplications({});
      getTeamCalendar();
    }
  }, [canViewReports]);

  // Filter data based on current filters
  const filteredData = useMemo(() => {
    if (!leaveApplications || !Array.isArray(leaveApplications)) return [];

    return leaveApplications.filter(app => {
      const appDate = new Date(app.startDate || app.appliedDate);
      const startDate = new Date(filters.startDate);
      const endDate = new Date(filters.endDate);
      endDate.setHours(23, 59, 59, 999);

      // Date filter
      if (appDate < startDate || appDate > endDate) return false;

      // Department filter
      if (filters.department !== 'all' && app.employee?.department !== filters.department) {
        return false;
      }

      // Leave type filter
      if (filters.leaveType !== 'all' && app.leaveType !== filters.leaveType) {
        return false;
      }

      // Employee filter
      if (filters.employeeId && app.employeeId !== filters.employeeId) {
        return false;
      }

      return true;
    });
  }, [leaveApplications, filters]);

  // Get unique departments from applications
  const departments = useMemo(() => {
    if (!leaveApplications) return [];
    const depts = new Set(leaveApplications.map(app => app.employee?.department).filter(Boolean));
    return Array.from(depts);
  }, [leaveApplications]);

  // Get unique employees for filter
  const employees = useMemo(() => {
    if (!leaveApplications) return [];
    const emps = new Map();
    leaveApplications.forEach(app => {
      if (app.employee) {
        emps.set(app.employeeId, app.employee);
      }
    });
    return Array.from(emps.values());
  }, [leaveApplications]);

  // Summary report data
  const summaryData = useMemo(() => {
    const statusCounts = {
      pending: 0,
      approved: 0,
      rejected: 0,
      cancelled: 0
    };

    const leaveTypeCounts = {};
    const departmentStats = {};

    filteredData.forEach(app => {
      // Status counts
      statusCounts[app.status] = (statusCounts[app.status] || 0) + 1;

      // Leave type counts
      leaveTypeCounts[app.leaveType] = (leaveTypeCounts[app.leaveType] || 0) + 1;

      // Department stats
      const dept = app.employee?.department || 'Unknown';
      if (!departmentStats[dept]) {
        departmentStats[dept] = { total: 0, approved: 0, pending: 0, rejected: 0 };
      }
      departmentStats[dept].total++;
      departmentStats[dept][app.status]++;
    });

    return {
      statusCounts,
      leaveTypeCounts,
      departmentStats,
      totalApplications: filteredData.length,
      averageDuration: filteredData.length > 0 
        ? (filteredData.reduce((sum, app) => sum + (app.duration || 0), 0) / filteredData.length).toFixed(1)
        : 0
    };
  }, [filteredData]);

  // Monthly trend data
  const monthlyTrendData = useMemo(() => {
    const monthlyData = {};
    
    filteredData.forEach(app => {
      const date = new Date(app.startDate || app.appliedDate);
      const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = {
          month: date.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }),
          approved: 0,
          pending: 0,
          rejected: 0,
          total: 0
        };
      }
      
      monthlyData[monthKey].total++;
      monthlyData[monthKey][app.status]++;
    });

    return Object.values(monthlyData).sort((a, b) => {
      const [aYear, aMonth] = a.month.split(' ');
      const [bYear, bMonth] = b.month.split(' ');
      return new Date(aYear, new Date(`${aMonth} 1`).getMonth()) - new Date(bYear, new Date(`${bMonth} 1`).getMonth());
    });
  }, [filteredData]);

  // Department-wise data for charts
  const departmentChartData = useMemo(() => {
    return Object.entries(summaryData.departmentStats).map(([dept, stats]) => ({
      name: dept,
      total: stats.total,
      approved: stats.approved,
      pending: stats.pending,
      rejected: stats.rejected,
      approvalRate: stats.total > 0 ? ((stats.approved / stats.total) * 100).toFixed(1) : 0
    }));
  }, [summaryData]);

  // Leave type distribution for pie chart
  const leaveTypeData = useMemo(() => {
    return Object.entries(summaryData.leaveTypeCounts).map(([type, count]) => ({
      name: type,
      value: count,
      percentage: (count / summaryData.totalApplications * 100).toFixed(1)
    }));
  }, [summaryData]);

  // Status distribution colors
  const statusColors = {
    approved: '#10b981',
    pending: '#f59e0b',
    rejected: '#ef4444',
    cancelled: '#6b7280'
  };

  const leaveTypeColors = {
    CL: '#3b82f6',
    SL: '#10b981',
    PL: '#8b5cf6',
    Maternity: '#ec4899',
    Paternity: '#f59e0b'
  };

  // Export functions
  const exportToCSV = () => {
    setExportLoading(true);
    
    const headers = ['Employee', 'Department', 'Leave Type', 'Start Date', 'End Date', 'Duration', 'Status', 'Applied Date'];
    const csvData = filteredData.map(app => [
      app.employee?.name || 'Unknown',
      app.employee?.department || 'Unknown',
      app.leaveType,
      app.startDate,
      app.endDate,
      app.duration,
      app.status,
      new Date(app.appliedDate).toLocaleDateString('en-GB')
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leave-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    
    setTimeout(() => setExportLoading(false), 1000);
  };

  const exportToPDF = () => {
    setExportLoading(true);
    // Simulate PDF export
    setTimeout(() => {
      alert('PDF export functionality would be implemented here');
      setExportLoading(false);
    }, 1000);
  };

  if (!canViewReports) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to view leave reports.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="text-gray-500">Loading reports...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Leave Reports & Analytics</h1>
            <p className="text-gray-600">Comprehensive leave analysis and insights</p>
          </div>
          <div className="flex ">
            <button
              onClick={exportToCSV}
              disabled={exportLoading}
              className="flex items-center px-4 py-2 border-1 border-emerald-700 bg-white text-emerald-700 rounded-lg hover:border-emerald-700 hover:bg-emerald-700 hover:text-white disabled:opacity-50 transition-all"
            >
              <Download className="w-4 h-4 mr-2" />
              {exportLoading ? 'Exporting...' : 'Export CSV'}
            </button>
            {/* <button
              onClick={exportToPDF}
              disabled={exportLoading}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
            >
              <FileText className="w-4 h-4 mr-2" />
              {exportLoading ? 'Exporting...' : 'Export PDF'}
            </button> */}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </h3>
          <div className="flex space-x-2">
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="summary">Summary Report</option>
              <option value="trends">Trend Analysis</option>
              <option value="department">Department-wise</option>
              <option value="employee">Employee-wise</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Period</label>
            <select
              value={filters.period}
              onChange={(e) => setFilters(prev => ({ ...prev, period: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
              <option value="custom">Custom</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select
              value={filters.department}
              onChange={(e) => setFilters(prev => ({ ...prev, department: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          {isAdmin && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
                <select
                  value={filters.leaveType}
                  onChange={(e) => setFilters(prev => ({ ...prev, leaveType: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="all">All Types</option>
                  <option value="CL">Casual Leave</option>
                  <option value="SL">Sick Leave</option>
                  <option value="PL">Privileged Leave</option>
                  <option value="Maternity">Maternity</option>
                  <option value="Paternity">Paternity</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employee</label>
                <select
                  value={filters.employeeId}
                  onChange={(e) => setFilters(prev => ({ ...prev, employeeId: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="">All Employees</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.name}</option>
                  ))}
                </select>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Applications</p>
              <h3 className="text-2xl font-bold text-gray-900">{summaryData.totalApplications}</h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Approval Rate</p>
              <h3 className="text-2xl font-bold text-gray-900">
                {summaryData.totalApplications > 0 
                  ? ((summaryData.statusCounts.approved / summaryData.totalApplications) * 100).toFixed(1)
                  : 0}%
              </h3>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Duration</p>
              <h3 className="text-2xl font-bold text-gray-900">{summaryData.averageDuration} days</h3>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Actions</p>
              <h3 className="text-2xl font-bold text-gray-900">{summaryData.statusCounts.pending}</h3>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Report Content based on selected type */}
      {reportType === 'summary' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Status Distribution */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <PieChart className="w-5 h-5 mr-2" />
              Status Distribution
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={Object.entries(summaryData.statusCounts).map(([status, count]) => ({
                      name: status.charAt(0).toUpperCase() + status.slice(1),
                      value: count,
                      percentage: (count / summaryData.totalApplications * 100).toFixed(1)
                    }))}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {Object.entries(summaryData.statusCounts).map(([status], index) => (
                      <Cell key={`cell-${index}`} fill={statusColors[status]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Leave Type Distribution */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Leave Type Distribution
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={leaveTypeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="Number of Applications">
                    {leaveTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={leaveTypeColors[entry.name] || '#8884d8'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {reportType === 'trends' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Monthly Trends
          </h3>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="approved" stroke="#10b981" name="Approved" strokeWidth={2} />
                <Line type="monotone" dataKey="pending" stroke="#f59e0b" name="Pending" strokeWidth={2} />
                <Line type="monotone" dataKey="rejected" stroke="#ef4444" name="Rejected" strokeWidth={2} />
                <Line type="monotone" dataKey="total" stroke="#3b82f6" name="Total" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {reportType === 'department' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Building className="w-5 h-5 mr-2" />
            Department-wise Analysis
          </h3>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="approved" name="Approved" fill="#10b981" />
                <Bar dataKey="pending" name="Pending" fill="#f59e0b" />
                <Bar dataKey="rejected" name="Rejected" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {reportType === 'employee' && isAdmin && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <UserCheck className="w-5 h-5 mr-2" />
            Employee-wise Report
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Employee</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Department</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Total Applications</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Approved</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Pending</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Rejected</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Approval Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {employees.map(employee => {
                  const empApplications = filteredData.filter(app => app.employeeId === employee.id);
                  const stats = {
                    total: empApplications.length,
                    approved: empApplications.filter(app => app.status === 'approved').length,
                    pending: empApplications.filter(app => app.status === 'pending').length,
                    rejected: empApplications.filter(app => app.status === 'rejected').length
                  };
                  
                  return (
                    <tr key={employee.id}>
                      <td className="px-4 py-3 text-sm text-gray-900">{employee.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{employee.department}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{stats.total}</td>
                      <td className="px-4 py-3 text-sm text-green-600">{stats.approved}</td>
                      <td className="px-4 py-3 text-sm text-yellow-600">{stats.pending}</td>
                      <td className="px-4 py-3 text-sm text-red-600">{stats.rejected}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {stats.total > 0 ? ((stats.approved / stats.total) * 100).toFixed(1) : 0}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow mt-6">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Detailed Applications</h3>
          <p className="text-sm text-gray-600">{filteredData.length} records found</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Employee</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Department</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Leave Type</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Period</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Duration</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Applied Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.slice(0, 10).map(app => (
                <tr key={app.id}>
                  <td className="px-4 py-3 text-sm text-gray-900">{app.employee?.name || 'Unknown'}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{app.employee?.department || 'Unknown'}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{app.leaveType}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {new Date(app.startDate).toLocaleDateString('en-GB')} - {new Date(app.endDate).toLocaleDateString('en-GB')}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{app.duration} days</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      app.status === 'approved' ? 'bg-green-100 text-green-800' :
                      app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {app.status?.charAt(0).toUpperCase() + app.status?.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {new Date(app.appliedDate).toLocaleDateString('en-GB')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaveReports;