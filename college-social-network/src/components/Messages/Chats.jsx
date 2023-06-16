import React, { useContext, useEffect, useRef, useState } from "react";
import Topbar from "../Topbar/Topbar";
import ProfileBar from "../../components/ProfileBar/ProfileBar";
import Sidebar from "../Sidebar/SideBar";
import "./Chats.css";
import Conversation from "./Conversations";
import Messages from "./Messages";
import profilePic from "../../images/profilePic.jpg";
import send from "../../images/send.png";
import axios from "axios";
import { io } from "socket.io-client";
import { AuthContext } from "../Context/AuthContext";
import { Buffer } from "buffer";
import ChatOnline from "../ChatOnline/ChatOnline";
import StaffSideBar from "../StaffComponents/StaffSideBar/StaffSideBar";

function Chats({ userId, userDetails }) {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState("");
  const [arrivalMessages, setArrivalMessages] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [onlineStaffs, setOnlineStaffs] = useState([]);
  const socket = useRef();
  const { user } = useContext(AuthContext);
  const ScrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8000");

    socket.current.on("getMessage", (data) => {
      setArrivalMessages({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessages &&
      currentChat?.members.includes(arrivalMessages.sender) &&
      setMessages((prev) => [...prev, arrivalMessages]);
  }, [arrivalMessages, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", userDetails.userId);

    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        userDetails.userFollowings.filter((f) =>
          users.some((u) => u.userId === f)
        )
      );
      setOnlineStaffs(
        userDetails.userStaffs.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [userId, userDetails.staffUserId]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/chat/getConversation/" + userId
        );
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
  }, [userId]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/message/getMessage/" + currentChat._id
        );
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      sender: userId,
      text: newMessages,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find((member) => member !== userId);

    socket.current.emit("sendMessage", {
      senderId: userId,
      receiverId,
      text: newMessages,
    });

    try {
      const res = await axios.post(
        "http://localhost:5000/message/newMessage",
        message
      );
      setMessages([...messages, res.data]);
      setNewMessages("");
    } catch (error) {
      console.log(error);
    }
  };

  const [receiver, setReceiver] = useState(null);
  const receiverId = currentChat
    ? currentChat.members.find((member) => member !== userId)
    : "";
  console.log(receiverId);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/student/getStudentDetailsbyId/" + receiverId
        );
        setReceiver(res.data.result);
        console.log(res.data.result);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [currentChat]);

  const receiverProfilePic =
    receiver !== null
      ? Buffer.from(receiver.Profile.data.data, "base64").toString("base64")
      : "";

  const receiverName = receiver ? receiver.Name : "";

  useEffect(() => {
    ScrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="Chats">
      <Topbar userDetails={userDetails} />
      {userDetails.userId && <Sidebar userDetails={userDetails} />}
      {userDetails.staffUserId && <StaffSideBar userDetails={userDetails} />}
      <ChatOnline
        userDetails={userDetails}
        onlineUsers={onlineUsers}
        onlineStaffsList={onlineStaffs}
        setCurrentChat={setCurrentChat}
      />

      <div className="chats-list">
        <h4>Chats</h4>
        <div className="previousChats">
          {conversations.map((c) => {
            return (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={userId} />
              </div>
            );
          })}
        </div>
      </div>

      <div className="chatBox">
        <div className="chatBoxWrapper">
          {currentChat ? (
            <>
              <div className="UserDetails">
                <img
                  src={`data:image/png;base64,${receiverProfilePic}`}
                  alt=""
                />
                <p>{receiverName}</p>
              </div>
              <div className="chatBoxTop">
                {messages.map((m) => {
                  return (
                    <div ref={ScrollRef}>
                      <Messages
                        receiverProfilePic={receiverProfilePic}
                        message={m}
                        own={m.sender === userId}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="ChatBoxInput">
                <form onSubmit={handleSend}>
                  <input
                    name="chatMessageInput"
                    className="chatMessageInput"
                    onChange={(e) => setNewMessages(e.target.value)}
                    value={newMessages}
                  ></input>
                  <img src={send} alt="" onClick={handleSend} />
                </form>
              </div>
            </>
          ) : (
            <span className="noConversatiion">
              Open a conversation to start a chat
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chats;
