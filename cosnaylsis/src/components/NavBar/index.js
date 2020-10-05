import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="NavBar">
      <span className="NavBar-left-items"> 
        <NavLink to="/">COSNALYSIS</NavLink>
      </span>
      <span className="NavBar-right-items">
        <NavLink to="/about">ABOUT</NavLink>
      </span>
    </nav>
  );
};

export default NavBar;