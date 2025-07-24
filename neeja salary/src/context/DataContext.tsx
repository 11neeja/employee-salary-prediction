import React, { createContext, useContext, useState } from 'react';
import { Dataset, Employee, ModelResult } from '../types';

interface DataContextType {
  dataset: Dataset | null;
  setDataset: (dataset: Dataset | null) => void;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  modelResults: ModelResult[];
  setModelResults: (results: ModelResult[]) => void;
  isTraining: boolean;
  setIsTraining: (training: boolean) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [selectedModel, setSelectedModel] = useState<string>('random_forest');
  const [modelResults, setModelResults] = useState<ModelResult[]>([]);
  const [isTraining, setIsTraining] = useState(false);

  return (
    <DataContext.Provider value={{
      dataset,
      setDataset,
      selectedModel,
      setSelectedModel,
      modelResults,
      setModelResults,
      isTraining,
      setIsTraining
    }}>
      {children}
    </DataContext.Provider>
  );
};