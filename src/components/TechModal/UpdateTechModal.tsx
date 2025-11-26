import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { api } from "../../services/api";
import { useState } from "react";
import xSvg from "../../assets/x.svg";
import trashSvg from "../../assets/trash.svg";
import { z, ZodError } from "zod";
import { AxiosError } from "axios";

type UpdateTechModalProps = {
  onClose: () => void;
  idTech: string;
  nameTech: string;
  emailTech: string;
  onDelete: () => void;
};

const bodySchema = z.object({
  name: z.string().trim().min(2).optional(),
  email: z.string().trim().email({ message: "E-mail inválido" }).optional(),
});

export function UpdateTechModal({
  onClose,
  idTech,
  emailTech,
  nameTech,
  onDelete,
}: UpdateTechModalProps) {
  const [name, setName] = useState(nameTech);
  const [email, setEmail] = useState(emailTech);
  const [message, setMessage] = useState("");

  async function onEdit() {
    if (confirm("Tem certeza que deseja editar esse")) {
      try {
        const data = bodySchema.parse({ name, email });

        await api.patch(`/admin/tech/${idTech}`, data);
        onClose();
        window.location.reload();
      } catch (error) {
        if (error instanceof AxiosError) {
          alert(error.response?.data.message ?? "Erro ao editar técnico");
        }

        if (error instanceof ZodError) {
          setMessage(error.issues[0].message);
        }
      }
    }
  }

  return (
    <form className="p-7 w-[380px] flex flex-col gap-3 bg-gray-600 border border-gray-500 rounded-lg">
      <div className="flex justify-between">
        <h1 className="mb-5 font-bold text-gray-100">Editar técnico</h1>
        <div className="flex gap-2">
          <Button variant="secondary" baseVariant="baseIcon" onClick={onDelete}>
            <img src={trashSvg} />
          </Button>
          <Button
            baseVariant="baseIcon"
            variant="secondary"
            title="Fechar"
            onClick={onClose}
          >
            <img src={xSvg} alt="Botão para fechar" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-2 mb-2">
        <Input
          legend="Nome"
          placeholder="Nome do técnico"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          legend="Email"
          type="email"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="text-feedback-danger text-sm font-bold text-center ">
          {message}
        </p>
      </div>
      <Button onClick={onEdit} title="Salvar">
        salvar
      </Button>
    </form>
  );
}
