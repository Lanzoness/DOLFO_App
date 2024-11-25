import storage from '@react-native-firebase/storage';

export const addImage = async (imageUri) => {
  try {
    if (!imageUri) {
      throw new Error('Invalid image URI');
    }

    const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
    const reference = storage().ref(filename);

    // Check if the reference is valid
    if (!reference) {
      throw new Error('Failed to create storage reference');
    }

    await reference.putFile(imageUri);
    const url = await reference.getDownloadURL();
    console.log('Image uploaded to Firebase Storage:', url);
    console.log('imageUri:', imageUri);
    return url;
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};