import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class LoginNavBar extends Component {
  state = {};
  render() {
    return (
      <div className="Navbar-login">
        <ul className="Navbar-links">
          <li>
            <NavLink to="/adminLogin" className="individual-login">
              Admin
            </NavLink>
          </li>
          <li>
            <NavLink to="/studentlogin" className="individual-login">
              Student
            </NavLink>
          </li>
          <li>
            <NavLink to="/staffLogin" className="individual-login">
              Staff
            </NavLink>
          </li>
          <li>
            <NavLink to="/PlacementOfficerLogin" className="individual-login">
              Placement Officer
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

export default LoginNavBar;
