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

  // ✅ NUEVO: Sistema de gradientes (alineado con web NextgenPM.IA)
  gradients: {
    // Hero sections y backgrounds grandes
    hero: ['#3a2459', '#2d1a3e', '#751f82', '#5a1570'],
    
    // Secciones de contenido
    section: ['#f6f3f7', '#faf8fb'],
    
    // Textos y títulos destacados
    text: ['#751f82', '#3a2459'],
    
    // Botones primarios
    button: ['#751f82', '#5a1570'],
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
    xxl: 48,      // Corrección: era 40 → ahora 48
    '3xl': 80,    // NUEVO: para hero sections
    '4xl': 120    // NUEVO: para landing hero
  },
  borderRadius: {
    sm: 6,      // Corrección: era 8 → ahora 6
    base: 8,    // NUEVO: valor base
    md: 12,     // Corrección: era 10 → ahora 12
    lg: 16,     // Corrección: era 12 → ahora 16
    xl: 16,     // Sin cambios
    full: 9999  // NUEVO: para pills y círculos
  },
  shadows: {
    sm: {
      shadowColor: '#3a2459',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2
    },
    md: {
      shadowColor: '#3a2459',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
      elevation: 4
    },
    lg: {
      shadowColor: '#3a2459',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.16,
      shadowRadius: 16,
      elevation: 8
    },
    soft: {
      shadowColor: '#3a2459',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3
    },
    hover: {
      shadowColor: '#751f82',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.2,
      shadowRadius: 12,
      elevation: 6
    }
  },
  // ✅ NUEVO: Sistema de animaciones
  animations: {
    // Duraciones estándar (milisegundos)
    duration: {
      fast: 150,      // Micro-interacciones: hover, press
      normal: 250,    // Transiciones estándar: navegación, cambios UI
      slow: 400       // Transiciones complejas: modals, slides
    },
    
    // Easing functions
    easing: {
      standard: 'ease-in-out',  // Para CSS/equivalentes Web
      
      // Para React Native Animated API
      spring: {
        damping: 15,
        stiffness: 150,
        mass: 1
      }
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
