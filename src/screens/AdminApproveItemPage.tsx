import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, ScrollView, SafeAreaView, Image, TouchableOpacity, Alert } from 'react-native';
import UserPalette from '../constants/UserPalette';
import FontSize from '../constants/FontSize';
import Button from '../components/button';
import OverlayInput from '../components/AdminRejectOverlay';
import { useRoute } from '@react-navigation/native';
import { approveItem } from '../test/approveItem';
import { deleteItem } from '../test/deleteItem';

type ImageData = {
  uri: string;
  width: number;
  height: number;
};

const AdminApproveItemPage = () => {
  const route = useRoute();
  const { item } = route.params as { item: any };

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

  const categories = [
    { key: '1', value: 'Electronics' },
    { key: '2', value: 'Clothing' },
    { key: '3', value: 'Documents' },
    { key: '4', value: 'Wallets' },
    { key: '5', value: 'Bags' },
    { key: '6', value: 'Others' },
  ];

  const handleCancel = () => {
    setOverlayVisible(false);
  };

  const handleConfirm = (inputValue: string) => {
    // insert confirm reject functionality here
    
    setOverlayVisible(false);
  };

  const handleApprove = async () => {
    try {
      await approveItem(item.id);
      console.log('Item approved successfully');
    } catch (error) {
      console.error('Error approving item:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteItem(item.id, item.Image);
      console.log('Item deleted successfully');
    } catch (error) {
      console.error('Error deleting item:', error);
    }
    setOverlayVisible(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <OverlayInput
        visible={overlayVisible}
        sectionName="⚠️ Confirm item deletion"
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <View style={styles.imageAndButtonContainer}>
              <View style={styles.uploadBox}>
                {imageData ? (
                  <Image
                    source={{ uri: imageData.uri }}
                    style={{
                      width: '100%',
                      height: '100%',
                      resizeMode: 'contain',
                    }}
                  />
                ) : null}
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  variant="editButtons"
                  onClick={handleApprove}
                  style={[styles.editButton, { width: 150, height: 100 }]}
                  label="Approve"
                  editText="Approve Item"
                  editBackgroundColor="#1e753e"
                  editIcon={require('../assets/icons/ClaimedIcon.png')}
                />
                <Button
                  variant="editButtons"
                  onClick={handleDelete}
                  style={[styles.archiveButton, { width: 150, height: 100 }]}
                  label="Delete"
                  editText="Delete item"
                  editBackgroundColor="#9e3737"
                  editIcon={require('../assets/icons/RejectIcon.png')}
                />
              </View>
            </View>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.formContentPlaceholder}>
              <View style={styles.inputRow}>
                <View style={styles.titleRow}>
                  <Text style={styles.fieldLabel}> Finder Name: </Text>
                </View>
                <View style={styles.lineContainer}>
                  <Text style={styles.sampleInput}>{finderName}</Text>
                  <View style={styles.line} />
                </View>
              </View>

              <View style={styles.inputRow}>
                <View style={styles.titleRow}>
                  <Text style={styles.fieldLabel}> Finder ID: </Text>
                </View>
                <View style={styles.lineContainer}>
                  <Text style={styles.sampleInput}>{finderID}</Text>
                  <View style={styles.line} />
                </View>
              </View>

              <View style={styles.inputRow}>
                <View style={styles.titleRow}>
                  <Text style={styles.fieldLabel}> Item Name: </Text>
                </View>
                <View style={styles.lineContainer}>
                  <Text style={styles.sampleInput}>{itemName}</Text>
                  <View style={styles.line} />
                </View>
              </View>

              <View style={styles.inputRow}>
                <View style={styles.titleRow}>
                  <Text style={styles.fieldLabel}> Category: </Text>
                </View>
                <View style={styles.lineContainer}>
                  <Text style={styles.sampleInput}>
                    {categories.find(cat => cat.key === selectedCategory)?.value || selectedCategory}
                  </Text>
                  <View style={styles.line} />
                </View>
              </View>

              <View style={styles.inputRow}>
                <View style={styles.titleRow}>
                  <Text style={styles.fieldLabel}>Location Found:</Text>
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
                </View>
                <View style={styles.lineContainer}>
                  <Text style={styles.sampleInput}>{ownerID}</Text>
                  <View style={styles.line} />
                </View>
              </View>

              <View style={styles.inputRow}>
                <View style={styles.titleRow}>
                  <Text style={styles.fieldLabel}>Item Description:</Text>
                </View>
                {inputs.map((input, index) => (
                  <View key={index} style={styles.lineContainer}>
                    <Text style={styles.sampleInput}>{input}</Text>
                    <View style={styles.line} />
                  </View>
                ))}
              </View>
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
      topBar: {
        width: '100%',
        height: 80,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
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

export default AdminApproveItemPage;
