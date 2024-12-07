import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import UserPalette from '../constants/UserPalette';
import FontSize from '../constants/FontSize';
import { readLostItems } from '../test/readLostItems';
import FilterDrawer, { FilterDrawerRef } from '../components/FilterDrawer';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Navigation types
type RootStackParamList = {
  AdminItemInformation: {
    item: Item;
  };
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'AdminItemInformation'>;

interface Item {
  Image: string;
  ['Item Name']: string;
  Category: string;
  Description: string;
  'Location Found': string;
  'Date Submitted': string;
  'Owner Name': string;
  'Owner ID': string;
  id: string;
}

const categories = [
  { key: '1', value: 'Electronics' },
  { key: '2', value: 'Clothing' },
  { key: '3', value: 'Documents' },
  { key: '4', value: 'Wallets' },
  { key: '5', value: 'Bags' },
  { key: '6', value: 'Others' },
];

const ViewLost = forwardRef<FilterDrawerRef>((props, ref) => {
  const navigation = useNavigation<NavigationProp>();
  const [data, setData] = useState<Item[]>([]);
  const filterDrawerRef = useRef<FilterDrawerRef>(null);

  useImperativeHandle(ref, () => ({
    openDrawer: () => filterDrawerRef.current?.openDrawer(),
    closeDrawer: () => filterDrawerRef.current?.closeDrawer(),
    getChildRef: () => filterDrawerRef.current,
    handleSearch: (query: string) => {
      // Implement search functionality if needed
    }
  }));

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

  const handleItemPress = (item: Item) => {
    navigation.navigate('AdminItemInformation', { item });
  };

  const renderItem = ({ item }: { item: Item }) => {
    console.log('Raw Category from item:', item.Category);
    const categoryObj = categories.find(cat => cat.key === item.Category);
    console.log('Found categoryObj:', categoryObj);
    const categoryValue = categoryObj ? categoryObj.value : item.Category;
    console.log('Final categoryValue:', categoryValue);

    return (
      <TouchableOpacity
        style={[styles.itemContainer, styles.touchableContainer]}
        onPress={() => {
          console.log('Item pressed with category:', item.Category);
          handleItemPress(item);
        }}
        activeOpacity={0.9}
        delayPressIn={50}
        pressRetentionOffset={{ top: 10, left: 10, bottom: 10, right: 10 }}
      >
        <Image source={{ uri: item.Image }} style={styles.itemImage} />
        <Text style={styles.itemName} numberOfLines={2} ellipsizeMode="tail">
          {item['Item Name']}
        </Text>
        <Text style={styles.itemCategory} numberOfLines={1} ellipsizeMode="tail">
          Category: {categoryValue}
        </Text>
        <Text style={styles.itemDate} numberOfLines={1} ellipsizeMode="tail">
          Date: {item['Date Submitted']}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FilterDrawer
      ref={filterDrawerRef}
      onApply={() => {}}
      onReset={() => {}}
    >
      <View style={styles.contentContainer}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.flatListContainer}
          columnWrapperStyle={styles.columnWrapper}
        />
      </View>
    </FilterDrawer>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UserPalette.secondary_blue,
  },
  flatListContainer: {
    paddingVertical: 8,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: UserPalette.secondary_blue,
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
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
});

export default ViewLost;