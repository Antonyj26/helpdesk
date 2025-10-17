import ticketsSvg from "../assets/clipboard-list.svg";
import techsSvg from "../assets/users.svg";
import newTicketSvg from "../assets/plus.svg";
import servicesSvg from "../assets/wrench.svg";
import clientsSvg from "../assets/briefcase-business.svg";
import dashboardSvg from "../assets/Frame.svg";

const SIDEBAR_LINKS = [
  { to: "/", label: "Painel", icon: dashboardSvg },
  { to: "/tickets", label: "Chamados", icon: ticketsSvg },
  { to: "/clients", label: "Clientes", icon: clientsSvg },
  { to: "/techs", label: "Técnicos", icon: techsSvg },
  { to: "/services", label: "Serviços", icon: servicesSvg },
  { to: "/newTicket", label: "Criar chamado", icon: newTicketSvg },
];

export { SIDEBAR_LINKS };
