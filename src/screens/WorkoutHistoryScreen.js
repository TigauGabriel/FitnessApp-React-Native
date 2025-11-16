import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

const STORAGE_KEY = '@FitnessApp:workouts'; // Unique key for AsyncStorage

// Mock data, used only on the first app run
// or if the storage is empty.
const MOCK_WORKOUTS = [
  { id: '1', date: '2025-05-20', type: 'Alergare Parc', duration: '35 min', distance: '5.2 km', details: 'Ritm constant, vreme placuta.' },
  { id: '2', date: '2025-05-21', type: 'Forta Acasa', duration: '50 min', details: 'Antrenament full body cu greutati mici.' },
  { id: '3', date: '2025-05-22', type: 'Yoga Dimineata', duration: '30 min', details: 'Sesiune de Vinyasa pentru flexibilitate.' },
];

const WorkoutHistoryScreen = ({ navigation }) => {
  const [workouts, setWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // [useEffect] Runs once on component mount
  // to load the saved data from AsyncStorage.
  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const storedWorkouts = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedWorkouts !== null) {
          setWorkouts(JSON.parse(storedWorkouts));
        } else {
          // If no saved data exists, we use the mock data
          setWorkouts(MOCK_WORKOUTS);
        }
      } catch (e) {
        console.error("Eroare la incarcarea antrenamentelor:", e);
        Alert.alert("Eroare", "Nu s-au putut incărca antrenamentele salvate.");
        setWorkouts(MOCK_WORKOUTS); // Fallback to mock data
      } finally {
        setIsLoading(false);
      }
    };

    loadWorkouts();
  }, []); // [] ensures this runs only once

  // [useEffect] Runs every time `workouts` changes
  // to save the new list to AsyncStorage.
  useEffect(() => {
    // We check !isLoading to prevent a race condition
    // where we might save an empty list back to storage before
    // the initial load has finished.
    if (!isLoading) {
      const saveWorkouts = async () => {
        try {
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));
        } catch (e) {
          console.error("Eroare la salvarea antrenamentelor:", e);
          Alert.alert("Eroare", "Nu s-a putut salva starea antrenamentelor.");
        }
      };
      saveWorkouts();
    }
  }, [workouts, isLoading]);

  // [useCallback] We memoize the function so we can pass it
  // to `navigation.setOptions` without creating a new reference on every render.
  const addWorkoutToList = useCallback((newWorkout) => {
    setWorkouts(prevWorkouts => [newWorkout, ...prevWorkouts]);
  }, []);

  // [useCallback] We memoize the delete function.
  const handleDeleteWorkout = useCallback((workoutIdToDelete) => {
    Alert.alert(
      "Confirmare Stergere",
      "Esti sigur ca vrei sa stergi acest antrenament? Actiunea este ireversibila.",
      [
        { text: "Anuleaza", style: "cancel" },
        {
          text: "Sterge",
          onPress: () => {
            setWorkouts(prevWorkouts =>
              prevWorkouts.filter(workout => workout.id !== workoutIdToDelete)
            );
          },
          style: "destructive"
        }
      ],
      { cancelable: true }
    );
  }, []);

  // [useEffect] Sets the "+" button in the navigation header.
  // Depends on `navigation` and the memoized `addWorkoutToList` function.
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('AddWorkout', { 
            // We send the callback function as a param to the add screen
            addWorkoutToListCallback: addWorkoutToList 
          })}
          style={{ marginRight: SIZES.medium }}
        >
          <Ionicons name="add-circle-outline" size={SIZES.xlarge + 5} color={COLORS.white} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, addWorkoutToList]);

  const renderItem = ({ item }) => (
    <View style={[styles.itemContainer, SHADOWS.light]}>
      <View style={styles.itemTextContent}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemDate}>{item.date}</Text>
          <Text style={styles.itemType}>{item.type}</Text>
        </View>
        <Text style={styles.itemDuration}>Durata: {item.duration}</Text>
        {item.distance && <Text style={styles.itemDetails}>Distanta: {item.distance}</Text>}
        {item.details && <Text style={styles.itemDetails}>Detalii: {item.details}</Text>}
      </View>
      <TouchableOpacity
        onPress={() => handleDeleteWorkout(item.id)}
        style={styles.deleteButtonContainer}
      >
        <Ionicons name="trash-outline" size={SIZES.large} color={COLORS.danger} />
      </TouchableOpacity>
    </View>
  );

  // Display the loading state
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Se incarca istoricul...</Text>
      </View>
    );
  }

  // Display the list or the "empty" state
  return (
    <View style={styles.container}>
      {workouts.length > 0 ? (
        <FlatList
          data={workouts}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="barbell-outline" size={SIZES.xxlarge * 2} color={COLORS.mediumGray} style={{transform: [{rotate: '-30deg'}]}} />
          <Text style={styles.emptyText}>Niciun antrenament in istoric.</Text>
          <Text style={styles.emptySubText}>Apasa pe + pentru a adauga primul tau antrenament!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  list: {
    padding: SIZES.medium,
  },
  itemContainer: {
    backgroundColor: COLORS.white,
    padding: SIZES.medium,
    borderRadius: SIZES.base,
    marginBottom: SIZES.medium,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTextContent: {
    flex: 1,
    marginRight: SIZES.small,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.base,
  },
  itemDate: {
    ...FONTS.body2,
    fontWeight: 'bold',
    color: COLORS.darkGray,
  },
  itemType: {
    ...FONTS.body2,
    color: COLORS.primary,
    fontWeight: '600',
  },
  itemDuration: {
    ...FONTS.body2,
    color: COLORS.textGray,
    marginBottom: SIZES.base / 2,
  },
  itemDetails: {
    ...FONTS.body3,
    color: COLORS.textGray,
    marginTop: SIZES.base / 2,
    fontStyle: 'italic',
  },
  deleteButtonContainer: {
    padding: SIZES.base,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
  },
  loadingText: {
    marginTop: SIZES.small,
    ...FONTS.body1,
    color: COLORS.textGray,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.large,
  },
  emptyText: {
    ...FONTS.h3,
    color: COLORS.mediumGray,
    marginTop: SIZES.medium,
    textAlign: 'center',
  },
  emptySubText: {
      ...FONTS.body2,
      color: COLORS.mediumGray,
      marginTop: SIZES.base,
      textAlign: 'center',
  }
});

export default WorkoutHistoryScreen;