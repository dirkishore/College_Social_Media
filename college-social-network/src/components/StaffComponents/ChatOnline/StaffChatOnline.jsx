import React, { useEffect, useState } from "react";
import "./StaffChatOnline.css";
import axios from "axios";
import OnlineFriends from "../OnlineFriends/OnlineFriends";

export default function ChatOnline({
  userDetails,
  onlineUsers,
  setCurrentChat,
}) {
  const [StudentsList, setStudentsList] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [onlineFriends, setOnleFriends] = useState([]);

  useEffect(() => {
    const getStaffFriends = async () => {
      try {
        const students = await axios.get(
          "http://localhost:5000/Faculty/getStaffStudents/" +
            userDetails.staffUserId
        );

        setStudentsList(students.data);
      } catch (error) {
        console.log(error);
      }
    };
    getStaffFriends();
  }, [userDetails.userId]);

  useEffect(() => {
    console.log(onlineUsers);
    setOnleFriends(StudentsList.filter((f) => onlineUsers.includes(f._id)));
  }, [StudentsList, onlineUsers]);

  return (
    <div className="onlineFriends">
      <div className="onlineFriendsHeader">
        <h5>Students Online</h5>
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
  );
}
