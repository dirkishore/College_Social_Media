import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { staffLoginCall } from "../../ApiCalls";
import { AuthContext } from "../../components/Context/AuthContext";
import LoginNavBar from "../../components/Login-NavBar";
import "../../components/StaffComponents/StaffLogin/StaffLogin.css";
import StaffLoginForm from "../../components/StaffComponents/StaffLogin/StaffLogin";

export default function StaffLogin({ onEmail, onPassword }) {
  const staffEmail = useRef();
  const staffPassword = useRef();
  const navigate = useNavigate();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    staffLoginCall(
      {
        staffEmail: staffEmail.current.value,
        staffPassword: staffPassword.current.value,
      },
      dispatch
    );
  };

  console.log(user);

  return (
    <div className="staffLogin">
      <div className="staffLoginNavbar">
        <LoginNavBar />
      </div>
      <div className="staffLoginContainer">
        <StaffLoginForm
          handleLogin={handleLogin}
          staffEmail={staffEmail}
          staffPassword={staffPassword}
          user={user}
          isFetching={isFetching}
          onEmail={onEmail}
          onPassword={onPassword}
        />
      </div>
    </div>
  );
}
