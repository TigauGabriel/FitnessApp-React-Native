import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Platform } from 'react-native';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';

/**
 * Componenta reutilizabila pentru a afisa o sectiune de informatii
 * cu un titlu si o lista de puncte (ex. Beneficii, Alimente).
 */
const InfoSection = ({ title, items }) => {
  if (!items || items.length === 0) return null;
  return (
    <View style={[styles.sectionContainer, SHADOWS.light]}>
        <Text style={styles.sectionTitle}>{title}:</Text>
        {items.map((item, index) => (
            <View key={index} style={styles.sectionItemContainer}>
                <View style={styles.bulletPoint}/>
                <Text style={styles.sectionItem}>{item}</Text>
            </View>
        ))}
    </View>
  );
};

const FoodPlanDetailScreen = ({ route }) => {
  const { plan } = route.params;

  return (
    <ScrollView style={styles.container}>
        {/* Header-ul principal cu imaginea si titlul suprapus */}
        <View style={styles.imageHeaderContainer}>
            {/* Imaginea de fundal a header-ului */}
            <Image source={plan.image} style={styles.image} />
            {/* Overlay semi-transparent pentru lizibilitate text */}
            <View style={styles.imageOverlay} />
            {/* Titlul pozitionat peste imagine */}
            <Text style={styles.imageTitle}>{plan.title}</Text>
        </View>

        {/* Container pentru continutul principal (descriere, beneficii etc.) */}
        <View style={styles.contentContainer}>
            <View style={[styles.sectionContainer, SHADOWS.light]}>
                <Text style={styles.sectionTitle}>Descriere Completa:</Text>
                <Text style={styles.description}>{plan.fullDescription}</Text>
            </View>
            <InfoSection title="Beneficii Principale" items={plan.benefits} />
            <InfoSection title="Exemple de Mese" items={plan.exampleMeals} />
            <InfoSection title="Alimente Recomandate" items={plan.foodsToEat} />
            <InfoSection title="Alimente de Evitat" items={plan.foodsToAvoid} />
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  imageHeaderContainer: {
    width: '100%',
    height: 300,
    backgroundColor: COLORS.darkGray, // Fundal de fallback (daca imaginea nu se incarca)
    position: 'relative', // Necesar pentru a pozitiona absolut copiii
    justifyContent: 'flex-end', // Aliniaza titlul la baza containerului
  },
  image: {
    ...StyleSheet.absoluteFillObject, // Umple complet containerul parinte
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Suprapunere neagra semi-transparenta
  },
  imageTitle: {
    ...FONTS.h1,
    color: COLORS.white,
    paddingHorizontal: SIZES.medium,
    paddingBottom: SIZES.medium,
    // Umbra textului pentru lizibilitate pe orice imagine
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 8,
    position: 'relative', // Pozitionare relativa pentru a sta peste overlay
  },
  contentContainer: {
    padding: SIZES.medium,
    backgroundColor: COLORS.lightGray,
    borderTopLeftRadius: SIZES.large, // Rotunjirea colturilor de sus
    borderTopRightRadius: SIZES.large,
    marginTop: -SIZES.large, // Efect "pull-up": trage continutul peste baza imaginii
    paddingTop: SIZES.xlarge, // Compenseaza pentru marginTop negativ
  },
  description: {
    ...FONTS.body2,
    textAlign: 'justify',
  },
  sectionContainer: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.base,
    padding: SIZES.medium,
    marginBottom: SIZES.medium,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    ...SHADOWS.light, // Aplica umbra definita in tema
  },
  sectionTitle: {
    ...FONTS.h3,
    marginBottom: SIZES.small,
    color: COLORS.primary,
  },
  sectionItemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SIZES.base,
  },
  bulletPoint: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: COLORS.primary,
      marginRight: SIZES.small,
      marginTop: 8, // Aliniere manuala cu textul
  },
  sectionItem: {
    ...FONTS.body2,
    flex: 1,
  },
});

export default FoodPlanDetailScreen;