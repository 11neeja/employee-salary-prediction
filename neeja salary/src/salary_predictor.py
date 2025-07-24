import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

class SalaryPredictor:
    def __init__(self):
        self.model = LinearRegression()
        
    def prepare_data(self, data_path):
        # Load and prepare the data
        df = pd.read_csv(data_path)
        X = df[['years_experience']] 
        y = df['salary']
        return train_test_split(X, y, test_size=0.2, random_state=42)
        
    def train_model(self, X_train, y_train):
        # Train the linear regression model
        self.model.fit(X_train, y_train)
        
    def evaluate_model(self, X_test, y_test):
        # Make predictions and evaluate
        y_pred = self.model.predict(X_test)
        mse = mean_squared_error(y_test, y_pred)
        r2 = r2_score(y_test, y_pred)
        return mse, r2
    
    def predict_salary(self, years_experience):
        # Predict salary for given years of experience
        return self.model.predict([[years_experience]])[0]

def main():
    predictor = SalaryPredictor()
    X_train, X_test, y_train, y_test = predictor.prepare_data('salary_data.csv')
    predictor.train_model(X_train, y_train)
    mse, r2 = predictor.evaluate_model(X_test, y_test)
    
    print(f"Model Performance - MSE: {mse:.2f}, R2: {r2:.2f}")
    print(f"Predicted salary for 5 years experience: ${predictor.predict_salary(5):.2f}")

if __name__ == "__main__":
    main()