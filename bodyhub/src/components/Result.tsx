import React from "react";
import { useLocation } from "react-router-dom";


interface State {
  bmi: number;
  tdee: number;
}

const Result: React.FC = () => {
    const location = useLocation();
    const { bmi, tdee } = location.state as { bmi: number; tdee: number };

  return (
    <div>
      <h1>Your Results</h1>
      <p>Your Body Mass Index (BMI) is: {bmi}</p>
      <p>Your Total Daily Energy Expenditure (TDEE) is: {tdee} calories</p>
    </div>
  );
};

export default Result;
