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
import Slider from "@react-native-community/slider";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors, BrandColors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

interface FormData {
  empresa: string;
  rol: string;
  horas: number;
  presupuesto: string;
  problema: string;
}

export default function FormScreen() {
  const router = useRouter();
  const { plan } = useLocalSearchParams<{ plan: string }>();
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const colors = Colors[colorScheme ?? "light"];

  const [formData, setFormData] = useState<FormData>({
    empresa: "",
    rol: "",
    horas: 15,
    presupuesto: "",
    problema: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isPro = plan === "pro";

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.empresa.trim() || formData.empresa.length < 3) {
      newErrors.empresa = "Mínimo 3 caracteres";
    }
    if (!formData.rol) {
      newErrors.rol = "Selecciona un rol";
    }
    if (formData.horas < 1 || formData.horas > 40) {
      newErrors.horas = "Entre 1-40 horas";
    }
    if (!formData.presupuesto) {
      newErrors.presupuesto = "Selecciona un presupuesto";
    }
    if (formData.problema.length < 20) {
      newErrors.problema = "Mínimo 20 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call to webhook
    setTimeout(() => {
      setIsSubmitting(false);
      router.push({
        pathname: "/(tabs)/processing",
        params: { plan },
      });
    }, 500);
  };

  const rolesOptions = [
    "CEO / Founder",
    "Director Operaciones",
    "PM / Project Manager",
    "Marketing Manager",
    "CFO / Director Finanzas",
    "Otro (specify)",
  ];

  const presupuestoOptions = [
    "Menos de 1.000€",
    "1.000-5.000€",
    "5.000-10.000€",
    "Más de 10.000€",
  ];

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
          <ThemedText type="subtitle">
            {isPro
              ? "PASO 1: Información para análisis profesional"
              : "PASO 1: Cuéntanos sobre tu negocio"}
          </ThemedText>
          <ThemedText
            type="default"
            style={[styles.sectionSubtitle, { color: colors.icon }]}
          >
            {isPro ? "(2 minutos)" : "(Toma 90 segundos)"}
          </ThemedText>
        </View>

        {/* Campo 1: Nombre Empresa */}
        <View style={styles.fieldContainer}>
          <ThemedText type="defaultSemiBold" style={styles.fieldLabel}>
            ¿Cuál es tu empresa?
          </ThemedText>
          <TextInput
            style={[
              styles.textInput,
              {
                borderColor: errors.empresa ? colors.error : colors.icon,
                color: colors.text,
              },
            ]}
            placeholder="Ej: TechStartup SL, Consultoría X, etc"
            placeholderTextColor={colors.icon}
            value={formData.empresa}
            onChangeText={(text) =>
              setFormData({ ...formData, empresa: text })
            }
            maxLength={100}
          />
          {errors.empresa && (
            <Text style={[styles.errorText, { color: colors.error }]}>
              {errors.empresa}
            </Text>
          )}
        </View>

        {/* Campo 2: Rol User */}
        <View style={styles.fieldContainer}>
          <ThemedText type="defaultSemiBold" style={styles.fieldLabel}>
            ¿Cuál es tu rol?
          </ThemedText>
          <View style={styles.selectContainer}>
            {rolesOptions.map((role) => (
              <Pressable
                key={role}
                onPress={() => setFormData({ ...formData, rol: role })}
                style={[
                  styles.selectOption,
                  {
                    backgroundColor:
                      formData.rol === role ? BrandColors.purple : colors.surface,
                    borderColor:
                      formData.rol === role ? BrandColors.purple : colors.icon,
                  },
                ]}
              >
                <ThemedText
                  type="default"
                  style={{
                    color: formData.rol === role ? "#fff" : colors.text,
                  }}
                >
                  {role}
                </ThemedText>
              </Pressable>
            ))}
          </View>
          {errors.rol && (
            <Text style={[styles.errorText, { color: colors.error }]}>
              {errors.rol}
            </Text>
          )}
        </View>

        {/* Campo 3: Horas Manuales/Semana */}
        <View style={styles.fieldContainer}>
          <ThemedText type="defaultSemiBold" style={styles.fieldLabel}>
            ¿Cuántas horas/semana gastas en tareas MANUALES?
          </ThemedText>
          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={40}
              step={1}
              value={Number(formData.horas)}
            onValueChange={(value: number) =>
              setFormData({ ...formData, horas: Math.round(value) })
            }
              minimumTrackTintColor={BrandColors.purple}
              maximumTrackTintColor={colors.icon}
            />
            <ThemedText type="defaultSemiBold" style={styles.sliderValue}>
              {formData.horas}/semana
            </ThemedText>
          </View>
          <ThemedText
            type="default"
            style={[styles.fieldHint, { color: colors.icon }]}
          >
            Reportes, emails, consolidar datos, seguimiento manual...
          </ThemedText>
        </View>

        {/* Campo 4: Presupuesto Disponible/Mes */}
        <View style={styles.fieldContainer}>
          <ThemedText type="defaultSemiBold" style={styles.fieldLabel}>
            ¿Cuál es tu presupuesto disponible para automatización?
          </ThemedText>
          <View style={styles.selectContainer}>
            {presupuestoOptions.map((option) => (
              <Pressable
                key={option}
                onPress={() => setFormData({ ...formData, presupuesto: option })}
                style={[
                  styles.selectOption,
                  {
                    backgroundColor:
                      formData.presupuesto === option
                        ? BrandColors.purple
                        : colors.surface,
                    borderColor:
                      formData.presupuesto === option
                        ? BrandColors.purple
                        : colors.icon,
                  },
                ]}
              >
                <ThemedText
                  type="default"
                  style={{
                    color:
                      formData.presupuesto === option ? "#fff" : colors.text,
                  }}
                >
                  {option}
                </ThemedText>
              </Pressable>
            ))}
          </View>
          <ThemedText
            type="default"
            style={[styles.fieldHint, { color: colors.icon }]}
          >
            Esto nos ayuda a priorizar soluciones
          </ThemedText>
        </View>

        {/* Campo 5: Descripción Problema */}
        <View style={styles.fieldContainer}>
          <ThemedText type="defaultSemiBold" style={styles.fieldLabel}>
            ¿Cuál es la PRINCIPAL frustración con procesos manuales?
          </ThemedText>
          <TextInput
            style={[
              styles.textAreaInput,
              {
                borderColor: errors.problema ? colors.error : colors.icon,
                color: colors.text,
              },
            ]}
            placeholder="Ej: Gasto 15h/semana en reportes Excel + clasificar leads manual..."
            placeholderTextColor={colors.icon}
            value={formData.problema}
            onChangeText={(text) =>
              setFormData({ ...formData, problema: text })
            }
            maxLength={500}
            multiline
            numberOfLines={4}
          />
          <View style={styles.charCounter}>
            <ThemedText
              type="default"
              style={{ color: colors.icon, fontSize: 12 }}
            >
              {formData.problema.length} / 500
            </ThemedText>
          </View>
          {errors.problema && (
            <Text style={[styles.errorText, { color: colors.error }]}>
              {errors.problema}
            </Text>
          )}
        </View>

        {/* Submit Button */}
        <Pressable
          onPress={handleSubmit}
          disabled={isSubmitting}
          style={({ pressed }) => [
            styles.submitButton,
            {
              backgroundColor: isPro ? BrandColors.gold : BrandColors.gray,
              opacity:
                isSubmitting || Object.keys(errors).length > 0
                  ? 0.6
                  : pressed
                    ? 0.9
                    : 1,
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
              {isPro
                ? "Continuar al Análisis Pro"
                : "Generar Mi Diagnóstico Gratis"}
            </ThemedText>
          )}
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
  fieldHint: {
    marginTop: 6,
    fontSize: 12,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    minHeight: 44,
  },
  textAreaInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    minHeight: 100,
    textAlignVertical: "top",
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
  sliderContainer: {
    gap: 12,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  sliderValue: {
    textAlign: "center",
    fontSize: 16,
  },
  charCounter: {
    marginTop: 6,
    alignItems: "flex-end",
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "500",
  },
  submitButton: {
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 24,
    minHeight: 48,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 16,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
