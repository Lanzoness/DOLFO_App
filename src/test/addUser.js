import { db } from '../services/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export async function addUser(item) {
  try {
    const docRef = await addDoc(collection(db, 'Users'), item);
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}
/*
// Example usage
const newUser = {
  Name: 'Lanzones',
  Email: 'abc@def.com',
  DLSUD_ID: '202231095',
  isAdmin: 0
};

addUser(newUser);
*/