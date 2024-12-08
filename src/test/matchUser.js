import { db } from '../services/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { algoHashing } from './algoHashing';

export async function matchUser(credentials) {
  const itemsRef = collection(db, 'Users');
  const hashedPassword = algoHashing(credentials.Password);
  
  const q = query(
    itemsRef, 
    where('DLSUD_ID', '==', credentials.DLSUD_ID), 
    where('Password Hash', '==', hashedPassword['Password Hash'])
  );
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const firstDoc = querySnapshot.docs[0];
    const userData = firstDoc.data();
    console.log(`Database User ID: ${firstDoc.id}, Data: `, firstDoc.data());
    return {
      isAuthenticated: true,
      isAdmin: userData.isAdmin === 1
    };
  } else {
    console.log('No user found.');
    return {
      isAuthenticated: false,
      isAdmin: false
    };
  }
}