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
            headerStyle: { backgroundColor: 'teal' },
            headerTintColor: '#FFF',
            headerTitleAlign: 'center',
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddTimer"
            component={AddTimerScreen}
            options={{ title: 'Create Timer' }}
          />
          <Stack.Screen
            name="History"
            component={HistoryScreen}
            options={{ title: 'Completed Timers' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TimerProvider>
  );
}

export default App;