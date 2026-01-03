export const THEME = {
  colors: {
    dark: '#3a2459',      // Morado oscuro
    primary: '#751f82',   // Rosa neón
    light: '#f6f3f7',     // Lavanda claro
    text: '#2a2a2a',      // Gris oscuro
    gray: '#8a8a8a',      // Gris medio
    white: '#ffffff',
    success: '#10B981',
    error: '#EF4444',
    gold: '#D4AF37',
  },
  gradients: {
    hero: ['#3a2459', '#2d1a3e', '#751f82', '#5a1570'],
    section: ['#f6f3f7', '#faf8fb'],
    button: ['#751f82', '#5a1570'],
  },
  spacing: {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    '3xl': 80,
    '4xl': 120,
  },
  borderRadius: {
    sm: 6,
    base: 8,
    md: 12,
    lg: 16,
    xl: 20,
    full: 9999,
  },
  typography: {
    h1: { fontSize: 36, fontWeight: '700', fontFamily: 'Montserrat' },
    h2: { fontSize: 28, fontWeight: '700', fontFamily: 'Montserrat' },
    h3: { fontSize: 24, fontWeight: '600', fontFamily: 'Montserrat' },
    body: { fontSize: 16, fontWeight: '400', fontFamily: 'Inter' },
    small: { fontSize: 14, fontWeight: '400', fontFamily: 'Inter' },
    tiny: { fontSize: 12, fontWeight: '400', fontFamily: 'Inter' },
  },
  shadows: {
    sm: {
      shadowColor: '#3a2459',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    },
    md: {
      shadowColor: '#3a2459',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
      elevation: 4,
    },
    lg: {
      shadowColor: '#3a2459',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.16,
      shadowRadius: 16,
      elevation: 8,
    },
  },
};
