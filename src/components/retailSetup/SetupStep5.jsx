import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import sybeezLogo from '../../assets/sybeez.png';
import { useNavigate } from "react-router-dom";
import { useSetupStore } from '../../store/setupStore'; // Zustand store

const SetupStep5 = () => {
  const { setStepData } = useSetupStore();
  const navigate = useNavigate();

  const [selectedFocusAreas, setSelectedFocusAreas] = useState([]);
  const [animationStep, setAnimationStep] = useState(0);

  const focusOptions = [
    'Business operations', 'Onboarding and Offboarding', 'Recruiting and talent acquisition', 
    'Task management', 'CRM', 'Project management', 'Goals and strategy', 'Resource management', 
    'Company events', 'Employee experience', 'Employee directory', 'HR services', 
    'Requests and approvals', 'HR requests', 'Portfolio management', 'Recruitment pipeline', 
    'Employee onboarding', 'Other'
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

  const handleFocusToggle = (focusArea) => {
    if (selectedFocusAreas.includes(focusArea)) {
      setSelectedFocusAreas(selectedFocusAreas.filter(f => f !== focusArea));
    } else {
      setSelectedFocusAreas([...selectedFocusAreas, focusArea]);
    }
  };

  const handleContinue = () => {
    setStepData({
      focusAreas: selectedFocusAreas
    });
    console.log('Proceeding to next step with data:', {
      focusAreas: selectedFocusAreas
    });
    // Navigate to next step
    navigate("/retail/step6");  
  };

  const handleBack = () => {
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

          {/* Question */}
          <div className="mb-8">
            <h2 className="text-lg md:text-lg font-semibold text-gray-900 mb-2">
              Select what you'd like to focus on first
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Help us tailor the best experience for you
            </p>
            <div className="flex flex-wrap gap-3">
              {focusOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleFocusToggle(option)}
                  className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all duration-200 hover:shadow-md ${
                    selectedFocusAreas.includes(option)
                      ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-lg ring-2 ring-blue-200'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 shadow-sm'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              className="px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <button
              onClick={handleContinue}
              disabled={selectedFocusAreas.length === 0}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                selectedFocusAreas.length > 0
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
      <div className="w-full md:w-2/5 lg:w-2/5 bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 flex items-center justify-center p-8 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-2 h-2 bg-white bg-opacity-20 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-16 w-1 h-1 bg-white bg-opacity-30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-40 left-12 w-1 h-1 bg-white bg-opacity-25 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-60 right-20 w-2 h-2 bg-white bg-opacity-20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>

        <div className="text-center max-w-xs relative z-10">
          <div className="mb-6 relative">
            {/* Focus Area Illustration with Animation */}
            <div className="w-48 h-48 mx-auto relative">
              <svg
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 200 200"
                fill="none"
              >
                {/* Target Base */}
                <circle 
                  cx="100" 
                  cy="100" 
                  r="40" 
                  fill="rgba(255,255,255,0.1)" 
                  stroke="rgba(255,255,255,0.3)"
                  className="transition-all duration-1000"
                  style={{
                    transform: animationStep >= 1 ? 'scale(1)' : 'scale(0.9)',
                    opacity: animationStep >= 1 ? 1 : 0.6
                  }}
                />
                
                {/* Middle Ring */}
                <circle 
                  cx="100" 
                  cy="100" 
                  r="28" 
                  fill="rgba(255,255,255,0.2)" 
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="2"
                  className="transition-all duration-800"
                  style={{
                    transform: animationStep >= 2 ? 'scale(1)' : 'scale(0)',
                    opacity: animationStep >= 2 ? 1 : 0,
                    animationDelay: '200ms'
                  }}
                />
                
                {/* Bullseye */}
                <circle 
                  cx="100" 
                  cy="100" 
                  r="15" 
                  fill="rgba(255,255,255,0.9)" 
                  className="transition-all duration-600 drop-shadow-lg"
                  style={{
                    transform: animationStep >= 3 ? 'scale(1)' : 'scale(0)',
                    opacity: animationStep >= 3 ? 1 : 0,
                    animationDelay: '400ms'
                  }}
                />
                
                {/* Focus Elements - Animated */}
                <g className="focus-elements">
                  {/* Top Element - Strategy */}
                  <path
                    d="M100 55a5 5 0 0 1 5 5v5a5 5 0 0 1-10 0v-5a5 5 0 0 1 5-5z"
                    fill="white"
                    className="transition-all duration-700"
                    style={{
                      transform: animationStep >= 2 ? 'translateY(0)' : 'translateY(10px)',
                      opacity: animationStep >= 2 ? 1 : 0,
                      animationDelay: '300ms'
                    }}
                  />
                  <circle cx="100" cy="50" r="2" fill="rgba(245, 158, 11, 0.9)" />
                  
                  {/* Right Element - Operations */}
                  <path
                    d="M145 100a5 5 0 0 1-5 5h-5a5 5 0 0 1 0-10h5a5 5 0 0 1 5 5z"
                    fill="white"
                    className="transition-all duration-700"
                    style={{
                      transform: animationStep >= 2 ? 'translateX(0)' : 'translateX(10px)',
                      opacity: animationStep >= 2 ? 1 : 0,
                      animationDelay: '500ms'
                    }}
                  />
                  <circle cx="150" cy="100" r="2" fill="rgba(234, 88, 12, 0.9)" />
                  
                  {/* Bottom Element - HR */}
                  <path
                    d="M100 145a5 5 0 0 1-5-5v-5a5 5 0 0 1 10 0v5a5 5 0 0 1-5 5z"
                    fill="white"
                    className="transition-all duration-700"
                    style={{
                      transform: animationStep >= 2 ? 'translateY(0)' : 'translateY(-10px)',
                      opacity: animationStep >= 2 ? 1 : 0,
                      animationDelay: '700ms'
                    }}
                  />
                  <circle cx="100" cy="150" r="2" fill="rgba(239, 68, 68, 0.9)" />
                  
                  {/* Left Element - Projects */}
                  <path
                    d="M55 100a5 5 0 0 1 5-5h5a5 5 0 0 1 0 10h-5a5 5 0 0 1-5-5z"
                    fill="white"
                    className="transition-all duration-700"
                    style={{
                      transform: animationStep >= 2 ? 'translateX(0)' : 'translateX(-10px)',
                      opacity: animationStep >= 2 ? 1 : 0,
                      animationDelay: '900ms'
                    }}
                  />
                  <circle cx="50" cy="100" r="2" fill="rgba(217, 119, 6, 0.9)" />
                </g>

                {/* Connection Lines */}
                <g stroke="rgba(255,255,255,0.4)" strokeWidth="1.5">
                  <line
                    x1="100"
                    y1="65"
                    x2="100"
                    y2="80"
                    className="transition-all duration-500"
                    style={{
                      strokeDasharray: '15',
                      strokeDashoffset: animationStep >= 2 ? '0' : '15',
                      opacity: animationStep >= 2 ? 0.6 : 0,
                      animationDelay: '400ms'
                    }}
                  />
                  <line
                    x1="135"
                    y1="100"
                    x2="120"
                    y2="100"
                    className="transition-all duration-500"
                    style={{
                      strokeDasharray: '15',
                      strokeDashoffset: animationStep >= 2 ? '0' : '15',
                      opacity: animationStep >= 2 ? 0.6 : 0,
                      animationDelay: '600ms'
                    }}
                  />
                  <line
                    x1="100"
                    y1="135"
                    x2="100"
                    y2="120"
                    className="transition-all duration-500"
                    style={{
                      strokeDasharray: '15',
                      strokeDashoffset: animationStep >= 2 ? '0' : '15',
                      opacity: animationStep >= 2 ? 0.6 : 0,
                      animationDelay: '800ms'
                    }}
                  />
                  <line
                    x1="65"
                    y1="100"
                    x2="80"
                    y2="100"
                    className="transition-all duration-500"
                    style={{
                      strokeDasharray: '15',
                      strokeDashoffset: animationStep >= 2 ? '0' : '15',
                      opacity: animationStep >= 2 ? 0.6 : 0,
                      animationDelay: '1000ms'
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
              Focus Your Priorities
            </h3>
            <p className="text-amber-100 text-lg leading-relaxed">
              Select your focus areas to help us customize tools and features that will drive your success.
            </p>
            
            {/* Progress Indicator */}
            <div className="flex justify-center mt-6">
              <div className="flex space-x-2">
                {[0, 1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      step <= 4 ? 'bg-white' : 'bg-white bg-opacity-30'
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

export default SetupStep5;