import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, ScrollView, SafeAreaView, Button } from 'react-native';

const SubmitLostItem = () => {
  const [itemName, setItemName] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [locationFound, setLocationFound] = useState('');
  // const [itemDescription, setItemDescription] = useState('');
  const [finderName, setFinderName] = useState('');

  const [inputs, setInputs] = useState(['']); // Initialize with one input field.
  const maxFields = 3; // Set the maximum number of fields.

  const addInputField = () => {
    if (inputs.length < maxFields) {
      setInputs([...inputs, '']); // Add a new blank input field.
    }
  };

  const removeInputField = (index) => {
    if (inputs.length > 1) {
      setInputs(inputs.filter((_, i) => i !== index)); // Remove the field at the specified index.
    }
  };

  const handleInputChange = (text, index) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = text; // Update the specific input value.
    setInputs(updatedInputs);
  };


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
      <Text>Enter description:</Text>
        {inputs.map((input, index) => (
          <View key={index} style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={(text) => handleInputChange(text, index)}
              placeholder={`Input #${index + 1}`}
            />
            {index === 0 ? null : (
              <Button title="REMOVE" onPress={() => removeInputField(index)} />
            )}
          </View>
        ))}
        <Button
          title={inputs.length < maxFields ? "Add Description" : "Limit Reached"}
          onPress={addInputField}
          disabled={inputs.length >= maxFields} // Disable button when maxFields is reached.
        />
        {/* <Text style={styles.label}>Item Description</Text>
        <TextInput
          style={styles.input}
          value={itemDescription}
          onChangeText={setItemDescription}
          placeholder="Enter item description"
        /> */}
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
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  // input: {
  //   flex: 1,
  //   borderWidth: 1,
  //   borderColor: '#ccc',
  //   padding: 10,
  //   marginRight: 10,
  //   borderRadius: 5,
  // },
});

export default SubmitLostItem;
