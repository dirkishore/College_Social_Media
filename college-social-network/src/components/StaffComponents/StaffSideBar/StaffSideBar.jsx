import { NavLink } from "react-router-dom";

export default function StaffSideBar({ userDetails }) {
  return (
    <nav className="side-navbar">
      <ul className="side-menu">
        <NavLink to="/staff">
          <li>
            <i class="fi fi-rr-home"></i>
            <span>Home</span>
          </li>
        </NavLink>

        <NavLink to={`/staffMessages/${userDetails.staffUserId}`}>
          <li>
            <i class="fi fi-rr-comments"></i>
            <span>Messages</span>
          </li>
        </NavLink>

        <NavLink to="#">
          <li>
            <i class="fi fi-rr-ballot"></i>
            <span>Placements</span>
          </li>
        </NavLink>
      </ul>
    </nav>
  );
}
