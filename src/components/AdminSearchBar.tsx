import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Image, ViewStyle, TouchableOpacity, Modal, Text } from 'react-native';
import UserPalette from '../constants/UserPalette';

interface AdminSearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit?: () => void;
  style?: ViewStyle;
}

const AdminSearchBar: React.FC<AdminSearchBarProps> = ({ value, onChangeText, onSubmit, style }) => {
  const [showWarning, setShowWarning] = useState(false);

  const handleTextChange = (text: string) => {
    if (text.length > 20) {
      setShowWarning(true);
      return;
    }
    onChangeText(text);
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={onSubmit}>
        <Image source={require('../assets/icons/SearchBar_Icon.png')} style={styles.icon} />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={value}
        onChangeText={handleTextChange}
        onSubmitEditing={onSubmit}
        returnKeyType="search"
        maxLength={30}
      />

      <Modal
        transparent={true}
        visible={showWarning}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.warningText}>
              Exceeded 20 character limit
            </Text>
            <TouchableOpacity
              style={styles.okButton}
              onPress={() => setShowWarning(false)}
            >
              <Text style={styles.okButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: UserPalette.grey_font,
    backgroundColor: UserPalette.blue,
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginLeft: -70,
    width: 300,
    flex: 1,
  },
  icon: {
    width: 16,
    height: 15,
    marginRight: 5,
  },
  input: {
    flex: 1,
    color: UserPalette.black_font,
    height: 35,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  warningText: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
    color: UserPalette.red_button,
  },
  okButton: {
    backgroundColor: UserPalette.green,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  okButtonText: {
    color: UserPalette.white_font,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default AdminSearchBar;
