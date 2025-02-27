import { useState } from 'react';
import { 
  VStack, 
  FormControl, 
  FormLabel, 
  Input, 
  Button, 
  useToast 
} from '@chakra-ui/react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export function RegisterForm() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register } = useAuth();
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: 'Erro',
        description: 'As senhas não coincidem',
        status: 'error',
        duration: 3000
      });
      return;
    }

    try {
      await register(userId, password);
      router.push('/');
    } catch (error) {
      toast({
        title: 'Erro no registro',
        description: 'Tente novamente mais tarde',
        status: 'error',
        duration: 5000
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>User ID</FormLabel>
          <Input
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Senha</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Confirmar Senha</FormLabel>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormControl>

        <Button type="submit" colorScheme="blue" w="full">
          Registrar
        </Button>
      </VStack>
    </form>
  );
} 
