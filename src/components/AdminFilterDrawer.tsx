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
    item: {
      Image: string;
      ['Item Name']: string;
      Category: string;
      Description: string;
      'Location Found': string;
      'Date Submitted': string;
      'Owner Name': string;
      'Owner ID': string;
    };
  };
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'UserItemInformation'>;

// declaration of  useState and useRef for each variable
const FlatListGrid = () => {
  const navigation = useNavigation<NavigationProp>();
  const [data, setData] = useState([]);
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


  // Updated renderItem function to include TouchableOpacity
  const renderItem = ({ item }) => (
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
      filteredData = filteredData.filter(item => {
        const itemDate = new Date(item['Date Submitted']);
        if (filters.startDate && itemDate < filters.startDate) return false;
        if (filters.endDate && itemDate > filters.endDate) return false;
        return true;
      });
    }

    // Filter by category
    if (filters.selectedCategory) {
      filteredData = filteredData.filter(item => 
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
        keyExtractor={(item) => item.id.toString()}
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
=======
import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { DrawerLayout } from 'react-native-gesture-handler';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-picker/picker';
import UserPalette from '../constants/UserPalette';
import FontSize from '../constants/FontSize';

interface AdminFilterDrawerProps {
  onApply: (filters: {
    startDate: Date | null;
    endDate: Date | null;
    dateSortOrder: string;
    selectedStatus: string;
    statuses: {
      lost: boolean;
      retrieved: boolean;
    };
  }) => void;
  onReset: () => void;
  children: React.ReactNode;
}

export interface AdminFilterDrawerRef {
  openDrawer: () => void;
  closeDrawer: () => void;
}

const AdminFilterDrawer: React.ForwardRefRenderFunction<AdminFilterDrawerRef, AdminFilterDrawerProps> = (
  { children, onApply, onReset },
  ref
) => {
  const drawerRef = useRef<DrawerLayout>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [currentPicker, setCurrentPicker] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [dateSortOrder, setDateSortOrder] = useState('desc');
  const [statuses, setStatuses] = useState<{
    lost: boolean;
    retrieved: boolean;
  }>({
    lost: false,
    retrieved: false,
  });

  useImperativeHandle(ref, () => ({
    openDrawer: () => drawerRef.current?.openDrawer(),
    closeDrawer: () => drawerRef.current?.closeDrawer(),
  }));

  // Enables toggling the ascending/ descending button
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
    setDateSortOrder('desc');
    setStatuses({
      lost: false,
      retrieved: false
    });
    
    // Call the parent onReset callback
    onReset();
  };

  const handleApplyFilters = () => {
    try {
      console.log('Parent component received filters:', {
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString(),
        dateSortOrder,
        selectedStatus,
        statuses,
      });

      // Call the parent onApply callback with current filter values
      onApply({
        startDate,
        endDate,
        dateSortOrder,
        selectedStatus,
        statuses,
      });

      console.log('onApply has been called');
    } catch (error) {
      console.error('Error in handleApplyFilters:', error);
    }
  };

  const CustomCheckbox = ({ 
    label, 
    checked, 
    onPress 
  }: { 
    label: string; 
    checked: boolean; 
    onPress: () => void 
  }) => (
    <TouchableOpacity 
      style={styles.checkboxRow} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
  );

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
          <Text style={styles.filterLabel}>Select a categoy:</Text>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedStatus}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedStatus(itemValue)}
            mode="dialog"
            dropdownIconColor={UserPalette.secondary_blue}
          >
            <Picker.Item
              label="Select a status"
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

      {/* Status Checkboxes */}
      <View style={styles.filterSection}>
        <Text style={styles.filterLabel}>Status</Text>
        <Text style={styles.checkboxDescription}>Status:</Text>
        <View style={styles.checkboxContainer}>
          <CustomCheckbox
            label="Lost"
            checked={statuses.lost}
            onPress={() => setStatuses(prev => ({
              ...prev,
              lost: !prev.lost
            }))}
          />
          <CustomCheckbox
            label="Retrieved"
            checked={statuses.retrieved}
            onPress={() => setStatuses(prev => ({
              ...prev,
              retrieved: !prev.retrieved
            }))}
          />
        </View>
      </View>

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

AdminFilterDrawer.displayName = 'AdminFilterDrawer';

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
  checkboxContainer: {
    marginTop: 10,
    gap: 17,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    marginLeft: 4,
    borderColor: UserPalette.secondary_blue,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  checkboxChecked: {
    backgroundColor: UserPalette.secondary_blue,
  },
  checkmark: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: FontSize.body_medium,
    color: UserPalette.black_font,
  },
  checkboxDescription: {
    fontSize: FontSize.body_medium,
    color: UserPalette.black_font,
    fontWeight: 'bold',
    marginBottom: 3,
    marginTop: 4,
    paddingHorizontal: 4,
  },
});

export default forwardRef(AdminFilterDrawer);

