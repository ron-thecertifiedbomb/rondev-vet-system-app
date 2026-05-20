import { Redirect } from "expo-router";
import { Platform } from "react-native";

const SHOW_DASHBOARD = false; // ✅ toggle here

export default function Index() {
  if (Platform.OS === "web") {
    if (SHOW_DASHBOARD) {
      return <Redirect href="/dashboard" />;
    }

    return <Redirect href="/home" />;
  }

  return <Redirect href="/home" />;
}