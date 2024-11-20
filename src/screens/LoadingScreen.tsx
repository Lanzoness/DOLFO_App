import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Image, Text } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  LoginUserAdmin: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'LoginUserAdmin'>;

function LoadingScreen(): React.JSX.Element {
  const navigation = useNavigation<NavigationProp>();
  const fillAnim = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    React.useCallback(() => {
      fillAnim.setValue(0);

      Animated.timing(fillAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      }).start();

      const timer = setTimeout(() => {
        navigation.navigate('LoginUserAdmin');
      }, 2000);

      return () => clearTimeout(timer);
    }, [navigation, fillAnim])
  );

  return (
    <View style={styles.container}>
      <View style={styles.iconTextContainer}>
        <Image source={require('../assets/icons/DOLFO_Logo.png')} style={styles.icon} />
        <Text style={styles.text}>DOLFO</Text>
      </View>
      <View style={styles.progressBar}>
        <Animated.View
          style={[
            styles.progressBarFill,
            {
              width: fillAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    width: 100, // Adjust the size as needed
    height: 100, // Adjust the size as needed
    marginRight: 10,
  },
  text: {
    fontSize: 52,
    fontWeight: 'bold',
    color: 'green',
  },
  progressBar: {
    width: '60%',
    height: 20,
    backgroundColor: 'transparent',
    borderColor: 'green',
    borderWidth: 2,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: 'green',
  },
});

export default LoadingScreen;