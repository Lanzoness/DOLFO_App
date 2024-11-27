import { db } from '../services/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { algoHashing } from './algoHashing';

export async function addUser(item) {
  try {
    const userWithHashedPassword = {
      ...item,
      'Password Hash': algoHashing(item.Password)['Password Hash']
    };
    delete userWithHashedPassword.Password; // Remove plain text password

    const docRef = await addDoc(collection(db, 'Users'), userWithHashedPassword);
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