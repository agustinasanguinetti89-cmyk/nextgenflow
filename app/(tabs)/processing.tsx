import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors, BrandColors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function ProcessingScreen() {
  const router = useRouter();
  const { plan } = useLocalSearchParams<{ plan: string }>();
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const colors = Colors[colorScheme ?? "light"];

  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("Validando datos...");

  const statusMessages = [
    "Validando datos...",
    "Procesando con IA...",
    "Generando reporte...",
    "Finalizando...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 25;
        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        return next;
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const messageIndex = Math.floor((progress / 100) * statusMessages.length);
    if (messageIndex < statusMessages.length) {
      setStatusMessage(statusMessages[messageIndex]);
    }
  }, [progress]);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        router.push({
          pathname: "/(tabs)/result",
          params: { plan },
        });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [progress, plan, router]);

  return (
    <ThemedView style={styles.container}>
      <View
        style={[
          styles.content,
          {
            paddingTop: Math.max(insets.top, 20),
            paddingBottom: Math.max(insets.bottom, 20),
          },
        ]}
      >
        {/* Loading Indicator */}
        <View style={styles.loaderContainer}>
          <ActivityIndicator
            size="large"
            color={BrandColors.purple}
            style={styles.spinner}
          />

          {/* Progress Ring (visual representation) */}
          <View style={styles.progressRing}>
            <ThemedText
              type="title"
              style={[styles.progressText, { color: BrandColors.purple }]}
            >
              {Math.round(progress)}%
            </ThemedText>
          </View>
        </View>

        {/* Title */}
        <ThemedText type="title" style={styles.title}>
          Analizando tu negocio...
        </ThemedText>

        {/* Status Message */}
        <ThemedText
          type="default"
          style={[styles.statusMessage, { color: colors.text }]}
        >
          {statusMessage}
        </ThemedText>

        {/* Estimated Time */}
        <ThemedText
          type="default"
          style={[styles.estimatedTime, { color: colors.icon }]}
        >
          Esto toma ~30 segundos
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  loaderContainer: {
    alignItems: "center",
    marginBottom: 40,
    position: "relative",
    width: 150,
    height: 150,
  },
  spinner: {
    position: "absolute",
  },
  progressRing: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#E5E7EB",
  },
  progressText: {
    fontSize: 32,
    fontWeight: "700",
  },
  title: {
    marginBottom: 16,
    textAlign: "center",
  },
  statusMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
    minHeight: 24,
  },
  estimatedTime: {
    fontSize: 14,
    textAlign: "center",
  },
});
