import { signOut } from "firebase/auth";
import { authService } from "../firebase/firebaseConfig";

export const Logout = () => {
  const handleLogout = () => {
    signOut(authService)
      .then(() => {
        console.log("Sesión cerrada correctamente");
        alert("Sesión cerrada");
      })
      .catch((error) => {
        console.error("Error al cerrar sesión:", error);
      });
  };

  return (
    <div style={{ margin: "20px" }}>
      <button onClick={handleLogout} style={{ padding: "10px", backgroundColor: "#f44336", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
        Cerrar Sesión
      </button>
    </div>
  );
};
