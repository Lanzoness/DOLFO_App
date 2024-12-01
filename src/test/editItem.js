import { db } from '../services/firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
import { storage } from '../services/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const editItem = async (itemId, updatedData) => {
  try {
    console.log('Starting item edit process for ID:', itemId);
    console.log('Updated data:', updatedData);

    const itemRef = doc(db, 'Items', itemId);
    
    // Prepare the data for update
    const dataToUpdate = {
      'Finder Name': updatedData.finderName,
      'Finder ID': updatedData.finderID,
      'Item Name': updatedData.itemName,
      'Location Found': updatedData.locationFound,
      'Owner Name': updatedData.ownerName,
      'Owner ID': updatedData.ownerID,
      'Category': updatedData.selectedCategory,
      'Description': updatedData.inputs,
      'Is Retrieved': updatedData.isRetrieved,
      'Date Retrieved': updatedData.isRetrieved ? new Date().toISOString() : null
    };

    // If there's new image data, upload it first
    if (updatedData.imageData && updatedData.imageData.uri && updatedData.imageData.uri.startsWith('file://')) {
      console.log('Uploading new image...');
      const response = await fetch(updatedData.imageData.uri);
      const blob = await response.blob();
      
      const imageRef = ref(storage, `items/${itemId}_${Date.now()}`);
      await uploadBytes(imageRef, blob);
      
      const imageUrl = await getDownloadURL(imageRef);
      dataToUpdate.Image = imageUrl;
    }

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
