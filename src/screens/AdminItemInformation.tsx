import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';

// Define the type for route parameters
type RouteParams = {
  params: {
    item: {
      Image: string;
      ['Item Name']: string;
      Category: string;
      Description: string;
      'Location Found': string;
      'Date Submitted': string;
      'Owner Name': string;
      'Owner ID': string;
    };
  };
};

const AdminItemInformation = () => {
  const route = useRoute<RouteProp<{ AdminItemInformation: RouteParams }, 'AdminItemInformation'>>();
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.Image }} style={styles.image} />
      <Text style={styles.text}>Item Name: {item['Item Name']}</Text>
      <Text style={styles.text}>Category: {item.Category}</Text>
      <Text style={styles.text}>Description: {item.Description}</Text>
      <Text style={styles.text}>Location Found: {item['Location Found']}</Text>
      <Text style={styles.text}>Date and Time Submitted: {item['Date Submitted']}</Text>
      <Text style={styles.text}>Finder Name: {item['Finder Name']}</Text>
      <Text style={styles.text}>Finder ID: {item['Finder ID']}</Text>
      <Text style={styles.text}>Owner Name: {item['Owner Name']}</Text>
      <Text style={styles.text}>Owner ID: {item['Owner ID']}</Text>
      <Text style={styles.text}>Date Retrieved: {item['Date Retrieved']}</Text>
      <Text style={styles.text}>Is Retrieved: {item['Is Retrieved']}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default AdminItemInformation;