import { db, storage } from '../services/firebaseConfig';
import { doc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';

export const deleteItem = async (itemId, imageUrl) => {
  try {
    console.log('Starting item deletion process for ID:', itemId);

    // Delete the document from Firestore
    const itemRef = doc(db, 'Items', itemId);
    await deleteDoc(itemRef);
    console.log('Document deleted from Firestore');

    // If there's an image URL, delete it from Storage
    if (imageUrl) {
      try {
        // Get the storage reference from the image URL
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
        console.log('Image deleted from Storage');
      } catch (imageError) {
        console.error('Error deleting image:', imageError);
        // Continue with the process even if image deletion fails
      }
    }

    console.log('Item successfully deleted');
    return true;
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
};
