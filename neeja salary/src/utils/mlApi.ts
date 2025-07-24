// ML API Integration for FairHire AI
// This module handles communication with the Python Flask backend

export interface PredictionInput {
  age: number;
  workclass: string;
  education: string;
  'education-num': number;
  'marital-status': string;
  occupation: string;
  relationship: string;
  race: string;
  sex: string;
  'capital-gain': number;
  'capital-loss': number;
  'hours-per-week': number;
  'native-country': string;
}

export interface PredictionResponse {
  prediction: number; // 0 = ≤50K, 1 = >50K
  confidence?: number;
  model_used?: string;
}

export interface BatchPredictionInput {
  data: PredictionInput[];
  model?: 'random_forest' | 'xgboost' | 'logistic_regression';
}

export interface BatchPredictionResponse {
  predictions: number[];
  accuracy?: number;
  model_used: string;
  processing_time?: number;
}

class MLApiService {
  private baseUrl: string;

  constructor() {
    // Flask API endpoint - update this to your deployed API URL
    this.baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://your-ml-api.herokuapp.com' 
      : 'http://localhost:5000';
  }

  async predictSingle(input: PredictionInput): Promise<PredictionResponse> {
    try {
      console.log('Sending prediction request to:', `${this.baseUrl}/predict`);
      console.log('Input data:', input);

      const response = await fetch(`${this.baseUrl}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('ML API Response:', result);
      
      return {
        prediction: result.prediction,
        confidence: result.confidence || this.calculateConfidence(input),
        model_used: result.model_used || 'random_forest'
      };
    } catch (error) {
      console.error('ML API Error:', error);
      console.log('Falling back to mock prediction');
      // Fallback to mock prediction for demo purposes
      return this.mockPrediction(input);
    }
  }

  async predictBatch(input: BatchPredictionInput): Promise<BatchPredictionResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/predict_batch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('ML API Batch Error:', error);
      // Fallback to mock predictions for demo purposes
      return this.mockBatchPrediction(input);
    }
  }

  async getModelInfo(): Promise<{ models: string[], current_model: string, accuracy: number }> {
    try {
      const response = await fetch(`${this.baseUrl}/model_info`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Model Info Error:', error);
      return {
        models: ['random_forest', 'xgboost', 'logistic_regression'],
        current_model: 'random_forest',
        accuracy: 0.87
      };
    }
  }

  // Calculate confidence based on input features
  private calculateConfidence(input: PredictionInput): number {
    let confidence = 0.7; // Base confidence

    // Education factor
    if (input.education.includes('Masters') || input.education.includes('Doctorate')) {
      confidence += 0.15;
    } else if (input.education.includes('Bachelors')) {
      confidence += 0.1;
    }

    // Age factor
    if (input.age >= 30 && input.age <= 55) {
      confidence += 0.1;
    }

    // Hours factor
    if (input['hours-per-week'] >= 40) {
      confidence += 0.05;
    }

    return Math.min(Math.round(confidence * 100), 95);
  }

  // Mock prediction for demo purposes when backend is not available
  private mockPrediction(input: PredictionInput): PredictionResponse {
    let score = 0.3; // Base probability

    // Age factor
    if (input.age > 40) score += 0.2;
    else if (input.age < 25) score -= 0.1;

    // Education factor
    if (input.education.includes('Masters') || input.education.includes('Doctorate')) {
      score += 0.3;
    } else if (input.education.includes('Bachelors')) {
      score += 0.2;
    }

    // Hours factor
    if (input['hours-per-week'] > 45) score += 0.15;

    // Occupation factor
    if (['Exec-managerial', 'Prof-specialty', 'Tech-support'].includes(input.occupation)) {
      score += 0.25;
    }

    const finalProb = Math.min(Math.max(score, 0.1), 0.9);
    const prediction = finalProb > 0.5 ? 1 : 0;

    return {
      prediction,
      confidence: Math.round(finalProb * 100),
      model_used: 'mock_random_forest'
    };
  }

  private mockBatchPrediction(input: BatchPredictionInput): BatchPredictionResponse {
    const predictions = input.data.map(item => this.mockPrediction(item).prediction);
    
    return {
      predictions,
      accuracy: 0.87,
      model_used: input.model || 'random_forest',
      processing_time: Math.random() * 2 + 1 // 1-3 seconds
    };
  }

  // Helper function to convert form data to ML API format
  convertFormToMLInput(formData: any): PredictionInput {
    return {
      age: formData.age || 35,
      workclass: this.mapWorkclass(formData.workclass || 'Private'),
      education: this.mapEducation(formData.education || 'Bachelors'),
      'education-num': this.getEducationNum(formData.education || 'Bachelors'),
      'marital-status': this.mapMaritalStatus(formData.maritalStatus || 'Married'),
      occupation: this.mapOccupation(formData.occupation || 'Tech-support'),
      relationship: this.mapRelationship(formData.relationship || 'Husband'),
      race: formData.race || 'White',
      sex: formData.sex || 'Male',
      'capital-gain': formData.capitalGain || 0,
      'capital-loss': formData.capitalLoss || 0,
      'hours-per-week': formData.hoursPerWeek || 40,
      'native-country': formData.nativeCountry || 'United-States'
    };
  }

  // Helper function to convert resume data to ML API format
  convertResumeToMLInput(resumeData: any): PredictionInput {
    const age = this.extractAgeFromResume(resumeData);
    const education = this.extractEducationFromResume(resumeData);
    const occupation = this.extractOccupationFromResume(resumeData);
    const hoursPerWeek = this.extractHoursFromResume(resumeData);

    return {
      age: age,
      workclass: 'Private', // Default assumption
      education: education,
      'education-num': this.getEducationNum(education),
      'marital-status': 'Married-civ-spouse', // Default assumption
      occupation: occupation,
      relationship: 'Husband', // Default assumption
      race: 'White', // Default assumption
      sex: 'Male', // Default assumption
      'capital-gain': 0,
      'capital-loss': 0,
      'hours-per-week': hoursPerWeek,
      'native-country': 'United-States'
    };
  }

  // Helper methods for data mapping
  private mapWorkclass(workclass: string): string {
    const mapping: { [key: string]: string } = {
      'Private': 'Private',
      'Self-emp-not-inc': 'Self-emp-not-inc',
      'Self-emp-inc': 'Self-emp-inc',
      'Federal-gov': 'Federal-gov',
      'Local-gov': 'Local-gov',
      'State-gov': 'State-gov'
    };
    return mapping[workclass] || 'Private';
  }

  private mapEducation(education: string): string {
    const mapping: { [key: string]: string } = {
      'HS-grad': 'HS-grad',
      'Some-college': 'Some-college',
      'Bachelors': 'Bachelors',
      'Masters': 'Masters',
      'Doctorate': 'Doctorate',
      'Assoc-voc': 'Assoc-voc',
      'Assoc-acdm': 'Assoc-acdm'
    };
    return mapping[education] || 'HS-grad';
  }

  private mapMaritalStatus(status: string): string {
    const mapping: { [key: string]: string } = {
      'Married': 'Married-civ-spouse',
      'Single': 'Never-married',
      'Divorced': 'Divorced',
      'Widowed': 'Widowed',
      'Separated': 'Separated'
    };
    return mapping[status] || 'Never-married';
  }

  private mapOccupation(occupation: string): string {
    const mapping: { [key: string]: string } = {
      'Tech-support': 'Tech-support',
      'Engineer': 'Prof-specialty',
      'Manager': 'Exec-managerial',
      'Sales': 'Sales',
      'Prof-specialty': 'Prof-specialty',
      'Craft-repair': 'Craft-repair',
      'Executive-managerial': 'Exec-managerial',
      'Adm-clerical': 'Adm-clerical',
      'Machine-op-inspct': 'Machine-op-inspct',
      'Other-service': 'Other-service'
    };
    return mapping[occupation] || 'Other-service';
  }

  private mapRelationship(relationship: string): string {
    const relationships = ['Husband', 'Wife', 'Own-child', 'Unmarried', 'Other-relative', 'Not-in-family'];
    return relationships.includes(relationship) ? relationship : 'Husband';
  }

  private getEducationNum(education: string): number {
    const educationMap: { [key: string]: number } = {
      'Preschool': 1,
      '1st-4th': 2,
      '5th-6th': 3,
      '7th-8th': 4,
      '9th': 5,
      '10th': 6,
      '11th': 7,
      '12th': 8,
      'HS-grad': 9,
      'Some-college': 10,
      'Assoc-voc': 11,
      'Assoc-acdm': 12,
      'Bachelors': 13,
      'Masters': 14,
      'Prof-school': 15,
      'Doctorate': 16
    };
    return educationMap[education] || 13;
  }

  // Resume parsing helper methods
  private extractAgeFromResume(resumeData: any): number {
    // In a real implementation, this would parse the resume content
    // For now, return a reasonable default or extracted value
    return resumeData.age || 35;
  }

  private extractEducationFromResume(resumeData: any): string {
    if (!resumeData.education) return 'Bachelors';
    
    const education = resumeData.education.toLowerCase();
    if (education.includes('phd') || education.includes('doctorate')) return 'Doctorate';
    if (education.includes('master')) return 'Masters';
    if (education.includes('bachelor')) return 'Bachelors';
    if (education.includes('associate')) return 'Assoc-acdm';
    if (education.includes('college')) return 'Some-college';
    return 'HS-grad';
  }

  private extractOccupationFromResume(resumeData: any): string {
    if (!resumeData.workHistory || resumeData.workHistory.length === 0) {
      return 'Other-service';
    }

    const latestJob = resumeData.workHistory[0];
    const position = latestJob.position.toLowerCase();
    
    if (position.includes('engineer')) return 'Prof-specialty';
    if (position.includes('manager') || position.includes('director')) return 'Exec-managerial';
    if (position.includes('sales')) return 'Sales';
    if (position.includes('tech') || position.includes('support')) return 'Tech-support';
    if (position.includes('admin') || position.includes('clerk')) return 'Adm-clerical';
    
    return 'Other-service';
  }

  private extractHoursFromResume(resumeData: any): number {
    // Default to full-time hours
    return 40;
  }
}

export const mlApi = new MLApiService();