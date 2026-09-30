import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../state-mangement/contextApi";

const DashboardRedirect = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (user.role?.toLowerCase() === "admin") {
    return (
      <Navigate
        to="/admin/admin-dashboard"
        replace
      />
    );
  }

  return (
    <Navigate
      to="/user/dashboard"
      replace
    />
  );
};

export default DashboardRedirect;