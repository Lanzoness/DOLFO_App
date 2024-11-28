import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Image } from 'react-native';
import LoadingScreen from './src/screens/LoadingScreen';
import LoginAuth from './src/screens/LoginAuth';
import UserHomeScreen from './src/screens/UserHomeScreen';
import SubmitLost from './src/screens/SubmitLost';
import ViewLost from './src/screens/ViewLost';
import TestFirebase from './src/screens/TestFirebase';
import SignupScreen from './src/screens/SignupScreen';
import TEST_FlatlistGrid from './src/screens/TEST_FlatlistGrid';
import UserPalette from './src/constants/UserPalette';
import AdminHomeScreen from './src/screens/AdminHomeScreen';
import EditLost from './src/screens/EditLost';
import AdminSubmitLost from './src/screens/AdminSubmitLost';
import SearchBar from './src/components/SearchBar';
import FilterDrawerLayout from './src/components/FilterDrawerLayout';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const resetFilters = () => {
    setFilters({});
  };

  return (
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
              <SearchBar 
                value={searchQuery} 
                onChangeText={setSearchQuery} 
              />
            ),
            headerTintColor: UserPalette.green,
            headerRight: () => (
              <Button
                onPress={() => drawer.current?.openDrawer()}
                title="Filter"
                color={UserPalette.green}
              />
            ),
           }}
        >
          {() => (
            <FilterDrawerLayout onApply={applyFilters} onReset={resetFilters}>
              <TEST_FlatlistGrid filters={filters} />
            </FilterDrawerLayout>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;