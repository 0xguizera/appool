import { GoogleSpreadsheet } from 'google-spreadsheet';

const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID;
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;

export async function getGoogleSheetsInstance() {
  const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
  
  await doc.useServiceAccountAuth({
    client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL!,
    private_key: GOOGLE_PRIVATE_KEY!,
  });
  
  await doc.loadInfo();
  return doc;
} 
