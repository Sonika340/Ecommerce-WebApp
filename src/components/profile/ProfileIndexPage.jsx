import Styles from "./_profile.module.css";
import { useAuth } from "../../hooks/fetchUser";

const ProfileIndexPage = () => {
  const { user } = useAuth();

  return (
    <aside className={Styles.content}>
      <main>
        <div>
          <strong>Email</strong>
          <span>{user?.email}</span>
        </div>

        <div>
          <strong>Role</strong>
          <span>{user?.role}</span>
        </div>
      </main>
    </aside>
  );
};

export default ProfileIndexPage;