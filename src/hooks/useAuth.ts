import { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '@/config/firebase';
import { User } from '@/types';
import { showToast } from '@/utils/toast';

interface AuthContextType {
  user: User | null;
  login: (userId: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (userId: string, password: string) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        // Buscar dados adicionais do usuário no Firestore
        const userDoc = await db.collection('users').doc(firebaseUser.uid).get();
        setUser({
          uid: firebaseUser.uid,
          userId: userDoc.data()?.userId || ''
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (userId: string, password: string) => {
    try {
      // Implementar lógica de login
      showToast.success('Login realizado com sucesso!');
    } catch (error) {
      showToast.error('Erro ao fazer login');
      throw error;
    }
  };

  const register = async (userId: string, password: string) => {
    // Implementar lógica de registro
  };

  const logout = async () => {
    // Implementar lógica de logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext); 
