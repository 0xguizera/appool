'use client';

import { Box, Container, VStack, Heading } from '@chakra-ui/react';
import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <Container maxW="container.sm" py={10}>
      <VStack spacing={8}>
        <Heading>Login</Heading>
        <Box w="full">
          <LoginForm />
        </Box>
      </VStack>
    </Container>
  );
}
