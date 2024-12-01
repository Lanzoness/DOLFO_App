import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Modal, TouchableOpacity, Animated } from 'react-native';
import UserPalette from '../constants/UserPalette';
import FontSize from '../constants/FontSize';

type EditItemOverlayProps = {
  visible: boolean;
  sectionName: string;
  onCancel: () => void;
  onConfirm: (inputValue: string) => void;
};

const EditItemOverlay: React.FC<EditItemOverlayProps> = ({ visible, sectionName, onCancel, onConfirm }) => {
  const [inputValue, setInputValue] = useState('');
  const scaleValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    console.log('Overlay visibility:', visible);
    if (visible) {
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, scaleValue]);

  const handleClose = (action: () => void) => {
    Animated.timing(scaleValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setInputValue('');
      action();
    });
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="none"
    >
      <View style={styles.overlay}>
        <Animated.View style={[styles.container, { transform: [{ scale: scaleValue }] }]}>
          <Text style={styles.title}>Enter value for {sectionName}</Text>
          <TextInput
            style={styles.input}
            value={inputValue}
            onChangeText={setInputValue}
            placeholder={`Enter ${sectionName}`}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => handleClose(onCancel)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={() => handleClose(() => onConfirm(inputValue))}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: FontSize.body_medium,
    fontWeight: '400',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: UserPalette.admin_field_border,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#9e3737',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    alignItems: 'center',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#1e753e',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default EditItemOverlay;
