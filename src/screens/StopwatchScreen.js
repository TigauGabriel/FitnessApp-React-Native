import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';

const formatTime = (time) => {
  const getMilliseconds = `00${time % 1000}`.slice(-3);
  const seconds = Math.floor(time / 1000);
  const getSeconds = `0${seconds % 60}`.slice(-2);
  const minutes = Math.floor(seconds / 60);
  const getMinutes = `0${minutes % 60}`.slice(-2);
  return `${getMinutes}:${getSeconds}:${getMilliseconds.slice(0,2)}`; // We only display hundredths of a second
};

const StopwatchScreen = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);
  const lapTimeRef = useRef(0); // Can be used to store the lap start time

  const handleStartStop = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
    } else {
      const startTime = Date.now() - time;
      
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10); // Update every 10ms to display hundredths
    }
    setIsRunning(!isRunning);
  };

  const handleLapReset = () => {
    if (isRunning) {
      // Logic for 'Lap'
      // Calculate the current lap duration: total time - sum of previous durations
      const lastLapTotalTime = laps.reduce((acc, curr) => acc + curr.rawDuration, 0);
      const currentLapDuration = time - lastLapTotalTime;

      setLaps(prevLaps => [...prevLaps, {
        id: prevLaps.length + 1,
        time: formatTime(time), // Total time when 'Lap' was pressed
        rawDuration: currentLapDuration // Store the raw duration (ms) for future calculations
      }]);
    } else {
      // Logic for 'Reset'
      setTime(0);
      setLaps([]);
      lapTimeRef.current = 0;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{formatTime(time)}</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, isRunning ? styles.stopButton : styles.startButton]}
          onPress={handleStartStop}
        >
          {/* Corrected the text to 'Start' */}
          <Text style={styles.buttonText}>{isRunning ? 'Stop' : 'Start'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.lapResetButton]}
          onPress={handleLapReset}
          // Button is disabled only when not running and time is 0
          disabled={!isRunning && time === 0}
        >
          <Text style={styles.buttonText}>{isRunning ? 'Tura' : 'Resetare'}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.lapsContainer}>
        {/* Display laps in reverse order (newest first) */}
        {laps.map((lap, index) => (
          <View key={lap.id} style={styles.lapItem}>
            <Text style={styles.lapText}>Tura {laps.length - index}: {lap.time}</Text>
          </View>
        )).reverse()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 80,
    backgroundColor: '#f0f0f0',
  },
  timeText: {
    fontSize: 64,
    fontWeight: '200',
    marginBottom: 40,
    // Use platform-specific fonts for a "native" look
    fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue-UltraLight' : 'sans-serif-light',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 30,
  },
  button: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  startButton: {
    borderColor: '#4CAF50',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  stopButton: {
    borderColor: '#F44336',
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
  },
  lapResetButton: {
    borderColor: '#757575',
    backgroundColor: 'rgba(117, 117, 117, 0.1)',
  },
  buttonText: {
    fontSize: 20,
    color: '#333',
  },
  lapsContainer: {
    width: '80%',
    flex: 1,
  },
  lapItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  lapText: {
    fontSize: 18,
    color: '#555',
  },
});

export default StopwatchScreen;