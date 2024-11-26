import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, ScrollView, TouchableOpacity, DrawerLayoutAndroid } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import UserPalette from '../../constants/UserPalette';
import FontSize from '../../constants/FontSize';

// data contains the array of items displayed
const data = [
  { image: require('../../assets/missingItems/hydroflask.png'),
    name: 'Hydroflask',
    category: 'Bottles',
    date: 'April 1, 2024',
  },
  {
    image: require('../../assets/missingItems/casio_watch.png'),
    name: 'Casio Watch',
    category: 'Wearables',
    date: 'April 21, 2024',
  },
  {
    image: require('../../assets/missingItems/Iphone.png'),
    name: 'Iphone',
    category: 'Electronics',
    date: 'September 12, 2024',
  },
  {
    image: require('../../assets/missingItems/Aquaflask.png'),
    name: 'Aquaflask',
    category: 'Bottles',
    date: 'September 29, 2024',
  },
  {
    image: require('../../assets/missingItems/JBL_Headset.png'),
    name: 'JBL Headset',
    category: 'Electronics',
    date: 'October 17, 2024',
  },
  {
    image: require('../../assets/missingItems/pencil_case.png'),
    name: 'Pencil Case',
    category: 'Stationery',
    date: 'October 19, 2024',
  },
  {
    image: require('../../assets/missingItems/shades.png'),
    name: 'Shades',
    category: 'Accessories',
    date: 'October 21, 2024',
  },
  {
    image: require('../../assets/missingItems/wallet.png'),
    name: 'Wallet',
    category: 'Others',
    date: 'October 22, 2024',
  },
];

const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === 'descending' ? 'ascending' : 'descending'));
};

const handleDateConfirm = (date, type) => {
    setDateRange((prev) => ({ ...prev, [type]: date }));
    setDatePickerVisible(false);
  };


// Side drawer to filter content
const renderDrawerContent = () => (
    <View style={styles.drawerContent}>
        <Text style={styles.drawerLabel}>Select Filters</Text>
      <View style={styles.filterSection}>
        <Text style={styles.filterTitle}>Enter Date Range</Text>
        <View style={styles.dateRangeContainer}>
          <TouchableOpacity onPress={() => setDatePickerVisible('from')}>
            <Text style={styles.dateInput}>{dateRange.from || 'From'}</Text>
          </TouchableOpacity>
          <Text>to</Text>
          <TouchableOpacity onPress={() => setDatePickerVisible('to')}>
            <Text style={styles.dateInput}>{dateRange.to || 'To'}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={toggleSortOrder} style={styles.sortButton}>
          <Text style={styles.sortButtonText}>
            {sortOrder === 'descending' ? 'Descending ↓' : 'Ascending ↑'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterSection}>
        <Text style={styles.filterTitle}>Category</Text>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(value) => setSelectedCategory(value)}
          style={styles.picker}
        >
          <Picker.Item label="Category 1" value="category1" />
          <Picker.Item label="Category 2" value="category2" />
          <Picker.Item label="Category 3" value="category3" />
          <Picker.Item label="Category 4" value="category4" />
          <Picker.Item label="Category 5" value="category5" />
        </Picker>
      </View>
    </View>
)

// renderItem returns the JSX for each item in the grid
const renderItem = ({ item }) => (
  <View style={styles.itemContainer}>
    <Image source={item.image} style={styles.itemImage} />
    <Text style={styles.itemName}>{item.name}</Text>
    <Text style={styles.itemCategory}>Category: {item.category}</Text>
    <Text style={styles.itemDate}>Date: {item.date}</Text>
  </View>
);


/**
 * Displays the list of items in a grid
 * @returns {React.JSX.Element} The JSX for the FlatListGrid component
 */
const FlatListGrid = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={styles.grid}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  grid: {
    paddingHorizontal: 10,
    backgroundColor: UserPalette.green,
  },
  itemContainer: {
    flex: 1,
    margin: 10,
    backgroundColor: UserPalette.default_background,
    borderRadius: 7,
    borderTopStartRadius: 0,
    borderTopEndRadius: 0,
    padding: 7,
    alignItems: 'center',
  },
  itemImage: {
    width: '100%', 
    height: Dimensions.get('window').width / 2 - 40, 
    resizeMode: 'cover', 
    borderRadius: 0,
  },
  itemName: {
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: FontSize.body_small,
    color: UserPalette.black_font,
  },
  itemCategory: {
    textAlign: 'left', 
    alignSelf: 'flex-start', 
    lineHeight: 20,
    marginTop: 3,
    color: UserPalette.black_font,
    fontSize: FontSize.body_smallest,
  },
  itemDate: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    color: UserPalette.black_font,
    fontSize: FontSize.body_smallest,
  },
  addFilterButton: {
    backgroundColor: UserPalette.green,
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    margin: 10,
  },
  addFilterButtonText: {
    backgroundColor: UserPalette.green,,
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    margin: 10,
  },
  drawerContent: {
    fontSize: 20, 
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  filterSection: {
    marginBottom: 20,
  },
    filterTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
   dateRangeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
   },
   dateInput: {
    borderBottomWidth: 1,
    padding: 5,
    width: '40%',
   },
   sortButton: {
    backgroundColor: UserPalette.green,
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    margin: 10,
   }, 
   sortButtonText: {
    color: UserPalette.default_background,
    textAlign: 'center',
   },
   picker: {
    height: 40,
   }
});

export default FlatListGrid;
