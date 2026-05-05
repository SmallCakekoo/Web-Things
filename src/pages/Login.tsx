import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authService } from "../firebase/firebaseConfig";
import { useNavigate, Link } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    signInWithEmailAndPassword(authService, email, password)
      .then((userCredential) => {
        // Signed in 
        console.log("Usuario logueado:", userCredential.user);
        navigate("/"); // Redirigir a profile
      })
      .catch((error) => {
        setError(error.message);
        console.error("Error en login:", error);
      });
  };

  return (
    <div style={{ margin: "20px" }}>
      <h2>Iniciar Sesión</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px" }}>
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
        <button type="submit" style={{ padding: "10px", cursor: "pointer" }}>Entrar</button>
      </form>
      <p style={{ marginTop: "15px" }}>
        ¿No tienes cuenta? <Link to="/signup">Regístrate aquí</Link>
      </p>
    </div>
  );
};
