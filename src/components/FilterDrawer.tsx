// src/components/FilterDrawer.tsx
import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { DrawerLayout } from 'react-native-gesture-handler';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-picker/picker';
import UserPalette from '../constants/UserPalette';
import FontSize from '../constants/FontSize';

interface FilterDrawerProps {
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

export interface FilterDrawerRef {
  openDrawer: () => void;
  closeDrawer: () => void;
}

const FilterDrawer: React.ForwardRefRenderFunction<FilterDrawerRef, FilterDrawerProps> = (
  { children, onApply, onReset },
  ref
) => {
  const drawerRef = useRef<DrawerLayout>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [currentPicker, setCurrentPicker] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [dateSortOrder, setDateSortOrder] = useState('desc'); // 'asc' or 'desc'
  const [categorySortOrder, setCategorySortOrder] = useState('desc');

  // Sets the props of the drawer component: closer/ opened drawer
  useImperativeHandle(ref, () => ({
    openDrawer: () => drawerRef.current?.openDrawer(),
    closeDrawer: () => drawerRef.current?.closeDrawer(),
  }));

  // Enables toggling the ascending/ descending button
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

  // Updated handleReset function - removed drawer close
  const handleReset = () => {
    // Clear all states
    setStartDate(null);
    setEndDate(null);
    setSelectedCategory('');
    setDateSortOrder('desc');
    setCategorySortOrder('desc');
    
    // Call the parent onReset callback
    onReset();
  };

  // Updated handleApplyFilters function - removed drawer close
  const handleApplyFilters = () => {
    // Call the parent onApply callback with current filter values
    onApply({
      startDate,
      endDate,
      dateSortOrder,
      selectedCategory,
      categorySortOrder,
    });
  };

  const renderNavigationView = () => (
    <View style={styles.drawer}>
      <Text style={styles.title}>Add Filter</Text>

      {/* Date Range */}
      <View style={styles.filterSection}>
        <View style={styles.filterHeaderRow}>
          <Text style={styles.filterLabel}>Enter Date Range:</Text>
          <TouchableOpacity onPress={() => toggleSortOrder('date')}>
            <Text style={styles.sortButtonText}>
              {dateSortOrder === 'desc' ? 'Descending ↓' : 'Ascending ↑'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.dateInputContainer}>
          <TouchableOpacity onPress={() => openDatePicker('start')}>
            <TextInput
              style={styles.dateInput}
              placeholder="Start Date"
              value={startDate ? startDate.toLocaleDateString() : ''}
              editable={false}
            />
          </TouchableOpacity>
          <Text style={styles.toText}>to</Text>
          <TouchableOpacity onPress={() => openDatePicker('end')}>
            <TextInput
              style={styles.dateInput}
              placeholder="End Date"
              value={endDate ? endDate.toLocaleDateString() : ''}
              editable={false}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Category start */}
      <View style={styles.filterSection}>
        <View style={styles.filterHeaderRow}>
          <Text style={styles.filterLabel}>Category:</Text>
          <TouchableOpacity onPress={() => toggleSortOrder('category')}>
            <Text style={styles.sortButtonText}>
              {categorySortOrder === 'desc' ? 'Descending ↓' : 'Ascending ↑'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedCategory}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            mode="dialog"
            dropdownIconColor={UserPalette.secondary_blue}
          >
            <Picker.Item
              label="Select a category"
              value=""
              style={styles.pickerPlaceholder}
              color={UserPalette.secondary_blue}
            />
            <Picker.Item
              label="Category 1"
              value="category1"
              style={styles.pickerItem}
              color={UserPalette.black_font}
            />
            <Picker.Item
              label="Category 2"
              value="category2"
              style={styles.pickerItem}
              color={UserPalette.black_font}
            />
            <Picker.Item
              label="Category 3"
              value="category3"
              style={styles.pickerItem}
              color={UserPalette.black_font}
            />
            <Picker.Item
              label="Category 4"
              value="category4"
              style={styles.pickerItem}
              color={UserPalette.black_font}
            />
            <Picker.Item
              label="Category 5"
              value="category5"
              style={styles.pickerItem}
              color={UserPalette.black_font}
            />
          </Picker>
        </View>
      </View>

      {/* Updated Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleReset}
        >
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.doneButton}
          onPress={handleApplyFilters}
        >
          <Text style={styles.doneButtonText}>Done</Text>
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
      ref={drawerRef}
      drawerWidth={320}
      drawerPosition="right"
      renderNavigationView={renderNavigationView}
    >
      <View style={{ flex: 1 }}>
        {children}
      </View>
    </DrawerLayout>
  );
};

FilterDrawer.displayName = 'FilterDrawer';

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    textAlign: 'center',
    marginBottom: 25,
    paddingTop: 10,
    paddingBottom: 2,
    borderBottomWidth: 1,
    fontWeight: 'bold',
    fontSize: 20,
    color: 'rgba(0, 105, 62, 0.8)',
    borderBottomColor: 'rgba(0, 105, 62, 0.4)',
  },
  filterSection: {
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  filterHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3,
  },
  filterLabel: {
    marginBottom: 3,
    fontWeight: 'bold',
    fontSize: FontSize.body_medium,
    flex: 1,
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  dateInput: {
    borderWidth: 1,
    borderColor: UserPalette.textbox_border_color,
    borderRadius: 5,
    padding: 8,
    width: 110,
  },
  toText: {
    marginHorizontal: 8,
  },
  sortButtonText: {
    fontSize: FontSize.body_medium,
    color: UserPalette.secondary_blue,
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 8,
    overflow: 'hidden',
    borderColor: UserPalette.textbox_border_color,
    backgroundColor: 'white',
  },
  picker: {
    width: '100%',
    color: 'black',
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  pickerPlaceholder: {
    fontSize: FontSize.body_medium,
    color: UserPalette.secondary_blue,
    backgroundColor: 'white',
  },
  pickerItem: {
    fontSize: FontSize.body_small,
    backgroundColor: 'white',
  },
  selectedItem: {
    fontWeight: 'bold',
    borderLeftWidth: 3,
    borderLeftColor: UserPalette.secondary_blue,
    paddingLeft: 10,  // Add some padding to offset the border
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
    gap: 25,
  },
  resetButton: {
    padding: 10,
    backgroundColor: UserPalette.red_button,
    width: '25%',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneButton: {
    padding: 10,
    backgroundColor: UserPalette.secondary_green,
    width: '45%',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  resetButtonText: {
    color: UserPalette.white_font,
    textAlign: 'center',
  },
  doneButtonText: {
    color: UserPalette.white_font,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pickerPressedState: {
    backgroundColor: 'rgba(0, 122, 255, 0.2)', // Slightly darker when pressed
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: FontSize.body_small,
    color: UserPalette.black_font,
    marginBottom: 5,
  },
  inputField: {
    backgroundColor: UserPalette.light_blue,
    borderWidth: 1,
    borderColor: UserPalette.grey_font,
    borderRadius: 8,
    padding: 10,
    fontSize: FontSize.body_small,
    color: UserPalette.black_font,
  },
  rangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  rangeInput: {
    backgroundColor:  UserPalette.light_blue,
    borderWidth: 1,
    borderColor: UserPalette.grey_font,
    borderRadius: 8,
    padding: 10,
    width: '45%',
    fontSize: FontSize.body_small,
  },
  rangeSeparator: {
    fontSize: FontSize.body_small,
    color: UserPalette.black_font,
  },
});

export default forwardRef(FilterDrawer);
