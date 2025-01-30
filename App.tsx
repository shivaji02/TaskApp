import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/Screens/HomeScreen';
import AddTimerScreen from './src/Screens/AddTimerScreen';
import HistoryScreen from './src/Screens/HistoryScreen';
import { TimerProvider } from './src/contexts/TimerContext';
const Stack = createStackNavigator();

function App() {
  return (
    <TimerProvider>
   <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#007BFF' },
          headerTintColor: '#FFF',
          headerTitleAlign: 'center',
          headerShown: false,
          }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Timers' }} />
        <Stack.Screen name="AddTimer" component={AddTimerScreen} options={{ title: 'Create Timer' }} />
        <Stack.Screen name="History" component={HistoryScreen} options={{ title: 'History' }} />
      </Stack.Navigator>
   </NavigationContainer>
   </TimerProvider>
  );
}


export default App;
