import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, role, loading } = useAuth();
  const location = useLocation();

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  if (role !== "admin") {
    return <Navigate to="/geoshop" replace />;
  }

  return children;
};

export default AdminRoute;
