import React from "react";
import AdminSideBar from "../../components/AdminConponents/AdminSidebar/AdminSideBar";
import AddAdminForm from "../../components/AdminConponents/AddAdminForm/AddAdminForm";

export default function AddAdminPage() {
  return (
    <div>
      <div className="header"></div>
      <AdminSideBar />

      <AddAdminForm />
    </div>
  );
}
