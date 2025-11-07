import ticketsSvg from "../assets/clipboard-list.svg";
import techsSvg from "../assets/users.svg";
import newTicketSvg from "../assets/plus.svg";
import servicesSvg from "../assets/wrench.svg";
import clientsSvg from "../assets/briefcase-business.svg";
import dashboardSvg from "../assets/Frame.svg";

const SIDEBAR_LINKS = [
  {
    to: "/dashboard",
    label: "Painel",
    icon: dashboardSvg,
    role: ["admin", "tech", "client"],
  },
  {
    to: "/tickets",
    label: "Chamados",
    icon: ticketsSvg,
    role: ["admin", "client"],
  },
  {
    to: "/clients",
    label: "Clientes",
    icon: clientsSvg,
    role: ["admin"],
  },
  { to: "/techs", label: "Técnicos", icon: techsSvg, role: ["admin"] },
  { to: "/services", label: "Serviços", icon: servicesSvg, role: ["admin"] },
  {
    to: "/newTicket",
    label: "Criar chamado",
    icon: newTicketSvg,
    role: ["client"],
  },
  {
    to: "/technicianTickets",
    label: "Meus Chamados",
    icon: ticketsSvg,
    role: ["tech"],
  },
];

export { SIDEBAR_LINKS };
