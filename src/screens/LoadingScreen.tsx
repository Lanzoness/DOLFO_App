import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  LoginUserAdmin: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'LoginUserAdmin'>;

function LoadingScreen(): React.JSX.Element {
  const navigation = useNavigation<NavigationProp>();

  useFocusEffect(
    React.useCallback(() => {
      const timer = setTimeout(() => {
        navigation.navigate('LoginUserAdmin');
      }, 10000);

      return () => clearTimeout(timer);
    }, [navigation])
  );

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/icons/DOLFO_Logo.png')}
        style={styles.logo}
      />
      <Text style={styles.text}>DOLFO</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'green',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: 'contain',
  },
});

export default LoadingScreen;