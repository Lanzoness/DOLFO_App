import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Modal, Animated } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { addUser } from '../test/addUser.js';
import { matchUser } from '../test/matchUser.js';
import { addPasswordAdmin } from '../test/addPasswordAdmin.js';


const AuthPageColors = {
  primary: '#00722A',
  surfaceContainerLowest: '#FFFFFF',
};

const FontSize = {
  icon_header: 47,
  body_small: 14,
  body_medium: 16,
  body_large: 18,
};

const FontType = {
  body_font: 'ubuntu sans',
  header_font: 'Paytone One',
};

// Define the type for your navigation stack
type RootStackParamList = {
  SignupScreen: undefined;
  UserHomeScreen: undefined;
  AdminHomeScreen: undefined;
  // Add other routes here
};


const SignupScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isAccountCreatedVisible, setAccountCreatedVisible] = useState(false);
  const scaleValue = useRef(new Animated.Value(0)).current;

  //tracked user input
  const [name, setName] = useState('');
  const [dlsud_ID, setID] = useState('');
  const [password, setPassword] = useState('');
  const [isInputValid, setInputValid] = useState(true);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdminInputValid, setAdminInputValid] = useState(true);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    Animated.timing(scaleValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  const handleAccountCreatedClose = async () => {
    setAccountCreatedVisible(false);
    navigation.navigate('UserHomeScreen');
  };

  const handleSignUp = async() => {
    const newUser = {
      Name: name,
      DLSUD_ID: dlsud_ID,
      Password: password,
      isAdmin: 0
    };
    
    const isMatch = await matchUser(newUser);

    if (!isMatch) { 
      addUser(newUser);
      setInputValid(true);
      setAccountCreatedVisible(true);
    } else {
      setInputValid(false); // Returns pop up. "The entered credentials belong to an existing account." on line 169
      console.log('The entered credentials belong to an existing account.');
    }
  };

  const handleAdminSubmit = () => {
    addPasswordAdmin(adminPassword);
    if (adminPassword.trim() === '') { // Check if the adminPassword is empty
      setAdminInputValid(false);
    } else {
      closeModal();
      navigation.navigate('AdminHomeScreen');
    }
  };

  useEffect(() => {
    if (isModalVisible) {
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  }, [isModalVisible, scaleValue]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.headerContainer}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/icons/DOLFO_Logo.png')}
              resizeMode={'stretch'}
              style={styles.logo}
            />
            <Text style={styles.iconTitle}> DOLFO </Text>
          </View>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.loginAuthLabels}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Full Name (LastName, FirstName)"
            value={name}
            onChangeText={setName}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Text style={styles.loginAuthLabels}>DLSUD ID</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter DLSUD ID"
            value={dlsud_ID}
            onChangeText={setID}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Text style={styles.loginAuthLabels}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />
          <TouchableOpacity>
            <Text style={styles.getAdminAccess} onPress={openModal}>Admin? Get access</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
            <Text style={styles.signupButtonLabel}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="none"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <Animated.View style={[styles.modalContent, { transform: [{ scale: scaleValue }] }]}>
            <Text style={styles.modalText}>Enter Admin Password</Text>
            <TextInput
              style={[styles.input, styles.modalInput]}
              placeholder="Admin Password"
              secureTextEntry
              autoCapitalize="none"
              value={adminPassword}
              onChangeText={setAdminPassword}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.submitButton} onPress={handleAdminSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
              <View style={styles.buttonSpacer} />
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        visible={!isInputValid}
        animationType="fade"
        onRequestClose={() => setInputValid(true)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Invalid Input</Text>
            <TouchableOpacity style={styles.submitButton} onPress={() => setInputValid(true)}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        visible={!isAdminInputValid}
        animationType="fade"
        onRequestClose={() => setAdminInputValid(true)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Invalid Input</Text>
            <TouchableOpacity style={styles.submitButton} onPress={() => setAdminInputValid(true)}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        visible={isAccountCreatedVisible}
        animationType="fade"
        onRequestClose={handleAccountCreatedClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Account created</Text>
            <TouchableOpacity style={styles.submitButton} onPress={handleAccountCreatedClose}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 2,
    backgroundColor: AuthPageColors.surfaceContainerLowest,
  },
  scrollView: {
    flex: 1,
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 137,
    paddingTop: 100,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginBottom: -50,
  },
  logo: {
    width: 93,
    height: 93,
    marginRight: 10,
  },
  iconTitle: {
    color: AuthPageColors.primary,
    fontSize: FontSize.icon_header,
    fontFamily: FontType.header_font,
    fontWeight: '800',
    marginTop: 15,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: AuthPageColors.primary,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 152,
    paddingTop: 50,
  },
  loginAuthLabels: {
    fontFamily: 'ubuntu sans',
    color: 'white',
    fontSize: FontSize.body_medium,
    marginBottom: 0,
    padding: 10,
  },
  input: {
    height: 45,
    borderColor: 'white',
    backgroundColor: 'white',
    marginBottom: 16,
    paddingHorizontal: 10,
    paddingLeft: 20,
    borderRadius: 14,
  },
  getAdminAccess: {
    textDecorationLine: 'underline',
    color: 'white',
    textAlign: 'center',
    padding: 10,
    marginBottom: 16,
  },
  signupButton: {
    alignItems: 'center',
    backgroundColor: '#00722A',
    borderColor: 'white',
    borderRadius: 16,
    borderWidth: 3,
    paddingVertical: 14,
    marginHorizontal: 80,
  },
  signupButtonLabel: {
    fontFamily: 'ubuntu sans',
    color: 'white',
    fontSize: FontSize.body_medium,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: FontSize.body_large,
    fontWeight: 'bold',
    color: AuthPageColors.primary,
    marginBottom: 20,
  },
  modalInput: {
    borderColor: AuthPageColors.primary,
    borderWidth: 1,
    width: '100%',
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  submitButton: {
    width: 95,
    padding: 10,
    backgroundColor: AuthPageColors.primary,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSpacer: {
    width: 20,
  },
  closeButton: {
    width: 95,
    borderColor: AuthPageColors.primary,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: 'white',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: AuthPageColors.primary,
    fontSize: FontSize.body_medium,
    textAlign: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: FontSize.body_medium,
    textAlign: 'center',
  },
});

export default SignupScreen;
