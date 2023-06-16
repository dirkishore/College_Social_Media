import React, { Component, useEffect, useState } from "react";
import { Buffer } from "buffer";
import "../Styles/PostPermissions.css";
import accept from "../images/accept.png";
import cancel from "../images/cancel.png";
import axios from "axios";
import { LeafPoll } from "react-leaf-polls";

function NotPermittedPostList(props, { post }) {
  const [postDetails, setPostDetails] = useState();

  if (props.post.Photo) {
    var Post = Buffer.from(props.post.Photo.data.data, "base64").toString(
      "base64"
    );
    var PostDisplay = "flex";
  } else {
    PostDisplay = "none";
  }

  if (props.post.Video) {
    var Video = Buffer.from(props.post.Video.data.data, "base64").toString(
      "base64"
    );
    var videoDisplay = "flex";
  } else {
    videoDisplay = "none";
  }

  if (props.post.ArticleContent) {
    var articleDisplay = "flex";
  } else {
    articleDisplay = "none";
  }

  function updatePostStatus() {
    let status = {
      id: props.id,
      PostStatus: true,
    };

    if (props.post.Photo) {
      axios
        .put("http://localhost:5000/post/updateStatus", status)
        .then(() => {
          console.log("status updated", status.PostStatus);
          window.location.reload();
        })
        .catch((err) => console.log(err));
    } else if (props.post.Video) {
      axios
        .put("http://localhost:5000/post/updateVideoStatus", status)
        .then(() => {
          console.log("Video post status updated", status.PostStatus);
          window.location.reload();
        })
        .catch((err) => console.log(err));
    } else if (props.post.pollQuestion) {
      axios
        .put("http://localhost:5000/post/updatePollStatus", status)
        .then(() => {
          console.log("poll status updated", status.PostStatus);
          window.location.reload();
        })
        .catch((err) => console.log(err));
    } else if (props.post.ArticleContent) {
      axios
        .put("http://localhost:5000/post/updateArticleStatus", status)
        .then(() => {
          console.log("Article status updated", status.PostStatus);
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  }
  useEffect(() => {
    axios
      .get(
        "http://localhost:5000/student/getStudentDetailsbyId/" + props.userId
      )
      .then((result) => {
        setPostDetails(result.data.result);
      });
  }, []);

  const PostProfile = postDetails
    ? Buffer.from(postDetails.Profile.data.data, "base64").toString("base64")
    : "";

  const PostName = postDetails ? postDetails.Name : "";

  const resData = props.post.pollQuestion ? props.post.pollChoice : [];

  // Object keys may vary on the poll type (see the 'Theme options' table below)
  const customTheme = {
    textColor: "black",
    fontSize: "20px",
    mainColor: "#00B87B",
    backgroundColor: "rgb(255,255,255)",
    alignment: "center",
  };

  return (
    <div className="singlePost">
      <div className="userDetail">
        <img
          className="profileOnPost"
          src={`data:image/png;base64,${PostProfile}`}
          alt=""
        />
        <p>{PostName}</p>
      </div>
      <div className="Post" style={{ display: PostDisplay }}>
        <p>{props.post.Caption}</p>
        <img
          style={{ width: "25vw", height: "auto" }}
          src={`data:image/png;base64,${Post}`}
        />
      </div>
      <div style={{ display: videoDisplay }}>
        <video
          style={{ width: "25vw", height: "50vh" }}
          autoPlay
          loop
          src={`data:video/mp4;base64,${Video}`}
        ></video>
      </div>
      <div className="Articledisplay" style={{ display: articleDisplay }}>
        <div className="Heading">
          <h5>{props.post.ArticleHeadLine}</h5>
        </div>
        <div className="Articlecontent">
          <p>{props.post.ArticleContent}</p>
        </div>
      </div>
      <div className="pollDisplay">
        <LeafPoll
          type="multiple"
          question={props.post.pollQuestion}
          results={resData}
          theme={customTheme}
          isVoted={false}
        />
      </div>
      <div className="setPermission">
        <div className="acceptPermission" onClick={updatePostStatus}>
          <img src={accept} alt="" />
          <p>Accept</p>
        </div>
        <div className="declinePermission">
          <img src={cancel} alt="" />
          <p>Decline</p>
        </div>
      </div>
    </div>
  );
}

export default NotPermittedPostList;
