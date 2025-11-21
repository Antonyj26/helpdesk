import arrowLeftSvg from "../../assets/arrow-left.svg";
import checkSvg from "../../assets/circle-check-big-black.svg";
import clockSvg from "../../assets/clock-2-white.svg";
import { useState, useEffect } from "react";
import { Button } from "../../components/Button/Button";
import { api } from "../../services/api";
import {
  AdminTicketDetails,
  type TicketAdminDetails,
} from "../../components/AdminTicketDetails/AdminTicketDetails";
import { AxiosError } from "axios";
import { useNavigate, useParams } from "react-router";
import { Loading } from "../../components/Loading/Loading";
import trashSvg from "../../assets/trash.svg";

export function AdministratorTicketDetails() {
  const { id } = useParams<{ id: string }>();
  const [ticket, setTicket] = useState<TicketAdminDetails | any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTicket() {
      try {
        const response = await api.get(`/admin/ticket/${id}`);
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
    if (confirm("Tem certeza que deseja encerrar esse ticket?")) {
      try {
        const status = { status: "encerrado" };

        await api.patch(`/admin/ticket/${id}/status`, status);
      } catch (error) {
        if (error instanceof AxiosError) {
          return alert(error.response?.data.message);
        }
      } finally {
        window.location.reload();
      }
    }
  }

  async function inProgressTicket() {
    if (confirm("Tem certeza que deseja iniciar o atendimento desse ticket?")) {
      try {
        const status = { status: "in_progress" };

        await api.patch(`/admin/ticket/${id}/status`, status);
      } catch (error) {
        if (error instanceof AxiosError) {
          return alert(error.response?.data.message);
        }
      } finally {
        window.location.reload();
      }
    }
  }

  async function deleteTicket() {
    if (confirm("Tem certeza que deseja excluir esse ticket?")) {
      try {
        await api.delete(`/admin/ticket/${id}`);
      } catch (error) {
        if (error instanceof AxiosError) {
          return alert(error.response?.data.message);
        }
      } finally {
        navigate("/tickets");
      }
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <a
        href="/tickets"
        className="flex gap-1.5 text-xs text-gray- font-medium mb-1.5"
      >
        <img src={arrowLeftSvg} alt="Seta para voltar" /> Voltar
      </a>
      <div className="flex justify-between">
        <h1 className="text-xl text-blue-dark font-bold mb-6">
          Chamado detalhado
        </h1>
        <div className="flex gap-4 items-center">
          <Button
            nameIcon="nameIcon"
            variant="secondary"
            disabled={ticket.status === "encerrado"}
            onClick={closedTicket}
          >
            <img src={checkSvg} /> Encerrar
          </Button>
          <Button nameIcon="nameIcon" onClick={deleteTicket}>
            <img src={trashSvg} alt="Ícone de lixeira" /> Exlcuir
          </Button>
          <Button
            nameIcon="nameIcon"
            disabled={ticket.status === "in_progress"}
            onClick={inProgressTicket}
          >
            <img src={clockSvg} />
            Em atendimento
          </Button>
        </div>
      </div>
      <AdminTicketDetails ticket={ticket} />
    </div>
  );
}
