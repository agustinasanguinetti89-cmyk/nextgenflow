import { Tabs } from "expo-router";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { THEME } from "@/constants/theme";

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: THEME.colors.secondary,
        tabBarInactiveTintColor: THEME.colors.mediumGray,
        headerShown: false,
        tabBarStyle: {
          paddingBottom: insets.bottom,
          height: 60 + insets.bottom,
          backgroundColor: THEME.colors.white,
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter-SemiBold',
          fontSize: 10,
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="mini"
        options={{
          title: "Mini",
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="leaf.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="pro"
        options={{
          title: "Pro",
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="star.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="combo-quick-win"
        options={{
          title: "Quick Win",
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="bolt.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="combo-full-stack"
        options={{
          title: "Full Stack",
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="layers.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="formacion"
        options={{
          title: "Formación",
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="book.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="result"
        options={{
          href: null, // Ocultar de la barra de pestañas
        }}
      />
    </Tabs>
  );
}
