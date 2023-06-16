import { Link } from "react-router-dom";
import { Buffer } from "buffer";
import "./StaffList.scss";

export default function StaffOnline({ staff }) {
  var staffProfilePic = staff.staffProfilePic
    ? Buffer.from(staff.staffProfilePic.data.data, "base64").toString("base64")
    : "";

  return (
    <li>
      <Link
        to={`/SearchResult/${staff.staffName}`}
        state={{ staffId: staff._id }}
      >
        <div className="staffPic">
          <img src={`data:image/png;base64,${staffProfilePic}`} alt="" />
          <span className="staffOnline"></span>
        </div>
        <div className="userName">
          <p>{staff.staffName}</p>
        </div>
      </Link>
    </li>
  );
}
