// src/app/(app)/_layout.tsx

import Loader from "@/components/common/Loader/Loader";
import { useAuth } from "@/features/auth/providers/AuthProvider";
import { getRouteByRole } from "@/utils/routes/routeResolver";
import { Redirect, Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AppTabsLayout() {
    const { loading, user, isAuthenticated } = useAuth();

    // ✅ loading first
    if (loading) return <Loader />;

    // ✅ guest redirect
    if (!isAuthenticated || !user) {
        return (
            <Redirect
                href={getRouteByRole(undefined, { isAuthenticated: false })}
            />
        );
    }

    // ✅ USER ONLY enforcement
    if (user.role !== "USER") {
        return (
            <Redirect
                href={getRouteByRole(user.role, { isAuthenticated: true })}
            />
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <Slot />
        </SafeAreaView>
    );
}