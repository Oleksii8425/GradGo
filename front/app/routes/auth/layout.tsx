import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-6">
      <Outlet />
    </div>
  );
}
