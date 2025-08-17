// components/ui/RequireAuth.jsx
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireAuth;
