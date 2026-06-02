import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

interface ProductContextProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  addProduct: (product: Omit<Product, 'id'>) => void;
  removeProduct: (id: number) => void;
}

const ProductContext = createContext<ProductContextProps | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load persisted admin-added products
  const loadLocal = () => {
    const stored = localStorage.getItem('adminProducts');
    return stored ? JSON.parse(stored) as Product[] : [];
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        const data: Product[] = await res.json();
        const local = loadLocal();
        setProducts([...data, ...local]);
      } catch (e) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProd: Product = { ...product, id: Date.now() };
    setProducts((prev) => {
      const updated = [...prev, newProd];
      const local = updated.filter((p) => p.id >= 1e12); // arbitrary large id for local items
      local.length && localStorage.setItem('adminProducts', JSON.stringify(local));
      return updated;
    });
  };

  const removeProduct = (id: number) => {
    setProducts((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      const local = updated.filter((p) => p.id >= 1e12);
      if (local.length) localStorage.setItem('adminProducts', JSON.stringify(local));
      else localStorage.removeItem('adminProducts');
      return updated;
    });
  };

  return (
    <ProductContext.Provider value={{ products, loading, error, addProduct, removeProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error('useProducts must be used within ProductProvider');
  return ctx;
};
