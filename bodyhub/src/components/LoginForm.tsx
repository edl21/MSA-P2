import React, { useState, ChangeEvent } from "react";
import { TextField, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import { useAuth } from "../AuthContext";

const LoginForm: React.FC = () => {
  const { login } = useAuth(); // Import the login function from the authentication context
  const navigate = useNavigate(); // navigate function from react-router-dom

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const handleChange =
    (prop: string) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Email validation
    const re = /\S+@\S+\.\S+/; // Regular expression to check for valid email format
    if (!re.test(values.email)) {
      alert("Please enter a valid email"); // Alert if the email is invalid
      return;
    }

    const url = "http://bodyhub.azurewebsites.net/api/User/Login"; // URL to  login API endpoint

    // Calls API to verify the credentials
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (response.status === 200) {
      const user = await response.json(); // Assuming the API returns user information
      login(user); // Update the authentication state
      setOpen(true); // Trigger the snackbar

      // Redirect to the home page after a delay of 2 seconds
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      setError("Invalid email or password."); // Show an error if the credentials are invalid
    }
  };

  // Handle the closing of the snackbar
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return; // Don't close the snackbar if the user clicked away
    }

    setOpen(false); // Close the snackbar
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
          id="email"
          label="Email"
          variant="standard"
          value={values.email}
          onChange={handleChange("email")}
        />
        <TextField
          id="password"
          label="Password"
          variant="standard"
          type="password"
          value={values.password}
          onChange={handleChange("password")}
        />
        {error && <div style={{ color: "red" }}>{error}</div>}
        <button type="submit" className="login-button">
          Login
        </button>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Login successful!"
        />
      </form>
    </div>
  );
};

export default LoginForm;
