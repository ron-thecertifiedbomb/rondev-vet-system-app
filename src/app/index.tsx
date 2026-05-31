// src/app/index.tsx

import Loader from "@/components/common/Loader/Loader";
import { useAuth } from "@/features/auth/providers/AuthProvider";
import { getRouteByRole } from "@/utils/routes/routeResolver";
import { Redirect } from "expo-router";

export default function Index() {
  const { loading, user, isAuthenticated } = useAuth();

  // ✅ loading first
  if (loading) {
    return <Loader fullScreen />;
  }

  // ✅ guest → login
  if (!user || !isAuthenticated) {
    return <Redirect href={getRouteByRole(undefined, { isAuthenticated: false })} />;
  }

  // ✅ central routing (handles role + platform)
  return (
    <Redirect
      href={getRouteByRole(user.role, { isAuthenticated: true })}
    />
  );
}