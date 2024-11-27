import { db } from '../services/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { algoHashing } from './algoHashing';

export async function matchPasswordAdmin(password) {
  try {
    const hashedPassword = algoHashing(password);
    const itemsRef = collection(db, 'AdminPasswords');
    const q = query(itemsRef, where('Password Hash', '==', hashedPassword['Password Hash']));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const firstDoc = querySnapshot.docs[0];
      console.log(`Password Hash ID: ${firstDoc.id}, Hash: `, firstDoc.data());
      return true;
    }
    console.log('Invalid admin password.');
    return false;
  } catch (error) {
    console.error('Error checking admin password:', error);
    return false;
  }
}