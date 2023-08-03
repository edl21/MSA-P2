import React from "react";
import { Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import "./Result.css";

interface State {
  bmi: string;
  tdee: number;
  weight: number; // Assuming you pass this value
  height: number; // Assuming you pass this value
}

const Result: React.FC = () => {
  const location = useLocation();
  const { bmi, tdee, weight, height } = location.state as State;

  const handleSave = async () => {
    const username = sessionStorage.getItem("username"); // Assuming you've saved the username here after login

    // If no username found, handle error
    if (!username) {
      console.error("User not logged in");
      return;
    }

    const payload = {
      weight: weight,
      height: height,
      bmi: bmi,
      tdee: tdee,
      username: username, // Add the username here
      // Other necessary fields, such as userId if needed
    };

    try {
      const response = await fetch("http://localhost:5127/api/BMI", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 404) {
        console.log("Endpoint not found");
      } else if (response.ok) {
        console.log("Data saved successfully");
      } else {
        const errorDetails = await response.text(); // Use .text() instead of .json() for non-200 responses
        console.log("Error saving data", errorDetails);
      }
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };

  return (
    <div className="result-container">
      <h1>Your Results</h1>
      <p>
        <b>BMI:</b> {bmi}
      </p>
      <p>
        <b>TDEE:</b> {tdee} calories/day
      </p>
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save Results
      </Button>
    </div>
  );
};

export default Result;
