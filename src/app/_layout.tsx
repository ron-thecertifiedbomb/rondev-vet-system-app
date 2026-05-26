// src/app/(web)/_layout.tsx
import { toastConfig } from "@/components/common/CustomToast/toastConfig";
import "@/global.css";
import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function RootLayout() {


  return (
    <SafeAreaView style={{ flex: 1, flexDirection: "row" }}>
      <Toast
        config={toastConfig}
        position="top"
        topOffset={500} // ✅ balanced center
      />
      <Slot />

    </SafeAreaView>
  );
}