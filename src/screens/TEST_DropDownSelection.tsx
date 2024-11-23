import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'; 
// Install the react-native-dropdown-select-list package to use this component


/*
    The user can also input a category that
    they want to search up.
*/

const DropdownSelection = () => {
// State management is done using the useState hook.
//  The selected state is initialized to an empty string.
//  The setSelected function is used to update the selected state.
  const [selected, setSelected] = useState('');

  const categories = [
    { key: '1', value: 'category 1' },
    { key: '2', value: 'category 2' },
    { key: '3', value: 'category 3' },
    { key: '4', value: 'category 4' },
    { key: '5', value: 'category 5' },
    { key: '6', value: 'category 6' },
  ];

  return (
    <View>
      <SelectList
        setSelected={setSelected}
        data={categories}
        placeholder="Select a category"
      />
      {/* ternary operator that picks the selected category */}
      {selected ? <Text>Selected Category: {selected}</Text> : null}
    </View>
  );
};

export default DropdownSelection;
