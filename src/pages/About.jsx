import React from "react";
import "../assets/About.css";

const About = () => {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <p>
        Welcome to our website! We are dedicated to providing high-quality products
        and exceptional service. Our mission is to make your experience seamless and enjoyable.
      </p>
      <div className="about-content">
        <img
          src="https://png.pngtree.com/png-clipart/20240428/original/pngtree-work-experience-and-job-concept-png-image_14964732.png"
          alt="About us"
          className="about-image"
        />
        <div className="about-text">
          <h2>Our Story</h2>
          <p>
            We started our journey with a passion for excellence. Over the years, we have
            grown into a trusted brand, offering the best quality products in the industry.
          </p>
          <h2>Why Choose Us?</h2>
          <p>
            - High-quality products <br />
            - Exceptional customer service <br />
            - Competitive pricing <br />
            - Customer satisfaction guaranteed
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
