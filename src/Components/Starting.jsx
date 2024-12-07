import React from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import "./Starting.css";

function Starting() {
  const { isLoaded, user } = useUser();
  const navigate = useNavigate();

  if (user) {
    navigate("/home");
  }

  return (
    <>
      <header className="header">
        <div className="header-links">
          <a href="/Sign-in" className="header-button">Sign In</a>
          <a href="/Sign-up" className="header-button">Sign Up</a>
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Rental Managment</h1>
          <p className="hero-subtitle">
            Your go-to platform for Property Sales & Rental Management.
          </p>
          <a href="/Sign-in" className="cta-button">Get Started</a>
        </div>
      </section>

      <section className="features-section">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature">
            <h3>Property Management</h3>
            <p>Effortlessly manage your properties and track tenants.</p>
          </div>
          <div className="feature">
            <h3>Rental Listings</h3>
            <p>Browse a wide range of rental properties to find your perfect match.</p>
          </div>
          <div className="feature">
            <h3>Tenant/Owner Management</h3>
            <p>Connect with property owners or tenants in one convenient platform.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2024 - Property Sales & Rental Management Platform</p>
      </footer>
    </>
  );
}

export default Starting;
