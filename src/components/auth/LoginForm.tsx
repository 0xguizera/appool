import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export function LoginForm() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(userId, password);
    } catch (error) {
      console.error('Erro no login:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Implementar interface de formulário */}
    </form>
  );
} 
