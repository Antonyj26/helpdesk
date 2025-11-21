import { StatusTickets } from "../Status/StatusTickets";

export type TicketAdminDetails = {
  id: string;
  status: string;
  title: string;
  description: string;
  services: string[];
  price: string[];
  total: string;
  createdAt: string;
  updatedAt: string;
  client: string;
  tech: string;
  email: string;
};

type AdminTicketDetailsProps = {
  ticket: TicketAdminDetails;
};

export function AdminTicketDetails({ ticket }: AdminTicketDetailsProps) {
  return (
    <div className="h-full">
      <div className="flex flex-wrap gap-6">
        <div className="w-full border border-gray-500 rounded-lg p-6">
          <div className="flex justify-between mb-2">
            <span className="text-xs text-gray-300">{ticket.id}</span>
            <StatusTickets status={ticket.status} />
          </div>

          <span className="text-lg font-bold">{ticket.title}</span>

          <p className="text-xs text-gray-400 font-bold mt-4">Descrição</p>
          <span className="text-sm text-gray-200 mt-0.5">
            {ticket.description}
          </span>

          <p className="text-xs text-gray-400 font-bold mt-5">Categoria</p>
          <span className="text-sm text-gray-200 mt-0.5">
            {ticket.services.join(", ")}
          </span>

          <div className="flex justify-between mt-5">
            <div>
              <p className="text-xs text-gray-400 font-bold">Criado em</p>
              <span className="text-sm text-gray-200 mt-0.5">
                {ticket.createdAt}
              </span>
            </div>

            <div>
              <p className="text-xs text-gray-400 font-bold">Atualizado em</p>
              <span className="text-sm text-gray-200 mt-0.5">
                {ticket.updatedAt}
              </span>
            </div>
          </div>

          <p className="text-xs text-gray-400 font-bold mt-5">Cliente</p>
          <span className="text-sm text-gray-200 mt-0.5">{ticket.client}</span>
        </div>

        <div className="flex-1 border border-gray-500 rounded-lg p-6">
          <div>
            <p className="text-xs text-gray-400 font-bold mb-2">
              Técnico responsável
            </p>

            <div className="flex flex-col mb-8">
              <span className="text-sm text-gray-200">{ticket.tech}</span>
              <span className="text-xs text-gray-300">{ticket.email}</span>
            </div>

            <p className="text-xs text-gray-400 font-bold mb-2">Valores</p>

            <div className="flex justify-between mb-2">
              <span className="text-xs text-gray-200">Preço Base</span>
              <div className="flex flex-col gap-1">
                {ticket.price.map((value, i) => (
                  <span key={i} className="text-xs text-gray-200">
                    {value}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <p className="text-sm text-gray-200 font-bold">Total</p>
              <span className="text-sm text-gray-200 font-bold">
                {ticket.total}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
