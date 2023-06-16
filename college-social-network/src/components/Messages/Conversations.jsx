import React, { useEffect, useState } from "react";
import "./Chats.css";
import { Buffer } from "buffer";
import axios from "axios";

function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser);

    const getUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/student/getStudentDetailsbyId/" + friendId
        );
        setUser(res.data.result);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  let profilePic =
    user !== null
      ? Buffer.from(user.Profile.data.data, "base64").toString("base64")
      : "";

  let Name = user !== null ? user.Name : "";

  return (
    <div className="friend">
      <div className="profilePic">
        <img src={`data:image/png;base64,${profilePic}`} alt="" />
        <div className="OnlineBadge"></div>
      </div>
      <p>{Name}</p>
    </div>
  );
}

export default Conversation;
