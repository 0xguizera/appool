import { db } from '@/config/firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { getGoogleSheetsInstance } from './sheets';

export async function salvarPosicao(dados: any, userId: string) {
  // Salvar no Firestore
  await addDoc(collection(db, 'posicoes'), {
    ...dados,
    userId,
    timestamp: new Date(),
    status: 'MONTAGEM'
  });

  // Salvar no Google Sheets
  const doc = await getGoogleSheetsInstance();
  const sheet = doc.sheetsByIndex[0];
  await sheet.addRow({
    ...dados,
    USER_ID: userId,
    TIMESTAMP: new Date().toISOString()
  });
}

export async function buscarPosicoes(userId: string) {
  const q = query(
    collection(db, 'posicoes'),
    where('userId', '==', userId)
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
} 
