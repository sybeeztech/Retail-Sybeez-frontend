import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import sybeezLogo from '../../assets/sybeez.png'
import { useNavigate } from "react-router-dom";
import { useSetupStore } from '../../store/setupStore';

const SetupStep1 = () => {
  const { setStepData } = useSetupStore();
  const [selectedPurpose, setSelectedPurpose] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const navigate = useNavigate();

  const purposes = ['Work', 'Personal', 'School', 'Non-profits'];
  const roles = ['Business owner', 'Team leader', 'Team member', 'Freelancer', 'Director', 'C-level', 'VP'];

  const handleContinue = () => {
    setStepData({
      purpose: selectedPurpose,
      role: selectedRole
    });

    console.log('Proceeding to next step with data:', { purpose: selectedPurpose, role: selectedRole });
    navigate("/retail/step2");
  };

  const LogoComponent = () => (
    <div className="mb-12">
      <div className="flex items-center">
        <img src={sybeezLogo} alt="Sybeez Logo" className="h-8 w-8 bg-white mr-3 rounded-lg" />
        <span className="text-blue-600 text-2xl font-bold">Sybeez</span>
      </div>
    </div>
  );

  const RightSideIllustration = () => (
    <div className="w-full md:w-2/5 lg:w-2/5 bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 flex items-center justify-center p-8 relative overflow-hidden">
      <div className="max-w-lg z-10">
        <div className="bg-white rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-b from-blue-400 to-blue-600 flex items-end justify-center overflow-hidden shadow-lg">
                <div className="w-24 h-24 bg-gradient-to-t from-blue-800 to-blue-600 rounded-t-full"></div>
              </div>
              <div className="absolute -bottom-4 -right-8 animate-bounce">
                <div className="w-20 h-12 bg-gray-700 rounded-lg transform rotate-12 shadow-lg">
                  <div className="w-full h-8 bg-blue-300 rounded-t-lg flex items-center justify-center">
                    <div className="w-12 h-6 bg-white rounded opacity-90 flex items-center justify-center">
                      <div className="w-8 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded text-xs"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex gap-2 items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <div className="flex-1 h-3 bg-gradient-to-r from-gray-200 to-gray-100 rounded"></div>
            </div>
            <div className="h-2 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-3/4 animate-pulse"></div>
            <div className="h-2 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-full animate-pulse"></div>
            <div className="h-2 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-2/3 animate-pulse"></div>
            <div className="flex gap-1 mt-4 items-end">
              <div className="w-4 h-8 bg-gradient-to-t from-blue-300 to-blue-400 rounded animate-pulse"></div>
              <div className="w-4 h-6 bg-gradient-to-t from-blue-400 to-blue-500 rounded animate-pulse"></div>
              <div className="w-4 h-10 bg-gradient-to-t from-blue-500 to-blue-600 rounded animate-pulse"></div>
              <div className="w-4 h-7 bg-gradient-to-t from-blue-200 to-blue-300 rounded animate-pulse"></div>
              <div className="w-4 h-9 bg-gradient-to-t from-blue-600 to-blue-700 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
        <div className="text-center mt-6">
          <h3 className="text-xl font-semibold text-blue-800 mb-2">Let's get you set up</h3>
          <p className="text-blue-600">Answer a few questions to personalize your Sybeez experience</p>
        </div>
      </div>

      {/* Background floating elements */}
      <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-white bg-opacity-20 rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-white bg-opacity-30 rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-white bg-opacity-25 rounded-full animate-pulse"></div>
      <div className="absolute top-1/2 left-1/6 w-3 h-3 bg-white bg-opacity-15 rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/3 w-5 h-5 bg-white bg-opacity-20 rounded-full animate-pulse"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400 to-transparent rounded-full opacity-20 -translate-y-32 translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-500 to-transparent rounded-full opacity-20 translate-y-24 -translate-x-24"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Column - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <LogoComponent />

          {/* Questions */}
          <div className="space-y-8">
            {/* Question 1 - Purpose */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Hey there, what brings you here today?
              </h3>
              <p className="text-gray-600 mb-6">Select your primary purpose</p>
              <div className="grid grid-cols-2 gap-3">
                {purposes.map((purpose) => (
                  <button
                    key={purpose}
                    onClick={() => setSelectedPurpose(purpose)}
                    className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all duration-200 hover:shadow-md ${selectedPurpose === purpose
                      ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-lg ring-2 ring-blue-200'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 shadow-sm'
                      }`}
                  >
                    {purpose}
                  </button>
                ))}
              </div>
            </div>
            <br></br>

            {/* Question 2 - Role */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                What describes your current role?
              </h3>
              <p className="text-gray-600 mb-6">This helps us personalize your experience</p>
              <div className="grid grid-cols-2 gap-3">
                {roles.map((role) => (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all duration-200 hover:shadow-md ${selectedRole === role
                      ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-lg ring-2 ring-blue-200'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 shadow-sm'
                      }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            {/* Continue Button */}
            <button
              onClick={handleContinue}
              disabled={!selectedPurpose || !selectedRole}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center ${selectedPurpose && selectedRole
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

      {/* Right Column - Illustration */}
      <RightSideIllustration />
    </div>
  );
};

export default SetupStep1;