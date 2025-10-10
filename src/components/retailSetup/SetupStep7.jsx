import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Plus, Mail } from 'lucide-react';
import sybeezLogo from '../../assets/sybeez.png';
import { useNavigate } from "react-router-dom";
import { useSetupStore } from '../../store/setupStore'; // Zustand store

const SetupStep7 = () => {
  const { setStepData } = useSetupStore();
  const navigate = useNavigate();

  const [teamMembers, setTeamMembers] = useState([
    { email: '', role: 'Admin' }
  ]);
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

  const handleEmailChange = (index, email) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index].email = email;
    setTeamMembers(updatedMembers);
  };

  const handleRoleChange = (index, role) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index].role = role;
    setTeamMembers(updatedMembers);
  };

  const addTeamMember = () => {
    setTeamMembers([...teamMembers, { email: '', role: 'Admin' }]);
  };

  const removeTeamMember = (index) => {
    if (teamMembers.length <= 1) return;
    const updatedMembers = [...teamMembers];
    updatedMembers.splice(index, 1);
    setTeamMembers(updatedMembers);
  };

  const handleInviteTeam = () => {
    setStepData({
      teamMembers: teamMembers
    });
    console.log('Proceeding with team invitation:', {
      teamMembers: teamMembers
    });
    // Navigate to next step (likely dashboard)
    // navigate("/retail/step8");  
    navigate("/")
  };

  const handleRemindLater = () => {
    setStepData({
      teamMembers: []
    });
    console.log('Skipping team invitation for now');
    // navigate("/retail/step8");
    navigate("/")
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const allEmailsValid = teamMembers.every(member => 
    member.email && isValidEmail(member.email)
  );

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
          <div className="mb-6">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
              Who else is on your team?
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Invite your team members to collaborate. You can always add more later.
            </p>
            
            {/* Team member inputs */}
            <div className="space-y-4">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="flex-1">
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="Enter email address"
                        value={member.email}
                        onChange={(e) => handleEmailChange(index, e.target.value)}
                        className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      />
                      <Mail className="absolute right-3 top-3.5 h-4 w-4 text-gray-400" />
                    </div>
                    {member.email && !isValidEmail(member.email) && (
                      <p className="text-red-500 text-xs mt-1 ml-1">Please enter a valid email</p>
                    )}
                  </div>
                  <select
                    value={member.role}
                    onChange={(e) => handleRoleChange(index, e.target.value)}
                    className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Employee">Employee</option>
                  </select>
                  {teamMembers.length > 1 && (
                    <button
                      onClick={() => removeTeamMember(index)}
                      className="p-3 text-gray-500 hover:text-red-500 transition-colors duration-200"
                    >
                      &times;
                    </button>
                  )}
                </div>
              ))}
              
              <button
                onClick={addTeamMember}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-200 py-2"
              >
                <Plus className="w-4 h-4" />
                Add another team member
              </button>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handleRemindLater}
              className="px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100"
            >
              Remind me later
            </button>
            <button
              onClick={handleInviteTeam}
              disabled={!allEmailsValid}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                allEmailsValid
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Invite your team
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Right Column with Professional Animation */}
      <div className="w-full md:w-2/5 lg:w-2/5 bg-gradient-to-br from-lime-500 via-green-600 to-emerald-700 flex items-center justify-center p-8 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-2 h-2 bg-white bg-opacity-20 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-16 w-1 h-1 bg-white bg-opacity-30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-40 left-12 w-1 h-1 bg-white bg-opacity-25 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-60 right-20 w-2 h-2 bg-white bg-opacity-20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>

        <div className="text-center max-w-xs relative z-10">
          <div className="mb-6 relative">
            {/* Team Collaboration Illustration with Animation */}
            <div className="w-48 h-48 mx-auto relative">
              <svg
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 200 200"
                fill="none"
              >
                {/* Central Circle */}
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
                <g stroke="rgba(255,255,255,0.6)" strokeWidth="2" fill="none">
                  {[...Array(4)].map((_, i) => {
                    const angle = (i * 90) * (Math.PI / 180);
                    const x1 = 100 + 30 * Math.cos(angle);
                    const y1 = 100 + 30 * Math.sin(angle);
                    const x2 = 100 + 60 * Math.cos(angle);
                    const y2 = 100 + 60 * Math.sin(angle);
                    
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

                {/* Team Member Icons */}
                <g className="team-icons" fill="rgba(37, 99, 235, 0.9)">
                  {/* Top Icon */}
                  <circle
                    cx="100"
                    cy="40"
                    r="15"
                    fill="white"
                    className="transition-all duration-700 drop-shadow-lg"
                    style={{
                      transform: animationStep >= 3 ? 'scale(1)' : 'scale(0)',
                      opacity: animationStep >= 3 ? 1 : 0,
                      animationDelay: '300ms'
                    }}
                  />
                  <circle
                    cx="100"
                    cy="36"
                    r="3"
                    className="transition-all duration-700"
                    style={{
                      opacity: animationStep >= 3 ? 1 : 0,
                      animationDelay: '400ms'
                    }}
                  />
                  <path
                    d="M97 42c0-1.5 1.5-2 3-2s3 .5 3 2"
                    stroke="rgba(37, 99, 235, 0.9)"
                    strokeWidth="2"
                    fill="none"
                    className="transition-all duration-700"
                    style={{
                      opacity: animationStep >= 3 ? 1 : 0,
                      animationDelay: '500ms'
                    }}
                  />
                  
                  {/* Right Icon */}
                  <circle
                    cx="160"
                    cy="100"
                    r="15"
                    fill="white"
                    className="transition-all duration-700 drop-shadow-lg"
                    style={{
                      transform: animationStep >= 3 ? 'scale(1)' : 'scale(0)',
                      opacity: animationStep >= 3 ? 1 : 0,
                      animationDelay: '600ms'
                    }}
                  />
                  <circle
                    cx="156"
                    cy="96"
                    r="3"
                    className="transition-all duration-700"
                    style={{
                      opacity: animationStep >= 3 ? 1 : 0,
                      animationDelay: '700ms'
                    }}
                  />
                  <path
                    d="M153 102c0-1.5 1.5-2 3-2s3 .5 3 2"
                    stroke="rgba(37, 99, 235, 0.9)"
                    strokeWidth="2"
                    fill="none"
                    className="transition-all duration-700"
                    style={{
                      opacity: animationStep >= 3 ? 1 : 0,
                      animationDelay: '800ms'
                    }}
                  />
                  
                  {/* Bottom Icon */}
                  <circle
                    cx="100"
                    cy="160"
                    r="15"
                    fill="white"
                    className="transition-all duration-700 drop-shadow-lg"
                    style={{
                      transform: animationStep >= 3 ? 'scale(1)' : 'scale(0)',
                      opacity: animationStep >= 3 ? 1 : 0,
                      animationDelay: '900ms'
                    }}
                  />
                  <circle
                    cx="100"
                    cy="156"
                    r="3"
                    className="transition-all duration-700"
                    style={{
                      opacity: animationStep >= 3 ? 1 : 0,
                      animationDelay: '1000ms'
                    }}
                  />
                  <path
                    d="M97 162c0-1.5 1.5-2 3-2s3 .5 3 2"
                    stroke="rgba(37, 99, 235, 0.9)"
                    strokeWidth="2"
                    fill="none"
                    className="transition-all duration-700"
                    style={{
                      opacity: animationStep >= 3 ? 1 : 0,
                      animationDelay: '1100ms'
                    }}
                  />
                  
                  {/* Left Icon */}
                  <circle
                    cx="40"
                    cy="100"
                    r="15"
                    fill="white"
                    className="transition-all duration-700 drop-shadow-lg"
                    style={{
                      transform: animationStep >= 3 ? 'scale(1)' : 'scale(0)',
                      opacity: animationStep >= 3 ? 1 : 0,
                      animationDelay: '1200ms'
                    }}
                  />
                  <circle
                    cx="36"
                    cy="96"
                    r="3"
                    className="transition-all duration-700"
                    style={{
                      opacity: animationStep >= 3 ? 1 : 0,
                      animationDelay: '1300ms'
                    }}
                  />
                  <path
                    d="M33 102c0-1.5 1.5-2 3-2s3 .5 3 2"
                    stroke="rgba(37, 99, 235, 0.9)"
                    strokeWidth="2"
                    fill="none"
                    className="transition-all duration-700"
                    style={{
                      opacity: animationStep >= 3 ? 1 : 0,
                      animationDelay: '1400ms'
                    }}
                  />
                </g>

                {/* Floating Elements */}
                <g className="floating-elements">
                  <circle
                    cx="70"
                    cy="70"
                    r="3"
                    fill="rgba(255,255,255,0.4)"
                    className="animate-pulse"
                  />
                  <circle
                    cx="130"
                    cy="130"
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
            <p className="text-blue-100 text-lg leading-relaxed">
              Collaborate with your team to get the most out of Sybeez. 
              Admins have full access while employees have limited permissions.
            </p>
            
            {/* Progress Indicator */}
            <div className="flex justify-center mt-6">
              <div className="flex space-x-2">
                {[0, 1, 2, 3, 4, 5, 6].map((step) => (
                  <div
                    key={step}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      step <= 6 ? 'bg-white' : 'bg-white bg-opacity-30'
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

export default SetupStep7;