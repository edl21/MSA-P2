import React from "react";
import SignUpForm from "../components/SignUpForm";
import "./SignUp.css";

const SignUp: React.FC = () => {
  return (
    <div>
      <h1 className="sign-up-title">Sign Up</h1>
      <SignUpForm />
    </div>
  );
};

export default SignUp;
