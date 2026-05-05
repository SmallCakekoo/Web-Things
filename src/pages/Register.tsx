import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { authService } from "../firebase/firebaseConfig";
import { useNavigate, Link } from "react-router-dom";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    createUserWithEmailAndPassword(authService, email, password)
      .then((userCredential) => {
        // Signed up 
        console.log("Usuario registrado:", userCredential.user);
        navigate("/"); // Redirigir a profile tras registrarse
      })
      .catch((error) => {
        setError(error.message);
        console.error("Error en registro:", error);
      });
  };

  return (
    <div style={{ margin: "20px" }}>
      <h2>Registro</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px" }}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" style={{ padding: "10px", cursor: "pointer" }}>Registrarse</button>
      </form>
      <p style={{ marginTop: "15px" }}>
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
      </p>
    </div>
  );
};
