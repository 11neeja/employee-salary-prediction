import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';
import { TrendingUp, Users, Award, Clock } from 'lucide-react';

const DashboardTab = () => {
  const salaryDistribution = [
    { name: '≤50K', value: 65, color: '#F97316' },
    { name: '>50K', value: 35, color: '#10B981' }
  ];

  const ageDistribution = [
    { age: '18-25', '≤50K': 15, '>50K': 5 },
    { age: '26-35', '≤50K': 25, '>50K': 18 },
    { age: '36-45', '≤50K': 20, '>50K': 25 },
    { age: '46-55', '≤50K': 18, '>50K': 22 },
    { age: '56-65', '≤50K': 12, '>50K': 15 }
  ];

  const educationSalary = [
    { education: 'HS-grad', '≤50K': 35, '>50K': 8 },
    { education: 'Some-college', '≤50K': 18, '>50K': 12 },
    { education: 'Bachelors', '≤50K': 15, '>50K': 28 },
    { education: 'Masters', '≤50K': 5, '>50K': 22 },
    { education: 'Doctorate', '≤50K': 2, '>50K': 15 }
  ];

  const featureImportance = [
    { feature: 'Education Level', importance: 0.28 },
    { feature: 'Age', importance: 0.22 },
    { feature: 'Hours per Week', importance: 0.19 },
    { feature: 'Occupation', importance: 0.16 },
    { feature: 'Marital Status', importance: 0.09 },
    { feature: 'Work Class', importance: 0.06 }
  ];

  const insights = [
    {
      icon: Award,
      title: 'Education Impact',
      value: '80%',
      description: 'of high earners have Bachelors degree or above',
      color: 'text-blue-600'
    },
    {
      icon: Clock,
      title: 'Work Hours',
      value: '45+',
      description: 'average hours/week for >50K earners',
      color: 'text-green-600'
    },
    {
      icon: Users,
      title: 'Age Factor',
      value: '35-55',
      description: 'age range most likely to earn >50K',
      color: 'text-purple-600'
    },
    {
      icon: TrendingUp,
      title: 'Model Accuracy',
      value: '87%',
      description: 'prediction accuracy on test data',
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Analytics Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Comprehensive insights and visualizations from your salary prediction analysis
        </p>
      </div>

      {/* Key Insights */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {insights.map((insight, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg bg-opacity-20 ${insight.color === 'text-blue-600' ? 'bg-blue-500' : insight.color === 'text-green-600' ? 'bg-green-500' : insight.color === 'text-purple-600' ? 'bg-purple-500' : 'bg-orange-500'}`}>
                <insight.icon className={`w-5 h-5 ${insight.color}`} />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {insight.title}
              </h3>
            </div>
            <div className={`text-2xl font-bold ${insight.color} mb-1`}>
              {insight.value}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {insight.description}
            </p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Salary Distribution Pie Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Salary Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={salaryDistribution}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {salaryDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Feature Importance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Feature Importance
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={featureImportance} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="feature" type="category" width={80} />
              <Tooltip formatter={(value) => [`${(value as number * 100).toFixed(1)}%`, 'Importance']} />
              <Bar dataKey="importance" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Age Distribution */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Age Distribution vs Salary
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={ageDistribution}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="age" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="≤50K" stackId="a" fill="#F97316" />
            <Bar dataKey=">50K" stackId="a" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Education vs Salary */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Education Level vs Salary
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={educationSalary}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="education" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="≤50K" fill="#F97316" />
            <Bar dataKey=">50K" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardTab;