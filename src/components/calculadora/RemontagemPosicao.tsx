import { useState } from 'react';
import { Box, VStack, FormControl, FormLabel, Input, Button, NumberInput, NumberInputField } from '@chakra-ui/react';
import { calcularResultados } from '@/utils/calculos';
import { salvarPosicao } from '@/services/posicoes';
import { useAuth } from '@/hooks/useAuth';

interface RemontagemProps {
  posicaoOriginal: {
    id: string;
    tokenPrincipal: string;
    tokenSecundario: string;
    invest: number;
    precoAbertura: number;
  };
}

export function RemontagemPosicao({ posicaoOriginal }: RemontagemProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    novoInvest: posicaoOriginal.invest.toString(),
    precoReabertura: '',
    novoPrecoMin: '',
    novoPrecoMax: '',
    taxaReabertura: '',
    ganhoTaxas24h: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const dados = {
      ...formData,
      posicaoOriginalId: posicaoOriginal.id,
      tokenPrincipal: posicaoOriginal.tokenPrincipal,
      tokenSecundario: posicaoOriginal.tokenSecundario,
      status: 'REMONTAGEM' as const
    };

    await salvarPosicao(dados, user.uid);
  };

  return (
    <Box as="form" onSubmit={handleSubmit} p={6} bg="white" borderRadius="lg" shadow="md">
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Novo Investimento (ETH)</FormLabel>
          <NumberInput min={0}>
            <NumberInputField
              value={formData.novoInvest}
              onChange={(e) => setFormData(prev => ({ ...prev, novoInvest: e.target.value }))}
            />
          </NumberInput>
        </FormControl>

        {/* Adicionar outros campos do formulário */}

        <Button type="submit" colorScheme="blue" w="full">
          Confirmar Remontagem
        </Button>
      </VStack>
    </Box>
  );
} 
