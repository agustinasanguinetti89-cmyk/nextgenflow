import { useRouter } from "expo-router";
import { Image } from "expo-image";
import {
  StyleSheet,
  View,
  ScrollView,
  Pressable,
  Text,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors, BrandColors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function LandingScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const colors = Colors[colorScheme ?? "light"];

  const handleMiniGratis = () => {
    router.push({
      pathname: "/form",
      params: { plan: "mini" },
    });
  };

  const handleProPlan = () => {
    router.push({
      pathname: "/form",
      params: { plan: "pro" },
    });
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: Math.max(insets.top, 16),
            paddingBottom: Math.max(insets.bottom, 16),
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <ThemedText
            type="defaultSemiBold"
            style={[styles.logo, { color: BrandColors.purple }]}
          >
            NextGenFlow.IA
          </ThemedText>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <ThemedText type="title" style={styles.heroTitle}>
            Diagnóstico IA Profesional
          </ThemedText>

          <ThemedText
            type="subtitle"
            style={[styles.heroSubtitle, { color: colors.text }]}
          >
            Descubre procesos que roban 10h/semana
          </ThemedText>

          {/* Highlight Box */}
          <View
            style={[
              styles.highlightBox,
              { backgroundColor: colors.surface },
            ]}
          >
            <ThemedText
              type="default"
              style={[styles.highlightText, { color: colors.text }]}
            >
              Análisis IA en 5 minutos. ROI € exacto antes de invertir. Blindado
              por Estándares PM: Charter + Risk Register + Go-Live.
            </ThemedText>
          </View>

          {/* Social Proof */}
          <View style={styles.socialProofSection}>
            <ThemedText
              type="default"
              style={[styles.socialProofText, { color: colors.text }]}
            >
              Usado por 200+ startups y PYMEs • ROI promedio: 750€/mes
            </ThemedText>

            <View style={styles.badgeContainer}>
              <Text style={styles.stars}>⭐⭐⭐⭐⭐</Text>
          <Text style={[styles.badgeText, { color: colors.text }]}>
            NPS 9/10 (promedio clientes)
          </Text>
            </View>
          </View>
        </View>

        {/* CTA Dual Buttons */}
        <View style={styles.ctaContainer}>
          {/* Mini Gratis Button (Left, Gray, Medium) */}
          <Pressable
            onPress={handleMiniGratis}
            style={({ pressed }) => [
              styles.buttonMini,
              {
                backgroundColor: BrandColors.gray,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <ThemedText
              type="defaultSemiBold"
              style={[styles.buttonMiniText, { color: "#fff" }]}
            >
              Mini Gratis
            </ThemedText>
            <Text style={[styles.buttonMiniSubtext, { color: "#fff" }]}>
              90 segundos | 1 proceso | ROI estimado
            </Text>
          </Pressable>

          {/* Pro 297€ Button (Right, Gold, Large) */}
          <Pressable
            onPress={handleProPlan}
            style={({ pressed }) => [
              styles.buttonPro,
              {
                backgroundColor: BrandColors.gold,
                opacity: pressed ? 0.9 : 1,
              },
            ]}
          >
            <ThemedText
              type="defaultSemiBold"
              style={[styles.buttonProText, { color: "#1a1a1a" }]}
            >
              Pro 297€
            </ThemedText>
            <Text style={[styles.buttonProSubtext, { color: "#1a1a1a" }]}>
              5 procesos | Análisis completo | Método Validado
            </Text>
          </Pressable>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.icon }]}>
            © 2025 NextGenFlow.IA | Automatización IA para PYMEs
          </Text>
          <View style={styles.footerLinks}>
            <Pressable>
              <ThemedText
                type="link"
                style={[styles.footerLink, { color: BrandColors.purple }]}
              >
                Servicios
              </ThemedText>
            </Pressable>
            <Text style={[{ color: colors.icon }]}>  •  </Text>
            <Pressable>
              <ThemedText
                type="link"
                style={[styles.footerLink, { color: BrandColors.purple }]}
              >
                Contacto
              </ThemedText>
            </Pressable>
            <Text style={[{ color: colors.icon }]}>  •  </Text>
            <Pressable>
              <ThemedText
                type="link"
                style={[styles.footerLink, { color: BrandColors.purple }]}
              >
                Privacidad
              </ThemedText>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  header: {
    marginBottom: 32,
    alignItems: "center",
  },
  logo: {
    fontSize: 18,
    letterSpacing: 0.5,
  },
  heroSection: {
    marginBottom: 32,
    alignItems: "center",
  },
  heroTitle: {
    marginBottom: 12,
    textAlign: "center",
  },
  heroSubtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  highlightBox: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  highlightText: {
    lineHeight: 22,
    textAlign: "center",
  },
  socialProofSection: {
    alignItems: "center",
    gap: 12,
  },
  socialProofText: {
    textAlign: "center",
    fontSize: 14,
    lineHeight: 20,
  },
  badgeContainer: {
    alignItems: "center",
    gap: 4,
  },
  stars: {
    fontSize: 16,
  },
  badgeText: {
    fontSize: 12,
    textAlign: "center",
  },
  ctaContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 32,
    justifyContent: "center",
  },
  buttonMini: {
    flex: 1,
    minWidth: 140,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 100,
  },
  buttonMiniText: {
    fontSize: 16,
    marginBottom: 4,
  },
  buttonMiniSubtext: {
    fontSize: 11,
    lineHeight: 14,
    textAlign: "center",
  },
  buttonPro: {
    flex: 1.2,
    minWidth: 160,
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 100,
  },
  buttonProText: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  buttonProSubtext: {
    fontSize: 11,
    lineHeight: 14,
    textAlign: "center",
  },
  footer: {
    marginTop: "auto",
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    alignItems: "center",
    gap: 8,
  },
  footerText: {
    textAlign: "center",
    fontSize: 12,
  },
  footerLinks: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  footerLink: {
    fontSize: 12,
    fontWeight: "500",
  },
});
