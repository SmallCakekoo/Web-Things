import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

interface ProductsState {
  items: Product[];
  apiItems: Product[];
  customItems: Product[];
  deletedIds: number[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Cargar estado inicial desde localStorage
const loadCustomItems = (): Product[] => {
  const data = localStorage.getItem("custom_products");
  return data ? JSON.parse(data) : [];
};

const loadDeletedIds = (): number[] => {
  const data = localStorage.getItem("deleted_product_ids");
  return data ? JSON.parse(data) : [];
};

const initialState: ProductsState = {
  items: [],
  apiItems: [],
  customItems: loadCustomItems(),
  deletedIds: loadDeletedIds(),
  status: "idle",
  error: null,
};

// Thunk asíncrono para obtener productos desde FakeStoreAPI
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  if (!response.ok) {
    throw new Error("No se pudieron obtener los productos de la API");
  }
  const data = await response.json();
  return data as Product[];
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    createProduct: (state, action: PayloadAction<Omit<Product, "id">>) => {
      const newProduct: Product = {
        ...action.payload,
        id: Date.now(), // ID único local
      };
      state.customItems.unshift(newProduct);
      localStorage.setItem("custom_products", JSON.stringify(state.customItems));
      
      // Recombinar items
      state.items = [
        ...state.customItems,
        ...state.apiItems.filter((item) => !state.deletedIds.includes(item.id)),
      ];
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      const idToDelete = action.payload;
      
      // Buscar si es un producto creado localmente
      const isCustom = state.customItems.some((item) => item.id === idToDelete);
      
      if (isCustom) {
        state.customItems = state.customItems.filter((item) => item.id !== idToDelete);
        localStorage.setItem("custom_products", JSON.stringify(state.customItems));
      } else {
        // Si viene de la API, agregamos su ID a la lista de eliminados
        if (!state.deletedIds.includes(idToDelete)) {
          state.deletedIds.push(idToDelete);
          localStorage.setItem("deleted_product_ids", JSON.stringify(state.deletedIds));
        }
      }
      
      // Recombinar items
      state.items = [
        ...state.customItems,
        ...state.apiItems.filter((item) => !state.deletedIds.includes(item.id)),
      ];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = "succeeded";
        state.apiItems = action.payload;
        // Combinar datos locales y externos
        state.items = [
          ...state.customItems,
          ...state.apiItems.filter((item) => !state.deletedIds.includes(item.id)),
        ];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Error desconocido al cargar productos";
        // Si falla el fetch, intentamos renderizar lo que tengamos localmente
        state.items = [...state.customItems];
      });
  },
});

export const { createProduct, deleteProduct } = productsSlice.actions;
export default productsSlice.reducer;
