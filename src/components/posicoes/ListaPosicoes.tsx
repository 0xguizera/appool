import { useEffect, useState } from 'react';
import { Box, Grid } from '@chakra-ui/react';
import { buscarPosicoes } from '@/services/posicoes';
import { CardPosicao } from './CardPosicao';
import { useAuth } from '@/hooks/useAuth';

export function ListaPosicoes() {
  const [posicoes, setPosicoes] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      carregarPosicoes();
    }
  }, [user]);

  async function carregarPosicoes() {
    const dados = await buscarPosicoes(user.uid);
    setPosicoes(dados);
  }

  return (
    <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
      {posicoes.map(posicao => (
        <CardPosicao key={posicao.id} posicao={posicao} />
      ))}
    </Grid>
  );
} 
