import { TicketTechDetails } from "../../components/TicketTechDetails/TicketTechDetails";
import type { TechTicketDetails } from "../../components/TicketTechDetails/TicketTechDetails";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "../../components/Button/Button";
import { api } from "../../services/api";
import { AxiosError } from "axios";
import checkSvg from "../../assets/circle-check-big-black.svg";
import clockSvg from "../../assets/clock-2-white.svg";
import { Loading } from "../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import arrowLeftSvg from "../../assets/arrow-left.svg";
import { z } from "zod";

const bodySchema = z.object({
  ticket_id: z.string().uuid(),
  service_id: z.string().uuid(),
});

export function TechnicianTicketDetails() {
  const { id } = useParams<{ id: string }>();
  const [ticket, setTicket] = useState<TechTicketDetails | any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTicket() {
      try {
        const response = await api.get(`/tech/ticket/${id}`);
        setTicket(response.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          alert(error.response?.data.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchTicket();
  }, [id]);

  async function closedTicket() {
    if (confirm("Tem certeza que quer encerrar esse ticket?")) {
      try {
        const status = { status: "encerrado" };

        await api.patch(`/tech/ticket/${id}/status`, status);
      } catch (error) {
        if (error instanceof AxiosError) {
          alert(error.response?.data.message);
        }
      } finally {
        navigate("/technicianTickets");
      }
    }
  }

  async function inProgressTicket() {
    if (confirm("Tem certeza que quer inciar o atendimento?")) {
      try {
        const status = { status: "in_progress" };

        await api.patch(`/tech/ticket/${id}/status`, status);
      } catch (error) {
        if (error instanceof AxiosError) {
          alert(error.response?.data.message);
        }
      } finally {
        navigate("/technicianTickets");
      }
    }
  }

  async function addNewService(service_id: string) {
    if (!service_id) {
      alert("Selecione um serviço antes de adicionar!");
      return;
    }

    if (
      !confirm("Tem certeza que quer adicionar esse novo serviço ao ticket?")
    ) {
      return;
    }

    try {
      const body = bodySchema.parse({
        ticket_id: id!,
        service_id,
      });

      await api.patch("/tech/ticket/services", body);

      const response = await api.get(`/tech/ticket/${id}`);
      setTicket(response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        alert(error.response?.data.message ?? "Erro ao adicionar serviço");
      } else {
        alert("Erro inesperado");
      }
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <a
        href="/technicianTickets"
        className="flex gap-1.5 text-xs text-gray- font-medium mb-1.5"
      >
        <img src={arrowLeftSvg} alt="Seta para voltar" /> Voltar
      </a>
      <div className="flex justify-between">
        <h1 className="text-xl text-blue-dark font-bold mb-6">
          Chamado detalhado
        </h1>
        {ticket.status !== "encerrado" && (
          <div className="flex gap-4">
            <Button
              nameIcon="nameIcon"
              variant="secondary"
              onClick={closedTicket}
              disabled={ticket.status === "encerrado"}
            >
              <img src={checkSvg} /> Encerrar
            </Button>
            <Button
              nameIcon="nameIcon"
              onClick={inProgressTicket}
              disabled={ticket.status === "in_progress"}
            >
              <img src={clockSvg} />
              Iniciar atendimento
            </Button>
          </div>
        )}
      </div>

      <TicketTechDetails ticket={ticket} addService={addNewService} />
    </div>
  );
}
