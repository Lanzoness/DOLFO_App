import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import Picker from 'react-native-picker-select'; // For dropdown
import DateTimePicker from 'react-native-modal-datetime-picker';
import DrawerLayout from 'react-native-drawer-layout';
import UserPalette from '../constants/UserPalette';

interface FilterDrawerLayoutProps {
  onApply: (filters: {
    startDate: Date | null;
    endDate: Date | null;
    dateSortOrder: string;
    selectedCategory: string;
    categorySortOrder: string;
  }) => void;
  onReset: () => void;
  children: React.ReactNode;
}

const FilterDrawerLayout: React.FC<FilterDrawerLayoutProps> = ({ onApply, onReset, children }) => {
  const drawer = useRef<DrawerLayout>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [currentPicker, setCurrentPicker] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [dateSortOrder, setDateSortOrder] = useState('desc'); // 'asc' or 'desc'
  const [categorySortOrder, setCategorySortOrder] = useState('desc');

  const toggleSortOrder = (type: 'date' | 'category') => {
    if (type === 'date') {
      setDateSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setCategorySortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    }
  };

  const openDatePicker = (pickerType: 'start' | 'end') => {
    setCurrentPicker(pickerType);
    setDatePickerVisibility(true);
  };

  const handleDateConfirm = (date: Date) => {
    if (currentPicker === 'start') setStartDate(date);
    if (currentPicker === 'end') setEndDate(date);
    setDatePickerVisibility(false);
  };

  const renderNavigationView = () => (
    <View style={styles.drawer}>
      <Text style={styles.title}>Add Filter</Text>

      {/* Date Range */}
      <View style={styles.filterRow}>
        <Text>Enter Date Range</Text>
        <TouchableOpacity onPress={() => openDatePicker('start')}>
          <TextInput
            style={styles.dateInput}
            placeholder="Start Date"
            value={startDate ? startDate.toLocaleDateString() : ''}
            editable={false}
          />
        </TouchableOpacity>
        <Text>to</Text>
        <TouchableOpacity onPress={() => openDatePicker('end')}>
          <TextInput
            style={styles.dateInput}
            placeholder="End Date"
            value={endDate ? endDate.toLocaleDateString() : ''}
            editable={false}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleSortOrder('date')}>
        <Text style={styles.sortButtonText}>
            {dateSortOrder === 'descending' ? 'Descending ↓' : 'Ascending ↑'}
        </Text>
        </TouchableOpacity>
      </View>

      {/* Category */}
      <View style={styles.filterRow}>
        <Text>Category</Text>
        <Picker
          selectedValue={selectedCategory}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        >
          <Picker.Item label="Category 1" value="category1" />
          <Picker.Item label="Category 2" value="category2" />
          <Picker.Item label="Category 3" value="category3" />
          <Picker.Item label="Category 4" value="category4" />
          <Picker.Item label="Category 5" value="category5" />
        </Picker>
        <TouchableOpacity onPress={() => toggleSortOrder('category')}>
        <Text style={styles.sortButtonText}>
            {categorySortOrder === 'descending' ? 'Descending ↓' : 'Ascending ↑'}
        </Text>
        </TouchableOpacity>
      </View>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.resetButton} onPress={onReset}>
          <Text>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.doneButton}
          onPress={() =>
            onApply({
              startDate,
              endDate,
              dateSortOrder,
              selectedCategory,
              categorySortOrder,
            })
          }
        >
          <Text>Done</Text>
        </TouchableOpacity>
      </View>

      <DateTimePicker
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />
    </View>
  );

  return (
    <DrawerLayout
      ref={drawer}
      drawerWidth={300}
      drawerPosition="right"
      renderNavigationView={renderNavigationView}
    >
      {children}
    </DrawerLayout>
  );
};

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginHorizontal: 5,
    width: 100,
  },
  picker: {
    flex: 1,
    height: 40,
  },
  sortIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  resetButton: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
  },
  doneButton: {
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  sortButtonText: {
    color: UserPalette.green,
    textAlign: 'center'
  },
});

export default FilterDrawerLayout;
