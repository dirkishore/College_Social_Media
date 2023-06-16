import { useContext, useRef } from "react";
import LoginNavBar from "../Login-NavBar";
import "./StudentLogin.css";
import { studentLoginCall } from "../../ApiCalls";
import { AuthContext } from "../Context/AuthContext";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function StudentLogin({
  onEmail,
  onPassword,
  onSubmit,
  loginErrorMessage,
}) {
  const studentEmail = useRef();
  const studentPassword = useRef();
  const navigate = useNavigate();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    studentLoginCall(
      {
        Email: studentEmail.current.value,
        Password: studentPassword.current.value,
      },
      dispatch
    );
  };
  console.log(user);

  return (
    <div className="studentLogin">
      <LoginNavBar />
      <div className="login-box">
        <form onSubmit={handleLogin}>
          <h3>Student Login</h3>

          <div className="inputBox">
            <input
              type="text"
              name="login-email"
              required={true}
              onChange={onEmail}
              id="login-email"
              ref={studentEmail}
            />
            <span id="email">Email</span>
          </div>

          <div className="inputBox">
            <input
              type="password"
              name="login-pass"
              required={true}
              onChange={onPassword}
              id="login-pass"
              minLength="5"
              ref={studentPassword}
            />
            <span id="pass">Password</span>
          </div>
          <span className="login-error-msg">{loginErrorMessage}</span>

          <div className="studentLoginBtn">
            <button type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="inherit" size="18px" />
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
