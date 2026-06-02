import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Product, deleteProduct } from "../store/productsSlice";
import { addToCart } from "../store/cartSlice";
import { RootState } from "../store";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(addToCart(product));
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.confirm(`¿Estás seguro de que deseas eliminar el producto "${product.title}"?`)) {
      dispatch(deleteProduct(product.id));
    }
  };

  return (
    <div className="product-card">
      <span className="product-card-category">{product.category}</span>
      
      <div className="product-card-image-wrapper">
        <img src={product.image} alt={product.title} className="product-card-image" loading="lazy" />
      </div>

      <div className="product-card-info">
        <h3 className="product-card-title" title={product.title}>
          {product.title}
        </h3>
        <p className="product-card-price">${product.price.toFixed(2)}</p>
      </div>

      <div className="product-card-actions">
        <Link to={`/products/${product.id}`} className="btn btn-secondary product-card-btn-view">
          Detalles
        </Link>

        {user?.role === "client" ? (
          <button
            onClick={handleAddToCart}
            className={`btn ${added ? "btn-success" : "btn-primary"} product-card-btn-action`}
          >
            {added ? "¡Agregado! ✓" : "Comprar"}
          </button>
        ) : (
          <button
            onClick={handleDelete}
            className="btn btn-danger product-card-btn-action"
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};
