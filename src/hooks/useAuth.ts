'use client';

import { createContext, useContext, useState } from 'react';
import { auth } from '@/config/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

type AuthContextType = {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

// Criando o contexto com valor inicial
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: async () => {}
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);

  const login = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Erro no logout:', error);
      throw error;
    }
  };

  // Criando o objeto de contexto
  const contextValue: AuthContextType = {
    user,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
