import { useAuth } from "../../hooks/fetchUser";

const UserDashboardHome = () => {
  const { user } = useAuth();

  return (
    <section>
      <h1>Welcome, {user?.name}</h1>

      <p>
        Welcome to your dashboard.
      </p>

      <div>
        <h2>My Learning</h2>
        <p>
          Explore courses and continue learning.
        </p>
      </div>
    </section>
  );
};

export default UserDashboardHome;