import React from "react";
import "./About.css";

const About: React.FC = () => {
  return (
    <div className="about-container">
      <h2>About Us</h2>
      <p>
        Our goal is to empower users with vital health information and tools to manage their wellness effectively. We
        provide a convenient way to estimate maintenance calories and determine BMI (Body Mass Index).
      </p>
      <p>
        Our maintenance calorie counter allows users to understand their caloric needs to maintain their current weight.
        This can serve as a stepping stone towards personal health goals. Whether you're aiming for weight loss, muscle
        gain, or simply maintaining a healthy lifestyle, understanding your maintenance calories can pave the way.
      </p>
      <p>
        By knowing this, users can effectively create a calorie surplus or deficit based on their unique goals.
      </p>
    </div>
  );
};

export default About;
