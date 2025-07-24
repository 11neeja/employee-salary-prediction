import { Dataset } from '../types';

export const defaultDataset: Dataset = {
  columns: [
    { name: 'age', type: 'numeric', min: 17, max: 90 },
    { name: 'workclass', type: 'categorical', values: ['Private', 'Self-emp-not-inc', 'Self-emp-inc', 'Federal-gov', 'Local-gov', 'State-gov', 'Without-pay', 'Never-worked'] },
    { name: 'education', type: 'categorical', values: ['Bachelors', 'Some-college', '11th', 'HS-grad', 'Prof-school', 'Assoc-acdm', 'Assoc-voc', '9th', '7th-8th', '12th', 'Masters', '1st-4th', '10th', 'Doctorate', '5th-6th', 'Preschool'] },
    { name: 'education_num', type: 'numeric', min: 1, max: 16 },
    { name: 'marital_status', type: 'categorical', values: ['Married-civ-spouse', 'Divorced', 'Never-married', 'Separated', 'Widowed', 'Married-spouse-absent', 'Married-AF-spouse'] },
    { name: 'occupation', type: 'categorical', values: ['Tech-support', 'Craft-repair', 'Other-service', 'Sales', 'Exec-managerial', 'Prof-specialty', 'Handlers-cleaners', 'Machine-op-inspct', 'Adm-clerical', 'Farming-fishing', 'Transport-moving', 'Priv-house-serv', 'Protective-serv', 'Armed-Forces'] },
    { name: 'relationship', type: 'categorical', values: ['Wife', 'Own-child', 'Husband', 'Not-in-family', 'Other-relative', 'Unmarried'] },
    { name: 'race', type: 'categorical', values: ['White', 'Asian-Pac-Islander', 'Amer-Indian-Eskimo', 'Other', 'Black'] },
    { name: 'sex', type: 'categorical', values: ['Female', 'Male'] },
    { name: 'capital_gain', type: 'numeric', min: 0, max: 99999 },
    { name: 'capital_loss', type: 'numeric', min: 0, max: 4356 },
    { name: 'hours_per_week', type: 'numeric', min: 1, max: 99 },
    { name: 'native_country', type: 'categorical', values: ['United-States', 'Cambodia', 'England', 'Puerto-Rico', 'Canada', 'Germany', 'Outlying-US(Guam-USVI-etc)', 'India', 'Japan', 'Greece', 'South', 'China', 'Cuba', 'Iran', 'Honduras', 'Philippines', 'Italy', 'Poland', 'Jamaica', 'Vietnam', 'Mexico', 'Portugal', 'Ireland', 'France', 'Dominican-Republic', 'Laos', 'Ecuador', 'Taiwan', 'Haiti', 'Columbia', 'Hungary', 'Guatemala', 'Nicaragua', 'Scotland', 'Thailand', 'Yugoslavia', 'El-Salvador', 'Trinadad&Tobago', 'Peru', 'Hong', 'Holand-Netherlands'] }
  ],
  data: [],
  targetColumn: 'salary'
};