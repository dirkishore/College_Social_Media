import axios from "axios";
import React, { useState } from "react";

export default function AddPlacementOfficer() {
  const [placementOfficerProfile, setPlacementOfficerProfile] = useState();
  const [placementOfficerEmail, setPlacementOfficerEmail] = useState();
  const [placementOfficerPassword, setPlacementOfficerPassword] = useState();
  const [placementOfficerName, setPlacementOfficerName] = useState();
  const [placementOfficerExperience, setPlacementOfficerExperience] =
    useState();
  const [placementOfficerSpecialization, setPlacementOfficerSpecialization] =
    useState();

  function onProfile(e) {
    setPlacementOfficerProfile(e.target.files[0]);
  }

  function onName(e) {
    setPlacementOfficerName(e.target.value);
  }

  function onEmail(e) {
    setPlacementOfficerEmail(e.target.value);
  }

  function onPassword(e) {
    setPlacementOfficerPassword(e.target.value);
  }

  function onExperience(e) {
    setPlacementOfficerExperience(e.target.value);
  }

  function onSpecialization(e) {
    setPlacementOfficerSpecialization(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Profile", placementOfficerProfile);
    formData.append("Email", placementOfficerEmail);
    formData.append("Password", placementOfficerPassword);
    formData.append("Name", placementOfficerName);
    formData.append("Experience", placementOfficerExperience);
    formData.append("Specialization", placementOfficerSpecialization);
    axios
      .post(
        "http://localhost:5000/placementOfficer/AddPlacementOfficer",
        formData
      )
      .then((result) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="AddAdmin">
      <div className="AddAdminInner">
        <h4>Add Placement Officer</h4>

        <div className="inputBox">
          <label>Profile Pic</label>
          <input
            type="file"
            onChange={onProfile}
            required={true}
            id="Profile"
            name="Profile"
          />
        </div>

        <div className="inputBox">
          <input
            onChange={onName}
            type="text"
            required={true}
            name="StudentName"
          />
          <span>Name</span>
        </div>
        <div className="inputBox">
          <input
            onChange={onEmail}
            type="text"
            required={true}
            name="StudentName"
          />
          <span>Email</span>
        </div>
        <div className="inputBox">
          <input
            onChange={onPassword}
            type="text"
            required={true}
            name="StudentName"
          />
          <span>Password</span>
        </div>
        <div className="inputBox">
          <input
            onChange={onExperience}
            type="text"
            required={true}
            name="StudentName"
          />
          <span>Experience</span>
        </div>
        <div className="inputBox">
          <input
            onChange={onSpecialization}
            type="text"
            required={true}
            name="StudentName"
          />
          <span>Specialization</span>
        </div>

        <div>
          <input
            onClick={onSubmit}
            type="submit"
            value="Add Placement Officer"
          />
        </div>
      </div>
    </div>
  );
}
