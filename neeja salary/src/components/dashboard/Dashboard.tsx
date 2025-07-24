import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { FileUpload } from './FileUpload';
import { ModelSelection } from './ModelSelection';
import { PredictionForm } from './PredictionForm';
import { DataInsights } from './DataInsights';

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'upload':
        return <FileUpload />;
      case 'models':
        return <ModelSelection />;
      case 'predict':
        return <PredictionForm />;
      case 'insights':
        return <DataInsights />;
      default:
        return (
          <div className="space-y-8">
            {/* Welcome Hero Section */}
            <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl shadow-xl border border-blue-200 p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-2xl"></div>
              <div className="text-center">
                <div className="mb-6">
                  <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg">
                    <Sparkles className="w-6 h-6 animate-pulse" />
                    <span>Welcome to SmartPay</span>
                  </div>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Welcome to SmartPay
                </h2>
                <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
                  AI-powered employee salary prediction system with advanced machine learning capabilities
                </p>
                
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  <div className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-bounce">
                      <span className="text-white font-bold text-xl">1</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-4 text-lg">Upload Data</h3>
                    <p className="text-gray-600">
                      Upload your employee dataset (CSV/Excel) or use our default dataset
                    </p>
                  </div>
                  
                  <div className="bg-white/80 backdrop-blur-sm border border-purple-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-bounce">
                      <span className="text-white font-bold text-xl">2</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-4 text-lg">Select Model</h3>
                    <p className="text-gray-600">
                      Choose from multiple ML algorithms and train for optimal performance
                    </p>
                  </div>
                  
                  <div className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-bounce">
                      <span className="text-white font-bold text-xl">3</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-4 text-lg">Predict Salary</h3>
                    <p className="text-gray-600">
                      Enter employee details and get accurate salary predictions
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <DataInsights />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 p-8 overflow-auto relative">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};