import React, { Component } from "react";

function VideoUploadPopUp(props) {
  return props.trigger ? (
    <div className="popUp">
      <div className="upload-photo-popup">
        <div className="popup-inner">
          <button
            className="close-popup"
            onClick={() => props.setVideoPopUp(false)}
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
            onClick={() => props.setVideoPopUp(false)}
          >
            close
          </button>
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default VideoUploadPopUp;
