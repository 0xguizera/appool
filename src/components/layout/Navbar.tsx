import { Box, Flex, Button, Text } from '@chakra-ui/react';
import { useAuth } from '@/hooks/useAuth';

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <Box bg="blue.500" px={4} py={2}>
      <Flex justify="space-between" align="center" maxW="container.xl" mx="auto">
        <Text color="white" fontSize="xl" fontWeight="bold">
          Calculadora DeFi
        </Text>
        
        <Flex align="center" gap={4}>
          {user ? (
            <>
              <Text color="white">
                {user.userId}
              </Text>
              <Button 
                colorScheme="whiteAlpha" 
                size="sm"
                onClick={logout}
              >
                Sair
              </Button>
            </>
          ) : (
            <Button colorScheme="whiteAlpha" size="sm">
              Login
            </Button>
          )}
        </Flex>
      </Flex>
    </Box>
  );
} 
