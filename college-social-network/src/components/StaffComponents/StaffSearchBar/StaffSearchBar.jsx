import axios from "axios";
import "./StaffSearchBar.css";
import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";
import { Link } from "react-router-dom";

export default function StaffSearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [staffSearchData, setStaffSearchData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/student/getAllStudents").then((result) => {
      setSearchData(result.data.result);
    });

    axios.get("http://localhost:5000/Faculty/getAllFaculty").then((result) => {
      setStaffSearchData(result.data.result);
    });
  }, [searchValue]);

  function onSearch(e) {
    setSearchValue(e.target.value);
  }

  return (
    <div className="search-container">
      <form className="search-inner">
        <div className="searchIcon">
          <i class="fi fi-br-search"></i>
        </div>
        <input
          type="search"
          name="search"
          id="search-bar"
          value={searchValue}
          onChange={onSearch}
        />
      </form>
      {searchValue && (
        <div className="dropdown">
          {searchData
            .filter((user) => {
              const searchTerm = searchValue.toLocaleLowerCase();
              const userName = user.Name.toLocaleLowerCase();
              return searchTerm && userName.startsWith(searchTerm);
            })
            .map((user) => {
              const base64String = Buffer.from(
                user.Profile.data.data,
                "base64"
              ).toString("base64");

              return (
                <Link
                  to={`/StaffSearchResult/${user.Name}`}
                  state={{ studentId: user._id }}
                >
                  <div
                    className="dropdown-row"
                    onClick={() => setSearchValue("")}
                    key={user._id}
                  >
                    <img src={`data:image/png;base64,${base64String}`} alt="" />
                    <p>{user.Name}</p>
                  </div>
                </Link>
              );
            })}

          {staffSearchData
            .filter((user) => {
              const searchTerm = searchValue.toLocaleLowerCase();
              const userName = user.staffName.toLocaleLowerCase();
              return searchTerm && userName.startsWith(searchTerm);
            })
            .map((user) => {
              const base64String = Buffer.from(
                user.staffProfilePic.data.data,
                "base64"
              ).toString("base64");

              return (
                <Link
                  to={`/StaffSearchResult/${user.staffName}`}
                  state={{ staffId: user._id }}
                >
                  <div
                    className="dropdown-row"
                    onClick={() => setSearchValue("")}
                    key={user._id}
                  >
                    <img src={`data:image/png;base64,${base64String}`} alt="" />
                    <p>{user.staffName}</p>
                  </div>
                </Link>
              );
            })}
        </div>
      )}
    </div>
  );
}
