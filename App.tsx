import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoadingScreen from './src/screens/LoadingScreen';
import LoginUserAdmin from './src/screens/LoginUserAdmin';
import LoginAuth from './src/screens/LoginAuth';
import UserHomeScreen from './src/screens/UserHomeScreen';
import SubmitLost from './src/screens/SubmitLost';
import ViewLost from './src/screens/ViewLost';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoadingScreen">
        <Stack.Screen 
          name="LoadingScreen" 
          component={LoadingScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="LoginUserAdmin" 
          component={LoginUserAdmin}
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
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="ViewLost" 
          component={ViewLost}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;