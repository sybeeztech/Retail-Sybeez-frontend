import React, { useState } from 'react';
import { useHelpStore } from '../../store/helpStore';
import { useDepartmentStore } from '../../store/departmentStore';

const EmployeeHelpdesk = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'attendance',
    priority: 'medium',
    department: '',
    employeeId: '',
    relatedModule: '',
    description: ''
  });
  
  const { submitHelpdeskTicket, loading, error, success } = useHelpStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitHelpdeskTicket(formData);
    // Reset form after successful submission
    if (!loading) {
      setFormData({
        title: '',
        category: 'attendance',
        priority: 'medium',
        department: '',
        employeeId: '',
        relatedModule: '',
        description: ''
      });
    }
  };

  const { departments } = useDepartmentStore();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold">HRM Employee Helpdesk</h1>
          <p className="text-gray-600">Get assistance with HRM platform issues and questions</p>
        </div>
      </div>
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          <p>Your helpdesk ticket has been submitted. Ticket ID: <strong>{success.ticketNumber}</strong></p>
          <p className="text-sm mt-1">Our HR team will contact you within 24 business hours.</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>Error: {error}</p>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Submit Helpdesk Request</h2>
        <p className="text-gray-600 mb-6">
          Need assistance with our HRM platform? Submit a ticket to our HR helpdesk team for support with system issues, access requests, or platform questions.
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                Issue Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                placeholder="Brief description of your issue"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                Issue Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="attendance">Attendance System</option>
                {/* <option value="leave">Leave Management</option> */}
                <option value="payroll">Payroll Issues</option>
                <option value="profile">Employee Profile</option>
                {/* <option value="access">System Access</option> */}
                {/* <option value="reporting">Reporting</option> */}
                <option value="other">Other HRM Issue</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department">
                Department
              </label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select Department</option>
                {departments.map(dept => (
                  <option key={dept.id} value={dept.name}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="employeeId">
                Employee ID
              </label>
              <input
                id="employeeId"
                name="employeeId"
                type="text"
                value={formData.employeeId}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                placeholder="Your employee ID"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="relatedModule">
              Related HRM Module (if applicable)
            </label>
            <select
              id="relatedModule"
              name="relatedModule"
              value={formData.relatedModule}
              onChange={handleChange}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Module</option>
              {/* <option value="employee-self-service">Employee Self-Service</option> */}
              <option value="time-attendance">Time & Attendance</option>
              {/* <option value="leave-management">Leave Management</option> */}
              <option value="payroll">Payroll</option>
              {/* <option value="recruitment">Recruitment</option> */}
              {/* <option value="performance">Performance Management</option> */}
              <option value="reports">Reports & Analytics</option>
            </select>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priority">
              Priority
            </label>
            <div className="flex flex-wrap gap-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="priority"
                  value="low"
                  checked={formData.priority === 'low'}
                  onChange={handleChange}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2">Low - General question</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="priority"
                  value="medium"
                  checked={formData.priority === 'medium'}
                  onChange={handleChange}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2">Medium - Minor issue</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="priority"
                  value="high"
                  checked={formData.priority === 'high'}
                  onChange={handleChange}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2">High - Affecting workflow</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="priority"
                  value="urgent"
                  checked={formData.priority === 'urgent'}
                  onChange={handleChange}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2">Urgent - System down</span>
              </label>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Issue Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="6"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              placeholder="Please provide detailed information about your HRM platform issue, including any error messages, steps to reproduce, and what you were trying to accomplish..."
            ></textarea>
            <p className="text-xs text-gray-500 mt-1">For faster resolution, include specific error messages and steps to reproduce the issue</p>
          </div>
          
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit to HR Helpdesk'}
            </button>
          </div>
        </form>
      </div>
      
      {/* <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">HR Helpdesk Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-700 mb-2">HR Helpdesk</h3>
            <p className="text-blue-600">hr-helpdesk@company.com</p>
            <p className="text-sm text-gray-500 mt-1">Response within 24 business hours</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Urgent HR Issues</h3>
            <p className="text-blue-600">Ext. 1234</p>
            <p className="text-sm text-gray-500 mt-1">Mon-Fri, 9AM-5PM</p>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="font-medium text-gray-700 mb-2">Common HRM Platform Resources</h3>
          <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
            <li><a href="#" className="text-blue-600 hover:underline">Employee Self-Service Guide</a></li>
            <li><a href="#" className="text-blue-600 hover:underline">How to Submit Leave Requests</a></li>
            <li><a href="#" className="text-blue-600 hover:underline">Payroll Schedule & FAQs</a></li>
            <li><a href="#" className="text-blue-600 hover:underline">Attendance System User Manual</a></li>
          </ul>
        </div>
      </div> */}
    </div>
  );
};

export default EmployeeHelpdesk;