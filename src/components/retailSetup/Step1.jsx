import React, { useState } from 'react';
import { ArrowRight, Store, Sparkles } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useSetupStore } from '../../store/setupStore';

const Step1 = () => {
  const { setStepData } = useSetupStore();
  const [selectedPurpose, setSelectedPurpose] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const navigate = useNavigate();

  const purposes = [
    { id: 'work', label: 'Work', description: 'Professional business' },
    { id: 'personal', label: 'Personal', description: 'Personal projects' },
    { id: 'school', label: 'School', description: 'Educational use' },
    { id: 'nonprofit', label: 'Non-profits', description: 'Organizations' }
  ];

  const roles = [
    { id: 'owner', label: 'Business Owner', description: 'Own & operate' },
    { id: 'manager', label: 'Manager', description: 'Manage operations' },
    { id: 'employee', label: 'Employee', description: 'Team member' },
    { id: 'freelancer', label: 'Freelancer', description: 'Contractor' },
    { id: 'director', label: 'Director', description: 'Leadership' },
    { id: 'executive', label: 'Executive', description: 'C-level/VP' }
  ];

  const handleContinue = () => {
    if (!selectedPurpose || !selectedRole) return;
    
    setStepData({
      purpose: selectedPurpose,
      role: selectedRole
    });

    console.log('Proceeding to next step with data:', { purpose: selectedPurpose, role: selectedRole });
    navigate("/retail/setup/step2");
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
            <Store className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-1">
            Welcome to Sybeez
          </h1>
          <p className="text-gray-600 text-sm">Let's set up your retail management platform</p>
        </div>

        {/* Main Card */}
        <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              {Array.from({ length: 5 }, (_, i) => (
                <div key={i} className="w-2 h-2 bg-gray-200 rounded-full"></div>
              ))}
            </div>
            <span className="ml-3 text-xs text-gray-500">Step 1 of 4</span>
          </div>

          <div className="max-w-2xl mx-auto">
            {/* Purpose Selection */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Sparkles className="w-4 h-4 text-blue-600 mr-2" />
                What's your primary purpose?
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {purposes.map((purpose) => (
                  <button
                    key={purpose.id}
                    onClick={() => setSelectedPurpose(purpose.id)}
                    className={`p-3 rounded-xl border transition-all duration-200 text-left hover:scale-[1.02] ${
                      selectedPurpose === purpose.id
                        ? 'bg-blue-50/80 backdrop-blur-sm border-blue-300 shadow-md'
                        : 'bg-white/50 backdrop-blur-sm border-gray-200/50 hover:bg-white/70'
                    }`}
                  >
                    <div className="font-medium text-gray-900 text-sm">{purpose.label}</div>
                    <div className="text-xs text-gray-600 mt-0.5">{purpose.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Role Selection */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                What's your role?
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={`p-3 rounded-xl border transition-all duration-200 text-left hover:scale-[1.02] ${
                      selectedRole === role.id
                        ? 'bg-blue-50/80 backdrop-blur-sm border-blue-300 shadow-md'
                        : 'bg-white/50 backdrop-blur-sm border-gray-200/50 hover:bg-white/70'
                    }`}
                  >
                    <div className="font-medium text-gray-900 text-sm">{role.label}</div>
                    <div className="text-xs text-gray-600 mt-0.5">{role.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Continue Button */}
            <div className="flex justify-center">
              <button
                onClick={handleContinue}
                disabled={!selectedPurpose || !selectedRole}
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
            Your information helps us customize your experience
          </p>
        </div>
      </div>
    </div>
  );
};

export default Step1;