import { useContext, useRef } from "react";
import { placementOfficerLoginCall } from "../../ApiCalls";
import { AuthContext } from "../../components/Context/AuthContext";
import LoginNavBar from "../../components/Login-NavBar";
import PlacementOfficerLogin from "../../components/PlacementOfficerComponents/PlacementOfficerLogin/PlacementOfficerLogin";

export default function PlacementOfficerLoginPage({ onEmail, onPassword }) {
  const Email = useRef();
  const Password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    placementOfficerLoginCall(
      {
        Email: Email.current.value,
        Password: Password.current.value,
      },
      dispatch
    );
  };
  console.log(user);
  return (
    <div className="placementOfficerLogin">
      <LoginNavBar />
      <div className="placementOfficerLoginContainer">
        <PlacementOfficerLogin
          handleLogin={handleLogin}
          staffEmail={Email}
          staffPassword={Password}
          user={user}
          isFetching={isFetching}
          onEmail={onEmail}
          onPassword={onPassword}
        />
      </div>
    </div>
  );
}
