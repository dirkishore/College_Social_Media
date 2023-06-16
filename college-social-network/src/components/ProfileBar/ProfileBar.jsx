import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./ProfileBar.scss";
import { Buffer } from "buffer";
import { AuthContext } from "../Context/AuthContext";

function ProfileBar({ userDetails }, props) {
  let [StudentProfilePic, setStudentProfilePic] = useState();

  const user = useContext(AuthContext);

  StudentProfilePic =
    userDetails.profile !== undefined ? userDetails.profile : "";

  var base64String = Buffer.from(StudentProfilePic, "base64").toString(
    "base64"
  );

  return (
    <div className="profile-bar">
      <div className="student-details">
        <div className="StudentProfilePic">
          <img
            className="student-profile-pic"
            src={`data:image/png;base64,${base64String}`}
            alt=""
          />
        </div>
        <h4 className="student-name">{userDetails.Name}</h4>

        <div className="StudentDetails">
          <p>{userDetails.Rollno}</p>
          <p>{userDetails.PhoneNo}</p>
          <p>{userDetails.Email}</p>
          <p>
            {userDetails.year} {userDetails.Degree} {userDetails.Branch}
          </p>
        </div>
      </div>
      <div className="sign-out-btn">
        <NavLink to="/adminLogin">
          <input className="sign-out" type="button" value="Sign Out" />
        </NavLink>
      </div>
    </div>
  );
}

export default ProfileBar;
