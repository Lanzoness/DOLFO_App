import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import UserPalette from '../constants/UserPalette';

const SubmitLostItem = () => {
  /**
   * The use state variables are used to store the values of the input fields: Finder Name, Item Name, & Location Found
   */
  const [finderName, setFinderName] = useState('');
  const [itemName, setItemName] = useState('');
  const [locationFound, setLocationFound] = useState('');

  /**
   * The use state variable is used to store the values of the input fields: Item Description
   */
  const [inputs, setInputs] = useState<string[]>(['']);
  const maxFields = 5; // Limits the add description button to 5 fields.

  const addInputField = () => {
    if (inputs.length < maxFields) {
      setInputs([...inputs, '']); // Add a new blank input field.
    }
  };

  const removeInputField = (index: number) => {
    const newInputs = inputs.filter((_, i) => i !== index);
    setInputs(newInputs);
  };

  const handleInputChange = (text: string, index: number) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = text;
    setInputs(updatedInputs);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.fieldLabel}>Finder Name</Text>
        <TextInput
          style={styles.inputField}
          value={finderName}
          onChangeText={setFinderName}
          placeholder="Enter finder name"
        />
        <Text style={styles.fieldLabel}>Item Name</Text>
        <TextInput
          style={styles.inputField}
          value={itemName}
          onChangeText={setItemName}
          placeholder="Enter item name"
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
              <TouchableOpacity style={styles.button} onPress={() => removeInputField(index)}>
                <Text style={styles.buttonText}>REMOVE</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
        <TouchableOpacity
          style={[styles.button, inputs.length >= maxFields && styles.buttonDisabled]}
          onPress={addInputField}
          disabled={inputs.length >= maxFields} // Disable button when maxFields is reached.
        >
          <Text style={styles.buttonText}>
            {inputs.length < maxFields ? "Add Description" : "Limit Reached"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: UserPalette.green,
  },
  scrollView: {
    padding: 20,
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
    flex: 1,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: UserPalette.green, // Flat button
    borderColor: 'white', // White outline
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
    opacity: 0.5, // Reduce opacity for disabled state
  },
});

export default SubmitLostItem;
