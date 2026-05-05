import { useContext } from "react";
import { AuthContext } from "../context/AuthContex";
import { Logout } from "../components/Logout";

export const Profile = () => {
  const context = useContext(AuthContext);

  if (context?.loading) {
    return <div style={{ margin: "20px" }}>Cargando sesión...</div>;
  }

  // Si no hay usuario, no renderizamos nada más porque el useEffect ya lo está redirigiendo
  if (!context?.user) {
    return null; 
  }

  return (
    <div style={{ margin: "20px" }}>
      <h2>Perfil de Usuario</h2>
      <p>Has iniciado sesión correctamente.</p>
      <p>Tu ID de usuario (UID) es: <strong>{context.uid}</strong></p>
      <p>Tu correo es: <strong>{context.user.email}</strong></p>
      <Logout />
    </div>
  );
};
