import React, { useEffect, useState } from "react";
import $ from "jquery";
import axios from "axios";
import { Buffer } from "buffer";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router";
import "./ProfilePage.css";

import FriendsList from "../../components/FriendList/FriendsList.jsx";
import Topbar from "../Topbar/Topbar";
import Sidebar from "../Sidebar/SideBar";
import ProfileBar from "../ProfileBar/ProfileBar";
import Post from "../Post/Post";
import StaffList from "../StaffList/StaffList";

function ProfilePage({ userDetails }, props) {
  const [userPost, setUserPost] = useState([]);
  const [userFollowers, setUserFollowers] = useState(
    [userDetails.userFollowers][0].length
  );
  const [userFollowings, setUserFollowings] = useState(
    [userDetails.userFollowings][0].length
  );
  const [updatedProfilePic, setUpdatedProfilePic] = useState();

  const username = useParams().username;
  $(".fi.fi-rr-upload")
    .off()
    .on("click", function (e) {
      $("#profilePic-input").trigger("click");
    });

  useEffect(() => {
    if (userDetails) {
      let userId = {
        userId: userDetails.userId,
      };

      axios
        .post("http://localhost:5000/post/displayAllUserPost", userId)
        .then((result) => {
          setUserPost(
            result.data.sort((p1, p2) => {
              return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
          );
        });
    }
  }, [userDetails.userId]);

  function setProfilePic(e) {
    setUpdatedProfilePic(e.target.files[0]);
    console.log(updatedProfilePic);

    e.preventDefault();
    const formData = new FormData();
    formData.append("Profile", updatedProfilePic);
    formData.append("userId", userDetails.userId);

    axios
      .put(
        "http://localhost:5000/student/updateStudentProfile/" +
          userDetails.userId,
        formData
      )
      .then(() => console.log("profile pic updated"))
      .catch((err) => console.log(err));
  }
  var base64String =
    userDetails.profile !== undefined
      ? Buffer.from(userDetails.profile, "base64").toString("base64")
      : "";

  return (
    <div className="profile-page">
      <Topbar userDetails={userDetails} />
      <Sidebar userDetails={userDetails} />
      <FriendsList userDetails={userDetails} />
      <div className="profileContainer">
        <div className="profile">
          <div className="Profile-pic">
            <i class="fi fi-rr-upload"></i>

            <input
              type="file"
              name="Profile"
              id="profilePic-input"
              onChange={setProfilePic}
            />

            <img
              htmlFor="profilePic"
              className="profile-image"
              id="profile-image"
              src={`data:image/png;base64,${base64String}`}
              alt=""
            />
          </div>
          <div className="studentDetails">
            <p className="student-name">{userDetails.Name}</p>
            <p className="student-Rollno">{userDetails.Rollno}</p>
            <p className="student-Email">{userDetails.Email}</p>
            <p className="student-Degree">
              {userDetails.year} {userDetails.Degree} {userDetails.Branch}
            </p>
            <div className="followers">
              <p>{userPost.length} posts</p>
              <p>{userFollowers} followers</p>
              <p>{userFollowings} following</p>
            </div>
            <div className="EditProfile">
              <input type="button" className="editBtn" value="Edit Profile" />
            </div>
          </div>
        </div>
        <div className="userPost">
          {userPost.map((p) => {
            return <Post key={p._id} post={p} userDetails={userDetails} />;
          })}
        </div>
      </div>

      <ProfileBar userDetails={userDetails} />

      <StaffList userDetails={userDetails} />
    </div>
  );
}

export default ProfilePage;
