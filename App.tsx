import React from 'react';
import { BottomFabBar } from 'rn-wave-bottom-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { Recipes } from './src/screens/recipes/recipes';
import { Shopping } from './src/screens/shopping/shopping';
import { StatusBar } from 'expo-status-bar';
import { store } from './src/data/store';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const tabBarIcon =
  (name: string) =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ focused, color, size }: { focused: boolean; color: string; size: number }) =>
    <Icon name={name} size={28} color={focused ? 'white' : 'white'} />;

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <StatusBar style='dark' />
          <Tab.Navigator
            screenOptions={{
              tabBarActiveTintColor: '#5F0B65',
              tabBarInactiveTintColor: 'white',
              tabBarActiveBackgroundColor: '#5F0B65',
              tabBarInactiveBackgroundColor: 'red',
              tabBarLabelStyle: {
                color: 'purple'
              }
            }}
            tabBar={(props) => (
              <BottomFabBar
                mode={'default'}
                isRtl={false}
                // Add Shadow for active tab bar button
                focusedButtonStyle={{
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: -1
                  },
                  shadowOpacity: 0.61,
                  shadowRadius: 8,
                  elevation: 14
                }}
                bottomBarContainerStyle={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0
                }}
                springConfig={{
                  stiffness: 1500,
                  damping: 85,
                  mass: 4,
                  useNativeDriver: false
                }}
                {...props}
              />
            )}
          >
            <Tab.Screen
              name='Recipes'
              options={{
                tabBarIcon: tabBarIcon('chef-hat'),
                headerShown: false
              }}
              component={Recipes}
            />
            <Tab.Screen
              name='Shopping'
              options={{
                tabBarIcon: tabBarIcon('cart')
              }}
              component={Shopping}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
