import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContex";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const context = useContext(AuthContext);

  if (context?.loading) return null;

  if (!context?.user) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;