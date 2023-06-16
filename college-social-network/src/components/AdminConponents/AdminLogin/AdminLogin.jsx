import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminLogin.css";
import LoginNavBar from "../../Login-NavBar";

function AdminLogin({ loginErrorMessage }) {
  const [AdminUserName, setAdminUserName] = useState(
    localStorage.getItem("Email")
  );
  const [AdminPassword, setAdminPassword] = useState(
    localStorage.getItem("Password")
  );

  function onUserName(e) {
    setAdminUserName(e.target.value);
    window.localStorage.setItem("Email", e.target.value);
  }

  function onPassword(e) {
    setAdminPassword(e.target.value);
    window.localStorage.setItem("Password", e.target.value);
  }

  const navigate = useNavigate();
  function onSubmit(e) {
    e.preventDefault();

    console.log("clicked");
    const Admin = {
      AdminUserName: AdminUserName,
      AdminPassword: AdminPassword,
    };

    axios
      .post("http://localhost:5000/Admin/getAdmin", Admin)
      .then((result) => {
        if (result.data.message === "Login Successfully") {
          console.log("logged in");
          navigate("/AdminHomePage");
        } else {
          alert("login failed");
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="adminLogin">
      <LoginNavBar />
      <div className="adminLoginBox">
        <form onSubmit={onSubmit}>
          <h3>Admin Login</h3>

          <div className="inputBox userName">
            <input
              type="text"
              name="login-email"
              required={true}
              onChange={onUserName}
              className="adminLoginUsername"
              pattern="[A-Za-z0-9@]*"
            />
            <span id="email">Username</span>
          </div>

          <div className="inputBox">
            <input
              type="password"
              name="login-pass"
              required={true}
              onChange={onPassword}
              minLength="5"
              id="login-pass"
            />
            <span id="pass">Password</span>
          </div>
          <span className="login-error-msg">{loginErrorMessage}</span>

          <div className="loginBtn">
            <input type="submit" placeholder="Login" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
