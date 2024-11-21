import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';


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


function LoginAuth(): React.JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = () => {
    // Takes the user inputs from the email and password fields
    console.log('Email:', email);
    console.log('Password:', password);
    clearInputs();
  };


  const clearInputs = () => {
    // clears the email and password fields
    setEmail('');
    setPassword('');
  };


// FIX THE FONT COLOR OF THE USER INPUT

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView style={styles.scrollView}>
          <View style={styles.headerContainer}>
            <Image
              source={require('../assets/icons/DOLFO_Logo.png')}
              resizeMode={'stretch'}
              style={styles.logo}
            />
          <Text style={ styles.iconTitle }> DOLFO </Text>
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.loginAuthLabels}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter email address"
              value={email}
              onChangeText={setEmail}
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
              <Text style={styles.forgotPassStyle}>Forgot password?</Text>
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
    marginBottom: 137,
    padding: 50,
  },
  logo: {
    width: 93,
    height: 93,
    // paddingRight: 10,
    backgroundColor: 'grey',
  },
  // Missing DOLFO Text
  iconTitle: {
    color: AuthPageColors.primary,
    fontSize: FontSize.icon_header,
    fontWeight: 'bold',
    marginTop: 15,
  },
  formContainer: {
    backgroundColor: AuthPageColors.primary,
    // flexBasis: 100,
    height: 600,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    // paddingTop: 5,
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 152,
  },
  loginAuthLabels: {
    fontFamily: 'ubuntu sans',
    color: 'white',
    fontSize: FontSize.body_medium,
    marginBottom: 0,
    padding: 10,
    // backgroundColor: 'grey',
  },
  input: {
    height: 45,
    borderColor: 'white',
    backgroundColor: 'white',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    paddingLeft: 10,
    borderRadius: 14,
  },
  forgotPassStyle: {
    textDecorationLine: 'underline',
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
  },
  loginButton: {
    alignItems: 'center',
    backgroundColor: '#00722A',
    borderColor: 'white',
    borderRadius: 16,
    borderWidth: 3,
    paddingVertical: 14,
    marginHorizontal: 130,
  },
  loginButtonLabel: {
    fontFamily: 'ubuntu sans',
    color: 'white',
    fontSize: FontSize.body_medium,
  },
});

export default LoginAuth;
