import axios from "axios";
import React, { useEffect, useState } from "react";
import "./StudentsList.css";
import OnlineStudents from "../OnlineStudents/OnlineStudents";

export default function StudentsList({ userDetails }) {
  const [studentList, setStudentList] = useState([]);
  useEffect(() => {
    axios
      .get(
        "http://localhost:5000/Faculty/getStaffStudents/" +
          userDetails.staffUserId
      )
      .then((res) => {
        setStudentList(res.data);
      });
  }, [userDetails.staffUserId]);

  return (
    <div className="studentList">
      <div className="StudentList-header">
        <h5>Students</h5>
      </div>
      <div className="Students">
        <ul>
          {studentList.map((f) => {
            return (
              <OnlineStudents
                key={f._id}
                student={f}
                userDetails={userDetails}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}
