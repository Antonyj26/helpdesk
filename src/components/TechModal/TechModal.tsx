import xSvg from "../../assets/x.svg";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { useState } from "react";
import { z, ZodError } from "zod";
import { api } from "../../services/api";
import { AxiosError } from "axios";
import { fi } from "zod/locales";

type TechModalProps = {
  onClose: () => void;
};

const bodySchema = z.object({
  name: z.string().trim().min(2, { message: "Nome é obrigátorio" }),
  email: z.string().trim().email({ message: "E-mail inválido" }),
  password: z.string().min(6, { message: "A senha deve ter 6 caractes" }),
});

const availabilitySchema = z.object({
  tech_id: z.string().uuid(),
  availableHours: z
    .array(
      z.string().regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, {
        message: "Horário deve estar no formato HH:MM",
      })
    )
    .nonempty("Lista de horários não pode estar vazia"),
});

export function TechModal({ onClose }: TechModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [availableHours, setAvailableHours] = useState<string[]>([]);

  const hourRegex = /^([0-1]\d|2[0-3]):([0-5]\d)$/;

  function handleAddHour(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();

      const hour = e.currentTarget.value.trim();

      setMessage("");

      if (!hourRegex.test(hour)) {
        setMessage("Formato inválido, use HH:MM");
        return;
      }

      if (availableHours.includes(hour)) {
        setMessage("Esse horário já foi adicionado");
        return;
      }

      setAvailableHours((prev) => [...prev, hour]);
      e.currentTarget.value = "";
    }
  }

  async function newTech() {
    if (confirm("Criar novo técnico?")) {
      try {
        const data = bodySchema.parse({ name, email, password });

        const response = await api.post("/admin/tech", data);

        const tech_id = response.data.id;

        const availabilityData = availabilitySchema.parse({
          tech_id,
          availableHours,
        });

        await api.post("/admin/tech/availability", availabilityData);
        onClose();
      } catch (error) {
        if (error instanceof AxiosError) {
          alert(error.response?.data.message);
        }

        if (error instanceof ZodError) {
          setMessage(error.issues[0].message);
        }
      } finally {
        window.location.reload();
      }
    }
  }

  return (
    <form className="p-7 w-[380px] flex flex-col gap-3 bg-gray-600 border border-gray-500 rounded-lg">
      <div className="flex justify-between">
        <h1 className="mb-5 font-bold text-gray-100">Criar técnico</h1>
        <Button
          baseVariant="baseIcon"
          variant="secondary"
          title="Fechar"
          onClick={onClose}
        >
          <img src={xSvg} alt="Botão para fechar" />
        </Button>
      </div>
      <div className="flex flex-col gap-2 mb-2">
        <Input
          legend="Nome"
          placeholder="Nome do técnico"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          legend="Email"
          type="email"
          placeholder="example@email.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          legend="Password"
          type="password"
          placeholder="Digite a senha padrão"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          legend="Horários (ex: 09:00)"
          placeholder="Digite e pressione Enter"
          onKeyDown={handleAddHour}
        />

        <ul className="space-y-1">
          {availableHours.map((h) => (
            <li key={h} className="text-xs text-gray-300">
              {h}
            </li>
          ))}
        </ul>

        <p className="text-feedback-danger text-sm font-bold text-center ">
          {message}
        </p>
      </div>
      <Button onClick={newTech} title="Criar técnico">
        Criar técnico
      </Button>
    </form>
  );
}
