import React, { useContext, useEffect, useState } from "react";
import { Add, Remove } from "@mui/icons-material";
import axios from "axios";
import { Buffer } from "buffer";

import { useLocation } from "react-router-dom";

import "./SearchResult.css";

import FriendsList from "../../components/FriendList/FriendsList.jsx";
import Topbar from "../Topbar/Topbar";
import Sidebar from "../Sidebar/SideBar";
import ProfileBar from "../ProfileBar/ProfileBar";
import Post from "../Post/Post";
import { AuthContext } from "../Context/AuthContext";
import StaffList from "../StaffList/StaffList";

function SearchResult({ userDetails }, props) {
  const [userPost, setUserPost] = useState([]);

  let [userProfilePic, setuserProfilePic] = useState();
  const [userName, setuserName] = useState();
  const [userId, setUserId] = useState();
  const [userFollowers, setUserFollowers] = useState([]);
  const [userFollowings, setUserFollowings] = useState([]);
  let [userEmail, setuserEmail] = useState();
  let [StudentRollNo, setStudentRollNo] = useState();
  let [StudentPhoneNo, setStudentPhoneNo] = useState();
  let [StudentDegree, setStudentDegree] = useState();
  let [Department, setDepartment] = useState();
  let [StudentYear, setStudentYear] = useState();

  const [followStatus, setFollowStatus] = useState(false);
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  let data = useLocation();

  useEffect(() => {
    if (data.state.studentId) {
      axios
        .get(
          "http://localhost:5000/post/displayAllUserPost/" +
            data.state.studentId
        )
        .then((result) => {
          setUserPost(result.data);
        });

      axios
        .get(
          "http://localhost:5000/student/getStudentDetailsbyId/" +
            data.state.studentId
        )
        .then((result) => {
          setuserProfilePic(result.data.result.Profile.data.data);
          setUserId(result.data.result._id);
          setUserFollowers(result.data.result.followers);
          setUserFollowings(result.data.result.following);
          setuserName(result.data.result.Name);
          setuserEmail(result.data.result.Email);
          setStudentRollNo(result.data.result.Rollno);
          setStudentDegree(result.data.result.Degree);
          setDepartment(result.data.result.Branch);
          setStudentYear(result.data.result.Year);
        });
    }
    if (data.state.staffId) {
      axios
        .get(
          "http://localhost:5000/post/displayAllUserPost/" + data.state.staffId
        )
        .then((result) => {
          setUserPost(result.data);
        });

      axios
        .get(
          "http://localhost:5000/Faculty/getFacultyById/" + data.state.staffId
        )
        .then((result) => {
          console.log(result.data);
          setuserName(result.data.staffName);
          setuserEmail(result.data.staffEmail);
          setuserProfilePic(result.data.staffProfilePic.data.data);
          setDepartment(result.data.staffDepartment);
          setUserFollowers(result.data.followers);
          setUserFollowings(result.data.following);
        });
    }
  }, [data.state.studentId, data.state.staffId, followStatus]);

  var base64String =
    userProfilePic !== undefined
      ? Buffer.from(userProfilePic, "base64").toString("base64")
      : "";

  useEffect(() => {
    console.log(userDetails);
    if (data.state.studentId) {
      setFollowStatus(
        userDetails.userFollowings.includes(data.state.studentId)
      );
    } else if (data.state.staffId) {
      setFollowStatus(userDetails.Staffs.includes(data.state.staffId));
    }
  }, [userDetails.userId, data.state.studentId]);

  const handleFollowing = async () => {
    if (data.state.studentId) {
      try {
        if (followStatus) {
          await axios.put(
            "http://localhost:5000/student/unfollow/" + data.state.studentId,
            { userId: userDetails.userId }
          );
          // dispatch({ type: "UNFOLLOW", payload: data.state.studentId });
        } else {
          await axios.put(
            "http://localhost:5000/student/follow/" + data.state.studentId,
            { userId: userDetails.userId }
          );
          // dispatch({ type: "FOLLOW", payload: data.state.studentId });
        }
      } catch (error) {
        console.log(error);
      }
      setFollowStatus(!followStatus);
    } else if (data.state.staffId) {
      try {
        if (followStatus) {
          await axios.put(
            "http://localhost:5000/student/unfollowStaff/" + data.state.staffId,
            { userId: userDetails.userId }
          );
          // dispatch({ type: "UNFOLLOW", payload: data.state.studentId });
        } else {
          await axios.put(
            "http://localhost:5000/student/followStaff/" + data.state.staffId,
            { userId: userDetails.userId }
          );
          // dispatch({ type: "FOLLOW", payload: data.state.studentId });
        }
      } catch (error) {
        console.log(error);
      }
      setFollowStatus(!followStatus);
    }
  };

  const handleChat = () => {
    try {
      const res = axios.get(
        `http://localhost:5000/chat/getConversation/${userDetails.userId}/${data.state.studentId}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="profile-page">
      <Topbar userDetails={userDetails} />
      <Sidebar userDetails={userDetails} />
      <FriendsList userDetails={userDetails} />
      <StaffList userDetails={userDetails} />

      <div className="profileContainer">
        <div className="profile">
          <div className="Profile-pic">
            <img
              htmlFor="profilePic"
              className="profile-image"
              id="profile-image"
              src={`data:image/png;base64,${base64String}`}
              alt=""
            />
          </div>
          <div className="student-details">
            <p className="student-name">{userName}</p>
            <p className="student-Rollno">{StudentRollNo}</p>
            <p className="student-Email">{userEmail}</p>
            <p className="student-Degree">
              {StudentYear} {Department} {StudentDegree}
            </p>
            <div className="followers">
              <p>{userPost.length} posts</p>
              <p>{userFollowers.length} followers</p>
              <p>{userFollowings.length} following</p>
            </div>
            {(userDetails.userId !== userId ||
              userDetails.userId !== undefined) && (
              <div className="ChatBtn">
                <button type="button" onClick={handleChat} className="message">
                  Chat
                </button>
                <button onClick={handleFollowing} className="AddFriend">
                  {followStatus ? "Unfollow" : "Follow"}
                  {followStatus ? <Remove /> : <Add />}
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="userPost">
          {userPost.map((p) => {
            return <Post key={p._id} post={p} userDetails={userDetails} />;
          })}
        </div>
      </div>

      <ProfileBar userDetails={userDetails} />
    </div>
  );
}

export default SearchResult;
