import React from "react";
import AdminSideBar from "../../components/AdminConponents/AdminSidebar/AdminSideBar";
import AddPlacementOfficer from "../../components/AdminConponents/AddPlacementOfficer/AddPlacementOfficer";

export default function AddPlacementOfficerPage() {
  return (
    <div>
      <div className="header"></div>
      <AdminSideBar />
      <AddPlacementOfficer />
    </div>
  );
}
