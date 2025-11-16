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
 * Stack Navigator pentru fluxul de "Planuri Alimentare".
 * Permite navigarea de la lista la detaliul unui plan.
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
        // Titlul header-ului este setat dinamic pe baza parametrului trimis in ruta
        options={({ route }) => ({ title: route.params.plan.title })} 
      />
    </DietStack.Navigator>
  );
}

/**
 * Stack Navigator pentru fluxul de "Istoric Antrenamente".
 * Permite navigarea de la lista la ecranul de adaugare.
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
 * Navigatorul principal (Bottom Tab Navigator).
 * Combina ecrane simple cu Stack-uri "nested".
 */
function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          // Logica pentru iconite active/inactive
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
        
        // Stilizare globala pentru Header-ul Tab-urilor
        headerStyle: {
            backgroundColor: COLORS.primary,
            shadowColor: COLORS.black, 
            elevation: 4, 
        },
        headerTintColor: COLORS.white, 
        headerTitleStyle: {
            fontWeight: 'bold',
        },
        
        // Ascunde header-ul global al Tab-ului pentru ecranele care sunt Stack-uri
        // (deoarece acele Stack-uri isi vor defini propriul header)
        headerShown: !['DietsTab', 'HistoryTab'].includes(route.name),
      })}
    >
      {/* Ecrane simple care folosesc header-ul global al Tab-ului */}
      <Tab.Screen name="Acasa" component={HomeScreen} />
      <Tab.Screen name="Pasi" component={StepCounterScreen} />
      <Tab.Screen name="Cronometru" component={StopwatchScreen} />
      <Tab.Screen name="IMC" component={BMICalculatorScreen} />

      {/* Ecrane "nested" (Stack-uri) care isi folosesc propriul header */}
      <Tab.Screen
        name="HistoryTab" // Nume intern distinct pentru ruta Tab
        component={HistoryFeatureStack}
        options={{
            title: 'Istoric', // Titlul afisat pe tab-ul din bara de jos
            // headerShown: false este gestionat de logica globala din screenOptions
        }}
      />
      <Tab.Screen
        name="DietsTab" // Nume intern distinct pentru ruta Tab
        component={DietPlansFeatureStack}
        options={{
            title: 'Planuri Diete', // Titlul afisat pe tab-ul din bara de jos
            // headerShown: false este gestionat de logica globala din screenOptions
        }}
      />
    </Tab.Navigator>
  );
}

export default AppNavigator;