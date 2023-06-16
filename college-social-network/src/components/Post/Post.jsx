import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Buffer } from "buffer";
import { debounce } from "lodash";
import { LeafPoll, Result } from "react-leaf-polls";
import "react-leaf-polls/dist/index.css";

import "./Post.css";
import "../CommentSection/CommentSectionStyle.css";
import axios from "axios";
import { format } from "timeago.js";
import CommentSection from "../CommentSection/CommentSection";
import postComment from "../../images/send.png";
import CommentSectionPopUp from "../PopUps/CommentSectionPopUp";

function Post({ post, userDetails }, props) {
  const [postLikes, setPostLikes] = useState([post.Likes][0].length);

  const [PostTotalComments, setPostTotalComments] = useState(
    [post.Comments][0].length
  );

  const [allComments, setAllComments] = useState([]);
  const [allVideoComments, setAllVideoComments] = useState([]);
  const [allArticleComments, setAllArticleComments] = useState([]);

  const [commentSectionShow, setcommentSectionShow] = useState("none");
  const [commentSectionPopUp, setCommentSectionPopUp] = useState(false);

  const [pollResult, setPollResult] = useState([]);

  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  if (post.Photo) {
    const base64String = Buffer.from(post.Photo.data.data, "base64").toString(
      "base64"
    );
    var photosrc = `data:image/png;base64,${base64String}`;
    var display = "flex";
  } else {
    display = "none";
  }

  if (post.Video) {
    const videoString = Buffer.from(post.Video.data.data, "base64").toString(
      "base64"
    );
    var videoSrc = `data:video/mp4;base64,${videoString}`;
    var displayVideo = "flex";
  } else {
    displayVideo = "none";
  }

  if (post.ArticleContent) {
    var displayArticle = "flex";
  } else {
    var displayArticle = "none";
  }

  if (post.PlacementHeadLine) {
    var placementOfficerDisplay = "flex";
  } else {
    placementOfficerDisplay = "none";
  }

  const [isLiked, setIsLiked] = useState(false);
  const [activeBtn, setActiveBtn] = useState("none");

  useEffect(() => {
    if (post.Photo) setIsLiked(post.Likes.includes(userDetails.userId));
    else if (post.Video) setIsLiked(post.Likes.includes(userDetails.userId));
    else if (post.ArticleContent)
      setIsLiked(post.Likes.includes(userDetails.userId));
  }, [userDetails.userId, post.Likes]);

  //Post Like
  function handleLikeClick() {
    if (activeBtn === "none") {
      setPostLikes(isLiked ? postLikes - 1 : postLikes + 1);
      setActiveBtn("like");

      if (post.Photo) {
        setIsLiked(!isLiked);

        axios
          .put("http://localhost:5000/post/onlikes/" + post._id, {
            userId: userDetails.userId,
          })
          .then((result) => {
            console.log(result.data);
          });
      } else if (post.ArticleContent) {
        setIsLiked(!isLiked);

        axios
          .put("http://localhost:5000/post/onArticleLikes/" + post._id, {
            userId: userDetails.userId,
          })
          .then((result) => {
            console.log(result.data);
          });
      } else if (post.Video) {
        setIsLiked(!isLiked);

        axios
          .put("http://localhost:5000/post/onVideoLikes/" + post._id, {
            userId: userDetails.userId,
          })
          .then((result) => {
            console.log(result.data);
          });
      }

      return;
    }

    if (activeBtn === "like") {
      setPostLikes(isLiked ? postLikes - 1 : postLikes + 1);
      setActiveBtn("none");

      if (post.Photo) {
        setIsLiked(!isLiked);

        axios
          .put("http://localhost:5000/post/onlikes/" + post._id, {
            userId: userDetails.userId,
          })
          .then((result) => {
            console.log(result.data);
          });
      } else if (post.ArticleContent) {
        setIsLiked(!isLiked);

        axios
          .put("http://localhost:5000/post/onArticleLikes/" + post._id, {
            userId: userDetails.userId,
          })
          .then((result) => {
            console.log(result.data);
          });
      } else if (post.Video) {
        setIsLiked(!isLiked);

        axios
          .put("http://localhost:5000/post/onVideoLikes/" + post._id, {
            userId: userDetails.userId,
          })
          .then((result) => {
            console.log(result.data);
          });
      }

      return;
    }
  }

  //Post Comment
  function onComment(e) {
    setPostComment(e.target.value);
  }

  function onCommentPost(e) {
    e.preventDefault();

    if (post.Photo) {
      let CommentProfile = Buffer.from(userDetails.profile, "base64").toString(
        "base64"
      );

      const formData = new FormData();
      formData.append("id", post._id);
      formData.append("Name", userDetails.Name);
      formData.append("Profile", CommentProfile);
      formData.append("Comment", PostComment);

      axios
        .put("http://localhost:5000/post/onPostComment", formData)
        .then(() => {
          setPostComment("");

          let id = {
            id: post._id,
          };
          axios
            .post("http://localhost:5000/post/allComments", id)
            .then((result) => {
              setAllComments(result.data.result);
            });
        })
        .catch((err) => console.log(err));
    }

    if (post.Video) {
      let CommentProfile = Buffer.from(userDetails.profile, "base64").toString(
        "base64"
      );
      const formData = new FormData();
      formData.append("id", post._id);
      formData.append("Name", userDetails.Name);
      formData.append("Profile", CommentProfile);
      formData.append("Comment", PostComment);

      axios
        .put("http://localhost:5000/post/onVideoComment", formData)
        .then(() => {
          setPostComment("");

          let id = {
            id: post._id,
          };
          axios
            .post("http://localhost:5000/post/allVideoComments", id)
            .then((result) => {
              setAllVideoComments(result.data.result);
            });
        })
        .catch((err) => console.log(err));
    }

    if (post.ArticleContent) {
      let CommentProfile = Buffer.from(userDetails.profile, "base64").toString(
        "base64"
      );
      const formData = new FormData();
      formData.append("id", post._id);
      formData.append("Name", userDetails.Name);
      formData.append("Profile", CommentProfile);
      formData.append("Comment", PostComment);

      axios
        .put("http://localhost:5000/post/onArticleComment", formData)
        .then(() => {
          setPostComment("");

          let id = {
            id: post._id,
          };
          axios
            .post("http://localhost:5000/post/allArticleComments", id)
            .then((result) => {
              setAllArticleComments(result.data.result);
            });
        })
        .catch((err) => console.log(err));
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", debounce(handleScroll, 200));

    if (post.Photo) {
      setAllComments(post.Comments);
    }

    if (post.Video) {
      setAllVideoComments(post.Comments);
    }

    if (post.ArticleContent) {
      setAllArticleComments(post.Comments);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const startVideo = () => {
    videoRef.current.pause();
    setPlaying(false);
  };

  const pauseVideo = () => {
    videoRef.current.play();
    setPlaying(true);
  };

  const handleScroll = (e) => {
    if (playing) {
      pauseVideo();
    }
  };

  const handleVideoPress = () => {
    if (playing) {
      startVideo();
    } else {
      pauseVideo();
    }
  };

  const [PostComment, setPostComment] = useState("");

  const [PostDetails, setPostDetails] = useState();
  const PostProfile = PostDetails
    ? Buffer.from(PostDetails.Profile.data.data, "base64").toString("base64")
    : "";

  const PostName = PostDetails ? PostDetails.Name : "";

  useEffect(() => {
    axios
      .get("http://localhost:5000/student/getStudentDetailsbyId/" + post.userId)
      .then((result) => {
        setPostDetails(result.data.result);
      });
  }, []);

  const [placementOfficerDetails, setPlacementOfficerDetails] = useState();

  useEffect(() => {
    axios
      .get(
        "http://localhost:5000/placementOfficer/placementOfficerDetailsById/" +
          post.userId
      )
      .then((result) => {
        setPlacementOfficerDetails(result.data);
      });
  }, []);

  const placementOfficerName = placementOfficerDetails
    ? placementOfficerDetails.Name
    : "";
  const PlacementProfile = placementOfficerDetails
    ? Buffer.from(placementOfficerDetails.Profile.data.data, "base64").toString(
        "base64"
      )
    : "";

  const resData = post.pollQuestion ? post.pollChoice : [];

  // Object keys may vary on the poll type (see the 'Theme options' table below)
  const customTheme = {
    textColor: "black",
    fontSize: "20px",
    mainColor: "#00B87B",
    backgroundColor: "rgb(255,255,255)",
    alignment: "center",
  };

  function vote() {
    try {
      let pollVotes = {
        userId: userDetails.userId,
        resData,
      };
      axios
        .put("http://localhost:5000/poll/pollResult/" + post._id, pollVotes)
        .then((result) => console.log(result))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="feed">
      <div className="feedWrapper">
        <div className="feedTop">
          <div className="feedTopLeft">
            {PostDetails && (
              <div className="userDetails">
                <img
                  className="profileOnPost"
                  src={`data:image/png;base64,${PostProfile}`}
                  alt=""
                />
                <Link to="/SearchResult" state={{ id: post.userId }}>
                  <p className="userName">{PostName}</p>
                </Link>
                <div className="uploadedTime">
                  <p>{format(post.createdAt)}</p>
                </div>
              </div>
            )}

            <div
              className="userDetails"
              style={{ display: placementOfficerDisplay }}
            >
              <img
                className="profileOnPost"
                src={`data:image/png;base64,${PlacementProfile}`}
                alt=""
              />
              <Link to="/SearchResult" state={{ id: post.userId }}>
                <p className="userName">{placementOfficerName}</p>
              </Link>
              <div className="uploadedTime">
                <p>{format(post.createdAt)}</p>
              </div>
            </div>
          </div>
          <div className="feedTopRight">
            <i class="fi fi-rr-menu-dots-vertical"></i>
          </div>
        </div>

        <div className="feedCenter">
          <p className="description">{post?.Caption}</p>
          <div className="post" style={{ display }}>
            <img src={photosrc} />
          </div>
          <div className="videoPost" style={{ display: displayVideo }}>
            <video
              width="fit-content"
              height="400"
              autoPlay
              loop
              ref={videoRef}
              onClick={handleVideoPress}
              src={videoSrc}
            >
              {/* <source src={videoSrc} type="video/mp4" /> */}
            </video>
          </div>

          <div
            className="articlePost"
            style={{
              display: displayArticle,
              flexDirection: "column",
            }}
          >
            <div className="articleHeadLine">
              <h5>{post.ArticleHeadLine}</h5>
            </div>
            <br />
            <div>
              <p className="articleContent" style={{ whiteSpace: "pre-line" }}>
                {post.ArticleContent}
              </p>
            </div>
          </div>

          <div className="poll">
            <div className="pollAnswer">
              <LeafPoll
                type="multiple"
                question={post.pollQuestion}
                results={resData}
                theme={customTheme}
                onVote={vote}
                isVoted={false}
              />
            </div>
          </div>
          <div>
            <div className="articleHeadLine">
              <h5>{post.PlacementHeadLine}</h5>
            </div>
            <br />
            <div>
              <p className="articleContent" style={{ whiteSpace: "pre-line" }}>
                {post.PlacementContent}
              </p>
            </div>
          </div>
        </div>

        <div className="feedBottom">
          <div className="like-comment-share">
            <div className="like-btn">
              <button
                className={`btn ${activeBtn === "like" ? "like-active" : ""}`}
                onClick={handleLikeClick}
              >
                <i class="fi fi-rr-social-network"></i>
                {/* <span className="like-count">{post.Likes} likes</span> */}
                <span className="like-count">{postLikes} likes</span>
              </button>
            </div>

            <div
              className="comment-btn"
              onClick={() => {
                setCommentSectionPopUp(true);
              }}
            >
              <i class="fi fi-rs-comment"></i>
              <span className="comment">{PostTotalComments} comments</span>
            </div>

            <div className="share-btn">
              <i class="fi fi-rr-paper-plane"></i>
              <span className="Share">share</span>
            </div>
          </div>
        </div>
      </div>

      <CommentSectionPopUp
        setCommentSectionPopUp={setCommentSectionPopUp}
        trigger={commentSectionPopUp}
      >
        <h4>Comments</h4>
        <div className="comment-section">
          {allComments.map((comment) => {
            return (
              <CommentSection
                ProfileOnComment={comment.Profile.data}
                NameOnComment={comment.Name}
                Comment={comment.Comment}
              />
            );
          })}
          {allVideoComments.map((comment) => {
            return (
              <CommentSection
                ProfileOnComment={comment.Profile.data}
                NameOnComment={comment.Name}
                Comment={comment.Comment}
              />
            );
          })}
          {allArticleComments.map((comment) => {
            return (
              <CommentSection
                ProfileOnComment={comment.Profile.data}
                NameOnComment={comment.Name}
                Comment={comment.Comment}
              />
            );
          })}
        </div>
        <div className="add-comment">
          <form onSubmit={onCommentPost}>
            <input
              type="text"
              className="commentInput"
              placeholder="Add a comment..."
              name="Comment"
              onChange={onComment}
              value={PostComment}
              autoComplete="off"
            />
            <img
              src={postComment}
              alt=""
              className="postCommentIcon"
              onClick={onCommentPost}
            />
          </form>
        </div>
      </CommentSectionPopUp>
    </div>
  );
}

export default Post;
