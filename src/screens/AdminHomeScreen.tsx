import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, Dimensions, TouchableWithoutFeedback, Text, TouchableOpacity } from 'react-native';
import Button from '../components/button';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { downloadAllItems } from '../test/downloadAllItems';
import { readLostItems } from '../test/readLostItems';
const { width } = Dimensions.get('window');

type RootStackParamList = {
  ViewLost: undefined;
  AdminSubmitLost: undefined;
  EditLost: undefined;
  LoginAuth: undefined;
};

const AdminHomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const drawerAnimation = useRef(new Animated.Value(width)).current;

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
      await downloadAllItems();
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
          isAdmin={true}
          onClick={openDrawer}
          style={styles.quaternaryButton}
        />
      </View>
      <Button 
        label="View & Edit Lost Items"
        variant="quinary" 
        onClick={() => {navigation.navigate('ViewLost')}} 
        style={styles.button}
        color="#1D68B3"
      />
      <Button 
        label="Submit Lost Item"
        variant="tertiary" 
        onClick={() => {navigation.navigate('AdminSubmitLost')}} 
        style={styles.submitButton}
        color="#1D68B3"
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
    backgroundColor: '#1D68B3', // Changed color
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
    backgroundColor: '#1D68B3', // Changed color
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

export default AdminHomeScreen;
