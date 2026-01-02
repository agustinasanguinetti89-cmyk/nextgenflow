/**
 * NEXTGENFLOW v3.0 FINAL - Brand Compliance Theme
 * Paleta de colores oficial NextGenFlow
 * Tipografía: Montserrat (titulares) + Inter (cuerpo)
 */

export const THEME = {
  colors: {
    primary: '#3a2459',        // Morado oscuro (botones, headers)
    secondary: '#751f82',      // Rosa neón (highlights, CTAs)
    lavender: '#f6f3f7',       // Lavanda claro (backgrounds)
    white: '#ffffff',
    mediumGray: '#8a8a8a',     // Textos secundarios
    darkGray: '#2a2a2a',       // Textos oscuros
    success: '#10B981',        // Validación exitosa
    error: '#EF4444',          // Errores
    gold: '#D4AF37',           // Acento para Pro
  },
  typography: {
    title: {
      fontFamily: 'Montserrat-Bold',
      fontSize: 28,
      fontWeight: '700',
      lineHeight: 36
    },
    subtitle: {
      fontFamily: 'Montserrat-SemiBold',
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 28
    },
    body: {
      fontFamily: 'Inter-Regular',
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 24
    },
    bodyBold: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 24
    },
    caption: {
      fontFamily: 'Inter-Regular',
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 18
    }
  },
  spacing: {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40
  },
  borderRadius: {
    sm: 8,
    md: 10,
    lg: 12,
    xl: 16
  },
  shadows: {
    soft: {
      shadowColor: '#3a2459',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3
    }
  }
};

export const Colors = {
  light: {
    text: THEME.colors.darkGray,
    background: THEME.colors.white,
    tint: THEME.colors.primary,
    icon: THEME.colors.mediumGray,
    tabIconDefault: THEME.colors.mediumGray,
    tabIconSelected: THEME.colors.primary,
    surface: THEME.colors.lavender,
    error: THEME.colors.error,
  },
  dark: {
    text: THEME.colors.white,
    background: '#1a1a1a',
    tint: THEME.colors.secondary,
    icon: THEME.colors.mediumGray,
    tabIconDefault: THEME.colors.mediumGray,
    tabIconSelected: THEME.colors.secondary,
    surface: '#2a2a2a',
    error: THEME.colors.error,
  },
};

export const BrandColors = THEME.colors;
export const Fonts = {
  title: THEME.typography.title.fontFamily,
  subtitle: THEME.typography.subtitle.fontFamily,
  body: THEME.typography.body.fontFamily,
  bodyBold: THEME.typography.bodyBold.fontFamily,
  caption: THEME.typography.caption.fontFamily,
};
