import type { ReactNode } from "react";
import { NavLink } from "react-router";

interface NavLinkProps {
  to: string,
  children: ReactNode
};

function MyNavLink({ to, children }: NavLinkProps) {
  return (
    <NavLink to={to} className="m-4 p-4 rounded-2xl bg-amber-200 text-amber-950 hover:bg-amber-400">
      {children}
    </NavLink>
  );
}

function NavBar() {
  return (
    <div className="flex justify-center-safe">
      <MyNavLink to="/jobs">Jobs</MyNavLink>
      <MyNavLink to="/profile">Profile</MyNavLink>
    </div>
  );
}

export default NavBar;