interface DadosCalculo {
  invest: number;
  precoAbertura: number;
  precoMin: number;
  precoMax: number;
  taxaAbertura: number;
  saidaTokenSecundario: number;
  saidaTokenPrincipal: number;
  ganhoTaxas24h: number;
}

export function calcularResultados(dados: DadosCalculo) {
  const impermanentLoss = dados.saidaTokenSecundario - dados.invest;
  const impermanentGain = dados.saidaTokenPrincipal - dados.invest;
  const riscoTotal = -impermanentLoss + dados.taxaAbertura;
  const ganhoPorDia = dados.invest * dados.ganhoTaxas24h;
  const eliminacaoRisco = Math.abs(riscoTotal / ganhoPorDia);
  
  return {
    impermanentLoss,
    impermanentGain,
    riscoTotal,
    ganhoPorDia,
    eliminacaoRisco
  };
} 
