import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import sybeezLogo from '../../assets/sybeez.png';
import { useNavigate } from "react-router-dom";
import { useSetupStore } from '../../store/setupStore'; // Zustand store

const SetupStep8 = () => {
  const { setStepData } = useSetupStore();
  const navigate = useNavigate();

  const [boardName, setBoardName] = useState('');
  const [animationStep, setAnimationStep] = useState(0);

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
      boardName: boardName
    });
    console.log('Proceeding with board name:', {
      boardName: boardName
    });
    // Navigate to dashboard or next step
    // navigate("/retail/step9");
    navigate('/');  
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

          {/* Main Content */}
          <div className="mb-8">
            <h1 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
              Let's start working together
            </h1>
            <p className="text-sm text-gray-600 mb-6">
              Give your board a name, e.g. marketing plan, sales pipeline, quarterly roadmap...
            </p>
            
            {/* Board Name Input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="My first project"
                value={boardName}
                onChange={(e) => setBoardName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>
            
            <p className="text-xs text-gray-500">
              In Sybeez, "boards" are the place where all your content lives.
            </p>
          </div>

          {/* Navigation Button */}
          <div className="flex justify-end mt-8">
            <button
              onClick={handleContinue}
              disabled={!boardName.trim()}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                boardName.trim()
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Right Column with Charts/Sheets Illustration */}
      <div className="w-full md:w-2/5 lg:w-2/5 bg-gradient-to-br from-fuchsia-500 via-pink-600 to-rose-700 flex items-center justify-center p-8 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-2 h-2 bg-white bg-opacity-20 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-16 w-1 h-1 bg-white bg-opacity-30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-40 left-12 w-1 h-1 bg-white bg-opacity-25 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-60 right-20 w-2 h-2 bg-white bg-opacity-20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>

        <div className="text-center max-w-xs relative z-10">
          <div className="mb-6 relative">
            {/* Charts and Sheets Illustration with Animation */}
            <div className="w-48 h-48 mx-auto relative">
              <svg
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 200 200"
                fill="none"
              >
                {/* Main Board */}
                <rect 
                  x="40" 
                  y="40" 
                  width="120" 
                  height="120" 
                  rx="8" 
                  fill="rgba(255,255,255,0.9)" 
                  className="transition-all duration-1000 drop-shadow-lg"
                  style={{
                    transform: animationStep >= 1 ? 'scale(1)' : 'scale(0.9)',
                    opacity: animationStep >= 1 ? 1 : 0.6
                  }}
                />
                
                {/* Grid Lines */}
                <g stroke="rgba(37, 99, 235, 0.2)" strokeWidth="1">
                  {/* Horizontal lines */}
                  {[55, 70, 85, 100, 115, 130, 145].map((y, i) => (
                    <line
                      key={`h-${i}`}
                      x1="50"
                      y1={y}
                      x2="150"
                      y2={y}
                      className="transition-all duration-500"
                      style={{
                        opacity: animationStep >= 2 ? 1 : 0,
                        animationDelay: `${i * 50}ms`
                      }}
                    />
                  ))}
                  
                  {/* Vertical lines */}
                  {[65, 85, 105, 125, 145].map((x, i) => (
                    <line
                      key={`v-${i}`}
                      x1={x}
                      y1="50"
                      x2={x}
                      y2="150"
                      className="transition-all duration-500"
                      style={{
                        opacity: animationStep >= 2 ? 1 : 0,
                        animationDelay: `${i * 50 + 200}ms`
                      }}
                    />
                  ))}
                </g>

                {/* Chart Elements */}
                <g className="chart-elements" fill="rgba(37, 99, 235, 0.8)">
                  {/* Bar Chart */}
                  <rect
                    x="70"
                    y="100"
                    width="10"
                    height="40"
                    className="transition-all duration-700"
                    style={{
                      transform: animationStep >= 3 ? 'scaleY(1)' : 'scaleY(0)',
                      transformOrigin: 'bottom',
                      opacity: animationStep >= 3 ? 1 : 0,
                      animationDelay: '300ms'
                    }}
                  />
                  <rect
                    x="90"
                    y="80"
                    width="10"
                    height="60"
                    className="transition-all duration-700"
                    style={{
                      transform: animationStep >= 3 ? 'scaleY(1)' : 'scaleY(0)',
                      transformOrigin: 'bottom',
                      opacity: animationStep >= 3 ? 1 : 0,
                      animationDelay: '400ms'
                    }}
                  />
                  <rect
                    x="110"
                    y="60"
                    width="10"
                    height="80"
                    className="transition-all duration-700"
                    style={{
                      transform: animationStep >= 3 ? 'scaleY(1)' : 'scaleY(0)',
                      transformOrigin: 'bottom',
                      opacity: animationStep >= 3 ? 1 : 0,
                      animationDelay: '500ms'
                    }}
                  />
                  <rect
                    x="130"
                    y="120"
                    width="10"
                    height="20"
                    className="transition-all duration-700"
                    style={{
                      transform: animationStep >= 3 ? 'scaleY(1)' : 'scaleY(0)',
                      transformOrigin: 'bottom',
                      opacity: animationStep >= 3 ? 1 : 0,
                      animationDelay: '600ms'
                    }}
                  />
                  
                  {/* Line Chart Dots */}
                  <circle
                    cx="70"
                    cy="100"
                    r="3"
                    fill="rgba(255,255,255,0.9)"
                    stroke="rgba(37, 99, 235, 1)"
                    strokeWidth="2"
                    className="transition-all duration-700"
                    style={{
                      opacity: animationStep >= 3 ? 1 : 0,
                      animationDelay: '700ms'
                    }}
                  />
                  <circle
                    cx="90"
                    cy="80"
                    r="3"
                    fill="rgba(255,255,255,0.9)"
                    stroke="rgba(37, 99, 235, 1)"
                    strokeWidth="2"
                    className="transition-all duration-700"
                    style={{
                      opacity: animationStep >= 3 ? 1 : 0,
                      animationDelay: '800ms'
                    }}
                  />
                  <circle
                    cx="110"
                    cy="60"
                    r="3"
                    fill="rgba(255,255,255,0.9)"
                    stroke="rgba(37, 99, 235, 1)"
                    strokeWidth="2"
                    className="transition-all duration-700"
                    style={{
                      opacity: animationStep >= 3 ? 1 : 0,
                      animationDelay: '900ms'
                    }}
                  />
                  <circle
                    cx="130"
                    cy="120"
                    r="3"
                    fill="rgba(255,255,255,0.9)"
                    stroke="rgba(37, 99, 235, 1)"
                    strokeWidth="2"
                    className="transition-all duration-700"
                    style={{
                      opacity: animationStep >= 3 ? 1 : 0,
                      animationDelay: '1000ms'
                    }}
                  />
                  
                  {/* Line connecting dots */}
                  <polyline
                    points="70,100 90,80 110,60 130,120"
                    fill="none"
                    stroke="rgba(37, 99, 235, 1)"
                    strokeWidth="2"
                    className="transition-all duration-700"
                    style={{
                      strokeDasharray: '100',
                      strokeDashoffset: animationStep >= 3 ? '0' : '100',
                      opacity: animationStep >= 3 ? 1 : 0,
                      animationDelay: '1100ms'
                    }}
                  />
                </g>

                {/* Sheet Elements */}
                <g className="sheet-elements" fill="rgba(37, 99, 235, 0.9)">
                  {/* Sheet title */}
                  <rect
                    x="50"
                    y="50"
                    width="100"
                    height="5"
                    rx="1"
                    className="transition-all duration-700"
                    style={{
                      opacity: animationStep >= 2 ? 1 : 0,
                      animationDelay: '1200ms'
                    }}
                  />
                  
                  {/* Sheet content lines */}
                  <rect
                    x="50"
                    y="65"
                    width="80"
                    height="2"
                    rx="1"
                    className="transition-all duration-700"
                    style={{
                      opacity: animationStep >= 2 ? 1 : 0,
                      animationDelay: '1300ms'
                    }}
                  />
                  <rect
                    x="50"
                    y="75"
                    width="60"
                    height="2"
                    rx="1"
                    className="transition-all duration-700"
                    style={{
                      opacity: animationStep >= 2 ? 1 : 0,
                      animationDelay: '1400ms'
                    }}
                  />
                  <rect
                    x="50"
                    y="85"
                    width="70"
                    height="2"
                    rx="1"
                    className="transition-all duration-700"
                    style={{
                      opacity: animationStep >= 2 ? 1 : 0,
                      animationDelay: '1500ms'
                    }}
                  />
                </g>

                {/* Floating Elements */}
                <g className="floating-elements">
                  <circle
                    cx="60"
                    cy="170"
                    r="3"
                    fill="rgba(255,255,255,0.4)"
                    className="animate-pulse"
                  />
                  <circle
                    cx="170"
                    cy="60"
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
              Your Workspace Awaits
            </h3>
            <p className="text-blue-100 text-lg leading-relaxed">
              Organize your projects, track progress, and collaborate with your team all in one place.
            </p>
            
            {/* Progress Indicator */}
            <div className="flex justify-center mt-6">
              <div className="flex space-x-2">
                {[0, 1, 2, 3, 4, 5, 6, 7].map((step) => (
                  <div
                    key={step}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      step <= 7 ? 'bg-white' : 'bg-white bg-opacity-30'
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

export default SetupStep8;