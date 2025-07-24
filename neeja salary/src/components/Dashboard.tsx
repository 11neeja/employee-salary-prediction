import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, BarChart3, Shield, User, LogOut, Moon, Sun, 
  Brain, FileText, Download, Settings, TrendingUp, FileUp
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import BulkAnalysisTab from './dashboard/BulkAnalysisTab';
import UploadTab from './dashboard/UploadTab';
import PredictTab from './dashboard/PredictTab';
import DashboardTab from './dashboard/DashboardTab';
import AuditTab from './dashboard/AuditTab';
import ManualPrediction from './dashboard/ManualPrediction';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const tabs = [
    { id: 'bulk', label: 'Bulk Analysis', icon: FileUp },
    { id: 'manual', label: 'Quick Predict', icon: Brain },
    { id: 'predict', label: 'Results', icon: BarChart3 },
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'audit', label: 'Bias Audit', icon: Shield }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-8">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                FairHire AI
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Dashboard
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              <div className="flex items-center gap-3 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <User className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {user?.name || user?.email}
                </span>
              </div>
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-r border-gray-200 dark:border-gray-700 min-h-[calc(100vh-80px)]">
          <nav className="p-4 space-y-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            {activeTab === 'bulk' && <BulkAnalysisTab />}
            {activeTab === 'manual' && <ManualPrediction />}
            {activeTab === 'predict' && <PredictTab />}
            {activeTab === 'dashboard' && <DashboardTab />}
            {activeTab === 'audit' && <AuditTab />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;