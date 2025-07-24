import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, AlertCircle, CheckCircle, X, Brain, Download, BarChart3, Users, TrendingUp, FileSpreadsheet } from 'lucide-react';
import { motion } from 'framer-motion';
import { mlApi } from '../../utils/mlApi';

interface DatasetPreview {
  headers: string[];
  rows: any[][];
  fileName: string;
  totalRows: number;
}

interface BulkPredictionResult {
  totalProcessed: number;
  highEarners: number;
  lowEarners: number;
  averageConfidence: number;
  predictions: Array<{
    id: number;
    originalData: any[];
    prediction: string;
    confidence: number;
  }>;
  processingTime: number;
}

const BulkAnalysisTab = () => {
  const [datasetPreview, setDatasetPreview] = useState<DatasetPreview | null>(null);
  const [bulkResults, setBulkResults] = useState<BulkPredictionResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [selectedModel, setSelectedModel] = useState('random_forest');

  const models = [
    { id: 'random_forest', name: 'Random Forest', accuracy: '87%', description: 'Best overall performance' },
    { id: 'xgboost', name: 'XGBoost', accuracy: '85%', description: 'Fast and efficient' },
    { id: 'logistic_regression', name: 'Logistic Regression', accuracy: '82%', description: 'Highly interpretable' }
  ];

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setError('');
    setIsProcessing(true);

    // Mock CSV/Excel parsing - in real implementation, use libraries like Papa Parse or SheetJS
    setTimeout(() => {
      const mockDataset: DatasetPreview = {
        headers: ['age', 'workclass', 'education', 'education-num', 'marital-status', 'occupation', 'relationship', 'race', 'sex', 'capital-gain', 'capital-loss', 'hours-per-week', 'native-country'],
        rows: [
          [39, 'State-gov', 'Bachelors', 13, 'Never-married', 'Adm-clerical', 'Not-in-family', 'White', 'Male', 2174, 0, 40, 'United-States'],
          [50, 'Self-emp-not-inc', 'Bachelors', 13, 'Married-civ-spouse', 'Exec-managerial', 'Husband', 'White', 'Male', 0, 0, 13, 'United-States'],
          [38, 'Private', 'HS-grad', 9, 'Divorced', 'Handlers-cleaners', 'Not-in-family', 'White', 'Male', 0, 0, 40, 'United-States'],
          [53, 'Private', '11th', 7, 'Married-civ-spouse', 'Handlers-cleaners', 'Husband', 'Black', 'Male', 0, 0, 40, 'United-States'],
          [28, 'Private', 'Bachelors', 13, 'Married-civ-spouse', 'Prof-specialty', 'Wife', 'Black', 'Female', 0, 0, 40, 'Cuba'],
          [37, 'Private', 'Masters', 14, 'Married-civ-spouse', 'Exec-managerial', 'Wife', 'White', 'Female', 0, 0, 40, 'United-States'],
          [49, 'Private', '9th', 5, 'Married-spouse-absent', 'Other-service', 'Not-in-family', 'Black', 'Female', 0, 0, 16, 'Jamaica'],
          [52, 'Self-emp-not-inc', 'HS-grad', 9, 'Married-civ-spouse', 'Exec-managerial', 'Husband', 'White', 'Male', 0, 0, 45, 'United-States'],
          [31, 'Private', 'Masters', 14, 'Never-married', 'Prof-specialty', 'Not-in-family', 'White', 'Female', 14084, 0, 50, 'United-States'],
          [42, 'Private', 'Bachelors', 13, 'Married-civ-spouse', 'Tech-support', 'Husband', 'White', 'Male', 5178, 0, 40, 'United-States']
        ],
        fileName: file.name,
        totalRows: 1000 // Mock total rows
      };

      setDatasetPreview(mockDataset);
      setIsProcessing(false);
    }, 2000);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
    multiple: false,
    maxSize: 50 * 1024 * 1024 // 50MB for large datasets
  });

  const handleBulkPrediction = async () => {
    if (!datasetPreview) return;

    setIsProcessing(true);
    setBulkResults(null);

    try {
      const startTime = Date.now();
      
      // Convert dataset rows to ML API format
      const mlInputData = datasetPreview.rows.map((row, index) => {
        return {
          age: row[0] || 35,
          workclass: row[1] || 'Private',
          education: row[2] || 'Bachelors',
          'education-num': row[3] || 13,
          'marital-status': row[4] || 'Married-civ-spouse',
          occupation: row[5] || 'Tech-support',
          relationship: row[6] || 'Husband',
          race: row[7] || 'White',
          sex: row[8] || 'Male',
          'capital-gain': row[9] || 0,
          'capital-loss': row[10] || 0,
          'hours-per-week': row[11] || 40,
          'native-country': row[12] || 'United-States'
        };
      });

      console.log('Sending bulk prediction request with', mlInputData.length, 'records');
      
      // Call the ML API for batch prediction
      const batchResult = await mlApi.predictBatch({
        data: mlInputData,
        model: selectedModel as any
      });

      const processingTime = Date.now() - startTime;
      
      // Process results
      const predictions = batchResult.predictions.map((pred, index) => ({
        id: index + 1,
        originalData: datasetPreview.rows[index],
        prediction: pred === 1 ? '>50K' : '≤50K',
        confidence: Math.round(Math.random() * 20 + 75) // Mock confidence
      }));

      const highEarners = predictions.filter(p => p.prediction === '>50K').length;
      const lowEarners = predictions.filter(p => p.prediction === '≤50K').length;
      const averageConfidence = predictions.reduce((sum, p) => sum + p.confidence, 0) / predictions.length;

      const result: BulkPredictionResult = {
        totalProcessed: predictions.length,
        highEarners,
        lowEarners,
        averageConfidence: Math.round(averageConfidence),
        predictions,
        processingTime
      };

      setBulkResults(result);
      
    } catch (error) {
      console.error('Bulk prediction error:', error);
      setError('Failed to process bulk predictions. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = (format: 'csv' | 'excel') => {
    if (!bulkResults) return;

    // Create CSV content
    const headers = ['ID', 'Age', 'Education', 'Occupation', 'Prediction', 'Confidence'];
    const csvContent = [
      headers.join(','),
      ...bulkResults.predictions.map(pred => [
        pred.id,
        pred.originalData[0], // age
        pred.originalData[2], // education
        pred.originalData[5], // occupation
        pred.prediction,
        `${pred.confidence}%`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `bulk_predictions.${format === 'csv' ? 'csv' : 'xlsx'}`;
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
          Bulk Employee Analysis
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Upload large employee datasets (CSV/Excel) for batch salary predictions and comprehensive analysis
        </p>
      </motion.div>

      {!datasetPreview ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          {...getRootProps()}
          className={`border-2 border-dashed rounded-2xl p-16 text-center transition-all duration-300 cursor-pointer ${
            isDragActive
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 scale-105'
              : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
          }`}
        >
          <input {...getInputProps()} />
          <motion.div
            animate={{ y: isDragActive ? -10 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <FileSpreadsheet className="w-20 h-20 mx-auto mb-6 text-gray-400" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {isDragActive ? 'Drop your dataset here' : 'Upload Employee Dataset'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
              Drag & drop your CSV or Excel file with employee data
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {['CSV', 'XLSX', 'XLS'].map((format) => (
                <span key={format} className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-full text-sm font-medium">
                  {format}
                </span>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg text-lg font-semibold"
            >
              Choose Dataset File
            </motion.button>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              Maximum file size: 50MB • Supports up to 100,000 records
            </p>
          </motion.div>
        </motion.div>
      ) : (
        <div className="space-y-8">
          {/* Dataset Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {datasetPreview.fileName}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {datasetPreview.totalRows.toLocaleString()} total records • {datasetPreview.headers.length} columns
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setDatasetPreview(null);
                  setBulkResults(null);
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Model Selection */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Select ML Model for Bulk Analysis
              </h4>
              <div className="grid md:grid-cols-3 gap-4">
                {models.map(model => (
                  <motion.div
                    key={model.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedModel(model.id)}
                    className={`p-4 border rounded-xl cursor-pointer transition-all duration-300 ${
                      selectedModel === model.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Brain className="w-5 h-5 text-blue-600" />
                      <h5 className="font-semibold text-gray-900 dark:text-white">{model.name}</h5>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{model.description}</p>
                    <div className="text-sm font-medium text-green-600">Accuracy: {model.accuracy}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Data Preview Table */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Data Preview (First 10 rows)
              </h4>
              <div className="overflow-x-auto bg-gray-50 dark:bg-gray-700 rounded-xl">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-600">
                      {datasetPreview.headers.map((header, index) => (
                        <th key={index} className="px-4 py-3 text-left font-medium text-gray-900 dark:text-white whitespace-nowrap">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {datasetPreview.rows.slice(0, 10).map((row, rowIndex) => (
                      <tr key={rowIndex} className="border-t border-gray-200 dark:border-gray-600">
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} className="px-4 py-3 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Process Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBulkPrediction}
              disabled={isProcessing}
              className="w-full py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg font-semibold shadow-lg"
            >
              <Brain className="w-6 h-6" />
              {isProcessing ? 'Processing Dataset...' : `Analyze ${datasetPreview.totalRows.toLocaleString()} Records`}
            </motion.button>
          </motion.div>

          {/* Bulk Results */}
          {bulkResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Summary Stats */}
              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {bulkResults.totalProcessed.toLocaleString()}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">Total Processed</div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {bulkResults.highEarners.toLocaleString()}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">High Earners (&gt;50K)</div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    {bulkResults.lowEarners.toLocaleString()}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">Low Earners (≤50K)</div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {bulkResults.averageConfidence}%
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">Avg Confidence</div>
                </div>
              </div>

              {/* Results Table */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Bulk Prediction Results
                  </h3>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleDownload('csv')}
                      className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Export CSV
                    </button>
                    <button
                      onClick={() => handleDownload('excel')}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200"
                    >
                      <FileText className="w-4 h-4" />
                      Export Excel
                    </button>
                  </div>
                </div>

                <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Processing completed in {(bulkResults.processingTime / 1000).toFixed(2)} seconds
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-700">
                        <th className="px-4 py-3 text-left font-medium text-gray-900 dark:text-white">ID</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-900 dark:text-white">Age</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-900 dark:text-white">Education</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-900 dark:text-white">Occupation</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-900 dark:text-white">Prediction</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-900 dark:text-white">Confidence</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bulkResults.predictions.slice(0, 20).map((result) => (
                        <tr key={result.id} className="border-t border-gray-200 dark:border-gray-600">
                          <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{result.id}</td>
                          <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{result.originalData[0]}</td>
                          <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{result.originalData[2]}</td>
                          <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{result.originalData[5]}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                              result.prediction === '>50K'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
                            }`}>
                              {result.prediction === '>50K' ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                              {result.prediction}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{result.confidence}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {bulkResults.predictions.length > 20 && (
                  <div className="mt-4 text-center text-gray-600 dark:text-gray-400">
                    Showing first 20 results. Download full dataset for complete results.
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      )}

      {isProcessing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center max-w-md">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {datasetPreview ? 'Processing bulk predictions...' : 'Loading dataset...'}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              {datasetPreview ? `Analyzing ${datasetPreview.totalRows.toLocaleString()} employee records` : 'Please wait while we process your file'}
            </p>
          </div>
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-800 rounded-xl text-red-700 dark:text-red-400 flex items-center gap-3"
        >
          <AlertCircle className="w-6 h-6" />
          {error}
        </motion.div>
      )}
    </div>
  );
};

export default BulkAnalysisTab;