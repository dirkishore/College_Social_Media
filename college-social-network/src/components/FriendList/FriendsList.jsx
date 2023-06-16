import React, { useEffect, useState } from "react";
import "./FriendsList.css";
import axios from "axios";
import { Buffer } from "buffer";
import { Link } from "react-router-dom";

function FriendsList({ userDetails }) {
  const [friendsList, setFriendsList] = useState([]);

  useEffect(() => {
    const getStudentFriends = async () => {
      try {
        const friends = await axios.get(
          "http://localhost:5000/student/friends/" + userDetails.userId
        );

        setFriendsList(friends.data);
      } catch (error) {
        console.log(error);
      }
    };
    getStudentFriends();
  }, [userDetails.userId]);

  return (
    <div className="friendsList">
      <div className="friendsList-header">
        <h5>Friends</h5>
      </div>
      <div className="Friends">
        <ul>
          {friendsList.map((f) => {
            var ProfilePic = f.Profile
              ? Buffer.from(f.Profile.data.data, "base64").toString("base64")
              : "";
            return (
              <li>
                <Link
                  to={`/SearchResult/${f.Name}`}
                  state={{ studentId: f._id }}
                >
                  <div className="friendPic">
                    <img src={`data:image/png;base64,${ProfilePic}`} alt="" />
                    <span className="friendOnline"></span>
                  </div>
                  <div className="userName">
                    <p>{f.Name}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default FriendsList;
