import React, { useState } from 'react';
import { Brain, TrendingUp, Info, Sparkles, Target, Zap } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { predictSalary, availableModels } from '../../utils/mlUtils';
import { defaultDataset } from '../../utils/defaultData';
import { Button } from '../common/Button';
import { PredictionResult } from '../../types';

export const PredictionForm: React.FC = () => {
  const { dataset, selectedModel } = useData();
  const [predictionInput, setPredictionInput] = useState<any>({});
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);

  const currentDataset = dataset || defaultDataset;
  const selectedModelName = availableModels.find(m => m.id === selectedModel)?.name || 'Random Forest';

  const handleInputChange = (columnName: string, value: any) => {
    setPredictionInput(prev => ({
      ...prev,
      [columnName]: value
    }));
  };

  const handlePredict = async () => {
    setLoading(true);
    try {
      const result = await predictSalary(predictionInput, currentDataset, selectedModelName);
      setPredictionResult(result);
    } catch (error) {
      console.error('Prediction failed:', error);
      alert('Prediction failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (column: any) => {
    const value = predictionInput[column.name] || '';
    
    if (column.type === 'numeric') {
      return (
        <div key={column.name} className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
            {column.name.replace(/_/g, ' ')}
          </label>
          <div className="space-y-3">
            <input
              type="range"
              min={column.min || 0}
              max={column.max || 100}
              value={value || column.min || 0}
              onChange={(e) => handleInputChange(column.name, Number(e.target.value))}
              className="w-full h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg appearance-none cursor-pointer slider hover:from-blue-200 hover:to-purple-200 transition-all duration-200"
              style={{
                background: `linear-gradient(to right, #3B82F6 0%, #8B5CF6 ${((value || column.min || 0) - (column.min || 0)) / ((column.max || 100) - (column.min || 0)) * 100}%, #E5E7EB ${((value || column.min || 0) - (column.min || 0)) / ((column.max || 100) - (column.min || 0)) * 100}%, #E5E7EB 100%)`
              }}
            />
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">{column.min || 0}</span>
              <input
                type="number"
                value={value || ''}
                onChange={(e) => handleInputChange(column.name, Number(e.target.value))}
                className="w-24 px-3 py-2 text-sm border-2 border-blue-300 rounded-lg text-center font-bold focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                min={column.min || 0}
                max={column.max || 100}
              />
              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">{column.max || 100}</span>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div key={column.name} className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
            {column.name.replace(/_/g, ' ')}
          </label>
          <select
            value={value}
            onChange={(e) => handleInputChange(column.name, e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-medium"
          >
            <option value="">Select {column.name.replace(/_/g, ' ')}</option>
            {column.values?.map((option: string) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      );
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-8 hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Employee Information</h2>
            <p className="text-sm text-gray-600 font-medium">Enter employee details for salary prediction</p>
          </div>
        </div>

        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl">
          <div className="flex items-center space-x-2 mb-2">
            <Info className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-bold text-blue-900">Selected Model</span>
          </div>
          <p className="text-sm font-medium text-blue-700 bg-blue-100 px-3 py-1 rounded-lg inline-block">{selectedModelName}</p>
        </div>

        <form className="space-y-4">
          {currentDataset.columns
            .filter(col => col.name !== currentDataset.targetColumn)
            .slice(0, 8) // Limit to 8 fields for better UX
            .map(renderInput)}
          
          <Button
            onClick={handlePredict}
            loading={loading}
            className="w-full group"
            size="lg"
          >
            <TrendingUp className="w-5 h-5 mr-2 group-hover:animate-bounce" />
            Predict Salary
          </Button>
        </form>
      </div>

      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-8 hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
            <Target className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Prediction Results</h2>
        </div>
        
        {predictionResult ? (
          <div className="space-y-6">
            <div className={`p-8 rounded-2xl border-2 shadow-lg ${
              predictionResult.prediction === '>50K' 
                ? 'border-green-300 bg-gradient-to-br from-green-50 to-green-100' 
                : 'border-orange-300 bg-gradient-to-br from-orange-50 to-orange-100'
            }`}>
              <div className="text-center">
                <div className="mb-4">
                  {predictionResult.prediction === '>50K' ? (
                    <Zap className="w-12 h-12 text-green-600 mx-auto animate-pulse" />
                  ) : (
                    <Target className="w-12 h-12 text-orange-600 mx-auto animate-pulse" />
                  )}
                </div>
                <h3 className="text-3xl font-bold mb-4">
                  Predicted Salary: {predictionResult.prediction}
                </h3>
                <p className="text-xl font-medium text-gray-700">
                  Confidence: {(predictionResult.confidence * 100).toFixed(1)}%
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <h4 className="font-bold text-gray-900">Model Insights</h4>
              </div>
              <div className="space-y-2">
                {predictionResult.insights.map((insight, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mt-2 flex-shrink-0 shadow-sm"></div>
                    <p className="text-sm font-medium text-gray-700">{insight}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-4">
              <p className="text-sm font-medium text-blue-700">
                <strong>Model Used:</strong> {predictionResult.modelUsed}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <TrendingUp className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">No Prediction Yet</h3>
            <p className="text-gray-600 font-medium">
              Fill in the employee information and click "Predict Salary" to see results.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};