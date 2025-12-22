import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Pressable,
  TextInput,
  Text,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors, BrandColors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

interface PrepInfoData {
  sector: string;
  teamSize: string;
  currentTools: string[];
  urgency: string;
  additionalNotes: string;
}

export default function PrepInfoScreen() {
  const router = useRouter();
  const { plan, formData } = useLocalSearchParams<{
    plan: string;
    formData?: string;
  }>();
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const colors = Colors[colorScheme ?? "light"];

  const [prepData, setPrepData] = useState<PrepInfoData>({
    sector: "",
    teamSize: "",
    currentTools: [],
    urgency: "",
    additionalNotes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const isPro = plan === "pro";

  const sectorOptions = [
    "Tecnología",
    "Consultoría",
    "E-commerce",
    "Marketing/Agencia",
    "Finanzas",
    "Logística",
    "Educación",
    "Otro",
  ];

  const teamSizeOptions = ["1-5", "5-10", "10-50", "50-100", "100+"];

  const toolsOptions = [
    "Excel",
    "Google Sheets",
    "Salesforce",
    "HubSpot",
    "Zapier",
    "Make",
    "n8n",
    "Otro",
  ];

  const urgencyOptions = ["Baja", "Media", "Alta"];

  const toggleTool = (tool: string) => {
    setPrepData((prev) => {
      const tools = prev.currentTools.includes(tool)
        ? prev.currentTools.filter((t) => t !== tool)
        : [...prev.currentTools, tool];
      return { ...prev, currentTools: tools };
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulate API call to webhook with combined data
    const combinedData = {
      ...JSON.parse(formData || "{}"),
      ...prepData,
    };

    console.log("Enviando datos a webhook:", combinedData);

    // Simulate webhook call
    setTimeout(() => {
      setIsSubmitting(false);
      router.push({
        pathname: "/(tabs)/processing",
        params: { plan },
      });
    }, 500);
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
          <Pressable onPress={() => router.back()}>
            <ThemedText type="link" style={{ color: BrandColors.purple }}>
              ← Volver
            </ThemedText>
          </Pressable>
        </View>

        {/* Section Title */}
        <View style={styles.sectionTitle}>
          <ThemedText type="subtitle">Información Adicional</ThemedText>
          <ThemedText
            type="default"
            style={[styles.sectionSubtitle, { color: colors.icon }]}
          >
            Ayúdanos a personalizar tu diagnóstico
          </ThemedText>
        </View>

        {/* Sector */}
        <View style={styles.fieldContainer}>
          <ThemedText type="defaultSemiBold" style={styles.fieldLabel}>
            ¿Cuál es tu sector/industria?
          </ThemedText>
          <View style={styles.selectContainer}>
            {sectorOptions.map((option) => (
              <Pressable
                key={option}
                onPress={() => setPrepData({ ...prepData, sector: option })}
                style={[
                  styles.selectOption,
                  {
                    backgroundColor:
                      prepData.sector === option
                        ? BrandColors.purple
                        : colors.surface,
                    borderColor:
                      prepData.sector === option
                        ? BrandColors.purple
                        : colors.icon,
                  },
                ]}
              >
                <ThemedText
                  type="default"
                  style={{
                    color: prepData.sector === option ? "#fff" : colors.text,
                  }}
                >
                  {option}
                </ThemedText>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Team Size */}
        <View style={styles.fieldContainer}>
          <ThemedText type="defaultSemiBold" style={styles.fieldLabel}>
            ¿Cuántas personas en tu equipo?
          </ThemedText>
          <View style={styles.selectContainer}>
            {teamSizeOptions.map((option) => (
              <Pressable
                key={option}
                onPress={() => setPrepData({ ...prepData, teamSize: option })}
                style={[
                  styles.selectOption,
                  {
                    backgroundColor:
                      prepData.teamSize === option
                        ? BrandColors.purple
                        : colors.surface,
                    borderColor:
                      prepData.teamSize === option
                        ? BrandColors.purple
                        : colors.icon,
                  },
                ]}
              >
                <ThemedText
                  type="default"
                  style={{
                    color:
                      prepData.teamSize === option ? "#fff" : colors.text,
                  }}
                >
                  {option}
                </ThemedText>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Current Tools */}
        <View style={styles.fieldContainer}>
          <ThemedText type="defaultSemiBold" style={styles.fieldLabel}>
            ¿Qué herramientas usas actualmente? (Selecciona múltiples)
          </ThemedText>
          <View style={styles.toolsContainer}>
            {toolsOptions.map((tool) => (
              <Pressable
                key={tool}
                onPress={() => toggleTool(tool)}
                style={[
                  styles.toolChip,
                  {
                    backgroundColor: prepData.currentTools.includes(tool)
                      ? BrandColors.purple
                      : colors.surface,
                    borderColor: prepData.currentTools.includes(tool)
                      ? BrandColors.purple
                      : colors.icon,
                  },
                ]}
              >
                <ThemedText
                  type="default"
                  style={{
                    color: prepData.currentTools.includes(tool)
                      ? "#fff"
                      : colors.text,
                    fontSize: 13,
                  }}
                >
                  {tool}
                </ThemedText>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Urgency */}
        <View style={styles.fieldContainer}>
          <ThemedText type="defaultSemiBold" style={styles.fieldLabel}>
            ¿Cuál es tu nivel de urgencia?
          </ThemedText>
          <View style={styles.selectContainer}>
            {urgencyOptions.map((option) => (
              <Pressable
                key={option}
                onPress={() => setPrepData({ ...prepData, urgency: option })}
                style={[
                  styles.selectOption,
                  {
                    backgroundColor:
                      prepData.urgency === option
                        ? BrandColors.purple
                        : colors.surface,
                    borderColor:
                      prepData.urgency === option
                        ? BrandColors.purple
                        : colors.icon,
                  },
                ]}
              >
                <ThemedText
                  type="default"
                  style={{
                    color: prepData.urgency === option ? "#fff" : colors.text,
                  }}
                >
                  {option}
                </ThemedText>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Additional Notes */}
        <View style={styles.fieldContainer}>
          <ThemedText type="defaultSemiBold" style={styles.fieldLabel}>
            Notas adicionales (opcional)
          </ThemedText>
          <TextInput
            style={[
              styles.textAreaInput,
              {
                borderColor: colors.icon,
                color: colors.text,
              },
            ]}
            placeholder="Comparte cualquier detalle adicional que creas relevante..."
            placeholderTextColor={colors.icon}
            value={prepData.additionalNotes}
            onChangeText={(text) =>
              setPrepData({ ...prepData, additionalNotes: text })
            }
            maxLength={500}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Submit Button */}
        <Pressable
          onPress={handleSubmit}
          disabled={isSubmitting}
          style={({ pressed }) => [
            styles.submitButton,
            {
              backgroundColor: isPro ? BrandColors.gold : BrandColors.purple,
              opacity: isSubmitting ? 0.6 : pressed ? 0.9 : 1,
            },
          ]}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <ThemedText
              type="defaultSemiBold"
              style={[
                styles.submitButtonText,
                { color: isPro ? "#1a1a1a" : "#fff" },
              ]}
            >
              Procesar Diagnóstico
            </ThemedText>
          )}
        </Pressable>

        {/* Skip Button (optional) */}
        <Pressable
          onPress={() => {
            setIsSubmitting(true);
            setTimeout(() => {
              setIsSubmitting(false);
              router.push({
                pathname: "/(tabs)/processing",
                params: { plan },
              });
            }, 300);
          }}
          disabled={isSubmitting}
          style={{ opacity: isSubmitting ? 0.5 : 1 }}
        >
          <ThemedText
            type="link"
            style={[styles.skipButton, { color: BrandColors.purple }]}
          >
            Omitir (no recomendado)
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
  },
  sectionTitle: {
    marginBottom: 24,
    alignItems: "center",
  },
  sectionSubtitle: {
    marginTop: 4,
    fontSize: 14,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    marginBottom: 8,
    fontSize: 14,
  },
  selectContainer: {
    gap: 8,
  },
  selectOption: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    minHeight: 44,
    justifyContent: "center",
  },
  toolsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  toolChip: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  textAreaInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    minHeight: 80,
    textAlignVertical: "top",
  },
  submitButton: {
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 24,
    minHeight: 48,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 12,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  skipButton: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
    paddingVertical: 12,
  },
});
