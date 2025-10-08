// ApplyLeave.jsx
import React, { useState, useEffect } from 'react';
import { useLeaveStore, useLeaveBalance } from '../../store/leaveStore';
import { useAuthStore } from '../../store/authStore';
import { Calendar, Clock, AlertCircle, Upload, FileText, CheckCircle, XCircle, Info } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ApplyLeave = () => {
  const { user } = useAuthStore();
  const {
    applyForLeave,
    getLeavePolicies,
    getHolidays,
    checkLeaveOverlap,
    loading,
    error,
    leavePolicies,
    holidays
  } = useLeaveStore();

  const { balance, refresh: refreshBalance } = useLeaveBalance();
  const [formData, setFormData] = useState({
    leaveType: '',
    startDate: null,
    endDate: null,
    reason: '',
    attachments: [],
    isHalfDay: false,
    halfDayType: 'first' // first or second half
  });
  const [calculatedDuration, setCalculatedDuration] = useState(0);
  const [availableBalance, setAvailableBalance] = useState(0);
  const [conflicts, setConflicts] = useState([]);
  const [policyInfo, setPolicyInfo] = useState(null);
  const [selectedHolidays, setSelectedHolidays] = useState([]);

  // Load required data on component mount
  useEffect(() => {
    getLeavePolicies();
    getHolidays(new Date().getFullYear());
  }, []);

  // Update the useEffect that sets available balance and policy info
  useEffect(() => {
    if (formData.leaveType && balance?.balances) {
      const available = balance.balances[formData.leaveType]?.available || 0;
      setAvailableBalance(available);
      
      // Find policy info from all leave policies
      let policy = null;
      for (const policyDoc of leavePolicies) {
        policy = policyDoc.leaveTypes?.find(lt => lt.type === formData.leaveType);
        if (policy) break; // Stop at first match
      }
      setPolicyInfo(policy);
    }
  }, [formData.leaveType, balance, leavePolicies]);

  // Calculate duration and check conflicts when dates change
  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      const duration = calculateDuration(formData.startDate, formData.endDate);
      setCalculatedDuration(duration);
      
      // Check for conflicts
      const hasConflict = checkLeaveOverlap(
        user?.employeeId,
        formData.startDate.toISOString().split('T')[0],
        formData.endDate.toISOString().split('T')[0]
      );
      
      if (hasConflict) {
        setConflicts(['You have overlapping approved leaves during this period']);
      } else {
        setConflicts([]);
      }
      
      // Check for holidays in the selected range
      checkHolidaysInRange(formData.startDate, formData.endDate);
    }
  }, [formData.startDate, formData.endDate]);

  // Calculate working days excluding weekends and holidays
  const calculateDuration = (start, end) => {
    if (!start || !end) return 0;
    
    let duration = 0;
    const currentDate = new Date(start);
    const endDate = new Date(end);
    
    while (currentDate <= endDate) {
      const dayOfWeek = currentDate.getDay();
      // Exclude weekends (Saturday: 6, Sunday: 0)
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        // Check if it's a holiday
        const dateStr = currentDate.toISOString().split('T')[0];
        // const isHoliday = holidays.some(holiday => holiday.date === dateStr);
        const isHoliday = holidays && Array.isArray(holidays) ? holidays.some(holiday => holiday.date === dateStr) : false;
        if (!isHoliday) {
          duration += formData.isHalfDay ? 0.5 : 1;
        }
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return duration;
  };

  // Check for holidays in the selected date range
  const checkHolidaysInRange = (start, end) => {
    if (!start || !end) return;
    
    const rangeHolidays = holidays.filter(holiday => {
      const holidayDate = new Date(holiday.date);
      return holidayDate >= start && holidayDate <= end;
    });
    
    setSelectedHolidays(rangeHolidays);
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  // Remove attached file
  const removeFile = (index) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      const leaveData = {
        leaveType: formData.leaveType,
        startDate: formData.startDate.toISOString().split('T')[0],
        endDate: formData.endDate.toISOString().split('T')[0],
        duration: calculatedDuration,
        reason: formData.reason,
        isHalfDay: formData.isHalfDay,
        halfDayType: formData.halfDayType,
        attachments: formData.attachments.map(file => file.name),
        status: 'pending',
      };
      
      await applyForLeave(leaveData);
      
      // Reset form on success
      setFormData({
        leaveType: '',
        startDate: null,
        endDate: null,
        reason: '',
        attachments: [],
        isHalfDay: false,
        halfDayType: 'first'
      });
      setCalculatedDuration(0);
      setAvailableBalance(0);
      setConflicts([]);
      setSelectedHolidays([]);
      
      // Refresh balance
      refreshBalance();
      
      alert('Leave application submitted successfully!');
      
    } catch (error) {
      console.error('Failed to apply for leave:', error);
    }
  };

  // Form validation
  const validateForm = () => {
    const errors = [];
    
    if (!formData.leaveType) errors.push('Leave type is required');
    if (!formData.startDate) errors.push('Start date is required');
    if (!formData.endDate) errors.push('End date is required');
    if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
      errors.push('End date cannot be before start date');
    }
    if (!formData.reason.trim()) errors.push('Reason is required');
    if (calculatedDuration > availableBalance) {
      errors.push('Insufficient leave balance');
    }
    if (conflicts.length > 0) {
      errors.push('Please resolve conflicts before submitting');
    }
    
    if (errors.length > 0) {
      alert('Please fix the following errors:\n' + errors.join('\n'));
      return false;
    }
    
    return true;
  };

  // Get leave types from policy
  // const leaveTypes = leavePolicies[0]?.leaveTypes || [];
  // const leaveTypes = leavePolicies

  // Update the leave types extraction to include all policies
  const leaveTypes = leavePolicies.reduce((types, policy) => {
    if (policy.leaveTypes && Array.isArray(policy.leaveTypes)) {
      return [...types, ...policy.leaveTypes];
    }
    return types;
  }, []);

  // RBAC Check - Ensure only employees can apply for their own leave
  // if (!user || user.employee.role !== 'employee') {
  //   return (
  //     <div className="p-6 max-w-4xl mx-auto">
  //       <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
  //         <XCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
  //         <h2 className="text-xl font-semibold text-red-800 mb-2">Access Denied</h2>
  //         <p className="text-red-600">
  //           You don't have permission to apply for leave. This feature is available only for employees.
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Apply for Leave</h1>
        <p className="text-gray-600">Submit a new leave application for approval</p>
      </div>

      {/* Main Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Leave Type Selection */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                Leave Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Leave Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Leave Type *
                  </label>
                  <select
                    value={formData.leaveType}
                    onChange={(e) => setFormData(prev => ({ ...prev, leaveType: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Leave Type</option>
                    {leaveTypes.map(lt => (
                      <option key={lt.type} value={lt.type}>
                        {lt.type} - {lt.type === 'CL' ? 'Casual Leave' : 
                                 lt.type === 'SL' ? 'Sick Leave' : 
                                 lt.type === 'PL' ? 'Privileged Leave' : 
                                 lt.type === 'Maternity' ? 'Maternity Leave' : 
                                 lt.type === 'Paternity' ? 'Paternity Leave' : lt.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Available Balance */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available Balance
                  </label>
                  <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg">
                    <span className="text-lg font-semibold text-gray-900">
                      {availableBalance} days
                    </span>
                  </div>
                </div>
              </div>

              {/* Policy Information */}
              {policyInfo && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-start">
                    <Info className="w-4 h-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                    <div className="text-sm text-blue-700">
                      <strong>Policy:</strong> {policyInfo.entitlement} days entitlement, 
                      {policyInfo.carryForward > 0 ? ` ${policyInfo.carryForward} days carry forward` : ' no carry forward'}, 
                      {policyInfo.accrual} accrual
                      {policyInfo.gender && ` (${policyInfo.gender} only)`}
                      {policyInfo.policyName && ` - ${policyInfo.policyName}`}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Date Selection */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                Date Selection
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Start Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date *
                  </label>
                  <DatePicker
                    selected={formData.startDate}
                    onChange={(date) => setFormData(prev => ({ ...prev, startDate: date }))}
                    minDate={new Date()}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholderText="Select start date"
                    required
                  />
                </div>

                {/* End Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date *
                  </label>
                  <DatePicker
                    selected={formData.endDate}
                    onChange={(date) => setFormData(prev => ({ ...prev, endDate: date }))}
                    minDate={formData.startDate || new Date()}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholderText="Select end date"
                    required
                  />
                </div>
              </div>

              {/* Half Day Option */}
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="halfDay"
                  checked={formData.isHalfDay}
                  onChange={(e) => setFormData(prev => ({ ...prev, isHalfDay: e.target.checked }))}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="halfDay" className="ml-2 text-sm text-gray-700">
                  This is a half-day leave
                </label>
              </div>

              {formData.isHalfDay && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Half Day Type
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="halfDayType"
                        value="first"
                        checked={formData.halfDayType === 'first'}
                        onChange={(e) => setFormData(prev => ({ ...prev, halfDayType: e.target.value }))}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">First Half</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="halfDayType"
                        value="second"
                        checked={formData.halfDayType === 'second'}
                        onChange={(e) => setFormData(prev => ({ ...prev, halfDayType: e.target.value }))}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Second Half</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Duration Calculation */}
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Calculated Duration:</span>
                  <span className="text-lg font-semibold text-gray-900">
                    {calculatedDuration} day(s)
                  </span>
                </div>
                {formData.startDate && formData.endDate && (
                  <div className="text-xs text-gray-500 mt-1">
                    Excludes weekends and holidays
                  </div>
                )}
              </div>
            </div>

            {/* Reason and Attachments */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                Additional Information
              </h3>
              
              {/* Reason */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Leave *
                </label>
                <textarea
                  value={formData.reason}
                  onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Please provide a reason for your leave application..."
                  required
                />
              </div>

              {/* Attachments */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Attachments (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    Drop files here or click to upload
                  </p>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium cursor-pointer hover:bg-blue-600"
                  >
                    Choose Files
                  </label>
                </div>

                {/* File List */}
                {formData.attachments.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {formData.attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm text-gray-700 truncate">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Warnings and Errors */}
            {conflicts.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-yellow-400 mr-2" />
                  <h4 className="text-sm font-medium text-yellow-800">Potential Issues</h4>
                </div>
                <ul className="mt-2 text-sm text-yellow-700 list-disc list-inside">
                  {conflicts.map((conflict, index) => (
                    <li key={index}>{conflict}</li>
                  ))}
                </ul>
              </div>
            )}

            {calculatedDuration > availableBalance && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
                  <h4 className="text-sm font-medium text-red-800">Insufficient Balance</h4>
                </div>
                <p className="mt-1 text-sm text-red-700">
                  You're applying for {calculatedDuration} days but only have {availableBalance} days available.
                </p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                onClick={() => window.history.back()}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || conflicts.length > 0 || calculatedDuration > availableBalance}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {loading ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Submit Application
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column - Information Panel */}
        <div className="space-y-6">
          {/* Holiday Information */}
          {selectedHolidays.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-orange-600" />
                Holidays in Selected Range
              </h3>
              <div className="space-y-2">
                {selectedHolidays.map(holiday => (
                  <div key={holiday.id} className="flex items-center justify-between p-2 bg-orange-50 rounded">
                    <span className="text-sm font-medium text-orange-800">{holiday.name}</span>
                    <span className="text-xs text-orange-600">
                      {new Date(holiday.date).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Tips */}
          <div className="bg-blue-50 rounded-lg shadow-sm border border-blue-200 p-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Info className="w-5 h-5 mr-2 text-blue-600" />
              Application Tips
            </h3>
            <ul className="space-y-2 text-sm text-blue-700">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                Submit applications at least 3 days in advance
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                Include supporting documents for sick leaves
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                Check team calendar for important deadlines
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                Contact your manager for urgent leave requests
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-3">Need Help?</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>Your Reporting Manager:</p>
              <p className="font-medium">{user?.employee?.reportingManager || 'Not assigned'}</p>
              <p className="text-xs mt-2">Contact HR for policy-related queries</p>
            </div>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <XCircle className="w-5 h-5 text-red-400 mr-2" />
            <h4 className="text-sm font-medium text-red-800">Error</h4>
          </div>
          <p className="mt-1 text-sm text-red-700">{error}</p>
        </div>
      )}
    </div>
  );
};

export default ApplyLeave;