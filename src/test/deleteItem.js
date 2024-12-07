import { db, storage } from '../services/firebaseConfig';
import { doc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';

export const deleteItem = async (itemId, imageUrl) => {
  try {
    console.log('Starting item deletion process for ID:', itemId);

    // If there's an image URL, delete it from Storage first
    if (imageUrl) {
      try {
        // Extract just the filename from the URL
        const filename = imageUrl.split('/').pop().split('?')[0];
        console.log('Attempting to delete file:', filename);

        // Create reference and delete
        const imageRef = ref(storage, filename);
        await deleteObject(imageRef);
        console.log('Image deleted from Storage');
      } catch (imageError) {
        console.error('Error deleting image:', imageError);
        // Stop the process if image deletion fails
        throw new Error('Image deletion failed, aborting item deletion.');
      }
    }

    // Delete the document from Firestore
    const itemRef = doc(db, 'Items', itemId);
    await deleteDoc(itemRef);
    console.log('Document deleted from Firestore');

    console.log('Item successfully deleted');
    return true;
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
};
