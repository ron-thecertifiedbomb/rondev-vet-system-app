import { Platform } from "react-native";
import { routes } from "@/utils/routes/constants/routes";

type Role = "USER" | "ADMIN" | "STAFF";
type PlatformType = "web" | "app";

type RouteOptions = {
  isAuthenticated?: boolean;
};

// ✅ auto detect platform
function getPlatform(): PlatformType {
  return Platform.OS === "web" ? "web" : "app";
}

// ✅ handle mixed route types
function resolveRoute(route: any, platform: PlatformType): string {
  if (typeof route === "string") return route;
  return route[platform];
}

// ✅ centralized routing
export function getRouteByRole(
  role?: Role,
  { isAuthenticated = false }: RouteOptions = {},
) {
  const platform = getPlatform();

  if (!isAuthenticated || !role) {
    return resolveRoute(routes.public, platform);
  }

  switch (role) {
    case "ADMIN":
      return resolveRoute(routes.admin, platform);

    case "STAFF":
      return resolveRoute(routes.staff, platform);

    case "USER":
    default:
      return resolveRoute(routes.user, platform);
  }
}
