import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Buffer } from "buffer";
import "./PlacementOfficerProfileBar.css";

export default function PlacementOfficerProfileBar({
  placementOfficerDetails,
}) {
  let [StudentProfilePic, setStudentProfilePic] = useState();

  StudentProfilePic =
    placementOfficerDetails.placementOfficerProfile !== undefined
      ? placementOfficerDetails.placementOfficerProfile
      : "";

  var base64String = Buffer.from(StudentProfilePic, "base64").toString(
    "base64"
  );

  return (
    <div className="placementOfficerProfileBar">
      <div className="placementOfficerdetails">
        <div className="placementOfficerProfilePic">
          <img
            className="student-profile-pic"
            src={`data:image/png;base64,${base64String}`}
            alt=""
          />
        </div>
        <h4 className="placementOfficerName">
          {placementOfficerDetails.placementOfficerName}
        </h4>

        <div className="placementOfficerdetail">
          <p>{placementOfficerDetails.placementOfficerEmail}</p>
          <p>
            Experience: {placementOfficerDetails.placementOfficerExperience}{" "}
          </p>
          <p>
            Specialization:{" "}
            {placementOfficerDetails.placementOfficerSpecialization}{" "}
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
