import { useEffect, useState } from "react";
import "./StaffList.css";
import axios from "axios";
import { Buffer } from "buffer";

export default function StaffList({ userDetails }) {
  const [staffsOnline, setStaffOnline] = useState([]);

  useEffect(() => {
    axios
      .get(
        "http://localhost:5000/faculty/getStaffFollowings/" +
          userDetails.staffUserId
      )
      .then((result) => {
        setStaffOnline(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="staffList">
      <div className="staffListHeader">
        <h5>Staffs</h5>
      </div>
      <div className="staffs">
        <ul>
          {staffsOnline.map((s) => {
            var staffProfilePic = s.staffProfilePic
              ? Buffer.from(s.staffProfilePic.data.data, "base64").toString(
                  "base64"
                )
              : "";
            return (
              <li>
                <div className="staffPic">
                  <img
                    src={`data:image/png;base64,${staffProfilePic}`}
                    alt=""
                  />
                  <span className="staffOnline"></span>
                </div>
                <p>{s.staffName}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
