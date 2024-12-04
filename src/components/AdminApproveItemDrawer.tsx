import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Animated } from 'react-native';
import { DrawerLayout } from 'react-native-gesture-handler';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-picker/picker';
import UserPalette from '../constants/UserPalette';
import FontSize from '../constants/FontSize';

// Filter drawer for Admin Approve Items Flatlist Grid
// ⚠️ Did not remove checkbox functionality
interface AdminApproveItemDrawerProps {
  onApply: (filters: {
    startDate: Date | null;
    endDate: Date | null;
    dateSortOrder: string;
    selectedStatus: string;
    selectedCategory: string;
    statuses: number;
  }) => void;
  onReset: () => void;
  onSearch: (query: string) => void;
  children: React.ReactNode;
}

export interface AdminApproveItemDrawerRef {
  openDrawer: () => void;
  closeDrawer: () => void;
  getChildRef: () => any;
  handleSearch: (query: string) => void;
  handleSearchAdmin: (query: string) => void;
  drawerVisible: boolean;
  drawerAnimation: Animated.Value;
}

 // Did NOT remove checkbox functionality to prevent errors
const AdminApproveItemDrawer: React.ForwardRefRenderFunction<AdminApproveItemDrawerRef, AdminApproveItemDrawerProps> = (
  { children, onApply, onReset, onSearch },
  ref
) => {
  const drawerRef = useRef<DrawerLayout>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [currentPicker, setCurrentPicker] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [dateSortOrder, setDateSortOrder] = useState('desc');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const drawerAnimation = useRef(new Animated.Value(0)).current;
  const [selectedCategory, setSelectedCategory] = useState('');

  useImperativeHandle(ref, () => ({
    openDrawer: () => {
      setDrawerVisible(true);
      drawerRef.current?.openDrawer();
    },
    closeDrawer: () => {
      setDrawerVisible(false);
      drawerRef.current?.closeDrawer();
    },
    getChildRef: () => drawerRef.current,
    handleSearch: (query: string) => {
      onSearch(query);
    },
    handleSearchAdmin: (query: string) => {
      onSearch(query);
    },
    drawerVisible,
    drawerAnimation,
  }));

  // Toggle ascending/ descending
  const toggleSortOrder = (type: 'date' | 'category') => {
    if (type === 'date') {
      setDateSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
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

  const handleReset = () => {
    // Clear all states
    setStartDate(null);
    setEndDate(null);
    setSelectedStatus('');
    setSelectedCategory('');
    setDateSortOrder('desc');
    
    // Call the parent onReset callback
    onReset();
  };


  const handleApplyFilters = () => {
    try {
      console.log('Applying filters with values:', {
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString(),
        dateSortOrder,
        selectedStatus,
      });

      onApply({
        startDate,
        endDate,
        dateSortOrder,
        selectedStatus,
        selectedCategory,
        statuses: !selectedStatus ? -1 : parseInt(selectedStatus)
      });
    } catch (error) {
      console.error('Error in handleApplyFilters:', error);
    }
  };

  // Removed rendred checkbox under categories

  const renderNavigationView = () => (
    <View style={styles.drawer}>
      <Text style={styles.title}>Add Filter</Text>

  
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

      {/* Status/Category Picker */}
      <View style={styles.filterSection}>
        <View style={styles.filterHeaderRow}>
          <Text style={styles.filterLabel}>Select a category:</Text>
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
              value="1"
              style={styles.pickerItem}
              color={UserPalette.black_font}
            />
            <Picker.Item
              label="Category 2"
              value="2"
              style={styles.pickerItem}
              color={UserPalette.black_font}
            />
            <Picker.Item
              label="Category 3"
              value="3"
              style={styles.pickerItem}
              color={UserPalette.black_font}
            />
            <Picker.Item
              label="Category 4"
              value="4"
              style={styles.pickerItem}
              color={UserPalette.black_font}
            />
            <Picker.Item
              label="Category 5"
              value="5"
              style={styles.pickerItem}
              color={UserPalette.black_font}
            />
          </Picker>
        </View>
      </View>

      {/* removed checkbox status from this part */}

      {/* Buttons */}
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
          <Text style={styles.doneButtonText}>Apply</Text>
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

AdminApproveItemDrawer.displayName = 'AdminApproveItemDrawer';

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
    color: UserPalette.secondary_blue,
    borderBottomColor:'rgba(30, 115, 190, 0.4)',
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
    paddingLeft: 10,
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
    backgroundColor: UserPalette.secondary_blue,
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
    backgroundColor: 'rgba(0, 122, 255, 0.2)',
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
    backgroundColor: UserPalette.light_blue,
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
// removed checkbox styles
});

export default forwardRef(AdminApproveItemDrawer);

