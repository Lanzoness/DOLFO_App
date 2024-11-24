import React, { useState } from 'react';
import { View, Image, StyleSheet, Dimensions, Modal, Text, TouchableOpacity, TouchableHighlight } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import UserPalette from '../constants/UserPalette';
import FontSize from '../constants/FontSize';

/**
 * Component to upload an image
 */
const UploadImageBox = () => {
  const [imageData, setImageData] = useState(null); // Stores image URI for display
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [buttonText, setButtonText] = useState('Upload Image'); // State for button text
  const [buttonPressed, setButtonPressed] = useState(false); // State for button press

  const screenWidth = Dimensions.get('window').width; // takes the width of the screen

  /**
   * Function to handle image upload
   * @mediaType {string} - Type of media to pick
   * @cameraType {string} - Type of camera to use
   * @saveToPhotos {boolean} - Save image to gallery
   */
  const handleTakePhoto = () => {
    const options = {
      mediaType: 'photo',
      cameraType: 'back',
      saveToPhotos: true,
    };

    /**
     * Launch camera to take a photo
     * @options {object} - Options for the camera
    */
    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.error('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets) {
        const { uri, width, height } = response.assets[0];
        setImageData({ uri, width, height }); // Save image data
        setButtonText('Change Image'); // Change button text after image upload
      }
      setIsModalVisible(false); // Close modal after action
    });
  };

  const handleButtonClick = () => {
    setIsModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.uploadBox, { maxWidth: screenWidth / 3 }]}>
        <Text style={styles.uploadBoxLabel}> Limit: 1 Image </Text>
        {imageData ? (
          <Image
            source={{ uri: imageData.uri }}
            style={{
              width: '100%',
              height: undefined,
              aspectRatio: imageData.width / imageData.height, // Maintain image aspect ratio
            }}
            resizeMode="contain"
          />
        ) : null}
      </View>
      <TouchableHighlight
        style={[
          styles.uploadButton,
          { backgroundColor: buttonPressed ? UserPalette.active_button : UserPalette.green },
        ]}
        underlayColor={UserPalette.active_button}
        onShowUnderlay={() => setButtonPressed(true)}
        onHideUnderlay={() => setButtonPressed(false)}
      >
        <View>
          <TouchableOpacity style={[
          styles.uploadButton,
          { backgroundColor: buttonPressed ? UserPalette.active_button : UserPalette.green },
        ]}
        onPress={handleButtonClick}>
            <Text style={styles.uploadButtonText}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </TouchableHighlight>
      <Modal visible={isModalVisible} transparent>
        <View style={styles.overlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalOption} onPress={handleTakePhoto}>Take a Photo</Text>
            <Text style={styles.modalCancel} onPress={() => setIsModalVisible(false)}>Cancel</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: UserPalette.green,
  },
  uploadBox: {
    borderWidth: 2,
    borderColor: UserPalette.default_background,
    backgroundColor: UserPalette.default_background,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: Math.max(200, Dimensions.get('window').height / 3), // Ensure minimum height of 500px
    width: '100%', // Full width of the screen
    minHeight: 200, // Minimum height 500px
    minWidth: 350, // Minimum width 500px
    maxWidth: '100%', // Box doesn't exceed the width of the screen
    marginBottom: 20,
  },
  uploadBoxLabel: {
    fontWeight: '700',
    fontSize: FontSize.sub_heading,
    color: 'rgba(128, 128, 128, 0.7)',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: UserPalette.default_background,
    margin: 20,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalOption: {
    padding: 10,
    fontSize: FontSize.body_small,
    color: 'blue',
    marginBottom: 10,
  },
  modalCancel: {
    padding: 10,
    fontSize: FontSize.body_small,
    color: 'red',
  },
  uploadButton: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: 'white',
    fontSize: FontSize.body_medium,
  },
  activeButton: {
    backgroundColor: UserPalette.active_button,
    borderColor: UserPalette.active_button,
  },
});

export default UploadImageBox;
