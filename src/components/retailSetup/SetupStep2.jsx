import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useSetupStore } from '../../store/setupStore'; // Zustand store

// Mock logo component since we don't have the actual image
const sybeezLogo = "data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='32' height='32' rx='8' fill='%233B82F6'/%3E%3Cpath d='M8 12h16v8H8z' fill='white'/%3E%3C/svg%3E";

const SetupStep2 = () => {
  const [selectedBusiness, setSelectedBusiness] = useState('');
  const { setStepData } = useSetupStore();
  const navigate = useNavigate();

  const businesses = [
    'Bakery', 'Supermarket', 'Chips Shop', 'Boutique', 'Gift Shops',
    'Grocery Shops', 'Dress Shops', 'Mobile Accessories', 'Pharmacy',
    'Cosmetics', 'Fruit Shop', 'Tea Outlet', 'Florist', 'Stationery',
    'Mobile-HUB', 'Other'
  ];

  const LogoComponent = () => (
    <div className="mb-12">
      <div className="flex items-center">
        <img src={sybeezLogo} alt="Sybeez Logo" className="h-8 w-8 bg-white mr-3 rounded-lg" />
        <span className="text-blue-600 text-2xl font-bold">Sybeez</span>
      </div>
    </div>
  );

  const handleContinue = () => {
    setStepData({
      businessType: selectedBusiness
    });
    console.log('Proceeding to next step with data:', {
      businessType: selectedBusiness
    });
    // Navigate to step 3
    navigate("/retail/step3");
  };

  // Enhanced animated business illustration component
  const BusinessIllustration = () => (
    <div className="flex-1 bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-600 flex items-center justify-center p-8 relative overflow-hidden">
      <div className="max-w-lg z-10">
        {/* Main Business Card */}
        <div className="bg-white rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-transform duration-300 relative">
          {/* Storefront Illustration */}
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              {/* Main Building */}
              <div className="w-40 h-32 bg-gradient-to-b from-blue-100 to-blue-200 rounded-lg relative shadow-lg">
                {/* Roof */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-44 h-8 bg-gradient-to-r from-red-400 to-red-500 rounded-t-full shadow-md"></div>
                </div>

                {/* Windows */}
                <div className="absolute top-4 left-4 w-6 h-8 bg-yellow-300 rounded shadow-sm animate-pulse"></div>
                <div className="absolute top-4 right-4 w-6 h-8 bg-yellow-300 rounded shadow-sm animate-pulse"></div>

                {/* Door */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-10 h-16 bg-gradient-to-b from-amber-600 to-amber-800 rounded-t-lg shadow-md">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full absolute top-4 right-1 animate-pulse"></div>
                </div>

                {/* Sign */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded shadow-md flex items-center justify-center animate-bounce">
                  <div className="w-16 h-4 bg-white rounded opacity-90 flex items-center justify-center">
                    <div className="text-xs font-bold text-blue-600">OPEN</div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-8 -left-8 animate-bounce">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                  <div className="text-xl">💼</div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-8 animate-pulse">
                <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center shadow-lg">
                  <div className="text-2xl">🏪</div>
                </div>
              </div>
            </div>
          </div>

          {/* Business Type Cards */}
          <div className="space-y-3">
            <div className="flex gap-2 items-center animate-pulse">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
              <div className="flex-1 h-3 bg-gradient-to-r from-gray-200 to-gray-100 rounded"></div>
            </div>
            <div className="h-2 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-3/4 animate-pulse"></div>
            <div className="h-2 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-full animate-pulse"></div>
            <div className="h-2 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-2/3 animate-pulse"></div>

            {/* Business Categories Visualization */}
            <div className="flex gap-1 mt-4 items-end">
              <div className="w-4 h-8 bg-gradient-to-t from-blue-300 to-blue-400 rounded animate-pulse"></div>
              <div className="w-4 h-6 bg-gradient-to-t from-purple-400 to-purple-500 rounded animate-pulse"></div>
              <div className="w-4 h-10 bg-gradient-to-t from-pink-500 to-pink-600 rounded animate-pulse"></div>
              <div className="w-4 h-7 bg-gradient-to-t from-indigo-200 to-indigo-300 rounded animate-pulse"></div>
              <div className="w-4 h-9 bg-gradient-to-t from-green-600 to-green-700 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="text-center mt-6">
          <h3 className="text-xl font-semibold text-white mb-2">Choose Your Business Type</h3>
          <p className="text-purple-100">
            Select the category that best matches your business to get personalized features.
          </p>
        </div>
      </div>

      {/* Background Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-white bg-opacity-20 rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-white bg-opacity-30 rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-white bg-opacity-25 rounded-full animate-pulse"></div>
      <div className="absolute top-1/2 left-1/6 w-3 h-3 bg-white bg-opacity-15 rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/3 w-5 h-5 bg-white bg-opacity-20 rounded-full animate-pulse"></div>

      {/* Large Background Gradients */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-400 to-transparent rounded-full opacity-20 -translate-y-32 translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-indigo-500 to-transparent rounded-full opacity-20 translate-y-24 -translate-x-24"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Column - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <LogoComponent />

          {/* Question */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-2xl font-semibold text-gray-900 mb-2">
              What type of business?
            </h2>
            <p className="text-gray-600 mb-8">Select the category that best matches your business</p>
            <div className="flex flex-wrap gap-3">
              {businesses.map((biz) => (
                <button
                  key={biz}
                  onClick={() => setSelectedBusiness(biz)}
                  className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all duration-200 hover:shadow-md ${
                    selectedBusiness === biz
                      ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-lg ring-2 ring-blue-200'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 shadow-sm'
                  }`}
                >
                  {biz}
                </button>
              ))}
            </div>
          </div>

          {/* Continue Button */}
          <div className="flex justify-end">
            <button
              onClick={handleContinue}
              disabled={!selectedBusiness}
              className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                selectedBusiness
                  ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg shadow-md'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Continue
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Right Column - Enhanced Animated Illustration */}
      <BusinessIllustration />
    </div>
  );
};

export default SetupStep2;