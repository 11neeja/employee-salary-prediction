import React, { useState } from 'react';
import { Brain, BarChart3, Users, Shield, TrendingUp, Database, Sparkles, Zap, Target, Award } from 'lucide-react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

export const LandingPage: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  if (showLogin) {
    return <LoginForm onBack={() => setShowLogin(false)} onSwitchToRegister={() => { setShowLogin(false); setShowRegister(true); }} />;
  }

  if (showRegister) {
    return <RegisterForm onBack={() => setShowRegister(false)} onSwitchToLogin={() => { setShowRegister(false); setShowLogin(true); }} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      {/* Header */}
      <header className="relative z-10 bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200">
                SmartPay
              </span>
              <div className="ml-2 px-2 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold rounded-full">
                AI
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 font-medium transition-all duration-200 hover:scale-105">Features</a>
              <a href="#about" className="text-gray-600 hover:text-purple-600 font-medium transition-all duration-200 hover:scale-105">About</a>
              <a href="#contact" className="text-gray-600 hover:text-pink-600 font-medium transition-all duration-200 hover:scale-105">Contact</a>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowLogin(true)}
                className="text-gray-600 hover:text-gray-900 font-medium transition-all duration-200 hover:scale-105 px-4 py-2 rounded-lg hover:bg-gray-100"
              >
                Sign In
              </button>
              <button
                onClick={() => setShowRegister(true)}
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white text-sm font-bold px-6 py-3 rounded-full shadow-lg animate-pulse">
                <Sparkles className="w-4 h-4 inline mr-2" />
                AI-Powered HR Analytics
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Predict Employee Salaries with
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
                Machine Learning
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
              SmartPay leverages advanced ML algorithms to predict employee salaries accurately, 
              helping HR teams make data-driven decisions and ensure fair compensation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowRegister(true)}
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group"
              >
                <Zap className="w-6 h-6 inline mr-2 group-hover:animate-bounce" />
                Start Free Trial
              </button>
              <button
                onClick={() => setShowLogin(true)}
                className="border-2 border-gray-300 text-gray-700 px-10 py-5 rounded-2xl font-bold text-xl hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 group"
              >
                <Target className="w-6 h-6 inline mr-2 group-hover:animate-spin" />
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white/80 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Powerful Features for HR Analytics
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to make informed salary decisions with confidence
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-3xl border border-blue-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mb-6 group-hover:animate-bounce">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Multiple ML Models</h3>
              <p className="text-gray-600">
                Choose from Logistic Regression, Decision Trees, Random Forest, and XGBoost for optimal predictions.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-3xl border border-purple-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center mb-6 group-hover:animate-bounce">
                <Database className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Custom Dataset Upload</h3>
              <p className="text-gray-600">
                Upload your own CSV or Excel files and get predictions tailored to your organization's data.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-teal-50 p-8 rounded-3xl border border-green-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl flex items-center justify-center mb-6 group-hover:animate-bounce">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Data Insights</h3>
              <p className="text-gray-600">
                Interactive visualizations and comprehensive analytics to understand your data patterns.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-3xl border border-orange-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-orange-700 rounded-2xl flex items-center justify-center mb-6 group-hover:animate-bounce">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Employee Profiles</h3>
              <p className="text-gray-600">
                Create and manage detailed employee profiles with customizable attributes and ranges.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-3xl border border-indigo-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-2xl flex items-center justify-center mb-6 group-hover:animate-bounce">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Fair & Transparent</h3>
              <p className="text-gray-600">
                Built with fairness and transparency in mind to ensure ethical AI-driven decisions.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-8 rounded-3xl border border-pink-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-pink-700 rounded-2xl flex items-center justify-center mb-6 group-hover:animate-bounce">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Real-time Predictions</h3>
              <p className="text-gray-600">
                Get instant salary predictions with confidence scores and detailed explanations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Award className="w-16 h-16 text-white mx-auto mb-4 animate-bounce" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Ready to Transform Your HR Analytics?
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-10">
            Join thousands of HR professionals who trust SmartPay for accurate salary predictions.
          </p>
          <button
            onClick={() => setShowRegister(true)}
            className="bg-white text-blue-600 px-10 py-5 rounded-2xl font-bold text-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-110 group"
          >
            <Sparkles className="w-6 h-6 inline mr-2 group-hover:animate-spin" />
            Get Started Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  SmartPay
                </span>
                <div className="px-2 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold rounded-full">
                  AI
                </div>
              </div>
              <p className="text-gray-400">
                AI-powered employee salary prediction for modern HR teams.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4 text-blue-400">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4 text-purple-400">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-purple-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4 text-pink-400">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-pink-400 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 SmartPay. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};