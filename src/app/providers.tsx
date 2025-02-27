'use client';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { AuthProvider } from '@/hooks/useAuth';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.50'
      }
    }
  }
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ChakraProvider>
  );
} 
