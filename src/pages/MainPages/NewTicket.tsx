import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { TextArea } from "../../components/TextArea/TextArea";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { AxiosError } from "axios";
import { Select } from "../../components/Select/Select";
import { z, ZodError } from "zod";

type Service = {
  id: string;
  name: string;
  price: number;
};

type Techs = {
  id: string;
  name: string;
  techAvailability: string[];
};

const ticketSchema = z.object({
  title: z.string().trim().min(6, "Título deve ter ao menos 6 caracteres"),
  description: z
    .string()
    .trim()
    .min(8, "Descrição deve ter ao menos 8 caracteres"),
  service_id: z.string().uuid(),
  tech_id: z.string().uuid(),
  selectedHour: z.string().regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, {
    message: "Horário deve estar no formato HH:MM",
  }),
});

export function NewTicket() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [services, setServices] = useState<Service[]>([]);
  const [techs, setTechs] = useState<Techs[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedTech, setSelectedTech] = useState<Techs | null>(null);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchedServices() {
      try {
        const response = await api.get("/client/service");
        setServices(response.data.services);
      } catch (error) {
        if (error instanceof AxiosError) {
          return alert(
            error.response?.data.message ?? "Erro ao carregar serviços"
          );
        }
      }
    }

    async function fetchedTechs() {
      try {
        const response = await api.get("/client/techs");
        setTechs(response.data.techs);

        console.log(response.data);
      } catch (error) {
        if (error instanceof AxiosError)
          return alert(
            error.response?.data.message ?? "Erro ao carregar técnicos"
          );
      }
    }

    fetchedServices();
    fetchedTechs();
  }, []);

  function handleSelectServiceChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    const selectedId = event.target.value;

    const service = services.find((s) => s.id === selectedId) || null;

    setSelectedService(service);
  }

  function handleSelectTechChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const techId = event.target.value;

    const tech = techs.find((s) => s.id === techId) || null;

    setSelectedTech(tech);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setIsLoading(true);
      const data = ticketSchema.parse({
        title,
        description,
        service_id: selectedService?.id,
        tech_id: selectedTech?.id,
        selectedHour,
      });

      await api.post("/client/ticket", data);

      if (confirm("Chamado criado com sucesso. Ir para tela de chamados?")) {
        navigate("/tickets");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        return alert(error.request.data.message ?? "Erro ao criar chamado");
      }

      if (error instanceof ZodError) {
        return alert(error.issues[0].message ?? "Erro de validação");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="h-full">
      <h1 className="text-xl text-blue-dark font-bold mb-6">Novo chamado</h1>

      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 border border-gray-500 rounded-2xl p-8 flex flex-col gap-6">
          <div>
            <h1 className="text-gray-200 font-bold mb-1">Informações</h1>
            <p className="text-xs text-gray-300 mb-6">
              Configure os dias e horários em que você está disponível para
              atender chamados
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <Input
              required
              name="title"
              type="text"
              legend="Título"
              placeholder="Digite um título para o chamado"
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextArea
              required
              name="description"
              legend="Descrição"
              placeholder="Descreva o que está acontecendo"
              onChange={(e) => setDescription(e.target.value)}
            />

            <Select
              required
              legend="Categoria de serviço"
              onChange={handleSelectServiceChange}
            >
              <option value="" disabled selected>
                Selecione a categoria de atendimento
              </option>

              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </Select>
            <Select required legend="Técnico" onChange={handleSelectTechChange}>
              <option value="" disabled selected>
                Selecione o técnico para realizar esse serviço
              </option>
              {techs.map((tech) => (
                <option key={tech.id} value={tech.id}>
                  {tech.name}
                </option>
              ))}
            </Select>
            <Select
              required
              legend="Horário"
              onChange={(e) => setSelectedHour(e.target.value)}
            >
              <option value="" disabled selected>
                Selecione o horário para ser realizado o serviço
              </option>
              {selectedTech?.techAvailability.map((hour, index) => (
                <option key={index} value={hour}>
                  {hour}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div className="flex-[0.8] border border-gray-500 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-gray-200 font-bold mb-1">Resumo</h1>
            <p className="text-xs text-gray-300 mb-4">Valores e detalhes</p>

            <div className="flex flex-col gap-4">
              <span className="flex flex-col text-xs text-gray-400">
                Categoria de serviço
                <strong className="text-gray-200 text-sm font-bold">
                  {selectedService ? selectedService.name : "-"}
                </strong>
              </span>

              <span className="flex flex-col text-xs text-gray-400">
                Custo inicial
                <strong className="text-gray-200 text-lg font-bold">
                  {selectedService
                    ? selectedService.price.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })
                    : "-"}
                </strong>
              </span>
              <span className="flex flex-col text-xs text-gray-400">
                Técnico responsável
                <strong className="text-gray-200 text-lg font-bold">
                  {selectedTech ? selectedTech.name : "-"}
                </strong>
              </span>
              <span className="flex flex-col text-xs text-gray-400">
                Horário escolhido
                <strong className="text-gray-200 text-lg font-bold">
                  {selectedHour ?? "-"}
                </strong>
              </span>
            </div>
          </div>
          <Button type="submit" isLoading={isLoading}>
            Criar chamado
          </Button>
        </div>
      </form>
    </div>
  );
}
