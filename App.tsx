import React, { useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Image, TouchableOpacity, ViewStyle } from 'react-native';
import LoadingScreen from './src/screens/LoadingScreen';
import LoginAuth from './src/screens/LoginAuth';
import UserHomeScreen from './src/screens/UserHomeScreen';
import SubmitLost from './src/screens/SubmitLost';
import TestFirebase from './src/screens/TestFirebase';
import SignupScreen from './src/screens/SignupScreen';
import TEST_FlatlistGrid from './src/screens/TEST_FlatlistGrid'; // user view lost screen
import UserItemInformation from './src/screens/UserItemInformation';
import UserPalette from './src/constants/UserPalette';
import AdminHomeScreen from './src/screens/AdminHomeScreen';
import EditLost from './src/screens/EditLost';
import AdminSubmitLost from './src/screens/AdminSubmitLost';
import SearchBar from './src/components/SearchBar'; // Addded  search bar compnenet
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { FilterDrawerRef } from './src/components/FilterDrawer';
import AdminSearchBar from './src/components/AdminSearchBar';
import AdminFilterDrawer, { AdminFilterDrawerRef } from './src/components/AdminFilterDrawer';
import AdminViewLost from './src/screens/AdminViewLost';
import AdminApproveItemPage from './src/screens/AdminApproveItemPage';
import AdminApproveItemGrid from './src/screens/AdminApproveItemGrid';
import AdminApproveItemDrawer, {AdminApproveItemDrawerRef} from './src/components/AdminApproveItemDrawer';


const Stack = createNativeStackNavigator();

interface Filters {
  category?: string;
  date?: string;
  status?: string; // Added for admin filtering

  // admin side filters
  startDate?: Date | null;
  endDate?: Date | null;
  dateSortOrder?: string;
  selectedStatus?: string;
  // ... other filter properties
}

function App(): React.JSX.Element {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Filters>({});
  const filterDrawerRef = useRef<FilterDrawerRef>(null);
  const adminFilterDrawerRef = useRef<AdminFilterDrawerRef>(null);
  const adminApproveDrawerRef = useRef<AdminApproveItemDrawerRef>(null);

  const handleSearch = () => {
    console.log('App.tsx - Search initiated with query:', searchQuery);
    if (filterDrawerRef.current) {
      console.log('FilterDrawerRef found, attempting search...');
      const testFlatlistGridRef = filterDrawerRef.current;
      console.log('Calling handleSearch on TEST_FlatlistGrid');
      testFlatlistGridRef.handleSearch(searchQuery);
    } else {
      console.log('FilterDrawerRef not found');
    }
  };

  const handleSearchAdmin = () => {
    console.log('App.tsx - Admin search initiated with query:', searchQuery);
    if (adminFilterDrawerRef.current) {
      console.log('AdminFilterDrawerRef found, attempting search...');
      const adminViewLostRef = adminFilterDrawerRef.current;
      console.log('Calling handleSearchAdmin on AdminViewLost');
      adminViewLostRef.handleSearchAdmin(searchQuery);
    } else {
      console.log('AdminFilterDrawerRef not found');
    }
  };

  const handleApplyFilters = () => {
    console.log('--- Applying Filters ---');
    console.log('Current filters:', filters);
    // Add logic to apply filters
    console.log('Filters applied');
  };

  const handleResetFilters = () => {
    console.log('--- Resetting Filters ---');
    setFilters({});
    console.log('Filters reset');
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoadingScreen">
          <Stack.Screen 
            name="LoadingScreen" 
            component={LoadingScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="LoginAuth" 
            component={LoginAuth}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="UserHomeScreen" 
            component={UserHomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="AdminApproveItemGrid" 
            options={{
              headerTitle: () => (
                <View style={styles.headerContainer}>
                  <AdminSearchBar
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    onSubmit={() => adminApproveDrawerRef.current?.handleSearch(searchQuery)}
                    style={styles.searchBar}
                  />
                  <TouchableOpacity
                    onPress={() => adminApproveDrawerRef.current?.openDrawer()}
                    style={styles.filterButton}
                  >
                    <Image
                      source={require('./src/assets/icons/Admin-Filter.png')}
                      style={[styles.filterIcon, { tintColor: UserPalette.blue }]}
                    />
                  </TouchableOpacity>
                </View>
              ),
              headerTintColor: UserPalette.blue,
              headerStyle: {
                backgroundColor: UserPalette.default_background,
              },
            }}
          >
            {(props) => <AdminApproveItemGrid {...props} ref={adminApproveDrawerRef} />}
          </Stack.Screen>
          <Stack.Screen 
            name="SubmitLost" 
            component={SubmitLost}
            options={{ 
              headerTitle: '',
              headerTintColor: UserPalette.green,
             }}
          />
          <Stack.Screen
            name="ViewLost"
            options={{
              headerTitle: () => (
                <View style={styles.headerContainer}>
                  <AdminSearchBar
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    onSubmit={handleSearchAdmin}
                    style={styles.searchBar}
                  />
                  <TouchableOpacity
                    onPress={() => adminFilterDrawerRef.current?.openDrawer()}
                    style={styles.filterButton}
                  >
                    <Image
                      source={require('./src/assets/icons/Admin-Filter.png')}
                      style={[styles.filterIcon, { tintColor: UserPalette.blue }]}
                    />
                  </TouchableOpacity>
                </View>
              ),
              headerTintColor: UserPalette.blue,
              headerStyle: {
                backgroundColor: UserPalette.default_background,
              },
            }}
          >
            {() => <AdminViewLost ref={adminFilterDrawerRef} />}
          </Stack.Screen>
          <Stack.Screen
            name="TestFirebase"
            component={TestFirebase}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignupScreen"
            component={SignupScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="AdminHomeScreen" 
            component={AdminHomeScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="EditLost" 
            component={EditLost}
            options={{
              headerTitle: '',
              headerTintColor: UserPalette.blue,
            }}
          />
          <Stack.Screen 
            name="AdminSubmitLost" 
            component={AdminSubmitLost}
            options={{
              headerTitle: '',
              headerTintColor: UserPalette.blue,
             }}
          />
          <Stack.Screen 
            name="AdminApproveItemPage" 
            component={AdminApproveItemPage}
            options={{ 
              headerTitle: '',
              headerTintColor: UserPalette.blue,
             }}
          />
          <Stack.Screen 
            name="UserItemInformation" 
            component={UserItemInformation}
            options={{ 
              headerTitle: '',
              headerTintColor: UserPalette.green,
             }}
          />
          <Stack.Screen
            name="TEST_FlatlistGrid"
            options={{
              headerTitle: () => (
                <View style={styles.headerContainer}>
                  <AdminSearchBar
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    onSubmit={handleSearch}
                    style={styles.searchBar}
                  />
                  <TouchableOpacity
                    onPress={() => filterDrawerRef.current?.openDrawer()}
                    style={styles.filterButton}
                  >
                    <Image
                      source={require('./src/assets/icons/filter_icon.png')}
                      style={[styles.filterIcon, { tintColor: UserPalette.green }]}
                    />
                  </TouchableOpacity>
                </View>
              ),
              headerTintColor: UserPalette.green,
              headerStyle: {
                backgroundColor: UserPalette.default_background,
              },
            }}
          >
            {() => <TEST_FlatlistGrid ref={filterDrawerRef} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
  },
  searchBar: {
    flex: 1,
    marginRight: 10,
  },
  filterButton: {
    padding: 8,
    borderRadius: 5,
  },
  filterIcon: {
    width: 24,
    height: 24,
  },
});

export default App;