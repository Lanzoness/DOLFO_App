import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, ScrollView, SafeAreaView, Dimensions, Image, Modal, TouchableOpacity, TouchableHighlight } from 'react-native';
import { CameraOptions, launchCamera } from 'react-native-image-picker';
import { SelectList } from 'react-native-dropdown-select-list';
import UserPalette from '../constants/UserPalette';
import FontSize from '../constants/FontSize';
import { addLostItem } from '../test/addLostItem.js';
import { addImage } from '../test/addImage.js';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import ImagePicker from 'react-native-image-crop-picker';

// Define CameraType as a type instead of a constant
type CameraType = 'back' | 'front';

// Define a type for the image data
type ImageData = {
  uri: string;
  width: number;
  height: number;
};

const SubmitLostItem = () => {
  const [imageData, setImageData] = useState<ImageData | null>(null); // Stores image URI
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [buttonText, setButtonText] = useState('Upload Image');
  const [buttonPressed, setButtonPressed] = useState(false);
  const [isSubmitModalVisible, setIsSubmitModalVisible] = useState(false);
  const screenWidth = Dimensions.get('window').width; // Takes the width of the device screen

  // 📃 User Inputs: Finder Name, Item Name, & Location Found
  const [finderName, setFinderName] = useState('');
  const [finderID, setFinderID] = useState('');
  const [itemName, setItemName] = useState('');
  const [locationFound, setLocationFound] = useState('');
  const [ownerName, setownerName] = useState('');
  const [ownerID, setownerID] = useState('');

  // 🗃️ handles chosen categories
  const [selectedCategory, setSelectedCategory] = useState('');


  // ➕ handles additional inputs for item description (limited to 3 inputs)
  const [inputs, setInputs] = useState<string[]>(['']);
  const maxFields = 3;

  // Array of objects to store each category
  const categories = [
    { key: '1', value: 'Electronics' },
    { key: '2', value: 'Clothing' },
    { key: '3', value: 'Documents' },
    { key: '4', value: 'Wallets' },
    { key: '5', value: 'Bags' },
    { key: '6', value: 'Others' },
];

  // Function to add an item description input field
  const addInputField = () => {
    if (inputs.length < maxFields) {
      setInputs([...inputs, '']);
    }
  };

  // Function to remove an item description input field
  const removeInputField = (index: number) => {
    const newInputs = inputs.filter((_, i) => i !== index);
    setInputs(newInputs);
  };

  // Function to handle changes in the item description input field
  const handleInputChange = (text: string, index: number) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = text;
    setInputs(updatedInputs);
  };

  /**
   * 📸 Function to handle image upload
   */
  const handleTakePhoto = async () => {
    try {
      const permission = await check(PERMISSIONS.ANDROID.CAMERA);

      if (permission === RESULTS.GRANTED) {
        launchCameraWithOptions();
      } else {
        const requestResult = await request(PERMISSIONS.ANDROID.CAMERA);
        if (requestResult === RESULTS.GRANTED) {
          launchCameraWithOptions();
        } else {
          console.error('Camera permission denied');
        }
      }
    } catch (error) {
      console.error('Error checking camera permission:', error);
    }
  };

  const launchCameraWithOptions = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
      cropperCircleOverlay: false, // Set to true if you want a circular crop
      freeStyleCropEnabled: false, // Disable free style cropping
    }).then(image => {
      setImageData({
        uri: image.path,
        width: image.width,
        height: image.height,
      });
      setButtonText('Change Image');
      setIsModalVisible(false);
    }).catch(error => {
      console.error('Error capturing image:', error);
      setIsModalVisible(false);
    });
  };

  const [isInvalidInputModalVisible, setIsInvalidInputModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false); // New state for success modal

  // Function to validate inputs
  const validateInputs = () => {
    // Basic validation for required fields
    if (!finderName || !finderID || !itemName || !locationFound || !selectedCategory) {
      return false;
    }

    // Additional conditions can be added here
    // Example: if (someOtherCondition) { return false; }

    return true;
  };

  /**
   * Function to handle form submission
   */
  const handleSubmit = async () => {
    console.log('Image Data:', imageData);

    if (!validateInputs() || !imageData || !imageData.uri) {
      setIsInvalidInputModalVisible(true);
      return;
    }

    try {
        const imageUrl = await addImage(imageData.uri); // Use imageData.uri
        if (!imageUrl) {
            console.error('Failed to upload image');
            return;
        }

        const newItem = {
            'Finder Name': finderName,
            'Finder ID': finderID,
            'Item Name': itemName,
            Image: imageUrl, // Use the URL returned by addImage
            'Category': selectedCategory,
            'Location Found': locationFound,
            'Description': inputs,
            'Owner Name': ownerName,
            'Owner ID': ownerID,
            'Date Submitted': new Date().toISOString(),
            'Is Retrieved': -2,
            'Date Retrieved': null,
        };

        await addLostItem(newItem);
        setIsSuccessModalVisible(true); // Show success modal
    } catch (error) {
        console.error('Error submitting item:', error);
    }

    setIsSubmitModalVisible(false); // Close the confirmation modal
  };

  const handleEdit = () => {
    setIsSubmitModalVisible(false); // Close the confirmation modal
    console.log('Finder Name:', finderName);
    console.log('Finder ID:', finderID);
    console.log('Item Name:', itemName);
    console.log('Image Data:', imageData);
    console.log('Selected Category:', selectedCategory);
    console.log('Location Found:', locationFound);
    console.log('Entered Descriptions:', inputs);
    console.log('Owner Name:', ownerName);
    console.log('Owner ID:', ownerID);
    console.log('Date Submitted:', new Date().toISOString());
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView scrollEnabled={true} contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.topContainer}>

            {/* Upload image box */}
            <View style={styles.uploadBox}>
              {/* <Text style={styles.uploadBoxLabel}> Limit: 1 Image </Text> */}
              {imageData ? (
                <Image
                  source={{ uri: imageData.uri }}
                  style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'contain', // Maintain image aspect ratio
                  }}
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
              onPress={() => setIsModalVisible(true)}
            >
              <Text style={styles.uploadButtonText}>{buttonText}</Text>
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

          <View style={styles.formContainer}>
            <View style={styles.formContentPlaceholder}>
              <Text style={styles.fieldLabel}> Finder Name: </Text>
              <TextInput
                style={styles.inputField}
                value={finderName}
                onChangeText={setFinderName}
                placeholder="Enter finder name"
              />
              <Text style={styles.fieldLabel}> Finder ID: </Text>
              <TextInput
                style={styles.inputField}
                value={finderID}
                onChangeText={setFinderID}
                placeholder="Enter Finder ID"
              />
              <Text style={styles.fieldLabel}> Item Name: </Text>
              <TextInput
                style={styles.inputField}
                value={itemName}
                onChangeText={setItemName}
                placeholder="Enter item name"
              />
              <Text style={[styles.fieldLabel]}> Category: </Text>
              <SelectList
                setSelected={setSelectedCategory}
                data={categories}
                placeholder="Select a category"
                boxStyles={styles.dropdownBox}
                dropdownStyles={styles.dropdown}
              />
              <Text style={styles.locationLabel}>Location Found:</Text>
              <TextInput
                style={styles.inputField}
                value={locationFound}
                onChangeText={setLocationFound}
                placeholder="Enter location found"
              />
              <Text style={styles.fieldSubLabel}>
              (Optional) <Text style={styles.fieldLabel}> Owner Name:</Text>
              </Text>
              <TextInput
                style={styles.inputField}
                value={ownerName}
                onChangeText={setownerName}
                placeholder="Enter Owner Name"
              />
              <Text style={styles.fieldSubLabel}>
              (Optional) <Text style={styles.fieldLabel}> Owner ID:</Text>
              </Text>
              <TextInput
                style={styles.inputField}
                value={ownerID}
                onChangeText={setownerID}
                placeholder="Enter Finder ID"
              />
              <Text style={styles.fieldLabel}> Item Description:</Text>
              {inputs.map((input, index) => (
                <View key={index} style={styles.inputRow}>
                  <TextInput
                    style={styles.descriptionField}
                    value={input}
                    onChangeText={(text) => handleInputChange(text, index)}
                    placeholder={`Input #${index + 1}`}
                  />
                  {index === 0 ? null : (
                    <TouchableOpacity style={styles.removeButton} onPress={() => removeInputField(index)}>
                      <Text style={styles.buttonText}>REMOVE</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
              <TouchableOpacity
                style={[styles.addButton, inputs.length >= maxFields && styles.buttonDisabled]}
                onPress={addInputField}
                disabled={inputs.length >= maxFields}
              >
                <Text style={styles.buttonText}>
                  {inputs.length < maxFields ? 'Add Description' : 'Limit Reached'}
                </Text>
              </TouchableOpacity>

              <TouchableHighlight
                style={[
                  styles.uploadButton,
                  { backgroundColor: buttonPressed ? UserPalette.active_button : UserPalette.secondary_green },
                ]}
                underlayColor={UserPalette.active_button}
                onShowUnderlay={() => setButtonPressed(true)}
                onHideUnderlay={() => setButtonPressed(false)}
                onPress={() => setIsSubmitModalVisible(true)}
              >
                <Text style={styles.submituploadBtnText}>Submit Lost Item</Text>
              </TouchableHighlight>

              {/* Submission confirmation modal */}
              <Modal visible={isSubmitModalVisible} transparent>
                <View style={styles.overlay}>
                  <View style={styles.modalContent}>
                    <Text style={styles.modalOption}>Do you want to submit this item?</Text>
                    <TouchableOpacity onPress={handleSubmit}>
                      <Text style={styles.modalOption}>Confirm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleEdit}>
                      <Text style={styles.modalCancel}>Edit</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>

              {/* Invalid input modal */}
              <Modal visible={isInvalidInputModalVisible} transparent>
                <View style={styles.overlay}>
                  <View style={styles.modalContent}>
                    <Text style={styles.modalOption}>Please fill in all required fields.</Text>
                    <TouchableOpacity onPress={() => setIsInvalidInputModalVisible(false)}>
                      <Text style={styles.modalCancel}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>

              {/* Success modal */}
              <Modal visible={isSuccessModalVisible} transparent>
                <View style={styles.overlay}>
                  <View style={styles.modalContent}>
                    <Text style={styles.modalOption}>Item submitted successfully!</Text>
                    <TouchableOpacity onPress={() => setIsSuccessModalVisible(false)}>
                      <Text style={styles.modalCancel}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: UserPalette.green,
    backgroundColor: 'red',
  },
  safeArea: {
    flex: 1,
    // backgroundColor: UserPalette.green,
    backgroundColor: 'blue',
  },
  scrollView: {
    flex: 1,
  },
  topContainer: {
    backgroundColor: UserPalette.secondary_green,
    borderBottomColor: UserPalette.white_font,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 20,
    borderBottomWidth: 2,
  },
  uploadBox: {
    borderWidth: 2,
    borderColor: UserPalette.default_background,
    backgroundColor: UserPalette.default_background,
    justifyContent: 'center',
    alignItems: 'center',
    height: Math.max(200, Dimensions.get('window').height / 3), // Ensure minimum height of 200px
    width: Math.max(200, Dimensions.get('window').height / 3), // Set the width to be equal to the height
    marginTop: 20,
    borderRadius: 15,
    marginBottom: 20,
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
    fontSize: FontSize.body_medium,
    color: UserPalette.green,
    fontWeight: 'bold',
    marginBottom: 10,
    padding: 10,
  },
  modalCancel: {
    fontSize: FontSize.body_medium,
    fontWeight: 'bold',
    color: 'red',
    padding: 10,
  },
  uploadButton: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: 'white',
    fontSize: FontSize.body_small,
  },
  activeButton: {
    backgroundColor: UserPalette.active_button,
    borderColor: UserPalette.active_button,
  },
  formContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 30,
    backgroundColor: UserPalette.green,
  },
  formContentPlaceholder: {
    width: '100%',
    paddingVertical: 30,
    alignItems: 'center',
  },
  fieldLabel: {
    marginBottom: 7,
    fontSize: FontSize.body_medium,
    color: UserPalette.white_font,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    paddingLeft: 5,
  },
  locationLabel : {
    marginBottom: 7,
    marginTop: 30,
    fontSize: FontSize.body_medium,
    color: UserPalette.white_font,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    paddingLeft: 5,
  },
  fieldSubLabel: {
    marginBottom: 7,
    fontSize: FontSize.body_extra_small,
    color: UserPalette.white_font,
    fontStyle: 'italic',
    fontWeight: '400',
    alignSelf: 'flex-start',
    paddingLeft: 5,
  },
  inputField: {
    height: 45,
    borderBottomColor: 'white',
    borderWidth: 3,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    width: '100%',
    backgroundColor: UserPalette.white_font,
    borderColor: UserPalette.field_border,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  descriptionField: {
    flex: 1, // Make the input field take up the remaining space
    height: 45,
    borderWidth: 2,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: UserPalette.field_border,
    backgroundColor: UserPalette.white_font,
  },
  removeButton: {
    backgroundColor: UserPalette.red_button,
    borderColor: UserPalette.default_background,
    borderRadius: 8,
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 7,
    alignItems: 'center',
    marginLeft: 10, // Add some space between the input field and the button
  },
  addButton: {
    fontSize: FontSize.body_small,
    backgroundColor: UserPalette.active_button,
    borderColor: 'white',
    borderWidth: 2,
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    fontSize: FontSize.body_extra_small,
    color: 'white',
    fontWeight: 'bold',
    paddingHorizontal: 1,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  submitButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
  },
  submituploadBtnText: {
    color: UserPalette.white_font,
    fontSize: FontSize.body_small,
  },
  dropdownBox: {
    width: '100%',
    backgroundColor: UserPalette.default_background,
    borderColor: UserPalette.field_border,
    height: 55,
    borderWidth: 3,
    borderRadius: 10,
    marginBottom: -10,
  },
  dropdown: {
    backgroundColor: UserPalette.default_background,
    borderRadius: 5,
  },
});

export default SubmitLostItem;
