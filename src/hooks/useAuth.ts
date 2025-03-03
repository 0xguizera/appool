import { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '@/config/firebase';
import { User } from '@/types';
import { showToast } from '@/utils/toast';
import { collection, doc, getDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  login: (userId: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (userId: string, password: string) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
  loading: false
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const userDocRef = doc(collection(db, 'users'), firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);
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
      const userCredential = await signInWithEmailAndPassword(auth, `${userId}@app.com`, password);
      showToast.success('Login realizado com sucesso!');
      return userCredential;
    } catch (error) {
      showToast.error('Erro ao fazer login');
      throw error;
    }
  };

  const register = async (userId: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, `${userId}@app.com`, password);
      await doc(collection(db, 'users'), userCredential.user.uid).set({
        userId,
        createdAt: new Date()
      });
      showToast.success('Registro realizado com sucesso!');
    } catch (error) {
      showToast.error('Erro ao fazer registro');
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      showToast.success('Logout realizado com sucesso!');
    } catch (error) {
      showToast.error('Erro ao fazer logout');
      throw error;
    }
  };

  const value = {
    user,
    login,
    logout,
    register,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
