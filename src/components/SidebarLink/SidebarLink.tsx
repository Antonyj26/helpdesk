import { Link } from "react-router-dom";

import type { LinkProps } from "react-router-dom";

type SidebarLinkProps = LinkProps & {
  label: string;
  icon?: string;
};

export function SidebarLink({ to, label, icon, ...rest }: SidebarLinkProps) {
  return (
    <Link
      to={to}
      {...rest}
      className="flex items-center gap-3 p-3 rounded-md text-gray-400 text-sm font-bold hover:bg-blue-dark hover:text-gray-600 transition ease-linear"
    >
      {icon && <img src={icon} alt={`${label} icon`} className="w-5 h-5" />}
      {label}
    </Link>
  );
}
