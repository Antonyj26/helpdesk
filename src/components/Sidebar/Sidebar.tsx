import provisonalLogo from "../../assets/Logo_Name.png";
import { SIDEBAR_LINKS } from "../../utils/sidebarLinks";
import { SidebarLink } from "../SidebarLink/SidebarLink";
import { SidebarFooter } from "../SidebarFooter/SidebarFooter";

export function Sidebar() {
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
        <SidebarFooter />
      </div>
    </aside>
  );
}
