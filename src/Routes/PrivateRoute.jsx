import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  // console.log(location.pathname);

  if (loading) {
    return (
      <>
        <div className="flex justify-center items-center">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      </>
    );
  }

  if (user?.email) {
    return children;
  }

  return <Navigate state={location?.pathname} to="/login" replace />;
};

export default PrivateRoute;
