import { StyleSheet, Text, View, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import UserPalette from '../constants/UserPalette';
import FontSize from '../constants/FontSize';
import { readLostItems } from '../test/readLostItems.js';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { processDate } from '../test/processDate';

// Define the type for navigation parameters
type RootStackParamList = {
  AdminItemInformation: {
    item: Item;
  };
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'AdminItemInformation'>;

// Add a reference to the filter drawer

// interface file type for each item
interface Item {
  Image: string;
  ['Item Name']: string;
  Category: string;
  Description: string;
  'Location Found': string;
  'Date Submitted': string;
  'Owner Name': string;
  'Owner ID': string;
  'Is Retrieved': number;
  id: string;
}


// Fetch data from Firebase
const AdminApproveItemGrid = () => {
  const navigation = useNavigation<NavigationProp>();
  const [data, setData] = useState<Item[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await readLostItems();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // render each item to the flatlist grid
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        styles.touchableContainer,
      ]}
      onPress={() => handleItemPress(item)}
      activeOpacity={0.9}
      delayPressIn={50}
      pressRetentionOffset={{ top: 10, left: 10, bottom: 10, right: 10 }}
    >
      <Image source={{ uri: item.Image }} style={styles.itemImage} />
      <Text 
        style={styles.itemName}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {item['Item Name']}
      </Text>
      <Text
        style={styles.itemCategory}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        Category: {item.Category}
      </Text>
      <Text
        style={styles.itemDate}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        Date: {processDate(item['Date Submitted'], false)}
      </Text>
    </TouchableOpacity>
  );

  const handleItemPress = (item: Item) => {
    navigation.navigate('AdminItemInformation', { item });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};


const { width } = Dimensions.get('window');
const itemWidth = (width - 48) / 2;

const styles = StyleSheet.create({
  flatListContainer: {
    paddingVertical: 8,
    backgroundColor: UserPalette.blue,
  },
  itemContainer: {
    margin: 4,
    width: Dimensions.get('window').width / 2 - 12,
    maxWidth: Dimensions.get('window').width / 2 - 12,
    backgroundColor: UserPalette.default_background,
    borderRadius: 7,
    padding: 8,
    alignItems: 'center',
    height: 'auto',
    aspectRatio: 0.72,
  },
  itemImage: {
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  itemName: {
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: FontSize.body_small,
    color: UserPalette.black_font,
    width: '100%',
  },
  itemCategory: {
    marginTop: 4,
    color: UserPalette.black_font,
    fontSize: FontSize.body_smallest,
    width: '100%',
    textAlign: 'center',
  },
  itemDate: {
    color: UserPalette.black_font,
    fontSize: FontSize.body_smallest,
    width: '100%',
    textAlign: 'center',
  },
  drawerContent: {
    flex: 1,
    padding: 15,
    backgroundColor: 'white',
  },
  drawerTitle: {
    fontWeight: '800',
    borderBottomWidth: 1,
    borderColor: 'grey',
    textAlign: 'center',
    marginBottom: 20,
    paddingTop: 50,
    fontSize: 16,
  },
  touchableContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderWidth: 1,
    borderColor: 'transparent',
    transform: [{ scale: 1 }],
  },
  touchablePressed: {
    backgroundColor: UserPalette.light_blue,
    borderColor: UserPalette.blue,
    transform: [{ scale: 0.95 }],
  },
});

export default AdminApproveItemGrid;