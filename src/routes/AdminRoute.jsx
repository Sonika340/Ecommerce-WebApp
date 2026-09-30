import { Navigate, Outlet, Link } from "react-router-dom";
import { useAuth } from "../hooks/fetchUser";
import { Fragment } from "react";
import Spinner from "../Spinner";

const AdminRoute = () => {
  const { user , loading } = useAuth();
  const AdminUser = user?.role?.toLowerCase() === "admin";

  if (!user) {
   if(loading === true) {
    return <Spinner />
   }else {
     return <Navigate to="/auth/login" replace />; //null
   }
  }
  if (!AdminUser) {
    return (
      <Fragment>
        <div>
          <h2>Access Restricted</h2>
          <p>
            {user.name} role is {user.role} is not able to access this route
          </p>
        </div>
        <Link to={"/user/profile"}>Return home</Link>
      </Fragment>
    );
  }
  return <Outlet />
};

export default AdminRoute;
