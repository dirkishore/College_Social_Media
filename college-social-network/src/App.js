import "./App.scss";
import { Routes, Route } from "react-router-dom";
// import { Routes, Route } from "react-router";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

import AdminLogin from "./components/AdminConponents/AdminLogin/AdminLogin";
import Home from "./components/Home/Home";
import StudentLogin from "./components/StudentLogin/StudentLogin";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import AdminHomePage from "./components/AdminConponents/AdminHomePage/AdminHomePage";
import WriteArticle from "./components/WriteArticlePage/WriteArticle";
import PostPermissions from "./components/PostPermissions";
import AddFaculty from "./components/AddFaculty";
import Chats from "./components/Messages/Chats";
import StaffChats from "./components/StaffComponents/Messages/StaffChats";
import SearchResult from "./components/SearchResult/SearchResult";
import { AuthContext } from "./components/Context/AuthContext";
import StaffLogin from "./pages/StaffLogin/StaffLogin";
import StaffHomePage from "./pages/StaffHomePage/StaffHomePage";
import StaffSearchResult from "./pages/StaffSearchResult/StaffSearchResult";
import PlacementOfficerLoginPage from "./pages/PlacementOfficerLoginPage/PlacementOfficerLoginPage";
import PlacementOfficerHomePage from "./pages/PlacementOfficerHomePage/PlacementOfficerHomePage";
import Placements from "./pages/PlacementsPage/Placements";
import CollegeEventsPage from "./pages/CollegeEventsPage/CollegeEventsPage";
import AddAdminPage from "./pages/AddAdminPage/AddAdminPage";
import AddPlacementOfficerPage from "./pages/AddPlacementOfficerPage/AddPlacementOfficerPage";

export default function App() {
  const [Email, setEmail] = useState(localStorage.getItem("Email"));
  const [Password, setPassword] = useState(localStorage.getItem("Password"));

  const [staffEmail, setStaffEmail] = useState(localStorage.getItem("Email"));
  const [staffPassword, setStaffPassword] = useState(
    localStorage.getItem("Password")
  );

  const [placementOfficerEmail, setPlacementOfficerEmail] = useState(
    localStorage.getItem("Email")
  );
  const [placementOfficerPassword, setPlacementOfficerPassword] = useState(
    localStorage.getItem("Password")
  );

  const [staffUserId, setStaffUserId] = useState();
  const [Name, setName] = useState();
  const [userId, setUserId] = useState();
  const [Rollno, setRollno] = useState();
  const [profile, setProfile] = useState();
  const [PhoneNo, setPhone] = useState();
  const [userFollowers, setUserFollowers] = useState([]);
  const [userFollowings, setUserFollowings] = useState([]);
  const [userStaffs, setUserStaffs] = useState([]);
  const [Degree, setDegree] = useState();
  const [Branch, setBranch] = useState();
  const [Staffs, setStaffs] = useState([]);
  const [year, setYear] = useState();

  const [staffStudent, setStaffStudent] = useState([]);

  //placementOfficer
  const [placementOfficerUserId, setPlacementOfficerUserId] = useState();
  const [placementOfficerProfile, setPlacementOfficerProfile] = useState();
  const [placementOfficerName, setPlacementOfficerName] = useState();
  const [placementOfficerExperience, setPlacementOfficerExperience] =
    useState();
  const [placementOfficerSpecialization, setPlacementOfficerSpecialization] =
    useState();

  const userDetails = {
    userId,
    staffUserId,
    Email,
    Name,
    Rollno,
    profile,
    PhoneNo,
    userFollowers,
    userFollowings,
    userStaffs,
    Degree,
    Staffs,
    Branch,
    year,
    staffStudent
  };

  useEffect(() => {
    getStudentDetails();
  }, [Email]);

  useEffect(() => {
    getStaffDetails();
  }, [staffEmail]);

  useEffect(() => {
    getPlacementOfficerDetails();
  }, [placementOfficerEmail]);

  function getStudentDetails() {
    const studentDetails = { Email };
    // console.log({ Email });
    // { headers: { Authorization: 'Bearer ' + token } }
    axios
      .post("http://localhost:5000/student/getStudentDetails", studentDetails)
      .then((result) => {
        setName(result.data.result.Name);
        setUserId(result.data.result._id);
        setRollno(result.data.result.Rollno);
        setProfile(result.data.result.Profile.data.data);
        setPhone(result.data.result.PhoneNo);
        setUserFollowers(result.data.result.followers);
        setUserFollowings(result.data.result.following);
        setUserStaffs(result.data.result.Staffs);
        setDegree(result.data.result.Degree);
        setBranch(result.data.result.Branch);
        setYear(result.data.result.Year);
        setStaffs(result.data.result.Staffs);
      })
      .catch((err) => console.log(err));
  }

  function getStaffDetails() {
    axios
      .get("http://localhost:5000/Faculty/getFaculty/" + staffEmail)
      .then((result) => {
        console.log(result.data);
        setName(result.data.staffName);
        setEmail(result.data.staffEmail);
        setBranch(result.data.staffDepartment);
        setStaffUserId(result.data._id);
        setProfile(result.data.staffProfilePic.data.data);
        setUserFollowers(result.data.followers);
        setUserFollowings(result.data.following);
        setStaffStudent(result.data.students)
      });
  }

  const getPlacementOfficerDetails = () => {
    axios
      .get(
        "http://localhost:5000/placementOfficer/placementOfficerDetails/" +
        placementOfficerEmail
      )
      .then((result) => {
        setPlacementOfficerUserId(result.data._id);
        setPlacementOfficerName(result.data.Name);
        setPlacementOfficerProfile(result.data.Profile.data.data);
        setPlacementOfficerExperience(result.data.Experience);
        setPlacementOfficerSpecialization(result.data.Specialization);
      });
  };

  const placementOfficerDetails = {
    placementOfficerUserId,
    placementOfficerEmail,
    placementOfficerName,
    placementOfficerProfile,
    placementOfficerExperience,
    placementOfficerSpecialization,
  };

  function onEmail(e) {
    setEmail(e.target.value);
    window.localStorage.setItem("Email", e.target.value);
  }

  function onPassword(e) {
    setPassword(e.target.value);
    window.localStorage.setItem("Password", Password);
  }

  function onStaffEmail(e) {
    setStaffEmail(e.target.value);
    window.localStorage.setItem("Email", e.target.value);
  }

  function onStaffPassword(e) {
    setStaffPassword(e.target.value);
    window.localStorage.setItem("Password", Password);
  }

  function onPlacementOfficerEmail(e) {
    setPlacementOfficerEmail(e.target.value);
    window.localStorage.setItem("Email", e.target.value);
  }

  function onPlacementOfficerPassword(e) {
    setPlacementOfficerPassword(e.target.value);
    window.localStorage.setItem("Password", Password);
  }

  const [loginErrorMessage, setLoginErrorMessage] = useState("");


  const user = useContext(AuthContext);

  return (
    <div className="App">
      <Routes>
        {/* Login routes*/}
        <Route
          exact
          path="/adminLogin"
          element={<AdminLogin loginErrorMessage={loginErrorMessage} />}
        ></Route>
        <Route
          exact
          path="/studentLogin"
          element={
            <StudentLogin
              onEmail={onEmail}
              onPassword={onPassword}
              loginErrorMessage={loginErrorMessage}
            />
          }
        ></Route>
        <Route
          exact
          path="/staffLogin"
          element={
            <StaffLogin
              onEmail={onStaffEmail}
              onPassword={onStaffPassword}
              loginErrorMessage={loginErrorMessage}
            />
          }
        ></Route>
        <Route
          exact
          path="/PlacementOfficerLogin"
          element={
            <PlacementOfficerLoginPage
              onEmail={onPlacementOfficerEmail}
              onPassword={onPlacementOfficerPassword}
              loginErrorMessage={loginErrorMessage}
            />
          }
        ></Route>

        {/* Home Page routes */}
        <Route
          exact
          path="/staff"
          element={<StaffHomePage userDetails={userDetails} />}
        />
        <Route
          exact
          path="/"
          element={
            user ? (
              <Home
                userDetails={userDetails}
                profile={profile}
                Email={Email}
                Name={Name}
                Rollno={Rollno}
                phoneNo={PhoneNo}
                Degree={Degree}
                Branch={Branch}
                year={year}
              />
            ) : (
              <StudentLogin />
            )
          }
        ></Route>
        <Route exact path="/AdminHomePage" element={<AdminHomePage />}></Route>
        <Route
          exact
          path="/PlacementOfficerHomePage"
          element={
            <PlacementOfficerHomePage
              placementOfficerDetails={placementOfficerDetails}
            />
          }
        ></Route>

        {/* Profile Page */}
        <Route
          exact
          path="/ProfilePage/:Name"
          element={<ProfilePage userDetails={userDetails} />}
        ></Route>
        <Route
          exact
          path="/SearchResult/:Name"
          element={<SearchResult userDetails={userDetails} />}
        ></Route>
        <Route
          exact
          path="/StaffSearchResult/:Name"
          element={<StaffSearchResult userDetails={userDetails} />}
        ></Route>

        <Route
          exact
          path="/placements"
          element={<Placements userDetails={userDetails} />}
        ></Route>
        <Route
          exact
          path="/collegeEvents"
          element={<CollegeEventsPage userDetails={userDetails} />}
        ></Route>

        <Route
          exact
          path="/Messages/:id"
          element={<Chats userDetails={userDetails} userId={userId} />}
        ></Route>
        <Route
          exact
          path="/staffMessages/:id"
          element={
            <StaffChats userDetails={userDetails} staffUserId={staffUserId} />
          }
        ></Route>

        <Route
          exact
          path="/writeArticle"
          element={<WriteArticle userDetails={userDetails} Email={Email} Name={Name} />}
        ></Route>
        {/* Admin Page routes */}
        <Route
          exact
          path="/PostPermissions"
          element={<PostPermissions />}
        ></Route>

        <Route exact path="/AddFaculty" element={<AddFaculty />}></Route>
        <Route exact path="/AddPlacementOfficer" element={<AddPlacementOfficerPage />}></Route>
        <Route exact path="/AddAdmin" element={<AddAdminPage />}></Route>
      </Routes>
    </div>
  );
}
