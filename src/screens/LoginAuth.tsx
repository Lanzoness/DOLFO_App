import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { addUser } from '../test/addUser.js';

type RootStackParamList = {
  UserHomeScreen: undefined;
  TestFirebase: undefined;
  SignupScreen: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'TestFirebase'>;

/*
  AuthPageColors and Fontsize could be added in a seprate
 .ts file within the components folder to maintain consistency
  accross other pages.


  note add export AuthPageColors or FontSize to the file seprate file
  e.g.


  // 📂 FontSize.ts (seprate file)
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
};

const FontType = {
  body_font: 'ubuntu sans',
  header_font: 'Paytone One',
};

function LoginAuth(): React.JSX.Element {
  const navigation = useNavigation<NavigationProp>();
  const [name, setName] = useState('');
  const [dlsud_ID, setID] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = () => {
    const newUser = {
      Name: name,
      DLSUD_ID: dlsud_ID,
      Password: password,
      isAdmin: 0
    };
    addUser(newUser);
    navigation.navigate('UserHomeScreen');
  };




// FIX THE FONT COLOR OF THE USER INPUT

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
              <Text style={ styles.iconTitle }> DOLFO </Text>
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
              <Text style={styles.signupStyle} onPress={() => navigation.navigate('SignupScreen')}>New? Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonLabel}>Login</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
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
    // backgroundColor: 'grey',
  },
  logo: {
    width: 93,
    height: 93,
    marginRight: 10,
  },
  iconTitle: {
    color: AuthPageColors.primary,
    fontSize: FontSize.icon_header,
    fontFamily: FontType.header_font, // Replace with paytone one
    fontWeight: '800',
    marginTop: 15,
  },
  formContainer: {
    backgroundColor: AuthPageColors.primary,
    height: 550,
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
});

export default LoginAuth;
