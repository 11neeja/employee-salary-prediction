import React from 'react';
import { Brain, CheckCircle, Clock, Zap } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { availableModels, trainModels } from '../../utils/mlUtils';
import { Button } from '../common/Button';

export const ModelSelection: React.FC = () => {
  const { 
    selectedModel, 
    setSelectedModel, 
    dataset, 
    modelResults, 
    setModelResults, 
    isTraining, 
    setIsTraining 
  } = useData();

  const handleTrainModels = async () => {
    if (!dataset) {
      alert('Please upload a dataset first');
      return;
    }

    setIsTraining(true);
    try {
      const results = await trainModels(dataset);
      setModelResults(results);
      // Auto-select the best performing model
      if (results.length > 0) {
        const bestModel = results[0];
        const modelId = availableModels.find(m => m.name === bestModel.modelName)?.id || 'random_forest';
        setSelectedModel(modelId);
      }
    } catch (error) {
      console.error('Training failed:', error);
      alert('Model training failed. Please try again.');
    } finally {
      setIsTraining(false);
    }
  };

  const bestModel = modelResults.length > 0 ? modelResults[0] : null;

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Machine Learning Models</h2>
          <p className="text-gray-600">
            Select and compare different ML algorithms for salary prediction
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {availableModels.map((model) => {
            const isSelected = selectedModel === model.id;
            const modelResult = modelResults.find(r => r.modelName === model.name);
            
            return (
              <div
                key={model.id}
                className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
                onClick={() => setSelectedModel(model.id)}
              >
                {isSelected && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                )}
                
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg mb-4">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-2">{model.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{model.description}</p>
                
                {modelResult && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Accuracy:</span>
                        <span className="font-medium">{(modelResult.accuracy * 100).toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">F1 Score:</span>
                        <span className="font-medium">{(modelResult.f1Score * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Button
            onClick={handleTrainModels}
            loading={isTraining}
            disabled={!dataset}
            size="lg"
          >
            {isTraining ? (
              <>
                <Clock className="w-5 h-5 mr-2" />
                Training Models...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 mr-2" />
                Train & Compare Models
              </>
            )}
          </Button>
          {!dataset && (
            <p className="text-sm text-gray-500 mt-2">
              Upload a dataset first to train models
            </p>
          )}
        </div>
      </div>

      {modelResults.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Model Performance Results</h3>
          
          {bestModel && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <div className="flex items-center space-x-3 mb-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h4 className="text-lg font-semibold text-green-900">Best Performing Model</h4>
              </div>
              <p className="text-green-700 mb-4">
                <strong>{bestModel.modelName}</strong> achieved the highest accuracy of{' '}
                <strong>{(bestModel.accuracy * 100).toFixed(1)}%</strong> and is now selected for predictions.
              </p>
            </div>
          )}
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Model</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Accuracy</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Precision</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Recall</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">F1 Score</th>
                </tr>
              </thead>
              <tbody>
                {modelResults.map((result, index) => (
                  <tr 
                    key={result.modelName}
                    className={`border-b border-gray-100 ${index === 0 ? 'bg-green-50' : ''}`}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        {index === 0 && <CheckCircle className="w-4 h-4 text-green-600" />}
                        <span className="font-medium">{result.modelName}</span>
                      </div>
                    </td>
                    <td className="text-center py-4 px-4 font-medium">
                      {(result.accuracy * 100).toFixed(1)}%
                    </td>
                    <td className="text-center py-4 px-4">
                      {(result.precision * 100).toFixed(1)}%
                    </td>
                    <td className="text-center py-4 px-4">
                      {(result.recall * 100).toFixed(1)}%
                    </td>
                    <td className="text-center py-4 px-4">
                      {(result.f1Score * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};