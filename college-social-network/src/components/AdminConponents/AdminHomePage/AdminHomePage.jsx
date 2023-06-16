import React, { useState } from "react";
import axios from "axios";

import "./AdminHomePage.css";
import AdminSideBar from "../AdminSidebar/AdminSideBar";

function AdminHomePage() {
  const [StudentProfilePic, setStudentProfilePic] = useState("");
  const [StudentName, setStudentName] = useState("");
  const [StudentEmail, setStudentEmail] = useState("");
  const [StudentPassword, setStudentPassword] = useState("");
  const [StudentRollNo, setStudentRollNo] = useState("");
  const [StudentPhoneNo, setStudentPhoneNo] = useState("");
  const [StudentDegree, setStudentDegree] = useState("");
  const [StudentBranch, setStudentBranch] = useState("");
  const [StudentYear, setStudentYear] = useState("");

  function onProfilePic(e) {
    setStudentProfilePic(e.target.files[0]);
  }

  function onStudentName(e) {
    setStudentName(e.target.value);
  }

  function onStudentEmail(e) {
    setStudentEmail(e.target.value);
  }

  function onStudentPassword(e) {
    setStudentPassword(e.target.value);
  }

  function onStudentRollNo(e) {
    setStudentRollNo(e.target.value);
  }

  function onStudentPhoneNo(e) {
    setStudentPhoneNo(e.target.value);
  }

  function onStudentBranch(e) {
    setStudentBranch(e.target.value);
    console.log(StudentBranch);
  }

  function onStudentYear(e) {
    setStudentYear(e.target.value);
  }

  const BscCourses = [
    "Computer Science",
    "AI and ML",
    "IT",
    "CT",
    "CS with TCS",
    "Bio Tech",
    "Microbiology",
    "FPTM",
    "Maths",
    "Data Science & Analytics",
    "CS&HM",
    "Electronics",
    "Physics",
    "CDF",
    "Viscom",
    "Animation",
    "Psychology",
  ];

  const MscCourses = [
    "CS",
    "IT",
    "Bio Tech",
    "Microbiology",
    "Maths",
    "Electronics",
    "Physics",
    "CDF",
  ];

  const BACourse = ["English"];

  const MACourse = ["English"];

  const BBACourse = ["CA", "Logistics"];

  const BComCourse = ["CA", "CMA", "IT", "BI", "PA", "AF", "IB", "CS"];

  const MComCourse = ["CA"];

  const MCACourse = ["Computer Application"];

  const MBACourse = ["Business Administration"];

  const BVOCCourse = ["Graphic Design"];

  const ugCourseDuration = ["I", "II", "III"];
  const pgCourseDuration = ["I", "II"];

  function onStudetDegree(e) {
    setStudentDegree(e.target.value);
  }

  let courses = null;
  let option = null;
  let year = null;
  if (StudentDegree === "B.Sc") {
    courses = BscCourses;
    year = ugCourseDuration;
  } else if (StudentDegree === "M.Sc") {
    courses = MscCourses;
    year = pgCourseDuration;
  } else if (StudentDegree === "BA") {
    courses = BACourse;
    year = ugCourseDuration;
  } else if (StudentDegree === "MA") {
    courses = MACourse;
    year = pgCourseDuration;
  } else if (StudentDegree === "BBA") {
    courses = BBACourse;
    year = ugCourseDuration;
  } else if (StudentDegree === "B.Com") {
    courses = BComCourse;
    year = ugCourseDuration;
  } else if (StudentDegree == "M.Com") {
    courses = MComCourse;
    year = pgCourseDuration;
  } else if (StudentDegree === "MCA") {
    courses = MCACourse;
    year = pgCourseDuration;
  } else if (StudentDegree === "MBA") {
    courses = MBACourse;
    year = pgCourseDuration;
  } else if (StudentDegree === "B.Voc") {
    courses = BVOCCourse;
    year = ugCourseDuration;
  }

  let yearOption;
  if (courses) {
    option = courses.map((c) => (
      <option key={c} value={c}>
        {c}
      </option>
    ));
  }
  if (year) {
    yearOption = year.map((year) => (
      <option key={year} value={year}>
        {year}
      </option>
    ));
  }

  function onsubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Profile", StudentProfilePic);
    formData.append("Email", StudentEmail);
    formData.append("Password", StudentPassword);
    formData.append("Rollno", StudentRollNo);
    formData.append("Name", StudentName);
    formData.append("PhoneNo", StudentPhoneNo);
    formData.append("Degree", StudentDegree);
    formData.append("Branch", StudentBranch);
    formData.append("Year", StudentYear);

    axios
      .post("http://localhost:5000/student/addStudentDetails", formData)
      .then(() => alert("student registered successfully"))
      .catch((err) => console.log(err));

    console.log("clicked");
  }

  return (
    <div className="Admin">
      <div className="header"></div>
      <AdminSideBar />

      <div className="registerStudent">
        <div className="inner-box">
          {/* <form method="post"> */}
          <h4>Register a Student</h4>

          <div className="inputBox">
            <label>Student Profile Pic</label>
            <input
              type="file"
              onChange={onProfilePic}
              required={true}
              id="Profile"
              name="Profile"
            />
          </div>

          <div className="inputBox">
            <input
              onChange={onStudentName}
              type="text"
              required={true}
              name="StudentName"
            />
            <span>Student Name</span>
          </div>
          <div className="inputBox">
            <input
              onChange={onStudentEmail}
              type="text"
              required={true}
              name="StudentEmail"
            />
            <span>Student Email</span>
          </div>
          <div className="inputBox">
            <input
              type="password"
              onChange={onStudentPassword}
              required={true}
              name="StudentPassword"
            />
            <span>Student Password</span>
          </div>
          <div className="inputBox">
            <input
              type="text"
              onChange={onStudentRollNo}
              required={true}
              name="StudentRollno"
            />
            <span>Student Rollno</span>
          </div>
          <div className="inputBox">
            <input
              type="text"
              onChange={onStudentPhoneNo}
              required={true}
              name="StudentPhoneNo"
            />
            <span>Student Phone No</span>
          </div>
          <div className="inputBox">
            <select
              required={true}
              onChange={onStudetDegree}
              name="StudentDegree"
            >
              <option value=""></option>
              <option value="BA">BA</option>
              <option value="MA">MA</option>
              <option value="BBA">BBA</option>
              <option value="B.Com">B.Com</option>
              <option value="B.Sc">B.Sc</option>
              <option value="M.Sc">M.Sc</option>
              <option value="BCA">BCA</option>
              <option value="MCA">MCA</option>
              <option value="MBA">MBA</option>
              <option value="B.Voc">B.Voc</option>
            </select>
            <span>Student Degree</span>
          </div>
          <div className="inputBox">
            <select
              onChange={onStudentBranch}
              required={true}
              name="StudentDegree"
            >
              <option value=""></option>
              {option}
            </select>
            <span>Student Branch</span>
          </div>
          <div className="inputBox">
            <select
              onChange={onStudentYear}
              required={true}
              name="StudentDegree"
            >
              {yearOption}
            </select>
            <span>Student Year</span>
          </div>

          <div>
            <input
              onClick={onsubmit}
              type="submit"
              value="Register a Student"
            />
          </div>
          {/* </form> */}
        </div>
      </div>
    </div>
  );
}

export default AdminHomePage;
