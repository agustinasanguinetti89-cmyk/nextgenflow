import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacit, Image } from 'react-native';
import { THEME } from '@/constants/theme';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  const services = [
    { id: 'mini', title: 'Mini Diagnóstico', price: 'GRATIS', color: THEME.colors.primary, route: '/mini' },
    { id: 'pro', title: 'Diagnóstico PRO', price: '€297', color: THEME.colors.gold, route: '/pro' },
    { id: 'quick', title: 'Combo Quick Win', price: '€2.100', color: THEME.colors.secondary, route: '/combo-quick-win' },
    { id: 'full', title: 'Combo Full Stack', price: '€2.990', color: THEME.colors.primary, route: '/combo-full-stack' },
    { id: 'edu', title: 'Formación', price: '€400', color: THEME.colors.secondary, route: '/formacion' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
                <Image source={require('@/assets/images/logo-icon.png')} style={styles.logo} />
        <Text style={styles.brand}>NextGenFlow</Text>
        <Text style={styles.tagline}>Automatización Inteligente para tu Empresa</Text>
      </View>

      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Transforma tus procesos hoy</Text>
        <Text style={styles.heroSubtitle}>Selecciona el nivel de análisis que necesitas para escalar tu negocio.</Text>
      </View>

      <View style={styles.grid}>
        {services.map((service) => (
          <TouchableOpacity 
            key={service.id} 
            style={[styles.card, { borderLeftColor: service.color }]}
            onPress={() => router.push(service.route as any)}
          >
            <View>
              <Text style={styles.cardTitle}>{service.title}</Text>
              <Text style={[styles.cardPrice, { color: service.color }]}>{service.price}</Text>
            </View>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2026 Equipo NextGenFlow</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.colors.lavender },
  content: { padding: 24, paddingTop: 60 },
  header: { marginBottom: 40, alignItems: 'center' },
    logo: { width: 100, height: 100, marginBottom: 16 },
  brand: { fontFamily: 'Montserrat-Bold', fontSize: 24, color: THEME.colors.primary },
  tagline: { fontFamily: 'Inter-Regular', fontSize: 14, color: THEME.colors.mediumGray },
  hero: { marginBottom: 32 },
  heroTitle: { fontFamily: 'Montserrat-Bold', fontSize: 28, color: THEME.colors.darkGray, marginBottom: 8 },
  heroSubtitle: { fontFamily: 'Inter-Regular', fontSize: 16, color: THEME.colors.mediumGray, lineHeight: 24 },
  grid: { gap: 16 },
  card: {
    backgroundColor: THEME.colors.white,
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderLeftWidth: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  cardTitle: { fontFamily: 'Montserrat-SemiBold', fontSize: 18, color: THEME.colors.darkGray },
  cardPrice: { fontFamily: 'Inter-Bold', fontSize: 14, marginTop: 4 },
  arrow: { fontSize: 20, color: THEME.colors.mediumGray },
  footer: { marginTop: 40, alignItems: 'center', paddingBottom: 20 },
  footerText: { fontFamily: 'Inter-Regular', fontSize: 12, color: THEME.colors.mediumGray }
});
