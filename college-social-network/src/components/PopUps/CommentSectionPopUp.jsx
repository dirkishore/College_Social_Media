import React, { Component } from "react";
import "../CommentSection/CommentSectionStyle.css";

function CommentSectionPopUp(props) {
  return props.trigger ? (
    <div className="popUp">
      <div className="CommentSectionPopUp">
        <div className="popup-inner">
          <button
            className="close-popup"
            onClick={() => props.setCommentSectionPopUp(false)}
          >
            close
          </button>
          {props.children}
        </div>
      </div>
    </div>
  ) : (
    <div style={{ display: "none" }} className="popUp">
      <div className="upload-photo-popup">
        <div className="popup-inner">
          <button
            className="close-popup"
            onClick={() => props.setCommentSectionPopUp(false)}
          >
            close
          </button>
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default CommentSectionPopUp;
