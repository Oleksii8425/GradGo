import { index, layout, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("Routes/Home.tsx"),
  route("confirm-email", "Routes/ConfirmEmail.tsx"),

  layout("Routes/layout.tsx", [
    route("profile", "Routes/Profile.tsx"),
    route("jobs", "Routes/Jobs.tsx"),
  ]),
  
  layout("Routes/auth/Layout.tsx", [
    route("login", "Routes/Auth/Login.tsx"),
    route("register", "Routes/Auth/Register.tsx"),
  ]),
] satisfies RouteConfig;