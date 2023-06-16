import React, { Component } from "react";

function VideoUploadPopUpDescription(props) {
  return props.trigger ? (
    <div className="popUpDescription">
      <div className="photo-popup-Description">
        <div className="popup-inner">
          <button
            className="close-popup"
            onClick={() => props.setVideoPopUpDescription(false)}
          >
            close
          </button>
          {props.children}
        </div>
      </div>
    </div>
  ) : (
    <div style={{ display: "none" }} className="popUpDescription">
      <div className="photo-popup-Description">
        <div className="popup-inner">
          <button
            className="close-popup"
            onClick={() => props.setVideoPopUpDescription(false)}
          >
            close
          </button>
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default VideoUploadPopUpDescription;
