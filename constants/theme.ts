/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

// Brand colors for Diagnosis App
const primaryPurple = "#3a2459"; // Primary brand purple
const secondaryPink = "#751f82"; // Secondary brand pink
const accentGold = "#D4AF37"; // CTA gold
const grayButton = "#6B7280"; // Mini Gratis button
const lightGray = "#9CA3AF"; // Disabled states

const tintColorLight = secondaryPink;
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    primary: primaryPurple,
    secondary: secondaryPink,
    accent: accentGold,
    gray: grayButton,
    error: "#EF4444",
    success: "#10B981",
    surface: "#F3F4F6",
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    primary: primaryPurple,
    secondary: secondaryPink,
    accent: accentGold,
    gray: grayButton,
    error: "#EF4444",
    success: "#10B981",
    surface: "#2D3748",
  },
};

// Brand color constants for easy reference
export const BrandColors = {
  purple: primaryPurple,
  pink: secondaryPink,
  gold: accentGold,
  gray: grayButton,
  lightGray: lightGray,
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
