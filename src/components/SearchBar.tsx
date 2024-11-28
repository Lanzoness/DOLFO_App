import React from 'react';
import { TextInput, StyleSheet, View, Image, ViewStyle, TouchableOpacity } from 'react-native';
import UserPalette from '../constants/UserPalette';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit?: () => void;
  style?: ViewStyle;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText, onSubmit, style }) => {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={onSubmit}>
        <Image source={require('../assets/icons/SearchBar_Icon.png')} style={styles.icon} />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        returnKeyType="search"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: UserPalette.black_font,
    backgroundColor: UserPalette.light_blue,
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginLeft: -70,
    width: 300,
    flex: 1,
  },
  icon: {
    width: 16,
    height:15,
    marginRight: 5,
  },
  input: {
    flex: 1,
    color: UserPalette.black_font,
    height: 35, // 30 is the min width of the search bar
  },
});

export default SearchBar;
