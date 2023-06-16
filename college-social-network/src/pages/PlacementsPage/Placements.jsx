import axios from "axios";
import React, { useEffect, useState } from "react";
import "./PlacementPage.css";
import FriendsList from "../../components/FriendList/FriendsList";
import Post from "../../components/Post/Post";
import ProfileBar from "../../components/ProfileBar/ProfileBar";
import Share from "../../components/Share/Share";
import Sidebar from "../../components/Sidebar/SideBar";
import StaffList from "../../components/StaffList/StaffList";
import Topbar from "../../components/Topbar/Topbar";

export default function Placements({ userDetails }) {
  const [placementPost, setPlacementPost] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/post/placementPost").then((result) => {
      setPlacementPost(
        result.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    });
  }, []);
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
          {placementPost.map((p) => {
            return <Post key={p._id} post={p} userDetails={userDetails} />;
          })}
        </div>
      </div>
    </div>
  );
}
