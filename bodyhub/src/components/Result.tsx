import React from "react";
import { useLocation } from "react-router-dom";
import "./Result.css";

interface State {
  bmi: string;
  tdee: number;
}

const Result: React.FC = () => {
  const location = useLocation();
  const { bmi, tdee } = location.state as State;

  return (
    <div className="result-container">
      <h1>Your Results</h1>
      <p>
        <b>BMI:</b> {bmi}
      </p>
      <p>
        <b>TDEE:</b> {tdee} calories/day
      </p>
    </div>
  );
};

export default Result;
