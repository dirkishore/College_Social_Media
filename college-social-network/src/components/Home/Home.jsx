import React, { useEffect, useState } from "react";

import Sidebar from "../Sidebar/SideBar";
import ProfileBar from "../../components/ProfileBar/ProfileBar";
import FriendsList from "../../components/FriendList/FriendsList.jsx";
import StaffList from "../../components/StaffList/StaffList";

import Topbar from "../Topbar/Topbar";
import Feeds from "../Feeds/Feeds";

function Home({ userDetails }, props) {
  return (
    <div className="Home">
      <Topbar userDetails={userDetails} />
      <Sidebar userDetails={userDetails} />
      <FriendsList userDetails={userDetails} />
      <StaffList userDetails={userDetails} />
      <Feeds userDetails={userDetails} />

      <ProfileBar userDetails={userDetails} />
    </div>
  );
}

export default Home;
