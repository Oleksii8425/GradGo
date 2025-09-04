import type { Route } from "./+types/Home";
import NavBar from "~/NavBar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "GradGO" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <NavBar />;
}
