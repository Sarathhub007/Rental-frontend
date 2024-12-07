import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About Us</h1>

      <section className="intro">
        <p>
          Welcome to <strong>Rental Managment</strong>! We are a passionate team dedicated to delivering 
          innovative solutions that make a difference. Our mission is to solve real-world problems with 
          cutting-edge technology and creativity.
        </p>
      </section>

      <section className="mission">
        <h2>Our Mission</h2>
        <p>
          Our mission is to provide exceptional products and services that simplify your life. 
          We focus on creating user-friendly solutions that deliver value and reliability.
        </p>
      </section>
      <section className="history">
        <h2>Our Journey</h2>
        <p>
          Founded in 2021, <strong>Rental Management</strong> started as a small initiative to solve everyday 
          challenges. Over the years, we have grown into a trusted name, thanks to our commitment to quality 
          and innovation.
        </p>
      </section>

      <section className="team">
        <h2>Meet the Team</h2>
        <div className="team-members">
          <div className="team-member">
            <img src="team-member1.jpg" alt="Sai Pallavi" />
            <h3>Sai Pallavi </h3>
            <p>Founder </p>
          </div>
          <div className="team-member">
            <img src="team-member2.jpg" alt="Vaishnavi" />
            <h3>Vaishnavi</h3>
            <p>Developer</p>
          </div>
        </div>
      </section>

      <section className="values">
        <h2>Our Core Values</h2>
        <ul>
          <li>Innovation: Continuously improving our products.</li>
          <li>Integrity: Transparency and honesty in everything we do.</li>
          <li>Customer Focus: Prioritizing user satisfaction.</li>
        </ul>
      </section>

      <section className="achievements">
        <h2>Milestones</h2>
        <p>
          Over the past year, we’ve reached over 10,000 users, won multiple innovation awards, and launched 
          several successful products.
        </p>
      </section>

      <section className="call-to-action">
        <h2>Connect With Us</h2>
        <p>
          Have questions or want to collaborate? Reach out to us at <a href="mailto:2300030250@kluniversity.in">2300030250@kluniversity.in</a> or follow us on our social media channels.
        </p>
      </section>
    </div>
  );
};

export default About;
