import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZES, SHADOWS } from '../constants/theme'; 

import HomeScreen from '../screens/HomeScreen';
import WorkoutHistoryScreen from '../screens/WorkoutHistoryScreen';
import AddWorkoutScreen from '../screens/AddWorkoutScreen';
import StepCounterScreen from '../screens/StepCounterScreen';
import StopwatchScreen from '../screens/StopwatchScreen';
import BMICalculatorScreen from '../screens/BMICalculatorScreen';
import DietPlansLandingScreen from '../screens/DietPlansLandingScreen';
import FoodPlanDetailScreen from '../screens/FoodPlanDetailScreen';

const Tab = createBottomTabNavigator();
const DietStack = createStackNavigator();
const HistoryStack = createStackNavigator();

/**
 * Stack Navigator for the "Diet Plans" flow.
 * Allows navigation from the list to plan details.
 */
function DietPlansFeatureStack() { 
  return (
    <DietStack.Navigator
        screenOptions={{
            headerStyle: { backgroundColor: COLORS.primary, ...SHADOWS.light },
            headerTintColor: COLORS.white,
            headerTitleStyle: { fontWeight: 'bold' },
        }}
    >
      <DietStack.Screen name="DietPlansLanding" component={DietPlansLandingScreen} options={{ title: 'Planuri Alimentare' }} />
      <DietStack.Screen 
        name="FoodPlanDetail" 
        component={FoodPlanDetailScreen} 
        // Header title is set dynamically based on route params
        options={({ route }) => ({ title: route.params.plan.title })} 
      />
    </DietStack.Navigator>
  );
}

/**
 * Stack Navigator for the "Workout History" flow.
 * Allows navigation from the list to the add screen.
 */
function HistoryFeatureStack() {
  return (
    <HistoryStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.primary, ...SHADOWS.light },
        headerTintColor: COLORS.white,
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <HistoryStack.Screen
        name="WorkoutHistoryList"
        component={WorkoutHistoryScreen}
        options={{ title: 'Istoric Antrenamente' }}
      />
      <HistoryStack.Screen
        name="AddWorkout"
        component={AddWorkoutScreen}
        options={{ title: 'Adauga Antrenament' }}
      />
    </HistoryStack.Navigator>
  );
}


/**
 * The main app navigator (Bottom Tab Navigator).
 * Combines simple screens with nested Stacks.
 */
function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          // Logic for active/inactive icons
          if (route.name === 'Acasa') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'HistoryTab') iconName = focused ? 'list-circle' : 'list-circle-outline';
          else if (route.name === 'Pasi') iconName = focused ? 'walk' : 'walk-outline';
          else if (route.name === 'Cronometru') iconName = focused ? 'stopwatch' : 'stopwatch-outline';
          else if (route.name === 'IMC') iconName = focused ? 'calculator' : 'calculator-outline';
          else if (route.name === 'DietsTab') iconName = focused ? 'restaurant' : 'restaurant-outline';
          
          return <Ionicons name={iconName} size={focused ? size + 2 : size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textGray,
        tabBarStyle: {
            backgroundColor: COLORS.white,
            borderTopWidth: 1,
            borderTopColor: COLORS.lightGray,
            height: 65,
            paddingTop: 5,
            paddingBottom: 10,
        },
        tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '600',
        },
        
        // Global styling for Tab Headers
        headerStyle: {
            backgroundColor: COLORS.primary,
            shadowColor: COLORS.black, 
            elevation: 4, 
        },
        headerTintColor: COLORS.white, 
        headerTitleStyle: {
            fontWeight: 'bold',
        },
        
        // Hide the global Tab header for screens that are Stacks
        // (because those Stacks will define their own header)
        headerShown: !['DietsTab', 'HistoryTab'].includes(route.name),
      })}
    >
      {/* Simple screens using the global Tab header */}
      <Tab.Screen name="Acasa" component={HomeScreen} />
      <Tab.Screen name="Pasi" component={StepCounterScreen} />
      <Tab.Screen name="Cronometru" component={StopwatchScreen} />
      <Tab.Screen name="IMC" component={BMICalculatorScreen} />

      {/* Nested screens (Stacks) that use their own header */}
      <Tab.Screen
        name="HistoryTab" // Internal distinct name for the Tab route
        component={HistoryFeatureStack}
        options={{
            title: 'Istoric', // Title displayed on the bottom tab
            // headerShown: false is handled by the global screenOptions logic
        }}
      />
      <Tab.Screen
        name="DietsTab" // Internal distinct name for the Tab route
        component={DietPlansFeatureStack}
        options={{
            title: 'Planuri Diete', // Title displayed on the bottom tab
            // headerShown: false is handled by the global screenOptions logic
        }}
      />
    </Tab.Navigator>
  );
}

export default AppNavigator;