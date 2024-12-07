import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Modal, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { matchUser } from '../test/matchUser.js';
import { NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  UserHomeScreen: undefined;
  SignupScreen: undefined;
  AdminHomeScreen: undefined;
};

/*
  AuthPageColors and Fontsize could be added in a seprate
 .ts file within the components folder to maintain consistency
  accross other pages.


  note add export AuthPageColors or FontSize to the file seprate file
  e.g.


  // 📂 FontSize.tsx (seprate file)
  const FontSize = {
    body_small: 14,
    body_medium: 16,
    // Add other font sizes as needed
  };


  export default FontSize;

*/

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

function LoginAuth(): React.JSX.Element {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [name, setName] = useState('');
  const [dlsud_ID, setID] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const scaleValue = useRef(new Animated.Value(0)).current;
  // user-side login success modal useState
  const [userSuccessVisible, setUserSuccessVisible] = useState(false);
  // admin-side login success modal useState 
  const [adminSuccessVisible, setAdminSuccessVisible] = useState(false);
  // login success modal scale value useRefs
  const successScaleValue = useRef(new Animated.Value(0)).current;

  const handleLogin = async () => {
    const newUser = {
      Name: name,
      DLSUD_ID: dlsud_ID,
      Password: password
    };
    
    const { isAuthenticated, isAdmin } = await matchUser(newUser);

    if (isAuthenticated) {
      if (isAdmin) {
        setAdminSuccessVisible(true); // admin-side login success modal 
      } else {
        setUserSuccessVisible(true); // user-side login success modal
      }
    
      // 3 second delay before redirecting to the admin/ user homescreen
      setTimeout(() => {
        if (isAdmin) {
         setAdminSuccessVisible(false);
          navigation.navigate('AdminHomeScreen'); // redirect to admin home screen
        } else {
          setUserSuccessVisible(false);
          navigation.navigate('UserHomeScreen'); // redirect to user home screen
        }
      }, 3000); // 3 second delay
    } else {
      setModalVisible(true);
    }
  };

  useEffect(() => {
    if (modalVisible) {
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
  }, [modalVisible, scaleValue]);

  // login success modal scale values
  useEffect(() => {
    if (userSuccessVisible || adminSuccessVisible) {
     Animated.spring(successScaleValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      successScaleValue.setValue(0);
    }
  }, [userSuccessVisible, adminSuccessVisible, successScaleValue]); // login success modal scale value 

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
            style={[styles.input, { color: 'black' }]}
            placeholder="Enter password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />
          <TouchableOpacity>
            <Text style={styles.signupStyle} onPress={() => navigation.navigate('SignupScreen')}>New? Sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonLabel}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="none"
        onRequestClose={() => setModalVisible(false)}
      >
        {/* login error modal: Invalid inputs */}
        <View style={styles.modalOverlay}>
          <Animated.View style={[styles.modalContent, { transform: [{ scale: scaleValue }] }]}>
            <Text style={styles.modalText}>The entered credentials do not match an existing account.</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>

      {/* user-side login success modal */}
      <Modal
        transparent={true}
        visible={userSuccessVisible}
        animationType="none"
      >
        <View style={styles.successModalOverlay}>
          <Animated.View style={[styles.userSuccessModalContent, { transform: [{ scale: successScaleValue }] }]}>
            <Text style={styles.userSuccessModalText}>Log in as User Successful!</Text>
          </Animated.View>
        </View>
      </Modal>

      {/* admin-side login success modal */}
      <Modal
        transparent={true}
        visible={adminSuccessVisible}
        animationType="none"
      >
        <View style={styles.adminSuccessModalOverlay}>
          <Animated.View style={[styles.adminSuccessModalContent, { transform: [{ scale: successScaleValue }] }]}>
            <Text style={styles.adminSuccessModalText}>Log in as Admin Successful!</Text>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

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
    // backgroundColor: 'yellow',
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
    paddingBottom: '100%',
    paddingTop: 50,
    minHeight: '70%',
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
  signupStyle: {
    textDecorationLine: 'underline',
    color: 'white',
    textAlign: 'center',
    padding: 10,
    marginBottom: 16,
  },
  loginButton: {
    alignItems: 'center',
    backgroundColor: '#00722A',
    borderColor: 'white',
    borderRadius: 16,
    borderWidth: 3,
    paddingVertical: 14,
    marginHorizontal: 80,
  },
  loginButtonLabel: {
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
    textAlign: 'center',
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
  // sucess modal placeholder
  successModalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  // user-side success modal styles
  userSuccessModalContent: {
    width: '80%',
    backgroundColor: '#00722A',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 3,
  },
  userSuccessModalText: {
    fontSize: FontSize.body_large,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  // admin-side success modal styles
  adminSuccessModalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  adminSuccessModalContent: {
    width: '80%',
    backgroundColor: '#1D68B3',
    padding: 20,
    borderRadius: 15,
    borderColor: 'white',
    borderWidth: 3,
    alignItems: 'center',
  },
  adminSuccessModalText: {
    fontSize: FontSize.body_large,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default LoginAuth;