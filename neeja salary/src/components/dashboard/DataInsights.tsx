import React from 'react';
import { BarChart3, PieChart, TrendingUp, Users, Award, Target, Zap, Activity } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const DataInsights: React.FC = () => {
  const { dataset, modelResults } = useData();

  // Generate sample insights data
  const insights = {
    totalRecords: dataset?.data.length || 32561,
    highSalaryCount: Math.floor((dataset?.data.length || 32561) * 0.24),
    avgAge: 38.6,
    topEducation: 'HS-grad',
    topOccupation: 'Prof-specialty'
  };

  const salaryDistribution = [
    { label: '<=50K', value: 76, color: 'bg-blue-500' },
    { label: '>50K', value: 24, color: 'bg-green-500' }
  ];

  const ageGroups = [
    { range: '18-30', count: 8500, percentage: 26 },
    { range: '31-45', count: 12000, percentage: 37 },
    { range: '46-60', count: 9000, percentage: 28 },
    { range: '60+', count: 3061, percentage: 9 }
  ];

  const educationLevels = [
    { level: 'HS-grad', count: 10501, percentage: 32 },
    { level: 'Some-college', count: 7291, percentage: 22 },
    { level: 'Bachelors', count: 5355, percentage: 16 },
    { level: 'Masters', count: 1723, percentage: 5 },
    { level: 'Doctorate', count: 413, percentage: 1 },
    { level: 'Others', count: 7278, percentage: 24 }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg mb-4">
          <Activity className="w-6 h-6 animate-pulse" />
          <span>Data Analytics Dashboard</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Employee Data Insights
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Comprehensive analysis of your employee dataset with interactive visualizations
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg border border-blue-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-700">Total Records</p>
              <p className="text-3xl font-bold text-blue-900">{insights.totalRecords.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-lg border border-green-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-xl flex items-center justify-center shadow-lg">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-green-700">High Salary (&gt;50K)</p>
              <p className="text-3xl font-bold text-green-900">{insights.highSalaryCount.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow-lg border border-purple-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
              <BarChart3 className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-purple-700">Average Age</p>
              <p className="text-3xl font-bold text-purple-900">{insights.avgAge}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl shadow-lg border border-orange-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-orange-700 rounded-xl flex items-center justify-center shadow-lg">
              <PieChart className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-orange-700">Top Education</p>
              <p className="text-2xl font-bold text-orange-900">{insights.topEducation}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Salary Distribution */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-8 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <PieChart className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Salary Distribution</h3>
          </div>
          <div className="space-y-4">
            {salaryDistribution.map((item) => (
              <div key={item.label} className="flex items-center space-x-4">
                <div className="w-20 text-sm font-bold text-gray-700">
                  {item.label}
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-8 shadow-inner">
                  <div
                    className={`h-8 rounded-full ${item.color} flex items-center justify-end pr-3 shadow-lg transition-all duration-1000 ease-out`}
                    style={{ width: `${item.value}%` }}
                  >
                    <span className="text-white text-sm font-bold">{item.value}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Age Groups */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-8 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Age Distribution</h3>
          </div>
          <div className="space-y-4">
            {ageGroups.map((group) => (
              <div key={group.range} className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="w-16 text-sm font-bold text-gray-700">
                    {group.range}
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-6 shadow-inner">
                    <div
                      className="h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg transition-all duration-1000 ease-out"
                      style={{ width: `${group.percentage}%` }}
                    />
                  </div>
                </div>
                <div className="ml-4 text-sm font-medium text-gray-600">
                  {group.count.toLocaleString()} ({group.percentage}%)
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Education Levels */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-8 hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
            <Award className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">Education Level Distribution</h3>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {educationLevels.map((edu) => (
            <div key={edu.level} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-gray-900">{edu.level}</h4>
                <span className="text-sm font-bold text-purple-600 bg-purple-100 px-2 py-1 rounded-full">{edu.percentage}%</span>
              </div>
              <div className="bg-gray-200 rounded-full h-3 mb-3 shadow-inner">
                <div
                  className="h-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-full shadow-lg transition-all duration-1000 ease-out"
                  style={{ width: `${edu.percentage}%` }}
                />
              </div>
              <p className="text-sm font-medium text-gray-600">{edu.count.toLocaleString()} employees</p>
            </div>
          ))}
        </div>
      </div>

      {/* Model Performance */}
      {modelResults.length > 0 && (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-8 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Model Performance Comparison</h3>
          </div>
          <div className="space-y-4">
            {modelResults.map((result, index) => (
              <div key={result.modelName} className="flex items-center space-x-4">
                <div className="w-32 text-sm font-bold text-gray-700">
                  {result.modelName}
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-8 shadow-inner">
                  <div
                    className={`h-8 rounded-full flex items-center justify-end pr-3 shadow-lg transition-all duration-1000 ease-out ${
                      index === 0 ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-blue-500 to-blue-600'
                    }`}
                    style={{ width: `${result.accuracy * 100}%` }}
                  >
                    <span className="text-white text-sm font-bold">
                      {(result.accuracy * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
                {index === 0 && (
                  <span className="text-xs bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full font-bold shadow-lg">
                    <Zap className="w-3 h-3 inline mr-1" />
                    Best
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};