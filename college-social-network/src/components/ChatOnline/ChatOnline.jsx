import React, { useEffect, useState } from "react";
import "./ChatOnline.css";
import axios from "axios";
import OnlineFriends from "../OnlineFriends/OnlineFriends";
import StaffOnline from "../StaffList/StaffOnline";
import StaffsOnline from "../OnlineStaffs/StaffsOnline";

export default function ChatOnline({
  userDetails,
  onlineUsers,
  setCurrentChat,
  onlineStaffsList,
}) {
  const [friendsList, setFriendsList] = useState([]);
  const [staffList, setStaffList] = useState([]);

  const [onlineFriends, setOnlineFriends] = useState([]);
  const [onlineStaffs, setOnlineStaffs] = useState([]);

  useEffect(() => {
    const getStudentFriends = async () => {
      try {
        const friends = await axios.get(
          "http://localhost:5000/student/friends/" + userDetails.userId
        );

        setFriendsList(friends.data);
      } catch (error) {
        console.log(error);
      }
    };
    getStudentFriends();
  }, [userDetails.userId]);

  useEffect(() => {
    const getStudentStaffs = async () => {
      try {
        const staffs = await axios.get(
          "http://localhost:5000/student/staffs/" + userDetails.userId
        );
        setStaffList(staffs.data);
      } catch (error) {}
    };
    getStudentStaffs();
  }, [userDetails.userId]);

  useEffect(() => {
    setOnlineFriends(friendsList.filter((f) => onlineUsers.includes(f._id)));
  }, [friendsList, onlineUsers]);

  useEffect(() => {
    setOnlineStaffs(staffList.filter((s) => onlineStaffsList.includes(s._id)));
  }, [staffList, onlineUsers]);

  return (
    <>
      <div className="onlineFriends">
        <div className="onlineFriendsHeader">
          <h5>Friends Online</h5>
        </div>
        <div className="Friends">
          <ul>
            {onlineFriends.map((f) => {
              return (
                <OnlineFriends
                  setCurrentChat={setCurrentChat}
                  key={f._id}
                  friend={f}
                  userDetails={userDetails}
                />
              );
            })}
          </ul>
        </div>
      </div>

      <div className="onlineStaffs">
        <div className="onlineStaffHeader">
          <h5>Staffs Online</h5>
        </div>
        <div className="Staffs">
          <ul>
            {onlineStaffs.map((f) => {
              return (
                <StaffsOnline
                  setCurrentChat={setCurrentChat}
                  key={f._id}
                  staff={f}
                  userDetails={userDetails}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
