import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';  // Import your styles

const Home = () => {
    return (
        <div className="home-container">
            <h1 className="home-title">Welcome to BodyHub</h1>
            <h2 className="home-description">For all things body! Our goal is to lead you to a better future! Take your first step with us!</h2>
            <Link to="/bmi">
                <button className="home-button">Calculate your BMI</button>
            </Link>
        </div>
    )
}

export default Home;

