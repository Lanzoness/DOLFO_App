import React, { useState, useRef, useEffect } from 'react';
import { Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import UserPalette from '../constants/UserPalette';
import FontSize from '../constants/FontSize';
import { readLostItems } from '../test/readLostItemsjson';
import FilterDrawer, { FilterDrawerRef } from '../components/FilterDrawer';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

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
  id: string;
}

// declaration of  useState and useRef for each variable
const FlatListGrid = () => {
  const navigation = useNavigation<NavigationProp>();
  const [data, setData] = useState<Item[]>([]);
  // const [alphabeticalOrder, setAlphabeticalOrder] = useState('descending');
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
  // const toggleAlphabetical = () => {
  //   setAlphabeticalOrder((prev) => (prev === 'descending' ? 'ascending' : 'descending'));
  //   setData((prevData) =>
  //     [...prevData].sort((a, b) =>
  //       alphabeticalOrder === 'ascending'
  //         ? a['Item Name'].localeCompare(b['Item Name'])
  //         : b['Item Name'].localeCompare(a['Item Name'])
  //     )
  //   );
  // };

  // Updated renderItem function to include TouchableOpacity
  const renderItem = ({ item }: { item: Item }) => (
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
  }) => {
    console.log('Applied Filters:', {
      startDate: filters.startDate?.toISOString(),
      endDate: filters.endDate?.toISOString(),
      dateSortOrder: filters.dateSortOrder,
      selectedCategory: filters.selectedCategory,
    });

    let filteredData = [...data];

    // Filter by date range
    if (filters.startDate || filters.endDate) {
      console.log('Filtering by date range...');
      filteredData = filteredData.filter(item => {
        const itemDate = new Date(item['Date Submitted']);
        if (filters.startDate && itemDate < filters.startDate) return false;
        if (filters.endDate && itemDate > filters.endDate) return false;
        return true;
      });
    }

    // Filter by category
    if (filters.selectedCategory) {
      console.log(`Filtering by category ${filters.selectedCategory}`);
      filteredData = filteredData.filter((item: Item) => 
        item.Category === filters.selectedCategory
      );
    }

    // Sort by date only
    if (filters.dateSortOrder) {
      filteredData.sort((a, b) => {
        const dateA = new Date(a['Date Submitted']);
        const dateB = new Date(b['Date Submitted']);
        return filters.dateSortOrder === 'asc' 
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      });
    }

    setData(filteredData);
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
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.flatListContainer}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          paddingHorizontal: 4,
        }}
      />
    </FilterDrawer>
  );
};


const styles = StyleSheet.create({
  flatListContainer: {
    paddingVertical: 8,
    backgroundColor: UserPalette.green,
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
    // numberOfLines: 2,
    // ellipsizeMode: 'tail',
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
