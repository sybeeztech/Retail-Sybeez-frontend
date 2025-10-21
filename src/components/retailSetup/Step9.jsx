import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetupStore } from '../../store/setupStore';
import {
  CheckCircle,
  Sparkles,
  ArrowRight,
  Store,
  Users,
  DollarSign,
  Package,
  TrendingUp,
  Shield,
  Zap,
} from 'lucide-react';

const Step9Demo = () => {
  const [isCompleting, setIsCompleting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();
  const { completeSetup, setupData } = useSetupStore();
  
  // Get business name from setup data
  const businessName = setupData?.step3?.businessName || 'Sybeez';
  const userName = 'Admin';

  const features = useMemo(() => [
    {
      icon: Store,
      title: "Retail Management",
      description: "Complete inventory and sales management",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Users,
      title: "Customer Relationship",
      description: "Advanced CRM with customer insights",
      color: "from-green-500 to-green-600",
    },
    {
      icon: DollarSign,
      title: "Financial Control",
      description: "GST compliant accounting system",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Package,
      title: "Supply Chain",
      description: "End-to-end supply chain management",
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: TrendingUp,
      title: "Business Analytics",
      description: "AI-powered insights and reporting",
      color: "from-pink-500 to-pink-600",
    },
    {
      icon: Shield,
      title: "Data Security",
      description: "Enterprise-grade security protocols",
      color: "from-indigo-500 to-indigo-600",
    },
  ], []);

  const benefits = useMemo(() => [
    { text: 'Real-time inventory tracking', color: 'blue' },
    { text: 'Automated GST compliance', color: 'green' },
    { text: 'AI-powered analytics', color: 'purple' },
    { text: 'Multi-channel sales management', color: 'orange' },
    { text: 'Customer relationship insights', color: 'pink' },
    { text: 'Cloud-based accessibility', color: 'indigo' },
  ], []);

  const handleCompleteSetup = async () => {
    setIsCompleting(true);
    setShowConfetti(true);

    // Simulated setup process
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Complete setup and navigate to dashboard
    completeSetup();
    navigate('/retail-erp/dashboard');
  };

  const handleResetSetup = () => {
    if (confirm('Are you sure you want to restart the setup?')) {
      alert('Setup reset. Starting over...');
    }
  };

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"></div>
      </div>

      {/* Confetti */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => (
            <span
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative w-full max-w-3xl">
        {/* Header */}
        <header className="text-center mb-6">
          <div className="relative inline-flex items-center justify-center w-12 h-12 bg-white/40 backdrop-blur-xl rounded-xl border border-white/20 shadow-lg mb-3">
            <Sparkles className="w-6 h-6 text-blue-600" />
            {showConfetti && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
              </div>
            )}
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            🎉 Setup Complete!
          </h1>
          <p className="text-gray-600 text-sm">
            Welcome to your {businessName} Retail Management Platform
          </p>
          <p className="text-gray-500 text-xs">
            Hello {userName}, your system is ready to transform your business.
          </p>
        </header>

        {/* Main card */}
        <main className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6">
          {/* Progress */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-green-500 rounded-full"></div>
              ))}
            </div>
            <span className="ml-3 text-xs text-gray-500">Step 4 of 4 - Complete!</span>
          </div>

          {/* Success Message */}
          <section className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-400 to-green-500 rounded-xl mb-3 shadow-lg">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-base font-bold text-gray-900 mb-2">Your Retail Empire Awaits</h2>
            <p className="text-gray-600 text-sm">
              You've successfully configured your retail management system, optimized for efficiency and growth.
            </p>
          </section>

          {/* Features */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
            {features.map(({ icon: Icon, title, description, color }, idx) => (
              <div
                key={idx}
                className="bg-white/50 backdrop-blur-sm rounded-xl p-3 border border-white/20 hover:shadow-lg hover:scale-[1.02] transition-all group"
              >
                <div className={`inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r ${color} rounded-lg mb-2 shadow-md group-hover:scale-110 transition-transform`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">{title}</h3>
                <p className="text-gray-600 text-xs">{description}</p>
              </div>
            ))}
          </section>

          {/* Benefits */}
          <section className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 backdrop-blur-sm rounded-xl p-4 border border-white/20 mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center">
              <Zap className="w-4 h-4 text-blue-600 mr-2" />
              What You Get
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
              {benefits.map(({ text, color }, i) => (
                <li key={i} className="flex items-center space-x-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    color === 'blue' ? 'bg-blue-500' :
                    color === 'green' ? 'bg-green-500' :
                    color === 'purple' ? 'bg-purple-500' :
                    color === 'orange' ? 'bg-orange-500' :
                    color === 'pink' ? 'bg-pink-500' :
                    'bg-indigo-500'
                  }`}></span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleCompleteSetup}
              disabled={isCompleting}
              className="flex items-center justify-center space-x-2 px-6 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCompleting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Launching Dashboard...</span>
                </>
              ) : (
                <>
                  <span>Enter Your Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <button
              onClick={handleResetSetup}
              className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white/50 border border-gray-200/50 rounded-xl hover:bg-white/70 transition-all shadow-md"
            >
              Restart Setup
            </button>
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center mt-4">
          <p className="text-gray-500 text-xs">
            Need help? Our support team is available 24/7 to assist you.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Step9Demo;