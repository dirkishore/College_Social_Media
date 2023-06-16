import React, { useEffect } from "react";
import FriendsList from "../../components/FriendList/FriendsList";
import ProfileBar from "../../components/ProfileBar/ProfileBar";
import Share from "../../components/Share/Share";
import Sidebar from "../../components/Sidebar/SideBar";
import StaffList from "../../components/StaffList/StaffList";
import Topbar from "../../components/Topbar/Topbar";

export default function CollegeEventsPage({ userDetails }) {
  useEffect(() => {}, []);

  return (
    <div>
      <Topbar userDetails={userDetails} />

      <Sidebar userDetails={userDetails} />

      <ProfileBar userDetails={userDetails} />

      <FriendsList userDetails={userDetails} />

      <StaffList userDetails={userDetails} />

      <div className="placements">
        <div className="placementsWrapper">
          <Share userDetails={userDetails} />
        </div>
      </div>
    </div>
  );
}
