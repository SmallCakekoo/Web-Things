import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { cartItems, clearCart } = useCart();
  const location = useLocation();

  const totalItemsInCart = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    logout();
    clearCart(); // Limpiamos el carrito al cerrar sesión para mayor seguridad
  };

  if (!user) return null;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/products" className="navbar-logo">
          🛍️ MiniMarket Redux
        </Link>
        
        <div className="navbar-menu">
          <div className="navbar-links">
            <Link
              to="/products"
              className={`navbar-link ${location.pathname.startsWith("/products") ? "active" : ""}`}
            >
              Tienda
            </Link>

            {user.role === "client" ? (
              <Link
                to="/cart"
                className={`navbar-link ${location.pathname === "/cart" ? "active" : ""}`}
              >
                Carrito
                {totalItemsInCart > 0 && (
                  <span className="navbar-badge">{totalItemsInCart}</span>
                )}
              </Link>
            ) : (
              <Link
                to="/admin/dashboard"
                className={`navbar-link ${location.pathname === "/admin/dashboard" ? "active" : ""}`}
              >
                Panel Admin
              </Link>
            )}
          </div>

          <div className="navbar-user-info">
            <div className="user-profile-badge">
              <span className="user-name">{user.username}</span>
              <span className={`user-role-tag role-${user.role}`}>
                {user.role === "admin" ? "Administrador" : "Cliente"}
              </span>
            </div>
            
            <button onClick={handleLogout} className="navbar-logout-btn">
              Salir
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
