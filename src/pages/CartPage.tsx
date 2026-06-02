import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../store";
import { addToCart, decreaseQuantity, removeFromCart, clearCart } from "../store/cartSlice";

export const CartPage: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalAmount = useSelector((state: RootState) => state.cart.totalAmount);
  const dispatch = useDispatch();

  const [checkingOut, setCheckingOut] = useState(false);
  const [success, setSuccess] = useState(false);

  const subtotal = totalAmount;
  const tax = subtotal * 0.19;
  const total = subtotal + tax;

  const handleCheckout = () => {
    setCheckingOut(true);
    setTimeout(() => {
      setCheckingOut(false);
      setSuccess(true);
      dispatch(clearCart());
    }, 2000);
  };

  if (success) {
    return (
      <div className="container">
        <div className="checkout-success-card">
          <div className="success-icon">🎉</div>
          <h2>¡Felicidades por tu Compra!</h2>
          <p>Tu orden ha sido procesada exitosamente en el sistema.</p>
          <div className="success-details">
            <p>Se ha enviado una factura electrónica al correo del usuario.</p>
            <p>¡Gracias por confiar en MiniMarket Redux!</p>
          </div>
          <Link to="/products" className="btn btn-primary" onClick={() => setSuccess(false)}>
            Volver a la Tienda
          </Link>
        </div>
      </div>
    );
  }

  if (checkingOut) {
    return (
      <div className="container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Procesando transacción bancaria segura...</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container">
        <div className="empty-state">
          <span className="empty-icon">🛒</span>
          <h2>Tu carrito está vacío</h2>
          <p>Explora nuestro catálogo y agrega productos para iniciar tu compra.</p>
          <div style={{ marginTop: "20px" }}>
            <Link to="/products" className="btn btn-primary">
              Ir a la tienda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <header className="page-header">
        <h1>Tu Carrito de Compras</h1>
        <p>Revisa los artículos agregados y completa tu pedido</p>
      </header>

      <div className="cart-layout">
        <div className="cart-items-list">
          {cartItems.map((item) => (
            <div key={item.product.id} className="cart-item-row">
              <div className="cart-item-image-wrapper">
                <img src={item.product.image} alt={item.product.title} className="cart-item-image" />
              </div>

              <div className="cart-item-details">
                <h3 className="cart-item-title">{item.product.title}</h3>
                <span className="cart-item-category">{item.product.category}</span>
                <p className="cart-item-price-unit">Precio unitario: ${item.product.price.toFixed(2)}</p>
              </div>

              <div className="cart-item-quantity-controls">
                <button
                  onClick={() => dispatch(decreaseQuantity(item.product.id))}
                  className="quantity-btn"
                  title="Restar uno"
                >
                  -
                </button>
                <span className="quantity-value">{item.quantity}</span>
                <button
                  onClick={() => dispatch(addToCart(item.product))}
                  className="quantity-btn"
                  title="Sumar uno"
                >
                  +
                </button>
              </div>

              <div className="cart-item-subtotal">
                <p className="cart-subtotal-val">${(item.product.price * item.quantity).toFixed(2)}</p>
                <button
                  onClick={() => dispatch(removeFromCart(item.product.id))}
                  className="cart-remove-item-btn"
                  title="Quitar del carrito"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        <aside className="cart-summary-panel">
          <h3>Resumen del Pedido</h3>
          
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>IVA (19%):</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          <div className="summary-row total-row">
            <span>Total a pagar:</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button onClick={handleCheckout} className="btn btn-primary btn-checkout">
            Finalizar Compra
          </button>

          <div className="checkout-badge-security">
            🔒 Transacción encriptada y segura
          </div>
        </aside>
      </div>
    </div>
  );
};
