import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';


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


  return (
    <View style={styles.container}>
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
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f0e2d7',
  },
  loginAuthLabels: {
    fontSize: 16,
    fontFamily: 'ubuntu sans',
    marginBottom: 8,
    padding: 8,
    backgroundColor: 'grey',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  forgotPassStyle: {
    textDecorationLine: 'underline',
    color: 'blue',
    marginBottom: 16,
    textAlign: 'center',
  },
  loginButton: {
    padding: 10,
    borderRadius: 20,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    borderWidth: 2,
    borderColor: 'white',
    width: '50%',
  },
  loginButtonLabel: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'ubuntu sans',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});


export default LoginAuth;
