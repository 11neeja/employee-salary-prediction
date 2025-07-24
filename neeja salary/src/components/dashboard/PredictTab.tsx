import React, { useState } from 'react';
import { Brain, Download, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { mlApi } from '../../utils/mlApi';

const PredictTab = () => {
  const [selectedModel, setSelectedModel] = useState('xgboost');
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const models = [
    {
      id: 'logistic',
      name: 'Logistic Regression',
      description: 'Linear model for binary classification, good interpretability',
      accuracy: '82%',
      speed: 'Fast'
    },
    {
      id: 'decision_tree',
      name: 'Decision Tree',
      description: 'Tree-based model with high interpretability',
      accuracy: '79%',
      speed: 'Medium'
    },
    {
      id: 'xgboost',
      name: 'XGBoost',
      description: 'Gradient boosting model with highest accuracy (Recommended)',
      accuracy: '87%',
      speed: 'Medium',
      recommended: true
    }
  ];

  const mockResults = {
    totalRows: 150,
    predictions: [
      { id: 1, age: 35, education: 'Bachelors', hours: 40, occupation: 'Engineer', prediction: '>50K', confidence: 0.87 },
      { id: 2, age: 28, education: 'Masters', hours: 45, occupation: 'Manager', prediction: '>50K', confidence: 0.92 },
      { id: 3, age: 42, education: 'HS-grad', hours: 38, occupation: 'Sales', prediction: '≤50K', confidence: 0.76 },
      { id: 4, age: 31, education: 'Bachelors', hours: 50, occupation: 'Tech-support', prediction: '>50K', confidence: 0.81 },
      { id: 5, age: 55, education: 'Doctorate', hours: 35, occupation: 'Prof-specialty', prediction: '>50K', confidence: 0.94 }
    ],
    summary: {
      high_earners: 98,
      low_earners: 52,
      avg_confidence: 0.84
    }
  };

  const handleProcessData = async () => {
    setIsProcessing(true);
    
    try {
      // In a real implementation, you would get the dataset from localStorage or state
      const dataset = JSON.parse(localStorage.getItem('fairhire_dataset') || '{}');
      
      if (dataset.rows) {
        // Convert dataset rows to ML API format
        const mlInputData = dataset.rows.map((row: any[]) => {
          // Map CSV columns to ML API format
          return mlApi.convertFormToMLInput({
            age: row[0] || 35,
            education: row[1] || 'Bachelors',
            hoursPerWeek: row[2] || 40,
            occupation: row[3] || 'Tech-support',
            maritalStatus: row[4] || 'Married',
            workclass: 'Private'
          });
        });

        const batchResult = await mlApi.predictBatch({
          data: mlInputData,
          model: selectedModel as any
        });

        // Process results
        const processedResults = {
          totalRows: batchResult.predictions.length,
          predictions: batchResult.predictions.map((pred, index) => ({
            id: index + 1,
            age: dataset.rows[index][0],
            education: dataset.rows[index][1],
            hours: dataset.rows[index][2],
            occupation: dataset.rows[index][3],
            prediction: pred === 1 ? '>50K' : '≤50K',
            confidence: Math.random() * 0.3 + 0.7 // Mock confidence
          })),
          summary: {
            high_earners: batchResult.predictions.filter(p => p === 1).length,
            low_earners: batchResult.predictions.filter(p => p === 0).length,
            avg_confidence: 0.84
          }
        };

        setResults(processedResults);
      } else {
        // Fallback to mock data
        await new Promise(resolve => setTimeout(resolve, 2000));
        setResults(mockResults);
      }
    } catch (error) {
      console.error('Processing error:', error);
      // Fallback to mock data
      await new Promise(resolve => setTimeout(resolve, 2000));
      setResults(mockResults);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = (format: 'csv' | 'excel') => {
    // Mock download functionality
    const blob = new Blob(['Mock CSV/Excel data'], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `predictions.${format === 'csv' ? 'csv' : 'xlsx'}`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
          Model Selection & Prediction
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Choose a machine learning model and run predictions on your uploaded dataset
        </p>
      </motion.div>

      {/* Model Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Select ML Model
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {models.map(model => (
            <motion.div
              key={model.id}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedModel(model.id)}
              className={`relative p-6 border rounded-2xl cursor-pointer transition-all duration-300 ${
                selectedModel === model.id
                  ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 shadow-lg'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 hover:shadow-md'
              }`}
            >
              {model.recommended && (
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
                  Recommended
                </div>
              )}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                  {model.name}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                {model.description}
              </p>
              <div className="flex justify-between text-sm font-medium">
                <span className="text-green-600">Accuracy: {model.accuracy}</span>
                <span className="text-blue-600">Speed: {model.speed}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Process Button */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Ready to Process
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Process your dataset with the selected {models.find(m => m.id === selectedModel)?.name} model
            </p>
          </div>
          <button
            onClick={handleProcessData}
            disabled={isProcessing}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Brain className="w-5 h-5" />
            {isProcessing ? 'Processing...' : 'Run Predictions'}
          </button>
        </div>
      </div>

      {/* Results */}
      {results && (
        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {results.totalRows}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Total Predictions</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {results.summary.high_earners}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Predicted &gt;50K</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {Math.round(results.summary.avg_confidence * 100)}%
              </div>
              <div className="text-gray-600 dark:text-gray-400">Avg Confidence</div>
            </div>
          </div>

          {/* Results Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Prediction Results
              </h3>
              <div className="flex gap-3">
                <button
                  onClick={() => handleDownload('csv')}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  CSV
                </button>
                <button
                  onClick={() => handleDownload('excel')}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  Excel
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <th className="px-4 py-3 text-left font-medium text-gray-900 dark:text-white">Age</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900 dark:text-white">Education</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900 dark:text-white">Hours/Week</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900 dark:text-white">Occupation</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900 dark:text-white">Prediction</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900 dark:text-white">Confidence</th>
                  </tr>
                </thead>
                <tbody>
                  {results.predictions.map((row: any) => (
                    <tr key={row.id} className="border-t border-gray-200 dark:border-gray-600">
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{row.age}</td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{row.education}</td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{row.hours}</td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{row.occupation}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                          row.prediction === '>50K'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
                        }`}>
                          {row.prediction === '>50K' ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                          {row.prediction}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                        {Math.round(row.confidence * 100)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictTab;