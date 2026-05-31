// src/app/(staff-app)/_layout.tsx

import Loader from "@/components/common/Loader/Loader";
import { Redirect, Slot } from "expo-router";
import { Platform } from "react-native";
import { useAuth } from "@/features/auth/providers/AuthProvider";
import { getRouteByRole } from "@/utils/routes/routeResolver";

export default function StaffAppLayout() {
    const { loading, user, isAuthenticated } = useAuth();

    // ✅ loading first
    if (loading) return <Loader fullScreen={false} size="small" />;

    // ✅ not authenticated
    if (!isAuthenticated || !user) {
        return <Redirect href="/(auth)/login" />;
    }

    // ✅ block web (this is mobile-only staff app)
    if (Platform.OS === "web") {
        return <Redirect href="/(admin-web)/dashboard" />;
    }

    // ✅ STAFF ONLY enforcement
    if (user.role !== "STAFF") {
        return (
            <Redirect
                href={getRouteByRole(user.role, { isAuthenticated: true })}
            />
        );
    }

    return <Slot />;
}