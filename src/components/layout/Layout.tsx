import { Box, Container } from '@chakra-ui/react';
import { Navbar } from './Navbar';

export function Layout({ children }) {
  return (
    <Box>
      <Navbar />
      <Container maxW="container.xl" py={8}>
        {children}
      </Container>
    </Box>
  );
}
