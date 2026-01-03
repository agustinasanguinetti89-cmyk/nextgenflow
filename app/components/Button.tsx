import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { THEME } from '../constants/theme';

export const ButtonPrimary = ({ title, onPress, loading = false }) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={loading}
    style={[styles.buttonPrimary, loading && styles.buttonDisabled]}
    activeOpacity={0.9}
  >
    <Text style={styles.buttonPrimaryText}>
      {loading ? '⏳ Cargando...' : title}
    </Text>
  </TouchableOpacity>
);

export const ButtonSecondary = ({ title, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.buttonSecondary}
    activeOpacity={0.8}
  >
    <Text style={styles.buttonSecondaryText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  buttonPrimary: {
    backgroundColor: THEME.colors.primary,
    paddingHorizontal: THEME.spacing.lg,
    paddingVertical: THEME.spacing.md,
    borderRadius: THEME.borderRadius.base,
    alignItems: 'center',
    ...THEME.shadows.md,
  },
  buttonPrimaryText: {
    color: THEME.colors.white,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Montserrat',
  },
  buttonSecondary: {
    borderWidth: 2,
    borderColor: THEME.colors.primary,
    paddingHorizontal: THEME.spacing.lg,
    paddingVertical: THEME.spacing.md,
    borderRadius: THEME.borderRadius.base,
    alignItems: 'center',
  },
  buttonSecondaryText: {
    color: THEME.colors.primary,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Montserrat',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});
