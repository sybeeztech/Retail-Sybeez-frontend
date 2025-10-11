import React, { useState } from 'react';
import { X, Mail, Clock, CheckCircle } from 'lucide-react';
import useSettingsStore from '../../store/settingsStore';

const SupportTicket = ({ isOpen, onClose }) => {
  const { theme } = useSettingsStore();
  const [formData, setFormData] = useState({
    issueTitle: '',
    product: 'Retail ERP System',
    module: '',
    priority: 'Medium - Minor issue',
    contactName: '',
    contactEmail: '',
    issueDescription: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const products = [
    'Retail ERP System',
    'HRM Platform',
    'CRM System',
    'Finance Management',
    'Supply Chain',
    'Analytics Dashboard'
  ];

  const priorities = [
    'High - Critical issue',
    'Medium - Minor issue',
    'Low - General inquiry'
  ];

  const modules = [
    'Dashboard',
    'Inventory Management',
    'Point of Sale (POS)',
    'Multi-Branch Management',
    'Supplier Management',
    'Reports & Analytics',
    'User Management',
    'Settings',
    'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create email content
    const subject = encodeURIComponent(`Support Request: ${formData.issueTitle}`);
    const body = encodeURIComponent(`Support Request Details:

Issue Title: ${formData.issueTitle}
Product: ${formData.product}
Module/Feature: ${formData.module || 'Not specified'}
Priority: ${formData.priority}

Contact Information:
Name: ${formData.contactName}
Email: ${formData.contactEmail}

Issue Description:
${formData.issueDescription}

System Information:
- Browser: ${navigator.userAgent}
- Date: ${new Date().toLocaleString()}
- Platform: Retail ERP System

This ticket was submitted through the Support Portal.
Expected response time: Within 24 business hours.

--
Sybeez Technologies Support System`);

    const mailtoLink = `mailto:support@sybeez.com?subject=${subject}&body=${body}`;
    
    // Simulate submission delay
    setTimeout(() => {
      window.open(mailtoLink);
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after showing success
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          issueTitle: '',
          product: 'Retail ERP System',
          module: '',
          priority: 'Medium - Minor issue',
          contactName: '',
          contactEmail: '',
          issueDescription: ''
        });
        onClose();
      }, 2000);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-xl ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        {/* Header */}
        <div className={`sticky top-0 flex items-center justify-between p-6 border-b ${
          theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
        }`}>
          <h2 className={`text-xl font-semibold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Submit Support Request
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              theme === 'dark' 
                ? 'hover:bg-gray-700 text-gray-400 hover:text-white' 
                : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Message */}
        {isSubmitted && (
          <div className="p-6">
            <div className="flex items-center justify-center text-green-600 mb-4">
              <CheckCircle className="w-12 h-12" />
            </div>
            <div className="text-center">
              <h3 className={`text-lg font-medium mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Support Request Submitted Successfully!
              </h3>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Your email client should open with the support request. If it doesn't, please copy the information and send it manually to support@sybeez.com
              </p>
            </div>
          </div>
        )}

        {/* Form Content */}
        {!isSubmitted && (
          <>
            <div className="p-6">
              <p className={`text-sm mb-6 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Experiencing issues with our platform? Submit a ticket directly to our support team for assistance.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Issue Title and Product */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Issue Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="issueTitle"
                      value={formData.issueTitle}
                      onChange={handleInputChange}
                      placeholder="Brief description of your issue"
                      required
                      className={`w-full px-3 py-2 border rounded-lg transition-colors ${
                        theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Product
                    </label>
                    <select
                      name="product"
                      value={formData.product}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg transition-colors ${
                        theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                          : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20`}
                    >
                      {products.map(product => (
                        <option key={product} value={product}>{product}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Module and Priority */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Module/Feature (if applicable)
                    </label>
                    <select
                      name="module"
                      value={formData.module}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg transition-colors ${
                        theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                          : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20`}
                    >
                      <option value="">Select module or feature</option>
                      {modules.map(module => (
                        <option key={module} value={module}>{module}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Priority
                    </label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg transition-colors ${
                        theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                          : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20`}
                    >
                      {priorities.map(priority => (
                        <option key={priority} value={priority}>{priority}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Contact Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      required
                      className={`w-full px-3 py-2 border rounded-lg transition-colors ${
                        theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Contact Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      placeholder="Your email address"
                      required
                      className={`w-full px-3 py-2 border rounded-lg transition-colors ${
                        theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20`}
                    />
                  </div>
                </div>

                {/* Issue Description */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Issue Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="issueDescription"
                    value={formData.issueDescription}
                    onChange={handleInputChange}
                    placeholder="Please provide detailed information about the issue, including steps to reproduce and error messages..."
                    required
                    rows={6}
                    className={`w-full px-3 py-2 border rounded-lg transition-colors resize-none ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20`}
                  />
                  <p className={`text-xs mt-1 ${
                    theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    For faster resolution, include error messages and steps to reproduce the issue
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 ${
                    isSubmitting ? 'cursor-not-allowed' : 'cursor-pointer'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4" />
                      <span>Submit Support Request</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Support Information Footer */}
            <div className={`border-t p-6 ${
              theme === 'dark' ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'
            }`}>
              <h3 className={`text-lg font-medium mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Support Information
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className={`w-5 h-5 ${
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                  <div>
                    <p className={`font-medium ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Support Email
                    </p>
                    <a 
                      href="mailto:support@sybeez.com"
                      className={`text-sm ${
                        theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                      } hover:underline`}
                    >
                      support@sybeez.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Clock className={`w-5 h-5 ${
                    theme === 'dark' ? 'text-green-400' : 'text-green-600'
                  }`} />
                  <div>
                    <p className={`font-medium ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Response Time
                    </p>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Within 24 business hours
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SupportTicket;