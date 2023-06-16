import axios from "axios";
import { Buffer } from "buffer";

export default function OnlineStudents({ student, userDetails }) {
  var friendProfilePic = student.Profile
    ? Buffer.from(student.Profile.data.data, "base64").toString("base64")
    : "";

  return (
    <li>
      <div className="friendPic">
        <img src={`data:image/png;base64,${friendProfilePic}`} alt="" />
        <span className="friendOnline"></span>
      </div>
      <div className="userName">
        <p>{student.Name}</p>
      </div>
    </li>
  );
}
