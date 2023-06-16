import React from "react";
import SearchBar from "../../SearchBar/SearchBar";

import { Link } from "react-router-dom";
import { Buffer } from "buffer";
import { NavLink } from "react-router-dom";
import { color } from "@mui/system";
import StaffSearchBar from "../StaffSearchBar/StaffSearchBar";

export default function StaffTopBar({ userDetails }) {
  var base64String =
    userDetails.profile !== undefined
      ? Buffer.from(userDetails.profile, "base64").toString("base64")
      : "";
  var username = userDetails ? userDetails.Name : "";

  return (
    <div className="topBarContainer">
      <div className="topBarLeft">
        <Link to="/Home" style={{ textDecoration: "none", color: "#ffffff" }}>
          <span>SocioPedia</span>
        </Link>
      </div>

      <div className="topBarCenter">
        <StaffSearchBar userDetails={userDetails} />
      </div>

      <div className="topBarRight">
        <div className="topBarIcons">
          <div className="messages">
            <span className="badge bg-danger">1</span>
            <i class="fi fi-sr-comments"></i>
          </div>
          <div className="notification">
            <span className="badge bg-danger">1</span>
            <i class="fi fi-ss-bell"></i>
          </div>
          <div className="person">
            <NavLink to={`/ProfilePage/${username}`}>
              <img src={`data:image/png;base64,${base64String}`} alt="" />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
