import { useLocalSearchParams, useRouter } from "expo-router";
import {
  StyleSheet,
  View,
  ScrollView,
  Pressable,
  Text,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors, BrandColors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function ResultScreen() {
  const router = useRouter();
  const { plan } = useLocalSearchParams<{ plan: string }>();
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const colors = Colors[colorScheme ?? "light"];

  const isPro = plan === "pro";

  const handleDownloadPDF = () => {
    Alert.alert(
      "Descargar PDF",
      "Tu diagnóstico se está descargando...",
      [{ text: "OK" }]
    );
  };

  const handleEmailPDF = () => {
    Alert.alert(
      "Enviar por Email",
      "Se ha enviado tu diagnóstico a tu correo electrónico.",
      [{ text: "OK" }]
    );
  };

  const handleBookCall = () => {
    Alert.alert(
      "Agendar Consultoría",
      "Redirigiendo a Calendly...",
      [{ text: "OK" }]
    );
  };

  const handleBackHome = () => {
    router.push("/");
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
          <ThemedText type="title" style={styles.title}>
            Tu Diagnóstico está listo
          </ThemedText>
        </View>

        {/* Summary Card */}
        <View
          style={[
            styles.summaryCard,
            { backgroundColor: colors.surface },
          ]}
        >
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <ThemedText type="default" style={styles.summaryLabel}>
                ROI Estimado
              </ThemedText>
              <ThemedText
                type="defaultSemiBold"
                style={[styles.summaryValue, { color: BrandColors.purple }]}
              >
                750€/mes
              </ThemedText>
            </View>

            <View style={styles.summaryDivider} />

            <View style={styles.summaryItem}>
              <ThemedText type="default" style={styles.summaryLabel}>
                Procesos
              </ThemedText>
              <ThemedText
                type="defaultSemiBold"
                style={[styles.summaryValue, { color: BrandColors.purple }]}
              >
                {isPro ? "5" : "1"}
              </ThemedText>
            </View>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <ThemedText type="default" style={styles.summaryLabel}>
                Tiempo Ahorrado
              </ThemedText>
              <ThemedText
                type="defaultSemiBold"
                style={[styles.summaryValue, { color: BrandColors.purple }]}
              >
                10h/semana
              </ThemedText>
            </View>

            <View style={styles.summaryDivider} />

            <View style={styles.summaryItem}>
              <ThemedText type="default" style={styles.summaryLabel}>
                Confianza
              </ThemedText>
              <ThemedText
                type="defaultSemiBold"
                style={[styles.summaryValue, { color: BrandColors.purple }]}
              >
                95%
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          {/* Download PDF Button */}
          <Pressable
            onPress={handleDownloadPDF}
            style={({ pressed }) => [
              styles.actionButton,
              {
                backgroundColor: BrandColors.purple,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <ThemedText
              type="defaultSemiBold"
              style={[styles.actionButtonText, { color: "#fff" }]}
            >
              📥 Descargar PDF
            </ThemedText>
          </Pressable>

          {/* Email Button */}
          <Pressable
            onPress={handleEmailPDF}
            style={({ pressed }) => [
              styles.actionButton,
              {
                backgroundColor: BrandColors.pink,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <ThemedText
              type="defaultSemiBold"
              style={[styles.actionButtonText, { color: "#fff" }]}
            >
              📧 Enviar por Email
            </ThemedText>
          </Pressable>

          {/* Book Call Button (Pro only) */}
          {isPro && (
            <Pressable
              onPress={handleBookCall}
              style={({ pressed }) => [
                styles.actionButton,
                {
                  backgroundColor: BrandColors.gold,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <ThemedText
                type="defaultSemiBold"
                style={[styles.actionButtonText, { color: "#1a1a1a" }]}
              >
                📞 Agendar Consultoría
              </ThemedText>
            </Pressable>
          )}
        </View>

        {/* Support Section */}
        <View style={styles.supportSection}>
          <ThemedText type="default" style={[styles.supportText, { color: colors.text }]}>
            ¿Preguntas o necesitas ayuda?
          </ThemedText>
          <Pressable>
            <ThemedText
              type="link"
              style={[styles.supportLink, { color: BrandColors.purple }]}
            >
              Contacta con soporte@nextgenpm.ia
            </ThemedText>
          </Pressable>
        </View>

        {/* Back Home Button */}
        <Pressable
          onPress={handleBackHome}
          style={({ pressed }) => [
            styles.backButton,
            { opacity: pressed ? 0.7 : 1 },
          ]}
        >
          <ThemedText
            type="link"
            style={[styles.backButtonText, { color: BrandColors.purple }]}
          >
            ← Volver al inicio
          </ThemedText>
        </Pressable>
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
    marginBottom: 24,
    alignItems: "center",
  },
  title: {
    textAlign: "center",
  },
  summaryCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
  },
  summaryItem: {
    flex: 1,
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: "700",
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: "#D1D5DB",
  },
  actionsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  actionButton: {
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    minHeight: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  supportSection: {
    alignItems: "center",
    paddingVertical: 16,
    marginBottom: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  supportText: {
    marginBottom: 4,
    fontSize: 14,
  },
  supportLink: {
    fontSize: 14,
    fontWeight: "500",
  },
  backButton: {
    paddingVertical: 12,
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
