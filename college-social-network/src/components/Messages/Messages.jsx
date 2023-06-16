import "./Chats.css";
import { format } from "timeago.js";

function Messages({ message, own, receiverProfilePic }) {
  return (
    <div className={own ? "Message own" : "Message"}>
      <div className="MessageTop">
        <div className={own ? "MessageInner own" : "MessageInner"}>
          <img src={`data:image/png;base64,${receiverProfilePic}`} alt="" />
          <p className="messageText">{message.text}</p>
        </div>
      </div>

      <div className="MessageButtom">
        <p>{format(message.createdAt)}</p>
      </div>
    </div>
  );
}

export default Messages;
