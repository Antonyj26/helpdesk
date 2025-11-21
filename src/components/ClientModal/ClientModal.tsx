import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { useState } from "react";
import xSvg from "../../assets/x.svg";
import { z, ZodError } from "zod";
import { api } from "../../services/api";
import { AxiosError } from "axios";

type ClientModalProps = {
  onClose: () => void;
  clientId: string | null;
  nameInput: string;
  emailInput: string;
};

const bodySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Nome deve ter pelo menos 2 carcteres" })
    .optional(),
  email: z
    .string()
    .trim()
    .email({ message: "email inválido" })
    .toLowerCase()
    .optional(),
});

export function ClientModal({
  nameInput,
  emailInput,
  onClose,
  clientId,
}: ClientModalProps) {
  const [name, setName] = useState(nameInput);
  const [email, setEmail] = useState(emailInput);

  async function editClient() {
    if (confirm("Tem certeza que quer editar esse cliente?")) {
      try {
        const data = bodySchema.parse({ name, email });

        await api.patch(`/admin/client/${clientId}`, data);
        onClose();
        window.location.reload();
      } catch (error) {
        if (error instanceof AxiosError) {
          return alert(
            error.response?.data.message ?? "Erro ao editar cliente"
          );
        }

        if (error instanceof ZodError) {
          return alert(error.issues[0].message);
        }
      }
    }
  }

  return (
    <form className="p-7 w-[380px] flex flex-col gap-3 bg-gray-600 border border-gray-500 rounded-lg">
      <div className="flex justify-between">
        <h1 className="mb-5 font-bold text-gray-100">Cliente</h1>
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
          value={name}
          legend="Nome"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          value={email}
          legend="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <Button title="Salvar" onClick={editClient}>
        Salvar
      </Button>
    </form>
  );
}
