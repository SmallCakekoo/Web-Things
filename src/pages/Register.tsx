import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContex";

export const Register = () => {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole]         = useState<"admin" | "user">("user");
  const [success, setSuccess]   = useState(false);
  const context = useContext(AuthContext);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    context?.register(email, password, role);
    if (!context?.error) setSuccess(true);
  };

  return (
    <div style={{ margin: "20px" }}>
      <h2>Registro</h2>
      {context?.error  && <p style={{ color: "red"   }}>{context.error}</p>}
      {success         && <p style={{ color: "green" }}>Usuario registrado con éxito!</p>}
      <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px" }}>
        <input type="email"    placeholder="Email"      value={email}    onChange={e => setEmail(e.target.value)}    required />
        <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
        <select value={role} onChange={e => setRole(e.target.value as "admin" | "user")}>
          <option value="user">Usuario</option>
          <option value="admin">Administrador</option>
        </select>
        <button type="submit">Registrarse</button>
      </form>
      <p><Link to="/login">¿Ya tienes cuenta? Inicia sesión</Link></p>
    </div>
  );
};
