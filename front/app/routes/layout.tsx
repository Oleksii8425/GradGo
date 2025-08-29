import { Outlet } from "react-router";
import NavBar from "~/NavBar";

export default function Layout() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <NavBar />
      <div className="flex justify-center flex-1 p-6 rounded-2xl">
        <Outlet />
      </div>
    </div>
  );
}
