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
  const location = useLocation(); // for accessing the router's current location
  const navigate = useNavigate(); // for navigating between routes
  // Extract relevant data from location's state
  const { bmi, tdee, weight, height } = location.state as State;

  // States for handling the Snackbar component and its message
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  // Function to save the calculated results
  const handleSave = async () => {
    // Retrieve username from session storage
    const username = sessionStorage.getItem("username");

    // Check if the user is logged in
    if (!username) {
      console.error("User not logged in");
      return;
    }

    // Round off the tdee value
    const roundedTdee = Math.round(tdee);

    // Create the payload for the POST request
    const payload = {
      weight: weight,
      height: height,
      tdee: roundedTdee,
      username: username,
    };

    try {
      // Send a POST request to save the data
      const response = await fetch("https://bodyhub.azurewebsites.net/api/BMI", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // Check response status and handle accordingly
      if (response.status === 404) {
        console.log("Endpoint not found");
      } else if (response.ok) {
        console.log("Data saved successfully");
        setMessage("Data saved successfully");
        setOpen(true);

        // Navigate to the home page after a delay of 3 seconds
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

  // Function to close the Snackbar
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
