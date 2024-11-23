import { db } from '../services/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export async function addLostItem(item) {
  try {
    const docRef = await addDoc(collection(db, 'Items'), item);
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}
/*
// Example usage
const newItem = {
  Name: 'Lost Wallet',
  Category: 'Accessories',
  Picture: 'url_to_picture',
  Description: 'Black leather wallet',
  FinderName: 'John Doe',
  FinderID: 'user123',
  OwnerName: '',
  OwnerID: '',
  DateFound: new Date().toISOString(),
  LocationFound: 'Central Park',
  DateClaimed: '',
  Status: 'Lost'
};

addLostItem(newItem);
*/