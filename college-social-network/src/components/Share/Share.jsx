import React, { useEffect, useRef, useState } from "react";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import PollIcon from "@mui/icons-material/Poll";
import ArticleIcon from "@mui/icons-material/Article";
import { Buffer } from "buffer";
import "./Share.css";
import axios from "axios";
import { CancelRounded } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Share({ userDetails }) {
  const [file, setFile] = useState(null);
  const [videoFile, setvideoFile] = useState(null);
  const [poll, setPoll] = useState(false);
  const [pollQuestion, setpollQuestion] = useState(null);

  const desc = useRef();

  const shareProfile =
    userDetails.profile !== undefined
      ? Buffer.from(userDetails.profile, "base64").toString("base64")
      : "";

  const inputArr = [
    {
      id: 0,
      text: "",
      votes: 0,
    },
  ];

  const [pollChoice, setPollChoice] = useState(inputArr);

  const addInput = () => {
    setPollChoice((s) => {
      return [
        ...s,
        {
          text: "",
          votes: 0,
        },
      ];
    });
  };

  const handleChange = (e) => {
    e.preventDefault();

    const index = e.target.id;
    setPollChoice((s) => {
      const newArr = s.slice();
      newArr[index].text = e.target.value;
      newArr[index].id = e.target.id;

      return newArr;
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (file) {
      const data = new FormData();

      data.append("Photo", file);
      data.append("userId", userDetails.userId);
      data.append("Caption", desc.current.value);
      try {
        await axios.post("http://localhost:5000/post/UploadPost", data);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    } else if (videoFile) {
      const data = new FormData();

      data.append("Video", videoFile);
      data.append("userId", userDetails.userId);
      data.append("Caption", desc.current.value);
      try {
        await axios.post("http://localhost:5000/post/UploadVideo", data);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    } else if (poll) {
      let poll = {
        userId: userDetails.userId,
        pollQuestion: pollQuestion,
        pollChoice: pollChoice,
      };
      try {
        await axios.post("http://localhost:5000/post/uploadPoll", poll);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="share">
      <div className="shareInner">
        <div className="shareTop">
          <img
            className="userProfileCircle"
            src={`data:image/png;base64,${shareProfile}`}
            alt=""
          />
          <input
            type="text"
            className="shareInput"
            placeholder="Write something..."
            ref={desc}
          />
        </div>
        {file && (
          <div className="shareImgContainer">
            <div className="shareImgInner">
              <img
                className="shareImgPreview"
                src={URL.createObjectURL(file)}
                alt=""
              />
              <CancelRounded
                onClick={() => setFile(null)}
                className="cancelShare"
              />
            </div>
          </div>
        )}
        {videoFile && (
          <div className="shareImgContainer">
            <div className="shareImgInner">
              <video
                className="shareImgPreview"
                src={URL.createObjectURL(videoFile)}
              ></video>
              <CancelRounded
                onClick={() => setFile(null)}
                className="cancelShare"
              />
            </div>
          </div>
        )}
        {poll && (
          <div className="pollContainer">
            <div className="PollHeading">
              <h3>Make a Poll</h3>
            </div>
            <div className="pollQuestionContainer">
              <input
                type="text"
                placeholder="Ask a Question?"
                className="pollQuestionInput"
                onChange={(e) => setpollQuestion(e.target.value)}
              />
            </div>
            <div className="pollAnswerContainer">
              <div className="pollAnswerInputConatiner">
                {pollChoice.map((item, i) => {
                  return (
                    <li>
                      <input
                        onChange={handleChange}
                        id={i}
                        type="text"
                        placeholder={"Choice " + (i + 1)}
                        size="40"
                        className="pollAnswerInput"
                      />
                    </li>
                  );
                })}
              </div>
              <button className="addChoiceBtn" onClick={addInput}>
                +
              </button>
            </div>
          </div>
        )}
        <form className="shareBottom" onSubmit={handleSubmit}>
          <div className="shareOptions">
            <div className="shareOptionInner">
              <label htmlFor="file" className="PostShare">
                <PermMediaIcon className="sharePostIcon" />
                <span className="shareOptionText">Post</span>
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="file"
                  accept=".png,.jpeg,.jpg"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
              <label className="videoShare">
                <VideoCameraBackIcon className="shareVideoIcon" />
                <span className="shareOptionText">Video</span>
                <input
                  type="file"
                  accept=".mp4"
                  style={{ display: "none" }}
                  id="file"
                  onChange={(e) => setvideoFile(e.target.files[0])}
                />
              </label>
              <label className="pollShare" onClick={() => setPoll(!poll)}>
                <PollIcon className="sharePollIcon" />
                <span className="shareOptionText">Poll</span>
              </label>
              <div className="articleShare">
                <Link to={"/writeArticle"} state={{ userDetails: userDetails }}>
                  <ArticleIcon className="writeArticlePostIcon" />
                  <span className="shareOptionText">Article</span>
                </Link>
              </div>
              <div className="shareBtn">
                <button className="shareBtnText" type="submit">
                  Share
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
