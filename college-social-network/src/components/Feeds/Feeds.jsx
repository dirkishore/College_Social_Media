import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Feeds.css";
import Post from "../Post/Post";
import Share from "../Share/Share";
import axios from "axios";

export default function Feeds({ userDetails }, props) {
  const [timeLinePost, setTimeLinePost] = useState([]);
  useEffect(() => {
    const fetchTimeLinePost = async () => {
      if (userDetails.userId) {
        var res = await axios.get(
          "http://localhost:5000/post/timeline/" + userDetails.userId
        );
      } else if (userDetails.staffUserId) {
        var res = await axios.get(
          "http://localhost:5000/post/stafftimeline/" + userDetails.staffUserId
        );
      }
      setTimeLinePost(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchTimeLinePost();
  }, [userDetails.userId, userDetails.staffUserId]);

  return (
    <div className="feeds">
      <div className="feedsWrapper">
        <Share userDetails={userDetails} />
        {timeLinePost.map((p) => {
          return <Post key={p._id} post={p} userDetails={userDetails} />;
        })}
      </div>
    </div>
  );
}
