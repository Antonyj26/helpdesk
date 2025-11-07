import openSvg from "../../assets/circle-help.svg";
import inProgressSvg from "../../assets/clock-2.svg";
import encerradoSvg from "../../assets/circle-check-big.svg";
import penSvg from "../../assets/pen-line.svg";
import { Button } from "../Button/Button";

export type TicketTech = {
  id: string;
  createdAt: string;
  title: string;
  services: string[];
  price: string[];
  client: string;
  status: string;
};

export type TicketsTechProps = {
  tickets: TicketTech[];
  onViewDetails: (ticketId: string) => void;
};

export function TicketsTech({ tickets, onViewDetails }: TicketsTechProps) {
  const openTickets = tickets.filter((t) => t.status === "open");
  const inProgressTickets = tickets.filter((t) => t.status === "in_progress");
  const encerradoTickets = tickets.filter((t) => t.status === "encerrado");

  function renderSection(
    title: string,
    coloClass: string,
    icon: string,
    items: TicketTech[]
  ) {
    return (
      <div className="mb-6">
        <div>
          <h1
            className={`inline-flex items-center gap-1.5 p-1.5 text-xs rounded-2xl font-medium ${coloClass}`}
          >
            <img src={icon} />
            {title}
          </h1>
        </div>

        <div className="mt-3 flex flex-wrap gap-3">
          {items.length > 0 ? (
            items.map((ticket) => (
              <div
                key={ticket.id}
                className="border border-gray-500 rounded-lg p-4 hover:bg-gray-500 cursor-pointer transition ease-linear "
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-gray-400 font-bold">
                    {ticket.id}
                  </span>
                  <Button
                    type="button"
                    variant="secondary"
                    baseVariant="baseIcon"
                  >
                    <img src={penSvg} alt="" />
                  </Button>
                </div>
                <h2 className="text-gray-100 font-bold text-lg">
                  {ticket.title}
                </h2>
                <p className="text-gray-200 font-medium text-xs mb-4">
                  {ticket.services.join(", ")}
                </p>
                <div className="border-b border-gray-500 flex justify-between items-center mb-4 gap-5">
                  <span className="text-xs font-medium text-gray-200">
                    {ticket.createdAt}
                  </span>
                  <p className="text-base font-medium">{`R$ ${ticket.price}`}</p>
                </div>
                <p className="text-xs text-gray-200 font-bold flex justify-between">
                  {ticket.client}
                  <img src={icon} className={`rounded-2xl p-1 ${coloClass}`} />
                </p>
              </div>
            ))
          ) : (
            <p className="text-xs text-gray-100 mt-2 font-bold">
              Nenhum chamado
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      {renderSection(
        "Em atendimento",
        "bg-blue-100 text-blue-dark",
        inProgressSvg,
        inProgressTickets
      )}
      {renderSection(
        "Aberto",
        "bg-red-100 text-feedback-danger",
        openSvg,
        openTickets
      )}
      {renderSection(
        "Encerrado",
        "bg-green-100 text-feedback-done",
        encerradoSvg,
        encerradoTickets
      )}
    </div>
  );
}
