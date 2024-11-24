import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, ScrollView, SafeAreaView, Dimensions, Image, Modal, TouchableOpacity, TouchableHighlight } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import { SelectList } from 'react-native-dropdown-select-list';
import UserPalette from '../constants/UserPalette';
import FontSize from '../constants/FontSize';

const SubmitLostItem = () => {
  const [imageData, setImageData] = useState(null); // Stores image URI
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [buttonText, setButtonText] = useState('Upload Image');
  const [buttonPressed, setButtonPressed] = useState(false);
  const [isSubmitModalVisible, setIsSubmitModalVisible] = useState(false);
  const screenWidth = Dimensions.get('window').width; // Takes the width of the device screen

  // 📃 User Inputs: Finder Name, Item Name, & Location Found
  const [finderName, setFinderName] = useState('');
  const [itemName, setItemName] = useState('');
  const [locationFound, setLocationFound] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // ➕ handles additional inputs for item description (limited to 3 inputs)
  const [inputs, setInputs] = useState<string[]>(['']);
  const maxFields = 3;

  // Array of objects to store each category
  const categories = [
    { key: '1', value: 'category 1' },
    { key: '2', value: 'category 2' },
    { key: '3', value: 'category 3' },
    { key: '4', value: 'category 4' },
    { key: '5', value: 'category 5' },
    { key: '6', value: 'category 6' },
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
  const handleTakePhoto = () => {
    const options = {
      mediaType: 'photo',
      cameraType: 'back',
      saveToPhotos: true,
    };

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

  /**
   * Function to handle form submission
   */
  const handleSubmit = () => {
    console.log('Finder Name:', finderName);
    console.log('Item Name:', itemName);
    console.log('Selected Category:', selectedCategory);
    console.log('Location Found:', locationFound);
    console.log('Entered Descriptions:', inputs);
    setIsSubmitModalVisible(false); // Close the confirmation modal
  };

  const handleEdit = () => {
    setIsSubmitModalVisible(false); // Close the confirmation modal
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView scrollEnabled={true} contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.topContainer}>

            {/* Upload image box */}
            <View style={styles.uploadBox}>
              <Text style={styles.uploadBoxLabel}> Limit: 1 Image </Text>
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
              <Text style={styles.fieldLabel}>Location Found</Text>
              <TextInput
                style={styles.inputField}
                value={locationFound}
                onChangeText={setLocationFound}
                placeholder="Enter location found"
              />
              <Text style={styles.fieldLabel}>Enter description:</Text>
              {inputs.map((input, index) => (
                <View key={index} style={styles.inputRow}>
                  <TextInput
                    style={styles.inputField}
                    value={input}
                    onChangeText={(text) => handleInputChange(text, index)}
                    placeholder={`Input #${index + 1}`}
                  />
                  {index === 0 ? null : (
                    <TouchableOpacity style={styles.buttonDescription} onPress={() => removeInputField(index)}>
                      <Text style={styles.buttonText}>REMOVE</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
              <TouchableOpacity
                style={[styles.buttonDescription, inputs.length >= maxFields && styles.buttonDisabled]}
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
                  { backgroundColor: buttonPressed ? UserPalette.active_button : UserPalette.green },
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
    paddingHorizontal: 20,
    backgroundColor: UserPalette.green,
  },
  safeArea: {
    flex: 1,
    backgroundColor: UserPalette.green,
  },
  scrollView: {
    flex: 1,
  },
  topContainer: {
    width: '100%',
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: UserPalette.green,
  },
  uploadBox: {
    borderWidth: 2,
    borderColor: UserPalette.default_background,
    backgroundColor: UserPalette.default_background,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    height: Math.max(200, Dimensions.get('window').height / 3), // Ensure minimum height of 200px
    width: Math.max(200, Dimensions.get('window').height / 3), // Set the width to be equal to the height
    marginTop: 20,
    marginBottom: 20,
  },
  uploadBoxLabel: {
    fontWeight: '500',
    fontSize: FontSize.body_medium,
    color: UserPalette.grey_font,
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
  formContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
  },
  formContentPlaceholder: {
    width: '100%',
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: '#00722a',
  },
  fieldLabel: {
    fontSize: 16,
    marginBottom: 10,
    color: UserPalette.white_font,
    fontWeight: 'bold',
  },
  inputField: {
    height: 40,
    borderBottomColor: 'white',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: UserPalette.text_field_bg,
    width: '100%',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonDescription: {
    backgroundColor: UserPalette.green,
    borderColor: 'white',
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    paddingHorizontal: 1,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  submitButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: UserPalette.green,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
  },
  submituploadBtnText: {
    color: 'white',
    fontSize: FontSize.body_small,
  },
  dropdownBox: {
    width: '100%',
    backgroundColor: UserPalette.default_background,
    borderRadius: 5,
    marginBottom: 20,
  },
  dropdown: {
    backgroundColor: UserPalette.default_background,
    borderRadius: 5,
  },
});

export default SubmitLostItem;