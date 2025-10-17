import provisonalLogo from "../../assets/Logo_Name.png";
import { SIDEBAR_LINKS } from "../../utils/sidebarLinks";
import { SidebarLink } from "../SidebarLink/SidebarLink";

export function Sidebar() {
  const user = {
    name: "Antony Almeida",
    email: "antony@admin.com",
  };

  return (
    <aside className="flex flex-col h-screen w-48 bg-gray-100 p-8">
      <div className="mb-8">
        <img src={provisonalLogo} alt="Logo marca" className="w-32 mx-auto" />
      </div>
      <nav className="flex flex-col  gap-2">
        {SIDEBAR_LINKS.map(({ to, label, icon }) => (
          <SidebarLink key={to} to={to} label={label} icon={icon} />
        ))}
      </nav>
      <div className="mt-auto">
        <div className="flex flex-col">
          <span className="text-sm text-gray-600">{user.name}</span>
          <span className="text-xs text-gray-400">{user.email}</span>
        </div>
      </div>
    </aside>
  );
}
