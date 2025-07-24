import { Dataset, ModelResult, PredictionResult, PredictionInput } from '../types';

export const availableModels = [
  { id: 'logistic_regression', name: 'Logistic Regression', description: 'Linear model for binary classification' },
  { id: 'decision_tree', name: 'Decision Tree', description: 'Tree-based model with interpretable rules' },
  { id: 'random_forest', name: 'Random Forest', description: 'Ensemble of decision trees' },
  { id: 'xgboost', name: 'XGBoost', description: 'Gradient boosting framework' }
];

export const trainModels = async (dataset: Dataset): Promise<ModelResult[]> => {
  // Simulate training time
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Simulate model results
  const results: ModelResult[] = [
    {
      modelName: 'Random Forest',
      accuracy: 0.8567,
      precision: 0.8234,
      recall: 0.7899,
      f1Score: 0.8063,
      predictions: generatePredictions(100)
    },
    {
      modelName: 'XGBoost',
      accuracy: 0.8423,
      precision: 0.8156,
      recall: 0.7756,
      f1Score: 0.7951,
      predictions: generatePredictions(100)
    },
    {
      modelName: 'Logistic Regression',
      accuracy: 0.8012,
      precision: 0.7845,
      recall: 0.7623,
      f1Score: 0.7732,
      predictions: generatePredictions(100)
    },
    {
      modelName: 'Decision Tree',
      accuracy: 0.7789,
      precision: 0.7567,
      recall: 0.7234,
      f1Score: 0.7397,
      predictions: generatePredictions(100)
    }
  ];
  
  return results.sort((a, b) => b.accuracy - a.accuracy);
};

const generatePredictions = (count: number) => {
  const predictions = [];
  for (let i = 0; i < count; i++) {
    const actual = Math.random() > 0.6 ? '>50K' : '<=50K';
    const predicted = Math.random() > 0.15 ? actual : (actual === '>50K' ? '<=50K' : '>50K');
    predictions.push({
      actual,
      predicted,
      confidence: 0.6 + Math.random() * 0.4
    });
  }
  return predictions;
};

export const predictSalary = async (
  input: PredictionInput,
  dataset: Dataset,
  modelName: string
): Promise<PredictionResult> => {
  // Simulate prediction time
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Simple rule-based prediction for demo
  const age = input.age || 30;
  const education = input.education || '';
  const hoursPerWeek = input.hoursPerWeek || 40;
  
  let score = 0;
  
  // Age factor
  if (age > 35) score += 0.3;
  if (age > 50) score += 0.2;
  
  // Education factor
  if (education.includes('Bachelor') || education.includes('Masters') || education.includes('Doctorate')) {
    score += 0.4;
  }
  
  // Hours factor
  if (hoursPerWeek > 40) score += 0.2;
  if (hoursPerWeek > 50) score += 0.1;
  
  const prediction = score > 0.5 ? '>50K' : '<=50K';
  const confidence = Math.min(0.95, 0.6 + Math.abs(score - 0.5));
  
  const insights = [];
  if (age > 40) insights.push('Age is a positive factor for higher salary');
  if (education.includes('Bachelor')) insights.push('Higher education contributes to salary prediction');
  if (hoursPerWeek > 45) insights.push('Working more hours correlates with higher salary');
  
  return {
    prediction,
    confidence,
    modelUsed: modelName,
    insights
  };
};

export const parseCSVData = (csvText: string): Dataset => {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  
  const data = lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim());
    const row: any = {};
    headers.forEach((header, index) => {
      row[header] = values[index];
    });
    return row;
  });
  
  // Analyze columns
  const columns = headers.map(header => {
    const values = data.map(row => row[header]).filter(v => v !== undefined && v !== '');
    const numericValues = values.filter(v => !isNaN(Number(v)));
    
    if (numericValues.length > values.length * 0.8) {
      // Numeric column
      const numbers = numericValues.map(Number);
      return {
        name: header,
        type: 'numeric' as const,
        min: Math.min(...numbers),
        max: Math.max(...numbers)
      };
    } else {
      // Categorical column
      const uniqueValues = [...new Set(values)];
      return {
        name: header,
        type: 'categorical' as const,
        values: uniqueValues.slice(0, 20) // Limit to 20 unique values
      };
    }
  });
  
  return { columns, data };
};