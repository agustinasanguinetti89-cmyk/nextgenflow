import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { THEME } from '../constants/theme';
import { ButtonPrimary } from './Button';

export const ServiceCard = ({ title, subtitle, price, icon, onPress, expanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(expanded);

  return (
    <TouchableOpacity
      onPress={() => setIsExpanded(!isExpanded)}
      style={[styles.serviceCard, isExpanded && styles.serviceCardExpanded]}
      activeOpacity={0.95}
    >
      <View style={styles.serviceCardHeader}>
        <View style={styles.serviceCardIcon}>
          <Text style={{ fontSize: 24 }}>{icon}</Text>
        </View>
        <View style={styles.serviceCardTitle}>
          <Text style={[THEME.typography.h3, { color: THEME.colors.dark }]}>
            {title}
          </Text>
          <Text style={[THEME.typography.small, { color: THEME.colors.gray }]}>
            {subtitle}
          </Text>
        </View>
        <Text style={[THEME.typography.h2, { color: THEME.colors.primary }]}>
          €{price}
        </Text>
      </View>

      {isExpanded && (
        <View style={styles.serviceCardFeatures}>
          <Text style={[THEME.typography.body, { color: THEME.colors.text, marginBottom: THEME.spacing.md }]}>
            Incluye:
          </Text>
          <Text style={[THEME.typography.small, { color: THEME.colors.gray, marginBottom: THEME.spacing.sm }]}>
            ✓ Análisis completo de procesos
          </Text>
          <Text style={[THEME.typography.small, { color: THEME.colors.gray, marginBottom: THEME.spacing.sm }]}>
            ✓ Informe PDF personalizado
          </Text>
          <Text style={[THEME.typography.small, { color: THEME.colors.gray, marginBottom: THEME.spacing.lg }]}>
            ✓ Recomendaciones 1:1
          </Text>
          <ButtonPrimary title="Contratar ahora" onPress={onPress} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  serviceCard: {
    backgroundColor: THEME.colors.white,
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.lg,
    marginBottom: THEME.spacing.lg,
    borderWidth: 1,
    borderColor: `${THEME.colors.primary}20`,
    ...THEME.shadows.md,
  },
  serviceCardExpanded: {
    backgroundColor: `${THEME.colors.light}50`,
    borderColor: THEME.colors.primary,
  },
  serviceCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: THEME.spacing.md,
  },
  serviceCardIcon: {
    width: 50,
    height: 50,
    borderRadius: THEME.borderRadius.base,
    backgroundColor: `${THEME.colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: THEME.spacing.md,
  },
  serviceCardTitle: {
    flex: 1,
  },
  serviceCardFeatures: {
    borderTopWidth: 1,
    borderTopColor: `${THEME.colors.gray}20`,
    paddingTop: THEME.spacing.lg,
    marginTop: THEME.spacing.lg,
  },
});
