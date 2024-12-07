import { UserButton } from "@clerk/clerk-react";
import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header>
      <nav className="navbar" aria-label="Primary Navigation">
        <div className="navbar-logo"></div>
        <ul className="navbar-links">
          <li>
            <NavLink exact to="/" activeClassName="active" className="nav-link">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/chat" activeClassName="active" className="nav-link">
              Chat bot
            </NavLink>
          </li>
          <li>
            <NavLink to="/About" activeClassName="active" className="nav-link">
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Contact"
              activeClassName="active"
              className="nav-link"
            >
              Contact
            </NavLink>
          </li>
        </ul>
        <div className="user-button">
          <UserButton />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
