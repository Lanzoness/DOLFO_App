import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Modal, Text } from 'react-native';
import UserPalette from '../constants/UserPalette';
import FontSize from '../constants/FontSize';

interface AdminSearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit?: () => void;
  style?: object;
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

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search lost items..."
          placeholderTextColor={UserPalette.grey_font}
          value={value}
          onChangeText={handleTextChange}
          onSubmitEditing={handleSubmit}
          returnKeyType="search"
          maxLength={20}
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={() => onChangeText('')} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

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
    padding: 8,
    backgroundColor: UserPalette.white_font,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: UserPalette.light_gray,
    borderRadius: 8,
    paddingHorizontal: 8,
    borderWidth: 1.5,
    borderColor: UserPalette.grey_font,
  },
  input: {
    flex: 1,
    fontSize: FontSize.body_medium,
    color: UserPalette.black_font,
    paddingVertical: 8,
    height: 35,
  },
  clearButton: {
    padding: 4,
  },
  clearButtonText: {
    color: UserPalette.grey_font,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: UserPalette.white_font,
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
