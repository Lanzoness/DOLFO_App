import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, ScrollView } from 'react-native';
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
});

export default FlatListGrid;
