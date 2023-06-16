import React, { Component, useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import "./CommentSectionStyle.css";
import axios from "axios";
import { Buffer } from "buffer";

function CommentSection(props) {
  let CommentProfile = Buffer.from(props.ProfileOnComment, "base64").toString(
    "base64"
  );

  // console.log(CommentProfile);

  return (
    <div className="comment-list">
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar
              alt="Remy Sharp"
              src={`data:image/png;base64,${CommentProfile}`}
            />
          </ListItemAvatar>
          <ListItemText
            primary={props.NameOnComment}
            secondary={<React.Fragment>{props.Comment}</React.Fragment>}
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
    </div>
  );
}

export default CommentSection;
