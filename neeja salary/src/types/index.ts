export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Employee {
  age: number;
  workclass: string;
  education: string;
  educationNum: number;
  maritalStatus: string;
  occupation: string;
  relationship: string;
  race: string;
  sex: string;
  capitalGain: number;
  capitalLoss: number;
  hoursPerWeek: number;
  nativeCountry: string;
  salary?: string;
}

export interface DatasetColumn {
  name: string;
  type: 'numeric' | 'categorical';
  values?: string[];
  min?: number;
  max?: number;
}

export interface Dataset {
  columns: DatasetColumn[];
  data: any[];
  targetColumn?: string;
}

export interface ModelResult {
  modelName: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  predictions: { actual: string; predicted: string; confidence: number }[];
}

export interface PredictionInput {
  [key: string]: any;
}

export interface PredictionResult {
  prediction: string;
  confidence: number;
  modelUsed: string;
  insights: string[];
}