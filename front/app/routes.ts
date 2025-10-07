import { index, layout, prefix, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("confirm-email", "routes/confirm-email.tsx"),
  route("confirm-email-message", "routes/confirm-email-message.tsx"),

  layout("routes/layout.tsx", [
    ...prefix("profile", [
      index("routes/profile/profile.tsx"),
      route("edit-jobseeker", "routes/profile/jobseeker-profile-editor.tsx"),
      route("edit-employer", "routes/profile/employer-profile-editor.tsx"),
    ]),

    route("jobs", "routes/jobs.tsx"),
    route("apply/:jobId", "routes/application.tsx"),
    route("applications/:jobseekerId", "routes/applications.tsx"),
  ]),
  
  layout("routes/auth/layout.tsx", [
    route("login", "routes/auth/login.tsx"),
    route("register", "routes/auth/register.tsx"),
  ]),
] satisfies RouteConfig;
