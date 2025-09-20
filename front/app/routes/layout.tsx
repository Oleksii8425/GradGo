import { Outlet } from "react-router";
import NavBar from "~/components/NavBar";

export default function Layout() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <NavBar />
      <div className="flex-1 min-h-0 flex justify-center py-6">
        <Outlet />
      </div>
    </div>
  );
}
