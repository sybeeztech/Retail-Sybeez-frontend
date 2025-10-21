import React, { useState } from 'react';
import { ArrowRight, Store, Building2 } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useSetupStore } from '../../store/setupStore';

const Step2 = () => {
  const { setStepData } = useSetupStore();
  const [selectedBusiness, setSelectedBusiness] = useState('');
  const navigate = useNavigate();

  const businesses = [
    { id: 'bakery', label: 'Bakery', description: 'Fresh bread, cakes, and pastries', icon: '🥖' },
    { id: 'supermarket', label: 'Supermarket', description: 'General retail and groceries', icon: '🛒' },
    { id: 'boutique', label: 'Boutique', description: 'Fashion and clothing store', icon: '👗' },
    { id: 'pharmacy', label: 'Pharmacy', description: 'Healthcare and medicines', icon: '💊' },
    { id: 'electronics', label: 'Electronics', description: 'Mobile and tech accessories', icon: '📱' },
    { id: 'cosmetics', label: 'Cosmetics', description: 'Beauty and personal care', icon: '💄' },
    { id: 'grocery', label: 'Grocery Shop', description: 'Daily essentials and food items', icon: '🍎' },
    { id: 'gift', label: 'Gift Shop', description: 'Gifts and special occasions', icon: '🎁' },
    { id: 'florist', label: 'Florist', description: 'Flowers and plant arrangements', icon: '🌸' },
    { id: 'stationery', label: 'Stationery', description: 'Office and school supplies', icon: '📚' },
    { id: 'tea', label: 'Tea Outlet', description: 'Tea, coffee, and beverages', icon: '🍵' },
    { id: 'other', label: 'Other', description: 'Different type of business', icon: '🏪' }
  ];

  const handleContinue = () => {
    if (!selectedBusiness) return;
    
    setStepData({
      businessType: selectedBusiness
    });

    console.log('Proceeding to next step with data:', { businessType: selectedBusiness });
    navigate("/retail/setup/step3");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-white/40 backdrop-blur-xl rounded-xl border border-white/20 shadow-lg mb-3">
            <Building2 className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-1">
            Choose Your Business Type
          </h1>
          <p className="text-gray-600 text-sm">This helps us customize features for your specific needs</p>
        </div>

        {/* Main Card */}
        <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              {Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="w-2 h-2 bg-gray-200 rounded-full"></div>
              ))}
            </div>
            <span className="ml-3 text-xs text-gray-500">Step 2 of 4</span>
          </div>

          <div className="max-w-3xl mx-auto">
            {/* Business Type Selection */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                Select your business category
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {businesses.map((business) => (
                  <button
                    key={business.id}
                    onClick={() => setSelectedBusiness(business.id)}
                    className={`p-4 rounded-xl border transition-all duration-200 text-center hover:scale-[1.02] ${
                      selectedBusiness === business.id
                        ? 'bg-blue-50/80 backdrop-blur-sm border-blue-300 shadow-md transform scale-[1.02]'
                        : 'bg-white/50 backdrop-blur-sm border-gray-200/50 hover:bg-white/70'
                    }`}
                  >
                    <div className="text-2xl mb-2">{business.icon}</div>
                    <div className="font-medium text-gray-900 text-sm mb-0.5">{business.label}</div>
                    <div className="text-xs text-gray-600">{business.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Business Info */}
            {selectedBusiness && (
              <div className="mb-6 p-4 bg-gradient-to-r from-blue-50/50 to-purple-50/50 backdrop-blur-sm rounded-xl border border-blue-200/50">
                <div className="text-center">
                  <h3 className="text-base font-semibold text-gray-900 mb-1">
                    Great choice! 
                  </h3>
                  <p className="text-gray-600 text-sm">
                    We'll customize your Sybeez platform specifically for {businesses.find(b => b.id === selectedBusiness)?.label.toLowerCase()} operations.
                  </p>
                </div>
              </div>
            )}

            {/* Continue Button */}
            <div className="flex justify-center">
              <button
                onClick={handleContinue}
                disabled={!selectedBusiness}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center space-x-2 text-sm"
              >
                <span>Continue Setup</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-4">
          <p className="text-gray-500 text-xs">
            Don't see your business type? Choose "Other" and we'll help you customize it later.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Step2;