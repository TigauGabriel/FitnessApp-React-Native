import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';

// Data for the diet plans.
const DIET_PLANS_DATA = [
  {
    id: '1',
    title: 'Plan Alimentar Mediteranean',
    shortDescription: 'Fructe, legume, nuci, cereale integrale, ulei de masline.',
    image: require('../assets/images/diet_plan_1.png'),
    fullDescription: "Dieta Mediteraneana este inspirata de obiceiurile alimentare traditionale din tari precum Grecia, Italia si Spania. Este considerata una dintre cele mai sanatoase diete din lume.",
    benefits: ["Sanatatea inimii", "Controlul greutatii", "Prevenirea diabetului de tip 2", "Longevitate crescuta", "Sanatatea creierului"],
    exampleMeals: [
        "Mic Dejun: Iaurt grecesc cu nuci si fructe de padure.",
        "Pranz: Salata mare cu ton, legume proaspete, masline si ulei de masline.",
        "Cina: Somon la gratar cu quinoa si broccoli la abur."
    ],
    foodsToEat: ["Ulei de masline", "Legume", "Fructe", "Peste", "Nuci", "Seminte", "Leguminoase", "Cereale integrale"],
    foodsToAvoid: ["Carne procesata", "Uleiuri rafinate", "Cereale rafinate", "Zahar adaugat", "Mancare foarte procesata"]
  },
  {
    id: '2',
    title: 'Plan Alimentar Ketogenic (Keto)',
    shortDescription: 'Scazut in carbohidrati, moderat in proteine, bogat in grasimi.',
    image: require('../assets/images/diet_plan_2.png'),
    fullDescription: "Dieta Ketogenica (Keto) implica reducerea drastica a aportului de carbohidrati si inlocuirea acestora cu grasimi. Aceasta reducere a carbohidratilor pune corpul intr-o stare metabolica numita cetoza, in care devine very eficient in arderea grasimilor pentru energie.", 
    benefits: ["Pierdere rapida in greutate", "Imbunatatirea controlului glicemic", "Energie constanta (dupa adaptare)", "Posibile beneficii neurologice"],
    exampleMeals: [
        "Mic Dejun: Omleta cu branza si avocado.",
        "Pranz: Salata de pui cu dressing bogat in grasimi si legume keto.",
        "Cina: Friptura de vita cu sparanghel in unt."
    ],
    foodsToEat: ["Carne", "Peste gras", "Oua", "Branzeturi", "Avocado", "Nuci si seminte", "Uleiuri sanatoase", "Legume cu putini carbohidrati (verdeturi, broccoli, conopida)"],
    foodsToAvoid: ["Alimente cu zahar", "Cereale si amidon", "Majoritatea fructelor", "Fasole si leguminoase", "Radacinoase", "Grasimi nesanatoase", "Alcool bogat in carbohidrati"]
  },
  {
    id: '3',
    title: 'Plan Alimentar Rina (Dieta de 90 de zile)',
    shortDescription: 'Dieta disociata pe 4 zile: Proteine, Amidon, Carbohidrati, Vitamine.',
    image: require('../assets/images/diet_rina.png'),
    fullDescription: "Dieta Rina, cunoscuta si sub numele de Dieta de 90 de zile, este un plan alimentar disociat care promite pierderea in greutate si o schimbare a metabolismului. Se bazeaza pe un ciclu de 4 zile care se repeta.",
    benefits: ["Pierdere in greutate structurata", "Poate ajuta la constientizarea combinatiilor alimentare", "Diversitate prin rotatie"],
    exampleMeals: [
        "Ziua 1: Pranz - Piept de pui la gratar cu salata mare. Cina - Jumatate de portie de pui.",
        "Ziua 2: Pranz - Mancare de mazare cu legume. Cina - Jumatate de portie.",
        "Ziua 3: Pranz - Paste cu sos de rosii si busuioc. Cina - O felie de tort sau 2 clatite.",
        "Ziua 4: Diverse fructe pe parcursul zilei."
    ],
    foodsToEat: ["Variaza in functie de zi: Proteine, Amidon, Carbohidrati, Fructe."],
    foodsToAvoid: ["Amestecarea grupelor alimentare in zilele dedicate", "Bauturi alcoolice frecvente", "Alimente foarte procesate"]
  },
  {
    id: '4',
    title: 'Plan Alimentar Paleo',
    shortDescription: 'Alimente neprocesate, fara cereale, lactate, leguminoase.',
    image: require('../assets/images/diet_plan_4.png'),
    fullDescription: "Dieta Paleo, cunoscuta si ca dieta 'omului cavernelor', se bazeaza pe alimentele care se presupune ca erau disponibile in Paleolitic. Accentueaza alimentele integrale si evita alimentele procesate, cerealele, lactatele si leguminoasele.", 
    benefits: ["Alimente neprocesate", "Posibila reducere a inflamatiei", "Controlul greutatii", "Saturatie crescuta"],
    exampleMeals: [
        "Mic Dejun: Oua fierte cu o felie de avocado si fructe de padure.",
        "Pranz: Salata mare cu pui la gratar, nuci si ulei de masline.",
        "Cina: Friptura de vita cu cartofi dulci copti si legume la abur."
    ],
    foodsToEat: ["Carne slaba", "Peste", "Oua", "Legume", "Fructe", "Nuci", "Seminte", "Grasimi sanatoase (ulei de masline, avocado)"],
    foodsToAvoid: ["Cereale", "Leguminoase", "Lactate", "Zahar rafinat", "Alimente procesate"]
  },
  {
    id: '5',
    title: 'Plan Alimentar Dukan',
    shortDescription: 'Dieta hiperproteica, in 4 faze, pentru pierdere rapida.',
    image: require('../assets/images/diet_plan_dukan.png'),
    fullDescription: "Dieta Dukan este un plan alimentar bogat in proteine si sarac in carbohidrati si grasimi, structurat in patru faze distincte, menit sa produca o pierdere rapida si durabila in greutate.",
    benefits: ["Pierdere rapida in greutate (initial)", "Structura clara si reguli precise", "Mentinerea masei musculare (datorita proteinelor)"],
    exampleMeals: [
        "Faza Atac: Pui la gratar fara piele, oua fierte, iaurt degresat.",
        "Faza Croaziera (PL): Somon la abur cu broccoli, salata cu creveti.",
        "Faza Consolidare: Se adauga fructe, paine integrala, branzeturi, mese de sarbatoare."
    ],
    foodsToEat: ["Proteine slabe (pui, curcan, vita, peste, oua, lactate 0%)", "Legume (in Faza 2 PL)", "Tarate de ovaz", "Apa"],
    foodsToAvoid: ["Zahar", "Grasimi (cu exceptia celor din peste)", "Carbohidrati (in primele faze)", "Fructe (in primele faze)"]
  },
];


const DietPlansLandingScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.itemContainer, SHADOWS.light]}
      onPress={() => navigation.navigate('FoodPlanDetail', { plan: item })}
    >
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDescription} numberOfLines={2}>{item.shortDescription}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={SIZES.large + 4} color={COLORS.mediumGray} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={DIET_PLANS_DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        // ListHeaderComponent is used to display a title above the list
        ListHeaderComponent={<Text style={styles.listHeaderTitle}>Exploreaza Planuri Alimentare</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  listHeaderTitle: {
    ...FONTS.h2,
    textAlign: 'center',
    paddingVertical: SIZES.medium,
    paddingHorizontal: SIZES.medium,
    color: COLORS.darkGray,
  },
  list: {
    paddingHorizontal: SIZES.medium,
    paddingBottom: SIZES.large,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.base,
    padding: SIZES.medium,
    marginVertical: SIZES.base,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: SIZES.base,
    marginRight: SIZES.medium,
    resizeMode: 'cover',
  },
  itemTextContainer: {
    flex: 1, // Allows the text to take up the available space
    paddingRight: SIZES.base,
  },
  itemTitle: {
    ...FONTS.h3,
    fontSize: SIZES.medium,
    marginBottom: SIZES.base / 2,
  },
  itemDescription: {
    ...FONTS.body3,
    color: COLORS.textGray,
  },
});

export default DietPlansLandingScreen;