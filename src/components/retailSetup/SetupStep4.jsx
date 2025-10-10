import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import sybeezLogo from '../../assets/sybeez.png';
import { useNavigate } from "react-router-dom";
import { useSetupStore } from '../../store/setupStore'; // Zustand store

const SetupStep4 = () => {
  const { setStepData } = useSetupStore();
  const navigate = useNavigate();

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [animationStep, setAnimationStep] = useState(0);

  const managementCategories = [
    'HR and Recruiting', 'PMO', 'Software development', 'Product Management', 
    'Sales and CRM', 'Legal', 'IT', 'Nonprofits', 'Marketing', 'Finance', 
    'Operations', 'Construction', 'Design and Creative', 'Education', 'Others'
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

  const handleCategoryToggle = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleContinue = () => {
    setStepData({
      managementCategories: selectedCategories
    });
    console.log('Proceeding to next step with data:', {
      managementCategories: selectedCategories
    });
    // Navigate to next step
    navigate("/retail/step5");  
  };

  const handleBack = () => {
    navigate("/retail/step3");
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
              Select what you'd like to manage first
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              You can always add more in feature
            </p>
            <div className="flex flex-wrap gap-3">
              {managementCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryToggle(category)}
                  className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all duration-200 hover:shadow-md ${
                    selectedCategories.includes(category)
                      ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-lg ring-2 ring-blue-200'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 shadow-sm'
                  }`}
                >
                  {category}
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
              disabled={selectedCategories.length === 0}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                selectedCategories.length > 0
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
      <div className="w-full md:w-2/5 lg:w-2/5 bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-700 flex items-center justify-center p-8 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-2 h-2 bg-white bg-opacity-20 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-16 w-1 h-1 bg-white bg-opacity-30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-40 left-12 w-1 h-1 bg-white bg-opacity-25 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-60 right-20 w-2 h-2 bg-white bg-opacity-20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>

        <div className="text-center max-w-xs relative z-10">
          <div className="mb-6 relative">
            {/* Management Focus Illustration with Animation */}
            <div className="w-48 h-48 mx-auto relative">
              <svg
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 200 200"
                fill="none"
              >
                {/* Central Hub */}
                <circle 
                  cx="100" 
                  cy="100" 
                  r="30" 
                  fill="rgba(255,255,255,0.9)" 
                  className="transition-all duration-1000 drop-shadow-lg"
                  style={{
                    transform: animationStep >= 1 ? 'scale(1)' : 'scale(0.9)',
                    opacity: animationStep >= 1 ? 1 : 0.6
                  }}
                />
                
                {/* Connection Lines */}
                <g stroke="rgba(255,255,255,0.4)" strokeWidth="2">
                  {[...Array(6)].map((_, i) => {
                    const angle = (i * 60) * (Math.PI / 180);
                    const x1 = 100 + 30 * Math.cos(angle);
                    const y1 = 100 + 30 * Math.sin(angle);
                    const x2 = 100 + 70 * Math.cos(angle);
                    const y2 = 100 + 70 * Math.sin(angle);
                    
                    return (
                      <line
                        key={i}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        className="transition-all duration-500"
                        style={{
                          strokeDasharray: '40',
                          strokeDashoffset: animationStep >= 2 ? '0' : '40',
                          opacity: animationStep >= 2 ? 0.6 : 0,
                          animationDelay: `${i * 100}ms`
                        }}
                      />
                    );
                  })}
                </g>

                {/* Department Nodes */}
                <g className="department-nodes">
                  {[...Array(6)].map((_, i) => {
                    const angle = (i * 60) * (Math.PI / 180);
                    const cx = 100 + 70 * Math.cos(angle);
                    const cy = 100 + 70 * Math.sin(angle);
                    
                    return (
                      <circle
                        key={i}
                        cx={cx}
                        cy={cy}
                        r="12"
                        fill="white"
                        className="transition-all duration-700 drop-shadow-lg"
                        style={{
                          transform: animationStep >= 3 ? 'scale(1)' : 'scale(0)',
                          opacity: animationStep >= 3 ? 1 : 0,
                          animationDelay: `${i * 150}ms`
                        }}
                      />
                    );
                  })}
                </g>

                {/* Icons in Nodes */}
                <g className="department-icons" fill="rgba(139, 92, 246, 0.9)" stroke="none">
                  {/* HR Icon */}
                  <path
                    d="M85 50a5 5 0 0 1 5-5h20a5 5 0 0 1 5 5v5a5 5 0 0 1-5 5H90a5 5 0 0 1-5-5v-5z"
                    className="transition-all duration-700"
                    style={{
                      transform: animationStep >= 3 ? 'scale(1)' : 'scale(0)',
                      opacity: animationStep >= 3 ? 1 : 0,
                      animationDelay: '150ms'
                    }}
                  />
                  <circle
                    cx="100"
                    cy="40"
                    r="3"
                    className="transition-all duration-700"
                    style={{
                      transform: animationStep >= 3 ? 'scale(1)' : 'scale(0)',
                      opacity: animationStep >= 3 ? 1 : 0,
                      animationDelay: '150ms'
                    }}
                  />
                  
                  {/* Finance Icon */}
                  <path
                    d="M150 90a5 5 0 0 1 5-5h5a5 5 0 0 1 5 5v20a5 5 0 0 1-5 5h-5a5 5 0 0 1-5-5V90z"
                    className="transition-all duration-700"
                    style={{
                      transform: animationStep >= 3 ? 'scale(1)' : 'scale(0)',
                      opacity: animationStep >= 3 ? 1 : 0,
                      animationDelay: '300ms'
                    }}
                  />
                  <path
                    d="M155 95h10M155 100h10M155 105h10"
                    stroke="rgba(139, 92, 246, 0.9)"
                    strokeWidth="2"
                    className="transition-all duration-700"
                    style={{
                      transform: animationStep >= 3 ? 'scale(1)' : 'scale(0)',
                      opacity: animationStep >= 3 ? 1 : 0,
                      animationDelay: '300ms'
                    }}
                  />
                  
                  {/* Development Icon */}
                  <path
                    d="M140 140a5 5 0 0 1 0-7l5-5a5 5 0 0 1 7 0l5 5a5 5 0 0 1 0 7l-5 5a5 5 0 0 1-7 0l-5-5z"
                    className="transition-all duration-700"
                    style={{
                      transform: animationStep >= 3 ? 'scale(1)' : 'scale(0)',
                      opacity: animationStep >= 3 ? 1 : 0,
                      animationDelay: '450ms'
                    }}
                  />
                  <path
                    d="M145 135l5 5M150 140l5 5"
                    stroke="white"
                    strokeWidth="2"
                    className="transition-all duration-700"
                    style={{
                      transform: animationStep >= 3 ? 'scale(1)' : 'scale(0)',
                      opacity: animationStep >= 3 ? 1 : 0,
                      animationDelay: '450ms'
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
              Focus Your Management
            </h3>
            <p className="text-purple-100 text-lg leading-relaxed">
              Select the areas you want to prioritize. We'll tailor your experience to focus on what matters most to your team.
            </p>
            
            {/* Progress Indicator */}
            <div className="flex justify-center mt-6">
              <div className="flex space-x-2">
                {[0, 1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      step <= 3 ? 'bg-white' : 'bg-white bg-opacity-30'
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

export default SetupStep4;