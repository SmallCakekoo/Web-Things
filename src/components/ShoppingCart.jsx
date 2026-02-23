import { useState } from 'react';
import './ShoppingCart.css';

const initialCats = [
  { id: 1, nombre: 'Gato 1', precio: 45.99 },
  { id: 2, nombre: 'Gato 2', precio: 22.5 },
  { id: 3, nombre: 'Gato 3', precio: 90.17 },
  { id: 4, nombre: 'Gato 4', precio: 245.75 },
];

export function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]); // Estado para guardar

  // Función para agregar un producto al carrito
  const addToCart = (product) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id); //
      // Verificar si el producto ya está en el carrito para que no se duplique, sino que se incremente la cantidad
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      // Si el producto no está en el carrito, agregarlo con cantidad 1
      return [...prevCart, { ...product, cantidad: 1 }];
    });
  };

  // Función para incrementar la cantidad de un producto en el carrito
  const incrementQuantity = (productId) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    );
  };

  // Función para decrementar la cantidad de un producto en el carrito, y eliminarlo si la cantidad llega a 0
  const decrementQuantity = (productId) => {
    setCartItems(
      (prevCart) =>
        prevCart
          .map((item) =>
            item.id === productId ? { ...item, cantidad: item.cantidad - 1 } : item
          )
          .filter((item) => item.cantidad > 0) // Eliminar el producto si la cantidad es 0, para no tener productos con cantidad negativa en el carrito
    );
  };

  // Función para eliminar un producto del carrito completamente con el btn
  const removeProduct = (productId) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Se usa reduce para calcular el total de items y el total del precio del carrito, sumando la cantidad de cada producto y multiplicando por su precio
  const totals = cartItems.reduce(
    (acc, item) => ({
      totalItems: acc.totalItems + item.cantidad,
      totalPrice: acc.totalPrice + item.precio * item.cantidad,
    }),
    { totalItems: 0, totalPrice: 0 }
  );

  // Se extraen los totales para mostrarlos en el resumen del carrito
  const totalItems = totals.totalItems;
  const totalPrice = totals.totalPrice;

  return (
    <div className="shopping-cart">
      <h2>Gatos disponibles</h2>
      <ul className="products-list">
        {initialCats.map((product) => (
          <li key={product.id} className="product-item">
            <div>
              <b>{product.nombre}</b>
              <p>${product.precio}</p>
            </div>
            <button onClick={() => addToCart(product)}>Agregar</button>
          </li>
        ))}
      </ul>

      <h2>Carrito</h2>
      {cartItems.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <ul className="cart-list">
          {cartItems.map((item) => (
            <li key={item.id} className="cart-item">
              <div>
                <b>{item.nombre}</b>
                <p>
                  ${item.precio} x {item.cantidad}
                </p>
              </div>

              <div className="actions">
                <button onClick={() => decrementQuantity(item.id)}>-</button>
                <button onClick={() => incrementQuantity(item.id)}>+</button>
                <button onClick={() => removeProduct(item.id)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="summary">
        <p>Cantidad total de Gatos: {totalItems}</p>
        <p>Total del carrito: ${totalPrice}</p>
      </div>
    </div>
  );
}
