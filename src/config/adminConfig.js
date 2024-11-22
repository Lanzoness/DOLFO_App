import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Load service account key from a JSON file
const serviceAccount = require('../../config/serviceAccountKey.json');

const app = initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore(app);

export { db };