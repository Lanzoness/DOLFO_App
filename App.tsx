import React, { useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Image, TouchableOpacity, ViewStyle } from 'react-native';
import LoadingScreen from './src/screens/LoadingScreen';
import LoginAuth from './src/screens/LoginAuth';
import UserHomeScreen from './src/screens/UserHomeScreen';
import SubmitLost from './src/screens/SubmitLost';
import ViewLost from './src/screens/ViewLost';
import TestFirebase from './src/screens/TestFirebase';
import SignupScreen from './src/screens/SignupScreen';
import TEST_FlatlistGrid from './src/screens/TEST_FlatlistGrid'; // TEMP
import UserPalette from './src/constants/UserPalette';
import AdminHomeScreen from './src/screens/AdminHomeScreen';
import EditLost from './src/screens/EditLost';
import AdminSubmitLost from './src/screens/AdminSubmitLost';
import SearchBar from './src/components/SearchBar'; // Addded  search bar compnenet
import FilterDrawer, { FilterDrawerRef } from './src/components/FilterDrawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator();

interface Filters {
  category?: string;
  date?: string;
  // ... other filter properties
}

function App(): React.JSX.Element {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Filters>({});
  const drawerRef = useRef<FilterDrawerRef>(null);

  const applyFilters = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const resetFilters = () => {
    setFilters({});
  };

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
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
            component={ViewLost}
            options={{ headerShown: false }}
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
            options={{ headerShown: false }}
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
                  onPress={() => drawerRef.current?.openDrawer()}
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
            {() => (
              <View style={{ flex: 1 }}>
                <FilterDrawer ref={drawerRef} onApply={applyFilters} onReset={resetFilters}>
                  <TEST_FlatlistGrid />
                </FilterDrawer>
              </View>
            )}
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
    padding: 10,
  },
  filterIcon: {
    width: 27,
    height: 27,
    padding: 13,
  },
});

export default App;
