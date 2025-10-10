import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import sybeezLogo from '../../assets/sybeez.png';
import { useNavigate } from "react-router-dom";
import { useSetupStore } from '../../store/setupStore'; // Zustand store

const SetupStep6 = () => {
  const { setStepData } = useSetupStore();
  const navigate = useNavigate();

  const [selectedSource, setSelectedSource] = useState('');
  const [animationStep, setAnimationStep] = useState(0);

  const referralSources = [
    'AI Chatbots (e.g, ChatGPT, Claude, etc.)', 
    'Friend', 
    'Linkedin', 
    'TV/Streaming', 
    'Email', 
    'News publications', 
    'Outdoors ad (billboards/transport/airport)', 
    'Online search engines (e.g, Google, Bing, etc.)', 
    'Audio streaming services', 
    'YouTube', 
    'Podcast', 
    'Facebook / Instagram', 
    'Events/conferences', 
    'Consultant', 
    'Software Review Site', 
    'Other'
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

  const handleSourceSelect = (source) => {
    setSelectedSource(source);
  };

  const handleContinue = () => {
    setStepData({
      referralSource: selectedSource
    });
    console.log('Proceeding to next step with data:', {
      referralSource: selectedSource
    });
    // Navigate to next step (likely completion/dashboard)
    navigate("/retail/step7");  
  };

  const handleBack = () => {
    navigate("/retail/step5");
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
              One last question, how did you hear about us?
            </h2>
            <div className="flex flex-wrap gap-3">
              {referralSources.map((source) => (
                <button
                  key={source}
                  onClick={() => handleSourceSelect(source)}
                  className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all duration-200 hover:shadow-md ${
                    selectedSource === source
                      ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-lg ring-2 ring-blue-200'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 shadow-sm'
                  }`}
                >
                  {source}
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
              disabled={!selectedSource}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                selectedSource
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
      <div className="w-full md:w-2/5 lg:w-2/5 bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 flex items-center justify-center p-8 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-2 h-2 bg-white bg-opacity-20 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-16 w-1 h-1 bg-white bg-opacity-30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-40 left-12 w-1 h-1 bg-white bg-opacity-25 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-60 right-20 w-2 h-2 bg-white bg-opacity-20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>

        <div className="text-center max-w-xs relative z-10">
          <div className="mb-6 relative">
            {/* Referral Illustration with Animation */}
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
                  r="25" 
                  fill="rgba(255,255,255,0.9)" 
                  className="transition-all duration-1000 drop-shadow-lg"
                  style={{
                    transform: animationStep >= 1 ? 'scale(1)' : 'scale(0.9)',
                    opacity: animationStep >= 1 ? 1 : 0.6
                  }}
                />
                
                {/* Connection Arrows */}
                <g stroke="rgba(255,255,255,0.6)" strokeWidth="2" fill="none">
                  {[...Array(8)].map((_, i) => {
                    const angle = (i * 45) * (Math.PI / 180);
                    const x1 = 100 + 25 * Math.cos(angle);
                    const y1 = 100 + 25 * Math.sin(angle);
                    const x2 = 100 + 55 * Math.cos(angle);
                    const y2 = 100 + 55 * Math.sin(angle);
                    
                    return (
                      <line
                        key={i}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        className="transition-all duration-500"
                        style={{
                          strokeDasharray: '30',
                          strokeDashoffset: animationStep >= 2 ? '0' : '30',
                          opacity: animationStep >= 2 ? 0.8 : 0,
                          animationDelay: `${i * 100}ms`
                        }}
                      />
                    );
                  })}
                </g>

                {/* Arrowheads */}
                <g fill="rgba(255,255,255,0.8)">
                  {[...Array(8)].map((_, i) => {
                    const angle = (i * 45) * (Math.PI / 180);
                    const cx = 100 + 60 * Math.cos(angle);
                    const cy = 100 + 60 * Math.sin(angle);
                    
                    return (
                      <polygon
                        key={i}
                        points={`${cx},${cy} ${cx-5},${cy-3} ${cx-5},${cy+3}`}
                        className="transition-all duration-700"
                        style={{
                          transform: animationStep >= 2 ? 'scale(1)' : 'scale(0)',
                          opacity: animationStep >= 2 ? 1 : 0,
                          animationDelay: `${i * 100 + 200}ms`
                        }}
                      />
                    );
                  })}
                </g>

                {/* Referral Source Icons */}
                <g className="source-icons" fill="rgba(37, 99, 235, 0.9)">
                  {/* Social Media Icon */}
                  <circle
                    cx="60"
                    cy="60"
                    r="12"
                    fill="white"
                    className="transition-all duration-700 drop-shadow-lg"
                    style={{
                      transform: animationStep >= 3 ? 'scale(1)' : 'scale(0)',
                      opacity: animationStep >= 3 ? 1 : 0,
                      animationDelay: '300ms'
                    }}
                  />
                  <path
                    d="M55 60a2 2 0 1 0 4 0 2 2 0 0 0-4 0zM61 60a2 2 0 1 0 4 0 2 2 0 0 0-4 0z"
                    className="transition-all duration-700"
                    style={{
                      opacity: animationStep >= 3 ? 1 : 0,
                      animationDelay: '400ms'
                    }}
                  />
                  <path
                    d="M58 63c1.5 0 2.5-1 2.5-2.5 0-1.5-1-2-2.5-2s-2.5.5-2.5 2 1 2.5 2.5 2.5z"
                    className="transition-all duration-700"
                    style={{
                      opacity: animationStep >= 3 ? 1 : 0,
                      animationDelay: '500ms'
                    }}
                  />
                  
                  {/* Search Icon */}
                  <circle
                    cx="140"
                    cy="60"
                    r="12"
                    fill="white"
                    className="transition-all duration-700 drop-shadow-lg"
                    style={{
                      transform: animationStep >= 3 ? 'scale(1)' : 'scale(0)',
                      opacity: animationStep >= 3 ? 1 : 0,
                      animationDelay: '600ms'
                    }}
                  />
                  <circle
                    cx="138"
                    cy="58"
                    r="3"
                    stroke="rgba(37, 99, 235, 0.9)"
                    strokeWidth="2"
                    fill="none"
                    className="transition-all duration-700"
                    style={{
                      opacity: animationStep >= 3 ? 1 : 0,
                      animationDelay: '700ms'
                    }}
                  />
                  <line
                    x1="142"
                    y1="62"
                    x2="145"
                    y2="65"
                    stroke="rgba(37, 99, 235, 0.9)"
                    strokeWidth="2"
                    className="transition-all duration-700"
                    style={{
                      opacity: animationStep >= 3 ? 1 : 0,
                      animationDelay: '800ms'
                    }}
                  />
                  
                  {/* Friend/Person Icon */}
                  <circle
                    cx="60"
                    cy="140"
                    r="12"
                    fill="white"
                    className="transition-all duration-700 drop-shadow-lg"
                    style={{
                      transform: animationStep >= 3 ? 'scale(1)' : 'scale(0)',
                      opacity: animationStep >= 3 ? 1 : 0,
                      animationDelay: '900ms'
                    }}
                  />
                  <circle
                    cx="60"
                    cy="136"
                    r="3"
                    className="transition-all duration-700"
                    style={{
                      opacity: animationStep >= 3 ? 1 : 0,
                      animationDelay: '1000ms'
                    }}
                  />
                  <path
                    d="M57 142c0-1.5 1.5-2 3-2s3 .5 3 2"
                    stroke="rgba(37, 99, 235, 0.9)"
                    strokeWidth="2"
                    fill="none"
                    className="transition-all duration-700"
                    style={{
                      opacity: animationStep >= 3 ? 1 : 0,
                      animationDelay: '1100ms'
                    }}
                  />
                  
                  {/* Media/Video Icon */}
                  <circle
                    cx="140"
                    cy="140"
                    r="12"
                    fill="white"
                    className="transition-all duration-700 drop-shadow-lg"
                    style={{
                      transform: animationStep >= 3 ? 'scale(1)' : 'scale(0)',
                      opacity: animationStep >= 3 ? 1 : 0,
                      animationDelay: '1200ms'
                    }}
                  />
                  <path
                    d="M135 136v8l6-4-6-4z"
                    className="transition-all duration-700"
                    style={{
                      opacity: animationStep >= 3 ? 1 : 0,
                      animationDelay: '1300ms'
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
              Almost There!
            </h3>
            <p className="text-blue-100 text-lg leading-relaxed">
              Knowing how you found us helps us improve and connect with more teams like yours.
            </p>
            
            {/* Progress Indicator */}
            <div className="flex justify-center mt-6">
              <div className="flex space-x-2">
                {[0, 1, 2, 3, 4, 5].map((step) => (
                  <div
                    key={step}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      step <= 5 ? 'bg-white' : 'bg-white bg-opacity-30'
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

export default SetupStep6;