import React, { useState, useCallback } from 'react';
import { Eye, EyeOff, Mail, Lock, Store } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useSetupStore } from '../store/setupStore';

// Constants
const DEFAULT_CREDENTIALS = {
  email: 'admin@gmail.com',
  password: '1234'
};

const MOCK_USER = {
  id: 1,
  username: 'admin',
  email: 'admin@gmail.com',
  role: 'admin',
  employee: {
    id: 1,
    name: 'Admin User',
    role: 'admin'
  }
};

// Reusable Components
const BackgroundBlob = ({ className }) => (
  <div className={`absolute rounded-full blur-3xl ${className}`} />
);

const InputField = ({ id, type, value, onChange, placeholder, icon: Icon, showToggle, onToggle, required = true }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {id === 'email' ? 'Email Address' : 'Password'}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-12 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
        placeholder={placeholder}
        required={required}
      />
      {showToggle !== undefined && (
        <button
          type="button"
          onClick={onToggle}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
        >
          {showToggle ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      )}
    </div>
  </div>
);

const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
  </svg>
);

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { setupData } = useSetupStore();
  const businessName = setupData?.step3?.businessName || 'Sybeez';
  const businessLogo = setupData?.step3?.logoPreview;

  const handleAutoFill = useCallback(() => {
    setEmail(DEFAULT_CREDENTIALS.email);
    setPassword(DEFAULT_CREDENTIALS.password);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    console.log('Login attempt:', { email, password, rememberMe });

    if (email === DEFAULT_CREDENTIALS.email && password === DEFAULT_CREDENTIALS.password) {
      console.log('Login successful');
      
      try {
        const { setUser, setToken, setAuthenticated } = useAuthStore.getState();
        const { resetSetup } = useSetupStore.getState();
        
        setUser(MOCK_USER);
        setToken('mock-token-123');
        setAuthenticated(true);
        
        resetSetup();
        navigate('/retail/setup/step1');
        
      } catch (err) {
        console.error('Login error:', err);
        setError('Login failed. Please try again.');
      }
    } else {
      setError(`Invalid email or password. Use: ${DEFAULT_CREDENTIALS.email} / ${DEFAULT_CREDENTIALS.password}`);
    }
    
    setIsLoading(false);
  };

  const handleGoogleSignIn = useCallback(() => {
    console.log('Google sign-in initiated');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <BackgroundBlob className="-top-40 -right-40 w-80 h-80 bg-blue-400/10" />
        <BackgroundBlob className="-bottom-40 -left-40 w-80 h-80 bg-purple-400/10" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl mb-4 overflow-hidden">
            {businessLogo ? (
              <img 
                src={businessLogo} 
                alt={`${businessName} Logo`} 
                className="w-full h-full object-cover"
              />
            ) : (
              <Store className="w-8 h-8 text-blue-600" />
            )}
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Welcome to {businessName}
          </h1>
          <p className="text-gray-600 mt-2">Your Smart Retail Management Platform</p>
        </div>

        {/* Main Card */}
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50/80 backdrop-blur-sm border border-red-200/50 text-red-700 rounded-xl text-sm">
              {error}
            </div>
          )}

          {/* Quick Login Helper */}
          <div className="mb-6 p-4 bg-blue-50/80 backdrop-blur-sm border border-blue-200/50 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-900">Quick Login</p>
                <p className="text-xs text-blue-700 mt-1">
                  {DEFAULT_CREDENTIALS.email} / {DEFAULT_CREDENTIALS.password}
                </p>
              </div>
              <button 
                type="button"
                onClick={handleAutoFill}
                className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Auto Fill
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <InputField
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              icon={Mail}
            />

            {/* Password Field */}
            <InputField
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              icon={Lock}
              showToggle={showPassword}
              onToggle={() => setShowPassword(!showPassword)}
            />

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500/50 border-gray-300 rounded bg-white/50 backdrop-blur-sm"
                />
                <span className="ml-2 text-sm text-gray-700">Remember me</span>
              </label>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                Forgot password?
              </a>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg backdrop-blur-sm"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200/50" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white/60 backdrop-blur-sm text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Google Sign In Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-xl py-3 px-4 font-medium text-gray-700 hover:bg-white/70 transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl"
          >
            <GoogleIcon />
            <span>Login with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;