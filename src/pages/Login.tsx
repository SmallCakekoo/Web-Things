import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContex";

export const Login = () => {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const context  = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await context?.login(email, password);
    if (!context?.error) navigate("/");
  };

  return (
    <div style={{ margin: "20px" }}>
      <h2>Iniciar Sesión</h2>
      {context?.error && <p style={{ color: "red" }}>{context.error}</p>}
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px" }}>
        <input type="email"    placeholder="Email"      value={email}    onChange={e => setEmail(e.target.value)}    required />
        <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Iniciar sesión</button>
      </form>
      <p><Link to="/register">¿No tienes cuenta? Regístrate</Link></p>
    </div>
  );
};
