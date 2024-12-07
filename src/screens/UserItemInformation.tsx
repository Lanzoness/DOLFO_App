import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import UserPalette from '../constants/UserPalette';
import FontSize from '../constants/FontSize';
import { processDate } from '../test/processDate.js';


type RouteParams = {
  params: {
    item: {
      Image: string;
      ['Item Name']: string;
      Category: string;
      Description: string | string[];
      'Location Found': string;
      'Date Submitted': string;
      'Owner Name': string;
      'Owner ID': string;
      id: string;
    };
  };
};

const categories = [
  { key: '1', value: 'Electronics' },
  { key: '2', value: 'Clothing' },
  { key: '3', value: 'Documents' },
  { key: '4', value: 'Wallets' },
  { key: '5', value: 'Bags' },
  { key: '6', value: 'Others' },
];

const UserItemInformation = () => {
  const route = useRoute<RouteProp<{ UserItemInformation: RouteParams }, 'UserItemInformation'>>();
  const { item } = route.params;

  const getCategoryValue = (categoryKey: string) => {
    const categoryObj = categories.find(cat => cat.key === categoryKey);
    return categoryObj ? categoryObj.value : categoryKey;
  };

  const renderDescriptions = () => {
    if (Array.isArray(item.Description)) {
      return item.Description.map((desc: string, index: number) => (
        <Text
          key={index}
          style={[
            styles.value,
            index > 0 && styles.additionalValue
          ]}
        >
          {desc}
        </Text>
      ));
    }
    return <Text style={styles.value}>{item.Description}</Text>;
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <View style={styles.imageWrapper}>
            <Image source={{ uri: item.Image }} style={styles.image} />
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Item Name:</Text>
          <Text style={styles.value}>{item['Item Name']}</Text>

          <Text style={styles.label}>Description:</Text>
          {renderDescriptions()}

          <Text style={styles.label}>Category:</Text>
          <Text style={styles.value}>{getCategoryValue(item.Category)}</Text>

          <Text style={styles.label}>Location Found:</Text>
          <Text style={styles.value}>{item['Location Found']}</Text>

          <Text style={styles.label}>Date and Time Submitted:</Text>
          <Text style={styles.value}>{processDate(item['Date Submitted'], true)}</Text>

          <Text style={styles.label}>Owner Name:</Text>
          <Text style={styles.value}>{item['Owner Name'] || 'Unavailable'}</Text>

          <Text style={styles.label}>Owner ID:</Text>
          <Text style={styles.value}>{item['Owner ID'] || 'Unavailable'}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: UserPalette.green,
  },
  container: {
    flex: 1,
  },
  imageContainer: {
    backgroundColor: UserPalette.secondary_green,
    width: '100%',
    paddingVertical: 20,
    borderBottomWidth: 2,
    borderBottomColor: UserPalette.white_font,
  },
  imageWrapper: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 18,
    resizeMode: 'cover',
  },
  infoContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom: 15, 
  },
  label: {
    fontWeight: '800',
    marginTop: 15,
    paddingTop: 10,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingLeft: 10,
    paddingBottom: 7,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderLeftColor: 'white',
    borderRightColor: 'white',
    borderTopColor: 'white',
    backgroundColor: 'rgba(0, 71, 171, 0.1)',
    color: UserPalette.white_font,
    fontSize: FontSize.body_medium,
  },
  value: {
    fontSize: FontSize.body_medium,
    color: UserPalette.white_font,
    fontWeight: '600',
    marginBottom: 10,
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderLeftColor: 'white',
    borderRightColor: 'white',
    paddingBottom: 5,
    paddingTop: 10,
    flexWrap: 'wrap',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderBottomColor: 'white',
  },
  additionalValue: {
    marginTop: -10,
    paddingTop: 10,
  },
});

export default UserItemInformation;