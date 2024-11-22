import { db } from '../services/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

async function retrieveLostItem(itemId) {
  const docRef = doc(db, 'Items', itemId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log('Document data:', docSnap.data());
  } else {
    console.log('No such document!');
  }
}

// Example usage
const itemId = 'your_item_id_here';
retrieveLostItem(itemId);