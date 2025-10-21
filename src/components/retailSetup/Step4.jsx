import React, { useState } from 'react';
import { ArrowRight, Calculator, Shield, FileText } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useSetupStore } from '../../store/setupStore';

const Step4 = () => {
  const { setStepData } = useSetupStore();
  const [taxConfig, setTaxConfig] = useState({
    gstNumber: '',
    gstType: '',
    taxationMethod: '',
    hsnsacEnabled: false,
    compositeDealer: false,
    panNumber: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setTaxConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContinue = () => {
    setStepData({
      taxConfig: taxConfig
    });

    console.log('Proceeding to next step with data:', { taxConfig });
    navigate("/retail/setup/step9");
  };

  const gstTypes = [
    { id: 'regular', name: 'Regular GST', description: 'For businesses with turnover > ₹40 lakhs' },
    { id: 'composition', name: 'Composition Scheme', description: 'For businesses with turnover < ₹1.5 crores' },
    { id: 'unregistered', name: 'Unregistered', description: 'For businesses below GST threshold' }
  ];

  const taxationMethods = [
    { id: 'inclusive', name: 'Tax Inclusive', description: 'Tax included in product price' },
    { id: 'exclusive', name: 'Tax Exclusive', description: 'Tax added separately to product price' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-white/40 backdrop-blur-xl rounded-xl border border-white/20 shadow-lg mb-3">
            <Calculator className="w-6 h-6 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-1">
            Tax Configuration
          </h1>
          <p className="text-gray-600 text-sm">Configure GST and taxation settings for your business</p>
        </div>

        {/* Main Card */}
        <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              {Array.from({ length: 2 }, (_, i) => (
                <div key={i} className="w-2 h-2 bg-gray-200 rounded-full"></div>
              ))}
            </div>
            <span className="ml-3 text-xs text-gray-500">Step 4 of 4</span>
          </div>

          <div className="max-w-2xl mx-auto">
            {/* GST Type Selection */}
            <div className="mb-6">
              <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center">
                <Shield className="w-4 h-4 mr-2 text-green-600" />
                GST Registration Type
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {gstTypes.map((type) => (
                  <div
                    key={type.id}
                    onClick={() => handleInputChange('gstType', type.id)}
                    className={`p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                      taxConfig.gstType === type.id
                        ? 'border-green-500 bg-green-50/50 backdrop-blur-sm'
                        : 'border-gray-200/50 bg-white/30 backdrop-blur-sm hover:border-green-300'
                    }`}
                  >
                    <h4 className="font-semibold text-gray-900 mb-0.5 text-sm">{type.name}</h4>
                    <p className="text-xs text-gray-600">{type.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* GST Number Input */}
            {(taxConfig.gstType === 'regular' || taxConfig.gstType === 'composition') && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  GST Number
                </label>
                <input
                  type="text"
                  value={taxConfig.gstNumber}
                  onChange={(e) => handleInputChange('gstNumber', e.target.value)}
                  className="w-full px-4 py-2.5 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all text-sm"
                  placeholder="Enter 15-digit GST number"
                  maxLength={15}
                />
              </div>
            )}

            {/* PAN Number */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                PAN Number
              </label>
              <input
                type="text"
                value={taxConfig.panNumber}
                onChange={(e) => handleInputChange('panNumber', e.target.value)}
                className="w-full px-4 py-2.5 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all text-sm"
                placeholder="Enter 10-digit PAN number"
                maxLength={10}
              />
            </div>

            {/* Taxation Method */}
            <div className="mb-6">
              <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center">
                <FileText className="w-4 h-4 mr-2 text-green-600" />
                Taxation Method
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {taxationMethods.map((method) => (
                  <div
                    key={method.id}
                    onClick={() => handleInputChange('taxationMethod', method.id)}
                    className={`p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                      taxConfig.taxationMethod === method.id
                        ? 'border-green-500 bg-green-50/50 backdrop-blur-sm'
                        : 'border-gray-200/50 bg-white/30 backdrop-blur-sm hover:border-green-300'
                    }`}
                  >
                    <h4 className="font-semibold text-gray-900 mb-0.5 text-sm">{method.name}</h4>
                    <p className="text-xs text-gray-600">{method.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Options */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between p-3 bg-white/30 backdrop-blur-sm rounded-xl border border-gray-200/50">
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Enable HSN/SAC Codes</h4>
                  <p className="text-xs text-gray-600">Use HSN codes for products and SAC codes for services</p>
                </div>
                <button
                  onClick={() => handleInputChange('hsnsacEnabled', !taxConfig.hsnsacEnabled)}
                  className={`w-11 h-6 rounded-full transition-all duration-200 focus:outline-none ${
                    taxConfig.hsnsacEnabled
                      ? 'bg-green-500'
                      : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                      taxConfig.hsnsacEnabled ? 'translate-x-5' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              {taxConfig.gstType === 'composition' && (
                <div className="flex items-center justify-between p-3 bg-white/30 backdrop-blur-sm rounded-xl border border-gray-200/50">
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">Composition Dealer</h4>
                    <p className="text-xs text-gray-600">Operating under GST composition scheme</p>
                  </div>
                  <button
                    onClick={() => handleInputChange('compositeDealer', !taxConfig.compositeDealer)}
                    className={`w-11 h-6 rounded-full transition-all duration-200 focus:outline-none ${
                      taxConfig.compositeDealer
                        ? 'bg-green-500'
                        : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                        taxConfig.compositeDealer ? 'translate-x-5' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
              )}
            </div>

            {/* Continue Button */}
            <div className="flex justify-center">
              <button
                onClick={handleContinue}
                className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:ring-offset-2 shadow-lg flex items-center space-x-2 text-sm"
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
            Tax settings can be modified later from the Finance module
          </p>
        </div>
      </div>
    </div>
  );
};

export default Step4;