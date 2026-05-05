import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContex";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const context = useContext(AuthContext);

  // Mientras Firebase verifica la sesión, mostramos algo o nada para no redirigir de golpe
  if (context?.loading) {
    return null;
  }

  // Si terminó de cargar y no hay usuario, mandamos a login
  if (!context?.user) {
    return <Navigate to="/login" />;
  }

  // Si hay usuario, permitimos ver la ruta hija
  return children;
};

export default ProtectedRoute;