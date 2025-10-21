import React, { useState, useEffect } from 'react';
import { useEmployeeStore } from '../../store/employeeStore';
import { useDepartmentStore } from '../../store/departmentStore';
import { usePayrollStore } from '../../store/payrollStore';
import useSettingsStore from '../../store/settingsStore';

const PayrollDashboard = () => {
  const { theme } = useSettingsStore();
  const [error, setError] = useState(null);
  
  // Safely access stores with error handling
  try {
    const employeeStore = useEmployeeStore();
    const departmentStore = useDepartmentStore();
    const payrollStore = usePayrollStore();
  } catch (err) {
    console.error('Error initializing payroll stores:', err);
    setError(err.message);
  }

  const { employees, fetchEmployees } = useEmployeeStore();
  const { departments, fetchDepartments } = useDepartmentStore();
  const { payrollData, processPayroll, runPayroll, generateTaxForms, generateComplianceReport, getEmployeeSalarySlip, getPayrollHistory, checkPayrollPermission, getCurrentUserInfo } = usePayrollStore();

  // Fetch employees on component mount
  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
  }, [fetchEmployees, fetchDepartments]);
  
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [showTaxForms, setShowTaxForms] = useState(false);
  const [showComplianceReport, setShowComplianceReport] = useState(false);
  const [showPayrollHistory, setShowPayrollHistory] = useState(false);
  const [taxForms, setTaxForms] = useState([]);
  const [complianceReport, setComplianceReport] = useState(null);
  const [payrollHistory, setPayrollHistory] = useState([]);
  const [salarySlip, setSalarySlip] = useState(null);

  const [payPeriod, setPayPeriod] = useState({
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // Monthly pay period
  });

  let currentUser = { role: 'employee', department: '', employeeId: 'EMP001' };
  try { 
    currentUser = getCurrentUserInfo();
  } catch (err) {
    console.error('Error getting current user info:', err);
  }

  // Filter employees based on user role
  const getFilteredEmployees = () => {
    if (currentUser.role === 'admin' || currentUser.role === 'super_admin') {
      return employees;
    } else if (currentUser.role === 'manager') {
      return employees.filter(emp => emp.department === currentUser.department);
    } else {
      // Employees can only see themselves
      return employees.filter(emp => emp.id === currentUser.employeeId);
    }
  };

  const filteredEmployees = getFilteredEmployees();

  const handleProcessPayroll = async () => {
    const result = await processPayroll(payPeriod);
    if (result) {
      setShowSummary(true);
      setShowTaxForms(false);
      setShowComplianceReport(false);
      setShowPayrollHistory(false);
    }
  };

  const handleRunPayroll = async () => {
    await runPayroll();
    setShowSummary(false);
  };

  const handleGenerateTaxForms = async () => {
    const forms = await generateTaxForms();
    if (forms) {
      setTaxForms(forms);
      setShowTaxForms(true);
      setShowSummary(false);
      setShowComplianceReport(false);
      setShowPayrollHistory(false);
    }
  };

  const handleGenerateComplianceReport = async () => {
    const report = await generateComplianceReport();
    if (report) {
      setComplianceReport(report);
      setShowComplianceReport(true);
      setShowSummary(false);
      setShowTaxForms(false);
      setShowPayrollHistory(false);
    }
  };

  const handleViewSalarySlip = async (employeeId) => {
    const slip = await getEmployeeSalarySlip(employeeId);
    if (slip) {
      setSalarySlip(slip);
      setSelectedEmployee(employees.find(emp => emp.id === employeeId));
    }
  };

  const handleViewPayrollHistory = async () => {
    const history = await getPayrollHistory();
    if (history) {
      setPayrollHistory(history.results);
      setShowPayrollHistory(true);
      setShowSummary(false);
      setShowTaxForms(false);
      setShowComplianceReport(false);
    }
  };

  // RBAC: Check if user can process payroll
  const canProcessPayroll = checkPayrollPermission('process');
  const canViewPayroll = checkPayrollPermission('view');
  const canViewSelfSalary = checkPayrollPermission('view_self');

  // Calculate Indian tax components (simplified)
  const calculateIndianTax = (salary, basicSalary, hra, cityType) => {
    // Standard deduction (Section 16)
    const standardDeduction = 50000;
    
    // HRA exemption calculation (Section 10)
    let hraExemption = 0;
    if (cityType === 'metro') {
      hraExemption = Math.min(hra, basicSalary * 0.5, hra - (0.1 * basicSalary));
    } else {
      hraExemption = Math.min(hra, basicSalary * 0.4, hra - (0.1 * basicSalary));
    }
    
    // Taxable income after HRA exemption
    const taxableIncome = salary - hraExemption - standardDeduction;
    
    // New tax regime rates (FY 2023-24)
    let tax = 0;
    if (taxableIncome <= 700000) {
      tax = 0; // Rebate under section 87A
    } else if (taxableIncome <= 300000) {
      tax = 0;
    } else if (taxableIncome <= 600000) {
      tax = (taxableIncome - 300000) * 0.05;
    } else if (taxableIncome <= 900000) {
      tax = 15000 + (taxableIncome - 600000) * 0.10;
    } else if (taxableIncome <= 1200000) {
      tax = 45000 + (taxableIncome - 900000) * 0.15;
    } else if (taxableIncome <= 1500000) {
      tax = 90000 + (taxableIncome - 1200000) * 0.20;
    } else {
      tax = 150000 + (taxableIncome - 1500000) * 0.30;
    }
    
    // Add health and education cess (4%)
    tax += tax * 0.04;
    
    // Professional tax (varies by state, using Maharashtra as example)
    const professionalTax = salary > 7500 ? 200 : 0;
    
    // Provident Fund (employee contribution)
    const pfContribution = basicSalary * 0.12;
    
    return {
      incomeTax: tax,
      professionalTax,
      pfContribution,
      hraExemption
    };
  };

  return ( 
    <div className={`p-6 min-h-screen ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {error && (
        <div className={`border px-4 py-3 rounded mb-4 ${
          theme === 'dark' 
            ? 'bg-red-900/50 border-red-800 text-red-200' 
            : 'bg-red-100 border-red-400 text-red-700'
        }`}>
          <strong>Error loading payroll dashboard:</strong> {error}
          <br />
          <small className={theme === 'dark' ? 'text-red-300' : 'text-red-600'}>
            Please check the console for more details or contact your administrator.
          </small>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-2xl font-bold ${
          theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
        }`}>
          Payroll Dashboard
        </h1>
        <div className={`text-sm ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Logged in as: <span className="font-medium capitalize">{currentUser.role}</span>
          {currentUser.department && ` • ${currentUser.department}`}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payroll Controls */}
        <div className={`lg:col-span-1 p-6 rounded-lg shadow ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h2 className={`text-lg font-semibold mb-4 ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
          }`}>
            Payroll Controls
          </h2>
          
          {/* Pay Period Selection - Only for admins/managers */}
          {(canProcessPayroll || currentUser.role === 'manager') && (
            <div className="mb-4">
              <label className={`block text-sm font-medium mb-1 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Pay Period
              </label>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={payPeriod.startDate}
                  onChange={(e) => setPayPeriod({...payPeriod, startDate: e.target.value})}
                  className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-gray-100' 
                      : 'border-gray-300 text-gray-900'
                  }`}
                />
                <span className={`self-center ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  to
                </span>
                <input
                  type="date"
                  value={payPeriod.endDate}
                  onChange={(e) => setPayPeriod({...payPeriod, endDate: e.target.value})}
                  className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-gray-100' 
                      : 'border-gray-300 text-gray-900'
                  }`}
                />
              </div>
            </div>
          )}
          
          {/* Action Buttons with RBAC */}
          <div className="space-y-3">
            {canProcessPayroll && (
              <>
                <button
                  onClick={handleProcessPayroll}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  Process Payroll
                </button>
                
                <button
                  onClick={handleRunPayroll}
                  disabled={!payrollData.processed}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:bg-gray-400"
                >
                  Process Salary Payments
                </button>
              </>
            )}
          </div>
          
          {/* Reports & Forms Section */}
          <div className="mt-6">
            <h3 className={`font-medium mb-2 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-900'
            }`}>
              Reports & Forms
            </h3>
            <div className="flex flex-col gap-2">
              {/* Employee can view their own salary slip */}
              {canViewSelfSalary && (
                <button 
                  onClick={() => handleViewSalarySlip(currentUser.employeeId)}
                  className={`text-left py-1 ${
                    theme === 'dark' 
                      ? 'text-blue-400 hover:text-blue-300' 
                      : 'text-blue-600 hover:text-blue-800'
                  }`}
                >
                  View My Salary Slip
                </button>
              )}
              
              {canViewPayroll && (
                <>
                  <button 
                    onClick={handleGenerateTaxForms}
                    className={`text-left py-1 ${
                      theme === 'dark' 
                        ? 'text-blue-400 hover:text-blue-300' 
                        : 'text-blue-600 hover:text-blue-800'
                    }`}
                  >
                    Generate Form 16
                  </button>
                  
                  <button 
                    onClick={handleViewPayrollHistory}
                    className={`text-left py-1 ${
                      theme === 'dark' 
                        ? 'text-blue-400 hover:text-blue-300' 
                        : 'text-blue-600 hover:text-blue-800'
                    }`}
                  >
                    View Payroll History
                  </button>
                  
                  <button 
                    onClick={handleGenerateComplianceReport}
                    className={`text-left py-1 ${
                      theme === 'dark' 
                        ? 'text-blue-400 hover:text-blue-300' 
                        : 'text-blue-600 hover:text-blue-800'
                    }`}
                  >
                    PF & Compliance Reports
                  </button>
                  
                  <button 
                    onClick={() => {
                      setShowSummary(!showSummary);
                      setShowTaxForms(false);
                      setShowComplianceReport(false);
                      setShowPayrollHistory(false);
                    }}
                    className={`text-left py-1 ${
                      theme === 'dark' 
                        ? 'text-blue-400 hover:text-blue-300' 
                        : 'text-blue-600 hover:text-blue-800'
                    }`}
                  >
                    {showSummary ? 'Hide' : 'Show'} Payroll Summary
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Employee Selection */}
        <div className={`lg:col-span-2 p-6 rounded-lg shadow ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h2 className={`text-lg font-semibold mb-4 ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
          }`}>
            Employees 
            {currentUser.role === 'manager' && ` (${currentUser.department} Department)`}
            {currentUser.role === 'employee' && ` (Your Details)`}
          </h2>
          
          {filteredEmployees.length === 0 ? (
            <div className={`text-center py-8 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {currentUser.role === 'employee' 
                ? "Your employee record is not available."
                : "No employees found for your access level."
              }
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}>
                  <tr>
                    <th className={`px-4 py-2 text-left text-xs font-medium uppercase tracking-wider ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Name
                    </th>
                    <th className={`px-4 py-2 text-left text-xs font-medium uppercase tracking-wider ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Department
                    </th>
                    <th className={`px-4 py-2 text-left text-xs font-medium uppercase tracking-wider ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      CTC (₹)
                    </th>
                    <th className={`px-4 py-2 text-left text-xs font-medium uppercase tracking-wider ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Location
                    </th>
                    <th className={`px-4 py-2 text-left text-xs font-medium uppercase tracking-wider ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Status
                    </th>
                    {canViewPayroll && (
                      <th className={`px-4 py-2 text-left text-xs font-medium uppercase tracking-wider ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className={`divide-y ${
                  theme === 'dark' ? 'divide-gray-700 bg-gray-800' : 'divide-gray-200 bg-white'
                }`}>
                  {filteredEmployees.map(employee => (
                    <tr 
                      key={employee.id} 
                      className={`${
                        theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                      } ${selectedEmployee?.id === employee.id ? (
                        theme === 'dark' ? 'bg-blue-900/50' : 'bg-blue-50'
                      ) : ''}`}
                    >
                      <td className={`px-4 py-3 ${
                        theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      }`}>
                        {employee.firstName} {employee.lastName}
                      </td>
                      <td className={`px-4 py-3 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {employee.department}
                      </td>
                      <td className={`px-4 py-3 ${
                        theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      }`}>
                        ₹{employee.ctc?.toLocaleString('en-IN') || '0'}
                      </td>
                      <td className={`px-4 py-3 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {employee.location || 'N/A'}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          employee.active 
                            ? theme === 'dark' 
                              ? 'bg-green-900/50 text-green-400' 
                              : 'bg-green-100 text-green-800'
                            : theme === 'dark'
                              ? 'bg-red-900/50 text-red-400'
                              : 'bg-red-100 text-red-800'
                        }`}>
                          {employee.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      {canViewPayroll && (
                        <td className="px-4 py-3">
                          <button
                            onClick={() => handleViewSalarySlip(employee.id)}
                            className={`text-sm ${
                              theme === 'dark' 
                                ? 'text-blue-400 hover:text-blue-300' 
                                : 'text-blue-600 hover:text-blue-800'
                            }`}
                          >
                            View Salary Slip
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Payroll Summary */}
      {showSummary && payrollData.processed && payrollData.results && payrollData.results.length > 0 && (
        <div className={`mt-6 p-6 rounded-lg shadow ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h2 className={`text-xl font-semibold mb-4 ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
          }`}>
            Payroll Summary
          </h2>
          <div className="mb-4">
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Period: {new Date(payrollData.payrollPeriod.startDate).toLocaleDateString()} - {new Date(payrollData.payrollPeriod.endDate).toLocaleDateString()}
            </p>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Processed on: {new Date().toLocaleDateString()}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className={`p-4 rounded-lg ${
              theme === 'dark' ? 'bg-blue-900/50' : 'bg-blue-50'
            }`}>
              <h3 className={`font-semibold ${
                theme === 'dark' ? 'text-blue-300' : 'text-blue-800'
              }`}>
                Total Gross Earnings
              </h3>
              <p className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
              }`}>
                ₹{payrollData.results.reduce((sum, result) => sum + (result.grossEarnings || 0), 0).toLocaleString('en-IN', {minimumFractionDigits: 2})}
              </p>
            </div>
            
            <div className={`p-4 rounded-lg ${
              theme === 'dark' ? 'bg-red-900/50' : 'bg-red-50'
            }`}>
              <h3 className={`font-semibold ${
                theme === 'dark' ? 'text-red-300' : 'text-red-800'
              }`}>
                Total Deductions
              </h3>
              <p className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-red-400' : 'text-red-600'
              }`}>
                ₹{payrollData.results.reduce((sum, result) => {
                  const deductions = result.deductions ? Object.values(result.deductions).reduce((dSum, value) => dSum + value, 0) : 0;
                  return sum + deductions;
                }, 0).toLocaleString('en-IN', {minimumFractionDigits: 2})}
              </p>
            </div>
            
            <div className={`p-4 rounded-lg ${
              theme === 'dark' ? 'bg-green-900/50' : 'bg-green-50'
            }`}>
              <h3 className={`font-semibold ${
                theme === 'dark' ? 'text-green-300' : 'text-green-800'
              }`}>
                Total Net Pay
              </h3>
              <p className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-green-400' : 'text-green-600'
              }`}>
                ₹{payrollData.results.reduce((sum, result) => sum + (result.netPay || 0), 0).toLocaleString('en-IN', {minimumFractionDigits: 2})}
              </p>
            </div>
          </div>
          
          <h3 className={`font-semibold mb-3 ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
          }`}>
            Employee Breakdown
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}>
                <tr>
                  <th className={`px-4 py-2 text-left text-xs font-medium uppercase tracking-wider ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    Employee
                  </th>
                  <th className={`px-4 py-2 text-left text-xs font-medium uppercase tracking-wider ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    Basic Salary
                  </th>
                  <th className={`px-4 py-2 text-left text-xs font-medium uppercase tracking-wider ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    Allowances
                  </th>
                  <th className={`px-4 py-2 text-left text-xs font-medium uppercase tracking-wider ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    Deductions
                  </th>
                  <th className={`px-4 py-2 text-left text-xs font-medium uppercase tracking-wider ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    Net Pay
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${
                theme === 'dark' ? 'divide-gray-700 bg-gray-800' : 'divide-gray-200 bg-white'
              }`}>
                {payrollData.results.map(result => {
                  const employee = employees.find(e => e.id === result.employeeId);
                  const totalDeductions = result.deductions ? Object.values(result.deductions).reduce((sum, value) => sum + value, 0) : 0;
                  
                  return (
                    <tr key={result.employeeId} className={theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                      <td className={`px-4 py-3 ${
                        theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      }`}>
                        {employee ? `${employee.firstName} ${employee.lastName}` : `Employee ${result.employeeId}`}
                      </td>
                      <td className={`px-4 py-3 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        ₹{(result.basicSalary || 0).toLocaleString('en-IN', {minimumFractionDigits: 2})}
                      </td>
                      <td className={`px-4 py-3 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        ₹{((result.grossEarnings || 0) - (result.basicSalary || 0)).toLocaleString('en-IN', {minimumFractionDigits: 2})}
                      </td>
                      <td className={`px-4 py-3 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        ₹{totalDeductions.toLocaleString('en-IN', {minimumFractionDigits: 2})}
                      </td>
                      <td className={`px-4 py-3 font-medium ${
                        theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      }`}>
                        ₹{(result.netPay || 0).toLocaleString('en-IN', {minimumFractionDigits: 2})}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Payroll History */}
      {showPayrollHistory && payrollHistory.length > 0 && (
        <div className={`mt-6 p-6 rounded-lg shadow ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h2 className={`text-xl font-semibold mb-4 ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
          }`}>
            Payroll History
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}>
                <tr>
                  <th className={`px-4 py-2 text-left text-xs font-medium uppercase tracking-wider ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    Pay Period
                  </th>
                  <th className={`px-4 py-2 text-left text-xs font-medium uppercase tracking-wider ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    Processed Date
                  </th>
                  <th className={`px-4 py-2 text-left text-xs font-medium uppercase tracking-wider ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    Employees
                  </th>
                  <th className={`px-4 py-2 text-left text-xs font-medium uppercase tracking-wider ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    Status
                  </th>
                  <th className={`px-4 py-2 text-left text-xs font-medium uppercase tracking-wider ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    Total Net Pay
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${
                theme === 'dark' ? 'divide-gray-700 bg-gray-800' : 'divide-gray-200 bg-white'
              }`}>
                {payrollHistory.map((payroll, index) => {
                  // Format pay period for display
                  const payPeriod = payroll.payrollPeriod;
                  const periodDisplay = payPeriod && payPeriod.startDate && payPeriod.endDate 
                    ? `${new Date(payPeriod.startDate).toLocaleDateString()} - ${new Date(payPeriod.endDate).toLocaleDateString()}`
                    : 'N/A';
                  
                  // Get processed date - use createdAt if available, otherwise current date
                  const processedDate = payroll.createdAt 
                    ? new Date(payroll.createdAt).toLocaleDateString()
                    : new Date().toLocaleDateString();
                  
                  // Count employees and calculate total net pay
                  const employeeCount = payroll.results ? payroll.results.length : 0;
                  const totalNetPay = payroll.results 
                    ? payroll.results.reduce((sum, result) => sum + (result.netPay || 0), 0)
                    : 0;

                  return (
                    <tr key={payroll.id || index} className={theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                      <td className={`px-4 py-3 ${
                        theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      }`}>
                        {periodDisplay}
                      </td>
                      <td className={`px-4 py-3 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {processedDate}
                      </td>
                      <td className={`px-4 py-3 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {employeeCount}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          payroll.processed 
                            ? theme === 'dark' 
                              ? 'bg-green-900/50 text-green-400' 
                              : 'bg-green-100 text-green-800'
                            : theme === 'dark'
                              ? 'bg-yellow-900/50 text-yellow-400'
                              : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {payroll.processed ? 'Processed' : 'Pending'}
                        </span>
                      </td>
                      <td className={`px-4 py-3 ${
                        theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      }`}>
                        ₹{totalNetPay.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Add a button to view details of a specific payroll run */}
          <div className="mt-6 flex justify-between items-center">
            <p className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Showing {payrollHistory.length} payroll runs
            </p>
            <button 
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              onClick={() => {
                // You can implement functionality to view detailed breakdown of a specific payroll run
                alert('Feature: View detailed payroll breakdown for a specific period');
              }}
            >
              View Detailed Report
            </button>
          </div>
        </div>
      )}

      {/* Show empty state if no payroll history */}
      {showPayrollHistory && payrollHistory.length === 0 && (
        <div className={`mt-6 p-6 rounded-lg shadow ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h2 className={`text-xl font-semibold mb-4 ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
          }`}>
            Payroll History
          </h2>
          <div className={`text-center py-8 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <p>No payroll history found.</p>
            <p className="text-sm mt-2">Process your first payroll to see history here.</p>
          </div>
        </div>
      )}

      {/* Tax Forms Output */}
      {showTaxForms && taxForms.length > 0 && (
        <div className={`mt-6 p-6 rounded-lg shadow ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h2 className={`text-xl font-semibold mb-4 ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
          }`}>
            Form 16 Generated
          </h2>
          <p className={`mb-4 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Form 16 for the current financial year (April {new Date().getFullYear() - 1} - March {new Date().getFullYear()})
          </p>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}>
                <tr>
                  <th className={`px-4 py-2 text-left text-xs font-medium uppercase tracking-wider ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    Employee
                  </th>
                  <th className={`px-4 py-2 text-left text-xs font-medium uppercase tracking-wider ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    PAN
                  </th>
                  <th className={`px-4 py-2 text-left text-xs font-medium uppercase tracking-wider ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    Financial Year
                  </th>
                  <th className={`px-4 py-2 text-left text-xs font-medium uppercase tracking-wider ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    Total Income (₹)
                  </th>
                  <th className={`px-4 py-2 text-left text-xs font-medium uppercase tracking-wider ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    Tax Deducted (₹)
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${
                theme === 'dark' ? 'divide-gray-700 bg-gray-800' : 'divide-gray-200 bg-white'
              }`}>
                {taxForms.map(form => {
                  const employee = employees.find(e => e.id === form.employeeId);
                  return (
                    <tr key={form.employeeId} className={theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                      <td className={`px-4 py-3 ${
                        theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      }`}>
                        {employee ? `${employee.firstName} ${employee.lastName}` : `Employee ${form.employeeId}`}
                      </td>
                      <td className={`px-4 py-3 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {form.pan || employee?.pan || 'Not provided'}
                      </td>
                      <td className={`px-4 py-3 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {form.financialYear}
                      </td>
                      <td className={`px-4 py-3 ${
                        theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      }`}>
                        ₹{(form.totalIncome || 0).toLocaleString('en-IN', {minimumFractionDigits: 2})}
                      </td>
                      <td className={`px-4 py-3 ${
                        theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      }`}>
                        ₹{(form.taxDeducted || 0).toLocaleString('en-IN', {minimumFractionDigits: 2})}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
              Download All Forms
            </button>
          </div>
        </div>
      )}

      {/* Compliance Report Output */}
      {showComplianceReport && complianceReport && (
        <div className={`mt-6 p-6 rounded-lg shadow ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h2 className={`text-xl font-semibold mb-4 ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
          }`}>
            {complianceReport.title}
          </h2>
          <div className="mb-4">
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Generated on: {new Date(complianceReport.generatedAt).toLocaleDateString()}
            </p>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Status: 
              <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                complianceReport.status === 'Compliant' 
                  ? theme === 'dark' 
                    ? 'bg-green-900/50 text-green-400' 
                    : 'bg-green-100 text-green-800'
                  : theme === 'dark'
                    ? 'bg-red-900/50 text-red-400'
                    : 'bg-red-100 text-red-800'
              }`}>
                {complianceReport.status}
              </span>
            </p>
          </div>
          
          <h3 className={`font-semibold mb-3 ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
          }`}>
            Indian Compliance Checks
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}>
                <tr>
                  <th className={`px-4 py-2 text-left text-xs font-medium uppercase tracking-wider ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    Check
                  </th>
                  <th className={`px-4 py-2 text-left text-xs font-medium uppercase tracking-wider ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    Status
                  </th>
                  <th className={`px-4 py-2 text-left text-xs font-medium uppercase tracking-wider ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    Due Date
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${
                theme === 'dark' ? 'divide-gray-700 bg-gray-800' : 'divide-gray-200 bg-white'
              }`}>
                {complianceReport.checks && complianceReport.checks.map((check, index) => (
                  <tr key={index} className={theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                    <td className={`px-4 py-3 ${
                      theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    }`}>
                      {check.name}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        check.status === 'Compliant' 
                          ? theme === 'dark' 
                            ? 'bg-green-900/50 text-green-400' 
                            : 'bg-green-100 text-green-800'
                          : check.status === 'Not Applicable'
                          ? theme === 'dark'
                            ? 'bg-gray-700 text-gray-300'
                            : 'bg-gray-100 text-gray-800'
                          : theme === 'dark'
                            ? 'bg-red-900/50 text-red-400'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {check.status}
                      </span>
                    </td>
                    <td className={`px-4 py-3 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {check.dueDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
              Download PF Returns
            </button>
          </div>
        </div>
      )}
      
      {/* Payroll Details */}
      {selectedEmployee && (
        <div className={`mt-6 p-6 rounded-lg shadow ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h2 className={`text-lg font-semibold mb-4 ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
          }`}>
            Salary Breakdown for {selectedEmployee.firstName} {selectedEmployee.lastName}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Earnings */}
            <div>
              <h3 className={`font-medium mb-3 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Earnings (₹)
              </h3>
              <div className="space-y-2">
                <div className={`flex justify-between ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <span>Basic Salary (50% of CTC)</span>
                  <span>₹{(selectedEmployee.ctc * 0.5).toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
                </div>
                <div className={`flex justify-between ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <span>House Rent Allowance (HRA)</span>
                  <span>₹{(selectedEmployee.ctc * 0.2).toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
                </div>
                <div className={`flex justify-between ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <span>Conveyance Allowance</span>
                  <span>₹{(selectedEmployee.ctc * 0.05).toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
                </div>
                <div className={`flex justify-between ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <span>Medical Allowance</span>
                  <span>₹{(selectedEmployee.ctc * 0.05).toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
                </div>
                <div className={`flex justify-between ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <span>Special Allowance</span>
                  <span>₹{(selectedEmployee.ctc * 0.2).toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
                </div>
                <div className={`border-t pt-2 font-medium flex justify-between ${
                  theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  <span>Gross Salary</span>
                  <span>₹{selectedEmployee.ctc?.toLocaleString('en-IN', {minimumFractionDigits: 2}) || '0'}</span>
                </div>
              </div>
            </div>
            
            {/* Deductions */}
            <div>
              <h3 className={`font-medium mb-3 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Deductions (₹)
              </h3>
              <div className="space-y-2">
                <div className={`flex justify-between ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <span>Provident Fund (PF) - 12%</span>
                  <span>₹{(selectedEmployee.ctc * 0.5 * 0.12).toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
                </div>
                <div className={`flex justify-between ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <span>Professional Tax</span>
                  <span>₹200.00</span>
                </div>
                <div className={`flex justify-between ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <span>Income Tax (as per slab)</span>
                  <span>₹{calculateIndianTax(
                    selectedEmployee.ctc, 
                    selectedEmployee.ctc * 0.5, 
                    selectedEmployee.ctc * 0.2,
                    selectedEmployee.location === 'Mumbai' || selectedEmployee.location === 'Delhi' ? 'metro' : 'non-metro'
                  ).incomeTax.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
                </div>
                <div className={`border-t pt-2 font-medium flex justify-between ${
                  theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  <span>Total Deductions</span>
                  <span>₹{(
                    (selectedEmployee.ctc * 0.5 * 0.12) + 
                    200 + 
                    calculateIndianTax(
                      selectedEmployee.ctc, 
                      selectedEmployee.ctc * 0.5, 
                      selectedEmployee.ctc * 0.2,
                      selectedEmployee.location === 'Mumbai' || selectedEmployee.location === 'Delhi' ? 'metro' : 'non-metro'
                    ).incomeTax
                  ).toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
                </div>
                <div className={`border-t pt-2 font-medium flex justify-between ${
                  theme === 'dark' ? 'text-green-400' : 'text-green-600'
                }`}>
                  <span>Net Pay (Take Home)</span>
                  <span>₹{(
                    selectedEmployee.ctc - 
                    (selectedEmployee.ctc * 0.5 * 0.12) - 
                    200 - 
                    calculateIndianTax(
                      selectedEmployee.ctc, 
                      selectedEmployee.ctc * 0.5, 
                      selectedEmployee.ctc * 0.2,
                      selectedEmployee.location === 'Mumbai' || selectedEmployee.location === 'Delhi' ? 'metro' : 'non-metro'
                    ).incomeTax
                  ).toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PayrollDashboard;