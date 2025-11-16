import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Platform
} from 'react-native';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

/**
 * Functie helper pentru a returna o culoare specifica
 * in functie de categoria IMC.
 */
const getCategoryColor = (category) => {
    if (category === 'Subponderal') return COLORS.info;
    if (category === 'Greutate normala') return COLORS.success;
    if (category === 'Supraponderal') return COLORS.warning;
    if (category === 'Obezitate') return COLORS.danger;
    return COLORS.darkGray;
};

const BMICalculatorScreen = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState('');

  const calculateBmi = () => {
    Keyboard.dismiss();
    const h = parseFloat(height);
    const w = parseFloat(weight);

    // Validare input
    if (!h || !w || h <= 0 || w <= 0) {
      Alert.alert('Date Invalide', 'Te rog introdu valori valide pentru inaltime si greutate.');
      setBmi(null);
      setBmiCategory('');
      return;
    }

    // Formula IMC: greutate (kg) / (inaltime (m) * inaltime (m))
    const heightInMeters = h / 100;
    const bmiValue = w / (heightInMeters * heightInMeters);
    setBmi(bmiValue.toFixed(1));

    // Stabilirea categoriei
    if (bmiValue < 18.5) setBmiCategory('Subponderal');
    else if (bmiValue < 24.9) setBmiCategory('Greutate normala');
    else if (bmiValue < 29.9) setBmiCategory('Supraponderal');
    else setBmiCategory('Obezitate');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
          <Text style={styles.title}>Calculator IMC</Text>
          <Text style={styles.descriptionText}>
              Indicele de Masa Corporala (IMC) este un indicator simplu al greutatii in raport cu inaltimea.
          </Text>

          <View style={[styles.inputGroup, SHADOWS.light]}>
              <View style={styles.inputRow}>
                  <Ionicons name="body-outline" size={SIZES.large} color={COLORS.textGray} style={styles.inputIcon} />
                  <TextInput
                      style={styles.input}
                      placeholder="Inaltime (cm)"
                      keyboardType="numeric"
                      value={height}
                      onChangeText={setHeight}
                      placeholderTextColor={COLORS.mediumGray}
                  />
              </View>
              <View style={styles.inputRow}>
                  <Ionicons name="barbell-outline" size={SIZES.large} color={COLORS.textGray} style={styles.inputIcon} />
                  <TextInput
                      style={styles.input}
                      placeholder="Greutate (kg)"
                      keyboardType="numeric"
                      value={weight}
                      onChangeText={setWeight}
                      placeholderTextColor={COLORS.mediumGray}
                  />
              </View>
          </View>

          <TouchableOpacity style={[styles.button, SHADOWS.medium]} onPress={calculateBmi}>
              <Text style={styles.buttonText}>Calculeaza IMC</Text>
          </TouchableOpacity>

          {/* Afisare conditionata a rezultatului */}
          {bmi && (
            <View style={[styles.resultContainer, SHADOWS.medium, { borderColor: getCategoryColor(bmiCategory) }]}>
                <Text style={styles.resultLabel}>IMC-ul tau este:</Text>
                <Text style={[styles.resultText, { color: getCategoryColor(bmiCategory) }]}>
                    {bmi}
                </Text>
                <Text style={[styles.categoryText, { backgroundColor: getCategoryColor(bmiCategory) }]}>
                    {bmiCategory}
                </Text>
            </View>
          )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
      flexGrow: 1,
      backgroundColor: COLORS.lightGray,
  },
  container: {
    flex: 1,
    padding: SIZES.medium,
    backgroundColor: COLORS.lightGray,
    alignItems: 'center',
    paddingTop: SIZES.large,
  },
  title: {
    ...FONTS.h2,
    color: COLORS.darkGray,
    marginBottom: SIZES.base,
    textAlign: 'center',
  },
  descriptionText: {
      ...FONTS.body2,
      textAlign: 'center',
      marginBottom: SIZES.xxlarge,
      width: '85%',
  },
  inputGroup: {
      width: '90%',
      maxWidth: 400,
      backgroundColor: COLORS.white,
      borderRadius: SIZES.base,
      paddingVertical: SIZES.base,
      paddingHorizontal: SIZES.medium,
      marginBottom: SIZES.xlarge,
  },
  inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: COLORS.lightGray,
      marginVertical: SIZES.base,
      paddingBottom: SIZES.base,
  },
  inputIcon: {
      marginRight: SIZES.small,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: SIZES.medium,
    color: COLORS.darkGray,
  },
  button: {
      backgroundColor: COLORS.primary,
      paddingHorizontal: SIZES.xxlarge,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '70%',
      maxWidth: 300,
      height: 50,
  },
  buttonText: {
      color: COLORS.white,
      fontSize: SIZES.medium,
      fontWeight: 'bold',
      textAlign: 'center',
  },
  resultContainer: {
    marginTop: SIZES.xxlarge,
    alignItems: 'center',
    padding: SIZES.xlarge,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.base,
    width: '90%',
    maxWidth: 400,
    borderWidth: 3,
  },
  resultLabel: {
      ...FONTS.body1,
      color: COLORS.textGray,
      marginBottom: SIZES.base,
  },
  resultText: {
    fontSize: 56,
    fontWeight: 'bold',
    marginBottom: SIZES.medium,
  },
  categoryText: {
    fontSize: SIZES.large,
    fontWeight: '600',
    color: COLORS.white,
    paddingVertical: SIZES.base / 2,
    paddingHorizontal: SIZES.medium,
    borderRadius: SIZES.base,
    overflow: 'hidden', // Asigura ca borderRadius se aplica pe backgroundColor
    marginTop: SIZES.small,
  },
});

export default BMICalculatorScreen;