import { db } from '../services/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';

export async function retrieveAllLost() {
  const itemsRef = collection(db, 'Items');
  const q = query(itemsRef, where('Status', '==', 'Lost'));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    console.log(`Item ID: ${doc.id}, Data: `, doc.data());
  });
}

// Example usage
// retrieveAllLostItems(); // Comment out or remove if not needed