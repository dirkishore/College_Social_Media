import { Link } from "react-router-dom";
import { Buffer } from "buffer";
import axios from "axios";
import "./OnlineFriends.css";

export default function OnlineFriends({ friend, setCurrentChat, userDetails }) {
  var friendProfilePic = friend.Profile
    ? Buffer.from(friend.Profile.data.data, "base64").toString("base64")
    : "";

  const handleClick = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/chat/getConversation/${userDetails.userId}/${friend._id}`
      );
      setCurrentChat(res.data);
      if (!res.data) {
        try {
          const res = await axios.post(
            `http://localhost:5000/chat/newConversation`,
            {
              senderId: userDetails.userId,
              receiverId: friend._id,
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
        <img src={`data:image/png;base64,${friendProfilePic}`} alt="" />
        <span className="friendOnline"></span>
      </div>
      <div className="userName">
        <p>{friend.Name}</p>
      </div>
    </li>
  );
}
