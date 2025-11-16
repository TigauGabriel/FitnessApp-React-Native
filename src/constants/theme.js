import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const COLORS = {
  primary: '#4CAF50', // Green - Main color (fitness)
  secondary: '#607D8B', // Bluish-Gray - Secondary color
  accent: '#FFC107', // Yellow - Accent, Energy

  white: '#FFFFFF',
  black: '#000000',

  lightGray: '#F8F9FA', // General background (very light)
  mediumGray: '#CED4DA', // Borders / inactive elements
  darkGray: '#343A40', // Main text (dark)
  textGray: '#6C757D', // Secondary text (gray)

  success: '#28A745',
  warning: '#FFC107',
  danger: '#DC3545',
  info: '#17A2B8',
};

export const SIZES = {
  base: 8,
  small: 12,
  font: 14,
  medium: 16,
  large: 18,
  xlarge: 24,
  xxlarge: 32,

  // Screen dimensions
  width,
  height,
};

export const FONTS = {
  h1: { fontSize: SIZES.xxlarge, fontWeight: '700', color: COLORS.darkGray, marginBottom: SIZES.small },
  h2: { fontSize: SIZES.xlarge, fontWeight: '600', color: COLORS.darkGray, marginBottom: SIZES.small },
  h3: { fontSize: SIZES.large, fontWeight: 'bold', color: COLORS.darkGray, marginBottom: SIZES.small },
  body1: { fontSize: SIZES.medium, lineHeight: 24, color: COLORS.darkGray },
  body2: { fontSize: SIZES.font, lineHeight: 22, color: COLORS.textGray },
  body3: { fontSize: SIZES.small, lineHeight: 20, color: COLORS.textGray },
};

export const SHADOWS = {
  light: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  medium: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
};

const appTheme = { COLORS, SIZES, FONTS, SHADOWS };

export default appTheme;