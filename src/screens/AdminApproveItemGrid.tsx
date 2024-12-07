import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity, Animated } from 'react-native';
import UserPalette from '../constants/UserPalette';
import FontSize from '../constants/FontSize';
import { readLostItems } from '../test/readLostItems.js';
import AdminApproveItemDrawer from '../components/AdminApproveItemDrawer';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AdminApproveItemDrawerRef } from '../components/AdminApproveItemDrawer';
import { algoSearch } from '../test/algoSearch.js';
import { algoFilter } from '../test/algoFilter';
import { processDate } from '../test/processDate';
import { checkName } from '../test/checkName.js';

// Change to AdminApproveItemsPage
type RootStackParamList = {
  AdminApproveItemPage: {
    item: Item;
  };
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'AdminApproveItemPage'>;

// Update the FilterDrawerRef interface to match AdminAcceptItemDrawer
interface FilterDrawerRef {
  openDrawer: () => void;
  closeDrawer: () => void;
}
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

const categories = [
  { key: '1', value: 'Electronics' },
  { key: '2', value: 'Clothing' },
  { key: '3', value: 'Documents' },
  { key: '4', value: 'Wallets' },
  { key: '5', value: 'Bags' },
  { key: '6', value: 'Others' },
];

const AdminApproveItemGrid = forwardRef<AdminApproveItemDrawerRef>((props, ref) => {
  const navigation = useNavigation<NavigationProp>();
  const [data, setData] = useState<Item[]>([]);
  const [originalData, setOriginalData] = useState<Item[]>([]);
  const [filteredData, setFilteredData] = useState<Item[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const filterDrawerRef = useRef<AdminApproveItemDrawerRef>(null);

  useImperativeHandle(ref, () => ({
    openDrawer: () => filterDrawerRef.current?.openDrawer(),
    closeDrawer: () => filterDrawerRef.current?.closeDrawer(),
    handleSearch: (query: string) => handleSearchAdmin(query),
    handleSearchAdmin: (query: string) => handleSearchAdmin(query),
    getChildRef: () => filterDrawerRef.current,
    drawerVisible: filterDrawerRef.current?.drawerVisible || false,
    drawerAnimation: filterDrawerRef.current?.drawerAnimation || new Animated.Value(0)
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await readLostItems();
        const filteredResult = result.filter(item => item['Is Retrieved'] == -2);
        setData(filteredResult);
        setOriginalData(filteredResult);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleSearchAdmin = (query: string) => {
    console.log('\n=== AdminApproveItemGrid Search Process Started ===');
    console.log('Query:', query);
    console.log('Original Data Length:', originalData?.length || 0);
    
    if (!originalData || originalData.length === 0) {
      console.log('No data available to search through');
      return;
    }

    setSearchQuery(query);
    
    if (!query.trim()) {
      console.log('Empty query detected - Resetting to original data');
      setData(filteredData.length > 0 ? filteredData : originalData);
      return;
    }

    try {
      const baseData = filteredData.length > 0 ? filteredData : originalData;
      const searchResults = algoSearch(baseData, query);
      console.log('Search results:', searchResults.map(item => item['Item Name']));
      setData(searchResults);
    } catch (error) {
      console.error('Search error:', error);
      setData(filteredData.length > 0 ? filteredData : originalData);
    }
  };

  const renderItem = ({ item }) => {
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

  // redirect to AdminApproveItemPage once a lost item is pressed
  const handleItemPress = (item: Item) => {
    navigation.navigate('AdminApproveItemPage', { item });
  };

  const handleApplyFilters = (filters: {
    startDate: Date | null;
    endDate: Date | null;
    dateSortOrder: string;
    selectedStatus: string;
    selectedCategory: string;
    statuses: number;
  }) => {
    try {
      console.log('Applying filters:', filters);
      const filtered = algoFilter.filterItems(originalData, filters);
      setFilteredData(filtered);
      
      if (searchQuery.trim()) {
        const searchResults = algoSearch(filtered, searchQuery);
        setData(searchResults);
      } else {
        setData(filtered);
      }
    } catch (error) {
      console.error('Error in handleApplyFilters:', error);
    }
  };

  const handleResetFilters = () => {
    setFilteredData([]);
    if (searchQuery.trim()) {
      const searchResults = algoSearch(originalData, searchQuery);
      setData(searchResults);
    } else {
      setData(originalData);
    }
  };

  return (
    <AdminApproveItemDrawer
      ref={filterDrawerRef}
      onApply={handleApplyFilters}
      onReset={handleResetFilters}
      onSearch={handleSearchAdmin}
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
    </AdminApproveItemDrawer>
  );
});

const styles = StyleSheet.create({
  flatListContainer: {
    paddingVertical: 8,
    backgroundColor: UserPalette.blue,
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
    borderRadius: 5,
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
    borderColor: UserPalette.blue,
    transform: [{ scale: 0.95 }],
  },
});

export default AdminApproveItemGrid;