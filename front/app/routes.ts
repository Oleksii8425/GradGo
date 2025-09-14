import { index, layout, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("confirm-email", "routes/confirm-email.tsx"),

  layout("routes/layout.tsx", [
    route("profile", "routes/profile.tsx"),
    route("jobs", "routes/jobs.tsx"),
    route("apply/:jobId", "routes/application.tsx"),
  ]),
  
  layout("routes/auth/layout.tsx", [
    route("login", "routes/auth/login.tsx"),
    route("register", "routes/auth/register.tsx"),
  ]),
] satisfies RouteConfig;
