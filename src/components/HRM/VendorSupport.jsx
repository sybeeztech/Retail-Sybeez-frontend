import React, { useState } from 'react';
import { useHelpStore } from '../../store/helpStore';

const VendorSupport = () => {
  const [formData, setFormData] = useState({
    title: '',
    product: 'hrms',
    module: '',
    priority: 'medium',
    contactName: '',
    contactEmail: '',
    description: ''
  });
  
  const { submitExternalTicket, loading, error, success } = useHelpStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitExternalTicket(formData);
    // Reset form after successful submission
    if (!loading) {
      setFormData({
        title: '',
        product: 'hrms',
        module: '',
        priority: 'medium',
        contactName: '',
        contactEmail: '',
        description: ''
      });
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Vendor Product Support</h1>
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          <p>Your vendor support ticket has been submitted. You will receive a confirmation email shortly.</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>Error: {error}</p>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Submit Vendor Support Request</h2>
        <p className="text-gray-600 mb-6">
          Experiencing issues with our HRMS platform? Submit a ticket directly to our product vendor for assistance.
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
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="product">
                Product
              </label>
              <select
                id="product"
                name="product"
                value={formData.product}
                onChange={handleChange}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="hrms">HRMS Platform</option>
                <option value="payroll">Payroll Module</option>
                <option value="attendance">Attendance System</option>
                {/* <option value="recruitment">Recruitment Module</option> */}
                <option value="analytics">Analytics Suite</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="module">
                Module/Feature (if applicable)
              </label>
              <input
                id="module"
                name="module"
                type="text"
                value={formData.module}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Specific module or feature name"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priority">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="low">Low - General question</option>
                <option value="medium">Medium - Minor issue</option>
                <option value="high">High - Affecting workflow</option>
                <option value="urgent">Urgent - System down</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactName">
                Contact Name
              </label>
              <input
                id="contactName"
                name="contactName"
                type="text"
                value={formData.contactName}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                placeholder="Your full name"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactEmail">
                Contact Email
              </label>
              <input
                id="contactEmail"
                name="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                placeholder="Your email address"
              />
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
              placeholder="Please provide detailed information about the issue, including steps to reproduce and error messages..."
            ></textarea>
            <p className="text-xs text-gray-500 mt-1">For faster resolution, include error messages and steps to reproduce the issue</p>
          </div>
          
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit to Vendor'}
            </button>
          </div>
        </form>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6 mt-6">
        <h2 className="text-lg font-semibold mb-4">Vendor Support Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Vendor Support</h3>
            <p href='mailto:support@sybeez.com' className="text-blue-600 cursor-pointer">support@sybeez.com</p>
            <p className="text-sm text-gray-500 mt-1">Response within 24 business hours</p>
          </div>
          {/* <div>
            <h3 className="font-medium text-gray-700 mb-2">Emergency Support</h3>
            <p className="text-blue-600">+1 (800) 123-4567</p>
            <p className="text-sm text-gray-500 mt-1">For critical system outages only</p>
          </div> */}
        </div>
        {/* <div className="mt-4">
          <h3 className="font-medium text-gray-700 mb-2">Service Level Agreement (SLA)</h3>
          <ul className="text-sm text-gray-600 list-disc pl-5">
            <li>Urgent: 2-hour response time</li>
            <li>High: 4-hour response time</li>
            <li>Medium: 1-business day response time</li>
            <li>Low: 2-business day response time</li>
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default VendorSupport;