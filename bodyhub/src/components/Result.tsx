import React, { useState } from "react";
import { Button, Snackbar } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import "./Result.css";

interface State {
  bmi: string;
  tdee: number;
  weight: number;
  height: number;
}

const Result: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bmi, tdee, weight, height } = location.state as State;

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSave = async () => {
    const username = sessionStorage.getItem("username");

    if (!username) {
      console.error("User not logged in");
      return;
    }

    const roundedTdee = Math.round(tdee);

    const payload = {
      weight: weight,
      height: height,
      tdee: roundedTdee,
      username: username,
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
        setMessage("Data saved successfully");
        setOpen(true);

        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        const errorDetails = await response.text();
        console.log("Error saving data", errorDetails);
      }
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
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
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={message}
      />
    </div>
  );
};

export default Result;
