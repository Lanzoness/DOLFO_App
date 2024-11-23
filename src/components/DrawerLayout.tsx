import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DrawerLayout from 'react-native-drawer-layout';

// If type definitions are missing, you might need to declare them
declare module 'react-native-drawer-layout' {
  export default class DrawerLayout extends React.Component<any, any> {}
}

const DrawerLayoutComponent = () => {
  const renderNavigationView = () => (
    <View style={styles.drawerContainer}>
      <Text style={styles.drawerText}>Home</Text>
      <Text style={styles.drawerText}>Submit Lost Item</Text>
      <Text style={styles.drawerText}>View Lost Items</Text>
    </View>
  );

  return (
    <DrawerLayout
      drawerWidth={300}
      drawerPosition="left"
      renderNavigationView={renderNavigationView}
    >
      <View style={styles.container}>
        <Text style={styles.contentText}>Main Content</Text>
      </View>
    </DrawerLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentText: {
    fontSize: 18,
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  drawerText: {
    fontSize: 16,
    marginVertical: 10,
  },
});

export default DrawerLayoutComponent;