import React from "react";
import Feeds from "../../components/Feeds/Feeds";
import ProfileBar from "../../components/ProfileBar/ProfileBar";

import StaffSideBar from "../../components/StaffComponents/StaffSideBar/StaffSideBar";
import StaffTopBar from "../../components/StaffComponents/StaffTopBar/StaffTopBar";
import StudentsList from "../../components/StaffComponents/StudentsList/StudentsList";
import StaffList from "../../components/StaffComponents/StaffList/StaffList";

export default function StaffHomePage({ userDetails }) {
  console.log(userDetails);
  return (
    <div className="StaffHome">
      <div className="StaffHomeTopBar">
        <StaffTopBar userDetails={userDetails} />
      </div>
      <div className="sideBar">
        <StaffSideBar userDetails={userDetails} />
      </div>
      <div className="staffProfileBar">
        <ProfileBar userDetails={userDetails} />
      </div>

      <Feeds userDetails={userDetails} />

      <StudentsList userDetails={userDetails} />

      <StaffList userDetails={userDetails} />
    </div>
  );
}
