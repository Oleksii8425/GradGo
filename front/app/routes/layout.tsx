import { Outlet } from "react-router";
import NavBar from "~/components/NavBar";

export default function Layout() {
  return (
    <div className="min-h-screen w-screen flex flex-col">
      <NavBar />
      <div className="flex-1 flex justify-center items-stretch p-6">
        <Outlet />
      </div>
    </div>
  );
}
