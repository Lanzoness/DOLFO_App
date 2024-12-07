import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, ScrollView, SafeAreaView, Image, TouchableOpacity, Alert } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import UserPalette from '../constants/UserPalette';
import FontSize from '../constants/FontSize';
import Button from '../components/button';
import OverlayInput from '../components/EditItemOverlay';
import { useRoute } from '@react-navigation/native';
import { editItem } from '../test/editItem';
import { deleteItem } from '../test/deleteItem';

// Define a type for the image data
type ImageData = {
  uri: string;
  width: number;
  height: number;
};

const EditLost = () => {
  const route = useRoute();
  const { item } = route.params as { item: any };

  // Initialize state with item properties
  const [finderName, setFinderName] = useState(item['Finder Name'] || '');
  const [finderID, setFinderID] = useState(item['Finder ID'] || '');
  const [itemName, setItemName] = useState(item['Item Name'] || '');
  const [locationFound, setLocationFound] = useState(item['Location Found'] || '');
  const [ownerName, setOwnerName] = useState(item['Owner Name'] || '');
  const [ownerID, setOwnerID] = useState(item['Owner ID'] || '');
  const [selectedCategory, setSelectedCategory] = useState(item['Category'] || '');
  const [inputs, setInputs] = useState<string[]>(Array.isArray(item['Description']) ? item['Description'] : [item['Description'] || '']);
  const [imageData, setImageData] = useState<ImageData | null>({ uri: item.Image, width: 0, height: 0 });
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [currentSection, setCurrentSection] = useState('');
  const [isRetrieved, setIsRetrieved] = useState(item['Is Retrieved'] || 0);

  // Array of objects to store each category
  const categories = [
    { key: '1', value: 'Electronics' },
    { key: '2', value: 'Clothing' },
    { key: '3', value: 'Documents' },
    { key: '4', value: 'Wallets' },
    { key: '5', value: 'Bags' },
    { key: '6', value: 'Others' },
  ];

  const handleEditClick = (sectionName: string, index?: number) => {
    console.log(`Editing section: ${sectionName}, index: ${index}`);
    setCurrentSection(sectionName);
    setOverlayVisible(true);
    if (sectionName === 'Item Description' && index !== undefined) {
      setCurrentSection(`${sectionName} - ${index}`);
    }
  };

  const handleCancel = () => {
    setOverlayVisible(false);
  };

  const handleConfirm = (inputValue: string) => {
    if (currentSection.startsWith('Item Description')) {
      const index = parseInt(currentSection.split('-')[1], 10);
      setInputs(prevInputs => {
        const newInputs = [...prevInputs];
        newInputs[index] = inputValue;
        return newInputs;
      });
    } else {
      // Update the corresponding state based on the current section
      switch (currentSection) {
        case 'Finder Name':
          setFinderName(inputValue);
          break;
        case 'Finder ID':
          setFinderID(inputValue);
          break;
        case 'Item Name':
          setItemName(inputValue);
          break;
        case 'Category':
          setSelectedCategory(inputValue);
          break;
        case 'Location Found':
          setLocationFound(inputValue);
          break;
        case 'Owner Name':
          setOwnerName(inputValue);
          break;
        case 'Owner ID':
          setOwnerID(inputValue);
          break;
        case 'Item Description':
          setInputs(prevInputs => [...prevInputs, inputValue]);
          break;
        default:
          break;
      }
    }
    setOverlayVisible(false);
  };

  // Placeholder functions for future functionalities
  const handleSaveEdit = async () => {
    try {
      console.log('Save Edit button clicked');
      const editedData = {
        finderName,
        finderID,
        itemName,
        locationFound,
        ownerName,
        ownerID,
        selectedCategory,
        inputs,
        imageData,
        isRetrieved
      };
      
      console.log('Edited Data:', editedData);
      await editItem(item.id, editedData);
      Alert.alert('Success', 'Item updated successfully');
    } catch (error) {
      console.error('Error saving edit:', error);
      Alert.alert('Error', 'Failed to update item');
    }
  };

  const handleClaim = async () => {
    try {
      console.log('Claim button clicked');
      const editedData = {
        finderName,
        finderID,
        itemName,
        locationFound,
        ownerName,
        ownerID,
        selectedCategory,
        inputs,
        imageData,
        isRetrieved: 1
      };
      
      console.log('Edited Data:', editedData);
      await editItem(item.id, editedData);
      setIsRetrieved(1);
      Alert.alert('Success', 'Item marked as claimed successfully');
    } catch (error) {
      console.error('Error marking as claimed:', error);
      Alert.alert('Error', 'Failed to mark item as claimed');
    }
  };

  const handleArchive = async () => {
    try {
      console.log('Archive button clicked');
      await deleteItem(item.id, item.Image);
      Alert.alert('Success', 'Item archived successfully');
    } catch (error) {
      console.error('Error archiving item:', error);
      Alert.alert('Error', 'Failed to archive item');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <OverlayInput
        visible={overlayVisible}
        sectionName={currentSection}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <View style={styles.imageAndButtonContainer}>
              {/* Display image if available */}
              <View style={styles.uploadBox}>
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
              <View style={styles.buttonContainer}>
                <Button
                  variant="editButtons"
                  onClick={handleClaim}
                  style={[styles.editButton, { width: 150, height: 100 }]}
                  label="Claim"
                  editText="Mark as claimed"
                  editBackgroundColor="#1e753e"
                  editIcon={require('../assets/icons/ClaimedIcon.png')}
                />
                <Button
                  variant="editButtons"
                  onClick={handleArchive}
                  style={[styles.archiveButton, { width: 150, height: 100 }]}
                  label="Archive"
                  editText="Archive item"
                  editBackgroundColor="#9e3737"
                  editIcon={require('../assets/icons/ArchiveIcon.png')}
                />
              </View>
            </View>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.formContentPlaceholder}>
              <View style={styles.inputRow}>
                <View style={styles.titleRow}>
                  <Text style={styles.fieldLabel}> Finder Name: </Text>
                  <TouchableOpacity style={styles.editButton} onPress={() => handleEditClick('Finder Name')}>
                    <Image source={require('../assets/icons/EditIcon.png')} style={styles.icon} />
                  </TouchableOpacity>
                </View>
                <View style={styles.lineContainer}>
                  <Text style={styles.sampleInput}>{finderName}</Text>
                  <View style={styles.line} />
                </View>
              </View>
              
              <View style={styles.inputRow}>
                <View style={styles.titleRow}>
                  <Text style={styles.fieldLabel}> Finder ID: </Text>
                  <TouchableOpacity style={styles.editButton} onPress={() => handleEditClick('Finder ID')}>
                    <Image source={require('../assets/icons/EditIcon.png')} style={styles.icon} />
                  </TouchableOpacity>
                </View>
                <View style={styles.lineContainer}>
                  <Text style={styles.sampleInput}>{finderID}</Text>
                  <View style={styles.line} />
                </View>
              </View>
              
              <View style={styles.inputRow}>
                <View style={styles.titleRow}>
                  <Text style={styles.fieldLabel}> Item Name: </Text>
                  <TouchableOpacity style={styles.editButton} onPress={() => handleEditClick('Item Name')}>
                    <Image source={require('../assets/icons/EditIcon.png')} style={styles.icon} />
                  </TouchableOpacity>
                </View>
                <View style={styles.lineContainer}>
                  <Text style={styles.sampleInput}>{itemName}</Text>
                  <View style={styles.line} />
                </View>
              </View>
              
              <View style={styles.inputRow}>
                <View style={styles.titleRow}>
                  <Text style={styles.fieldLabel}> Category: </Text>
                  <TouchableOpacity style={styles.editButton} onPress={() => handleEditClick('Category')}>
                    <Image source={require('../assets/icons/EditIcon.png')} style={styles.icon} />
                  </TouchableOpacity>
                </View>
                <View style={styles.lineContainer}>
                  <Text style={styles.sampleInput}>{selectedCategory}</Text>
                  <View style={styles.line} />
                </View>
              </View>
              
              <View style={styles.inputRow}>
                <View style={styles.titleRow}>
                  <Text style={styles.fieldLabel}>Location Found:</Text>
                  <TouchableOpacity style={styles.editButton} onPress={() => handleEditClick('Location Found')}>
                    <Image source={require('../assets/icons/EditIcon.png')} style={styles.icon} />
                  </TouchableOpacity>
                </View>
                <View style={styles.lineContainer}>
                  <Text style={styles.sampleInput}>{locationFound}</Text>
                  <View style={styles.line} />
                </View>
              </View>
              
              <View style={styles.inputRow}>
                <View style={styles.titleRow}>
                  <Text style={styles.fieldSubLabel}>
                    <Text style={styles.fieldLabel}> Owner Name:</Text>
                  </Text>
                  <TouchableOpacity style={styles.editButton} onPress={() => handleEditClick('Owner Name')}>
                    <Image source={require('../assets/icons/EditIcon.png')} style={styles.icon} />
                  </TouchableOpacity>
                </View>
                <View style={styles.lineContainer}>
                  <Text style={styles.sampleInput}>{ownerName}</Text>
                  <View style={styles.line} />
                </View>
              </View>
              
              <View style={styles.inputRow}>
                <View style={styles.titleRow}>
                  <Text style={styles.fieldSubLabel}>
                    <Text style={styles.fieldLabel}> Owner ID:</Text>
                  </Text>
                  <TouchableOpacity style={styles.editButton} onPress={() => handleEditClick('Owner ID')}>
                    <Image source={require('../assets/icons/EditIcon.png')} style={styles.icon} />
                  </TouchableOpacity>
                </View>
                <View style={styles.lineContainer}>
                  <Text style={styles.sampleInput}>{ownerID}</Text>
                  <View style={styles.line} />
                </View>
              </View>
              
              <View style={styles.inputRow}>
                <View style={styles.titleRow}>
                  <Text style={styles.fieldLabel}> Item Description:</Text>
                </View>
                <View style={styles.lineContainer}>
                  {inputs.map((input, index) => (
                    <View key={index} style={styles.inputRow}>
                      <View style={styles.descriptionRow}>
                        <Text style={styles.sampleInput} numberOfLines={1} ellipsizeMode="tail">
                          {input}
                        </Text>
                        <TouchableOpacity
                          style={styles.editButton}
                          onPress={() => handleEditClick('Item Description', index)}
                        >
                          <Image source={require('../assets/icons/EditIcon.png')} style={styles.icon} />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.line} />
                    </View>
                  ))}
                </View>
              </View>
              
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveEdit}>
                <Text style={styles.saveButtonText}>Save Edit</Text>
              </TouchableOpacity>
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
    backgroundColor: 'red',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'blue',
  },
  scrollView: {
    flex: 1,
  },
  topContainer: {
    backgroundColor: UserPalette.secondary_blue,
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
    alignItems: 'flex-start',
    height: 200,
    width: 200,
    marginTop: 20,
    borderRadius: 15,
    marginBottom: 20,
    marginLeft: 5,
  },
  formContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 30,
    backgroundColor: UserPalette.secondary_blue,
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
    paddingLeft: 0,
  },
  locationLabel: {
    marginBottom: 7,
    marginTop: 30,
    fontSize: FontSize.body_medium,
    color: UserPalette.white_font,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    paddingLeft: 0,
  },
  fieldSubLabel: {
    marginBottom: 7,
    fontSize: FontSize.body_extra_small,
    color: UserPalette.white_font,
    fontStyle: 'italic',
    fontWeight: '400',
    alignSelf: 'flex-start',
    paddingLeft: 0,
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
    borderColor: UserPalette.admin_field_border,
  },
  inputRow: {
    width: '100%',
    marginBottom: 20,
  },
  descriptionField: {
    flex: 1,
    height: 45,
    borderWidth: 2,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: UserPalette.admin_field_border,
    backgroundColor: UserPalette.white_font,
  },
  saveButton: {
    width: 172,
    height: 43.47,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    borderWidth: 4,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 2.5,
  },
  saveButtonText: {
    fontSize: FontSize.body_small,
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: 'Ubuntu Sans',
    letterSpacing: 1.5,
    color: 'white',
  },
  dropdownBox: {
    width: '100%',
    backgroundColor: UserPalette.default_background,
    borderColor: UserPalette.admin_field_border,
    height: 55,
    borderWidth: 3,
    borderRadius: 10,
    marginBottom: -10,
  },
  dropdown: {
    backgroundColor: UserPalette.default_background,
    borderRadius: 5,
  },
  imageAndButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 20,
  },
  editButton: {
    marginBottom: 10,
  },
  archiveButton: {
    // No additional styles needed if similar to editButton
  },
  topBarText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  line: {
    width: '100%',
    height: 0,
    borderWidth: 2,
    borderColor: 'white',
    marginBottom: 20,
  },
  sampleInput: {
    fontSize: FontSize.body_small,
    color: UserPalette.white_font,
    marginBottom: 5,
    alignSelf: 'flex-start',
    paddingLeft: 5,
    marginTop: 21,
    flex: 1,
  },
  lineContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  icon: {
    width: 20,
    height: 20,
  },
  descriptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default EditLost;