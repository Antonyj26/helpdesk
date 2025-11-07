import { TicketsTech } from "../../components/TicketsTech/TicketsTech";
import type { TicketTech } from "../../components/TicketsTech/TicketsTech";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/api";
import { AxiosError } from "axios";
import { Loading } from "../../components/Loading/Loading";

export function TechnicianTickets() {
  const [isLoading, setIsLoading] = useState(true);
  const [ticket, setTicket] = useState<TicketTech[]>([]);
  const { session } = useAuth();

  useEffect(() => {
    async function fetchedTechTickets() {
      try {
        if (!session) {
          return;
        }

        const response = await api.get("/tech/ticket");

        const data = response.data;

        console.log(data);

        setTicket(data.tickets);
      } catch (error) {
        if (error instanceof AxiosError) {
          return alert(error.response?.data.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchedTechTickets();
  }, [session]);

  const handleViewDetails = (ticketId: string) => {};

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className="text-blue-dark font-bold text-xl mb-6">Meus chamados</h1>
      <TicketsTech tickets={ticket} onViewDetails={handleViewDetails} />
    </div>
  );
}
