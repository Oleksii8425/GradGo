import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 rounded-2xl">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome to GradGo</h1>
        <Outlet />
      </div>
    </div>
  );
}
