import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, ScrollView } from 'react-native';
import UserPalette from '../constants/UserPalette';
import FontSize from '../constants/FontSize';
import { readLostItems } from '../test/readLostItemsjson';

const FlatListGrid = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await readLostItems();
        console.log("Fetched data:", result);
        setData(result);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => {
    console.log("Rendering item:", item);
    return (
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.Image }} style={styles.itemImage} />
        <Text style={styles.itemName}>{item['Item Name']}</Text>
        <Text style={styles.itemCategory}>Category: {item.Category}</Text>
        <Text style={styles.itemDate}>Date: {item['Date Submitted']}</Text>
      </View>
    );
  };

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
