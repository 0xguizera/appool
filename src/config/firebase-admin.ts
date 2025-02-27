import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

if (!process.env.FIREBASE_ADMIN_PRIVATE_KEY) {
  throw new Error('Firebase Admin Private Key não encontrada');
}

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n'),
};

const app = initializeApp({
  credential: cert(serviceAccount)
});

export const adminDb = getFirestore(app); 
