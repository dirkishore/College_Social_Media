import React, { useState } from "react";
import "./AddAdminForm.css";
import axios from "axios";

export default function AddAdminForm() {
  const [adminEmail, setAdminEmail] = useState();
  const [adminPassword, setAdminPassword] = useState();

  function onAdminEmail(e) {
    setAdminEmail(e.target.value);
  }

  function onAdminPassword(e) {
    setAdminPassword(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();

    let admin = {
      AdminUserName: adminEmail,
      AdminPassword: adminPassword,
    };
    axios
      .post("http://localhost:5000/Admin/AddAdmin", admin)
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
        <h4>Add Admin</h4>

        <div className="inputBox">
          <input
            onChange={onAdminEmail}
            type="text"
            required={true}
            name="StudentName"
          />
          <span>Admin username</span>
        </div>

        <div className="inputBox">
          <input
            onChange={onAdminPassword}
            type="text"
            required={true}
            name="StudentName"
          />
          <span>Admin Password</span>
        </div>

        <div>
          <input onClick={onSubmit} type="submit" value="Add admin" />
        </div>
      </div>
    </div>
  );
}
