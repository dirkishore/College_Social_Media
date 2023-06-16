import React, { Component, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  json,
  NavLink,
} from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/AddFaculty.css";
import AdminSideBar from "./AdminConponents/AdminSidebar/AdminSideBar";

function AddFaculty() {
  const [staffProfilePic, setstaffProfilePic] = useState();
  const [staffName, setstaffName] = useState();
  const [staffEmail, setstaffEmail] = useState();
  const [staffPassword, setstaffPassword] = useState();
  const [staffDepartment, setstaffDepartment] = useState();

  function onStaffProfilePic(e) {
    setstaffProfilePic(e.target.files[0]);
  }
  function onStaffName(e) {
    setstaffName(e.target.value);
  }
  function onStaffEmail(e) {
    setstaffEmail(e.target.value);
  }
  function onStaffPassword(e) {
    setstaffPassword(e.target.value);
  }
  function onStaffDepartment(e) {
    setstaffDepartment(e.target.value);
  }

  function onAddStaffDetailsBtn(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("staffProfilePic", staffProfilePic);
    formData.append("staffName", staffName);
    formData.append("staffEmail", staffEmail);
    formData.append("staffPassword", staffPassword);
    formData.append("staffDepartment", staffDepartment);
    console.log(staffProfilePic);

    axios
      .post("http://localhost:5000/Staff/AddStaff", formData)
      .then(() => alert("Staff added successfully"))
      .catch((err) => console.log(err));
  }

  return (
    <div className="AddFaculty">
      <div className="header"></div>

      <AdminSideBar />

      <div className="AddFacultyContainer">
        <form onSubmit={onAddStaffDetailsBtn}>
          <h4>Add Faculty</h4>
          <div className="inputBox">
            <label>Faculty Profile Pic</label>
            <input
              type="file"
              required={true}
              id="staffProfilePic"
              name="staffProfilePic"
              onChange={onStaffProfilePic}
            />
          </div>

          <div className="inputBox">
            <input
              type="text"
              required={true}
              onChange={onStaffName}
              name="staffName"
            />
            <span>Faculty Name</span>
          </div>

          <div className="inputBox">
            <input
              type="email"
              required={true}
              onChange={onStaffEmail}
              name="staffEmail"
            />
            <span>Faculty Email</span>
          </div>

          <div className="inputBox">
            <input
              type="password"
              required={true}
              onChange={onStaffPassword}
              name="staffPassword"
            />
            <span>Faculty Password</span>
          </div>

          <div className="inputBox">
            <input
              type="text"
              required={true}
              onChange={onStaffDepartment}
              name="Department"
            />
            <span>Faculty Department</span>
          </div>

          <div className="inputBox">
            <input
              onClick={onAddStaffDetailsBtn}
              type="submit"
              value="Add Faculty Member"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddFaculty;
