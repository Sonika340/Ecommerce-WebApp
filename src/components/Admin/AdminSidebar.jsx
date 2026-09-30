import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <aside>
      <h2>Admin Dashboard</h2>

      <Link to=".">
        Users
      </Link>

      <Link to="create-course">
        Create Course
      </Link>

      <Link to="delete-course">
        Delete Course
      </Link>
    </aside>
  );
};

export default AdminSidebar;