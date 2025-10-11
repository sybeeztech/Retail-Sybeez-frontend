import React, { useState } from 'react';
import { Mail, Clock, CheckCircle, ArrowLeft } from 'lucide-react';
import useSettingsStore from '../store/settingsStore';
import { useNavigate } from 'react-router-dom';

const HelpPage = () => {
  const { theme } = useSettingsStore();
  const navigate = useNavigate();
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
      }, 3000);
    }, 1000);
  };

  return (
    <div className={`min-h-screen ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <div className={`border-b ${
        theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'dark' 
                    ? 'hover:bg-gray-700 text-gray-400 hover:text-white' 
                    : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className={`text-2xl font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Help & Support
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-4">
          <p className={`text-lg ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Submit Support Request
          </p>
          <p className={`text-sm mt-1 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Experiencing issues with our platform? Submit a ticket directly to our support team for assistance.
          </p>
        </div>

        {/* Success Message */}
        {isSubmitted && (
          <div className={`p-4 rounded-lg mb-4 ${
            theme === 'dark' ? 'bg-green-900/20 border border-green-800' : 'bg-green-50 border border-green-200'
          }`}>
            <div className="flex items-center justify-center text-green-600 mb-3">
              <CheckCircle className="w-10 h-10" />
            </div>
            <div className="text-center">
              <h3 className={`text-lg font-medium mb-2 ${
                theme === 'dark' ? 'text-green-400' : 'text-green-800'
              }`}>
                Support Request Submitted Successfully!
              </h3>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-green-300' : 'text-green-700'
              }`}>
                Your email client should open with the support request. If it doesn't, please copy the information and send it manually to support@sybeez.com
              </p>
            </div>
          </div>
        )}

        {/* Form */}
        {!isSubmitted && (
          <div className={`rounded-lg shadow-sm ${
            theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}>
            <div className="p-4 sm:p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Issue Title and Product */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1.5 ${
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
                      className={`w-full px-3 py-2.5 border rounded-lg transition-colors text-sm ${
                        theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                      } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1.5 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Product
                    </label>
                    <select
                      name="product"
                      value={formData.product}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2.5 border rounded-lg transition-colors text-sm ${
                        theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                          : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                      } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    >
                      {products.map(product => (
                        <option key={product} value={product}>{product}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Module and Priority */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1.5 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Module/Feature (if applicable)
                    </label>
                    <select
                      name="module"
                      value={formData.module}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2.5 border rounded-lg transition-colors text-sm ${
                        theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                          : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                      } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    >
                      <option value="">Select module or feature</option>
                      {modules.map(module => (
                        <option key={module} value={module}>{module}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1.5 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Priority
                    </label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2.5 border rounded-lg transition-colors text-sm ${
                        theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                          : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                      } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    >
                      {priorities.map(priority => (
                        <option key={priority} value={priority}>{priority}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1.5 ${
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
                      className={`w-full px-3 py-2.5 border rounded-lg transition-colors text-sm ${
                        theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                      } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1.5 ${
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
                      className={`w-full px-3 py-2.5 border rounded-lg transition-colors text-sm ${
                        theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                      } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    />
                  </div>
                </div>

                {/* Issue Description */}
                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${
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
                    rows={5}
                    className={`w-full px-3 py-2.5 border rounded-lg transition-colors resize-none text-sm ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                    } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  />
                  <p className={`text-xs mt-1.5 ${
                    theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    For faster resolution, include error messages and steps to reproduce the issue
                  </p>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2.5 px-5 rounded-lg transition-colors flex items-center space-x-2 text-sm ${
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
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Support Information */}
        <div className={`mt-6 rounded-lg shadow-sm ${
          theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        }`}>
          <div className="p-4 sm:p-6">
            <h3 className={`text-lg font-medium mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Support Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Mail className={`w-5 h-5 ${
                  theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                }`} />
                <div>
                  <p className={`font-medium text-sm ${
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
                  <p className={`font-medium text-sm ${
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
        </div>
      </div>
    </div>
  );
};

export default HelpPage;