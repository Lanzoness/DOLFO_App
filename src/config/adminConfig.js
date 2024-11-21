import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load environment variables
dotenv.config();

// Load service account key from environment variable or file
const serviceAccountPath = path.resolve(__dirname, '../../config/serviceAccountKey.json');
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY || fs.readFileSync(serviceAccountPath, 'utf8'));

// Initialize Firebase Admin SDK
const app = initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore(app);

export { db };