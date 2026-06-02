import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./productsSlice";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalAmount: number;
}

const loadCart = (): CartItem[] => {
  const data = localStorage.getItem("cart_data");
  return data ? JSON.parse(data) : [];
};

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
};

const initialItems = loadCart();
const initialState: CartState = {
  items: initialItems,
  totalAmount: calculateTotal(initialItems),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find((item) => item.product.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }
      state.totalAmount = calculateTotal(state.items);
      localStorage.setItem("cart_data", JSON.stringify(state.items));
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.product.id !== action.payload);
      state.totalAmount = calculateTotal(state.items);
      localStorage.setItem("cart_data", JSON.stringify(state.items));
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const existingItem = state.items.find((item) => item.product.id === action.payload);
      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter((item) => item.product.id !== action.payload);
        } else {
          existingItem.quantity -= 1;
        }
      }
      state.totalAmount = calculateTotal(state.items);
      localStorage.setItem("cart_data", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      localStorage.removeItem("cart_data");
    },
  },
});

export const { addToCart, removeFromCart, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
