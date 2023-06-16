import ProfileBar from "../../components/ProfileBar/ProfileBar";
import Sidebar from "../../components/Sidebar/SideBar";
import Topbar from "../../components/Topbar/Topbar";

import React, { useContext, useEffect, useState } from "react";
import { Add, Remove } from "@mui/icons-material";
import axios from "axios";
import { Buffer } from "buffer";
import { useLocation } from "react-router-dom";
import Post from "../../components/Post/Post";
import { AuthContext } from "../../components/Context/AuthContext";
import StaffTopBar from "../../components/StaffComponents/StaffTopBar/StaffTopBar";
import StaffList from "../../components/StaffComponents/StaffList/StaffList";
import StudentsList from "../../components/StaffComponents/StudentsList/StudentsList";

export default function StaffSearchResult({ userDetails }) {
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
      setFollowStatus(userDetails.staffStudent.includes(data.state.studentId));
    } else if (data.state.staffId) {
      setFollowStatus(userDetails.userFollowings.includes(data.state.staffId));
    }
  }, [userDetails.staffUserId, data.state.studentId]);

  const handleFollowing = async () => {
    if (data.state.studentId) {
      try {
        if (followStatus) {
          await axios.put(
            "http://localhost:5000/faculty/unfollowStudent/" +
              data.state.studentId,
            { userId: userDetails.staffUserId }
          );
          // dispatch({ type: "UNFOLLOW", payload: data.state.studentId });
        } else {
          await axios.put(
            "http://localhost:5000/faculty/followStudent/" +
              data.state.studentId,
            { userId: userDetails.staffUserId }
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
            "http://localhost:5000/faculty/unfollowStaff/" + data.state.staffId,
            { userId: userDetails.staffUserId }
          );
          // dispatch({ type: "UNFOLLOW", payload: data.state.studentId });
        } else {
          await axios.put(
            "http://localhost:5000/faculty/followStaff/" + data.state.staffId,
            { userId: userDetails.staffUserId }
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
        `http://localhost:5000/chat/getConversation/${userDetails.staffUserId}/${data.state.studentId}`
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="profile-page">
      <StaffTopBar userDetails={userDetails} />
      <Sidebar userDetails={userDetails} />
      <StudentsList userDetails={userDetails} />

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
            {(userDetails.staffUserId !== userId ||
              userDetails.staffUserId !== undefined) && (
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
