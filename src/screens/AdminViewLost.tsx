import React, { useState, useRef, useEffect } from 'react';
import { Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import UserPalette from '../constants/UserPalette';
import FontSize from '../constants/FontSize';
import { readLostItems } from '../test/readLostItemsjson';
import AdminFilterDrawer from '../components/AdminFilterDrawer';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define the type for navigation parameters
type RootStackParamList = {
  AdminItemInformation: {
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

type NavigationProp = StackNavigationProp<RootStackParamList, 'AdminItemInformation'>;

// Update the FilterDrawerRef interface to match AdminFilterDrawer
interface FilterDrawerRef {
  openDrawer: () => void;
  closeDrawer: () => void;
}

const AdminViewLost = () => {
  const navigation = useNavigation<NavigationProp>();
  const [data, setData] = useState([]);
  const filterDrawerRef = useRef<FilterDrawerRef>(null);

  // Fetch data from Firebase
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await readLostItems();
        setData(result);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

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
        Date: {item['Date Submitted']}
      </Text>
    </TouchableOpacity>
  );

  const handleItemPress = (item: any) => {
    console.log('Item pressed:', item);
    navigation.navigate('AdminItemInformation', { item });
  };

  // Update the handleApplyFilters and handleResetFilters to match AdminFilterDrawer props
  const handleApplyFilters = () => {
    // Your filter logic here
    console.log('Applying filters');
  };

  const handleResetFilters = () => {
    const fetchData = async () => {
      try {
        const result = await readLostItems();
        setData(result);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  };

  return (
    <AdminFilterDrawer
      ref={filterDrawerRef}
      onApply={handleApplyFilters}
      onReset={handleResetFilters}
    >
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.flatListContainer}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          paddingHorizontal: 4,
        }}
      />
    </AdminFilterDrawer>
  );
};

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

export default AdminViewLost;