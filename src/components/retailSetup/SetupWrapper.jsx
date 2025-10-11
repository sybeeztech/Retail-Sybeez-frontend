import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useSetupStore } from '../../store/setupStore';

// Import all setup steps
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step9 from './Step9';

const SetupWrapper = () => {
  const { isSetupComplete } = useSetupStore();
  const navigate = useNavigate();

  // If setup is complete, redirect to dashboard
  if (isSetupComplete) {
    navigate('/retail-erp/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Main Content */}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Navigate to="/retail/setup/step1" />} />
          <Route path="/step1" element={<Step1 />} />
          <Route path="/step2" element={<Step2 />} />
          <Route path="/step3" element={<Step3 />} />
          <Route path="/step4" element={<Step4 />} />
          <Route path="/step9" element={<Step9 />} />
        </Routes>
      </div>
    </div>
  );
};

export default SetupWrapper;