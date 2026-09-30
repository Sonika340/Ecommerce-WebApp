import React from "react";
import { Link, Outlet } from "react-router-dom";
import { FaBook } from "react-icons/fa";

import ProfileSidebar from "./ProfileSidebar";
import Styles from "./_profile.module.css";

const UserDashboard = () => {
  return (
    <section className={Styles.profileDashboard}>
      <article
        className={`${Styles.container} ${Styles.dashboardLayout}`}
      >
        {/* LEFT SIDEBAR */}
        <aside className={Styles.dashboardSidebar}>
          <ProfileSidebar />

          <nav className={Styles.sidebarMenu}>
            <Link
              to="/courses"
              className={Styles.sidebarLink}
            >
              <FaBook />
              <span>Courses</span>
            </Link>
          </nav>
        </aside>

        {/* RIGHT CONTENT */}
        <main className={Styles.dashboardContent}>
          <Outlet />
        </main>
      </article>
    </section>
  );
};

export default UserDashboard;