import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [added, setAdded] = useState(false);

  const { products, loading, error } = useProducts();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const product = products.find((item) => item.id === Number(id));

  const handleAddToCart = () => {
    if (product) {
      addToCart({ productId: product.id, quantity: 1, price: product.price });
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    }
  };

  if (loading && !product) {
    return (
      <div className="container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Cargando detalles del producto...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container">
        <div className="error-state">
          <p>⚠️ El producto solicitado no existe o fue eliminado.</p>
          <div className="actions-row">
            <Link to="/products" className="btn btn-secondary">
              Volver a la tienda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="back-link-container">
        <Link to="/products" className="back-link">
          ← Volver a la tienda
        </Link>
      </div>

      <div className="product-detail-card">
        <div className="detail-grid">
          <div className="detail-visuals">
            <div className="detail-image-wrapper">
              <img src={product.image} alt={product.title} className="detail-image" />
            </div>
            <span className="product-detail-category-badge">{product.category}</span>
          </div>

          <div className="detail-info">
            <h1 className="detail-title">{product.title}</h1>
            
            <div className="detail-price-box">
              <span className="price-label">Precio:</span>
              <span className="price-value">${product.price.toFixed(2)}</span>
            </div>

            <div className="info-group">
              <h3>Descripción</h3>
              <p className="detail-description">{product.description}</p>
            </div>

            <div className="actions-section">
              {user?.role === "client" ? (
                <button
                  onClick={handleAddToCart}
                  className={`btn ${added ? "btn-success" : "btn-primary"} btn-large`}
                >
                  {added ? "¡Agregado al Carrito! ✓" : "Agregar al Carrito"}
                </button>
              ) : (
                <div className="status-msg warning-msg">
                  ℹ️ Estás viendo este detalle con perfil de Administrador. Para comprar, ingresa como Cliente.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
