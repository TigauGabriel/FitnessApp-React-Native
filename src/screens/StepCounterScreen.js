import React, { useState, useEffect, useCallback } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    ActivityIndicator, 
    Button, 
    ScrollView, 
    Linking 
} from 'react-native';
import { Pedometer } from 'expo-sensors';

const StepCounterScreen = () => {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [stepsToday, setStepsToday] = useState(0);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [showOpenSettingsButton, setShowOpenSettingsButton] = useState(false);

  /**
   * Preia numarul total de pasi de la inceputul zilei curente.
   * Este memoizata pentru a fi folosita in interiorul `initializePedometer`.
   */
  const fetchAndUpdateTodaysSteps = useCallback(async () => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();

    try {
      const result = await Pedometer.getStepCountAsync(startOfDay, endOfDay);
      setStepsToday(result.steps);
    } catch (error) {
      console.error("fetchAndUpdateTodaysSteps: Eroare", error);
      setErrorMessage("Nu s-a putut actualiza numarul de pasi.");
    }
  }, []);

  /**
   * Functia principala de initializare.
   * Verifica disponibilitatea, cere permisiunea si porneste listener-ul.
   * Memoizata cu useCallback pentru a fi folosita stabil in useEffect.
   */
  const initializePedometer = useCallback(async (isManualRetry = false) => {
    if (isManualRetry) {
        setLoading(true);
        setErrorMessage('');
        setShowOpenSettingsButton(false); // Resetare la reincercare
    }
    
    let newSubscription = null;

    try {
      const available = await Pedometer.isAvailableAsync();
      setIsPedometerAvailable(available);

      if (!available) {
        setErrorMessage("Pedometrul NU este disponibil pe acest dispozitiv.");
        setPermissionGranted(false);
        setShowOpenSettingsButton(false);
        return null;
      }

      const permissionDetails = await Pedometer.requestPermissionsAsync();

      if (permissionDetails.granted) {
        setPermissionGranted(true);
        setErrorMessage('');
        setShowOpenSettingsButton(false);
        await fetchAndUpdateTodaysSteps();

        // Porneste listener-ul care urmareste pasii in timp real
        newSubscription = Pedometer.watchStepCount(_update => {
          fetchAndUpdateTodaysSteps();
        });
      } else {
        setPermissionGranted(false);
        let specificErrorMessage = "Permisiunea pentru accesarea pedometrului nu a fost acordata.";

        // Cazul special: permisiunea a fost refuzata permanent (cu 'Nu mai intreba').
        // Utilizatorul trebuie sa o activeze manual din Setarile telefonului.
        if (permissionDetails.status === 'denied' && !permissionDetails.canAskAgain) {
          specificErrorMessage += "\n\nTe rugam sa activezi manual permisiunea 'Activitate Fizica' pentru aplicatie din Setarile telefonului.";
          setShowOpenSettingsButton(true);
        } else {
          setShowOpenSettingsButton(false);
        }
        setErrorMessage(specificErrorMessage);
      }
    } catch (error) {
      console.error("initializePedometer: Eroare", error);
      setErrorMessage("A aparut o eroare la initializarea pedometrului: " + error.message);
      setPermissionGranted(false);
      setShowOpenSettingsButton(false);
    } finally {
      if (isManualRetry) {
          setLoading(false);
      }
    }
    return newSubscription;
  }, [fetchAndUpdateTodaysSteps]); // Depinde de functia memoizata

  // Efect pentru initializare si cleanup
  useEffect(() => {
    let currentSubscription = null;

    const setup = async () => {
        setLoading(true);
        setErrorMessage('');
        setShowOpenSettingsButton(false);
        currentSubscription = await initializePedometer(false); // Apel initial
        setLoading(false); // Opreste incarcarea dupa ce setup-ul s-a terminat
    };

    setup();

    return () => {
      // Functia de cleanup: Opreste abonamentul la senzor cand componenta se demonteaza
      if (currentSubscription) {
        currentSubscription.remove();
      }
    };
  }, [initializePedometer]); // Se re-ruleaza doar daca referinta `initializePedometer` se schimba

  const handleRetry = () => {
    initializePedometer(true); // Apeleaza cu flag de retry manual
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00796b" />
        <Text style={styles.infoText}>Se verifica pedometrul...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Contor de Pasi</Text>
        {errorMessage ? (
          <View style={styles.centeredContent}>
            <Text style={styles.errorText}>{errorMessage}</Text>
            {showOpenSettingsButton && (
              <View style={styles.buttonContainer}>
                <Button
                  title="Deschide Setarile Aplicatiei"
                  onPress={() => Linking.openSettings()} // Deschide setarile native ale aplicatiei
                  color="#00796b"
                />
              </View>
            )}
            <View style={styles.buttonContainer}>
              <Button title="Reincearca" onPress={handleRetry} color="#00796b" />
            </View>
          </View>
        ) : !isPedometerAvailable ? (
            <Text style={styles.errorText}>Pedometrul nu este disponibil pe acest dispozitiv.</Text>
        ) : !permissionGranted ? (
            <Text style={styles.errorText}>Permisiunea pentru pedometru nu a fost acordata. Verifica setarile.</Text>
        ) : (
          <View style={styles.centeredContent}>
            <Text style={styles.steps}>{stepsToday}</Text>
            <Text style={styles.stepsLabel}>pasi astazi</Text>
            <Text style={styles.info}>
              Numarul de pasi se actualizeaza automat.
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
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#e0f7fa',
  },
  centeredContent: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#004d40',
    textAlign: 'center',
  },
  steps: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#00796b',
    marginBottom: 5,
  },
  stepsLabel: {
    fontSize: 18,
    color: '#00796b',
    marginBottom: 30,
  },
  infoText: {
    marginTop: 10,
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
  info: {
    textAlign: 'center',
    color: 'gray',
    fontStyle: 'italic',
    paddingHorizontal: 20,
    marginTop: 20,
    fontSize: 14,
  },
  errorText: {
    fontSize: 16,
    color: '#c0392b',
    textAlign: 'center',
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 10,
    width: '80%',
    maxWidth: 300,
  },
  debugInfo: {
      marginTop: 30,
      fontSize: 12,
      color: '#7f8c8d',
      textAlign: 'center',
  }
});

export default StepCounterScreen;