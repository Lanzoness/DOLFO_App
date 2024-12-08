//  User-side view view lost items 
import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import { Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity, View, TextInput, Modal } from 'react-native';
import UserPalette from '../constants/UserPalette';
import FontSize from '../constants/FontSize';
import { readLostItems } from '../test/readLostItems';
import FilterDrawer, { FilterDrawerRef } from '../components/FilterDrawer';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { algoFilter } from '../test/algoFilter';
import { processDate } from '../test/processDate.js';
import { algoSearch } from '../test/algoSearch.js';
import { checkName } from '../test/checkName.js';
// Define the type for navigation parameters
type RootStackParamList = {
  UserItemInformation: {
    item: Item;
  };
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'UserItemInformation'>;

// Define the type for the items
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


const TEST_FlatlistGrid = forwardRef<FilterDrawerRef>((props, ref) => {
  const navigation = useNavigation<NavigationProp>();
  const [data, setData] = useState<Item[]>([]);
  const [originalData, setOriginalData] = useState<Item[]>([]);
  const [filteredData, setFilteredData] = useState<Item[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const filterDrawerRef = useRef<FilterDrawerRef>(null);
  const categories = [
    { key: '1', value: 'Electronics' },
    { key: '2', value: 'Clothing' },
    { key: '3', value: 'Documents' },
    { key: '4', value: 'Wallets' },
    { key: '5', value: 'Bags' },
    { key: '6', value: 'Others' },
  ];

  useImperativeHandle(ref, () => ({
    openDrawer: () => filterDrawerRef.current?.openDrawer(),
    closeDrawer: () => filterDrawerRef.current?.closeDrawer(),
    handleSearch: (query: string) => handleSearch(query),
    getChildRef: () => filterDrawerRef.current
  }));

  // To fetch the data from the JSON file
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await readLostItems();
        setData(result);
        setOriginalData(result); // Store original data
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);


  // Updated renderItem function to include TouchableOpacity
  const renderItem = ({ item }: { item: Item }) => {
    // Find the category object that matches the item's category key
    const categoryObj = categories.find(cat => cat.key === item.Category);
    const categoryValue = categoryObj ? categoryObj.value : item.Category;

    return (
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
        <Text style={styles.itemName}>
          {checkName(item['Item Name'])}
        </Text>
        <Text style={styles.itemCategory}>
          Category: {categoryValue}
        </Text>
        <Text style={styles.itemDate}>
          Date: {processDate(item['Date Submitted'], false)}
        </Text>
      </TouchableOpacity>
    );
  };

  // Add this new function to handle item press
  const handleItemPress = (item: any) => {
    console.log('Item pressed:', item);
    navigation.navigate('UserItemInformation', { item });
  };


  // Reset and done button of the filter drawer
  const handleApplyFilters = (filters: {
    startDate: Date | null;
    endDate: Date | null;
    dateSortOrder: string;
    selectedCategory: string;
    selectedStatus: string;
  }) => {
    try {
      console.log('Parent component received filters:', filters);
      const filtered = algoFilter.filterItems(originalData, filters);
      setFilteredData(filtered);
      
      if (searchQuery.trim()) {
        const searchResults = algoSearch(filtered, searchQuery);
        setData(searchResults);
      } else {
        setData(filtered);
      }
    } catch (error) {
      console.error('Error in parent handleApplyFilters:', error);
    }
  };

  const handleResetFilters = () => {
    setFilteredData([]);
    
    // After reset, if there's a search query, apply it to original data
    if (searchQuery.trim()) {
      const searchResults = algoSearch(originalData, searchQuery);
      setData(searchResults);
    } else {
      setData(originalData);
    }
  };

  const handleSearch = (query: string) => {
    console.log('\n=== Search Process Started ===');
    console.log('Query:', query);
    console.log('Original Data Length:', originalData?.length || 0);
    console.log('Original Data Items:', originalData?.map(item => item['Item Name']));

    if (!originalData || originalData.length === 0) {
      console.log('No data available to search through');
      return;
    }

    setSearchQuery(query);
    
    if (!query.trim()) {
      console.log('Empty query detected - Resetting to original data');
      console.log('Original data items:', originalData.map(item => item['Item Name']));
      setData(filteredData.length > 0 ? filteredData : originalData);
      console.log('Data reset complete');
      console.log('=== Search Process Ended ===\n');
      return;
    }

    try {
      console.log('Starting search with query:', query);
      console.log('Searching through items:', originalData.map(item => item['Item Name']));
      
      const baseData = filteredData.length > 0 ? filteredData : originalData;
      const searchResults = algoSearch(baseData, query);
      
      console.log('\nSearch Results:');
      console.log('- Found Items:', searchResults.length);
      console.log('- Matched Items:', searchResults.map(item => ({
        name: item['Item Name'],
        category: item.Category,
        location: item['Location Found']
      })));
      
      setData(searchResults);
      console.log('\nState Updates:');
      console.log('- Previous data count:', data.length);
      console.log('- New data count:', searchResults.length);
      
    } catch (error) {
      console.error('\nSearch Error:', error);
      console.log('Resetting to original data due to error');
      setData(filteredData.length > 0 ? filteredData : originalData);
    }

    console.log('=== Search Process Ended ===\n');
  };

  const handleSearchSubmit = () => {
    console.log('Search submitted with query:', searchQuery);
    handleSearch(searchQuery);
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
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.flatListContainer}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          paddingHorizontal: 4,
        }}
        extraData={searchQuery}
      />
    </FilterDrawer>
  );
});


const styles = StyleSheet.create({
  flatListContainer: {
    paddingVertical: 8,
    backgroundColor: UserPalette.green,
    minHeight: '100%',
    flexGrow: 1,
  },
  itemContainer: {
    margin: 4,
    width: Dimensions.get('window').width / 2 - 12,
    maxWidth: Dimensions.get('window').width / 2 - 12,
    backgroundColor: UserPalette.default_background,
    borderRadius: 8,
    padding: 4,
    alignItems: 'center',
    height: 'auto',
    aspectRatio: 0.68,
  },
  itemImage: {
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'cover',
    borderRadius: 6,
  },
  itemName: {
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: FontSize.body_small,
    color: UserPalette.black_font,
    width: '100%',
    maxHeight: 50,
    padding: 5,
  },
  itemCategory: {
    marginTop: 4,
    color: UserPalette.black_font,
    fontSize: FontSize.body_smallest,
    width: '100%',
    textAlign: 'center',
    padding: 2,
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
    borderColor: UserPalette.green,
    transform: [{ scale: 0.95 }],
  },
});

export default TEST_FlatlistGrid;