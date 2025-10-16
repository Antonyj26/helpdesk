import { Link, useLocation } from "react-router-dom";
import type { SidebarLinkProps } from "./types";

export function SidebarLink({ to, label, icon, ...rest }: SidebarLinkProps) {
  const location = useLocation();
  const isActive = location === to;

  return (
    <Link
      to={to}
      {...rest}
      className={`flex items-center gap-3 p-3 rounded-md text-gray-400 text-sm font-bold transition-colors ${
        isActive
          ? "bg-blue-dark text-gray-600"
          : "hover:bg-blue-dark hover:text-gray-600"
      }`}
    >
      {icon && <img src={icon} alt={`${label} icon`} className="w-5 h-5" />}
      {label}
    </Link>
  );
}
