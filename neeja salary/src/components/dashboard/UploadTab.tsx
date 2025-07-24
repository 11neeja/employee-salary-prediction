import React, { useState, useRef } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle, X } from 'lucide-react';

interface DataPreview {
  headers: string[];
  rows: any[][];
  fileName: string;
}

const UploadTab = () => {
  const [dragActive, setDragActive] = useState(false);
  const [dataPreview, setDataPreview] = useState<DataPreview | null>(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const requiredColumns = ['age', 'education', 'hours-per-week', 'occupation', 'marital-status'];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setError('');
    
    if (!file.name.match(/\.(csv|xlsx?)$/i)) {
      setError('Please upload a CSV or Excel file');
      return;
    }

    // Mock file processing - in real app, this would parse the actual file
    const mockData = {
      headers: ['age', 'education', 'hours-per-week', 'occupation', 'marital-status', 'salary'],
      rows: [
        [35, 'Bachelors', 40, 'Engineer', 'Married', '<=50K'],
        [28, 'Masters', 45, 'Manager', 'Single', '>50K'],
        [42, 'HS-grad', 38, 'Sales', 'Divorced', '<=50K'],
        [31, 'Bachelors', 50, 'Tech-support', 'Married', '>50K'],
        [55, 'Doctorate', 35, 'Prof-specialty', 'Married', '>50K']
      ],
      fileName: file.name
    };

    setDataPreview(mockData);
    localStorage.setItem('fairhire_dataset', JSON.stringify(mockData));
  };

  const checkRequiredColumns = () => {
    if (!dataPreview) return { missing: [], present: [] };
    
    const present = requiredColumns.filter(col => 
      dataPreview.headers.some(header => 
        header.toLowerCase().includes(col.toLowerCase())
      )
    );
    
    const missing = requiredColumns.filter(col => 
      !dataPreview.headers.some(header => 
        header.toLowerCase().includes(col.toLowerCase())
      )
    );

    return { missing, present };
  };

  const { missing, present } = checkRequiredColumns();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Upload Dataset
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Upload your employee dataset in CSV or Excel format to get started with salary predictions
        </p>
      </div>

      {!dataPreview ? (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${
            dragActive
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
          }`}
        >
          <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Drag & Drop your dataset here
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            or click to browse files
          </p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            Choose File
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileInput}
            className="hidden"
          />
          <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            Supported formats: CSV, XLSX, XLS (Max 10MB)
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* File Info */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {dataPreview.fileName}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {dataPreview.rows.length} rows, {dataPreview.headers.length} columns
                  </p>
                </div>
              </div>
              <button
                onClick={() => setDataPreview(null)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Column Validation */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                Column Validation
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-green-700 dark:text-green-400">
                    Required columns found:
                  </h5>
                  {present.map(col => (
                    <div key={col} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">{col}</span>
                    </div>
                  ))}
                </div>
                {missing.length > 0 && (
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium text-red-700 dark:text-red-400">
                      Missing columns:
                    </h5>
                    {missing.map(col => (
                      <div key={col} className="flex items-center gap-2 text-sm">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        <span className="text-gray-700 dark:text-gray-300">{col}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Data Preview */}
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                Data Preview (First 5 rows)
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-700">
                      {dataPreview.headers.map((header, index) => (
                        <th key={index} className="px-4 py-3 text-left font-medium text-gray-900 dark:text-white">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {dataPreview.rows.map((row, rowIndex) => (
                      <tr key={rowIndex} className="border-t border-gray-200 dark:border-gray-600">
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} className="px-4 py-3 text-gray-700 dark:text-gray-300">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
              <button
                onClick={() => setDataPreview(null)}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Upload Different File
              </button>
              <button
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                Process Dataset
              </button>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400">
          {error}
        </div>
      )}
    </div>
  );
};

export default UploadTab;