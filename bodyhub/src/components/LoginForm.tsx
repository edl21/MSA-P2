import React, { useState, ChangeEvent } from "react";
import { TextField, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import { useAuth } from "../AuthContext";

const LoginForm: React.FC = () => {
  const { login } = useAuth(); // Move this line inside the functional component
  const navigate = useNavigate();

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
    const re = /\S+@\S+\.\S+/;
    if (!re.test(values.email)) {
      alert("Please enter a valid email");
      return;
    }

    const url = "http://localhost:5127/api/User/Login";

    // Call your API to verify the credentials
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values), // Send the values as a JSON body
    });

    if (response.status === 200) {
      const user = await response.json(); // Assuming the API returns user information
      login(user); // Update the authentication state
      setOpen(true); // Trigger the snackbar
      navigate("/"); // Redirect to the home page
    } else {
      setError("Invalid email or password.");
    }
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
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
