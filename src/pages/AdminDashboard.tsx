import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { createProduct, deleteProduct } from "../store/productsSlice";

export const AdminDashboard: React.FC = () => {
  const { items } = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("electronics");
  const [customCategory, setCustomCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80");
  
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const totalProducts = items.length;
  const uniqueCategories = Array.from(new Set(items.map((item) => item.category))).length;
  const avgPrice = totalProducts > 0 
    ? items.reduce((acc, item) => acc + item.price, 0) / totalProducts 
    : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    setError(null);

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setError("Por favor, ingresa un precio válido mayor a 0.");
      return;
    }

    const finalCategory = category === "other" ? customCategory.trim() : category;
    if (category === "other" && !finalCategory) {
      setError("Por favor, especifica la categoría personalizada.");
      return;
    }

    dispatch(
      createProduct({
        title: title.trim(),
        price: parsedPrice,
        category: finalCategory.toLowerCase(),
        description: description.trim(),
        image: image.trim() || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80",
      })
    );

    setTitle("");
    setPrice("");
    setDescription("");
    setCustomCategory("");
    setFeedback("¡Producto creado con éxito y agregado al catálogo!");
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleDelete = (id: number, productTitle: string) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar el producto "${productTitle}"?`)) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <div className="container">
      <header className="page-header">
        <h1>Panel de Administración</h1>
        <p>Gestiona el inventario de la tienda, monitorea métricas y añade nuevos productos</p>
      </header>

      <section className="analytics-grid">
        <div className="analytics-card-item">
          <span className="analytics-icon">📦</span>
          <div className="analytics-info">
            <span className="analytics-label">Artículos Totales</span>
            <span className="analytics-val">{totalProducts}</span>
          </div>
        </div>

        <div className="analytics-card-item">
          <span className="analytics-icon">🗂️</span>
          <div className="analytics-info">
            <span className="analytics-label">Categorías</span>
            <span className="analytics-val">{uniqueCategories}</span>
          </div>
        </div>

        <div className="analytics-card-item">
          <span className="analytics-icon">💰</span>
          <div className="analytics-info">
            <span className="analytics-label">Precio Promedio</span>
            <span className="analytics-val">${avgPrice.toFixed(2)}</span>
          </div>
        </div>
      </section>

      <div className="dashboard-grid">
        <section className="dashboard-card form-section">
          <h2>Crear Nuevo Producto</h2>
          
          {feedback && <div className="status-msg success-msg">{feedback}</div>}
          {error && <div className="status-msg error-msg-alert">{error}</div>}

          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-group">
              <label htmlFor="title">Título del Producto</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej. Audífonos Bluetooth Inalámbricos"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price">Precio ($)</label>
                <input
                  type="number"
                  step="0.01"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Ej. 49.99"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Categoría</label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="electronics">Electrónicos</option>
                  <option value="jewelery">Joyería</option>
                  <option value="men's clothing">Ropa de Hombre</option>
                  <option value="women's clothing">Ropa de Mujer</option>
                  <option value="other">Personalizada...</option>
                </select>
              </div>
            </div>

            {category === "other" && (
              <div className="form-group">
                <label htmlFor="custom-category">Categoría Personalizada</label>
                <input
                  type="text"
                  id="custom-category"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  placeholder="Ej. Deportes"
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="image">URL de la Imagen</label>
              <input
                type="url"
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Ej. https://url-de-la-imagen.com/foto.jpg"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Descripción</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe las especificaciones y características del producto..."
                rows={4}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-submit-admin">
              Guardar en Catálogo
            </button>
          </form>
        </section>

        <section className="dashboard-card list-section">
          <h2>Administrar Catálogo</h2>
          
          <div className="table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Título</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {items.map((prod) => (
                  <tr key={prod.id}>
                    <td>{prod.id.toString().slice(-4)}</td>
                    <td className="table-title-cell" title={prod.title}>
                      {prod.title}
                    </td>
                    <td className="table-category-cell">{prod.category}</td>
                    <td>${prod.price.toFixed(2)}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(prod.id, prod.title)}
                        className="btn btn-danger btn-table-action"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};
