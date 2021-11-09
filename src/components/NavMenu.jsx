import { NavLink } from "react-router-dom";

const NavItem = ({
  to,
  label
}) => (
  <span>
    <NavLink
      to={to}
      className="hover:text-blue-500"
      activeClassName="text-blue-500 cursor-default"
    >
      {label}
    </NavLink>
  </span>
);

export default function NavMenu() {
  return (
    <div className="mb-6">
      <nav className="flex space-x-6">
        <NavItem to="/transactions" label="Transactions" />
        <NavItem to="/places" label="Places" />
      </nav>
    </div>
  );
}
