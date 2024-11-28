import React from 'react';
import { TextInput, StyleSheet, View, Image } from 'react-native';
import UserPalette from '../constants/UserPalette';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/icons/SearchBar_Icon.png')} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1.5,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginLeft: -8,
},
  icon: {
    width: 15,
    height:15,
    marginRight: 5,
  },
  input: {
    flex: 1,
    color: UserPalette.black_font,
    height: 40,
  },
});

export default SearchBar;