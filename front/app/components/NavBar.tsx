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
          ? " text-white font-bold"
          : "border-slate-900 hover:border-slate-300"
        }`
      }
    >
      {children}
    </NavLink>
  );
}

function NavBar() {
  return (
    <div className="w-full flex items-start bg-slate-900 sticky top-0">
      <MyNavLink to="/jobs">Jobs</MyNavLink>
      <MyNavLink to="/profile">Profile</MyNavLink>
    </div>
  );
}

export default NavBar;