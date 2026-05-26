// src/app/(web)/_layout.tsx

import { Slot, usePathname, Redirect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";

import { getStorageItem } from "@/features/auth/storage";

export default function WebUserLayout() {
  const pathname = usePathname();

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSession() {
      const token = await getStorageItem("access_token");
      const storedUser = await getStorageItem("user");

      setAccessToken(token);

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    }
    loadSession();
  }, []);

  // ✅ prevent flicker / premature redirect
  if (loading) return null;

  // ✅ not authenticated
  if (!accessToken) {
    return <Redirect href="/(auth)/login" />;
  }

  // ✅ NOT a USER → block access
  if (user?.role !== "USER") {
    return <Redirect href="/(admin-web)/dashboard" />;
  }

  // ✅ prevent root reroute only
  if (pathname === "/") {
    return <Redirect href="/(web)/home" />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Slot />
    </SafeAreaView>
  );
}
