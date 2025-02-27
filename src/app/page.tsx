'use client';

import { Box, Container, VStack, Heading } from '@chakra-ui/react';
import { RegisterForm } from '@/components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <Container maxW="container.sm" py={10}>
      <VStack spacing={8}>
        <Heading>Registro</Heading>
        <Box w="full">
          <RegisterForm />
        </Box>
      </VStack>
    </Container>
  );
}
