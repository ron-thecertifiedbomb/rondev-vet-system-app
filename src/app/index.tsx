// src/app/index.tsx

import { Redirect } from "expo-router";
import { Platform } from "react-native";

export default function Index() {
  // ✅ retrieve token
  const accessToken =
    typeof window !== "undefined"
      ? localStorage.getItem("access_token")
      : null;

  // ✅ retrieve user
  const storedUser =
    typeof window !== "undefined"
      ? localStorage.getItem("user")
      : null;

  const user = storedUser
    ? JSON.parse(storedUser)
    : null;

  const isLoggedIn = !!accessToken;
  const isAdmin = user?.role === "ADMIN";

  // ✅ not authenticated
  if (!isLoggedIn) {
    return <Redirect href="/(auth)/login" />;
  }

  // ✅ admin routing
  if (isAdmin) {
    return (
      <Redirect
        href={
          Platform.OS === "web"
            ? "/(admin-web)/dashboard"
            : "/(admin-app)/dashboard"
        }
      />
    );
  }

  // ✅ normal user routing
  return (
    <Redirect
      href={
        Platform.OS === "web"
          ? "/(web)/home"
          : "/(app)/home"
      }
    />
  );
}