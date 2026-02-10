import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  console.log("AdminDashboard component rendered");
  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      <div style={{ marginTop: "20px" }}>
        <Link to="/admin/manage-coordinators">
          <button>Manage Coordinators</button>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
