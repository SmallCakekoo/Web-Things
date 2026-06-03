import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContex";

export const Home = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  if (!context?.user) return null;

  const handleLogout = () => {
    context.logout();
    navigate("/login");
  };

  return (
    <div style={{ margin: "20px" }}>
      <h2>Bienvenido, {context.user.email}</h2>
      <p>Rol: <strong>{context.user.role}</strong></p>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};
