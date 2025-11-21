import type { Ticket } from "../../components/TicketsTable/TicketsTable";
import { TicketsTable } from "../../components/TicketsTable/TicketsTable";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/api";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { Loading } from "../../components/Loading/Loading";
import { useNavigate } from "react-router";

export function Tickets() {
  const { session } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTickets() {
      try {
        if (!session) {
          return;
        }

        const endpoint =
          session.role === "admin" ? "/admin/ticket" : "/client/ticket";

        const response = await api.get(endpoint);
        console.log("📦 Resposta da API:", response.data);

        const data = response.data;

        const fetchedTickets =
          session.role === "admin"
            ? data.allTickets ?? []
            : data.ticketsFormated ?? [];

        setTickets(fetchedTickets);

        setMessage(data.message);
      } catch (error) {
        if (error instanceof AxiosError) {
          return alert(error.response?.data.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchTickets();
  }, [session]);

  const handleViewDetails = (ticketId: number) => {
    navigate(`/AdministratorTicketDetails/details/${ticketId}`);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className="text-xl text-blue-dark font-bold mb-6">Chamados</h1>
      <p className="text-sm text-gray-100 mb-4"></p>
      {tickets?.length > 0 ? (
        <TicketsTable tickets={tickets} onViewDetails={handleViewDetails} />
      ) : (
        <p className="text-gray-100 font-bold">{message}</p>
      )}
    </div>
  );
}
