import React, { useRef, useState } from 'react';
import { Upload, FileText, X, CheckCircle } from 'lucide-react';
import { Button } from '../common/Button';
import { parseCSVData } from '../../utils/mlUtils';
import { useData } from '../../context/DataContext';

export const FileUpload: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const { setDataset } = useData();

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    if (!file.name.endsWith('.csv') && !file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      alert('Please upload a CSV or Excel file');
      return;
    }

    setUploading(true);
    setUploadSuccess(false);

    try {
      const text = await file.text();
      const dataset = parseCSVData(text);
      setDataset(dataset);
      setUploadSuccess(true);
    } catch (error) {
      console.error('Error parsing file:', error);
      alert('Error parsing file. Please check the format.');
    } finally {
      setUploading(false);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Employee Dataset</h2>
        <p className="text-gray-600">
          Upload your CSV or Excel file containing employee information for custom predictions
        </p>
      </div>

      <div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
          dragActive
            ? 'border-blue-400 bg-blue-50'
            : uploadSuccess
            ? 'border-green-400 bg-green-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".csv,.xlsx,.xls"
          onChange={handleChange}
        />

        {uploading ? (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
              <Upload className="w-8 h-8 text-blue-600 animate-pulse" />
            </div>
            <p className="text-lg font-medium text-gray-900">Processing your file...</p>
          </div>
        ) : uploadSuccess ? (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-lg font-medium text-green-900">File uploaded successfully!</p>
            <p className="text-sm text-green-700">Your dataset has been processed and is ready for predictions.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
              <FileText className="w-8 h-8 text-gray-600" />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-900 mb-2">
                Drop your files here, or click to browse
              </p>
              <p className="text-sm text-gray-500">
                Supports CSV, XLS, and XLSX files up to 10MB
              </p>
            </div>
            <Button onClick={onButtonClick} variant="primary">
              <Upload className="w-4 h-4 mr-2" />
              Choose File
            </Button>
          </div>
        )}
      </div>

      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-3">Expected CSV Format</h3>
          <div className="text-sm text-blue-700 space-y-1">
            <p>• First row should contain column headers</p>
            <p>• Include numerical and categorical features</p>
            <p>• Common columns: age, education, experience, etc.</p>
            <p>• Target column (salary) is optional</p>
          </div>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="font-semibold text-green-900 mb-3">What Happens Next?</h3>
          <div className="text-sm text-green-700 space-y-1">
            <p>• Automatic data validation and cleaning</p>
            <p>• Feature analysis and type detection</p>
            <p>• Model adaptation to your dataset</p>
            <p>• Ready for salary predictions</p>
          </div>
        </div>
      </div>
    </div>
  );
};