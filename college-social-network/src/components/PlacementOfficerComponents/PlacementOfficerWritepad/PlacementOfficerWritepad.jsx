import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import React, { Component, useState } from "react";

export default function PlacementOfficerWritepad({ placementOfficerDetails }) {
  const [placementPost, setPlacementPost] = useState("");
  const [PlacementHeadline, setPlacementHeadline] = useState("");

  function onPublish() {
    let uploadPlacementPost = {
      userId: placementOfficerDetails.placementOfficerUserId,
      PlacementHeadLine: PlacementHeadline,
      PlacementContent: placementPost,
    };
    axios
      .post(
        "http://localhost:5000/placementOfficer/uploadPlacementPost",
        uploadPlacementPost
      )
      .then(() => window.location.reload())
      .catch((err) => console.log(err));
  }
  console.log(placementOfficerDetails);

  return (
    <div className="articlePage">
      <div className="writeArticle">
        <div className="headline">
          <input
            type="text"
            name="articleHeadLine"
            placeholder="Headline"
            onChange={(e) => setPlacementHeadline(e.target.value)}
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
                setPlacementPost(text);
              }}
              modules={PlacementOfficerWritepad.modules}
              formats={PlacementOfficerWritepad.formats}
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

PlacementOfficerWritepad.modules = {
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
PlacementOfficerWritepad.formats = [
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
