import React, { useState, ChangeEvent } from "react";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface FormValues {
  height: string;
  weight: string;
  age: string;
  gender: string;
  activity: string;
}

const CalculationForm: React.FC = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState<FormValues>({
    height: "",
    weight: "",
    age: "",
    gender: "",
    activity: "",
  });

  const handleChange =
    (prop: keyof FormValues) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
    
      // calculate BMI and TDEE based on input values
      const heightInMeters = parseInt(values.height) / 100;
      const weightInKg = parseInt(values.weight);
      const age = parseInt(values.age);
      const bmi = (weightInKg / Math.pow(heightInMeters, 2)).toFixed(2);
    
      let bmr: number;
    
      if (values.gender === "male") {
        bmr = 10 * weightInKg + 6.25 * heightInMeters - 5 * age + 5;
      } else {
        bmr = 10 * weightInKg + 6.25 * heightInMeters - 5 * age - 161;
      }
    
      let tdee: number;
    
      switch (values.activity) {
        case "sedentary":
          tdee = parseFloat((bmr * 1.2).toFixed(2));
          break;
        case "light":
          tdee = parseFloat((bmr * 1.375).toFixed(2));
          break;
        case "moderate":
          tdee = parseFloat((bmr * 1.55).toFixed(2));
          break;
        case "active":
          tdee = parseFloat((bmr * 1.725).toFixed(2));
          break;
        case "extra":
          tdee = parseFloat((bmr * 1.9).toFixed(2));
          break;
        default:
          tdee = bmr;
      }
      navigate("/result", { state: { bmi: bmi, tdee: tdee } });
    };
    

  return (
    <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
    >
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        maxWidth: "60%",
        margin: "auto",
        width: "30rem",
      }}
      >
      <TextField
        id="weight"
        label="Weight (in kg)"
        variant="standard"
        value={values.weight}
        onChange={handleChange("weight")}
      />
      <TextField
        id="height"
        label="Height (in cm)"
        variant="standard"
        value={values.height}
        onChange={handleChange("height")}
      />
      <TextField
        id="age"
        label="Age"
        variant="standard"
        value={values.age}
        onChange={handleChange("age")}
      />
      <button type="submit" className="calculation-button">Calculate BMI and TDEE</button>
    </form>
    </div>
  );
};

export default CalculationForm;
