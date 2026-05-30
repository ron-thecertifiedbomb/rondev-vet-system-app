// src/app/(auth)/_layout.tsx

// src/app/(auth)/_layout.tsx

import Loader from "@/components/common/Loader/Loader";
import { useAuth } from "@/features/auth/providers/AuthProvider";
import { routes } from "@/utils/routes/constants/routes";
import { Redirect, Slot } from "expo-router";
import { Platform } from "react-native";

export default function AuthLayout() {
    const { isAuthenticated, loading, user } = useAuth();

    const target = user?.role === "ADMIN"
        ? routes.admin
        : routes.user;

    const isWeb = Platform.OS === "web";

    // ✅ Wait for auth hydration
    if (loading) return <Loader />;

    // ✅ If already logged in → redirect OUT of auth pages
    if (isAuthenticated) {
        return <Redirect href={isWeb ? target.web : target.app} />;
    }

    // ✅ If NOT authenticated → allow auth pages (login/register)
    return <Slot />;
}
