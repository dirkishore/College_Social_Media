import { NavLink } from "react-router-dom";
import "./SideBar.scss";

function Sidebar({ userDetails }) {
  return (
    <nav className="side-navbar">
      <ul className="side-menu">
        <NavLink to="/">
          <li>
            <i class="fi fi-rr-home"></i>
            <span>Home</span>
          </li>
        </NavLink>

        <NavLink to={`/Messages/${userDetails.userId}`}>
          <li>
            <i class="fi fi-rr-comments"></i>
            <span>Messages</span>
          </li>
        </NavLink>

        <NavLink to="/placements">
          <li>
            <i class="fi fi-rr-ballot"></i>
            <span>Placements</span>
          </li>
        </NavLink>
      </ul>
    </nav>
  );
}

export default Sidebar;
