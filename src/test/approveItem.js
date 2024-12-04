import { db } from '../services/firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
import { storage } from '../services/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const approveItem = async (itemId) => {
  try {
    console.log('Starting item edit process for ID:', itemId);

    const itemRef = doc(db, 'Items', itemId);
    
    // Prepare the data for update
    const dataToUpdate = {
      'Is Retrieved': 0,
    };

    // Update the document in Firestore
    console.log('Updating Firestore document with data:', dataToUpdate);
    await updateDoc(itemRef, dataToUpdate);
    
    console.log('Item successfully updated');
    return true;
  } catch (error) {
    console.error('Error updating item:', error);
    throw error;
  }
};
