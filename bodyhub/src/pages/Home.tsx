import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <div className="left-container">
        <h2 className="home-opener">Discover a New Approach to Health and Fitness</h2>
        <p className="home-information">
          Embark on your wellness journey with personalised insights, progress tracking, and nutritional guidance - all
          completely free.
        </p>
        <p className="home-information">Ready to get started?</p>
        <Link to="/Calculation">
          <button className="home-button">Click Here to Start</button>
        </Link>
      </div>

      <div className="right-container">
        <p>Insert image here</p>
      </div>
    </div>
  );
};

export default Home;
