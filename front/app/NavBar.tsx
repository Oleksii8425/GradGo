import type { ReactNode } from "react";
import { NavLink } from "react-router";

interface NavLinkProps {
  to: string,
  children: ReactNode
};

function MyNavLink({ to, children }: NavLinkProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `p-2 border-b-2 ${isActive
          ? "border-gray-300 text-gray-300 font-bold"
          : "border-slate-900 hover:border-gray-300"
        }`
      }
    >
      {children}
    </NavLink>
  );
}

function NavBar() {
  return (
    <div className="w-full flex items-start bg-slate-900">
      <MyNavLink to="/jobs">Jobs</MyNavLink>
      <MyNavLink to="/profile">Profile</MyNavLink>
    </div>
  );
}

export default NavBar;