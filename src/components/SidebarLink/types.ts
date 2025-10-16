import type { LinkProps } from "react-router-dom";

export type SidebarLinkProps = LinkProps & {
  label: string;
  icon?: string;
};
