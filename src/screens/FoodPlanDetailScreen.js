import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Platform } from 'react-native';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';

/**
 * Reusable component to display an info section
 * with a title and a list of bullet points (e.g., Benefits, Foods).
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
        {/* Main header with the image and overlaid title */}
        <View style={styles.imageHeaderContainer}>
            {/* Header background image */}
            <Image source={plan.image} style={styles.image} />
            {/* Semi-transparent overlay for text readability */}
            <View style={styles.imageOverlay} />
            {/* Title positioned over the image */}
            <Text style={styles.imageTitle}>{plan.title}</Text>
        </View>

        {/* Container for the main content (description, benefits, etc.) */}
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
    backgroundColor: COLORS.darkGray, // Fallback background (if image fails to load)
    position: 'relative', // Necessary for absolute positioning of children
    justifyContent: 'flex-end', // Aligns title to the bottom
  },
  image: {
    ...StyleSheet.absoluteFillObject, // Fills the parent container completely
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent black overlay
  },
  imageTitle: {
    ...FONTS.h1,
    color: COLORS.white,
    paddingHorizontal: SIZES.medium,
    paddingBottom: SIZES.medium,
    // Text shadow for max readability on any image
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 8,
    position: 'relative', // Positioned relatively to stay above the overlay
  },
  contentContainer: {
    padding: SIZES.medium,
    backgroundColor: COLORS.lightGray,
    borderTopLeftRadius: SIZES.large, // Rounds the top corners
    borderTopRightRadius: SIZES.large,
    marginTop: -SIZES.large, // "Pull-up" effect: pulls the content over the image base
    paddingTop: SIZES.xlarge, // Compensates for the negative marginTop
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
    ...SHADOWS.light, // Apply shadow defined in theme
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
      marginTop: 8, // Manual alignment with the text
  },
  sectionItem: {
    ...FONTS.body2,
    flex: 1,
  },
});

export default FoodPlanDetailScreen;