import React, { useState, ChangeEvent } from "react";
import { TextField, Button, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [open, setOpen] = useState(false);

  const handleChange =
    (prop: string) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Email validation
    const re = /\S+@\S+\.\S+/;
    if (!re.test(values.email)) {
      alert("Please enter a valid email");
      return;
    }

    // You would need to verify the credentials here
    // For the purpose of this example, we'll just assume the login was successful

    setOpen(true);
    setTimeout(() => {
      setOpen(false);
      navigate("/");
    }, 2000);
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
