import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const UserHomeScreen = () => {
  return (
    <View style={styles.container}>
        <Image source={require('../assets/icons/SubmitLost.png')} style={styles.icon} />
        <Image source={require('../assets/icons/ViewLost.png')} style={styles.icon} />
      <Text style={styles.text}>User Home Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  icon: {
    width: 100, // Adjust the size as needed
    height: 100, // Adjust the size as needed
    marginRight: 10,
  },
});

export default UserHomeScreen;