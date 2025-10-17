import type { Ticket } from "../../components/TicketsTable/TicketsTable";
import { TicketsTable } from "../../components/TicketsTable/TicketsTable";

const tickets: Ticket[] = [
  {
    id: 1,
    updatedAt: "2025-10-16",
    title: "Erro no sistema",
    service: "Suporte",
    totalValue: "R$ 150,00",
    client: "Cliente A",
    tech: "Técnico X",
    status: "Aberto",
  },
  {
    id: 2,
    updatedAt: "2025-10-15",
    title: "Manutenção",
    service: "Instalação",
    totalValue: "R$ 200,00",
    client: "Cliente B",
    tech: "Técnico Y",
    status: "Encerrado",
  },
  {
    id: 3,
    updatedAt: "2025-10-15",
    title: "Manutenção",
    service: "Instalação",
    totalValue: "R$ 200,00",
    client: "Cliente C",
    tech: "Técnico Z",
    status: "Em andamento",
  },
];

export function Tickets() {
  const handleViewDetails = (ticketId: number) => {};

  return (
    <div>
      <h1 className="text-xl text-blue-dark font-bold mb-6">Chamados</h1>
      <TicketsTable tickets={tickets} onViewDetails={handleViewDetails} />
    </div>
  );
}
