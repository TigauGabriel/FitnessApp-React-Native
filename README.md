# FitnessApp - A Health and Fitness Application

This is a personal project, a mobile app (iOS & Android) I built using React Native (Expo). The goal was to create a simple and useful tool for anyone looking to monitor their physical activity.

---

## ✨ Features

* **Step Counter:** Uses the phone's motion sensor to display the current day's steps.
* **Workout History:** Users can add, view, and delete their saved workouts.
* **Diet Plans:** A small library of diet plans (Keto, Rina, etc.) with descriptions.
* **BMI Calculator:** A simple tool to calculate Body Mass Index.
* **Stopwatch:** A stopwatch with a "Lap" function for timing workouts.

---

## 🛠️ Tech Stack Used

* React Native
* Expo
* React Navigation (for screen navigation)
* AsyncStorage (for saving data on the device)
* Expo Sensors (for the Step Counter)
* React Native Vector Icons

---

## 💡 Technical Highlights (What I Learned)

This project was a great opportunity to focus on a few key technical concepts:

* **Data Persistence (CRUD):** I used `AsyncStorage` to allow users to save (Create/Read) and delete (Delete) their workouts. The data remains on the phone even after closing the app.
* **Hardware Integration:** I connected to the phone's hardware sensors (Pedometer) using `expo-sensors` for the Step Counter, including handling permission requests.
* **Complex Navigation:** I built the navigation flow by combining a `BottomTabNavigator` (for main sections) with separate `StackNavigator`s for specific features like "Diets" or "History".
* **Data Flow:** I passed data between screens, both via `route.params` (for simple things) and by sending a *callback function* from the History screen to the "Add Workout" screen to update the list immediately.
* **Centralized Design (Theming):** I created a `theme.js` file containing all colors (`COLORS`), sizes (`SIZES`), and fonts (`FONTS`). This made styling much easier and more consistent.