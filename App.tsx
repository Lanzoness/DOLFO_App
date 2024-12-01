import React, { useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Image, TouchableOpacity, ViewStyle } from 'react-native';
import LoadingScreen from './src/screens/LoadingScreen';
import LoginAuth from './src/screens/LoginAuth';
import UserHomeScreen from './src/screens/UserHomeScreen';
import SubmitLost from './src/screens/SubmitLost';
import ViewLost from './src/screens/ViewLost'; // Admin view lost screen
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

  const handleSearch = () => {
    console.log('App.tsx - Search initiated with query:', searchQuery);
    if (filterDrawerRef.current) {
      console.log('FilterDrawerRef found, attempting search...');
      // Call handleSearch directly on TEST_FlatlistGrid
      const testFlatlistGridRef = filterDrawerRef.current;
      if (testFlatlistGridRef.handleSearch) {
        console.log('Calling handleSearch on TEST_FlatlistGrid');
        testFlatlistGridRef.handleSearch(searchQuery);
      } else {
        console.log('handleSearch not found on TEST_FlatlistGrid');
      }
    } else {
      console.log('FilterDrawerRef not found');
    }
  };

  const handleSearchAdmin = () => {
    console.log('App.tsx - Search initiated with query:', searchQuery);
    if (adminFilterDrawerRef.current) {
      console.log('AdminFilterDrawerRef found, attempting search...');
      // Call handleSearchAdmin directly on AdminViewLost
      const adminViewLostRef = adminFilterDrawerRef.current;
      if (adminViewLostRef.handleSearchAdmin) {
        console.log('Calling handleSearchAdmin on AdminViewLost');
        adminViewLostRef.handleSearchAdmin(searchQuery);
      } else {
        console.log('handleSearchAdmin not found on AdminViewLost');
      }
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
                    onPress={() => {
                      if (adminFilterDrawerRef.current) {
                        adminFilterDrawerRef.current.openDrawer();
                      }
                    }}
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
            }}
            children={(props) => <ViewLost {...props} ref={adminFilterDrawerRef} />}
          />
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
            options={{ headerShown: false }}
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
                  <SearchBar
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    onSubmit={handleSearch}
                    style={styles.searchBar}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      console.log('Opening filter drawer');
                      filterDrawerRef.current?.openDrawer();
                    }}
                    style={styles.filterButton}
                  >
                    <Image
                      source={require('./src/assets/icons/filter_icon.png')}
                      style={styles.filterIcon}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '25%',
    paddingRight: '5%',
    width: '100%',
  },
  searchBar: {
    flex: 1,
    marginRight: 10,
    width: '70%',
  },
  filterButton: {
    padding: 8,
    borderRadius: 5,
    marginLeft: 10,
  },
  filterIcon: {
    width: 24,
    height: 24,
    tintColor: UserPalette.green,
  },
});

export default App;