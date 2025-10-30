import { StatusTickets } from "../Status/StatusTickets";
import detailsSvg from "../../assets/pen-line.svg";

export type Ticket = {
  id: number;
  updatedAt: string;
  title: string;
  services: string[];
  price: string[];
  client: string;
  tech: string;
  status: string;
};

type TicketsTableProps = {
  tickets: Ticket[];
  onViewDetails: (ticketId: number) => void;
};

export function TicketsTable({ tickets, onViewDetails }: TicketsTableProps) {
  return (
    <div className="overflow-x-auto border border-gray-500 rounded-2xl">
      <table className="min-w-full divide-y divide-gray-500">
        <thead>
          <tr>
            <th className="px-6 py-3 text-gray-400 text-left text-sm font-bold">
              Atualizado em
            </th>
            <th className="px-6 py-3 text-gray-400 text-left text-sm font-bold">
              ID
            </th>
            <th className="px-6 py-3 text-gray-400 text-left text-sm font-bold">
              Título e Serviço
            </th>
            <th className="px-6 py-3 text-gray-400 text-left text-sm font-bold">
              Valor Total
            </th>
            <th className="px-6 py-3 text-gray-400 text-left text-sm font-bold">
              Cliente
            </th>
            <th className="px-6 py-3 text-gray-400 text-left text-sm font-bold">
              Técnico
            </th>
            <th className="px-6 py-3 text-gray-400 text-left text-sm font-bold">
              Staus
            </th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td className="px-6 py-4 text-sm">{ticket.updatedAt}</td>
              <td className="px-6 py-4 text-sm font-bold">{ticket.id}</td>
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-200">
                    {ticket.title}
                  </span>
                  <span className="text-xs text-gray-200">
                    {ticket.services?.join(", ") || "Sem serviços"}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm font-bold">{`R$ ${ticket.price}`}</td>
              <td className="px-6 py-4 text-sm font-bold">{ticket.client}</td>
              <td className="px-6 py-4 text-sm font-bold">{ticket.tech}</td>
              <td className="px-6 py-4">
                <StatusTickets status={ticket.status} />
              </td>
              <td>
                <button
                  className="bg-gray-500 w-7 h-7 rounded-1xl cursor-pointer flex items-center justify-center hover:bg-gray-600 transition ease-linear mr-2"
                  onClick={() => onViewDetails(ticket.id)}
                >
                  <img src={detailsSvg} alt="Caneta de detalhes" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
