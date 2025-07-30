import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { View } from 'react-native';
import theme from '../utils/theme';

// Import screens (we'll create these next)
import HomeScreen from '../screens/HomeScreen';
import MatchScreen from '../screens/MatchScreen';
import CoinsScreen from '../screens/CoinsScreen';
import MessagesScreen from '../screens/MessagesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import VideoCallScreen from '../screens/VideoCallScreen';
import AuthScreen from '../screens/AuthScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabBarIcon = ({ name, color, size }: { name: string; color: string; size: number }) => (
  <Ionicons name={name as any} size={size} color={color} />
);

const TabBarBackground = () => (
  <LinearGradient
    colors={[theme.colors.backgroundSecondary, theme.colors.background]}
    style={{ flex: 1 }}
    start={{ x: 0, y: 0 }}
    end={{ x: 0, y: 1 }}
  />
);

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Match':
              iconName = focused ? 'videocam' : 'videocam-outline';
              break;
            case 'Coins':
              iconName = focused ? 'logo-bitcoin' : 'logo-bitcoin';
              break;
            case 'Messages':
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'circle';
          }

          return <TabBarIcon name={iconName} color={color} size={size} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.backgroundSecondary,
          borderTopWidth: 0,
          height: theme.layout.tabBarHeight,
          paddingBottom: 8,
          paddingTop: 8,
          ...theme.shadows.large,
        },
        tabBarBackground: TabBarBackground,
        tabBarLabelStyle: {
          fontSize: theme.typography.fontSize.xs,
          fontWeight: theme.typography.fontWeight.medium as any,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen 
        name="Match" 
        component={MatchScreen}
        options={{
          tabBarLabel: 'Match',
        }}
      />
      <Tab.Screen 
        name="Coins" 
        component={CoinsScreen}
        options={{
          tabBarLabel: 'Coins',
        }}
      />
      <Tab.Screen 
        name="Messages" 
        component={MessagesScreen}
        options={{
          tabBarLabel: 'Messages',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: theme.colors.background },
        }}
      >
        <Stack.Screen 
          name="Auth" 
          component={AuthScreen}
          options={{
            animationTypeForReplace: 'push',
          }}
        />
        <Stack.Screen 
          name="Onboarding" 
          component={OnboardingScreen}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen 
          name="MainTabs" 
          component={MainTabNavigator}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen 
          name="VideoCall" 
          component={VideoCallScreen}
          options={{
            presentation: 'modal',
            gestureEnabled: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;