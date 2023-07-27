import React from "react";
import CalculationForm from '../components/CalculationForm';
import "./Calculation.css";

const Calculation: React.FC = () => {
  return (
    <div>
      <h1 className="calculation-title">Calculation</h1>
      <CalculationForm />
    </div>
  );
};

export default Calculation;
