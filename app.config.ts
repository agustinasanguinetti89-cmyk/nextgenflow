// Load environment variables with proper priority (system > .env)
import "./scripts/load-env.js";
import type { ExpoConfig } from "expo/config";

// Bundle ID format: space.manus.<project_name_dots>.<timestamp>
const bundleId = "space.manus.nextgenflow.app";
const timestamp = bundleId.split(".").pop()?.replace(/^t/, "") ?? "";
const schemeFromBundleId = `manus${timestamp}`;

const env = {
  // App branding - update these values directly
  appName: 'NextGenFlow',
  appSlug: 'nextgenflow-app',
  // S3 URL of the app logo
  logoUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663245835719/DnbVwgVUchtdnDjd.png',
  scheme: schemeFromBundleId,
  iosBundleId: 'space.manus.nextgenflow.app',
  androidPackage: 'space.manus.nextgenflow.app',
};

const config: ExpoConfig = {
  name: 'NextGenFlow',
  slug: 'nextgenflow-app',
  platforms: ["ios", "android", "web"],
  version: "3.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: env.scheme,
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: env.iosBundleId,
    infoPlist: {
      UIBackgroundModes: ["audio"],
    },
  },
  android: {
    adaptiveIcon: {
      backgroundColor: "#3a2459",
      foregroundImage: "./assets/images/android-icon-foreground.png",
      backgroundImage: "./assets/images/android-icon-background.png",
      monochromeImage: "./assets/images/android-icon-monochrome.png",
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
    package: env.androidPackage,
    permissions: ["POST_NOTIFICATIONS"],
  },
  web: {
    output: "static",
    favicon: "./assets/images/icon.png",
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/logo-splash.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#3a2459",
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
};

export default config;
