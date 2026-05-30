import { routes } from "@/utils/routes/constants/routes";


type Role = "USER" | "ADMIN" | "STAFF";

export function getRouteByRole(role: Role, platform: "web" | "app") {
  switch (role) {
    case "ADMIN":
      return routes.admin[platform];

    case "STAFF":
      return routes.admin[platform]; // 👈 for now reuse admin flow

    case "USER":
    default:
      return routes.user[platform];
  }
}
