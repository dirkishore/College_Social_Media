import { CircularProgress } from "@mui/material";
import "./StaffLogin.css";

export default function StaffLogin({
  handleLogin,
  staffEmail,
  staffPassword,
  user,
  isFetching,
  onEmail,
  onPassword,
}) {
  return (
    <form onSubmit={handleLogin}>
      <h3>Staff Login</h3>

      <div className="inputBox">
        <input
          type="text"
          name="login-email"
          required={true}
          id="login-email"
          ref={staffEmail}
          onChange={onEmail}
        />
        <span id="email">Email</span>
      </div>

      <div className="inputBox">
        <input
          type="password"
          name="login-pass"
          required={true}
          id="login-pass"
          minLength="5"
          ref={staffPassword}
          onChange={onPassword}
        />
        <span id="pass">Password</span>
      </div>

      <div className="staffLoginBtn">
        <button type="submit" disabled={isFetching}>
          {isFetching ? (
            <CircularProgress color="inherit" size="18px" />
          ) : (
            "Login"
          )}
        </button>
      </div>
    </form>
  );
}
