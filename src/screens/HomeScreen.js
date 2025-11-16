import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';

/**
 * Componenta reutilizabila pentru cardurile de functionalitati
 * afisate pe ecranul de pornire.
 */
const FeatureCard = ({ icon, title, subtitle, onPress, color }) => (
  <TouchableOpacity style={[styles.card, SHADOWS.light]} onPress={onPress}>
    <View style={[styles.cardIconContainer, { backgroundColor: color || COLORS.primary }]}>
        <MaterialIcons name={icon} size={SIZES.xlarge} color={COLORS.white} />
    </View>
    <View style={styles.cardTextContainer}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSubtitle}>{subtitle}</Text>
    </View>
      <MaterialIcons name="chevron-right" size={SIZES.large + 4} color={COLORS.mediumGray} />
  </TouchableOpacity>
);

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
        {/* Sectiunea de Bun Venit */}
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Salut, Gabi!</Text>
            <Text style={styles.headerSubtitle}>Esti gata pentru o zi activa?</Text>
        </View>

        {/* Sectiunea de Functionalitati */}
        <View style={styles.featuresContainer}>
            <Text style={styles.sectionTitle}>Acces Rapid</Text>
            <FeatureCard
                icon="directions-walk"
                title="Pasi Astazi"
                subtitle="Vezi progresul zilnic"
                onPress={() => navigation.navigate('Pasi')}
                color={COLORS.info}
            />
            <FeatureCard
                icon="calculate"
                title="Calculator IMC"
                subtitle="Verifica-ti indicele"
                onPress={() => navigation.navigate('IMC')}
                color={COLORS.warning}
            />
            <FeatureCard
                icon="restaurant"
                title="Planuri Alimentare"
                subtitle="Descopera diete sanatoase"
                onPress={() => navigation.navigate('DietsTab')}
                color={COLORS.primary}
            />
            <FeatureCard
                icon="timer"
                title="Cronometru"
                subtitle="Masoara-ti antrenamentul"
                onPress={() => navigation.navigate('Cronometru')}
                color={COLORS.secondary}
            />
            <FeatureCard
                icon="list-alt"
                title="Istoric Antrenamente"
                subtitle="Revizuieste activitatile"
                onPress={() => navigation.navigate('HistoryTab')}
                color={COLORS.danger}
            />
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  header: {
      backgroundColor: COLORS.primary,
      paddingHorizontal: SIZES.large,
      paddingVertical: SIZES.xlarge,
      paddingTop: SIZES.xlarge + 10,
      borderBottomLeftRadius: SIZES.xxlarge,
      borderBottomRightRadius: SIZES.xxlarge,
      marginBottom: SIZES.medium,
      ...SHADOWS.medium,
  },
  headerTitle: {
    ...FONTS.h1,
    color: COLORS.white,
    textAlign: 'center',
  },
  headerSubtitle: {
    ...FONTS.body2,
    color: COLORS.white,
    textAlign: 'center',
    opacity: 0.9,
    marginTop: SIZES.base,
  },
  featuresContainer: {
      paddingHorizontal: SIZES.medium,
      paddingBottom: SIZES.xlarge,
      marginTop: SIZES.medium,
  },
  sectionTitle: {
      ...FONTS.h3,
      color: COLORS.darkGray,
      marginBottom: SIZES.medium,
  },
  card: {
      flexDirection: 'row',
      backgroundColor: COLORS.white,
      padding: SIZES.medium,
      borderRadius: SIZES.base,
      marginBottom: SIZES.medium,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#E8E8E8',
  },
  cardIconContainer: {
      borderRadius: 12,
      marginRight: SIZES.medium,
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
  },
  cardTextContainer: {
      flex: 1,
  },
  cardTitle: {
      ...FONTS.body1,
      fontWeight: 'bold',
      color: COLORS.darkGray,
  },
  cardSubtitle: {
      ...FONTS.body3,
      color: COLORS.textGray,
  },
});

export default HomeScreen;