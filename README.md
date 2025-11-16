# FitnessApp - O aplicatie de Sanatate si Fitness

Acesta este un proiect personal, o aplicatie mobila (iOS & Android) pe care am construit-o in React Native (Expo). Scopul a fost sa creez o aplicatie simpla si utila pentru oricine vrea sa-si monitorizeze activitatea fizica.

---

## ✨ Functionalitati

* **Contor de Pasi:** Foloseste senzorul de miscare al telefonului pentru a afisa pasii facuti in ziua curenta.
* **Istoric Antrenamente:** Utilizatorii pot adauga, vizualiza si sterge antrenamentele salvate.
* **Planuri Alimentare:** O mica biblioteca de planuri de dieta (Keto, Rina etc.) cu descrieri.
* **Calculator IMC:** Un calculator simplu pentru Indicele de Masa Corporala.
* **Cronometru:** Un cronometru cu functie de "Tura" (Lap) pentru inregistrarea timpilor.

---

## 🛠️ Tehnologii Folosite

* React Native
* Expo
* React Navigation (pentru navigarea intre ecrane)
* AsyncStorage (pentru salvarea datelor pe telefon)
* Expo Sensors (pentru Contorul de Pasi)
* React Native Vector Icons

---

## 💡 Repere Tehnice (Ce am invatat)

Acest proiect a fost o oportunitate grozava de a ma concentra pe cateva aspecte tehnice cheie:

* **Persistenta Datelor (CRUD):** Am folosit `AsyncStorage` pentru a permite utilizatorilor sa-si salveze (Create/Read) si sa-si stearga (Delete) antrenamentele. Datele raman pe telefon si dupa ce inchid aplicatia.
* **Integrare Hardware:** M-am conectat la senzorii telefonului (Pedometer) folosind `expo-sensors` pentru Contorul de Pasi, inclusiv gestionarea cererilor de permisiune.
* **Navigare Complexa:** Am construit fluxul de navigare combinand un `BottomTabNavigator` (pentru ecranele principale) cu `StackNavigator`-uri separate pentru functionalitati ca "Dieta" sau "Istoric".
* **Fluxul de Date:** Am trimis date intre ecrane, atat prin `route.params` (pentru lucruri simple), cat si trimitand o functie *callback* de la Istoric la "Adauga Antrenament" pentru a actualiza lista imediat.
* **Design Centralizat:** Am creat un fisier `theme.js` care contine toate culorile (`COLORS`), marimile (`SIZES`) si fonturile (`FONTS`). Asta a facut stilizarea mult mai usoara si mai consistenta.