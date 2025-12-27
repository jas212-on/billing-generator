import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allow }) => {
  if (!allow) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
