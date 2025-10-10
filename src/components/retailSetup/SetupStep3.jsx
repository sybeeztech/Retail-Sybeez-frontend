import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import sybeezLogo from '../../assets/sybeez.png';
import { useNavigate } from "react-router-dom";
import { useSetupStore } from '../../store/setupStore'; // Zustand store

const SetupStep3 = () => {
  const { setStepData } = useSetupStore();
  const navigate = useNavigate();

  const [selectedTeamSize, setSelectedTeamSize] = useState('');
  const [selectedCompanySize, setSelectedCompanySize] = useState('');
  const [animationStep, setAnimationStep] = useState(0);

  const teamSizes = [
    'Only me', '2-5', '6-10', '11-15', '16-25',
    '26-50', '51-100', '101-500'
  ];

  const companySizes = [
    '1-19', '20-49', '50-99', '100-250',
    '251-500', '501-1500', '1500+'
  ];

  // Animation sequence
  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationStep(1), 300);
    const timer2 = setTimeout(() => setAnimationStep(2), 800);
    const timer3 = setTimeout(() => setAnimationStep(3), 1300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleContinue = () => {
    setStepData({
      teamSize: selectedTeamSize,
      companySize: selectedCompanySize
    });
    console.log('Proceeding to next step with data:', {
      teamSize: selectedTeamSize,
      companySize: selectedCompanySize
    });
    // Navigate to next step (implement)
    navigate("/retail/step4");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      {/* Left Column */}
      <div className="w-full md:w-3/5 lg:w-3/5 p-6 md:p-8 lg:p-12 flex flex-col items-center">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8 md:mb-12">
            <div className="flex items-center">
              <img src={sybeezLogo} alt="Sybeez Logo" className="h-8 w-8 bg-white" />
              <span className="ml-2 text-xl font-bold text-gray-900">Sybeez</span>
            </div>
          </div>

          {/* Question 1 */}
          <div className="mb-12">
            <h2 className="text-lg md:text-lg font-semibold text-gray-900 mb-6">
              How many people on your team?
            </h2>
            <div className="flex flex-wrap gap-3">
              {teamSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedTeamSize(size)}
                  className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all duration-200 hover:shadow-md ${selectedTeamSize === size
                      ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-lg ring-2 ring-blue-200'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 shadow-sm'
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Question 2 */}
          <div className="mb-12">
            <h2 className="text-lg md:text-lg font-semibold text-gray-900 mb-6">
              How many people work at your company?
            </h2>
            <div className="flex flex-wrap gap-3">
              {companySizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedCompanySize(size)}
                  className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all duration-200 hover:shadow-md ${selectedCompanySize === size
                      ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-lg ring-2 ring-blue-200'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 shadow-sm'
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Continue Button */}
          <div className="flex justify-end">
            <button
              onClick={handleContinue}
              disabled={!selectedTeamSize || !selectedCompanySize}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${selectedTeamSize && selectedCompanySize
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Right Column with Professional Animation */}
      <div className="w-full md:w-2/5 lg:w-2/5 bg-gradient-to-br from-green-500 via-green-600 to-teal-700 flex items-center justify-center p-8 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-2 h-2 bg-white bg-opacity-20 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-16 w-1 h-1 bg-white bg-opacity-30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-40 left-12 w-1 h-1 bg-white bg-opacity-25 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-60 right-20 w-2 h-2 bg-white bg-opacity-20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>

        <div className="text-center max-w-xs relative z-10">
          <div className="mb-6 relative">
            {/* Professional Team Illustration with Animation */}
            <div className="w-48 h-48 mx-auto relative">
              <svg
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 200 200"
                fill="none"
              >
                {/* Office Building Background */}
                <rect
                  x="50"
                  y="80"
                  width="100"
                  height="80"
                  fill="rgba(255,255,255,0.1)"
                  rx="8"
                  className="transition-all duration-1000"
                  style={{
                    transform: animationStep >= 1 ? 'scale(1)' : 'scale(0.9)',
                    opacity: animationStep >= 1 ? 1 : 0.6
                  }}
                />

                {/* Office Windows */}
                {[...Array(6)].map((_, i) => (
                  <rect
                    key={i}
                    x={60 + (i % 3) * 25}
                    y={100 + Math.floor(i / 3) * 20}
                    width="12"
                    height="12"
                    fill="rgba(255,255,255,0.3)"
                    rx="2"
                    className="transition-all duration-500"
                    style={{
                      animationDelay: `${i * 200}ms`,
                      opacity: animationStep >= 2 ? 1 : 0.3
                    }}
                  />
                ))}

                {/* Team Members - Animated Circles */}
                <g className="team-members">
                  {/* Person 1 */}
                  <circle
                    cx="80"
                    cy="50"
                    r="12"
                    fill="white"
                    className="transition-all duration-700 drop-shadow-lg"
                    style={{
                      transform: animationStep >= 2 ? 'translateY(0)' : 'translateY(10px)',
                      opacity: animationStep >= 2 ? 1 : 0.7
                    }}
                  />
                  <circle cx="80" cy="50" r="8" fill="rgba(16, 185, 129, 0.9)" />

                  {/* Person 2 */}
                  <circle
                    cx="120"
                    cy="50"
                    r="12"
                    fill="white"
                    className="transition-all duration-700 drop-shadow-lg"
                    style={{
                      transform: animationStep >= 3 ? 'translateY(0)' : 'translateY(10px)',
                      opacity: animationStep >= 3 ? 1 : 0.7,
                      animationDelay: '300ms'
                    }}
                  />
                  <circle cx="120" cy="50" r="8" fill="rgba(34, 197, 94, 0.9)" />

                  {/* Person 3 */}
                  <circle
                    cx="100"
                    cy="30"
                    r="12"
                    fill="white"
                    className="transition-all duration-700 drop-shadow-lg"
                    style={{
                      transform: animationStep >= 1 ? 'translateY(0)' : 'translateY(10px)',
                      opacity: animationStep >= 1 ? 1 : 0.7,
                      animationDelay: '600ms'
                    }}
                  />
                  <circle cx="100" cy="30" r="8" fill="rgba(5, 150, 105, 0.9)" />
                </g>

                {/* Connection Lines - Animated */}
                <g className="connections" stroke="rgba(255,255,255,0.4)" strokeWidth="2">
                  <line
                    x1="80"
                    y1="50"
                    x2="100"
                    y2="30"
                    className="transition-all duration-500"
                    style={{
                      strokeDasharray: '20',
                      strokeDashoffset: animationStep >= 2 ? '0' : '20',
                      opacity: animationStep >= 2 ? 0.6 : 0
                    }}
                  />
                  <line
                    x1="120"
                    y1="50"
                    x2="100"
                    y2="30"
                    className="transition-all duration-500"
                    style={{
                      strokeDasharray: '20',
                      strokeDashoffset: animationStep >= 3 ? '0' : '20',
                      opacity: animationStep >= 3 ? 0.6 : 0,
                      animationDelay: '200ms'
                    }}
                  />
                </g>

                {/* Floating Elements */}
                <g className="floating-elements">
                  <circle
                    cx="40"
                    cy="60"
                    r="3"
                    fill="rgba(255,255,255,0.4)"
                    className="animate-pulse"
                  />
                  <circle
                    cx="160"
                    cy="40"
                    r="2"
                    fill="rgba(255,255,255,0.3)"
                    className="animate-pulse"
                    style={{ animationDelay: '1s' }}
                  />
                </g>
              </svg>
            </div>
          </div>

          <div className="space-y-4 transform transition-all duration-700" style={{
            transform: 'translateY(0)',
            opacity: 1
          }}>
            <h3 className="text-2xl font-bold text-white mb-4">
              Build Your Team
            </h3>
            <p className="text-green-100 text-lg leading-relaxed">
              Help us understand your team structure to create the perfect workspace for collaboration and growth.
            </p>

            {/* Progress Indicator */}
            <div className="flex justify-center mt-6">
              <div className="flex space-x-2">
                {[0, 1, 2].map((step) => (
                  <div
                    key={step}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${step <= 2 ? 'bg-white' : 'bg-white bg-opacity-30'
                      }`}
                    style={{
                      animationDelay: `${step * 100}ms`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupStep3;