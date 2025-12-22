/**
 * MANUS.IA v2.3 FINAL - Brand Compliance Theme
 * Paleta de colores oficial NextgenPMIA Diagnosis
 * Tipografía: Montserrat (titulares) + Inter (cuerpo)
 */

export const THEME = {
  colors: {
    primary: '#3a2459',        // Morado oscuro (botones, headers)
    secondary: '#751f82',      // Rosa neón (highlights, CTAs)
    tertiary: '#685c75',       // Morado apagado (textos secundarios)
    lavender: '#f6f3f7',       // Lavanda claro (backgrounds)
    white: '#ffffff',
    darkGray: '#2a2a2a',       // Textos oscuros
    mediumGray: '#8a8a8a',     // Textos secundarios
    gold: '#D4AF37',           // CTA premium Pro
    success: '#10B981',        // Validación exitosa
    warning: '#F59E0B',        // Advertencias
    error: '#EF4444'           // Errores
  },
  typography: {
    title: {
      fontFamily: 'Montserrat-Bold',    // Titulares
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
      fontFamily: 'Inter-Regular',      // Cuerpo
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
    lg: 24,      // Padding generoso (brand)
    xl: 32,      // Section gaps
    xxl: 40
  },
  borderRadius: {
    sm: 8,
    md: 10,
    lg: 12,
    xl: 16       // Bordes redondeados 2xl (brand)
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

// Exportar colores en formato antiguo para compatibilidad
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
    tint: THEME.colors.gold,
    icon: THEME.colors.mediumGray,
    tabIconDefault: THEME.colors.mediumGray,
    tabIconSelected: THEME.colors.gold,
    surface: '#2a2a2a',
    error: THEME.colors.error,
  },
}

export const BrandColors = {
  purple: THEME.colors.primary,
  pink: THEME.colors.secondary,
  gold: THEME.colors.gold,
  gray: '#6B7280',
  lavender: THEME.colors.lavender,
  success: THEME.colors.success,
  warning: THEME.colors.warning,
  error: THEME.colors.error,
};

export const Fonts = {
  title: THEME.typography.title.fontFamily,
  subtitle: THEME.typography.subtitle.fontFamily,
  body: THEME.typography.body.fontFamily,
  bodyBold: THEME.typography.bodyBold.fontFamily,
  caption: THEME.typography.caption.fontFamily,
};
