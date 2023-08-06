import React, { useState, ChangeEvent, FormEvent } from "react";
import { TextField, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./SignUpForm.css";

interface Values {
  firstName: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm: React.FC = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState<Values>({
    firstName: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [open, setOpen] = useState(false);

  const handleChange =
    (prop: keyof Values) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Email validation
    const re = /\S+@\S+\.\S+/; // Regular expression to check for valid email format
    if (!re.test(values.email)) {
      alert("Please enter a valid email"); // Alert if the email is invalid
      return;
    }

    // Password confirmation validation
    if (values.password !== values.confirmPassword) {
      alert("Passwords do not match"); // Alert if the passwords do not match
      return;
    }

    // Register user
    registerUser({
      username: values.firstName,
      password: values.password,
      email: values.email,
    });

    setOpen(true);
    setTimeout(() => {
      setOpen(false);
      navigate("/");
    }, 2000); // Delay navigation so that the snackbar can be seen
  };

  const registerUser = (user: {
    username: string;
    password: string;
    email: string;
  }) => {
    fetch("http://bodyhub.azurewebsites.net/api/User", {
      // URL to register API endpoint
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data (e.g., navigate to login page)
      })
      .catch((error) => {
        console.error("There was an error!", error);
        // Handle error (e.g., show an error message to the user)
      });
  };

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
          id="first-name"
          label="First Name"
          variant="standard"
          value={values.firstName}
          onChange={handleChange("firstName")}
        />
        <TextField
          id="surname"
          label="Surname"
          variant="standard"
          value={values.surname}
          onChange={handleChange("surname")}
        />
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
        <TextField
          id="confirm-password"
          label="Confirm Password"
          variant="standard"
          type="password"
          value={values.confirmPassword}
          onChange={handleChange("confirmPassword")}
        />
        <button type="submit" className="sign-up-button">
          Sign Up
        </button>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Registration successful!"
        />
      </form>
    </div>
  );
};

export default SignUpForm;
