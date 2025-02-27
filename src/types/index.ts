export interface User {
  uid: string;
  userId: string;
}

export interface Posicao {
  id: string;
  userId: string;
  tokenPrincipal: string;
  tokenSecundario: string;
  invest: number;
  precoAbertura: number;
  precoMin: number;
  precoMax: number;
  taxaAbertura: number;
  status: 'MONTAGEM' | 'REMONTAGEM' | 'REMOVIDA';
  timestamp: Date;
} 
