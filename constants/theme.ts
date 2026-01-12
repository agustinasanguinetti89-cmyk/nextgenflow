export const THEME = {
  colors: {
    primary: '#3a2459',
    secondary: '#751f82',
    accent: '#D4AF37',
    background: '#f6f3f7',
    white: '#ffffff',
    dark: '#1a1a1a',
    gray: '#6b7280',
    lightGray: '#f3f4f6',
    success: '#10b981',
    error: '#ef4444',
  },
  gradients: {
    hero: ['#3a2459', '#751f82'],
    button: ['#751f82', '#3a2459'],
    card: ['#ffffff', '#f6f3f7'],
  },
  spacing: {
    xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48, hero: 80,
  },
  borderRadius: {
    none: 0, sm: 6, base: 8, md: 12, lg: 24, full: 9999,
  },
  shadows: {
    sm: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 },
    md: { shadowColor: '#3a2459', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  },
  typography: {
    h1: { fontSize: 32, fontFamily: 'Montserrat-Bold', lineHeight: 40 },
    h2: { fontSize: 24, fontFamily: 'Montserrat-Bold', lineHeight: 32 },
    h3: { fontSize: 20, fontFamily: 'Montserrat-SemiBold', lineHeight: 28 },
    body: { fontSize: 16, fontFamily: 'Inter-Regular', lineHeight: 24 },
    small: { fontSize: 14, fontFamily: 'Inter-Regular', lineHeight: 20 },
    button: { fontSize: 16, fontFamily: 'Montserrat-Bold', textTransform: 'uppercase' },
  }
};
export const Colors = THEME.colors;
export const BrandColors = [THEME.colors.primary, THEME.colors.secondary];
