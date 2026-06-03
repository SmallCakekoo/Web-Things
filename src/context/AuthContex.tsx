import { createContext, useState, type PropsWithChildren } from "react";

export interface AppUser {
  email: string;
  role: "admin" | "user";
}

export interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => void;
  register: (email: string, password: string, role: "admin" | "user") => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser]     = useState<AppUser | null>(null);
  const [loading]           = useState<boolean>(false);
  const [error, setError]   = useState<string | null>(null);
  // Usuarios registrados en memoria: [email, password, role]
  const [users, setUsers]   = useState<[string, string, "admin" | "user"][]>([]);

  const login = (email: string, password: string) => {
    const found = users.find(([e, p]) => e === email && p === password);
    if (found) {
      setUser({ email: found[0], role: found[2] });
      setError(null);
    } else {
      setError("Credenciales incorrectas");
    }
  };

  const register = (email: string, password: string, role: "admin" | "user") => {
    if (users.find(([e]) => e === email)) {
      setError("El usuario ya existe");
      return;
    }
    setUsers(prev => [...prev, [email, password, role]]);
    setUser({ email, role });
    setError(null);
  };

  const logout = () => {
    setUser(null);
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}