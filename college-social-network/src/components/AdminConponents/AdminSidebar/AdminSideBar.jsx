import { NavLink } from "react-router-dom";

export default function AdminSideBar() {
  return (
    <div className="sidebar">
      <ul className="menu">
        <li>
          <NavLink
            to="/AdminHomePage"
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            Register a Student
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/AddFaculty"
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            Register a Faculty
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/AddPlacementOfficer"
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            Add Placement Officer
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/AddAdmin"
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            Add Admin
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/PostPermissions"
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            Post Permissions
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
