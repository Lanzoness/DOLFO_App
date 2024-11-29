import React, { useState, useRef, useEffect } from 'react';
import { Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import UserPalette from '../constants/UserPalette';
import FontSize from '../constants/FontSize';
import { readLostItems } from '../test/readLostItemsjson';
import FilterDrawer, { FilterDrawerRef } from '../components/FilterDrawer';

// declaration of  useState and useRef for each variable
const FlatListGrid = () => {
  const [data, setData] = useState([]);
  const [alphabeticalOrder, setAlphabeticalOrder] = useState('descending');
  const filterDrawerRef = useRef<FilterDrawerRef>(null);


  // To fetch the data from the JSON file
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


  // To sort the items alphabetically
  const toggleAlphabetical = () => {
    setAlphabeticalOrder((prev) => (prev === 'descending' ? 'ascending' : 'descending'));
    setData((prevData) =>
      [...prevData].sort((a, b) =>
        alphabeticalOrder === 'ascending'
          ? a['Item Name'].localeCompare(b['Item Name'])
          : b['Item Name'].localeCompare(a['Item Name'])
      )
    );
  };

  // Updated renderItem function to include TouchableOpacity
  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.itemContainer,
        styles.touchableContainer
      ]}
      onPress={() => handleItemPress(item)}
      activeOpacity={0.7}
      delayPressIn={50}
      pressRetentionOffset={{ top: 10, left: 10, bottom: 10, right: 10 }}
    >
      <Image source={{ uri: item.Image }} style={styles.itemImage} />
      <Text style={styles.itemName}>{item['Item Name']}</Text>
      <Text style={styles.itemCategory}>Category: {item.Category}</Text>
      <Text style={styles.itemDate}>Date: {item['Date Submitted']}</Text>
    </TouchableOpacity>
  );

  // Add this new function to handle item press
  const handleItemPress = (item: any) => {
    console.log('Item pressed:', item);
    // Add your navigation or modal logic here
  };


  // Reset and done button of the filter drawer
  const handleApplyFilters = (filters: any) => {
    // Handle filter application
    console.log(filters);
  };

  const handleResetFilters = () => {
    // Handle filter reset
  };


  return (
    <FilterDrawer
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
      />
    </FilterDrawer>
  );
};


const styles = StyleSheet.create({
  flatListContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: UserPalette.green,
  },
  itemContainer: {
    flex: 1,
    margin: 10,
    maxWidth: Dimensions.get('window').width / 2 - 15,
    backgroundColor: UserPalette.default_background,
    borderRadius: 7,
    padding: 7,
    alignItems: 'center',
  },
  itemImage: {
    width: '100%',
    height: Dimensions.get('window').width / 2 - 40,
    resizeMode: 'cover',
  },
  itemName: {
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: FontSize.body_small,
    color: UserPalette.black_font,
  },
  itemCategory: {
    marginTop: 3,
    color: UserPalette.black_font,
    fontSize: FontSize.body_smallest,
  },
  itemDate: {
    color: UserPalette.black_font,
    fontSize: FontSize.body_smallest,
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
    // shadowOpacity: 0.25,
    // shadowRadius: 4.84,
    // elevation: 5,
    borderWidth: 1,
    borderColor: 'transparent',
    transform: [{ scale: 1 }],
  },
  touchablePressed: {
    backgroundColor: UserPalette.light_blue,
    borderColor: UserPalette.green,
    transform: [{ scale: 0.95 }],
  },
});

export default FlatListGrid;
