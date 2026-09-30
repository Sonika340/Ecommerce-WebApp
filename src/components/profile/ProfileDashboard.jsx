import React, { Fragment } from "react";
import Styles from "./_profile.module.css";
import { useAuth } from "../../hooks/fetchUser";

import ProfileSidebar from "./ProfileSidebar";
import { Outlet } from "react-router-dom";
import Spinner from "../../Spinner";

const ProfileDashboard = () => {
  const { user } = useAuth();
  return (
    <section className={Styles.profileDashboard}>
      <article className={Styles.container}>
        {user === null ? (
         <Spinner />
        ) : (
          <>
            <ProfileSidebar />
            <Outlet />
          </>
        )}
      </article>
    </section>
  );
};

export default ProfileDashboard;
