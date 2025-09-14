import React, { useState } from 'react';
import { Shield, User, Lock, Eye, EyeOff } from 'lucide-react';

const LoginPage = ({ onLogin, language = 'hi', onToggleLanguage }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Mock authentication
    setTimeout(() => {
      if (credentials.username === 'admin' && credentials.password === 'admin123') {
        onLogin();
      } else {
        const message = language === 'hi' 
          ? 'गलत यूजरनेम या पासवर्ड'
          : 'Invalid credentials';
        alert(message);
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Language Toggle */}
        <div className="flex justify-end mb-4">
          <button
            onClick={onToggleLanguage}
            className="flex items-center space-x-2 px-3 py-2 bg-white hover:bg-gray-50 rounded-lg shadow-sm transition-colors border"
          >
            <span className="text-sm font-medium text-gray-700">
              {language === 'hi' ? 'English' : 'हिंदी'}
            </span>
          </button>
        </div>
        
        {/* Government Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-4">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {language === 'hi' ? 'इंदौर नगर निगम' : 'Indore Municipal Corporation'}
          </h1>
          <h2 className="text-lg font-semibold text-blue-600 mb-1">
            {language === 'hi' ? 'Indore Municipal Corporation' : 'इंदौर नगर निगम'}
          </h2>
          <p className="text-sm text-gray-600">
            {language === 'hi' ? 'प्रशासन डैशबोर्ड' : 'Admin Dashboard'}
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-xl p-8 border-t-4 border-blue-600">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            {language === 'hi' ? 'व्यवस्थापक लॉगिन' : 'Admin Login'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'hi' ? 'यूजरनेम' : 'Username'}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  required
                  value={credentials.username}
                  onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={language === 'hi' ? 'अपना यूजरनेम दर्ज करें' : 'Enter your username'}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'hi' ? 'पासवर्ड' : 'Password'}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={language === 'hi' ? 'अपना पासवर्ड दर्ज करें' : 'Enter your password'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 h-5 w-5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {language === 'hi' ? 'लॉग इन हो रहे हैं...' : 'Logging in...'}
                </div>
              ) : (
                language === 'hi' ? 'लॉग इन' : 'Login'
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>{language === 'hi' ? 'डेमो क्रेडेंशियल्स:' : 'Demo Credentials:'}</p>
            <p className="font-medium">Username: admin | Password: admin123</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-600">
          <p>© 2024 {language === 'hi' ? 'इंदौर नगर निगम' : 'Indore Municipal Corporation'} | All Rights Reserved</p>
          <p className="mt-1">{language === 'hi' ? 'भारत सरकार' : 'Government of India'}</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;