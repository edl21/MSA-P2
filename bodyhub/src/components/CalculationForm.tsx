import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Button, TextField, MenuItem, FormControl } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "./CalculationForm.css";

interface FormValues {
  height: string;
  weight: string;
  age: string;
  gender: string;
  activity: string;
}

const CalculationForm: React.FC = () => {
  // Get the current user from AuthContext
  const { user } = useAuth();
  // Get the navigate function from react-router
  const navigate = useNavigate();

  // Redirect to the login page if the user is not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Initialize state for form values
  const [values, setValues] = useState<FormValues>({
    height: "",
    weight: "",
    age: "",
    gender: "",
    activity: "",
  });

  // Handler for form field changes
  const handleChange =
    (prop: keyof FormValues) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  // Function to check if all form fields are filled
  const allFieldsFilled = () => {
    for (let key in values) {
      if (!values[key as keyof FormValues]) {
        return false;
      }
    }
    return true;
  };

  // Handler for form submission
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    // Calculate BMI and TDEE (total daily energy expenditure)
    const heightInMeters = parseInt(values.height) / 100;
    const weightInKg = parseInt(values.weight);
    const age = parseInt(values.age);
    const bmi = (weightInKg / Math.pow(heightInMeters, 2)).toFixed(2);
    // Calculate BMR(basal metabolic rate) based on the gender
    const bmr =
      values.gender === "male"
        ? 10 * weightInKg + 6.25 * (heightInMeters * 100) - 5 * age + 5
        : 10 * weightInKg + 6.25 * (heightInMeters * 100) - 5 * age - 161;
    // Calculate TDEE based on the activity level
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

    // Navigate to the result page with the calculated BMI and TDEE
    navigate("/result", {
      state: {
        bmi: bmi,
        tdee: tdee,
        weight: weightInKg,
        height: heightInMeters * 100,
      },
    });
  };

  return user ? (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <TextField
          id="weight"
          label="Weight (in kg)"
          value={values.weight}
          onChange={handleChange("weight")}
        />
        <TextField
          id="height"
          label="Height (in cm)"
          value={values.height}
          onChange={handleChange("height")}
        />
        <TextField
          id="age"
          label="Age"
          value={values.age}
          onChange={handleChange("age")}
        />
        <FormControl>
          <TextField
            id="gender"
            value={values.gender}
            select
            label="Gender"
            onChange={handleChange("gender")}
          >
            <MenuItem value={"male"}>Male</MenuItem>
            <MenuItem value={"female"}>Female</MenuItem>
          </TextField>
        </FormControl>
        <FormControl>
          <TextField
            id="activity"
            value={values.activity}
            select
            label="Activity Level"
            onChange={handleChange("activity")}
          >
            <MenuItem value={"sedentary"}>Sedentary</MenuItem>
            <MenuItem value={"light"}>Light Exercise</MenuItem>
            <MenuItem value={"moderate"}>Moderate Exercise</MenuItem>
            <MenuItem value={"active"}>Active</MenuItem>
            <MenuItem value={"extra"}>Very Active</MenuItem>
          </TextField>
        </FormControl>
        <div className="calculation-button">
          <Button
            type="submit"
            disabled={!allFieldsFilled()}
            variant="contained"
            color="primary"
          >
            Calculate BMI and TDEE
          </Button>
        </div>
      </form>
    </div>
  ) : null;
};

export default CalculationForm;
