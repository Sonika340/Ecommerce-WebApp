import { Link, Outlet } from "react-router-dom";
import Styles from "./_admin.module.css";

const AdminDashboard = () => {
  return (
    <section className={Styles.admin_dashboard}>
      <article className="admin-container">
        {/* Sidebar */}
        <aside>
          <h2>Admin Dashboard</h2>

          <nav>
            <Link to="/admin/admin-dashboard">Users</Link>

            <Link to="/admin/admin-dashboard/create-course">Create Course</Link>

            <Link to="/courses">View Courses</Link>

            <Link to="/admin/admin-dashboard/delete-course">Delete Course</Link>

            <Link to="/admin/admin-dashboard/notifications">Notifications</Link>
          </nav>
        </aside>

        {/* Content */}
        <aside>
          <Outlet />
        </aside>
      </article>
    </section>
  );
};

export default AdminDashboard;
