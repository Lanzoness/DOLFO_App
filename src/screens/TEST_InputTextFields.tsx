import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, ScrollView, SafeAreaView } from 'react-native';

const SubmitLostItem = () => {
  const [itemName, setItemName] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [locationFound, setLocationFound] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [finderName, setFinderName] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.InputPlaceholerBlock}>
      <Text style={styles.label}>Finder Name</Text>
        <TextInput
          style={styles.input}
          value={finderName}
          onChangeText={setFinderName}
          placeholder="Enter finder name"
        />
        <Text style={styles.label}>Item Name</Text>
        <TextInput
          style={styles.input}
          value={itemName}
          onChangeText={setItemName}
          placeholder="Enter item name"
        />
        <Text style={styles.label}>Item Category</Text>
        <TextInput
          style={styles.input}
          value={itemCategory}
          onChangeText={setItemCategory}
          placeholder="Enter item category"
        />
        <Text style={styles.label}>Location Found</Text>
        <TextInput
          style={styles.input}
          value={locationFound}
          onChangeText={setLocationFound}
          placeholder="Enter location found"
        />
        <Text style={styles.label}>Item Description</Text>
        <TextInput
          style={styles.input}
          value={itemDescription}
          onChangeText={setItemDescription}
          placeholder="Enter item description"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor: '#fff',
  },
  InputPlaceholerBlock: {
    padding: 20,

  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default SubmitLostItem;
