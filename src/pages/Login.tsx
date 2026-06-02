import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice";
import { RootState } from "../store";

export const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"client" | "admin">("client");
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/products", { replace: true });
      }
    }
  }, [user, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (username.trim().length < 3) {
      setError("El nombre de usuario debe tener al menos 3 caracteres.");
      return;
    }
    if (password.trim().length < 4) {
      setError("La contraseña debe tener al menos 4 caracteres.");
      return;
    }

    dispatch(login({ username: username.trim(), role }));
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <span className="login-icon">🛍️</span>
          <h2>¡Bienvenido a MiniMarket!</h2>
          <p>Inicia sesión para explorar la tienda o administrar productos</p>
        </div>

        {error && <div className="login-error-msg">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ej. JuanPerez"
              autoComplete="username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Rol de Acceso</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value as "client" | "admin")}
            >
              <option value="client">Cliente (Comprar productos)</option>
              <option value="admin">Administrador (Gestionar catálogo)</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary login-btn">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};
