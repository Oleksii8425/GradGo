import type { ReactNode } from "react";
import { NavLink } from "react-router";

interface NavLinkProps {
  to: string,
  children: ReactNode
};

function MyNavLink({ to, children }: NavLinkProps) {
  return (
    <NavLink to={to} className="p-2 rounded-2xl bg-amber-200 text-amber-950 hover:bg-amber-400">
      {children}
    </NavLink>
  );
}

function NavBar() {
  return (
    <div className="w-full flex items-start gap-2 border-b p-2">
      <MyNavLink to="/jobs">Jobs</MyNavLink>
      <MyNavLink to="/profile">Profile</MyNavLink>
    </div>
  );
}

export default NavBar;