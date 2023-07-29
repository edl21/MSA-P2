import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <div className="about-container">
      <div className="left-container">
        <h1 className="site-name">BodyHub</h1>
        <h2 className="about-title">About</h2>
      </div>
      <div className="right-container">
        <p className="about-text">
          We are committed to empowering individuals to take charge of their 
          own health and fitness journey. By providing personalized health 
          information, including crucial insights into one's Body Mass Index 
          (BMI) and Total Daily Energy Expenditure (TDEE), we allow 
          individuals to make informed decisions based on their unique bodies 
          and fitness goals.
        </p>
        <p className="about-text">
          Our Maintenance Calorie Counter is designed to provide an estimate 
          of the number of calories needed to maintain current weight. This 
          tool is instrumental for individuals aiming to either create a 
          calorie surplus for weight gain or a calorie deficit for weight 
          loss. We believe in equipping everyone with essential knowledge 
          and tools to embark on their personal health and wellness journey.
        </p>
      </div>
    </div>
  );
};

export default About;
