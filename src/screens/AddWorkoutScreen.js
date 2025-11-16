import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';

const AddWorkoutScreen = ({ navigation, route }) => {
  // Pre-umple data cu ziua curenta in format YYYY-MM-DD
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [type, setType] = useState('');
  const [duration, setDuration] = useState('');
  const [details, setDetails] = useState('');

  const handleAddWorkout = () => {
    if (!type.trim() || !duration.trim() || !date.trim()) {
      Alert.alert('Date Incomplete', 'Te rog completeaza data, tipul si durata antrenamentului.');
      return;
    }

    const newWorkout = {
      id: Date.now().toString(), // ID unic simplu, bazat pe timestamp
      date,
      type,
      duration,
      details,
    };

    // Folosim un callback din route.params pentru a trimite datele inapoi
    // la ecranul anterior (WorkoutHistoryScreen) fara a folosi state management
    if (route.params?.addWorkoutToListCallback) {
      route.params.addWorkoutToListCallback(newWorkout);
      navigation.goBack(); 
    } else {
      Alert.alert('Eroare', 'Nu s-a putut salva antrenamentul. Te rog incearca din nou.');
      console.error("Callback-ul addWorkoutToListCallback lipseste din route.params");
    }
  };

  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
    >
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container}>
            <Text style={styles.headerTitle}>Adauga un Antrenament Nou</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Data Antrenamentului:</Text>
                <TextInput
                    style={styles.input}
                    value={date}
                    onChangeText={setDate}
                    placeholder="Ex: 2025-05-24"
                    placeholderTextColor={COLORS.mediumGray}
                    maxLength={10} // YYYY-MM-DD
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Tipul Antrenamentului:</Text>
                <TextInput
                    style={styles.input}
                    value={type}
                    onChangeText={setType}
                    placeholder="Ex: Alergare, Forta, Yoga, Ciclism"
                    placeholderTextColor={COLORS.mediumGray}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Durata:</Text>
                <TextInput
                    style={styles.input}
                    value={duration}
                    onChangeText={setDuration}
                    placeholder="Ex: 30 min, 1 ora si 15 min"
                    placeholderTextColor={COLORS.mediumGray}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Detalii Suplimentare (Optional):</Text>
                <TextInput
                    style={[styles.input, styles.multilineInput]}
                    value={details}
                    onChangeText={setDetails}
                    placeholder="Ex: Piept si Triceps, 5km in parc cu ritm alert"
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top" // Necesar pentru alinierea textului pe Android
                    placeholderTextColor={COLORS.mediumGray}
                />
            </View>

            <TouchableOpacity style={[styles.button, SHADOWS.medium]} onPress={handleAddWorkout}>
                <Text style={styles.buttonText}>Salveaza Antrenamentul</Text>
            </TouchableOpacity>
        </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  container: {
    padding: SIZES.medium,
    paddingBottom: SIZES.xlarge, // Spatiu suplimentar jos pentru scroll
  },
  headerTitle: {
    ...FONTS.h2,
    color: COLORS.darkGray,
    textAlign: 'center',
    marginBottom: SIZES.xlarge,
  },
  inputContainer: {
    marginBottom: SIZES.medium,
  },
  label: {
    ...FONTS.body2,
    color: COLORS.textGray,
    marginBottom: SIZES.base / 2,
  },
  input: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.medium,
    borderRadius: SIZES.base,
    ...FONTS.body1,
    color: COLORS.darkGray,
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
    fontSize: SIZES.medium,
  },
  multilineInput: {
    minHeight: 100, // Asigura inaltimea minima pentru textul multiline
    paddingTop: SIZES.small, 
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.medium,
    borderRadius: SIZES.base,
    alignItems: 'center',
    marginTop: SIZES.large,
  },
  buttonText: {
    ...FONTS.h3,
    color: COLORS.white,
    fontSize: SIZES.medium,
  },
});

export default AddWorkoutScreen;