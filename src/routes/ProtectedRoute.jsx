// import { useAuth } from "../hooks/fetchUser";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { AuthContext } from "../state-mangement/contextApi";
import { useContext } from "react";
import { useAuth } from "../hooks/fetchUser";
import Spinner from "../Spinner";

const ProtectedRoute = () => {
  let {user , loading} = useAuth()

  let { token } = useContext(AuthContext);
  if (token) {
    return <Outlet />;
  }else {
   if(!user){
    if(loading){
      return <Spinner />
    }else {
      return <Navigate to="/auth/login" replace />
    }
   }
  }
  
};

export default ProtectedRoute;
