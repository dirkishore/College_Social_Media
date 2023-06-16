import axios from "axios";
import React, { Component, useEffect, useState } from "react";

import "./StaffList.scss";
import StaffOnline from "./StaffOnline";

function StaffList({ userDetails }) {
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    const getStaffList = async () => {
      try {
        const staffs = await axios.get(
          "http://localhost:5000/student/staffs/" + userDetails.userId
        );
        setStaffList(staffs.data);
      } catch (error) {
        console.log(error);
      }
    };
    getStaffList();
  }, [userDetails.userId]);

  return (
    <div className="StaffList">
      <div className="StaffList-header">
        <h5>Staffs</h5>
      </div>
      <div className="staffs">
        <ul>
          {staffList.map((staff) => {
            return <StaffOnline staff={staff} />;
          })}
        </ul>
      </div>
    </div>
  );
}

export default StaffList;
