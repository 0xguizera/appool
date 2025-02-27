import { ListaPosicoes } from '@/components/posicoes/ListaPosicoes';
import { Layout } from '@/components/layout/Layout';
import { AuthProvider } from '@/hooks/useAuth';

export default function Home() {
  return (
    <AuthProvider>
      <Layout>
        <ListaPosicoes />
      </Layout>
    </AuthProvider>
  );
}
