import { StatusTickets } from "../Status/StatusTickets";
import { Select } from "../Select/Select";
import { Button } from "../Button/Button";
import plusSvg from "../../assets/plus.svg";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { AxiosError } from "axios";

export type TechTicketDetails = {
  id: string;
  status: string;
  title: string;
  description: string;
  services: string[];
  price: string[];
  total: string;
  createdAt: string;
  updatedAt: string;
  cliente: string;
  tech: string;
  email: string;
};

type Services = {
  id: string;
  name: string;
  price: number;
};

type TicketTechDetailsProps = {
  ticket: TechTicketDetails;
  addService: (service_id: string) => void;
};

export function TicketTechDetails({
  ticket,
  addService,
}: TicketTechDetailsProps) {
  const [services, setServices] = useState<Services[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState("");

  useEffect(() => {
    async function fetchedServices() {
      try {
        const response = await api.get("/tech/services");
        const data = response.data.services;
        setServices(data);
      } catch (error) {
        if (error instanceof AxiosError) {
          alert(error.response?.data.message ?? "Erro ao carregar serviços");
        }
      }
    }

    fetchedServices();
  }, []);

  return (
    <div className="h-full">
      <div className="flex flex-wrap gap-6">
        <div className="w-full border border-gray-500 rounded-lg p-6">
          <div className="flex justify-between mb-2">
            <span className="text-xs text-gray-300">{ticket.id}</span>
            <StatusTickets status={ticket.status} />
          </div>
          <p className="text-xs text-gray-400 font-bold">Descrição</p>
          <span className="text-lg font-bold">{ticket.title}</span>
          <p className="text-xs text-gray-400 font-bold mt-5">Categoria</p>
          <span className="text-sm text-gray-200 mt-0.5">
            {ticket.services.join(", ")}
          </span>
          <div className="flex justify-between">
            <div>
              <p className="text-xs text-gray-400 font-bold mt-5">Criado em</p>
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
          <span className="text-sm text-gray-200 mt-0.5">{ticket.cliente}</span>
        </div>
        <div className="w-full lg:w-[320px] border border-gray-500 rounded-lg p-6">
          <form className="flex flex-col gap-6">
            <h1 className="mb-5 tex-lg font-bold">Adicionar serviços</h1>
            <Select
              required
              legend="Serviços"
              onChange={(e) => setSelectedServiceId(e.target.value)}
            >
              <option disabled selected>
                Selecione um serviço
              </option>
              {services.map((service) => (
                <option value={service.id} key={service.id}>
                  {service.name}
                </option>
              ))}
            </Select>
            <div className="flex flex-col items-center mt-5">
              <Button
                nameIcon="nameIcon"
                title="Adicionar"
                onClick={() => addService(selectedServiceId)}
              >
                <img
                  src={plusSvg}
                  alt="Ícone para adicionar"
                  className="w-5 h-5"
                />
                Adicionar
              </Button>
            </div>
          </form>
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
                {ticket.price.map((value, index) => (
                  <span key={index} className="text-xs text-gray-200">
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
