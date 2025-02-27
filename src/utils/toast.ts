import { createStandaloneToast } from '@chakra-ui/react';

const { toast } = createStandaloneToast();

export const showToast = {
  success: (message: string) => {
    toast({
      title: 'Sucesso',
      description: message,
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top-right'
    });
  },
  error: (message: string) => {
    toast({
      title: 'Erro',
      description: message,
      status: 'error',
      duration: 5000,
      isClosable: true,
      position: 'top-right'
    });
  }
}; 
