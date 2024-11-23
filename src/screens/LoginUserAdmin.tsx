import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Button from '../components/button.tsx';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  LoginAuth: undefined;
};

function LoginUserAdmin(): React.JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const userButtonClick = () => { //Button click logic here
    navigation.navigate('LoginAuth');
  };
  const adminButtonClick = () => { //Button click logic here
    navigation.navigate('LoginAuth');
  };
  const handleCreateAccount = () => { //Button click logic here
    navigation.navigate('LoginAuth'); //Temporarily set to LoginAuth
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/icons/DOLFO_Logo.png')}
        style={styles.DolfoLogo}
      />
      <Text style={styles.titleText}>DOLFO</Text>
      <View style={styles.rectangle}>
        <Text style={styles.text}>Login As</Text>
        <Button 
          label="User"
          onClick={userButtonClick}
          variant="primary"
          style={{
            position: 'absolute',
            top: 128, 
            alignSelf: 'center'
          }}
        />
        <Button 
          label="Admin"
          onClick={adminButtonClick}
          variant="primary"
          style={{
            position: 'absolute',
            top: 193, 
            alignSelf: 'center'
          }}
        />
        <Text 
          style={styles.createAccountText}
          onPress={handleCreateAccount}
        >
          Create Account
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  text: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Ubuntu Sans',
    letterSpacing: 0.96,
    position: 'absolute', 
    top: 45,
    color: 'white',   
    alignSelf: 'center',  
    width: '100%',        
    textAlign: 'center',
  },

  rectangle: {
    width: '100%',
    height: '50%',
    backgroundColor: '#00722A',
    borderTopLeftRadius: 50,  
    borderTopRightRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  createAccountText: {
    position: 'absolute',
    bottom: 152,
    width: '100%',
    textAlign: 'center',
    color: 'white',
    fontSize: 12,
    fontFamily: 'Ubuntu Sans',
    fontWeight: '500',
    textDecorationLine: 'underline',
    letterSpacing: 0.48,
  },

  titleText: {
    width: '100%',
    color: '#00722A',
    fontSize: 47.77,
    fontFamily: 'Paytone One',
    fontWeight: '400',
    letterSpacing: 1.91,
    textAlign: 'right',
    position: 'absolute',
    top: 246,
    right: 72.24,
  },

  DolfoLogo: {
    width: 100, 
    height: 100, 
    position: 'absolute',
    top: 246.52,    
    left: 59,  
  },
});

export default LoginUserAdmin;