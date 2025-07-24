import React from 'react';
import { Shield, AlertTriangle, CheckCircle, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AuditTab = () => {
  const biasAnalysis = [
    {
      group: 'Gender',
      male: { total: 120, high_salary: 45, accuracy: 0.85 },
      female: { total: 80, high_salary: 22, accuracy: 0.83 },
      bias_score: 0.12,
      status: 'moderate'
    },
    {
      group: 'Age Group',
      young: { total: 60, high_salary: 15, accuracy: 0.81 },
      older: { total: 90, high_salary: 52, accuracy: 0.87 },
      bias_score: 0.23,
      status: 'high'
    },
    {
      group: 'Education',
      basic: { total: 70, high_salary: 12, accuracy: 0.79 },
      advanced: { total: 80, high_salary: 55, accuracy: 0.89 },
      bias_score: 0.08,
      status: 'low'
    }
  ];

  const equalOpportunity = [
    { metric: 'True Positive Rate', male: 0.78, female: 0.72 },
    { metric: 'False Positive Rate', male: 0.15, female: 0.18 },
    { metric: 'Precision', male: 0.82, female: 0.79 },
    { metric: 'Recall', male: 0.78, female: 0.72 }
  ];

  const groupAccuracy = [
    { group: 'Male 25-35', accuracy: 0.85, predictions: 45 },
    { group: 'Female 25-35', accuracy: 0.82, predictions: 30 },
    { group: 'Male 35-50', accuracy: 0.87, predictions: 52 },
    { group: 'Female 35-50', accuracy: 0.84, predictions: 28 },
    { group: 'Male 50+', accuracy: 0.89, predictions: 38 },
    { group: 'Female 50+', accuracy: 0.86, predictions: 22 }
  ];

  const getBiasColor = (score: number) => {
    if (score < 0.1) return 'text-green-600';
    if (score < 0.2) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getBiasStatus = (score: number) => {
    if (score < 0.1) return { text: 'Low Bias', icon: CheckCircle, color: 'green' };
    if (score < 0.2) return { text: 'Moderate Bias', icon: AlertTriangle, color: 'yellow' };
    return { text: 'High Bias', icon: AlertTriangle, color: 'red' };
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Bias & Fairness Audit
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Comprehensive analysis of model fairness across demographic groups
        </p>
      </div>

      {/* Bias Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {biasAnalysis.map((analysis, index) => {
          const status = getBiasStatus(analysis.bias_score);
          const StatusIcon = status.icon;
          
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {analysis.group}
                </h3>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                  status.color === 'green' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                  status.color === 'yellow' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                  'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                  <StatusIcon className="w-3 h-3" />
                  {status.text}
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Bias Score</span>
                  <span className={`font-semibold ${getBiasColor(analysis.bias_score)}`}>
                    {(analysis.bias_score * 100).toFixed(1)}%
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <div className="text-gray-500">Group 1</div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {analysis.male?.total || analysis.young?.total || analysis.basic?.total} total
                    </div>
                    <div className="text-green-600">
                      {`${analysis.male?.high_salary || analysis.young?.high_salary || analysis.basic?.high_salary} `}&gt;50K
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">Group 2</div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {analysis.female?.total || analysis.older?.total || analysis.advanced?.total} total
                    </div>
                    <div className="text-green-600">
                      {`${analysis.female?.high_salary || analysis.older?.high_salary || analysis.advanced?.high_salary} `}&gt;50K
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Equal Opportunity Analysis */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-blue-600" />
          Equal Opportunity Metrics
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={equalOpportunity}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="metric" />
            <YAxis domain={[0, 1]} />
            <Tooltip formatter={(value) => `${(value as number * 100).toFixed(1)}%`} />
            <Legend />
            <Bar dataKey="male" fill="#3B82F6" name="Male" />
            <Bar dataKey="female" fill="#EC4899" name="Female" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Group Accuracy Analysis */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Accuracy by Demographic Groups
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={groupAccuracy}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="group" />
            <YAxis domain={[0.7, 0.9]} />
            <Tooltip formatter={(value) => `${(value as number * 100).toFixed(1)}%`} />
            <Bar dataKey="accuracy" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed Analysis */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Shield className="w-6 h-6 text-green-600" />
          Fairness Assessment
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Findings</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300">
                  Education bias is minimal (8%), indicating fair treatment across education levels
                </span>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300">
                  Moderate gender bias detected (12%) - model slightly favors male predictions
                </span>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300">
                  Significant age bias (23%) - model strongly correlates age with salary predictions
                </span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Recommendations</h4>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <strong className="text-blue-800 dark:text-blue-400">Age Bias Mitigation:</strong>
                <span className="text-gray-700 dark:text-gray-300 ml-2">
                  Consider age-blind training or demographic parity constraints
                </span>
              </div>
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <strong className="text-yellow-800 dark:text-yellow-400">Gender Balance:</strong>
                <span className="text-gray-700 dark:text-gray-300 ml-2">
                  Review feature engineering to reduce gender-correlated features
                </span>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <strong className="text-green-800 dark:text-green-400">Monitoring:</strong>
                <span className="text-gray-700 dark:text-gray-300 ml-2">
                  Implement ongoing bias monitoring in production
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditTab;