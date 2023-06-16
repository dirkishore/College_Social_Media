import React, { Component, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  json,
  NavLink,
} from "react-router-dom";
import "../Styles/PostPermissions.css";
import axios from "axios";
import NotPermittedPostList from "./NotPermittedPostList";
import AdminSideBar from "./AdminConponents/AdminSidebar/AdminSideBar";

function PostPermissions() {
  const [notPermittedPost, setNotPermittedPost] = useState([]);

  useEffect(() => {
    GetNotPermittedPost();
  }, []);

  const GetNotPermittedPost = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/post/notPermittedPost"
      );
      setNotPermittedPost(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="PostPermissionsPage">
      <div className="header"></div>
      <AdminSideBar />

      <div className="PostPermissions">
        <div className="PostList">
          {notPermittedPost.map((single) => {
            return (
              <NotPermittedPostList
                post={single}
                userId={single.userId}
                id={single._id}
                PostStatus={single.PostStatus}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PostPermissions;
