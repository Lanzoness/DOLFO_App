import { db } from '../services/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { algoHashing } from './algoHashing';

export async function addPasswordAdmin(password) {
  try {
    const docRef = await addDoc(collection(db, 'AdminPasswords'), algoHashing(password));
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}