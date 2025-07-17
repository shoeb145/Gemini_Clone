import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("login"); // or 'token'

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
