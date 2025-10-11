import React, { useState } from 'react';
import { ArrowRight, MapPin, Building, Upload, X } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useSetupStore } from '../../store/setupStore';

const Step3 = () => {
  const { setStepData, updateStep3Data } = useSetupStore();
  const [businessInfo, setBusinessInfo] = useState({
    businessName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    email: '',
    logo: null,
    logoPreview: null
  });
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    const updatedInfo = {
      ...businessInfo,
      [field]: value
    };
    setBusinessInfo(updatedInfo);

    // Real-time update for business name and logo
    if (field === 'businessName' || field === 'logoPreview') {
      updateStep3Data({
        [field]: value
      });
    }
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const updatedInfo = {
          ...businessInfo,
          logo: file,
          logoPreview: e.target.result
        };
        setBusinessInfo(updatedInfo);
        
        // Real-time update in store
        updateStep3Data({
          logo: file,
          logoPreview: e.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setBusinessInfo(prev => ({
      ...prev,
      logo: null,
      logoPreview: null
    }));
    
    // Real-time update in store
    updateStep3Data({
      logo: null,
      logoPreview: null
    });
  };

  const handleContinue = () => {
    const requiredFields = ['businessName', 'address', 'city', 'state', 'pincode'];
    const isValid = requiredFields.every(field => businessInfo[field].trim() !== '');
    
    if (!isValid) return;
    
    updateStep3Data({
      businessName: businessInfo.businessName,
      address: businessInfo.address,
      city: businessInfo.city,
      state: businessInfo.state,
      pincode: businessInfo.pincode,
      phone: businessInfo.phone,
      email: businessInfo.email,
      logo: businessInfo.logo,
      logoPreview: businessInfo.logoPreview,
      gstNumber: businessInfo.gstNumber
    });

    console.log('Proceeding to next step with data:', { businessInfo });
    navigate("/retail/setup/step4");
  };

  const isFormValid = () => {
    const requiredFields = ['businessName', 'address', 'city', 'state', 'pincode'];
    return requiredFields.every(field => businessInfo[field].trim() !== '');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-white/40 backdrop-blur-xl rounded-xl border border-white/20 shadow-lg mb-3">
            <Building className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-1">
            Business Information
          </h1>
          <p className="text-gray-600 text-sm">Tell us about your business location and contact details</p>
        </div>

        {/* Main Card */}
        <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              {Array.from({ length: 2 }, (_, i) => (
                <div key={i} className="w-2 h-2 bg-gray-200 rounded-full"></div>
              ))}
            </div>
            <span className="ml-3 text-xs text-gray-500">Step 3 of 4</span>
          </div>

          <div className="max-w-2xl mx-auto">
            <form className="space-y-4">
              {/* Business Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Business Name *
                </label>
                <input
                  type="text"
                  value={businessInfo.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  className="w-full px-4 py-2.5 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all text-sm"
                  placeholder="Enter your business name"
                />
              </div>

              {/* Business Logo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Business Logo (Optional)
                </label>
                <div className="flex items-start space-x-4">
                  {/* Logo Preview */}
                  {businessInfo.logoPreview ? (
                    <div className="relative">
                      <img
                        src={businessInfo.logoPreview}
                        alt="Business Logo Preview"
                        className="w-20 h-20 object-cover rounded-xl border-2 border-gray-200 bg-white shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveLogo}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-gray-50">
                      <Building className="w-8 h-8 text-gray-400" />
                    </div>
                  )}

                  {/* Upload Button */}
                  <div className="flex-1">
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                      <div className="border-2 border-dashed border-blue-300 rounded-xl p-4 hover:border-blue-400 hover:bg-blue-50/30 transition-all duration-200">
                        <div className="flex flex-col items-center text-center">
                          <Upload className="w-6 h-6 text-blue-500 mb-2" />
                          <span className="text-sm font-medium text-gray-700">Upload Logo</span>
                          <span className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</span>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Business Address *
                </label>
                <textarea
                  value={businessInfo.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2.5 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all resize-none text-sm"
                  placeholder="Enter your business address"
                />
              </div>

              {/* City and State */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    City *
                  </label>
                  <input
                    type="text"
                    value={businessInfo.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all text-sm"
                    placeholder="Enter city"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    State *
                  </label>
                  <input
                    type="text"
                    value={businessInfo.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all text-sm"
                    placeholder="Enter state"
                  />
                </div>
              </div>

              {/* PIN Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  PIN Code *
                </label>
                <input
                  type="text"
                  value={businessInfo.pincode}
                  onChange={(e) => handleInputChange('pincode', e.target.value)}
                  className="w-full px-4 py-2.5 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all text-sm"
                  placeholder="Enter PIN code"
                  maxLength={6}
                />
              </div>

              {/* Contact Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={businessInfo.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all text-sm"
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={businessInfo.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all text-sm"
                    placeholder="Enter email address"
                  />
                </div>
              </div>
            </form>

            {/* Continue Button */}
            <div className="flex justify-center mt-6">
              <button
                onClick={handleContinue}
                disabled={!isFormValid()}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center space-x-2 text-sm"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-4">
          <p className="text-gray-500 text-xs">
            * Required fields - This information will be used for your business profile
          </p>
        </div>
      </div>
    </div>
  );
};

export default Step3;