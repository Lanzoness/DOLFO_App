import { db } from '../services/firebaseConfig';
import { doc, deleteDoc } from 'firebase/firestore';
import storage from '@react-native-firebase/storage';

export const deleteItem = async (itemId, imageUrl) => {
  try {
    console.log('Starting item deletion process for ID:', itemId);

    // If there's an image URL, delete it from Storage first
    if (imageUrl) {
      try {
        // Extract filename from the URL
        let filename;
        if (imageUrl.startsWith('gs://')) {
          // Handle gs:// URL
          filename = imageUrl.split('/').pop();
        } else {
          // Handle https:// URL
          filename = imageUrl.split('/o/')[1].split('?')[0];
          filename = decodeURIComponent(filename);
        }
        
        console.log('Attempting to delete file:', filename);

        // Create reference using React Native Firebase
        const reference = storage().ref(filename);
        await reference.delete();
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
