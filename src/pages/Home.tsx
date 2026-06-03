import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContex";

export const Home = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  if (context?.loading) return <div>Cargando...</div>;
  if (!context?.user) return null;

  const handleLogout = async () => {
    await context.logout();
    navigate("/login");
  };

  return (
    <div style={{ margin: "20px" }}>
      <h2>Bienvenido, {context.user.email}</h2>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};
