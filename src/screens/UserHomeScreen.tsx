import React, { useState, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions, TouchableWithoutFeedback, Text, TouchableOpacity } from 'react-native';
import Button from '../components/button';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { downloadLostItems } from '../test/downloadLostItems';
import { readLostItems } from '../test/readLostItemsjson';
import { TEST_FlatlistGrid } from '../screens/TEST_Screens/TEST_FlatlistGrid';

const { width } = Dimensions.get('window');

type YourStackParamList = {
  LoginAuth: undefined;
  ViewLost: undefined;
  SubmitLost: undefined;
  TEST_FlatlistGrid: undefined;
  // Add other routes here if needed
};

const UserHomeScreen = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const drawerAnimation = useRef(new Animated.Value(width)).current;
  const navigation = useNavigation<NavigationProp<YourStackParamList>>();

  const openDrawer = () => {
    setDrawerVisible(true);
    Animated.timing(drawerAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeDrawer = () => {
    Animated.timing(drawerAnimation, {
      toValue: width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setDrawerVisible(false));
  };

  const handleUpdateLocalDatabase = async () => {
    try {
      await downloadLostItems();
      await readLostItems();
    } catch (error) {
      console.error('Error updating local database:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Button 
          label=""
          variant="quaternary"
          onClick={openDrawer}
          style={styles.quaternaryButton}
        />
      </View>
      <Button 
        label="View Lost Items"
        variant="secondary" 
        onClick={() => {navigation.navigate('TEST_FlatlistGrid')}} 
        style={styles.button}
      />
      <Button 
        label="Submit Lost Item"
        variant="tertiary" 
        onClick={() => {navigation.navigate('SubmitLost')}} 
        style={styles.submitButton}
      />

      {drawerVisible && (
        <TouchableWithoutFeedback onPress={closeDrawer}>
          <View style={styles.overlay}>
            <Animated.View style={[styles.drawer, { transform: [{ translateX: drawerAnimation }] }]}>
              <View style={styles.drawerContent}>
                <TouchableOpacity onPress={() => { /* Handle My Account press */ }}>
                  <Text style={styles.firstDrawerText}>My Account</Text>
                </TouchableOpacity>
                <View style={styles.divider} />
                
                <TouchableOpacity onPress={() => { /* Handle My Submitted Items press */ }}>
                  <Text style={styles.drawerText}>My Submitted Items</Text>
                </TouchableOpacity>
                <View style={styles.divider} />
                
                <TouchableOpacity onPress={handleUpdateLocalDatabase}>
                  <Text style={styles.drawerText}>Update Local Database</Text>
                </TouchableOpacity>
                <View style={styles.divider} />
                
                <TouchableOpacity onPress={() => navigation.navigate('LoginAuth')}>
                  <Text style={styles.drawerText}>Logout</Text>
                </TouchableOpacity>
                <View style={styles.divider} />
              </View>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  topBar: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 80,
    backgroundColor: '#00722A',
    flexShrink: 0,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  quaternaryButton: {
    position: 'absolute',
    right: 25,
    top: 17,
    width: 40,
    height: 40,
  },
  button: {
    marginTop: 152,
  },
  submitButton: {
    marginTop: 50,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawer: {
    position: 'absolute',
    right: 0,
    width: 290,
    height: '100%',
    backgroundColor: '#00722A',
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  drawerContent: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  drawerText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Ubuntu Sans',
    fontWeight: '700',
    textAlign: 'right',
    paddingVertical: 20,
    paddingRight: 29,
  },
  firstDrawerText: {
    paddingTop: 32,
    paddingBottom: 20,
    color: 'white',
    fontSize: 20,
    fontFamily: 'Ubuntu Sans',
    fontWeight: '700',
    textAlign: 'right',
    paddingRight: 29,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: 'white',
    marginVertical: 0,
  },
});

export default UserHomeScreen;