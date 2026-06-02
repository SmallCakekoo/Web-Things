import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { ProductCard } from "../components/ProductCard";

export const ProductList: React.FC = () => {
  const { items, status, error } = useSelector((state: RootState) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("");

  const categories = Array.from(new Set(items.map((item) => item.category)));

  const filteredProducts = items
    .filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") {
        return a.price - b.price;
      } else if (sortBy === "price-desc") {
        return b.price - a.price;
      }
      return 0;
    });

  return (
    <div className="container">
      <header className="page-header">
        <h1>Catálogo de Productos</h1>
        <p>Explora nuestros artículos disponibles y agrega productos al carrito</p>
      </header>

      <section className="filters-section">
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Buscar productos por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button className="clear-btn" onClick={() => setSearchTerm("")}>
              ✕
            </button>
          )}
        </div>

        <div className="filters-controls">
          <div className="filter-group">
            <label htmlFor="category-select">Categoría: </label>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              <option value="">Todas las categorías</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="sort-select">Ordenar por: </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="">Destacados</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
            </select>
          </div>
        </div>
      </section>

      {status === "loading" && items.length === 0 ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Cargando productos de la API externa...</p>
        </div>
      ) : status === "failed" && items.length === 0 ? (
        <div className="error-state">
          <p>⚠️ Error al cargar productos: {error}</p>
          <button className="btn btn-primary" onClick={() => window.location.reload()}>
            Reintentar
          </button>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="empty-state">
          <p>No se encontraron productos con los criterios de búsqueda.</p>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
