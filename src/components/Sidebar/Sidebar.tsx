import provisonalLogo from "../../assets/Logo_Name.png";
import { SIDEBAR_LINKS } from "../../utils/sidebarLinks";
import { SidebarLink } from "../SidebarLink/SidebarLink";
import { SidebarFooter } from "../SidebarFooter/SidebarFooter";
import { useAuth } from "../../hooks/useAuth";

export function Sidebar() {
  const { session } = useAuth();
  const userRole = session?.role || "";

  const filteredLinks = SIDEBAR_LINKS.filter((link) =>
    link.role?.includes(userRole)
  );

  return (
    <aside className="flex flex-col h-screen w-48 bg-gray-100 p-8">
      <div className="mb-8">
        <a href="/dashboard">
          <img src={provisonalLogo} alt="Logo marca" className="w-32 mx-auto" />
        </a>
      </div>
      <nav className="flex flex-col  gap-2">
        {filteredLinks.map(({ to, label, icon }) => (
          <SidebarLink key={to} to={to} label={label} icon={icon} />
        ))}
      </nav>
      <div className="mt-auto">
        <SidebarFooter />
      </div>
    </aside>
  );
}
