import React from "react";
import LoginForm from "../components/LoginForm";
import "./Login.css";

const Login: React.FC = () => {
  return (
    <div>
      <h1 className="login-title">Login</h1>
      <LoginForm />
    </div>
  );
};

export default Login;
