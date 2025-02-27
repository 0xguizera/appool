import { Box, Text, Button, VStack, HStack } from '@chakra-ui/react';

interface PosicaoProps {
  id: string;
  tokenPrincipal: string;
  tokenSecundario: string;
  invest: number;
  status: string;
  impermanentLoss: number;
  ganhoPorDia: number;
}

export function CardPosicao({ posicao }: { posicao: PosicaoProps }) {
  return (
    <Box 
      p={6} 
      borderWidth="1px" 
      borderRadius="lg" 
      bg="white"
      shadow="md"
    >
      <VStack align="stretch" spacing={4}>
        <Text fontWeight="bold">
          {posicao.tokenPrincipal}/{posicao.tokenSecundario}
        </Text>
        
        <HStack justify="space-between">
          <Text>Investimento:</Text>
          <Text>{posicao.invest} ETH</Text>
        </HStack>

        <HStack justify="space-between">
          <Text>IL:</Text>
          <Text color={posicao.impermanentLoss < 0 ? "red.500" : "green.500"}>
            {posicao.impermanentLoss.toFixed(4)} ETH
          </Text>
        </HStack>

        <HStack justify="space-between">
          <Text>Ganho Diário:</Text>
          <Text>{posicao.ganhoPorDia.toFixed(4)} ETH</Text>
        </HStack>

        <Button colorScheme="blue">
          Remontar Posição
        </Button>
      </VStack>
    </Box>
  );
} 
