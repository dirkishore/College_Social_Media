import axios from "axios";
import React from "react";
import { Buffer } from "buffer";
import "./StaffsOnline.css";

export default function StaffsOnline({ setCurrentChat, staff, userDetails }) {
  var staffProfilePic = staff.staffProfilePic
    ? Buffer.from(staff.staffProfilePic.data.data, "base64").toString("base64")
    : "";

  const handleClick = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/chat/getConversation/${userDetails.userId}/${staff._id}`
      );
      setCurrentChat(res.data);
      if (!res.data) {
        try {
          const res = await axios.post(
            `http://localhost:5000/chat/newConversation`,
            {
              senderId: userDetails.userId,
              receiverId: staff._id,
            }
          );
          setCurrentChat(res.data);
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li onClick={handleClick}>
      <div className="friendPic">
        <img src={`data:image/png;base64,${staffProfilePic}`} alt="" />
        <span className="friendOnline"></span>
      </div>
      <div className="userName">
        <p>{staff.staffName}</p>
      </div>
    </li>
  );
}
