import React, { Component, useState } from "react";
import "./WriteArticle.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import Topbar from "../Topbar/Topbar";
import Sidebar from "../Sidebar/SideBar";
import FriendsList from "../FriendList/FriendsList";
import StaffList from "../StaffList/StaffList";
import ProfileBar from "../ProfileBar/ProfileBar";

function WriteArticle(props, { userDetails }) {
  const [article, setArticle] = useState("");
  const [articleHeadLine, setArticleHeadLine] = useState("");
  const [Name, setName] = useState(props.Name);
  const [Email, setEmail] = useState(props.Email);
  const [ArticleLikes, setArticleLikes] = useState(0);
  const [ArticleComments, setArticleComments] = useState();

  function onPublish() {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}-${month}-${year}`;

    let articlePost = {
      Name,
      Email,
      ArticleHeadLine: articleHeadLine,
      ArticleContent: article,
      ArticleLikes,
      ArticleComments,
      ArticleUploadedDate: currentDate,
    };
    axios
      .post("http://localhost:5000/post/uploadArticle", articlePost)
      .then(() => alert("article upload successfully"))
      .catch((err) => console.log(err));
  }

  console.log(props.userDetails);

  return (
    <div className="articlePage">
      <Topbar userDetails={props.userDetails} />
      <Sidebar userDetails={props.userDetails} />
      <FriendsList userDetails={props.userDetails} />
      <StaffList userDetails={props.userDetails} />
      <ProfileBar userDetails={props.userDetails} />

      <div className="writeArticle">
        <div className="headline">
          <input
            type="text"
            name="articleHeadLine"
            placeholder="Headline"
            onChange={(e) => setArticleHeadLine(e.target.value)}
            className="articleTitle"
            autoComplete="off"
          />
        </div>
        <div className="content">
          <div className="editor">
            <ReactQuill
              theme="snow"
              onChange={(content, delta, source, editor) => {
                const text = editor.getText(content).trim();
                setArticle(text);
              }}
              modules={WriteArticle.modules}
              formats={WriteArticle.formats}
              placeholder="Write something..."
            />
          </div>
        </div>
        <input
          type="submit"
          value="Publish"
          onClick={onPublish}
          className="publishArticle"
        />
      </div>
    </div>
  );
}

WriteArticle.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
WriteArticle.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

export default WriteArticle;
