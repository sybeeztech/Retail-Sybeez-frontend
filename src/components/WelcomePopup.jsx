import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Sparkles, Star, ArrowRight, Package, Users, BarChart3, DollarSign, Zap, TrendingUp } from 'lucide-react';

const animations = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes slideUpStagger {
    from { opacity: 0; transform: translateY(20px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }
  
  @keyframes floatSlow {
    0%, 100% { transform: translate(0, 0); }
    33% { transform: translate(-10px, -10px); }
    66% { transform: translate(10px, 5px); }
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.05); opacity: 0.8; }
  }
  
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  
  @keyframes twinkle {
    0%, 100% { opacity: 0.2; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.3); }
  }
  
  .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
  .animate-slideUp { animation: slideUp 0.7s ease-out; }
  .animate-slideUpStagger { animation: slideUpStagger 0.6s ease-out both; }
  .animate-float { animation: float 3s ease-in-out infinite; }
  .animate-floatSlow { animation: floatSlow 8s ease-in-out infinite; }
  .animate-pulse { animation: pulse 2s ease-in-out infinite; }
  .animate-shimmer { 
    background-size: 200% auto;
    animation: shimmer 3s linear infinite;
  }
  .animate-twinkle { animation: twinkle 2s ease-in-out infinite; }
`;

if (typeof document !== 'undefined') {
  const style = document.querySelector('#sybeez-animations');
  if (!style) {
    const sheet = document.createElement('style');
    sheet.id = 'sybeez-animations';
    sheet.textContent = animations;
    document.head.appendChild(sheet);
  }
}

const WelcomePopup = ({ isOpen = true, onClose = () => {} }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    if (isOpen && showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, showConfetti]);

  const slides = [
    {
      icon: CheckCircle,
      title: "Welcome to Sybeez",
      subtitle: "Your complete retail management solution is ready",
      content: (
        <div className="text-center space-y-6">
          <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-xl animate-float">
            <CheckCircle className="w-10 h-10 text-white" />
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur opacity-30 animate-pulse"></div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Setup Complete! 🎉
            </h2>
            <p className="text-gray-700 text-base leading-relaxed max-w-md mx-auto">
              Your comprehensive <span className="font-semibold text-blue-600">Sybeez</span> retail management system is configured and ready to transform your business operations.
            </p>
            
            <div className="flex items-center justify-center gap-3 pt-2">
              <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-700 text-sm font-medium">System Ready</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-200">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-blue-700 text-sm font-medium">All Features Active</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      icon: Zap,
      title: "Powerful Features",
      subtitle: "Everything you need to grow your business",
      content: (
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: Package, title: "Smart Inventory", desc: "Real-time tracking & alerts", gradient: "from-blue-500 to-cyan-600", delay: "0s" },
            { icon: Users, title: "Customer Hub", desc: "Complete CRM & loyalty", gradient: "from-purple-500 to-pink-600", delay: "0.1s" },
            { icon: TrendingUp, title: "Analytics Pro", desc: "AI-powered insights", gradient: "from-orange-500 to-red-600", delay: "0.2s" },
            { icon: DollarSign, title: "Financial Suite", desc: "Accounting & compliance", gradient: "from-green-500 to-emerald-600", delay: "0.3s" }
          ].map((feature, idx) => (
            <div 
              key={idx}
              className="p-4 bg-white border border-gray-200 rounded-xl hover:shadow-lg hover:border-gray-300 transition-all duration-300 group animate-slideUpStagger"
              style={{ animationDelay: feature.delay }}
            >
              <div className={`inline-flex items-center justify-center w-11 h-11 bg-gradient-to-r ${feature.gradient} rounded-lg shadow-md mb-3 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 text-sm">{feature.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      )
    },
    {
      icon: Star,
      title: "You're All Set",
      subtitle: "Start exploring your new management system",
      content: (
        <div className="space-y-4">
          {[
            { emoji: "📊", text: "Dashboard with real-time insights", bg: "bg-blue-50" },
            { emoji: "🎯", text: "All features configured for you", bg: "bg-purple-50" },
            { emoji: "🔒", text: "Enterprise-grade security", bg: "bg-green-50" },
            { emoji: "🚀", text: "Ready to accelerate growth", bg: "bg-orange-50" }
          ].map((item, idx) => (
            <div key={idx} className={`flex items-center gap-3 p-3 ${item.bg} rounded-lg border border-gray-200 hover:scale-[1.02] transition-transform`}>
              <span className="text-2xl">{item.emoji}</span>
              <span className="text-gray-700 font-medium text-sm">{item.text}</span>
            </div>
          ))}
          
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="w-5 h-5 text-blue-500" />
              <Sparkles className="w-4 h-4 text-purple-500" />
            </div>
            <p className="text-center text-gray-800 font-semibold text-sm">Ready to transform your retail business!</p>
          </div>
        </div>
      )
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-floatSlow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-floatSlow" style={{ animationDelay: '1s' }}></div>
        
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Confetti */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${45 + Math.random() * 10}%`,
                top: `${45 + Math.random() * 10}%`,
                backgroundColor: ['#3B82F6', '#8B5CF6', '#EC4899', '#10B981'][Math.floor(Math.random() * 4)],
                animation: `fadeIn 0.5s ease-out ${Math.random()}s, slideUp 2s ease-out ${Math.random()}s`
              }}
            />
          ))}
        </div>
      )}

      <div className="relative w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-5 animate-slideUp">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl border-2 border-white shadow-xl mb-3 relative animate-float">
            {React.createElement(slides[currentSlide].icon, {
              className: "w-8 h-8 text-blue-600"
            })}
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            {slides[currentSlide].title}
          </h1>
          <p className="text-gray-200 text-sm">{slides[currentSlide].subtitle}</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 relative animate-fadeIn">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors group"
          >
            <X className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
          </button>

          {/* Progress */}
          <div className="flex justify-center gap-2 mb-6">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentSlide ? 'w-6 bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Content */}
          <div className="min-h-[320px] flex items-center justify-center mb-6">
            {slides[currentSlide].content}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                currentSlide > 0
                  ? 'text-gray-700 hover:bg-gray-100'
                  : 'text-gray-400 cursor-not-allowed'
              }`}
              disabled={currentSlide === 0}
            >
              Previous
            </button>

            {currentSlide < slides.length - 1 ? (
              <button
                onClick={() => setCurrentSlide(currentSlide + 1)}
                className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg"
              >
                <span>Get Started</span>
                <Sparkles className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-white text-sm mt-4">
          Ready to transform your business? Let's begin! 🚀
        </p>
      </div>
    </div>
  );
};

export default WelcomePopup;