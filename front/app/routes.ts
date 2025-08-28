import { index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("jobs", "routes/jobs.tsx"),
  route("profile", "routes/profile.tsx"),
  route("login", "routes/login.tsx"),
  route("register", "routes/register.tsx"),
  route("confirm-email", "routes/confirm-email.tsx"),
  route("users", "routes/users.tsx")
];