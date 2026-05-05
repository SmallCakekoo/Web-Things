import React, { createContext, useState, useEffect, type PropsWithChildren } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { authService } from "../firebase/firebaseConfig";

export interface AuthContextType {
    user: User | null;
    uid: string | null;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // onAuthStateChanged devuelve una función para desuscribirse del listener
        const unsubscribe = onAuthStateChanged(authService, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        // Limpiamos el listener cuando el componente se desmonta
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, uid: user ? user.uid : null, loading }}>
            {children}
        </AuthContext.Provider>
    );
}